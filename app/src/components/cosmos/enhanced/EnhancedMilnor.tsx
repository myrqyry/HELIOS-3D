import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Line, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import type { CognitiveLayer } from '../../../data/layeredKnowledge';
import { isMotionEnabled, usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

interface EnhancedSubsystemProps {
  layer: CognitiveLayer;
  isFocused?: boolean;
  paused?: boolean;
  params?: Record<string, number>;
  pulseTrigger?: number;
  onNodeClick?: () => void;
}

/**
 * ENHANCED INCOHERENT MILNOR OPTICAL SINGULARITY (Subsystem 06)
 * Optical singularity with 3D zero-coherence trefoil knot (μ = 0),
 * coherence void and phase ring behavior, speckle-free uniform intensity field,
 * and dual payload cryptographic readout in an atmospheric diagnostic visual style.
 */
export default function EnhancedMilnor({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const payloadRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const topologicalCharge = params.topological_charge ?? 3.0;

  // 1. 3D Coherence Singularity Trefoil Knot Points (Locus where |μ| = 0)
  const trefoilPoints = useMemo(() => {
    const arr: [number, number, number][] = [];
    const count = 64;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.48;
      const y = (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.48;
      const z = -Math.sin(3 * t) * 0.48;
      arr.push([x, y, z]);
    }
    return arr;
  }, []);

  // 2. Coherence Void Expanding Rings
  const voidRings = useMemo(() => {
    return [0.45, 0.85, 1.25].map((r) => {
      const pts: [number, number, number][] = [];
      const segs = 36;
      for (let i = 0; i <= segs; i++) {
        const phi = (i / segs) * Math.PI * 2;
        pts.push([Math.cos(phi) * r, Math.sin(phi) * r, 0]);
      }
      return { radius: r, points: pts };
    });
  }, []);

  // 3. Speckle-free Uniform Intensity Grid (Backdrop Detector Array)
  const intensityGrid = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        arr.push([x * 0.42, y * 0.42, -0.65]);
      }
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.14;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }

    if (knotRef.current) {
      knotRef.current.rotation.y += delta * 0.45;
      knotRef.current.rotation.z = Math.sin(t * 0.6) * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.25;
    }

    if (payloadRef.current) {
      payloadRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. 3D Coherence Singularity Trefoil Knot (μ = 0 Nodal Lines) */}
      <group ref={knotRef}>
        <Instances limit={trefoilPoints.length} range={trefoilPoints.length}>
          <sphereGeometry args={[0.052, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={2.4}
          />
          {trefoilPoints.map((pos, idx) => (
            <Instance key={idx} position={pos} />
          ))}
        </Instances>

        {/* Luminous Wireframe Torus Knot Singularity Core */}
        <mesh>
          <torusKnotGeometry args={[0.78, 0.16, 120, 20, 2, 3]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* 2. Coherence Void Rings (Expanding Dark Interference Phase Boundary) */}
      <group ref={ringRef}>
        {voidRings.map((ring, idx) => (
          <Line
            key={idx}
            points={ring.points}
            color={idx === 0 ? '#38bdf8' : idx === 1 ? '#818cf8' : '#c084fc'}
            lineWidth={2.0}
            transparent
            opacity={0.65 - idx * 0.15}
          />
        ))}
      </group>

      {/* 3. Uniform Speckle-Free Background Intensity Field (Diagnostic Paradox) */}
      <group position={[0, 0, 0]}>
        <Instances limit={intensityGrid.length} range={intensityGrid.length}>
          <boxGeometry args={[0.36, 0.36, 0.04]} />
          <meshStandardMaterial
            color="#ffb627"
            emissive="#ff6b1a"
            emissiveIntensity={0.8}
            roughness={0.4}
          />
          {intensityGrid.map((pos, idx) => (
            <Instance key={idx} position={pos} />
          ))}
        </Instances>
        <Billboard position={[0, -1.25, -0.6]}>
          <Text fontSize={0.11} color="#ffb627" anchorX="center">
            {'UNIFORM INTENSITY BACKGROUND (SPECKLE-FREE)'}
          </Text>
        </Billboard>
      </group>

      {/* 4. Dual Payload Cryptographic Readout (Braid Key + Coherence State) */}
      <group ref={payloadRef} position={[0, 0.85, 0]}>
        <mesh>
          <octahedronGeometry args={[0.18]} />
          <meshStandardMaterial
            color="#ffd166"
            emissive="#ffd166"
            emissiveIntensity={2.5}
            wireframe
          />
        </mesh>
      </group>

      {/* 5. Incoherent Milnor Diagnostic Metric HUD Billboard */}
      <Billboard position={[0, 1.45, 0]}>
        <group>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.6, 0.42]} />
            <meshBasicMaterial color="#0b0914" transparent opacity={0.88} />
          </mesh>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.125}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            {`Zero-Coherence Nodal Void (|μ| = 0, l = ${topologicalCharge.toFixed(0)})`}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.092}
            color="#ffd166"
            anchorX="center"
            anchorY="middle"
          >
            {'Milnor Polynomial f(z₁, z₂) = z₁³ - z₂² (Dual Payload)'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
