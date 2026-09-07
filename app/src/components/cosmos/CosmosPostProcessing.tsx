import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { DepthOfFieldEffect } from 'postprocessing';
import type { DomainKnowledge } from '../../data/layeredKnowledge';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CosmosPostProcessingProps {
  activeDomain: DomainKnowledge | null;
  cameraPreset?: 'overview' | 'focused' | 'topdown' | 'slice';
  isAnyFocused?: boolean;
}

/**
 * Dynamic Depth-of-Field and optical post-processing controller for HELIOS-3D Cosmos.
 *
 * Implements selective spatial depth cueing:
 * - Subtle, light DOF in standard overview mode so central elements are crisp and distant stations soften gently.
 * - Dynamic photographic focus tracking when a subsystem is selected (e.g. TOHE is tack-sharp,
 *   while overlapping background stations like Moiré soften noticeably).
 * - Smooth frame-by-frame interpolation (lerp) across target transitions to prevent jarring pops.
 * - Respects prefers-reduced-motion preferences by dampening blur scaling.
 */
export function CosmosPostProcessing({
  activeDomain,
  cameraPreset = 'overview',
  isAnyFocused = false,
}: CosmosPostProcessingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dofRef = useRef<DepthOfFieldEffect>(null);

  // Animated state references for smooth cinematic transitions
  const currentTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentBokehScale = useRef(1.15);
  const currentFocusRange = useRef(5.2);

  // Compute desired target position based on focus state
  const desiredTarget = useMemo(() => {
    if (activeDomain) {
      return new THREE.Vector3(...activeDomain.position3D);
    }
    return new THREE.Vector3(0, 0, 0);
  }, [activeDomain]);

  // Compute desired blur intensity and in-focus depth band
  const { targetBokehScale, targetFocusRange } = useMemo(() => {
    if (prefersReducedMotion) {
      return { targetBokehScale: 0.5, targetFocusRange: 6.0 };
    }

    if (cameraPreset === 'topdown') {
      return { targetBokehScale: 0.6, targetFocusRange: 7.5 };
    }

    if (cameraPreset === 'slice') {
      return { targetBokehScale: 1.8, targetFocusRange: 2.8 };
    }

    if (activeDomain || isAnyFocused) {
      // Subsystem focused: stronger photographic DOF to clearly separate from background neighbors
      return { targetBokehScale: 2.4, targetFocusRange: 2.3 };
    }

    // Normal Overview: subtle, light DOF to provide depth separation without smearing
    return { targetBokehScale: 1.15, targetFocusRange: 5.2 };
  }, [prefersReducedMotion, cameraPreset, activeDomain, isAnyFocused]);

  useFrame((_, delta) => {
    // Smoothly interpolate target vector, bokeh blur scale, and focal range
    const lerpSpeed = delta * 3.6;
    currentTarget.current.lerp(desiredTarget, lerpSpeed);
    currentBokehScale.current = THREE.MathUtils.lerp(currentBokehScale.current, targetBokehScale, lerpSpeed);
    currentFocusRange.current = THREE.MathUtils.lerp(currentFocusRange.current, targetFocusRange, lerpSpeed);

    if (dofRef.current) {
      dofRef.current.target = currentTarget.current;
      dofRef.current.bokehScale = currentBokehScale.current;
      dofRef.current.cocMaterial.focusRange = currentFocusRange.current;

      // Update distance from camera to animated target vector
      const dist = dofRef.current.calculateFocusDistance(currentTarget.current);
      dofRef.current.cocMaterial.focusDistance = dist;
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        ref={dofRef}
        target={currentTarget.current}
        bokehScale={currentBokehScale.current}
        focusRange={currentFocusRange.current}
        resolutionScale={0.5}
      />
      <Vignette
        eskil={false}
        offset={0.12}
        darkness={0.62}
      />
    </EffectComposer>
  );
}
