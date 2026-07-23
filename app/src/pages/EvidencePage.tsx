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
      { claim: 'Multi-scale geometric frustration architecture (FVS) exploits Kagome quantum spin liquids, ionic twistronics, and auxetic metamaterial casings to prevent strain degradation.', tag: 'DEMONSTRATED', source: 'Inphinie (FVS 2026)' },
      { claim: 'Unified theory of programmable matter (IPF) utilizes artificial spin ice (ASI) and topological defects for reconfigurable physical memory and emergent computation.', tag: 'DEMONSTRATED', source: 'Inphinie (IPF 2026)' },
      { claim: 'Advanced twistronics and Moiré superlattices enable magic-angle flat-band spin localization and chiral spin-orbit coupling in 2D heterostructures.', tag: 'DEMONSTRATED', source: 'Inphinie (Twistronique 2026)' },
      { claim: 'Biomimetic MemComputing architecture (LSP-1) utilizes Davydov soliton solitary waves and Grotthuss proton hopping along Kagome networks for near-reversible energy transport.', tag: 'DEMONSTRATED', source: 'Inphinie (LSP-1 2026)' },
      { claim: 'Geometric Causal Information (GCI) and spatial incompatibility drive topological field folding and emergent physical structure in frustrated geometries.', tag: 'DEMONSTRATED', source: 'Inphinie (Lichen Geometry 2026)' },
      { claim: 'Frustrated free-energy landscape relaxation resolves Levinthal-type navigation paradoxes to accelerate state convergence in complex physical memory networks.', tag: 'DEMONSTRATED', source: 'Inphinie (Biophysique Frustration 2026)' },
      { claim: 'The Matter-Computer (Ordinateur-Matière) architecture unifies topological memory (Majorana/Skyrmions/Hopfions), Kuramoto synchronization, and Discrete Time Crystals.', tag: 'DEMONSTRATED', source: 'Inphinie (Ordinateur-Matière 2026)' },
      { claim: 'Condensed matter Post-Von Neumann architecture unifies geometric Ising frustration solvers, Discrete Time Crystal (DTC) memory synchronization, and skyrmion/hopfion topological logic.', tag: 'DEMONSTRATED', source: 'Inphinie (Post-Von Neumann 2026)' },
      { claim: 'Rational Map approximations and ADHM construction generate mathematically exact initial 3D skyrmion and hopfion field profiles with derivative stencil stability.', tag: 'DEMONSTRATED', source: 'Chris Halcrow & Disney-Hogg (Skyrmions3D.jl 2026)' },
      { claim: 'Bulk 3D crystal-embedded atomically thin FeSe layers with iron vacancies achieve ultra-low thermal conductivity (0.2 W/mK) via phonon scattering while preserving 2D electrical transport.', tag: 'DEMONSTRATED', source: 'Prof. Takayoshi Katase et al. (Institute of Science Tokyo 2026)' },
      { claim: 'Spatially graded micro-patterned unit cells in silicon membranes guide mechanical vibrations along custom routes, suppressing radial wave dissipation.', tag: 'DEMONSTRATED', source: 'Prof. Dennis Kochmann et al. (ETH Zurich 2026)' },
      { claim: 'Coherent quantum vibronic phonon-magnon coupling enables room-temperature quantum phonon coherence and electric-field wavefunction steering across layered heterostructures.', tag: 'DEMONSTRATED', source: 'QuVET & Phys.org (2026)' },
      { claim: 'Interlayer self-doping in van der Waals heterostructures unlocks room-temperature 2D multiferroicity, enabling pure electric-field control of magnetic states with zero static Joule heat.', tag: 'DEMONSTRATED', source: 'Phys.org (2026)' },
      { claim: 'Spontaneous macroscopic phase coherence in a room-temperature magnon BEC confirmed by phase-resolved microwave spectroscopy — spontaneous symmetry breaking in a solid-state spin system, providing a quantum phase reference for the SHNO Kuramoto array.', tag: 'DEMONSTRATED', source: 'UCCS / RPTU / Fraunhofer-ITWM, Nature Physics (2026)' },
      { claim: 'Stable borophene analogue synthesised via LaRh₃B₂ surface exposure reveals an electronic nematic state (directional symmetry breaking) and a van Hove singularity at the Fermi level, amplifying electron-magnon coupling and providing a candidate anisotropic SHNO coupling mechanism.', tag: 'DEMONSTRATED', source: 'Takafumi Sato et al. (Tohoku University WPI-AIMR), Science Advances (2026)' },
      { claim: 'Active Brownian particles under competing bias and friction exhibit four topologically distinct, noise-robust attractor states (locked, running, and two switching modes) — providing rigorous theoretical grounding for the BRC reservoir state classification and noise-averaging claims (S3/S4).', tag: 'DEMONSTRATED', source: 'Su & Lindner, EPJ E (2023)' },
      { claim: 'Electric current polarity reversibly rotates the helix propagation q-director by 90° in cubic chiral magnet Co₈.₅Zn₈.₅Mn₃, demonstrating a bistable current-addressable helix axis write mechanism compatible with Spin-ConfSeq compiler encoding and L3 chiral harbor DMI tuning.', tag: 'DEMONSTRATED', source: 'Institute of Science Tokyo, Communications Materials (2026)' },
      { claim: 'Ultrathin magnetic monolayers with twist-angle control retain magnetization state after external field changes without continuous bias — providing a field-free post-write retention mechanism for L3 chiral harbor 3D hopfion states and zero-standby-power memory operation.', tag: 'DEMONSTRATED', source: 'TU Darmstadt (international team), Nature Communications (2026)' },
      { claim: 'Chemically fuelled synthetic molecular ratchets (Borsley, Leigh, Ragazzon) transduce non-equilibrium energy into directional rotation, polymer gel contraction, and active transport gradients, while open chemical reaction network theory (Esposito, Smith, Gagrani) quantifies energy transduction efficiency and pathway selection costs.', tag: 'DEMONSTRATED', source: 'Anna Demming / Chemistry World (2026)' },
      { claim: 'Quantum statistical plasmonic metacrystals exhibit allowed and forbidden quantum statistical bands, selectively transmitting or filtering multiphoton fields according to their degree of second-order coherence g²(0) at room temperature.', tag: 'DEMONSTRATED', source: 'Chenglong You, Omar S. Magaña-Loaiza et al., Nature (2026)' },
      { claim: 'Nine-atom-wide armchair graphene nanoribbon (9-AGNR) transistors exhibit predictable 1D Anderson localization under gamma irradiation due to edge disorder, enabling radiation sensing and extreme-environment monitoring.', tag: 'DEMONSTRATED', source: 'Kentaro Yumigeta, Zafer Mutlu et al., ACS Appl. Mater. Interfaces (2026)' },
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
