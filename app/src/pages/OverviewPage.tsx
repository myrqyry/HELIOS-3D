import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ResearchFeed } from '../components/ResearchFeed';

const readingPath = [
  { label: 'Overview', href: '/overview' },
  { label: 'Start here', href: '/start-here' },
  { label: 'Claims matrix', href: '/docs/current/claims-matrix' },
  { label: 'Literature review', href: '/docs/established/literature-review' },
];

export function OverviewPage() {
  return (
    <>
      <Helmet>
        <title>Overview — HELIOS-3D</title>
        <meta name="description" content="A plain-language introduction to HELIOS-3D." />
      </Helmet>
      <header className="mb-12 pb-6 border-b border-obsidian-3">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber mb-3">Public overview</p>
        <h1 className="text-5xl font-bold text-amber mb-4">What HELIOS-3D is, and is not</h1>
        <p className="text-lg text-parchment-2 max-w-3xl leading-relaxed">
          HELIOS-3D is a research site about a speculative spintronic computing program. It asks whether magnetic
          textures such as hopfions could one day support more energy-efficient computation.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3 mb-12">
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h2 className="text-xl font-bold text-amber mb-3">Why it exists</h2>
          <p className="text-parchment-2 leading-relaxed">Modern computing moves a lot of charge, and moving charge costs energy.</p>
        </article>
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h2 className="text-xl font-bold text-amber mb-3">What it studies</h2>
          <p className="text-parchment-2 leading-relaxed">A staged research path: established physics, candidate materials, current evidence, and speculation.</p>
        </article>
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h2 className="text-xl font-bold text-amber mb-3">What it does not claim</h2>
          <p className="text-parchment-2 leading-relaxed">The site does not present a finished chip or proven sub-Landauer computer.</p>
        </article>
      </section>

      <section className="mb-12">
        <ResearchFeed use="overview" title="Public research feed" summary="A compact feed of normalized records." limit={2} compact={true} />
        <div className="mt-4 rounded-lg border border-obsidian-3 bg-obsidian-2 px-4 py-3 text-sm text-parchment-2">
          Want the full list? Open the <Link className="text-amber hover:underline" to="/research">research browser</Link>.
        </div>
      </section>

      <section className="rounded-xl border border-ember/25 bg-ember/5 p-6 mb-12">
        <h2 className="text-2xl font-bold text-amber mb-3">How to read the site</h2>
        <p className="text-parchment-2 leading-relaxed mb-5 max-w-3xl">Start here for the big picture, then move into the evidence trail.</p>
        <div className="flex flex-wrap gap-3">
          {readingPath.map((item) => (
            <Link key={item.href} to={item.href} className="rounded-full border border-obsidian-3 px-4 py-2 text-sm text-parchment-2 hover:border-amber hover:text-amber transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h2 className="text-2xl font-bold text-amber mb-3">The public version</h2>
          <p className="text-parchment-2 leading-relaxed mb-4">New to the topic? Read this page first, then use the guided path.</p>
          <Link to="/start-here" className="text-amber hover:underline">Open the guided path →</Link>
        </article>
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h2 className="text-2xl font-bold text-amber mb-3">The technical trail</h2>
          <p className="text-parchment-2 leading-relaxed mb-4">Want the evidence first? Jump to the claims matrix and literature review.</p>
          <Link to="/docs/current/claims-matrix" className="text-amber hover:underline">Open the claims matrix →</Link>
        </article>
      </section>
    </>
  );
}
