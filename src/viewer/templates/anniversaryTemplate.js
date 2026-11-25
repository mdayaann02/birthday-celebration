// src/viewer/templates/anniversaryTemplate.js - Blossom-Grade Immersive Anniversary Love Story
// Features: Sacred Anniversary Gate Opener, Live Love Counter, 3D Orbiting Infinity Rings & Crystal Champagne Toast,
// Journey Milestones, High-Res Keepsake Polaroids, Wax Seal Love Letter & Proclamation of Eternity in a continuous flow.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderAnniversaryTemplate(container, data) {
  const recipient = data.recipientName || 'My Dearest Love';
  const startDate = new Date(data.anniversaryStartDate || "2023-11-28T00:00").getTime();
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I realized I never want to watch a sunset with anyone else." },
    { title: "Endless Laughter & Joy 🫶", image: "/images/always_you.jpg", note: "Smiling so much my cheeks hurt. You bring pure sunshine into my days." },
    { title: "Forever & Always 💍", image: "/images/dream_girl.jpg", note: "A lifetime of choosing you, loving you, and growing with you." }
  ];

  // Synthesize Web Audio Chimes & Champagne Pop
  function playAnniTone(type = 'chime') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'clink') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(3520, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } else {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          o.connect(g);
          g.connect(ctx.destination);
          g.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
          o.start(ctx.currentTime + i * 0.08);
          o.stop(ctx.currentTime + i * 0.08 + 0.6);
        });
      }
    } catch {
      // AudioContext unavailable
    }
  }

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="anniPlayerSlot" style="position:relative; z-index:100;"></div>

    <!-- Floating Bokeh & Golden Hearts Canvas -->
    <canvas id="anniCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

    <div class="anniversary-page-wrap anni-storybook-viewport" style="position:relative; z-index:10; max-width:820px; margin:0 auto; padding:0 16px 80px;">
      
      <!-- SACRED ANNIVERSARY OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="anniGate" role="button" tabindex="0" aria-label="Tap to unlock our anniversary story" style="background: radial-gradient(circle at center, #2b0914 0%, #0d0105 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#fbbf24; box-shadow: 0 0 35px rgba(251,191,36,0.5);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(251,191,36,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            💍✨
          </div>
          <div class="bro-gate-badge" style="background:rgba(251,191,36,0.18); border-color:#fbbf24; color:#fde047;">
            SACRED ANNIVERSARY VOW
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(251,191,36,0.6);">
            To ${recipient}, My Forever
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            A timeless love story written across every heartbeat and star.
          </p>
          <div class="bro-gate-hint" style="color:#fbbf24; border-color:rgba(251,191,36,0.4); background:rgba(251,191,36,0.12);">
            ✨ TAP TO UNSEAL OUR LOVE STORY ✨
          </div>
        </div>
      </div>

      <!-- FOCUSED CHAPTER JOURNEY FLOW (ONE IMMERSIVE SCENE AT A TIME) -->
      <main class="anni-flow-container" style="display:flex; flex-direction:column;">
        
        <!-- CHAPTER 1: HERO & LIVE LOVE COUNTER -->
        <section class="anni-story-card active" data-chapter="1" style="background:rgba(22,10,16,0.92); border:1.5px solid rgba(251,191,36,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px); text-align:center;">
          <div class="anni-badge" style="display:inline-block; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fde047; background:rgba(251,191,36,0.15); padding:4px 14px; border-radius:20px; border:1px solid rgba(251,191,36,0.4); margin-bottom:14px;">
            ✨ CELEBRATING OUR LOVE STORY ✨
          </div>
          <h1 class="anni-main-title" style="color:#fff; font-size:28px; font-weight:900; margin:0 0 8px 0;">
            ${data.heroTitle || 'Happy Anniversary My Love'}
          </h1>
          <p class="anni-sub-title" style="color:#fbcfe8; font-size:14px; margin:0 0 20px 0;">
            ${data.heroSubtitle || 'Every day with you is my favorite day ❤️'}
          </p>

          <!-- Live Together Love Counter -->
          <div class="anni-counter-glass" style="background:rgba(30,10,20,0.6); border:1px solid rgba(251,191,36,0.3); border-radius:18px; padding:18px; margin:0 auto 20px; max-width:440px;">
            <div class="anni-counter-heading" style="font-size:11px; font-weight:800; letter-spacing:2px; color:#fbbf24; margin-bottom:10px;">
              TOGETHER FOR
            </div>
            <div class="anni-timer-grid" style="display:flex; justify-content:center; align-items:center; gap:8px;">
              <div class="anni-timer-unit"><span class="anni-timer-num" id="ltDays" style="font-size:22px; font-weight:900; color:#fff;">0</span><br><span class="anni-timer-lbl" style="font-size:10px; color:#fbcfe8;">Days</span></div>
              <span class="anni-colon" style="color:#fbbf24; font-size:18px;">:</span>
              <div class="anni-timer-unit"><span class="anni-timer-num" id="ltHours" style="font-size:22px; font-weight:900; color:#fff;">00</span><br><span class="anni-timer-lbl" style="font-size:10px; color:#fbcfe8;">Hours</span></div>
              <span class="anni-colon" style="color:#fbbf24; font-size:18px;">:</span>
              <div class="anni-timer-unit"><span class="anni-timer-num" id="ltMins" style="font-size:22px; font-weight:900; color:#fff;">00</span><br><span class="anni-timer-lbl" style="font-size:10px; color:#fbcfe8;">Mins</span></div>
              <span class="anni-colon" style="color:#fbbf24; font-size:18px;">:</span>
              <div class="anni-timer-unit"><span class="anni-timer-num" id="ltSecs" style="font-size:22px; font-weight:900; color:#fff;">00</span><br><span class="anni-timer-lbl" style="font-size:10px; color:#fbcfe8;">Secs</span></div>
            </div>
            <p class="anni-counter-note" style="margin:12px 0 0 0; font-size:12px; color:#fbcfe8;">...and falling deeper in love with you every single second 💖</p>
          </div>

          <!-- DYNAMIC 60FPS ROYALE CHAMPAGNE TOAST & INTERTWINED INFINITY RINGS ARENA -->
          <div class="anni-toast-arena" id="anniToastArena" style="position:relative; width:100%; max-width:400px; margin:0 auto; min-height:220px; border-radius:20px; overflow:hidden; background:radial-gradient(110% 90% at 50% 25%, rgba(254,240,138,0.18) 0%, rgba(20,6,14,0.85) 60%, rgba(10,2,7,0.95) 100%); border:2px solid rgba(251, 191, 36, 0.4); box-shadow:0 12px 35px rgba(0,0,0,0.5); text-align:center;">
            <canvas id="anniToastCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

            <div id="champagneFlutesRig" style="position:relative; width:220px; height:140px; margin:14px auto 4px; cursor:pointer; z-index:3; display:flex; justify-content:center; align-items:center;">
              <svg width="220" height="140" viewBox="0 0 220 150" style="display:block; overflow:visible;">
                <defs>
                  <linearGradient id="champagneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fef08a" />
                    <stop offset="60%" stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#d97706" />
                  </linearGradient>
                  <linearGradient id="crystalGlassGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.7)" />
                    <stop offset="30%" stop-color="rgba(255,255,255,0.2)" />
                    <stop offset="70%" stop-color="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0.6)" />
                  </linearGradient>
                  <linearGradient id="goldRingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fef08a" />
                    <stop offset="50%" stop-color="#fbbf24" />
                    <stop offset="100%" stop-color="#d97706" />
                  </linearGradient>
                </defs>

                <!-- 3D ORBITING INFINITY RINGS -->
                <g id="infinityRingsGroup" style="transform-origin: 110px 75px;">
                  <ellipse cx="98" cy="72" rx="32" ry="14" fill="none" stroke="url(#goldRingGrad)" stroke-width="3" transform="rotate(-20 98 72)" filter="drop-shadow(0 0 6px rgba(251,191,36,0.6))" />
                  <ellipse cx="122" cy="72" rx="32" ry="14" fill="none" stroke="url(#goldRingGrad)" stroke-width="3" transform="rotate(20 122 72)" filter="drop-shadow(0 0 6px rgba(251,191,36,0.6))" />
                </g>

                <!-- LEFT CRYSTAL FLUTE -->
                <g id="fluteLeft" style="transform-origin: 65px 140px; transition:transform 0.25s ease;">
                  <ellipse cx="65" cy="142" rx="20" ry="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
                  <line x1="65" y1="95" x2="65" y2="142" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" />
                  <path d="M 52 28 C 50 65 54 95 65 95 C 76 95 80 65 78 28 Z" fill="url(#crystalGlassGrad)" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" />
                  <path d="M 53 45 C 52 70 56 93 65 93 C 74 93 78 70 77 45 Z" fill="url(#champagneGrad)" opacity="0.88" />
                  <ellipse cx="65" cy="28" rx="13" ry="3.5" fill="none" stroke="#ffffff" stroke-width="1.2" />
                </g>

                <!-- RIGHT CRYSTAL FLUTE -->
                <g id="fluteRight" style="transform-origin: 155px 140px; transition:transform 0.25s ease;">
                  <ellipse cx="155" cy="142" rx="20" ry="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
                  <line x1="155" y1="95" x2="155" y2="142" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" />
                  <path d="M 142 28 C 140 65 144 95 155 95 C 166 95 170 65 168 28 Z" fill="url(#crystalGlassGrad)" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" />
                  <path d="M 143 45 C 142 70 146 93 155 93 C 164 93 168 70 167 45 Z" fill="url(#champagneGrad)" opacity="0.88" />
                  <ellipse cx="155" cy="28" rx="13" ry="3.5" fill="none" stroke="#ffffff" stroke-width="1.2" />
                </g>
                <circle id="toastSparkleStar" cx="110" cy="40" r="14" fill="#ffffff" opacity="0" pointer-events="none" />
              </svg>
            </div>

            <div id="anniToastBanner" style="position:relative; z-index:3; display:inline-block; background:linear-gradient(90deg, #d97706, #b45309); color:#fff; font-size:11.5px; font-weight:800; padding:5px 16px; border-radius:20px; box-shadow:0 3px 12px rgba(251,191,36,0.3); margin-top:2px;">
              🥂 "Cheers to our forever &amp; always"
            </div>
            <div style="font-size:11px; font-weight:600; color:#fbbf24; margin:8px 0 10px;">
              ✦ Tap Glasses to Clink a Royal Toast ✦
            </div>
          </div>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-next" data-next="2" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Our Love Story Chapters 📖</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 2: TIMELINE MILESTONES -->
        <section class="anni-story-card" data-chapter="2" style="background:rgba(22,10,16,0.92); border:1.5px solid rgba(251,191,36,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div class="anni-section-tag" style="text-align:center; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fde047; margin-bottom:6px;">CHAPTERS OF US 📖</div>
          <h2 class="anni-section-head" style="text-align:center; color:#fff; font-size:22px; font-weight:800; margin:0 0 20px 0;">Our Beautiful Journey</h2>
          <div class="anni-timeline">
            ${(data.milestones || [
              { year: "The Beginning", text: "The day our eyes met and changed my whole world forever." },
              { year: "First Adventure", text: "Laughing so hard we couldn't breathe, knowing we're meant to be." },
              { year: "Today & Forever", text: "Every single day choosing you with all my heart." }
            ]).map(m => `
              <div class="anni-timeline-item" style="display:flex; gap:14px; margin-bottom:16px;">
                <div class="anni-timeline-node" style="font-size:20px;">💍</div>
                <div class="anni-timeline-content" style="background:rgba(255,255,255,0.05); padding:12px 16px; border-radius:14px; border:1px solid rgba(251,191,36,0.25); flex:1;">
                  <span class="anni-timeline-year" style="color:#fbbf24; font-weight:800; font-size:13px; display:block; margin-bottom:4px;">${m.year}</span>
                  <p class="anni-timeline-desc" style="color:#cbd5e1; font-size:12.5px; margin:0; line-height:1.45;">${m.text}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="3" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Treasured Keepsakes 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 3: POLAROID KEEPSAKE SCRAPBOOK -->
        <section class="anni-story-card" data-chapter="3" style="background:rgba(22,10,16,0.92); border:1.5px solid rgba(251,191,36,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div class="anni-section-tag" style="text-align:center; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fde047; margin-bottom:6px;">TREASURED MOMENTS 📸</div>
          <h2 class="anni-section-head" style="text-align:center; color:#fff; font-size:22px; font-weight:800; margin:0 0 20px 0;">Moments Frozen in Gold</h2>
          <div class="anni-polaroids-row" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:18px;">
            ${polaroids.map(p => `
              <div class="anni-polaroid-card" style="background:#fff; color:#0f172a; border-radius:14px; padding:12px; box-shadow:0 10px 25px rgba(0,0,0,0.4); text-align:center;">
                <div class="anni-polaroid-photo" style="width:100%; height:200px; border-radius:10px; overflow:hidden; margin-bottom:10px;">
                  <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="anni-polaroid-caption" style="margin:0 0 4px 0; font-size:14px; font-weight:800; color:#0f172a;">${p.title}</h4>
                <p class="anni-polaroid-note" style="margin:0; font-size:12px; color:#475569; line-height:1.4;">${p.note || ''}</p>
              </div>
            `).join('')}
          </div>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="4" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Wax-Sealed Love Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 4: WAX SEAL LETTER -->
        <section class="anni-story-card" data-chapter="4" style="background:rgba(22,10,16,0.92); border:1.5px solid rgba(251,191,36,0.4); border-radius:24px; padding:28px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px); text-align:center;">
          <div class="anni-section-tag" style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fde047; margin-bottom:6px;">FROM THE DEPTHS OF MY SOUL 💌</div>
          <h2 class="anni-section-head" style="color:#fff; font-size:22px; font-weight:800; margin:0 0 16px 0;">A Love Letter to ${recipient}</h2>

          <div class="wax-envelope-wrap" id="anniEnvelope" style="margin:16px auto; cursor:pointer;">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="anniFlap"></div>
            <button class="wax-seal-button" id="anniWaxSeal" title="Tap to unseal letter" style="border:none; background:none; cursor:pointer;">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">💍</span>
              </div>
            </button>
          </div>
          <p class="envelope-subtitle" style="margin-top:14px; font-size:12px; color:#fde047; font-weight:700;">👆 Tap the gold seal to unroll our love letter!</p>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="5" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Proclamation of Eternity 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 5: PROCLAMATION OF ETERNITY -->
        <section class="anni-story-card" data-chapter="5" style="background:linear-gradient(135deg, rgba(30,10,20,0.95), rgba(15,3,10,0.98)); border:2px solid rgba(251,191,36,0.45); border-radius:24px; padding:28px 20px; box-shadow:0 16px 40px rgba(0,0,0,0.7); text-align:center;">
          <div style="font-size:42px; margin-bottom:8px;">👑✨</div>
          <h2 style="color:#fbbf24; font-size:24px; font-weight:900; margin:0 0 10px 0;">Proclamation of Eternity</h2>
          <p style="color:#fbcfe8; font-size:13.5px; line-height:1.6; max-width:520px; margin:0 auto 20px;">
            "If I had a flower for every time I thought of you, I could walk through my garden forever."
          </p>
          <div style="display:inline-flex; align-items:center; gap:8px; padding:8px 20px; background:rgba(251,191,36,0.15); border:1px solid #fbbf24; border-radius:30px; color:#fde047; font-weight:800; font-size:13px;">
            ❤️ Forever Yours, ${data.senderName || 'My Whole Heart'}
          </div>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-anni-replay" id="btnAnniReplay" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; padding:10px 20px; border-radius:24px; font-weight:800; border:none; cursor:pointer;">
              <span>💍 Replay Our Love Story ↺</span>
            </button>
          </div>
        </section>

      </main>
    </div>

    <!-- WAX SEAL LETTER MODAL -->
    <div class="wax-letter-modal neu-modal-overlay" id="anniLetterModal">
      <div class="wax-letter-parchment" style="max-width:500px; max-height:85vh; overflow-y:auto;">
        <button class="btn-close-parchment" id="btnCloseAnniLetter">✕</button>
        <div class="parchment-gold-seal">💍</div>
        <h3 class="parchment-title" style="margin-top:10px;">To My Dearest ${recipient}</h3>
        <div class="parchment-body" style="white-space: pre-line; line-height:1.7; font-size:14px; color:#332211;">
          ${data.letter || `My Love,

Another year with you has felt like a single breathtaking moment. You are my home, my peace, and my greatest adventure.

Thank you for choosing me every single day. Loving you is the easiest, most beautiful thing I have ever done.

Forever and always, yours.`}
        </div>
        <div class="parchment-signature" style="margin-top:20px; font-weight:800; color:#881337;">
          ${data.senderName || 'Yours Forever ❤️'}
        </div>
      </div>
    </div>
  `;

  // Opener Gate Execution
  const gateEl = container.querySelector('#anniGate');
  if (gateEl) {
    const executeOpenGate = () => {
      if (gateEl.classList.contains('is-open')) return;
      playAnniTone('chime');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff']
      });
      gateEl.classList.add('is-open');
    };
    gateEl.addEventListener('click', executeOpenGate);
  }

  // Live Love Counter loop
  const elD = container.querySelector('#ltDays');
  const elH = container.querySelector('#ltHours');
  const elM = container.querySelector('#ltMins');
  const elS = container.querySelector('#ltSecs');

  function updateLoveCounter() {
    const elapsed = Math.max(0, Date.now() - startDate);
    const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const h = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const m = Math.floor((elapsed / 1000 / 60) % 60);
    const s = Math.floor((elapsed / 1000) % 60);

    if (elD) elD.textContent = d;
    if (elH) elH.textContent = h < 10 ? `0${h}` : h;
    if (elM) elM.textContent = m < 10 ? `0${m}` : m;
    if (elS) elS.textContent = s < 10 ? `0${s}` : s;
  }
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);

  // Champagne Toast Interaction
  const flutesRig = container.querySelector('#champagneFlutesRig');
  const fluteLeft = container.querySelector('#fluteLeft');
  const fluteRight = container.querySelector('#fluteRight');
  const toastSpark = container.querySelector('#toastSparkleStar');

  if (flutesRig) {
    flutesRig.addEventListener('click', () => {
      playAnniTone('clink');
      gsap.to(fluteLeft, { rotate: 18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      gsap.to(fluteRight, { rotate: -18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      gsap.fromTo(toastSpark, { opacity: 1, scale: 0 }, { opacity: 0, scale: 2.5, duration: 0.45 });

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.45 },
        colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff']
      });
    });
  }

  // Wax seal letter modal
  const sealBtn = container.querySelector('#anniWaxSeal');
  const modal = container.querySelector('#anniLetterModal');
  const closeModal = container.querySelector('#btnCloseAnniLetter');

  sealBtn?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(20);
    modal.classList.add('visible');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  });

  closeModal?.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  // Chapter-by-Chapter Journey Navigation
  let currentAnniChapter = 1;
  const totalAnniChapters = 5;

  function goToAnniChapter(ch) {
    const targetCh = Math.max(1, Math.min(totalAnniChapters, ch));
    const cards = container.querySelectorAll('.anni-story-card');
    const currentCard = container.querySelector(`.anni-story-card[data-chapter="${currentAnniChapter}"]`);
    const targetCard = container.querySelector(`.anni-story-card[data-chapter="${targetCh}"]`);
    if (!targetCard) return;

    if (currentCard && currentCard !== targetCard) {
      gsap.to(currentCard, {
        opacity: 0,
        y: -15,
        scale: 0.98,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          cards.forEach(c => {
            c.style.display = 'none';
            c.classList.remove('active');
          });
          targetCard.style.display = 'block';
          targetCard.style.opacity = '0';
          targetCard.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });

          gsap.fromTo(targetCard,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
          );
          currentAnniChapter = targetCh;
        }
      });
    } else {
      cards.forEach(c => {
        if (c.getAttribute('data-chapter') == targetCh) {
          c.style.display = 'block';
          c.classList.add('active');
          c.style.opacity = '1';
        } else {
          c.style.display = 'none';
          c.classList.remove('active');
        }
      });
      currentAnniChapter = targetCh;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  container.querySelectorAll('.btn-anni-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playAnniTone('chime');
      goToAnniChapter(next);
    });
  });

  container.querySelectorAll('.btn-anni-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playAnniTone('chime');
      goToAnniChapter(prev);
    });
  });

  container.querySelector('#btnAnniReplay')?.addEventListener('click', () => {
    playAnniTone('chime');
    goToAnniChapter(1);
  });

  // Activate Chapter 1 initially
  goToAnniChapter(1);

  // Top music player
  initMusicPlayer(container.querySelector('#anniPlayerSlot'), {
    ...data,
    audioSrc: data.audioSrc || '/audio/blossom_song.mp3',
    audioTitle: data.audioTitle || `Anniversary Symphony`
  });
}
