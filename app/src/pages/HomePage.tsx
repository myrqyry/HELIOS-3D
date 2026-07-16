import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HopfionScene from '../components/r3f/HopfionScene';
import SkyrmionScene from '../components/r3f/SkyrmionScene';
import { ClaimsTable } from '../components/ClaimsTable';
import LiteratureTimeline from '../components/charts/LiteratureTimeline';
import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { StageBadge, type DocStage } from '../components/StageBadge';
import type { ClaimRow } from '../components/ClaimsTable';

const highlights: Array<{ doc: string; stage: DocStage; claim: string; href: string }> = [
  { doc: 'Core Architecture', stage: 'speculative', claim: 'MCA + BRC dual-core, hopfion-based', href: '/docs/speculative/core-architecture' },
  { doc: 'Candidate Materials', stage: 'established', claim: 'EuS / Bi₂Se₃ / EuS, FGT, Mn₃Sn', href: '/docs/established/candidate-materials-and-mechanisms' },
  { doc: 'Performance Floor', stage: 'current', claim: '40–60 ps write, pJ/µm² energy floor', href: '/docs/current/targets-comparators-and-projections' },
  { doc: 'Chiral Sensing', stage: 'speculative', claim: 'CISS, TOHE, peptide-crystal interface', href: '/docs/speculative/defensive-framework' },
];

const readingPath: Array<{ step: number; title: string; desc: string; stage: DocStage; href: string }> = [
  { step: 0, title: 'Overview', desc: 'A plain-language introduction to the project.', stage: 'established', href: '/overview' },
  { step: 1, title: 'Abstract', desc: 'Project pitch and dual-core architecture.', stage: 'established', href: '/docs/established/abstract' },
  { step: 2, title: 'Candidate Materials', desc: 'Spin textures and the EuS/Bi₂Se₃/EuS substrate.', stage: 'established', href: '/docs/established/candidate-materials-and-mechanisms' },
  { step: 3, title: 'Literature Review', desc: 'The 2026 evidence base.', stage: 'established', href: '/docs/established/literature-review' },
  { step: 4, title: 'Claims Matrix', desc: 'What is and is not demonstrated.', stage: 'current', href: '/docs/current/claims-matrix' },
  { step: 5, title: 'Pitch Deck Outline', desc: 'The full project narrative.', stage: 'speculative', href: '/docs/speculative/pitch-deck-outline' },
];

const homeClaims: ClaimRow[] = [
  { claim: 'Hopfion annihilation > 50kBT in EuS/Bi₂Se₃/EuS', tag: 'INFERRED', source: 'Literature Review' },
  { claim: 'Planar-first, electrical read is the minimum credible path', tag: 'INFERRED', source: 'Alternative Materials' },
  { claim: 'DISH enables sub-second 3D scaffolding with 19µm resolution', tag: 'PROPOSED', source: 'Literature Review' },
  { claim: 'Operation-level BRC reservoir thermodynamic accounting is possible', tag: 'SPECULATIVE', source: 'Abstract' },
  { claim: '40-ps write at 1.7 pJ/µm² in Mn₃Sn', tag: 'DEMONSTRATED', source: 'Literature Review' },
];

export function HomePage() {
  const isJsEnabled = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('js-enabled');
  }, []);

  return (
    <div className="-mx-6 -my-12 max-w-none">
      <Helmet>
        <title>HELIOS-3D</title>
        <meta name="description" content="HELIOS-3D: spintronic coprocessor research hypothesis." />
      </Helmet>

      {/* Section 1 — Hero */}
      <section className="relative min-h-[90vh] flex items-center border-b border-obsidian-3/20 overflow-hidden">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-ember/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-5 gap-12 items-center py-16">
          <div className="md:col-span-3 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/25 bg-amber/5 text-amber text-xs font-mono mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse"></span>
              Public-first research site
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              A research site about<br />
              <span className="gradient-text-amber drop-shadow-[0_0_20px_rgba(255,182,39,0.15)]">spintronic computing with 3D hopfions.</span>
            </h1>
            <p className="text-lg md:text-xl text-parchment-2/90 max-w-2xl mb-10 leading-relaxed">
              HELIOS-3D explains a staged research hypothesis in plain language first, then opens the technical evidence, claims, and roadmap underneath.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/overview" className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-amber to-ember text-obsidian font-extrabold shadow-[0_4px_20px_rgba(255,107,26,0.25)] hover:shadow-[0_4px_30px_rgba(255,107,26,0.45)] hover:scale-[1.03] transition-[transform,box-shadow] duration-300">
                Read the overview →
              </Link>
              <Link to="/start-here" className="px-6 py-3.5 rounded-lg border border-amber/70 text-amber font-semibold hover:bg-amber/5 hover:border-amber hover:scale-[1.03] transition-[transform,border-color,background-color] duration-300">
                Start reading →
              </Link>
              <Link to="/docs/current/claims-matrix" className="px-6 py-3.5 rounded-lg border border-obsidian-3/60 text-parchment-2 hover:text-parchment hover:border-parchment-2 hover:scale-[1.03] transition-[transform,border-color,color] duration-300">
                Read the claims →
              </Link>
              <Link to="/figures" className="px-6 py-3.5 rounded-lg border border-obsidian-3/60 text-parchment-2 hover:text-parchment hover:border-parchment-2 hover:scale-[1.03] transition-[transform,border-color,color] duration-300">
                See the 3D →
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="glass-card p-3 rounded-2xl relative overflow-hidden shadow-2xl border border-obsidian-3/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-ember/5 to-transparent pointer-events-none"></div>
              <HopfionScene height="h-[28rem]" interactive={true} />
              <div className="absolute bottom-4 left-4 bg-obsidian/60 backdrop-blur px-3 py-1 rounded border border-obsidian-3/40 text-xs font-mono text-parchment-2 pointer-events-none">
                Interactive 3D Hopfion knot (drag to rotate)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1.5 — Public overview */}
      <section className="relative border-b border-obsidian-3/20 bg-obsidian-2/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading number="01" title="A plain-language entry point" color="ember" />
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Start with the <span className="gradient-text-amber">idea</span>, then move into the evidence.
            </h2>
            <p className="text-parchment-2/95 text-base md:text-lg leading-relaxed">
              The site is designed so a curious reader can understand the project without already knowing the jargon.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/overview" className="glass-card block rounded-xl p-6 border border-obsidian-3/40 hover:border-amber/35 transition-colors">
              <h3 className="text-xl font-bold text-amber mb-3">1. Read the overview</h3>
              <p className="text-sm text-parchment-2/90 leading-relaxed">A short, plain-language explanation of the project.</p>
            </Link>
            <Link to="/start-here" className="glass-card block rounded-xl p-6 border border-obsidian-3/40 hover:border-amber/35 transition-colors">
              <h3 className="text-xl font-bold text-amber mb-3">2. Follow the guided path</h3>
              <p className="text-sm text-parchment-2/90 leading-relaxed">A reading order from orientation to evidence.</p>
            </Link>
            <Link to="/docs/current/claims-matrix" className="glass-card block rounded-xl p-6 border border-obsidian-3/40 hover:border-amber/35 transition-colors">
              <h3 className="text-xl font-bold text-amber mb-3">3. Check the evidence ladder</h3>
              <p className="text-sm text-parchment-2/90 leading-relaxed">See what is demonstrated, inferred, proposed, and speculative.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — Motivation */}
      <section className="relative border-b border-obsidian-3/20 bg-obsidian-2/10 overflow-hidden py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 flex flex-col justify-center">
            <SectionHeading number="02" title="The thermodynamic crisis is the motivation" color="cyan-2" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-snug">
              Traditional silicon computing faces an <span className="gradient-text-cyan">existential resource crisis</span>.
            </h2>
            <p className="text-parchment-2/95 text-base md:text-lg mb-10 leading-relaxed max-w-2xl">
              The scaling limits of charge-based silicon architectures are colliding with massive resource requirements.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <StatCard stat="600" unit="TWh" label="AI infrastructure electricity demand in 2026" source="IEA 2024/2026 Projections" tag="DEMONSTRATED" />
              <StatCard stat="4" unit="billion m³" label="Annual AI water withdrawal by 2027" source="Ren et al. (2025)" tag="DEMONSTRATED" />
            </div>
            <div className="mt-8">
              <Link to="/docs/established/literature-review" className="inline-block px-6 py-3 rounded-lg border border-cyan-2/70 text-cyan-2 font-semibold hover:bg-cyan-2/5 hover:border-cyan-2 hover:scale-[1.02] transition-[transform,border-color,background-color] duration-300">
                Read the evidence →
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="glass-card p-8 rounded-2xl border border-obsidian-3/40 bg-obsidian-2/30 flex flex-col gap-6 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-cyan-2 tracking-wider uppercase opacity-60">Physical Bounds</div>
              <h3 className="text-xl font-bold text-parchment">The Physical Bottlenecks</h3>
              <ul className="space-y-4 font-mono text-sm text-parchment-2">
                <li className="flex gap-3">
                  <span className="text-cyan-2 font-bold">1.</span>
                  <div>
                    <span className="text-parchment font-semibold">Landauer Limit:</span>
                    <p className="mt-1 text-xs text-parchment-2/80">Bit operations require dissipative energy proportional to k_B T ln 2.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-2 font-bold">2.</span>
                  <div>
                    <span className="text-parchment font-semibold">Resistance Heating:</span>
                    <p className="mt-1 text-xs text-parchment-2/80">Moving charge through copper interconnects causes severe ohmic losses.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-2 font-bold">3.</span>
                  <div>
                    <span className="text-parchment font-semibold">Topological Protection:</span>
                    <p className="mt-1 text-xs text-parchment-2/80">Magnetic spin textures (solitons) enable near-thermodynamic-limit computation.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — 2D vs 3D */}
      <section className="relative border-b border-obsidian-3/20 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading number="03" title="Topological Magnetism: 2D vs 3D" color="ember" />
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Why 3D Hopfions are <span className="gradient-text-amber">interesting</span>.</h2>
            <p className="text-parchment-2/95 text-base md:text-lg leading-relaxed">
              Spintronics replaces charge with spin. Early devices explored 2D spin textures like Skyrmions; HELIOS-3D proposes 3D Hopfions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col justify-between glass-card p-6 rounded-2xl border border-obsidian-3/40 bg-obsidian-2/10">
              <div>
                <div className="relative rounded-lg overflow-hidden border border-obsidian-3 bg-obsidian-1 shadow-inner mb-6">
                  <SkyrmionScene height="h-64" interactive={true} />
                  <div className="absolute bottom-3 left-3 bg-obsidian/75 px-2 py-0.5 rounded text-[10px] font-mono text-parchment-2 pointer-events-none">Interactive Skyrmion</div>
                </div>
                <h3 className="text-xl font-bold text-amber mb-3">2D Planar Skyrmions</h3>
                <p className="text-sm text-parchment-2 leading-relaxed mb-6">
                  Planar spin textures confined to thin films. The Skyrmion Hall Effect causes diagonal drift toward nanowire edges.
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-obsidian-3/30 pt-4 mt-auto">
                <span className="text-xs font-mono text-red-400 bg-red-400/5 border border-red-400/10 px-2 py-1 rounded">LIMITATION: Skyrmion Hall Effect</span>
              </div>
            </div>
            <div className="flex flex-col justify-between glass-card p-6 rounded-2xl border border-amber/20 bg-amber/5">
              <div>
                <div className="relative rounded-lg overflow-hidden border border-amber/20 bg-obsidian-1 shadow-inner mb-6">
                  <HopfionScene height="h-64" interactive={true} />
                  <div className="absolute bottom-3 left-3 bg-obsidian/75 px-2 py-0.5 rounded text-[10px] font-mono text-parchment-2 pointer-events-none">Interactive Hopfion</div>
                </div>
                <h3 className="text-xl font-bold text-amber mb-3">3D Solitonic Hopfions</h3>
                <p className="text-sm text-parchment-2 leading-relaxed mb-6">
                  Three-dimensional magnetic solitons forming closed, knotted loops. May avoid or reduce Skyrmion Hall drift.
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-obsidian-3/30 pt-4 mt-auto">
                <span className="text-xs font-mono text-green-400 bg-green-400/5 border border-green-400/10 px-2 py-1 rounded">ADVANTAGE: Zero Net Topological Hall Drift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Dual Core */}
      <section className="relative border-b border-obsidian-3/20 bg-obsidian-2/15 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading number="04" title="The HELIOS-3D Dual-Core System" color="ember" />
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Architectural Integration: <span className="gradient-text-amber">Deterministic + Probabilistic Cores</span>
            </h2>
            <p className="text-parchment-2/95 text-base md:text-lg leading-relaxed">
              HELIOS-3D moves beyond general-purpose computing to optimize cognitive processing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl border border-obsidian-3/45 bg-obsidian-2/30 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-ember/5 rounded-full blur-xl group-hover:bg-ember/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-ember tracking-widest uppercase bg-ember/5 border border-ember/20 px-2.5 py-1 rounded-full">Core A</span>
                <span className="text-xs font-mono text-parchment-2 uppercase">Proposed</span>
              </div>
              <h3 className="text-2xl font-bold text-amber mb-4">Magnetic Convolutional Accelerator (MCA)</h3>
              <p className="text-sm text-parchment-2 leading-relaxed mb-6">
                A deterministic sensory preprocessor using spin textures for in-memory matrix multiplication.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-parchment-2/90 border-t border-obsidian-3/30 pt-6">
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Write latency: <span className="text-parchment font-bold">40–60 ps</span></li>
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Sub-nanosecond matrix multiplication</li>
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Non-volatile magnetic memory integration</li>
              </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-obsidian-3/45 bg-obsidian-2/30 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-ember/5 rounded-full blur-xl group-hover:bg-ember/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-ember tracking-widest uppercase bg-ember/5 border border-ember/20 px-2.5 py-1 rounded-full">Core B</span>
                <span className="text-xs font-mono text-parchment-2 uppercase">Proposed</span>
              </div>
              <h3 className="text-2xl font-bold text-amber mb-4">Brownian Reservoir Computing (BRC)</h3>
              <p className="text-sm text-parchment-2 leading-relaxed mb-6">
                A probabilistic decision-making core that harnesses environmental fluctuations for computation.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-parchment-2/90 border-t border-obsidian-3/30 pt-6">
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Noise-assisted thermodynamic computation</li>
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Reservoir dimensionality expansion</li>
                <li className="flex items-center gap-2"><span className="text-amber">⚡</span> Approaching the Landauer energy floor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Evidence */}
      <section className="relative border-b border-obsidian-3/20 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading number="05" title="Evidence structure" color="ember" />
          <p className="text-lg text-parchment-2/90 max-w-3xl mb-12 leading-relaxed">
            Our research framework segments claims transparently across four developmental stages.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {highlights.map((h) => (
              <Link key={h.doc} to={h.href} className="glass-card block rounded-xl p-6 relative group overflow-hidden border border-obsidian-3/40 hover:border-ember/30">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-ember/5 rounded-full blur-xl group-hover:bg-ember/10 transition-colors duration-300"></div>
                <div className="flex items-center justify-between mb-4">
                  <StageBadge stage={h.stage} size="sm" />
                </div>
                <h3 className="text-amber font-bold text-lg mb-2 group-hover:text-ember transition-colors">{h.doc}</h3>
                <p className="text-sm text-parchment-2/90 leading-relaxed">{h.claim}</p>
              </Link>
            ))}
          </div>
          <ClaimsTable rows={homeClaims} />
        </div>
      </section>
    </div>
  );
}
