// src/viewer/templates/sorryTemplate.js — Page-by-Page Three.js Midnight Rose Apology Sanctuary
// Zero page-scroll: 7 full-screen animated chapters with GSAP dynamic transitions,
// Three.js moonlit starlight + drifting rose petals + 3D healing lanterns,
// auto-illuminated wax-sealed letter, tactile venting room, flip polaroids, peace treaty & hold-to-heal finale.

import * as THREE from 'three';
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

const STYLE_ID = 'sorry-midnight-rose-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .smr-stage {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: radial-gradient(125% 95% at 50% 12%, #191f42 0%, #0d1026 55%, #060814 100%);
      color: #f8f5ff;
      font-family: 'Nunito', system-ui, -apple-system, sans-serif;
      transition: background 1.1s ease;
    }
    .smr-stage.healed {
      background: radial-gradient(125% 95% at 50% 12%, #2a1738 0%, #19122d 55%, #0a0918 100%);
    }
    .smr-webgl {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .smr-aurora {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background:
        radial-gradient(circle at 20% 25%, rgba(251, 113, 133, 0.14), transparent 45%),
        radial-gradient(circle at 80% 75%, rgba(167, 139, 250, 0.14), transparent 50%);
      transition: opacity 0.8s ease;
    }
    .smr-topbar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .smr-topbar > * {
      pointer-events: auto;
    }
    .smr-dots {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(13, 16, 38, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(251, 113, 133, 0.24);
    }
    .smr-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      border: none;
      padding: 0;
      background: rgba(255, 255, 255, 0.25);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .smr-dot.active {
      width: 24px;
      background: linear-gradient(90deg, #fb7185, #f5d08a);
      box-shadow: 0 0 10px rgba(251, 113, 133, 0.65);
    }
    .smr-pages {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
    }
    .smr-page {
      position: absolute;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 68px 16px 26px;
      box-sizing: border-box;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .smr-page::-webkit-scrollbar { display: none; }
    .smr-page.active {
      display: flex;
    }
    .smr-inner {
      width: 100%;
      max-width: 820px;
      margin: auto;
      text-align: center;
    }
    .smr-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      color: #fda4af;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(251, 113, 133, 0.14);
      border: 1px solid rgba(251, 113, 133, 0.32);
      margin-bottom: 12px;
    }
    .smr-h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2.1rem, 5.5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 12px;
      background: linear-gradient(135deg, #ffffff 0%, #fda4af 52%, #f5d08a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .smr-h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.5rem, 3.8vw, 2.3rem);
      font-weight: 800;
      margin: 0 0 8px;
      color: #fff;
    }
    .smr-sub {
      font-size: clamp(0.92rem, 2vw, 1.06rem);
      color: rgba(236, 232, 255, 0.78);
      line-height: 1.6;
      max-width: 580px;
      margin: 0 auto;
    }
    .smr-glass {
      background: rgba(16, 20, 46, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(251, 113, 133, 0.24);
      border-radius: 24px;
      padding: clamp(18px, 3vw, 30px);
      box-shadow: 0 22px 54px rgba(3, 5, 16, 0.6);
    }
    .smr-nav-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .smr-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 999px;
      border: 1px solid rgba(253, 164, 175, 0.45);
      background: linear-gradient(135deg, #f43f5e, #ec4899);
      color: #fff;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(244, 63, 94, 0.36);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .smr-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(244, 63, 94, 0.5); }
    .smr-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    /* Page 1: Moonlit Rose & Candle */
    .smr-moon-orb {
      width: 112px;
      height: 112px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #fff1f2 0%, #fda4af 45%, #be185d 100%);
      box-shadow: 0 0 36px rgba(251, 113, 133, 0.55), 0 0 80px rgba(244, 63, 94, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 46px;
      cursor: pointer;
      animation: smrFloat 3.4s ease-in-out infinite;
    }
    @keyframes smrFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-8px) scale(1.04); }
    }

    /* Page 2: Animated Confession Letter */
    .smr-seal {
      width: 56px;
      height: 56px;
      margin: -46px auto 14px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fb7185, #be123c);
      border: 2px solid rgba(255, 228, 230, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(190, 18, 60, 0.55);
      transition: transform 0.35s ease;
    }
    .smr-seal.open {
      transform: scale(0.9) rotate(16deg);
      background: radial-gradient(circle at 35% 35%, #fde68a, #d97706);
    }
    .smr-word {
      display: inline-block;
      margin-right: 0.26em;
      opacity: 0.14;
      transform: translateY(4px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .smr-word.lit {
      opacity: 1;
      transform: translateY(0);
    }

    /* Page 3: Venting Room */
    .smr-meter {
      width: 100%;
      height: 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      overflow: hidden;
      margin: 8px 0 14px;
    }
    .smr-meter-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #34d399, #f5d08a, #fb7185);
      transition: width 0.3s ease;
    }
    .smr-target {
      position: relative;
      width: 175px;
      height: 175px;
      margin: 0 auto 10px;
      border-radius: 20px;
      overflow: hidden;
      border: 2.5px solid rgba(251, 113, 133, 0.55);
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55);
    }
    .smr-target img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .smr-decal-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
    .smr-decal { position: absolute; font-size: 28px; transform: translate(-50%, -50%); }
    .smr-arsenal {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }
    .smr-arsenal-btn {
      padding: 8px 12px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .smr-arsenal-btn:hover { background: rgba(251, 113, 133, 0.25); }

    /* Page 4 & 6 Grids */
    .smr-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 12px;
      margin-top: 16px;
      text-align: left;
    }
    .smr-pill-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(251, 113, 133, 0.22);
      border-radius: 16px;
      padding: 14px 16px;
    }

    /* Page 5: Flip Polaroid Carousel/Grid */
    .smr-pol-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
      gap: 16px;
      margin-top: 18px;
    }
    .smr-pol {
      perspective: 900px;
      cursor: pointer;
    }
    .smr-pol-inner {
      position: relative;
      width: 100%;
      height: 245px;
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .smr-pol.flipped .smr-pol-inner { transform: rotateY(180deg); }
    .smr-pol-face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 14px;
      padding: 10px 10px 14px;
      background: #fff8fa;
      color: #1f172b;
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.48);
      display: flex;
      flex-direction: column;
    }
    .smr-pol-front img { width: 100%; height: 175px; object-fit: cover; border-radius: 8px; }
    .smr-pol-back {
      transform: rotateY(180deg);
      background: linear-gradient(150deg, #fff1f5, #fce7f3);
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 18px;
    }

    /* Page 6: Penances */
    .smr-check {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      font-size: 12.5px;
    }
    .smr-check.claimed {
      background: rgba(52, 211, 153, 0.16);
      border-color: rgba(52, 211, 153, 0.45);
    }

    /* Page 7: Hold-to-Heal */
    .smr-hold-btn {
      position: relative;
      width: min(300px, 90%);
      height: 58px;
      margin: 20px auto 0;
      border-radius: 999px;
      border: 1.5px solid rgba(245, 208, 138, 0.6);
      background: rgba(18, 22, 48, 0.9);
      color: #fff;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: none;
    }
    .smr-hold-fill {
      position: absolute;
      inset: 0;
      width: 0%;
      background: linear-gradient(90deg, #f43f5e, #f5d08a);
      z-index: 0;
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

    if (type === 'chime') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.13, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.34);
      });
    } else if (type === 'punch' || type === 'splat' || type === 'whack' || type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'whack' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(type === 'punch' ? 140 : 360, now);
      osc.frequency.exponentialRampToValueAtTime(type === 'boing' ? 420 : 60, now + 0.18);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'victory') {
      [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.16, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.55);
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
  const heroSubtitle = data.heroSubtitle || "The night feels quiet and incomplete whenever you're hurt 🥺";
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

  container.innerHTML = `
    <div class="smr-stage" id="smrStage">
      <div class="smr-webgl" id="smrWebgl"></div>
      <div class="smr-aurora"></div>

      <!-- Top Progress Dots + Audio Player -->
      <header class="smr-topbar">
        <div class="smr-dots" id="smrDots">
          ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<button type="button" class="smr-dot ${n === 1 ? 'active' : ''}" data-go="${n}" title="Page ${n}"></button>`).join('')}
        </div>
        <div id="smrMusicMount"></div>
      </header>

      <div class="smr-pages">
        <!-- PAGE 1: MOONLIT ROSE GATEWAY -->
        <section class="smr-page active" data-page="1">
          <div class="smr-inner">
            <div class="smr-moon-orb" id="smrMoonOrb" role="button" tabindex="0" title="Tap to awaken the moonlight">🌹</div>
            <span class="smr-eyebrow">PAGE 1 OF 7 • MOONLIT APOLOGY</span>
            <h1 class="smr-h1">${heroTitle}</h1>
            <p class="smr-sub">${heroSubtitle}</p>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn" data-go="2">Open My Heart ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 2: WAX-SEALED ANIMATED LETTER -->
        <section class="smr-page" data-page="2">
          <div class="smr-inner">
            <div class="smr-glass" style="margin-top:24px;text-align:left;">
              <div class="smr-seal" id="smrSeal" role="button" tabindex="0" title="Tap to unseal & animate">🕊️</div>
              <span class="smr-eyebrow">PAGE 2 OF 7 • SINCERE CONFESSION</span>
              <div style="font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;color:#f5d08a;margin-bottom:10px;">
                Dearest ${recipientName},
              </div>
              <p id="smrLetterBody" style="font-size:clamp(0.95rem,2vw,1.1rem);line-height:1.72;margin:0 0 16px;">
                ${letterWords.map((w) => `<span class="smr-word">${w}</span>`).join(' ')}
              </p>
              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.12);padding-top:12px;">
                <span style="font-size:12px;color:rgba(255,255,255,0.7);">Always yours,</span>
                <strong style="color:#fda4af;">${senderName} 🫶</strong>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="1">❮ Back</button>
              <button type="button" class="smr-btn" data-go="3">Enter Vent Room ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 3: TACTILE VENTING ROOM -->
        <section class="smr-page" data-page="3">
          <div class="smr-inner">
            <span class="smr-eyebrow">PAGE 3 OF 7 • LET IT ALL OUT</span>
            <h2 class="smr-h2">Take Your Anger Out On Me 🥊</h2>
            <div class="smr-glass" style="margin-top:12px;">
              <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:800;">
                <span>🔥 ANGER LEVEL</span>
                <span id="smrAngerVal" style="color:#fda4af;">100% FURIOUS</span>
              </div>
              <div class="smr-meter"><div class="smr-meter-fill" id="smrAngerFill" style="width:100%;"></div></div>
              <div class="smr-target" id="smrTarget">
                <img src="${creatorPhoto}" alt="${senderName}" onerror="this.src='/images/always_you.jpg'" />
                <div class="smr-decal-layer" id="smrDecals"></div>
              </div>
              <div id="smrVentQuote" style="font-size:12.5px;font-style:italic;color:#f5d08a;margin-bottom:8px;">
                "I'm right here listening... throw whatever you want 🥺"
              </div>
              <button type="button" class="smr-btn-ghost" id="smrWipe" style="padding:5px 12px;font-size:11px;">🧻 Wipe Clean</button>
              <div class="smr-arsenal">
                <button type="button" class="smr-arsenal-btn" data-fx="punch" data-emoji="💥">🥊 Punch</button>
                <button type="button" class="smr-arsenal-btn" data-fx="splat" data-emoji="🍅">🍅 Tomato</button>
                <button type="button" class="smr-arsenal-btn" data-fx="whack" data-emoji="🩴">🩴 Chappal</button>
                <button type="button" class="smr-arsenal-btn" data-fx="splat" data-emoji="🧋">🧋 Boba</button>
                <button type="button" class="smr-arsenal-btn" data-fx="boing" data-emoji="🧸">🧸 Teddy</button>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="2">❮ Back</button>
              <button type="button" class="smr-btn" data-go="4">My Promises ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 4: SACRED PROMISES & REASONS -->
        <section class="smr-page" data-page="4">
          <div class="smr-inner">
            <span class="smr-eyebrow">PAGE 4 OF 7 • ACCOUNTABILITY</span>
            <h2 class="smr-h2">Why Us &amp; What I Promise</h2>
            <div class="smr-grid-2">
              ${reasonsToForgive.map((r, i) => `
                <div class="smr-pill-card">
                  <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;color:#f5d08a;margin-bottom:4px;">WHY WE MATTER • 0${i + 1}</div>
                  <p style="margin:0;font-size:13px;line-height:1.5;">${r}</p>
                </div>
              `).join('')}
            </div>
            <div class="smr-glass" style="margin-top:14px;text-align:left;padding:16px 20px;">
              <div style="font-size:11px;font-weight:800;letter-spacing:1.2px;color:#fda4af;margin-bottom:8px;">🛡️ MY SACRED PROMISES</div>
              ${promises.map((p) => `<div style="font-size:13px;line-height:1.5;margin-bottom:5px;">✦ ${p}</div>`).join('')}
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="3">❮ Back</button>
              <button type="button" class="smr-btn" data-go="5">Our Memories ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 5: 3D FLIP POLAROIDS -->
        <section class="smr-page" data-page="5">
          <div class="smr-inner">
            <span class="smr-eyebrow">PAGE 5 OF 7 • CHERISHED MEMORIES</span>
            <h2 class="smr-h2">Tap Any Photo to Flip 💌</h2>
            <div class="smr-pol-grid">
              ${polaroids.map((p) => `
                <div class="smr-pol">
                  <div class="smr-pol-inner">
                    <div class="smr-pol-face smr-pol-front">
                      <img src="${p.image || '/images/sunset.jpg'}" alt="" onerror="this.src='/images/sunset.jpg'" />
                      <div style="margin-top:8px;font-size:12px;font-weight:800;">${p.caption || 'Always You 🫶'}</div>
                    </div>
                    <div class="smr-pol-face smr-pol-back">
                      <div style="font-size:22px;margin-bottom:8px;">💌</div>
                      <p style="font-size:13px;line-height:1.5;margin:0;font-weight:700;">${p.note || p.caption || 'You mean everything to me.'}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="4">❮ Back</button>
              <button type="button" class="smr-btn" data-go="6">Peace Treaty ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 6: PENANCES, PEACE TREATY & COUPONS -->
        <section class="smr-page" data-page="6">
          <div class="smr-inner">
            <span class="smr-eyebrow">PAGE 6 OF 7 • PEACE TREATY</span>
            <h2 class="smr-h2">Claim Penances &amp; Vouchers</h2>
            <div class="smr-grid-2">
              <div class="smr-glass" style="padding:16px;">
                <div style="font-size:12px;font-weight:800;color:#f5d08a;margin-bottom:8px;">🧋 TAP TO CLAIM PENANCES</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                  ${penances.map((pen) => `<div class="smr-check"><span class="smr-chk">⬜</span><span>${pen}</span></div>`).join('')}
                </div>
              </div>
              <div class="smr-glass" style="padding:16px;">
                <div style="font-size:12px;font-weight:800;color:#fda4af;margin-bottom:8px;">📜 TREATY &amp; COUPONS</div>
                ${treatyClauses.slice(0, 3).map((c, i) => `<div style="font-size:12px;line-height:1.45;margin-bottom:6px;"><strong>${i + 1}.</strong> ${c}</div>`).join('')}
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0;">
                  ${coupons.map((cp) => `<button type="button" class="smr-arsenal-btn smr-coupon-btn">${cp.icon || '🎟️'} ${cp.title}</button>`).join('')}
                </div>
                <button type="button" class="smr-btn" id="smrTreatyBtn" style="width:100%;justify-content:center;padding:9px 14px;font-size:13px;">✍️ Ratify Peace Treaty</button>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="5">❮ Back</button>
              <button type="button" class="smr-btn" data-go="7">Final Healing ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 7: HOLD-TO-HEAL THREE.JS LANTERNS FINALE -->
        <section class="smr-page" data-page="7">
          <div class="smr-inner">
            <div class="smr-glass" id="smrHealCard">
              <span class="smr-eyebrow">PAGE 7 OF 7 • THE OLIVE BRANCH</span>
              <h2 class="smr-h2">Will You Let Me Make It Right?</h2>
              <p class="smr-sub">Hold for 2 seconds to release the 3D rose lanterns and seal our peace.</p>
              <button type="button" class="smr-hold-btn" id="smrHoldBtn">
                <div class="smr-hold-fill" id="smrHoldFill"></div>
                <span style="position:relative;z-index:1;" id="smrHoldLabel">🕊️ Hold 2s to Forgive &amp; Heal</span>
              </button>
              <div id="smrHealedBox" style="display:none;margin-top:18px;">
                <div style="font-size:38px;margin-bottom:6px;">🌹✨🕊️💖</div>
                <h3 style="font-size:20px;font-weight:800;color:#f5d08a;margin:0 0 8px;">Thank You, ${recipientName}</h3>
                <p style="font-size:13px;color:rgba(255,240,250,0.86);margin:0 0 14px;">Our sky is bright again. I promise to cherish your heart gently every day.</p>
                <button type="button" class="smr-btn" id="smrCertBtn">📸 Save Healing Certificate</button>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="6">❮ Back</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  // Music Player
  const musicMount = container.querySelector('#smrMusicMount');
  initMusicPlayer(musicMount, {
    src: data.audioSrc || '/audio/alfaaz.mp3',
    title: data.audioTitle || 'Alfaaz - Hamza Malik & Zain Zohaib',
    subtitle: data.audioSubtitle || "I'M SO SORRY",
  });

  /* ═══════════════════════════════════════════
     THREE.JS 3D STARLIGHT + ROSE PETALS + LANTERNS
     ═══════════════════════════════════════════ */
  const webglHost = container.querySelector('#smrWebgl');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, (webglHost.clientWidth || window.innerWidth) / (webglHost.clientHeight || window.innerHeight), 0.1, 150);
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({ antialias: !lowDetail, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(webglHost.clientWidth || window.innerWidth, webglHost.clientHeight || window.innerHeight);
  renderer.setPixelRatio(getOptimalPixelRatio(tier));
  webglHost.appendChild(renderer.domElement);

  const count = lowDetail ? 85 : 170;
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 34;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    vel[i] = 0.35 + Math.random() * 0.85;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xfda4af,
    size: lowDetail ? 0.24 : 0.2,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  scene.add(starPoints);

  const lanterns = [];
  const lanternGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.46, 8, 1, true);
  const lanternMat = new THREE.MeshBasicMaterial({ color: 0xf5d08a, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  function spawnLanterns(n = 12) {
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(lanternGeo, lanternMat);
      m.position.set((Math.random() - 0.5) * 20, -11 - Math.random() * 5, (Math.random() - 0.5) * 8);
      m.userData = { vy: 1.4 + Math.random() * 1.1, phase: Math.random() * Math.PI * 2, sharedAsset: true };
      scene.add(m);
      lanterns.push(m);
    }
  }

  let isHealed = false;
  let targetCamZ = 18;
  const clock = new THREE.Clock();
  const fpsScaler = createAdaptiveFpsScaler(renderer, tier);
  let rafId = null;

  const animateThree = () => {
    rafId = requestAnimationFrame(animateThree);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    fpsScaler.tick(dt);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 1 - Math.exp(-4 * dt));
    const arr = starGeo.attributes.position.array;
    const speedMult = isHealed ? 1.7 : 0.7;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += dt * vel[i] * speedMult;
      arr[i * 3] += Math.sin(elapsed * 0.7 + i) * dt * 0.25;
      if (arr[i * 3 + 1] > 13) arr[i * 3 + 1] = -13;
    }
    starGeo.attributes.position.needsUpdate = true;
    starPoints.rotation.y += dt * 0.05;
    starMat.color.setHex(isHealed ? 0xf5d08a : 0xfda4af);

    for (let i = 0; i < lanterns.length; i++) {
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
     PAGE-BY-PAGE DYNAMIC TRANSITIONS (ZERO SCROLL)
     ═══════════════════════════════════════════ */
  let currentPage = 1;
  const pages = Array.from(container.querySelectorAll('.smr-page'));
  const dots = Array.from(container.querySelectorAll('.smr-dot'));
  const wordEls = Array.from(container.querySelectorAll('.smr-word'));
  let letterInterval = null;

  function animateLetterWords() {
    clearInterval(letterInterval);
    wordEls.forEach((w) => w.classList.remove('lit'));
    let idx = 0;
    letterInterval = setInterval(() => {
      if (idx < wordEls.length) {
        wordEls[idx].classList.add('lit');
        idx++;
      } else {
        clearInterval(letterInterval);
      }
    }, 55);
  }

  function goToPage(nextNum) {
    const n = Math.max(1, Math.min(7, Number(nextNum)));
    if (n === currentPage) return;
    const dir = n > currentPage ? 1 : -1;
    const prevEl = pages[currentPage - 1];
    const nextEl = pages[n - 1];
    currentPage = n;

    dots.forEach((d, idx) => d.classList.toggle('active', idx + 1 === n));
    targetCamZ = 18 - (n - 1) * 0.6;
    gsap.to(starPoints.rotation, { y: starPoints.rotation.y + dir * 0.65, duration: 0.9, ease: 'power2.out' });

    gsap.killTweensOf(prevEl);
    gsap.killTweensOf(nextEl);
    gsap.to(prevEl, {
      opacity: 0,
      scale: 0.94,
      x: -dir * 40,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        prevEl.classList.remove('active');
        prevEl.style.display = 'none';
      },
    });

    nextEl.style.display = 'flex';
    nextEl.classList.add('active');
    nextEl.scrollTop = 0;
    gsap.fromTo(
      nextEl,
      { opacity: 0, scale: 1.05, x: dir * 48 },
      { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: 'power3.out' }
    );

    if (n === 2) animateLetterWords();
  }

  container.querySelectorAll('[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('chime');
      goToPage(btn.getAttribute('data-go'));
    });
  });

  // Page 1 Moonlit Orb
  container.querySelector('#smrMoonOrb').addEventListener('click', () => {
    playSound('chime');
    gsap.fromTo('#smrMoonOrb', { scale: 0.85 }, { scale: 1.08, duration: 0.4, ease: 'back.out(2)' });
    const audioEl = musicMount.querySelector('audio');
    if (audioEl && audioEl.paused) audioEl.play().catch(() => {});
  });

  // Page 2 Seal
  const seal = container.querySelector('#smrSeal');
  seal.addEventListener('click', () => {
    seal.classList.add('open');
    playSound('chime');
    animateLetterWords();
  });

  // Page 3 Venting Room
  let anger = 100;
  const angerVal = container.querySelector('#smrAngerVal');
  const angerFill = container.querySelector('#smrAngerFill');
  const decals = container.querySelector('#smrDecals');
  const target = container.querySelector('#smrTarget');
  const ventQuote = container.querySelector('#smrVentQuote');
  const quotes = ['"Okay I deserved that 🥺"', '"Still sorry, still yours 💖"', '"Feeling lighter yet? 🫶"', '"Take all the time you need 🕊️"'];

  container.querySelectorAll('.smr-arsenal-btn[data-fx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound(btn.getAttribute('data-fx'));
      anger = Math.max(0, anger - 16);
      angerFill.style.width = `${anger}%`;
      angerVal.textContent = anger === 0 ? '0% CALM & HEALED 🕊️' : `${anger}% FURIOUS`;
      const d = document.createElement('span');
      d.className = 'smr-decal';
      d.textContent = btn.getAttribute('data-emoji');
      d.style.left = `${20 + Math.random() * 60}%`;
      d.style.top = `${20 + Math.random() * 60}%`;
      decals.appendChild(d);
      gsap.fromTo(target, { x: -8, rotation: -3 }, { x: 0, rotation: 0, duration: 0.3, ease: 'elastic.out(1, 0.35)' });
      ventQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    });
  });
  container.querySelector('#smrWipe').addEventListener('click', () => { decals.innerHTML = ''; playSound('chime'); });

  // Page 5 Flip Polaroids
  container.querySelectorAll('.smr-pol').forEach((p) => {
    p.addEventListener('click', () => { p.classList.toggle('flipped'); playSound('chime'); });
  });

  // Page 6 Penances, Coupons & Treaty
  container.querySelectorAll('.smr-check').forEach((c) => {
    c.addEventListener('click', () => {
      const ok = c.classList.toggle('claimed');
      c.querySelector('.smr-chk').textContent = ok ? '✅' : '⬜';
      playSound('chime');
    });
  });
  container.querySelectorAll('.smr-coupon-btn').forEach((b) => {
    b.addEventListener('click', () => {
      b.style.borderColor = '#34d399';
      b.style.background = 'rgba(52,211,153,0.22)';
      playSound('chime');
    });
  });
  const treatyBtn = container.querySelector('#smrTreatyBtn');
  treatyBtn.addEventListener('click', () => {
    treatyBtn.textContent = `🕊️ Ratified by ${recipientName} & ${senderName} ✓`;
    treatyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    playSound('victory');
    confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
  });

  // Page 7 Hold-to-Heal
  const stage = container.querySelector('#smrStage');
  const holdBtn = container.querySelector('#smrHoldBtn');
  const holdFill = container.querySelector('#smrHoldFill');
  const holdLabel = container.querySelector('#smrHoldLabel');
  const healedBox = container.querySelector('#smrHealedBox');
  let holdTimer = null;
  let holdStart = 0;

  function completeHeal() {
    if (isHealed) return;
    isHealed = true;
    stage.classList.add('healed');
    holdBtn.style.display = 'none';
    healedBox.style.display = 'block';
    playSound('victory');
    spawnLanterns(14);
    confetti({ particleCount: 75, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
    confetti({ particleCount: 75, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });
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
      if (pct >= 100) { clearInterval(holdTimer); completeHeal(); }
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

  container.querySelector('#smrCertBtn').addEventListener('click', async () => {
    try {
      const canvas = await html2canvas(container.querySelector('#smrHealCard'), { backgroundColor: '#0d1026', scale: 2 });
      const link = document.createElement('a');
      link.download = `peace-certificate-${recipientName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {}
  });

  container._cleanup = () => {
    cancelAnimationFrame(rafId);
    clearInterval(letterInterval);
    clearInterval(holdTimer);
    window.removeEventListener('resize', onResize);
    disposeThreeScene(scene, renderer);
    if (renderer.domElement.parentNode === webglHost) {
      webglHost.removeChild(renderer.domElement);
    }
  };
}
