import { useRef, useMemo, useState, createContext, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { R3FCanvas, R3FControls, R3FEnvironment } from './R3FCanvas';

interface NucleationState {
  phase: number;
  isPlaying: boolean;
}

interface NucleationActions {
  setPhase: (phase: number) => void;
  togglePlay: () => void;
}

const NucleationContext = createContext<{ state: NucleationState; actions: NucleationActions } | null>(null);

export function NucleationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<NucleationState>({ phase: 0, isPlaying: true });
  const actions = useMemo(() => ({
    setPhase: (phase: number) => setState((s) => ({ ...s, phase })),
    togglePlay: () => setState((s) => ({ ...s, isPlaying: !s.isPlaying })),
  }), []);

  return (
    <NucleationContext.Provider value={{ state, actions }}>
      {children}
    </NucleationContext.Provider>
  );
}

export function useNucleation() {
  const ctx = useContext(NucleationContext);
  if (!ctx) throw new Error('useNucleation must be used within NucleationProvider');
  return ctx;
}

function NucleationEvent() {
  const { state: { phase, isPlaying }, actions: { setPhase } } = useNucleation();
  const topLayer = useRef<THREE.Group>(null);
  const hopfion = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!isPlaying) return;

    // Increment phase based on time
    const nextPhase = (phase + delta / 6) % 1; // 6s cycle
    setPhase(nextPhase);

    if (topLayer.current) {
      // Accumulate twist up to 0.75, then reset
      const twist = phase < 0.75 ? (phase / 0.75) * Math.PI * 0.5 : 0;
      topLayer.current.rotation.y = twist;
    }

    if (hopfion.current) {
      // Nucleate at 0.75 phase
      const scale = phase > 0.75 ? (phase - 0.75) / 0.25 : 0;
      hopfion.current.scale.setScalar(scale * 0.8);
      hopfion.current.visible = phase > 0.75;
    }
  });

  return (
    <group>
      {/* Bottom Layer (Patterned) */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3, 32, 32]} />
        <meshStandardMaterial color="#7dd3fc" wireframe />
      </mesh>

      {/* Top Layer (Rewritable) */}
      <group ref={topLayer} position={[0, 0.6, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3, 32, 32]} />
          <meshStandardMaterial color="#ff6b1a" wireframe transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Emerging 3D Hopfion */}
      <mesh ref={hopfion} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial color="#ffb627" emissive="#ffb627" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

export default function TwistReservoirNucleationScene({ height = 'h-96', interactive = false }: { height?: string; interactive?: boolean }) {
  return (
    <NucleationProvider>
      <R3FCanvas height={height} className="bg-obsidian-1" camera={{ position: [3, 3, 3], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <R3FEnvironment starsCount={5000} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffb627" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <NucleationEvent />
        </Float>
        <R3FControls interactive={interactive} />
      </R3FCanvas>
    </NucleationProvider>
  );
}

