export type ResearchUse = 'overview' | 'timeline' | 'evidence';

export type ResearchStage = 'established' | 'current' | 'speculative' | 'project-ops';

export type EvidenceLevel = 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE';

export type TimelineTag = EvidenceLevel | 'FABRICATION';

export interface ResearchTimelineRow {
  year: number;
  title: string;
  tag: TimelineTag;
}

export interface ResearchTimelineEntry extends ResearchTimelineRow {
  order: number;
}

export interface ResearchRecord {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  stage: ResearchStage;
  tags: string[];
  summary: string;
  evidenceLevel: EvidenceLevel;
  publicUse: ResearchUse;
  timeline?: ResearchTimelineEntry;
}

const allowedStages = new Set<ResearchStage>(['established', 'current', 'speculative', 'project-ops']);
const allowedUse = new Set<ResearchUse>(['overview', 'timeline', 'evidence']);
const allowedEvidenceLevels = new Set<EvidenceLevel>(['DEMONSTRATED', 'INFERRED', 'PROPOSED', 'SPECULATIVE']);
const allowedTimelineTags = new Set<TimelineTag>(['DEMONSTRATED', 'INFERRED', 'PROPOSED', 'SPECULATIVE', 'FABRICATION']);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validatePublishedAt(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function cloneTimeline(timeline: ResearchTimelineEntry): ResearchTimelineEntry {
  return { ...timeline };
}

export function normalizeResearchRecords(records: ReadonlyArray<ResearchRecord>): ResearchRecord[] {
  if (!Array.isArray(records)) {
    throw new Error('records must be an array');
  }

  const seenIds = new Set<string>();

  return records.map((record, index) => {
    if (!record || typeof record !== 'object') {
      throw new Error(`invalid record at index ${index}`);
    }

    if (!isNonEmptyString(record.id)) {
      throw new Error(`missing id at index ${index}`);
    }

    if (seenIds.has(record.id)) {
      throw new Error(`duplicate id: ${record.id}`);
    }
    seenIds.add(record.id);

    if (!isNonEmptyString(record.title)) {
      throw new Error(`invalid title for id: ${record.id}`);
    }

    if (!isNonEmptyString(record.source)) {
      throw new Error(`invalid source for id: ${record.id}`);
    }

    if (!isValidUrl(record.url)) {
      throw new Error(`invalid url for id: ${record.id}`);
    }

    if (!validatePublishedAt(record.publishedAt)) {
      throw new Error(`invalid publishedAt for id: ${record.id}`);
    }

    if (!allowedStages.has(record.stage)) {
      throw new Error(`invalid stage: ${record.stage}`);
    }

    if (!allowedUse.has(record.publicUse)) {
      throw new Error(`invalid publicUse for id: ${record.id}`);
    }

    if (!allowedEvidenceLevels.has(record.evidenceLevel)) {
      throw new Error(`invalid evidenceLevel for id: ${record.id}`);
    }

    if (!Array.isArray(record.tags) || record.tags.some((tag: string) => !isNonEmptyString(tag))) {
      throw new Error(`invalid tags for id: ${record.id}`);
    }

    if (record.timeline) {
      if (!Number.isInteger(record.timeline.year) || record.timeline.year < 0) {
        throw new Error(`invalid timeline year for id: ${record.id}`);
      }

      if (!isNonEmptyString(record.timeline.title)) {
        throw new Error(`invalid timeline title for id: ${record.id}`);
      }

      if (!allowedTimelineTags.has(record.timeline.tag)) {
        throw new Error(`invalid timeline tag for id: ${record.id}`);
      }

      if (!Number.isInteger(record.timeline.order) || record.timeline.order < 0) {
        throw new Error(`invalid timeline order for id: ${record.id}`);
      }
    }

    return {
      ...record,
      tags: [...record.tags],
      timeline: record.timeline ? cloneTimeline(record.timeline) : undefined,
    };
  });
}

const seedResearchRecords: ResearchRecord[] = [
  {
    id: 'iea-ai-energy-crisis',
    title: 'AI energy crisis',
    source: 'IEA',
    url: 'https://www.iea.org/reports/electricity-2026',
    publishedAt: '2026-04-01',
    stage: 'established',
    tags: ['energy', 'ai'],
    summary: 'IEA projections frame the data-center energy wall that motivates post-Landauer investigation.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'overview',
  },
  {
    id: 'katmis-hopfion-stability',
    title: 'EuS/Bi2Se3/EuS hopfion (Katmis)',
    source: 'Katmis et al.',
    url: 'https://example.com/katmis-hopfion-stability',
    publishedAt: '2025-05-01',
    stage: 'established',
    tags: ['hopfion', 'topological-insulator'],
    summary: 'Room-temperature, zero-field hopfion stability is the anchor result for the phase-1 demonstrator.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'overview',
    timeline: {
      year: 2025,
      title: 'EuS/Bi2Se3/EuS hopfion (Katmis)',
      tag: 'DEMONSTRATED',
      order: 2,
    },
  },
  {
    id: 'iizumi-crud-accounting',
    title: 'CRUD information thermodynamics',
    source: 'Iizumi',
    url: 'https://doi.org/10.1016/j.physa.2026.131801',
    publishedAt: '2026-03-01',
    stage: 'established',
    tags: ['thermodynamics', 'accounting'],
    summary: 'A CRUD-style nonequilibrium accounting framework extends Landauer beyond delete-only reasoning.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'evidence',
  },
  {
    id: 'ding-qiu-reservoir-thermodynamics',
    title: 'Thermodynamics of quantum reservoir computing',
    source: 'Ding & Qiu',
    url: 'https://arxiv.org/abs/2607.02157',
    publishedAt: '2026-07-01',
    stage: 'current',
    tags: ['reservoir-computing', 'thermodynamics'],
    summary: 'Predictive capacity and retained history are linked to microscopic energetic cost.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'evidence',
  },
  {
    id: 'wang-dish-holographic-printing',
    title: 'DISH holographic printing',
    source: 'Wang et al.',
    url: 'https://example.com/wang-dish-holographic-printing',
    publishedAt: '2024-06-01',
    stage: 'established',
    tags: ['fabrication', 'holography'],
    summary: 'The original DISH result establishes fast volumetric printing as a macroscale scaffold primitive.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2024,
      title: 'DISH holographic printing',
      tag: 'FABRICATION',
      order: 1,
    },
  },
  {
    id: 'wang-dish-printing',
    title: 'DISH Nature 2026',
    source: 'Wang et al.',
    url: 'https://example.com/wang-dish-nature-2026',
    publishedAt: '2026-06-01',
    stage: 'current',
    tags: ['fabrication', 'volumetric-printing'],
    summary: 'The updated DISH line keeps the fixed-surface, sub-second scaffolding path in the public research set.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: 'DISH Nature 2026',
      tag: 'FABRICATION',
      order: 3,
    },
  },
  {
    id: 'wang-y-zipper-flexible-rigid',
    title: 'Y-zipper flexible-rigid',
    source: 'Wang et al.',
    url: 'https://example.com/wang-y-zipper-flexible-rigid',
    publishedAt: '2026-05-01',
    stage: 'current',
    tags: ['fabrication', 'mechanical-transition'],
    summary: 'A rapid flexible-rigid transition is a useful assembly primitive for deployable 3D scaffolds.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: 'Y-zipper flexible-rigid',
      tag: 'FABRICATION',
      order: 4,
    },
  },
  {
    id: 'tsai-mn3sn-switching',
    title: 'Mn3Sn AFM switching (Tsai)',
    source: 'Tsai et al.',
    url: 'https://example.com/tsai-mn3sn-switching',
    publishedAt: '2026-05-01',
    stage: 'established',
    tags: ['switching', 'antiferromagnet'],
    summary: '40-ps antiferromagnetic switching is the high-speed floor for the write path.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: 'Mn3Sn AFM switching (Tsai)',
      tag: 'DEMONSTRATED',
      order: 5,
    },
  },
  {
    id: 'wang-polaritonic-switch',
    title: 'Polaritonic switch 4 fJ (Wang)',
    source: 'Wang et al.',
    url: 'https://example.com/wang-polaritonic-switch',
    publishedAt: '2026-05-15',
    stage: 'current',
    tags: ['switching', 'polaritonic'],
    summary: 'A low-energy polaritonic switch keeps the energy floor in view for later write-path comparisons.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: 'Polaritonic switch 4 fJ (Wang)',
      tag: 'DEMONSTRATED',
      order: 6,
    },
  },
  {
    id: 'gobel-lounis-tohe',
    title: 'TOHE hopfion (Göbel & Lounis)',
    source: 'Göbel & Lounis',
    url: 'https://example.com/gobel-lounis-tohe',
    publishedAt: '2026-05-20',
    stage: 'current',
    tags: ['readout', 'orbital-current'],
    summary: 'Topological orbital Hall effect is the candidate all-electrical hallmark for 3D hopfions.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: 'TOHE hopfion (Göbel & Lounis)',
      tag: 'DEMONSTRATED',
      order: 7,
    },
  },
  {
    id: 'wang-2d-peptide-crystals',
    title: '2D peptide crystals (Wang)',
    source: 'Wang et al.',
    url: 'https://example.com/wang-2d-peptide-crystals',
    publishedAt: '2026-04-15',
    stage: 'established',
    tags: ['materials', 'chiral-recognition'],
    summary: 'Programmable chiral peptide crystals extend the public materials set for HELIOS interface work.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      year: 2026,
      title: '2D peptide crystals (Wang)',
      tag: 'DEMONSTRATED',
      order: 8,
    },
  },
];

export const researchRecords = normalizeResearchRecords(seedResearchRecords);

export function getResearchRecordsByUse(use: ResearchUse): ResearchRecord[] {
  return researchRecords.filter((record) => record.publicUse === use);
}

export function getResearchTimelineRows(): ResearchTimelineRow[] {
  return researchRecords
    .filter((record): record is ResearchRecord & { timeline: ResearchTimelineEntry } => Boolean(record.timeline))
    .slice()
    .sort((left, right) => left.timeline!.order - right.timeline!.order)
    .map((record) => ({
      year: record.timeline!.year,
      title: record.timeline!.title,
      tag: record.timeline!.tag,
    }));
}

export function getResearchStageCounts(): Record<ResearchStage, number> {
  return researchRecords.reduce(
    (counts, record) => {
      counts[record.stage] += 1;
      return counts;
    },
    {
      established: 0,
      current: 0,
      speculative: 0,
      'project-ops': 0,
    } satisfies Record<ResearchStage, number>,
  );
}
