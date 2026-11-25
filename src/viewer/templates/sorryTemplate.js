// src/viewer/templates/sorryTemplate.js - The Lovable-Tier Heartfelt Apology Experience
// Rebuilt from the ground up: Atmospheric Candlelit Sanctuary, Illuminated Parchment Letter,
// 4 Sacred Reflections, Lovable Cascading Polaroids with Voice Note, and Hold-to-Heal Olive Branch Finale.
// High-performance 60FPS, zero heavy canvas loops, zero lag.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initBlurText, initClickSpark, initShinyText, initStarBorder, initMagneticButton } from '../../utils/reactBitsEffects.js';

// Ultra-lightweight Web Audio sound generator for tactile feedback
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
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
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
    } else if (type === 'healSuccess') {
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
  const recipientName = data.recipientName || 'My Love';
  const senderName = data.senderName || 'Yours Always';
  const heroTitle = data.heroTitle || "I'm So Sorry, My Love";
  const heroSubtitle = data.heroSubtitle || "My world feels heavy and quiet when you are hurt 🥺";
  const apologyMessage = data.apologyMessage || "I know I made a mistake, and seeing you upset hurts me more than anything in this world. My intention was never to make you feel unheard or unvalued. I take full accountability for my actions. You mean the world to me, and I promise to listen with an open heart, protect your peace, and cherish you better every single day.";

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

    <div class="sorry-sanctuary-wrap" id="sorrySanctuary">
      
      <!-- ======================================================== -->
      <!-- ACT I: THE CANDLELIT SANCTUARY (OPENER & ATMOSPHERE)     -->
      <!-- ======================================================== -->
      <section class="sanctuary-hero-section">
        
        <!-- Glowing Candle Gateway -->
        <div class="candle-gateway" id="candleGateway" role="button" tabindex="0" title="Tap to light the candle & open my heart">
          <div class="candle-glow-aura" id="candleAura"></div>
          <div class="candle-flame" id="candleFlame">
            <span class="flame-inner"></span>
          </div>
          <div class="candle-body"></div>
          <div class="candle-label" id="candleLabel">
            🕯️ Tap to light candle & hear my heart
          </div>
        </div>

        <!-- Headline & Apology Subtitle -->
        <div class="hero-text-block">
          <div class="heartfelt-tag">A SINCERE MESSAGE FROM MY HEART</div>
          <h1 class="hero-confession-title" id="heroConfessionTitle">${heroTitle}</h1>
          <p class="hero-confession-sub">${heroSubtitle}</p>
        </div>

        <!-- Floating Navigation Indicator -->
        <div class="sanctuary-dock-nav">
          <button type="button" class="dock-nav-pill active" data-target="sec-letter">💌 Letter</button>
          <button type="button" class="dock-nav-pill" data-target="sec-reflections">🕊️ Reflections</button>
          <button type="button" class="dock-nav-pill" data-target="sec-memories">📸 Memories</button>
          <button type="button" class="dock-nav-pill" data-target="sec-heal">❤️‍🩹 Heal</button>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- ACT II: THE SINCERE CONFESSION LETTER (STATIONARY VELLUM)-->
      <!-- ======================================================== -->
      <section class="sanctuary-letter-section" id="sec-letter">
        <div class="parchment-letter-card" id="parchmentCard">
          
          <!-- Wax Seal Button (Cracks Open) -->
          <div class="wax-seal-crest" id="waxSealCrest" role="button" tabindex="0" title="Tap to open the letter">
            <span class="wax-icon">🕊️</span>
            <span class="wax-ripple"></span>
          </div>

          <div class="parchment-inner">
            <div class="parchment-greeting">Dearest ${recipientName},</div>
            <div class="parchment-body" id="parchmentBody">
              ${apologyMessage}
            </div>
            <div class="parchment-valediction">
              <span>Forever yours with all my love,</span>
              <strong class="parchment-sign">${senderName} 🫶</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- ACT III: THE 4 SACRED REFLECTIONS (LOVABLE CARDS)        -->
      <!-- ======================================================== -->
      <section class="sanctuary-reflections-section" id="sec-reflections">
        <div class="section-label-header">
          <span class="section-micro-badge">FOUR PILLARS OF UNDERSTANDING</span>
          <h2 class="section-main-heading">What I Realize & Promise</h2>
          <p class="section-sub-desc">No excuses, no defenses—just honest vulnerability and growth for us.</p>
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
      </section>

      <!-- ======================================================== -->
      <!-- ACT IV: KEEPSAKE MEMORIES & VOICE NOTE                   -->
      <!-- ======================================================== -->
      <section class="sanctuary-memories-section" id="sec-memories">
        <div class="section-label-header">
          <span class="section-micro-badge">CHERISHED MOMENTS</span>
          <h2 class="section-main-heading">Remember Our Sweetest Days 📸</h2>
          <p class="section-sub-desc">Tap any polaroid to flip and read the secret note on the back:</p>
        </div>

        <!-- Voice Note Player -->
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

        <!-- Lovable Staggered Polaroid Cascade -->
        <div class="sanctuary-polaroids-cascade">
          ${polaroids.map((p, idx) => {
            const tilt = [-3, 3, -2, 4][idx % 4];
            return `
              <div class="sanctuary-polaroid-item" data-idx="${idx}" style="--tilt:${tilt}deg;">
                <div class="polaroid-flipper-3d">
                  <!-- Front -->
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
                  <!-- Back -->
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
      </section>

      <!-- ======================================================== -->
      <!-- ACT V: THE OLIVE BRANCH (HOLD TO HEAL)                   -->
      <!-- ======================================================== -->
      <section class="sanctuary-healing-section" id="sec-heal">
        <div class="healing-center-card" id="healingCard">
          <div class="olive-branch-icon">🕊️❤️‍🩹</div>
          <h2 class="healing-title rb-shiny-text">Will You Give Me A Chance To Make It Right?</h2>
          <p class="healing-subtitle">
            I promise to love you with patience, kindness, and understanding. Whenever you are ready to heal:
          </p>

          <!-- 2-Second Hold-to-Heal Button -->
          <div class="hold-to-heal-dock" id="holdToHealDock">
            <div class="hold-ring-wrapper">
              <svg class="hold-svg-ring" width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="48" stroke="rgba(245, 158, 11, 0.2)" stroke-width="6" fill="none" />
                <circle id="healProgressRing" cx="55" cy="55" r="48" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" fill="none"
                  stroke-dasharray="301" stroke-dashoffset="301" />
              </svg>
              <button type="button" class="btn-hold-heal" id="btnHoldHeal" aria-label="Hold for 2 seconds to accept apology">
                <span class="heal-btn-icon" id="healBtnIcon">❤️</span>
              </button>
            </div>
            <div class="heal-instruction" id="healInstruction">
              👆 Press & Hold for 2 seconds to heal our bond
            </div>
          </div>

          <!-- Celebratory Healing Reveal (Appears upon hold completion) -->
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
  // REACT BITS ENHANCEMENTS (BlurText, ShinyText, StarBorder, MagneticButton)
  // =========================================================================
  try {
    initBlurText(container.querySelector('#heroConfessionTitle'), {
      delay: 0.15,
      stagger: 0.05,
      duration: 0.75
    });

    initShinyText(container.querySelectorAll('.rb-shiny-text'));
    initStarBorder(container.querySelector('#healingCard'));
    initStarBorder(container.querySelector('#parchmentCard'));
    initMagneticButton(container.querySelector('#btnHoldHeal'), 0.25);
  } catch (err) {
    console.warn('React Bits warning:', err);
  }

  // =========================================================================
  // ACT I: CANDLE GATEWAY INTERACTION
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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.35 },
        colors: ['#f59e0b', '#fbbf24', '#f87171']
      });
    });
  }

  // =========================================================================
  // DOCK NAVIGATION SMOOTH SCROLLING
  // =========================================================================
  const navPills = container.querySelectorAll('.dock-nav-pill');
  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playSound('candle');
      const targetId = pill.getAttribute('data-target');
      const targetEl = container.querySelector(`#${targetId}`);
      if (!targetEl) return;

      navPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const chassis = container.closest('.preview-frame-container') || container.closest('#previewContainer') || window;
      const offset = 70;
      if (chassis === window) {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        const top = targetEl.offsetTop - offset;
        chassis.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // ACT II: WAX SEAL CRACK & LETTER INTERACTION
  // =========================================================================
  const waxSeal = container.querySelector('#waxSealCrest');
  const parchmentCard = container.querySelector('#parchmentCard');

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
  // ACT IV: POLAROID FLIP & VOICE NOTE
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
  // ACT V: 2-SECOND HOLD TO HEAL
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
        const offset = 301 - progress * 301;
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
    if (healRing) healRing.style.strokeDashoffset = '301';
  }

  function onHealComplete() {
    healDone = true;
    playSound('healSuccess');

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
