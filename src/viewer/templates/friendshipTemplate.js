// src/viewer/templates/friendshipTemplate.js - Best Friends Forever Luxury Celebration (Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderFriendshipTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Partners in Crime 👯", image: "/images/sunset.jpg", note: "From crazy spontaneous plans to endless uncontrollable laughter." },
    { title: "Best Friends Forever 🥂", image: "/images/always_you.jpg", note: "Thank you for always having my back no matter what." },
    { title: "Unstoppable Duo 🌟", image: "/images/baddie.jpg", note: "Here's to a lifetime of chaotic adventures and memories!" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="bffPlayerSlot"></div>

    <div class="bff-page-viewport bff-storybook-viewport">
      <!-- Ambient Sparkle Canvas -->
      <canvas id="bffCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="bff-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="bff-step-progress-track">
          <div class="bff-step-progress-fill" id="bffStepProgressFill" style="width: 25%;"></div>
        </div>
        <div class="bff-stage-indicator-bar">
          <div class="bff-stage-info-pill">
            <span class="stage-step-tag" id="bffStageStepPill">PAGE 1 OF 4</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="bffStageTitleText">Partners in Crime 🏆</span>
          </div>
        </div>
      </header>

      <main class="bff-pages-container" id="bffPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="bff-page-card active" data-page="1">
          <div class="bff-hero-wrap">
            <div class="bff-tag">PARTNERS IN CRIME 🏆</div>
            <h1 class="bff-hero-title">${data.heroTitle || 'Cheers to My Best Friend!'}</h1>
            <p class="bff-hero-sub">${data.heroSubtitle || 'To the one who knows all my secrets and loves me anyway! 😂'}</p>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-next" data-next="2">
              <span>View Distinction Certificate 🎖️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: LUXURY CERTIFICATE -->
        <section class="bff-page-card" data-page="2">
          <div class="bff-cert-luxury">
            <div class="cert-gold-frame">
              <div class="cert-seal-ribbon">🎖️</div>
              <div class="cert-header-tag">OFFICIAL CERTIFICATE OF DISTINCTION</div>
              <h2 class="cert-main-name">BEST HUMAN BEING ALIVE</h2>
              <div class="cert-sub-text">This prestigious recognition is proudly presented to:</div>
              <div class="cert-recipient-name">${data.recipientName || 'My Bestie'}</div>
              <p class="cert-award-reason">${data.awardReason || 'For exceptional tolerance of my 2 AM drama, unconditional loyalty, unmatched humor, and being an elite gossip partner.'}</p>
              <div class="cert-sign-row">
                <div>
                  <span class="cert-sign-label">Date Awarded</span>
                  <strong class="cert-sign-val">Today &amp; Forever</strong>
                </div>
                <div>
                  <span class="cert-sign-label">Certified By</span>
                  <strong class="cert-sign-val">${data.senderName || 'Your Ride or Die'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-bff-next" data-next="3">
              <span>Unforgettable Chaos Episodes ⚡</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: SILLY MEMORIES HALL OF FAME -->
        <section class="bff-page-card" data-page="3">
          <div class="bff-memories-section">
            <div class="bff-tag">HALL OF FAME</div>
            <h2 class="bff-section-title">Unforgettable Chaos</h2>

            <div class="bff-cards-grid">
              ${(data.sillyMemories || [
                { title: "The 2 AM Phone Calls", text: "When we solve all of the world's problems while laughing until our stomachs hurt." },
                { title: "Unspoken Telepathy", text: "That one look across the room that says everything without saying a single word." },
                { title: "Through Thick and Thin", text: "No matter how chaotic life gets, having you in my corner makes everything okay." }
              ]).map((m, i) => `
                <div class="bff-chaos-card">
                  <span class="bff-card-badge">EPISODE 0${i+1}</span>
                  <h3 class="bff-card-title">${m.title}</h3>
                  <p class="bff-card-desc">${m.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-bff-next" data-next="4">
              <span>Bestie Polaroids &amp; Toast 🥂</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: POLAROIDS & TOAST -->
        <section class="bff-page-card" data-page="4">
          <div class="bff-polaroid-gallery">
            <div class="bff-tag">📸 BESTIE MEMORY WALL</div>
            <h2 style="font-family:'Playfair Display',serif; font-size:24px; color:#fff; text-align:center; margin:6px 0 20px;">Moments We Will Never Forget</h2>
            <div class="bff-polaroids-grid">
              ${polaroids.map((p, i) => `
                <div class="bff-polaroid-card">
                  <div class="bff-polaroid-frame">
                    <img src="${p.image}" alt="${p.title || 'Bestie Memory'}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="bff-polaroid-info">
                    <h4 class="bff-pol-title">${p.title || `Memory #${i+1}`}</h4>
                    <p class="bff-pol-note">${p.note || p.caption || ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="text-align:center; margin: 30px 0 10px;">
              <button class="btn-bff-toast" id="btnBffToast">
                🥂 Toast to 100 More Years of Friendship! 🥂
              </button>
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-bff-replay" id="btnBffReplay">
              <span>🥂 Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page switcher engine
  const bffPageTitles = [
    { num: 1, title: "Partners in Crime 🏆" },
    { num: 2, title: "Official Distinction Certificate 🎖️" },
    { num: 3, title: "Unforgettable Chaos Episodes ⚡" },
    { num: 4, title: "Bestie Memories & Toast 🥂" }
  ];

  const totalPages = bffPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#bffStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#bffStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#bffStageTitleText');
    if (titleText && bffPageTitles[currentPage - 1]) {
      titleText.textContent = bffPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.bff-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-bff-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-bff-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });
  container.querySelector('#btnBffReplay')?.addEventListener('click', () => goToPage(1));

  // Sparkles canvas
  const bCanvas = container.querySelector('#bffCanvas');
  if (bCanvas) {
    bCanvas.width = window.innerWidth;
    bCanvas.height = window.innerHeight;
    const bCtx = bCanvas.getContext('2d');
    const stars = [];
    for (let i = 0; i < 25; i++) {
      stars.push({
        x: Math.random() * bCanvas.width,
        y: Math.random() * bCanvas.height,
        r: Math.random() * 4 + 2,
        vy: -(Math.random() * 0.8 + 0.3),
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function renderStars() {
      bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);
      for (let s of stars) {
        bCtx.save();
        bCtx.beginPath();
        bCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bCtx.fillStyle = `rgba(46, 213, 115, ${s.alpha})`;
        bCtx.shadowBlur = 8;
        bCtx.shadowColor = '#2ed573';
        bCtx.fill();
        bCtx.restore();

        s.y += s.vy;
        if (s.y < -10) s.y = bCanvas.height + 10;
      }
      requestAnimationFrame(renderStars);
    }
    renderStars();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#bffPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Memories & Laughter",
      audioSubtitle: data.audioSubtitle || "BESTIE ANTHEM",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Confetti Toast Button
  container.querySelector('#btnBffToast')?.addEventListener('click', () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#2ed573', '#ffa502', '#ff4757', '#ffffff', '#70a1ff']
    });
  });
}
