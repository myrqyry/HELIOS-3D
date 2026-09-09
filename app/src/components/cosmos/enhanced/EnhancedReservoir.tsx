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
 * ENHANCED BROWNIAN RESERVOIR (Subsystem 03)
 * Dynamic thermal fluctuation, non-linear node coupling,
 * live pulse propagation from input injectors through the 8x6 node matrix,
 * and weighted readout bars summing the reservoir state.
 */
export default function EnhancedReservoir({
  layer,
  isFocused = true,
  paused = false,
  params = {},
  pulseTrigger = 0,
}: EnhancedSubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseWaveRef = useRef<THREE.Mesh>(null);
  const lastPulseTrigger = useRef(pulseTrigger);
  const pulseWaveProgress = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionActive = !paused && isMotionEnabled(prefersReducedMotion);
  const temperature = params.temperature ?? 300;
  const damping = params.damping ?? 0.04;

  // 48 Reservoir Nodes in an 8x6 non-linear planar grid
  const { nodes, couplingBonds } = useMemo(() => {
    const arr: Array<{ x: number; z: number; baseColor: string }> = [];
    const bonds: Array<[number, number, number][]> = [];
    const cols = 8;
    const rows = 6;
    const spacingX = 0.34;
    const spacingZ = 0.32;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * spacingX;
        const z = (r - (rows - 1) / 2) * spacingZ;
        const baseColor = (c + r) % 2 === 0 ? '#7dd3fc' : '#ffb627';
        arr.push({ x, z, baseColor });

        // Horizontal neighbor bond
        if (c < cols - 1) {
          const nextX = (c + 1 - (cols - 1) / 2) * spacingX;
          bonds.push([[x, 0, z], [nextX, 0, z]]);
        }
        // Vertical neighbor bond
        if (r < rows - 1) {
          const nextZ = (r + 1 - (rows - 1) / 2) * spacingZ;
          bonds.push([[x, 0, z], [x, 0, nextZ]]);
        }
      }
    }
    return { nodes: arr, couplingBonds: bonds };
  }, []);

  // 3 Input Pulse Injectors
  const inputInjectors = useMemo(() => {
    return [-0.45, 0, 0.45].map((z, idx) => ({
      pos: [-1.65, 0.06, z] as [number, number, number],
      id: idx,
    }));
  }, []);

  // 5 Readout Bars
  const readoutBars = useMemo(() => {
    return [0.35, 0.65, 0.9, 0.52, 0.78].map((h, idx) => ({
      x: 1.6,
      z: (idx - 2) * 0.28,
      baseHeight: h,
    }));
  }, []);

  const barRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!motionActive) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.06;
    }

    // Edge-triggered pulse wave propagation
    if (pulseTrigger !== lastPulseTrigger.current) {
      lastPulseTrigger.current = pulseTrigger;
      pulseWaveProgress.current = 0.01;
    }

    if (pulseWaveProgress.current > 0) {
      pulseWaveProgress.current += delta * 1.8;
      if (pulseWaveProgress.current > 1) {
        pulseWaveProgress.current = 0;
      }
    }

    // Animated shockwave line position
    if (pulseWaveRef.current) {
      if (pulseWaveProgress.current > 0) {
        const xPos = -1.6 + pulseWaveProgress.current * 3.2;
        pulseWaveRef.current.position.set(xPos, 0.08, 0);
        pulseWaveRef.current.visible = true;
      } else {
        pulseWaveRef.current.visible = false;
      }
    }

    // Animate Readout Bars dynamically reacting to reservoir state
    barRefs.current.forEach((bar, idx) => {
      if (bar) {
        const osc = Math.sin(t * 2.2 + idx * 0.8) * 0.15;
        const currentPulse = pulseWaveProgress.current > 0.7 ? 0.3 : 0;
        const scaleY = readoutBars[idx].baseHeight + osc + currentPulse;
        bar.scale.set(1, scaleY, 1);
        bar.position.y = (scaleY * 0.4) / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Base Reservoir Substrate Slab */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[3.6, 0.08, 2.2]} />
        <meshStandardMaterial color="#081018" roughness={0.75} metalness={0.9} />
      </mesh>

      {/* 2. Recessed Active Brownian Matrix Cavity */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.4, 0.06, 2.0]} />
        <meshStandardMaterial color="#0d1f2d" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. Input Zone: SOT Write Injector Ports */}
      <group>
        {inputInjectors.map((inj) => (
          <group key={inj.id} position={inj.pos}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
              <meshStandardMaterial
                color="#ff6b1a"
                emissive="#ff6b1a"
                emissiveIntensity={2.0}
              />
            </mesh>
            <Line
              points={[[0, 0, 0], [0.35, 0, 0]]}
              color="#ff6b1a"
              lineWidth={2}
            />
          </group>
        ))}
        <Billboard position={[-1.65, 0.55, 0]}>
          <Text fontSize={0.12} color="#ff6b1a" anchorX="center">
            {'INPUT (SOT BITS)'}
          </Text>
        </Billboard>
      </group>

      {/* 4. Non-linear Reservoir 8x6 Node Grid with Thermal Jitter */}
      <group>
        <Instances limit={nodes.length} range={nodes.length}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#0284c7"
            emissiveIntensity={1.4}
          />
          {nodes.map((n, idx) => (
            <Instance key={idx} position={[n.x, 0.05, n.z]} />
          ))}
        </Instances>

        {/* Dynamic Node Coupling Exchange Bonds */}
        {couplingBonds.map((bond, idx) => (
          <Line
            key={idx}
            points={bond}
            color="#38bdf8"
            lineWidth={1.2}
            transparent
            opacity={0.38}
          />
        ))}

        <Billboard position={[0, 0.55, 0]}>
          <Text fontSize={0.12} color="#7dd3fc" anchorX="center">
            {'RESERVOIR (48 NONLINEAR NODES)'}
          </Text>
        </Billboard>
      </group>

      {/* 5. Propagating Shockwave Pulse Packet Mesh */}
      <mesh ref={pulseWaveRef} visible={false} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.8, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffd166"
          emissiveIntensity={4.0}
        />
      </mesh>

      {/* 6. Readout Zone: Weighted Summation Output Bars */}
      <group position={[0, 0, 0]}>
        {readoutBars.map((bar, idx) => (
          <group key={idx} position={[bar.x, 0, bar.z]}>
            <mesh
              ref={(el) => { barRefs.current[idx] = el; }}
              position={[0, 0.2, 0]}
            >
              <boxGeometry args={[0.1, 0.4, 0.1]} />
              <meshStandardMaterial
                color="#ffb627"
                emissive="#ff6b1a"
                emissiveIntensity={1.8}
              />
            </mesh>
          </group>
        ))}
        <Billboard position={[1.6, 0.55, 0]}>
          <Text fontSize={0.12} color="#ffb627" anchorX="center">
            {'READOUT (WEIGHTS)'}
          </Text>
        </Billboard>
      </group>

      {/* 7. Brownian Reservoir Metric HUD Billboard */}
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
            {`Thermal Bath T = ${temperature.toFixed(0)} K | α = ${damping.toFixed(3)}`}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.092}
            color="#7dd3fc"
            anchorX="center"
            anchorY="middle"
          >
            {'Fading Memory Capacity M ≈ 14 Temporal Steps'}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
