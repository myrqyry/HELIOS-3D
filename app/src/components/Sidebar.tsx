import { useLocation, Link } from 'react-router-dom';

const sections: Array<{
  stage: 'established' | 'current' | 'speculative' | 'project-ops';
  title: string;
  borderColor: string;
  items: Array<{ href: string; label: string }>;
}> = [
  {
    stage: 'established',
    title: 'Established Basis',
    borderColor: 'border-l-cyan-2',
    items: [
      { href: '/docs/established/abstract', label: 'Abstract' },
      { href: '/docs/established/candidate-materials-and-mechanisms', label: 'Candidate Materials' },
      { href: '/docs/established/literature-review', label: 'Literature Review' },
      { href: '/docs/established/mathematics', label: 'Mathematics' },
      { href: '/docs/established/glossary', label: 'Glossary' },
    ],
  },
  {
    stage: 'current',
    title: 'Current Demonstrator',
    borderColor: 'border-l-ember',
    items: [
      { href: '/docs/current/alternative-materials-and-methods', label: 'Alternative Materials' },
      { href: '/docs/current/thermodynamic-reservoir-validation', label: 'Reservoir Validation' },
      { href: '/docs/current/2d-stack-reliability-and-readout', label: '2D Stack & Readout' },
      { href: '/docs/current/candidate-discovery-pipeline', label: 'Discovery Pipeline' },
      { href: '/docs/current/open-questions', label: 'Open Questions' },
      { href: '/docs/current/targets-comparators-and-projections', label: 'Targets & Comparators' },
      { href: '/docs/current/claims-matrix', label: 'Claims Matrix' },
    ],
  },
  {
    stage: 'speculative',
    title: 'Speculative Branch',
    borderColor: 'border-l-violet',
    items: [
      { href: '/docs/speculative/core-architecture', label: 'Core Architecture' },
      { href: '/docs/speculative/proposed-fabrication-path-and-control', label: 'Proposed Fabrication' },
      { href: '/docs/speculative/defensive-framework', label: 'Defensive Framework' },
      { href: '/docs/speculative/pitch-deck-outline', label: 'Pitch Deck' },
    ],
  },
  {
    stage: 'project-ops',
    title: 'Project Operations',
    borderColor: 'border-l-parchment-2',
    items: [
      { href: '/docs/project-ops/deployment', label: 'Deployment' },
    ],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-obsidian-3 bg-obsidian">
      <nav className="sticky top-0 p-6 space-y-6 text-sm">
        {sections.map((section) => (
          <div key={section.stage} className={`pl-3 border-l-2 ${section.borderColor}`} data-stage-section={section.stage}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-amber mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`block rounded px-2 py-1 transition-colors ${
                        isActive
                          ? 'bg-obsidian-3 text-ember font-bold'
                          : 'text-parchment-2 hover:bg-obsidian-2 hover:text-parchment'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
