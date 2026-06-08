import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function SpinField() {
  const group = useRef<THREE.Group>(null);
  
  const arrows = useMemo(() => {
    const arr = [];
    const N = 8;
    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        const px = (x - N / 2) * 0.4;
        const pz = (z - N / 2) * 0.4;
        const dist = Math.sqrt(px * px + pz * pz);
        
        // Chirality: spin rotates based on distance from center
        const angle = dist * 2.5;
        const dir = new THREE.Vector3(Math.sin(angle), Math.cos(angle), 0);
        arr.push({ pos: [px, 0.2, pz], dir: dir.toArray(), color: '#ff6b1a' });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Interface Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>

      {/* Spin Arrows */}
      {arrows.map((a, i) => (
        <group key={i} position={a.pos as [number, number, number]}>
          <mesh rotation={new THREE.Euler().setFromVector3(new THREE.Vector3(...a.dir))}>
            <coneGeometry args={[0.04, 0.15, 12]} />
            <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={1} />
          </mesh>
          <mesh position={[0, -0.075, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.15]} />
            <meshStandardMaterial color={a.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function DmiChiralityScene({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-1 overflow-hidden`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[2, 2, 2]} />
        <color attach="background" args={['#080808']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b1a" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <SpinField />
        </Float>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
