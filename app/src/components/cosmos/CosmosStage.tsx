import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { DOMAINS, type CognitiveLayer, type DomainKnowledge } from '../../data/layeredKnowledge';
import {
  Hopfion3D,
  MaterialStack3D,
  ReservoirLattice3D,
  ToheReadout3D,
  MoireScaling3D,
  MilnorOptical3D,
} from './CosmosSubsystems';

interface CosmosStageProps {
  layer: CognitiveLayer;
  activeDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
  paused: boolean;
  params: Record<string, number>;
  pulseTrigger: number;
  cameraPreset: 'overview' | 'focused' | 'topdown' | 'slice';
  autoRotate: boolean;
  isInspectorOpen?: boolean;
  signalStage?: number;
  isSignalActive?: boolean;
}

/**
 * Smooth camera interpolator for flying between macro overview and focused subsystem islands.
 * Shifts look target and position horizontally when the right inspector drawer is open on desktop,
 * preventing the UI from covering the inspected 3D object.
 */
function CameraRig({
  activeDomain,
  preset,
  isInspectorOpen = false,
  autoRotate = false,
}: {
  activeDomain: DomainKnowledge | null;
  preset: 'overview' | 'focused' | 'topdown' | 'slice';
  isInspectorOpen?: boolean;
  autoRotate?: boolean;
}) {
  const { camera, size } = useThree();
  const controlsRef = useRef<any>(null);
  const isInteracting = useRef(false);
  const lastStateKey = useRef('');

  // Target camera position and lookAt target based on state
  const { targetPos, targetLookAt, stateKey } = useMemo(() => {
    // Only apply desktop inspector shift if screen width > 768
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 768 : size.width > 768;
    const shouldShiftForInspector = isInspectorOpen && isDesktop && !!activeDomain;
    const key = `${preset}_${activeDomain ? activeDomain.id : 'all'}_${shouldShiftForInspector ? 'shift' : 'center'}`;

    if (preset === 'topdown') {
      return {
        targetPos: new THREE.Vector3(0, 10.5, 0.01),
        targetLookAt: new THREE.Vector3(0, 0, 0),
        stateKey: key,
      };
    }

    if (preset === 'slice') {
      if (activeDomain) {
        const baseLookAt = new THREE.Vector3(...activeDomain.position3D);
        const basePos = new THREE.Vector3(
          activeDomain.position3D[0] + 2.4,
          activeDomain.position3D[1] + 0.2,
          activeDomain.position3D[2] + 0.4
        );
        if (shouldShiftForInspector) {
          baseLookAt.x += 0.8;
          basePos.x += 0.8;
        }
        return {
          targetPos: basePos,
          targetLookAt: baseLookAt,
          stateKey: key,
        };
      }
      return {
        targetPos: new THREE.Vector3(8.2, 0.6, 0.2),
        targetLookAt: new THREE.Vector3(0, 0, 0),
        stateKey: key,
      };
    }

    if (activeDomain) {
      const p = activeDomain.position3D;
      const basePos = new THREE.Vector3(p[0] + 1.2, p[1] + 1.3, p[2] + 2.6);
      const baseLookAt = new THREE.Vector3(p[0], p[1], p[2]);

      if (shouldShiftForInspector) {
        // Screen-right vector in world space: (2.6, 0, -1.2) normalized = (0.908, 0, -0.419)
        const shiftAmount = 0.95;
        const rightX = 0.908 * shiftAmount;
        const rightZ = -0.419 * shiftAmount;
        basePos.x += rightX;
        basePos.z += rightZ;
        baseLookAt.x += rightX;
        baseLookAt.z += rightZ;
      }

      return {
        targetPos: basePos,
        targetLookAt: baseLookAt,
        stateKey: key,
      };
    }

    // Macro System Overview
    return {
      targetPos: new THREE.Vector3(0, 4.6, 8.2),
      targetLookAt: new THREE.Vector3(0, 0, 0),
      stateKey: key,
    };
  }, [activeDomain, preset, isInspectorOpen, size.width]);

  // When state changes, initiate smooth camera flight
  const isTransitioning = useRef(true);
  useEffect(() => {
    if (stateKey !== lastStateKey.current) {
      lastStateKey.current = stateKey;
      isTransitioning.current = true;
    }
  }, [stateKey]);

  useFrame((_, delta) => {
    if (isTransitioning.current && !isInteracting.current) {
      camera.position.lerp(targetPos, delta * 3.6);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt, delta * 3.8);
        controlsRef.current.update();
      }
      if (camera.position.distanceTo(targetPos) < 0.04) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      autoRotate={autoRotate && !activeDomain && !isInteracting.current}
      autoRotateSpeed={0.8}
      maxDistance={22}
      minDistance={0.8}
      dampingFactor={0.05}
      onStart={() => {
        isInteracting.current = true;
        isTransitioning.current = false;
      }}
      onEnd={() => {
        isInteracting.current = false;
      }}
    />
  );
}

/**
 * Master Central Core: Spintronic Wafer Substrate lying stationary on the floor.
 * Anchors the physical machine with animated concentric circuit traces and radial gold bus lines.
 */
function CentralCoprocessorWafer({
  paused,
  layer,
  isSignalActive = false,
}: {
  paused: boolean;
  layer: CognitiveLayer;
  isSignalActive?: boolean;
}) {
  const outerGoldRef = useRef<THREE.MeshStandardMaterial>(null);
  const intermediateAmberRef = useRef<THREE.MeshStandardMaterial>(null);
  const circuitGridRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (outerGoldRef.current) {
      outerGoldRef.current.emissiveIntensity = isSignalActive ? 1.6 : 0.6 + 0.25 * Math.sin(t * 2.5);
    }
    if (intermediateAmberRef.current) {
      intermediateAmberRef.current.emissiveIntensity = isSignalActive ? 1.4 : 0.5 + 0.2 * Math.cos(t * 3.0);
    }
    if (circuitGridRef.current) {
      circuitGridRef.current.opacity = 0.12 + 0.08 * Math.sin(t * 1.8);
    }
  });

  return (
    <group position={[0, -1.8, 0]}>
      {/* Silicon Substrate Hexagonal Motherboard: Stationary Foundation */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[5.2, 5.4, 0.12, 6]} />
        <meshStandardMaterial color="#161310" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* Hexagonal Outer Gold Conduit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[4.7, 4.9, 6]} />
        <meshStandardMaterial
          ref={outerGoldRef}
          color="#ffb627"
          emissive="#ffb627"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hexagonal Intermediate Amber Bus Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.7, 2.85, 6]} />
        <meshStandardMaterial
          ref={intermediateAmberRef}
          color="#ff6b1a"
          emissive="#ff6b1a"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hexagonal Circuit Wireframe Grid Pattern across wafer surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.6, 4.5, 24]} />
        <meshStandardMaterial
          ref={circuitGridRef}
          color="#ffd166"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 6 Radial Gold Bus Traces linking center hub to the 6 outer terminals */}
      {DOMAINS.map((domain, i) => {
        const p = domain.position3D;
        const angle = Math.atan2(p[2], p[0]);
        const rEnd = 4.8;
        return (
          <mesh
            key={`radial-trace-${i}`}
            position={[(rEnd / 2) * Math.cos(angle), 0.012, (rEnd / 2) * Math.sin(angle)]}
            rotation={[-Math.PI / 2, 0, -angle]}
          >
            <planeGeometry args={[rEnd, 0.06]} />
            <meshStandardMaterial
              color="#ffb627"
              emissive="#ffb627"
              emissiveIntensity={isSignalActive ? 1.5 : 0.6}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* Central Quantum Hub Core Emissive Well */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial
          color="#ff6b1a"
          emissive="#ff6b1a"
          emissiveIntensity={isSignalActive ? 2.5 : 0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Optical Readout Grating in Layer 3 */}
      {layer === 3 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
          <ringGeometry args={[1.5, 4.0, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Connecting Energy Bus Lines between the central core and the 6 peripheral chambers.
 * Includes animated energy packet signals flowing along the interconnect paths.
 */
function InterconnectBuses({
  activeDomainId,
  paused,
  signalStage = 0,
  isSignalActive = false,
}: {
  activeDomainId: string | null;
  paused: boolean;
  signalStage?: number;
  isSignalActive?: boolean;
}) {
  const lines = useMemo(() => {
    return DOMAINS.map((domain, idx) => {
      const p = domain.position3D;
      return {
        id: domain.id,
        idx,
        points: [
          [0, -1.75, 0] as [number, number, number],
          [p[0] * 0.45, -1.75, p[2] * 0.45] as [number, number, number],
          [p[0], -0.65, p[2]] as [number, number, number],
          p,
        ],
        color: domain.color,
      };
    });
  }, []);

  // Polyline point interpolator: progress t in [0, 1]
  const interpolatePolyline = (pts: [number, number, number][], t: number): [number, number, number] => {
    const clamped = Math.max(0, Math.min(1, t));
    const segmentCount = pts.length - 1;
    const seg = Math.min(Math.floor(clamped * segmentCount), segmentCount - 1);
    const localT = (clamped * segmentCount) - seg;
    const pA = pts[seg];
    const pB = pts[seg + 1];
    return [
      pA[0] + (pB[0] - pA[0]) * localT,
      pA[1] + (pB[1] - pA[1]) * localT,
      pA[2] + (pB[2] - pA[2]) * localT,
    ];
  };

  const pulsePacketRefs = useRef<(THREE.Mesh | null)[]>([]);
  const activeSignalPacketRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;

    // Ambient floating energy pulses along the 6 buses
    lines.forEach((l, i) => {
      const mesh = pulsePacketRefs.current[i];
      if (mesh) {
        const progress = ((t * 0.35 + i * 0.16) % 1);
        const pos = interpolatePolyline(l.points, progress);
        mesh.position.set(pos[0], pos[1], pos[2]);
      }
    });

    // Active causal pipeline signal packet
    if (activeSignalPacketRef.current && isSignalActive) {
      const activeLine = lines[signalStage % lines.length];
      if (activeLine) {
        const stageProgress = (t * 2.4) % 1;
        const pos = interpolatePolyline(activeLine.points, stageProgress);
        activeSignalPacketRef.current.position.set(pos[0], pos[1], pos[2]);
        activeSignalPacketRef.current.visible = true;
      }
    } else if (activeSignalPacketRef.current) {
      activeSignalPacketRef.current.visible = false;
    }
  });

  return (
    <group>
      {/* Bus Polylines */}
      {lines.map((l) => {
        const isActive = activeDomainId === l.id;
        const isCurrentSignalLine = isSignalActive && lines[signalStage % lines.length]?.id === l.id;
        return (
          <group key={l.id}>
            <Line
              points={l.points}
              color={isCurrentSignalLine ? '#ffffff' : l.color}
              lineWidth={isCurrentSignalLine ? 4.5 : isActive ? 3.5 : 1.5}
              transparent
              opacity={isCurrentSignalLine ? 1.0 : isActive ? 0.9 : 0.35}
            />
            {/* Ambient Energy Packet per bus */}
            <mesh
              ref={(el) => { pulsePacketRefs.current[l.idx] = el; }}
              position={l.points[0]}
            >
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color={l.color}
                emissive={l.color}
                emissiveIntensity={isActive ? 3.0 : 1.5}
              />
            </mesh>
          </group>
        );
      })}

      {/* High-Intensity Causal Signal Packet (shown during signal injection/propagation) */}
      <mesh ref={activeSignalPacketRef} visible={false}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffd166"
          emissiveIntensity={4.5}
          roughness={0.1}
        />
        <pointLight color="#ffb627" intensity={3.5} distance={1.8} />
      </mesh>
    </group>
  );
}

/**
 * 3D Hotspot / Subsystem Island wrapper.
 * The entire object is directly clickable and responsive to hover.
 * Incorporates an LOD state: unfocused subsystems recede quietly, while focused ones bloom.
 */
function SubsystemIsland({
  domain,
  layer,
  isFocused,
  activeDomainId,
  paused,
  params,
  pulseTrigger,
  onSelect,
  isSignalActive = false,
}: {
  domain: DomainKnowledge;
  layer: CognitiveLayer;
  isFocused: boolean;
  activeDomainId: string | null;
  paused: boolean;
  params: Record<string, number>;
  pulseTrigger: number;
  onSelect: () => void;
  isSignalActive?: boolean;
}) {
  const beaconRef = useRef<THREE.Mesh>(null);
  const islandGroupRef = useRef<THREE.Group>(null);
  const isAnyFocused = activeDomainId !== null;

  useFrame((_, delta) => {
    if (paused) return;
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 0.8;
    }
    if (islandGroupRef.current) {
      const targetScale = isFocused ? 1.05 : isAnyFocused ? 0.88 : 1.0;
      islandGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  // Render the appropriate 3D component for this domain
  // When another node is focused, pass layer 1 as LOD to quiet down vector & equation clutter
  const effectiveLayer = isFocused || !isAnyFocused ? layer : 1;

  const renderSubsystem3D = () => {
    switch (domain.id) {
      case 'hopfion':
        return (
          <Hopfion3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            pulseTrigger={pulseTrigger}
            onNodeClick={onSelect}
          />
        );
      case 'material_stack':
        return (
          <MaterialStack3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            onNodeClick={onSelect}
          />
        );
      case 'reservoir':
        return (
          <ReservoirLattice3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            pulseTrigger={pulseTrigger}
            onNodeClick={onSelect}
          />
        );
      case 'tohe_readout':
        return (
          <ToheReadout3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            onNodeClick={onSelect}
          />
        );
      case 'moire_scaling':
        return (
          <MoireScaling3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            onNodeClick={onSelect}
          />
        );
      case 'milnor_optical':
        return (
          <MilnorOptical3D
            layer={effectiveLayer}
            isFocused={isFocused}
            paused={paused}
            params={params}
            onNodeClick={onSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <group
      ref={islandGroupRef}
      position={domain.position3D}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {/* 3D Model Body - Directly Clickable Interface */}
      {renderSubsystem3D()}

      {/* Base platform ring with focus and signal bloom */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.35, 32]} />
        <meshStandardMaterial
          color={isFocused ? domain.color : isSignalActive ? '#ffd166' : isAnyFocused ? '#2a221b' : '#4a3d30'}
          emissive={isFocused ? domain.color : isSignalActive ? '#ffb627' : isAnyFocused ? '#15100c' : '#1a1410'}
          emissiveIntensity={isFocused ? 1.8 : isSignalActive ? 1.5 : isAnyFocused ? 0.1 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Holographic Beacon Header */}
      {/* In LOD state (when another system is focused), hide the heavy text to avoid viewport collision */}
      <group position={[0, 1.55, 0]}>
        <Billboard>
          {(!isAnyFocused || isFocused) ? (
            <>
              <mesh ref={beaconRef} position={[-0.8, 0, 0]}>
                <octahedronGeometry args={[isFocused ? 0.11 : 0.08]} />
                <meshStandardMaterial
                  color={domain.color}
                  emissive={domain.color}
                  emissiveIntensity={isFocused ? 2.5 : 1.5}
                />
              </mesh>
              <Text
                fontSize={0.16}
                color="#f4e8d8"
                anchorX="left"
                anchorY="middle"
              >
                {`${domain.number}. ${domain.title}`}
              </Text>
              <Text
                position={[0, -0.22, 0]}
                fontSize={0.10}
                color={domain.color}
                anchorX="center"
                anchorY="middle"
              >
                {isFocused ? `[FOCUSED - LAYER ${layer}]` : '[CLICK TO EXPLORE]'}
              </Text>
            </>
          ) : (
            /* Quiet LOD beacon marker for unfocused neighbors */
            <mesh ref={beaconRef} position={[0, 0, 0]}>
              <octahedronGeometry args={[0.05]} />
              <meshStandardMaterial
                color={domain.color}
                emissive={domain.color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.5}
              />
            </mesh>
          )}
        </Billboard>
      </group>
    </group>
  );
}

export function CosmosStage({
  layer,
  activeDomainId,
  onSelectDomain,
  paused,
  params,
  pulseTrigger,
  cameraPreset,
  autoRotate,
  isInspectorOpen = false,
  signalStage = 0,
  isSignalActive = false,
}: CosmosStageProps) {
  const activeDomain = useMemo(() => {
    return DOMAINS.find((d) => d.id === activeDomainId) ?? null;
  }, [activeDomainId]);

  return (
    <>
      {/* Lighting Setup tailored for high-contrast obsidian aesthetic */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 15, 10]} intensity={1.4} color="#f4e8d8" />
      <pointLight position={[0, 4, 0]} intensity={2.2} color="#ffb627" distance={14} />
      <pointLight position={[0, -3, 0]} intensity={1.0} color="#38bdf8" distance={10} />

      {/* Space Background Stars */}
      <Stars radius={50} depth={30} count={3500} factor={3.5} saturation={0} fade speed={paused ? 0 : 0.6} />

      {/* Central Stationary Motherboard Wafer & Interconnect Grid */}
      <CentralCoprocessorWafer paused={paused} layer={layer} isSignalActive={isSignalActive} />
      <InterconnectBuses
        activeDomainId={activeDomainId}
        paused={paused}
        signalStage={signalStage}
        isSignalActive={isSignalActive}
      />

      {/* The 6 Subsystem Islands in 3D Space */}
      {DOMAINS.map((domain) => (
        <SubsystemIsland
          key={domain.id}
          domain={domain}
          layer={layer}
          isFocused={activeDomainId === domain.id}
          activeDomainId={activeDomainId}
          paused={paused}
          params={params}
          pulseTrigger={pulseTrigger}
          onSelect={() => onSelectDomain(domain.id)}
          isSignalActive={isSignalActive && DOMAINS[signalStage % DOMAINS.length]?.id === domain.id}
        />
      ))}

      {/* Camera Controller with inspector offset awareness & autoRotate */}
      <CameraRig
        activeDomain={activeDomain}
        preset={cameraPreset}
        isInspectorOpen={isInspectorOpen}
        autoRotate={autoRotate}
      />
    </>
  );
}
