import { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Sliders,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  Atom,
  ShieldCheck,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { DOMAINS, type CognitiveLayer, type DomainKnowledge } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';
import { Link } from 'react-router-dom';
import PerformanceFloor from '../charts/PerformanceFloor';
import BreathingModeSpectrum from '../charts/BreathingModeSpectrum';
import EnergyBarrier from '../charts/EnergyBarrier';

interface MechanismInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
  layer: CognitiveLayer;
  onSelectLayer: (layer: CognitiveLayer) => void;
  params: Record<string, number>;
  onParamChange: (id: string, value: number) => void;
  onResetParams: () => void;
  onTriggerPulse: () => void;
  onViewExecutiveReport?: () => void;
  visualTier?: 'auto' | 'iconic' | 'enhanced';
  onToggleVisualTier?: (tier: 'iconic' | 'enhanced') => void;
}

export function MechanismInspector({
  isOpen,
  onClose,
  activeDomainId,
  onSelectDomain,
  layer,
  onSelectLayer,
  params,
  onParamChange,
  onResetParams,
  onTriggerPulse,
  onViewExecutiveReport,
  visualTier = 'auto',
  onToggleVisualTier,
}: MechanismInspectorProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'figures' | 'simulation' | 'equations' | 'evidence'>('overview');

  // Default to valid subsystem selection on open
  useEffect(() => {
    if (isOpen && !activeDomainId) {
      onSelectDomain('hopfion');
    }
  }, [isOpen, activeDomainId, onSelectDomain]);

  // Reset tab to overview when domain or layer changes
  useEffect(() => {
    setActiveTab('overview');
  }, [activeDomainId, layer]);

  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];
  const currentContent = activeDomain.layers[layer];

  const handlePulseClick = () => {
    soundManager.playSpinPulse();
    onTriggerPulse();
  };

  if (!isOpen) return null;

  return (
    <aside aria-label="Mechanism Deep Dive Inspector" className="pointer-events-auto absolute inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-obsidian-3 bg-obsidian/95 backdrop-blur-xl shadow-2xl transition-all">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-obsidian-3 p-4">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: activeDomain.color }}
          />
          <div>
            <div className="flex items-center gap-1.5 text-xs font-sans text-parchment-2">
              <span className="font-semibold">{activeDomain.number}</span>
              <span>•</span>
              <span className="uppercase tracking-wider text-[10px] font-bold text-amber">
                {activeDomain.badge}
              </span>
              <span>•</span>
              <span className={`text-[10px] font-sans font-bold rounded px-1.5 py-0.5 border ${
                activeDomain.epistemicStatus === 'demonstrated'
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                  : activeDomain.epistemicStatus === 'inferred'
                  ? 'border-sky-500/40 text-sky-400 bg-sky-500/10'
                  : activeDomain.epistemicStatus === 'proposed'
                  ? 'border-amber/40 text-amber bg-amber/10'
                  : 'border-rose-500/40 text-rose-400 bg-rose-500/10'
              }`}>
                [{activeDomain.epistemicStatus ? activeDomain.epistemicStatus.toUpperCase() : activeDomain.stage.toUpperCase()}]
              </span>
            </div>
            <h2 className="text-base font-semibold text-parchment leading-tight">
              {activeDomain.title}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-parchment-2 hover:bg-obsidian-2 hover:text-parchment transition-colors"
          title="Close Inspector"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Cognitive Layer Quick Selector within Drawer */}
      <div className="flex items-center border-b border-obsidian-3 bg-obsidian-2/50 p-2 gap-1 text-xs">
        <span className="text-[10px] font-sans font-semibold text-parchment-2 px-2 uppercase">Layer:</span>
        <button
          type="button"
          onClick={() => onSelectLayer(1)}
          className={`flex-1 rounded py-1 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            layer === 1 ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:bg-obsidian-3'
          }`}
        >
          <Sparkles className="h-3 w-3" />
          <span>1. Concept</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectLayer(2)}
          className={`flex-1 rounded py-1 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            layer === 2 ? 'bg-ember text-parchment font-bold' : 'text-parchment-2 hover:bg-obsidian-3'
          }`}
        >
          <Layers className="h-3 w-3" />
          <span>2. Device</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectLayer(3)}
          className={`flex-1 rounded py-1 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            layer === 3 ? 'bg-cyan-2 text-obsidian font-bold' : 'text-parchment-2 hover:bg-obsidian-3'
          }`}
        >
          <Atom className="h-3 w-3" />
          <span>3. Quantum</span>
        </button>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex border-b border-obsidian-3 bg-obsidian text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2.5 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-amber text-amber bg-obsidian-2/40'
              : 'border-transparent text-parchment-2 hover:text-parchment'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('figures')}
          className={`flex-1 py-2.5 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'figures'
              ? 'border-amber text-amber bg-obsidian-2/40'
              : 'border-transparent text-parchment-2 hover:text-parchment'
          }`}
        >
          Figures
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('simulation')}
          className={`flex-1 py-2.5 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'simulation'
              ? 'border-amber text-amber bg-obsidian-2/40'
              : 'border-transparent text-parchment-2 hover:text-parchment'
          }`}
        >
          Controls
        </button>
        {currentContent.equations && (
          <button
            type="button"
            onClick={() => setActiveTab('equations')}
            className={`flex-1 py-2.5 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'equations'
                ? 'border-amber text-amber bg-obsidian-2/40'
                : 'border-transparent text-parchment-2 hover:text-parchment'
            }`}
          >
            Formulas
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          className={`flex-1 py-2.5 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'evidence'
              ? 'border-amber text-amber bg-obsidian-2/40'
              : 'border-transparent text-parchment-2 hover:text-parchment'
          }`}
        >
          Evidence
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Visual Mode Callout Badge */}
            <div className="flex items-center justify-between rounded-lg border border-amber/25 bg-amber/5 px-3 py-2 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber" />
                <span className="text-parchment font-medium">3D Mode:</span>
                <span className="font-semibold text-amber">
                  {visualTier === 'iconic' ? 'Iconic Overview Model' : 'Enhanced Visual Takeover'}
                </span>
              </div>
              {onToggleVisualTier && (
                <button
                  type="button"
                  onClick={() => onToggleVisualTier(visualTier === 'iconic' ? 'enhanced' : 'iconic')}
                  className="rounded bg-obsidian-2 px-2 py-0.5 text-[11px] text-amber hover:bg-obsidian-3 transition-colors"
                >
                  Switch to {visualTier === 'iconic' ? 'Enhanced' : 'Iconic'}
                </button>
              )}
            </div>

            {/* Layer Headline & Summary */}
            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber mb-1">
                {layer === 1 && 'Layer 1: Intuition & Broad Concept'}
                {layer === 2 && 'Layer 2: Mesoscopic Device Architecture'}
                {layer === 3 && 'Layer 3: Quantum Mathematical Mechanism'}
              </div>
              <h3 className="text-lg font-bold text-parchment leading-snug">
                {currentContent.headline}
              </h3>
              <p className="mt-2 text-sm text-parchment-2 leading-relaxed">
                {currentContent.summary}
              </p>
            </div>

            {/* Intuitive Analogy Box (Crucial for the layered learning progression) */}
            {currentContent.analogyTitle && (
              <div className="rounded-xl border border-amber/30 bg-amber/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber">
                  <Sparkles className="h-4 w-4" />
                  <span>{currentContent.analogyTitle}</span>
                </div>
                <p className="text-xs text-parchment-2 leading-relaxed italic">
                  "{currentContent.analogyText}"
                </p>
              </div>
            )}

            {/* In-Depth Scientific Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-parchment">
                Mechanism Analysis
              </h4>
              <p className="text-xs text-parchment-2 leading-relaxed">
                {currentContent.deepDiveText}
              </p>
            </div>

            {/* Key Physical Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-parchment">
                Physical Metrics & Constants
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {currentContent.keyMetrics.map((m, idx) => (
                  <div key={idx} className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-2.5">
                    <div className="text-[10px] text-parchment-2 font-medium">{m.label}</div>
                    <div className="text-sm font-bold font-sans text-parchment mt-0.5">
                      {m.value} {m.unit && <span className="text-xs font-normal text-amber">{m.unit}</span>}
                    </div>
                    {m.note && <div className="text-[9px] text-parchment-2/70 mt-0.5">{m.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Interactive Actions */}
            <div className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-3.5 space-y-2.5">
              <div className="text-xs font-semibold text-parchment flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber" />
                <span>Live 3D Stimulation Bench</span>
              </div>
              <p className="text-xs text-parchment-2">
                Trigger a non-destructive spin current pulse or thermal excitation to watch the 3D response.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePulseClick}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-amber px-3 py-2 text-xs font-bold text-obsidian hover:bg-gold transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Inject Spin Pulse</span>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'figures' && (
          <div className="space-y-6">
            {/* 3D Visual Detail Switcher Card */}
            <div className="rounded-xl border border-obsidian-3 bg-obsidian-2/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-parchment">
                  <Sparkles className="h-4 w-4 text-amber" />
                  <span>Cosmos 3D Fidelity</span>
                </div>
                <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded border ${
                  visualTier === 'iconic'
                    ? 'border-obsidian-3 text-parchment-2 bg-obsidian'
                    : 'border-amber/50 text-amber bg-amber/10'
                }`}>
                  {visualTier === 'iconic' ? 'ICONIC MODEL' : 'ENHANCED SCENE TAKEOVER'}
                </span>
              </div>
              <p className="text-xs text-parchment-2 leading-relaxed">
                {visualTier === 'iconic'
                  ? 'Currently rendering the lightweight iconic station model. Switch to Enhanced Scene for full 3D visual takeover.'
                  : 'Active node is upgraded to its high-detail visual takeover scene with dynamic particle flows, custom geometries, and real-time tensor indicators.'}
              </p>
              {onToggleVisualTier && (
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleVisualTier('iconic')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      visualTier === 'iconic'
                        ? 'border-amber bg-amber text-obsidian font-bold'
                        : 'border-obsidian-3 bg-obsidian text-parchment-2 hover:text-parchment'
                    }`}
                  >
                    Iconic Overview Model
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleVisualTier('enhanced')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      visualTier !== 'iconic'
                        ? 'border-amber bg-amber text-obsidian font-bold'
                        : 'border-obsidian-3 bg-obsidian text-parchment-2 hover:text-parchment'
                    }`}
                  >
                    Enhanced Scene Takeover
                  </button>
                </div>
              )}
            </div>

            {/* Scientific Figure / Chart for Active Domain */}
            <div className="space-y-3">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-amber flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Quantitative Figure & Benchmark</span>
              </h4>

              {activeDomain.id === 'tohe_readout' && (
                <div className="space-y-3">
                  <PerformanceFloor height="h-64" />
                  <div className="text-xs text-parchment-2 space-y-1.5 bg-obsidian-2/50 p-3 rounded-lg border border-obsidian-3">
                    <p className="font-semibold text-parchment">Physical Readout Channel:</p>
                    <p>
                      The Topological Orbital Hall Effect translates topological orbital angular momentum into an anti-symmetric transverse voltage signal: <span className="font-mono text-amber">σ_xz^Ly = -σ_yz^Lx</span>.
                    </p>
                    <p>
                      Electrical readout completes on sub-nanosecond timescales with a ~4.2 mV output signal, circumventing inductive coil delay.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain.id === 'hopfion' && (
                <div className="space-y-3">
                  <BreathingModeSpectrum height="h-64" />
                  <div className="text-xs text-parchment-2 space-y-1.5 bg-obsidian-2/50 p-3 rounded-lg border border-obsidian-3">
                    <p className="font-semibold text-parchment">Soliton Dynamic Spectrum:</p>
                    <p>
                      Sub-GHz breathing modes represent isotropic volumetric oscillations of the Hopfion magnetic knot under RF spin-torque excitation, demonstrating topological stability against collapse.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain.id === 'reservoir' && (
                <div className="space-y-3">
                  <EnergyBarrier height="h-64" />
                  <div className="text-xs text-parchment-2 space-y-1.5 bg-obsidian-2/50 p-3 rounded-lg border border-obsidian-3">
                    <p className="font-semibold text-parchment">Thermal Energy Landscape:</p>
                    <p>
                      Topological solitons maintain high energy barriers (~48 k_B T) preventing thermal erasure, while stochastic Brownian perturbations are harnessed directly for nonlinear reservoir computing.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain.id === 'material_stack' && (
                <div className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-4 space-y-3">
                  <div className="text-xs font-semibold text-parchment">Heterostructure Profile (EuS / Bi₂Se₃ / EuS)</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded border border-amber/30 bg-amber/5 p-2">
                      <div className="text-amber font-mono font-bold">2.0 nm</div>
                      <div className="text-[10px] text-parchment-2 mt-0.5">EuS (FMI)</div>
                    </div>
                    <div className="rounded border border-cyan-2/30 bg-cyan-2/5 p-2">
                      <div className="text-cyan-2 font-mono font-bold">6 QLs</div>
                      <div className="text-[10px] text-parchment-2 mt-0.5">Bi₂Se₃ (TI)</div>
                    </div>
                    <div className="rounded border border-amber/30 bg-amber/5 p-2">
                      <div className="text-amber font-mono font-bold">2.0 nm</div>
                      <div className="text-[10px] text-parchment-2 mt-0.5">EuS (FMI)</div>
                    </div>
                  </div>
                  <div className="text-xs text-parchment-2 space-y-1 bg-obsidian/60 p-2.5 rounded border border-obsidian-3 font-mono text-[11px]">
                    <div>• Interfacial DMI D_int = 2.4 mJ/m²</div>
                    <div>• Dirac Fermi Velocity v_F = 5.0 × 10⁵ m/s</div>
                    <div>• Rashba-Dresselhaus α_R = 1.3 eV·Å</div>
                  </div>
                </div>
              )}

              {activeDomain.id === 'moire_scaling' && (
                <div className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-4 space-y-3">
                  <div className="text-xs font-semibold text-parchment">Hierarchical Multi-Scale Topology</div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <div className="rounded border border-obsidian-3 bg-obsidian p-2">
                      <div className="text-amber font-bold">1</div>
                      <div className="text-[10px] text-parchment-2">Knot</div>
                    </div>
                    <div className="rounded border border-obsidian-3 bg-obsidian p-2">
                      <div className="text-amber font-bold">4</div>
                      <div className="text-[10px] text-parchment-2">2x2 Cell</div>
                    </div>
                    <div className="rounded border border-obsidian-3 bg-obsidian p-2">
                      <div className="text-amber font-bold">9</div>
                      <div className="text-[10px] text-parchment-2">3x3 Layer</div>
                    </div>
                    <div className="rounded border border-cyan-2/40 bg-cyan-2/10 p-2">
                      <div className="text-cyan-2 font-bold">27</div>
                      <div className="text-[10px] text-parchment-2">3D Array</div>
                    </div>
                  </div>
                  <p className="text-xs text-parchment-2 leading-relaxed">
                    NaNbO₃ twist angle θ = 1.1° creates an emergent super-moiré potential landscape that pins 3D soliton knots at volumetric lattice nodes.
                  </p>
                </div>
              )}

              {activeDomain.id === 'milnor_optical' && (
                <div className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-4 space-y-3">
                  <div className="text-xs font-semibold text-parchment">Incoherent Milnor Diagnostic Void</div>
                  <div className="space-y-1.5 text-xs text-parchment-2">
                    <div className="flex justify-between border-b border-obsidian-3 pb-1">
                      <span>Coherence Singularity:</span>
                      <span className="font-mono text-cyan-2">|μ(r₁, r₂)| = 0</span>
                    </div>
                    <div className="flex justify-between border-b border-obsidian-3 pb-1">
                      <span>Milnor Polynomial:</span>
                      <span className="font-mono text-amber">f(z₁, z₂) = z₁³ - z₂²</span>
                    </div>
                    <div className="flex justify-between border-b border-obsidian-3 pb-1">
                      <span>Topological Invariant:</span>
                      <span className="font-mono text-parchment">Trefoil Knot (L_k = 3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Backdrop Intensity:</span>
                      <span className="font-mono text-emerald-400">Speckle-Free Uniform</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Gallery Link Card */}
            <div className="rounded-xl border border-amber/30 bg-amber/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber">Standalone Visual Exhibit</span>
                <ExternalLink className="h-3.5 w-3.5 text-amber" />
              </div>
              <p className="text-xs text-parchment-2">
                View this subsystem in the dedicated full-screen Visuals Gallery or technical Figures page with isolated camera controls and figure captions.
              </p>
              <div className="flex gap-2 pt-1">
                <Link
                  to="/visuals"
                  className="flex-1 text-center py-2 px-3 rounded-lg bg-amber text-obsidian text-xs font-bold hover:bg-amber-light transition-colors"
                >
                  Open Visuals Gallery
                </Link>
                <Link
                  to="/figures"
                  className="flex-1 text-center py-2 px-3 rounded-lg bg-obsidian-2 border border-obsidian-3 text-parchment text-xs font-medium hover:bg-obsidian-3 transition-colors"
                >
                  Technical Figures
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-parchment">
                Real-Time Physical Parameters
              </h3>
              <p className="text-xs text-parchment-2 mt-1">
                Adjust mesoscopic variables below to dynamically alter the 3D model state, chiral stabilization, and resonance.
              </p>
            </div>

            {currentContent.parameters && currentContent.parameters.length > 0 ? (
              <div className="space-y-4">
                {currentContent.parameters.map((p) => {
                  const currentValue = params[p.id] ?? p.defaultValue;
                  return (
                    <div key={p.id} className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-3 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-parchment">{p.label}</span>
                        <span className="font-mono text-amber">
                          {currentValue} {p.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={p.step}
                        value={currentValue}
                        onChange={(e) => onParamChange(p.id, parseFloat(e.target.value))}
                        className="w-full accent-amber cursor-pointer"
                      />
                      <p className="text-[11px] text-parchment-2">{p.description}</p>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={onResetParams}
                  className="w-full rounded-lg border border-obsidian-3 bg-obsidian px-3 py-2 text-xs text-parchment-2 hover:text-parchment hover:bg-obsidian-2 transition-colors"
                >
                  Reset Parameters to Ground State
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-4 text-center space-y-2">
                <Info className="h-6 w-6 text-parchment-2 mx-auto" />
                <p className="text-xs text-parchment-2">
                  Switch to <strong>Layer 2 (Device Architecture)</strong> or <strong>Layer 3 (Quantum)</strong> to access tunable physical parameters.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLayer(2)}
                  className="rounded-lg bg-amber px-3 py-1.5 text-xs font-bold text-obsidian"
                >
                  Switch to Layer 2
                </button>
              </div>
            )}

            {/* Failure Mode Boundary Guard */}
            {currentContent.failureModes && (
              <div className="rounded-xl border border-rose/30 bg-rose/5 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Critical Physical Boundaries</span>
                </div>
                <ul className="text-xs text-parchment-2 space-y-1.5 list-disc list-inside">
                  {currentContent.failureModes.map((fm, idx) => (
                    <li key={idx}>{fm}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'equations' && currentContent.equations && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-parchment">
                Mathematical & Topological Formulations
              </h3>
              <p className="text-xs text-parchment-2 mt-1">
                Rigorous field equations and topological invariants governing this subsystem.
              </p>
            </div>

            <div className="space-y-3">
              {currentContent.equations.map((eq, idx) => (
                <div key={idx} className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-3.5 space-y-2">
                  <div className="text-xs font-bold text-parchment">{eq.title}</div>
                  <div className="rounded-lg bg-obsidian p-3 font-mono text-xs text-amber overflow-x-auto border border-obsidian-3">
                    <code>{eq.latex}</code>
                  </div>
                  <p className="text-xs text-parchment-2 leading-relaxed">
                    {eq.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-5">
            {/* Epistemic Maturity Ladder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-parchment flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-amber" />
                    <span>Epistemic Maturity Ladder</span>
                  </h3>
                  <p className="text-xs text-parchment-2 mt-0.5">
                    Trajectory from laboratory physics to speculative engineering targets.
                  </p>
                </div>
              </div>

              {activeDomain.epistemicLadder && (
                <div className="space-y-2.5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-obsidian-3">
                  {activeDomain.epistemicLadder.map((step, idx) => {
                    const tagStyles =
                      step.tag === '[ESTABLISHED]' || step.tag === '[DEMONSTRATED]'
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        : step.tag === '[INFERRED]'
                        ? 'border-sky-500/40 text-sky-400 bg-sky-500/10'
                        : step.tag === '[PROPOSED]'
                        ? 'border-amber/40 text-amber bg-amber/10'
                        : 'border-rose-500/40 text-rose-400 bg-rose-500/10';

                    return (
                      <div
                        key={idx}
                        className="relative pl-7 rounded-xl border border-obsidian-3 bg-obsidian-2 p-3 space-y-1.5 transition-colors hover:border-obsidian-4"
                      >
                        {/* Step Marker Dot */}
                        <span
                          className={`absolute left-2.5 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-obsidian ${
                            step.level === 'observed'
                              ? 'bg-emerald-400'
                              : step.level === 'inferred'
                              ? 'bg-sky-400'
                              : step.level === 'proposed'
                              ? 'bg-amber'
                              : 'bg-rose-400'
                          }`}
                        />
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-parchment">
                            {idx + 1}. {step.label}
                          </span>
                          <span
                            className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded border ${tagStyles}`}
                          >
                            {step.tag}
                          </span>
                        </div>
                        <p className="text-xs text-parchment-2 leading-relaxed">
                          {step.summary}
                        </p>
                        <p className="text-[11px] text-parchment-2/80 italic leading-relaxed">
                          {step.detail}
                        </p>
                        {step.sourceOrMetric && (
                          <div className="pt-1 flex items-center gap-1.5 text-[10px] font-sans font-medium text-amber">
                            <span className="text-parchment-2">Source/Metric:</span>
                            <span className="rounded bg-obsidian px-1.5 py-0.5 border border-obsidian-3 text-parchment">
                              {step.sourceOrMetric}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Published Literature */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-parchment flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-amber" />
                <span>Peer-Reviewed Citations</span>
              </h3>

              <div className="space-y-2.5">
                {currentContent.evidenceLinks?.map((ev, idx) => (
                  <div key={idx} className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-parchment">{ev.title}</span>
                      <span className="text-[10px] font-sans font-bold text-amber rounded bg-amber/10 px-1.5 py-0.5">
                        {ev.year}
                      </span>
                    </div>
                    <div className="text-xs text-parchment-2 italic">{ev.source}</div>
                  </div>
                )) || (
                  <p className="text-xs text-parchment-2">
                    No direct references registered for this layer. See the global evidence database.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/evidence"
                className="flex items-center justify-between rounded-xl border border-obsidian-3 bg-obsidian-2 p-3 text-xs text-parchment hover:bg-obsidian-3 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber" />
                  <span>View Full Claims Matrix & Literature Review</span>
                </div>
                <ChevronRight className="h-4 w-4 text-parchment-2" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer / Navigation to Next Area */}
      <div className="border-t border-obsidian-3 bg-obsidian p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-parchment-2">
            Subsystem <span className="font-sans font-bold text-parchment">{activeDomain.number} of 06</span>
          </div>
          {onViewExecutiveReport && (
            <button
              type="button"
              onClick={onViewExecutiveReport}
              className="text-[11px] text-amber hover:underline underline-offset-2"
              title="Open Executive Briefing view"
            >
              Executive Briefing
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {(() => {
            const currentIndex = DOMAINS.findIndex((d) => d.id === activeDomain.id);
            const nextDomain = DOMAINS[(currentIndex + 1) % DOMAINS.length];
            return (
              <button
                type="button"
                onClick={() => onSelectDomain(nextDomain.id)}
                className="flex items-center gap-1.5 rounded-lg bg-obsidian-2 px-3 py-1.5 text-xs text-parchment hover:bg-obsidian-3 transition-colors"
              >
                <span>Next: {nextDomain.title}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            );
          })()}
        </div>
      </div>
    </aside>
  );
}
