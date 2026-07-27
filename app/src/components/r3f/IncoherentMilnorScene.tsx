import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ExhibitControl } from '../exhibit/ExhibitControl';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

export type IncoherentMilnorPhase = 'coherence_singularities' | 'statistical_coherence' | 'dual_encryption';

export function getIncoherentMilnorPhase(progress: number): IncoherentMilnorPhase {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.35) return 'coherence_singularities';
  if (clamped < 0.7) return 'statistical_coherence';
  return 'dual_encryption';
}

// Generate points on a trefoil knot embedded in coherence singularity space (μ = 0)
const trefoilPoints = Array.from({ length: 48 }, (_, i) => {
  const t = (i / 48) * Math.PI * 2;
  const x = (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.45;
  const y = (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.45;
  const z = -Math.sin(3 * t) * 0.45;
  return [x, y, z] as [number, number, number];
});

// Grid of bright background intensity field
const intensityGrid = Array.from({ length: 25 }, (_, i) => {
  const row = Math.floor(i / 5) - 2;
  const col = (i % 5) - 2;
  return [col * 0.5, row * 0.5, -0.6] as [number, number, number];
});

function MilnorMechanism({ paused, reduceMotion }: { paused: boolean; reduceMotion: boolean }) {
  const progressRef = useRef(reduceMotion ? 1 : 0);
  const knotRef = useRef<THREE.Group>(null);
  const intensityRef = useRef<THREE.Group>(null);
  const readoutRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (paused || !isMotionEnabled(reduceMotion)) return;
    progressRef.current = (progressRef.current + delta / 8) % 1;
    const progress = progressRef.current;
    const phase = getIncoherentMilnorPhase(progress);

    if (knotRef.current) {
      knotRef.current.rotation.y += delta * 0.4;
      knotRef.current.rotation.x = Math.sin(progress * Math.PI * 2) * 0.15;
    }

    if (intensityRef.current) {
      const opacity = phase === 'statistical_coherence' ? 0.9 : 0.4;
      intensityRef.current.scale.setScalar(phase === 'dual_encryption' ? 1.2 : 1.0);
    }

    if (readoutRef.current) {
      readoutRef.current.visible = phase === 'dual_encryption';
      if (phase === 'dual_encryption') {
        readoutRef.current.rotation.z += delta * 0.5;
      }
    }
  });

  return (
    <group>
      {/* 3D Coherence Singularity Knot (μ = 0 Nodal Lines) */}
      <group ref={knotRef} position={[-0.9, 0, 0]}>
        <Instances limit={trefoilPoints.length} range={trefoilPoints.length}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.5} />
          {trefoilPoints.map((pos, idx) => (
            <Instance key={idx} position={pos} />
          ))}
        </Instances>
        <mesh>
          <torusKnotGeometry args={[0.7, 0.15, 96, 16, 2, 3]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>
        <Text position={[0, 1.25, 0]} color="#38bdf8" fontSize={0.14} anchorX="center">
          COHERENCE SINGULARITY (μ = 0)
        </Text>
      </group>

      {/* Bright Speckle-Free Background Intensity Field */}
      <group ref={intensityRef} position={[0.9, 0, 0]}>
        <Instances limit={intensityGrid.length} range={intensityGrid.length}>
          <boxGeometry args={[0.42, 0.42, 0.05]} />
          <meshStandardMaterial color="#ffb627" emissive="#ff6b1a" emissiveIntensity={1.0} />
          {intensityGrid.map((pos, idx) => (
            <Instance key={idx} position={pos} />
          ))}
        </Instances>
        <Text position={[0, 1.25, 0]} color="#ffb627" fontSize={0.14} anchorX="center">
          UNIFORM INTENSITY
        </Text>
      </group>

      {/* Dual Payload Readout (Braid Key + Coherence State) */}
      <group ref={readoutRef} position={[0, -0.2, 0.4]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f43f5e" wireframe emissive="#e11d48" emissiveIntensity={1.2} />
        </mesh>
        <Text position={[0, 0.5, 0]} color="#f43f5e" fontSize={0.13} anchorX="center">
          DUAL PAYLOAD (l ≈ 2.8e12)
        </Text>
      </group>
    </group>
  );
}

export default function IncoherentMilnorScene({
  height = 'h-96',
  interactive = false,
}: {
  height?: string;
  interactive?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(prefersReducedMotion);

  return (
    <div>
      <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 0.4, 4.2], fov: 48 }}>
        <color attach="background" args={['#050505']} />
        <R3FEnvironment starsCount={1600} paused={paused} />
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 4]} intensity={2} color="#38bdf8" />
        <pointLight position={[-3, 1, -2]} intensity={1.2} color="#ffb627" />
        <MilnorMechanism paused={paused} reduceMotion={prefersReducedMotion} />
        <R3FControls interactive={interactive} />
      </R3FCanvas>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-parchment-2">
          Incoherent Milnor Polynomials embed 3D topological knots into zero-coherence singularities while intensity remains bright and uniform.
        </p>
        <ExhibitControl
          label={paused ? 'Resume animation' : 'Pause animation'}
          paused={paused}
          onToggle={() => setPaused((v) => !v)}
        />
      </div>
      <p className="sr-only">
        Incoherent Milnor Polynomial Structured Light exhibit: 3D zero-coherence trefoil knot embedded in a uniform bright intensity field with dual payload encryption.
      </p>
    </div>
  );
}
