import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

function HallmarkArrows() {
  const arrows = useMemo(() => [
    { pos: [1.2, 0.2, 0], dir: [0, 1, 0], color: '#7dd3fc', label: 'σ_xz^Ly' },
    { pos: [-1.2, -0.2, 0], dir: [0, -1, 0], color: '#7dd3fc', label: 'σ_xz^Ly' },
    { pos: [0, 1.2, 0.2], dir: [0, 0, 1], color: '#ff6b1a', label: 'σ_yz^Lx' },
    { pos: [0, -1.2, -0.2], dir: [0, 0, -1], color: '#ff6b1a', label: 'σ_yz^Lx' },
  ], []);

  return (
    <group>
      {arrows.map((a, i) => (
        <group key={i} position={a.pos as [number, number, number]}>
          <mesh rotation={new THREE.Euler().setFromVector3(new THREE.Vector3(...a.dir))}>
            <coneGeometry args={[0.08, 0.2, 16]} />
            <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={2} />
          </mesh>
          <Billboard position={[0, 0.3, 0]}>
            <Text fontSize={0.12} color="#f4e8d8" anchorX="center" anchorY="middle">
              {a.label}
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

function Hall() {
  const group = useRef<THREE.Group>(null);
  
  const currentLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = 0; i < 16; i++) {
      const line: THREE.Vector3[] = [];
      const offset = (i / 16) * Math.PI * 2;
      for (let j = 0; j < 50; j++) {
        const t = (j / 50) * 4 - 2;
        const x = t;
        const y = 0.2 * Math.sin(t * 3 + offset);
        const z = 0.2 * Math.cos(t * 3 + offset);
        line.push(new THREE.Vector3(x, y, z));
      }
      lines.push(line);
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Central Hopfion Ring */}
      <mesh>
        <torusKnotGeometry args={[0.8, 0.2, 128, 16, 2, 3]} />
        <meshStandardMaterial 
          color="#ffb627" 
          emissive="#ffb627" 
          emissiveIntensity={0.5} 
          wireframe 
        />
      </mesh>
      
      {/* 3D Orbital Currents */}
      {currentLines.map((line, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(line);
        return (
          <primitive key={i} object={new THREE.Line(geom, new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3 }))} />
        );
      })}

      <HallmarkArrows />
    </group>
  );
}

export default function TopologicalOrbitalHallScene({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-1 overflow-hidden`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7dd3fc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff6b1a" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Hall />
        </Float>
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
