import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

function NeelSkyrmion() {
  const group = useRef<THREE.Group>(null);
  
  const arrows = useMemo(() => {
    const arr = [];
    const layers = 5;
    const count = 12;
    for (let l = 1; l <= layers; l++) {
      const radius = l * 0.3;
      const num = count * l;
      for (let i = 0; i < num; i++) {
        const angle = (i / num) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // Néel texture: spin rotates from Down (-Z) at center to Up (+Z) at edge
        // Radial component is non-zero
        const rotationAngle = (radius / (layers * 0.3)) * Math.PI;
        const dir = new THREE.Vector3(
          Math.cos(angle) * Math.sin(rotationAngle),
          Math.sin(angle) * Math.sin(rotationAngle),
          -Math.cos(rotationAngle)
        );
        
        arr.push({ pos: [x, y, 0], dir: dir.toArray(), color: l === 1 ? '#ff6b1a' : '#7dd3fc' });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Confinement Boundary */}
      <mesh>
        <ringGeometry args={[1.6, 1.7, 64]} />
        <meshStandardMaterial color="#f4e8d8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Background Disk */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.6, 64]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.5} />
      </mesh>

      {/* Spin Vectors */}
      {arrows.map((a, i) => (
        <group key={i} position={a.pos as [number, number, number]}>
          <mesh rotation={new THREE.Euler().setFromVector3(new THREE.Vector3(...a.dir))}>
            <coneGeometry args={[0.03, 0.12, 12]} />
            <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SkyrmionScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  return (
    <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 0, 4], fov: 50 }}>
      <color attach="background" args={['#050505']} />
      <R3FEnvironment starsCount={3000} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#7dd3fc" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff6b1a" />
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <NeelSkyrmion />
      </Float>
      <R3FControls interactive={interactive} />
    </R3FCanvas>
  );
}

