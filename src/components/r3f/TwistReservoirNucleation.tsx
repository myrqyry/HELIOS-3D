import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Twist() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (group.current) group.current.rotation.z += d * 0.6; });
  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, (i * Math.PI) / 8]}>
          <torusGeometry args={[1.0 + i * 0.08, 0.04, 8, 64]} />
          <meshStandardMaterial color={i < 4 ? '#ff6b1a' : '#ffd166'} emissive={i < 4 ? '#ff6b1a' : '#ffd166'} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function TwistReservoirNucleationScene({ height = 'h-72' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.0} color="#ffb627" />
        <Twist />
      </Canvas>
    </div>
  );
}
