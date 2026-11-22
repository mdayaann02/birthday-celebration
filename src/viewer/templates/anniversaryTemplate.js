// src/viewer/templates/anniversaryTemplate.js - Ultra-Aesthetic Romantic Anniversary Celebration
// Features: 60fps Golden Hearts & Effervescence Canvas, Live Animated Love Counter,
// Interactive Clinking Champagne Toast Physics, Wax Seal Envelope Unfolding, and Romantic Timeline.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

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

            <!-- Interactive Clinking Champagne Toast -->
            <div class="anni-toast-interactive-box" style="margin-top:20px; text-align:center;">
              <div class="toast-glasses-row" id="toastGlassesRow" style="display:flex; justify-content:center; align-items:center; gap:24px; cursor:pointer;">
                <span class="toast-glass glass-l" id="glassL" style="font-size:42px; display:inline-block; transition:transform 0.2s ease;">🥂</span>
              </div>
              <p style="font-size:11.5px; font-weight:700; color:#fbbf24; margin-top:8px;">✨ TAP THE GLASSES TO CLINK A TOAST ✨</p>
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
  // INTERACTIVE CLINKING TOAST
  // =========================================================================
  const glasses = container.querySelector('#glassL');
  glasses?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([20, 30]);
    gsap.fromTo(glasses, { scale: 1.3, rotate: -15 }, { scale: 1, rotate: 0, duration: 0.35, ease: 'elastic.out(1, 0.3)' });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff']
    });
  });

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
}
