// src/viewer/templates/anniversaryTemplate.js - Ultra-Aesthetic Romantic Anniversary Celebration
// Features: 60fps Golden Hearts & Effervescence Canvas, Live Animated Love Counter,
// Interactive Clinking Champagne Toast Physics, Wax Seal Envelope Unfolding, and Romantic Timeline.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

function playChimeTone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    [1567.98, 2093.00, 2637.02].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.03);
      gain.gain.setValueAtTime(0.24, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.88);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.03);
      osc.stop(now + i * 0.03 + 0.9);
    });
  } catch (e) {}
}

export function renderAnniversaryTemplate(container, data) {
  const recipient = data.recipientName || 'My Dearest Love';
  const startDate = new Date(data.anniversaryStartDate || "2023-11-28T00:00").getTime();
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I realized I never want to watch a sunset with anyone else." },
    { title: "Endless Laughter & Joy 🫶", image: "/images/always_you.jpg", note: "Smiling so much my cheeks hurt. You bring pure sunshine into my days." },
    { title: "Forever & Always 💍", image: "/images/dream_girl.jpg", note: "A lifetime of choosing you, loving you, and growing with you." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="anniPlayerSlot"></div>

    <!-- Floating Bokeh & Golden Hearts Canvas -->
    <canvas id="anniCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

    <div class="anniversary-page-wrap anni-storybook-viewport" style="position:relative; z-index:10;">
      <!-- Stage Progress Bar & Indicator -->
      <header class="anni-floating-nav" style="user-select:none;">
        <div class="anni-step-progress-track">
          <div class="anni-step-progress-fill" id="anniStepProgressFill" style="width: 20%;"></div>
        </div>
        <div class="anni-stage-indicator-bar">
          <div class="anni-stage-info-pill">
            <span class="stage-step-tag" id="anniStageStepPill">PAGE 1 OF 5</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="anniStageTitleText">Celebrating Our Love Story ✨</span>
          </div>
        </div>
      </header>

      <main class="anni-pages-container" id="anniPagesContainer">
        
        <!-- PAGE 1: HERO & LIVE LOVE COUNTER -->
        <section class="anni-page-card active" data-page="1">
          <section class="anniversary-hero">
            <div class="anni-badge">✨ CELEBRATING OUR LOVE STORY ✨</div>
            <h1 class="anni-main-title">${data.heroTitle || 'Happy Anniversary'}</h1>
            <p class="anni-sub-title">${data.heroSubtitle || 'Every day with you is my favorite day ❤️'}</p>

            <!-- Live Together Love Counter -->
            <div class="anni-counter-glass">
              <div class="anni-counter-heading">TOGETHER FOR</div>
              <div class="anni-timer-grid">
                <div class="anni-timer-unit">
                  <span class="anni-timer-num" id="ltDays">0</span>
                  <span class="anni-timer-lbl">Days</span>
                </div>
                <span class="anni-colon">:</span>
                <div class="anni-timer-unit">
                  <span class="anni-timer-num" id="ltHours">00</span>
                  <span class="anni-timer-lbl">Hours</span>
                </div>
                <span class="anni-colon">:</span>
                <div class="anni-timer-unit">
                  <span class="anni-timer-num" id="ltMins">00</span>
                  <span class="anni-timer-lbl">Mins</span>
                </div>
                <span class="anni-colon">:</span>
                <div class="anni-timer-unit">
                  <span class="anni-timer-num" id="ltSecs">00</span>
                  <span class="anni-timer-lbl">Secs</span>
                </div>
              </div>
              <p class="anni-counter-note">...and falling deeper in love with you every single second 💖</p>
            </div>

            <!-- DYNAMIC 60FPS ROYALE CHAMPAGNE TOAST & INTERTWINED INFINITY RINGS ARENA -->
            <div class="anni-toast-arena" id="anniToastArena" style="position:relative; width:100%; max-width:400px; margin:20px auto 14px; min-height:230px; border-radius:20px; overflow:hidden; background:radial-gradient(110% 90% at 50% 25%, rgba(254,240,138,0.18) 0%, rgba(20,15,28,0.85) 60%, rgba(10,8,16,0.95) 100%); border:2px solid rgba(251, 191, 36, 0.4); box-shadow:0 12px 35px rgba(0,0,0,0.5), 0 0 25px rgba(251,191,36,0.2); text-align:center;">
              <!-- Dynamic effervescent fizz bubbles canvas -->
              <canvas id="anniToastCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

              <!-- Two Crystal Champagne Flutes & Orbiting Infinity Rings -->
              <div id="champagneFlutesRig" style="position:relative; width:220px; height:150px; margin:16px auto 6px; cursor:pointer; z-index:3; display:flex; justify-content:center; align-items:center; user-select:none; -webkit-user-select:none;">
                <svg width="220" height="150" viewBox="0 0 220 150" style="display:block; overflow:visible;">
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

                  <!-- Toast Clink Spark Star -->
                  <circle id="toastSparkleStar" cx="110" cy="40" r="14" fill="#ffffff" opacity="0" pointer-events="none" />
                </svg>
              </div>

              <!-- Toast Feedback Banner -->
              <div id="anniToastBanner" style="position:relative; z-index:3; display:inline-block; background:linear-gradient(90deg, #d97706, #b45309); color:#fff; font-size:11.5px; font-weight:800; padding:5px 16px; border-radius:20px; box-shadow:0 3px 12px rgba(251,191,36,0.3); margin-top:2px;">
                🥂 "Cheers to our forever &amp; always"
              </div>

              <div style="font-size:11px; font-weight:600; color:#fbbf24; margin:8px 0 10px; letter-spacing:0.5px;">
                ✦ Tap Glasses to Clink a Royal Toast ✦
              </div>
            </div>
          </section>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-next" data-next="2">
              <span>Our Journey Milestones 📖</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: TIMELINE -->
        <section class="anni-page-card" data-page="2">
          <section class="anni-section">
            <div class="anni-section-tag">CHAPTERS OF US</div>
            <h2 class="anni-section-head">Our Beautiful Journey</h2>
            <div class="anni-timeline">
              ${(data.milestones || [
                { year: "The Beginning", text: "The day our eyes met and changed my whole world forever." },
                { year: "First Adventure", text: "Laughing so hard we couldn't breathe, knowing we're meant to be." },
                { year: "Today & Forever", text: "Every single day choosing you with all my heart." }
              ]).map((m, idx) => `
                <div class="anni-timeline-item">
                  <div class="anni-timeline-node">💍</div>
                  <div class="anni-timeline-content">
                    <span class="anni-timeline-year">${m.year}</span>
                    <p class="anni-timeline-desc">${m.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="3">
              <span>Polaroid Memories 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: POLAROIDS -->
        <section class="anni-page-card" data-page="3">
          <section class="anni-section">
            <div class="anni-section-tag">TREASURED MOMENTS</div>
            <h2 class="anni-section-head">Moments Frozen in Time</h2>
            <div class="anni-polaroids-row">
              ${polaroids.map((p, i) => `
                <div class="anni-polaroid-card">
                  <div class="anni-polaroid-photo">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <h4 class="anni-polaroid-caption">${p.title}</h4>
                  <p class="anni-polaroid-note">${p.note || ''}</p>
                  <button type="button" class="btn-download-polaroid" title="Save high-res keepsake" style="margin: 8px auto 2px auto;">
                    📸 Save Keepsake
                  </button>
                </div>
              `).join('')}
            </div>
          </section>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="4">
              <span>Read Love Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: WAX SEAL LETTER -->
        <section class="anni-page-card" data-page="4">
          <section class="anni-section" style="text-align:center;">
            <div class="anni-section-tag">FROM THE BOTTOM OF MY HEART</div>
            <h2 class="anni-section-head">A Love Letter to ${recipient}</h2>

            <div class="wax-envelope-wrap" id="anniEnvelope" style="margin:20px auto;">
              <div class="envelope-back"></div>
              <div class="envelope-front"></div>
              <div class="envelope-flap" id="anniFlap"></div>
              <button class="wax-seal-button" id="anniWaxSeal" title="Tap to unseal letter">
                <div class="wax-seal-emblem">
                  <span style="font-size:22px;">💍</span>
                </div>
              </button>
            </div>
            <p class="envelope-subtitle" style="margin-top:16px;">👆 Tap the gold seal to unroll our love letter!</p>
          </section>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="5">
              <span>Eternity Proclamation 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: PROCLAMATION -->
        <section class="anni-page-card" data-page="5">
          <div class="luxury-award-certificate gold-cert">
            <div class="cert-border-corner tl"></div>
            <div class="cert-border-corner tr"></div>
            <div class="cert-border-corner bl"></div>
            <div class="cert-border-corner br"></div>

            <div class="cert-ribbon" style="background:linear-gradient(135deg, #d4af37, #f59e0b); color:#fff;">✨ ETERNAL COMMITMENT ✨</div>
            <h2 class="cert-heading">SOLEMN ANNIVERSARY PROCLAMATION</h2>
            <div class="cert-recipient">HONORING OUR BOND: <strong>${recipient}</strong></div>
            <p class="cert-body">
              On this blessed anniversary, I reaffirm my love, my loyalty, and my whole heart to you. 
              Through every storm and every triumph, loving you is the easiest choice I have ever made.
            </p>
            <div class="cert-stamp" style="border-color:#d4af37; color:#d4af37;">💍 FOREVER &amp; ALWAYS 💍</div>
          </div>

          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="1">
              <span>Replay From Start 🔄</span>
            </button>
          </div>
        </section>

      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="anniLetterModal">
        <div class="blossom-modal-card">
          <button class="modal-close-btn" id="btnCloseAnniLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">My Heart, Just For You ✨</h3>
            <p class="modal-card-sub">To: ${recipient}</p>
          </div>
          <div class="modal-card-body">
            <p style="font-size:14px; line-height:1.7; color:#3d2a33; white-space:pre-wrap;">
${data.letterText || `Dearest ${recipient},\n\nEvery day with you feels like a dream come true. You make me laugh when life gets heavy, and your smile is the brightest thing in my world.\n\nThank you for loving me and being my partner in everything.\n\nHappy Anniversary, my forever love ♡`}
            </p>
          </div>
          <div class="modal-card-footer">
            <button class="modal-action-btn" id="btnAnniToastBurst">
              🥂 A Toast to Forever 🥂
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mount Audio
  initMusicPlayer(container.querySelector('#anniPlayerSlot'), {
    ...data,
    audioSrc: data.audioSrc || '/audio/alfaaz.mp3',
    audioTitle: data.audioTitle || 'Anniversary Romance Track'
  });

  // =========================================================================
  // 60FPS FLOATING GOLDEN HEARTS & EFFERVESCENCE CANVAS ANIMATION
  // =========================================================================
  const canvas = container.querySelector('#anniCanvas');
  if (canvas) {
    const cCtx = canvas.getContext('2d');
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        size: Math.random() * 8 + 5,
        speed: Math.random() * 0.9 + 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        isHeart: Math.random() > 0.4,
        alpha: Math.random() * 0.5 + 0.25
      });
    }

    function renderAnniCanvas() {
      cCtx.clearRect(0, 0, cw, ch);
      for (let p of particles) {
        p.y -= p.speed;
        p.wobble += p.wobbleSpeed;
        const cx = p.x + Math.sin(p.wobble) * 12;

        if (p.y < -20) { p.y = ch + 20; p.x = Math.random() * cw; }

        cCtx.save();
        cCtx.globalAlpha = p.alpha;
        if (p.isHeart) {
          cCtx.fillStyle = '#f59e0b';
          cCtx.beginPath();
          cCtx.arc(cx, p.y, p.size * 0.5, 0, Math.PI * 2);
          cCtx.fill();
        } else {
          cCtx.fillStyle = '#fbbf24';
          cCtx.beginPath();
          cCtx.arc(cx, p.y, p.size * 0.4, 0, Math.PI * 2);
          cCtx.fill();
        }
        cCtx.restore();
      }
      requestAnimationFrame(renderAnniCanvas);
    }
    requestAnimationFrame(renderAnniCanvas);
  }

  // =========================================================================
  // LIVE TOGETHER LOVE COUNTER
  // =========================================================================
  function updateLoveCounter() {
    const now = Date.now();
    const diff = Math.max(0, now - startDate);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const elD = container.querySelector('#ltDays');
    const elH = container.querySelector('#ltHours');
    const elM = container.querySelector('#ltMins');
    const elS = container.querySelector('#ltSecs');

    if (elD) elD.textContent = d;
    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateLoveCounter, 1000);
  updateLoveCounter();

  // =========================================================================
  // INTERACTIVE 60FPS ROYALE CHAMPAGNE TOAST & INFINITY RINGS PHYSICS 🥂✨
  // =========================================================================
  const toastCanvas = container.querySelector('#anniToastCanvas');
  const flutesRig = container.querySelector('#champagneFlutesRig');
  const fluteLeft = container.querySelector('#fluteLeft');
  const fluteRight = container.querySelector('#fluteRight');
  const sparkleStar = container.querySelector('#toastSparkleStar');
  const ringsGroup = container.querySelector('#infinityRingsGroup');
  const toastBanner = container.querySelector('#anniToastBanner');

  if (toastCanvas) {
    const tCtx = toastCanvas.getContext('2d');
    let tW = (toastCanvas.width = toastCanvas.offsetWidth || 380);
    let tH = (toastCanvas.height = 230);

    // Rising effervescent fizz bubbles
    const bubbles = Array.from({ length: 24 }, () => ({
      x: tW * 0.25 + Math.random() * (tW * 0.5),
      y: Math.random() * tH,
      vy: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 2.8,
      alpha: 0.3 + Math.random() * 0.6
    }));

    function renderToastBubbles() {
      tW = toastCanvas.width = toastCanvas.offsetWidth || 380;
      tH = toastCanvas.height = 230;
      tCtx.clearRect(0, 0, tW, tH);

      bubbles.forEach(b => {
        b.y -= b.vy;
        b.x += b.vx;
        if (b.y < -5) {
          b.y = tH + 5;
          b.x = tW * 0.25 + Math.random() * (tW * 0.5);
        }

        tCtx.fillStyle = '#fef08a';
        tCtx.globalAlpha = b.alpha;
        tCtx.beginPath();
        tCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        tCtx.fill();
      });
      tCtx.globalAlpha = 1;
      requestAnimationFrame(renderToastBubbles);
    }
    requestAnimationFrame(renderToastBubbles);
  }

  // Gentle 3D orbiting infinity rings loop
  if (ringsGroup) {
    gsap.to(ringsGroup, {
      rotate: 360,
      duration: 16,
      repeat: -1,
      ease: 'none'
    });
  }

  const toastQuotes = [
    "🥂 \"Cheers to our forever & always\"",
    "💍 \"Two souls intertwined for a lifetime\"",
    "✨ \"Every day with you is my greatest gift\"",
    "💖 \"Falling deeper in love every second\"",
    "🥂 \"To 100 more years of us laughing together\""
  ];
  let toastQuoteIdx = 0;

  function clinkToast() {
    playChimeTone();
    if (navigator.vibrate) navigator.vibrate([25, 35]);

    // Animate glasses tilting inwards to clink
    gsap.timeline()
      .to(fluteLeft, { rotate: 18, x: 18, duration: 0.2, ease: 'power2.in' })
      .to(fluteRight, { rotate: -18, x: -18, duration: 0.2, ease: 'power2.in' }, '<')
      .to(sparkleStar, { opacity: 1, scale: 1.8, duration: 0.15 }, '+=0.02')
      .to(fluteLeft, { rotate: -3, x: 0, duration: 0.3, ease: 'back.out(2)' })
      .to(fluteRight, { rotate: 3, x: 0, duration: 0.3, ease: 'back.out(2)' }, '<')
      .to(sparkleStar, { opacity: 0, scale: 0.5, duration: 0.25 }, '<');

    // Accelerate rings
    if (ringsGroup) {
      gsap.to(ringsGroup, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: 'back.out(2)' });
    }

    toastQuoteIdx = (toastQuoteIdx + 1) % toastQuotes.length;
    if (toastBanner) {
      toastBanner.textContent = toastQuotes[toastQuoteIdx];
      gsap.fromTo(toastBanner, { scale: 0.88 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    }

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.45 },
      colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff']
    });
  }

  flutesRig?.addEventListener('click', clinkToast);

  // =========================================================================
  // WAX SEAL MODAL LOGIC
  // =========================================================================
  const sealBtn = container.querySelector('#anniWaxSeal');
  const modal = container.querySelector('#anniLetterModal');
  const closeModal = container.querySelector('#btnCloseAnniLetter');
  const toastBurstBtn = container.querySelector('#btnAnniToastBurst');

  sealBtn?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(20);
    modal.classList.add('visible');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  });

  closeModal?.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  toastBurstBtn?.addEventListener('click', () => {
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 }, colors: ['#ffd700', '#f59e0b', '#ff4d6d'] });
  });

  // =========================================================================
  // MULTI-PAGE STORYBOOK CONTROLLER
  // =========================================================================
  const pages = container.querySelectorAll('.anni-page-card');
  const progressFill = container.querySelector('#anniStepProgressFill');
  const stageStepPill = container.querySelector('#anniStageStepPill');
  const stageTitleText = container.querySelector('#anniStageTitleText');

  const STAGE_TITLES = {
    1: "Celebrating Our Love Story ✨",
    2: "Our Journey Milestones 📖",
    3: "Polaroid Memories 📸",
    4: "A Sacred Love Letter 💌",
    5: "Eternity Proclamation 👑"
  };

  function goToPage(pageNum) {
    const p = Math.max(1, Math.min(5, pageNum));
    pages.forEach(page => {
      page.classList.toggle('active', parseInt(page.getAttribute('data-page'), 10) === p);
    });

    if (progressFill) progressFill.style.width = `${(p / 5) * 100}%`;
    if (stageStepPill) stageStepPill.textContent = `PAGE ${p} OF 5`;
    if (stageTitleText) stageTitleText.textContent = STAGE_TITLES[p] || "Anniversary Story";

    if (navigator.vibrate) navigator.vibrate(12);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  container.querySelectorAll('.btn-anni-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'), 10);
      goToPage(next);
    });
  });

  container.querySelectorAll('.btn-anni-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'), 10);
      goToPage(prev);
    });
  });

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.anni-polaroid-photo img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.anni-polaroid-card');
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
        link.download = `anniversary-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff']
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
