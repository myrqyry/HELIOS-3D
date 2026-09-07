import { useState } from 'react';
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
} from 'lucide-react';
import { DOMAINS, type CognitiveLayer, type DomainKnowledge } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';
import { Link } from 'react-router-dom';

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
}: MechanismInspectorProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'equations' | 'evidence'>('overview');

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
            <div className="flex items-center gap-1.5 text-xs font-mono text-parchment-2">
              <span>{activeDomain.number}</span>
              <span>•</span>
              <span className="uppercase tracking-wider text-[10px] text-amber">
                {activeDomain.badge}
              </span>
              <span>•</span>
              <span className={`text-[10px] rounded px-1.5 py-0.2 ${
                activeDomain.stage === 'established' ? 'bg-amber/20 text-amber' :
                activeDomain.stage === 'current' ? 'bg-cyan-2/20 text-cyan-2' : 'bg-rose/20 text-rose'
              }`}>
                {activeDomain.stage}
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
        <span className="text-[10px] font-mono text-parchment-2 px-2 uppercase">Layer:</span>
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
            {/* Layer Headline & Summary */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber mb-1">
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
              <h4 className="text-xs font-mono uppercase tracking-wider text-parchment font-semibold">
                Mechanism Analysis
              </h4>
              <p className="text-xs text-parchment-2 leading-relaxed">
                {currentContent.deepDiveText}
              </p>
            </div>

            {/* Key Physical Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-parchment font-semibold">
                Physical Metrics & Constants
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {currentContent.keyMetrics.map((m, idx) => (
                  <div key={idx} className="rounded-lg border border-obsidian-3 bg-obsidian-2 p-2.5">
                    <div className="text-[10px] text-parchment-2">{m.label}</div>
                    <div className="text-sm font-bold font-mono text-parchment mt-0.5">
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
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-parchment">
                Validated Research & Citations
              </h3>
              <p className="text-xs text-parchment-2 mt-1">
                Peer-reviewed experimental and theoretical publications supporting this mechanism.
              </p>
            </div>

            <div className="space-y-2.5">
              {currentContent.evidenceLinks?.map((ev, idx) => (
                <div key={idx} className="rounded-xl border border-obsidian-3 bg-obsidian-2 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-parchment">{ev.title}</span>
                    <span className="text-[10px] font-mono text-amber rounded bg-amber/10 px-1.5 py-0.5">
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
            Subsystem <span className="font-mono text-parchment">{activeDomain.number} of 06</span>
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
