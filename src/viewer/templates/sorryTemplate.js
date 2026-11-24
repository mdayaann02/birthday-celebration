// src/viewer/templates/sorryTemplate.js - Ultra-Aesthetic Sincere Apology & Playful Reconciliation Experience
// Engineered with GSAP 3 Physics, Interactive Kintsugi Drag Mending, Real Scratch-Off Coupons,
// Throwable Arsenal Physics, Digital Gold Signature Canvas, 3D Envelope Unfolding, and Runaway Verdict.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Web Audio Sound Synthesizer for tactile feedback
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'splat') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'splash') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.24);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.26);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'stamp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'scratch') {
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      node.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      node.start(now);
    } else if (type === 'goldSpark') {
      const freqs = [1046.5, 1318.5, 1567.9, 2093.0];
      const f = freqs[Math.floor(Math.random() * freqs.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'chime') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    }
  } catch {}
}

export function renderSorryTemplate(container, data) {
  let currentPage = 1;
  const totalPages = 7;
  let angerLevel = 100;
  let ventCount = 0;
  let penancesSigned = false;
  let treatySigned = false;
  let kintsugiHealed = false;

  const recipientName = data.recipientName || 'My Dearest';
  const senderName = data.senderName || 'Yours Truly';
  const heroTitle = data.heroTitle || "I'm Truly Sorry";
  const heroSubtitle = data.heroSubtitle || "My universe feels heavy and completely empty when we aren't okay 🥺";
  const apologyMessage = data.apologyMessage || "I know I made a mistake, and seeing you upset hurts me more than anything. My intention was never to make you feel hurt or unheard. You mean everything to me, and I take full accountability.";

  const penances = (data.penances && data.penances.length > 0) ? data.penances : [
    "Buy your favorite Iced Boba / Treat right now 🧋",
    "30-minute soothing massage whenever you ask 💆‍♀️",
    "Order whatever food you are craving tonight, my treat 🍕",
    "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
    "Fold all your laundry & do your chores this weekend 🧹",
    "Write 100 cute post-it notes of things I adore about you 📝"
  ];

  const treatyClauses = (data.treatyClauses && data.treatyClauses.length > 0) ? data.treatyClauses : [
    "Party A (The Cutest Girl) is officially declared 100% Right in all past, present, and future disputes.",
    "Party B must deliver hugs, kisses, and forehead kisses upon demand.",
    "Permanent hoodie and jacket theft rights are granted with zero retaliation.",
    "All future disagreements must be settled immediately with dessert and boba.",
    "No going to sleep angry ever again — cuddles are mandatory."
  ];

  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your laugh so much 🌅", note: "You looked so peaceful here. I promise to always protect your happiness." },
    { image: "/images/always_you.jpg", caption: "You are the brightest light in my world 🫶", note: "Even on my gloomiest days, one smile from you fixes everything." },
    { image: "/images/pretty.jpg", caption: "I never want to see you hurt ever again ✨", note: "You deserve the gentlest, sweetest love in the universe. I'm learning every day." }
  ];

  const coupons = (data.coupons && data.coupons.length > 0) ? data.coupons : [
    { icon: "🎟️", title: "Get Out of Jail Free", desc: "Win any future argument instantly with no rebuttal!" },
    { icon: "🍫", title: "Midnight Craving Pass", desc: "Redeemable 24/7 for chocolates, snacks, or fast food." },
    { icon: "🧸", title: "Unlimited Bear Hugs", desc: "Non-expiring voucher for long, tight, comforting hugs." },
    { icon: "👑", title: "Queen For A Day", desc: "He must obey your every cute command for 24 hours." }
  ];

  const creatorPhoto = data.creatorPhoto || "/images/always_you.jpg";

  const pageTitles = [
    { num: 1, icon: "💌", title: "The Sincere Confession" },
    { num: 2, icon: "🥊", title: "Interactive Venting Room" },
    { num: 3, icon: "⚖️", title: "Legal Penance Treaty" },
    { num: 4, icon: "📸", title: "Cherished Memories" },
    { num: 5, icon: "📜", title: "Official Peace Treaty" },
    { num: 6, icon: "🎟️", title: "VIP Reconciliation Coupons" },
    { num: 7, icon: "💖", title: "The Final Forgiveness Verdict" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-storybook-viewport" data-prevent-swipe="true">
      <!-- Ambient Dynamic Weather & Sparkles Canvas -->
      <canvas id="sorryCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED APOLOGY OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="sorryGate" role="button" tabindex="0" aria-label="Tap to unlock sincere apology" style="background: radial-gradient(circle at center, #1e112a 0%, #080511 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#10b981; box-shadow: 0 0 35px rgba(16,185,129,0.5);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(16,185,129,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            🕊️❤️‍🩹
          </div>
          <div class="bro-gate-badge" style="background:rgba(16,185,129,0.18); border-color:#10b981; color:#6ee7b7;">
            SINCERE ATONEMENT & HEALING
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(16,185,129,0.6);">
            From the Bottom of My Heart
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            A sincere confession, peace treaty, and promise to make things right.
          </p>
          <div class="bro-gate-hint" style="color:#6ee7b7; border-color:rgba(16,185,129,0.4); background:rgba(16,185,129,0.12);">
            🕊️ TAP TO HEAR MY SINCERE HEART ✨
          </div>
        </div>
      </div>

      <!-- Multi-Page Content Slider Container (Continuous Immersive Flow) -->
      <main class="sorry-pages-container" id="sorryPagesContainer" style="position:relative; z-index:10; display:flex; flex-direction:column; gap:28px;">
        
        <!-- ============================================================ -->
        <!-- PAGE 1: 💌 THE SINCERE CONFESSION & INTERACTIVE KINTSUGI MEND -->
        <!-- ============================================================ -->
        <section class="sorry-page-card active" data-page="1">
          <div class="sorry-hero-wrap">
            <div class="sorry-tag">STAGE 1: SINCERE ATONEMENT & HEALING</div>

            <!-- INTERACTIVE KINTSUGI HEART & GLOOMY-TO-RADIANT WEATHER ARENA -->
            <div class="sorry-rain-arena" id="sorryRainArena" style="position:relative; width:100%; max-width:440px; min-height:270px; margin:14px auto 18px auto; border-radius:24px; overflow:hidden; background:linear-gradient(180deg, rgba(15,10,24,0.96) 0%, rgba(26,16,40,0.98) 100%); border:1.5px solid rgba(251,191,36,0.3); box-shadow:0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15); text-align:center; padding:18px 16px 20px 16px; box-sizing:border-box;">
              
              <!-- Interactive Weather Canvas (Rain -> Gold Sunlight Rays) -->
              <canvas id="kintsugiRainCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

              <!-- Radiant Rainbow Arc -->
              <div id="kintsugiRainbow" style="position:absolute; top:-35px; left:50%; transform:translateX(-50%); width:360px; height:190px; border-radius:190px 190px 0 0; background:radial-gradient(ellipse at bottom, transparent 48%, rgba(255,0,0,0.42) 50%, rgba(255,127,0,0.42) 54%, rgba(255,255,0,0.42) 58%, rgba(0,255,0,0.42) 62%, rgba(0,127,255,0.42) 66%, rgba(75,0,130,0.42) 70%, rgba(148,0,211,0.42) 74%, transparent 78%); opacity:0; pointer-events:none; z-index:2; filter:blur(1px); transition:opacity 1s ease;"></div>

              <!-- Header Status Badge -->
              <div style="position:relative; z-index:3; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 4px;">
                <span id="stormStatePill" style="font-size:11px; font-weight:800; letter-spacing:0.8px; background:rgba(239,68,68,0.22); color:#fca5a5; border:1px solid rgba(239,68,68,0.4); padding:4px 11px; border-radius:20px; text-transform:uppercase;">
                  🌧️ Gloomy Storm Active
                </span>
                <span id="heartBatteryVal" style="font-size:12px; font-weight:800; color:#fbbf24;">
                  Heart Level: 12% 💔
                </span>
              </div>

              <!-- Kintsugi Heart Stage (Drag golden brush or tap to heal) -->
              <div class="kintsugi-stage" id="kintsugiStage" style="position:relative; z-index:3; width:170px; height:140px; margin:0 auto 12px auto; cursor:pointer;" title="Drag gold across seam or tap to mend heart">
                <!-- Left Heart Half -->
                <svg id="heartHalfLeft" viewBox="0 0 100 160" style="position:absolute; left:18px; top:0; width:65px; height:125px; filter:drop-shadow(0 6px 14px rgba(225,29,72,0.45)); transform:rotate(-9deg) translateX(-6px); transition:transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
                  <path d="M 95 30 C 95 10, 70 0, 45 0 C 20 0, 0 20, 0 55 C 0 95, 45 130, 95 155 Z" fill="url(#leftHeartGrad)"/>
                  <defs>
                    <linearGradient id="leftHeartGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#f43f5e"/>
                      <stop offset="100%" stop-color="#be123c"/>
                    </linearGradient>
                  </defs>
                </svg>

                <!-- Right Heart Half -->
                <svg id="heartHalfRight" viewBox="0 0 100 160" style="position:absolute; right:18px; top:0; width:65px; height:125px; filter:drop-shadow(0 6px 14px rgba(225,29,72,0.45)); transform:rotate(9deg) translateX(6px); transition:transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
                  <path d="M 5 30 C 5 10, 30 0, 55 0 C 80 0, 100 20, 100 55 C 100 95, 55 130, 5 155 Z" fill="url(#rightHeartGrad)"/>
                  <defs>
                    <linearGradient id="rightHeartGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#fb7185"/>
                      <stop offset="100%" stop-color="#e11d48"/>
                    </linearGradient>
                  </defs>
                </svg>

                <!-- Glowing Golden Kintsugi Seam -->
                <svg id="kintsugiGoldSeam" viewBox="0 0 40 160" style="position:absolute; left:50%; top:0; transform:translateX(-50%); width:36px; height:130px; z-index:4; opacity:0.25; filter:drop-shadow(0 0 8px #ffd700); transition:opacity 0.4s ease;">
                  <path d="M 20 5 L 26 35 L 14 65 L 25 95 L 16 125 L 20 155" fill="none" stroke="#ffd700" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="26" cy="35" r="3.2" fill="#ffffff" />
                  <circle cx="14" cy="65" r="3.2" fill="#ffffff" />
                  <circle cx="25" cy="95" r="3.2" fill="#ffffff" />
                </svg>

                <!-- Center Healing Golden Aura -->
                <div id="kintsugiAura" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:85px; height:85px; border-radius:50%; background:radial-gradient(circle, #fde047 0%, #ca8a04 50%, transparent 75%); opacity:0; pointer-events:none; filter:blur(6px); transition:opacity 0.5s ease;"></div>
              </div>

              <!-- Dynamic Speech / Quote Banner -->
              <div id="sorryMendBanner" style="position:relative; z-index:3; font-size:13px; font-weight:700; color:#f8fafc; background:rgba(0,0,0,0.55); padding:9px 14px; border-radius:14px; border:1px solid rgba(255,255,255,0.14); margin-bottom:14px; min-height:22px; transition:all 0.3s ease;">
                "Drag golden spark or tap below to mend our bond with pure golden kintsugi 🥺✨"
              </div>

              <!-- Interactive Action Buttons -->
              <div style="position:relative; z-index:3; display:flex; justify-content:center; gap:10px;">
                <button type="button" id="btnMendKintsugi" style="background:linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); color:#0f172a; font-weight:900; font-size:12.5px; border:none; padding:9px 18px; border-radius:22px; cursor:pointer; box-shadow:0 4px 18px rgba(245,158,11,0.45); display:inline-flex; align-items:center; gap:6px;">
                  ✨ Mend With Gold
                </button>
                <button type="button" id="btnWipeStorm" style="background:linear-gradient(135deg, #38bdf8 0%, #0284c7 100%); color:#ffffff; font-weight:800; font-size:12.5px; border:none; padding:9px 18px; border-radius:22px; cursor:pointer; box-shadow:0 4px 16px rgba(2,132,199,0.4); display:inline-flex; align-items:center; gap:6px;">
                  🌈 Clear Rainstorm
                </button>
              </div>
            </div>

            <!-- Avatar Emoji & Title -->
            <div class="sorry-emoji-display" id="avatarEmoji">🥺</div>
            <h1 class="sorry-hero-title">${heroTitle}</h1>
            <p class="sorry-hero-sub">${heroSubtitle}</p>

            <!-- 3D Wax-Sealed Parchment Letter Envelope -->
            <div class="sorry-glass-letter" style="perspective:1000px;">
              <div class="letter-wax-seal" id="letterWaxSealBtn" role="button" title="Tap to unseal confession" style="cursor:pointer; transform:scale(1); transition:transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
                <span>❤️</span>
              </div>
              <div class="sorry-card-greeting">Dearest ${recipientName},</div>
              <p class="sorry-card-text typewriter-effect" id="sorryCardText">${apologyMessage}</p>
              <div class="sorry-card-sign">— Sincerely & Lovingly, ${senderName} 🫶</div>
            </div>

            <div class="sorry-next-dock">
              <button type="button" class="btn-sorry-next" data-next="2">
                <span>Let Out Your Anger in the Vent Room 🥊</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 2: 🥊 THE INTERACTIVE CATHARTIC VENTING ROOM -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="2">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 2: CATHARTIC VENTING & SMACKDOWN</div>
            <h2 class="sorry-section-title">Take Your Anger Out On Me! 🥊</h2>
            <p class="sorry-section-subtitle">
              You have every right to be mad. Pick up any item below and FLING or TAP it right at my face!
            </p>

            <div class="vent-chamber-card">
              <!-- Anger Thermometer Gauge -->
              <div class="anger-gauge-wrap">
                <div class="anger-gauge-header">
                  <span class="anger-gauge-title">🔥 ANGER THERMOMETER:</span>
                  <span class="anger-gauge-val" id="angerValText">100% FURIOUS</span>
                </div>
                <div class="anger-gauge-track">
                  <div class="anger-gauge-fill" id="angerGaugeFill" style="width: 100%;"></div>
                </div>
              </div>

              <!-- Interactive Reaction Avatar Frame with Stick-On Decals -->
              <div class="vent-avatar-stage">
                <div class="vent-avatar-character vent-target-frame" id="ventAvatar">
                  <img src="${creatorPhoto}" alt="${senderName}" class="vent-creator-img" id="ventCreatorImg" onerror="this.src='/images/always_you.jpg'" />
                  <div class="vent-decals-layer" id="ventDecalsLayer"></div>
                  <div class="vent-face-expression-pill" id="avatarFace">🥺</div>
                </div>
                <div class="vent-reaction-bubble" id="ventBubble">
                  "I know you're mad at me... I'm listening 🥺"
                </div>
                <button type="button" class="btn-wipe-face" id="btnWipeFace">
                  🧻 Wipe Face Clean
                </button>
              </div>

              <!-- Throwable Arsenal Grid (Cake, Teddy, Tomato, Chappal, Water, Egg) -->
              <div class="throwables-grid" id="throwablesGrid">
                <button type="button" class="btn-throwable" data-type="cake" title="Throw Birthday Cake">
                  <span class="throw-icon">🎂</span>
                  <span class="throw-label">Cake Splat</span>
                  <span class="throw-sub">Splat! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="teddy" title="Throw Soft Teddy">
                  <span class="throw-icon">🧸</span>
                  <span class="throw-label">Soft Teddy</span>
                  <span class="throw-sub">Boing! (-15% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="tomato" title="Throw Juicy Tomato">
                  <span class="throw-icon">🍅</span>
                  <span class="throw-label">Juicy Tomato</span>
                  <span class="throw-sub">Squish! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="slipper" title="Throw Flying Slipper">
                  <span class="throw-icon">🩴</span>
                  <span class="throw-label">The Chappal</span>
                  <span class="throw-sub">WHACK! (-25% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="water" title="Throw Water Balloon">
                  <span class="throw-icon">💧</span>
                  <span class="throw-label">Water Splash</span>
                  <span class="throw-sub">Splash! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="egg" title="Throw Rotten Egg">
                  <span class="throw-icon">🥚</span>
                  <span class="throw-label">Rotten Egg</span>
                  <span class="throw-sub">Crack! (-20% Mad)</span>
                </button>
              </div>

              <div class="vent-counter-text" id="ventCounterText">
                Hits landed: <strong>0</strong> times
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="1">&larr; Back to Letter</button>
              <button type="button" class="btn-sorry-next" data-next="3">Choose My Punishments ⚖️ &rarr;</button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 3: ⚖️ THE PUNISHMENT DEED / PENANCE -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="3">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 3: ATONEMENT & PENANCE</div>
            <h2 class="sorry-section-title">Pick & Add My Punishments! ⚖️</h2>
            <p class="sorry-section-subtitle">
              Check off what you want me to do, or type your own custom punishments below! I promise to execute all of them without complaining:
            </p>

            <!-- Viewer Custom Punishment Input -->
            <div class="add-punishment-bar" style="margin-bottom:16px; display:flex; gap:8px;">
              <input type="text" id="inpCustomPunishment" class="inp-custom-punishment" placeholder="Type custom punishment (e.g. Buy me 5 bobas, fold laundry)..." maxlength="120" style="flex:1; background:rgba(255,255,255,0.08); border:1.5px solid rgba(251,191,36,0.4); border-radius:14px; padding:12px 14px; color:#fff; font-size:13px; outline:none; transition:border-color 0.2s;" />
              <button type="button" id="btnAddPunishment" class="btn-add-punishment" style="background:linear-gradient(135deg, #fbbf24, #f59e0b); color:#1c1216; border:none; padding:0 18px; border-radius:14px; font-weight:800; font-size:13px; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 14px rgba(251,191,36,0.35); transition:transform 0.15s;">
                <span>+ Add</span>
              </button>
            </div>

            <!-- Summary badge -->
            <div id="punishmentCountBadge" style="margin-bottom:12px; font-size:12px; color:#fbbf24; font-weight:700;">
              ⚖️ Loading punishments...
            </div>

            <div class="penance-grid" id="penanceGrid"></div>

            <!-- Legally Binding Acceptance Stamp -->
            <div class="penance-signing-dock">
              <button type="button" class="btn-sign-penance" id="btnSignPenance">
                ⚖️ Stamp These As Legally Binding
              </button>
              <div class="penance-stamped-badge" id="penanceStampedBadge" style="display:none;">
                🔴 ACCEPTED & GUARANTEED BY BOYFRIEND
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="2">&larr; Back to Venting</button>
              <button type="button" class="btn-sorry-next" data-next="4">Look At Our Memories 📸 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 4: 📸 CHERISHED MEMORIES KEEPSAKE & VOICE MEMO -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="4">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 4: WHY YOU MEAN THE WORLD</div>
            <h2 class="sorry-section-title">Remember Why We Fell In Love 📸</h2>
            <p class="sorry-section-subtitle">
              Tap any polaroid to flip it and read the secret memory on the back:
            </p>

            <!-- Interactive Voice Apology Memo Simulator -->
            <div class="sorry-voice-memo-card" id="sorryVoiceCard" style="max-width:440px; margin:0 auto 20px auto; background:linear-gradient(135deg, rgba(30,20,45,0.85) 0%, rgba(15,10,25,0.92) 100%); border:1px solid rgba(251,191,36,0.35); border-radius:18px; padding:14px 18px; display:flex; align-items:center; gap:14px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
              <button type="button" id="btnPlayVoiceMemo" style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #f43f5e, #fbbf24); border:none; color:#fff; font-size:18px; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 14px rgba(244,63,94,0.4); flex-shrink:0;">
                ▶
              </button>
              <div style="flex:1; text-align:left;">
                <div style="font-size:13px; font-weight:800; color:#f8fafc;">Voice Apology from ${senderName} 🎙️</div>
                <div style="font-size:11.5px; color:#fda4af; margin-top:2px;" id="voiceMemoStatus">Tap play to listen to my voice note (0:48)</div>
                <!-- Animated soundwave bars -->
                <div class="soundwave-bars" id="voiceSoundwave" style="display:flex; align-items:center; gap:3px; margin-top:6px; height:14px;">
                  <span style="width:3px; height:6px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:12px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:8px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:14px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:9px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:13px; background:#fbbf24; border-radius:2px;"></span>
                  <span style="width:3px; height:5px; background:#fbbf24; border-radius:2px;"></span>
                </div>
              </div>
            </div>

            <div class="sorry-polaroids-deck">
              ${polaroids.map((p, i) => `
                <div class="sorry-polaroid-card" data-card-idx="${i}">
                  <div class="polaroid-flipper">
                    <!-- Front of Polaroid -->
                    <div class="polaroid-front">
                      <div class="polaroid-img-frame">
                        <img src="${p.image}" alt="Memory" onerror="this.src='/images/sunset.jpg'" />
                        <span class="polaroid-tap-hint">Tap to flip 🔄</span>
                      </div>
                      <div class="polaroid-caption">${p.caption}</div>
                      <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 6px auto 2px auto; background: linear-gradient(135deg, #f43f5e, #e11d48); color:#fff; border:none; padding:6px 14px; border-radius:18px; font-size:11px; font-weight:800; cursor:pointer; box-shadow:0 3px 10px rgba(225,29,72,0.3); display:inline-flex; align-items:center; gap:5px; pointer-events:auto;">
                        📸 Save Keepsake
                      </button>
                    </div>
                    <!-- Back of Polaroid -->
                    <div class="polaroid-back">
                      <div class="polaroid-back-note">
                        <span class="note-quote-mark">“</span>
                        <p>${p.note || p.caption}</p>
                        <span class="note-author">— Forever Yours ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="3">&larr; Back to Penance</button>
              <button type="button" class="btn-sorry-next" data-next="5">Sign The Peace Treaty 📜 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 5: 📜 THE OFFICIAL SWEETHEART ACCORDS PEACE TREATY -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="5">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 5: LEGAL DIPLOMACY & ACCORDS</div>
            <h2 class="sorry-section-title">Official Relationship Peace Treaty 📜</h2>
            <p class="sorry-section-subtitle">
              An unbreachable treaty protecting your peace, happiness, and sovereignty:
            </p>

            <div class="treaty-document-card">
              <div class="treaty-header">
                <span class="treaty-crest">👑</span>
                <h3 class="treaty-title">THE SWEETHEART ACCORDS</h3>
                <span class="treaty-parties">Between: ${recipientName} (The Queen) & ${senderName} (The Dork)</span>
              </div>

              <div class="treaty-articles-list">
                ${treatyClauses.map((clause, idx) => `
                  <div class="treaty-article">
                    <span class="article-num">Article ${['I', 'II', 'III', 'IV', 'V', 'VI'][idx] || (idx+1)}:</span>
                    <p class="article-text">${clause}</p>
                  </div>
                `).join('')}
              </div>

              <!-- Interactive Royal Signature Canvas Pad -->
              <div class="treaty-signature-section" style="margin-top:20px; text-align:center;">
                <div style="font-size:12px; font-weight:800; color:#d97706; margin-bottom:6px;">
                  ✍️ Her Royal Majesty's Digital Signature:
                </div>
                <div style="position:relative; width:100%; max-width:340px; margin:0 auto; background:rgba(255,255,255,0.7); border:2px dashed #d97706; border-radius:14px; overflow:hidden;">
                  <canvas id="treatySigCanvas" width="340" height="90" style="display:block; width:100%; height:90px; cursor:crosshair; touch-action:none;"></canvas>
                  <button type="button" id="btnClearSig" style="position:absolute; right:8px; bottom:6px; background:rgba(0,0,0,0.15); border:none; border-radius:8px; padding:3px 8px; font-size:10px; font-weight:700; color:#78350f; cursor:pointer;">Clear</button>
                </div>
                <p style="font-size:11px; color:#92400e; margin-top:4px;">Sign with finger or stylus above</p>
              </div>

              <!-- Interactive 2-Second Hold Seal & Wax Stamp Arena -->
              <div class="treaty-holding-dock" style="margin-top:16px; display:flex; flex-direction:column; align-items:center;">
                <!-- Circular Progress Press-and-Hold Button -->
                <div class="treaty-hold-seal-wrapper" style="position:relative; width:104px; height:104px; margin:0 auto; user-select:none; -webkit-user-select:none; touch-action:none;">
                  <svg class="treaty-hold-svg" width="104" height="104" viewBox="0 0 104 104" style="position:absolute; top:0; left:0; transform:rotate(-90deg); pointer-events:none;">
                    <circle cx="52" cy="52" r="46" stroke="rgba(217, 119, 6, 0.22)" stroke-width="7" fill="none" />
                    <circle id="treatyHoldRing" cx="52" cy="52" r="46" stroke="#d97706" stroke-width="7" stroke-linecap="round" fill="none"
                      stroke-dasharray="289" stroke-dashoffset="289" style="transition: stroke-dashoffset 0.05s linear;" />
                  </svg>
                  <div class="treaty-hold-button" id="treatyHoldButton" role="button" aria-label="Hold for 2 seconds to ratify peace treaty"
                    style="position:absolute; inset:8px; border-radius:50%; background:radial-gradient(circle, #78350f 0%, #451a03 100%); border:3px solid #f59e0b; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 6px 20px rgba(180,83,9,0.5); transition:transform 0.15s, box-shadow 0.15s;">
                    <span class="treaty-btn-icon" id="treatyBtnIcon" style="font-size:32px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">👑</span>
                  </div>
                </div>

                <!-- Linear Progress Bar -->
                <div class="treaty-hold-timer-bar-wrap" style="width:200px; height:6px; background:rgba(0,0,0,0.15); border-radius:10px; margin-top:14px; overflow:hidden;">
                  <div id="treatyHoldLinearBar" style="width:0%; height:100%; background:linear-gradient(90deg, #f59e0b, #ef4444); border-radius:10px; transition:width 0.05s linear;"></div>
                </div>

                <!-- Real-time instruction text -->
                <div class="treaty-hold-instruction" id="treatyHoldInstruction" style="margin-top:8px; font-size:12.5px; font-weight:800; color:#78350f;">
                  👆 Press & Hold for 2 Seconds to Ratify Peace Treaty!
                </div>

                <!-- Celebratory YAYYY! CONVINCED! Banner (Appears after 2s hold) -->
                <div class="treaty-convinced-card" id="treatyConvincedCard" style="display:none; margin-top:18px; width:100%; max-width:440px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius:20px; padding:20px 16px; color:#fff; box-shadow:0 12px 35px rgba(16,185,129,0.45); border:2px solid #34d399; text-align:center;">
                  <div class="convinced-badge-emoji" style="font-size:42px; margin-bottom:4px; animation:bounce 0.8s infinite;">🎉🥳💖</div>
                  <h3 style="font-family:'Playfair Display',serif; font-size:24px; font-weight:900; margin:0 0 6px 0; color:#fff; letter-spacing:0.5px;">
                    YAYYY! CONVINCED! 🎉
                  </h3>
                  <p style="font-size:13.5px; margin:0 0 12px 0; line-height:1.45; color:#ecfdf5;">
                    The Peace Treaty is officially ratified & signed by Her Majesty! We are back together! 🥰💖
                  </p>
                  <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(0,0,0,0.22); padding:6px 14px; border-radius:20px; font-size:11.5px; font-weight:800; border:1px solid rgba(255,255,255,0.3);">
                    <span>👑 SIGNED & SEALED BY QUEEN ${recipientName.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="4">&larr; Back to Memories</button>
              <button type="button" class="btn-sorry-next" data-next="6">Claim Your Love Coupons 🎟️ &rarr;</button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 6: 🎟️ RECONCILIATION COUPONS WITH REAL SCRATCH-OFF FOIL -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="6">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 6: RECONCILIATION GIFTS & VOUCHERS</div>
            <h2 class="sorry-section-title">Scratch & Claim Your Peace Vouchers 🎟️</h2>
            <p class="sorry-section-subtitle">
              Rub your finger over the golden foil to scratch and reveal your guaranteed prizes! Non-expiring and redeemable 24/7:
            </p>

            <div class="coupons-grid">
              ${coupons.map((c, i) => `
                <div class="sorry-coupon-card" data-coupon-idx="${i}" style="position:relative; overflow:hidden;">
                  <div class="coupon-left-icon">${c.icon}</div>
                  <div class="coupon-details">
                    <h4 class="coupon-name">${c.title}</h4>
                    <p class="coupon-desc">${c.desc}</p>
                  </div>
                  <!-- Interactive Scratch Canvas Overlay -->
                  <canvas class="scratch-coupon-canvas" data-scratch-idx="${i}" width="280" height="90" style="position:absolute; inset:0; width:100%; height:100%; z-index:4; cursor:crosshair; touch-action:none;"></canvas>
                  <button type="button" class="btn-claim-coupon" style="position:relative; z-index:3;">
                    Claim
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="5">&larr; Back to Treaty</button>
              <button type="button" class="btn-sorry-next" data-next="7">The Final Verdict 💖 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- ============================================================ -->
        <!-- PAGE 7: 💖 THE GRAND FORGIVENESS VERDICT & RUNAWAY NO -->
        <!-- ============================================================ -->
        <section class="sorry-page-card" data-page="7">
          <div class="sorry-section-wrap" style="text-align:center;">
            <div class="sorry-tag">FINAL STAGE: THE ROYAL VERDICT</div>
            <div class="verdict-avatar-pulse">🥺👉👈</div>
            <h2 class="sorry-section-title" style="font-size:32px; margin-top:8px;">
              Will You Please Forgive Me? ❤️
            </h2>
            <p class="sorry-section-subtitle" style="max-width:480px; margin:0 auto 28px;">
              I love you with every beat of my heart. Life is too gray, quiet, and lonely without your sweet smile.
            </p>

            <div class="sorry-decision-area" id="sorryDecisionArea" style="position:relative; min-height:120px; display:flex; align-items:center; justify-content:center; gap:20px;">
              <button class="btn-forgive-yes" id="btnForgiveYes" style="z-index:5;">
                YES, I Forgive You! ❤️🫂
              </button>
              <button class="btn-forgive-no" id="btnForgiveNo" style="z-index:4; transition:transform 0.15s ease-out;">
                No 😠
              </button>
            </div>

            <!-- Celebration Certificate of Forgiveness -->
            <div class="sorry-success-card" id="forgiveSuccessCard" style="display:none; margin-top:24px;">
              <div class="success-confetti-badge">🎉🫂💖</div>
              <h3 class="success-title">WE ARE OFFICIALLY BACK!</h3>
              <p class="success-msg">
                You just made my universe light up again! I promise to cherish, respect, and love you better every single day.
              </p>

              <div class="success-actions-dock">
                <a href="#" class="btn-whatsapp-hug" id="btnWhatsappHug" target="_blank">
                  💬 Send Hug To Him on WhatsApp
                </a>
                <button type="button" class="btn-celebrate-more" id="btnCelebrateMore">
                  🎊 More Confetti!
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;

  // Init Music Player
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "I'M SO SORRY",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Page Switcher Engine
  // Opener Gate Execution
  const sorryGate = container.querySelector('#sorryGate');
  if (sorryGate) {
    const executeOpenSorryGate = () => {
      if (sorryGate.classList.contains('is-open')) return;
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#10b981', '#34d399', '#f472b6', '#ffffff']
      });
      sorryGate.classList.add('is-open');
    };
    sorryGate.addEventListener('click', executeOpenSorryGate);
  }

  // Ensure all story cards are displayed in continuous flow
  container.querySelectorAll('.sorry-page-card').forEach(card => {
    card.style.display = 'block';
    card.classList.add('active');
  });

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));
    const targetCard = container.querySelector(`.sorry-page-card[data-page="${currentPage}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons to smooth scroll instead of page toggling
  container.querySelectorAll('.btn-sorry-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-sorry-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });

  // ==========================================
  // STAGE 1: KINTSUGI HEART MENDING ENGINE & WEATHER CANVAS
  // ==========================================
  const kStage = container.querySelector('#kintsugiStage');
  const hLeft = container.querySelector('#heartHalfLeft');
  const hRight = container.querySelector('#heartHalfRight');
  const goldSeam = container.querySelector('#kintsugiGoldSeam');
  const kAura = container.querySelector('#kintsugiAura');
  const stormPill = container.querySelector('#stormStatePill');
  const battVal = container.querySelector('#heartBatteryVal');
  const rainbow = container.querySelector('#kintsugiRainbow');
  const mendBanner = container.querySelector('#sorryMendBanner');
  const btnMend = container.querySelector('#btnMendKintsugi');
  const btnWipe = container.querySelector('#btnWipeStorm');
  const waxSealBtn = container.querySelector('#letterWaxSealBtn');

  // Weather Rain & Sparkles Canvas
  const rainCanvas = container.querySelector('#kintsugiRainCanvas');
  let rainCtx = rainCanvas ? rainCanvas.getContext('2d') : null;
  let rainAnimId = null;
  let raindrops = [];
  let sunRays = [];

  function initRain() {
    if (!rainCanvas || !rainCtx) return;
    rainCanvas.width = rainCanvas.offsetWidth || 400;
    rainCanvas.height = rainCanvas.offsetHeight || 270;
    raindrops = [];
    for (let i = 0; i < 45; i++) {
      raindrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        len: 8 + Math.random() * 12,
        speed: 4 + Math.random() * 5,
        alpha: 0.2 + Math.random() * 0.4
      });
    }
  }

  function loopRain() {
    if (!rainCtx || !rainCanvas) return;
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

    if (!kintsugiHealed) {
      // Draw falling rain
      rainCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
      rainCtx.lineWidth = 1.2;
      rainCtx.beginPath();
      raindrops.forEach(drop => {
        rainCtx.moveTo(drop.x, drop.y);
        rainCtx.lineTo(drop.x - 1, drop.y + drop.len);
        drop.y += drop.speed;
        if (drop.y > rainCanvas.height) {
          drop.y = -10;
          drop.x = Math.random() * rainCanvas.width;
        }
      });
      rainCtx.stroke();
    } else {
      // Draw golden sunbeams & floating sakura motes
      sunRays.forEach(ray => {
        rainCtx.fillStyle = `rgba(251, 191, 36, ${ray.alpha})`;
        rainCtx.beginPath();
        rainCtx.arc(ray.x, ray.y, ray.r, 0, Math.PI * 2);
        rainCtx.fill();
        ray.y -= ray.speed;
        ray.x += Math.sin(ray.y * 0.05) * 0.6;
        if (ray.y < -10) {
          ray.y = rainCanvas.height + 10;
          ray.x = Math.random() * rainCanvas.width;
        }
      });
    }
    rainAnimId = requestAnimationFrame(loopRain);
  }

  initRain();
  loopRain();

  function triggerMendHeart() {
    if (kintsugiHealed) return;
    kintsugiHealed = true;

    playSound('goldSpark');
    setTimeout(() => playSound('chime'), 300);
    if (navigator.vibrate) navigator.vibrate([40, 80, 40]);

    // Spring together heart halves with GSAP
    if (hLeft) {
      gsap.to(hLeft, {
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)'
      });
    }
    if (hRight) {
      gsap.to(hRight, {
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)'
      });
    }

    // Glow kintsugi gold seam & aura
    if (goldSeam) goldSeam.style.opacity = '1';
    if (kAura) {
      kAura.style.opacity = '0.9';
      gsap.fromTo(kAura, { scale: 0.8 }, { scale: 1.3, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Reveal glowing rainbow
    if (rainbow) rainbow.style.opacity = '1';

    // Update status pills and battery
    if (stormPill) {
      stormPill.textContent = "🌈 Radiant Skies • Bond Healed";
      stormPill.style.background = "rgba(16, 185, 129, 0.25)";
      stormPill.style.color = "#6ee7b7";
      stormPill.style.borderColor = "rgba(16, 185, 129, 0.5)";
    }
    if (battVal) {
      battVal.textContent = "Heart Level: 100% 💖 (Fully Restored)";
      battVal.style.color = "#34d399";
    }

    // Setup golden sunbeams in rain canvas
    sunRays = [];
    for (let i = 0; i < 30; i++) {
      sunRays.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        r: 1.5 + Math.random() * 3,
        speed: 0.6 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.45
      });
    }

    if (mendBanner) {
      mendBanner.textContent = "✨ Golden Kintsugi Complete: Our love is now stronger and more precious than ever ❤️";
      gsap.fromTo(mendBanner, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.42 },
      colors: ['#ffd700', '#f59e0b', '#f43f5e', '#38bdf8', '#ffffff']
    });
  }

  kStage?.addEventListener('click', triggerMendHeart);
  btnMend?.addEventListener('click', triggerMendHeart);
  btnWipe?.addEventListener('click', triggerMendHeart);

  // Unseal wax letter on tap
  waxSealBtn?.addEventListener('click', () => {
    playSound('stamp');
    if (navigator.vibrate) navigator.vibrate(30);
    gsap.to(waxSealBtn, { scale: 1.25, rotation: 12, duration: 0.2, yoyo: true, repeat: 1 });
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.5 } });
  });

  // ==========================================
  // STAGE 2: VENTING ROOM WITH REAL PHOTO & ARSENAL
  // ==========================================
  const ventAvatar = container.querySelector('#ventAvatar');
  const avatarFace = container.querySelector('#avatarFace');
  const ventBubble = container.querySelector('#ventBubble');
  const angerGaugeFill = container.querySelector('#angerGaugeFill');
  const angerValText = container.querySelector('#angerValText');
  const ventCounter = container.querySelector('#ventCounterText');
  const ventDecalsLayer = container.querySelector('#ventDecalsLayer');
  const btnWipeFace = container.querySelector('#btnWipeFace');

  const funnyReactions = [
    "Ouch! That cake cream got right in my eye! 🥺🍰",
    "Direct hit with the chappal! Your aim is legendary 🩴😂",
    "Tomato squished on my nose! Still smiling because you're cute! 🍅🫶",
    "A teddy to the cheek! Softer than expected 🧸🥰",
    "Water balloon exploded! Now I'm cute AND drenched 💧",
    "Rotten egg hit! Okay I definitely deserved that one 🥚😭",
    "I'm staying right here until your heart feels warm again ❤️",
    "Throw another one! I can take a hundred more for you! 🫶",
    "Is that beautiful smile finally returning? 🥺✨"
  ];

  const throwableMap = {
    cake: { sound: 'splat', icon: '🎂', decal: '🍰', angerDelta: 20 },
    teddy: { sound: 'boing', icon: '🧸', decal: '🧸', angerDelta: 15 },
    tomato: { sound: 'splat', icon: '🍅', decal: '🍅', angerDelta: 20 },
    slipper: { sound: 'boing', icon: '🩴', decal: '🩴', angerDelta: 25 },
    water: { sound: 'splash', icon: '💧', decal: '💧', angerDelta: 20 },
    egg: { sound: 'splat', icon: '🥚', decal: '🍳', angerDelta: 20 }
  };

  container.querySelectorAll('.btn-throwable').forEach(btn => {
    btn.addEventListener('click', () => {
      ventCount++;
      const type = btn.getAttribute('data-type') || 'cake';
      const def = throwableMap[type] || throwableMap.cake;

      // Deduct anger
      angerLevel = Math.max(0, angerLevel - def.angerDelta);
      if (angerGaugeFill) angerGaugeFill.style.width = `${angerLevel}%`;
      if (angerValText) {
        if (angerLevel > 70) angerValText.textContent = `${angerLevel}% (Furious)`;
        else if (angerLevel > 40) angerValText.textContent = `${angerLevel}% (Softening up)`;
        else if (angerLevel > 0) angerValText.textContent = `${angerLevel}% (Almost Giggling)`;
        else angerValText.textContent = `0% (Anger Fully Melted 😇)`;
      }

      // Fly projectile from button to avatar
      try {
        const btnRect = btn.getBoundingClientRect();
        const avatarRect = ventAvatar ? ventAvatar.getBoundingClientRect() : null;
        if (avatarRect) {
          const projectile = document.createElement('div');
          projectile.className = 'flying-projectile';
          projectile.textContent = def.icon;
          projectile.style.left = `${btnRect.left + btnRect.width / 2}px`;
          projectile.style.top = `${btnRect.top + btnRect.height / 2}px`;
          projectile.style.transform = 'translate(-50%, -50%) scale(0.6)';
          projectile.style.opacity = '1';
          document.body.appendChild(projectile);

          requestAnimationFrame(() => {
            const targetX = avatarRect.left + avatarRect.width / 2 - (btnRect.left + btnRect.width / 2);
            const targetY = avatarRect.top + avatarRect.height / 2 - (btnRect.top + btnRect.height / 2);
            projectile.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.6) rotate(${Math.random() * 360}deg)`;
          });

          setTimeout(() => { projectile.remove(); }, 290);
        }
      } catch (err) {}

      playSound(def.sound);
      if (navigator.vibrate) navigator.vibrate([25, 35, 25]);

      if (ventAvatar) {
        gsap.fromTo(ventAvatar, 
          { x: -8, rotation: -3 }, 
          { x: 8, rotation: 3, duration: 0.08, repeat: 3, yoyo: true, ease: 'power1.inOut', onComplete: () => {
            gsap.set(ventAvatar, { x: 0, rotation: 0 });
          }}
        );
      }

      if (ventDecalsLayer) {
        const decal = document.createElement('div');
        decal.className = `vent-decal decal-${type}`;
        const rx = 18 + Math.random() * 58;
        const ry = 18 + Math.random() * 58;
        const rot = -35 + Math.random() * 70;
        const scale = 0.85 + Math.random() * 0.45;
        decal.style.left = `${rx}%`;
        decal.style.top = `${ry}%`;
        decal.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`;
        decal.textContent = def.decal;
        ventDecalsLayer.appendChild(decal);
      }

      if (ventBubble) {
        ventBubble.textContent = funnyReactions[ventCount % funnyReactions.length];
        gsap.fromTo(ventBubble, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      }

      if (avatarFace) {
        if (angerLevel === 0) avatarFace.textContent = "🥰";
        else if (angerLevel < 35) avatarFace.textContent = "🫶";
        else if (angerLevel < 70) avatarFace.textContent = "🤕";
        else avatarFace.textContent = "😭";
      }

      if (ventCounter) {
        ventCounter.innerHTML = `Hits landed: <strong>${ventCount}</strong> items stuck on face!`;
      }
    });
  });

  btnWipeFace?.addEventListener('click', () => {
    if (ventDecalsLayer) {
      gsap.to(ventDecalsLayer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.25,
        onComplete: () => {
          ventDecalsLayer.innerHTML = '';
          gsap.set(ventDecalsLayer, { opacity: 1, scale: 1 });
        }
      });
    }
    if (ventBubble) {
      ventBubble.textContent = "Face wiped sparkling clean! Ready if you want to throw more 🥺🧻";
      gsap.fromTo(ventBubble, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    }
    if (avatarFace) avatarFace.textContent = "🥺";
    playSound('boing');
    if (navigator.vibrate) navigator.vibrate(25);
  });

  // ==========================================
  // STAGE 3: INTERACTIVE PENANCE & ATONEMENT
  // ==========================================
  let viewerPunishments = [
    ...(penances && penances.length > 0 ? penances : [
      "Buy your favorite Iced Boba / Treat right now 🧋",
      "30-minute soothing massage whenever you ask 💆‍♀️",
      "Order whatever food you are craving tonight, my treat 🍕",
      "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
      "Fold all your laundry & do your chores this weekend 🧹",
      "Write 100 cute post-it notes of things I adore about you 📝"
    ])
  ].map((text, i) => ({
    id: `punishment_default_${i}`,
    text,
    checked: true,
    isCustom: false
  }));

  const penanceGrid = container.querySelector('#penanceGrid');
  const punishmentCountBadge = container.querySelector('#punishmentCountBadge');
  const inpCustomPunishment = container.querySelector('#inpCustomPunishment');
  const btnAddPunishment = container.querySelector('#btnAddPunishment');
  const btnSignPenance = container.querySelector('#btnSignPenance');
  const penanceStampedBadge = container.querySelector('#penanceStampedBadge');

  function renderPenanceGrid() {
    if (!penanceGrid) return;

    penanceGrid.innerHTML = viewerPunishments.map((item, i) => `
      <div class="penance-item-card ${item.checked ? 'checked' : ''}" data-id="${item.id}" style="cursor:pointer; user-select:none; transition:all 0.2s ease;">
        <div class="penance-check-box" style="${item.checked ? '' : 'background:rgba(255,255,255,0.15); color:transparent; box-shadow:none;'}">
          ${item.checked ? '✓' : ''}
        </div>
        <div class="penance-item-content">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="penance-badge" style="${item.isCustom ? 'color:#38bdf8;' : ''}">
              ${item.isCustom ? '⭐ CUSTOM PUNISHMENT' : `PUNISHMENT #0${i + 1}`}
            </span>
            ${item.isCustom ? `
              <button type="button" class="btn-del-penance" data-id="${item.id}" title="Remove custom punishment" style="background:transparent; border:none; color:#f87171; font-size:14px; cursor:pointer; padding:2px 6px;">✕</button>
            ` : ''}
          </div>
          <p class="penance-text" style="${item.checked ? '' : 'opacity:0.55; text-decoration:line-through;'}">${item.text}</p>
        </div>
      </div>
    `).join('');

    const activeCount = viewerPunishments.filter(p => p.checked).length;
    if (punishmentCountBadge) {
      if (activeCount === 0) {
        punishmentCountBadge.textContent = "⚖️ No punishments selected (He got off easy! Tap items to select or add above)";
        punishmentCountBadge.style.color = "#94a3b8";
      } else {
        punishmentCountBadge.textContent = `⚖️ ${activeCount} punishment${activeCount > 1 ? 's' : ''} assigned to boyfriend!`;
        punishmentCountBadge.style.color = "#fbbf24";
      }
    }

    penanceGrid.querySelectorAll('.penance-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-del-penance')) return;
        const id = card.getAttribute('data-id');
        const target = viewerPunishments.find(p => p.id === id);
        if (target) {
          target.checked = !target.checked;
          playSound(target.checked ? 'boing' : 'splat');
          if (navigator.vibrate) navigator.vibrate(18);
          renderPenanceGrid();
        }
      });
    });

    penanceGrid.querySelectorAll('.btn-del-penance').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        viewerPunishments = viewerPunishments.filter(p => p.id !== id);
        playSound('splat');
        if (navigator.vibrate) navigator.vibrate(20);
        renderPenanceGrid();
      });
    });
  }

  function handleAddCustomPunishment() {
    if (!inpCustomPunishment) return;
    const val = inpCustomPunishment.value.trim();
    if (!val) {
      inpCustomPunishment.focus();
      return;
    }
    viewerPunishments.push({
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: val,
      checked: true,
      isCustom: true
    });
    inpCustomPunishment.value = '';
    renderPenanceGrid();
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate(30);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  }

  btnAddPunishment?.addEventListener('click', handleAddCustomPunishment);
  inpCustomPunishment?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomPunishment();
    }
  });

  btnSignPenance?.addEventListener('click', () => {
    penancesSigned = true;
    playSound('stamp');
    if (navigator.vibrate) navigator.vibrate(40);
    btnSignPenance.style.display = 'none';
    if (penanceStampedBadge) {
      penanceStampedBadge.style.display = 'inline-block';
      gsap.fromTo(penanceStampedBadge, { scale: 0.5, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' });
    }
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.65 } });
  });

  renderPenanceGrid();

  // ==========================================
  // STAGE 4: POLAROIDS 3D FLIP & VOICE NOTE
  // ==========================================
  container.querySelectorAll('.sorry-polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });

  const btnPlayVoiceMemo = container.querySelector('#btnPlayVoiceMemo');
  const voiceMemoStatus = container.querySelector('#voiceMemoStatus');
  let isVoicePlaying = false;
  btnPlayVoiceMemo?.addEventListener('click', () => {
    isVoicePlaying = !isVoicePlaying;
    playSound('chime');
    if (isVoicePlaying) {
      btnPlayVoiceMemo.textContent = "⏸";
      if (voiceMemoStatus) voiceMemoStatus.textContent = "Playing confession note... 🎙️❤️";
      gsap.to('#voiceSoundwave span', {
        scaleY: 1.8,
        duration: 0.25,
        repeat: -1,
        yoyo: true,
        stagger: 0.08
      });
    } else {
      btnPlayVoiceMemo.textContent = "▶";
      if (voiceMemoStatus) voiceMemoStatus.textContent = "Paused (0:48)";
      gsap.killTweensOf('#voiceSoundwave span');
      gsap.set('#voiceSoundwave span', { scaleY: 1 });
    }
  });

  // ==========================================
  // STAGE 5: PEACE TREATY - SIGNATURE & 2-SECOND HOLD
  // ==========================================
  const sigCanvas = container.querySelector('#treatySigCanvas');
  const btnClearSig = container.querySelector('#btnClearSig');
  let sigCtx = sigCanvas ? sigCanvas.getContext('2d') : null;
  let isDrawingSig = false;

  if (sigCtx) {
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.strokeStyle = '#b45309';

    function getCanvasPos(e) {
      const rect = sigCanvas.getBoundingClientRect();
      const cx = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const cy = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
      return {
        x: (cx - rect.left) * (sigCanvas.width / rect.width),
        y: (cy - rect.top) * (sigCanvas.height / rect.height)
      };
    }

    function startSig(e) {
      isDrawingSig = true;
      const pos = getCanvasPos(e);
      sigCtx.beginPath();
      sigCtx.moveTo(pos.x, pos.y);
    }
    function drawSig(e) {
      if (!isDrawingSig) return;
      if (e.cancelable) e.preventDefault();
      const pos = getCanvasPos(e);
      sigCtx.lineTo(pos.x, pos.y);
      sigCtx.stroke();
    }
    function endSig() {
      isDrawingSig = false;
    }

    sigCanvas.addEventListener('mousedown', startSig);
    sigCanvas.addEventListener('mousemove', drawSig);
    window.addEventListener('mouseup', endSig);
    sigCanvas.addEventListener('touchstart', startSig, { passive: false });
    sigCanvas.addEventListener('touchmove', drawSig, { passive: false });
    window.addEventListener('touchend', endSig);

    btnClearSig?.addEventListener('click', () => {
      sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      playSound('splat');
    });
  }

  // 2-Second Hold Seal
  const treatyHoldBtn = container.querySelector('#treatyHoldButton');
  const treatyHoldRing = container.querySelector('#treatyHoldRing');
  const treatyHoldLinearBar = container.querySelector('#treatyHoldLinearBar');
  const treatyHoldInstruction = container.querySelector('#treatyHoldInstruction');
  const treatyConvincedCard = container.querySelector('#treatyConvincedCard');
  const treatyBtnIcon = container.querySelector('#treatyBtnIcon');

  const ringCircumference = 289;
  const requiredHoldMs = 2000;
  let holdStartTime = 0;
  let holdRafId = null;
  let isHoldActive = false;

  function onHoldStart(e) {
    if (treatySigned) return;
    if (e.cancelable) e.preventDefault();
    isHoldActive = true;
    holdStartTime = performance.now();
    treatyHoldBtn?.classList.add('holding');

    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "Hold firmly... Signing peace treaty... ⏳";
      treatyHoldInstruction.style.color = "#d97706";
    }
    if (navigator.vibrate) navigator.vibrate(25);

    function step(now) {
      if (!isHoldActive) return;
      const elapsed = now - holdStartTime;
      const progress = Math.min(1, elapsed / requiredHoldMs);

      if (treatyHoldRing) treatyHoldRing.style.strokeDashoffset = `${ringCircumference * (1 - progress)}`;
      if (treatyHoldLinearBar) treatyHoldLinearBar.style.width = `${progress * 100}%`;

      if (progress >= 1) {
        onHoldComplete();
      } else {
        holdRafId = requestAnimationFrame(step);
      }
    }
    holdRafId = requestAnimationFrame(step);
  }

  function onHoldEnd() {
    if (treatySigned) return;
    if (!isHoldActive) return;
    isHoldActive = false;
    if (holdRafId) cancelAnimationFrame(holdRafId);
    treatyHoldBtn?.classList.remove('holding');

    if (treatyHoldRing) treatyHoldRing.style.strokeDashoffset = `${ringCircumference}`;
    if (treatyHoldLinearBar) treatyHoldLinearBar.style.width = `0%`;
    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "👆 Press & Hold for 2 full seconds to sign!";
      treatyHoldInstruction.style.color = "#78350f";
    }
  }

  function onHoldComplete() {
    treatySigned = true;
    isHoldActive = false;
    if (holdRafId) cancelAnimationFrame(holdRafId);

    playSound('stamp');
    setTimeout(() => playSound('chime'), 200);
    if (navigator.vibrate) navigator.vibrate([60, 100, 60, 140]);

    if (treatyBtnIcon) treatyBtnIcon.textContent = "✅";
    if (treatyHoldBtn) {
      treatyHoldBtn.style.background = "#10b981";
      treatyHoldBtn.style.borderColor = "#34d399";
      treatyHoldBtn.style.transform = "scale(1.05)";
    }
    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "✨ Treaty Officially Ratified by Her Majesty!";
      treatyHoldInstruction.style.color = "#059669";
    }

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ff4d6d', '#fbbf24', '#10b981', '#38bdf8', '#ffd700']
    });

    if (treatyConvincedCard) {
      treatyConvincedCard.style.display = 'block';
      gsap.fromTo(treatyConvincedCard,
        { scale: 0.65, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(2)' }
      );
    }
  }

  treatyHoldBtn?.addEventListener('pointerdown', onHoldStart);
  window.addEventListener('pointerup', onHoldEnd);
  window.addEventListener('pointercancel', onHoldEnd);
  treatyHoldBtn?.addEventListener('touchstart', onHoldStart, { passive: false });
  window.addEventListener('touchend', onHoldEnd);
  window.addEventListener('touchcancel', onHoldEnd);

  // ==========================================
  // STAGE 6: REAL SCRATCH-OFF FOIL ON COUPONS
  // ==========================================
  container.querySelectorAll('.scratch-coupon-canvas').forEach(canvas => {
    const sCtx = canvas.getContext('2d');
    if (!sCtx) return;

    // Fill with metallic gold foil texture
    canvas.width = canvas.offsetWidth || 280;
    canvas.height = canvas.offsetHeight || 90;

    const goldGrad = sCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#d97706');
    goldGrad.addColorStop(0.3, '#fde047');
    goldGrad.addColorStop(0.5, '#fbbf24');
    goldGrad.addColorStop(0.8, '#f59e0b');
    goldGrad.addColorStop(1, '#b45309');
    sCtx.fillStyle = goldGrad;
    sCtx.fillRect(0, 0, canvas.width, canvas.height);

    sCtx.fillStyle = '#78350f';
    sCtx.font = 'bold 12px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('🪙 RUB TO SCRATCH & REVEAL 🪙', canvas.width / 2, canvas.height / 2 + 4);

    let isScratching = false;

    function scratch(x, y) {
      sCtx.globalCompositeOperation = 'destination-out';
      sCtx.beginPath();
      sCtx.arc(x, y, 18, 0, Math.PI * 2);
      sCtx.fill();
      playSound('scratch');
    }

    function getCanvasCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const cy = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
      return {
        x: (cx - rect.left) * (canvas.width / rect.width),
        y: (cy - rect.top) * (canvas.height / rect.height)
      };
    }

    canvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const p = getCanvasCoords(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const p = getCanvasCoords(e);
      scratch(p.x, p.y);
    });
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const p = getCanvasCoords(e);
      scratch(p.x, p.y);
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (!isScratching) return;
      const p = getCanvasCoords(e);
      scratch(p.x, p.y);
    }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });
  });

  container.querySelectorAll('.sorry-coupon-card').forEach(card => {
    const btn = card.querySelector('.btn-claim-coupon');
    btn?.addEventListener('click', () => {
      playSound('chime');
      if (navigator.vibrate) navigator.vibrate(25);
      card.classList.add('claimed');
      btn.textContent = "Claimed ✓";
      btn.style.background = "#22c55e";
      btn.style.borderColor = "#22c55e";
      // Fade away scratch canvas
      const cvs = card.querySelector('.scratch-coupon-canvas');
      if (cvs) gsap.to(cvs, { opacity: 0, duration: 0.3, onComplete: () => { cvs.style.display = 'none'; } });
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
    });
  });

  // ==========================================
  // STAGE 7: RUNAWAY NO & YES VERDICT FINALE
  // ==========================================
  const btnNo = container.querySelector('#btnForgiveNo');
  const btnYes = container.querySelector('#btnForgiveYes');
  const successCard = container.querySelector('#forgiveSuccessCard');
  const btnWhatsappHug = container.querySelector('#btnWhatsappHug');
  const btnCelebrateMore = container.querySelector('#btnCelebrateMore');

  const runawayQuotes = [
    "No 😠",
    "Nice try! 😜",
    "You know you miss me! 🥰",
    "I'll make you breakfast in bed! 🥞",
    "Look into my puppy eyes 🐶",
    "Can't catch me! 🏃‍♂️💨",
    "Tap YES instead! ❤️",
    "Please baby? 🥺",
    "I'm on my knees! 🧎‍♂️",
    "Unlimited cuddles guaranteed! 🧸",
    "You know I love you! 💕"
  ];
  let quoteIdx = 0;
  let dodgeCount = 0;

  function dodgeNo() {
    dodgeCount++;
    playSound('boing');
    const rx = (Math.random() - 0.5) * 260;
    const ry = (Math.random() - 0.5) * 160;
    const scale = Math.max(0.72, 1 - dodgeCount * 0.04);
    gsap.to(btnNo, {
      x: rx,
      y: ry,
      scale: scale,
      duration: 0.2,
      ease: 'back.out(2)'
    });
    quoteIdx = (quoteIdx + 1) % runawayQuotes.length;
    btnNo.textContent = runawayQuotes[quoteIdx];
    if (navigator.vibrate) navigator.vibrate(15);
  }

  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault();
    dodgeNo();
  });

  btnYes?.addEventListener('click', () => {
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

    if (btnNo) btnNo.style.display = 'none';
    if (btnYes) btnYes.style.display = 'none';

    if (successCard) {
      successCard.style.display = 'block';
      gsap.fromTo(successCard,
        { scale: 0.6, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
      );
    }

    const waMsg = encodeURIComponent(`I forgive you my love! 🥰❤️ Let's never fight again. I love you! 🫂✨`);
    if (btnWhatsappHug) {
      btnWhatsappHug.href = `https://wa.me/?text=${waMsg}`;
    }

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff4d6d', '#fbbf24', '#10b981', '#38bdf8', '#a855f7', '#ffd700']
    });
  });

  btnCelebrateMore?.addEventListener('click', () => {
    playSound('chime');
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  });

  // Medium zoom for polaroids
  try {
    mediumZoom(container.querySelectorAll('.polaroid-front img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  // Keepsake download
  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.sorry-polaroid-card') || btn.closest('.polaroid-front');
      if (!card) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Rendering...';
      btn.style.opacity = '0.7';

      html2canvas(card, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `apology-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff4d6d', '#fbbf24', '#f59e0b', '#38bdf8']
        });
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.opacity = '1';
        }, 2200);
      }).catch(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
      });
    });
  });
}
