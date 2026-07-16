import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getAllDocs } from '../lib/docs';

const stageLabels: Record<string, string> = {
  established: 'Established foundations',
  current: 'Current validation',
  speculative: 'Speculative proposals',
  'project-ops': 'Project operations',
};

export function TechnicalArchivePage() {
  const docs = getAllDocs();
  const stages = ['established', 'current', 'speculative', 'project-ops'];

  return (
    <>
      <Helmet>
        <title>Technical archive — HELIOS-3D</title>
        <meta name="description" content="The complete HELIOS-3D document archive and technical gallery." />
      </Helmet>
      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber">Research trail</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Technical archive</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">The guided exhibit stays concise; this archive preserves the documents behind it. Existing document URLs remain unchanged.</p>
        <Link className="mt-5 inline-flex text-sm font-semibold text-amber hover:underline" to="/figures">Open the complete technical gallery →</Link>
      </header>
      <div className="space-y-10">
        {stages.map((stage) => {
          const stageDocs = docs.filter((doc) => doc.stageSlug === stage);
          if (stageDocs.length === 0) return null;
          return (
            <section key={stage} aria-labelledby={`${stage}-archive-heading`}>
              <h2 id={`${stage}-archive-heading`} className="mb-4 text-2xl font-bold text-amber">{stageLabels[stage]}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {stageDocs.map((doc) => (
                  <Link key={`${doc.stageSlug}/${doc.slug}`} to={`/docs/${doc.stageSlug}/${doc.slug}`} className="rounded-lg border border-obsidian-3/50 bg-obsidian-2/30 p-4 transition-colors hover:border-amber/60">
                    <h3 className="font-bold text-parchment">{doc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-parchment-2">{doc.summary}</p>
                    <span className="mt-3 inline-block font-mono text-xs text-amber">Read document →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
