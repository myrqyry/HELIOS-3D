import { expect, it } from 'vitest';
import { buildResearchBrowserIndex, getResearchRecordById, getResearchRecordsByQuery } from '../research-browser';
import { researchRecords } from '../research-ingestion';

it('returns a research record by stable id', () => {
  expect(getResearchRecordById('iea-ai-energy-crisis')?.id).toBe('iea-ai-energy-crisis');
});

it('searches research records by query text', () => {
  expect(getResearchRecordsByQuery('fabrication').map((record) => record.id)).toEqual(
    expect.arrayContaining([
      'wang-dish-holographic-printing',
      'wang-dish-printing',
      'wang-y-zipper-flexible-rigid',
    ]),
  );
});

it('drops malformed records from the browser index', () => {
  const index = buildResearchBrowserIndex([
    ...researchRecords,
    {
      id: 'broken-record',
      title: '',
      source: 'IEA',
      publishedAt: 'not-a-date',
      stage: 'current',
      tags: ['energy'],
      summary: 'broken',
      evidenceLevel: 'DEMONSTRATED',
      publicUse: 'overview',
    } as any,
  ]);

  expect(index.records.map((record) => record.id)).not.toContain('broken-record');
});
