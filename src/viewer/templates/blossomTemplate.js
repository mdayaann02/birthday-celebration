// src/viewer/templates/blossomTemplate.js - The Flagship Multi-Page Long Romance Masterpiece
// 6 Distinct Chapters: 1.The Spark (Viral Bloom) | 2.Cupid's Archery | 3.Living Blossom Tree |
// 4.Realistic 3D Memory Flipbook | 5.Burn-To-Reveal Letter | 6.Twilight Sky Lanterns Finale
// 100% Mobile & Desktop Compatible, 60fps physics, and sleek spinning mini vinyl CD player.

import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBlossomTemplate(container, initialData = {}, isMakerReview = false) {
  const data = initialData || {};
  const recipient = data.recipientName || 'My Love';
  const sender = data.senderName || 'Yours Truly';

  const polaroids = data.polaroids && data.polaroids.length > 0 ? data.polaroids : [
    { image: '/images/sunset.jpg', caption: 'Our favourite sunset walk 🌅', note: 'I knew then you were the one I want forever.' },
    { image: '/images/always_you.jpg', caption: 'Always laughing with you 🫶', note: 'Your laugh is my absolute favourite melody in this world.' },
    { image: '/images/pretty.jpg', caption: 'Your breathtaking smile ✨', note: 'You light up every room you enter just by being you.' },
    { image: '/images/dream_girl.jpg', caption: 'Adventures of a lifetime 💫', note: 'Every single step by your side is paradise to me.' },
    { image: '/images/queen.jpg', caption: 'Forever my queen 👑', note: 'The kindest, most radiant soul. My heart is completely yours.' }
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

  const CHAPTER_TITLES = {
    1: "🌸 The Spark • Blossom Bloom",
    2: "🏹 Cupid's Archery & Heart",
    3: "🌳 Living Sakura Tree",
    4: "📖 3D Memory Flipbook",
    5: "🕯️ Burn-To-Reveal Letter",
    6: "🏮 Twilight Sky Lanterns"
  };

  container.innerHTML = `
    <div class="romance-story-page" id="romanceStoryPage">
      <!-- Dynamic Floating Ambient Petals Background Canvas -->
      <canvas id="ambientPetalsCanvas" class="ambient-petals-canvas"></canvas>

      <!-- Corner Mini Spinning Vinyl CD Player Slot -->
      <div id="romanceMusicSlot" style="position:fixed; top:12px; right:12px; z-index:999;"></div>

      <!-- Top Sticky Chapter Navigation Dock -->
      <nav class="romance-nav-dock" id="romanceNavDock" aria-label="Story Chapters">
        <div class="romance-dock-top">
          <span class="dock-step-pill" id="dockStepPill">PAGE 1 OF 6</span>
          <span class="dock-chapter-title" id="dockChapterTitle">🌸 The Spark • Blossom Bloom</span>
        </div>
        <div class="romance-progress-track">
          <div class="romance-progress-fill" id="dockProgressFill" style="width: 16.66%;"></div>
        </div>
        <div class="romance-dock-chips" id="dockChips">
          <button type="button" class="romance-chip-btn active" data-page="1">🌸 Bloom</button>
          <button type="button" class="romance-chip-btn" data-page="2">🏹 Cupid</button>
          <button type="button" class="romance-chip-btn" data-page="3">🌳 Tree</button>
          <button type="button" class="romance-chip-btn" data-page="4">📖 Flipbook</button>
          <button type="button" class="romance-chip-btn" data-page="5">💌 Letter</button>
          <button type="button" class="romance-chip-btn" data-page="6">🏮 Lanterns</button>
        </div>
      </nav>

      <!-- ========================================================
           PAGE 1: THE SPARK (VIRAL REEL BLOSSOM)
           ======================================================== -->
      <section class="romance-page-view active" data-page="1" id="pageBlossom">
        <span class="romance-page-badge">CHAPTER I • THE SPARK</span>
        <h1 class="romance-page-title">${data.heroTitle || `To My Beloved ${recipient} 🌸`}</h1>
        <p class="romance-page-sub">${data.heroSubtitle || 'Touch the secret blossom to begin our story...'}</p>

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
          <p class="viral-flower-hint" id="blossomHint">✦ Tap the blossom to bloom &amp; begin ✦</p>
          <canvas id="blossomBurstCanvas" class="blossom-burst-canvas"></canvas>
        </div>

        <div class="bloom-card-reveal" id="bloomCardReveal">
          <p style="font-size:15px; line-height:1.6; color:#881337; margin:0 0 10px; font-weight:600;">
            "Every love story is beautiful, but ours is my absolute favourite." ✨
          </p>
          <span style="font-size:12px; color:#a21caf; font-weight:700;">Ready to draw Cupid's bow? 🏹</span>
        </div>

        <div class="romance-nav-footer">
          <button type="button" class="btn-romance-next" data-next="2">
            Step into Cupid's Arena 🏹 &rarr;
          </button>
        </div>
      </section>

      <!-- ========================================================
           PAGE 2: CUPID'S RECURVE ARCHERY & BEATING HEART
           ======================================================== -->
      <section class="romance-page-view" data-page="2" id="pageCupid">
        <span class="romance-page-badge">CHAPTER II • CUPID'S ARROW</span>
        <h2 class="romance-page-title">${data.cupidPrompt || "Cupid's Sakura Shot 🏹"}</h2>
        <p class="romance-page-sub">${data.cupidHint || "Pull down the bowstring and release to strike my heart..."}</p>

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

        <div class="cupid-strike-banner" id="cupidStrikeBanner">
          💘 Bullseye! You captured my heart completely! ✨
        </div>

        <div class="romance-nav-footer">
          <button type="button" class="btn-romance-prev" data-prev="1">&larr; Back</button>
          <button type="button" class="btn-romance-next" data-next="3">
            Visit The Blossom Tree 🌳 &rarr;
          </button>
        </div>
      </section>

      <!-- ========================================================
           PAGE 3: PROCEDURAL LIVING BLOSSOM TREE
           ======================================================== -->
      <section class="romance-page-view" data-page="3" id="pageTree">
        <span class="romance-page-badge">CHAPTER III • LIVING SAKURA TREE</span>
        <h2 class="romance-page-title">${data.treeTitle || "Our Blossom Tree"}</h2>
        <p class="romance-page-sub">${data.treeSubtitle || "Watch our love grow branch by branch • Tap blossoms to reveal love notes"}</p>

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

        <div class="romance-nav-footer">
          <button type="button" class="btn-romance-prev" data-prev="2">&larr; Back</button>
          <button type="button" class="btn-romance-next" data-next="4">
            Open 3D Memory Flipbook 📖 &rarr;
          </button>
        </div>
      </section>

      <!-- ========================================================
           PAGE 4: REALISTIC 3D MEMORY FLIPBOOK
           ======================================================== -->
      <section class="romance-page-view" data-page="4" id="pageFlipbook">
        <span class="romance-page-badge">CHAPTER IV • MEMORY FLIPBOOK</span>
        <h2 class="romance-page-title">${data.memoriesTitle || "Treasured Memories"}</h2>
        <p class="romance-page-sub">A realistic 3D storybook of us • Tap the page to turn</p>

        <div class="realistic-flipbook-wrap">
          <div class="realistic-book" id="realisticBook">
            <div class="book-hardcover-back"></div>
            <div class="book-spine-crease"></div>

            <!-- Double-Sided 3D Leaves -->
            ${polaroids.map((p, i) => {
              const rot = ((i % 2 === 0 ? -1.5 : 1.5) * (1 + (i % 3) * 0.5)).toFixed(1);
              const noteText = p.note || loveNotesList[i % loveNotesList.length] || "Every moment by your side is a memory I treasure forever.";
              return `
                <div class="book-leaf" data-leaf="${i}" style="z-index: ${polaroids.length - i};">
                  <!-- Front: Polaroid Frame + Caption -->
                  <div class="leaf-face leaf-front">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:11px; font-weight:800; color:#d4235c; letter-spacing:0.1em;">OUR STORY</span>
                      <span style="font-size:11px; color:#8a6070; font-weight:700;">VOL. I</span>
                    </div>

                    <div class="book-polaroid-frame" style="--rot:${rot}deg;">
                      <div class="book-polaroid-img-wrap">
                        <img src="${p.image || '/images/sunset.jpg'}" class="book-polaroid-img" alt="Memory ${i+1}" onerror="this.src='/images/sunset.jpg'" />
                      </div>
                      <h4 class="book-polaroid-caption">${p.caption || 'Our favourite moment 💖'}</h4>
                    </div>

                    <div class="leaf-page-number">Page ${i * 2 + 1} of ${polaroids.length * 2}</div>
                  </div>

                  <!-- Back: Handwritten Heartfelt Note -->
                  <div class="leaf-face leaf-back">
                    <div class="book-note-header">
                      <span class="book-note-stamp">MEMORIES &amp; HEARTBEATS</span>
                      <span style="font-size:14px;">💌</span>
                    </div>
                    <div class="book-note-body">
                      "${noteText}"
                    </div>
                    <div class="book-note-footer">
                      Forever with you ♡
                    </div>
                    <div class="leaf-page-number" style="text-align:left;">Page ${i * 2 + 2} of ${polaroids.length * 2}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Flip Controls -->
          <div class="flipbook-controls-bar">
            <button type="button" class="btn-flip-book" id="btnFlipPrev" disabled>❮ Previous</button>
            <span class="flipbook-page-indicator" id="flipIndicator">Memory 1 of ${polaroids.length}</span>
            <button type="button" class="btn-flip-book" id="btnFlipNext">Next ❯</button>
          </div>
        </div>

        <div class="romance-nav-footer">
          <button type="button" class="btn-romance-prev" data-prev="3">&larr; Back</button>
          <button type="button" class="btn-romance-next" data-next="5">
            Unseal Love Letter 💌 &rarr;
          </button>
        </div>
      </section>

      <!-- ========================================================
           PAGE 5: WAX SEALED LOVE LETTER (BURN TO REVEAL)
           ======================================================== -->
      <section class="romance-page-view" data-page="5" id="pageLetter">
        <span class="romance-page-badge">CHAPTER V • THE SACRED LETTER</span>
        <h2 class="romance-page-title">${data.burnTitle || "Burn To Reveal"}</h2>
        <p class="romance-page-sub">Strike the golden match to burn away the wax seal...</p>

        <div class="burn-letter-stage">
          <div class="wax-envelope-card" id="waxEnvelopeCard">
            <!-- Sealed Wax Stamp State -->
            <div class="wax-seal-wrapper" id="waxSealWrapper">
              <div class="wax-seal-stamp" id="waxSealStamp">
                <span>💌</span>
              </div>
              <button type="button" class="btn-strike-match" id="btnStrikeMatch">
                🕯️ Strike Match &amp; Burn Seal
              </button>
            </div>

            <!-- Unfolded Letter Inside -->
            <div class="parchment-letter-unfolded" id="parchmentLetter">
              <div class="letter-greeting">Dearest ${recipient},</div>
              <div class="letter-paragraph">${letterBody}</div>
              <div class="letter-signature">With all my love,<br/>${sender} ♡</div>
            </div>
          </div>
        </div>

        <div class="romance-nav-footer">
          <button type="button" class="btn-romance-prev" data-prev="4">&larr; Back</button>
          <button type="button" class="btn-romance-next" data-next="6">
            Release Sky Lanterns 🏮 &rarr;
          </button>
        </div>
      </section>

      <!-- ========================================================
           PAGE 6: TWILIGHT SKY LANTERNS & GRAND FINALE
           ======================================================== -->
      <section class="romance-page-view" data-page="6" id="pageLanterns">
        <span class="romance-page-badge">CHAPTER VI • TWILIGHT SKY</span>
        <h2 class="romance-page-title" style="color:#fef08a; text-shadow:0 0 20px rgba(251,191,36,0.5);">${data.lanternTitle || "Wishes In The Sky"}</h2>
        <p class="romance-page-sub" style="color:#fbcfe8;">Release our glowing lanterns into the starry night...</p>

        <div class="lanterns-sky-stage" id="lanternsSkyStage">
          <div class="twilight-starfield"></div>
          <div id="floatingLanternField" style="position:absolute; inset:0; pointer-events:none;"></div>
        </div>

        <div style="margin-bottom:20px;">
          <button type="button" class="btn-release-lanterns-glow" id="btnReleaseMoreLanterns">
            ✨ Release More Lanterns 🏮
          </button>
        </div>

        <div class="finale-celebration-box">
          <p style="font-size:16px; font-weight:800; color:#881337; margin:0 0 8px;">
            Here's to a lifetime of love, laughter &amp; blooming memories ✨
          </p>
          <p style="font-size:13px; color:#5a3f4e; margin:0 0 14px;">
            Created with all my heart for ${recipient}.
          </p>
          <button type="button" class="btn-romance-prev" id="btnReplayCelebration" style="width:100%; border-color:#d4235c; color:#d4235c; background:#fff5eb; font-weight:800;">
            ↺ Replay Our Celebration
          </button>
        </div>

        <div class="romance-nav-footer" style="margin-top:24px;">
          <button type="button" class="btn-romance-prev" data-prev="5">&larr; Back to Letter</button>
        </div>
      </section>
    </div>
  `;

  // Mount Corner Mini Spinning CD Music Player
  const musicSlot = container.querySelector('#romanceMusicSlot');
  initMusicPlayer(musicSlot, {
    ...data,
    audioSrc: data.audioSrc || '/audio/alfaaz.mp3',
    audioTitle: data.audioTitle || 'Alfaaz - Hamza Malik & Zain Zohaib',
    audioSubtitle: 'ROMANTIC SCORE'
  });

  // =========================================================================
  // PAGE-BY-PAGE NAVIGATION ENGINE
  // =========================================================================
  let currentPage = 1;
  const totalPages = 6;
  const pages = container.querySelectorAll('.romance-page-view');
  const dockChips = container.querySelectorAll('.romance-chip-btn');
  const progressFill = container.querySelector('#dockProgressFill');
  const dockStepPill = container.querySelector('#dockStepPill');
  const dockChapterTitle = container.querySelector('#dockChapterTitle');

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(page, totalPages));

    pages.forEach(p => {
      const pNum = parseInt(p.getAttribute('data-page'), 10);
      p.classList.toggle('active', pNum === currentPage);
    });

    dockChips.forEach(chip => {
      const cNum = parseInt(chip.getAttribute('data-page'), 10);
      chip.classList.toggle('active', cNum === currentPage);
    });

    if (progressFill) {
      progressFill.style.width = `${(currentPage / totalPages) * 100}%`;
    }
    if (dockStepPill) {
      dockStepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    }
    if (dockChapterTitle) {
      dockChapterTitle.textContent = CHAPTER_TITLES[currentPage] || "Romance Journey";
    }

    if (navigator.vibrate) navigator.vibrate(14);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific trigger actions
    if (currentPage === 3) {
      setTimeout(() => initLivingTree(), 60);
    } else if (currentPage === 6) {
      setTimeout(() => spawnLanternBatch(4), 100);
    }
  }

  // Connect Next & Prev buttons
  container.querySelectorAll('.btn-romance-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'), 10);
      goToPage(next);
    });
  });

  container.querySelectorAll('.btn-romance-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'), 10);
      goToPage(prev);
    });
  });

  // Connect Top Chapter Dock Chips
  dockChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetPage = parseInt(chip.getAttribute('data-page'), 10);
      goToPage(targetPage);
    });
  });

  // Replay celebration
  container.querySelector('#btnReplayCelebration')?.addEventListener('click', () => {
    goToPage(1);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
  });

  // =========================================================================
  // AMBIENT FLOATING SAKURA PETALS BACKGROUND (60fps)
  // =========================================================================
  const ambientCanvas = container.querySelector('#ambientPetalsCanvas');
  if (ambientCanvas) {
    const aCtx = ambientCanvas.getContext('2d');
    let aW = (ambientCanvas.width = window.innerWidth);
    let aH = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      aW = ambientCanvas.width = window.innerWidth;
      aH = ambientCanvas.height = window.innerHeight;
    }, { passive: true });

    const petals = Array.from({ length: 24 }, () => ({
      x: Math.random() * aW,
      y: Math.random() * aH,
      size: Math.random() * 8 + 6,
      vx: Math.random() * 0.8 - 0.4,
      vy: Math.random() * 0.9 + 0.5,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.45 + 0.25,
      color: ['#fda4af', '#fbcfe8', '#f43f5e', '#fed7aa'][Math.floor(Math.random() * 4)]
    }));

    function renderAmbientPetals() {
      aCtx.clearRect(0, 0, aW, aH);
      for (let p of petals) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y > aH + 20) { p.y = -20; p.x = Math.random() * aW; }
        if (p.x > aW + 20) p.x = -20;
        if (p.x < -20) p.x = aW + 20;

        aCtx.save();
        aCtx.globalAlpha = p.alpha;
        aCtx.translate(p.x, p.y);
        aCtx.rotate(p.rot);
        aCtx.fillStyle = p.color;
        aCtx.beginPath();
        aCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        aCtx.fill();
        aCtx.restore();
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
  const bloomCard = container.querySelector('#bloomCardReveal');
  let flowerBloomed = false;

  viralFlowerBtn?.addEventListener('click', () => {
    if (flowerBloomed) return;
    flowerBloomed = true;
    if (navigator.vibrate) navigator.vibrate([25, 35]);

    viralFlowerBtn.classList.add('bloomed');
    bloomCard?.classList.add('shown');

    // Canvas explosion
    if (burstCanvas) {
      const bCtx = burstCanvas.getContext('2d');
      const bW = (burstCanvas.width = burstCanvas.clientWidth || 340);
      const bH = (burstCanvas.height = burstCanvas.clientHeight || 340);
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
      particleCount: 65,
      spread: 75,
      origin: { y: 0.45 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
    });
  });

  // =========================================================================
  // CHAPTER 2: CUPID'S RECURVE ARCHERY & BEATING HEART TARGET
  // =========================================================================
  const cupidTargetWrap = container.querySelector('#cupidTargetWrap');
  const cupidTargetHeart = container.querySelector('#cupidTargetHeart');
  const cupidBowElem = container.querySelector('#cupidBowElem');
  const cupidArrowElem = container.querySelector('#cupidArrowElem');
  const bowWoodPath = container.querySelector('#bowWoodPath');
  const bowStrL = container.querySelector('#bowStringL');
  const bowStrR = container.querySelector('#bowStringR');
  const bowNock = container.querySelector('#bowNock');
  const btnQuickShoot = container.querySelector('#btnCupidQuickShoot');
  const strikeBanner = container.querySelector('#cupidStrikeBanner');

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
    if (navigator.vibrate) navigator.vibrate([20, 30, 45]);

    gsap.to(cupidArrowElem, {
      y: -window.innerHeight * 0.42,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        cupidTargetHeart?.classList.add('heart-struck');
        strikeBanner?.classList.add('shown');

        confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.32 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700']
        });
      }
    });

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
    try { cupidBowElem.setPointerCapture(e.pointerId); } catch {}
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
    if (currentPull > 28) {
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

    function buildBranch(startX, startY, length, angle, depth) {
      if (depth === 0) {
        const count = Math.floor(Math.random() * 4 + 3);
        for (let i = 0; i < count; i++) {
          treePetals.push({
            x: startX + (Math.random() - 0.5) * 16,
            y: startY + (Math.random() - 0.5) * 16,
            size: Math.random() * 6 + 4,
            color: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fff0f3'][Math.floor(Math.random() * 5)],
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04
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
    const trunkY = actualH - 18;
    buildBranch(trunkX, trunkY, actualH * 0.24, -Math.PI / 2, 6);

    function renderTreeFrame() {
      tCtx.clearRect(0, 0, actualW, actualH);

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

      if (treeGrowthProgress > 0.45) {
        const petalAlpha = Math.min(1, (treeGrowthProgress - 0.45) / 0.55);
        tCtx.save();
        tCtx.globalAlpha = petalAlpha;

        for (let p of treePetals) {
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
        treeGrowthProgress += 0.02;
        treeRAF = requestAnimationFrame(renderTreeFrame);
      }
    }

    if (treeRAF) cancelAnimationFrame(treeRAF);
    treeRAF = requestAnimationFrame(renderTreeFrame);
  }

  btnRegrowTree?.addEventListener('click', initLivingTree);

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
  // CHAPTER 4: REALISTIC 3D MEMORY FLIPBOOK
  // =========================================================================
  const leaves = container.querySelectorAll('.book-leaf');
  const btnFlipPrev = container.querySelector('#btnFlipPrev');
  const btnFlipNext = container.querySelector('#btnFlipNext');
  const flipIndicator = container.querySelector('#flipIndicator');
  let currentLeafIdx = 0;

  function updateFlipbookState() {
    leaves.forEach((leaf, idx) => {
      if (idx < currentLeafIdx) {
        leaf.classList.add('flipped');
      } else {
        leaf.classList.remove('flipped');
      }
    });

    if (btnFlipPrev) btnFlipPrev.disabled = (currentLeafIdx === 0);
    if (btnFlipNext) btnFlipNext.disabled = (currentLeafIdx === polaroids.length);
    if (flipIndicator) {
      const displayIdx = Math.min(currentLeafIdx + 1, polaroids.length);
      flipIndicator.textContent = `Memory ${displayIdx} of ${polaroids.length}`;
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  btnFlipNext?.addEventListener('click', () => {
    if (currentLeafIdx < polaroids.length) {
      currentLeafIdx++;
      updateFlipbookState();
    }
  });

  btnFlipPrev?.addEventListener('click', () => {
    if (currentLeafIdx > 0) {
      currentLeafIdx--;
      updateFlipbookState();
    }
  });

  // Tapping directly on the book leaves to flip
  leaves.forEach((leaf, idx) => {
    leaf.addEventListener('click', () => {
      if (idx === currentLeafIdx) {
        currentLeafIdx++;
        updateFlipbookState();
      } else if (idx === currentLeafIdx - 1) {
        currentLeafIdx--;
        updateFlipbookState();
      }
    });
  });

  // =========================================================================
  // CHAPTER 5: BURN-TO-REVEAL WAX PARCHMENT LETTER
  // =========================================================================
  const btnStrikeMatch = container.querySelector('#btnStrikeMatch');
  const waxStamp = container.querySelector('#waxSealStamp');
  const waxWrapper = container.querySelector('#waxSealWrapper');
  const parchmentLetter = container.querySelector('#parchmentLetter');

  btnStrikeMatch?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]);
    waxStamp?.classList.add('burned');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#ef4444', '#ffd700']
    });

    setTimeout(() => {
      if (waxWrapper) waxWrapper.style.display = 'none';
      if (parchmentLetter) parchmentLetter.classList.add('visible');
    }, 700);
  });

  // =========================================================================
  // CHAPTER 6: FLOATING TWILIGHT WISHING LANTERNS
  // =========================================================================
  const lanternField = container.querySelector('#floatingLanternField');
  const btnMoreLanterns = container.querySelector('#btnReleaseMoreLanterns');

  function spawnOneLantern() {
    if (!lanternField) return;
    const l = document.createElement('div');
    l.className = 'twilight-lantern';
    const startX = Math.random() * 85 + 5;
    const duration = Math.random() * 5 + 7;
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

  function spawnLanternBatch(count = 4) {
    for (let i = 0; i < count; i++) {
      setTimeout(spawnOneLantern, i * 400);
    }
  }

  btnMoreLanterns?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(25);
    spawnLanternBatch(6);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffd700', '#ff69b4', '#fbcfe8', '#fef08a']
    });
  });
}
