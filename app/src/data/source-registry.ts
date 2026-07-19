import { researchRecords } from './research-ingestion';

export type SourceVerificationStatus = 'accessible' | 'unverified' | 'missing-url';

export interface SourceRegistryEntry {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  archiveUrl?: string;
  status: SourceVerificationStatus;
  notes: string;
}

const accessibleRecordIds = new Set([
  'iea-ai-energy-crisis',
  'iizumi-crud-accounting',
  'ding-qiu-reservoir-thermodynamics',
  'ushakov-hybrid-domain-walls',
  'catalan-antiferroelectric-perspective',
  'ghanbari-oxide-moire-superlattices',
  'barrera-magnetic-flux-concentrators',
  'mustaf-kagome-superconductors',
  'park-programmable-crit-slow-light',
  'rf-seb-dispersive-spin-sensing',
  'shno-mutual-synchronization',
  'su8-one-shot-holographic-printing',
  'alphaevolve-quantum-lithography-discovery',
  'mos2-cerebellum-memtransistors-spintronics',
  'edge-slm-delta-net-qpu-self-correction',
  'super-moire-dmi-hopfion-stabilizer',
  'cte-graded-nanolaminate-scaffold-buffer',
  'plasmonic-spin-galvanic-optoelectronic-readout',
  'adak-excitons-vdw-magnetism',
  'lin-colloidal-metal-nitrides',
  'siskins-polymer-free-vdw-assembly',
  'kovnir-ai-magnito-magnets',
]);

const recordSources: SourceRegistryEntry[] = researchRecords.map((record) => {
  const status: SourceVerificationStatus = !record.url
    ? 'missing-url'
    : accessibleRecordIds.has(record.id)
      ? 'accessible'
      : 'unverified';

  return {
    id: record.id,
    title: record.title,
    publisher: record.source,
    url: record.url,
    status,
    notes: status === 'accessible'
      ? 'Live URL checked during verification; no archive capture is recorded.'
      : status === 'unverified'
        ? 'URL recorded; accessibility and archive capture still require verification.'
        : 'Research record has no source URL or archive reference.',
  };
});

export const sourceRegistry: SourceRegistryEntry[] = [
  ...recordSources,
  {
    id: 'xiong-confseq-2026',
    title: 'ConfSeq: 3D molecular structures and AI',
    publisher: 'Xiong et al. / Nature Machine Intelligence',
    url: 'https://github.com/jiachengxiong/ConfSeq',
    archiveUrl: undefined,
    status: 'accessible',
    notes: 'Repository was accessible during verification; the cited research module currently attributes this work incorrectly as Zheng et al. and needs correction.',
  },
];

export function getSourceVerificationSummary() {
  return sourceRegistry.reduce(
    (summary, source) => {
      summary.total += 1;
      summary[source.status] += 1;
      if (!source.archiveUrl) summary.missingArchives += 1;
      return summary;
    },
    { total: 0, accessible: 0, unverified: 0, 'missing-url': 0, missingArchives: 0 },
  );
}
