import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ClaimsTable, { type ClaimRow } from '../components/ClaimsTable';

export interface EvidenceGroup {
  label: ClaimRow['tag'];
  summary: string;
  sourceLabel: string;
  sourceHref: string;
  rows: ClaimRow[];
}

export const groups: EvidenceGroup[] = [
  {
    label: 'DEMONSTRATED',
    summary: 'Results reported in experiments, simulations, or established source material.',
    sourceLabel: 'Open source verification ledger',
    sourceHref: '/sources',
    rows: [
      { claim: 'Hopfion stability in a EuS/Bi₂Se₃/EuS system anchors the phase-1 demonstrator.', tag: 'DEMONSTRATED', source: 'Katmis et al.' },
      { claim: 'TOHE is demonstrated in simulation as an electronic hallmark for 3D hopfions.', tag: 'DEMONSTRATED', source: 'Göbel & Lounis' },
      { claim: 'Antiferroelectricity coexists with switchable polarization in K₃[Nb₃O₆|(BO₃)₂] hybrid domain walls.', tag: 'DEMONSTRATED', source: 'Ushakov et al.' },
      { claim: 'Deterministic large-area fabrication of high-crystallinity oxide moiré superlattices is demonstrated in NaNbO₃.', tag: 'DEMONSTRATED', source: 'Ghanbari et al.' },
      { claim: 'High-field PEEM magnetic imaging up to 150 mT is demonstrated using micro-scale flux concentrators.', tag: 'DEMONSTRATED', source: 'Barrera et al.' },
      { claim: 'Machine-learning-guided discovery and synthesis is demonstrated for kagome superconductors YRu₃B₂ and LuRu₃B₂.', tag: 'DEMONSTRATED', source: 'Mustaf et al.' },
    ],
  },
  {
    label: 'INFERRED',
    summary: 'Interpretations that connect source results to a HELIOS-3D experiment, without claiming a completed device.',
    sourceLabel: 'Open source verification ledger',
    sourceHref: '/sources',
    rows: [
      { claim: 'A planar-first, electrically read multilayer stack is the minimum credible validation path.', tag: 'INFERRED', source: 'Current demonstrator memo' },
      { claim: 'TOHE could provide a measurable experimental readout channel for a hopfion’s transverse orbital response.', tag: 'INFERRED', source: 'Literature-to-experiment mapping' },
    ],
  },
  {
    label: 'PROPOSED',
    summary: 'Design hypotheses that require material, device, and measurement validation.',
    sourceLabel: 'Open source verification ledger',
    sourceHref: '/sources',
    rows: [
      { claim: 'A Brownian reservoir could transform perturbed magnetic states into useful learned patterns.', tag: 'PROPOSED', source: 'HELIOS-3D architecture' },
      { claim: 'Frequency-domain or optical sensing could convert a magnetic state into a system-level signal.', tag: 'PROPOSED', source: 'Readout branches' },
    ],
  },
];

export function EvidencePage() {
  return (
    <>
      <Helmet>
        <title>Evidence — HELIOS-3D</title>
        <meta name="description" content="Claim status and source grounding for the HELIOS-3D exhibit." />
      </Helmet>
      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber">Claim status</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Evidence</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">The exhibit separates what has been demonstrated, inferred, and proposed. Read each group with its linked source before extending the claim.</p>
      </header>
      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.label} className="rounded-xl border border-obsidian-3/50 bg-obsidian-2/25 p-5" aria-labelledby={`${group.label.toLowerCase()}-heading`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 id={`${group.label.toLowerCase()}-heading`} className="text-2xl font-bold text-amber">{group.label}</h2>
                <p className="mt-2 max-w-2xl text-parchment-2">{group.summary}</p>
              </div>
              <Link className="text-sm font-semibold text-amber hover:underline" to={group.sourceHref}>{group.sourceLabel} →</Link>
            </div>
            <ClaimsTable rows={group.rows} />
          </section>
        ))}
      </div>
    </>
  );
}
