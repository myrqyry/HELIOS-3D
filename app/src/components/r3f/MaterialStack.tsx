import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls } from './R3FCanvas';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function Stack() {
  const group = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (group.current) group.current.rotation.y += delta * 0.2;
  });

  const layers = [
    { y: 0.9, color: '#ff6b1a', label: 'EuS (top)' },
    { y: 0.0, color: '#7dd3fc', label: 'Bi₂Se₃ (TI)' },
    { y: -0.9, color: '#ff6b1a', label: 'EuS (bottom)' },
  ];

  return (
    <group ref={group}>
      {layers.map((l) => (
        <group key={l.label} position={[0, l.y, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 0.5, 2.4]} />
            <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={0.2} />
          </mesh>
          <Billboard position={[1.6, 0, 0]}>
            <Text fontSize={0.18} color="#f4e8d8" anchorX="left" anchorY="middle">
              {l.label}
            </Text>
          </Billboard>
        </group>
      ))}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function MaterialStackScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  return (
    <R3FCanvas height={height} className="bg-obsidian-2" camera={{ position: [3, 1.5, 3.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffb627" />
      <Stack />
      <R3FControls interactive={interactive} />
    </R3FCanvas>
  );
}
