import HopfionScene from '../components/r3f/HopfionScene';
import SkyrmionScene from '../components/r3f/SkyrmionScene';
import MaterialStack from '../components/r3f/MaterialStack';
import DmiChirality from '../components/r3f/DmiChirality';
import TwistReservoirNucleation from '../components/r3f/TwistReservoirNucleation';
import TopologicalOrbitalHall from '../components/r3f/TopologicalOrbitalHall';
import type { ComponentType } from 'react';

export type SceneProps = {
  height?: string;
  interactive?: boolean;
};

export const figureMap: Record<string, ComponentType<SceneProps>> = {
  HopfionScene,
  SkyrmionScene,
  MaterialStack,
  DmiChirality,
  TwistReservoirNucleation,
  TopologicalOrbitalHall,
};
