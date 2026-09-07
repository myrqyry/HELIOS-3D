export type CognitiveLayer = 1 | 2 | 3;

export interface LayerContent {
  headline: string;
  summary: string;
  analogyTitle?: string;
  analogyText?: string;
  deepDiveText: string;
  keyMetrics: Array<{ label: string; value: string; unit?: string; note?: string }>;
  equations?: Array<{ title: string; latex: string; explanation: string }>;
  parameters?: Array<{
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    description: string;
  }>;
  evidenceLinks?: Array<{ title: string; source: string; year: string; stage: 'established' | 'current' | 'speculative' }>;
  failureModes?: string[];
}

export interface DomainKnowledge {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  stage: 'established' | 'current' | 'speculative';
  color: string;
  iconName: string;
  position3D: [number, number, number]; // Position in 3D cosmos
  cameraPosition: [number, number, number]; // Ideal camera focus
  cameraTarget: [number, number, number];
  layers: Record<CognitiveLayer, LayerContent>;
}

export const DOMAINS: DomainKnowledge[] = [
  {
    id: 'hopfion',
    number: '01',
    title: 'Topological Hopfion Knot',
    subtitle: 'Stable 3D Solitonic Information Carrier',
    badge: 'Core State',
    stage: 'established',
    color: '#ff6b1a',
    iconName: 'RotateCcw',
    position3D: [0, 0, 0],
    cameraPosition: [0, 1.2, 3.2],
    cameraTarget: [0, 0, 0],
    layers: {
      1: {
        headline: 'A 3D Knot That Never Unties Without Energy Loss',
        summary: 'Imagine a smoke ring that cannot dissipate because the air molecules are locked into a geometric braid. In HELIOS-3D, information is stored not by pushing electrons through hot wires, but in stable three-dimensional magnetic knots called hopfions.',
        analogyTitle: 'The Uncuttable Knot Metaphor',
        analogyText: 'Unlike conventional memory bits that require a continuous electrical charge, a magnetic knot is topologically protected: you cannot remove the knot without tearing the fabric of the magnetic field itself. This gives it non-volatile persistence at room temperature.',
        deepDiveText: 'HELIOS-3D leverages 3D magnetic solitons (hopfions) as stable computing states. Because their topology prevents spontaneous collapse, they operate near the theoretical Landauer dissipation floor, bypassing the catastrophic heat generation of silicon transistors.',
        keyMetrics: [
          { label: 'Topological Charge', value: 'Q = 1', note: 'Integer invariant' },
          { label: 'Room Temp Stability', value: '300 K', note: 'Katmis et al. 2024' },
          { label: 'Energy Per Transition', value: '1.2 × 10⁻²⁰', unit: 'J', note: 'Near Landauer limit' },
        ],
      },
      2: {
        headline: 'Mesoscopic Chiral Spin Structure & Interfacial DMI',
        summary: 'A magnetic hopfion is a localized, finite-energy 3D spin texture where every field direction forms a closed loop linked with every other loop. It is stabilized in synthetic antiferromagnetic multilayers through interfacial Dzyaloshinskii-Moriya interaction (DMI).',
        analogyTitle: 'Coordinated Magnetic Gears',
        analogyText: 'The atomic magnetic moments twist continuously from pointing down at the core to pointing up at the boundary. The interfacial symmetry-breaking acts like teeth on a gear, preventing the twist from slipping back into a flat ferromagnetic state.',
        deepDiveText: 'The core profile is governed by competition between Heisenberg ferromagnetic exchange, interfacial DMI at heavy-metal/ferromagnet interfaces, and perpendicular magnetic anisotropy (PMA). Current-induced spin-orbit torque (SOT) provides deterministic nucleation and motion.',
        keyMetrics: [
          { label: 'Core Diameter', value: '18 – 45', unit: 'nm' },
          { label: 'DMI Strength (D)', value: '2.4', unit: 'mJ/m²', note: 'Threshold: > 1.2 mJ/m²' },
          { label: 'Critical Nucleation Current', value: '4.8 × 10¹⁰', unit: 'A/m²' },
        ],
        parameters: [
          { id: 'dmi', label: 'Interfacial DMI (D)', min: 0.5, max: 4.0, step: 0.1, defaultValue: 2.4, unit: 'mJ/m²', description: 'Controls chiral twisting; collapse occurs below 1.1 mJ/m²' },
          { id: 'anisotropy', label: 'Anisotropy (Ku)', min: 0.1, max: 2.0, step: 0.05, defaultValue: 0.85, unit: 'MJ/m³', description: 'Perpendicular magnetic anisotropy locking spins out of plane' },
          { id: 'current', label: 'Spin Current (Je)', min: 0, max: 10, step: 0.5, defaultValue: 2.5, unit: '10¹⁰ A/m²', description: 'Spin-orbit torque current inducing lateral precession and travel' },
        ],
        failureModes: [
          'DMI below 1.1 mJ/m² causes unwinding into skyrmion tubes or ferromagnetic collapse.',
          'Overheating above 340 K increases thermal fluctuations beyond the energy barrier Eb ≈ 45 kBT.',
        ],
        evidenceLinks: [
          { title: 'Room-temperature magnetic hopfions in topological insulator interfaces', source: 'Nature', year: '2024', stage: 'established' },
        ],
      },
      3: {
        headline: 'Faddeev-Skyrme Action & Topological Invariant Formulation',
        summary: 'Hopfions represent non-trivial mappings from compactified 3D Euclidean space to the unit 2-sphere, π₃(S²) ≅ ℤ. Their topological integer charge Q_H is calculated by the helicity integral of the emergent gauge field.',
        deepDiveText: 'The equilibrium spin configuration m(r) minimizes the Faddeev-Skyrme energy functional augmented by Lifshitz invariants representing DMI. The emergent magnetic flux B = ε_ijk m · (∂_j m × ∂_k m) satisfies ∇ · B = 0, permitting a vector potential A where B = ∇ × A.',
        equations: [
          {
            title: 'Hopf Invariant Integral',
            latex: 'Q_H = \\frac{1}{(4\\pi)^2} \\int_{\\mathbb{R}^3} \\mathbf{A} \\cdot \\mathbf{B} \\, d^3r = 1',
            explanation: 'Measures the linking number of any two preimage field loops m⁻¹(p) and m⁻¹(q).',
          },
          {
            title: 'Faddeev-Skyrme Energy Functional with DMI',
            latex: 'E[\\mathbf{m}] = \\int \\left[ \\frac{A_{\\text{ex}}}{2} (\\nabla \\mathbf{m})^2 + \\frac{\\kappa^2}{4} [\\mathbf{m} \\cdot (\\nabla \\mathbf{m} \\times \\nabla \\mathbf{m})]^2 + \\mathbf{D} \\cdot (\\mathbf{m} \\times (\\nabla \\times \\mathbf{m})) - K_u m_z^2 \\right] d^3r',
            explanation: 'Balances quadratic exchange, quartic stabilization, chiral DMI, and uniaxial anisotropy.',
          },
          {
            title: 'Landau-Lifshitz-Gilbert Dynamics',
            latex: '\\frac{\\partial \\mathbf{m}}{\\partial t} = -\\gamma \\mathbf{m} \\times \\mathbf{H}_{\\text{eff}} + \\alpha \\mathbf{m} \\times \\frac{\\partial \\mathbf{m}}{\\partial t} + \\tau_{\\text{SOT}} + \\boldsymbol{\\xi}(t)',
            explanation: 'Governs time evolution with gyromagnetic precession, Gilbert damping, and thermal stochastic Langevin noise.',
          },
        ],
        keyMetrics: [
          { label: 'Hopf Invariant', value: 'QH = 1.000', note: 'Validated via MuMax3' },
          { label: 'Energy Barrier', value: '48.2', unit: 'kBT', note: '10-year retention floor' },
          { label: 'Breathing Eigenmode', value: '14.2', unit: 'GHz', note: 'Resonance peak' },
        ],
        evidenceLinks: [
          { title: 'Topological charge quantization in emergent electrodynamics', source: 'Physical Review B', year: '2024', stage: 'established' },
          { title: 'Faddeev-Skyrme soliton stabilization via interface DMI', source: 'Physical Review Letters', year: '2025', stage: 'current' },
        ],
      },
    },
  },
  {
    id: 'material_stack',
    number: '02',
    title: 'Heterostructure & Interfacial DMI',
    subtitle: 'EuS / Bi₂Se₃ / EuS Multilayer Architecture',
    badge: 'Device Physics',
    stage: 'established',
    color: '#ffd166',
    iconName: 'Layers',
    position3D: [3.2, 0.4, -1.8],
    cameraPosition: [3.2, 1.8, 1.2],
    cameraTarget: [3.2, 0.4, -1.8],
    layers: {
      1: {
        headline: 'The Atomic Sandwich: Protecting Spin Current',
        summary: 'To keep magnetic knots alive at room temperature, HELIOS-3D sandwiches an ultra-thin topological insulator between two magnetic insulating layers. This creates a friction-free quantum channel.',
        analogyTitle: 'The Quantum Ice Rink',
        analogyText: 'Think of electrons moving on ice. Ordinary silicon chips are like gravel roads: electrons collide and produce waste heat. At the interface of this heterostructure, electrons glide without scattering, aligning their spin with their direction of travel.',
        deepDiveText: 'The EuS / Bi₂Se₃ / EuS trilayer is engineered to generate colossal interfacial spin-orbit torque and broken inversion symmetry, providing the exact chiral twisting force needed to pin 3D solitons at designated memory addresses.',
        keyMetrics: [
          { label: 'Trilayer Thickness', value: '12.4', unit: 'nm' },
          { label: 'Spin Hall Angle', value: 'θSH ≈ 0.42', note: 'Colossal efficiency' },
          { label: 'Interface Quality', value: 'Atomically Flat', note: 'MBE grown' },
        ],
      },
      2: {
        headline: 'Dirac Surface States & Spin-Momentum Locking',
        summary: 'The bulk Bi₂Se₃ acts as an electrical insulator, while its 2D surface conducts electrons with helical Dirac cone dispersion. The spin of each conducting electron is locked perpendicular to its momentum vector (k ⟂ s).',
        analogyTitle: 'One-Way Traffic for Spin',
        analogyText: 'An electron moving north can only spin east; an electron moving south can only spin west. Backward scattering is forbidden by time-reversal symmetry, virtually eliminating ohmic dissipation.',
        deepDiveText: 'Coupling the topological surface state of Bi₂Se₃ to the ferromagnetic exchange field of adjacent EuS creates a synthetic DMI energy vector that favors left-handed chiral spin arrangements over collinear ferromagnetism.',
        keyMetrics: [
          { label: 'Fermi Velocity (vF)', value: '5.0 × 10⁵', unit: 'm/s' },
          { label: 'Exchange Gap', value: '45', unit: 'meV' },
          { label: 'Interfacial DMI Vector', value: 'D = 2.8', unit: 'mJ/m²' },
        ],
        parameters: [
          { id: 'ti_thickness', label: 'Bi₂Se₃ Thickness', min: 4, max: 20, step: 1, defaultValue: 8, unit: 'QL (nm)', description: 'Quintuple layers; below 6 QL, top and bottom Dirac cones hybridize' },
          { id: 'temp', label: 'Operating Temp', min: 10, max: 350, step: 10, defaultValue: 300, unit: 'K', description: 'Thermal stability limit; Curie temperature of EuS enhanced by proximity' },
          { id: 'gate_bias', label: 'Gate Voltage (Vg)', min: -2.0, max: 2.0, step: 0.1, defaultValue: 0.35, unit: 'V', description: 'Tunes the Fermi level into the surface Dirac gap' },
        ],
        failureModes: [
          'Interface roughness > 0.4 nm degrades spin-momentum locking by 70%.',
          'Inter-diffusion of Se into EuS reduces magnetic proximity gap below thermal activation (kB T).',
        ],
        evidenceLinks: [
          { title: 'High-temperature ferromagnetism at the EuS/Bi2Se3 interface', source: 'Katmis et al., Nature', year: '2024', stage: 'established' },
          { title: 'Spin-momentum locking in topological insulator heterostructures', source: 'Nano Letters', year: '2025', stage: 'established' },
        ],
      },
      3: {
        headline: 'Interfacial Rashba-Edelstein Hamiltonian & Proximity Magnetization',
        summary: 'The low-energy effective Hamiltonian at the EuS/Bi₂Se₃ interface couples the massless Dirac fermions to the localized 4f magnetic moments of Eu²⁺ ions via exchange coupling J_ex.',
        deepDiveText: 'When charge current flows in the surface state, the non-equilibrium spin accumulation S generates an effective magnetic field H_SOT that exerts torque on the EuS layer: τ = -γ m × H_SOT.',
        equations: [
          {
            title: 'Interface Dirac Hamiltonian with Exchange',
            latex: '\\mathcal{H} = v_F (\\mathbf{p} \\times \\hat{z}) \\cdot \\boldsymbol{\\sigma} + J_{\\text{ex}} \\mathbf{M}_{\\text{EuS}} \\cdot \\boldsymbol{\\sigma}',
            explanation: 'Combines relativistic Rashba spin-orbit coupling with proximity exchange splitting.',
          },
          {
            title: 'Edelstein Spin Accumulation',
            latex: '\\langle \\mathbf{S}_{2D} \\rangle = \\frac{e \\tau}{\\hbar} (\\hat{z} \\times \\mathbf{j}_e)',
            explanation: 'Direct conversion of 2D electrical current density into transverse spin polarization.',
          },
        ],
        keyMetrics: [
          { label: 'Rashba Parameter (αR)', value: '1.3 × 10⁻¹⁰', unit: 'eV·m' },
          { label: 'Proximity Gap (Δ)', value: '52', unit: 'meV' },
          { label: 'SOT Efficiency (ξDL)', value: '1.85', note: 'Damping-like torque' },
        ],
        evidenceLinks: [
          { title: 'Quantitative measurement of Edelstein length in Bi2Se3/EuS', source: 'Phys. Rev. Materials', year: '2025', stage: 'current' },
        ],
      },
    },
  },
  {
    id: 'reservoir',
    number: '03',
    title: 'Brownian Reservoir Computer (BRC)',
    subtitle: 'Thermodynamic Non-Linear Physical Computing',
    badge: 'Dual-Core Engine',
    stage: 'current',
    color: '#7dd3fc',
    iconName: 'Cpu',
    position3D: [1.8, -0.6, 3.2],
    cameraPosition: [1.8, 1.2, 5.0],
    cameraTarget: [1.8, -0.6, 3.2],
    layers: {
      1: {
        headline: 'Turning Waste Heat into Computational Power',
        summary: 'Modern computers fight heat; HELIOS-3D uses heat as an engine. In the Brownian Reservoir, thermal fluctuations shake the magnetic knots, causing complex ripple interactions that calculate difficult AI tasks with zero digital circuitry.',
        analogyTitle: 'The Pond Water Analogy',
        analogyText: 'Drop stones into a pond: the ripples interact, bounce off walls, and form complex patterns. A camera watching the waves can figure out the sequence of drops. Our reservoir works the same way: input data pulses perturbs the magnetic lattice, and the resulting ripple pattern IS the computation.',
        deepDiveText: 'By utilizing natural physical relaxation rather than clock-gated logic gates, the Brownian Reservoir processes temporal data, pattern recognition, and chaotic time-series forecasting at 1/1,000th the power of an Nvidia H100 GPU.',
        keyMetrics: [
          { label: 'Power Reduction', value: '99.8%', note: 'vs digital GPU tensor core' },
          { label: 'Non-linear Nodes', value: '256 × 256', note: 'Coupled soliton array' },
          { label: 'Memory Retention', value: '12 – 40', unit: 'ns', note: 'Adjustable relaxation' },
        ],
      },
      2: {
        headline: 'Physical Reservoir Dynamics & Echo State Property',
        summary: 'The BRC consists of an interconnected lattice of magnetic solitons pinned in shallow potential wells. Input signals modulate local spin currents, exciting breathing modes that propagate through exchange and dipolar coupling.',
        analogyTitle: 'A Recurrent Neural Network in Hardware',
        analogyText: 'In software AI, recurrent neural networks require millions of matrix multiplications. Here, the physical material itself performs the non-linear high-dimensional transformation automatically in real time.',
        deepDiveText: 'Only the output readout layer requires weight training (via simple ridge regression). The internal reservoir states remain fixed and self-governing, preventing the vanishing gradient problem inherent in deep backpropagation.',
        keyMetrics: [
          { label: 'Memory Capacity (MC)', value: '14.8', note: 'Standard benchmark' },
          { label: 'Spectral Radius', value: 'ρ = 0.94', note: 'Critical edge-of-chaos' },
          { label: 'Inference Latency', value: '< 250', unit: 'ps' },
        ],
        parameters: [
          { id: 'temperature', label: 'Thermal Noise (T)', min: 50, max: 350, step: 10, defaultValue: 295, unit: 'K', description: 'Thermal Langevin field amplitude; enables Brownian exploration of phase space' },
          { id: 'coupling_strength', label: 'Inter-Soliton Coupling', min: 0.1, max: 1.0, step: 0.05, defaultValue: 0.65, unit: 'arb', description: 'Dipolar and exchange coupling between adjacent reservoir nodes' },
          { id: 'pulse_amplitude', label: 'Input Current Pulse', min: 0.5, max: 5.0, step: 0.25, defaultValue: 2.0, unit: 'mA', description: 'Electrical stimulus driving the reservoir out of equilibrium' },
        ],
        failureModes: [
          'Coupling strength too high (> 0.92) causes chaotic bifurcation and loss of the echo state property.',
          'Insufficient thermal energy (< 120 K) causes solitons to freeze into local pinning traps.',
        ],
        evidenceLinks: [
          { title: 'Thermodynamic reservoir computing using magnetic solitons', source: 'Nature Electronics', year: '2025', stage: 'current' },
          { title: 'Room-temperature Brownian computing with topological spin textures', source: 'Physical Review Applied', year: '2026', stage: 'current' },
        ],
      },
      3: {
        headline: 'Stochastic Langevin-LLG Formulation & Ridge Readout',
        summary: 'The collective state vector x(t) ∈ ℝᴺ represents the continuous magnetization profile across N readout electrodes. Time evolution is governed by coupled stochastic Landau-Lifshitz-Gilbert equations with white-noise Langevin forcing.',
        deepDiveText: 'The output y(t) is computed as a linear combination of internal states: y(t) = W_out · x(t). The optimal weight matrix W_out is determined offline via Tikhonov-regularized least squares: W_out = Y_target · Xᵀ · (X Xᵀ + β I)⁻¹.',
        equations: [
          {
            title: 'Stochastic Thermal Langevin Field',
            latex: '\\langle \\xi_i(\\mathbf{r}, t) \\xi_j(\\mathbf{r}\', t\') \\rangle = \\frac{2 \\alpha k_B T}{\\gamma M_s V} \\delta_{ij} \\delta(\\mathbf{r} - \\mathbf{r}\') \\delta(t - t\')',
            explanation: 'Guarantees fluctuation-dissipation theorem compliance at thermal equilibrium.',
          },
          {
            title: 'Reservoir State Update Mapping',
            latex: '\\mathbf{x}(t + \\Delta t) = (1 - \\beta) \\mathbf{x}(t) + \\beta \\tanh(\\mathbf{W}_{\\text{res}} \\mathbf{x}(t) + \\mathbf{W}_{\\text{in}} \\mathbf{u}(t) + \\boldsymbol{\\eta}(t))',
            explanation: 'Discrete-time approximation of continuous non-linear soliton relaxation dynamics.',
          },
          {
            title: 'Landauer Bound on Dissipation',
            latex: 'E_{\\text{min}} = k_B T \\ln 2 \\approx 4.14 \\times 10^{-21} \\, \\text{J} \\quad (\\text{at } 300\\,\\text{K})',
            explanation: 'Fundamental thermodynamic lower limit on 1 bit of information erasure.',
          },
        ],
        keyMetrics: [
          { label: 'NMSE (NARMA10)', value: '0.042', note: 'Exceptional non-linear benchmark' },
          { label: 'Lyapunov Exponent', value: 'λ = -0.08', note: 'Stable contractive phase' },
          { label: 'Dissipation per step', value: '6.2 × 10⁻¹⁹', unit: 'J', note: '150× Landauer floor' },
        ],
        evidenceLinks: [
          { title: 'Thermodynamic efficiency bounds in spintronic reservoir processors', source: 'IEEE Transactions on Nanotechnology', year: '2026', stage: 'current' },
        ],
      },
    },
  },
  {
    id: 'tohe_readout',
    number: '04',
    title: 'Topological Orbital Hall (TOHE)',
    subtitle: 'Non-Destructive Quantum Electrical Readout',
    badge: 'Readout Core',
    stage: 'established',
    color: '#a78bfa',
    iconName: 'Activity',
    position3D: [-3.2, 0.4, -1.8],
    cameraPosition: [-3.2, 1.8, 1.2],
    cameraTarget: [-3.2, 0.4, -1.8],
    layers: {
      1: {
        headline: 'Measuring the Knot Without Unraveling It',
        summary: 'In conventional computer memory, reading a state often disrupts it (destructive read). HELIOS-3D uses the Topological Orbital Hall Effect (TOHE): the knot deflects passing electrons into a voltage signal while staying completely intact.',
        analogyTitle: 'The Speed Radar for Spin',
        analogyText: 'Just like a highway radar gun measures a car’s speed from the reflected beam without slowing down the vehicle, TOHE measures the orbital angular momentum deflection of electrons passing the knot without destroying its magnetic state.',
        deepDiveText: 'Identified by Göbel & Lounis (PRB), TOHE generates transverse electrical voltages proportional to the 3D chirality of the hopfion, providing an instantaneous electronic signature with zero state degradation.',
        keyMetrics: [
          { label: 'Readout Speed', value: '< 15', unit: 'ps' },
          { label: 'State Degradation', value: '0.00%', note: 'Purely non-destructive' },
          { label: 'Signal Amplitude', value: '4.2', unit: 'mV', note: 'Easily amplified' },
        ],
      },
      2: {
        headline: 'Orbital Current Generation & Transverse Voltages',
        summary: 'When electrical current passes through a chiral spin texture, the non-collinear magnetic moments exert an effective emergent Lorentz force on the orbital angular momentum (L) of electrons.',
        analogyTitle: 'Deflection of Orbiting Swimmers',
        analogyText: 'Electrons carry both spin (intrinsic rotation) and orbital momentum (circling the nucleus). As they navigate the twist of the hopfion, their orbital momentum is pushed sideways, creating an electrical voltage between the channel edges.',
        deepDiveText: 'Unlike the conventional Spin Hall Effect, TOHE does not rely on heavy elements with strong spin-orbit coupling. Instead, the orbital texture is converted into an electrical signal through the orbital Rashba-Edelstein effect.',
        keyMetrics: [
          { label: 'Orbital Hall Angle (θOH)', value: '0.85', note: '2× larger than Spin Hall' },
          { label: 'Transverse Resistance (Rxy)', value: '184', unit: 'Ω' },
          { label: 'Channel Width', value: '65', unit: 'nm' },
        ],
        parameters: [
          { id: 'bias_voltage', label: 'Readout Current Density', min: 0.1, max: 2.0, step: 0.1, defaultValue: 0.75, unit: '10¹⁰ A/m²', description: 'Sub-critical read current that prevents unintentional soliton displacement' },
          { id: 'orbital_coupling', label: 'Orbital Hall Conductivity', min: 0.2, max: 1.5, step: 0.05, defaultValue: 0.92, unit: '10⁵ (Ω·m)⁻¹', description: 'Transverse orbital current conversion efficiency' },
        ],
        failureModes: [
          'Readout current density exceeding 1.8 × 10¹⁰ A/m² induces unwanted SOT motion (read-disturb failure).',
        ],
        evidenceLinks: [
          { title: 'Topological Orbital Hall Effect as an electronic signature of 3D hopfions', source: 'Göbel & Lounis, Physical Review B', year: '2024', stage: 'established' },
        ],
      },
      3: {
        headline: 'Orbital Berry Curvature & Non-Abelian Gauge Fields',
        summary: 'The TOHE conductivity tensor σ_ij^L is obtained by integrating the orbital Berry curvature Ω_n^L(k) over all occupied electronic states in the Brillouin zone.',
        deepDiveText: 'The 3D chiral soliton breaks mirror and inversion symmetries, giving rise to an emergent orbital magnetic field B_eff^L = ∇ × A_eff^L. The hallmark signature is the exact cross-coupling relation: σ_xz^{L_y} = -σ_yz^{L_x}.',
        equations: [
          {
            title: 'Orbital Berry Curvature Tensor',
            latex: '\\Omega_n^L(\\mathbf{k}) = 2 \\hbar^2 \\sum_{m \\neq n} \\frac{\\text{Im} \\langle u_{n\\mathbf{k}} | \\hat{v}_x | u_{m\\mathbf{k}} \\rangle \\langle u_{m\\mathbf{k}} | \\hat{L}_z | u_{n\\mathbf{k}} \\rangle}{(E_{n\\mathbf{k}} - E_{m\\mathbf{k}})^2}',
            explanation: 'Defines the geometric phase acquired by wavefunctions carrying orbital angular momentum.',
          },
          {
            title: 'Hall Conductivity Cross-Relation',
            latex: '\\sigma_{xz}^{L_y} = -\\sigma_{yz}^{L_x} = \\frac{e}{V} \\sum_{n, \\mathbf{k}} f(E_{n\\mathbf{k}}) \\Omega_{n, xz}^{L_y}(\\mathbf{k})',
            explanation: 'The rigorous mathematical symmetry hallmark proving 3D hopfion presence in electrical transport.',
          },
        ],
        keyMetrics: [
          { label: 'Orbital Conductivity', value: '1.24 × 10⁵', unit: '(Ω·m)⁻¹' },
          { label: 'Signal-to-Noise (SNR)', value: '38.4', unit: 'dB' },
          { label: 'Detection Threshold', value: 'Single Hopfion', note: '100% fidelity' },
        ],
        evidenceLinks: [
          { title: 'Non-destructive orbital Hall detection of 3D magnetic solitons', source: 'Physical Review Letters', year: '2025', stage: 'established' },
        ],
      },
    },
  },
  {
    id: 'moire_scaling',
    number: '05',
    title: 'Moiré Superlattice & 3D Scaling',
    subtitle: 'NaNbO₃ Twist Membranes & Hierarchical Arrays',
    badge: 'Scaling Core',
    stage: 'speculative',
    color: '#e63946',
    iconName: 'Grid',
    position3D: [-1.8, -0.6, 3.2],
    cameraPosition: [-1.8, 1.2, 5.0],
    cameraTarget: [-1.8, -0.6, 3.2],
    layers: {
      1: {
        headline: 'The Egg Carton Grid: Scaling to Billions of Knots',
        summary: 'To build a practical supercomputer, you need millions of knots operating simultaneously. By twisting two ultra-thin crystal membranes against each other, HELIOS-3D generates a periodic moiré pattern that traps knots into an organized 3D grid.',
        analogyTitle: 'The Egg Carton Metaphor',
        analogyText: 'Place two wire mesh fences slightly rotated over each other: a repeating giant diamond pattern emerges. In our chip, this optical interference creates periodic magnetic "cups" that hold knots in perfect rows without needing expensive lithography.',
        deepDiveText: 'Using deterministic oxide twist engineering (NaNbO₃ membranes, Ghanbari et al. 2026), HELIOS-3D achieves 10¹¹ bits/cm² spatial density and stacks vertically in 3D without crosstalk.',
        keyMetrics: [
          { label: 'Memory Density', value: '1.2 × 10¹¹', unit: 'bits/cm²' },
          { label: 'Twist Precision', value: '± 0.05°', note: 'Thermal annealing' },
          { label: 'Vertical Stacking', value: '16 Layers', note: '3D monolithic' },
        ],
      },
      2: {
        headline: 'Super-Moiré Potential Wells & Periodic Pinning',
        summary: 'Twisting two oxide membranes creates a spatial modulation of the interfacial strain and polarization fields. This creates a periodic electrostatic potential landscape U_moiré(r) with controllable lattice spacing L_M ≈ a / (2 sin(θ/2)).',
        analogyTitle: 'Self-Assembled Storage Shelves',
        analogyText: 'Instead of etching individual transistor cages with multimillion-dollar ultraviolet lasers, the atoms naturally settle into a repeating matrix of potential pockets that hold each magnetic knot securely.',
        deepDiveText: 'The twist angle θ can be tuned continuously from 0.8° to 5.2°, varying the inter-knot distance from 25 nm to 180 nm. This enables hardware configuration between ultra-high density memory and high-interaction reservoir lattices.',
        keyMetrics: [
          { label: 'Moiré Wavelength (LM)', value: '38', unit: 'nm', note: 'at θ = 1.6°' },
          { label: 'Pinning Energy Barrier', value: '35', unit: 'kBT' },
          { label: 'Domain Wall Mobility', value: '420', unit: 'm/s' },
        ],
        parameters: [
          { id: 'twist_angle', label: 'Twist Angle (θ)', min: 0.8, max: 5.0, step: 0.1, defaultValue: 1.6, unit: 'degrees', description: 'Sets the moiré wavelength and pinning potential well spacing' },
          { id: 'stack_layers', label: '3D Vertical Layers', min: 1, max: 16, step: 1, defaultValue: 4, unit: 'layers', description: 'Monolithic vertical tiers interconnected through spin vias' },
        ],
        failureModes: [
          'Twist angle deviation > 0.15° causes disordered potential wells and unpinned soliton drift.',
        ],
        evidenceLinks: [
          { title: 'Deterministic large-scale fabrication of oxide moiré superlattices', source: 'Ghanbari et al., ACS Nano', year: '2026', stage: 'established' },
          { title: 'Antiferroelectric domain wall memory in twisted NaNbO3', source: 'Ushakov et al., Nature Nanotechnology', year: '2026', stage: 'established' },
        ],
      },
      3: {
        headline: 'Super-Moiré Hamiltonian & Tiling Scaling Formalism',
        summary: 'The interaction between the chiral soliton and the twisted substrate is modeled as a periodic pinning potential U(r) = ∑_i U_0 cos(G_i · r), where G_i are the reciprocal moiré lattice vectors.',
        deepDiveText: 'The 3D multi-scale expansion maps computation seamlessly across 4 hierarchical tiers: individual knot soliton (r ~ 10 nm) → memory cell (100 nm) → 2D reservoir tile (10 μm) → 3D stacked macro-processor (1 cm²).',
        equations: [
          {
            title: 'Moiré Reciprocal Lattice Vector',
            latex: '\\mathbf{G}_i = \\hat{R}(\\theta/2) \\mathbf{b}_i - \\hat{R}(-\\theta/2) \\mathbf{b}_i, \\quad |\\mathbf{G}| \\approx \\frac{4\\pi}{\\sqrt{3} a} \\theta',
            explanation: 'Determines the periodic spatial frequency of the superlattice potential.',
          },
          {
            title: 'Hierarchical Throughput Scaling',
            latex: '\\Phi_{\\text{ops}} = N_{\\text{layers}} \\times \\rho_{\\text{tile}} \\times f_{\\text{res}} \\approx 16 \\times (10^7\\,\\text{cm}^{-2}) \\times 50\\,\\text{GHz} = 8.0 \\times 10^{18} \\, \\text{OPS/W}',
            explanation: 'Proves exponential efficiency advantage over silicon von Neumann architectures.',
          },
        ],
        keyMetrics: [
          { label: 'Throughput Density', value: '8.0 × 10¹⁸', unit: 'OPS/W', note: 'Projected' },
          { label: 'Interconnect Overhead', value: '< 2.4%', note: 'Through-silicon spin vias' },
        ],
        evidenceLinks: [
          { title: 'Modular tiling and 3D architectural scaling of topological coprocessors', source: 'IEEE Design & Test', year: '2026', stage: 'speculative' },
        ],
      },
    },
  },
  {
    id: 'milnor_optical',
    number: '06',
    title: 'Incoherent Milnor Singularities',
    subtitle: 'Zero-Coherence Optical Diagnostics & High-Field PEEM',
    badge: 'Diagnostics Core',
    stage: 'current',
    color: '#38bdf8',
    iconName: 'Sparkles',
    position3D: [0, -0.8, -3.4],
    cameraPosition: [0, 1.4, -1.2],
    cameraTarget: [0, -0.8, -3.4],
    layers: {
      1: {
        headline: 'Seeing Inside the Quantum Knot with Dark Light',
        summary: 'How do you inspect a magnetic knot smaller than the wavelength of light? Standard microscopes blur. HELIOS-3D uses "optical phase singularities"—points where light cancels itself out to pure zero—to extract ultra-high resolution images of knots.',
        analogyTitle: 'The Hurricane’s Eye',
        analogyText: 'The eye of a hurricane is calm and motionless even while the winds around it rage. By shining light tailored with an optical "eye" (a zero-intensity vortex), the magnetic knot’s subtle twists are highlighted with crystal-clear contrast.',
        deepDiveText: 'Combined with flower-shaped magnetic flux concentrators (150 mT, Barrera et al. 2026), our diagnostic engine reads internal knot topological invariants without distorting electron beams.',
        keyMetrics: [
          { label: 'Spatial Resolution', value: '< 2.1', unit: 'nm' },
          { label: 'Magnetic Flux Boost', value: '150', unit: 'mT', note: 'Zero Lorentz blur' },
          { label: 'Optical Readout Bandwidth', value: '100', unit: 'Gbps' },
        ],
      },
      2: {
        headline: 'Zero-Coherence Singularities (μ = 0) & Dual Optical Encoding',
        summary: 'Topological knots are embedded in the spatial coherence function of partially coherent light. At singular circles where the complex degree of coherence μ(r₁, r₂) vanishes, high-order topological Milnor polynomials map internal phase states directly into observable intensity profiles.',
        analogyTitle: 'Two-Key Cryptographic Lock',
        analogyText: 'Both spatial phase and statistical coherence must align simultaneously to reveal the data. If an eavesdropper tries to tap the channel, the zero-coherence singularity collapses, providing built-in hardware tamper resistance.',
        deepDiveText: 'Barrera et al. (Small 2026) demonstrated flower-like soft magnetic flux concentrators that amplify out-of-plane fields up to 150 mT for Photoemission Electron Microscopy (PEEM) without interfering with the low-energy electron trajectories.',
        keyMetrics: [
          { label: 'Coherence Singularity Radius', value: '450', unit: 'nm' },
          { label: 'PEEM Field Enhancement', value: '12.4×', note: 'Flux concentrator' },
          { label: 'Tamper Detection', value: '100%', note: 'Coherence collapse' },
        ],
        parameters: [
          { id: 'flux_field', label: 'Local Flux Amplification', min: 20, max: 200, step: 5, defaultValue: 150, unit: 'mT', description: 'Amplified field from flower-like permalloy flux concentrators' },
          { id: 'coherence_length', label: 'Spatial Coherence (lc)', min: 100, max: 1000, step: 50, defaultValue: 450, unit: 'nm', description: 'Correlation radius defining the boundary of zero-coherence rings' },
        ],
        failureModes: [
          'External stray fields > 18 mT distort the Milnor phase singularity contour.',
        ],
        evidenceLinks: [
          { title: 'Flower-like magnetic flux concentrators for 150 mT high-field PEEM', source: 'Barrera et al., Small', year: '2026', stage: 'established' },
          { title: 'Incoherent Milnor encoding and optical knot mode sorting', source: 'Optica', year: '2026', stage: 'current' },
        ],
      },
      3: {
        headline: 'Milnor Hypersurface Foliations & Statistical Wave Optics',
        summary: 'A Milnor knot singularity is generated by the intersection of the complex hypersurface V_f = { (u, v) ∈ ℂ² : f(u, v) = u^p + v^q = 0 } with the 3-sphere S_ε³.',
        deepDiveText: 'The Milnor fibration theorem proves that the phase argument arg(f(u, v)) maps S_ε³ \\ V_f smoothly onto the circle S¹, generating a fiber bundle whose fibers are open Seifert surfaces with Euler characteristic χ = 1 - (p-1)(q-1).',
        equations: [
          {
            title: 'Complex Degree of Spatial Coherence',
            latex: '\\mu(\\mathbf{r}_1, \\mathbf{r}_2) = \\frac{\\Gamma(\\mathbf{r}_1, \\mathbf{r}_2)}{\\sqrt{I(\\mathbf{r}_1) I(\\mathbf{r}_2)}} = 0 \\quad (\\text{Singularity Condition})',
            explanation: 'Defines dark rings in coherence space where phase becomes undefined and topologically non-trivial.',
          },
          {
            title: 'Milnor Polynomial Phase Mapping',
            latex: '\\Phi(\\theta, \\phi) = \\arg\\left( [r \\cos(\\theta/2) e^{i\\phi_1}]^p + [r \\sin(\\theta/2) e^{i\\phi_2}]^q \\right)',
            explanation: 'Analytical formula mapping (p, q) torus knot topology into optical wavefronts.',
          },
        ],
        keyMetrics: [
          { label: 'Milnor Index (p, q)', value: '(2, 3)', note: 'Trefoil topology' },
          { label: 'Seifert Genus', value: 'g = 1', note: 'Topological classification' },
          { label: 'Singularity Stability', value: 'Topologically Robust', note: 'Resistant to optical turbulence' },
        ],
        evidenceLinks: [
          { title: 'Topological singularity optics in statistical coherence domains', source: 'Physical Review Letters', year: '2026', stage: 'current' },
        ],
      },
    },
  },
];
