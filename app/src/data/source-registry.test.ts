import { describe, expect, it } from 'vitest';
import { getSourceVerificationSummary, sourceRegistry } from './source-registry';

describe('source registry', () => {
  it('tracks every research record and the external ConfSeq source', () => {
    expect(sourceRegistry.length).toBeGreaterThan(1);
    expect(sourceRegistry.some((source) => source.id === 'xiong-confseq-2026')).toBe(true);
  });

  it('does not report an incomplete registry as fully verified', () => {
    const summary = getSourceVerificationSummary();
    expect(summary['missing-url']).toBeGreaterThan(0);
    expect(summary.missingArchives).toBe(summary.total);
  });
});
