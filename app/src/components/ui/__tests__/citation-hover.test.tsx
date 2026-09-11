import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import {
  findMatchingResearchRecord,
  extractFootnoteFromDOM,
  FootnoteHoverTrigger,
  FootnoteBackref,
  CitationHoverPreview,
} from '../CitationHoverPreview';

describe('Citation Hover Preview helpers', () => {
  it('matches research records by canonical ID', () => {
    const matched = findMatchingResearchRecord('iea-ai-energy-crisis', '', []);
    expect(matched).toBeDefined();
    expect(matched?.id).toBe('iea-ai-energy-crisis');
    expect(matched?.evidenceLevel).toBe('DEMONSTRATED');
  });

  it('matches research records by author or title in citation text', () => {
    const matched = findMatchingResearchRecord(
      'fn-1',
      'Iizumi, Nonequilibrium Thermodynamic Accounting for Memory Operations, Physica A (2026)',
      []
    );
    expect(matched).toBeDefined();
    expect(matched?.id).toBe('iizumi-crud-accounting');
  });

  it('matches research records by DOI URL', () => {
    const matched = findMatchingResearchRecord('fn-2', '', [
      { href: 'https://doi.org/10.1016/j.physa.2026.131801', label: 'DOI' },
    ]);
    expect(matched).toBeDefined();
    expect(matched?.id).toBe('iizumi-crud-accounting');
  });

  it('returns undefined if no record matches arbitrary text', () => {
    const matched = findMatchingResearchRecord('fn-xyz', 'completely unrelated fictional citation 9999', []);
    expect(matched).toBeUndefined();
  });
});

describe('FootnoteHoverTrigger rendering', () => {
  it('renders trigger anchor with citation badge format and accessibility attributes', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <FootnoteHoverTrigger href="#user-content-fn-1" id="user-content-fnref-1">
          1
        </FootnoteHoverTrigger>
      </MemoryRouter>
    );

    expect(html).toContain('href="#user-content-fn-1"');
    expect(html).toContain('id="user-content-fnref-1"');
    expect(html).toContain('data-footnote-ref');
    expect(html).toContain('[1]');
    expect(html).toContain('aria-haspopup="dialog"');
  });

  it('renders FootnoteBackref with back arrow and jump title', () => {
    const html = renderToStaticMarkup(
      <FootnoteBackref href="#user-content-fnref-1" />
    );

    expect(html).toContain('href="#user-content-fnref-1"');
    expect(html).toContain('data-footnote-backref');
    expect(html).toContain('↩');
  });

  it('renders standalone CitationHoverPreview with preloaded research record', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <CitationHoverPreview recordId="iea-ai-energy-crisis">
          IEA 2026
        </CitationHoverPreview>
      </MemoryRouter>
    );

    expect(html).toContain('IEA 2026');
    expect(html).toContain('data-footnote-ref');
  });
});
