import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ExhibitControl } from './ExhibitControl';
import { ExhibitSection } from './ExhibitSection';
import { getStageFilterState, PRIMARY_NAV } from '../Header';

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
});
