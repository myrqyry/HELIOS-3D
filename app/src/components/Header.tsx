import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PRIMARY_NAV: ReadonlyArray<{ href: string; label: string; external?: boolean }> = [
  { href: '/explore', label: 'Explore' },
  { href: '/figures', label: 'Visuals' },
  { href: '/research', label: 'Evidence' },
  { href: '/docs/established/abstract', label: 'Technical archive' },
  { href: 'https://github.com/myrqyry/HELIOS-3D', label: 'GitHub', external: true },
] as const;

const STORAGE_KEY = 'helios-3d-stage-filter';
export type StageFilterValue = 'all' | 'established' | 'current' | 'speculative' | 'project-ops';

export function isTechnicalFilterRoute(pathname: string): boolean {
  return pathname.startsWith('/docs') || pathname.startsWith('/research');
}

export function isStageFilterValue(value: string | null): value is StageFilterValue {
  return value === 'all' || value === 'established' || value === 'current' || value === 'speculative' || value === 'project-ops';
}

export function resolveStageFilter(search: string, savedPreference: string | null): StageFilterValue {
  const queryValue = new URLSearchParams(search).get('stage');
  if (isStageFilterValue(queryValue)) return queryValue;
  return isStageFilterValue(savedPreference) ? savedPreference : 'all';
}

export function getStageFilterState(pathname: string, search: string, savedPreference: string | null) {
  const showStageFilter = isTechnicalFilterRoute(pathname);
  return {
    showStageFilter,
    stage: showStageFilter ? resolveStageFilter(search, savedPreference) : 'all' as const,
  };
}

export function Header() {
  const location = useLocation();
  const selRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const { showStageFilter, stage } = getStageFilterState(
      location.pathname,
      location.search,
      localStorage.getItem(STORAGE_KEY),
    );
    if (selRef.current) selRef.current.value = stage;
    if (showStageFilter && stage !== 'all') document.documentElement.setAttribute('data-stage', stage);
    else document.documentElement.removeAttribute('data-stage');
  }, [location.pathname, location.search]);

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
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="font-mono text-amber text-lg font-bold tracking-wider hover:text-ember focus-visible:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors flex items-center gap-2"
        >
          <span className="text-xl animate-pulse">☀️</span>HELIOS-3D
        </Link>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <nav aria-label="Primary navigation" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            {PRIMARY_NAV.map((item) => {
              const className = "relative inline-flex min-h-11 items-center text-parchment-2 hover:text-ember focus-visible:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors duration-200 group";
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
          {isTechnicalFilterRoute(location.pathname) && (
            <select
              ref={selRef}
              onChange={handleChange}
              data-stage-filter
              className="min-h-11 font-mono text-xs bg-obsidian-2/60 border border-obsidian-3/60 text-parchment rounded px-2.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors sm:py-1"
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
