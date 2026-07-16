export interface ClaimRow {
  claim: string;
  tag: 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE';
  source: string;
}

export function filterClaims(rows: ClaimRow[], tags: ClaimRow['tag'][]): ClaimRow[] {
  if (tags.length === 0) return rows;
  const set = new Set(tags);
  return rows.filter((r) => set.has(r.tag));
}
