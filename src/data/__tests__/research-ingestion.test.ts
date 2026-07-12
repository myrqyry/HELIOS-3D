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

it.each([
  {
    name: 'missing ids',
    input: [
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
      },
    ],
    message: 'missing id at index 0',
  },
  {
    name: 'malformed urls',
    input: [
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
    ],
    message: 'invalid url for id: bad-url',
  },
  {
    name: 'invalid stages',
    input: [
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
    ],
    message: 'invalid stage: broken',
  },
  {
    name: 'invalid timeline tags',
    input: [
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
    ],
    message: 'invalid timeline tag for id: bad-timeline-tag',
  },
] as const)('rejects $name', ({ input, message }) => {
  expect(() => normalizeResearchRecords(input as any)).toThrow(message);
});

it('derives timeline rows from the normalized records', () => {
  expect(
    getResearchTimelineRows().some(
      (row) => row.id === 'wang-dish-printing' && row.year === 2026 && row.title === 'DISH Nature 2026' && row.tag === 'FABRICATION',
    ),
  ).toBe(true);
});

it('warns and drops malformed records when loading seed data', () => {
  const warnings: string[] = [];

  expect(
    loadResearchRecords(
      [
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
      ],
      (message) => warnings.push(message),
    ).map((record) => record.id),
  ).toEqual(['valid-record']);

  expect(warnings).toEqual(['invalid url for id: broken-record']);
});

it('does not reserve ids for malformed records that get dropped', () => {
  const warnings: string[] = [];

  expect(
    loadResearchRecords(
      [
        {
          id: 'shared-id',
          title: 'Broken first record',
          source: 'IEA',
          url: 'not a url',
          publishedAt: '2026-01-01',
          stage: 'current',
          tags: ['energy'],
          summary: 'dropped',
          evidenceLevel: 'DEMONSTRATED',
          publicUse: 'overview',
        },
        {
          id: 'shared-id',
          title: 'Valid second record',
          source: 'IEA',
          url: 'https://example.com/shared-id',
          publishedAt: '2026-01-02',
          stage: 'current',
          tags: ['energy'],
          summary: 'kept',
          evidenceLevel: 'DEMONSTRATED',
          publicUse: 'overview',
        },
      ],
      (message) => warnings.push(message),
    ).map((record) => record.id),
  ).toEqual(['shared-id']);

  expect(warnings).toEqual(['invalid url for id: shared-id']);
});
