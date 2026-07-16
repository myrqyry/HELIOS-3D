import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StageBadge, type DocStage } from '../components/StageBadge';

const path: Array<{ step: number; title: string; desc: string; stage: DocStage; href: string }> = [
  { step: 0, title: 'Overview', desc: 'A plain-language introduction to the project.', stage: 'established', href: '/overview' },
  { step: 1, title: 'Abstract', desc: 'Project pitch and dual-core architecture.', stage: 'established', href: '/docs/established/abstract' },
  { step: 2, title: 'Candidate Materials', desc: 'Spin textures and the EuS/Bi₂Se₃/EuS substrate.', stage: 'established', href: '/docs/established/candidate-materials-and-mechanisms' },
  { step: 3, title: 'Literature Review', desc: 'The 2026 evidence base.', stage: 'established', href: '/docs/established/literature-review' },
  { step: 4, title: 'Claims Matrix', desc: 'What is and is not demonstrated.', stage: 'current', href: '/docs/current/claims-matrix' },
  { step: 5, title: 'Pitch Deck Outline', desc: 'The full project narrative.', stage: 'speculative', href: '/docs/speculative/pitch-deck-outline' },
];

export function StartHerePage() {
  return (
    <>
      <Helmet>
        <title>Start Here — HELIOS-3D</title>
        <meta name="description" content="A reading path for newcomers to HELIOS-3D." />
      </Helmet>
      <header className="mb-12 pb-6 border-b border-obsidian-3">
        <h1 className="text-5xl font-bold text-amber mb-3">Start Here</h1>
        <p className="text-lg text-parchment-2 max-w-2xl">If you are new, start with the overview and read forward. Plain language to evidence trail.</p>
      </header>
      <ol className="relative space-y-8 mb-16">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-obsidian-3" aria-hidden="true"></div>
        {path.map((p) => (
          <li key={p.step} className="relative grid grid-cols-[auto_1fr_auto] items-start gap-6 pl-2">
            <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-obsidian border-2 border-ember">
              <span className="font-mono text-amber text-lg">{String(p.step).padStart(2, '0')}</span>
            </div>
            <div>
              <Link to={p.href} className="text-2xl font-bold text-amber hover:underline">{p.title}</Link>
              <p className="mt-1 text-parchment-2">{p.desc}</p>
            </div>
            <div className="pt-3">
              <StageBadge stage={p.stage} size="sm" />
            </div>
          </li>
        ))}
      </ol>
      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h3 className="text-amber font-bold mb-2">If you only have 2 minutes</h3>
          <p className="text-parchment-2 mb-3">Read the overview for the short version.</p>
          <Link to="/overview" className="text-amber hover:underline">Read overview →</Link>
        </article>
        <article className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-6">
          <h3 className="text-amber font-bold mb-2">If you have 30 minutes</h3>
          <p className="text-parchment-2 mb-3">Overview + abstract + claims matrix + literature review.</p>
          <Link to="/docs/current/claims-matrix" className="text-amber hover:underline">Read claims matrix →</Link>
        </article>
      </div>
    </>
  );
}
