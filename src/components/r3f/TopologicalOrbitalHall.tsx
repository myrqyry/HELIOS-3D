import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Hall() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (group.current) group.current.rotation.x += d * 0.3; });
  const lines: THREE.Vector3[][] = [];
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 4;
    const line: THREE.Vector3[] = [];
    for (let j = 0; j < 30; j++) {
      const u = j / 30;
      const r = 0.4 + 0.8 * u;
      const x = r * Math.cos(t + u * 6);
      const y = r * Math.sin(t + u * 6);
      const z = (u - 0.5) * 2;
      line.push(new THREE.Vector3(x, y, z));
    }
    lines.push(line);
  }
  return (
    <group ref={group}>
      {lines.map((line, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(line);
        return (
          <line key={i} geometry={geom}>
            <lineBasicMaterial color="#7dd3fc" transparent opacity={0.7} />
          </line>
        );
      })}
    </group>
  );
}

export default function TopologicalOrbitalHallScene({ height = 'h-72' }: { height?: string }) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Hall />
      </Canvas>
    </div>
  );
}
