import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StageBadge } from '../components/StageBadge';
import { getResearchRecordById } from '../data/research-browser';

export function ResearchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const record = id ? getResearchRecordById(id) : undefined;

  if (!record) {
    return (
      <>
        <Helmet><title>Research record not found — HELIOS-3D</title></Helmet>
        <section className="mx-auto max-w-2xl rounded-xl border border-obsidian-3 bg-obsidian-2 p-6 text-center">
          <h1 className="mb-3 text-3xl font-bold text-amber">Research record not found</h1>
          <p className="mb-6 text-parchment-2">The stable id you requested does not match a known research record.</p>
          <Link to="/research" className="rounded-lg border border-obsidian-3 px-5 py-3 text-parchment-2 hover:border-amber hover:text-amber">Back to browser</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{record.title} — HELIOS-3D</title>
        <meta name="description" content={record.summary} />
      </Helmet>
      <article className="mx-auto max-w-4xl rounded-xl border border-obsidian-3 bg-obsidian-2 p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <StageBadge stage={record.stage} size="sm" />
          <time className="font-mono text-xs uppercase tracking-wider text-parchment-2" dateTime={record.publishedAt}>
            {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(record.publishedAt))}
          </time>
        </div>
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber">Research detail</p>
        <h1 className="mb-4 text-4xl font-bold text-amber">{record.title}</h1>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-parchment-2">{record.summary}</p>
        <dl className="grid gap-4 rounded-lg border border-obsidian-3/60 bg-obsidian-1/40 p-5 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-parchment-2">Source</dt>
            <dd className="mt-1 text-parchment">{record.source}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-parchment-2">Public use</dt>
            <dd className="mt-1 text-parchment">{record.publicUse}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-parchment-2">Evidence level</dt>
            <dd className="mt-1 text-parchment">{record.evidenceLevel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-parchment-2">Stable id</dt>
            <dd className="mt-1 font-mono text-parchment">{record.id}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-parchment-2">
          {record.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-obsidian-3 px-2 py-1">{tag}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {record.url && (
            <a className="rounded-lg bg-gradient-to-r from-amber to-ember px-5 py-3 font-semibold text-obsidian" href={record.url}>Open source</a>
          )}
          <Link to="/research" className="rounded-lg border border-obsidian-3 px-5 py-3 text-parchment-2 hover:border-amber hover:text-amber">Back to browser</Link>
        </div>
      </article>
    </>
  );
}
