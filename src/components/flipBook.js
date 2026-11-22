// src/components/flipBook.js - Luxury Vogue Magazine Flipbook Engine
// 100% Mobile Optimized: Full-bleed high-res single-page 3D curl reader on mobile,
// authentic open 2-page spread on desktop, touch/swipe peeling, paper physics, and synthesized audio.

import confetti from 'canvas-confetti';

// Web Audio synthesizer for realistic silky magazine paper rustle
let audioCtx = null;
function playPaperRustle() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.18;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.16);
    filter.Q.value = 2.2;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(now);
    noise.stop(now + 0.19);
  } catch (_) {}
}

export function initFlipBook(container, config) {
  const magazine = config.magazine || {};
  const polaroids = config.polaroids || [];
  const reasons = magazine.reasons || [];

  const recipient = (config.general?.recipientName || "Sweety").toUpperCase();
  const photo1 = magazine.editorialPhoto || polaroids[0]?.image || '/images/sunset.jpg';
  const photo2 = polaroids[1]?.image || '/images/always_you.jpg';
  const photo3 = polaroids[2]?.image || '/images/dream_girl.jpg';
  const photo4 = polaroids[3]?.image || '/images/queen.jpg';

  const defaultReasons = [
    { num: "01", title: "Mesmerizing Presence", desc: "You effortlessly illuminate every room you walk into." },
    { num: "02", title: "The Sweetest Smile", desc: "A smile that melts away worries and brightens any day." },
    { num: "03", title: "Pure Gold Heart", desc: "Endless kindness and genuine warmth toward everyone." },
    { num: "04", title: "Infectious Laughter", desc: "The sweetest melody that never fails to cheer me up." },
    { num: "05", title: "My Safest Haven", desc: "No place in this universe feels warmer than beside you." },
    { num: "06", title: "Effortless Elegance", desc: "A timeless, natural grace that turns heads without trying." },
    { num: "07", title: "Unstoppable Ambition", desc: "Your passion and dedication to your dreams inspire me daily." },
    { num: "08", title: "Infinite Patience", desc: "Understanding, caring, and always knowing what to say." },
    { num: "09", title: "Breathtaking Beauty", desc: "Inside and out, perfection personified in every detail." },
    { num: "10", title: "Our Little Inside Jokes", desc: "The secret giggles that only you and I understand." },
    { num: "11", title: "My Happiest Thought", desc: "The first thing that brings a smile to my face each morning." },
    { num: "12", title: "My Forever Person", desc: "Yesterday, today, and through all our tomorrows." }
  ];

  const fullReasons = (reasons.length >= 6 ? reasons : defaultReasons).map((r, i) => ({
    num: r.num || (i < 9 ? `0${i+1}` : `${i+1}`),
    title: r.title || `Special Trait ${i+1}`,
    desc: r.desc || "One of the countless reasons why you are so deeply cherished."
  }));

  const reasonsPart1 = fullReasons.slice(0, 6);
  const reasonsPart2 = fullReasons.slice(6, 12);

  // Pages definition: 7 Magazine Pages
  // Page 0: Cover
  // Page 1: Editor's Note & Portrait
  // Page 2: 12 Reasons Part 1
  // Page 3: 12 Reasons Part 2 & Pull Quote
  // Page 4: Lookbook & Memories Photo Spread
  // Page 5: Letter From The Heart
  // Page 6: Back Cover
  const totalPages = 7;
  let currentPage = 0;
  let autoFlipTimer = null;
  let isMobileView = window.innerWidth < 768;

  container.innerHTML = `
    <section class="vogue-mag-section" id="vogueMagSection">
      <!-- Luxury Magazine Header -->
      <div class="vogue-mag-header">
        <span class="vogue-edition-badge">★ SPECIAL COMMEMORATIVE EDITION ★</span>
        <h2 class="vogue-section-title">The Birthday Issue</h2>
        <p class="vogue-section-sub">A luxury editorial magazine dedicated to ${recipient} • Swipe or tap to turn</p>
      </div>

      <!-- Navigation & Mode Toolbar -->
      <div class="vogue-mag-toolbar">
        <button class="vogue-tool-btn" id="btnMagPrev">‹ PREV</button>
        <div class="vogue-page-indicator" id="magPageIndicator">PAGE 1 OF ${totalPages}</div>
        <button class="vogue-tool-btn" id="btnMagNext">NEXT ›</button>
        <button class="vogue-tool-btn" id="btnMagAuto">▶ AUTO READ</button>
        <button class="vogue-tool-btn" id="btnMagViewToggle">
          ${isMobileView ? "📖 SPREAD VIEW" : "📱 MOBILE VIEW"}
        </button>
      </div>

      <!-- Magazine Viewport Container -->
      <div class="vogue-mag-viewport ${isMobileView ? 'mobile-single-view' : 'desktop-spread-view'}" id="vogueViewport">
        <!-- Underneath Table Shadow -->
        <div class="vogue-surface-shadow"></div>

        <!-- The Magazine Book Deck -->
        <div class="vogue-magazine" id="vogueMagazine">
          <!-- Central Spine Shadow for Spread View -->
          <div class="vogue-spine-gutter"></div>

          <!-- PAGE 0: VOGUE COVER -->
          <article class="vogue-page page-0-cover active-page" data-page="0">
            <div class="vogue-page-gloss"></div>
            <div class="cover-frame-inner">
              <div class="cover-top-bar">
                <span>EXCLUSIVE COLLECTOR'S ISSUE</span>
                <span>$12.00 • VOL. XXIV</span>
              </div>

              <!-- Iconic Vogue Masthead -->
              <h1 class="vogue-masthead">${magazine.vogueTitle || "VOGUE"}</h1>

              <div class="cover-hero-image-wrap">
                <img src="${photo1}" alt="${recipient} Cover" class="cover-hero-photo" onerror="this.src='/images/sunset.jpg'" />
                <div class="cover-hero-overlay"></div>
              </div>

              <div class="cover-headlines-layer">
                <span class="cover-highlight-pill">THE "IT-GIRL" ISSUE</span>
                <h3 class="cover-headline-main">THE IRRESISTIBLE CHARM OF ${recipient}</h3>
                <p class="cover-headline-sub">Why she lights up every room she steps into — an exclusive look into her world.</p>
                <div class="cover-sub-articles">
                  <div class="cover-sub-article">• 12 REASONS SHE CAPTIVATES EVERY HEART</div>
                  <div class="cover-sub-article">• THE ART OF EFFORTLESS ELEGANCE</div>
                </div>
              </div>

              <!-- Barcode & Corner Turn Tab -->
              <div class="cover-bottom-row">
                <div class="vogue-barcode-box">
                  <div class="barcode-lines">||| | |||| | ||||| ||| ||</div>
                  <span>BDAY-${Date.now().toString().slice(-6)}</span>
                </div>
                <div class="vogue-corner-curl" title="Tap to flip page">
                  <span>FLIP ➔</span>
                </div>
              </div>
            </div>
          </article>

          <!-- PAGE 1: EDITOR'S LETTER & PORTRAIT -->
          <article class="vogue-page page-1-editorial" data-page="1">
            <div class="vogue-page-gloss"></div>
            <div class="editorial-page-inner">
              <div class="editorial-issue-header">
                <span>EDITORIAL LETTER</span>
                <span>ISSUE N° 24</span>
              </div>

              <div class="editorial-columns-grid">
                <div class="editorial-col-photo">
                  <div class="photo-matting-frame">
                    <img src="${photo1}" alt="Portrait" class="editorial-portrait-img" onerror="this.src='/images/sunset.jpg'" />
                    <span class="photo-caption-tiny">PHOTOGRAPHED AT GOLDEN HOUR</span>
                  </div>
                </div>

                <div class="editorial-col-text">
                  <h4 class="editorial-salutation">Dear Reader,</h4>
                  <p class="editorial-lead-para">
                    <span class="vogue-drop-cap">S</span>ome people don’t just enter a room; they elevate it. Today’s special edition is dedicated entirely to a soul whose presence is pure warmth, grace, and unmatched joy.
                  </p>
                  <p class="editorial-body-para">
                    "${magazine.editorialQuote || 'Being with you makes every ordinary day feel like the sweetest dream come true.'}"
                  </p>
                  <div class="editorial-signature-box">
                    <span class="signature-cursive">With All My Love,</span>
                    <span class="signature-title">The Editor-in-Chief ♡</span>
                  </div>
                </div>
              </div>

              <div class="vogue-page-footer">
                <span>PAGE 02 • THE BIRTHDAY ISSUE</span>
                <span>VOGUE SPECIAL</span>
              </div>
            </div>
          </article>

          <!-- PAGE 2: 12 REASONS PART 1 -->
          <article class="vogue-page page-2-reasons" data-page="2">
            <div class="vogue-page-gloss"></div>
            <div class="editorial-page-inner">
              <div class="editorial-issue-header">
                <span>THE FEATURE ARTICLE • PART I</span>
                <span>COVER STORY</span>
              </div>

              <h3 class="features-main-title">12 Things I Adore About You</h3>
              <p class="features-subtitle">A curated exploration into the qualities that make her irreplaceable.</p>

              <div class="reasons-vogue-grid">
                ${reasonsPart1.map(r => `
                  <div class="vogue-trait-card">
                    <div class="vogue-trait-num">${r.num}</div>
                    <div class="vogue-trait-content">
                      <h5 class="vogue-trait-title">${r.title}</h5>
                      <p class="vogue-trait-desc">${r.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="vogue-page-footer">
                <span>PAGE 03 • 12 REASONS</span>
                <span>CONTINUED NEXT PAGE ➔</span>
              </div>
            </div>
          </article>

          <!-- PAGE 3: 12 REASONS PART 2 & PULL QUOTE -->
          <article class="vogue-page page-3-reasons-continued" data-page="3">
            <div class="vogue-page-gloss"></div>
            <div class="editorial-page-inner">
              <div class="editorial-issue-header">
                <span>THE FEATURE ARTICLE • PART II</span>
                <span>COVER STORY</span>
              </div>

              <div class="reasons-vogue-grid">
                ${reasonsPart2.map(r => `
                  <div class="vogue-trait-card">
                    <div class="vogue-trait-num">${r.num}</div>
                    <div class="vogue-trait-content">
                      <h5 class="vogue-trait-title">${r.title}</h5>
                      <p class="vogue-trait-desc">${r.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- High-Fashion Pull Quote Banner -->
              <div class="vogue-pull-quote-banner">
                <span class="quote-mark-large">“</span>
                <p class="pull-quote-text">
                  You are the prettiest sight, the safest thought, and the sweetest chapter in my entire life.
                </p>
                <span class="quote-author-credit">— SPECIAL BIRTHDAY TRIBUTE</span>
              </div>

              <div class="vogue-page-footer">
                <span>PAGE 04 • 12 REASONS</span>
                <span>LOOKBOOK NEXT ➔</span>
              </div>
            </div>
          </article>

          <!-- PAGE 4: THE LOOKBOOK PHOTO SPREAD -->
          <article class="vogue-page page-4-lookbook" data-page="4">
            <div class="vogue-page-gloss"></div>
            <div class="editorial-page-inner">
              <div class="editorial-issue-header">
                <span>THE LOOKBOOK</span>
                <span>MOMENTS &amp; MEMORIES</span>
              </div>

              <h3 class="features-main-title">A Symphony of Smiles</h3>
              <p class="features-subtitle">Capturing our favorite memories in timeless film aesthetics.</p>

              <div class="lookbook-gallery-duo">
                <div class="lookbook-photo-card card-left">
                  <div class="lookbook-img-frame">
                    <img src="${photo2}" alt="Memory" onerror="this.src='/images/always_you.jpg'" />
                  </div>
                  <div class="lookbook-caption">
                    <span class="look-num">SERIES 01</span>
                    <p class="look-text">Every laugh with you is an instant favorite memory.</p>
                  </div>
                </div>

                <div class="lookbook-photo-card card-right">
                  <div class="lookbook-img-frame">
                    <img src="${photo3}" alt="Memory" onerror="this.src='/images/dream_girl.jpg'" />
                  </div>
                  <div class="lookbook-caption">
                    <span class="look-num">SERIES 02</span>
                    <p class="look-text">The definition of natural grace and pure joy.</p>
                  </div>
                </div>
              </div>

              <div class="vogue-page-footer">
                <span>PAGE 05 • LOOKBOOK</span>
                <span>LETTER FROM THE HEART ➔</span>
              </div>
            </div>
          </article>

          <!-- PAGE 5: WAX-SEALED LETTER SPREAD -->
          <article class="vogue-page page-5-letter" data-page="5">
            <div class="vogue-page-gloss"></div>
            <div class="editorial-page-inner letter-paper-bg">
              <div class="letter-top-crest">
                <span class="crest-seal">♡ WAX SEALED ♡</span>
              </div>

              <h3 class="letter-cursive-head">To My Sweetest ${recipient},</h3>

              <div class="letter-prose-body">
                <p>
                  On your special birthday, I want you to remember just how deeply cherished you are.
                  You bring color to ordinary days, laughter to quiet moments, and a warmth that makes life so beautiful.
                </p>
                <p>
                  May your year ahead be as breathtaking and magical as your heart. Never stop smiling, because that smile is the prettiest thing in this world.
                </p>
              </div>

              <div class="letter-closing-signature">
                <p class="letter-sign-cursive">Forever and always yours,</p>
                <p class="letter-sign-name">With all my heart ♡</p>
              </div>

              <button class="btn-letter-confetti" id="btnPageConfetti">
                🎉 Celebrate With Confetti!
              </button>

              <div class="vogue-page-footer">
                <span>PAGE 06 • PERSONAL NOTE</span>
                <span>BACK COVER ➔</span>
              </div>
            </div>
          </article>

          <!-- PAGE 6: LUXURY BACK COVER -->
          <article class="vogue-page page-6-backcover" data-page="6">
            <div class="vogue-page-gloss"></div>
            <div class="backcover-inner">
              <div class="backcover-top-logo">${magazine.vogueTitle || "VOGUE"}</div>
              <div class="backcover-gold-monogram">★</div>

              <div class="backcover-quote-card">
                <p class="backcover-quote-text">
                  “Here’s to another year of radiating beauty, achieving dreams, and being celebrated as the queen you are.”
                </p>
                <span class="backcover-quote-sub">— HAPPY BIRTHDAY SWEETY ❤️</span>
              </div>

              <div class="backcover-credits-block">
                <span>PUBLISHED WITH INFINITE LOVE</span>
                <span>ALL RIGHTS RESERVED • PRIVATE CELEBRATION</span>
                <div class="vogue-barcode-box large-barcode">
                  <div class="barcode-lines">|||| | ||||| | ||| |||| | ||||| |||</div>
                  <span>9 780201 379624 • BIRTHDAY SPECIAL</span>
                </div>
              </div>

              <button class="btn-read-again-pill" id="btnReadAgain">
                ↺ Read From Beginning
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- Spread Navigation Thumbnails / Progress Dots -->
      <div class="vogue-mag-footer-nav">
        <div class="vogue-dots-bar" id="vogueDotsBar">
          ${Array.from({ length: totalPages }).map((_, i) => `
            <span class="vogue-nav-dot ${i === 0 ? 'active' : ''}" data-page-idx="${i}" title="Page ${i + 1}"></span>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Query DOM elements
  const viewport = container.querySelector('#vogueViewport');
  const magazineEl = container.querySelector('#vogueMagazine');
  const pages = container.querySelectorAll('.vogue-page');
  const dots = container.querySelectorAll('.vogue-nav-dot');
  const pageIndicator = container.querySelector('#magPageIndicator');
  const btnPrev = container.querySelector('#btnMagPrev');
  const btnNext = container.querySelector('#btnMagNext');
  const btnAuto = container.querySelector('#btnMagAuto');
  const btnToggleView = container.querySelector('#btnMagViewToggle');
  const btnConfetti = container.querySelector('#btnPageConfetti');
  const btnRestart = container.querySelector('#btnReadAgain');

  function updatePageDisplay(targetIdx, playSound = true) {
    targetIdx = Math.max(0, Math.min(totalPages - 1, targetIdx));
    if (targetIdx === currentPage && !playSound) return;

    if (playSound) playPaperRustle();
    currentPage = targetIdx;

    if (isMobileView) {
      // Mobile Single Page 3D Flip
      pages.forEach((page, idx) => {
        page.style.transition = 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease, z-index 0.55s ease';
        if (idx === currentPage) {
          page.className = "vogue-page active-page current-turn";
          page.style.transform = 'perspective(1600px) rotateY(0deg) translate3d(0, 0, 0)';
          page.style.opacity = '1';
          page.style.pointerEvents = 'auto';
          page.style.zIndex = '15';
        } else if (idx < currentPage) {
          // Turned past
          page.className = "vogue-page turned-past";
          page.style.transform = 'perspective(1600px) rotateY(-110deg) translate3d(-30px, 0, -40px)';
          page.style.opacity = '0';
          page.style.pointerEvents = 'none';
          page.style.zIndex = `${10 - (currentPage - idx)}`;
        } else {
          // Upcoming page waiting beneath
          page.className = "vogue-page waiting-next";
          page.style.transform = 'perspective(1600px) rotateY(15deg) translate3d(15px, 0, -30px)';
          page.style.opacity = '0';
          page.style.pointerEvents = 'none';
          page.style.zIndex = `${10 - (idx - currentPage)}`;
        }
      });
    } else {
      // Desktop Open Spread Mode (Two pages side-by-side or stacked)
      pages.forEach((page, idx) => {
        page.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease';
        if (idx === currentPage) {
          page.className = "vogue-page active-page";
          page.style.transform = 'none';
          page.style.opacity = '1';
          page.style.pointerEvents = 'auto';
          page.style.zIndex = '12';
        } else {
          page.className = "vogue-page";
          page.style.transform = 'scale(0.96)';
          page.style.opacity = '0';
          page.style.pointerEvents = 'none';
          page.style.zIndex = '1';
        }
      });
    }

    // Update Dots & Indicator Text
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage);
    });
    if (pageIndicator) {
      pageIndicator.textContent = `PAGE ${currentPage + 1} OF ${totalPages}`;
    }

    if (currentPage === totalPages - 1) {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e11d48', '#fbcfe8', '#ffffff']
      });
    }
  }

  function turnNext() {
    if (currentPage < totalPages - 1) {
      updatePageDisplay(currentPage + 1);
    } else {
      updatePageDisplay(0); // Restart
    }
  }

  function turnPrev() {
    if (currentPage > 0) {
      updatePageDisplay(currentPage - 1);
    }
  }

  btnNext?.addEventListener('click', turnNext);
  btnPrev?.addEventListener('click', turnPrev);
  btnRestart?.addEventListener('click', () => updatePageDisplay(0));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-page-idx'), 10);
      updatePageDisplay(idx);
    });
  });

  // Confetti trigger
  btnConfetti?.addEventListener('click', () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#fbbf24', '#e11d48', '#38bdf8', '#ffffff']
    });
  });

  // Auto Read
  btnAuto?.addEventListener('click', () => {
    if (autoFlipTimer) {
      clearInterval(autoFlipTimer);
      autoFlipTimer = null;
      btnAuto.classList.remove('active-pill');
      btnAuto.textContent = '▶ AUTO READ';
    } else {
      btnAuto.classList.add('active-pill');
      btnAuto.textContent = '⏸ PAUSE';
      autoFlipTimer = setInterval(() => {
        turnNext();
      }, 4200);
    }
  });

  // View Mode Toggle (Mobile View / Spread View)
  btnToggleView?.addEventListener('click', () => {
    isMobileView = !isMobileView;
    viewport.className = `vogue-mag-viewport ${isMobileView ? 'mobile-single-view' : 'desktop-spread-view'}`;
    btnToggleView.textContent = isMobileView ? "📖 SPREAD VIEW" : "📱 MOBILE VIEW";
    updatePageDisplay(currentPage, false);
  });

  // Responsive resize detection
  window.addEventListener('resize', () => {
    const shouldBeMobile = window.innerWidth < 768;
    if (shouldBeMobile !== isMobileView) {
      isMobileView = shouldBeMobile;
      viewport.className = `vogue-mag-viewport ${isMobileView ? 'mobile-single-view' : 'desktop-spread-view'}`;
      btnToggleView.textContent = isMobileView ? "📖 SPREAD VIEW" : "📱 MOBILE VIEW";
      updatePageDisplay(currentPage, false);
    }
  });

  // Touch Swipe Peeling Physics
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;

  magazineEl.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isSwiping = true;
  }, { passive: true });

  magazineEl.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      const activeEl = pages[currentPage];
      if (activeEl && isMobileView) {
        const tilt = Math.max(-45, Math.min(45, (diffX / 200) * 45));
        activeEl.style.transform = `perspective(1600px) rotateY(${tilt}deg) translate3d(${diffX * 0.4}px, 0, 0)`;
      }
    }
  }, { passive: true });

  magazineEl.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartX;

    if (diffX < -50) {
      turnNext();
    } else if (diffX > 50) {
      turnPrev();
    } else {
      updatePageDisplay(currentPage, false);
    }
  });

  // Click on edge of magazine to turn
  magazineEl.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    const rect = magazineEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width * 0.6) {
      turnNext();
    } else if (x < rect.width * 0.4) {
      turnPrev();
    }
  });

  // Initialize
  updatePageDisplay(0, false);
}
