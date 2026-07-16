import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ExhibitControl } from '../exhibit/ExhibitControl';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

export type ScalePhase = 'Knot' | 'Cell' | 'Layer' | '3D array';

export function getScalePhase(progress: number): ScalePhase {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.25) return 'Knot';
  if (clamped < 0.5) return 'Cell';
  if (clamped < 0.75) return 'Layer';
  return '3D array';
}

const stagePositions: Record<ScalePhase, Array<[number, number, number]>> = {
  Knot: [[0, 0, 0]],
  Cell: [[-0.45, 0, 0], [0.45, 0, 0], [-0.45, 0.45, 0], [0.45, 0.45, 0]],
  Layer: Array.from({ length: 9 }, (_, index) => [(index % 3 - 1) * 0.42, (Math.floor(index / 3) - 1) * 0.42, 0] as [number, number, number]),
  '3D array': Array.from({ length: 27 }, (_, index) => [
    (index % 3 - 1) * 0.42,
    (Math.floor(index / 3) % 3 - 1) * 0.42,
    (Math.floor(index / 9) - 1) * 0.42,
  ] as [number, number, number]),
};

const stages: ScalePhase[] = ['Knot', 'Cell', 'Layer', '3D array'];

function ScaleMechanism({ paused, reduceMotion }: { paused: boolean; reduceMotion: boolean }) {
  const progressRef = useRef(reduceMotion ? 1 : 0);
  const stageRefs = useRef<Array<THREE.Group | null>>([]);

  useFrame((_, delta) => {
    if (paused || !isMotionEnabled(reduceMotion)) return;
    progressRef.current = (progressRef.current + delta / 10) % 1;
    const activeIndex = stages.indexOf(getScalePhase(progressRef.current));
    stageRefs.current.forEach((group, index) => {
      if (!group) return;
      const distance = Math.abs(index - activeIndex);
      group.scale.setScalar(distance === 0 ? 1 : Math.max(0.1, 0.5 - distance * 0.15));
    });
  });

  return (
    <group>
      {stages.map((stage, stageIndex) => (
        <group key={stage} ref={(group) => { stageRefs.current[stageIndex] = group; }} position={[(stageIndex - 1.5) * 1.35, 0, 0]} scale={reduceMotion ? (stageIndex === 3 ? 1 : 0.1) : 0.5}>
          <Instances limit={stagePositions[stage].length} range={stagePositions[stage].length}>
            <torusKnotGeometry args={[0.16, 0.045, 24, 6, 2, 3]} />
            <meshStandardMaterial color={stageIndex === 3 ? '#ff6b1a' : '#ffb627'} emissive="#ff6b1a" emissiveIntensity={0.8} />
            {stagePositions[stage].map((position, index) => <Instance key={index} position={position} />)}
          </Instances>
          <Text position={[0, -0.85, 0]} color="#f5ead7" fontSize={0.14} anchorX="center">{stage}</Text>
        </group>
      ))}
    </group>
  );
}

export default function ScaleTransitionScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(prefersReducedMotion);

  return (
    <div>
      <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 1.1, 5.2], fov: 48 }}>
        <color attach="background" args={['#050505']} />
        <R3FEnvironment starsCount={1600} />
        <pointLight position={[3, 3, 4]} intensity={2} color="#ffb627" />
        <pointLight position={[-3, 1, -2]} intensity={1.2} color="#7dd3fc" />
        <ScaleMechanism paused={paused} reduceMotion={prefersReducedMotion} />
        <R3FControls interactive={interactive} />
      </R3FCanvas>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-parchment-2">The same knot is repeated from one cell to a layer and then a 3D array.</p>
        <ExhibitControl label={paused ? 'Resume scaling' : 'Pause scaling'} paused={paused} onToggle={() => setPaused((value) => !value)} />
      </div>
      <p className="sr-only">Static fallback: the sequence labels four scales—Knot, Cell, Layer, and 3D array—and repeats the same magnetic knot at each scale. Reduced motion shows the complete array without animation.</p>
    </div>
  );
}
