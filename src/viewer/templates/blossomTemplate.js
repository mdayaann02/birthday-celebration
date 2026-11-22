// src/viewer/templates/blossomTemplate.js - The Flagship Long Romance Website
// Combines: Cupid Archery + Procedural Blossom Tree + Blossom Romance (Viral Reel) +
// Polaroid Flipbook + Burn-to-Reveal Love Letter + Twilight Wishing Lanterns.
// Ultra-smooth 60fps animations, continuous long-scroll storybook, and sticky mini vinyl CD player.

import gsap from 'gsap';
import confetti from 'canvas-confetti';

export function renderBlossomTemplate(container, initialData = {}, isMakerReview = false) {
  // Normalize data with romantic fallbacks
  const data = initialData || {};
  const recipient = data.recipientName || 'My Love';

  const polaroids = data.polaroids && data.polaroids.length > 0 ? data.polaroids : [
    { image: '/images/sunset.jpg', caption: 'Our favourite sunset walk 🌅', note: 'I knew then you were the one.' },
    { image: '/images/always_you.jpg', caption: 'Always laughing with you 🫶', note: 'Your laugh is my favourite melody.' },
    { image: '/images/pretty.jpg', caption: 'Your breathtaking smile ✨', note: 'You light up every room you enter.' },
    { image: '/images/dream_girl.jpg', caption: 'Adventures of a lifetime 💫', note: 'Every step with you is paradise.' },
    { image: '/images/queen.jpg', caption: 'Forever my queen 👑', note: 'My heart belongs to you completely.' }
  ];

  const loveNotesList = data.loveNotes && data.loveNotes.length > 0 ? data.loveNotes : [
    "You are the prettiest sight in my entire universe 🌸",
    "Every moment with you feels like pure, effortless magic ✨",
    "Your smile is my absolute favourite thing in this world 🥰",
    "I fall in love with you all over again every single day 💖",
    "Thank you for being my constant happy place and home 🫶",
    "Here is to a lifetime of love and unforgettable memories 🥂"
  ];

  const reasonsList = data.reasons && data.reasons.length > 0 ? data.reasons : [
    "The way your eyes sparkle whenever you laugh wholeheartedly",
    "How you make every single ordinary day feel like home",
    "Your endless kindness and the purest, most compassionate heart",
    "How we can talk for hours about absolutely everything and nothing"
  ];

  const letterBody = data.letterText || `My Dearest ${recipient},

From the very first day you walked into my world, you brought soft colors, warmth, and a quiet joy I never knew existed. Watching you smile, hearing your voice, and growing beside you has been the greatest gift of my life.

Thank you for choosing me, for believing in us, and for making every sunrise brighter. No matter where life takes us, my hand will always be reaching for yours.

I love you endlessly, today, tomorrow, and through all our years to come. ♡`;

  // Main Long Website Container HTML
  container.innerHTML = `
    <div class="long-romance-page" id="longRomancePage">
      <!-- Dynamic Floating Ambient Petals Background Canvas -->
      <canvas id="ambientPetalsCanvas" class="ambient-petals-canvas"></canvas>

      <!-- Sticky Top Chapter Progress Dock -->
      <nav class="romance-nav-dock" id="romanceNavDock" aria-label="Story Chapters">
        <div class="romance-dock-progress" id="dockProgressBar"></div>
        <div class="romance-dock-chips">
          <button type="button" class="dock-chip active" data-target="#chapterBlossom">🌸 <span>Blossom</span></button>
          <button type="button" class="dock-chip" data-target="#chapterCupid">🏹 <span>Cupid</span></button>
          <button type="button" class="dock-chip" data-target="#chapterTree">🌳 <span>Tree</span></button>
          <button type="button" class="dock-chip" data-target="#chapterMemories">📸 <span>Memories</span></button>
          <button type="button" class="dock-chip" data-target="#chapterBurn">💌 <span>Letter</span></button>
          <button type="button" class="dock-chip" data-target="#chapterLanterns">🏮 <span>Lanterns</span></button>
        </div>
      </nav>

      <!-- Corner Mini Spinning Vinyl CD Player -->
      <div class="corner-mini-cd-player" id="romanceMusicToggle" role="button" aria-label="Toggle Romantic Music" title="Tap to Play / Pause Music">
        <div class="mini-cd-disc" id="romanceMiniCd">
          <div class="cd-groove-rings"></div>
          <div class="cd-holo-sheen"></div>
          <div class="cd-center-sticker">
            <img src="${polaroids[0]?.image || '/images/sunset.jpg'}" class="cd-cover-art" alt="Cover" />
            <span class="cd-center-spindle"></span>
          </div>
        </div>
        <div class="cd-track-pill" id="romanceTrackPill">
          <div class="cd-pill-equalizer"><span></span><span></span><span></span></div>
          <span class="cd-pill-title">${data.audioTitle || "Romantic Theme"}</span>
        </div>
        <audio id="romanceAudio" loop preload="auto">
          <source src="${data.audioSrc || '/audio/alfaaz.mp3'}" type="audio/mpeg" />
        </audio>
      </div>

      <!-- ========================================================
           CHAPTER 1: THE VIRAL REEL BLOSSOM FLOWER
           ======================================================== -->
      <section class="romance-chapter chapter-blossom" id="chapterBlossom">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER I • THE SPARK</div>
          <h1 class="chapter-title cursive">${data.blossomTitle || 'Touch The Blossom'}</h1>
          <p class="chapter-sub">${data.blossomSubtitle || 'A secret love story made just for you'}</p>

          <!-- Interactive Blooming Flower -->
          <div class="viral-flower-stage">
            <div class="viral-flower-btn" id="viralFlowerBtn" role="button" tabindex="0" aria-label="Touch the blossom to open">
              <svg class="viral-flower-svg" viewBox="0 0 100 100" width="130" height="130">
                <defs>
                  <radialGradient id="vgSakura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fff5f8" stop-opacity="0.95"/>
                    <stop offset="45%" stop-color="#fbcfe8" stop-opacity="0.92"/>
                    <stop offset="85%" stop-color="#f43f5e" stop-opacity="0.88"/>
                    <stop offset="100%" stop-color="#be123c" stop-opacity="0.85"/>
                  </radialGradient>
                  <filter id="vgGlow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <g filter="url(#vgGlow)">
                  <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)"/>
                  <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(72 50 50)"/>
                  <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(144 50 50)"/>
                  <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(216 50 50)"/>
                  <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(288 50 50)"/>
                  <circle cx="50" cy="50" r="7.5" fill="#e11d48"/>
                  <circle cx="50" cy="50" r="3.5" fill="#fef08a"/>
                </g>
              </svg>
              <div class="viral-flower-glow-halo"></div>
            </div>
            <p class="viral-flower-hint">✦ Tap the blossom to bloom &amp; begin ✦</p>
          </div>
          <canvas id="blossomBurstCanvas" class="blossom-burst-canvas"></canvas>
        </div>
        <div class="scroll-down-indicator" data-target="#chapterCupid">
          <span>Scroll to Cupid</span>
          <span class="scroll-chevron">▾</span>
        </div>
      </section>

      <!-- ========================================================
           CHAPTER 2: CUPID'S RECURVE ARCHERY ARENA
           ======================================================== -->
      <section class="romance-chapter chapter-cupid" id="chapterCupid">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER II • CUPID'S ARROW</div>
          <h2 class="chapter-title cursive">${data.cupidPrompt || "Cupid's Sakura Shot 🏹"}</h2>
          <p class="chapter-sub">${data.cupidHint || "Pull back the recurve bow and strike my heart..."}</p>

          <div class="cupid-arena" id="cupidArena">
            <!-- Winged Ruby Target Heart -->
            <div class="target-heart-wrap" id="cupidTargetWrap">
              <div class="target-wings">
                <svg class="target-wing wing-l" viewBox="0 0 44 38">
                  <path d="M40 35 C20 30 4 20 6 8 C14 4 28 12 40 22 Z" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
                </svg>
                <svg class="target-wing wing-r" viewBox="0 0 44 38">
                  <path d="M4 35 C24 30 40 20 38 8 C30 4 16 12 4 22 Z" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
                </svg>
              </div>
              <div class="target-ruby-heart" id="cupidTargetHeart">
                <svg viewBox="0 0 100 92" width="76" height="70">
                  <defs>
                    <radialGradient id="targetGrad" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stop-color="#fff0f3" />
                      <stop offset="35%" stop-color="#ff4d6d" />
                      <stop offset="85%" stop-color="#be123c" />
                    </radialGradient>
                  </defs>
                  <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#targetGrad)" />
                </svg>
              </div>
            </div>

            <!-- Recurve Bow + Arrow Rig -->
            <div class="archery-rig" id="cupidArcheryRig">
              <div class="archery-aim-line" id="cupidAimLine"></div>

              <div class="archery-bow" id="cupidBowElem">
                <svg class="bow-svg" viewBox="0 0 460 260">
                  <defs>
                    <linearGradient id="bowWoodGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#881337" />
                      <stop offset="50%" stop-color="#f43f5e" />
                      <stop offset="100%" stop-color="#881337" />
                    </linearGradient>
                  </defs>
                  <path id="bowWoodPath" d="M34 96 C 118 168, 168 220, 230 230 C 292 220, 342 168, 426 96" fill="none" stroke="url(#bowWoodGrad)" stroke-width="12" stroke-linecap="round" />
                  <line id="bowStringL" x1="40" y1="80" x2="230" y2="90" stroke="#fb7185" stroke-width="2.5" />
                  <line id="bowStringR" x1="420" y1="80" x2="230" y2="90" stroke="#fb7185" stroke-width="2.5" />
                  <circle id="bowNock" cx="230" cy="90" r="5" fill="#f43f5e" />
                </svg>

                <div class="archery-arrow" id="cupidArrowElem">
                  <svg viewBox="0 0 40 160" width="100%" height="100%">
                    <defs>
                      <linearGradient id="arrowShaftGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="50%" stop-color="#f59e0b" />
                        <stop offset="100%" stop-color="#b45309" />
                      </linearGradient>
                    </defs>
                    <rect x="18" y="24" width="4" height="120" fill="url(#arrowShaftGold)" rx="2"/>
                    <path d="M20 8 C18 4 12 4 12 9 C12 13 16 16 20 20 C24 16 28 13 28 9 C28 4 22 4 20 8 Z" fill="#e11d48"/>
                    <path d="M20 125 L12 145 L20 140 L28 145 Z" fill="#fb7185"/>
                  </svg>
                </div>
              </div>

              <p class="archery-pull-hint">▼ PULL DOWN &amp; RELEASE TO SHOOT ▼</p>
              <button type="button" class="btn-quick-shoot-primary" id="btnCupidQuickShoot">
                🏹 Direct Cupid Strike 🎯
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-down-indicator" data-target="#chapterTree">
          <span>Continue to Blossom Tree</span>
          <span class="scroll-chevron">▾</span>
        </div>
      </section>

      <!-- ========================================================
           CHAPTER 3: PROCEDURAL LIVING BLOSSOM TREE
           ======================================================== -->
      <section class="romance-chapter chapter-tree" id="chapterTree">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER III • LIVING SAKURA TREE</div>
          <h2 class="chapter-title cursive">${data.treeTitle || "Our Blossom Tree"}</h2>
          <p class="chapter-sub">${data.treeSubtitle || "Watch love grow branch by branch • Touch canvas to guide the wind"}</p>

          <div class="tree-canvas-holder">
            <canvas id="livingTreeCanvas" class="living-tree-canvas"></canvas>
            <div class="tree-floating-love-bubble" id="treeLoveBubble" aria-hidden="true">
              <span id="treeLoveBubbleText">You are my whole universe 🌸</span>
            </div>
            <div class="tree-controls-bar">
              <button type="button" class="btn-tree-action" id="btnRegrowTree">🌱 Regrow Tree</button>
              <button type="button" class="btn-tree-action" id="btnPopLoveNote">💌 Pop Secret Note</button>
            </div>
          </div>
        </div>
        <div class="scroll-down-indicator" data-target="#chapterMemories">
          <span>Open Memories Scrapbook</span>
          <span class="scroll-chevron">▾</span>
        </div>
      </section>

      <!-- ========================================================
           CHAPTER 4: 3D POLAROID MEMORIES SCRAPBOOK
           ======================================================== -->
      <section class="romance-chapter chapter-memories" id="chapterMemories">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER IV • TREASURED MEMORIES</div>
          <h2 class="chapter-title cursive">${data.memoriesTitle || "Our Story in Polaroids"}</h2>
          <p class="chapter-sub">Touch any memory to reveal its secret handwritten note</p>

          <div class="polaroid-cards-row">
            ${polaroids.map((p, i) => `
              <div class="romance-polaroid-card" data-idx="${i}">
                <div class="polaroid-pin">📍</div>
                <div class="polaroid-photo-frame">
                  <img src="${p.image || '/images/sunset.jpg'}" alt="Memory" loading="lazy" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <p class="polaroid-caption">${p.caption || 'Our favourite moment 💖'}</p>
                <div class="polaroid-secret-note">${p.note || 'Every moment with you is golden.'}</div>
              </div>
            `).join('')}
          </div>

          <!-- Reasons Wall & Compliment Shuffler -->
          <div class="romance-reasons-block">
            <h3 class="reasons-heading">A Few Reasons Why I Love You</h3>
            <div class="reasons-grid">
              ${reasonsList.map(r => `
                <div class="reason-note-pill">
                  <span class="reason-spark">✨</span>
                  <span>${r}</span>
                </div>
              `).join('')}
            </div>

            <div class="compliment-shuffle-box" id="complimentBox">
              <p class="compliment-text" id="complimentText">${loveNotesList[0]}</p>
              <button type="button" class="btn-shuffle-compliment" id="btnShuffleLoveNote">
                🔀 Read Another Note
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-down-indicator" data-target="#chapterBurn">
          <span>Read My Letter</span>
          <span class="scroll-chevron">▾</span>
        </div>
      </section>

      <!-- ========================================================
           CHAPTER 5: INTERACTIVE BURN-TO-REVEAL WAX PARCHMENT LETTER
           ======================================================== -->
      <section class="romance-chapter chapter-burn" id="chapterBurn">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER V • THE SACRED LETTER</div>
          <h2 class="chapter-title cursive">${data.burnTitle || "Burn To Reveal"}</h2>
          <p class="chapter-sub">Strike the golden match to burn away the parchment seal</p>

          <div class="burn-letter-container">
            <!-- Golden Match Trigger -->
            <div class="match-strike-box" id="matchStrikeBox">
              <div class="matchstick-icon" id="matchstickIcon">🕯️</div>
              <button type="button" class="btn-strike-match" id="btnStrikeMatch">
                🔥 Strike Match &amp; Burn Seal
              </button>
            </div>

            <!-- Burning Letter Canvas Overlay -->
            <div class="burn-parchment-card" id="burnParchmentCard">
              <canvas id="burnOverlayCanvas" class="burn-overlay-canvas"></canvas>
              <div class="parchment-letter-inner">
                <div class="parchment-wax-seal">
                  <div class="wax-seal-crest">💌</div>
                </div>
                <div class="parchment-body-text">
                  ${letterBody.replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />')}
                </div>
                <div class="parchment-signature">
                  Forever Yours,<br />
                  <span>${data.senderName || 'Your Love'} ♡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-down-indicator" data-target="#chapterLanterns">
          <span>Release Twilight Lanterns</span>
          <span class="scroll-chevron">▾</span>
        </div>
      </section>

      <!-- ========================================================
           CHAPTER 6: TWILIGHT WISHING LANTERNS & CONFESSION
           ======================================================== -->
      <section class="romance-chapter chapter-lanterns" id="chapterLanterns">
        <div class="chapter-content-wrap">
          <div class="chapter-badge">CHAPTER VI • ETERNITY</div>
          <h2 class="chapter-title cursive">${data.lanternTitle || "Make A Wish Into Twilight"}</h2>
          <p class="chapter-sub">Release glowing lanterns into the sky with our love proclamation</p>

          <div class="lantern-sky-stage" id="lanternSkyStage">
            <div class="twilight-stars-field" id="twilightStarsField"></div>
            <div class="floating-lantern-field" id="floatingLanternField"></div>

            <div class="grand-confession-card">
              <div class="confession-heart-icon">💖</div>
              <h3 class="confession-heading">Happy Birthday, ${recipient}!</h3>
              <p class="confession-text">
                May your life be as radiant, blooming, and unforgettable as the love you give so generously every single day.
              </p>
              <button type="button" class="btn-release-lantern-primary" id="btnReleaseMoreLanterns">
                🏮 Release More Wishing Lanterns
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // =========================================================================
  // AUDIO & CD PLAYER CONTROLS
  // =========================================================================
  const audioEl = container.querySelector('#romanceAudio');
  const musicToggle = container.querySelector('#romanceMusicToggle');
  const miniCd = container.querySelector('#romanceMiniCd');
  const trackPill = container.querySelector('#romanceTrackPill');
  let isPlaying = false;

  function toggleAudio() {
    if (window.isCelebrationEditorMode) return;
    if (isPlaying) {
      audioEl.pause();
      isPlaying = false;
      miniCd.classList.remove('spinning');
      trackPill.classList.remove('playing');
    } else {
      audioEl.play().then(() => {
        isPlaying = true;
        miniCd.classList.add('spinning');
        trackPill.classList.add('playing');
      }).catch(() => {});
    }
  }

  musicToggle?.addEventListener('click', toggleAudio);

  function startAutoplayAudio() {
    if (window.isCelebrationEditorMode) return;
    if (!isPlaying) {
      audioEl.play().then(() => {
        isPlaying = true;
        miniCd.classList.add('spinning');
        trackPill.classList.add('playing');
      }).catch(() => {});
    }
  }

  // =========================================================================
  // CHAPTER NAVIGATION DOCK & PROGRESS TRACKER
  // =========================================================================
  const navDock = container.querySelector('#romanceNavDock');
  const dockProgress = container.querySelector('#dockProgressBar');
  const dockChips = container.querySelectorAll('.dock-chip');
  const scrollIndicators = container.querySelectorAll('.scroll-down-indicator');

  dockChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(12);
      const targetId = chip.getAttribute('data-target');
      const targetElem = container.querySelector(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  scrollIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const targetId = ind.getAttribute('data-target');
      const targetElem = container.querySelector(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll listener for progress bar and active chips
  const pageWrap = container.querySelector('#longRomancePage');
  const chapters = container.querySelectorAll('.romance-chapter');

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (dockProgress) dockProgress.style.width = `${progress}%`;

    // Highlight active chapter
    chapters.forEach(ch => {
      const rect = ch.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.3) {
        const id = '#' + ch.id;
        dockChips.forEach(chip => {
          chip.classList.toggle('active', chip.getAttribute('data-target') === id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // =========================================================================
  // AMBIENT SAKURA PETALS BACKGROUND CANVAS (60FPS FLUID PHYSICS)
  // =========================================================================
  const bgCanvas = container.querySelector('#ambientPetalsCanvas');
  if (bgCanvas) {
    const bgCtx = bgCanvas.getContext('2d');
    let bgW = (bgCanvas.width = window.innerWidth);
    let bgH = (bgCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      bgW = bgCanvas.width = window.innerWidth;
      bgH = bgCanvas.height = window.innerHeight;
    });

    const ambientPetals = [];
    for (let i = 0; i < 35; i++) {
      ambientPetals.push({
        x: Math.random() * bgW,
        y: Math.random() * bgH,
        size: Math.random() * 8 + 6,
        vx: Math.random() * 1.2 - 0.6,
        vy: Math.random() * 1.5 + 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    function renderAmbientPetals() {
      bgCtx.clearRect(0, 0, bgW, bgH);
      for (let p of ambientPetals) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y > bgH + 20) { p.y = -20; p.x = Math.random() * bgW; }
        if (p.x > bgW + 20) p.x = -20;
        if (p.x < -20) p.x = bgW + 20;

        bgCtx.save();
        bgCtx.translate(p.x, p.y);
        bgCtx.rotate(p.rot);
        bgCtx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`;
        bgCtx.beginPath();
        bgCtx.moveTo(0, 0);
        bgCtx.bezierCurveTo(-p.size * 0.5, -p.size * 0.8, -p.size, p.size * 0.5, 0, p.size);
        bgCtx.bezierCurveTo(p.size, p.size * 0.5, p.size * 0.5, -p.size * 0.8, 0, 0);
        bgCtx.fill();
        bgCtx.restore();
      }
      requestAnimationFrame(renderAmbientPetals);
    }
    requestAnimationFrame(renderAmbientPetals);
  }

  // =========================================================================
  // CHAPTER 1: VIRAL SAKURA FLOWER BURST
  // =========================================================================
  const viralFlowerBtn = container.querySelector('#viralFlowerBtn');
  const burstCanvas = container.querySelector('#blossomBurstCanvas');
  let flowerBloomed = false;

  viralFlowerBtn?.addEventListener('click', () => {
    if (flowerBloomed) return;
    flowerBloomed = true;
    startAutoplayAudio();
    if (navigator.vibrate) navigator.vibrate([30, 40]);

    viralFlowerBtn.classList.add('bloomed');

    // Canvas explosion
    if (burstCanvas) {
      const bCtx = burstCanvas.getContext('2d');
      const bW = (burstCanvas.width = burstCanvas.clientWidth || 360);
      const bH = (burstCanvas.height = burstCanvas.clientHeight || 360);
      burstCanvas.style.opacity = '1';

      const burstPetals = [];
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        burstPetals.push({
          x: bW / 2,
          y: bH / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 10 + 6,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: ['#f43f5e', '#ec4899', '#fda4af', '#fbcfe8'][Math.floor(Math.random() * 4)]
        });
      }

      function renderBurst() {
        bCtx.clearRect(0, 0, bW, bH);
        let anyAlive = false;
        for (let p of burstPetals) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;
          p.alpha -= p.decay;
          if (p.alpha > 0) {
            anyAlive = true;
            bCtx.save();
            bCtx.globalAlpha = p.alpha;
            bCtx.translate(p.x, p.y);
            bCtx.rotate(p.rot);
            bCtx.fillStyle = p.color;
            bCtx.beginPath();
            bCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            bCtx.fill();
            bCtx.restore();
          }
        }
        if (anyAlive) requestAnimationFrame(renderBurst);
      }
      requestAnimationFrame(renderBurst);
    }

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
    });

    // Smooth scroll down to Cupid after bloom
    setTimeout(() => {
      container.querySelector('#chapterCupid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 900);
  });

  // =========================================================================
  // CHAPTER 2: CUPID'S RECURVE ARCHERY GAME (SMOOTH DRAG & RELEASE)
  // =========================================================================
  const cupidArena = container.querySelector('#cupidArena');
  const cupidTargetWrap = container.querySelector('#cupidTargetWrap');
  const cupidTargetHeart = container.querySelector('#cupidTargetHeart');
  const cupidBowElem = container.querySelector('#cupidBowElem');
  const cupidArrowElem = container.querySelector('#cupidArrowElem');
  const bowWoodPath = container.querySelector('#bowWoodPath');
  const bowStrL = container.querySelector('#bowStringL');
  const bowStrR = container.querySelector('#bowStringR');
  const bowNock = container.querySelector('#bowNock');
  const btnQuickShoot = container.querySelector('#btnCupidQuickShoot');

  let isAiming = false;
  let hasShotArrow = false;
  let startTouchY = 0;
  let currentPull = 0;
  const maxPull = 90;

  function setBowTension(pull) {
    const p = Math.max(0, Math.min(pull, maxPull));
    const bend = p * 0.35;
    if (bowWoodPath) {
      bowWoodPath.setAttribute('d', `M34 ${96 - bend * 0.3} C 118 ${168 - bend}, 168 ${220 + bend * 0.5}, 230 ${230 + bend} C 292 ${220 + bend * 0.5}, 342 ${168 - bend}, 426 ${96 - bend * 0.3}`);
    }
    const nockY = 90 + p;
    if (bowStrL) bowStrL.setAttribute('y2', `${nockY}`);
    if (bowStrR) bowStrR.setAttribute('y2', `${nockY}`);
    if (bowNock) bowNock.setAttribute('cy', `${nockY}`);
    if (cupidArrowElem) cupidArrowElem.style.transform = `translate(-50%, ${p}px)`;
  }

  function launchArrow() {
    if (hasShotArrow) return;
    hasShotArrow = true;
    startAutoplayAudio();
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]);

    // Animate arrow flight up towards target heart
    gsap.to(cupidArrowElem, {
      y: -window.innerHeight * 0.45,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        // Heart strike impact
        cupidTargetHeart.classList.add('heart-struck');
        cupidTargetWrap.classList.add('heart-burst');

        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.35 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700']
        });

        // Smooth glide to Chapter 3: Living Blossom Tree
        setTimeout(() => {
          container.querySelector('#chapterTree')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 850);
      }
    });

    // Reset bowstring snap
    gsap.to({ p: currentPull }, {
      p: 0,
      duration: 0.15,
      ease: 'elastic.out(1, 0.3)',
      onUpdate: function() {
        setBowTension(this.targets()[0].p);
      }
    });
  }

  // Pointer drag listeners for bow pull
  cupidBowElem?.addEventListener('pointerdown', (e) => {
    if (hasShotArrow) return;
    isAiming = true;
    startTouchY = e.clientY;
    cupidBowElem.setPointerCapture(e.pointerId);
  });

  cupidBowElem?.addEventListener('pointermove', (e) => {
    if (!isAiming || hasShotArrow) return;
    const dy = e.clientY - startTouchY;
    if (dy > 0) {
      currentPull = Math.min(dy * 0.85, maxPull);
      setBowTension(currentPull);
    }
  });

  const endDrag = () => {
    if (!isAiming || hasShotArrow) return;
    isAiming = false;
    if (currentPull > 30) {
      launchArrow();
    } else {
      gsap.to({ p: currentPull }, {
        p: 0,
        duration: 0.2,
        ease: 'power2.out',
        onUpdate: function() { setBowTension(this.targets()[0].p); }
      });
    }
  };

  cupidBowElem?.addEventListener('pointerup', endDrag);
  cupidBowElem?.addEventListener('pointercancel', endDrag);
  btnQuickShoot?.addEventListener('click', launchArrow);

  // =========================================================================
  // CHAPTER 3: LIVING PROCEDURAL SAKURA TREE ON CANVAS
  // =========================================================================
  const treeCanvas = container.querySelector('#livingTreeCanvas');
  const loveBubble = container.querySelector('#treeLoveBubble');
  const loveBubbleText = container.querySelector('#treeLoveBubbleText');
  const btnRegrowTree = container.querySelector('#btnRegrowTree');
  const btnPopLoveNote = container.querySelector('#btnPopLoveNote');

  let treeRAF = null;
  let treeBranches = [];
  let treePetals = [];
  let treeGrowthProgress = 0;

  function initLivingTree() {
    if (!treeCanvas) return;
    const tCtx = treeCanvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (treeCanvas.width = (treeCanvas.clientWidth || 360) * dpr);
    const h = (treeCanvas.height = (treeCanvas.clientHeight || 420) * dpr);
    tCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const actualW = w / dpr;
    const actualH = h / dpr;

    treeBranches = [];
    treePetals = [];
    treeGrowthProgress = 0;

    // Generate procedural tree branch structure
    function buildBranch(startX, startY, length, angle, depth) {
      if (depth === 0) {
        // Add blossom petals at branch ends in heart canopy
        const count = Math.floor(Math.random() * 4 + 3);
        for (let i = 0; i < count; i++) {
          treePetals.push({
            x: startX + (Math.random() - 0.5) * 16,
            y: startY + (Math.random() - 0.5) * 16,
            size: Math.random() * 6 + 4,
            color: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fff0f3'][Math.floor(Math.random() * 5)],
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            falling: false,
            vx: 0,
            vy: 0
          });
        }
        return;
      }

      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      treeBranches.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        width: depth * 1.8,
        depth: depth
      });

      const branchAngleA = angle - (Math.random() * 0.4 + 0.25);
      const branchAngleB = angle + (Math.random() * 0.4 + 0.25);
      const nextLen = length * (Math.random() * 0.15 + 0.72);

      buildBranch(endX, endY, nextLen, branchAngleA, depth - 1);
      buildBranch(endX, endY, nextLen, branchAngleB, depth - 1);
    }

    const trunkX = actualW / 2;
    const trunkY = actualH - 20;
    buildBranch(trunkX, trunkY, actualH * 0.24, -Math.PI / 2, 6);

    // Tree animation loop
    function renderTreeFrame() {
      tCtx.clearRect(0, 0, actualW, actualH);

      // Draw growing branches
      tCtx.lineCap = 'round';
      tCtx.strokeStyle = '#5a3822';
      const visibleCount = Math.floor(treeBranches.length * Math.min(1, treeGrowthProgress));

      for (let i = 0; i < visibleCount; i++) {
        const b = treeBranches[i];
        tCtx.lineWidth = b.width;
        tCtx.beginPath();
        tCtx.moveTo(b.x1, b.y1);
        tCtx.lineTo(b.x2, b.y2);
        tCtx.stroke();
      }

      // Draw blooming petals if tree is grown enough
      if (treeGrowthProgress > 0.45) {
        const petalAlpha = Math.min(1, (treeGrowthProgress - 0.45) / 0.55);
        tCtx.save();
        tCtx.globalAlpha = petalAlpha;

        for (let p of treePetals) {
          if (p.falling) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.rotSpeed;
            if (p.y > actualH + 10) { p.y = -10; p.x = Math.random() * actualW; }
          }
          tCtx.save();
          tCtx.translate(p.x, p.y);
          tCtx.rotate(p.rot);
          tCtx.fillStyle = p.color;
          tCtx.beginPath();
          tCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          tCtx.fill();
          tCtx.restore();
        }
        tCtx.restore();
      }

      if (treeGrowthProgress < 1) {
        treeGrowthProgress += 0.015;
      }

      treeRAF = requestAnimationFrame(renderTreeFrame);
    }

    if (treeRAF) cancelAnimationFrame(treeRAF);
    treeRAF = requestAnimationFrame(renderTreeFrame);
  }

  initLivingTree();
  btnRegrowTree?.addEventListener('click', initLivingTree);

  // Pop love note bubble on tree
  let currentNoteIdx = 0;
  function showNextLoveNote() {
    currentNoteIdx = (currentNoteIdx + 1) % loveNotesList.length;
    if (loveBubble && loveBubbleText) {
      loveBubbleText.textContent = loveNotesList[currentNoteIdx];
      loveBubble.classList.add('visible');
      if (navigator.vibrate) navigator.vibrate(15);
      setTimeout(() => {
        loveBubble.classList.remove('visible');
      }, 4200);
    }
  }

  btnPopLoveNote?.addEventListener('click', showNextLoveNote);
  treeCanvas?.addEventListener('click', showNextLoveNote);

  // =========================================================================
  // CHAPTER 4: POLAROID MEMORIES FLIP & SHUFFLE
  // =========================================================================
  const polaroidCards = container.querySelectorAll('.romance-polaroid-card');
  polaroidCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (navigator.vibrate) navigator.vibrate(12);
    });
  });

  const btnShuffle = container.querySelector('#btnShuffleLoveNote');
  const compText = container.querySelector('#complimentText');
  let compIdx = 0;

  btnShuffle?.addEventListener('click', () => {
    compIdx = (compIdx + 1) % loveNotesList.length;
    if (compText) {
      gsap.to(compText, {
        opacity: 0,
        y: -6,
        duration: 0.15,
        onComplete: () => {
          compText.textContent = loveNotesList[compIdx];
          gsap.to(compText, { opacity: 1, y: 0, duration: 0.2 });
        }
      });
    }
  });

  // =========================================================================
  // CHAPTER 5: INTERACTIVE BURN-TO-REVEAL WAX PARCHMENT LETTER
  // =========================================================================
  const btnStrikeMatch = container.querySelector('#btnStrikeMatch');
  const matchstickIcon = container.querySelector('#matchstickIcon');
  const burnCard = container.querySelector('#burnParchmentCard');
  const burnCanvas = container.querySelector('#burnOverlayCanvas');
  let hasBurned = false;

  btnStrikeMatch?.addEventListener('click', () => {
    if (hasBurned) return;
    hasBurned = true;
    startAutoplayAudio();
    if (navigator.vibrate) navigator.vibrate([40, 50, 60]);

    if (matchstickIcon) matchstickIcon.classList.add('lit');
    if (burnCard) burnCard.classList.add('burning');

    // Ember canvas animation
    if (burnCanvas) {
      const bCtx = burnCanvas.getContext('2d');
      const bw = (burnCanvas.width = burnCanvas.clientWidth || 320);
      const bh = (burnCanvas.height = burnCanvas.clientHeight || 450);
      burnCanvas.style.opacity = '1';

      const embers = [];
      for (let i = 0; i < 45; i++) {
        embers.push({
          x: bw / 2 + (Math.random() - 0.5) * 80,
          y: bh / 2 + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 4 - 2,
          size: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: ['#f59e0b', '#ef4444', '#fbbf24', '#ff7849'][Math.floor(Math.random() * 4)]
        });
      }

      function renderEmbers() {
        bCtx.clearRect(0, 0, bw, bh);
        let alive = false;
        for (let em of embers) {
          em.x += em.vx;
          em.y += em.vy;
          em.alpha -= em.decay;
          if (em.alpha > 0) {
            alive = true;
            bCtx.save();
            bCtx.globalAlpha = em.alpha;
            bCtx.fillStyle = em.color;
            bCtx.beginPath();
            bCtx.arc(em.x, em.y, em.size, 0, Math.PI * 2);
            bCtx.fill();
            bCtx.restore();
          }
        }
        if (alive) requestAnimationFrame(renderEmbers);
      }
      requestAnimationFrame(renderEmbers);
    }

    // Reveal parchment letter
    setTimeout(() => {
      if (burnCard) burnCard.classList.add('revealed');
    }, 600);
  });

  // =========================================================================
  // CHAPTER 6: FLOATING TWILIGHT WISHING LANTERNS
  // =========================================================================
  const lanternField = container.querySelector('#floatingLanternField');
  const btnMoreLanterns = container.querySelector('#btnReleaseMoreLanterns');

  function spawnLantern() {
    if (!lanternField) return;
    const l = document.createElement('div');
    l.className = 'twilight-lantern';
    const startX = Math.random() * 85 + 5;
    const duration = Math.random() * 6 + 7;
    const scale = Math.random() * 0.4 + 0.8;

    l.style.left = `${startX}%`;
    l.style.transform = `scale(${scale})`;
    l.style.animationDuration = `${duration}s`;
    l.innerHTML = `
      <div class="lantern-paper">
        <span class="lantern-heart">♡</span>
      </div>
      <div class="lantern-flame"></div>
    `;

    lanternField.appendChild(l);
    setTimeout(() => {
      if (typeof l?.remove === 'function') l.remove();
    }, duration * 1000);
  }

  // Initial peaceful lanterns
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnLantern, i * 1100);
  }

  btnMoreLanterns?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(25);
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnLantern, i * 250);
    }
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#ff69b4', '#ff1493', '#fff0f5']
    });
  });
}
