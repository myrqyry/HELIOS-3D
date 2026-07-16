import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getSourceVerificationSummary, sourceRegistry, type SourceVerificationStatus } from '../data/source-registry';

const statusCopy: Record<SourceVerificationStatus, { label: string; className: string }> = {
  accessible: { label: 'Accessible', className: 'bg-cyan-2/15 text-cyan-2' },
  unverified: { label: 'Needs verification', className: 'bg-amber/15 text-amber' },
  'missing-url': { label: 'Missing URL', className: 'bg-error/15 text-error' },
};

export function SourcesPage() {
  const summary = getSourceVerificationSummary();

  return (
    <>
      <Helmet>
        <title>Sources — HELIOS-3D</title>
        <meta name="description" content="Source registry and verification status for HELIOS-3D research claims." />
      </Helmet>
      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">Verification ledger</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Sources</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">
          Every research record must resolve to an accessible source and an archived capture before it can be marked verified.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-4" aria-label="Source verification summary">
          <Summary label="Total" value={summary.total} />
          <Summary label="Accessible" value={summary.accessible} />
          <Summary label="Unverified" value={summary.unverified} />
          <Summary label="Missing URL" value={summary['missing-url']} />
        </div>
      </header>
      <div className="space-y-3">
        {sourceRegistry.map((source) => {
          const status = statusCopy[source.status];
          return (
            <article key={source.id} id={source.id} className="rounded-xl border border-obsidian-3/50 bg-obsidian-2/30 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-parchment">{source.title}</h2>
                  <p className="mt-1 text-sm text-parchment-2">{source.publisher}</p>
                </div>
                <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${status.className}`}>{status.label}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-parchment-2">{source.notes}</p>
              <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
                {source.url ? <a className="break-all text-cyan-2 hover:underline" href={source.url} target="_blank" rel="noreferrer">Open source</a> : <span className="text-error">No source URL recorded</span>}
                {source.archiveUrl ? <a className="break-all text-cyan-2 hover:underline" href={source.archiveUrl} target="_blank" rel="noreferrer">Open archive</a> : <span className="text-amber">No archive recorded</span>}
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-parchment-2">
        <Link className="text-amber hover:underline" to="/evidence">Return to evidence claims →</Link>
      </p>
    </>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container px-4 py-3">
      <p className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
