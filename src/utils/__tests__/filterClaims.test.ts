import { describe, it, expect } from 'vitest';
import { filterClaims } from '../filterClaims';

const sample = [
  { claim: 'A', tag: 'DEMONSTRATED' as const, source: 'x' },
  { claim: 'B', tag: 'PROPOSED' as const, source: 'y' },
  { claim: 'C', tag: 'SPECULATIVE' as const, source: 'z' },
];

describe('filterClaims', () => {
  it('returns all when no tags selected', () => {
    expect(filterClaims(sample, [])).toEqual(sample);
  });

  it('filters to only the selected tag', () => {
    expect(filterClaims(sample, ['DEMONSTRATED'])).toEqual([sample[0]]);
  });

  it('returns union when multiple tags selected', () => {
    expect(filterClaims(sample, ['DEMONSTRATED', 'SPECULATIVE'])).toEqual([sample[0], sample[2]]);
  });
});
