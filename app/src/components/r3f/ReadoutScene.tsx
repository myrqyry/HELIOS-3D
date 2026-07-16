import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ExhibitControl } from '../exhibit/ExhibitControl';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

export type ReadoutPhase = 'state' | 'coupling' | 'signal';

export function getReadoutPhase(progress: number): ReadoutPhase {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.45) return 'state';
  if (clamped < 0.7) return 'coupling';
  return 'signal';
}

const magneticState = Array.from({ length: 36 }, (_, index) => {
  const angle = (index / 36) * Math.PI * 2;
  const radius = 0.72 + 0.12 * Math.cos(angle * 2);
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0.25 * Math.sin(angle * 2)] as [number, number, number];
});

function ReadoutMechanism({ paused, reduceMotion }: { paused: boolean; reduceMotion: boolean }) {
  const progressRef = useRef(reduceMotion ? 1 : 0);
  const stateRef = useRef<THREE.Group>(null);
  const couplingRef = useRef<THREE.Group>(null);
  const signalRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (paused || !isMotionEnabled(reduceMotion)) return;
    progressRef.current = (progressRef.current + delta / 7) % 1;
    const progress = progressRef.current;
    const phase = getReadoutPhase(progress);
    const signalProgress = Math.max(0, (progress - 0.7) / 0.3);

    if (stateRef.current) stateRef.current.rotation.y += delta * 0.3;
    if (couplingRef.current) couplingRef.current.scale.setScalar(phase === 'coupling' ? 1 : 0.15);
    if (signalRef.current) signalRef.current.scale.y = 0.15 + signalProgress * 0.85;
  });

  return (
    <group>
      <group ref={stateRef} position={[-1.05, 0, 0]}>
        <Instances limit={magneticState.length} range={magneticState.length}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#ffb627" emissive="#ff6b1a" emissiveIntensity={1.2} />
          {magneticState.map((position, index) => <Instance key={index} position={position} />)}
        </Instances>
        <Text position={[0, 1.05, 0]} color="#ffb627" fontSize={0.15} anchorX="center">MAGNETIC STATE</Text>
      </group>
      <group ref={couplingRef} position={[0, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 1.2, 12]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.4} />
        </mesh>
        <Text position={[0, 0.55, 0]} color="#7dd3fc" fontSize={0.15} anchorX="center">COUPLING</Text>
      </group>
      <group ref={signalRef} position={[1.05, -0.35, 0]}>
        <Instances limit={5} range={5}>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={1.1} />
          {[0.35, 0.55, 0.8, 0.45, 0.68].map((height, index) => (
            <Instance key={index} position={[(index - 2) * 0.2, height / 2, 0]} scale={[1, height, 1]} />
          ))}
        </Instances>
        <Text position={[0, 1.15, 0]} color="#ff6b1a" fontSize={0.15} anchorX="center">SIGNAL</Text>
      </group>
    </group>
  );
}

export default function ReadoutScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(prefersReducedMotion);

  return (
    <div>
      <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 0.6, 4.6], fov: 48 }}>
        <color attach="background" args={['#050505']} />
        <R3FEnvironment starsCount={1600} />
        <pointLight position={[3, 3, 4]} intensity={2} color="#ffb627" />
        <pointLight position={[-3, 1, -2]} intensity={1.2} color="#38bdf8" />
        <ReadoutMechanism paused={paused} reduceMotion={prefersReducedMotion} />
        <R3FControls interactive={interactive} />
      </R3FCanvas>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-parchment-2">One magnetic state becomes one simple candidate electrical or optical signal.</p>
        <ExhibitControl label={paused ? 'Resume readout' : 'Pause readout'} paused={paused} onToggle={() => setPaused((value) => !value)} />
      </div>
      <p className="sr-only">Static fallback: a knotted magnetic state feeds a coupling element and produces a single discrete signal trace. The sequence freezes when reduced motion is preferred.</p>
    </div>
  );
}
