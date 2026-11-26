// src/viewer/templates/sorryTemplate.js — Long Romance Apology & Reconciliation Sanctuary
// Powered by:
// 1. Three.js Persistent WebGL Twilight Embers, Rose Petals & Healing Lanterns (Adaptive GPU Tier)
// 2. Lovable Scroll-Driven Architecture (overflow-x: clip, Sticky Illuminated Parchment Td, Cascading Polaroids Cd)
// 3. Lenis Smooth Momentum Scrolling + Sticky Chapter Navigation Dock
// 4. Tactile Venting Room (Physics, Glass Splats, Anger Thermometer, Synthesized Audio)
// 5. Sacred Promises, Interactive Penances, Peace Treaty Stamp, Coupons & Hold-to-Heal Certificate

import * as THREE from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import {
  detectDeviceTier,
  getOptimalPixelRatio,
  createAdaptiveFpsScaler,
  disposeThreeScene,
} from './threePerf.js';

const STYLE_ID = 'sorry-long-romance-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .slr-root {
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow-x: clip;
      background: #100b12;
      color: #f8efe6;
      font-family: 'Nunito', system-ui, -apple-system, sans-serif;
    }
    .slr-webgl-bg {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .slr-ambient-tint {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: radial-gradient(circle at 50% 18%, rgba(224, 122, 95, 0.16), transparent 60%);
      transition: background 1.2s ease;
    }
    .slr-ambient-tint.healed {
      background: radial-gradient(circle at 50% 18%, rgba(251, 191, 36, 0.22), rgba(244, 63, 94, 0.08) 55%, transparent 80%);
    }
    .slr-chapter-nav {
      position: sticky;
      top: 10px;
      z-index: 40;
      width: min(760px, 94%);
      margin: 0 auto;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(20, 14, 22, 0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 220, 190, 0.16);
      display: flex;
      align-items: center;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    }
    .slr-chapter-nav::-webkit-scrollbar { display: none; }
    .slr-nav-pill {
      flex-shrink: 0;
      border: none;
      background: transparent;
      color: rgba(255, 240, 230, 0.68);
      font-size: 11px;
      font-weight: 700;
      padding: 6px 11px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.25s ease;
      white-space: nowrap;
    }
    .slr-nav-pill.active, .slr-nav-pill:hover {
      background: rgba(224, 122, 95, 0.28);
      color: #fff5eb;
    }
    .slr-music-slot {
      position: fixed;
      top: 58px;
      right: 14px;
      z-index: 42;
    }
    .slr-content {
      position: relative;
      z-index: 5;
    }
    .slr-section {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
      padding: 76px 20px;
      opacity: 0;
      transform: scale(0.94) translateY(22px);
      transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .slr-section.in-view {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    .slr-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      color: #f4a261;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(244, 162, 97, 0.12);
      border: 1px solid rgba(244, 162, 97, 0.28);
      margin-bottom: 14px;
    }
    .slr-h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2.2rem, 6vw, 4.1rem);
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 14px;
      background: linear-gradient(135deg, #fff5eb 0%, #f7b299 55%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .slr-h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.65rem, 4vw, 2.55rem);
      font-weight: 800;
      margin: 0 0 10px;
      color: #fff4ea;
    }
    .slr-sub {
      font-size: clamp(0.98rem, 2.2vw, 1.15rem);
      color: rgba(248, 232, 220, 0.78);
      line-height: 1.65;
      max-width: 620px;
      margin: 0 auto;
    }

    /* Act I: Candlelit Gateway */
    .slr-hero {
      min-height: 86vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-top: 36px;
    }
    .slr-candle-wrap {
      position: relative;
      width: 120px;
      height: 168px;
      margin: 0 auto 24px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
    .slr-candle-aura {
      position: absolute;
      top: 6px;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(251, 191, 36, 0.55) 0%, rgba(224, 122, 95, 0.18) 50%, transparent 75%);
      filter: blur(8px);
      opacity: 0.45;
      transition: all 0.6s ease;
    }
    .slr-candle-wrap.lit .slr-candle-aura {
      opacity: 1;
      transform: scale(1.45);
    }
    .slr-candle-flame {
      width: 22px;
      height: 36px;
      border-radius: 50% 50% 50% 50% / 65% 65% 35% 35%;
      background: linear-gradient(180deg, #fffbeb 0%, #fbbf24 55%, #ea580c 100%);
      box-shadow: 0 0 22px #fbbf24, 0 0 42px rgba(234, 88, 12, 0.7);
      animation: slrFlicker 1.6s infinite alternate ease-in-out;
      margin-bottom: -2px;
      z-index: 2;
    }
    @keyframes slrFlicker {
      0% { transform: scale(1) rotate(-2deg); }
      50% { transform: scale(1.06, 0.95) rotate(2deg); }
      100% { transform: scale(0.97, 1.05) rotate(-1deg); }
    }
    .slr-candle-pillar {
      width: 54px;
      height: 92px;
      border-radius: 10px 10px 6px 6px;
      background: linear-gradient(180deg, #fff7ed 0%, #e7d3be 100%);
      box-shadow: inset 0 8px 14px rgba(251, 191, 36, 0.25), 0 14px 28px rgba(0, 0, 0, 0.45);
    }
    .slr-candle-tip {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 700;
      color: #fde68a;
    }
    .slr-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 26px;
      padding: 13px 26px;
      border-radius: 999px;
      border: 1px solid rgba(255, 220, 180, 0.4);
      background: linear-gradient(135deg, #e07a5f, #d95d39);
      color: #fff;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(224, 122, 95, 0.35);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .slr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(224, 122, 95, 0.48); }

    /* Act II: Lovable Sticky Scroll-Illuminated Confession Letter (Td) */
    .slr-letter-track {
      position: relative;
      height: 220vh;
      max-width: 820px;
      margin: 0 auto;
      padding: 0 16px;
    }
    .slr-letter-sticky {
      position: -webkit-sticky;
      position: sticky;
      top: 66px;
      min-height: calc(100vh - 90px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .slr-parchment {
      position: relative;
      width: 100%;
      background: linear-gradient(160deg, rgba(44, 30, 36, 0.92), rgba(24, 16, 22, 0.96));
      border: 1px solid rgba(244, 162, 97, 0.32);
      border-radius: 26px;
      padding: clamp(24px, 4vw, 44px);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 235, 210, 0.12);
    }
    .slr-wax-seal {
      position: absolute;
      top: -22px;
      right: 28px;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ef4444, #991b1b);
      border: 2px solid rgba(254, 202, 202, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(185, 28, 28, 0.5);
      transition: transform 0.35s ease, opacity 0.35s ease;
    }
    .slr-wax-seal.unsealed {
      transform: scale(0.82) rotate(18deg);
      background: radial-gradient(circle at 35% 35%, #fbbf24, #d97706);
    }
    .slr-letter-word {
      display: inline-block;
      margin-right: 0.28em;
      opacity: 0.14;
      transition: opacity 0.25s ease, text-shadow 0.25s ease;
    }
    .slr-letter-word.lit {
      opacity: 1;
      text-shadow: 0 0 14px rgba(251, 191, 36, 0.22);
    }

    /* Act III: Venting Room */
    .slr-card {
      background: rgba(26, 18, 28, 0.84);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 220, 195, 0.15);
      border-radius: 24px;
      padding: clamp(20px, 3.5vw, 32px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.42);
    }
    .slr-meter-track {
      width: 100%;
      height: 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
      margin-top: 8px;
    }
    .slr-meter-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #4ade80, #fbbf24, #ef4444);
      transition: width 0.35s ease;
    }
    .slr-target-frame {
      position: relative;
      width: 220px;
      height: 220px;
      margin: 22px auto 12px;
      border-radius: 22px;
      overflow: hidden;
      border: 3px solid rgba(244, 162, 97, 0.45);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
    }
    .slr-target-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .slr-decal-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .slr-decal {
      position: absolute;
      font-size: 32px;
      transform: translate(-50%, -50%);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
      pointer-events: none;
    }
    .slr-arsenal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
      margin-top: 18px;
    }
    .slr-arsenal-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px 10px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .slr-arsenal-btn:hover { background: rgba(224, 122, 95, 0.25); transform: translateY(-2px); }

    /* Act IV & VI: Grids */
    .slr-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .slr-pillar {
      background: rgba(28, 20, 30, 0.78);
      border: 1px solid rgba(244, 162, 97, 0.2);
      border-radius: 20px;
      padding: 20px;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .slr-pillar:hover { transform: translateY(-3px); border-color: rgba(251, 191, 36, 0.48); }

    /* Act V: Lovable Cascading Flip Polaroids (Cd) */
    .slr-polaroids-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-top: 28px;
    }
    .slr-polaroid {
      perspective: 1000px;
      cursor: pointer;
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.75s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .slr-polaroid.shown {
      opacity: 1;
      transform: translateY(0) rotate(var(--tilt, 0deg));
    }
    .slr-polaroid-inner {
      position: relative;
      width: 100%;
      height: 300px;
      transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .slr-polaroid.flipped .slr-polaroid-inner {
      transform: rotateY(180deg);
    }
    .slr-pol-face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 14px;
      padding: 12px 12px 20px;
      background: #fffaf3;
      color: #2b1f23;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
    }
    .slr-pol-front img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 8px;
    }
    .slr-pol-cap {
      margin-top: 10px;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
    }
    .slr-pol-back {
      transform: rotateY(180deg);
      background: linear-gradient(150deg, #fff5eb, #fde8df);
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 22px;
    }

    /* Act VI: Interactive Penances, Peace Treaty & Coupons */
    .slr-check-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .slr-check-item.claimed {
      background: rgba(74, 222, 128, 0.14);
      border-color: rgba(74, 222, 128, 0.45);
    }

    /* Act VII: Hold-to-Heal Olive Branch */
    .slr-hold-btn {
      position: relative;
      width: min(320px, 90%);
      height: 62px;
      margin: 24px auto 0;
      border-radius: 999px;
      border: 1.5px solid rgba(251, 191, 36, 0.55);
      background: rgba(34, 22, 30, 0.9);
      color: #fff;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      touch-action: none;
    }
    .slr-hold-fill {
      position: absolute;
      inset: 0;
      width: 0%;
      background: linear-gradient(90deg, #e07a5f, #fbbf24);
      z-index: 0;
    }
    .slr-hold-label {
      position: relative;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);
}

function playSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'candle' || type === 'chime') {
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.14, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.38);
      });
    } else if (type === 'punch' || type === 'splat' || type === 'whack' || type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'whack' ? 'sawtooth' : type === 'splat' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(type === 'punch' ? 140 : 380, now);
      osc.frequency.exponentialRampToValueAtTime(type === 'boing' ? 420 : 55, now + 0.2);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'victory') {
      [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    }
  } catch {}
}

export function renderSorryTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }
  ensureStyles();

  const tier = detectDeviceTier();
  const lowDetail = tier === 'low';

  const recipientName = data.recipientName || 'My Dearest';
  const senderName = data.senderName || 'Sincerely Yours';
  const heroTitle = data.heroTitle || "I'm Really Sorry";
  const heroSubtitle = data.heroSubtitle || "My world feels heavy and quiet whenever you are hurt 🥺";
  const apologyMessage =
    data.apologyMessage ||
    "I know I messed up, and seeing you upset hurts me more than anything. My intention was never to make you feel hurt or unheard. You mean everything to me, and I take full accountability. I promise to listen with an open heart, protect your peace above my pride, and cherish you better every single day.";
  const creatorPhoto = data.creatorPhoto || '/images/always_you.jpg';

  const reasonsToForgive = (Array.isArray(data.reasonsToForgive) && data.reasonsToForgive.length > 0)
    ? data.reasonsToForgive
    : [
        'Because our bond is bigger and more precious than any silly mistake.',
        'Because I am genuinely learning and committed to being better for you.',
        'Because life is too short to let misunderstandings steal our joy.',
        'Because your smile is my favorite thing in the universe, and I miss it.',
      ];

  const promises = (Array.isArray(data.promises) && data.promises.length > 0)
    ? data.promises
    : [
        'To listen first and understand before reacting.',
        'To never take your patience and love for granted.',
        'To communicate openly with gentleness and honesty.',
      ];

  const penances = (Array.isArray(data.penances) && data.penances.length > 0)
    ? data.penances
    : [
        'Buy your favorite Iced Boba / Treat right now 🧋',
        '30-minute soothing massage whenever you ask 💆‍♀️',
        'Order whatever food you are craving tonight, my treat 🍕',
        'Watch 3 chick flicks / K-dramas with zero groaning 🍿',
      ];

  const treatyClauses = (Array.isArray(data.treatyClauses) && data.treatyClauses.length > 0)
    ? data.treatyClauses
    : [
        'Party A (The Cutest Girl) is officially declared 100% Right in all disputes.',
        'Party B must deliver hugs, forehead kisses, and warm cuddles upon demand.',
        'Permanent hoodie and jacket theft rights are granted with zero retaliation.',
        'No going to sleep angry ever again — dessert & comfort come first.',
      ];

  const polaroids = (Array.isArray(data.polaroids) && data.polaroids.length > 0)
    ? data.polaroids
    : [
        { image: '/images/sunset.jpg', caption: 'Our sunset walk... I miss your laugh 🌅', note: 'The peace I feel next to you is unmatched. I promise to protect it forever.' },
        { image: '/images/always_you.jpg', caption: 'You are my safest home 🫶', note: 'One smile from you puts my whole chaotic world back together.' },
        { image: '/images/pretty.jpg', caption: 'Forever the one I adore ✨', note: 'You deserve the softest, purest love in this universe.' },
      ];

  const coupons = (Array.isArray(data.coupons) && data.coupons.length > 0)
    ? data.coupons
    : [
        { icon: '🎟️', title: 'Get Out of Jail Free', desc: 'Win any future argument instantly with zero rebuttal!' },
        { icon: '🍫', title: 'Midnight Craving Pass', desc: 'Redeemable 24/7 for chocolates, snacks, or boba.' },
        { icon: '🧸', title: 'Unlimited Bear Hugs', desc: 'Non-expiring voucher for long, tight, comforting hugs.' },
        { icon: '👑', title: 'Queen For A Day', desc: 'Your every cute wish is my command for 24 hours.' },
      ];

  const letterWords = apologyMessage.trim().split(/\s+/);
  const tilts = ['-2.5deg', '2deg', '-1.5deg', '2.4deg', '-2deg', '1.8deg'];

  container.innerHTML = `
    <div class="slr-root" id="slrRoot">
      <div class="slr-webgl-bg" id="slrWebglBg"></div>
      <div class="slr-ambient-tint" id="slrAmbientTint"></div>

      <!-- Sticky Top Chapter Dock -->
      <nav class="slr-chapter-nav" aria-label="Story Chapters">
        <button type="button" class="slr-nav-pill active" data-target="#slrAct1">I. Candlelight</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct2">II. Letter</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct3">III. Vent Room</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct4">IV. Promises</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct5">V. Memories</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct6">VI. Peace Treaty</button>
        <button type="button" class="slr-nav-pill" data-target="#slrAct7">VII. Heal</button>
      </nav>

      <div class="slr-music-slot" id="slrMusicSlot"></div>

      <main class="slr-content">
        <!-- ACT I: CANDLELIT SANCTUARY -->
        <section class="slr-section slr-hero in-view" id="slrAct1">
          <div class="slr-candle-wrap" id="slrCandle" role="button" tabindex="0" title="Tap to light candle">
            <div class="slr-candle-aura"></div>
            <div class="slr-candle-flame"></div>
            <div class="slr-candle-pillar"></div>
          </div>
          <div class="slr-candle-tip" id="slrCandleTip">🕯️ Tap the candle to warm this sanctuary</div>
          <span class="slr-eyebrow" style="margin-top:18px;">CHAPTER I • SINCERE ATONEMENT</span>
          <h1 class="slr-h1">${heroTitle}</h1>
          <p class="slr-sub">${heroSubtitle}</p>
          <button type="button" class="slr-btn-primary" id="slrBtnBegin">
            <span>Scroll Into My Heart</span>
            <span>↓</span>
          </button>
        </section>

        <!-- ACT II: LOVABLE STICKY SCROLL-ILLUMINATED CONFESSION (Td) -->
        <section id="slrAct2" class="slr-letter-track">
          <div class="slr-letter-sticky">
            <div class="slr-parchment">
              <div class="slr-wax-seal" id="slrWaxSeal" role="button" tabindex="0" title="Tap to unseal">🕊️</div>
              <span class="slr-eyebrow">CHAPTER II • SCROLL TO ILLUMINATE EVERY WORD</span>
              <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:#fde68a;margin-bottom:14px;">
                Dearest ${recipientName},
              </div>
              <p id="slrLetterBody" style="font-size:clamp(1.02rem,2.3vw,1.24rem);line-height:1.82;margin:0 0 22px;color:#fff5eb;">
                ${letterWords.map((w, i) => `<span class="slr-letter-word" data-w="${i}">${w}</span>`).join(' ')}
              </p>
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;">
                <span style="font-size:13px;color:rgba(255,235,215,0.72);">Forever yours with all my heart,</span>
                <strong style="font-size:16px;color:#fbbf24;">${senderName} 🫶</strong>
              </div>
            </div>
          </div>
        </section>

        <!-- ACT III: TACTILE VENTING ROOM -->
        <section class="slr-section" id="slrAct3" style="text-align:center;">
          <span class="slr-eyebrow">CHAPTER III • LET IT ALL OUT</span>
          <h2 class="slr-h2">Take Your Frustration Out On Me 🥊</h2>
          <p class="slr-sub">You have every right to be upset. Throw whatever you want — zero complaints!</p>

          <div class="slr-card" style="margin-top:24px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:800;">
              <span>🔥 ANGER LEVEL</span>
              <span id="slrAngerVal" style="color:#fda4af;">100% FURIOUS</span>
            </div>
            <div class="slr-meter-track">
              <div class="slr-meter-fill" id="slrAngerFill" style="width:100%;"></div>
            </div>

            <div class="slr-target-frame" id="slrTargetFrame">
              <img src="${creatorPhoto}" alt="${senderName}" onerror="this.src='/images/always_you.jpg'" />
              <div class="slr-decal-layer" id="slrDecalLayer"></div>
            </div>
            <div id="slrVentBubble" style="font-size:13px;font-style:italic;color:#fde68a;margin-bottom:10px;">
              "I know I messed up... I'm right here listening 🥺"
            </div>
            <button type="button" class="slr-nav-pill active" id="slrWipeBtn" style="font-size:12px;padding:7px 14px;">
              🧻 Wipe Glass Clean
            </button>

            <div class="slr-arsenal-grid">
              <button type="button" class="slr-arsenal-btn" data-fx="punch" data-emoji="💥">
                <span style="font-size:24px;">🥊</span><strong style="font-size:12px;">Boxing Punch</strong>
              </button>
              <button type="button" class="slr-arsenal-btn" data-fx="splat" data-emoji="🍅">
                <span style="font-size:24px;">🍅</span><strong style="font-size:12px;">Ripe Tomato</strong>
              </button>
              <button type="button" class="slr-arsenal-btn" data-fx="whack" data-emoji="🩴">
                <span style="font-size:24px;">🩴</span><strong style="font-size:12px;">Flying Chappal</strong>
              </button>
              <button type="button" class="slr-arsenal-btn" data-fx="splat" data-emoji="🧋">
                <span style="font-size:24px;">🧋</span><strong style="font-size:12px;">Iced Boba</strong>
              </button>
              <button type="button" class="slr-arsenal-btn" data-fx="boing" data-emoji="🧸">
                <span style="font-size:24px;">🧸</span><strong style="font-size:12px;">Soft Teddy</strong>
              </button>
            </div>
          </div>
        </section>

        <!-- ACT IV: SACRED PROMISES & REASONS -->
        <section class="slr-section" id="slrAct4">
          <div style="text-align:center;">
            <span class="slr-eyebrow">CHAPTER IV • ACCOUNTABILITY &amp; PROMISES</span>
            <h2 class="slr-h2">Why Us, &amp; What I Promise</h2>
            <p class="slr-sub">No excuses—only honest growth and protecting your peace.</p>
          </div>
          <div class="slr-grid-2">
            ${reasonsToForgive.map((r, i) => `
              <div class="slr-pillar">
                <div style="font-size:11px;font-weight:800;letter-spacing:1.2px;color:#fbbf24;margin-bottom:6px;">WHY WE MATTER • 0${i + 1}</div>
                <p style="margin:0;font-size:14px;line-height:1.6;color:rgba(255,244,235,0.9);">${r}</p>
              </div>
            `).join('')}
          </div>
          <div class="slr-card" style="margin-top:20px;">
            <div style="font-size:12px;font-weight:800;letter-spacing:1.2px;color:#fda4af;margin-bottom:12px;">🛡️ MY SACRED PROMISES TO YOU</div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${promises.map((p) => `
                <div style="display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.55;">
                  <span>✦</span><span>${p}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ACT V: LOVABLE CASCADING FLIP POLAROIDS (Cd) -->
        <section class="slr-section" id="slrAct5">
          <div style="text-align:center;">
            <span class="slr-eyebrow">CHAPTER V • CHERISHED MEMORIES</span>
            <h2 class="slr-h2">Moments I Never Want to Lose</h2>
            <p class="slr-sub">Tap any Polaroid to flip it and read the hidden note on the back.</p>
          </div>
          <div class="slr-polaroids-grid">
            ${polaroids.map((p, i) => `
              <figure class="slr-polaroid" style="--tilt:${tilts[i % tilts.length]};transition-delay:${(i * 0.14).toFixed(2)}s;" data-pol="${i}">
                <div class="slr-polaroid-inner">
                  <div class="slr-pol-face slr-pol-front">
                    <img src="${p.image || '/images/sunset.jpg'}" alt="${p.caption || ''}" onerror="this.src='/images/sunset.jpg'" />
                    <figcaption class="slr-pol-cap">${p.caption || 'Always You 🫶'}</figcaption>
                  </div>
                  <div class="slr-pol-face slr-pol-back">
                    <div style="font-size:26px;margin-bottom:10px;">💌</div>
                    <p style="font-size:14px;line-height:1.6;margin:0;font-weight:600;">${p.note || p.caption || 'You mean the world to me.'}</p>
                    <span style="margin-top:14px;font-size:11px;color:#e07a5f;font-weight:800;">Tap to flip back ↺</span>
                  </div>
                </div>
              </figure>
            `).join('')}
          </div>
        </section>

        <!-- ACT VI: PENANCES, PEACE TREATY & CARE COUPONS -->
        <section class="slr-section" id="slrAct6">
          <div style="text-align:center;">
            <span class="slr-eyebrow">CHAPTER VI • PEACE TREATY &amp; REWARDS</span>
            <h2 class="slr-h2">Pick Your Penances &amp; Vouchers</h2>
            <p class="slr-sub">Tap every penance you want me to fulfill and claim your care coupons.</p>
          </div>

          <div class="slr-grid-2">
            <div class="slr-card">
              <div style="font-size:13px;font-weight:800;color:#fbbf24;margin-bottom:12px;">🧋 TAP TO CLAIM PENANCES</div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${penances.map((pen, i) => `
                  <div class="slr-check-item" data-pen="${i}">
                    <span class="slr-check-box">⬜</span>
                    <span style="font-size:13px;line-height:1.45;">${pen}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="slr-card">
              <div style="font-size:13px;font-weight:800;color:#fda4af;margin-bottom:12px;">📜 OFFICIAL PEACE TREATY</div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                ${treatyClauses.map((c, i) => `
                  <div style="font-size:12.5px;line-height:1.5;color:rgba(255,240,230,0.86);">
                    <strong>Clause ${i + 1}:</strong> ${c}
                  </div>
                `).join('')}
              </div>
              <button type="button" class="slr-btn-primary" id="slrSignTreatyBtn" style="margin-top:6px;width:100%;justify-content:center;">
                ✍️ Tap to Ratify Treaty
              </button>
            </div>
          </div>

          <div class="slr-grid-2" style="margin-top:18px;">
            ${coupons.map((cp, i) => `
              <div class="slr-pillar slr-coupon" data-cp="${i}" style="cursor:pointer;">
                <div style="font-size:26px;margin-bottom:6px;">${cp.icon || '🎟️'}</div>
                <div style="font-size:15px;font-weight:800;color:#fff;">${cp.title}</div>
                <p style="font-size:12.5px;color:rgba(255,235,220,0.75);margin:6px 0 8px;">${cp.desc}</p>
                <span class="slr-cp-status" style="font-size:11px;font-weight:800;color:#fbbf24;">Tap to Redeem ✨</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- ACT VII: THE OLIVE BRANCH FINALE (HOLD-TO-HEAL + 3D LANTERNS + CERTIFICATE) -->
        <section class="slr-section" id="slrAct7" style="text-align:center;padding-bottom:110px;">
          <div class="slr-card" id="slrHealCard">
            <span class="slr-eyebrow">CHAPTER VII • THE OLIVE BRANCH</span>
            <h2 class="slr-h2" id="slrHealTitle">Will You Let Me Make It Right?</h2>
            <p class="slr-sub" id="slrHealSub">
              Hold the golden olive branch for 2 seconds to release the sky lanterns and heal our sky.
            </p>

            <button type="button" class="slr-hold-btn" id="slrHoldBtn">
              <div class="slr-hold-fill" id="slrHoldFill"></div>
              <span class="slr-hold-label" id="slrHoldLabel">🕊️ Hold 2s to Forgive &amp; Heal</span>
            </button>

            <div id="slrHealedBox" style="display:none;margin-top:22px;">
              <div style="font-size:40px;margin-bottom:6px;">🕊️💖🏮✨</div>
              <h3 style="font-size:22px;font-weight:800;color:#fde68a;margin:0 0 8px;">Thank You For Grace &amp; Love, ${recipientName}</h3>
              <p style="font-size:14px;color:rgba(255,240,230,0.86);max-width:520px;margin:0 auto 18px;line-height:1.6;">
                Look at the sky lanterns rising behind this page — I promise to treasure your heart gently every day forward.
              </p>
              <button type="button" class="slr-btn-primary" id="slrSaveCertBtn" style="margin-top:0;">
                📸 Save Healing Certificate
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;

  // Music Player
  const musicSlot = container.querySelector('#slrMusicSlot');
  if (data.audioSrc || true) {
    initMusicPlayer(musicSlot, {
      src: data.audioSrc || '/audio/alfaaz.mp3',
      title: data.audioTitle || 'Alfaaz - Hamza Malik & Zain Zohaib',
      subtitle: data.audioSubtitle || "I'M SO SORRY",
    });
  }

  /* ═══════════════════════════════════════════
     THREE.JS PERSISTENT TWILIGHT EMBERS & LANTERNS
     ═══════════════════════════════════════════ */
  const webglHost = container.querySelector('#slrWebglBg');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, (webglHost.clientWidth || window.innerWidth) / (webglHost.clientHeight || window.innerHeight), 0.1, 150);
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({ antialias: !lowDetail, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(webglHost.clientWidth || window.innerWidth, webglHost.clientHeight || window.innerHeight);
  renderer.setPixelRatio(getOptimalPixelRatio(tier));
  webglHost.appendChild(renderer.domElement);

  const particleCount = lowDetail ? 90 : 180;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    speeds[i] = 0.4 + Math.random() * 0.9;
  }
  const emberGeo = new THREE.BufferGeometry();
  emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const emberMat = new THREE.PointsMaterial({
    color: 0xf4a261,
    size: lowDetail ? 0.24 : 0.2,
    transparent: true,
    opacity: 0.78,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const embers = new THREE.Points(emberGeo, emberMat);
  scene.add(embers);

  // 3D Healing Sky Lanterns (released on Hold-to-Heal)
  const lanterns = [];
  const lanternGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.46, 8, 1, true);
  const lanternMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
  function releaseThreeLanterns(count = 10) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(lanternGeo, lanternMat);
      mesh.position.set((Math.random() - 0.5) * 20, -12 - Math.random() * 5, (Math.random() - 0.5) * 8);
      mesh.userData = { vy: 1.4 + Math.random() * 1.1, phase: Math.random() * Math.PI * 2, sharedAsset: true };
      scene.add(mesh);
      lanterns.push(mesh);
    }
  }

  let isHealed = false;
  let scrollProgress = 0;
  const clock = new THREE.Clock();
  const fpsScaler = createAdaptiveFpsScaler(renderer, tier);
  let rafId = null;

  const animateThree = () => {
    rafId = requestAnimationFrame(animateThree);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    fpsScaler.tick(dt);

    const posAttr = emberGeo.attributes.position;
    const arr = posAttr.array;
    const driftSpeed = isHealed ? 1.55 : 0.65;
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3 + 1] += dt * speeds[i] * driftSpeed;
      arr[i * 3] += Math.sin(elapsed * 0.8 + i) * dt * 0.22;
      if (arr[i * 3 + 1] > 13) arr[i * 3 + 1] = -13;
    }
    posAttr.needsUpdate = true;

    emberMat.color.setHex(isHealed ? 0xfbbf24 : 0xf4a261);
    embers.rotation.y = scrollProgress * 0.45;

    for (let i = lanterns.length - 1; i >= 0; i--) {
      const l = lanterns[i];
      l.position.y += l.userData.vy * dt;
      l.position.x += Math.sin(elapsed + l.userData.phase) * dt * 0.35;
      if (l.position.y > 14) l.position.y = -13;
    }

    renderer.render(scene, camera);
  };
  animateThree();

  const onResize = () => {
    const nw = webglHost.clientWidth || window.innerWidth;
    const nh = webglHost.clientHeight || window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize);

  /* ═══════════════════════════════════════════
     LENIS SMOOTH SCROLL + LOVABLE SCROLL-DRIVEN
     ILLUMINATED LETTER (Td) & IN-VIEW REVEALS
     ═══════════════════════════════════════════ */
  let lenis = null;
  try {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const lenisRaf = (time) => {
      lenis?.raf(time);
      if (lenis) requestAnimationFrame(lenisRaf);
    };
    requestAnimationFrame(lenisRaf);
  } catch {}

  const wordEls = Array.from(container.querySelectorAll('.slr-letter-word'));
  const letterTrack = container.querySelector('#slrAct2');
  const navPills = Array.from(container.querySelectorAll('.slr-nav-pill[data-target]'));
  const sectionEls = ['#slrAct1', '#slrAct2', '#slrAct3', '#slrAct4', '#slrAct5', '#slrAct6', '#slrAct7']
    .map((sel) => container.querySelector(sel))
    .filter(Boolean);

  const onScrollUpdate = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    // Lovable Td sticky letter word illumination
    if (letterTrack && wordEls.length > 0) {
      const rect = letterTrack.getBoundingClientRect();
      const totalDist = Math.max(1, letterTrack.offsetHeight - window.innerHeight);
      const rawProg = Math.min(1, Math.max(0, -rect.top / totalDist));
      const norm = Math.min(1, Math.max(0, (rawProg - 0.04) / 0.88));
      const litCount = Math.round(norm * wordEls.length);
      for (let i = 0; i < wordEls.length; i++) {
        wordEls[i].classList.toggle('lit', i < litCount);
      }
    }

    // Active chapter pill
    let activeIdx = 0;
    for (let i = 0; i < sectionEls.length; i++) {
      const r = sectionEls[i].getBoundingClientRect();
      if (r.top <= window.innerHeight * 0.42) activeIdx = i;
    }
    navPills.forEach((pill, i) => pill.classList.toggle('active', i === activeIdx));
  };
  window.addEventListener('scroll', onScrollUpdate, { passive: true });
  onScrollUpdate();

  // In-view Observer for Lovable vd sections & Cd cascading polaroids
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.querySelectorAll('.slr-polaroid').forEach((pol) => pol.classList.add('shown'));
        }
      });
    },
    { threshold: 0.16 }
  );
  container.querySelectorAll('.slr-section').forEach((sec) => io.observe(sec));

  // Chapter Nav + Hero CTA
  navPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = container.querySelector(pill.getAttribute('data-target'));
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -58 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  container.querySelector('#slrBtnBegin').addEventListener('click', () => {
    const act2 = container.querySelector('#slrAct2');
    if (act2) {
      if (lenis) lenis.scrollTo(act2, { offset: -20 });
      else act2.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Candle Gateway + Wax Seal
  const candleEl = container.querySelector('#slrCandle');
  const candleTip = container.querySelector('#slrCandleTip');
  candleEl.addEventListener('click', () => {
    candleEl.classList.add('lit');
    candleTip.textContent = '✨ Candle lit — my heart is open to you';
    playSound('candle');
    const audioEl = musicSlot.querySelector('audio');
    if (audioEl && audioEl.paused) audioEl.play().catch(() => {});
  });
  const waxSeal = container.querySelector('#slrWaxSeal');
  waxSeal.addEventListener('click', () => {
    waxSeal.classList.toggle('unsealed');
    playSound('chime');
    wordEls.forEach((w) => w.classList.add('lit'));
  });

  // Act III: Venting Room
  let anger = 100;
  const angerVal = container.querySelector('#slrAngerVal');
  const angerFill = container.querySelector('#slrAngerFill');
  const targetFrame = container.querySelector('#slrTargetFrame');
  const decalLayer = container.querySelector('#slrDecalLayer');
  const ventBubble = container.querySelector('#slrVentBubble');
  const ventQuotes = [
    '"Ouch! Okay I deserved that one 🥺"',
    '"Still here, still sorry, still yours 💔"',
    '"Feeling a little lighter yet? 🫶"',
    '"Zero complaints—take all the time you need 🕊️"',
  ];

  container.querySelectorAll('.slr-arsenal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const fx = btn.getAttribute('data-fx');
      const emoji = btn.getAttribute('data-emoji');
      playSound(fx);
      anger = Math.max(0, anger - 14);
      angerFill.style.width = `${anger}%`;
      angerVal.textContent = anger === 0 ? '0% CALM & HEALED 🕊️' : `${anger}% FURIOUS`;

      const decal = document.createElement('span');
      decal.className = 'slr-decal';
      decal.textContent = emoji;
      decal.style.left = `${20 + Math.random() * 60}%`;
      decal.style.top = `${20 + Math.random() * 60}%`;
      decalLayer.appendChild(decal);

      gsap.fromTo(targetFrame, { x: -7, rotation: -3 }, { x: 0, rotation: 0, duration: 0.32, ease: 'elastic.out(1, 0.35)' });
      ventBubble.textContent = ventQuotes[Math.floor(Math.random() * ventQuotes.length)];
    });
  });

  container.querySelector('#slrWipeBtn').addEventListener('click', () => {
    decalLayer.innerHTML = '';
    playSound('chime');
  });

  // Act V: Flip Polaroids
  container.querySelectorAll('.slr-polaroid').forEach((pol) => {
    pol.addEventListener('click', () => {
      pol.classList.toggle('flipped');
      playSound('chime');
    });
  });

  // Act VI: Penances, Treaty & Coupons
  container.querySelectorAll('.slr-check-item').forEach((item) => {
    item.addEventListener('click', () => {
      const claimed = item.classList.toggle('claimed');
      item.querySelector('.slr-check-box').textContent = claimed ? '✅' : '⬜';
      playSound('chime');
    });
  });

  const treatyBtn = container.querySelector('#slrSignTreatyBtn');
  treatyBtn.addEventListener('click', () => {
    treatyBtn.textContent = `🕊️ Ratified by ${recipientName} & ${senderName} ✓`;
    treatyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    playSound('victory');
    confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
  });

  container.querySelectorAll('.slr-coupon').forEach((cp) => {
    cp.addEventListener('click', () => {
      const st = cp.querySelector('.slr-cp-status');
      st.textContent = '✓ Voucher Claimed — Show Screenshot!';
      st.style.color = '#4ade80';
      playSound('chime');
    });
  });

  // Act VII: Hold-to-Heal Olive Branch
  const holdBtn = container.querySelector('#slrHoldBtn');
  const holdFill = container.querySelector('#slrHoldFill');
  const holdLabel = container.querySelector('#slrHoldLabel');
  const healedBox = container.querySelector('#slrHealedBox');
  const ambientTint = container.querySelector('#slrAmbientTint');
  let holdTimer = null;
  let holdStart = 0;

  function completeHealing() {
    if (isHealed) return;
    isHealed = true;
    holdBtn.style.display = 'none';
    healedBox.style.display = 'block';
    ambientTint.classList.add('healed');
    playSound('victory');
    releaseThreeLanterns(14);
    confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
    confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });
  }

  const startHold = (e) => {
    if (isHealed) return;
    e.preventDefault();
    holdStart = performance.now();
    holdLabel.textContent = '✨ Keep holding...';
    clearInterval(holdTimer);
    holdTimer = setInterval(() => {
      const pct = Math.min(100, ((performance.now() - holdStart) / 1800) * 100);
      holdFill.style.width = `${pct}%`;
      if (pct >= 100) {
        clearInterval(holdTimer);
        completeHealing();
      }
    }, 30);
  };
  const cancelHold = () => {
    if (isHealed) return;
    clearInterval(holdTimer);
    holdFill.style.width = '0%';
    holdLabel.textContent = '🕊️ Hold 2s to Forgive & Heal';
  };

  holdBtn.addEventListener('pointerdown', startHold);
  holdBtn.addEventListener('pointerup', cancelHold);
  holdBtn.addEventListener('pointerleave', cancelHold);
  holdBtn.addEventListener('pointercancel', cancelHold);

  container.querySelector('#slrSaveCertBtn').addEventListener('click', async () => {
    const card = container.querySelector('#slrHealCard');
    if (!card) return;
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#171115', scale: 2 });
      const link = document.createElement('a');
      link.download = `peace-certificate-${recipientName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {}
  });

  // Cleanup
  container._cleanup = () => {
    cancelAnimationFrame(rafId);
    clearInterval(holdTimer);
    io.disconnect();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScrollUpdate);
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
    disposeThreeScene(scene, renderer);
    if (renderer.domElement.parentNode === webglHost) {
      webglHost.removeChild(renderer.domElement);
    }
  };
}
