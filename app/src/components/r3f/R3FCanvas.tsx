import React from 'react';
import { Canvas } from '@react-three/fiber';
import type { CanvasProps } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface R3FCanvasProps {
  height?: string;
  camera?: CanvasProps['camera'];
  className?: string;
  children: React.ReactNode;
}

export function R3FCanvas({ 
  height = 'h-96', 
  camera = { position: [0, 0, 4], fov: 50 }, 
  className = 'bg-obsidian-1', 
  children 
}: R3FCanvasProps) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 ${className} overflow-hidden`}>
      <Canvas camera={camera}>
        {children}
      </Canvas>
    </div>
  );
}

/**
 * R3FControls — renders OrbitControls with optional auto-rotation.
 *
 * Pass `autoRotate={true}` for passive camera rotation when the scene
 * has no internal `useFrame` rotation. Returns `null` when both
 * `interactive` and `autoRotate` are `false`, producing a static camera.
 */
export function R3FControls({ 
  interactive, 
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enablePan = false 
}: { 
  interactive: boolean; 
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enablePan?: boolean;
}) {
  if (!interactive && !autoRotate) return null;
  return (
    <OrbitControls
      enablePan={enablePan}
      enableRotate={interactive}
      enableZoom={interactive}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
    />
  );
}

export function R3FEnvironment({ 
  starsCount = 3000, 
  ambientIntensity = 0.2 
}: { 
  starsCount?: number; 
  ambientIntensity?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <Stars radius={100} depth={50} count={starsCount} factor={4} saturation={0} fade speed={prefersReducedMotion ? 0 : 1} />
    </>
  );
}
