window.GameAudio = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  },

  // 8-Bit Chiptune Square/Pulse Synth
  playChip(freq, type = "square", duration = 0.09, gainVal = 0.055, delay = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime + delay);
    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  },

  click() {
    this.playChip(880, "square", 0.045, 0.05, 0);
  },

  clueFound() {
    // Classic 90s adventure item pickup arpeggio
    this.playChip(523.25, "square", 0.07, 0.055, 0);
    this.playChip(659.25, "square", 0.07, 0.055, 0.07);
    this.playChip(1046.5, "square", 0.14, 0.055, 0.14);
  },

  timeDeduct() {
    this.playChip(330, "sawtooth", 0.08, 0.05, 0);
    this.playChip(220, "sawtooth", 0.12, 0.05, 0.08);
  },

  alarm() {
    this.playChip(587.33, "square", 0.11, 0.065, 0);
    this.playChip(440.00, "square", 0.11, 0.065, 0.12);
    this.playChip(587.33, "square", 0.11, 0.065, 0.24);
    this.playChip(440.00, "square", 0.18, 0.065, 0.36);
  },

  verdict(isCorrect) {
    if (isCorrect) {
      this.playChip(523.25, "square", 0.09, 0.06, 0);
      this.playChip(659.25, "square", 0.09, 0.06, 0.09);
      this.playChip(783.99, "square", 0.09, 0.06, 0.18);
      this.playChip(1046.5, "square", 0.25, 0.06, 0.27);
    } else {
      this.playChip(246.94, "sawtooth", 0.16, 0.06, 0);
      this.playChip(185.00, "sawtooth", 0.16, 0.06, 0.16);
      this.playChip(130.81, "sawtooth", 0.32, 0.06, 0.32);
    }
  }
};
