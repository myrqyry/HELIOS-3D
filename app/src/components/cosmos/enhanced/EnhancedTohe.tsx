import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { CognitiveLayer } from '../../../data/layeredKnowledge';
import { directionToEuler } from '../../../utils/three';
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
 * ENHANCED TOHE READOUT (Subsystem 04)
 * Precision mesoscopic waveguide slab with 3D helical orbital currents,
 * incoming electron beam -> topological interaction zone -> outgoing transverse deflection,
 * hallmark tensor indicators (σ_xz^Ly = -σ_yz^Lx), and dynamic particle trajectories.
 */
export default function EnhancedTohe({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const solitonRef = useRef<THREE.Mesh>(null);
  const incomingParticleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const deflectedPosRefs = useRef<(THREE.Mesh | null)[]>([]);
  const deflectedNegRefs = useRef<(THREE.Mesh | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const orbitalHallAngle = params.orbital_hall_angle ?? 0.48;

  // 16 3D Helical Orbital Current Streamlines around the central interaction chamber
  const currentLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const line: THREE.Vector3[] = [];
      const offset = (i / count) * Math.PI * 2;
      for (let j = 0; j <= 40; j++) {
        const t = (j / 40) * 3.2 - 1.6; // x from -1.6 to 1.6
        // Helical deflection widening as it leaves interaction zone
        const r = 0.22 + 0.12 * Math.exp(Math.abs(t) * 0.4);
        const y = r * Math.sin(t * 3.5 + offset) + (t > 0 ? (i % 2 === 0 ? 0.35 : -0.35) * (t / 1.6) : 0);
        const z = r * Math.cos(t * 3.5 + offset);
        line.push(new THREE.Vector3(t, y, z));
      }
      lines.push(line);
    }
    return lines;
  }, []);

  // Hallmark Tensor Vectors with directional cones and billboard labels
  const hallmarkArrows = useMemo(() => {
    const base = [
      { pos: [0.85, 0.48, 0.35], dir: [0, 1, 0.2], color: '#7dd3fc', label: 'σ_xz^Ly (+L Transverse)' },
      { pos: [-0.85, -0.42, 0.35], dir: [0, -1, -0.2], color: '#7dd3fc', label: 'σ_xz^Ly (-L Transverse)' },
      { pos: [0.85, -0.48, -0.35], dir: [0, -1, 0.2], color: '#ff6b1a', label: 'σ_yz^Lx' },
      { pos: [-0.85, 0.42, -0.35], dir: [0, 1, -0.2], color: '#ff6b1a', label: 'σ_yz^Lx' },
    ];
    return base.map((a) => {
      const euler = directionToEuler(new THREE.Vector3(a.dir[0], a.dir[1], a.dir[2]));
      return {
        ...a,
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.05;
    }

    // Oscillating interaction soliton
    if (solitonRef.current) {
      solitonRef.current.rotation.z += delta * 0.8;
      solitonRef.current.rotation.y += delta * 0.5;
    }

    // Animated incoming particles flowing along -x into central chamber
    incomingParticleRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const progress = (t * 1.6 + i * 0.33) % 1;
        const x = -1.6 + progress * 1.6; // from -1.6 to 0
        mesh.position.set(x, 0.08, 0);
        mesh.scale.setScalar(1 - progress * 0.3);
      }
    });

    // Animated outgoing deflected particles along +y / -y channels
    deflectedPosRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const progress = (t * 1.8 + i * 0.4) % 1;
        const x = progress * 1.5;
        const y = 0.12 + progress * 0.55;
        const z = Math.sin(progress * Math.PI) * 0.25;
        mesh.position.set(x, y, z);
      }
    });

    deflectedNegRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const progress = (t * 1.8 + i * 0.4) % 1;
        const x = progress * 1.5;
        const y = -(0.12 + progress * 0.55);
        const z = -Math.sin(progress * Math.PI) * 0.25;
        mesh.position.set(x, y, z);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Precision Waveguide Substrate Base Plate */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[3.4, 0.08, 1.8]} />
        <meshStandardMaterial color="#0c0a14" roughness={0.7} metalness={0.9} />
      </mesh>

      {/* 2. Metallic Beveled Channel Slab with Chamfered Recess */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[3.2, 0.14, 1.6]} />
        <meshStandardMaterial
          color="#161224"
          roughness={0.24}
          metalness={0.88}
        />
      </mesh>

      {/* 3. Optical Transport Channel Bed */}
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[3.0, 0.02, 0.72]} />
        <meshStandardMaterial
          color="#221b36"
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* 4. Illuminated Outer Perimeter Trim */}
      <Line
        points={[
          [-1.6, -0.14, -0.8],
          [1.6, -0.14, -0.8],
          [1.6, -0.14, 0.8],
          [-1.6, -0.14, 0.8],
          [-1.6, -0.14, -0.8],
        ]}
        color="#c4b5fd"
        lineWidth={2.4}
        transparent
        opacity={0.85}
      />

      {/* 5. Incoming Guide Rails (Left: Source Channel) */}
      <Line
        points={[[-1.55, -0.13, -0.22], [0, -0.13, -0.22]]}
        color="#7dd3fc"
        lineWidth={1.6}
        transparent
        opacity={0.8}
      />
      <Line
        points={[[-1.55, -0.13, 0.22], [0, -0.13, 0.22]]}
        color="#7dd3fc"
        lineWidth={1.6}
        transparent
        opacity={0.8}
      />

      {/* 6. Gold Source and Collector Contact Electrodes */}
      <mesh position={[-1.52, -0.12, 0]}>
        <boxGeometry args={[0.12, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#ffb627"
          emissive="#ffb627"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[1.52, -0.12, 0]}>
        <boxGeometry args={[0.12, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#ffb627"
          emissive="#ffb627"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* 7. Central Topological Interaction Chamber Emissive Well */}
      <mesh position={[0, -0.135, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial
          color="#ff6b1a"
          emissive="#ff6b1a"
          emissiveIntensity={1.4}
          roughness={0.2}
        />
      </mesh>

      {/* 8. Central Rotating Topological Soliton Knot */}
      <mesh ref={solitonRef} position={[0, 0.05, 0]}>
        <torusKnotGeometry args={[0.34, 0.09, 96, 16, 2, 3]} />
        <meshStandardMaterial
          color="#ffd166"
          emissive="#ff6b1a"
          emissiveIntensity={1.8}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* 9. 3D Helical Orbital Current Streamlines (From TopologicalOrbitalHall) */}
      {currentLines.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color={idx % 2 === 0 ? '#38bdf8' : '#ffb627'}
          lineWidth={1.4}
          transparent
          opacity={0.55}
        />
      ))}

      {/* 10. Incoming Particle Stream (Electron current entering from source) */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { incomingParticleRefs.current[i] = el; }}
          position={[-1.2 + i * 0.4, 0.08, 0]}
        >
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#7dd3fc" emissiveIntensity={2.5} />
        </mesh>
      ))}

      {/* 11. Deflected Transverse Particles (+L cyan, -L orange) */}
      {[0, 1].map((i) => (
        <mesh
          key={`pos-${i}`}
          ref={(el) => { deflectedPosRefs.current[i] = el; }}
          position={[0.6 + i * 0.4, 0.35, 0.15]}
        >
          <sphereGeometry args={[0.048, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3.0} />
        </mesh>
      ))}
      {[0, 1].map((i) => (
        <mesh
          key={`neg-${i}`}
          ref={(el) => { deflectedNegRefs.current[i] = el; }}
          position={[0.6 + i * 0.4, -0.35, -0.15]}
        >
          <sphereGeometry args={[0.048, 12, 12]} />
          <meshStandardMaterial color="#ffb627" emissive="#ff6b1a" emissiveIntensity={3.0} />
        </mesh>
      ))}

      {/* 12. Hallmark Directional Indicator Vectors */}
      {hallmarkArrows.map((a, i) => (
        <group key={i} position={a.pos as [number, number, number]}>
          <mesh rotation={a.rotation}>
            <coneGeometry args={[0.07, 0.22, 16]} />
            <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={2.2} />
          </mesh>
          <Billboard position={[0, 0.3, 0]}>
            <Text fontSize={0.11} color="#f4e8d8" anchorX="center" anchorY="middle">
              {a.label}
            </Text>
          </Billboard>
        </group>
      ))}

      {/* 13. Dynamic TOHE Readout Metric HUD Billboard */}
      <Billboard position={[0, 1.25, 0]}>
        <group>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.5, 0.42]} />
            <meshBasicMaterial color="#0b0914" transparent opacity={0.88} />
          </mesh>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.13}
            color="#ffd166"
            anchorX="center"
            anchorY="middle"
          >
            {`V_TOHE = ${(orbitalHallAngle * 8.75).toFixed(1)} mV (Transverse)`}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.09}
            color="#7dd3fc"
            anchorX="center"
            anchorY="middle"
          >
            {'σ_xz^Ly = -σ_yz^Lx (Hallmark Tensor Inversion)'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
