import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Atom, Layers } from 'lucide-react';
import { DeferredScene, type DeferredSceneLoader } from '../components/exhibit/DeferredScene';

type SceneProps = { height?: string; interactive?: boolean };

const visuals = [
  { title: 'The 3D Skyrmion', text: 'A basic 3D mesh representation of a chiral skyrmion tube built with Three.js primitives.', loader: () => import('../components/r3f/SkyrmionScene') },
  { title: 'The magnetic knot', text: 'A rotatable 3D texture makes the stored state tangible.', loader: () => import('../components/r3f/HopfionScene') },
  { title: 'Reservoir response', text: 'Inputs perturb a field; relaxation produces patterns a readout can learn.', loader: () => import('../components/r3f/BrownianReservoirScene') },
  { title: 'Stabilization', text: 'Competing directions resolve into a coherent twist.', loader: () => import('../components/r3f/DmiStabilizerScene') },
  { title: 'Readout', text: 'One magnetic state becomes one simple candidate signal.', loader: () => import('../components/r3f/ReadoutScene') },
  { title: 'Scaling', text: 'The same knot repeats from a cell to a three-dimensional array.', loader: () => import('../components/r3f/ScaleTransitionScene') },
  { title: 'Incoherent Milnor light', text: 'Topological knots embedded in zero-coherence singularities (μ = 0) with dual optical encoding.', loader: () => import('../components/r3f/IncoherentMilnorScene') },
];

export function VisualsPage() {
  return (
    <>
      <Helmet>
        <title>Visuals & 3D Cosmos — HELIOS-3D</title>
        <meta name="description" content="Interactive 3D models and the layered learning universe exploring post-CMOS spintronic computing." />
      </Helmet>

      {/* Flagship Callout to the Interactive 3D Cosmos */}
      <div className="mb-10 rounded-2xl border border-amber/30 bg-gradient-to-br from-obsidian-2 to-obsidian p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 border border-amber/30 px-3 py-1 text-xs font-semibold text-amber">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full-Screen Interactive 3D Experience</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-parchment">
              The HELIOS-3D Layered Learning Cosmos
            </h2>
            <p className="text-sm text-parchment-2 leading-relaxed">
              Step into the full 3D simulation stage where outer layers provide intuitive analogies and deeper layers unlock device physics, real-time parameter tuning, and exact quantum mathematical formulations.
            </p>
          </div>
          <Link
            to="/explore"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber to-ember px-5 py-3 text-sm font-bold text-obsidian shadow-lg hover:shadow-amber/20 transition-all whitespace-nowrap"
          >
            <span>Launch 3D Cosmos</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 text-xs font-sans uppercase tracking-[0.2em] font-bold text-amber">Curated exhibit</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Visuals Gallery</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">
          Individual focused models demonstrating core spintronic principles. The complete technical gallery remains available in{' '}
          <Link className="text-amber hover:underline" to="/figures">
            Figures
          </Link>.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {visuals.map(({ title, text, loader }) => (
          <article key={title} className="glass-card rounded-xl border border-obsidian-3/40 p-4">
            <DeferredScene
              loader={loader as DeferredSceneLoader<SceneProps>}
              sceneProps={{ height: 'h-64', interactive: true }}
              fallback={<div className="flex h-64 items-center justify-center p-6 text-center text-sm leading-relaxed text-parchment-2">{text}</div>}
            />
            <h2 className="mt-4 text-xl font-bold text-amber">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-parchment-2">{text}</p>
            <p className="sr-only">Static fallback: {text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
