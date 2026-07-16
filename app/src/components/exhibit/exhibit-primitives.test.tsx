import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { ExhibitControl } from './ExhibitControl';
import { ExhibitSection } from './ExhibitSection';
import { getStageFilterState, PRIMARY_NAV } from '../Header';
import { filterRecordsByStage, ResearchBrowser } from '../ResearchBrowser';
import type { ResearchRecord } from '../../data/research-ingestion';
import { getInitialReducedMotion, isMotionEnabled } from '../../hooks/usePrefersReducedMotion';
import { shouldAutoRotate } from '../r3f/TopologicalOrbitalHall';
import { shouldActivateDeferredScene } from './DeferredScene';

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
      { label: 'Explore', href: '/explore' },
      { label: 'Visuals', href: '/visuals' },
      { label: 'Evidence', href: '/evidence' },
      { label: 'Sources', href: '/sources' },
      { label: 'Technical archive', href: '/technical-archive' },
      { label: 'GitHub', href: 'https://github.com/myrqyry/HELIOS-3D' },
    ]);
    expect(PRIMARY_NAV).toContainEqual({ label: 'Explore', href: '/explore' });
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

  it('filters research records by established and current stages, and restores all records', () => {
    expect(filterRecordsByStage(researchRecords, 'established').map(({ id }) => id)).toEqual(['established-record']);
    expect(filterRecordsByStage(researchRecords, 'current').map(({ id }) => id)).toEqual(['current-record']);
    expect(filterRecordsByStage(researchRecords, 'all')).toEqual(researchRecords);
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

  it('disables passive camera rotation when reduced motion is preferred', () => {
    expect(shouldAutoRotate(false, false)).toBe(true);
    expect(shouldAutoRotate(false, true)).toBe(false);
    expect(shouldAutoRotate(true, false)).toBe(false);
    expect(shouldAutoRotate(false, false, true)).toBe(false);
  });

  it('activates deferred scenes only when they approach the viewport', () => {
    expect(shouldActivateDeferredScene(false, 0)).toBe(false);
    expect(shouldActivateDeferredScene(true, 0)).toBe(true);
    expect(shouldActivateDeferredScene(false, 0.1)).toBe(true);
  });

  it('enables motion only when reduced motion is not preferred', () => {
    expect(isMotionEnabled(true)).toBe(false);
    expect(isMotionEnabled(false)).toBe(true);
  });

  it('falls back to a generated section id when an explicit id has no valid characters', () => {
    const markup = renderToStaticMarkup(
      <ExhibitSection
        id=" !!! "
        eyebrow="Evidence"
        title="Measured behavior"
        description="A concise description."
      >
        <div>Visual</div>
      </ExhibitSection>,
    );

    expect(markup).toMatch(/<section id="exhibit-section-[a-zA-Z0-9_-]+"/);
    expect(markup).not.toContain('id=" !!! "');
  });
});
