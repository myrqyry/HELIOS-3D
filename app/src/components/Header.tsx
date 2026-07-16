import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

const nav = [
  { href: '/overview', label: 'Explore' },
  { href: '/figures', label: 'Visuals' },
  { href: '/research', label: 'Evidence' },
  { href: '/docs/established/abstract', label: 'Technical archive' },
  { href: 'https://github.com/myrqyry/HELIOS-3D', label: 'GitHub', external: true },
];

const STORAGE_KEY = 'helios-3d-stage-filter';

export function Header() {
  const location = useLocation();
  const selRef = useRef<HTMLSelectElement>(null);
  const showStageFilter = location.pathname.startsWith('/docs') || location.pathname.startsWith('/research');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const saved = params.get('stage') || localStorage.getItem(STORAGE_KEY) || 'all';
    if (selRef.current) selRef.current.value = saved;
    if (saved !== 'all') document.documentElement.setAttribute('data-stage', saved);
    else document.documentElement.removeAttribute('data-stage');
  }, [location.search]);

  const handleChange = () => {
    const sel = selRef.current;
    if (!sel) return;
    const value = sel.value;
    localStorage.setItem(STORAGE_KEY, value);
    const root = document.documentElement;
    if (value === 'all') root.removeAttribute('data-stage');
    else root.setAttribute('data-stage', value);
    const next = new URL(window.location.href);
    if (value === 'all') next.searchParams.delete('stage');
    else next.searchParams.set('stage', value);
    window.history.replaceState({}, '', next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-obsidian-3/30 bg-obsidian/70 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="font-mono text-amber text-lg font-bold tracking-wider hover:text-ember focus-visible:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors flex items-center gap-2"
        >
          <span className="text-xl animate-pulse">☀️</span>HELIOS-3D
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm font-medium">
            {nav.map((item) => {
              const className = "text-parchment-2 hover:text-ember focus-visible:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors duration-200 relative py-1 group";
              const content = (
                <>
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber to-ember transition-[width] duration-300 group-hover:w-full"></span>
                </>
              );

              return item.external ? (
                <a key={item.href} href={item.href} className={className} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <Link key={item.href} to={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </nav>
          {showStageFilter && (
            <select
              ref={selRef}
              onChange={handleChange}
              data-stage-filter
              className="font-mono text-xs bg-obsidian-2/60 border border-obsidian-3/60 text-parchment rounded px-2.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors"
              aria-label="Filter technical content by stage"
            >
              <option value="all">All stages</option>
              <option value="established">Established</option>
              <option value="current">Current</option>
              <option value="speculative">Speculative</option>
              <option value="project-ops">Project Ops</option>
            </select>
          )}
        </div>
      </div>
    </header>
  );
}
