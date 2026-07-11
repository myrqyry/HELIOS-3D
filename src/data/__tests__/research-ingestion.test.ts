import { expect, it } from 'vitest';
import {
  getResearchRecordsByUse,
  getResearchTimelineRows,
  normalizeResearchRecords,
} from '../research-ingestion';

it('returns overview-ready records in stable order', () => {
  expect(getResearchRecordsByUse('overview').map((record) => record.id)).toEqual([
    'iea-ai-energy-crisis',
    'katmis-hopfion-stability',
  ]);
});

it('rejects duplicate ids', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'iea-ai-energy-crisis',
        title: 'AI energy crisis',
        source: 'IEA',
        url: 'https://example.com/a',
        publishedAt: '2026-01-01',
        stage: 'established',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
      {
        id: 'iea-ai-energy-crisis',
        title: 'Duplicate',
        source: 'IEA',
        url: 'https://example.com/b',
        publishedAt: '2026-01-02',
        stage: 'current',
        tags: ['energy'],
        summary: 'y',
        evidenceLevel: 'PROPOSED',
        publicUse: 'timeline',
      },
    ]),
  ).toThrow('duplicate id: iea-ai-energy-crisis');
});

it('derives timeline rows from the normalized records', () => {
  expect(getResearchTimelineRows()).toContainEqual({
    year: 2026,
    title: 'DISH Nature 2026',
    tag: 'FABRICATION',
  });
});
