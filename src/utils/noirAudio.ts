// Optional, user-triggered Web Audio API noir ambience (rain crackle + soft minor 9th chords)
// Requires zero external audio files and works reliably offline & on Netlify.

class NoirAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private chordTimer: number | null = null;
  private isPlaying = false;

  public start(): void {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.14, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // 1. Subtle rain & vinyl crackle layer (filtered pink-ish noise)
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      const crackle = Math.random() > 0.9994 ? (Math.random() * 0.45) : 0;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.04 + crackle;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 950;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0.35;

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start();
    this.noiseNode = noise;

    // 2. Soft noir jazz minor chords (Dm9 -> Gm9 -> A7alt)
    const chords = [
      [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
      [196.0, 233.08, 293.66, 349.23, 440.0],  // Gm9
      [110.0, 138.59, 196.0, 261.63, 311.13],  // A7#9
    ];
    let step = 0;

    const playChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freqs = chords[step % chords.length];
      step++;

      freqs.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 620;

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.6);

        osc.connect(lp);
        lp.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 5.8);
      });
    };

    this.isPlaying = true;
    playChord();
    this.chordTimer = window.setInterval(playChord, 6000);
  }

  public stop(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.chordTimer) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch { /* ignore */ }
      this.noiseNode = null;
    }
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
    this.masterGain = null;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }
}

export const noirAudio = new NoirAmbienceEngine();
