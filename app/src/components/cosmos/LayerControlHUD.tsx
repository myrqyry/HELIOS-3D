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
  viewMode?: '3d' | 'briefing';
  onSelectViewMode?: (mode: '3d' | 'briefing') => void;
  visualTier?: 'auto' | 'iconic' | 'enhanced';
  onToggleVisualTier?: (tier: 'iconic' | 'enhanced') => void;
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
  viewMode = '3d',
  onSelectViewMode,
  visualTier = 'auto',
  onToggleVisualTier,
}: LayerControlHUDProps) {
  const [muted, setMuted] = useState(soundManager.getMuted());
  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId);

  const handleLayerClick = (targetLayer: CognitiveLayer) => {
    onSelectLayer(targetLayer);
  };

  const handleToggleSound = () => {
    const isNowMuted = soundManager.toggleMute();
    setMuted(isNowMuted);
  };

  if (zenMode) {
    return (
      <header className="pointer-events-none absolute inset-x-0 top-2.5 z-20 flex justify-between px-3 md:px-4">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-obsidian-3/80 bg-obsidian/90 px-3 py-1.5 backdrop-blur-md shadow-xl text-xs font-sans font-semibold text-parchment">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
          <span className="text-parchment-2 text-[11px]">SPATIAL ZEN</span>
          {activeDomain && <span className="text-amber">• {activeDomain.title}</span>}
        </div>
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-obsidian-3/80 bg-obsidian/90 p-1 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={onPropagateSignal}
            disabled={isSignalActive}
            className="flex items-center gap-1 rounded-full bg-amber/20 px-2.5 py-1 text-xs font-semibold text-amber hover:bg-amber hover:text-obsidian transition-colors"
            title="Inject and propagate signal pulse"
          >
            <Zap className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Signal</span>
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
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col p-2.5 md:p-3">
      {/* Consolidated Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Brand + Breadcrumb */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-obsidian-3/90 bg-obsidian/92 px-3 py-1.5 backdrop-blur-md shadow-lg">
          <div
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: activeDomain ? activeDomain.color : '#ffb627' }}
          />
          <div className="flex items-center gap-1.5 text-xs font-sans font-semibold">
            <span className="font-bold tracking-tight text-parchment">HELIOS-3D</span>
            <span className="text-obsidian-3">/</span>
            {activeDomain ? (
              <span className="font-semibold text-parchment flex items-center gap-1">
                <span className="text-amber">{activeDomain.number}.</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{activeDomain.title}</span>
                <button
                  type="button"
                  onClick={() => onSelectDomain(null)}
                  className="ml-1 rounded-full bg-obsidian-2 px-1.5 py-0.2 text-[10px] text-parchment-2 hover:bg-amber hover:text-obsidian transition-colors"
                  title="Return to macro overview"
                >
                  ×
                </button>
              </span>
            ) : (
              <span className="text-parchment-2 text-[11px]">Macro System</span>
            )}
          </div>
        </div>

        {/* Center: Cognitive Layer Tabs (Single Pill Group) */}
        <div className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-obsidian-3/90 bg-obsidian/92 p-1 backdrop-blur-md shadow-lg">
          {/* Layer 1 */}
          <button
            type="button"
            onClick={() => handleLayerClick(1)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
              layer === 1
                ? 'bg-amber text-obsidian shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
            title="Layer 1: Conceptual intuition and macro physical metaphors"
          >
            <Sparkles className="h-3 w-3" />
            <span>1. Intuition</span>
          </button>

          {/* Layer 2 */}
          <button
            type="button"
            onClick={() => handleLayerClick(2)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
              layer === 2
                ? 'bg-ember text-parchment shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
            title="Layer 2: Mesoscopic hardware architecture and spintronic devices"
          >
            <Layers className="h-3 w-3" />
            <span>2. Device</span>
          </button>

          {/* Layer 3 */}
          <button
            type="button"
            onClick={() => handleLayerClick(3)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
              layer === 3
                ? 'bg-cyan-2 text-obsidian shadow-sm font-semibold'
                : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
            }`}
            title="Layer 3: Quantum Hamiltonians, differential geometry, and formal proofs"
          >
            <Atom className="h-3 w-3" />
            <span>3. Quantum</span>
          </button>
        </div>

        {/* Right: Mode Toggle + Quick Actions */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-obsidian-3/90 bg-obsidian/92 p-1 backdrop-blur-md shadow-lg">
          {/* Mode Switcher (Cosmos 3D vs Executive Briefing) */}
          {onSelectViewMode && (
            <div className="flex items-center gap-0.5 border-r border-obsidian-3 pr-1 mr-0.5">
              <button
                type="button"
                onClick={() => onSelectViewMode('3d')}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                  viewMode === '3d'
                    ? 'bg-amber text-obsidian font-bold shadow-sm'
                    : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span className="hidden sm:inline">3D</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectViewMode('briefing')}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                  viewMode === 'briefing'
                    ? 'bg-amber text-obsidian font-bold shadow-sm'
                    : 'text-parchment-2 hover:text-parchment hover:bg-obsidian-2'
                }`}
              >
                <FileText className="h-3 w-3" />
                <span className="hidden sm:inline">Briefing</span>
              </button>
            </div>
          )}

          {/* Guided Tour */}
          <button
            type="button"
            onClick={onStartTour}
            className="flex items-center gap-1 rounded-full bg-obsidian-2 px-2.5 py-1 text-xs text-parchment hover:bg-obsidian-3 transition-colors"
            title="Start step-by-step guided exploration tour"
          >
            <Compass className="h-3.5 w-3.5 text-amber" />
            <span className="hidden lg:inline">Tour</span>
          </button>

          {/* 3D Visual Tier Switcher (when node is focused) */}
          {activeDomain && onToggleVisualTier && (
            <button
              type="button"
              onClick={() => onToggleVisualTier(visualTier === 'iconic' ? 'enhanced' : 'iconic')}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors border ${
                visualTier === 'iconic'
                  ? 'border-obsidian-3 bg-obsidian-2 text-parchment-2 hover:text-parchment'
                  : 'border-amber/60 bg-amber/20 text-amber font-semibold shadow-sm'
              }`}
              title={visualTier === 'iconic' ? 'Switch to Enhanced 3D scene takeover' : 'Switch to Iconic station model'}
            >
              <Sparkles className="h-3 w-3" />
              <span className="hidden sm:inline">{visualTier === 'iconic' ? 'Iconic' : 'Enhanced'}</span>
            </button>
          )}

          {/* Causal Signal Flow Injection */}
          {onPropagateSignal && (
            <button
              type="button"
              onClick={onPropagateSignal}
              disabled={isSignalActive}
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all ${
                isSignalActive
                  ? 'bg-amber text-obsidian animate-pulse'
                  : 'bg-amber/15 text-amber hover:bg-amber hover:text-obsidian'
              }`}
              title="Inject signal pulse across interconnect buses"
            >
              <Zap className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">{isSignalActive ? 'Pulse...' : 'Signal'}</span>
            </button>
          )}

          {/* Camera Presets Menu */}
          <div className="flex items-center gap-0.5 border-l border-obsidian-3 pl-1">
            <button
              type="button"
              onClick={() => onSelectPreset('overview')}
              className={`rounded px-1.5 py-0.5 text-[10px] font-sans font-semibold transition-colors ${
                cameraPreset === 'overview' ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:text-parchment'
              }`}
              title="Full Macro Overview"
            >
              Macro
            </button>
            <button
              type="button"
              onClick={() => onSelectPreset('slice')}
              className={`rounded px-1.5 py-0.5 text-[10px] font-sans font-semibold transition-colors ${
                cameraPreset === 'slice' ? 'bg-amber text-obsidian font-bold' : 'text-parchment-2 hover:text-parchment'
              }`}
              title="Cross-Section Slice View"
            >
              Slice
            </button>
            <button
              type="button"
              onClick={() => onSelectPreset('topdown')}
              className={`rounded px-1.5 py-0.5 text-[10px] font-sans font-semibold transition-colors ${
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
              title={autoRotate ? 'Disable Auto-Orbit' : 'Enable Auto-Orbit'}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Toggle Animation */}
          <button
            type="button"
            onClick={onTogglePause}
            className="rounded-full p-1.5 text-parchment-2 hover:text-parchment hover:bg-obsidian-2 transition-colors"
            title={paused ? 'Resume Simulation' : 'Pause Simulation'}
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
              title="Spatial Zen View (hides HUD chrome)"
            >
              <Eye className="h-3.5 w-3.5 text-parchment-2" />
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
            <span className="hidden md:inline">Inspect</span>
          </button>
        </div>
      </div>

      {/* Layer Context Sub-Banner */}
      <div className="pointer-events-none mt-1.5 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-obsidian-3/80 bg-obsidian/85 px-3 py-0.5 text-[10px] text-parchment-2 backdrop-blur-sm">
          <span className="font-sans font-bold text-amber">
            {layer === 1 && 'LEVEL 1 · INTUITION & MACRO METAPHORS'}
            {layer === 2 && 'LEVEL 2 · MESOSCOPIC HARDWARE & DEVICE PHYSICS'}
            {layer === 3 && 'LEVEL 3 · QUANTUM HAMILTONIANS & MATHEMATICS'}
          </span>
          <span className="text-obsidian-3">|</span>
          <span>Click any 3D node directly to focus & inspect</span>
        </div>
      </div>
    </header>
  );
}
