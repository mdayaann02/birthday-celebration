// src/viewer/templates/valentineTemplate.js - Ultra-Aesthetic Valentine & Proposal Confession (Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderValentineTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "That Unforgettable Smile ✨", image: "/images/pretty.jpg", note: "The very first time you looked at me and smiled, my heart decided right then." },
    { title: "Our Favorite Adventures 🌅", image: "/images/sunset.jpg", note: "Every moment with you feels like a beautiful dream I never want to wake up from." },
    { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "The kindest, most radiant soul. I am truly the luckiest person in the world." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="valPlayerSlot"></div>

    <div class="val-page-viewport val-storybook-viewport">
      <!-- Falling Rose Petals Canvas -->
      <canvas id="valPetalCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="val-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="val-step-progress-track">
          <div class="val-step-progress-fill" id="valStepProgressFill" style="width: 25%;"></div>
        </div>
        <div class="val-stage-indicator-bar">
          <div class="val-stage-info-pill">
            <span class="stage-step-tag" id="valStageStepPill">PAGE 1 OF 4</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="valStageTitleText">A Confession of Love 🌹</span>
          </div>
        </div>
      </header>

      <main class="val-pages-container" id="valPagesContainer">
        <!-- PAGE 1: HERO & WAX SEAL -->
        <section class="val-page-card active" data-page="1">
          <div class="val-hero-wrap">
            <div class="val-tag">A CONFESSION OF LOVE 🌹</div>
            <h1 class="val-hero-title">${data.heroTitle || 'To The One Who Stole My Heart'}</h1>
            <p class="val-hero-sub">${data.heroSubtitle || 'Every love song makes complete sense now that you are in my life ❤️'}</p>

            <!-- 3D Pastel Envelope with Wax Seal -->
            <div class="wax-envelope-wrap" id="valEnvelope" style="margin-top:20px;">
              <div class="envelope-back"></div>
              <div class="envelope-front"></div>
              <div class="envelope-flap" id="valFlap"></div>

              <button class="wax-seal-button" id="valWaxSeal" title="Tap to unseal letter">
                <div class="wax-seal-emblem">
                  <span style="font-size:22px;">💌</span>
                </div>
              </button>
            </div>
            <p class="envelope-subtitle" style="margin-top:16px;">👆 Tap the wax seal to read the secret letter!</p>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-next" data-next="2">
              <span>Why I Fell For You 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: POLAROIDS -->
        <section class="val-page-card" data-page="2">
          <div class="val-memories-section">
            <div class="val-tag">WHY I FELL FOR YOU 📸</div>
            <h2 class="val-memories-title">Cherished Moments With You</h2>
            <div class="val-polaroids-grid">
              ${polaroids.map((p, i) => `
                <div class="val-polaroid-card">
                  <div class="val-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title || 'Valentine Memory'}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="val-polaroid-caption">
                    <h4 class="val-pol-title">${p.title || `Memory #${i+1}`}</h4>
                    <p class="val-pol-note">${p.note || p.caption || ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="3">
              <span>The Big Question 💍</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: PROPOSAL CHALLENGE -->
        <section class="val-page-card" data-page="3">
          <div class="val-proposal-section">
            <div class="val-proposal-card">
              <div class="val-neon-heart">💖</div>
              <h2 class="val-proposal-query">${data.proposalQuestion || 'Will You Be My Valentine & Forever? ❤️'}</h2>
              
              <div class="val-decision-buttons">
                <button class="btn-val-yes" id="btnProposalYes">
                  YES! A Million Times YES! 💍
                </button>
                <button class="btn-val-no" id="btnProposalNo">
                  No 🙈
                </button>
              </div>

              <div class="val-accepted-banner" id="valAcceptedBanner" style="display:none;">
                <div style="font-size:46px; margin-bottom:8px;">🥂💍✨</div>
                <h3 class="val-accepted-heading">SHE SAID YES!</h3>
                <p class="val-accepted-text">Here is to us, our endless smiles, silly inside jokes, and a lifetime of love. You are my forever! ❤️🌹</p>
              </div>
            </div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="4">
              <span>Soulmate Proclamation 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: CERTIFICATE & REPLAY -->
        <section class="val-page-card" data-page="4">
          <div class="luxury-award-certificate gold-cert">
            <div class="cert-border-corner tl"></div>
            <div class="cert-border-corner tr"></div>
            <div class="cert-border-corner bl"></div>
            <div class="cert-border-corner br"></div>

            <div class="cert-ribbon" style="background:linear-gradient(135deg, #f43f5e, #fb7185); color:#fff;">🌹 ETERNAL SOULMATE 🌹</div>
            <h2 class="cert-heading">SOULMATE OF MY HEART</h2>
            <div class="cert-recipient">SOLEMNLY PLEDGED TO: <strong>${data.recipientName || 'MY LOVE'}</strong></div>
            <p class="cert-body">
              Certified as the only person who holds the key to my heart, my greatest blessing, 
              and my chosen companion for every lifetime ahead.
            </p>
            <div class="cert-stamp" style="border-color:#f43f5e; color:#f43f5e;">💍 FOREVER YOURS 💍</div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-val-replay" id="btnValReplay">
              <span>🌹 Replay Our Confession ↺</span>
            </button>
          </div>
        </section>
      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="valLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-corner c-tl">┌</div>
          <div class="modal-corner c-tr">┐</div>
          <div class="modal-corner c-bl">└</div>
          <div class="modal-corner c-br">┘</div>
          
          <button class="modal-close-btn" id="btnCloseValLetter">&times;</button>

          <div class="modal-card-header">
            <h3 class="modal-card-title">My Heart, Just For You ✨</h3>
            <p class="modal-card-sub">To: ${data.recipientName || 'My Dearest'}</p>
          </div>

          <div class="modal-card-body" id="valLetterBody">
            <span id="typedValText"></span><span class="typing-cursor">|</span>
          </div>

          <div class="modal-card-footer">
            <button class="modal-action-btn" id="btnValHeartBurst">
              💖 Send Love Heartburst 💖
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page switcher engine
  const valPageTitles = [
    { num: 1, title: "A Confession of Love 🌹" },
    { num: 2, title: "Why I Fell For You 📸" },
    { num: 3, title: "Will You Be Mine? 💍" },
    { num: 4, title: "Eternal Soulmate Award 👑" }
  ];

  const totalPages = valPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#valStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#valStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#valStageTitleText');
    if (titleText && valPageTitles[currentPage - 1]) {
      titleText.textContent = valPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.val-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-val-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-val-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });
  container.querySelector('#btnValReplay')?.addEventListener('click', () => goToPage(1));

  // Falling Petals Canvas
  const pCanvas = container.querySelector('#valPetalCanvas');
  if (pCanvas) {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
    const pCtx = pCanvas.getContext('2d');
    const petals = [];
    for (let i = 0; i < 24; i++) {
      petals.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        size: Math.random() * 8 + 5,
        vx: Math.random() * 1.5 - 0.75,
        vy: Math.random() * 1.2 + 0.8,
        rot: Math.random() * 360
      });
    }

    function renderPetals() {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (let p of petals) {
        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate((p.rot * Math.PI) / 180);
        pCtx.beginPath();
        pCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(244, 63, 94, 0.75)';
        pCtx.fill();
        pCtx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rot += 1;
        if (p.y > pCanvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * pCanvas.width;
        }
      }
      requestAnimationFrame(renderPetals);
    }
    renderPetals();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#valPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Can't Help Falling in Love",
      audioSubtitle: data.audioSubtitle || "VALENTINE SPECIAL",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Wax Seal Envelope Unseal Animation
  const waxBtn = container.querySelector('#valWaxSeal');
  const flap = container.querySelector('#valFlap');
  const modal = container.querySelector('#valLetterModal');
  const closeBtn = container.querySelector('#btnCloseValLetter');
  const typedEl = container.querySelector('#typedValText');

  waxBtn?.addEventListener('click', () => {
    waxBtn.classList.add('cracked');
    flap.classList.add('open');

    setTimeout(() => {
      modal.classList.add('show');
      const text = data.loveLetter || 'You walked into my life so gently, but turned it into the most magical journey. Your smile is my daily dose of peace, and your voice makes everything else fade away. I want to spend all my tomorrows making you smile as bright as you make mine.';
      typedEl.innerHTML = "";
      let idx = 0;
      function type() {
        if (idx < text.length) {
          typedEl.innerHTML += text[idx] === '\n' ? '<br/>' : text[idx];
          idx++;
          setTimeout(type, 28);
        }
      }
      type();
    }, 550);
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Heart burst button
  container.querySelector('#btnValHeartBurst')?.addEventListener('click', () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff']
    });
  });

  // Playful dodging NO button & Expanding YES button
  const btnNo = container.querySelector('#btnProposalNo');
  const btnYes = container.querySelector('#btnProposalYes');
  const acceptedBanner = container.querySelector('#valAcceptedBanner');

  const funnyNoResponses = [
    "No 🙈",
    "Are you sure? 🥺",
    "Think again! 😜",
    "Wrong button! 😂",
    "You can't catch me! 🏃‍♂️💨",
    "Just tap YES! 💍",
    "Look how big YES is! 😍",
    "Resistance is futile! ❤️",
    "You have no choice 🥺",
    "Always YES! 💖"
  ];
  let noIdx = 0;
  let yesScale = 1.0;

  function dodgeNo(e) {
    if (e && e.cancelable) e.preventDefault();
    if (navigator.vibrate) navigator.vibrate(15);

    const maxW = Math.min(window.innerWidth * 0.35, 160);
    const rx = (Math.random() - 0.5) * maxW * 2;
    const ry = (Math.random() - 0.5) * 110;

    btnNo.style.position = 'relative';
    btnNo.style.transition = 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)';
    btnNo.style.transform = `translate(${rx}px, ${ry}px)`;

    noIdx = (noIdx + 1) % funnyNoResponses.length;
    btnNo.textContent = funnyNoResponses[noIdx];

    // Grow YES button bigger and more enticing
    yesScale = Math.min(yesScale + 0.12, 1.85);
    btnYes.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.style.boxShadow = `0 10px 32px rgba(244, 63, 94, ${0.45 + (yesScale - 1) * 0.3})`;
  }

  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('pointerdown', dodgeNo);
  btnNo?.addEventListener('touchstart', dodgeNo, { passive: false });

  btnYes?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([40, 80, 120]);

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff', '#ec4899', '#a855f7']
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#ff3366', '#ff758f', '#ffffff']
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#ff3366', '#ff758f', '#ffffff']
      });
    }, 280);

    btnNo.style.display = 'none';
    btnYes.style.display = 'none';
    if (acceptedBanner) {
      acceptedBanner.style.display = 'block';
      acceptedBanner.classList.add('pop-in-bounce');
    }
  });
}
