import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ExhibitControl } from '../exhibit/ExhibitControl';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

export type ReservoirPhase = 'input' | 'reservoir' | 'readout';

export function getReservoirPhase(progress: number): ReservoirPhase {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.2) return 'input';
  if (clamped < 0.8) return 'reservoir';
  return 'readout';
}

type Point = { position: [number, number, number]; color: string };

const FIELD_POINTS: Point[] = Array.from({ length: 48 }, (_, index) => {
  const column = index % 8;
  const row = Math.floor(index / 8);
  const x = (column - 3.5) * 0.27;
  const z = (row - 2.5) * 0.27;
  return {
    position: [x, Math.sin((column + row) * 0.8) * 0.08, z],
    color: row % 2 === 0 ? '#7dd3fc' : '#ffb627',
  };
});

const PULSE_POINTS: Point[] = [0, 1, 2].map((index) => ({
  position: [-1.75 - index * 0.24, 0, (index - 1) * 0.32],
  color: '#ff6b1a',
}));

function ReservoirField({ paused, reduceMotion }: { paused: boolean; reduceMotion: boolean }) {
  const progressRef = useRef(0.35);
  const inputRef = useRef<THREE.Group>(null);
  const reservoirRef = useRef<THREE.Group>(null);
  const readoutRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (paused || !isMotionEnabled(reduceMotion)) return;

    progressRef.current = (progressRef.current + delta / 8) % 1;
    const progress = progressRef.current;
    const phase = getReservoirPhase(progress);
    const inputProgress = Math.min(progress / 0.2, 1);
    const readoutProgress = Math.max((progress - 0.8) / 0.2, 0);

    if (inputRef.current) {
      inputRef.current.position.x = -0.15 + inputProgress * 1.1;
      inputRef.current.scale.setScalar(phase === 'input' ? 1.15 : 0.7);
    }
    if (reservoirRef.current) {
      reservoirRef.current.rotation.y = Math.sin(progress * Math.PI * 2) * 0.12;
      reservoirRef.current.scale.setScalar(phase === 'reservoir' ? 1.08 : 0.92);
    }
    if (readoutRef.current) {
      readoutRef.current.scale.y = 0.35 + readoutProgress * 0.65;
      readoutRef.current.position.x = 1.15 + readoutProgress * 0.2;
    }
  });

  return (
    <group>
      <group ref={inputRef}>
        <Instances limit={PULSE_POINTS.length} range={PULSE_POINTS.length}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial emissive="#ff6b1a" emissiveIntensity={1.2} />
          {PULSE_POINTS.map((point, index) => (
            <Instance key={index} position={point.position} color={point.color} />
          ))}
        </Instances>
        <Text position={[-0.45, 0.52, 0]} color="#ffb627" fontSize={0.16} anchorX="center">
          INPUT
        </Text>
      </group>

      <group ref={reservoirRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.35, 1.8]} />
          <meshStandardMaterial color="#0d2530" transparent opacity={0.75} />
        </mesh>
        <Instances limit={FIELD_POINTS.length} range={FIELD_POINTS.length}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial emissive="#7dd3fc" emissiveIntensity={0.8} />
          {FIELD_POINTS.map((point, index) => (
            <Instance key={index} position={point.position} color={point.color} />
          ))}
        </Instances>
        <Text position={[0, 0.55, 0]} color="#7dd3fc" fontSize={0.16} anchorX="center">
          RESERVOIR
        </Text>
      </group>

      <group ref={readoutRef} position={[1.15, 0, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.1, 0.75, 0.1]} />
          <meshStandardMaterial color="#ffb627" emissive="#ffb627" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0.18, -0.06, 0]}>
          <boxGeometry args={[0.1, 0.42, 0.1]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={1} />
        </mesh>
        <Text position={[0, 0.55, 0]} color="#ffb627" fontSize={0.16} anchorX="center">
          READOUT
        </Text>
      </group>
    </group>
  );
}

export default function BrownianReservoirScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(prefersReducedMotion);

  return (
    <div>
      <div className="relative">
        <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 1.2, 4.5], fov: 50 }}>
          <color attach="background" args={['#050505']} />
          <R3FEnvironment starsCount={3000} />
          <pointLight position={[3, 3, 4]} intensity={2} color="#ffb627" />
          <pointLight position={[-3, 1, -2]} intensity={1.2} color="#38bdf8" />
          <ReservoirField paused={paused} reduceMotion={prefersReducedMotion} />
          <R3FControls interactive={interactive} />
        </R3FCanvas>
        <div className="absolute left-3 top-3 rounded bg-obsidian/80 px-2 py-1 font-mono text-xs text-parchment-2" aria-label="Reservoir phases">
          INPUT → RESERVOIR → READOUT
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-parchment-2">A training sequence: pulses enter, Brownian relaxation mixes them, and the readout samples the resulting state.</p>
        <ExhibitControl label={paused ? 'Resume training' : 'Pause training'} paused={paused} onToggle={() => setPaused((value) => !value)} />
      </div>
      <p className="sr-only">Static fallback: input pulses enter a field of reservoir elements, relax through the reservoir, and produce a readout signal. Animation is frozen when reduced motion is preferred.</p>
    </div>
  );
}
