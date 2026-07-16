export function TOC({ headings }: { headings: Array<{ depth: number; slug: string; text: string }> }) {
  const toc = headings.filter((h) => h.depth === 2 || h.depth === 3);
  if (toc.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-obsidian-3 bg-obsidian-2 p-4 text-sm">
      <h2 className="font-mono text-xs uppercase tracking-wider text-amber mb-2">On this page</h2>
      <ul className="space-y-1">
        {toc.map((h) => (
          <li key={h.slug} className={h.depth === 3 ? 'ml-4' : ''}>
            <a href={`#${h.slug}`} className="text-parchment-2 hover:text-ember">{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
