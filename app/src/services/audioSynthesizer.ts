/**
 * Web Audio API synthesizer for tactile, scientific auditory feedback
 * in the HELIOS-3D Interactive Cosmos.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Muted by default for respectful UX

  constructor() {
    // Check localStorage preference if available
    try {
      const saved = localStorage.getItem('helios-audio-muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    } catch {
      this.isMuted = true;
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('helios-audio-muted', String(this.isMuted));
    } catch {
      // ignore
    }
    if (!this.isMuted) {
      this.init();
      this.playLayerChime(1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a distinct harmonic chord corresponding to each cognitive layer.
   */
  public playLayerChime(layer: 1 | 2 | 3) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Frequencies tailored to the cognitive mood of each layer
    // Layer 1: Warm, friendly, inviting (Pentatonic Major: A4, C#5, E5)
    // Layer 2: Technical, crystalline, focused (D5, F#5, A5)
    // Layer 3: Deep, quantum resonant (Low A2, E4, A4, C#6 harmonic overtone)
    const frequencies: Record<1 | 2 | 3, number[]> = {
      1: [440, 554.37, 659.25],
      2: [587.33, 739.99, 880.0],
      3: [110, 329.63, 659.25, 1108.73],
    };

    const notes = frequencies[layer];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = layer === 3 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      const peakGain = (0.08 / (idx + 1)) * (layer === 3 ? 0.4 : 1.0);
      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(peakGain, now + idx * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.8);

      // Add gentle lowpass filter for warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(layer === 3 ? 1200 : 2400, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.85);
    });
  }

  /**
   * Play a subtle click/blip when interacting with a 3D node.
   */
  public playNodeBlip(freq: number = 520) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * Play a spin current injection pulse sound.
   */
  public playSpinPulse() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }
}

export const soundManager = new AudioSynthesizer();
