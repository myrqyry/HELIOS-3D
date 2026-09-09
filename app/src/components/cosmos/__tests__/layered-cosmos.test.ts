import { describe, it, expect } from 'vitest';
import { DOMAINS, type CognitiveLayer } from '../../../data/layeredKnowledge';
import { TOUR_STEPS } from '../GuidedTourModal';
import { soundManager } from '../../../services/audioSynthesizer';

describe('Layered Knowledge & 3D Cosmos Architecture', () => {
  it('contains exactly 6 subsystem domains covering the full physical architecture', () => {
    expect(DOMAINS).toHaveLength(6);
    const domainIds = DOMAINS.map((d) => d.id);
    expect(domainIds).toEqual([
      'hopfion',
      'material_stack',
      'reservoir',
      'tohe_readout',
      'moire_scaling',
      'milnor_optical',
    ]);
  });

  it('has valid 3D coordinates and camera targets for every domain', () => {
    DOMAINS.forEach((domain) => {
      expect(domain.position3D).toHaveLength(3);
      expect(domain.cameraPosition).toHaveLength(3);
      expect(domain.cameraTarget).toHaveLength(3);
      expect(typeof domain.color).toBe('string');
      expect(domain.color.startsWith('#')).toBe(true);
    });
  });

  it('provides all 3 progressive cognitive layers for each domain', () => {
    const layers: CognitiveLayer[] = [1, 2, 3];
    DOMAINS.forEach((domain) => {
      layers.forEach((lvl) => {
        const layerContent = domain.layers[lvl];
        expect(layerContent).toBeDefined();
        expect(layerContent.headline.length).toBeGreaterThan(10);
        expect(layerContent.summary.length).toBeGreaterThan(20);
        expect(layerContent.deepDiveText.length).toBeGreaterThan(20);
        expect(layerContent.keyMetrics.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  it('provides intuitive analogies in Layer 1 for approachable conceptual understanding', () => {
    DOMAINS.forEach((domain) => {
      const l1 = domain.layers[1];
      expect(l1.analogyTitle).toBeDefined();
      expect(l1.analogyText).toBeDefined();
      expect(l1.analogyText?.length).toBeGreaterThan(15);
    });
  });

  it('provides mesoscopic parameters and failure modes in Layer 2 for device physics', () => {
    DOMAINS.forEach((domain) => {
      const l2 = domain.layers[2];
      expect(l2.parameters).toBeDefined();
      expect(l2.parameters?.length).toBeGreaterThan(0);
      expect(l2.failureModes).toBeDefined();
      expect(l2.failureModes?.length).toBeGreaterThan(0);
    });
  });

  it('provides rigorous mathematical equations in Layer 3 for quantum mechanisms', () => {
    const quantumDomains = DOMAINS.filter((d) => d.layers[3].equations && d.layers[3].equations!.length > 0);
    expect(quantumDomains.length).toBeGreaterThanOrEqual(4);
    quantumDomains.forEach((domain) => {
      domain.layers[3].equations?.forEach((eq) => {
        expect(eq.title).toBeDefined();
        expect(eq.latex).toBeDefined();
        expect(eq.explanation).toBeDefined();
      });
    });
  });

  it('configures guided tour steps traversing domains and cognitive layers', () => {
    expect(TOUR_STEPS.length).toBeGreaterThanOrEqual(5);
    TOUR_STEPS.forEach((step) => {
      expect(step.title).toBeDefined();
      expect([1, 2, 3]).toContain(step.layer);
      expect(step.text.length).toBeGreaterThan(20);
      expect(step.highlight.length).toBeGreaterThan(10);
    });
  });

  it('initializes audio synthesizer with sound toggle capability', () => {
    const isMuted = soundManager.getMuted();
    expect(typeof isMuted).toBe('boolean');
    const toggled = soundManager.toggleMute();
    expect(toggled).toBe(!isMuted);
    // restore original
    soundManager.toggleMute();
  });

  it('validates causal machine pipeline sequences across all domains', async () => {
    const { PIPELINE_STEPS } = await import('../InteractiveCosmos');
    expect(PIPELINE_STEPS).toHaveLength(6);
    const domainIds = DOMAINS.map((d) => d.id);
    PIPELINE_STEPS.forEach((step) => {
      expect(domainIds).toContain(step.id);
      expect(step.title.length).toBeGreaterThan(5);
      expect(step.action.length).toBeGreaterThan(10);
    });
  });

  it('provides high-detail enhanced 3D modules for each subsystem node', async () => {
    const tohe = await import('../enhanced/EnhancedTohe');
    const hopfion = await import('../enhanced/EnhancedHopfion');
    const moire = await import('../enhanced/EnhancedMoire');
    const reservoir = await import('../enhanced/EnhancedReservoir');
    const materialStack = await import('../enhanced/EnhancedMaterialStack');
    const milnor = await import('../enhanced/EnhancedMilnor');

    expect(tohe.default).toBeDefined();
    expect(hopfion.default).toBeDefined();
    expect(moire.default).toBeDefined();
    expect(reservoir.default).toBeDefined();
    expect(materialStack.default).toBeDefined();
    expect(milnor.default).toBeDefined();
  });
});
