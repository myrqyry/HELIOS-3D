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
 * ENHANCED MOIRÉ SUPERLATTICE & 3D SCALING (Subsystem 05)
 * Dual twisted crystalline membranes with animated Moiré interference,
 * multi-scale hierarchical expansion (Knot -> Cell -> Layer -> 3D Array),
 * dielectric spacer pillars, and volumetric interconnect bus structure.
 */
export default function EnhancedMoire({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const topMembraneRef = useRef<THREE.Group>(null);
  const bottomMembraneRef = useRef<THREE.Group>(null);
  const arrayRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const twistAngle = params.twist_angle ?? 1.1;

  // 3D Volumetric 3x3x3 array knot positions (from ScaleTransitionScene)
  const arrayPositions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          arr.push([x * 0.44, y * 0.44, z * 0.44]);
        }
      }
    }
    return arr;
  }, []);

  // Grid lines for the top and bottom twisted membranes
  const gridLines = useMemo(() => {
    const lines: Array<[number, number, number][]> = [];
    const size = 1.6;
    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const coord = -size + (i / steps) * (2 * size);
      lines.push([[-size, 0, coord], [size, 0, coord]]);
      lines.push([[coord, 0, -size], [coord, 0, size]]);
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }

    // Dynamic membrane twist oscillation
    const dynamicTwist = (twistAngle * Math.PI) / 180 + Math.sin(t * 0.6) * 0.04;
    if (topMembraneRef.current) {
      topMembraneRef.current.rotation.y = dynamicTwist;
    }
    if (bottomMembraneRef.current) {
      bottomMembraneRef.current.rotation.y = -dynamicTwist;
    }

    // Gentle breathing scale for the 3D array
    if (arrayRef.current) {
      const breathing = 1 + Math.sin(t * 1.2) * 0.04;
      arrayRef.current.scale.setScalar(breathing);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Top Twisted Crystalline Membrane */}
      <group ref={topMembraneRef} position={[0, 0.72, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshStandardMaterial
            color="#221538"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {gridLines.map((pts, i) => (
          <Line
            key={`top-${i}`}
            points={pts}
            color="#a855f7"
            lineWidth={1.5}
            transparent
            opacity={0.65}
          />
        ))}
      </group>

      {/* 2. Bottom Twisted Crystalline Membrane */}
      <group ref={bottomMembraneRef} position={[0, -0.72, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshStandardMaterial
            color="#140e24"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {gridLines.map((pts, i) => (
          <Line
            key={`bot-${i}`}
            points={pts}
            color="#c084fc"
            lineWidth={1.5}
            transparent
            opacity={0.65}
          />
        ))}
      </group>

      {/* 3. Four Corner Dielectric Spacer Posts with Gold Interconnect Rings */}
      {[
        [-1.3, -1.3],
        [1.3, -1.3],
        [-1.3, 1.3],
        [1.3, 1.3],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 0, z]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.045, 1.48, 16]} />
            <meshStandardMaterial color="#3b2d54" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.08, 0.025, 8, 16]} />
            <meshStandardMaterial color="#ffb627" emissive="#ffb627" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* 4. Multi-scale 3D Array: 27 Knots Staged in 3D Volumetric Grid */}
      <group ref={arrayRef}>
        <Instances limit={arrayPositions.length} range={arrayPositions.length}>
          <torusKnotGeometry args={[0.09, 0.028, 36, 8, 2, 3]} />
          <meshStandardMaterial
            color="#ff6b1a"
            emissive="#ff6b1a"
            emissiveIntensity={1.4}
            metalness={0.7}
            roughness={0.25}
          />
          {arrayPositions.map((pos, idx) => (
            <Instance key={idx} position={pos} />
          ))}
        </Instances>

        {/* Inter-knot coupling lattice lines */}
        {[-0.44, 0, 0.44].map((coord, i) => (
          <group key={i}>
            <Line
              points={[[-0.44, coord, 0], [0.44, coord, 0]]}
              color="#ffd166"
              lineWidth={1.2}
              transparent
              opacity={0.4}
            />
            <Line
              points={[[coord, -0.44, 0], [coord, 0.44, 0]]}
              color="#ffd166"
              lineWidth={1.2}
              transparent
              opacity={0.4}
            />
          </group>
        ))}
      </group>

      {/* 5. Moiré Scaling HUD Billboard */}
      <Billboard position={[0, 1.35, 0]}>
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
            {`NaNbO₃ Twist Angle θ = ${twistAngle.toFixed(1)}° (Super-Moiré)`}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.092}
            color="#c084fc"
            anchorX="center"
            anchorY="middle"
          >
            {'Hierarchical 3D Array: 27 Coupled Soliton Units'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
