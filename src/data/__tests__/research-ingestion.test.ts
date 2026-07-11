import { expect, it } from 'vitest';
import {
  getResearchRecordsByUse,
  getResearchTimelineRows,
  loadResearchRecords,
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

it('rejects missing ids', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: '',
        title: 'Missing id',
        source: 'IEA',
        publishedAt: '2026-01-01',
        stage: 'established',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      } as any,
    ]),
  ).toThrow('missing id at index 0');
});

it('rejects malformed urls', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-url',
        title: 'Bad URL',
        source: 'IEA',
        url: 'javascript:alert(1)',
        publishedAt: '2026-01-01',
        stage: 'established',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
    ]),
  ).toThrow('invalid url for id: bad-url');
});

it('rejects invalid stages', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-stage',
        title: 'Bad stage',
        source: 'IEA',
        publishedAt: '2026-01-01',
        stage: 'broken' as any,
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
    ]),
  ).toThrow('invalid stage: broken');
});

it('rejects invalid timeline tags', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-timeline-tag',
        title: 'Bad timeline tag',
        source: 'IEA',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'timeline',
        timeline: {
          year: 2026,
          title: 'Bad timeline tag',
          tag: 'BAD' as any,
          order: 1,
        },
      },
    ]),
  ).toThrow('invalid timeline tag for id: bad-timeline-tag');
});

it('derives timeline rows from the normalized records', () => {
  expect(getResearchTimelineRows()).toContainEqual({
    year: 2026,
    title: 'DISH Nature 2026',
    tag: 'FABRICATION',
  });
});

it('drops malformed records when loading seed data', () => {
  expect(
    loadResearchRecords([
      {
        id: 'valid-record',
        title: 'Valid record',
        source: 'IEA',
        url: 'https://example.com/valid',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'kept',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
      {
        id: 'broken-record',
        title: 'Broken record',
        source: 'IEA',
        url: 'not a url',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'dropped',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'timeline',
      },
    ]).map((record) => record.id),
  ).toEqual(['valid-record']);
});

it('rejects records with missing ids', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: '',
        title: 'Missing id',
        source: 'IEA',
        url: 'https://example.com/missing-id',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
    ]),
  ).toThrow('missing id at index 0');
});

it('rejects malformed urls', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-url',
        title: 'Bad url',
        source: 'IEA',
        url: 'not a url',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
    ]),
  ).toThrow('invalid url for id: bad-url');
});

it('rejects invalid stages', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-stage',
        title: 'Bad stage',
        source: 'IEA',
        url: 'https://example.com/bad-stage',
        publishedAt: '2026-01-01',
        stage: 'deprecated' as never,
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
    ]),
  ).toThrow('invalid stage: deprecated');
});

it('rejects invalid timeline tags', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'bad-timeline-tag',
        title: 'Bad timeline tag',
        source: 'IEA',
        url: 'https://example.com/bad-timeline-tag',
        publishedAt: '2026-01-01',
        stage: 'current',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'timeline',
        timeline: {
          year: 2026,
          title: 'Bad timeline tag',
          tag: 'NOT_REAL' as never,
          order: 1,
        },
      },
    ]),
  ).toThrow('invalid timeline tag for id: bad-timeline-tag');
});
