import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { CognitiveLayer } from '../../../data/layeredKnowledge';
import { isMotionEnabled, usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

interface EnhancedSubsystemProps {
  layer: CognitiveLayer;
  isFocused?: boolean;
  paused?: boolean;
  params?: Record<string, number>;
  pulseTrigger?: number;
  onNodeClick?: () => void;
}

/**
 * ENHANCED MATERIAL STACK (Subsystem 02)
 * Exploded precision instrument heterostructure (EuS / Bi₂Se₃ / EuS),
 * glowing double Dirac cone exhibiting gapless topological surface states,
 * interfacial DMI chiral spin-canting arrows, and gold wirebond interconnects.
 */
export default function EnhancedMaterialStack({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const diracTopRef = useRef<THREE.Mesh>(null);
  const diracBottomRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const dmi = params.dmi ?? 2.4;
  const anisotropy = params.anisotropy ?? 0.85;

  // Interfacial DMI Spin Vector Arrays at the top and bottom interfaces
  const dmiVectors = useMemo(() => {
    const vectors: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.85;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      // Chiral canting angle
      vectors.push({
        pos: [x, 0.42, z],
        rot: [0.35, angle + Math.PI / 2, 0],
      });
      vectors.push({
        pos: [x, -0.42, z],
        rot: [-0.35, angle - Math.PI / 2, 0],
      });
    }
    return vectors;
  }, []);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }

    if (diracTopRef.current && diracBottomRef.current) {
      diracTopRef.current.rotation.y += delta * 0.5;
      diracBottomRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Exploded Top Layer: EuS Ferromagnetic Insulator Slab */}
      <group position={[0, 0.82, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 0.22, 2.5]} />
          <meshStandardMaterial
            color="#ff6b1a"
            emissive="#cc4f10"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        <Billboard position={[1.65, 0, 0]}>
          <Text fontSize={0.13} color="#ff6b1a" anchorX="left">
            {'EuS (Top Ferromagnetic Insulator)'}
          </Text>
        </Billboard>
      </group>

      {/* 2. Top Hetero-interface Interfacial DMI Vectors */}
      {dmiVectors.slice(0, 12).map((v, i) => (
        <group key={`top-dmi-${i}`} position={v.pos} rotation={v.rot}>
          <mesh>
            <coneGeometry args={[0.035, 0.14, 8]} />
            <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={1.8} />
          </mesh>
        </group>
      ))}

      {/* 3. Middle Layer: Bi₂Se₃ 3D Topological Insulator with Luminous Dirac Surface */}
      <group position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 0.26, 2.7]} />
          <meshStandardMaterial
            color="#133e54"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Glowing Double Dirac Cone (E = ± ħ v_F |k|) */}
        <group position={[0, 0, 0]}>
          {/* Upper Cone (Conduction Band) */}
          <mesh ref={diracTopRef} position={[0, 0.16, 0]}>
            <coneGeometry args={[0.28, 0.32, 16, 1, true]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.2}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Lower Cone (Valence Band) */}
          <mesh ref={diracBottomRef} position={[0, -0.16, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.28, 0.32, 16, 1, true]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.2}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Dirac Point (Crossing Node) */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffd166" emissiveIntensity={4.0} />
          </mesh>
        </group>

        <Billboard position={[1.65, 0, 0]}>
          <Text fontSize={0.13} color="#7dd3fc" anchorX="left">
            {'Bi₂Se₃ (3D Topological Insulator)'}
          </Text>
        </Billboard>
      </group>

      {/* 4. Bottom Hetero-interface Interfacial DMI Vectors */}
      {dmiVectors.slice(12, 24).map((v, i) => (
        <group key={`bot-dmi-${i}`} position={v.pos} rotation={v.rot}>
          <mesh>
            <coneGeometry args={[0.035, 0.14, 8]} />
            <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={1.8} />
          </mesh>
        </group>
      ))}

      {/* 5. Exploded Bottom Layer: EuS Ferromagnetic Insulator Substrate */}
      <group position={[0, -0.82, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 0.22, 2.5]} />
          <meshStandardMaterial
            color="#ff6b1a"
            emissive="#cc4f10"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        <Billboard position={[1.65, 0, 0]}>
          <Text fontSize={0.13} color="#ff6b1a" anchorX="left">
            {'EuS (Bottom Ferromagnetic Insulator)'}
          </Text>
        </Billboard>
      </group>

      {/* 6. Gold Wirebond Interconnect Leads linking the heterostructure */}
      {[
        [[-1.2, 0.82, 1.2], [-1.4, 0, 1.4], [-1.2, -0.82, 1.2]],
        [[1.2, 0.82, -1.2], [1.4, 0, -1.4], [1.2, -0.82, -1.2]],
      ].map((pts, idx) => (
        <Line
          key={idx}
          points={pts as [number, number, number][]}
          color="#ffd166"
          lineWidth={2.2}
        />
      ))}

      {/* 7. Material Stack Metric HUD Billboard */}
      <Billboard position={[0, 1.4, 0]}>
        <group>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.5, 0.42]} />
            <meshBasicMaterial color="#0b0914" transparent opacity={0.88} />
          </mesh>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.125}
            color="#ffd166"
            anchorX="center"
            anchorY="middle"
          >
            {`Interfacial DMI D = ${dmi.toFixed(2)} mJ/m² (Chiral Twist)`}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.092}
            color="#7dd3fc"
            anchorX="center"
            anchorY="middle"
          >
            {'Gapless Dirac Surface States (Spin-Momentum Locking)'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
