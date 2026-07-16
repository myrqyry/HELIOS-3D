import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { ExhibitControl } from './ExhibitControl';
import { ExhibitSection } from './ExhibitSection';
import { getStageFilterState, PRIMARY_NAV } from '../Header';
import { ResearchBrowser } from '../ResearchBrowser';
import type { ResearchRecord } from '../../data/research-ingestion';
import { getInitialReducedMotion } from '../../hooks/usePrefersReducedMotion';

const researchRecords: ResearchRecord[] = [
  {
    id: 'established-record', title: 'Established record', source: 'Journal', summary: 'Measured result',
    tags: ['result'], publicUse: 'evidence', evidenceLevel: 'DEMONSTRATED', stage: 'established', publishedAt: '2025-01-01',
  },
  {
    id: 'current-record', title: 'Current record', source: 'Lab', summary: 'Working result',
    tags: ['work'], publicUse: 'overview', evidenceLevel: 'INFERRED', stage: 'current', publishedAt: '2025-02-01',
  },
];

describe('exhibit navigation and controls', () => {
  it('defines the primary navigation destinations', () => {
    expect(PRIMARY_NAV.map(({ label, href }) => ({ label, href }))).toEqual([
      { label: 'Explore', href: '/overview' },
      { label: 'Visuals', href: '/figures' },
      { label: 'Evidence', href: '/research' },
      { label: 'Technical archive', href: '/docs/established/abstract' },
      { label: 'GitHub', href: 'https://github.com/myrqyry/HELIOS-3D' },
    ]);
  });

  it('resolves stage visibility without leaking state onto public routes', () => {
    expect(getStageFilterState('/docs/current/claims-matrix', '', 'speculative')).toEqual({
      showStageFilter: true,
      stage: 'speculative',
    });
    expect(getStageFilterState('/overview', '?stage=current', 'speculative')).toEqual({
      showStageFilter: false,
      stage: 'all',
    });
  });

  it('exposes the paused state through aria-pressed', () => {
    const onToggle = vi.fn();
    expect(renderToStaticMarkup(<ExhibitControl label="Pause" paused={true} onToggle={onToggle} />)).toContain(
      'aria-pressed="true"',
    );
    expect(renderToStaticMarkup(<ExhibitControl label="Pause" paused={false} onToggle={onToggle} />)).toContain(
      'aria-pressed="false"',
    );
  });

  it('renders an optional evidence link and stable heading relationship', () => {
    const markup = renderToStaticMarkup(
      <ExhibitSection
        id="evidence-trail"
        eyebrow="Evidence"
        title="Measured behavior"
        description="A concise description."
        evidenceLabel="Read the source"
        evidenceHref="/research/source"
      >
        <div>Visual</div>
      </ExhibitSection>,
    );

    expect(markup).toContain('id="evidence-trail"');
    expect(markup).toContain('aria-labelledby="evidence-trail-heading"');
    expect(markup).toContain('href="/research/source"');
    expect(markup).toContain('Read the source');
  });

  it('marks each research card with its stage for the shared stage filter', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <ResearchBrowser records={researchRecords} />
      </MemoryRouter>,
    );
    expect(markup).toContain('data-stage-card="established"');
    expect(markup).toContain('data-stage-card="current"');
  });

  it('reads reduced motion from matchMedia during initial hook setup', () => {
    const originalWindow = globalThis.window;
    vi.stubGlobal('window', { matchMedia: vi.fn().mockReturnValue({ matches: true }) });
    expect(getInitialReducedMotion()).toBe(true);
    vi.stubGlobal('window', originalWindow);
  });
});
