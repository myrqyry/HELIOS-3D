import { useState, useEffect, useCallback } from 'react';

export interface ClaimRow {
  claim: string;
  tag: 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE';
  source: string;
}

const tags = ['DEMONSTRATED', 'INFERRED', 'PROPOSED', 'SPECULATIVE'] as const;

export function ClaimsTable({ rows }: { rows: ClaimRow[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = tags.filter((t) => params.getAll('tag').includes(t));
    setSelected(new Set(initial));
  }, []);

  const syncUrl = useCallback((sel: Set<string>) => {
    const next = new URL(window.location.href);
    next.searchParams.delete('tag');
    sel.forEach((tag) => next.searchParams.append('tag', tag));
    window.history.replaceState({}, '', next);
  }, []);

  const toggle = (tag: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      syncUrl(next);
      return next;
    });
  };

  const reset = () => {
    setSelected(new Set());
    syncUrl(new Set());
  };

  const filtered = selected.size === 0
    ? rows
    : rows.filter((r) => selected.has(r.tag));

  return (
    <div className="claims-table my-6">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-xs text-parchment-2 uppercase tracking-wider mr-2">Filter Matrix:</span>
        {tags.map((tag) => (
          <label
            key={tag}
            className="inline-flex items-center gap-2 text-xs font-mono cursor-pointer bg-obsidian-2/50 hover:bg-obsidian-2 border border-obsidian-3/40 rounded px-2.5 py-1 text-parchment-2 hover:text-parchment focus-within:ring-2 focus-within:ring-amber focus-within:ring-offset-2 focus-within:ring-offset-obsidian transition-colors select-none"
          >
            <input
              type="checkbox"
              checked={selected.has(tag)}
              onChange={() => toggle(tag)}
              className="accent-ember rounded border-obsidian-3 bg-obsidian-2"
            />
            <span>{tag}</span>
          </label>
        ))}
        <button
          type="button"
          onClick={reset}
          className="text-xs text-parchment-2 hover:text-ember focus-visible:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ml-auto font-mono underline underline-offset-4 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-obsidian-3/30 bg-obsidian-2/30 backdrop-blur-sm shadow-xl">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-obsidian-3/40 bg-obsidian-2/50 text-left text-amber font-mono text-xs uppercase tracking-wider">
              <th className="py-3.5 px-5 font-bold">Claim</th>
              <th className="py-3.5 px-5 font-bold">Tag</th>
              <th className="py-3.5 px-5 font-bold">Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-obsidian-3/30 hover:bg-obsidian-3/20 transition-colors duration-150">
                <td className="py-3.5 px-5 text-parchment/95">{row.claim}</td>
                <td className="py-3.5 px-5 font-mono text-xs text-amber font-semibold">{row.tag}</td>
                <td className="py-3.5 px-5 text-parchment-2/90">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClaimsTable;
