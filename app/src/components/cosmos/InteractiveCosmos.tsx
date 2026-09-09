import { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CosmosStage } from './CosmosStage';
import { LayerControlHUD } from './LayerControlHUD';
import { DomainNavigatorBar } from './DomainNavigatorBar';
import { MechanismInspector } from './MechanismInspector';
import { GuidedTourModal, TOUR_STEPS } from './GuidedTourModal';
import { DOMAINS, PIPELINE_STEPS, type CognitiveLayer } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';
import { usePrefersReducedMotion, isMotionEnabled } from '../../hooks/usePrefersReducedMotion';

// Causal sequence linking the six physical subsystems into one coherent machine
export { PIPELINE_STEPS };

interface InteractiveCosmosProps {
  initialLayer?: CognitiveLayer;
  initialDomainId?: string | null;
  heightClass?: string;
  onViewExecutiveReport?: () => void;
  viewMode?: '3d' | 'briefing';
  onSelectViewMode?: (mode: '3d' | 'briefing') => void;
}

export function InteractiveCosmos({
  initialLayer = 1,
  initialDomainId = null,
  heightClass = 'h-[calc(100vh-60px)]',
  onViewExecutiveReport,
  viewMode = '3d',
  onSelectViewMode,
}: InteractiveCosmosProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [layer, setLayer] = useState<CognitiveLayer>(initialLayer);
  const [activeDomainId, setActiveDomainId] = useState<string | null>(initialDomainId);
  const [paused, setPaused] = useState(!isMotionEnabled(prefersReducedMotion));
  const [cameraPreset, setCameraPreset] = useState<'overview' | 'focused' | 'topdown' | 'slice'>('overview');
  const [autoRotate, setAutoRotate] = useState(false);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [zenMode, setZenMode] = useState(false);
  const [visualTier, setVisualTier] = useState<'auto' | 'iconic' | 'enhanced'>('auto');

  // Causal Signal Propagation State
  const [isSignalActive, setIsSignalActive] = useState(false);
  const [signalStage, setSignalStage] = useState(0);
  const pipelineTimerRef = useRef<any>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pipelineTimerRef.current) clearInterval(pipelineTimerRef.current);
    };
  }, []);

  // Initialize parameters from knowledge database
  const [params, setParams] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    DOMAINS.forEach((domain) => {
      [1, 2, 3].forEach((l) => {
        domain.layers[l as CognitiveLayer].parameters?.forEach((p) => {
          initial[p.id] = p.defaultValue;
        });
      });
    });
    return initial;
  });

  const handleSelectDomain = useCallback((id: string | null) => {
    setActiveDomainId(id);
    if (id) {
      setCameraPreset('focused');
      soundManager.playNodeBlip(540);
      // Automatically open the inspector if on desktop for rich deep dive
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        setIsInspectorOpen(true);
      }
    } else {
      setCameraPreset('overview');
    }
  }, []);

  const handleSelectLayer = useCallback((newLayer: CognitiveLayer) => {
    setLayer(newLayer);
    soundManager.playLayerChime(newLayer);
  }, []);

  const handleParamChange = useCallback((id: string, value: number) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleResetParams = useCallback(() => {
    const initial: Record<string, number> = {};
    DOMAINS.forEach((domain) => {
      [1, 2, 3].forEach((l) => {
        domain.layers[l as CognitiveLayer].parameters?.forEach((p) => {
          initial[p.id] = p.defaultValue;
        });
      });
    });
    setParams(initial);
  }, []);

  const handleTriggerPulse = useCallback(() => {
    setPulseTrigger((prev) => prev + 1);
  }, []);

  // Propagates a signal causal wavefront across the full 6-node spintronic architecture
  const handlePropagateSignal = useCallback(() => {
    if (isSignalActive) return;
    setIsSignalActive(true);
    setSignalStage(0);
    soundManager.playSpinPulse();
    setPulseTrigger((prev) => prev + 1);

    let current = 0;
    if (pipelineTimerRef.current) clearInterval(pipelineTimerRef.current);

    pipelineTimerRef.current = setInterval(() => {
      current += 1;
      if (current < PIPELINE_STEPS.length) {
        setSignalStage(current);
        setPulseTrigger((prev) => prev + 1);
        soundManager.playNodeBlip(300 + current * 110);
      } else {
        clearInterval(pipelineTimerRef.current);
        pipelineTimerRef.current = null;
        setTimeout(() => {
          setIsSignalActive(false);
          setSignalStage(0);
        }, 1000);
      }
    }, 1100);
  }, [isSignalActive]);

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden bg-obsidian select-none`}>
      {/* R3F 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 4.2, 7.8], fov: 48 }}
        dpr={[1, 1.5]}
        className="h-full w-full"
      >
        <CosmosStage
          layer={layer}
          activeDomainId={activeDomainId}
          onSelectDomain={handleSelectDomain}
          paused={paused}
          params={params}
          pulseTrigger={pulseTrigger}
          cameraPreset={cameraPreset}
          autoRotate={autoRotate}
          isInspectorOpen={isInspectorOpen}
          signalStage={signalStage}
          isSignalActive={isSignalActive}
          visualTier={visualTier}
        />
      </Canvas>

      {/* Real-time Causal Signal Pipeline Floating Status Banner */}
      {isSignalActive && (
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-fadeIn">
          <div className="flex items-center gap-2 rounded-full border border-amber/70 bg-obsidian/95 px-4 py-1.5 text-xs font-sans font-medium shadow-2xl backdrop-blur-xl">
            <span className="inline-block h-2 w-2 rounded-full bg-amber animate-ping" />
            <span className="font-bold text-amber">CAUSAL BUS:</span>
            <span className="text-parchment font-semibold">
              {PIPELINE_STEPS[signalStage].title}
            </span>
            <span className="text-obsidian-3">|</span>
            <span className="text-parchment-2 text-[11px]">
              {PIPELINE_STEPS[signalStage].action}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {PIPELINE_STEPS.map((step, idx) => (
              <span
                key={step.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === signalStage
                    ? 'w-6 bg-amber'
                    : idx < signalStage
                    ? 'w-2.5 bg-amber/50'
                    : 'w-2 bg-obsidian-3'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Layer Control Top HUD */}
      <LayerControlHUD
        layer={layer}
        onSelectLayer={handleSelectLayer}
        activeDomainId={activeDomainId}
        onSelectDomain={handleSelectDomain}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        cameraPreset={cameraPreset}
        onSelectPreset={(p) => setCameraPreset(p)}
        isInspectorOpen={isInspectorOpen}
        onToggleInspector={() => setIsInspectorOpen((open) => !open)}
        onStartTour={() => {
          const firstStep = TOUR_STEPS[0];
          setTourStep(0);
          handleSelectDomain(firstStep.domainId);
          handleSelectLayer(firstStep.layer);
          setIsInspectorOpen(false);
          setIsTourOpen(true);
        }}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((r) => !r)}
        onPropagateSignal={handlePropagateSignal}
        isSignalActive={isSignalActive}
        zenMode={zenMode}
        onToggleZenMode={() => setZenMode((z) => !z)}
        onViewExecutiveReport={onViewExecutiveReport}
        viewMode={viewMode}
        onSelectViewMode={onSelectViewMode}
        visualTier={visualTier}
        onToggleVisualTier={(tier) => setVisualTier(tier)}
      />

      {/* Bottom Subsystem Navigator Dock (Hidden in Zen Mode) */}
      {!zenMode && (
        <DomainNavigatorBar
          activeDomainId={activeDomainId}
          onSelectDomain={handleSelectDomain}
        />
      )}

      {/* Slide-over Deep Mechanism Inspector */}
      <MechanismInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        activeDomainId={activeDomainId}
        onSelectDomain={handleSelectDomain}
        layer={layer}
        onSelectLayer={handleSelectLayer}
        params={params}
        onParamChange={handleParamChange}
        onResetParams={handleResetParams}
        onTriggerPulse={handleTriggerPulse}
        onViewExecutiveReport={onViewExecutiveReport}
        visualTier={visualTier}
        onToggleVisualTier={(tier) => setVisualTier(tier)}
      />

      {/* Guided Tour Floating HUD */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        currentStep={tourStep}
        onNextStep={() => setTourStep((s) => s + 1)}
        onPrevStep={() => setTourStep((s) => s - 1)}
        onSelectDomain={handleSelectDomain}
        onSelectLayer={handleSelectLayer}
      />
    </div>
  );
}
