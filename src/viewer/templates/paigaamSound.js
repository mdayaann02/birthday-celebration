// src/viewer/templates/paigaamSound.js - Web Audio SFX & Synthesizer for Birthday Paigaam
// Synthesizes all tactile sounds: pops, chimes, wax crack, paper rustle, candle blow puff,
// fireworks explosions, fanfare chimes, and full vintage music-box "Happy Birthday" melody.

export function createPaigaamSound() {
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let master = null;
  let sfxBus = null;
  let songBus = null;
  let voiceBus = null;
  let analyser = null;
  let noiseBuf = null;
  let muted = false;

  try {
    muted = localStorage.getItem('bp-sfx-muted') === '1';
  } catch (e) {}

  function init() {
    if (ctx || !AC) return ctx;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);

      sfxBus = ctx.createGain();
      sfxBus.gain.value = muted ? 0 : 0.55;
      sfxBus.connect(master);

      songBus = ctx.createGain();
      songBus.gain.value = 1;
      songBus.connect(master);

      voiceBus = ctx.createGain();
      voiceBus.gain.value = 1;

      analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.72;
      voiceBus.connect(analyser);
      analyser.connect(master);

      const len = Math.floor(ctx.sampleRate * 1.2);
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  function wake() {
    init();
    if (ctx && ctx.state === 'suspended') {
      try { ctx.resume(); } catch (e) {}
    }
    return ctx;
  }

  function now() {
    return ctx ? ctx.currentTime : 0;
  }

  function tone(freq, start, dur, opts = {}) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = opts.type || 'sine';
    o.frequency.setValueAtTime(freq, start);
    if (opts.slide) o.frequency.exponentialRampToValueAtTime(opts.slide, start + dur);
    const peak = opts.gain == null ? 0.3 : opts.gain;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + (opts.attack || 0.008));
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    let node = g;
    if (opts.filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = opts.filter;
      g.connect(f);
      node = f;
    }
    o.connect(g);
    node.connect(opts.bus || sfxBus);
    o.start(start);
    o.stop(start + dur + 0.05);
  }

  function noise(start, dur, opts = {}) {
    if (!ctx || !noiseBuf) return;
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = opts.type || 'bandpass';
    f.frequency.value = opts.freq || 2000;
    f.Q.value = opts.q || 0.8;
    if (opts.sweep) f.frequency.exponentialRampToValueAtTime(opts.sweep, start + dur);

    const g = ctx.createGain();
    const peak = opts.gain == null ? 0.25 : opts.gain;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + (opts.attack || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    s.connect(f);
    f.connect(g);
    g.connect(opts.bus || sfxBus);
    s.start(start, Math.random() * 0.4);
    s.stop(start + dur + 0.05);
  }

  function bell(freq, start, dur, gain = 0.22) {
    tone(freq, start, dur, { gain, attack: 0.004 });
    tone(freq * 2.01, start, dur * 0.6, { gain: gain * 0.35, attack: 0.004 });
    tone(freq * 3.98, start, dur * 0.3, { gain: gain * 0.12, attack: 0.002 });
  }

  const KEY_NOTES = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5, 1174.66, 1318.5];

  const sfx = {
    key: function (i) {
      if (!wake() || muted) return;
      const t = now(), f = KEY_NOTES[(i | 0) % KEY_NOTES.length];
      tone(f, t, 0.16, { gain: 0.24, slide: f * 1.5 });
      noise(t, 0.03, { freq: 4000, gain: 0.08 });
    },
    soft: function () {
      if (!wake() || muted) return;
      const t = now();
      tone(420, t, 0.12, { gain: 0.18, slide: 300 });
    },
    wrong: function () {
      if (!wake() || muted) return;
      const t = now();
      tone(330, t, 0.18, { type: 'triangle', gain: 0.22 });
      tone(247, t + 0.16, 0.32, { type: 'triangle', gain: 0.22, slide: 200 });
    },
    unlock: function () {
      if (!wake() || muted) return;
      const t = now();
      [1046.5, 1318.5, 1568, 2093].forEach((f, i) => { bell(f, t + i * 0.08, 0.9, 0.16); });
      noise(t, 0.6, { type: 'highpass', freq: 6000, gain: 0.05 });
    },
    yes: function () {
      if (!wake() || muted) return;
      const t = now();
      [659.25, 783.99, 987.77, 1318.5].forEach((f, i) => {
        tone(f, t + i * 0.07, 0.36, { gain: 0.2, type: 'triangle' });
      });
    },
    no: function () {
      if (!wake() || muted) return;
      const t = now();
      tone(220, t, 0.2, { type: 'sawtooth', gain: 0.15, filter: 600 });
      tone(180, t + 0.09, 0.26, { type: 'sawtooth', gain: 0.15, filter: 450 });
    },
    crack: function () {
      if (!wake() || muted) return;
      const t = now();
      noise(t, 0.08, { type: 'highpass', freq: 2400, gain: 0.35 });
      noise(t + 0.04, 0.18, { type: 'bandpass', freq: 1100, q: 1.6, gain: 0.3 });
      tone(160, t, 0.12, { gain: 0.25, slide: 70 });
    },
    paper: function () {
      if (!wake() || muted) return;
      const t = now();
      noise(t, 0.35, { type: 'bandpass', freq: 1400, sweep: 800, q: 0.7, gain: 0.22 });
    },
    puff: function () {
      if (!wake() || muted) return;
      const t = now();
      noise(t, 0.24, { type: 'lowpass', freq: 500, sweep: 150, gain: 0.28 });
    },
    pop: function () {
      if (!wake() || muted) return;
      const t = now();
      tone(700, t, 0.08, { gain: 0.26, slide: 240 });
    },
    firework: function () {
      if (!wake() || muted) return;
      const t = now();
      noise(t, 0.5, { type: 'lowpass', freq: 900, sweep: 120, gain: 0.3 });
      for (let i = 0; i < 6; i++) {
        noise(t + 0.15 + Math.random() * 0.5, 0.05, { type: 'highpass', freq: 5000, gain: 0.08 });
      }
    },
    fanfare: function () {
      if (!wake() || muted) return;
      const t = now();
      [[523.25, 0], [659.25, 0.14], [783.99, 0.28], [1046.5, 0.42], [783.99, 0.62], [1046.5, 0.76]].forEach((n) => {
        tone(n[0], t + n[1], n[1] > 0.7 ? 0.9 : 0.24, { type: 'sawtooth', gain: 0.07, filter: 2400 });
        bell(n[0] * 2, t + n[1], 0.5, 0.06);
      });
    }
  };

  // Music Box Synthesizer: "Happy Birthday to You"
  const G4 = 392, A4 = 440, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
  const MELODY = [
    [G4, .75], [G4, .25], [A4, 1], [G4, 1], [C5, 1], [B4, 2],
    [G4, .75], [G4, .25], [A4, 1], [G4, 1], [D5, 1], [C5, 2],
    [G4, .75], [G4, .25], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 2],
    [F5, .75], [F5, .25], [E5, 1], [C5, 1], [D5, 1], [C5, 3]
  ];
  const BEAT = 0.42;
  const LOOP = MELODY.reduce((s, n) => s + n[1], 0) * BEAT + 1.2;
  const box = { playing: false, timer: 0, startedAt: 0 };

  function scheduleLoop(at) {
    let t = at;
    MELODY.forEach((n) => {
      const d = n[1] * BEAT;
      tone(n[0], t, Math.max(0.6, d * 1.6), { gain: 0.2, attack: 0.004, bus: songBus });
      tone(n[0] * 2, t, 0.5, { gain: 0.06, attack: 0.003, bus: songBus });
      tone(n[0] / 2, t, d, { type: 'triangle', gain: 0.05, bus: songBus });
      t += d;
    });
  }

  const musicBox = {
    start: function () {
      if (!wake() || box.playing) return;
      box.playing = true;
      box.startedAt = now() + 0.05;
      let next = box.startedAt;
      const tick = () => {
        if (!box.playing) return;
        scheduleLoop(next);
        next += LOOP;
        box.timer = setTimeout(tick, Math.max(200, (next - now() - 1) * 1000));
      };
      tick();
    },
    stop: function () {
      box.playing = false;
      clearTimeout(box.timer);
      if (ctx && songBus) {
        const g = songBus.gain;
        const t = now();
        try {
          g.cancelScheduledValues(t);
          g.setValueAtTime(g.value, t);
          g.linearRampToValueAtTime(0.0001, t + 0.12);
          const old = songBus;
          songBus = ctx.createGain();
          songBus.gain.value = duckLevel;
          songBus.connect(master);
          setTimeout(() => { try { old.disconnect(); } catch (e) {} }, 300);
        } catch (e) {}
      }
    },
    get playing() { return box.playing; },
    progress: function () { return box.playing ? ((now() - box.startedAt) % LOOP) / LOOP : 0; }
  };

  const routed = typeof WeakMap === 'function' ? new WeakMap() : null;
  let songElBus = null;

  function songBusProxy() {
    if (!songElBus && ctx) {
      songElBus = ctx.createGain();
      songElBus.gain.value = 1;
      songElBus.connect(master);
    }
    return songElBus;
  }

  function route(el, kind) {
    if (!wake() || !el || !routed) return false;
    if (routed.has(el)) return true;
    try {
      const src = ctx.createMediaElementSource(el);
      src.connect(kind === 'voice' ? voiceBus : songBusProxy());
      routed.set(el, src);
      return true;
    } catch (e) {
      return false;
    }
  }

  let duckLevel = 1;
  function duck(on) {
    duckLevel = on ? 0.22 : 1;
    if (ctx) {
      [songBus, songElBus].forEach((bus) => {
        if (!bus) return;
        const t = now();
        try {
          bus.gain.cancelScheduledValues(t);
          bus.gain.setValueAtTime(bus.gain.value, t);
          bus.gain.linearRampToValueAtTime(duckLevel, t + 0.6);
        } catch (e) {}
      });
    }
  }

  function levels(out) {
    if (!analyser) return null;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    for (let i = 0; i < out.length; i++) {
      out[i] = data[Math.min(data.length - 1, 1 + Math.floor(i * (data.length - 2) / out.length))] / 255;
    }
    return out;
  }

  function setMuted(v) {
    muted = Boolean(v);
    try { localStorage.setItem('bp-sfx-muted', muted ? '1' : '0'); } catch (e) {}
    if (sfxBus) sfxBus.gain.value = muted ? 0 : 0.55;
  }

  function destroy() {
    musicBox.stop();
    if (ctx && ctx.state !== 'closed') {
      try { ctx.close(); } catch (e) {}
    }
    ctx = null;
  }

  return {
    wake,
    sfx,
    musicBox,
    route,
    duck,
    levels,
    get muted() { return muted; },
    setMuted,
    destroy
  };
}
