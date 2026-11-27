// src/viewer/templates/kintsugiAudio.js
// Procedural Web Audio API soundscape for "After the Rain / Kintsugi":
// Acts 1-2: gentle filtered pink-noise rain
// Acts 3-5: rain softly fades into a warm, calm ambient pad chord (Fmaj9)
// Never autoplays without user gesture.

export function createKintsugiAudio() {
  let ctx = null;
  let masterGain = null;
  let rainGain = null;
  let padGain = null;
  let rainSource = null;
  let padOscs = [];
  let isEnabled = false;
  let currentAct = 0;
  let disposed = false;

  function buildGraph() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    // 1. Pink-noise rain buffer (2 seconds looping)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 920;
    rainFilter.Q.value = 0.55;

    rainGain = ctx.createGain();
    rainGain.gain.value = 0.55;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);
    rainSource.start();

    // 2. Warm ambient pad chord (F3, A3, C4, E4, G4)
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 680;
    padFilter.Q.value = 0.7;

    padGain = ctx.createGain();
    padGain.gain.value = 0.05;

    padFilter.connect(padGain);
    padGain.connect(masterGain);

    const freqs = [174.61, 220.0, 261.63, 329.63, 392.0];
    padOscs = freqs.map((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      osc.detune.value = (idx - 2) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.065;
      osc.connect(g);
      g.connect(padFilter);
      osc.start();
      return osc;
    });

    return true;
  }

  function applyActMix() {
    if (!ctx || !rainGain || !padGain) return;
    const now = ctx.currentTime;
    // Acts 0-1: rain prominent; Act 2: crossfade; Acts 3-4: warm pad prominent
    const targetRain = currentAct === 0 ? 0.52 : currentAct === 1 ? 0.34 : currentAct === 2 ? 0.12 : 0.02;
    const targetPad = currentAct === 0 ? 0.04 : currentAct === 1 ? 0.14 : currentAct === 2 ? 0.32 : 0.48;
    rainGain.gain.setTargetAtTime(targetRain, now, 0.85);
    padGain.gain.setTargetAtTime(targetPad, now, 0.95);
  }

  function start() {
    if (disposed) return false;
    if (!ctx) {
      const ok = buildGraph();
      if (!ok) return false;
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    isEnabled = true;
    applyActMix();
    masterGain.gain.setTargetAtTime(0.32, ctx.currentTime, 0.6);
    return true;
  }

  function stop() {
    isEnabled = false;
    if (ctx && masterGain) {
      masterGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.35);
    }
  }

  return {
    start,
    stop,
    toggle() {
      if (isEnabled) {
        stop();
      } else {
        start();
      }
      return isEnabled;
    },
    isPlaying() {
      return isEnabled;
    },
    setAct(actIndex) {
      currentAct = Math.max(0, Math.min(4, actIndex));
      if (isEnabled) applyActMix();
    },
    dispose() {
      disposed = true;
      isEnabled = false;
      try {
        if (rainSource) rainSource.stop();
        padOscs.forEach((o) => {
          try { o.stop(); } catch (e) {}
        });
        if (ctx) ctx.close();
      } catch (e) {}
      ctx = null;
      padOscs = [];
    },
  };
}
