import { loadResearchRecords, researchRecords, type ResearchRecord } from './research-ingestion';

export interface ResearchBrowserIndex {
  records: ResearchRecord[];
  byId: Map<string, ResearchRecord>;
  getById(id: string): ResearchRecord | undefined;
  search(query: string): ResearchRecord[];
}

function normalizeQuery(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function buildSearchText(record: ResearchRecord): string {
  return [record.id, record.title, record.source, record.summary, record.tags.join(' '), record.publicUse, record.evidenceLevel]
    .join(' ')
    .toLowerCase();
}

export function buildResearchBrowserIndex(
  records: ReadonlyArray<ResearchRecord>,
  reportIssue: (message: string) => void = () => {},
): ResearchBrowserIndex {
  const normalized = loadResearchRecords(records, reportIssue);
  const byId = new Map<string, ResearchRecord>(normalized.map((record) => [record.id, record]));

  return {
    records: normalized,
    byId,
    getById(id: string) {
      return byId.get(id);
    },
    search(query: string) {
      const terms = normalizeQuery(query);

      if (terms.length === 0) {
        return normalized;
      }

      return normalized.filter((record) => {
        const searchable = buildSearchText(record);
        return terms.every((term) => searchable.includes(term));
      });
    },
  };
}

export const researchBrowserIndex = buildResearchBrowserIndex(researchRecords);

export function getResearchRecordById(id: string): ResearchRecord | undefined {
  return researchBrowserIndex.getById(id);
}

export function getResearchRecordsByQuery(query: string): ResearchRecord[] {
  return researchBrowserIndex.search(query);
}
