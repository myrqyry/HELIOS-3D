import { useEffect, useRef, useMemo, useState, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { ExhibitControl } from '../exhibit/ExhibitControl';

function Hopfion({ pausedRef }: { pausedRef: RefObject<boolean> }) {
  const group = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const N = 64;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const r = 1 + 0.4 * Math.cos(2 * t);
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = 0.6 * Math.sin(2 * t);
      arr.push(new THREE.Vector3(x, y, z));
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pausedRef.current || !isMotionEnabled(prefersReducedMotion)) return;
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group}>
      <Instances limit={points.length}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.5} />
        {points.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
        <meshStandardMaterial color="#ffb627" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export interface HopfionSceneProps {
  height?: string;
  interactive?: boolean;
}

export default function HopfionScene({ height = 'h-96', interactive = false }: HopfionSceneProps) {
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  return (
    <div>
      <ExhibitControl label={paused ? 'Resume animation' : 'Pause animation'} paused={paused} onToggle={() => setPaused((value) => !value)} />
      <R3FCanvas fallback="A hopfion is a closed, knotted magnetic texture." height={height} className="bg-obsidian-2" camera={{ position: [0, 0, 4], fov: 50 }}>
      <R3FEnvironment paused={paused} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffb627" />
      <pointLight position={[-5, -3, -2]} intensity={0.6} color="#7dd3fc" />
      <Hopfion pausedRef={pausedRef} />
      <R3FControls interactive={interactive} />
      </R3FCanvas>
    </div>
  );
}
