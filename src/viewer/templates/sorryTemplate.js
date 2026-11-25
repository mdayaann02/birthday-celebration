// src/viewer/templates/sorryTemplate.js - Ultra-Aesthetic Sincere Apology & Playful Reconciliation Experience
// Engineered with Lovable Design Standards, React Bits Visual Suite (BlurText, ClickSpark, ShinyText, StarBorder),
// Japanese Kintsugi Heart Mending, Realistic Parabolic Throwable Physics, Digital Gold Signature Canvas,
// Real Scratch-Off Gold Foil Coupons, 2-Second Treaty Ratification Seal, and Playful Runaway Verdict.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initBlurText, initClickSpark, initShinyText, initStarBorder, initMagneticButton } from '../../utils/reactBitsEffects.js';

// Web Audio Sound Synthesizer for tactile haptics & emotional chords
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'unseal') {
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      node.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      node.start(now);
    } else if (type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.26);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'splat') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);
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
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.24);
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
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.25);
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
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.42);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } else if (type === 'victoryFanfare') {
      const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.22, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.75);
      });
    }
  } catch {}
}

export function renderSorryTemplate(container, data = {}) {
  let angerLevel = 100;
  let ventCount = 0;
  let penancesSigned = false;
  let treatySigned = false;
  let kintsugiHealed = false;
  let heartLevel = 15;

  const recipientName = data.recipientName || 'My Dearest';
  const senderName = data.senderName || 'Yours Truly';
  const heroTitle = data.heroTitle || "I'm Truly Sorry";
  const heroSubtitle = data.heroSubtitle || "My universe feels heavy, gray, and completely empty when we aren't okay 🥺";
  const apologyMessage = data.apologyMessage || "I know I made a mistake, and seeing you upset hurts me more than anything. My intention was never to make you feel hurt or unheard. You mean everything to me, and I take full accountability. I promise to listen, understand, and cherish you better every single day.";

  let penances = (data.penances && data.penances.length > 0) ? [...data.penances] : [
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

  const chapters = [
    { id: 'ch-confession', icon: '💌', label: 'Confession' },
    { id: 'ch-kintsugi', icon: '✨', label: 'Mend Heart' },
    { id: 'ch-venting', icon: '🥊', label: 'Vent Room' },
    { id: 'ch-penance', icon: '⚖️', label: 'Penance' },
    { id: 'ch-memories', icon: '📸', label: 'Memories' },
    { id: 'ch-treaty', icon: '📜', label: 'Peace Treaty' },
    { id: 'ch-coupons', icon: '🎟️', label: 'Coupons' },
    { id: 'ch-verdict', icon: '💖', label: 'Verdict' }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-storybook-viewport" id="sorryStorybookViewport">
      <!-- Ambient Candlelight & Ember Canvas -->
      <canvas id="sorryAmbientCanvas" class="sorry-ambient-canvas"></canvas>

      <!-- SACRED APOLOGY OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="sorryGate" role="button" tabindex="0" aria-label="Tap to open heartfelt apology">
        <div class="bro-gate-circuit-bg" aria-hidden="true"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring"></div>
          <div class="bro-gate-emoji-crest">
            🕊️❤️‍🩹
          </div>
          <div class="bro-gate-badge">
            SINCERE ATONEMENT & HEALING
          </div>
          <h2 class="bro-gate-title">
            From the Bottom of My Heart
          </h2>
          <p class="bro-gate-label">
            A sincere confession, golden peace treaty, and promise to make things right.
          </p>
          <div class="bro-gate-hint">
            🕊️ TAP TO HEAR MY SINCERE HEART ✨
          </div>
        </div>
      </div>

      <!-- SLEEK FLOATING CHAPTER TIMELINE DOCK (Lovable Navigation) -->
      <nav class="sorry-timeline-dock" id="sorryTimelineDock" aria-label="Storybook Chapters">
        <div class="timeline-pills-track">
          ${chapters.map((ch, idx) => `
            <button type="button" class="timeline-pill ${idx === 0 ? 'active' : ''}" data-target="${ch.id}" title="${ch.label}">
              <span class="timeline-pill-icon">${ch.icon}</span>
              <span class="timeline-pill-label">${ch.label}</span>
            </button>
          `).join('')}
        </div>
        <div class="timeline-progress-rail">
          <div class="timeline-progress-bar" id="timelineProgressBar" style="width: 12.5%;"></div>
        </div>
      </nav>

      <!-- ============================================================ -->
      <!-- CONTINUOUS IMMERSIVE STORYBOOK FLOW (8 CHAPTERS)             -->
      <!-- ============================================================ -->
      <main class="sorry-narrative-flow" id="sorryNarrativeFlow">

        <!-- ========================================================== -->
        <!-- CHAPTER 1: 💌 THE SINCERE CONFESSION LETTER                -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-confession">
          <div class="chapter-badge">CHAPTER I • SINCERE CONFESSION</div>
          
          <div class="confession-hero-header">
            <div class="sorry-avatar-pulse" id="avatarEmoji">🥺</div>
            <h1 class="sorry-main-title" id="sorryHeroTitle">${heroTitle}</h1>
            <p class="sorry-main-sub">${heroSubtitle}</p>
          </div>

          <!-- Interactive 3D Wax-Sealed Parchment Envelope -->
          <div class="envelope-showcase-card" id="envelopeCard">
            <div class="envelope-outer ${window.isCelebrationEditorMode ? 'unsealed' : ''}" id="envelopeOuter">
              <!-- Envelope Flap & Wax Seal -->
              <div class="envelope-flap" id="envelopeFlap"></div>
              <div class="wax-seal-btn" id="waxSealBtn" role="button" tabindex="0" title="Tap to crack seal and read letter">
                <span class="seal-gem">❤️‍🩹</span>
                <span class="seal-ripple"></span>
              </div>
              
              <!-- Letter Parchment Sliding Out -->
              <div class="letter-sheet" id="letterSheet">
                <div class="letter-sheet-texture"></div>
                <div class="letter-greeting">Dearest ${recipientName},</div>
                <div class="letter-body typewriter-ready" id="letterBodyText">
                  ${apologyMessage}
                </div>
                <div class="letter-valediction">
                  <span>Forever yours with all my love,</span>
                  <strong class="letter-signature">${senderName} 🫶</strong>
                </div>
              </div>
            </div>

            <div class="envelope-hint" id="envelopeHint">
              ${window.isCelebrationEditorMode ? 'Letter is open' : '👆 Tap the wax seal to crack it open & read my sincere letter'}
            </div>
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-kintsugi">
              <span>Mend Our Broken Heart With Gold</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 2: ✨ JAPANESE KINTSUGI HEART MENDING ARENA         -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-kintsugi">
          <div class="chapter-badge">CHAPTER II • KINTSUGI PHILOSOPHY</div>
          <h2 class="chapter-heading">Mend Our Heart With Gold ✨</h2>
          <p class="chapter-subheading">
            In Japanese art, cracked pottery is repaired with pure gold lacquer—making it far stronger and more beautiful for having been broken.
          </p>

          <div class="kintsugi-card" id="kintsugiCard">
            <!-- Weather Overlay Canvas (Drizzle -> Warm Sunbeams) -->
            <canvas id="kintsugiWeatherCanvas" class="kintsugi-weather-canvas"></canvas>

            <!-- Rainbow Arc (Appears upon 100% healing) -->
            <div id="kintsugiRainbow" class="kintsugi-rainbow-arc"></div>

            <!-- Status Indicator Header -->
            <div class="kintsugi-status-row">
              <span class="kintsugi-weather-pill" id="kintsugiWeatherPill">
                🌧️ Melancholic Storm Active
              </span>
              <span class="kintsugi-health-val" id="kintsugiHealthVal">
                Bond Strength: <strong>${heartLevel}%</strong>
              </span>
            </div>

            <!-- Heart Visual Stage (Interactive Seam) -->
            <div class="kintsugi-stage-box" id="kintsugiStageBox" role="button" tabindex="0" title="Tap or drag gold across seam to mend">
              <!-- Left Fragment -->
              <svg id="heartHalfLeft" class="heart-half-svg left" viewBox="0 0 100 160">
                <path d="M 95 30 C 95 10, 70 0, 45 0 C 20 0, 0 20, 0 55 C 0 95, 45 130, 95 155 Z" fill="url(#kintsugiLeftGrad)"/>
                <defs>
                  <linearGradient id="kintsugiLeftGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#f87171"/>
                    <stop offset="100%" stop-color="#dc2626"/>
                  </linearGradient>
                </defs>
              </svg>

              <!-- Right Fragment -->
              <svg id="heartHalfRight" class="heart-half-svg right" viewBox="0 0 100 160">
                <path d="M 5 30 C 5 10, 30 0, 55 0 C 80 0, 100 20, 100 55 C 100 95, 55 130, 5 155 Z" fill="url(#kintsugiRightGrad)"/>
                <defs>
                  <linearGradient id="kintsugiRightGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fb7185"/>
                    <stop offset="100%" stop-color="#e11d48"/>
                  </linearGradient>
                </defs>
              </svg>

              <!-- Glowing Gold Lacquer Seam -->
              <svg id="kintsugiGoldSeam" class="kintsugi-gold-seam" viewBox="0 0 40 160">
                <path d="M 20 5 L 26 35 L 14 65 L 25 95 L 16 125 L 20 155" fill="none" stroke="#fbbf24" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="26" cy="35" r="3.5" fill="#ffffff" />
                <circle cx="14" cy="65" r="3.5" fill="#ffffff" />
                <circle cx="25" cy="95" r="3.5" fill="#ffffff" />
              </svg>

              <!-- Golden Healing Halo -->
              <div id="kintsugiHalo" class="kintsugi-halo"></div>
            </div>

            <!-- Dynamic Dialogue Banner -->
            <div class="kintsugi-speech-bubble" id="kintsugiSpeechBubble">
              "Tap or drag the golden spark to seal our crack with pure molten gold 🥺✨"
            </div>

            <!-- Healing Controls -->
            <div class="kintsugi-actions-dock">
              <button type="button" class="btn-mend-gold" id="btnMendGold">
                ✨ Apply Golden Lacquer
              </button>
              <button type="button" class="btn-clear-storm" id="btnWipeStorm">
                🌈 Dispel Storm
              </button>
            </div>
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-venting">
              <span>Let Out Your Anger in the Vent Room</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 3: 🥊 CATHARTIC VENT ROOM (PLAYFUL ARSENAL)        -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-venting">
          <div class="chapter-badge">CHAPTER III • CATHARTIC SMACKDOWN</div>
          <h2 class="chapter-heading">Take Your Anger Out On Me! 🥊</h2>
          <p class="chapter-subheading">
            You have every right to be furious. Pick up anything below and fling it right at my face—zero complaints!
          </p>

          <div class="vent-chamber-card">
            <!-- Anger Thermometer -->
            <div class="anger-thermometer-box">
              <div class="thermometer-header">
                <span class="thermometer-label">🔥 ANGER THERMOMETER:</span>
                <span class="thermometer-val" id="angerValText">100% FURIOUS</span>
              </div>
              <div class="thermometer-track">
                <div class="thermometer-fill" id="angerGaugeFill" style="width: 100%;"></div>
              </div>
            </div>

            <!-- Interactive Reaction Avatar -->
            <div class="vent-avatar-stage">
              <div class="vent-target-chassis" id="ventAvatar">
                <img src="${creatorPhoto}" alt="${senderName}" class="vent-creator-img" id="ventCreatorImg" onerror="this.src='/images/always_you.jpg'" />
                <div class="vent-decals-layer" id="ventDecalsLayer"></div>
                <div class="vent-mood-badge" id="avatarFace">🥺</div>
              </div>
              <div class="vent-speech-bubble" id="ventBubble">
                "I know you're mad at me... I'm listening 🥺"
              </div>
              <button type="button" class="btn-wipe-clean" id="btnWipeFace">
                🧻 Wipe Face Clean
              </button>
            </div>

            <!-- Throwable Arsenal Grid -->
            <div class="throwable-arsenal-grid" id="throwablesGrid">
              <button type="button" class="btn-arsenal-item" data-type="cake" title="Throw Birthday Cake">
                <span class="item-icon">🎂</span>
                <span class="item-name">Cake Splat</span>
                <span class="item-stat">Splat! (-20% Mad)</span>
              </button>
              <button type="button" class="btn-arsenal-item" data-type="teddy" title="Throw Soft Teddy">
                <span class="item-icon">🧸</span>
                <span class="item-name">Soft Teddy</span>
                <span class="item-stat">Boing! (-15% Mad)</span>
              </button>
              <button type="button" class="btn-arsenal-item" data-type="tomato" title="Throw Juicy Tomato">
                <span class="item-icon">🍅</span>
                <span class="item-name">Juicy Tomato</span>
                <span class="item-stat">Squish! (-20% Mad)</span>
              </button>
              <button type="button" class="btn-arsenal-item" data-type="slipper" title="Throw Flying Slipper">
                <span class="item-icon">🩴</span>
                <span class="item-name">The Chappal</span>
                <span class="item-stat">WHACK! (-25% Mad)</span>
              </button>
              <button type="button" class="btn-arsenal-item" data-type="water" title="Throw Water Balloon">
                <span class="item-icon">💧</span>
                <span class="item-name">Water Balloon</span>
                <span class="item-stat">Splash! (-20% Mad)</span>
              </button>
              <button type="button" class="btn-arsenal-item" data-type="boba" title="Throw Boba Cup">
                <span class="item-icon">🧋</span>
                <span class="item-name">Boba Splash</span>
                <span class="item-stat">Sweet hit! (-20% Mad)</span>
              </button>
            </div>

            <div class="vent-hits-counter" id="ventCounterText">
              Hits landed: <strong>0</strong> times
            </div>
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-penance">
              <span>Review & Assign My Punishments</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 4: ⚖️ SACRED PENANCES & CUSTOM PROMISES            -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-penance">
          <div class="chapter-badge">CHAPTER IV • ATONEMENT & PENANCE</div>
          <h2 class="chapter-heading">Pick & Add My Punishments! ⚖️</h2>
          <p class="chapter-subheading">
            Check off what you want me to do, or write your own custom punishments below! I promise to execute all of them without groaning:
          </p>

          <div class="penance-showcase-card">
            <!-- Add Custom Punishment Form -->
            <div class="add-punishment-form">
              <input type="text" id="inpCustomPunishment" class="inp-custom-punishment" placeholder="Type custom penance (e.g. 5 iced bobas, clean room)..." maxlength="120" />
              <button type="button" id="btnAddPunishment" class="btn-add-punishment">
                <span>+ Add</span>
              </button>
            </div>

            <div class="penance-count-badge" id="punishmentCountBadge">
              ⚖️ Loading punishments...
            </div>

            <div class="penances-list" id="penanceGrid"></div>

            <!-- Legally Binding Stamp Dock -->
            <div class="penance-stamp-dock">
              <button type="button" class="btn-ratify-penance" id="btnSignPenance">
                ⚖️ Stamp These As Legally Binding
              </button>
              <div class="penance-stamped-seal" id="penanceStampedBadge" style="display:none;">
                🔴 RATIFIED & GUARANTEED BY BOYFRIEND
              </div>
            </div>
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-memories">
              <span>Look At Why You Mean The World</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 5: 📸 CHERISHED MEMORIES KEEPSAKE & VOICE MEMO      -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-memories">
          <div class="chapter-badge">CHAPTER V • CHERISHED MEMORIES</div>
          <h2 class="chapter-heading">Remember Why We Fell In Love 📸</h2>
          <p class="chapter-subheading">
            Tap any polaroid to flip it and read the secret handwritten memory on the back:
          </p>

          <!-- Voice Apology Memo Player -->
          <div class="voice-apology-card" id="sorryVoiceCard">
            <button type="button" id="btnPlayVoiceMemo" class="btn-voice-play" aria-label="Play voice note">
              <span id="voicePlayIcon">▶</span>
            </button>
            <div class="voice-info-col">
              <div class="voice-title">Voice Apology from ${senderName} 🎙️</div>
              <div class="voice-status" id="voiceMemoStatus">Tap play to listen to my voice note (0:48)</div>
              <div class="voice-waveform" id="voiceSoundwave">
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
              </div>
            </div>
          </div>

          <!-- Staggered Cascading Polaroid Deck (Lovable Cd Pattern) -->
          <div class="cascading-polaroids-deck" id="polaroidsDeck">
            ${polaroids.map((p, i) => {
              const tilt = [-3, 3, -2, 4][i % 4];
              return `
                <div class="polaroid-wrapper" data-idx="${i}" style="--tilt:${tilt}deg;">
                  <div class="polaroid-flipper">
                    <!-- Front -->
                    <div class="polaroid-face front">
                      <div class="polaroid-tape"></div>
                      <div class="polaroid-photo-frame">
                        <img src="${p.image}" alt="Memory" loading="lazy" onerror="this.src='/images/sunset.jpg'" />
                        <span class="polaroid-hint-chip">Tap to flip 🔄</span>
                      </div>
                      <div class="polaroid-front-caption">${p.caption}</div>
                      <button type="button" class="btn-save-polaroid" title="Save keepsake polaroid">
                        📸 Save Keepsake
                      </button>
                    </div>
                    <!-- Back -->
                    <div class="polaroid-face back">
                      <div class="polaroid-back-content">
                        <span class="quote-sign">“</span>
                        <p class="back-note-text">${p.note || p.caption}</p>
                        <span class="back-author">— Forever Yours ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-treaty">
              <span>Sign The Official Peace Treaty</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 6: 📜 THE OFFICIAL SWEETHEART ACCORDS PEACE TREATY  -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-treaty">
          <div class="chapter-badge">CHAPTER VI • OFFICIAL DIPLOMACY</div>
          <h2 class="chapter-heading">The Sweetheart Accords 📜</h2>
          <p class="chapter-subheading">
            An irrevocable legal peace treaty protecting your sovereignty, happiness, and supreme royal authority:
          </p>

          <div class="treaty-parchment-document" id="treatyDocCard">
            <div class="treaty-filigree-border"></div>
            <div class="treaty-header-block">
              <span class="treaty-royal-crest">👑</span>
              <h3 class="treaty-formal-title rb-shiny-text">THE SWEETHEART ACCORDS</h3>
              <p class="treaty-parties-tag">Between: ${recipientName} (The Queen) & ${senderName} (The Dork)</p>
            </div>

            <div class="treaty-articles-stack">
              ${treatyClauses.map((clause, idx) => `
                <div class="treaty-article-row">
                  <span class="article-roman">Article ${['I', 'II', 'III', 'IV', 'V', 'VI'][idx] || (idx+1)}:</span>
                  <p class="article-clause-text">${clause}</p>
                </div>
              `).join('')}
            </div>

            <!-- Digital Gold Signature Canvas Pad -->
            <div class="treaty-signature-dock">
              <div class="sig-label-row">
                <span>✍️ Her Royal Majesty's Digital Signature:</span>
                <button type="button" id="btnClearSig" class="btn-sig-clear">Clear</button>
              </div>
              <div class="sig-canvas-chassis">
                <canvas id="treatySigCanvas" width="340" height="95"></canvas>
                <div class="sig-watermark">Sign with finger or stylus here</div>
              </div>
            </div>

            <!-- 2-Second Hold Ratification Button -->
            <div class="treaty-hold-dock">
              <div class="treaty-hold-seal-wrapper">
                <svg class="treaty-hold-svg" width="108" height="108" viewBox="0 0 108 108">
                  <circle cx="54" cy="54" r="48" stroke="rgba(245, 158, 11, 0.25)" stroke-width="7" fill="none" />
                  <circle id="treatyHoldRing" cx="54" cy="54" r="48" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" fill="none"
                    stroke-dasharray="301" stroke-dashoffset="301" />
                </svg>
                <div class="treaty-hold-button" id="treatyHoldButton" role="button" aria-label="Hold for 2 seconds to ratify peace treaty">
                  <span class="treaty-seal-icon" id="treatyBtnIcon">👑</span>
                </div>
              </div>

              <!-- Linear Timer Bar -->
              <div class="treaty-linear-bar-rail">
                <div id="treatyHoldLinearBar" class="treaty-linear-bar-fill"></div>
              </div>

              <div class="treaty-hold-instruction" id="treatyHoldInstruction">
                👆 Press & Hold for 2 Seconds to Ratify Peace Treaty!
              </div>

              <!-- Celebratory Ratified Banner -->
              <div class="treaty-convinced-banner" id="treatyConvincedCard" style="display:none;">
                <div class="convinced-emoji">🎉🥳💖</div>
                <h4 class="convinced-heading">TREATY OFFICIALLY RATIFIED!</h4>
                <p class="convinced-desc">
                  The Peace Treaty is officially ratified & signed by Her Majesty Queen ${recipientName}! All penances guaranteed! 🥰💖
                </p>
                <div class="convinced-seal-badge">
                  <span>👑 SEALED & RATIFIED BY QUEEN ${recipientName.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-coupons">
              <span>Scratch Your VIP Reconciliation Vouchers</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 7: 🎟️ RECONCILIATION COUPONS (REAL SCRATCH FOIL)    -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-coupons">
          <div class="chapter-badge">CHAPTER VII • VIP VOUCHERS</div>
          <h2 class="chapter-heading">Scratch & Claim Your Peace Vouchers 🎟️</h2>
          <p class="chapter-subheading">
            Rub your finger over the golden foil to scratch and reveal your prizes! Guaranteed non-expiring and redeemable 24/7:
          </p>

          <div class="coupons-stack">
            ${coupons.map((c, i) => `
              <div class="coupon-gold-card" data-idx="${i}">
                <div class="coupon-icon-box">${c.icon}</div>
                <div class="coupon-info-box">
                  <h4 class="coupon-title">${c.title}</h4>
                  <p class="coupon-description">${c.desc}</p>
                </div>
                <!-- Interactive Scratch Canvas Overlay -->
                <canvas class="scratch-foil-canvas" data-scratch-idx="${i}" width="320" height="95"></canvas>
                <button type="button" class="btn-claim-voucher">
                  Claim
                </button>
              </div>
            `).join('')}
          </div>

          <div class="chapter-continue-bar">
            <button type="button" class="btn-chapter-flow" data-scroll-to="ch-verdict">
              <span>The Final Forgiveness Verdict</span>
              <span class="flow-arrow">↓</span>
            </button>
          </div>
        </section>

        <!-- ========================================================== -->
        <!-- CHAPTER 8: 💖 THE GRAND FORGIVENESS VERDICT                 -->
        <!-- ========================================================== -->
        <section class="sorry-chapter-section" id="ch-verdict">
          <div class="chapter-badge">FINAL STAGE • THE ROYAL VERDICT</div>
          
          <div class="verdict-center-card" id="verdictCard">
            <div class="verdict-emoji-pulse">🥺👉👈</div>
            <h2 class="verdict-heading">
              Will You Please Forgive Me? ❤️
            </h2>
            <p class="verdict-subheading">
              I love you with every beat of my heart. Life is too gray, quiet, and lonely without your sweet smile.
            </p>

            <div class="verdict-decision-stage" id="sorryDecisionArea">
              <button type="button" class="btn-forgive-yes" id="btnForgiveYes">
                YES, I Forgive You! ❤️🫂
              </button>
              <button type="button" class="btn-forgive-no" id="btnForgiveNo">
                No 😠
              </button>
            </div>

            <!-- Toast alert for runaway No button -->
            <div class="runaway-toast" id="runawayToast" style="display:none;"></div>

            <!-- Celebration Certificate of Forgiveness (Appears after YES) -->
            <div class="reconciliation-certificate" id="forgiveSuccessCard" style="display:none;">
              <div class="cert-crest">🎉🫂💖</div>
              <h3 class="cert-title rb-shiny-text">WE ARE OFFICIALLY BACK!</h3>
              <p class="cert-msg">
                You just made my universe light up again! I promise to cherish, respect, and love you better every single day of my life.
              </p>

              <div class="cert-actions-dock">
                <a href="#" class="btn-whatsapp-hug" id="btnWhatsappHug" target="_blank" rel="noopener">
                  💬 Send Hug To Him on WhatsApp
                </a>
                <button type="button" class="btn-celebrate-more" id="btnCelebrateMore">
                  🎊 More Golden Confetti!
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;

  // =========================================================================
  // INIT MUSIC PLAYER
  // =========================================================================
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "I'M SO SORRY",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // =========================================================================
  // REACT BITS ENHANCEMENTS
  // =========================================================================
  try {
    // 1. BlurText on main hero title
    initBlurText(container.querySelector('#sorryHeroTitle'), {
      delay: 0.15,
      stagger: 0.05,
      duration: 0.85
    });

    // 2. ClickSpark on interactive elements
    initClickSpark(container.querySelector('#envelopeCard'), {
      sparkColor: '#f59e0b',
      sparkCount: 12
    });

    initClickSpark(container.querySelector('#kintsugiCard'), {
      sparkColor: '#fbbf24',
      sparkCount: 10
    });

    // 3. ShinyText on royal crest titles
    initShinyText(container.querySelectorAll('.rb-shiny-text'));

    // 4. StarBorder on verdict card
    initStarBorder(container.querySelector('#verdictCard'));
    initStarBorder(container.querySelector('#treatyDocCard'));

    // 5. Magnetic Button on Yes Button
    initMagneticButton(container.querySelector('#btnForgiveYes'), 0.2);
  } catch (err) {
    console.warn('React Bits init warning:', err);
  }

  // =========================================================================
  // AMBIENT CANDLELIGHT & EMBER CANVAS
  // =========================================================================
  const ambientCanvas = container.querySelector('#sorryAmbientCanvas');
  if (ambientCanvas) {
    const actx = ambientCanvas.getContext('2d');
    let motes = [];
    let ambAnim = null;

    function resizeAmbient() {
      ambientCanvas.width = container.clientWidth * (window.devicePixelRatio || 1);
      ambientCanvas.height = container.clientHeight * (window.devicePixelRatio || 1);
      actx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeAmbient();

    for (let i = 0; i < 40; i++) {
      motes.push({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        r: 1 + Math.random() * 2.2,
        vy: -0.3 - Math.random() * 0.45,
        vx: (Math.random() - 0.5) * 0.25,
        alpha: 0.2 + Math.random() * 0.45,
        color: Math.random() > 0.4 ? '#f59e0b' : '#fb7185'
      });
    }

    function loopAmbient() {
      actx.clearRect(0, 0, container.clientWidth, container.clientHeight);
      motes.forEach(m => {
        m.y += m.vy;
        m.x += m.vx;
        if (m.y < -10) {
          m.y = container.clientHeight + 10;
          m.x = Math.random() * container.clientWidth;
        }
        actx.save();
        actx.globalAlpha = m.alpha;
        actx.fillStyle = m.color;
        actx.shadowColor = m.color;
        actx.shadowBlur = 6;
        actx.beginPath();
        actx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        actx.fill();
        actx.restore();
      });
      ambAnim = requestAnimationFrame(loopAmbient);
    }
    loopAmbient();
  }

  // =========================================================================
  // GATE UNLOCK INTERACTION
  // =========================================================================
  const sorryGate = container.querySelector('#sorryGate');
  if (sorryGate) {
    const executeOpenSorryGate = () => {
      if (sorryGate.classList.contains('is-open')) return;
      playSound('chime');
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#f87171', '#ffffff']
      });
      sorryGate.classList.add('is-open');
    };
    sorryGate.addEventListener('click', executeOpenSorryGate);
  }

  // =========================================================================
  // TIMELINE DOCK & SMOOTH CHAPTER SCROLLING
  // =========================================================================
  const timelineDock = container.querySelector('#sorryTimelineDock');
  const pills = container.querySelectorAll('.timeline-pill');
  const progressBar = container.querySelector('#timelineProgressBar');

  function smoothScrollTo(targetId) {
    const targetEl = container.querySelector(`#${targetId}`);
    if (!targetEl) return;

    const chassis = container.closest('.preview-frame-container') || container.closest('#previewContainer') || window;
    const offset = 80;
    
    if (chassis === window) {
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      const top = targetEl.offsetTop - offset;
      chassis.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // Bind chapter continue buttons
  container.querySelectorAll('.btn-chapter-flow').forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('unseal');
      const target = btn.getAttribute('data-scroll-to');
      smoothScrollTo(target);
    });
  });

  // Bind timeline pills
  pills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      playSound('goldSpark');
      const target = pill.getAttribute('data-target');
      smoothScrollTo(target);
    });
  });

  // Track active chapter during scroll
  const chapterSections = container.querySelectorAll('.sorry-chapter-section');
  const scrollChassis = container.closest('.preview-frame-container') || container.closest('#previewContainer') || window;

  function updateActiveChapter() {
    let currentIdx = 0;
    const viewCenter = window.innerHeight * 0.45;

    chapterSections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= viewCenter && rect.bottom >= viewCenter) {
        currentIdx = idx;
      }
    });

    pills.forEach((p, idx) => {
      if (idx === currentIdx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (progressBar) {
      const progressPct = ((currentIdx + 1) / chapterSections.length) * 100;
      progressBar.style.width = `${progressPct}%`;
    }
  }

  scrollChassis.addEventListener('scroll', updateActiveChapter, { passive: true });

  // =========================================================================
  // CHAPTER 1: WAX SEAL & 3D ENVELOPE UNSEALING
  // =========================================================================
  const waxSealBtn = container.querySelector('#waxSealBtn');
  const envelopeOuter = container.querySelector('#envelopeOuter');
  const envelopeHint = container.querySelector('#envelopeHint');

  if (waxSealBtn && envelopeOuter) {
    waxSealBtn.addEventListener('click', () => {
      if (envelopeOuter.classList.contains('unsealed')) return;
      playSound('unseal');
      playSound('chime');

      gsap.to(waxSealBtn, {
        scale: 1.4,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          envelopeOuter.classList.add('unsealed');
          if (envelopeHint) envelopeHint.textContent = 'Letter unsealed with love ❤️';
          
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.4 },
            colors: ['#f59e0b', '#fbbf24', '#f87171']
          });
        }
      });
    });
  }

  // =========================================================================
  // CHAPTER 2: KINTSUGI HEART MENDING ENGINE
  // =========================================================================
  const weatherCanvas = container.querySelector('#kintsugiWeatherCanvas');
  const heartLeft = container.querySelector('#heartHalfLeft');
  const heartRight = container.querySelector('#heartHalfRight');
  const goldSeam = container.querySelector('#kintsugiGoldSeam');
  const halo = container.querySelector('#kintsugiHalo');
  const rainbow = container.querySelector('#kintsugiRainbow');
  const weatherPill = container.querySelector('#kintsugiWeatherPill');
  const healthVal = container.querySelector('#kintsugiHealthVal');
  const speechBubble = container.querySelector('#kintsugiSpeechBubble');
  const btnMend = container.querySelector('#btnMendGold');
  const btnWipe = container.querySelector('#btnWipeStorm');
  const kintsugiStage = container.querySelector('#kintsugiStageBox');

  let rainActive = true;
  let rainDrops = [];
  let wCtx = weatherCanvas ? weatherCanvas.getContext('2d') : null;
  let wAnim = null;

  if (weatherCanvas) {
    function resizeWeather() {
      weatherCanvas.width = weatherCanvas.parentElement.clientWidth * (window.devicePixelRatio || 1);
      weatherCanvas.height = weatherCanvas.parentElement.clientHeight * (window.devicePixelRatio || 1);
      wCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeWeather();

    for (let i = 0; i < 35; i++) {
      rainDrops.push({
        x: Math.random() * weatherCanvas.parentElement.clientWidth,
        y: Math.random() * weatherCanvas.parentElement.clientHeight,
        len: 8 + Math.random() * 12,
        speed: 4 + Math.random() * 5
      });
    }

    function loopWeather() {
      const pW = weatherCanvas.parentElement.clientWidth;
      const pH = weatherCanvas.parentElement.clientHeight;
      wCtx.clearRect(0, 0, pW, pH);

      if (rainActive) {
        wCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
        wCtx.lineWidth = 1.2;
        wCtx.beginPath();
        rainDrops.forEach(d => {
          wCtx.moveTo(d.x, d.y);
          wCtx.lineTo(d.x - 1, d.y + d.len);
          d.y += d.speed;
          d.x -= 0.5;
          if (d.y > pH) {
            d.y = -10;
            d.x = Math.random() * pW;
          }
        });
        wCtx.stroke();
      }
      wAnim = requestAnimationFrame(loopWeather);
    }
    loopWeather();
  }

  function triggerMendStep() {
    if (kintsugiHealed) return;
    heartLevel = Math.min(100, heartLevel + 22);
    playSound('goldSpark');

    // Pull pieces together
    const offset = Math.max(0, 8 - (heartLevel / 100) * 8);
    if (heartLeft) heartLeft.style.transform = `rotate(${-9 + (heartLevel/100)*9}deg) translateX(-${offset}px)`;
    if (heartRight) heartRight.style.transform = `rotate(${9 - (heartLevel/100)*9}deg) translateX(${offset}px)`;

    // Seam opacity
    if (goldSeam) {
      goldSeam.style.opacity = `${0.2 + (heartLevel / 100) * 0.8}`;
      gsap.fromTo(goldSeam, { scale: 1.05 }, { scale: 1, duration: 0.3 });
    }

    if (healthVal) healthVal.innerHTML = `Bond Strength: <strong>${heartLevel}%</strong>`;

    if (heartLevel >= 100) {
      kintsugiHealed = true;
      rainActive = false;
      playSound('chime');

      if (halo) halo.style.opacity = '1';
      if (rainbow) rainbow.style.opacity = '1';
      if (weatherPill) {
        weatherPill.textContent = '☀️ Radiant Golden Sunshine Active';
        weatherPill.classList.add('sunny');
      }
      if (speechBubble) {
        speechBubble.textContent = '“Our bond is fully mended with pure golden love! Far stronger than before ❤️✨”';
      }

      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#f43f5e']
      });
    } else {
      if (speechBubble) {
        speechBubble.textContent = `Keep mending! Our heart is ${heartLevel}% healed with gold ✨`;
      }
    }
  }

  if (btnMend) btnMend.addEventListener('click', triggerMendStep);
  if (kintsugiStage) kintsugiStage.addEventListener('click', triggerMendStep);
  if (btnWipe) {
    btnWipe.addEventListener('click', () => {
      rainActive = false;
      playSound('chime');
      if (weatherPill) {
        weatherPill.textContent = '☀️ Clouds Parting into Sunshine';
        weatherPill.classList.add('sunny');
      }
    });
  }

  // =========================================================================
  // CHAPTER 3: CATHARTIC VENT ROOM (PARABOLIC THROWABLE ARSENAL)
  // =========================================================================
  const ventAvatar = container.querySelector('#ventAvatar');
  const ventCreatorImg = container.querySelector('#ventCreatorImg');
  const ventDecalsLayer = container.querySelector('#ventDecalsLayer');
  const avatarFace = container.querySelector('#avatarFace');
  const ventBubble = container.querySelector('#ventBubble');
  const angerGaugeFill = container.querySelector('#angerGaugeFill');
  const angerValText = container.querySelector('#angerValText');
  const ventCounterText = container.querySelector('#ventCounterText');
  const btnWipeFace = container.querySelector('#btnWipeFace');

  const throwableIcons = {
    cake: '🎂',
    teddy: '🧸',
    tomato: '🍅',
    slipper: '🩴',
    water: '💧',
    boba: '🧋'
  };

  const reactionQuotes = [
    "Ouch! Okay, I completely deserved that 🥺",
    "Direct hit! You have great aim baby 🎯",
    "I'm listening and I hear your anger 🥺❤️",
    "Throw another one if it helps you feel lighter! 🥊",
    "I'm so sorry for making you upset... 💔",
    "Are you feeling even a tiny bit better now? 🥺"
  ];

  function launchThrowable(type, btnEl) {
    ventCount++;
    angerLevel = Math.max(0, angerLevel - 18);

    // Play tactile sound
    if (type === 'teddy') playSound('boing');
    else if (type === 'slipper') playSound('splat');
    else if (type === 'water' || type === 'boba') playSound('splash');
    else playSound('splat');

    // Create flying projectile
    const rect = btnEl.getBoundingClientRect();
    const targetRect = ventAvatar.getBoundingClientRect();

    const proj = document.createElement('div');
    proj.className = 'flying-projectile';
    proj.textContent = throwableIcons[type] || '🎂';
    proj.style.left = `${rect.left + rect.width / 2}px`;
    proj.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(proj);

    const destX = targetRect.left + targetRect.width / 2 - 18;
    const destY = targetRect.top + targetRect.height / 2 - 18;

    gsap.to(proj, {
      left: destX,
      top: destY,
      duration: 0.32,
      ease: 'power2.in',
      rotation: 360,
      onComplete: () => {
        proj.remove();

        // Wobble avatar
        gsap.fromTo(ventAvatar,
          { scale: 0.9, rotation: -12 },
          { scale: 1, rotation: 0, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' }
        );

        // Add decal on avatar
        const decal = document.createElement('div');
        decal.className = 'vent-decal';
        decal.textContent = throwableIcons[type];
        decal.style.left = `${20 + Math.random() * 60}%`;
        decal.style.top = `${20 + Math.random() * 60}%`;
        if (ventDecalsLayer) ventDecalsLayer.appendChild(decal);

        // Update face and speech
        if (avatarFace) avatarFace.textContent = angerLevel === 0 ? '🥹' : '🥺';
        if (ventBubble) {
          ventBubble.textContent = reactionQuotes[ventCount % reactionQuotes.length];
        }

        // Update anger gauge
        if (angerGaugeFill) angerGaugeFill.style.width = `${angerLevel}%`;
        if (angerValText) {
          if (angerLevel > 60) angerValText.textContent = `${angerLevel}% FURIOUS`;
          else if (angerLevel > 20) angerValText.textContent = `${angerLevel}% VENTED`;
          else angerValText.textContent = `0% SOOTHED & CALM 🥰`;
        }

        if (ventCounterText) {
          ventCounterText.innerHTML = `Hits landed: <strong>${ventCount}</strong> times`;
        }
      }
    });
  }

  container.querySelectorAll('.btn-arsenal-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      launchThrowable(type, btn);
    });
  });

  if (btnWipeFace) {
    btnWipeFace.addEventListener('click', () => {
      if (ventDecalsLayer) ventDecalsLayer.innerHTML = '';
      if (avatarFace) avatarFace.textContent = '🥺';
      if (ventBubble) ventBubble.textContent = '"Face wiped clean! Ready to hear your verdict 🥺"';
    });
  }

  // =========================================================================
  // CHAPTER 4: PENANCE CHECKLIST & CUSTOM ADD
  // =========================================================================
  const penanceGrid = container.querySelector('#penanceGrid');
  const countBadge = container.querySelector('#punishmentCountBadge');
  const inpCustom = container.querySelector('#inpCustomPunishment');
  const btnAdd = container.querySelector('#btnAddPunishment');
  const btnSignPenance = container.querySelector('#btnSignPenance');
  const penanceStampedBadge = container.querySelector('#penanceStampedBadge');

  function renderPenanceList() {
    if (!penanceGrid) return;
    penanceGrid.innerHTML = penances.map((item, idx) => `
      <div class="penance-row checked" data-penance-idx="${idx}">
        <div class="penance-checkbox">✓</div>
        <div class="penance-content">
          <span class="penance-num">PENANCE #${idx + 1}</span>
          <p class="penance-label">${item}</p>
        </div>
        <button type="button" class="btn-del-penance" data-idx="${idx}" title="Remove punishment">✕</button>
      </div>
    `).join('');

    if (countBadge) {
      countBadge.innerHTML = `⚖️ <strong>${penances.length}</strong> Mandatory Penances Assigned & Guaranteed`;
    }

    penanceGrid.querySelectorAll('.penance-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.btn-del-penance')) return;
        row.classList.toggle('checked');
        playSound('boing');
      });
    });

    penanceGrid.querySelectorAll('.btn-del-penance').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        penances.splice(idx, 1);
        renderPenanceList();
      });
    });
  }
  renderPenanceList();

  if (btnAdd && inpCustom) {
    const handleAdd = () => {
      const val = inpCustom.value.trim();
      if (!val) return;
      penances.push(val);
      inpCustom.value = '';
      playSound('chime');
      renderPenanceList();
    };
    btnAdd.addEventListener('click', handleAdd);
    inpCustom.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdd();
    });
  }

  if (btnSignPenance) {
    btnSignPenance.addEventListener('click', () => {
      playSound('stamp');
      penancesSigned = true;
      btnSignPenance.style.display = 'none';
      if (penanceStampedBadge) {
        penanceStampedBadge.style.display = 'inline-block';
        gsap.fromTo(penanceStampedBadge, { scale: 2, rotation: 15 }, { scale: 1, rotation: -2, duration: 0.35, ease: 'back.out(1.5)' });
      }
    });
  }

  // =========================================================================
  // CHAPTER 5: POLAROID 3D FLIP & VOICE MEMO
  // =========================================================================
  container.querySelectorAll('.polaroid-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.btn-save-polaroid')) return;
      wrapper.classList.toggle('flipped');
      playSound('unseal');
    });

    const btnSave = wrapper.querySelector('.btn-save-polaroid');
    if (btnSave) {
      btnSave.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('goldSpark');
        html2canvas(wrapper).then(canvas => {
          const link = document.createElement('a');
          link.download = `Keepsake-Memory-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      });
    }
  });

  const btnVoice = container.querySelector('#btnPlayVoiceMemo');
  const voiceSoundwave = container.querySelector('#voiceSoundwave');
  const voiceMemoStatus = container.querySelector('#voiceMemoStatus');
  let isVoicePlaying = false;

  if (btnVoice) {
    btnVoice.addEventListener('click', () => {
      isVoicePlaying = !isVoicePlaying;
      if (isVoicePlaying) {
        playSound('chime');
        btnVoice.querySelector('#voicePlayIcon').textContent = '⏸';
        if (voiceSoundwave) voiceSoundwave.classList.add('playing');
        if (voiceMemoStatus) voiceMemoStatus.textContent = 'Playing heartfelt voice confession... (0:24 / 0:48)';
      } else {
        btnVoice.querySelector('#voicePlayIcon').textContent = '▶';
        if (voiceSoundwave) voiceSoundwave.classList.remove('playing');
        if (voiceMemoStatus) voiceMemoStatus.textContent = 'Voice note paused. Tap to resume.';
      }
    });
  }

  // =========================================================================
  // CHAPTER 6: TREATY SIGNATURE & 2-SECOND PRESS AND HOLD RATIFICATION
  // =========================================================================
  const sigCanvas = container.querySelector('#treatySigCanvas');
  const btnClearSig = container.querySelector('#btnClearSig');

  if (sigCanvas) {
    const sCtx = sigCanvas.getContext('2d');
    let isDrawing = false;

    function getCoords(e) {
      const rect = sigCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (sigCanvas.width / rect.width),
        y: (clientY - rect.top) * (sigCanvas.height / rect.height)
      };
    }

    function startDraw(e) {
      isDrawing = true;
      const p = getCoords(e);
      sCtx.beginPath();
      sCtx.moveTo(p.x, p.y);
      sCtx.lineWidth = 2.5;
      sCtx.lineCap = 'round';
      sCtx.strokeStyle = '#d97706';
    }

    function draw(e) {
      if (!isDrawing) return;
      const p = getCoords(e);
      sCtx.lineTo(p.x, p.y);
      sCtx.stroke();
    }

    function stopDraw() {
      isDrawing = false;
    }

    sigCanvas.addEventListener('mousedown', startDraw);
    sigCanvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
    sigCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      draw(e);
    }, { passive: false });
    window.addEventListener('touchend', stopDraw);

    if (btnClearSig) {
      btnClearSig.addEventListener('click', () => {
        sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      });
    }
  }

  // 2-Second Hold Button
  const holdBtn = container.querySelector('#treatyHoldButton');
  const holdRing = container.querySelector('#treatyHoldRing');
  const holdLinear = container.querySelector('#treatyHoldLinearBar');
  const holdInstr = container.querySelector('#treatyHoldInstruction');
  const convincedCard = container.querySelector('#treatyConvincedCard');

  let holdStart = null;
  let holdAnim = null;
  const holdDuration = 2000;

  function onHoldStart(e) {
    if (treatySigned) return;
    e.preventDefault();
    holdStart = performance.now();
    holdBtn.classList.add('holding');
    playSound('unseal');

    function step(now) {
      const elapsed = now - holdStart;
      const progress = Math.min(1, elapsed / holdDuration);

      if (holdRing) {
        const offset = 301 - progress * 301;
        holdRing.style.strokeDashoffset = offset;
      }
      if (holdLinear) {
        holdLinear.style.width = `${progress * 100}%`;
      }

      if (progress < 1) {
        holdAnim = requestAnimationFrame(step);
      } else {
        onHoldComplete();
      }
    }
    holdAnim = requestAnimationFrame(step);
  }

  function onHoldEnd() {
    if (treatySigned) return;
    if (holdAnim) cancelAnimationFrame(holdAnim);
    holdBtn.classList.remove('holding');
    if (holdRing) holdRing.style.strokeDashoffset = '301';
    if (holdLinear) holdLinear.style.width = '0%';
  }

  function onHoldComplete() {
    treatySigned = true;
    playSound('victoryFanfare');

    if (holdBtn) holdBtn.style.display = 'none';
    if (holdInstr) holdInstr.style.display = 'none';
    if (convincedCard) {
      convincedCard.style.display = 'block';
      gsap.fromTo(convincedCard, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' });
    }

    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#10b981', '#f43f5e']
    });
  }

  if (holdBtn) {
    holdBtn.addEventListener('mousedown', onHoldStart);
    holdBtn.addEventListener('mouseup', onHoldEnd);
    holdBtn.addEventListener('mouseleave', onHoldEnd);

    holdBtn.addEventListener('touchstart', onHoldStart, { passive: false });
    holdBtn.addEventListener('touchend', onHoldEnd);
    holdBtn.addEventListener('touchcancel', onHoldEnd);
  }

  // =========================================================================
  // CHAPTER 7: REAL GOLD FOIL SCRATCH-OFF COUPONS
  // =========================================================================
  container.querySelectorAll('.scratch-foil-canvas').forEach(canvas => {
    const sCtx = canvas.getContext('2d');
    let isScratching = false;

    function initFoil() {
      sCtx.fillStyle = '#f59e0b';
      sCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold shimmer grain
      sCtx.fillStyle = '#fbbf24';
      for (let i = 0; i < 200; i++) {
        sCtx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }

      sCtx.font = 'bold 13px Inter, sans-serif';
      sCtx.fillStyle = '#78350f';
      sCtx.textAlign = 'center';
      sCtx.fillText('🪙 Scratch Golden Foil to Reveal', canvas.width / 2, canvas.height / 2 + 5);
    }
    initFoil();

    function scratchAt(x, y) {
      sCtx.globalCompositeOperation = 'destination-out';
      sCtx.beginPath();
      sCtx.arc(x, y, 16, 0, Math.PI * 2);
      sCtx.fill();
      playSound('scratch');
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    canvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const p = getPos(e);
      scratchAt(p.x, p.y);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const p = getPos(e);
      scratchAt(p.x, p.y);
    });

    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const p = getPos(e);
      scratchAt(p.x, p.y);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!isScratching) return;
      const p = getPos(e);
      scratchAt(p.x, p.y);
    }, { passive: true });

    window.addEventListener('touchend', () => { isScratching = false; });
  });

  container.querySelectorAll('.btn-claim-voucher').forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('chime');
      btn.textContent = 'Claimed! ✨';
      btn.style.background = '#10b981';
      btn.style.color = '#fff';

      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 }
      });
    });
  });

  // =========================================================================
  // CHAPTER 8: GRAND FORGIVENESS VERDICT & RUNAWAY NO BUTTON
  // =========================================================================
  const btnYes = container.querySelector('#btnForgiveYes');
  const btnNo = container.querySelector('#btnForgiveNo');
  const decisionArea = container.querySelector('#sorryDecisionArea');
  const toast = container.querySelector('#runawayToast');
  const successCard = container.querySelector('#forgiveSuccessCard');
  const btnWhatsappHug = container.querySelector('#btnWhatsappHug');
  const btnCelebrateMore = container.querySelector('#btnCelebrateMore');

  const runawayExcuses = [
    "Error 404: 'No' button vanished! 🏃‍♂️💨",
    "Nice try! But you love me too much 😉",
    "The button slipped away on purpose! 🥺",
    "Wait, think about all the iced bobas! 🧋",
    "Nope! Only 'YES' is allowed in this jurisdiction ❤️",
    "Come on baby, hit the YES button! 🫂"
  ];
  let excuseIdx = 0;

  function dodgeNo() {
    playSound('boing');
    const maxX = 120;
    const maxY = 50;
    const randX = (Math.random() - 0.5) * maxX * 2;
    const randY = (Math.random() - 0.5) * maxY * 2;

    gsap.to(btnNo, {
      x: randX,
      y: randY,
      duration: 0.22,
      ease: 'power2.out'
    });

    if (toast) {
      toast.textContent = runawayExcuses[excuseIdx % runawayExcuses.length];
      toast.style.display = 'block';
      excuseIdx++;
      gsap.fromTo(toast, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 });
    }
  }

  if (btnNo) {
    btnNo.addEventListener('mouseenter', dodgeNo);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNo();
    }, { passive: false });
    btnNo.addEventListener('click', dodgeNo);
  }

  if (btnYes) {
    btnYes.addEventListener('click', () => {
      playSound('victoryFanfare');

      if (decisionArea) decisionArea.style.display = 'none';
      if (toast) toast.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'block';
        gsap.fromTo(successCard,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
        );
      }

      // Massive confetti shower
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#f87171', '#10b981', '#ffffff']
      });

      // Prepare WhatsApp hug link
      if (btnWhatsappHug) {
        const text = encodeURIComponent(`I forgive you baby! ❤️🫂 We are back together! Let's get boba and never fight again ✨`);
        btnWhatsappHug.href = `https://wa.me/?text=${text}`;
      }
    });
  }

  if (btnCelebrateMore) {
    btnCelebrateMore.addEventListener('click', () => {
      playSound('chime');
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f87171', '#10b981']
      });
    });
  }
}
