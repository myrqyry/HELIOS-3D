import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function SpinField() {
  const group = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const arrows = useMemo(() => {
    const arr = [];
    const N = 8;
    const up = new THREE.Vector3(0, 1, 0);
    const tempDir = new THREE.Vector3();
    const tempQ = new THREE.Quaternion();
    const tempEuler = new THREE.Euler();

    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        const px = (x - N / 2) * 0.4;
        const pz = (z - N / 2) * 0.4;
        const dist = Math.sqrt(px * px + pz * pz);
        
        const phi = Math.atan2(pz, px);
        const tiltAngle = Math.min(dist * 1.5, Math.PI);
        tempDir.set(
          Math.cos(phi) * Math.sin(tiltAngle),
          Math.cos(tiltAngle),
          Math.sin(phi) * Math.sin(tiltAngle)
        ).normalize();
        
        tempQ.setFromUnitVectors(up, tempDir);
        tempEuler.setFromQuaternion(tempQ);

        arr.push({ 
          pos: [px, 0.2, pz], 
          rotation: [tempEuler.x, tempEuler.y, tempEuler.z] as [number, number, number], 
          color: '#ff6b1a' 
        });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;
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
          <mesh rotation={a.rotation}>
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

export default function DmiChiralityScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [2, 2, 2], fov: 50 }}>
      <color attach="background" args={['#080808']} />
      <R3FEnvironment starsCount={3000} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b1a" />
      <Float enabled={!prefersReducedMotion} speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <SpinField />
      </Float>
      <R3FControls interactive={interactive} />
    </R3FCanvas>
  );
}
