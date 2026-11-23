// src/viewer/templates/valentineTemplate.js - Ultra-Aesthetic Valentine & Proposal Confession
// Features: Cupid Archery Mini-Game, Runaway "No" Physics, Canvas Fireworks Display,
// 3D Wax Seal Unfolding Letter, and Soulmate Certificate.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderValentineTemplate(container, data) {
  const recipient = data.recipientName || 'My Dearest Love';
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "That Unforgettable Smile ✨", image: "/images/pretty.jpg", note: "The very first time you looked at me and smiled, my heart decided right then." },
    { title: "Our Favorite Adventures 🌅", image: "/images/sunset.jpg", note: "Every moment with you feels like a beautiful dream I never want to wake up from." },
    { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "The kindest, most radiant soul. I am truly the luckiest person in the world." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="valPlayerSlot"></div>

    <!-- Fireworks & Celebration Canvas -->
    <canvas id="valFireworksCanvas" style="position:fixed; inset:0; pointer-events:none; z-index:2; width:100%; height:100%;"></canvas>

    <div class="val-page-viewport val-storybook-viewport">
      <!-- Falling Rose Petals Canvas -->
      <canvas id="valPetalCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Indicator Bar -->
      <header class="val-floating-nav" style="user-select:none;">
        <div class="val-step-progress-track">
          <div class="val-step-progress-fill" id="valStepProgressFill" style="width: 20%;"></div>
        </div>
        <div class="val-stage-indicator-bar">
          <div class="val-stage-info-pill">
            <span class="stage-step-tag" id="valStageStepPill">PAGE 1 OF 5</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="valStageTitleText">Cupid's Sacred Arrow 🏹</span>
          </div>
        </div>
      </header>

      <main class="val-pages-container" id="valPagesContainer">
        
        <!-- PAGE 1: CUPID'S ARCHERY GAME -->
        <section class="val-page-card active" data-page="1">
          <div class="val-hero-wrap">
            <div class="val-tag">CUPID'S SACRED ARROW 🏹❤️</div>
            <h1 class="val-hero-title">${data.heroTitle || 'Cupid Struck My Heart'}</h1>
            <p class="val-hero-sub">${data.heroSubtitle || 'Pull back the recurve bow and strike my heart to begin our romantic confession...'}</p>

            <!-- Interactive Archery Arena -->
            <div class="val-archery-box" id="valArcheryBox" style="position:relative; width:100%; max-width:340px; height:240px; margin:20px auto; background:rgba(255,255,255,0.04); border:1px solid rgba(244,63,94,0.3); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:16px;">
              
              <!-- Floating Target Heart -->
              <div class="val-target-heart" id="valTargetHeart" style="position:relative; cursor:pointer;">
                <span style="font-size:46px; display:inline-block; animation: pulse 1.5s infinite;">💖</span>
              </div>

              <!-- Recurve Bow -->
              <div class="val-bow-rig" id="valBowRig" style="cursor:pointer; text-align:center;">
                <div id="valArrow" style="font-size:28px; transform:translateY(0); transition:transform 0.1s ease;">🏹</div>
                <p style="font-size:11px; font-weight:700; color:#fb7185; margin-top:4px;">▼ PULL OR TAP TO SHOOT ▼</p>
              </div>

              <button type="button" class="btn-fam-action btn-quick-cupid" id="btnValDirectShoot" style="font-size:11.5px; padding:6px 16px; border-radius:14px; background:rgba(225,29,72,0.18); border:1px solid #e11d48; color:#fff; font-weight:700; cursor:pointer;">
                🎯 Direct Cupid Strike
              </button>
            </div>
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-next" data-next="2">
              <span>Read Secret Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: WAX SEAL LETTER -->
        <section class="val-page-card" data-page="2">
          <div class="val-hero-wrap">
            <div class="val-tag">A CONFESSION OF LOVE 🌹</div>
            <h2 class="val-hero-title">My Heart, In Words</h2>
            <p class="val-hero-sub">Tap the wax seal to read the secret letter written just for you</p>

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
            <p class="envelope-subtitle" style="margin-top:16px;">👆 Tap the seal to open!</p>
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="3">
              <span>Why I Fell For You 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: POLAROIDS -->
        <section class="val-page-card" data-page="3">
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
                    <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 8px auto 2px auto;">
                      📸 Save Keepsake
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="4">
              <span>The Big Question 💍</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: RUNAWAY "NO" PROPOSAL CHALLENGE -->
        <section class="val-page-card" data-page="4">
          <div class="val-proposal-section">
            <div class="val-proposal-card" id="valProposalCard" style="position:relative; overflow:hidden; min-height:360px;">
              <div class="val-neon-heart">💖</div>
              <h2 class="val-proposal-query">${data.proposalQuestion || 'Will You Be My Valentine & Forever? ❤️'}</h2>
              
              <div class="val-decision-buttons" style="position:relative; min-height:80px; margin-top:20px;">
                <button class="btn-val-yes" id="btnProposalYes">
                  YES! A Million Times YES! 💍
                </button>
                <button class="btn-val-no" id="btnProposalNo" style="position:absolute; transition:all 0.18s cubic-bezier(0.16, 1, 0.3, 1);">
                  No 🙈
                </button>
              </div>

              <div class="val-accepted-banner" id="valAcceptedBanner" style="display:none; margin-top:20px;">
                <div style="font-size:48px; margin-bottom:8px;">🥂💍✨</div>
                <h3 class="val-accepted-heading">SHE SAID YES!</h3>
                <p class="val-accepted-text">Here is to us, our endless smiles, silly inside jokes, and a lifetime of love. You are my forever! ❤️🌹</p>
              </div>
            </div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="5">
              <span>Soulmate Proclamation 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: CERTIFICATE & REPLAY -->
        <section class="val-page-card" data-page="5">
          <div class="luxury-award-certificate gold-cert">
            <div class="cert-border-corner tl"></div>
            <div class="cert-border-corner tr"></div>
            <div class="cert-border-corner bl"></div>
            <div class="cert-border-corner br"></div>

            <div class="cert-ribbon" style="background:linear-gradient(135deg, #f43f5e, #fb7185); color:#fff;">🌹 ETERNAL SOULMATE 🌹</div>
            <h2 class="cert-heading">SOULMATE OF MY HEART</h2>
            <div class="cert-recipient">SOLEMNLY PLEDGED TO: <strong>${recipient}</strong></div>
            <p class="cert-body">
              Certified as the only person who holds the key to my heart, my greatest blessing, 
              and my chosen companion for every lifetime ahead.
            </p>
            <div class="cert-stamp" style="border-color:#f43f5e; color:#f43f5e;">💍 FOREVER YOURS 💍</div>
          </div>
          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-val-replay" id="btnValReplay">
              <span>🌹 Replay Our Confession ↺</span>
            </button>
          </div>
        </section>
      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="valLetterModal">
        <div class="blossom-modal-card">
          <button class="modal-close-btn" id="btnCloseValLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">My Heart, Just For You ✨</h3>
            <p class="modal-card-sub">To: ${recipient}</p>
          </div>
          <div class="modal-card-body" id="valLetterBody">
            <p style="font-size:14px; line-height:1.7; color:#3d2a33; white-space:pre-wrap;">
${data.letterText || `Dearest ${recipient},\n\nEvery day with you feels like a dream come true. You make me laugh when life gets heavy, and your smile is the brightest thing in my world.\n\nThank you for loving me and being my partner in everything.\n\nForever yours ♡`}
            </p>
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

  // Mount Audio Player
  initMusicPlayer(container.querySelector('#valPlayerSlot'), {
    ...data,
    audioSrc: data.audioSrc || '/audio/alfaaz.mp3',
    audioTitle: data.audioTitle || 'Valentine Romance Track'
  });

  // =========================================================================
  // 60FPS FALLING ROSE PETALS & GLOWING HEARTS CANVAS
  // =========================================================================
  const vPetalCanvas = container.querySelector('#valPetalCanvas');
  if (vPetalCanvas) {
    const vCtx = vPetalCanvas.getContext('2d');
    let vW = (vPetalCanvas.width = window.innerWidth);
    let vH = (vPetalCanvas.height = window.innerHeight);

    const petals = Array.from({ length: 30 }, () => ({
      x: Math.random() * vW,
      y: Math.random() * vH,
      size: 5 + Math.random() * 8,
      speedY: 0.8 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      color: Math.random() > 0.4 ? 'rgba(225, 29, 72, 0.45)' : 'rgba(251, 113, 133, 0.35)'
    }));

    function animVPetals() {
      vCtx.clearRect(0, 0, vW, vH);
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;
        if (p.y > vH + 20) {
          p.y = -20;
          p.x = Math.random() * vW;
        }

        vCtx.save();
        vCtx.translate(p.x, p.y);
        vCtx.rotate((p.rot * Math.PI) / 180);
        vCtx.fillStyle = p.color;
        vCtx.beginPath();
        vCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        vCtx.fill();
        vCtx.restore();
      });
      requestAnimationFrame(animVPetals);
    }
    requestAnimationFrame(animVPetals);

    window.addEventListener('resize', () => {
      vW = vPetalCanvas.width = window.innerWidth;
      vH = vPetalCanvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // CUPID ARCHERY INTERACTIVE LOGIC
  // =========================================================================
  const valTargetHeart = container.querySelector('#valTargetHeart');
  const valBowRig = container.querySelector('#valBowRig');
  const valArrow = container.querySelector('#valArrow');
  const btnValDirectShoot = container.querySelector('#btnValDirectShoot');
  let valShot = false;

  function executeValShot() {
    if (valShot) return;
    valShot = true;
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]);

    gsap.to(valArrow, {
      y: -120,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        valTargetHeart.style.transform = 'scale(1.4)';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.45 },
          colors: ['#e11d48', '#f43f5e', '#ffd700']
        });
        setTimeout(() => {
          goToPage(2);
        }, 700);
      }
    });
  }

  valBowRig?.addEventListener('click', executeValShot);
  btnValDirectShoot?.addEventListener('click', executeValShot);

  // =========================================================================
  // RUNAWAY "NO" BUTTON WITH SMOOTH SPRING PHYSICS
  // =========================================================================
  const btnNo = container.querySelector('#btnProposalNo');
  const proposalCard = container.querySelector('#valProposalCard');

  const funnyNoPrompts = [
    "No 🙈",
    "Are you sure? 🥺",
    "Try again! 😜",
    "Wrong button! 💘",
    "Nice try! 😂",
    "You can't say no! 💍"
  ];
  let noCount = 0;

  function dodgeButton() {
    if (!btnNo || !proposalCard) return;
    noCount++;
    btnNo.textContent = funnyNoPrompts[noCount % funnyNoPrompts.length];
    if (navigator.vibrate) navigator.vibrate(15);

    const cardRect = proposalCard.getBoundingClientRect();
    const maxX = Math.max(20, cardRect.width - 120);
    const maxY = Math.max(20, cardRect.height - 100);

    const randX = Math.random() * (maxX - 40) + 20;
    const randY = Math.random() * (maxY - 40) + 20;

    gsap.to(btnNo, {
      left: `${randX}px`,
      top: `${randY}px`,
      duration: 0.22,
      ease: 'back.out(1.7)'
    });
  }

  btnNo?.addEventListener('mouseenter', dodgeButton);
  btnNo?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
  });

  // =========================================================================
  // GRAND PROPOSAL ACCEPTANCE & FIREWORKS CANVAS DISPLAY
  // =========================================================================
  const btnYes = container.querySelector('#btnProposalYes');
  const banner = container.querySelector('#valAcceptedBanner');
  const fwCanvas = container.querySelector('#valFireworksCanvas');

  btnYes?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([40, 50, 60, 70]);
    if (banner) banner.style.display = 'block';
    if (btnNo) btnNo.style.display = 'none';
    btnYes.style.display = 'none';

    // Massive confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#f43f5e', '#ffd700', '#ec4899', '#ffffff']
    });

    // Fireworks Canvas loop
    if (fwCanvas) {
      const fCtx = fwCanvas.getContext('2d');
      let fwW = (fwCanvas.width = window.innerWidth);
      let fwH = (fwCanvas.height = window.innerHeight);

      const fwParticles = [];
      function createFirework(x, y) {
        const count = 45;
        const color = ['#e11d48', '#f43f5e', '#ffd700', '#ec4899', '#ffffff'][Math.floor(Math.random() * 5)];
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = Math.random() * 5 + 2;
          fwParticles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color,
            r: Math.random() * 3 + 2
          });
        }
      }

      for (let r = 0; r < 6; r++) {
        setTimeout(() => {
          createFirework(fwW * (0.2 + r * 0.12), fwH * (0.3 + (r % 3) * 0.1));
          confetti({
            particleCount: 50,
            angle: 60 + r * 20,
            spread: 55,
            origin: { x: 0.2 + r * 0.12, y: 0.5 }
          });
        }, r * 350);
      }

      function animFireworks() {
        fCtx.clearRect(0, 0, fwW, fwH);
        let alive = false;
        for (const p of fwParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity
          p.alpha -= 0.015;
          if (p.alpha > 0) {
            alive = true;
            fCtx.save();
            fCtx.globalAlpha = p.alpha;
            fCtx.fillStyle = p.color;
            fCtx.beginPath();
            fCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            fCtx.fill();
            fCtx.restore();
          }
        }
        if (alive) requestAnimationFrame(animFireworks);
      }
      requestAnimationFrame(animFireworks);
    }
  });

  // =========================================================================
  // WAX SEAL ENVELOPE MODAL
  // =========================================================================
  const waxBtn = container.querySelector('#valWaxSeal');
  const modal = container.querySelector('#valLetterModal');
  const closeModal = container.querySelector('#btnCloseValLetter');
  const heartburstBtn = container.querySelector('#btnValHeartBurst');

  waxBtn?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(20);
    modal.classList.add('visible');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  });

  closeModal?.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  heartburstBtn?.addEventListener('click', () => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#f43f5e', '#fb7185', '#ffd700'] });
  });

  // =========================================================================
  // MULTI-PAGE STORYBOOK CONTROLLER
  // =========================================================================
  const pages = container.querySelectorAll('.val-page-card');
  const progressFill = container.querySelector('#valStepProgressFill');
  const stageStepPill = container.querySelector('#valStageStepPill');
  const stageTitleText = container.querySelector('#valStageTitleText');

  const STAGE_TITLES = {
    1: "Cupid's Sacred Arrow 🏹",
    2: "A Secret Confession 💌",
    3: "Why I Fell For You 📸",
    4: "Will You Be Mine? 💍",
    5: "Eternal Soulmate Award 👑"
  };

  function goToPage(pageNum) {
    const p = Math.max(1, Math.min(5, pageNum));
    pages.forEach(page => {
      page.classList.toggle('active', parseInt(page.getAttribute('data-page'), 10) === p);
    });

    if (progressFill) progressFill.style.width = `${(p / 5) * 100}%`;
    if (stageStepPill) stageStepPill.textContent = `PAGE ${p} OF 5`;
    if (stageTitleText) stageTitleText.textContent = STAGE_TITLES[p] || "Valentine Story";

    if (navigator.vibrate) navigator.vibrate(12);
    if (!window.isCelebrationEditorMode) { window.scrollTo({ top: 0, behavior: 'smooth' }); } else if (container) { container.scrollTop = 0; }
  }

  container.querySelectorAll('.btn-val-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'), 10);
      goToPage(next);
    });
  });

  container.querySelectorAll('.btn-val-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'), 10);
      goToPage(prev);
    });
  });

  container.querySelector('#btnValReplay')?.addEventListener('click', () => {
    goToPage(1);
  });

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.val-polaroid-img-frame img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.val-polaroid-card');
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
        link.download = `valentine-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff4d6d', '#f43f5e', '#ffd700', '#ffffff']
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
