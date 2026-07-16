import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ExhibitControl } from '../exhibit/ExhibitControl';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

export type StabilizerPhase = 'competing' | 'stabilizing' | 'coherent';

export function getStabilizerPhase(progress: number): StabilizerPhase {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.3) return 'competing';
  if (clamped < 0.75) return 'stabilizing';
  return 'coherent';
}

type DirectionalElement = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const ELEMENT_COUNT = 16;
const UP = new THREE.Vector3(0, 1, 0);

function rotationForDirection(direction: THREE.Vector3): [number, number, number] {
  const quaternion = new THREE.Quaternion().setFromUnitVectors(UP, direction.normalize());
  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  return [euler.x, euler.y, euler.z];
}

function createElements(): {
  competing: DirectionalElement[];
  stabilizing: DirectionalElement[];
  coherent: DirectionalElement[];
} {
  return Array.from({ length: ELEMENT_COUNT }, (_, index) => {
    const angle = (index / ELEMENT_COUNT) * Math.PI * 2;
    const position: [number, number, number] = [Math.cos(angle) * 0.85, 0, Math.sin(angle) * 0.85];
    const tangent = new THREE.Vector3(-Math.sin(angle), 0.25, Math.cos(angle));
    const competing = new THREE.Vector3(Math.cos(index * 2.7), 0.55, Math.sin(index * 1.9));
    const stabilizing = tangent.clone().lerp(competing, 0.35);

    return {
      position,
      rotation: rotationForDirection(competing),
      stabilizingRotation: rotationForDirection(stabilizing),
      coherentRotation: rotationForDirection(tangent),
    };
  }).reduce(
    (groups, element) => {
      groups.competing.push({ position: element.position, rotation: element.rotation });
      groups.stabilizing.push({ position: element.position, rotation: element.stabilizingRotation });
      groups.coherent.push({ position: element.position, rotation: element.coherentRotation });
      return groups;
    },
    { competing: [], stabilizing: [], coherent: [] } as {
      competing: DirectionalElement[];
      stabilizing: DirectionalElement[];
      coherent: DirectionalElement[];
    },
  );
}

const ELEMENTS = createElements();

function DirectionalField({ paused, reduceMotion }: { paused: boolean; reduceMotion: boolean }) {
  const progressRef = useRef(reduceMotion ? 1 : 0);
  const competingRef = useRef<THREE.Group>(null);
  const stabilizingRef = useRef<THREE.Group>(null);
  const coherentRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (paused || !isMotionEnabled(reduceMotion)) return;
    progressRef.current = (progressRef.current + delta / 9) % 1;
    const progress = progressRef.current;
    const competing = Math.max(0, 1 - progress / 0.3);
    const stabilizing = Math.max(0, 1 - Math.abs(progress - 0.525) / 0.3);
    const coherent = Math.max(0, (progress - 0.6) / 0.4);

    competingRef.current?.scale.setScalar(0.05 + competing * 0.95);
    stabilizingRef.current?.scale.setScalar(0.05 + stabilizing * 0.95);
    coherentRef.current?.scale.setScalar(0.05 + coherent * 0.95);
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.25, 48]} />
        <meshStandardMaterial color="#12303b" transparent opacity={0.8} />
      </mesh>
      <group ref={competingRef} scale={reduceMotion ? 0 : 0.05}>
        <Instances limit={ELEMENT_COUNT} range={ELEMENT_COUNT}>
          <coneGeometry args={[0.055, 0.32, 8]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={1.4} />
          {ELEMENTS.competing.map((element, index) => <Instance key={index} {...element} />)}
        </Instances>
      </group>
      <group ref={stabilizingRef} scale={reduceMotion ? 0 : 0.05}>
        <Instances limit={ELEMENT_COUNT} range={ELEMENT_COUNT}>
          <coneGeometry args={[0.055, 0.32, 8]} />
          <meshStandardMaterial color="#ffb627" emissive="#ffb627" emissiveIntensity={1.4} />
          {ELEMENTS.stabilizing.map((element, index) => <Instance key={index} {...element} />)}
        </Instances>
      </group>
      <group ref={coherentRef} scale={1}>
        <Instances limit={ELEMENT_COUNT} range={ELEMENT_COUNT}>
          <coneGeometry args={[0.055, 0.32, 8]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={1.4} />
          {ELEMENTS.coherent.map((element, index) => <Instance key={index} {...element} />)}
        </Instances>
      </group>
      <Text position={[0, 1.55, 0]} color="#f5ead7" fontSize={0.16} anchorX="center">
        COMPETING → STABILIZING → COHERENT
      </Text>
    </group>
  );
}

export default function DmiStabilizerScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(prefersReducedMotion);

  return (
    <div>
      <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 2.1, 4.2], fov: 48 }}>
        <color attach="background" args={['#050505']} />
        <R3FEnvironment starsCount={1800} />
        <pointLight position={[3, 3, 4]} intensity={2} color="#7dd3fc" />
        <pointLight position={[-3, 1, -2]} intensity={1.2} color="#ff6b1a" />
        <DirectionalField paused={paused} reduceMotion={prefersReducedMotion} />
        <R3FControls interactive={interactive} />
      </R3FCanvas>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-parchment-2">
          Competing spin directions resolve into a coherent twist; DMI helps hold the knot together.
        </p>
        <ExhibitControl label={paused ? 'Resume sequence' : 'Pause sequence'} paused={paused} onToggle={() => setPaused((value) => !value)} />
      </div>
      <p className="sr-only">Static fallback: competing spin directions settle into a stabilizing arrangement and then a coherent chiral field. Reduced motion freezes the coherent state.</p>
    </div>
  );
}
