import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Line, Instances, Instance } from '@react-three/drei';
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
 * ENHANCED HOPFION SOLITON KNOT (Subsystem 01)
 * Denser magnetic field structure with 96-node spin instances,
 * interlocking Villarceau Hopf fibration circles (S³ -> S²),
 * chiral DMI surface spin vectors, and rich harmonic breathing motion.
 */
export default function EnhancedHopfion({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseScale = useRef(1);
  const lastPulseTrigger = useRef(pulseTrigger);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const dmi = params.dmi ?? 2.4;
  const current = params.current ?? 2.5;

  // 1. Dense Toroidal Knot coordinates (p=2, q=3) with 96 points for particle lattice
  const knotPoints = useMemo(() => {
    const arr: [number, number, number][] = [];
    const count = 96;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = 0.95 + 0.36 * Math.cos(3 * t);
      const x = r * Math.cos(2 * t);
      const y = r * Math.sin(2 * t);
      const z = 0.58 * Math.sin(3 * t);
      arr.push([x, y, z]);
    }
    return arr;
  }, []);

  // 2. Interlocking Villarceau / Hopf Fibration Pre-image Linking Rings (S³ -> S²)
  const fiberRings = useMemo(() => {
    const rings: Array<[number, number, number][]> = [];
    const numFibers = 8;
    for (let f = 0; f < numFibers; f++) {
      const ringPts: [number, number, number][] = [];
      const phaseOffset = (f / numFibers) * Math.PI * 2;
      for (let i = 0; i <= 44; i++) {
        const phi = (i / 44) * Math.PI * 2;
        const R = 0.92;
        const r = 0.32;
        const theta = phi + phaseOffset;
        const x = (R + r * Math.cos(theta)) * Math.cos(phi);
        const y = (R + r * Math.cos(theta)) * Math.sin(phi);
        const z = r * Math.sin(theta);
        ringPts.push([x, y, z]);
      }
      rings.push(ringPts);
    }
    return rings;
  }, []);

  // 3. Surface spin vector arrows canted by chiral DMI
  const spinVectors = useMemo(() => {
    const items = [];
    const N = 32;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const rad = 0.92;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;
      const z = Math.sin(angle * 3) * 0.28;
      const tangent = [-Math.sin(angle), Math.cos(angle), 0.35 * Math.cos(angle * 3)];
      items.push({ pos: [x, y, z] as [number, number, number], dir: tangent });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;
    const speed = 0.35 + current * 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.14;
      groupRef.current.rotation.z = Math.cos(t * 0.35) * 0.08;
    }

    // Pulse trigger animation
    if (pulseTrigger !== lastPulseTrigger.current) {
      lastPulseTrigger.current = pulseTrigger;
      pulseScale.current = 1.38;
    }
    pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1, delta * 5);

    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulseScale.current);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Luminous Central Solitonic Torus Knot */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[0.92, 0.26, 144, 28, 2, 3]} />
        <meshStandardMaterial
          color="#ff6b1a"
          emissive="#ff6b1a"
          emissiveIntensity={1.2}
          roughness={0.22}
          metalness={0.82}
        />
      </mesh>

      {/* 2. Denser Magnetic Field Lattice: 96 Spherical Spin Texture Instances */}
      <Instances limit={knotPoints.length} range={knotPoints.length}>
        <sphereGeometry args={[0.048, 12, 12]} />
        <meshStandardMaterial
          color="#ffd166"
          emissive="#ffb627"
          emissiveIntensity={1.8}
        />
        {knotPoints.map((pos, idx) => (
          <Instance key={idx} position={pos} />
        ))}
      </Instances>

      {/* 3. Outer Translucent Breather Envelope */}
      <mesh scale={1.16}>
        <torusKnotGeometry args={[0.92, 0.3, 72, 18, 2, 3]} />
        <meshStandardMaterial
          color="#ffb627"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 4. Interlocking Villarceau / Hopf Fibration Linking Rings */}
      <group>
        {fiberRings.map((ring, idx) => (
          <Line
            key={idx}
            points={ring}
            color={idx % 2 === 0 ? '#38bdf8' : '#ffd166'}
            lineWidth={2.2}
            transparent
            opacity={0.78}
          />
        ))}
      </group>

      {/* 5. Chiral Surface Spin Vectors (Arrow Cones) */}
      <group>
        {spinVectors.map((v, i) => (
          <group key={i} position={v.pos}>
            <mesh>
              <coneGeometry args={[0.045, 0.16, 8]} />
              <meshStandardMaterial
                color={dmi > 1.8 ? '#7dd3fc' : '#ff6b1a'}
                emissive={dmi > 1.8 ? '#38bdf8' : '#cc4f10'}
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Topological HUD Banner */}
      <Billboard position={[0, 1.48, 0]}>
        <group>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.4, 0.4]} />
            <meshBasicMaterial color="#0b0914" transparent opacity={0.88} />
          </mesh>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.13}
            color="#ffd166"
            anchorX="center"
            anchorY="middle"
          >
            {'Q_H = 1.00 (Hopf Invariant π₃(S²) ≅ ℤ)'}
          </Text>
          <Text
            position={[0, -0.08, 0]}
            fontSize={0.095}
            color="#7dd3fc"
            anchorX="center"
            anchorY="middle"
          >
            {'Faddeev-Skyrme Energy Barrier E_b ≈ 48 k_B T'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
