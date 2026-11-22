// src/viewer/templates/anniversaryTemplate.js - Ultra-Aesthetic Romantic Anniversary Celebration (Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderAnniversaryTemplate(container, data) {
  const startDate = new Date(data.anniversaryStartDate || "2023-11-28T00:00").getTime();
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I realized I never want to watch a sunset with anyone else." },
    { title: "Endless Laughter & Joy 🫶", image: "/images/always_you.jpg", note: "Smiling so much my cheeks hurt. You bring pure sunshine into my days." },
    { title: "Forever & Always 💍", image: "/images/dream_girl.jpg", note: "A lifetime of choosing you, loving you, and growing with you." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="anniPlayerSlot"></div>

    <!-- Floating Bokeh & Petal Canvas -->
    <canvas id="anniCanvas" class="blossom-bg-canvas"></canvas>

    <div class="anniversary-page-wrap anni-storybook-viewport">
      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="anni-floating-nav" style="pointer-events:none; user-select:none;">
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
        <!-- PAGE 1: HERO & COUNTER -->
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
              <span>My Vows to You 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: VOWS -->
        <section class="anni-page-card" data-page="3">
          <section class="anni-section">
            <div class="anni-section-tag">FROM THE DEPTHS OF MY HEART</div>
            <h2 class="anni-section-head">My Vows to You</h2>
            <div class="anni-vows-grid">
              ${(data.vows || [
                "I promise to always hold your hand through every joy and every storm.",
                "I promise to make you laugh even on your hardest days.",
                "I promise to love you more today than yesterday, and more tomorrow than today."
              ]).map((vow, i) => `
                <div class="anni-vow-card">
                  <div class="anni-vow-icon">💌</div>
                  <p class="anni-vow-text">"${vow}"</p>
                </div>
              `).join('')}
            </div>
          </section>
          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="4">
              <span>Cherished Moments 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: POLAROIDS -->
        <section class="anni-page-card" data-page="4">
          <section class="anni-section">
            <div class="anni-section-tag">UNFORGETTABLE MEMORIES</div>
            <h2 class="anni-section-head">Moments of Us 📸</h2>
            <div class="anni-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="anni-polaroid-item">
                  <div class="anni-polaroid-frame">
                    <img src="${p.image}" alt="${p.title || 'Anniversary Memory'}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="anni-polaroid-caption">
                    <h4 class="anni-pol-title">${p.title || `Memory #${i+1}`}</h4>
                    <p class="anni-pol-note">${p.note || p.caption || ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-anni-next" data-next="5">
              <span>Read Love Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: LETTER & FINALE -->
        <section class="anni-page-card" data-page="5">
          <section class="anni-section">
            <div class="anni-letter-card">
              <div class="anni-letter-header">
                <h3>To My Forever, ${data.recipientName || 'My Love'}</h3>
                <span class="anni-letter-date">Together Forever</span>
              </div>
              <div class="anni-letter-body">
                <p>${data.letter || 'Thank you for choosing me every single day. You are my home, my peace, and my greatest adventure.'}</p>
              </div>
              <div class="anni-letter-sign">
                Forever with all my heart,<br />
                <strong>${data.senderName || 'Yours Truly'} ❤️</strong>
              </div>
              <div style="text-align:center; margin-top:28px;">
                <button class="anni-heart-shower-btn" id="btnHeartShower">
                  💖 Send Heart Shower 💖
                </button>
              </div>
            </div>
          </section>
          <div class="anni-nav-dock">
            <button type="button" class="btn-anni-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-anni-replay" id="btnAnniReplay">
              <span>💍 Replay Our Story ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page switcher engine
  const anniPageTitles = [
    { num: 1, title: "Celebrating Our Love Story ✨" },
    { num: 2, title: "Our Beautiful Journey 📖" },
    { num: 3, title: "My Vows to You 💌" },
    { num: 4, title: "Moments of Us 📸" },
    { num: 5, title: "Forever Love Letter 💍" }
  ];

  const totalPages = anniPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#anniStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#anniStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#anniStageTitleText');
    if (titleText && anniPageTitles[currentPage - 1]) {
      titleText.textContent = anniPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.anni-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-anni-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-anni-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });
  container.querySelector('#btnAnniReplay')?.addEventListener('click', () => goToPage(1));

  // Init Floating Bokeh Canvas
  const canvas = container.querySelector('#anniCanvas');
  if (canvas) {
    const cCtx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 5 + 2,
        vy: -(Math.random() * 0.7 + 0.3),
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function draw() {
      cCtx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        cCtx.save();
        cCtx.beginPath();
        cCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cCtx.fillStyle = `rgba(255, 77, 109, ${p.alpha})`;
        cCtx.shadowBlur = 10;
        cCtx.shadowColor = '#ff4d6d';
        cCtx.fill();
        cCtx.restore();

        p.y += p.vy;
        if (p.y < -10) p.y = canvas.height + 10;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#anniPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Our Love Symphony",
      audioSubtitle: data.audioSubtitle || "ANNIVERSARY EDITION",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Start love counter timer
  const elD = container.querySelector('#ltDays');
  const elH = container.querySelector('#ltHours');
  const elM = container.querySelector('#ltMins');
  const elS = container.querySelector('#ltSecs');

  function updateLoveTimer() {
    const elapsed = Date.now() - startDate;
    const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const h = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const m = Math.floor((elapsed / 1000 / 60) % 60);
    const s = Math.floor((elapsed / 1000) % 60);

    if (elD) elD.textContent = d;
    if (elH) elH.textContent = h < 10 ? `0${h}` : h;
    if (elM) elM.textContent = m < 10 ? `0${m}` : m;
    if (elS) elS.textContent = s < 10 ? `0${s}` : s;
  }
  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);

  // Heart shower button
  container.querySelector('#btnHeartShower')?.addEventListener('click', () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#d4af37', '#fff', '#fbcfe8']
    });
  });
}
