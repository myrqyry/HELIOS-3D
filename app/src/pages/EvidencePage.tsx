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
      { claim: 'Dispersive spin sensing via RF-SEB and HMM state classification achieves 99.92% readout fidelity in 340 µs.', tag: 'DEMONSTRATED', source: 'Silicon MOS Group' },
      { claim: 'Mutual synchronization in ultra-large arrays of up to 105,000 Spin Hall nano-oscillators (SHNOs) achieves nanosecond phase-ordering dynamics.', tag: 'DEMONSTRATED', source: 'SHNO Research Team' },
      { claim: 'One-shot holographic 3D printing of SU-8 polymer microstructures fuses shapes in 20 seconds with 6 µm resolution.', tag: 'DEMONSTRATED', source: 'SU-8 Holographic Team' },
      { claim: 'Excitons in van der Waals magnetic materials couple directly to magnetic order and magnons, enhancing magneto-optical readout.', tag: 'DEMONSTRATED', source: 'Pratap Chandra Adak et al.' },
      { claim: 'Colloidal metal nitride nanocrystals (GaN, TiN, NbN) can be synthesized in molten salts under controlled ammonia pressure.', tag: 'DEMONSTRATED', source: 'Ruiming Lin et al.' },
      { claim: 'Polymer-free transfer of 2D materials using muscovite mica crystals prevents contamination, creating atomically flat, clean interfaces.', tag: 'DEMONSTRATED', source: 'Makars Šiškins et al.' },
      { claim: 'Cerebellum-inspired MoS₂ memtransistors mimic neural balance with excitatory/inhibitory modes to perform low-power anomaly detection.', tag: 'DEMONSTRATED', source: 'Min-A Kang et al.' },
      { claim: 'AI-driven high-throughput screening and synthesis (MAGNUMS / ARPA-E MAGNITO) accelerates discovery of rare-earth-free ultra-strong permanent magnets.', tag: 'DEMONSTRATED', source: 'Kirill Kovnir et al.' },
      { claim: 'A full-stack post-Von Neumann computing architecture (AGF) combines Clifford algebra, hyperdimensional memory (HDC), self-organizing logic (SOLG), and discrete time crystals (DTC).', tag: 'DEMONSTRATED', source: 'Bryan Ouellette & Claude (AGF 2026)' },
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
      { claim: 'Programmable slow-light PICs enable real-time control of optical signal speed and shape on silicon nitride.', tag: 'INFERRED', source: 'Park et al.' },
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
      { claim: 'AlphaEvolve-driven computational lithography is proposed to resolve SU-8 holographic printing diffraction.', tag: 'PROPOSED', source: 'Google & Substrate' },
      { claim: 'Cerebellum-inspired MoS₂ memtransistors combined with synchronized SHNO arrays enable always-on neuromorphic anomaly detection.', tag: 'PROPOSED', source: 'Memtransistor Research Group' },
      { claim: 'On-device edge reasoning using Gated DeltaNet SLMs is proposed for real-time QPU self-correction.', tag: 'PROPOSED', source: 'Local SLM Engineering' },
      { claim: 'Super-Moiré Interfacial DMI Stressor Films (IrMn/CoFeB/Pt S-SAF) are proposed to lock 3D hopfion binding energy (>50 k_B T) up to 400 K.', tag: 'PROPOSED', source: 'HELIOS-3D Theoretical Design Group' },
      { claim: 'CTE-Graded Nanolaminates (ALD TiO₂/Al₂O₃) and nanocomposite photoresins (TiN/SiO₂) are proposed to suppress 3D scaffold delamination under thermal cycling.', tag: 'PROPOSED', source: 'HELIOS-3D Theoretical Design Group' },
      { claim: 'Near-Field Spin-Galvanic Plasmonic Micro-Cavities (Si₃N₄/Au + 2D TMDs) are proposed to reduce GHz microwave readout power by >100x.', tag: 'PROPOSED', source: 'HELIOS-3D Theoretical Design Group' },
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
