import { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  RotateCcw,
  Sparkles,
  Layers,
  Atom,
  Eye,
  EyeOff,
  Sliders,
  Zap,
  FileText,
} from 'lucide-react';
import { DOMAINS, type CognitiveLayer } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';

interface LayerControlHUDProps {
  layer: CognitiveLayer;
  onSelectLayer: (layer: CognitiveLayer) => void;
  activeDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
  paused: boolean;
  onTogglePause: () => void;
  cameraPreset: 'overview' | 'focused' | 'topdown' | 'slice';
  onSelectPreset: (preset: 'overview' | 'focused' | 'topdown' | 'slice') => void;
  isInspectorOpen: boolean;
  onToggleInspector: () => void;
  onStartTour: () => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  onPropagateSignal?: () => void;
  isSignalActive?: boolean;
  zenMode?: boolean;
  onToggleZenMode?: () => void;
  onViewExecutiveReport?: () => void;
}

export function LayerControlHUD({
  layer,
  onSelectLayer,
  activeDomainId,
  onSelectDomain,
  paused,
  onTogglePause,
  cameraPreset,
  onSelectPreset,
  isInspectorOpen,
  onToggleInspector,
  onStartTour,
  autoRotate = false,
  onToggleAutoRotate,
  onPropagateSignal,
  isSignalActive = false,
  zenMode = false,
  onToggleZenMode,
  onViewExecutiveReport,
}: LayerControlHUDProps) {
  const [muted, setMuted] = useState(soundManager.getMuted());
  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId);

  const handleLayerClick = (targetLayer: CognitiveLayer) => {
    onSelectLayer(targetLayer);
    soundManager.playLayerChime(targetLayer);
  };

  const handleToggleSound = () => {
    const isNowMuted = soundManager.toggleMute();
    setMuted(isNowMuted);
  };

  if (zenMode) {
    return (
      <header className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-between px-4">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-obsidian-3/80 bg-obsidian/85 px-3 py-1.5 backdrop-blur-md shadow-xl text-xs font-mono text-parchment">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
          <span className="text-parchment-2 text-[11px]">SPATIAL ZEN MODE</span>
          {activeDomain && <span className="text-amber">• {activeDomain.title}</span>}
        </div>
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-obsidian-3/80 bg-obsidian/85 p-1 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={onPropagateSignal}
            disabled={isSignalActive}
            className="flex items-center gap-1 rounded-full bg-amber/20 px-2.5 py-1 text-xs font-semibold text-amber hover:bg-amber hover:text-obsidian transition-colors"
            title="Inject and propagate signal pulse"
          >
            <Zap className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Inject Signal</span>
          </button>
          <button
            type="button"
            onClick={onToggleZenMode}
            className="flex items-center gap-1 rounded-full bg-obsidian-2 px-2.5 py-1 text-xs text-parchment hover:bg-obsidian-3 transition-colors"
            title="Restore HUD controls"
          >
            <EyeOff className="h-3.5 w-3.5 text-amber" />
            <span>Show HUD</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col p-3 md:p-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Subsystem Breadcrumb / Active Status */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-obsidian-3 bg-obsidian/90 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
          <div
            className="h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: activeDomain ? activeDomain.color : '#ffb627' }}
          />
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-parchment-2">HELIOS-3D</span>
            <span className="text-obsidian-3">/</span>
            {activeDomain ? (
              <span className="font-semibold text-parchment flex items-center gap-1.5">
                <span>{activeDomain.number}.</span>
                <span>{activeDomain.title}</span>
                <button
                  type="button"
                  onClick={() => onSelectDomain(null)}
                  className="ml-1 rounded bg-obsidian-2 px-1.5 py-0.5 text-[10px] text-parchment-2 hover:bg-obsidian-3 hover:text-parchment transition-colors"
                  title="Return to macro cosmos overview"
                >
                  Clear
                </button>
              </span>
            ) : (
              <span className="text-parchment-2">Macro System Cosmos</span>
            )}
          </div>
        </div>

        {/* Cognitive Layer Selector (Centerpiece of the Layered Learning Experience) */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-obsidian-3 bg-obsidian/90 p-1 backdrop-blur-md shadow-lg">
          {/* Layer 1 */}
          <button
            type="button"
            onClick={() => handleLayerClick(1)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              layer === 1
                ? 'bg-amber text-obsidian shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>1. Concept & Intuition</span>
          </button>

          {/* Layer 2 */}
          <button
            type="button"
            onClick={() => handleLayerClick(2)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              layer === 2
                ? 'bg-ember text-parchment shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>2. Architecture & Device</span>
          </button>

          {/* Layer 3 */}
          <button
            type="button"
            onClick={() => handleLayerClick(3)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              layer === 3
                ? 'bg-cyan-2 text-obsidian shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
          >
            <Atom className="h-3.5 w-3.5" />
            <span>3. Quantum & Equations</span>
          </button>
        </div>

        {/* Global Utilities & Causal Engine Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-obsidian-3 bg-obsidian/90 p-1 backdrop-blur-md shadow-lg">
          {/* Causal Signal Flow Injection */}
          {onPropagateSignal && (
            <button
              type="button"
              onClick={onPropagateSignal}
              disabled={isSignalActive}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                isSignalActive
                  ? 'bg-amber text-obsidian animate-pulse'
                  : 'bg-amber/15 text-amber hover:bg-amber hover:text-obsidian'
              }`}
              title="Inject signal and observe causal propagation across interconnect buses"
            >
              <Zap className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{isSignalActive ? 'Propagating...' : 'Inject Signal'}</span>
            </button>
          )}

          {/* Guided Tour */}
          <button
            type="button"
            onClick={onStartTour}
            className="flex items-center gap-1 rounded-full bg-obsidian-2 px-2.5 py-1 text-xs text-parchment hover:bg-obsidian-3 transition-colors"
            title="Start step-by-step guided exploration tour"
          >
            <Compass className="h-3.5 w-3.5 text-amber" />
            <span className="hidden sm:inline">Guided Tour</span>
          </button>

          {/* Camera Presets Menu */}
          <div className="flex items-center gap-0.5 border-l border-obsidian-3 pl-1">
            <button
              type="button"
              onClick={() => onSelectPreset('overview')}
              className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                cameraPreset === 'overview' ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:text-parchment'
              }`}
              title="Full Macro Overview"
            >
              Macro
            </button>
            <button
              type="button"
              onClick={() => onSelectPreset('slice')}
              className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                cameraPreset === 'slice' ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:text-parchment'
              }`}
              title="Cross-Section Slice View"
            >
              Slice
            </button>
            <button
              type="button"
              onClick={() => onSelectPreset('topdown')}
              className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                cameraPreset === 'topdown' ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:text-parchment'
              }`}
              title="Top-Down Plan View"
            >
              Top
            </button>
          </div>

          {/* Auto-Rotate Orbit Toggle */}
          {onToggleAutoRotate && (
            <button
              type="button"
              onClick={onToggleAutoRotate}
              className={`rounded-full p-1.5 transition-colors ${
                autoRotate ? 'bg-amber/20 text-amber' : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
              }`}
              title={autoRotate ? 'Disable Cosmos Auto-Orbit' : 'Enable Cosmos Auto-Orbit'}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Toggle Animation */}
          <button
            type="button"
            onClick={onTogglePause}
            className="rounded-full p-1.5 text-parchment-2 hover:text-parchment hover:bg-obsidian-2 transition-colors"
            title={paused ? 'Resume 3D Simulation' : 'Pause 3D Simulation'}
          >
            {paused ? <Play className="h-3.5 w-3.5 text-amber" /> : <Pause className="h-3.5 w-3.5" />}
          </button>

          {/* Toggle Audio Synthesizer */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="rounded-full p-1.5 text-parchment-2 hover:text-parchment hover:bg-obsidian-2 transition-colors"
            title={muted ? 'Enable Ambient Harmonic Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="h-3.5 w-3.5 text-parchment-2" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-2" />}
          </button>

          {/* Zen / Spatial View Toggle */}
          {onToggleZenMode && (
            <button
              type="button"
              onClick={onToggleZenMode}
              className="rounded-full p-1.5 text-parchment-2 hover:text-parchment hover:bg-obsidian-2 transition-colors"
              title="Enter Spatial Zen View (hides HUD clutter)"
            >
              <Eye className="h-3.5 w-3.5 text-parchment-2" />
            </button>
          )}

          {/* Executive Briefing Link */}
          {onViewExecutiveReport && (
            <button
              type="button"
              onClick={onViewExecutiveReport}
              className="hidden xl:flex items-center gap-1 rounded-full bg-obsidian-2 px-2.5 py-1 text-xs text-parchment-2 hover:text-parchment hover:bg-obsidian-3 transition-colors"
              title="View Executive Written Briefing"
            >
              <FileText className="h-3.5 w-3.5 text-amber" />
              <span>Report</span>
            </button>
          )}

          {/* Toggle Deep Mechanism Inspector Drawer */}
          <button
            type="button"
            onClick={onToggleInspector}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${
              isInspectorOpen
                ? 'bg-amber text-obsidian font-semibold'
                : 'bg-obsidian-2 text-parchment hover:bg-obsidian-3'
            }`}
            title="Open Deep Mechanism Inspector"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Mechanisms</span>
          </button>
        </div>
      </div>

      {/* Layer Context Sub-Banner (Visual guidance on current cognitive depth) */}
      <div className="pointer-events-none mt-2 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-obsidian-3 bg-obsidian/80 px-3 py-1 text-[11px] text-parchment-2 backdrop-blur-sm">
          <span className="font-mono text-amber">
            {layer === 1 && 'LEVEL 1: INTUITION & MACRO METAPHOR'}
            {layer === 2 && 'LEVEL 2: MESOSCOPIC HARDWARE & DEVICE PHYSICS'}
            {layer === 3 && 'LEVEL 3: QUANTUM HAMILTONIANS & MATHEMATICAL FORMULATIONS'}
          </span>
          <span className="text-obsidian-3">|</span>
          <span>Click any 3D node directly to zoom in, inspect, or inject signals</span>
        </div>
      </div>
    </header>
  );
}
