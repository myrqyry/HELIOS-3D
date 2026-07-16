import { useRef, useMemo, useEffect } from 'react';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';
import { directionToEuler } from '../../utils/three';

function HallmarkArrows() {
  const arrows = useMemo(() => {
    const base = [
      { pos: [1.2, 0.2, 0], dir: [0, 1, 0], color: '#7dd3fc', label: 'σ_xz^Ly' },
      { pos: [-1.2, -0.2, 0], dir: [0, -1, 0], color: '#7dd3fc', label: 'σ_xz^Ly' },
      { pos: [0, 1.2, 0.2], dir: [0, 0, 1], color: '#ff6b1a', label: 'σ_yz^Lx' },
      { pos: [0, -1.2, -0.2], dir: [0, 0, -1], color: '#ff6b1a', label: 'σ_yz^Lx' },
    ];
    return base.map((a) => {
      const euler = directionToEuler(new THREE.Vector3(a.dir[0], a.dir[1], a.dir[2]));
      return {
        pos: a.pos,
        dir: a.dir,
        color: a.color,
        label: a.label,
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      };
    });
  }, []);

  return (
    <group>
      {arrows.map((a, i) => (
        <group key={i} position={a.pos as [number, number, number]}>
          <mesh rotation={a.rotation}>
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

  const matRef = useRef<THREE.LineBasicMaterial | null>(null);

  const lineObjects = useMemo(() => {
    matRef.current?.dispose();
    const mat = new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3 });
    matRef.current = mat;
    return currentLines.map((line) => {
      const geom = new THREE.BufferGeometry().setFromPoints(line);
      return new THREE.Line(geom, mat);
    });
  }, [currentLines]);

  useEffect(() => {
    return () => {
      lineObjects.forEach((line) => line.geometry.dispose());
      matRef.current?.dispose();
      matRef.current = null;
    };
  }, [lineObjects]);

  return (
    <group>
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
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <HallmarkArrows />
    </group>
  );
}

export default function TopologicalOrbitalHallScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  return (
    <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [0, 2, 5], fov: 45 }}>
      <color attach="background" args={['#0a0a0a']} />
      <R3FEnvironment starsCount={5000} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#7dd3fc" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff6b1a" />
      <Hall />
      <R3FControls interactive={interactive} autoRotate={!interactive} autoRotateSpeed={0.5} />
    </R3FCanvas>
  );
}

