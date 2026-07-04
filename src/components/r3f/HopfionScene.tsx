import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { R3FCanvas, R3FControls } from './R3FCanvas';

function Hopfion() {
  const group = useRef<THREE.Group>(null);

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
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.5} />
        </mesh>
      ))}
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
  return (
    <R3FCanvas height={height} className="bg-obsidian-2" camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffb627" />
      <pointLight position={[-5, -3, -2]} intensity={0.6} color="#7dd3fc" />
      <Hopfion />
      <R3FControls interactive={interactive} />
    </R3FCanvas>
  );
}

