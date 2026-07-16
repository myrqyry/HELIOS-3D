import { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { StageBadge } from './StageBadge';
import type { ResearchRecord } from '../data/research-ingestion';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function ResearchBrowser({
  records,
  detailBasePath = '/research',
}: {
  records: ResearchRecord[];
  detailBasePath?: string;
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }, []);

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return records;
    return records.filter((record) => {
      const searchable = [record.id, record.title, record.source, record.summary, record.tags.join(' '), record.publicUse, record.evidenceLevel]
        .join(' ')
        .toLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [query, records]);

  return (
    <section className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-6">
      <div className="mb-5 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-amber">Research browser</h2>
            <p className="max-w-3xl text-parchment-2 leading-relaxed">
              Search the normalized research records locally, then open a stable detail page for any entry that matters.
            </p>
          </div>
          <label className="flex w-full max-w-md flex-col gap-2 text-sm text-parchment-2">
            <span className="font-mono uppercase tracking-wider text-xs text-amber">Filter records</span>
            <input
              type="search"
              value={query}
              onChange={handleInput}
              autoComplete="off"
              spellCheck="false"
              className="rounded-lg border border-obsidian-3 bg-obsidian-1 px-4 py-2 text-parchment outline-none transition-colors focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              aria-describedby="research-search-help"
            />
            <span id="research-search-help" className="text-xs text-parchment-2/70">Search title, source, summary, or tags.</span>
          </label>
        </div>
      </div>

      <div>
        {filtered.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((record) => (
              <article key={record.id} className="rounded-lg border border-obsidian-3/60 bg-obsidian-1/40 p-5">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <StageBadge stage={record.stage} size="sm" />
                  <time className="font-mono text-xs uppercase tracking-wider text-parchment-2" dateTime={record.publishedAt}>
                    {dateFormatter.format(new Date(record.publishedAt))}
                  </time>
                </div>
                <h3 className="text-xl font-bold text-amber">{record.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-2">{record.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-parchment-2">
                  {record.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-obsidian-3 px-2 py-1">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-wider text-parchment-2">
                  <span>Source: {record.source}</span>
                  <Link className="text-amber hover:text-ember hover:underline" to={`${detailBasePath}/${record.id}`}>
                    Open detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-obsidian-3 bg-obsidian-1/60 p-4 text-sm text-parchment-2">
            No records match this search.
          </p>
        )}
      </div>
    </section>
  );
}
