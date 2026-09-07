import { useEffect, useRef, useMemo, useState, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Line, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';
import { isMotionEnabled, usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { ExhibitControl } from '../exhibit/ExhibitControl';

export type ChiralityType = 'neel' | 'bloch';

interface Skyrmion3DProps {
  pausedRef: RefObject<boolean>;
  chirality?: ChiralityType;
  showVectors?: boolean;
  showMesh?: boolean;
  showStreamlines?: boolean;
}

/**
 * 3D Mesh representation of a topological skyrmion tube built with Three.js primitives:
 * - cylinderGeometry: central reversed core tube (m_z = -1) and outer host matrix (m_z = +1)
 * - torusGeometry: equatorial and boundary chiral domain-wall transition rings (m_z = 0)
 * - sphereGeometry: polar core caps and center topological singularity
 * - ringGeometry: surface boundary aperture cross-sections
 * - coneGeometry: 3D volumetric array of spin vector arrows
 */
export function Skyrmion3DMesh({
  pausedRef,
  chirality = 'neel',
  showVectors = true,
  showMesh = true,
  showStreamlines = true,
}: Skyrmion3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const tubeHeight = 1.8;
  const coreRadius = 0.25;
  const domainWallRadius = 0.82;
  const outerRadius = 1.45;

  // Generate 3D volumetric spin vectors using cylinder coordinates (r, phi, y)
  const spinVectors = useMemo(() => {
    const arr: Array<{
      pos: [number, number, number];
      rotation: [number, number, number];
      color: string;
    }> = [];

    const tiers = [-0.65, -0.32, 0, 0.32, 0.65];
    const upVector = new THREE.Vector3(0, 1, 0);
    const targetDir = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const euler = new THREE.Euler();

    // Helicity phase: gamma = 0 for Néel (radial hedge-hog), gamma = PI/2 for Bloch (vortex)
    const gamma = chirality === 'neel' ? 0 : Math.PI / 2;

    for (const y of tiers) {
      // 1. Central Core spin pointing strictly DOWN (-Y)
      const coreDir = new THREE.Vector3(0, -1, 0);
      q.setFromUnitVectors(upVector, coreDir);
      euler.setFromQuaternion(q);
      arr.push({
        pos: [0, y, 0],
        rotation: [euler.x, euler.y, euler.z],
        color: '#ff6b1a',
      });

      // 2. Concentric radial shells
      const shells = [
        { r: 0.42, count: 8 },
        { r: 0.82, count: 14 },
        { r: 1.18, count: 18 },
        { r: 1.45, count: 22 },
      ];

      for (const { r, count } of shells) {
        // Skyrmion profile angle: Theta = 0 at core (down), PI at outer boundary (up)
        // Domain wall is at r = 0.82 where Theta = PI / 2 (horizontal in-plane)
        const normalizedR = r / outerRadius;
        const theta = normalizedR * Math.PI; // 0 (core) -> PI (outer)

        for (let i = 0; i < count; i++) {
          const phi = (i / count) * Math.PI * 2;
          const x = Math.cos(phi) * r;
          const z = Math.sin(phi) * r;

          // Magnetization vector m = (sin(theta) * cos(phi + gamma), -cos(theta), sin(theta) * sin(phi + gamma))
          // Notice: at theta=0 -> m_y = -1 (down); at theta=PI/2 -> m_y = 0 (in-plane); at theta=PI -> m_y = +1 (up)
          const mx = Math.sin(theta) * Math.cos(phi + gamma);
          const my = -Math.cos(theta);
          const mz = Math.sin(theta) * Math.sin(phi + gamma);

          targetDir.set(mx, my, mz).normalize();
          q.setFromUnitVectors(upVector, targetDir);
          euler.setFromQuaternion(q);

          // Color based on vertical magnetization m_y
          let color = '#ffd166';
          if (my < -0.3) {
            color = '#ff6b1a'; // Core reversed spin (orange/ember)
          } else if (my > 0.3) {
            color = '#7dd3fc'; // Background host spin (sky blue)
          }

          arr.push({
            pos: [x, y, z],
            rotation: [euler.x, euler.y, euler.z],
            color,
          });
        }
      }
    }
    return arr;
  }, [chirality, outerRadius]);

  // 3D Chiral Streamlines curling around the domain wall (helical winding)
  const streamlines = useMemo(() => {
    const lines: Array<[number, number, number][]> = [];
    const count = 4;
    const pointsPerLine = 48;
    const gamma = chirality === 'neel' ? 0.2 : 0.8;

    for (let c = 0; c < count; c++) {
      const linePts: [number, number, number][] = [];
      const baseAngle = (c / count) * Math.PI * 2;
      for (let i = 0; i <= pointsPerLine; i++) {
        const t = i / pointsPerLine;
        const y = (t - 0.5) * tubeHeight;
        const angle = baseAngle + t * Math.PI * 2 * gamma;
        const r = domainWallRadius * (1 + 0.12 * Math.cos(t * Math.PI * 2));
        linePts.push([Math.cos(angle) * r, y, Math.sin(angle) * r]);
      }
      lines.push(linePts);
    }
    return lines;
  }, [chirality, domainWallRadius, tubeHeight]);

  useFrame((state, delta) => {
    if (pausedRef.current || !isMotionEnabled(prefersReducedMotion)) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (coreRef.current) {
      const s = 1 + 0.04 * Math.sin(state.clock.elapsedTime * 2);
      coreRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ============================================================ */}
      {/* 3D MESH PRIMITIVES: Topological Soliton Core & Domain Sheaths */}
      {/* ============================================================ */}
      {showMesh && (
        <group name="skyrmion-primitives-mesh">
          {/* 1. Central Core Soliton Tube (cylinderGeometry) - Downward magnetization */}
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

          {/* Core Polar Caps (sphereGeometry) */}
          <mesh position={[0, tubeHeight / 2, 0]}>
            <sphereGeometry args={[coreRadius, 24, 16]} />
            <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0, -tubeHeight / 2, 0]}>
            <sphereGeometry args={[coreRadius * 1.05, 24, 16]} />
            <meshStandardMaterial color="#ff6b1a" emissive="#ff6b1a" emissiveIntensity={0.6} />
          </mesh>

          {/* 2. Equatorial Chiral Domain Wall Torus (torusGeometry) - In-plane twist boundary */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[domainWallRadius, 0.075, 24, 64]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#ffd166"
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>

          {/* Secondary Chiral Boundary Rings at upper and lower planes */}
          <mesh position={[0, tubeHeight * 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[domainWallRadius * 1.02, 0.035, 16, 64]} />
            <meshStandardMaterial color="#ffd166" transparent opacity={0.6} wireframe />
          </mesh>
          <mesh position={[0, -tubeHeight * 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[domainWallRadius * 1.02, 0.035, 16, 64]} />
            <meshStandardMaterial color="#ffd166" transparent opacity={0.6} wireframe />
          </mesh>

          {/* 3. Chiral Domain Wall Barrel Shell (cylinderGeometry, open-ended) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[domainWallRadius * 1.03, domainWallRadius * 1.03, tubeHeight, 32, 12, true]} />
            <meshStandardMaterial
              color="#ffd166"
              transparent
              opacity={0.22}
              wireframe
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* 4. Outer Ferromagnetic Host Sheath (cylinderGeometry, open-ended) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[outerRadius, outerRadius, tubeHeight, 32, 4, true]} />
            <meshStandardMaterial
              color="#7dd3fc"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Top & Bottom Capping Plates (ringGeometry) */}
          <mesh position={[0, tubeHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[coreRadius, outerRadius, 48]} />
            <meshStandardMaterial
              color="#0d1117"
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, -tubeHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[coreRadius * 1.05, outerRadius, 48]} />
            <meshStandardMaterial
              color="#0d1117"
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {/* ============================================================ */}
      {/* 3D CHIRAL STREAMLINES: Topological Winding Flow               */}
      {/* ============================================================ */}
      {showStreamlines && (
        <group name="skyrmion-streamlines">
          {streamlines.map((linePts, idx) => (
            <Line
              key={idx}
              points={linePts}
              color={chirality === 'neel' ? '#ffd166' : '#38bdf8'}
              lineWidth={2}
              transparent
              opacity={0.8}
            />
          ))}
        </group>
      )}

      {/* ============================================================ */}
      {/* 3D SPIN VECTOR FIELD: Cone Primitives (coneGeometry)         */}
      {/* ============================================================ */}
      {showVectors && (
        <Instances limit={spinVectors.length} name="skyrmion-spin-vectors">
          <coneGeometry args={[0.042, 0.16, 12]} />
          <meshStandardMaterial roughness={0.3} metalness={0.5} />
          {spinVectors.map((v, i) => (
            <Instance
              key={i}
              position={v.pos}
              rotation={v.rotation}
              color={v.color}
            />
          ))}
        </Instances>
      )}

      {/* Center topological marker */}
      <Billboard position={[0, tubeHeight * 0.72, 0]}>
        <Text fontSize={0.14} color="#ffd166" anchorX="center" font={undefined}>
          {`Skyrmion Tube [N = 1, ${chirality.toUpperCase()}]`}
        </Text>
      </Billboard>
    </group>
  );
}

export interface SkyrmionSceneProps {
  height?: string;
  interactive?: boolean;
}

export default function SkyrmionScene({ height = 'h-96', interactive = true }: SkyrmionSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [chirality, setChirality] = useState<ChiralityType>('neel');
  const [showVectors, setShowVectors] = useState(true);
  const [showMesh, setShowMesh] = useState(true);
  const [showStreamlines, setShowStreamlines] = useState(true);

  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  return (
    <div className="relative flex flex-col w-full" id="skyrmion-scene-container">
      {/* Top Interactive Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-obsidian border-b border-obsidian-3/60 rounded-t-xl text-xs font-mono">
        <div className="flex items-center gap-2">
          <ExhibitControl
            label={paused ? 'Resume rotation' : 'Pause rotation'}
            paused={paused}
            onToggle={() => setPaused((v) => !v)}
          />
          <div className="h-4 w-px bg-obsidian-3 mx-1" />
          <span className="text-parchment-2">Chirality:</span>
          <button
            type="button"
            onClick={() => setChirality('neel')}
            className={`px-2.5 py-1 rounded transition-colors ${
              chirality === 'neel'
                ? 'bg-amber text-obsidian font-bold shadow-sm'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
          >
            Néel (Radial)
          </button>
          <button
            type="button"
            onClick={() => setChirality('bloch')}
            className={`px-2.5 py-1 rounded transition-colors ${
              chirality === 'bloch'
                ? 'bg-cyan-500 text-obsidian font-bold shadow-sm'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
          >
            Bloch (Vortex)
          </button>
        </div>

        {/* Mesh & Vector Layer Toggles */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMesh((v) => !v)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showMesh
                ? 'border-amber/60 text-amber bg-amber/10'
                : 'border-obsidian-3 text-parchment-3 hover:text-parchment-2'
            }`}
          >
            3D Mesh
          </button>
          <button
            type="button"
            onClick={() => setShowVectors((v) => !v)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showVectors
                ? 'border-amber/60 text-amber bg-amber/10'
                : 'border-obsidian-3 text-parchment-3 hover:text-parchment-2'
            }`}
          >
            Spin Vectors
          </button>
          <button
            type="button"
            onClick={() => setShowStreamlines((v) => !v)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showStreamlines
                ? 'border-amber/60 text-amber bg-amber/10'
                : 'border-obsidian-3 text-parchment-3 hover:text-parchment-2'
            }`}
          >
            Helical Lines
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas with isometric perspective camera */}
      <R3FCanvas
        fallback="A 3D mesh representation of a chiral skyrmion tube built with three.js primitives."
        height={height}
        className="bg-obsidian-1 rounded-b-xl"
        camera={{ position: [2.5, 1.8, 2.6], fov: 46 }}
      >
        <color attach="background" args={['#07080a']} />
        <R3FEnvironment starsCount={2500} paused={paused} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 6, 4]} intensity={1.5} color="#ffd166" />
        <pointLight position={[-4, -4, -3]} intensity={1.0} color="#38bdf8" />
        <directionalLight position={[0, 5, 2]} intensity={0.8} />

        <Skyrmion3DMesh
          pausedRef={pausedRef}
          chirality={chirality}
          showVectors={showVectors}
          showMesh={showMesh}
          showStreamlines={showStreamlines}
        />

        <R3FControls interactive={interactive} />
      </R3FCanvas>
    </div>
  );
}

