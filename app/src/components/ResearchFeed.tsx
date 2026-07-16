import { StageBadge } from './StageBadge';
import { getResearchRecordsByUse, type ResearchUse } from '../data/research-ingestion';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function ResearchFeed({
  use,
  title,
  summary,
  limit = 3,
  compact = false,
}: {
  use: ResearchUse;
  title: string;
  summary: string;
  limit?: number;
  compact?: boolean;
}) {
  const records = getResearchRecordsByUse(use).slice(0, limit);

  return (
    <section className={`rounded-xl border border-obsidian-3 bg-obsidian-2 ${compact ? 'p-4' : 'p-6'}`}>
      <div className={`mb-5 ${compact ? 'space-y-2' : 'space-y-3'}`}>
        <h2 className={`font-bold text-amber ${compact ? 'text-xl' : 'text-2xl'}`}>{title}</h2>
        <p className="max-w-3xl text-parchment-2 leading-relaxed">{summary}</p>
      </div>

      {records.length > 0 ? (
        <div className={`grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}>
          {records.map((record) => (
            <article key={record.id} className={`rounded-lg border border-obsidian-3/60 bg-obsidian-1/40 ${compact ? 'p-4' : 'p-5'}`}>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <StageBadge stage={record.stage} size="sm" />
                <time className="font-mono text-xs uppercase tracking-wider text-parchment-2" dateTime={record.publishedAt}>
                  {dateFormatter.format(new Date(record.publishedAt))}
                </time>
              </div>
              <h3 className={`font-bold text-amber ${compact ? 'text-lg' : 'text-xl'}`}>{record.title}</h3>
              <p className={`mt-2 leading-relaxed text-parchment-2 ${compact ? 'text-sm' : ''}`}>{record.summary}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wider text-parchment-2">
                <span>Source: {record.source}</span>
                {record.url ? (
                  <a href={record.url} className="text-amber hover:text-ember hover:underline">
                    Read source
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-parchment-2">No public records are available for this feed.</p>
      )}
    </section>
  );
}
