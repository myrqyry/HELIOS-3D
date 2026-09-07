import { Sparkles, Layers, Atom, ChevronRight, ChevronLeft, X, Compass } from 'lucide-react';
import type { CognitiveLayer } from '../../data/layeredKnowledge';
import { DOMAINS } from '../../data/layeredKnowledge';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSelectDomain: (id: string | null) => void;
  onSelectLayer: (layer: CognitiveLayer) => void;
}

export const TOUR_STEPS = [
  {
    title: 'Welcome to HELIOS-3D',
    subtitle: 'The Layered 3D Learning Universe',
    layer: 1 as CognitiveLayer,
    domainId: null,
    text: 'HELIOS-3D is an interactive 3D physics platform designed to explore post-CMOS topological computing. Rather than reading dense static papers, this environment lets you journey between 3 progressive cognitive layers: from high-level intuitive metaphors down to exact quantum field equations.',
    highlight: 'Outer Layers give easy overviews, while deeper layers unlock device physics and quantum mechanics.',
  },
  {
    title: 'Area 01: Topological Hopfion Knot',
    subtitle: 'Stable 3D Soliton Core',
    layer: 1 as CognitiveLayer,
    domainId: 'hopfion',
    text: 'Information in HELIOS-3D is stored in 3D magnetic knots called hopfions. Unlike standard silicon bits that lose data without electrical power, a topological knot cannot untie without tearing the magnetic field, providing zero-power memory persistence.',
    highlight: 'Notice how the knot loops continuously without any point singularities.',
  },
  {
    title: 'Area 02: Interfacial Spintronic Stack',
    subtitle: 'EuS / Bi₂Se₃ / EuS Heterostructure',
    layer: 1 as CognitiveLayer,
    domainId: 'material_stack',
    text: 'To protect the magnetic knots at room temperature, an atomic sandwich is formed: a 2D topological insulator channel (Bi₂Se₃) is encased between two ferromagnetic insulators (EuS). Electrons glide along the surface with spin-momentum locking.',
    highlight: 'This quantum channel suppresses backscattering and eliminates resistive heat.',
  },
  {
    title: 'Area 03: Thermodynamic Brownian Reservoir',
    subtitle: 'Computing with Thermal Noise',
    layer: 2 as CognitiveLayer,
    domainId: 'reservoir',
    text: 'In Layer 2, we inspect the hardware architecture. The Brownian Reservoir turns ambient thermal vibrations into computational power. Coupled solitons ripple like waves in a pond, transforming input pulses non-linearly to run AI models at 99.8% less energy than GPUs.',
    highlight: 'Physical relaxation replaces clock-gated digital logic.',
  },
  {
    title: 'Area 04: Topological Orbital Hall Readout',
    subtitle: 'Non-Destructive Quantum Sensing',
    layer: 2 as CognitiveLayer,
    domainId: 'tohe_readout',
    text: 'How do you read a knot without unraveling it? Passing electrons have their orbital angular momentum deflected sideways by the chiral knot texture. This creates an immediate transverse voltage without disturbing the stored data.',
    highlight: 'Symmetry hallmark: σ_xz^{Ly} = -σ_yz^{Lx}.',
  },
  {
    title: 'Area 05 & 06: Moiré Scaling & Optical Diagnostics',
    subtitle: 'Layer 3: Quantum Equations & Proofs',
    layer: 3 as CognitiveLayer,
    domainId: 'moire_scaling',
    text: 'In Layer 3, exact mathematical formulations are revealed. Twisted NaNbO₃ membranes create moiré potential wells that self-assemble knots into a 3D chip stack, while zero-coherence optical Milnor singularities (μ = 0) enable high-bandwidth non-invasive inspection.',
    highlight: 'Throughput scales to 8.0 × 10¹⁸ OPS/W—exceeding modern supercomputing ceilings.',
  },
];

export function GuidedTourModal({
  isOpen,
  onClose,
  currentStep,
  onNextStep,
  onPrevStep,
  onSelectDomain,
  onSelectLayer,
}: GuidedTourModalProps) {
  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep] || TOUR_STEPS[0];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      const nextIndex = currentStep + 1;
      const nextStep = TOUR_STEPS[nextIndex];
      onSelectDomain(nextStep.domainId);
      onSelectLayer(nextStep.layer);
      onNextStep();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevIndex = currentStep - 1;
      const prevStep = TOUR_STEPS[prevIndex];
      onSelectDomain(prevStep.domainId);
      onSelectLayer(prevStep.layer);
      onPrevStep();
    }
  };

  return (
    <div className="pointer-events-none absolute bottom-16 sm:bottom-20 left-4 sm:left-6 z-30 flex max-w-md w-[calc(100%-2rem)]">
      <div className="pointer-events-auto relative w-full rounded-2xl border border-obsidian-3/80 bg-obsidian/92 p-5 shadow-2xl space-y-3.5 backdrop-blur-xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber/20 p-2 text-amber">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-parchment-2">
                GUIDED TOUR • STEP {currentStep + 1} OF {TOUR_STEPS.length}
              </div>
              <h3 className="text-sm font-bold text-parchment">{step.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-parchment-2 hover:bg-obsidian-2 hover:text-parchment transition-colors"
            title="Exit Tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Cognitive Layer Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-parchment-2">Active Depth:</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            step.layer === 1 ? 'bg-amber/20 text-amber' :
            step.layer === 2 ? 'bg-ember/20 text-ember' : 'bg-cyan-2/20 text-cyan-2'
          }`}>
            {step.layer === 1 && <Sparkles className="h-3 w-3" />}
            {step.layer === 2 && <Layers className="h-3 w-3" />}
            {step.layer === 3 && <Atom className="h-3 w-3" />}
            <span>Layer {step.layer}</span>
          </span>
          <span className="text-[11px] text-parchment-2 italic">({step.subtitle})</span>
        </div>

        {/* Step Body */}
        <p className="text-xs text-parchment leading-relaxed">{step.text}</p>

        {/* Highlight Callout */}
        <div className="rounded-xl border border-amber/30 bg-amber/5 p-2.5 text-[11px] text-amber leading-relaxed font-medium">
          💡 {step.highlight}
        </div>

        {/* Step Indicator dots */}
        <div className="flex justify-center gap-1.5 pt-0.5">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStep ? 'w-5 bg-amber' : 'w-1.5 bg-obsidian-3'
              }`}
            />
          ))}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-obsidian-3/80">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              isFirst ? 'text-obsidian-3 cursor-not-allowed' : 'text-parchment-2 hover:text-parchment'
            }`}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl bg-amber px-3.5 py-1.5 text-xs font-bold text-obsidian hover:bg-gold transition-colors shadow-sm"
          >
            <span>{isLast ? 'Complete Tour & Explore' : 'Next Step'}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
