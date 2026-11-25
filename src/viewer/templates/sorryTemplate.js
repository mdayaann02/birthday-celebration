// src/viewer/templates/sorryTemplate.js - The Page-by-Page Realistic Apology & Vent Sanctuary
// Rebuilt on the Long Wish (blossomTemplate) Fullscreen Scene Architecture:
// Scene 1: The Candlelit Gateway (Atmosphere)
// Scene 2: The Sincere Confession Letter (Parchment & Wax Seal)
// Scene 3: The Realistic Tactile Venting Room (Physics, Recoil, Liquid Splats, Anger Release)
// Scene 4: Four Sacred Promises (Accountability & Understanding)
// Scene 5: Cherished Memories & Voice Memo (Lovable Staggered Polaroids)
// Scene 6: The Olive Branch (2-Second Hold-to-Heal Finale)
// Strictly Page-by-Page. Zero progress bars. 60FPS butter-smooth performance.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initBlurText, initShinyText, initStarBorder, initMagneticButton } from '../../utils/reactBitsEffects.js';

// Real-time Web Audio Synthesizer for tactile feedback & sound effects
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'candle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === 'unseal') {
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      node.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      node.start(now);
    } else if (type === 'punch') {
      // Heavy physical punch thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'splat') {
      // Realistic juicy tomato / liquid squish
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.22);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'whack') {
      // High-speed sharp slipper whack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.16);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'splash') {
      // Water / boba splash
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.2);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      node.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      node.start(now);
    } else if (type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'chime') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    } else if (type === 'victory') {
      [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.22, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
    }
  } catch {}
}

export function renderSorryTemplate(container, data = {}, isMakerReview = false) {
  let activeScene = 1;
  const totalScenes = 6;
  let angerLevel = 100;
  let ventCount = 0;

  const recipientName = data.recipientName || 'My Love';
  const senderName = data.senderName || 'Yours Always';
  const heroTitle = data.heroTitle || "I'm So Sorry, My Love";
  const heroSubtitle = data.heroSubtitle || "My universe feels heavy, gray, and completely quiet when you are hurt 🥺";
  const apologyMessage = data.apologyMessage || "I know I made a mistake, and seeing you upset hurts me more than anything in this world. My intention was never to make you feel unheard, neglected, or unvalued. I take full accountability. You mean everything to me, and I promise to listen with an open heart, protect your peace above my pride, and cherish you better every single day.";
  const creatorPhoto = data.creatorPhoto || "/images/always_you.jpg";

  const reflections = [
    {
      icon: "🕊️",
      tag: "ACCOUNTABILITY",
      title: "Where I Fell Short",
      desc: "I recognize that my words or actions caused you pain. I'm not here to justify myself or make excuses—I hear you, I see your hurt, and I take full responsibility for causing it."
    },
    {
      icon: "👂",
      tag: "LISTENING FIRST",
      title: "How It Made You Feel",
      desc: "You had every right to feel upset, disappointed, and hurt. Your emotions are completely valid, and I am learning to slow down and listen without being reactive or defensive."
    },
    {
      icon: "🛡️",
      tag: "OUR FUTURE",
      title: "What I Promise Moving Forward",
      desc: "To communicate with gentleness, to check in on how you feel before assuming, and to protect your peace above my pride. You deserve to always feel safe and cherished with me."
    },
    {
      icon: "💖",
      tag: "GRATITUDE",
      title: "Why You Are Irreplaceable",
      desc: "You are the brightest, sweetest, kindest part of my life. Even on our quietest days, having you by my side is the greatest blessing I will never take for granted."
    }
  ];

  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your sweet smile 🌅", note: "The peace I feel next to you is unmatched. I promise to protect that peace forever." },
    { image: "/images/always_you.jpg", caption: "You are my safest home 🫶", note: "Whenever the world is chaotic, one smile from you puts everything back together." },
    { image: "/images/pretty.jpg", caption: "Forever the one I adore ✨", note: "You deserve the softest, purest love in the world. I'm striving to be that for you every day." }
  ];

  const audioTitle = data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib";
  const audioSubtitle = data.audioSubtitle || "HEARTFELT CONFESSION";
  const audioSrc = data.audioSrc || "/audio/alfaaz.mp3";

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-film-stage" id="sorryFilmStage">

      <!-- ======================================================== -->
      <!-- SCENE 1: THE CANDLELIT SANCTUARY (ACT I)                -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-hero-fullscreen active" data-scene="1" id="scene1">
        <div class="scene-inner-frame">
          
          <!-- Interactive Flickering Candle Gateway -->
          <div class="candle-gateway" id="candleGateway" role="button" tabindex="0" title="Tap to light the candle & hear my heart">
            <div class="candle-glow-aura" id="candleAura"></div>
            <div class="candle-flame" id="candleFlame">
              <span class="flame-inner"></span>
            </div>
            <div class="candle-body"></div>
            <div class="candle-label" id="candleLabel">
              🕯️ Tap to light candle
            </div>
          </div>

          <div class="hero-text-block">
            <span class="scene-chapter-badge">CHAPTER I • SINCERE ATONEMENT</span>
            <h1 class="hero-confession-title" id="heroConfessionTitle">${heroTitle}</h1>
            <p class="hero-confession-sub">${heroSubtitle}</p>
          </div>

          <div class="scene-cta-dock">
            <button type="button" class="btn-scene-next" data-next-scene="2">
              <span class="btn-next-spark">✦</span>
              <span class="btn-next-text">Read My Sincere Letter</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SCENE 2: THE SINCERE CONFESSION LETTER (ACT II)         -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-letter-fullscreen" data-scene="2" id="scene2" style="display:none; opacity:0;">
        <div class="scene-inner-frame">
          
          <div class="scene-top-nav">
            <button type="button" class="btn-scene-back" data-prev-scene="1">❮ Back</button>
            <span class="scene-chapter-badge">CHAPTER II • THE CONFESSION</span>
          </div>

          <!-- 3D Wax-Sealed Parchment Envelope -->
          <div class="parchment-letter-card" id="parchmentCard">
            <div class="wax-seal-crest" id="waxSealCrest" role="button" tabindex="0" title="Tap to crack seal and open letter">
              <span class="wax-icon">🕊️</span>
              <span class="wax-ripple"></span>
            </div>

            <div class="parchment-inner">
              <div class="parchment-greeting">Dearest ${recipientName},</div>
              <div class="parchment-body">
                ${apologyMessage}
              </div>
              <div class="parchment-valediction">
                <span>Forever yours with all my love,</span>
                <strong class="parchment-sign">${senderName} 🫶</strong>
              </div>
            </div>
            <div class="parchment-hint" id="parchmentHint">👆 Tap the crimson wax seal to unseal the letter</div>
          </div>

          <div class="scene-cta-dock">
            <button type="button" class="btn-scene-next" data-next-scene="3">
              <span class="btn-next-spark">✦</span>
              <span class="btn-next-text">Enter The Venting Room</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SCENE 3: THE REALISTIC VENTING ROOM (ACT III)           -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-vent-fullscreen" data-scene="3" id="scene3" style="display:none; opacity:0;">
        <div class="scene-inner-frame">
          
          <div class="scene-top-nav">
            <button type="button" class="btn-scene-back" data-prev-scene="2">❮ Back</button>
            <span class="scene-chapter-badge">CHAPTER III • CATHARTIC SMACKDOWN</span>
          </div>

          <div class="vent-chamber-header">
            <h2 class="vent-chamber-title">Take Your Frustration Out On Me! 🥊</h2>
            <p class="vent-chamber-sub">You have every right to be angry. Fling items directly at the target—zero complaints!</p>
          </div>

          <div class="vent-chamber-box" id="ventChamberBox">
            <!-- Tension Release Thermometer -->
            <div class="vent-tension-track-wrap">
              <div class="vent-tension-header">
                <span class="vent-tension-label">🔥 ANGER LEVEL:</span>
                <span class="vent-tension-val" id="ventTensionVal">100% FURIOUS</span>
              </div>
              <div class="vent-tension-track">
                <div class="vent-tension-fill" id="ventTensionFill" style="width: 100%;"></div>
              </div>
            </div>

            <!-- Realistic Framed Target with Glass Overlay -->
            <div class="vent-framed-target-wrap" id="ventTargetFrame">
              <div class="vent-target-chassis" id="ventTargetChassis">
                <img src="${creatorPhoto}" alt="${senderName}" class="vent-photo-img" id="ventPhotoImg" onerror="this.src='/images/always_you.jpg'" />
                <!-- Glass overlay where liquid splats and dents stick -->
                <div class="vent-glass-decal-layer" id="ventDecalLayer"></div>
                <div class="vent-mood-pill" id="ventMoodPill">🥺</div>
              </div>
              
              <div class="vent-reaction-bubble" id="ventBubble">
                "I know you're mad at me... I'm listening 🥺"
              </div>

              <button type="button" class="btn-wipe-glass" id="btnWipeGlass">
                🧻 Wipe Glass Clean
              </button>
            </div>

            <!-- Realistic Tactile Throwable Arsenal -->
            <div class="realistic-arsenal-grid" id="arsenalGrid">
              <button type="button" class="btn-real-arsenal" data-type="punch" title="Boxing Glove Punch">
                <span class="arsenal-icon">🥊</span>
                <span class="arsenal-name">Boxing Punch</span>
                <span class="arsenal-fx">Heavy Thud!</span>
              </button>
              <button type="button" class="btn-real-arsenal" data-type="tomato" title="Juicy Red Tomato">
                <span class="arsenal-icon">🍅</span>
                <span class="arsenal-name">Ripe Tomato</span>
                <span class="arsenal-fx">Juicy Splat!</span>
              </button>
              <button type="button" class="btn-real-arsenal" data-type="whack" title="The Flying Slipper / Chappal">
                <span class="arsenal-icon">🩴</span>
                <span class="arsenal-name">The Chappal</span>
                <span class="arsenal-fx">Sharp Whack!</span>
              </button>
              <button type="button" class="btn-real-arsenal" data-type="splash" title="Water Splash">
                <span class="arsenal-icon">💧</span>
                <span class="arsenal-name">Water Splash</span>
                <span class="arsenal-fx">Wet Drip!</span>
              </button>
              <button type="button" class="btn-real-arsenal" data-type="boba" title="Spilled Iced Boba">
                <span class="arsenal-icon">🧋</span>
                <span class="arsenal-name">Boba Cup</span>
                <span class="arsenal-fx">Sweet Stain!</span>
              </button>
              <button type="button" class="btn-real-arsenal" data-type="teddy" title="Soft Fluffy Teddy">
                <span class="arsenal-icon">🧸</span>
                <span class="arsenal-name">Soft Teddy</span>
                <span class="arsenal-fx">Gentle Boing!</span>
              </button>
            </div>

            <div class="vent-hits-counter" id="ventHitsCounter">
              Hits landed: <strong>0</strong> times
            </div>
          </div>

          <div class="scene-cta-dock">
            <button type="button" class="btn-scene-next" data-next-scene="4">
              <span class="btn-next-spark">✦</span>
              <span class="btn-next-text">Review My Four Sacred Promises</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SCENE 4: FOUR SACRED PROMISES (ACT IV)                  -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-reflections-fullscreen" data-scene="4" id="scene4" style="display:none; opacity:0;">
        <div class="scene-inner-frame">
          
          <div class="scene-top-nav">
            <button type="button" class="btn-scene-back" data-prev-scene="3">❮ Back</button>
            <span class="scene-chapter-badge">CHAPTER IV • SACRED COMMITMENT</span>
          </div>

          <div class="scene-header-block">
            <h2 class="scene-title">What I Understand & Promise</h2>
            <p class="scene-desc">No excuses, no defenses—just honest vulnerability and growth for us.</p>
          </div>

          <div class="reflections-grid">
            ${reflections.map((r, idx) => `
              <div class="reflection-card" data-idx="${idx}">
                <div class="reflection-header">
                  <span class="reflection-icon">${r.icon}</span>
                  <span class="reflection-tag">${r.tag}</span>
                </div>
                <h3 class="reflection-title">${r.title}</h3>
                <p class="reflection-desc">${r.desc}</p>
              </div>
            `).join('')}
          </div>

          <div class="scene-cta-dock">
            <button type="button" class="btn-scene-next" data-next-scene="5">
              <span class="btn-next-spark">✦</span>
              <span class="btn-next-text">Look Back At Our Sweetest Memories</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SCENE 5: CHERISHED MEMORIES & VOICE NOTE (ACT V)        -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-memories-fullscreen" data-scene="5" id="scene5" style="display:none; opacity:0;">
        <div class="scene-inner-frame">
          
          <div class="scene-top-nav">
            <button type="button" class="btn-scene-back" data-prev-scene="4">❮ Back</button>
            <span class="scene-chapter-badge">CHAPTER V • CHERISHED MEMORIES</span>
          </div>

          <div class="scene-header-block">
            <h2 class="scene-title">Remember Why We Fell In Love 📸</h2>
            <p class="scene-desc">Tap any polaroid to flip and read the secret note on the back:</p>
          </div>

          <!-- Voice Note Simulator Card -->
          <div class="sanctuary-voice-card">
            <button type="button" class="btn-voice-toggle" id="btnVoiceToggle" aria-label="Play voice confession">
              <span id="voicePlayIcon">▶</span>
            </button>
            <div class="voice-meta">
              <div class="voice-title">Voice Note from ${senderName} 🎙️</div>
              <div class="voice-sub" id="voiceSub">Tap to listen to my voice confession (0:45)</div>
              <div class="voice-bars" id="voiceBars">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <!-- Lovable Cascading Polaroids -->
          <div class="sanctuary-polaroids-cascade">
            ${polaroids.map((p, idx) => {
              const tilt = [-3, 3, -2, 4][idx % 4];
              return `
                <div class="sanctuary-polaroid-item" data-idx="${idx}" style="--tilt:${tilt}deg;">
                  <div class="polaroid-flipper-3d">
                    <div class="polaroid-face front">
                      <div class="tape-strip"></div>
                      <div class="photo-chassis">
                        <img src="${p.image}" alt="Memory" loading="lazy" onerror="this.src='/images/sunset.jpg'" />
                        <span class="flip-hint-badge">Tap to flip 🔄</span>
                      </div>
                      <div class="polaroid-caption-text">${p.caption}</div>
                      <button type="button" class="btn-save-memory" title="Save keepsake">
                        📸 Save Keepsake
                      </button>
                    </div>
                    <div class="polaroid-face back">
                      <div class="back-note-wrap">
                        <span class="back-quote">“</span>
                        <p class="back-text">${p.note || p.caption}</p>
                        <span class="back-author">— Always Yours ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="scene-cta-dock">
            <button type="button" class="btn-scene-next" data-next-scene="6">
              <span class="btn-next-spark">✦</span>
              <span class="btn-next-text">The Final Step: Hold to Heal</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SCENE 6: THE OLIVE BRANCH (HOLD TO HEAL FINALE) (ACT VI) -->
      <!-- ======================================================== -->
      <section class="sorry-fullscreen-scene scene-healing-fullscreen" data-scene="6" id="scene6" style="display:none; opacity:0;">
        <div class="scene-inner-frame">
          
          <div class="scene-top-nav">
            <button type="button" class="btn-scene-back" data-prev-scene="5">❮ Back</button>
            <span class="scene-chapter-badge">FINAL CHAPTER • THE OLIVE BRANCH</span>
          </div>

          <div class="healing-center-card" id="healingCard">
            <div class="olive-branch-icon">🕊️❤️‍🩹</div>
            <h2 class="healing-title rb-shiny-text">Will You Give Me A Chance To Make It Right?</h2>
            <p class="healing-subtitle">
              I promise to love you with patience, kindness, and understanding. Whenever you are ready to heal:
            </p>

            <!-- 2-Second Hold-to-Heal Button -->
            <div class="hold-to-heal-dock" id="holdToHealDock">
              <div class="hold-ring-wrapper">
                <svg class="hold-svg-ring" width="114" height="114" viewBox="0 0 114 114">
                  <circle cx="57" cy="57" r="50" stroke="rgba(245, 158, 11, 0.2)" stroke-width="7" fill="none" />
                  <circle id="healProgressRing" cx="57" cy="57" r="50" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" fill="none"
                    stroke-dasharray="314" stroke-dashoffset="314" />
                </svg>
                <button type="button" class="btn-hold-heal" id="btnHoldHeal" aria-label="Hold for 2 seconds to accept apology">
                  <span class="heal-btn-icon" id="healBtnIcon">❤️</span>
                </button>
              </div>
              <div class="heal-instruction" id="healInstruction">
                👆 Press & Hold for 2 seconds to heal our bond
              </div>
            </div>

            <!-- Celebratory Healing Reveal Banner -->
            <div class="healing-completed-banner" id="healingCompletedBanner" style="display: none;">
              <div class="banner-emoji">🎉🫂✨</div>
              <h3 class="banner-title">Our Hearts Are Reunited ❤️</h3>
              <p class="banner-msg">
                Thank you for having the grace to forgive me. I promise to cherish you, respect you, and hold you tighter every single day.
              </p>
              <div class="banner-actions">
                <a href="https://wa.me/?text=${encodeURIComponent(`I forgive you baby! ❤️🫂 Let's hug and never stay upset at each other again ✨`)}" 
                   target="_blank" rel="noopener" class="btn-whatsapp-quiet">
                  💬 Send a Quiet Hug on WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  `;

  // =========================================================================
  // INIT AUDIO PLAYER
  // =========================================================================
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle,
      audioSubtitle,
      audioSrc
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // =========================================================================
  // PAGE-BY-PAGE SCENE ENGINE (LIKE BLOSSOM TEMPLATE)
  // =========================================================================
  function goToScene(targetSceneNum) {
    const targetNum = Math.max(1, Math.min(totalScenes, targetSceneNum));
    const currentSceneEl = container.querySelector('.sorry-fullscreen-scene.active');
    const targetSceneEl = container.querySelector(`.sorry-fullscreen-scene[data-scene="${targetNum}"]`);

    if (!targetSceneEl || currentSceneEl === targetSceneEl) return;

    playSound('chime');

    gsap.to(currentSceneEl, {
      opacity: 0,
      y: -15,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        currentSceneEl.style.display = 'none';
        currentSceneEl.classList.remove('active');

        targetSceneEl.style.display = 'flex';
        targetSceneEl.style.opacity = '0';
        targetSceneEl.classList.add('active');

        // Reset scroll position to top of chassis
        const chassis = container.closest('.preview-frame-container') || container.closest('#previewContainer') || window;
        if (chassis === window) window.scrollTo({ top: 0, behavior: 'instant' });
        else chassis.scrollTo({ top: 0, behavior: 'instant' });

        gsap.fromTo(targetSceneEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }
        );

        activeScene = targetNum;
      }
    });
  }

  // Bind all scene navigation buttons
  container.querySelectorAll('.btn-scene-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextNum = parseInt(btn.getAttribute('data-next-scene'), 10);
      goToScene(nextNum);
    });
  });

  container.querySelectorAll('.btn-scene-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevNum = parseInt(btn.getAttribute('data-prev-scene'), 10);
      goToScene(prevNum);
    });
  });

  // =========================================================================
  // REACT BITS ENHANCEMENTS
  // =========================================================================
  try {
    initBlurText(container.querySelector('#heroConfessionTitle'), {
      delay: 0.15,
      stagger: 0.05,
      duration: 0.75
    });

    initShinyText(container.querySelectorAll('.rb-shiny-text'));
    initStarBorder(container.querySelector('#healingCard'));
    initMagneticButton(container.querySelector('#btnHoldHeal'), 0.25);
  } catch (err) {
    console.warn('React Bits warning:', err);
  }

  // =========================================================================
  // SCENE 1: CANDLE GATEWAY
  // =========================================================================
  const candleGateway = container.querySelector('#candleGateway');
  const candleAura = container.querySelector('#candleAura');
  const candleFlame = container.querySelector('#candleFlame');
  const candleLabel = container.querySelector('#candleLabel');
  let candleLit = false;

  if (candleGateway) {
    candleGateway.addEventListener('click', () => {
      candleLit = !candleLit;
      playSound('candle');
      playSound('chime');

      if (candleAura) candleAura.classList.toggle('lit', candleLit);
      if (candleFlame) candleFlame.classList.toggle('lit', candleLit);
      if (candleLabel) {
        candleLabel.textContent = candleLit ? '🕯️ Candle is lit • My heart is open' : '🕯️ Tap to light candle';
      }

      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.35 },
        colors: ['#f59e0b', '#fbbf24', '#f87171']
      });
    });
  }

  // =========================================================================
  // SCENE 2: WAX SEAL CRACK & UNSEAL
  // =========================================================================
  const waxSeal = container.querySelector('#waxSealCrest');
  const parchmentCard = container.querySelector('#parchmentCard');
  const parchmentHint = container.querySelector('#parchmentHint');

  if (waxSeal && parchmentCard) {
    waxSeal.addEventListener('click', () => {
      playSound('unseal');
      playSound('chime');

      gsap.to(waxSeal, {
        scale: 1.3,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          waxSeal.style.display = 'none';
          parchmentCard.classList.add('unsealed');
          if (parchmentHint) parchmentHint.textContent = 'Letter unsealed with all my love ❤️';
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.4 },
            colors: ['#fbbf24', '#f59e0b', '#fca5a5']
          });
        }
      });
    });
  }

  // =========================================================================
  // SCENE 3: REALISTIC VENTING ROOM ENGINE
  // =========================================================================
  const ventTargetFrame = container.querySelector('#ventTargetFrame');
  const ventTargetChassis = container.querySelector('#ventTargetChassis');
  const ventDecalLayer = container.querySelector('#ventDecalLayer');
  const ventMoodPill = container.querySelector('#ventMoodPill');
  const ventBubble = container.querySelector('#ventBubble');
  const ventTensionFill = container.querySelector('#ventTensionFill');
  const ventTensionVal = container.querySelector('#ventTensionVal');
  const ventHitsCounter = container.querySelector('#ventHitsCounter');
  const btnWipeGlass = container.querySelector('#btnWipeGlass');

  const projectileIcons = {
    punch: '🥊',
    tomato: '🍅',
    whack: '🩴',
    splash: '💧',
    boba: '🧋',
    teddy: '🧸'
  };

  const reactionQuotes = [
    "Ouch! Okay, I completely deserved that 🥺",
    "Direct hit! You have great aim baby 🎯",
    "I'm listening and I hear your anger 🥺❤️",
    "Throw another one if it helps you feel lighter! 🥊",
    "I'm so sorry for making you upset... 💔",
    "Are you feeling even a tiny bit better now? 🥺"
  ];

  function launchRealisticThrowable(type, btnEl) {
    ventCount++;
    angerLevel = Math.max(0, angerLevel - 18);

    // Audio synthesis
    playSound(type);

    const btnRect = btnEl.getBoundingClientRect();
    const targetRect = ventTargetChassis.getBoundingClientRect();

    // Create flying projectile element
    const proj = document.createElement('div');
    proj.className = 'real-flying-projectile';
    proj.textContent = projectileIcons[type] || '🍅';
    proj.style.left = `${btnRect.left + btnRect.width / 2}px`;
    proj.style.top = `${btnRect.top + btnRect.height / 2}px`;
    document.body.appendChild(proj);

    const destX = targetRect.left + targetRect.width / 2 - 18;
    const destY = targetRect.top + targetRect.height / 2 - 18;

    gsap.to(proj, {
      left: destX,
      top: destY,
      duration: 0.28,
      ease: 'power2.in',
      rotation: type === 'whack' ? 720 : 360,
      onComplete: () => {
        proj.remove();

        // Directional recoil & screen shake
        const recoilAngle = (Math.random() - 0.5) * 16;
        gsap.fromTo(ventTargetChassis,
          { scale: 0.9, rotation: recoilAngle },
          { scale: 1, rotation: 0, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' }
        );

        // Screen shake
        gsap.fromTo(ventTargetFrame,
          { x: (Math.random() - 0.5) * 12 },
          { x: 0, duration: 0.2, ease: 'rough' }
        );

        // Stick realistic decal onto glass overlay
        const decal = document.createElement('div');
        decal.className = `real-glass-decal decal-${type}`;
        decal.textContent = projectileIcons[type];
        decal.style.left = `${20 + Math.random() * 60}%`;
        decal.style.top = `${20 + Math.random() * 60}%`;
        if (ventDecalLayer) ventDecalLayer.appendChild(decal);

        // Update mood pill & speech bubble
        if (ventMoodPill) ventMoodPill.textContent = angerLevel === 0 ? '🥹' : '🥺';
        if (ventBubble) {
          ventBubble.textContent = reactionQuotes[ventCount % reactionQuotes.length];
        }

        // Update frustration thermometer
        if (ventTensionFill) ventTensionFill.style.width = `${angerLevel}%`;
        if (ventTensionVal) {
          if (angerLevel > 60) ventTensionVal.textContent = `${angerLevel}% FURIOUS 🔥`;
          else if (angerLevel > 20) ventTensionVal.textContent = `${angerLevel}% VENTED 😤`;
          else ventTensionVal.textContent = `0% SOOTHED & CALM 🥰`;
        }

        if (ventHitsCounter) {
          ventHitsCounter.innerHTML = `Hits landed: <strong>${ventCount}</strong> times`;
        }
      }
    });
  }

  container.querySelectorAll('.btn-real-arsenal').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      launchRealisticThrowable(type, btn);
    });
  });

  if (btnWipeGlass) {
    btnWipeGlass.addEventListener('click', () => {
      playSound('unseal');
      if (ventDecalLayer) ventDecalLayer.innerHTML = '';
      if (ventMoodPill) ventMoodPill.textContent = '🥺';
      if (ventBubble) ventBubble.textContent = '"Glass wiped clean! Ready to hear your verdict 🥺"';
    });
  }

  // =========================================================================
  // SCENE 5: POLAROIDS & VOICE NOTE
  // =========================================================================
  container.querySelectorAll('.sanctuary-polaroid-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.btn-save-memory')) return;
      item.classList.toggle('flipped');
      playSound('unseal');
    });

    const btnSave = item.querySelector('.btn-save-memory');
    if (btnSave) {
      btnSave.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('candle');
        html2canvas(item).then(canvas => {
          const a = document.createElement('a');
          a.download = `Keepsake-${Date.now()}.png`;
          a.href = canvas.toDataURL('image/png');
          a.click();
        });
      });
    }
  });

  const btnVoice = container.querySelector('#btnVoiceToggle');
  const voiceSub = container.querySelector('#voiceSub');
  const voiceBars = container.querySelector('#voiceBars');
  let voiceActive = false;

  if (btnVoice) {
    btnVoice.addEventListener('click', () => {
      voiceActive = !voiceActive;
      if (voiceActive) {
        playSound('chime');
        btnVoice.querySelector('#voicePlayIcon').textContent = '⏸';
        if (voiceBars) voiceBars.classList.add('playing');
        if (voiceSub) voiceSub.textContent = 'Playing heartfelt voice confession... (0:22 / 0:45)';
      } else {
        btnVoice.querySelector('#voicePlayIcon').textContent = '▶';
        if (voiceBars) voiceBars.classList.remove('playing');
        if (voiceSub) voiceSub.textContent = 'Voice note paused. Tap to listen.';
      }
    });
  }

  // =========================================================================
  // SCENE 6: 2-SECOND HOLD TO HEAL
  // =========================================================================
  const btnHoldHeal = container.querySelector('#btnHoldHeal');
  const healRing = container.querySelector('#healProgressRing');
  const healInstruction = container.querySelector('#healInstruction');
  const healCompleted = container.querySelector('#healingCompletedBanner');
  const holdDock = container.querySelector('#holdToHealDock');

  let holdStart = null;
  let holdAnim = null;
  let healDone = false;
  const holdTargetMs = 2000;

  function onHealStart(e) {
    if (healDone) return;
    e.preventDefault();
    holdStart = performance.now();
    btnHoldHeal.classList.add('holding');
    playSound('candle');

    function step(now) {
      const elapsed = now - holdStart;
      const progress = Math.min(1, elapsed / holdTargetMs);

      if (healRing) {
        const offset = 314 - progress * 314;
        healRing.style.strokeDashoffset = offset;
      }

      if (progress < 1) {
        holdAnim = requestAnimationFrame(step);
      } else {
        onHealComplete();
      }
    }
    holdAnim = requestAnimationFrame(step);
  }

  function onHealEnd() {
    if (healDone) return;
    if (holdAnim) cancelAnimationFrame(holdAnim);
    btnHoldHeal.classList.remove('holding');
    if (healRing) healRing.style.strokeDashoffset = '314';
  }

  function onHealComplete() {
    healDone = true;
    playSound('victory');

    if (holdDock) holdDock.style.display = 'none';
    if (healCompleted) {
      healCompleted.style.display = 'block';
      gsap.fromTo(healCompleted,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#fbbf24', '#f87171', '#10b981', '#ffffff']
    });
  }

  if (btnHoldHeal) {
    btnHoldHeal.addEventListener('mousedown', onHealStart);
    btnHoldHeal.addEventListener('mouseup', onHealEnd);
    btnHoldHeal.addEventListener('mouseleave', onHealEnd);

    btnHoldHeal.addEventListener('touchstart', onHealStart, { passive: false });
    btnHoldHeal.addEventListener('touchend', onHealEnd);
    btnHoldHeal.addEventListener('touchcancel', onHealEnd);
  }
}
