// src/components/flipBook.js - Real 3D Interactive Hardcover Flipbook
// Features real 3D page-turning leaves (rotateY around spine), dynamic shadow gradients,
// page corner curls, touch/drag gesture turning, realistic Web Audio paper rustle, and gold-foil styling.

import confetti from 'canvas-confetti';

// Web Audio synthesizer for realistic paper turn / flutter sound
let audioCtx = null;
function playPaperRustle() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    // White noise buffer for paper texture
    const bufferSize = audioCtx.sampleRate * 0.22;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to sound like heavy cardstock paper sliding
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.2);
    filter.Q.value = 1.8;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(now);
    noise.stop(now + 0.23);
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

  const reasonsPart1 = reasons.slice(0, 6);
  const reasonsPart2 = reasons.slice(6, 12);

  container.innerHTML = `
    <section class="real3d-magazine-section" id="real3dMagazineSection">
      <div class="real3d-mag-header">
        <div class="real3d-mag-tag">LUXURY COLLECTOR'S ISSUE</div>
        <h2 class="real3d-mag-title">The 3D Birthday Edition</h2>
        <p class="real3d-mag-hint">Swipe, drag, or tap the pages to turn in 3D 📖</p>
      </div>

      <!-- Controls Toolbar -->
      <div class="real3d-mag-toolbar">
        <button class="real3d-tool-btn" id="btn3dPrev">‹ PREV PAGE</button>
        <button class="real3d-tool-btn active-pill" id="btn3dAuto">▶ AUTO FLIP</button>
        <button class="real3d-tool-btn" id="btn3dCelebrate">✨ CELEBRATE</button>
        <button class="real3d-tool-btn" id="btn3dNext">NEXT PAGE ›</button>
      </div>

      <!-- 3D Book Presentation Deck -->
      <div class="real3d-book-stage">
        <!-- Ambient Under-Book Shadow -->
        <div class="real3d-table-shadow"></div>

        <!-- The 3D Book Container -->
        <div class="real3d-book" id="real3dBook">
          <!-- Central Spine Shadow & Stitching -->
          <div class="real3d-book-spine"></div>
          <div class="real3d-satin-bookmark"></div>

          <!-- STATIC BASE LEFT PAGE (Revealed when pages turn left) -->
          <div class="real3d-base-left" id="real3dBaseLeft">
            <div class="real3d-page-inner base-inner">
              <div class="mag-gold-monogram">♡</div>
              <h3 class="mag-chapter-head">A MEMORY ARCHIVE</h3>
              <p class="mag-chapter-body">Every turned page is a chapter of laughter, adventures, and the infinite beauty you bring into this universe.</p>
              <div class="mag-photo-mini-polaroid">
                <img src="${photo1}" alt="Memory" />
                <span>Forever & Always 🫶</span>
              </div>
            </div>
          </div>

          <!-- STATIC BASE RIGHT PAGE (Revealed under all leaves) -->
          <div class="real3d-base-right" id="real3dBaseRight">
            <div class="real3d-page-inner base-inner">
              <div class="mag-gold-monogram">👑</div>
              <h3 class="mag-chapter-head">ENDLESS WISHES</h3>
              <p class="mag-chapter-body">May this year bloom with laughter, achieved dreams, and all the love you so effortlessly share with the world.</p>
              <button class="btn-mag-wish-burst" id="btnMagWishBurst">🎂 Send Birthday Confetti</button>
            </div>
          </div>

          <!-- 3D ROTATING LEAF 0: FRONT COVER & INSIDE FRONTISPIECE -->
          <div class="real3d-leaf" id="leaf0" data-leaf="0" style="z-index: 10;">
            <!-- Front Face: Hardcover with Gold Foil Embellishments -->
            <div class="real3d-face real3d-front leaf-cover-front">
              <div class="cover-gold-border">
                <div class="cover-top-tag">LIMITED SPECIAL EDITION • VOL. I</div>
                <h1 class="cover-vogue-title">${magazine.vogueTitle || "VOGUE"}</h1>
                <div class="cover-sub-title">THINGS ABOUT ${recipient}</div>
                <div class="cover-gold-crest">
                  <svg viewBox="0 0 100 100" width="60" height="60">
                    <path d="M50 15 C30 35 15 50 15 65 C15 80 30 90 50 90 C70 90 85 80 85 65 C85 50 70 35 50 15 Z" fill="none" stroke="#d4af37" stroke-width="2.5"/>
                    <circle cx="50" cy="55" r="14" fill="#d4af37" opacity="0.3"/>
                    <text x="50" y="60" font-family="'Cinzel', serif" font-size="14" fill="#d4af37" font-weight="700" text-anchor="middle">★</text>
                  </svg>
                </div>
                <div class="cover-quote-preview">"${magazine.editorialQuote || 'You make every day feel like the sweetest dream.'}"</div>
                <div class="cover-corner-fold" title="Drag or tap to open">
                  <span>OPEN ➔</span>
                </div>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>

            <!-- Back Face: Editorial Portrait & Issue Info -->
            <div class="real3d-face real3d-back leaf-editorial-portrait">
              <div class="real3d-page-inner">
                <div class="editorial-header">EXCLUSIVE EDITORIAL</div>
                <div class="editorial-chapter">${magazine.chapterTitle || "CHAPTER 01"}</div>
                <h3 class="editorial-title">${magazine.chapterHeading || `THINGS ABOUT ${recipient}`}</h3>
                <div class="editorial-img-box">
                  <img src="${photo1}" alt="Editorial Portrait" />
                </div>
                <p class="editorial-quote">"${magazine.editorialQuote || 'Being with you makes ordinary moments feel extraordinary.'}"</p>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>
          </div>

          <!-- 3D ROTATING LEAF 1: REASONS PART 1 & REASONS PART 2 -->
          <div class="real3d-leaf" id="leaf1" data-leaf="1" style="z-index: 9;">
            <!-- Front Face: Reasons 1 to 6 -->
            <div class="real3d-face real3d-front leaf-reasons-1">
              <div class="real3d-page-inner">
                <div class="editorial-header">PART I: SWEET TRAITS</div>
                <h4 class="reasons-spread-title">12 Reasons To Adore You</h4>
                <div class="traits-list-3d">
                  ${reasonsPart1.map(r => `
                    <div class="trait-item-3d">
                      <span class="trait-num-3d">${r.num}.</span>
                      <strong class="trait-title-3d">${r.title}</strong>
                      <div class="trait-desc-3d">${r.desc}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="page-footer-num">PAGE 03</div>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>

            <!-- Back Face: Reasons 7 to 12 -->
            <div class="real3d-face real3d-back leaf-reasons-2">
              <div class="real3d-page-inner">
                <div class="editorial-header">PART II: CONTINUED</div>
                <h4 class="reasons-spread-title">More Things I Adore</h4>
                <div class="traits-list-3d">
                  ${(reasonsPart2.length > 0 ? reasonsPart2 : [
                    { num: "07", title: "Infectious Laughter", desc: "The melody that never fails to cheer me up." },
                    { num: "08", title: "Kindest Heart", desc: "Always caring for everyone around you." },
                    { num: "09", title: "Unstoppable Ambition", desc: "Watching you chase dreams inspires me daily." },
                    { num: "10", title: "My Safest Haven", desc: "No place feels warmer than beside you." },
                    { num: "11", title: "Your Effortless Aura", desc: "You radiate beauty naturally without even trying." },
                    { num: "12", title: "My Favorite Person", desc: "Yesterday, today, and for every tomorrow." }
                  ]).map(r => `
                    <div class="trait-item-3d">
                      <span class="trait-num-3d">${r.num}.</span>
                      <strong class="trait-title-3d">${r.title}</strong>
                      <div class="trait-desc-3d">${r.desc}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="page-footer-num">PAGE 04</div>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>
          </div>

          <!-- 3D ROTATING LEAF 2: SCRAPBOOK POLAROIDS & WAX LETTER -->
          <div class="real3d-leaf" id="leaf2" data-leaf="2" style="z-index: 8;">
            <!-- Front Face: Scrapbook Collage -->
            <div class="real3d-face real3d-front leaf-scrapbook">
              <div class="real3d-page-inner scrapbook-inner">
                <div class="scrapbook-washi washi-top"></div>
                <div class="editorial-header">OUR POLAROID VAULT</div>
                <div class="scrapbook-polaroids-duo">
                  <div class="scrap-polaroid scrap-left">
                    <img src="${photo2}" alt="Memory" />
                    <span>Golden Hour Moments ✨</span>
                  </div>
                  <div class="scrap-polaroid scrap-right">
                    <img src="${photo3}" alt="Memory" />
                    <span>Always Smiling 🫶</span>
                  </div>
                </div>
                <div class="page-footer-num">PAGE 05</div>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>

            <!-- Back Face: Letter from the Heart with Gold Seal -->
            <div class="real3d-face real3d-back leaf-letter">
              <div class="real3d-page-inner letter-inner">
                <div class="letter-stamp-seal">WAX SEALED ♡</div>
                <div class="editorial-header">A MESSAGE FROM THE HEART</div>
                <h4 class="handwritten-title">To My Dearest ${recipient},</h4>
                <p class="handwritten-text">
                  Thank you for filling life with warmth, sweetness, and countless reasons to smile.
                  May every wish you whisper today echo back into your life with endless joy.
                  You are truly one of a kind.
                </p>
                <div class="handwritten-sign">Forever Yours, ♡</div>
                <div class="page-footer-num">PAGE 06</div>
              </div>
              <div class="real3d-page-shadow"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spread Navigation Indicator -->
      <div class="real3d-nav-indicator">
        <div class="real3d-spread-dots" id="spreadDots">
          <span class="spread-dot active" data-s="0" title="Cover"></span>
          <span class="spread-dot" data-s="1" title="Editorial & Traits I"></span>
          <span class="spread-dot" data-s="2" title="Traits II & Scrapbook"></span>
          <span class="spread-dot" data-s="3" title="Letter & Final Wish"></span>
        </div>
        <span class="real3d-spread-text" id="spreadText">SPREAD 1 / 4 (COVER)</span>
      </div>
    </section>
  `;

  // State
  const totalLeaves = 3; // leaf0, leaf1, leaf2
  let currentSpread = 0; // 0: Cover closed, 1: Spread 1, 2: Spread 2, 3: Spread 3
  let autoFlipTimer = null;
  let isDragging = false;
  let dragStartX = 0;
  let currentDragLeaf = null;

  const book = container.querySelector('#real3dBook');
  const leaves = [
    container.querySelector('#leaf0'),
    container.querySelector('#leaf1'),
    container.querySelector('#leaf2')
  ];
  const dots = container.querySelectorAll('.spread-dot');
  const spreadText = container.querySelector('#spreadText');
  const btnPrev = container.querySelector('#btn3dPrev');
  const btnNext = container.querySelector('#btn3dNext');
  const btnAuto = container.querySelector('#btn3dAuto');
  const btnCelebrate = container.querySelector('#btn3dCelebrate');
  const btnWishBurst = container.querySelector('#btnMagWishBurst');

  const spreadNames = [
    "SPREAD 1 / 4 (HARDCOVER)",
    "SPREAD 2 / 4 (EDITORIAL & REASONS I)",
    "SPREAD 3 / 4 (REASONS II & SCRAPBOOK)",
    "SPREAD 4 / 4 (LETTER & FINAL WISH)"
  ];

  function updateSpread(targetSpread, playSound = true) {
    targetSpread = Math.max(0, Math.min(totalLeaves, targetSpread));
    if (targetSpread === currentSpread && !playSound) return;

    if (playSound) playPaperRustle();
    currentSpread = targetSpread;

    leaves.forEach((leaf, idx) => {
      const frontShadow = leaf.querySelector('.real3d-front .real3d-page-shadow');
      const backShadow = leaf.querySelector('.real3d-back .real3d-page-shadow');

      leaf.style.transition = 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), z-index 0.85s ease';

      if (idx < currentSpread) {
        // Page has been turned to the left side
        leaf.style.transform = 'rotateY(-180deg)';
        leaf.style.zIndex = `${10 + idx}`;
        if (frontShadow) frontShadow.style.opacity = '0';
        if (backShadow) backShadow.style.opacity = '0';
      } else {
        // Page rests on the right side
        leaf.style.transform = 'rotateY(0deg)';
        leaf.style.zIndex = `${10 + (totalLeaves - idx)}`;
        if (frontShadow) frontShadow.style.opacity = '0';
        if (backShadow) backShadow.style.opacity = '0';
      }
    });

    // Update dots & text
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSpread);
    });
    if (spreadText) {
      spreadText.textContent = spreadNames[currentSpread] || `SPREAD ${currentSpread + 1} / 4`;
    }

    // Trigger celebratory confetti on last spread
    if (currentSpread === totalLeaves) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#d4af37', '#f43f5e', '#fbcfe8', '#ffffff']
      });
    }
  }

  // Next / Prev Actions
  function turnNext() {
    if (currentSpread < totalLeaves) {
      updateSpread(currentSpread + 1);
    } else {
      updateSpread(0); // Loop back to cover
    }
  }

  function turnPrev() {
    if (currentSpread > 0) {
      updateSpread(currentSpread - 1);
    }
  }

  btnNext?.addEventListener('click', turnNext);
  btnPrev?.addEventListener('click', turnPrev);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const s = parseInt(dot.getAttribute('data-s'), 10);
      updateSpread(s);
    });
  });

  // Auto Flip Toggle
  btnAuto?.addEventListener('click', () => {
    if (autoFlipTimer) {
      clearInterval(autoFlipTimer);
      autoFlipTimer = null;
      btnAuto.classList.remove('active');
      btnAuto.textContent = '▶ AUTO FLIP';
    } else {
      btnAuto.classList.add('active');
      btnAuto.textContent = '⏸ PAUSE FLIP';
      autoFlipTimer = setInterval(() => {
        turnNext();
      }, 3800);
    }
  });

  // Celebrate Confetti Cannon
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#e11d48', '#fbcfe8', '#fbbf24', '#ffffff']
    });
  };
  btnCelebrate?.addEventListener('click', triggerConfetti);
  btnWishBurst?.addEventListener('click', triggerConfetti);

  // Click on book sides to turn
  book.addEventListener('click', (e) => {
    if (isDragging) return;
    const rect = book.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width * 0.55) {
      turnNext();
    } else if (clickX < rect.width * 0.45) {
      turnPrev();
    }
  });

  // Touch & Mouse Drag to Turn 3D Pages
  function onPointerDown(e) {
    isDragging = true;
    dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
    currentDragLeaf = leaves[currentSpread < totalLeaves ? currentSpread : totalLeaves - 1];
  }

  function onPointerMove(e) {
    if (!isDragging || !currentDragLeaf) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;

    // Turn forward: dragging left (negative deltaX)
    if (deltaX < 0 && currentSpread < totalLeaves) {
      const leaf = leaves[currentSpread];
      const deg = Math.max(-180, Math.min(0, (deltaX / 280) * 180));
      leaf.style.transition = 'none';
      leaf.style.transform = `rotateY(${deg}deg)`;
      const shadow = leaf.querySelector('.real3d-front .real3d-page-shadow');
      if (shadow) shadow.style.opacity = `${Math.sin((-deg * Math.PI) / 180) * 0.45}`;
    }
    // Turn backward: dragging right (positive deltaX)
    else if (deltaX > 0 && currentSpread > 0) {
      const leaf = leaves[currentSpread - 1];
      const deg = Math.min(0, Math.max(-180, -180 + (deltaX / 280) * 180));
      leaf.style.transition = 'none';
      leaf.style.transform = `rotateY(${deg}deg)`;
      const shadow = leaf.querySelector('.real3d-back .real3d-page-shadow');
      if (shadow) shadow.style.opacity = `${Math.sin(((180 + deg) * Math.PI) / 180) * 0.45}`;
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;

    if (deltaX < -50 && currentSpread < totalLeaves) {
      updateSpread(currentSpread + 1);
    } else if (deltaX > 50 && currentSpread > 0) {
      updateSpread(currentSpread - 1);
    } else {
      // Snap back to current state
      updateSpread(currentSpread, false);
    }
    currentDragLeaf = null;
  }

  book.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  book.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Initialize Cover Spread
  updateSpread(0, false);
}
