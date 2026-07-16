export function Footer() {
  const lastUpdated = '2026-07-15';

  return (
    <footer className="border-t border-obsidian-3 bg-obsidian mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-parchment-2 font-mono">
        <span>HELIOS-3D · 2026</span>
        <a href="https://github.com/myrqyry/HELIOS-3D" className="hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian" target="_blank" rel="noreferrer">Source on GitHub</a>
        <span>Last updated {lastUpdated}</span>
      </div>
    </footer>
  );
}
