import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Skyrmion() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.4; });
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.4, 0.2, 16, 64]} />
        <meshStandardMaterial color="#ff6b1a" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function SkyrmionScene({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffb627" />
        <Skyrmion />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
