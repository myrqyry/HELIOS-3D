import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DeferredScene, type DeferredSceneLoader } from '../components/exhibit/DeferredScene';

interface FigureData {
  title: string;
  kind: 'r3f' | 'svg' | 'chart' | 'image';
  source: 'stylized' | 'data-driven';
  component: string;
  description: string;
}

const figures: FigureData[] = [
  { title: 'Hopfion Knot', kind: 'r3f', source: 'stylized', component: 'HopfionScene', description: '3D topological Hopfion soliton visualization — a knotted spin texture.' },
  { title: 'Skyrmion Texture', kind: 'r3f', source: 'stylized', component: 'SkyrmionScene', description: '2D Néel-type skyrmion with spin vectors radiating from the core.' },
  { title: 'Material Stack', kind: 'r3f', source: 'stylized', component: 'MaterialStack', description: 'EuS/Bi₂Se₃/EuS trilayer heterostructure.' },
  { title: 'DMI Chirality', kind: 'r3f', source: 'stylized', component: 'DmiChirality', description: 'Dzyaloshinskii-Moriya interaction spin texture at a chiral interface.' },
  { title: 'Twist Reservoir Nucleation', kind: 'r3f', source: 'stylized', component: 'TwistReservoirNucleation', description: 'Sequential twist-accumulation and hopfion nucleation from a rewritable layer.' },
  { title: 'Topological Orbital Hall', kind: 'r3f', source: 'data-driven', component: 'TopologicalOrbitalHall', description: '3D orbital Hall currents and hallmark spin textures around a central hopfion ring.' },
  { title: 'Breathing Mode Spectrum', kind: 'chart', source: 'data-driven', component: 'BreathingModeSpectrum', description: 'Sub-GHz breathing-mode frequency spectrum for candidate systems.' },
  { title: 'Energy Barrier', kind: 'chart', source: 'data-driven', component: 'EnergyBarrier', description: 'Comparative energy barriers (in kBT) for topological configurations.' },
  { title: 'Literature Timeline', kind: 'chart', source: 'data-driven', component: 'LiteratureTimeline', description: 'Chronological evidence mapping from 2024 to 2026.' },
  { title: 'Performance Floor', kind: 'chart', source: 'data-driven', component: 'PerformanceFloor', description: 'Write speed and energy density benchmarks for candidate systems.' },
  { title: 'Readout Signal', kind: 'r3f', source: 'stylized', component: 'ReadoutScene', description: 'Conceptual mapping from one magnetic state to one electrical or optical signal.' },
  { title: 'Scale Transition', kind: 'r3f', source: 'stylized', component: 'ScaleTransitionScene', description: 'Repeated magnetic knots staged from a single knot to a three-dimensional array.' },
];

const allSources = Array.from(new Set(figures.map((f) => f.source)));
const allKinds = Array.from(new Set(figures.map((f) => f.kind)));

type FigureSceneProps = { height?: string };

const sceneComponents = {
  HopfionScene: () => import('../components/r3f/HopfionScene'),
  SkyrmionScene: () => import('../components/r3f/SkyrmionScene'),
  MaterialStack: () => import('../components/r3f/MaterialStack'),
  DmiChirality: () => import('../components/r3f/DmiChirality'),
  TwistReservoirNucleation: () => import('../components/r3f/TwistReservoirNucleation'),
  TopologicalOrbitalHall: () => import('../components/r3f/TopologicalOrbitalHall'),
  BreathingModeSpectrum: () => import('../components/charts/BreathingModeSpectrum'),
  EnergyBarrier: () => import('../components/charts/EnergyBarrier'),
  LiteratureTimeline: () => import('../components/charts/LiteratureTimeline'),
  PerformanceFloor: () => import('../components/charts/PerformanceFloor'),
  ReadoutScene: () => import('../components/r3f/ReadoutScene'),
  ScaleTransitionScene: () => import('../components/r3f/ScaleTransitionScene'),
} satisfies Record<string, DeferredSceneLoader<FigureSceneProps>>;

export function FiguresPage() {
  const [sourceFilter, setSourceFilter] = useState('all');
  const [kindFilter, setKindFilter] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('source') || 'all';
    const k = params.get('kind') || 'all';
    setSourceFilter(s);
    setKindFilter(k);
  }, []);

  const syncUrl = (source: string, kind: string) => {
    const next = new URL(window.location.href);
    if (source === 'all') next.searchParams.delete('source');
    else next.searchParams.set('source', source);
    if (kind === 'all') next.searchParams.delete('kind');
    else next.searchParams.set('kind', kind);
    window.history.replaceState({}, '', next);
  };

  const filtered = useMemo(() => {
    return figures.filter((f) => {
      return (sourceFilter === 'all' || f.source === sourceFilter) && (kindFilter === 'all' || f.kind === kindFilter);
    });
  }, [sourceFilter, kindFilter]);

  const setSource = (v: string) => { setSourceFilter(v); syncUrl(v, kindFilter); };
  const setKind = (v: string) => { setKindFilter(v); syncUrl(sourceFilter, v); };

  return (
    <>
      <Helmet>
        <title>Figures — HELIOS-3D</title>
        <meta name="description" content="All visualizations in the HELIOS-3D site." />
      </Helmet>
      <header className="mb-8 pb-6 border-b border-obsidian-3">
        <h1 className="text-5xl font-bold text-amber mb-3">Figures</h1>
        <p className="text-lg text-parchment-2 max-w-2xl">The complete technical gallery: every visualization used in the site, grouped by source and kind.</p>
      </header>
      <div className="mb-8 flex flex-wrap gap-4" aria-label="Figure filters">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mr-1 font-mono text-xs uppercase text-parchment-2">Source</legend>
          <button type="button" aria-pressed={sourceFilter === 'all'} onClick={() => setSource('all')} className={`min-h-11 font-mono text-xs px-3 py-1 rounded border border-obsidian-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${sourceFilter === 'all' ? 'bg-obsidian-2 text-amber' : 'text-parchment-2 hover:text-amber'}`}>All</button>
          {allSources.map((s) => (
            <button type="button" key={s} aria-pressed={sourceFilter === s} onClick={() => setSource(s)} className={`min-h-11 font-mono text-xs px-3 py-1 rounded border border-obsidian-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${sourceFilter === s ? 'bg-obsidian-2 text-amber' : 'text-parchment-2 hover:text-amber'}`}>{s}</button>
          ))}
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mr-1 font-mono text-xs uppercase text-parchment-2">Kind</legend>
          <button type="button" aria-pressed={kindFilter === 'all'} onClick={() => setKind('all')} className={`min-h-11 font-mono text-xs px-3 py-1 rounded border border-obsidian-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${kindFilter === 'all' ? 'bg-obsidian-2 text-amber' : 'text-parchment-2 hover:text-amber'}`}>All</button>
          {allKinds.map((k) => (
            <button type="button" key={k} aria-pressed={kindFilter === k} onClick={() => setKind(k)} className={`min-h-11 font-mono text-xs px-3 py-1 rounded border border-obsidian-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${kindFilter === k ? 'bg-obsidian-2 text-amber' : 'text-parchment-2 hover:text-amber'}`}>{k}</button>
          ))}
        </fieldset>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map((f) => {
          const loader = sceneComponents[f.component as keyof typeof sceneComponents];
          return (
            <article key={f.component} className="glass-card rounded-xl p-5 flex flex-col justify-between group overflow-hidden">
              <div>
                <div className="relative rounded-lg overflow-hidden border border-obsidian-3/45 bg-obsidian/30 shadow-inner">
                  {loader && (
                    <DeferredScene
                      loader={loader}
                      sceneProps={{ height: 'h-48' }}
                      fallback={<div className="flex h-48 items-center justify-center px-5 text-center text-sm text-parchment-2">Loading figure: {f.title}</div>}
                    />
                  )}
                </div>
                <h3 className="mt-4 font-bold text-amber text-lg group-hover:text-ember transition-colors">{f.title}</h3>
                <p className="text-sm text-parchment-2/90 mt-1.5 leading-relaxed">{f.description}</p>
              </div>
              <p className="text-xs font-mono text-parchment-2/80 mt-4 pt-3 border-t border-obsidian-3/30 flex items-center justify-between">
                <span>Source: <span className={f.source === 'data-driven' ? 'text-gold font-semibold' : 'text-cyan-2 font-semibold'}>{f.source}</span></span>
                <span className="px-2 py-0.5 bg-obsidian-2 rounded-full border border-obsidian-3/40 text-[10px] uppercase tracking-wider">{f.kind}</span>
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
