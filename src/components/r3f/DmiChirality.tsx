import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ChiralArrows() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (group.current) group.current.rotation.y += d * 0.5; });
  const arrows = [];
  const N = 6;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    arrows.push(
      <mesh key={i} position={[Math.cos(a) * 1.5, Math.sin(a) * 0.5, Math.sin(a) * 1.5]} rotation={[0, -a, 0]}>
        <coneGeometry args={[0.15, 0.4, 12]} />
        <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.4} />
      </mesh>
    );
  }
  return <group ref={group}>{arrows}</group>;
}

export default function DmiChiralityScene({ height = 'h-72' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.0} color="#ffb627" />
        <ChiralArrows />
      </Canvas>
    </div>
  );
}
