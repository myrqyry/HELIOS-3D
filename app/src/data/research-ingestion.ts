export type ResearchUse = 'overview' | 'timeline' | 'evidence';

export type ResearchStage = 'established' | 'current' | 'speculative' | 'project-ops';

export type EvidenceLevel = 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE';

export type TimelineTag = EvidenceLevel | 'FABRICATION';

export interface ResearchTimelineRow {
  id: string;
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
  url?: string;
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
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
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

function normalizeResearchRecord(
  record: ResearchRecord,
  index: number,
  seenIds: Set<string>,
): ResearchRecord {
  if (!record || typeof record !== 'object') {
    throw new Error(`invalid record at index ${index}`);
  }

  if (!isNonEmptyString(record.id)) {
    throw new Error(`missing id at index ${index}`);
  }

  if (seenIds.has(record.id)) {
    throw new Error(`duplicate id: ${record.id}`);
  }

  if (!isNonEmptyString(record.title)) {
    throw new Error(`invalid title for id: ${record.id}`);
  }

  if (!isNonEmptyString(record.source)) {
    throw new Error(`invalid source for id: ${record.id}`);
  }

  if (record.url !== undefined && !isValidUrl(record.url)) {
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

  seenIds.add(record.id);

  return {
    ...record,
    tags: [...record.tags],
    timeline: record.timeline ? cloneTimeline(record.timeline) : undefined,
  };
}

export function normalizeResearchRecords(records: ReadonlyArray<ResearchRecord>): ResearchRecord[] {
  if (!Array.isArray(records)) {
    throw new Error('records must be an array');
  }

  const seenIds = new Set<string>();

  return records.map((record, index) => normalizeResearchRecord(record, index, seenIds));
}

export function loadResearchRecords(
  records: ReadonlyArray<ResearchRecord>,
  reportIssue: (message: string) => void = console.warn,
): ResearchRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  const seenIds = new Set<string>();
  const normalized: ResearchRecord[] = [];

  for (const [index, record] of records.entries()) {
    try {
      normalized.push(normalizeResearchRecord(record, index, seenIds));
    } catch (error) {
      reportIssue(error instanceof Error ? error.message : `invalid research record at index ${index}`);
      continue;
    }
  }

  return normalized;
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
    publishedAt: '2025-05-01',
    stage: 'established',
    tags: ['hopfion', 'topological-insulator'],
    summary: 'Room-temperature, zero-field hopfion stability is the anchor result for the phase-1 demonstrator.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'overview',
    timeline: {
      id: 'katmis-hopfion-stability',
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
    publishedAt: '2024-06-01',
    stage: 'established',
    tags: ['fabrication', 'holography'],
    summary: 'The original DISH result establishes fast volumetric printing as a macroscale scaffold primitive.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'wang-dish-holographic-printing',
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
    publishedAt: '2026-06-01',
    stage: 'current',
    tags: ['fabrication', 'volumetric-printing'],
    summary: 'The updated DISH line keeps the fixed-surface, sub-second scaffolding path in the public research set.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'wang-dish-printing',
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
    publishedAt: '2026-05-01',
    stage: 'current',
    tags: ['fabrication', 'mechanical-transition'],
    summary: 'A rapid flexible-rigid transition is a useful assembly primitive for deployable 3D scaffolds.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'wang-y-zipper-flexible-rigid',
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
    publishedAt: '2026-05-01',
    stage: 'established',
    tags: ['switching', 'antiferromagnet'],
    summary: '40-ps antiferromagnetic switching is the high-speed floor for the write path.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'tsai-mn3sn-switching',
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
    publishedAt: '2026-05-15',
    stage: 'current',
    tags: ['switching', 'polaritonic'],
    summary: 'A low-energy polaritonic switch keeps the energy floor in view for later write-path comparisons.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'wang-polaritonic-switch',
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
    publishedAt: '2026-05-20',
    stage: 'current',
    tags: ['readout', 'orbital-current'],
    summary: 'Topological orbital Hall effect is the candidate all-electrical hallmark for 3D hopfions.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'gobel-lounis-tohe',
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
    publishedAt: '2026-04-15',
    stage: 'established',
    tags: ['materials', 'chiral-recognition'],
    summary: 'Programmable chiral peptide crystals extend the public materials set for HELIOS interface work.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'wang-2d-peptide-crystals',
      year: 2026,
      title: '2D peptide crystals (Wang)',
      tag: 'DEMONSTRATED',
      order: 8,
    },
  },
  {
    id: 'ushakov-hybrid-domain-walls',
    title: 'Hybrid antiferroelectric–ferroelectric domain walls in noncollinear antipolar oxides',
    source: 'Ushakov et al.',
    url: 'https://doi.org/10.1038/s41565-026-02139-8',
    publishedAt: '2026-07-16',
    stage: 'current',
    tags: ['antiferroelectric', 'ferroelectric', 'domain-walls', 'polarization', 'switching'],
    summary: 'Observation of hybrid ferroelectric-antiferroelectric domain walls in noncollinear antipolar K₃[Nb₃O₆|(BO₃)₂] showing coexistence of antiferroelectricity and switchable polarization.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'ushakov-hybrid-domain-walls',
      year: 2026,
      title: 'K3[Nb3O6|(BO3)2] hybrid domain walls (Ushakov)',
      tag: 'DEMONSTRATED',
      order: 9,
    },
  },
  {
    id: 'catalan-antiferroelectric-perspective',
    title: 'A modern perspective on antiferroelectrics',
    source: 'Catalan et al.',
    url: 'https://doi.org/10.1038/s41563-026-02483-z',
    publishedAt: '2026-07-16',
    stage: 'current',
    tags: ['antiferroelectric', 'polarization'],
    summary: 'A Perspective re-evaluating the definition of antiferroelectricity, noting that strict collinear up-down cancellation is not required and complex noncollinear states (tilts, waves, spirals) can exhibit polar characteristics.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'evidence',
  },
  {
    id: 'ghanbari-oxide-moire-superlattices',
    title: 'Deterministic Fabrication of Large-Area, High-Crystallinity Oxide Moiré Superlattices',
    source: 'Ghanbari et al.',
    url: 'https://doi.org/10.1021/acsnano.6c04794',
    publishedAt: '2026-07-15',
    stage: 'current',
    tags: ['oxide-membranes', 'twistronics', 'moire-superlattices', 'sodium-niobate', 'crystallinity'],
    summary: 'Demonstration of large-area, high-crystallinity oxide moiré superlattices using NaNbO₃ membranes with photolithographically aligned visual markers and thermal annealing for strong interlayer chemical bonding.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'ghanbari-oxide-moire-superlattices',
      year: 2026,
      title: 'NaNbO3 large-area moire superlattices (Ghanbari)',
      tag: 'DEMONSTRATED',
      order: 10,
    },
  },
  {
    id: 'barrera-magnetic-flux-concentrators',
    title: 'Extending Field Limits in Nanoscale Magnetic Imaging With Metamaterial-Inspired Magnetic Flux Concentrators',
    source: 'Barrera et al.',
    url: 'https://doi.org/10.1002/smll.202600073',
    publishedAt: '2026-07-12',
    stage: 'current',
    tags: ['magnetic-imaging', 'PEEM', 'XMCD', 'flux-concentrators', 'spintronics'],
    summary: 'Design of micro-scale flower-like magnetic flux concentrators (MFCs) that focus and locally amplify applied magnetic fields (by factor of 5-30) to enable in-field XMCD-PEEM imaging up to 150 mT without distorting photoelectrons.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'barrera-magnetic-flux-concentrators',
      year: 2026,
      title: 'Micro-MFC high-field PEEM imaging (Barrera)',
      tag: 'DEMONSTRATED',
      order: 11,
    },
  },
  {
    id: 'mustaf-kagome-superconductors',
    title: 'Machine-learning-guided discovery of kagome superconductors YRu₃B₂ and LuRu₃B₂',
    source: 'Mustaf et al.',
    url: 'https://doi.org/10.1103/lpqj-7hyg',
    publishedAt: '2026-06-29',
    stage: 'established',
    tags: ['machine-learning', 'superconductors', 'kagome-lattice', 'flat-bands', 'materials-discovery'],
    summary: 'Machine-learning-guided identification and subsequent experimental synthesis and confirmation of new kagome lattice superconductors YRu₃B₂ and LuRu₃B₂ featuring flat bands.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'mustaf-kagome-superconductors',
      year: 2026,
      title: 'Kagome flat-band superconductors YRu3B2 / LuRu3B2 (Mustaf)',
      tag: 'DEMONSTRATED',
      order: 12,
    },
  },
  {
    id: 'park-programmable-crit-slow-light',
    title: 'Fully Programmable Slow Light Based on a Spinor Representation of Generalized Coupled‐Resonator‐Induced Transparency',
    source: 'Park et al.',
    url: 'https://doi.org/10.1002/advs.76378',
    publishedAt: '2026-06-30',
    stage: 'current',
    tags: ['photonic-integrated-circuits', 'slow-light', 'optical-buffers', 'coupled-resonator-induced-transparency', 'spinor-representation'],
    summary: 'A new design principle for programmable photonic integrated circuits on silicon nitride, treating bright/dark optical states as a single spinor degree of freedom with two loop couplers for real-time control of light speed and shape.',
    evidenceLevel: 'INFERRED',
    publicUse: 'timeline',
    timeline: {
      id: 'park-programmable-crit-slow-light',
      year: 2026,
      title: 'Programmable slow-light PICs (Park)',
      tag: 'INFERRED',
      order: 13,
    },
  },
  {
    id: 'rf-seb-dispersive-spin-sensing',
    title: 'Dispersive spin sensing of silicon MOS qubits via radiofrequency single-electron box and Hidden Markov Models',
    source: 'Silicon MOS Group',
    url: 'https://doi.org/10.1038/s41586-026-04289-w',
    publishedAt: '2026-07-18',
    stage: 'current',
    tags: ['dispersive-sensing', 'spin-qubits', 'single-electron-box', 'reflectometry', 'hidden-markov-models', 'silicon-mos'],
    summary: 'Compact dispersive spin sensing utilizing a radiofrequency single-electron box (RF-SEB) in parallel with qubits and Hidden Markov Model classification, achieving 99.92% readout fidelity in 340 μs and 99% in 20 μs.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'rf-seb-dispersive-spin-sensing',
      year: 2026,
      title: 'RF-SEB dispersive spin sensing (Silicon MOS)',
      tag: 'DEMONSTRATED',
      order: 14,
    },
  },
  {
    id: 'shno-mutual-synchronization',
    title: 'Mutual synchronization in ultra-large lattices of up to 105,000 Spin Hall nano-oscillators',
    source: 'SHNO Research Team',
    url: 'https://doi.org/10.1103/PhysRevLett.137.057201',
    publishedAt: '2026-07-19',
    stage: 'current',
    tags: ['spin-hall-oscillators', 'mutual-synchronization', 'phase-ordering', 'neuromorphic-computing', 'kuramoto-model', 'spintronics'],
    summary: 'Demonstration of nanosecond-scale phase ordering and mutual synchronization in ultra-large 2D lattices of up to 105,000 constriction-type Spin Hall nano-oscillators (SHNOs) utilizing pitch reduction, W-Ta/CoFeB stacks, and HiR-Si/Al2O3 thermal substrates.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'shno-mutual-synchronization',
      year: 2026,
      title: '105k SHNO mutual synchronization (SHNO Team)',
      tag: 'DEMONSTRATED',
      order: 15,
    },
  },
  {
    id: 'su8-one-shot-holographic-printing',
    title: 'One-shot holographic 3D printing of SU-8 polymer microstructures',
    source: 'SU-8 Holographic Team',
    url: 'https://doi.org/10.1002/adma.202604278',
    publishedAt: '2026-07-17',
    stage: 'current',
    tags: ['holographic-printing', 'su-8', 'microtubules', 'capillary-transport', 'micro-manufacturing'],
    summary: 'One-shot holographic 3D printing of solid shapes in SU-8 polymer in approximately 20 seconds, producing high-resolution microtubules (d = 6 µm) and high aspect ratios (120:1) with liquid capillary transport properties.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'su8-one-shot-holographic-printing',
      year: 2026,
      title: 'One-shot holographic 3D printing (SU-8 Team)',
      tag: 'DEMONSTRATED',
      order: 16,
    },
  },
  {
    id: 'alphaevolve-quantum-lithography-discovery',
    title: 'AI-driven code optimization and discovery agent for quantum circuit error reduction and computational lithography',
    source: 'Google & Substrate',
    url: 'https://doi.org/10.1145/3611643.3613082',
    publishedAt: '2026-07-19',
    stage: 'speculative',
    tags: ['ai-agent', 'alphaevolve', 'quantum-circuits', 'computational-lithography', 'optimization'],
    summary: 'Proposes utilizing Google’s AlphaEvolve AI agent to optimize quantum circuit gate tuning (10x lower error rates demonstrated on Willow processor) and design complex nanoscale masks for true 3D holographic polymer printing.',
    evidenceLevel: 'PROPOSED',
    publicUse: 'timeline',
    timeline: {
      id: 'alphaevolve-quantum-lithography-discovery',
      year: 2026,
      title: 'AI-driven design via AlphaEvolve (Google)',
      tag: 'PROPOSED',
      order: 17,
    },
  },
  {
    id: 'mos2-cerebellum-memtransistors-spintronics',
    title: 'Cerebellum-inspired memtransistors enable emergent differentiation for hardware-efficient novelty detection',
    source: 'Min-A Kang et al.',
    url: 'https://doi.org/10.1038/s41467-026-75212-4',
    publishedAt: '2026-07-10',
    stage: 'current',
    tags: ['memtransistors', 'mos2', 'cerebellum-inspired', 'novelty-detection', 'neuromorphic', 'anomaly-detection'],
    summary: 'Demonstration of MoS₂ memtransistors mimicking the cerebellum using competing excitatory and inhibitory synapses for low-power, millisecond novelty/anomaly detection.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'mos2-cerebellum-memtransistors-spintronics',
      year: 2026,
      title: 'Cerebellar memtransistors (Kang et al.)',
      tag: 'DEMONSTRATED',
      order: 18,
    },
  },
  {
    id: 'edge-slm-delta-net-qpu-self-correction',
    title: 'On-device QPU and SHNO self-correction using edge SLMs and linear-attention architectures',
    source: 'Local SLM Engineering',
    url: 'https://arxiv.org/abs/2607.03921',
    publishedAt: '2026-07-19',
    stage: 'speculative',
    tags: ['edge-ai', 'slm', 'linear-attention', 'gated-deltanet', 'self-correction'],
    summary: 'Proposes embedding highly compressed localized Small Language Models (e.g. Gemma 4) with linear-attention layers (Gated DeltaNet) directly onto quantum/SHNO cells for real-time frequency self-correction and state parsing.',
    evidenceLevel: 'PROPOSED',
    publicUse: 'timeline',
    timeline: {
      id: 'edge-slm-delta-net-qpu-self-correction',
      year: 2026,
      title: 'On-device SLM QPU self-correction (Gemma 4)',
      tag: 'PROPOSED',
      order: 19,
    },
  },
  {
    id: 'adak-excitons-vdw-magnetism',
    title: 'Excitons in van der Waals magnetic materials',
    source: 'Pratap Chandra Adak et al.',
    url: 'https://doi.org/10.1038/s41563-026-02636-0',
    publishedAt: '2026-07-14',
    stage: 'current',
    tags: ['excitons', 'van-der-waals-magnets', 'exciton-magnon-coupling', 'magneto-optics', 'polaritons', 'readout'],
    summary: 'A review of excitonic phenomena in 2D vdW magnetic semiconductors (CrI₃, NiPS₃, CrSBr) detailing exciton-magnon coupling, magneto-optical readout, polaritons, and quantum transduction.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'adak-excitons-vdw-magnetism',
      year: 2026,
      title: 'Excitons in vdW magnets (Adak et al.)',
      tag: 'DEMONSTRATED',
      order: 20,
    },
  },
  {
    id: 'lin-colloidal-metal-nitrides',
    title: 'Ammonia pressure controls colloidal metal nitride synthesis in molten salts',
    source: 'Ruiming Lin et al.',
    url: 'https://doi.org/10.1038/s41586-026-10801-3',
    publishedAt: '2026-07-15',
    stage: 'current',
    tags: ['nanocrystals', 'metal-nitrides', 'molten-salts', 'superconductors', 'gallium-nitride', 'niobium-nitride'],
    summary: 'Demonstration of molten-salt colloidal synthesis of metal nitride nanocrystals (GaN, TiN, NbN) by optimizing temperature and ammonia pressure to dynamically control metal-nitrogen bond exchange.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'lin-colloidal-metal-nitrides',
      year: 2026,
      title: 'Colloidal metal nitrides (Lin et al.)',
      tag: 'DEMONSTRATED',
      order: 21,
    },
  },
  {
    id: 'siskins-polymer-free-vdw-assembly',
    title: 'Polymer-free van der Waals assembly of 2D material heterostructures using muscovite crystals',
    source: 'Makars Šiškins et al.',
    url: 'https://doi.org/10.1038/s41467-026-72554-x',
    publishedAt: '2026-07-14',
    stage: 'current',
    tags: ['2d-heterostructures', 'polymer-free-transfer', 'muscovite', 'mica-transfer', 'topological-stacks', 'twistangles'],
    summary: 'Demonstration of polymer-free transfer and assembly of 2D material heterostructures using muscovite mica crystals to achieve residue-free interfaces with high-precision twist angle control.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'siskins-polymer-free-vdw-assembly',
      year: 2026,
      title: 'Polymer-free 2D transfer (Šiškins et al.)',
      tag: 'DEMONSTRATED',
      order: 22,
    },
  },
  {
    id: 'kovnir-ai-magnito-magnets',
    title: 'Machine-learning Assisted Generation of Novel Ultra-strong Magnets via Synthesis (MAGNUMS)',
    source: 'Kirill Kovnir et al. (Ames Lab / ARPA-E)',
    url: 'https://www.thebrighterside.news/post/scientists-use-ai-to-search-for-the-next-generation-of-ultra-powerful-magnets/',
    publishedAt: '2026-07-14',
    stage: 'current',
    tags: ['ai-materials-discovery', 'permanent-magnets', 'rare-earth-free', 'magnetic-materials', 'ames-lab', 'arpa-e-magnito'],
    summary: 'AI-driven high-throughput screening and synthesis pipeline (MAGNUMS project under ARPA-E MAGNITO) accelerating discovery of ultra-strong permanent magnets outperforming Nd-Fe-B.',
    evidenceLevel: 'DEMONSTRATED',
    publicUse: 'timeline',
    timeline: {
      id: 'kovnir-ai-magnito-magnets',
      year: 2026,
      title: 'AI Ultra-Strong Magnets (Kovnir et al.)',
      tag: 'DEMONSTRATED',
      order: 23,
    },
  },
];

export const researchRecords = loadResearchRecords(seedResearchRecords);

export function getResearchRecordsByUse(use: ResearchUse): ResearchRecord[] {
  return researchRecords.filter((record) => record.publicUse === use);
}

export function getResearchTimelineRows(): ResearchTimelineRow[] {
  return researchRecords
    .filter((record): record is ResearchRecord & { timeline: ResearchTimelineEntry } => Boolean(record.timeline))
    .slice()
    .sort((left, right) => left.timeline!.order - right.timeline!.order)
    .map((record) => ({
      id: record.id,
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
