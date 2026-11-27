// src/viewer/templates/sorryTemplate.js — Flagship 3D Moonlit Sanctuary Apology Experience
// Matching Our Museum & Long Romance craft:
// - Real-time Three.js Moonlit Sanctuary (full moon + halo, rippling reflective water, lantern arch,
//   3D Kintsugi rose-gold beating heart, chapter camera choreography, rising sky lanterns)
// - 7 Zero-scroll GSAP-animated chapters with keyboard & button navigation
// - Wax-sealed illuminated confession letter with golden ember sparks
// - Tactile Vent Room with animated flying props, floating impact popups, 3D camera shake & mood warming
// - Constellation of Reasons & ignitable 3D Promise Lanterns
// - 3D Flip Polaroids with html2canvas keepsake card download
// - Official Drawable Peace Treaty Signature Canvas + Wax Stamp + Claimable Penances & Coupons
// - Hold-to-Heal 3D Lantern Release Finale + Official Peace Certificate PNG download

import gsap from 'gsap';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { createSorryThreeScene } from './sorryThreeScene.js';

const STYLE_ID = 'sorry-midnight-rose-styles';

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .smr-stage {
      position: relative;
      width: 100%;
      height: 100dvh;
      min-height: 100vh;
      overflow: hidden;
      background: radial-gradient(125% 95% at 50% 10%, #161c3d 0%, #0b0f24 55%, #050712 100%);
      color: #f8f5ff;
      font-family: 'Nunito', 'Inter', system-ui, -apple-system, sans-serif;
      transition: background 1.2s ease;
    }
    .smr-stage.healed {
      background: radial-gradient(125% 95% at 50% 10%, #34193f 0%, #1d1130 55%, #0a0818 100%);
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
        radial-gradient(circle at 22% 24%, rgba(251, 113, 133, 0.14), transparent 46%),
        radial-gradient(circle at 78% 76%, rgba(245, 208, 138, 0.12), transparent 50%);
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
    .smr-topbar > * { pointer-events: auto; }
    .smr-dots {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 999px;
      background: rgba(11, 15, 36, 0.76);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(251, 113, 133, 0.28);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .smr-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      border: none;
      padding: 0;
      background: rgba(255, 255, 255, 0.25);
      cursor: pointer;
      transition: all 0.28s ease;
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
      padding: 68px 16px 28px;
      box-sizing: border-box;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .smr-page::-webkit-scrollbar { display: none; }
    .smr-page.active { display: flex; }
    .smr-inner {
      width: 100%;
      max-width: 840px;
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
      border: 1px solid rgba(251, 113, 133, 0.34);
      margin-bottom: 12px;
    }
    .smr-h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2.15rem, 5.5vw, 3.85rem);
      font-weight: 800;
      line-height: 1.08;
      margin: 0 0 12px;
      background: linear-gradient(135deg, #ffffff 0%, #fda4af 52%, #f5d08a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .smr-h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.45rem, 3.8vw, 2.25rem);
      font-weight: 800;
      margin: 0 0 8px;
      color: #fff;
    }
    .smr-sub {
      font-size: clamp(0.92rem, 2vw, 1.06rem);
      color: rgba(236, 232, 255, 0.82);
      line-height: 1.62;
      max-width: 580px;
      margin: 0 auto;
    }
    .smr-glass {
      background: rgba(13, 17, 40, 0.74);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(251, 113, 133, 0.24);
      border-radius: 24px;
      padding: clamp(18px, 3vw, 28px);
      box-shadow: 0 22px 54px rgba(3, 5, 16, 0.62);
    }
    .smr-nav-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 18px;
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
      box-shadow: 0 10px 26px rgba(244, 63, 94, 0.38);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .smr-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(244, 63, 94, 0.52); }
    .smr-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .smr-btn-ghost:hover { background: rgba(255, 255, 255, 0.14); }

    /* Page 1: Interactive Lantern Seal */
    .smr-moon-orb {
      width: 112px;
      height: 112px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #fff7ed 0%, #fda4af 45%, #be185d 100%);
      box-shadow: 0 0 40px rgba(251, 113, 133, 0.58), 0 0 85px rgba(245, 208, 138, 0.28);
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
      width: 58px;
      height: 58px;
      margin: -46px auto 14px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fb7185, #be123c);
      border: 2px solid rgba(255, 228, 230, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(190, 18, 60, 0.58);
      transition: transform 0.35s ease, background 0.35s ease;
    }
    .smr-seal.open {
      transform: scale(0.92) rotate(16deg);
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
    .smr-target-wrap {
      position: relative;
      width: 185px;
      height: 185px;
      margin: 0 auto 10px;
    }
    .smr-target {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 22px;
      overflow: hidden;
      border: 2.5px solid rgba(251, 113, 133, 0.58);
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55);
      cursor: crosshair;
    }
    .smr-target img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .smr-decal-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
    .smr-decal { position: absolute; font-size: 28px; transform: translate(-50%, -50%); }
    .smr-hit-float {
      position: absolute;
      font-size: 13px;
      font-weight: 900;
      color: #fde68a;
      text-shadow: 0 2px 8px rgba(0,0,0,0.85);
      pointer-events: none;
      z-index: 5;
    }
    .smr-arsenal {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }
    .smr-arsenal-btn {
      padding: 8px 13px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .smr-arsenal-btn:hover { background: rgba(251, 113, 133, 0.28); transform: translateY(-1px); }

    /* Page 4 & 6 Grids */
    .smr-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
      gap: 12px;
      margin-top: 14px;
      text-align: left;
    }
    .smr-pill-card {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(251, 113, 133, 0.24);
      border-radius: 16px;
      padding: 13px 15px;
      cursor: pointer;
      transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
    }
    .smr-pill-card:hover { transform: translateY(-2px); border-color: rgba(245, 208, 138, 0.6); }
    .smr-pill-card.lit {
      background: rgba(245, 208, 138, 0.14);
      border-color: rgba(245, 208, 138, 0.65);
    }

    /* Page 5: Flip Polaroids */
    .smr-pol-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .smr-pol { perspective: 900px; cursor: pointer; }
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

    /* Page 6: Penances & Drawable Signature Pad */
    .smr-check {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 11px;
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
    .smr-sig-wrap {
      position: relative;
      border-radius: 14px;
      background: rgba(255, 248, 250, 0.96);
      border: 1.5px dashed rgba(245, 208, 138, 0.75);
      height: 92px;
      margin: 10px 0;
      overflow: hidden;
    }
    .smr-sig-canvas {
      width: 100%;
      height: 100%;
      display: block;
      touch-action: none;
      cursor: crosshair;
    }
    .smr-sig-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: rgba(159, 18, 57, 0.45);
      pointer-events: none;
    }

    /* Page 7: Hold-to-Heal */
    .smr-hold-btn {
      position: relative;
      width: min(300px, 90%);
      height: 58px;
      margin: 18px auto 0;
      border-radius: 999px;
      border: 1.5px solid rgba(245, 208, 138, 0.65);
      background: rgba(18, 22, 48, 0.92);
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

export function renderSorryTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }
  ensureStyles();

  // Shared AudioContext to prevent hitting browser context limits
  let sharedCtx = null;
  function playSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!sharedCtx) sharedCtx = new AudioCtx();
      if (sharedCtx.state === 'suspended') sharedCtx.resume();
      const ctx = sharedCtx;
      const now = ctx.currentTime;

      if (type === 'chime') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.11, now + idx * 0.05);
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
        gain.gain.setValueAtTime(0.28, now);
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
          gain.gain.setValueAtTime(0.14, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.55);
        });
      }
    } catch {}
  }

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
        'Party A is officially declared 100% Right in all past, present, and future disputes.',
        'Party B must deliver hugs, forehead kisses, and warm comfort upon demand.',
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
    <div class="smr-stage" id="smrStage" data-prevent-swipe="true">
      <div class="smr-webgl" id="smrWebgl"></div>
      <div class="smr-aurora"></div>

      <header class="smr-topbar">
        <div class="smr-dots" id="smrDots">
          ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<button type="button" class="smr-dot ${n === 1 ? 'active' : ''}" data-go="${n}" title="Chapter ${n}"></button>`).join('')}
        </div>
        <div id="smrMusicMount"></div>
      </header>

      <div class="smr-pages">
        <!-- PAGE 1: MOONLIT SANCTUARY GATEWAY -->
        <section class="smr-page active" data-page="1">
          <div class="smr-inner">
            <div class="smr-moon-orb" id="smrMoonOrb" role="button" tabindex="0" title="Tap to awaken the sanctuary">🌹</div>
            <span class="smr-eyebrow">CHAPTER 1 OF 7 • MOONLIT SANCTUARY</span>
            <h1 class="smr-h1">${esc(heroTitle)}</h1>
            <p class="smr-sub">${esc(heroSubtitle)}</p>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn" data-go="2">Step Inside ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 2: WAX-SEALED ILLUMINATED CONFESSION -->
        <section class="smr-page" data-page="2">
          <div class="smr-inner">
            <div class="smr-glass" style="margin-top:26px;text-align:left;">
              <div class="smr-seal" id="smrSeal" role="button" tabindex="0" title="Tap to unseal & illuminate">🕊️</div>
              <span class="smr-eyebrow">CHAPTER 2 OF 7 • SINCERE CONFESSION</span>
              <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:#f5d08a;margin-bottom:10px;">
                Dearest ${esc(recipientName)},
              </div>
              <p id="smrLetterBody" style="font-size:clamp(0.95rem,2vw,1.1rem);line-height:1.75;margin:0 0 16px;">
                ${letterWords.map((w) => `<span class="smr-word">${esc(w)}</span>`).join(' ')}
              </p>
              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.12);padding-top:12px;">
                <span style="font-size:12px;color:rgba(255,255,255,0.7);">Always yours,</span>
                <strong style="color:#fda4af;">${esc(senderName)} 🫶</strong>
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
            <span class="smr-eyebrow">CHAPTER 3 OF 7 • LET IT ALL OUT</span>
            <h2 class="smr-h2">Take Your Anger Out On Me 🥊</h2>
            <div class="smr-glass" style="margin-top:12px;">
              <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:800;">
                <span>🔥 ANGER LEVEL</span>
                <span id="smrAngerVal" style="color:#fda4af;">100% FURIOUS</span>
              </div>
              <div class="smr-meter"><div class="smr-meter-fill" id="smrAngerFill" style="width:100%;"></div></div>
              <div class="smr-target-wrap" id="smrTargetWrap">
                <div class="smr-target" id="smrTarget" title="Tap anywhere or use weapons below">
                  <img src="${esc(creatorPhoto)}" alt="${esc(senderName)}" onerror="this.src='/images/always_you.jpg'" />
                  <div class="smr-decal-layer" id="smrDecals"></div>
                </div>
              </div>
              <div id="smrVentQuote" style="font-size:12.5px;font-style:italic;color:#f5d08a;margin-bottom:8px;">
                "I'm right here listening... throw whatever you want 🥺"
              </div>
              <button type="button" class="smr-btn-ghost" id="smrWipe" style="padding:5px 12px;font-size:11px;">🧻 Wipe Clean</button>
              <div class="smr-arsenal">
                <button type="button" class="smr-arsenal-btn" data-fx="punch" data-emoji="💥" data-label="BONK!">🥊 Punch</button>
                <button type="button" class="smr-arsenal-btn" data-fx="splat" data-emoji="🍅" data-label="SPLAT!">🍅 Tomato</button>
                <button type="button" class="smr-arsenal-btn" data-fx="whack" data-emoji="🩴" data-label="WHACK!">🩴 Chappal</button>
                <button type="button" class="smr-arsenal-btn" data-fx="splat" data-emoji="🧋" data-label="SPLASH!">🧋 Boba</button>
                <button type="button" class="smr-arsenal-btn" data-fx="boing" data-emoji="🧸" data-label="BOOP!">🧸 Teddy</button>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="2">❮ Back</button>
              <button type="button" class="smr-btn" data-go="4">My Promises ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 4: REASONS & IGNITABLE PROMISE LANTERNS -->
        <section class="smr-page" data-page="4">
          <div class="smr-inner">
            <span class="smr-eyebrow">CHAPTER 4 OF 7 • ACCOUNTABILITY</span>
            <h2 class="smr-h2">Why Us &amp; Sacred Promises</h2>
            <p class="smr-sub" style="font-size:13px;">Tap any card to light a floating lantern in the 3D sky above ✨</p>
            <div class="smr-grid-2">
              ${reasonsToForgive.map((r, i) => `
                <div class="smr-pill-card smr-ignitable">
                  <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;color:#f5d08a;margin-bottom:4px;">WHY WE MATTER • 0${i + 1}</div>
                  <p style="margin:0;font-size:13px;line-height:1.5;">${esc(r)}</p>
                </div>
              `).join('')}
            </div>
            <div class="smr-glass" style="margin-top:14px;text-align:left;padding:16px 20px;">
              <div style="font-size:11px;font-weight:800;letter-spacing:1.2px;color:#fda4af;margin-bottom:8px;">🛡️ MY SACRED PROMISES</div>
              ${promises.map((p) => `<div style="font-size:13px;line-height:1.55;margin-bottom:5px;">✦ ${esc(p)}</div>`).join('')}
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="3">❮ Back</button>
              <button type="button" class="smr-btn" data-go="5">Our Memories ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 5: 3D FLIP POLAROIDS + KEEPSAKE -->
        <section class="smr-page" data-page="5">
          <div class="smr-inner">
            <span class="smr-eyebrow">CHAPTER 5 OF 7 • CHERISHED MEMORIES</span>
            <h2 class="smr-h2">Tap Any Photo to Flip 💌</h2>
            <div class="smr-pol-grid" id="smrPolGrid">
              ${polaroids.map((p) => `
                <div class="smr-pol">
                  <div class="smr-pol-inner">
                    <div class="smr-pol-face smr-pol-front">
                      <img src="${esc(p.image || '/images/sunset.jpg')}" alt="" onerror="this.src='/images/sunset.jpg'" />
                      <div style="margin-top:8px;font-size:12px;font-weight:800;">${esc(p.caption || 'Always You 🫶')}</div>
                    </div>
                    <div class="smr-pol-face smr-pol-back">
                      <div style="font-size:22px;margin-bottom:8px;">💌</div>
                      <p style="font-size:13px;line-height:1.5;margin:0;font-weight:700;">${esc(p.note || p.caption || 'You mean everything to me.')}</p>
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

        <!-- PAGE 6: PENANCES, DRAWABLE PEACE TREATY & COUPONS -->
        <section class="smr-page" data-page="6">
          <div class="smr-inner">
            <span class="smr-eyebrow">CHAPTER 6 OF 7 • PEACE TREATY</span>
            <h2 class="smr-h2">Claim Penances &amp; Sign Treaty</h2>
            <div class="smr-grid-2">
              <div class="smr-glass" style="padding:16px;">
                <div style="font-size:12px;font-weight:800;color:#f5d08a;margin-bottom:8px;">🧋 TAP TO CLAIM PENANCES</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                  ${penances.map((pen) => `<div class="smr-check"><span class="smr-chk">⬜</span><span>${esc(pen)}</span></div>`).join('')}
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
                  ${coupons.map((cp) => `<button type="button" class="smr-arsenal-btn smr-coupon-btn" title="${esc(cp.desc || '')}">${esc(cp.icon || '🎟️')} ${esc(cp.title)}</button>`).join('')}
                </div>
              </div>
              <div class="smr-glass" style="padding:16px;">
                <div style="font-size:12px;font-weight:800;color:#fda4af;margin-bottom:8px;">📜 OFFICIAL PEACE TREATY</div>
                ${treatyClauses.slice(0, 4).map((c, i) => `<div style="font-size:12px;line-height:1.45;margin-bottom:5px;"><strong>${i + 1}.</strong> ${esc(c)}</div>`).join('')}
                <div class="smr-sig-wrap">
                  <canvas class="smr-sig-canvas" id="smrSigCanvas"></canvas>
                  <div class="smr-sig-hint" id="smrSigHint">✍️ Draw your signature here</div>
                </div>
                <div style="display:flex;gap:8px;">
                  <button type="button" class="smr-btn-ghost" id="smrSigClear" style="padding:8px 12px;font-size:12px;">Clear</button>
                  <button type="button" class="smr-btn" id="smrTreatyBtn" style="flex:1;justify-content:center;padding:9px 14px;font-size:13px;">✍️ Affix Peace Seal</button>
                </div>
              </div>
            </div>
            <div class="smr-nav-row">
              <button type="button" class="smr-btn-ghost" data-go="5">❮ Back</button>
              <button type="button" class="smr-btn" data-go="7">Lantern Finale ❯</button>
            </div>
          </div>
        </section>

        <!-- PAGE 7: HOLD-TO-HEAL 3D LANTERN RELEASE FINALE -->
        <section class="smr-page" data-page="7">
          <div class="smr-inner">
            <div class="smr-glass" id="smrHealCard">
              <span class="smr-eyebrow">CHAPTER 7 OF 7 • THE OLIVE BRANCH</span>
              <h2 class="smr-h2">Will You Let Me Make It Right?</h2>
              <p class="smr-sub">Hold for 2 seconds to release the 3D rose lanterns across the moonlit water and seal our peace.</p>
              <button type="button" class="smr-hold-btn" id="smrHoldBtn">
                <div class="smr-hold-fill" id="smrHoldFill"></div>
                <span style="position:relative;z-index:1;" id="smrHoldLabel">🕊️ Hold 2s to Forgive &amp; Heal</span>
              </button>
              <div id="smrHealedBox" style="display:none;margin-top:18px;">
                <div style="font-size:38px;margin-bottom:6px;">🌹✨🕊️💖</div>
                <h3 style="font-size:21px;font-weight:800;color:#f5d08a;margin:0 0 8px;">Thank You, ${esc(recipientName)}</h3>
                <p style="font-size:13.5px;color:rgba(255,240,250,0.88);margin:0 0 14px;">Our sky is glowing again. Signed with love by ${esc(senderName)} — I promise to cherish your heart gently every day.</p>
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                  <button type="button" class="smr-btn" id="smrCertBtn">📸 Save Peace Certificate</button>
                  <button type="button" class="smr-btn-ghost" data-go="1">↺ Replay Journey</button>
                </div>
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

  // 3D Moonlit Sanctuary Scene
  const threeCtrl = createSorryThreeScene(container.querySelector('#smrWebgl'));

  // Page Transitions
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
    }, 52);
  }

  function goToPage(nextNum) {
    const n = Math.max(1, Math.min(7, Number(nextNum)));
    if (n === currentPage) return;
    const dir = n > currentPage ? 1 : -1;
    const prevEl = pages[currentPage - 1];
    const nextEl = pages[n - 1];
    currentPage = n;

    dots.forEach((d, idx) => d.classList.toggle('active', idx + 1 === n));
    threeCtrl.setChapter(n);

    gsap.killTweensOf(prevEl);
    gsap.killTweensOf(nextEl);
    gsap.to(prevEl, {
      opacity: 0,
      scale: 0.95,
      x: -dir * 38,
      duration: 0.3,
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
      { opacity: 0, scale: 1.04, x: dir * 44 },
      { opacity: 1, scale: 1, x: 0, duration: 0.48, ease: 'power3.out' }
    );

    if (n === 2) animateLetterWords();
    if (n === 6) resizeSigCanvas();
  }

  container.querySelectorAll('[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('chime');
      goToPage(btn.getAttribute('data-go'));
    });
  });

  // Page 1 Moonlit Orb
  container.querySelector('#smrMoonOrb')?.addEventListener('click', () => {
    playSound('chime');
    threeCtrl.triggerBurst(0xf5d08a, false);
    gsap.fromTo('#smrMoonOrb', { scale: 0.85 }, { scale: 1.08, duration: 0.4, ease: 'back.out(2)' });
    const audioEl = musicMount.querySelector('audio');
    if (audioEl && audioEl.paused && !window.isCelebrationEditorMode) audioEl.play().catch(() => {});
  });

  // Page 2 Seal
  const seal = container.querySelector('#smrSeal');
  seal?.addEventListener('click', () => {
    seal.classList.add('open');
    playSound('chime');
    threeCtrl.triggerBurst(0xfda4af, false);
    animateLetterWords();
  });

  // Page 3 Venting Room with animated hit popups + 3D burst + camera shake
  let anger = 100;
  const angerVal = container.querySelector('#smrAngerVal');
  const angerFill = container.querySelector('#smrAngerFill');
  const decals = container.querySelector('#smrDecals');
  const target = container.querySelector('#smrTarget');
  const targetWrap = container.querySelector('#smrTargetWrap');
  const ventQuote = container.querySelector('#smrVentQuote');
  const quotes = [
    '"Okay I deserved that 🥺"',
    '"Still sorry, still yours 💖"',
    '"Feeling lighter yet? 🫶"',
    '"Take all the time you need 🕊️"',
  ];

  function applyVentHit(emoji, fx, label) {
    playSound(fx);
    anger = Math.max(0, anger - 16);
    angerFill.style.width = `${anger}%`;
    angerVal.textContent = anger === 0 ? '0% CALM & HEALED 🕊️' : `${anger}% FURIOUS`;
    threeCtrl.setWarmth((100 - anger) / 100);
    threeCtrl.triggerBurst(anger === 0 ? 0xf5d08a : 0xfb7185, true);

    const d = document.createElement('span');
    d.className = 'smr-decal';
    d.textContent = emoji;
    d.style.left = `${18 + Math.random() * 64}%`;
    d.style.top = `${18 + Math.random() * 64}%`;
    decals.appendChild(d);

    const pop = document.createElement('div');
    pop.className = 'smr-hit-float';
    pop.textContent = label || '-16% ANGER';
    pop.style.left = `${30 + Math.random() * 40}%`;
    pop.style.top = '15%';
    targetWrap.appendChild(pop);
    gsap.to(pop, { y: -42, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => pop.remove() });

    gsap.fromTo(target, { x: -9, rotation: -3.5 }, { x: 0, rotation: 0, duration: 0.34, ease: 'elastic.out(1, 0.32)' });
    ventQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }

  container.querySelectorAll('.smr-arsenal-btn[data-fx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyVentHit(btn.getAttribute('data-emoji'), btn.getAttribute('data-fx'), btn.getAttribute('data-label'));
    });
  });
  target?.addEventListener('click', () => applyVentHit('💥', 'punch', 'BONK!'));
  container.querySelector('#smrWipe')?.addEventListener('click', () => {
    decals.innerHTML = '';
    playSound('chime');
  });

  // Page 4 Ignitable Reason Lanterns
  container.querySelectorAll('.smr-ignitable').forEach((card) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('lit')) {
        card.classList.add('lit');
        threeCtrl.spawnLantern(2, true);
        threeCtrl.triggerBurst(0xf5d08a, false);
        playSound('chime');
      }
    });
  });

  // Page 5 Flip Polaroids
  container.querySelectorAll('.smr-pol').forEach((p) => {
    p.addEventListener('click', () => {
      p.classList.toggle('flipped');
      playSound('chime');
    });
  });

  // Page 6 Penances, Coupons & Drawable Peace Treaty Signature Pad
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

  const sigCanvas = container.querySelector('#smrSigCanvas');
  const sigHint = container.querySelector('#smrSigHint');
  let sigCtx = null;
  let drawingSig = false;

  function resizeSigCanvas() {
    if (!sigCanvas) return;
    const rect = sigCanvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      sigCanvas.width = rect.width;
      sigCanvas.height = rect.height;
      sigCtx = sigCanvas.getContext('2d');
      sigCtx.strokeStyle = '#9f1239';
      sigCtx.lineWidth = 2.5;
      sigCtx.lineCap = 'round';
      sigCtx.lineJoin = 'round';
    }
  }
  resizeSigCanvas();

  function getSigPos(e) {
    const r = sigCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - r.left, y: clientY - r.top };
  }

  sigCanvas?.addEventListener('pointerdown', (e) => {
    if (!sigCtx) resizeSigCanvas();
    if (!sigCtx) return;
    drawingSig = true;
    if (sigHint) sigHint.style.opacity = '0';
    const pt = getSigPos(e);
    sigCtx.beginPath();
    sigCtx.moveTo(pt.x, pt.y);
  });
  sigCanvas?.addEventListener('pointermove', (e) => {
    if (!drawingSig || !sigCtx) return;
    const pt = getSigPos(e);
    sigCtx.lineTo(pt.x, pt.y);
    sigCtx.stroke();
  });
  const stopSig = () => { drawingSig = false; };
  sigCanvas?.addEventListener('pointerup', stopSig);
  sigCanvas?.addEventListener('pointercancel', stopSig);

  container.querySelector('#smrSigClear')?.addEventListener('click', () => {
    if (sigCtx && sigCanvas) sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    if (sigHint) sigHint.style.opacity = '1';
  });

  const treatyBtn = container.querySelector('#smrTreatyBtn');
  treatyBtn?.addEventListener('click', () => {
    treatyBtn.textContent = `🕊️ Sealed by ${recipientName} & ${senderName} ✓`;
    treatyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    playSound('victory');
    threeCtrl.spawnLantern(3, true);
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.7 } });
  });

  // Page 7 Hold-to-Heal
  const stage = container.querySelector('#smrStage');
  const holdBtn = container.querySelector('#smrHoldBtn');
  const holdFill = container.querySelector('#smrHoldFill');
  const holdLabel = container.querySelector('#smrHoldLabel');
  const healedBox = container.querySelector('#smrHealedBox');
  let holdTimer = null;
  let holdStart = 0;
  let isHealed = false;

  function completeHeal() {
    if (isHealed) return;
    isHealed = true;
    stage.classList.add('healed');
    holdBtn.style.display = 'none';
    healedBox.style.display = 'block';
    playSound('victory');
    threeCtrl.setHealed();
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
      if (pct >= 100) { clearInterval(holdTimer); completeHeal(); }
    }, 30);
  };
  const cancelHold = () => {
    if (isHealed) return;
    clearInterval(holdTimer);
    holdFill.style.width = '0%';
    holdLabel.textContent = '🕊️ Hold 2s to Forgive & Heal';
  };
  holdBtn?.addEventListener('pointerdown', startHold);
  holdBtn?.addEventListener('pointerup', cancelHold);
  holdBtn?.addEventListener('pointerleave', cancelHold);
  holdBtn?.addEventListener('pointercancel', cancelHold);

  container.querySelector('#smrCertBtn')?.addEventListener('click', async () => {
    try {
      const canvas = await html2canvas(container.querySelector('#smrHealCard'), { backgroundColor: '#0d1026', scale: 2 });
      const link = document.createElement('a');
      link.download = `peace-certificate-${recipientName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {}
  });

  container._cleanup = () => {
    clearInterval(letterInterval);
    clearInterval(holdTimer);
    threeCtrl.destroy();
    if (sharedCtx && sharedCtx.state !== 'closed') {
      sharedCtx.close().catch(() => {});
      sharedCtx = null;
    }
  };
}
