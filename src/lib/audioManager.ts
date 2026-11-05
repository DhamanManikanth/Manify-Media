// Production Audio & Sound System for Manify Media
// Responsive Mute/Unmute toggle with Web Audio synthesizer + audio fallback

type SoundListener = () => void;

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = false;
  private listeners: Set<SoundListener> = new Set();
  private lastWhooshTime: number = 0;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("manify_sound_enabled");
        this.soundEnabled = stored === "true";
      } catch (e) {
        this.soundEnabled = false;
      }
    }
  }

  public initAudioContext(): void {
    if (typeof window === "undefined") return;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    } catch (err) {
      console.warn("AudioContext init error:", err);
    }
  }

  public subscribe(cb: SoundListener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb());
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.initAudioContext();
    this.soundEnabled = !this.soundEnabled;
    try {
      localStorage.setItem("manify_sound_enabled", String(this.soundEnabled));
    } catch (e) {}

    if (this.soundEnabled) {
      this.playClick();
    }
    this.notify();
    return this.soundEnabled;
  }

  public setSound(enabled: boolean): void {
    this.initAudioContext();
    this.soundEnabled = enabled;
    try {
      localStorage.setItem("manify_sound_enabled", String(this.soundEnabled));
    } catch (e) {}
    this.notify();
  }

  // Soft UI hover tick (volume ~0.1)
  public playHoverTick(): void {
    if (!this.soundEnabled) return;
    this.initAudioContext();

    if (this.audioCtx && this.audioCtx.state === "running") {
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const now = this.audioCtx.currentTime;

        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.02);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.02);
      } catch (e) {}
    } else {
      this.playAudioFile("/assets/audio/tick.mp3", 0.1);
    }
  }

  // Soft UI click (volume ~0.15)
  public playClick(): void {
    if (!this.soundEnabled) return;
    this.initAudioContext();

    if (this.audioCtx && this.audioCtx.state === "running") {
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const now = this.audioCtx.currentTime;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.06);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
      } catch (e) {}
    } else {
      this.playAudioFile("/assets/audio/click.mp3", 0.15);
    }
  }

  // Gentle whoosh on transitions
  public playWhoosh(): void {
    if (!this.soundEnabled) return;
    const now = Date.now();
    if (now - this.lastWhooshTime < 1400) return;
    this.lastWhooshTime = now;

    this.initAudioContext();

    if (this.audioCtx && this.audioCtx.state === "running") {
      try {
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();
        const t = this.audioCtx.currentTime;

        osc.type = "sine";
        osc.frequency.setValueAtTime(90, t);
        osc.frequency.linearRampToValueAtTime(140, t + 0.2);
        osc.frequency.linearRampToValueAtTime(75, t + 0.4);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.4);
      } catch (e) {}
    } else {
      this.playAudioFile("/assets/audio/whoosh.mp3", 0.12);
    }
  }

  private playAudioFile(src: string, volume: number): void {
    try {
      const el = new Audio(src);
      el.volume = volume;
      el.play().catch(() => {});
    } catch (e) {}
  }
}

export const audio = new SoundManager();
