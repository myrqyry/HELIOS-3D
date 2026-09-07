import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Instances, Instance, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { CognitiveLayer } from '../../data/layeredKnowledge';

interface SubsystemProps {
  layer: CognitiveLayer;
  isFocused: boolean;
  paused: boolean;
  params?: Record<string, number>;
  onNodeClick?: () => void;
  pulseTrigger?: number;
}

/**
 * 01. HOPFION SOLITON KNOT
 * 3D Magnetic knot with layered visual representations:
 * - Layer 1: Smooth glowing toroidal topology knot
 * - Layer 2: Néel/Bloch vector spin arrows and DMI chiral stabilization
 * - Layer 3: Hopf fibration linking loops and Faddeev-Skyrme energy contours
 */
export function Hopfion3D({ layer, isFocused, paused, params = {}, pulseTrigger = 0 }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseScale = useRef(1);

  const dmi = params.dmi ?? 2.4;
  const anisotropy = params.anisotropy ?? 0.85;
  const current = params.current ?? 2.5;

  // Generate toroidal knot coordinates (p=2, q=3)
  const knotPoints = useMemo(() => {
    const arr: [number, number, number][] = [];
    const count = 96;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = 0.9 + 0.35 * Math.cos(3 * t);
      const x = r * Math.cos(2 * t);
      const y = r * Math.sin(2 * t);
      const z = 0.55 * Math.sin(3 * t);
      arr.push([x, y, z]);
    }
    return arr;
  }, []);

  // Preimage linking circles for Layer 3 (Hopf fibration S3 -> S2)
  const fiberRings = useMemo(() => {
    const rings: Array<[number, number, number][]> = [];
    for (let f = 0; f < 6; f++) {
      const ringPts: [number, number, number][] = [];
      const phaseOffset = (f / 6) * Math.PI * 2;
      for (let i = 0; i <= 36; i++) {
        const phi = (i / 36) * Math.PI * 2;
        const R = 0.85;
        const r = 0.28;
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

  // Vector arrows for Layer 2 & 3
  const vectorArrows = useMemo(() => {
    const items = [];
    const N = 24;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const rad = 0.85;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;
      const z = Math.sin(angle * 3) * 0.25;
      const tangent = [-Math.sin(angle), Math.cos(angle), 0.3 * Math.cos(angle * 3)];
      items.push({ pos: [x, y, z] as [number, number, number], dir: tangent });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (paused) return;
    const speed = 0.4 + current * 0.08;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }

    // Handle pulse trigger animation
    if (pulseTrigger > 0) {
      pulseScale.current = 1.35;
    }
    pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1, delta * 6);
    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulseScale.current);
    }
  });

  // When DMI is below threshold (< 1.1 mJ/m²), hopfion knot unwinds into a 3D skyrmion tube
  if (dmi < 1.1) {
    return (
      <group>
        <Skyrmion3D
          layer={layer}
          isFocused={isFocused}
          paused={paused}
          params={params}
          pulseTrigger={pulseTrigger}
        />
        <Billboard position={[0, 1.45, 0]}>
          <Text fontSize={0.13} color="#f87171" anchorX="center" font={undefined}>
            {'[UNWOUND TO 3D SKYRMION TUBE: DMI < 1.1 mJ/m²]'}
          </Text>
        </Billboard>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {/* Central Solid/Wire Torus Knot */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[0.85, 0.24, 128, 24, 2, 3]} />
        <meshStandardMaterial
          color={layer === 1 ? '#ff6b1a' : layer === 2 ? '#ff9e3b' : '#ffb627'}
          emissive="#ff6b1a"
          emissiveIntensity={layer === 1 ? 0.7 : 0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={layer === 3}
          wireframeLinewidth={1.5}
        />
      </mesh>

      {/* Outer translucent energy envelope in Layer 1 */}
      {layer === 1 && (
        <mesh scale={1.18}>
          <torusKnotGeometry args={[0.85, 0.28, 64, 16, 2, 3]} />
          <meshStandardMaterial color="#ffd166" transparent opacity={0.18} wireframe />
        </mesh>
      )}

      {/* Layer 2: Vector Arrows showing chiral twist from DMI */}
      {layer >= 2 && (
        <group>
          {vectorArrows.map((v, i) => (
            <group key={i} position={v.pos}>
              <mesh>
                <coneGeometry args={[0.04, 0.14, 8]} />
                <meshStandardMaterial
                  color={dmi > 1.8 ? '#7dd3fc' : '#ff6b1a'}
                  emissive={dmi > 1.8 ? '#38bdf8' : '#cc4f10'}
                  emissiveIntensity={1.2}
                />
              </mesh>
            </group>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.7, 1.05, 32]} />
            <meshStandardMaterial color="#2a201a" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Layer 3: Mathematical Hopf Fibration Linking Rings */}
      {layer === 3 && (
        <group>
          {fiberRings.map((ring, idx) => (
            <Line
              key={idx}
              points={ring}
              color={idx % 2 === 0 ? '#7dd3fc' : '#ffd166'}
              lineWidth={2}
              transparent
              opacity={0.85}
            />
          ))}
          {/* Topological Charge HUD Label */}
          <Billboard position={[0, 1.4, 0]}>
            <Text fontSize={0.16} color="#ffd166" anchorX="center" font={undefined}>
              {'Q_H = 1.00 (Hopf Invariant)'}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
}

/**
 * 01B. SKYRMION 3D MESH REPRESENTATION
 * Basic 3D mesh representation of a chiral skyrmion tube built with Three.js primitives:
 * - cylinderGeometry: central core column (m_z = -1), domain wall envelope, outer sheath (m_z = +1)
 * - torusGeometry: equatorial and boundary chiral domain-wall transition rings (m_z = 0)
 * - sphereGeometry: polar core caps and central topological singularity
 * - ringGeometry: surface boundary aperture cross-sections
 * - coneGeometry: 3D volumetric array of spin vector arrows
 */
export function Skyrmion3D({ layer, paused, params = {}, pulseTrigger = 0 }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseScale = useRef(1);

  const chirality = (params.chirality ?? 0) === 1 ? 'bloch' : 'neel';
  const tubeHeight = 1.6;
  const coreRadius = 0.22;
  const domainWallRadius = 0.76;
  const outerRadius = 1.35;

  // Generate 3D spin vectors for layer >= 2
  const spinVectors = useMemo(() => {
    const arr: Array<{
      pos: [number, number, number];
      rotation: [number, number, number];
      color: string;
    }> = [];

    const tiers = [-0.55, -0.25, 0, 0.25, 0.55];
    const upVector = new THREE.Vector3(0, 1, 0);
    const targetDir = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const gamma = chirality === 'neel' ? 0 : Math.PI / 2;

    for (const y of tiers) {
      // Core spin down
      arr.push({ pos: [0, y, 0], rotation: [Math.PI, 0, 0], color: '#ff6b1a' });

      const shells = [
        { r: 0.38, count: 6 },
        { r: 0.76, count: 12 },
        { r: 1.12, count: 16 },
        { r: 1.35, count: 18 },
      ];

      for (const { r, count } of shells) {
        const theta = (r / outerRadius) * Math.PI;
        for (let i = 0; i < count; i++) {
          const phi = (i / count) * Math.PI * 2;
          const x = Math.cos(phi) * r;
          const z = Math.sin(phi) * r;

          const mx = Math.sin(theta) * Math.cos(phi + gamma);
          const my = -Math.cos(theta);
          const mz = Math.sin(theta) * Math.sin(phi + gamma);

          targetDir.set(mx, my, mz).normalize();
          q.setFromUnitVectors(upVector, targetDir);
          euler.setFromQuaternion(q);

          let color = '#ffd166';
          if (my < -0.3) color = '#ff6b1a';
          else if (my > 0.3) color = '#7dd3fc';

          arr.push({ pos: [x, y, z], rotation: [euler.x, euler.y, euler.z], color });
        }
      }
    }
    return arr;
  }, [chirality, outerRadius]);

  // Chiral winding streamlines for layer 3
  const streamlines = useMemo(() => {
    const lines: Array<[number, number, number][]> = [];
    const count = 4;
    const pointsPerLine = 36;
    for (let c = 0; c < count; c++) {
      const linePts: [number, number, number][] = [];
      const baseAngle = (c / count) * Math.PI * 2;
      for (let i = 0; i <= pointsPerLine; i++) {
        const t = i / pointsPerLine;
        const y = (t - 0.5) * tubeHeight;
        const angle = baseAngle + t * Math.PI * 1.5;
        const r = domainWallRadius * (1 + 0.08 * Math.cos(t * Math.PI * 2));
        linePts.push([Math.cos(angle) * r, y, Math.sin(angle) * r]);
      }
      lines.push(linePts);
    }
    return lines;
  }, [domainWallRadius, tubeHeight]);

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
    if (pulseTrigger > 0) {
      pulseScale.current = 1.3;
    }
    pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1, delta * 6);
    if (coreRef.current) {
      coreRef.current.scale.set(pulseScale.current, 1, pulseScale.current);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Core Soliton Tube (cylinderGeometry) - Downward magnetization */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[coreRadius, coreRadius * 1.05, tubeHeight, 32]} />
        <meshStandardMaterial
          color="#ff6b1a"
          emissive="#ff6b1a"
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Polar Caps (sphereGeometry) */}
      <mesh position={[0, tubeHeight / 2, 0]}>
        <sphereGeometry args={[coreRadius, 24, 16]} />
        <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, -tubeHeight / 2, 0]}>
        <sphereGeometry args={[coreRadius * 1.05, 24, 16]} />
        <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.6} />
      </mesh>

      {/* 2. Equatorial Chiral Domain Wall Torus (torusGeometry) */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[domainWallRadius, 0.07, 24, 48]} />
        <meshStandardMaterial
          color="#ffd166"
          emissive="#ffd166"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Upper/Lower Chiral Rings */}
      <mesh position={[0, tubeHeight * 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[domainWallRadius * 1.02, 0.03, 16, 48]} />
        <meshStandardMaterial color="#ffd166" transparent opacity={0.6} wireframe />
      </mesh>
      <mesh position={[0, -tubeHeight * 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[domainWallRadius * 1.02, 0.03, 16, 48]} />
        <meshStandardMaterial color="#ffd166" transparent opacity={0.6} wireframe />
      </mesh>

      {/* 3. Chiral Domain Wall Barrel Shell (cylinderGeometry) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[domainWallRadius * 1.02, domainWallRadius * 1.02, tubeHeight, 32, 8, true]} />
        <meshStandardMaterial
          color="#ffd166"
          transparent
          opacity={0.22}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Outer Ferromagnetic Host Sheath (cylinderGeometry) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[outerRadius, outerRadius, tubeHeight, 32, 2, true]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top & Bottom Capping Plates (ringGeometry) */}
      <mesh position={[0, tubeHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[coreRadius, outerRadius, 36]} />
        <meshStandardMaterial color="#0d1117" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -tubeHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[coreRadius * 1.05, outerRadius, 36]} />
        <meshStandardMaterial color="#0d1117" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Layer >= 2: Spin Vector Cones (coneGeometry) */}
      {layer >= 2 && (
        <Instances limit={spinVectors.length}>
          <coneGeometry args={[0.04, 0.15, 10]} />
          <meshStandardMaterial roughness={0.3} metalness={0.5} />
          {spinVectors.map((v, i) => (
            <Instance key={i} position={v.pos} rotation={v.rotation} color={v.color} />
          ))}
        </Instances>
      )}

      {/* Layer 3: Helical Streamlines & HUD */}
      {layer === 3 && (
        <group>
          {streamlines.map((linePts, idx) => (
            <Line
              key={idx}
              points={linePts}
              color={idx % 2 === 0 ? '#ffd166' : '#38bdf8'}
              lineWidth={2}
              transparent
              opacity={0.8}
            />
          ))}
          <Billboard position={[0, tubeHeight * 0.72, 0]}>
            <Text fontSize={0.15} color="#ffd166" anchorX="center" font={undefined}>
              {'N = 1.00 (Skyrmion Topological Charge)'}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
}

/**
 * 02. HETEROSTRUCTURE & INTERFACIAL DMI
 * EuS / Bi2Se3 / EuS atomic multilayer stack:
 * - Layer 1: Clean architectural sandwich showing near-zero heat flow
 * - Layer 2: Exploded interface with spin-momentum locking vectors (k ⟂ s)
 * - Layer 3: 3D Dirac cone energy dispersion and Rashba-Edelstein spin vectors
 */
export function MaterialStack3D({ layer, paused, params = {} }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const diracRef = useRef<THREE.Group>(null);

  const tiThickness = params.ti_thickness ?? 8;
  const explodedY = layer >= 2 ? 0.75 : 0.45;

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (diracRef.current && layer === 3) {
      diracRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Top EuS (Ferromagnetic Insulator) */}
      <group position={[0, explodedY, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.25, 2.0]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.3} roughness={0.3} />
        </mesh>
        <Billboard position={[1.2, 0, 0]}>
          <Text fontSize={0.13} color="#f4e8d8" anchorX="left">
            {'EuS (Top Insulator)'}
          </Text>
        </Billboard>
      </group>

      {/* Middle Bi2Se3 (Topological Insulator with Dirac Surface State) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.1, 0.35 * (tiThickness / 8), 2.1]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            transparent
            opacity={layer === 3 ? 0.45 : 0.85}
          />
        </mesh>
        <Billboard position={[1.2, 0, 0]}>
          <Text fontSize={0.13} color="#7dd3fc" anchorX="left">
            {'Bi₂Se₃ (Dirac Channel)'}
          </Text>
        </Billboard>

        {/* Spin-Momentum Locking Arrows (Layer 2 & 3) */}
        {layer >= 2 && (
          <group position={[0, 0.25, 0]}>
            {[-0.6, 0, 0.6].map((x, idx) => (
              <group key={idx} position={[x, 0, 0]}>
                {/* Electron momentum k */}
                <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, 0.2]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
                  <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={1} />
                </mesh>
                {/* Transverse locked spin s */}
                <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0.1, 0.2]}>
                  <coneGeometry args={[0.04, 0.12, 8]} />
                  <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={1.5} />
                </mesh>
              </group>
            ))}
          </group>
        )}
      </group>

      {/* Bottom EuS (Ferromagnetic Insulator) */}
      <group position={[0, -explodedY, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.25, 2.0]} />
          <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.3} roughness={0.3} />
        </mesh>
        <Billboard position={[1.2, 0, 0]}>
          <Text fontSize={0.13} color="#f4e8d8" anchorX="left">
            {'EuS (Bottom Insulator)'}
          </Text>
        </Billboard>
      </group>

      {/* Layer 3: 3D Dirac Cones at the Interface */}
      {layer === 3 && (
        <group ref={diracRef} position={[0, 0.05, 0]}>
          {/* Upper Dirac Cone (Conduction) */}
          <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.45, 0.7, 24, 1, true]} />
            <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.6} />
          </mesh>
          {/* Lower Dirac Cone (Valence) */}
          <mesh position={[0, -0.45, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.45, 0.7, 24, 1, true]} />
            <meshStandardMaterial color="#ffd166" wireframe transparent opacity={0.6} />
          </mesh>
          <Billboard position={[0, 1.1, 0]}>
            <Text fontSize={0.14} color="#38bdf8" anchorX="center">
              {'E(k) = ±ℏv_F |k| (Dirac Cone)'}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
}

/**
 * 03. BROWNIAN RESERVOIR COMPUTER (BRC)
 * Non-linear thermodynamic computing array:
 * - Layer 1: Ripple pond showing energy pulses spreading and combining
 * - Layer 2: 2D coupled lattice of magnetic solitons with thermal jitter
 * - Layer 3: Echo-state dynamics with readout weights W_out and Landauer bound
 */
export function ReservoirLattice3D({ layer, paused, params = {}, pulseTrigger = 0 }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const temp = params.temperature ?? 295;
  const pulseWave = useRef(0);

  // Generate 5x5 array of reservoir nodes
  const nodes = useMemo(() => {
    const list = [];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        list.push({
          x: c * 0.45,
          z: r * 0.45,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (pulseTrigger > 0) {
      pulseWave.current = 1;
    }
    if (pulseWave.current > 0) {
      pulseWave.current = Math.max(0, pulseWave.current - delta * 1.5);
    }
  });

  const jitterAmp = (temp / 300) * 0.05;

  return (
    <group ref={groupRef}>
      {/* Substrate boundary base */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.5, 0.08, 2.5]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Soliton Nodes */}
      <Instances limit={nodes.length}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color={layer === 1 ? '#7dd3fc' : '#ffb627'}
          emissive={layer === 1 ? '#38bdf8' : '#ff6b1a'}
          emissiveIntensity={1.2 + pulseWave.current * 2}
        />
        {nodes.map((node, i) => {
          const time = Date.now() * 0.003;
          const jitterX = Math.sin(time + node.phase) * jitterAmp;
          const jitterZ = Math.cos(time + node.phase * 1.3) * jitterAmp;
          const waveHeight = Math.sin(node.phase + (1 - pulseWave.current) * 8) * (pulseWave.current * 0.25);
          return (
            <Instance
              key={i}
              position={[node.x + jitterX, waveHeight, node.z + jitterZ]}
            />
          );
        })}
      </Instances>

      {/* Layer 2: Couplings between nodes */}
      {layer >= 2 && (
        <group>
          {nodes.slice(0, 16).map((node, i) => (
            <Line
              key={i}
              points={[
                [node.x, 0, node.z],
                [node.x + 0.45, 0, node.z],
              ]}
              color="#ff6b1a"
              lineWidth={1.5}
              transparent
              opacity={0.4}
            />
          ))}
        </group>
      )}

      {/* Layer 3: Readout Electrodes with dynamic weights */}
      {layer === 3 && (
        <group>
          {[-0.9, 0, 0.9].map((pos, i) => (
            <group key={i} position={[pos, 0.35, 1.1]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
                <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={1} />
              </mesh>
              <Billboard position={[0, 0.4, 0]}>
                <Text fontSize={0.11} color="#ffd166">
                  {`W_out[${i + 1}]`}
                </Text>
              </Billboard>
            </group>
          ))}
          <Billboard position={[0, 1.2, 0]}>
            <Text fontSize={0.14} color="#7dd3fc" anchorX="center">
              {'E_diss ≈ 6.2 × 10⁻¹⁹ J (Near Landauer)'}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
}

/**
 * 04. TOPOLOGICAL ORBITAL HALL (TOHE) READOUT
 * Non-destructive electrical readout channel:
 * - Layer 1: Electron beams reflecting safely without touching the knot
 * - Layer 2: 3D chiral soliton moving through trilayer channel with lateral deflection
 * - Layer 3: Hallmark tensor sigma_xz^{Ly} = -sigma_yz^{Lx} and Berry curvature
 */
export function ToheReadout3D({ layer, paused, params = {} }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const solitonRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (solitonRef.current) {
      solitonRef.current.position.x = Math.sin(Date.now() * 0.0015) * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Readout Channel Waveguide */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.2]} />
        <meshStandardMaterial color="#2a201a" roughness={0.4} />
      </mesh>

      {/* Moving 3D Soliton */}
      <mesh ref={solitonRef} position={[0, 0.15, 0]}>
        <torusGeometry args={[0.25, 0.08, 16, 32]} />
        <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={1.2} />
      </mesh>

      {/* Deflected Orbital Currents (Layer 2 & 3) */}
      <group>
        {/* Left deflected beam (+y) */}
        <group position={[0.7, 0.25, 0.45]}>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <coneGeometry args={[0.06, 0.2, 12]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.5} />
          </mesh>
          <Billboard position={[0, 0.25, 0]}>
            <Text fontSize={0.12} color="#7dd3fc">
              {layer === 3 ? 'σ_xz^Ly' : 'Orbital Beam (L+)'}
            </Text>
          </Billboard>
        </group>

        {/* Right deflected beam (-y) */}
        <group position={[-0.7, 0.25, -0.45]}>
          <mesh rotation={[0, 0, (3 * Math.PI) / 4]}>
            <coneGeometry args={[0.06, 0.2, 12]} />
            <meshStandardMaterial color="#ffb627" emissive="#ff6b1a" emissiveIntensity={1.5} />
          </mesh>
          <Billboard position={[0, 0.25, 0]}>
            <Text fontSize={0.12} color="#ffb627">
              {layer === 3 ? 'σ_yz^Lx' : 'Orbital Beam (L-)'}
            </Text>
          </Billboard>
        </group>
      </group>

      {/* Layer 3: Hallmark Voltage Sensor Banner */}
      {layer === 3 && (
        <Billboard position={[0, 1.1, 0]}>
          <Text fontSize={0.14} color="#ffd166" anchorX="center">
            {'V_TOHE = 4.2 mV (σ_xz^Ly = -σ_yz^Lx)'}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

/**
 * 05. MOIRÉ SUPERLATTICE & 3D SCALING
 * NaNbO3 twist engineering and hierarchical multi-scale array:
 * - Layer 1: Giant diamond interference grid catching knots
 * - Layer 2: Twisted membranes with dynamic twist angle theta slider
 * - Layer 3: Super-moiré potential landscape and 3D vertical stacked tiers
 */
export function MoireScaling3D({ layer, paused, params = {} }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const topLayerRef = useRef<THREE.Group>(null);
  const twistAngleDeg = params.twist_angle ?? 1.6;

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
    if (topLayerRef.current) {
      const targetTwist = (twistAngleDeg * Math.PI) / 180;
      topLayerRef.current.rotation.y = THREE.MathUtils.lerp(topLayerRef.current.rotation.y, targetTwist, delta * 4);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bottom NaNbO3 Membrane */}
      <group position={[0, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.08, 2.2]} />
          <meshStandardMaterial color="#2a201a" roughness={0.3} />
        </mesh>
        <gridHelper args={[2.2, 14, '#ff6b1a', '#4a3d30']} position={[0, 0.05, 0]} />
      </group>

      {/* Top Twisted NaNbO3 Membrane */}
      <group ref={topLayerRef} position={[0, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.08, 2.2]} />
          <meshStandardMaterial color="#3a2f26" transparent opacity={0.65} />
        </mesh>
        <gridHelper args={[2.2, 14, '#7dd3fc', '#38bdf8']} position={[0, 0.05, 0]} />
      </group>

      {/* Pinned Soliton Nodes in Moiré Wells */}
      {[-0.6, 0, 0.6].map((x) =>
        [-0.6, 0, 0.6].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#ffd166" emissive="#ff6b1a" emissiveIntensity={0.8} />
          </mesh>
        ))
      )}

      {/* Layer 3: Multi-Scale 3D Array Tiers */}
      {layer === 3 && (
        <group>
          {[0.55, 0.9].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0]}>
              <boxGeometry args={[2.2, 0.04, 2.2]} />
              <meshStandardMaterial color="#ffd166" wireframe transparent opacity={0.25} />
            </mesh>
          ))}
          <Billboard position={[0, 1.35, 0]}>
            <Text fontSize={0.14} color="#ffd166" anchorX="center">
              {'Throughput: 8.0 × 10¹⁸ OPS/W (3D Stack)'}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
}

/**
 * 06. INCOHERENT MILNOR SINGULARITIES
 * Zero-coherence optical diagnostics:
 * - Layer 1: Calm eye of the hurricane (dark zero vortex) revealing the knot
 * - Layer 2: Zero-coherence ring (mu=0) with 8-petal soft flux concentrator (150 mT)
 * - Layer 3: Milnor fibration foliation arg(f(u,v)) and PEEM electron trajectories
 */
export function MilnorOptical3D({ layer, paused, params = {} }: SubsystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const fluxField = params.flux_field ?? 150;

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Trefoil Singularity Knot */}
      <mesh>
        <torusKnotGeometry args={[0.65, 0.12, 96, 16, 2, 3]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.4}
          wireframe={layer === 3}
        />
      </mesh>

      {/* Flower-like 8-petal soft flux concentrator (Barrera et al. 2026) */}
      <group position={[0, -0.35, 0]}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const px = Math.cos(angle) * 0.95;
          const pz = Math.sin(angle) * 0.95;
          return (
            <mesh key={i} position={[px, 0, pz]} rotation={[0, -angle, 0]}>
              <coneGeometry args={[0.15, 0.5, 8]} />
              <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* Layer 2: Zero-coherence ring (mu = 0) */}
      {layer >= 2 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.75, 32]} />
          <meshStandardMaterial
            color="#0b0908"
            emissive="#7dd3fc"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Layer 3: Milnor Index HUD */}
      {layer === 3 && (
        <Billboard position={[0, 1.1, 0]}>
          <Text fontSize={0.14} color="#38bdf8" anchorX="center">
            {`B_PEEM = ${fluxField} mT | μ(r1, r2) = 0`}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
