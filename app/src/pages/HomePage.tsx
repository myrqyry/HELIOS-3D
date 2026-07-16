import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HopfionScene from '../components/r3f/HopfionScene';
import SkyrmionScene from '../components/r3f/SkyrmionScene';
import BrownianReservoirScene from '../components/r3f/BrownianReservoirScene';
import DmiStabilizerScene from '../components/r3f/DmiStabilizerScene';
import TopologicalOrbitalHallScene from '../components/r3f/TopologicalOrbitalHall';
import MaterialStackScene from '../components/r3f/MaterialStack';
import { ExhibitSection } from '../components/exhibit/ExhibitSection';

const promptCards = [
  { label: 'Store', text: 'Keep a stable magnetic state in a knot that does not need a moving charge.', href: '/figures' },
  { label: 'Compute', text: 'Let topology, interfaces, and fluctuations transform inputs into useful states.', href: '/overview' },
  { label: 'Read', text: 'Follow the evidence from established physics to the proposed machine.', href: '/explore' },
];

export function HomePage() {
  return (
    <div className="-mx-6 -my-12 max-w-none">
      <Helmet>
        <title>HELIOS-3D — Magnetic knots as a computer</title>
        <meta name="description" content="An interactive exhibit about HELIOS-3D and magnetic knots as a proposed computing substrate." />
      </Helmet>

      <section className="relative overflow-hidden border-b border-obsidian-3/20 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-amber">An interactive research exhibit</p>
            <h1 className="mb-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              HELIOS-3D is a 3D computer built from magnetic knots.
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-parchment-2">
              A proposed architecture that stores, transforms, and reads information in three-dimensional spin textures.
            </p>
            <Link to="/explore" className="inline-flex rounded-lg bg-gradient-to-r from-amber to-ember px-6 py-3.5 font-extrabold text-obsidian shadow-[0_4px_20px_rgba(255,107,26,0.25)] transition hover:shadow-[0_4px_30px_rgba(255,107,26,0.45)]">
              Explore the idea <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="glass-card rounded-2xl border border-amber/20 p-3">
              <HopfionScene height="h-[24rem]" interactive={true} />
              <p className="mt-3 px-2 pb-1 text-sm leading-relaxed text-parchment-2">Text fallback: a hopfion is a closed, knotted magnetic texture. Drag the visual to inspect its shape.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-obsidian-3/20 bg-obsidian-2/10 py-16" aria-labelledby="prompts-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="prompts-heading" className="mb-8 text-2xl font-bold text-parchment">Three ways into the exhibit</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {promptCards.map((card) => (
              <Link key={card.label} to={card.href} className="glass-card rounded-xl border border-obsidian-3/40 p-6 transition-colors hover:border-amber/40">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">{card.label}</p>
                <p className="leading-relaxed text-parchment-2">{card.text}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-amber">Enter →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ExhibitSection id="knot-explainer" eyebrow="01 / The object" title="Why a knot?" description="A magnetic knot carries structure through its three-dimensional linking. The useful question is not whether it looks exotic, but whether the state can be created, moved, and read reliably." evidenceLabel="Compare the textures" evidenceHref="/figures">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-obsidian-3/40 bg-obsidian-2/30 p-3">
            <SkyrmionScene height="h-56" interactive={true} />
            <p className="mt-3 text-sm leading-relaxed text-parchment-2">Text fallback: a planar skyrmion is a 2D magnetic texture whose drift can complicate transport.</p>
          </div>
          <div className="rounded-xl border border-amber/20 bg-amber/5 p-3">
            <HopfionScene height="h-56" interactive={true} />
            <p className="mt-3 text-sm leading-relaxed text-parchment-2">Text fallback: a hopfion closes the texture into a 3D linked state, offering a route to rectilinear transport.</p>
          </div>
        </div>
      </ExhibitSection>

      <ExhibitSection id="brc" eyebrow="02 / Compute" title="BRC: compute with the reservoir" description="Brownian reservoir computing treats controlled fluctuations as part of the computation. This is a proposed core, not a demonstrated product: the experiment is to measure whether the reservoir retains useful memory." evidenceLabel="Read the architecture" evidenceHref="/docs/speculative/core-architecture">
        <div className="rounded-xl border border-obsidian-3/40 bg-obsidian-2/30 p-3">
          <BrownianReservoirScene height="h-72" interactive={true} />
          <p className="mt-3 text-sm leading-relaxed text-parchment-2">Text fallback: input pulses enter a fluctuating reservoir, relax into a mixed state, and are sampled as a readout. The animation represents the proposed mechanism.</p>
        </div>
      </ExhibitSection>

      <ExhibitSection id="dmi" eyebrow="03 / Make the knot" title="DMI: give the texture a handedness" description="Dzyaloshinskii–Moriya interaction favors chiral spin arrangements at an interface. In the proposed stack, that preference helps define which textures can form and persist." evidenceLabel="Inspect candidate materials" evidenceHref="/docs/established/candidate-materials-and-mechanisms">
        <div className="rounded-xl border border-obsidian-3/40 bg-obsidian-2/30 p-3">
          <DmiStabilizerScene height="h-72" interactive={true} />
        </div>
      </ExhibitSection>

      <ExhibitSection id="readout" eyebrow="04 / Read" title="Readout: turn topology into a signal" description="A useful computer needs an electrical observable. HELIOS-3D points to orbital and transverse responses as candidate readout channels, while keeping the measurement path open to validation." evidenceLabel="Open the visual index" evidenceHref="/figures">
        <div className="rounded-xl border border-obsidian-3/40 bg-obsidian-2/30 p-3">
          <TopologicalOrbitalHallScene height="h-72" interactive={true} />
          <p className="mt-3 text-sm leading-relaxed text-parchment-2">Text fallback: colored arrows represent candidate transverse responses around the texture. The visual is a conceptual map, not a measured trace.</p>
        </div>
      </ExhibitSection>

      <ExhibitSection id="scaling" eyebrow="05 / Scale" title="Scaling starts with a stack" description="The proposed EuS / Bi₂Se₃ / EuS stack places chiral magnetic layers around a topological-insulator interface. Material choice is a constraint, not a promise of fabrication." evidenceLabel="See the evidence trail" evidenceHref="/research">
        <div className="rounded-xl border border-obsidian-3/40 bg-obsidian-2/30 p-3">
          <MaterialStackScene height="h-72" interactive={true} />
          <p className="mt-3 text-sm leading-relaxed text-parchment-2">Text fallback: two EuS layers surround a Bi₂Se₃ interface. The stack visualizes the candidate geometry and its open experimental questions.</p>
        </div>
      </ExhibitSection>

      <section className="border-t border-obsidian-3/20 bg-obsidian-2/10 py-20" aria-labelledby="depth-heading">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">06 / Evidence and depth</p>
          <h2 id="depth-heading" className="mb-5 text-3xl font-extrabold md:text-4xl">The exhibit is the short version.</h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-parchment-2">Every visual points to a deeper record. Follow the distinctions between demonstrated, inferred, proposed, and speculative claims before drawing conclusions.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/research" className="rounded-lg border border-amber/60 px-5 py-3 font-semibold text-amber transition hover:bg-amber/5">Browse evidence →</Link>
            <Link to="/docs/current/claims-matrix" className="rounded-lg border border-obsidian-3/60 px-5 py-3 font-semibold text-parchment-2 transition hover:border-parchment-2">Check claim stages →</Link>
            <Link to="/docs/established/literature-review" className="rounded-lg border border-obsidian-3/60 px-5 py-3 font-semibold text-parchment-2 transition hover:border-parchment-2">Read the sources →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
