import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HopfionScene from '../components/r3f/HopfionScene';
import ClaimsTable from '../components/ClaimsTable';
import LiteratureTimeline from '../components/charts/LiteratureTimeline';
import { groups } from './EvidencePage';
import { StageBadge } from '../components/StageBadge';

export function HomePage() {
  const allClaims = groups.flatMap((g) => g.rows);

  const thermodynamicCards = [
    {
      title: '600 TWh Energy Demand',
      description: 'Projected annual energy consumption of AI workloads and cloud data centers by 2026, posing an unsustainable resource strain on the global power grid.',
      citation: 'IEA AI Energy Report 2026',
      stage: 'established' as const,
    },
    {
      title: 'Thermodynamic Gating Limits',
      description: 'Physical coprocessors must shift from charge transport to topological spin textures to run calculations near the Landauer limit of energy dissipation.',
      citation: 'Nature Materials Focus 2026',
      stage: 'current' as const,
    },
  ];

  const highlightClaims = [
    {
      title: 'Hopfion Stability',
      description: 'EuS/Bi₂Se₃/EuS trilayer structures stabilize magnetic hopfion spin textures at room temperature.',
      source: 'Katmis et al.',
      stage: 'established' as const,
    },
    {
      title: 'TOHE Hallmark',
      description: 'Topological Orbital Hall Effect acts as a clear electronic readout signature for 3D hopfions.',
      source: 'Göbel & Lounis',
      stage: 'established' as const,
    },
    {
      title: 'NaNbO₃ Moiré Superlattices',
      description: 'Deterministic large-area fabrication of oxide twist-engineered membranes using thermal annealing.',
      source: 'Ghanbari et al. 2026',
      stage: 'established' as const,
    },
    {
      title: 'High-Field PEEM (150 mT)',
      description: 'Flower-like magnetic flux concentrators amplify local fields without Lorentz electron deflection.',
      source: 'Barrera et al. 2026',
      stage: 'established' as const,
    },
  ];

  const readingSteps = [
    { step: 1, title: 'Abstract', desc: 'Project pitch and the MCA + BRC dual-core spintronic architecture.', stage: 'established' as const, href: '/docs/established/abstract' },
    { step: 2, title: 'Candidate Materials', desc: 'Detailed material layers (EuS/Bi₂Se₃/EuS, FGT, Mn₃Sn) and stability.', stage: 'established' as const, href: '/docs/established/candidate-materials-and-mechanisms' },
    { step: 3, title: 'Literature Review', desc: 'Chronological evidence mapping and citations from 2024 to 2026.', stage: 'established' as const, href: '/docs/established/literature-review' },
    { step: 4, title: 'Claims Matrix', desc: 'The ledger separating demonstrated, inferred, proposed, and speculative claims.', stage: 'current' as const, href: '/docs/current/claims-matrix' },
    { step: 5, title: 'Pitch Deck Outline', desc: 'The full sequential narrative and pitch deck slides.', stage: 'speculative' as const, href: '/docs/speculative/pitch-deck-outline' },
  ];

  const keyCitations = [
    { year: '2024', author: 'Katmis et al.', journal: 'Nature', finding: 'Stabilized magnetic hopfion textures at topological insulator interfaces.' },
    { year: '2024', author: 'Göbel & Lounis', journal: 'PRB', finding: 'Identified the Topological Orbital Hall Effect as an electronic hallmark.' },
    { year: '2026', author: 'Ushakov et al.', journal: 'Nature Nanotech', finding: 'Coexistence of antiferroelectricity and switchable polarization in domain walls.' },
    { year: '2026', author: 'Ghanbari et al.', journal: 'ACS Nano', finding: 'Large-scale deterministic fabrication of oxide moiré superlattices.' },
    { year: '2026', author: 'Barrera et al.', journal: 'Small', finding: 'Flower-like flux concentrators for 150 mT high-field PEEM imaging.' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-obsidian text-parchment scrollbar-thin">
      <Helmet>
        <title>HELIOS-3D — Spintronic Coprocessor Architecture</title>
        <meta name="description" content="A visual presentation of the HELIOS-3D spintronic coprocessor architecture utilizing 3D hopfions." />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="min-h-[calc(100vh-64px)] snap-start snap-always relative flex flex-col justify-center py-16 px-6 md:px-12 border-b border-obsidian-3/40">
        <div className="mx-auto grid max-w-6xl w-full items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xl text-ember font-bold mb-4 tracking-[0.2em]">01</span>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl text-parchment">
              A spintronic coprocessor architecture using 3D hopfions.
            </h1>
            <p className="mb-8 text-lg md:text-xl leading-relaxed text-parchment-2 max-w-xl">
              HELIOS-3D is a proposed computing architecture that stores, transforms, and reads information in stable, three-dimensional magnetic spin textures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/start-here" className="inline-flex rounded-lg bg-gradient-to-r from-amber to-ember px-6 py-3.5 font-extrabold text-obsidian shadow-[0_4px_20px_rgba(255,107,26,0.25)] transition hover:shadow-[0_4px_30px_rgba(255,107,26,0.45)]">
                Start Here
              </Link>
              <Link to="/docs/current/claims-matrix" className="inline-flex rounded-lg border border-obsidian-3 bg-obsidian-2/40 px-6 py-3.5 font-bold text-parchment-2 hover:text-parchment hover:border-amber/40 transition">
                Claims Matrix
              </Link>
              <Link to="/figures" className="inline-flex rounded-lg border border-obsidian-3 bg-obsidian-2/40 px-6 py-3.5 font-bold text-parchment-2 hover:text-parchment hover:border-amber/40 transition">
                Figures Gallery
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <div className="glass-card w-full max-w-md rounded-2xl border border-amber/10 bg-obsidian-2/40 p-4 shadow-2xl">
              <HopfionScene height="h-[20rem] md:h-[24rem]" interactive={false} />
              <p className="mt-4 px-2 text-xs leading-relaxed text-parchment-2 font-mono text-center">
                3D Hopfion Soliton model (passive auto-rotation)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY NOW */}
      <section className="min-h-[calc(100vh-64px)] snap-start snap-always relative flex flex-col justify-center py-16 px-6 md:px-12 border-b border-obsidian-3/40 bg-obsidian-2/10">
        <div className="mx-auto max-w-6xl w-full">
          <span className="font-mono text-xl text-ember font-bold mb-4 tracking-[0.2em] block">02</span>
          <h2 className="mb-6 text-3xl font-extrabold md:text-5xl text-parchment leading-tight">
            Why now? The Thermodynamic Crisis.
          </h2>
          <p className="mb-10 text-lg text-parchment-2 max-w-3xl leading-relaxed">
            AI model workloads and cloud computing services face unsustainable energy budgets. Physical computing architectures must move beyond charge transport and semiconductor scaling.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            {thermodynamicCards.map((card, idx) => (
              <div key={idx} className="glass-card rounded-xl border border-obsidian-3 bg-obsidian-2/40 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <StageBadge stage={card.stage} size="sm" />
                    <span className="font-mono text-xs text-parchment-2">{card.citation}</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber mb-3">{card.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-parchment-2">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/start-here" className="inline-flex rounded-lg bg-amber px-6 py-3 font-extrabold text-obsidian hover:bg-gold transition shadow-md">
            Read the evidence trail
          </Link>
        </div>
      </section>

      {/* SECTION 3: EVIDENCE DASHBOARD */}
      <section className="min-h-[calc(100vh-64px)] snap-start snap-always relative flex flex-col justify-center py-16 px-6 md:px-12 border-b border-obsidian-3/40">
        <div className="mx-auto max-w-6xl w-full">
          <span className="font-mono text-xl text-ember font-bold mb-4 tracking-[0.2em] block">03</span>
          <h2 className="mb-6 text-3xl font-extrabold md:text-5xl text-parchment leading-tight">
            Evidence Dashboard
          </h2>
          <p className="mb-8 text-lg text-parchment-2 max-w-3xl leading-relaxed">
            HELIOS-3D anchors its claims in peer-reviewed physical evidence. Below is our highlight verification matrix separating demonstrated physical parameters.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {highlightClaims.map((claim, idx) => (
              <div key={idx} className="glass-card rounded-xl border border-obsidian-3 bg-obsidian-2/30 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <StageBadge stage={claim.stage} size="sm" />
                    <span className="font-mono text-[10px] text-parchment-2">{claim.source}</span>
                  </div>
                  <h4 className="font-bold text-parchment mb-2">{claim.title}</h4>
                  <p className="text-xs text-parchment-2 leading-relaxed">{claim.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <ClaimsTable rows={allClaims} />
          </div>

          <Link to="/docs/current/claims-matrix" className="inline-flex rounded-lg border border-amber/60 px-5 py-2.5 font-bold text-amber hover:bg-amber/5 transition">
            See the full claims matrix
          </Link>
        </div>
      </section>

      {/* SECTION 4: 2026 EVIDENCE BASE */}
      <section className="min-h-[calc(100vh-64px)] snap-start snap-always relative flex flex-col justify-center py-16 px-6 md:px-12 border-b border-obsidian-3/40 bg-obsidian-2/10">
        <div className="mx-auto max-w-6xl w-full">
          <span className="font-mono text-xl text-ember font-bold mb-4 tracking-[0.2em] block">04</span>
          <h2 className="mb-6 text-3xl font-extrabold md:text-5xl text-parchment leading-tight">
            2026 Evidence Base & Timeline
          </h2>
          <p className="mb-8 text-lg text-parchment-2 max-w-3xl leading-relaxed">
            Our timeline traces research progress on interface-stabilized 3D spin textures, oxide twistronics, and magnetic imaging.
          </p>

          <div className="mb-10">
            <LiteratureTimeline />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
            {keyCitations.map((cite, idx) => (
              <div key={idx} className="bg-obsidian-2/50 border border-obsidian-3/40 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-amber mb-2">
                    <span>{cite.year}</span>
                    <span className="text-[10px] text-parchment-2">{cite.journal}</span>
                  </div>
                  <h5 className="font-bold text-sm text-parchment mb-1.5">{cite.author}</h5>
                  <p className="text-xs text-parchment-2 leading-snug">{cite.finding}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/docs/established/literature-review" className="inline-flex rounded-lg border border-amber/60 px-5 py-2.5 font-bold text-amber hover:bg-amber/5 transition">
            Read the full literature review
          </Link>
        </div>
      </section>

      {/* SECTION 5: READING PATH & FOOTER */}
      <section className="min-h-[calc(100vh-64px)] snap-start snap-always relative flex flex-col justify-between py-16 px-6 md:px-12">
        <div className="mx-auto max-w-6xl w-full flex-1 flex flex-col justify-center">
          <span className="font-mono text-xl text-ember font-bold mb-4 tracking-[0.2em] block">05</span>
          <h2 className="mb-6 text-3xl font-extrabold md:text-5xl text-parchment leading-tight">
            Where to start
          </h2>
          <p className="mb-10 text-lg text-parchment-2 max-w-3xl leading-relaxed">
            Follow the curated reading path below to evaluate the scientific grounding, target metrics, and proposed roadmap of HELIOS-3D.
          </p>

          <ol className="relative space-y-6 max-w-2xl mb-12">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-obsidian-3" aria-hidden="true"></div>
            {readingSteps.map((step) => (
              <li key={step.step} className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6 pl-2">
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-obsidian border border-ember shadow-md">
                  <span className="font-mono text-amber text-sm font-bold">{String(step.step).padStart(2, '0')}</span>
                </div>
                <div>
                  <Link to={step.href} className="text-lg font-bold text-amber hover:underline hover:text-ember transition-colors">
                    {step.title}
                  </Link>
                  <p className="text-xs text-parchment-2 mt-0.5">{step.desc}</p>
                </div>
                <div>
                  <StageBadge stage={step.stage} size="sm" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Dynamic Footer for the snap container */}
        <footer className="w-full border-t border-obsidian-3/60 pt-6 mt-12">
          <div className="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-parchment-2 font-mono">
            <span>HELIOS-3D · Spintronic Coprocessor Project</span>
            <a href="https://github.com/myrqyry/HELIOS-3D" className="hover:text-ember transition-colors" target="_blank" rel="noreferrer">
              Source Code on GitHub
            </a>
            <span>Last updated: July 2026</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
