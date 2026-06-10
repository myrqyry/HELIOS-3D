import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function NucleationEvent() {
  const [phase, setPhase] = useState(0); // 0 to 1 (Twist Accumulation to Nucleation)
  const topLayer = useRef<THREE.Group>(null);
  const hopfion = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime % 6) / 6; // 6s cycle
    setPhase(t);

    if (topLayer.current) {
      // Accumulate twist up to 0.75, then reset
      const twist = t < 0.75 ? (t / 0.75) * Math.PI * 0.5 : 0;
      topLayer.current.rotation.y = twist;
    }

    if (hopfion.current) {
      // Nucleate at 0.75 phase
      const scale = t > 0.75 ? (t - 0.75) / 0.25 : 0;
      hopfion.current.scale.setScalar(scale * 0.8);
      hopfion.current.visible = t > 0.75;
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
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-1 overflow-hidden`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} />
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffb627" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <NucleationEvent />
        </Float>
        {interactive && <OrbitControls enablePan={false} />}
      </Canvas>
    </div>
  );
}
