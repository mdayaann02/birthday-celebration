// src/viewer/templates/bloomRevealTemplate.js - Exact Bloom Reveal Surprise Experience
// Faithfully recreated from bloom-reveal-surprise.lovable.app
// Features: 4-digit PIN gate, 88-flower spiral vortex curtain, left/right parting reveal,
// 10 Things I Love About You glass accordion, 10 Polaroid memories gallery,
// word-by-word scroll illuminated parchment love letter, Spotify top songs, and typewriter devotion finale.

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

const FLOWER_IMAGES = [
  '/bloom/flower1.png',
  '/bloom/flower2.png',
  '/bloom/flower3.png',
  '/bloom/flower4.png',
  '/bloom/flower5.png',
  '/bloom/flower6.png',
  '/bloom/flower7.png',
  '/bloom/flower8.png',
  '/bloom/flower9.png',
  '/bloom/flower10.png'
];

const POLAROID_IMAGES = [
  '/bloom/p1.png',
  '/bloom/p2.png',
  '/bloom/p3.png',
  '/bloom/p4.png',
  '/bloom/p5.png',
  '/bloom/p6.png',
  '/bloom/p7.png',
  '/bloom/p8.png',
  '/bloom/p9.png',
  '/bloom/p10.png'
];

const POLAROID_TILTS = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3];

export function renderBloomRevealTemplate(container, data = {}, isMakerReview = false) {
  const targetPin = (data.bloomPin || '0000').trim();
  const recipient = data.recipientName || 'Beautiful';
  const gateGreeting = data.gateGreeting || `Hi, ${recipient.toLowerCase()}`;
  const gateSubtitle = data.gateSubtitle || 'Enter the correct password to see your surprise :)';
  const reasonsTitle = data.reasonsTitle || '10 things I love about you';
  const reasonsList = (data.reasonsList && data.reasonsList.length > 0) ? data.reasonsList : [
    {
      title: "Your Virtual Good Morning Smiles",
      body: "Waking up to your sleepy face on our morning video calls instantly brightens my entire day. Even when we are miles apart, that sweet smile makes me feel like you are right beside me."
    },
    {
      title: "The Way You Laugh at My Bad Jokes",
      body: "I know my sense of humor can be terrible, but you always let out the most genuine, joyful laugh anyway. Hearing that sound over the phone is absolute music to my ears."
    },
    {
      title: "Your Unwavering Support",
      body: "Whenever I feel overwhelmed by a busy week, you always know exactly the right words to encourage me. Your belief in my dreams pushes me to be the best version of myself every single day."
    },
    {
      title: "Our Late-Night Movie Syncs",
      body: "There is nothing better than counting down from three so we can press play on a movie at the exact same time. Hearing you gasp or laugh at the same moments makes the distance between us completely disappear."
    },
    {
      title: "The Little Care Packages You Send",
      body: "Opening the mail to find my favorite snacks and a handwritten letter from you always brings tears to my eyes. It is a beautiful physical reminder of how deeply you love and care for me."
    },
    {
      title: "Your Passion for Your Hobbies",
      body: "Watching you light up while talking about your digital illustrations or new projects is incredibly inspiring. Your dedication to your creative pursuits is just one of the many reasons I fell for you."
    },
    {
      title: "The Way You Remember Small Details",
      body: "You always surprise me by bringing up a random passing comment I made weeks ago. It shows me how intently you listen and how much you genuinely value our conversations."
    },
    {
      title: "Your Sweet Voice Notes",
      body: "Sometimes I wake up to random voice recordings of you singing or just telling me about your day. I play them on repeat whenever I am missing you a little extra."
    },
    {
      title: "The Comfort of Your Advice",
      body: "You have an incredible ability to look at any problem I face with a calm and logical perspective. I can always rely on your quiet wisdom to help me navigate through stressful situations."
    },
    {
      title: "Dreaming About Our Future Together",
      body: "We spend hours talking about the day we finally close the gap and can share the same space permanently. Just the thought of building a life with you keeps me going through the toughest of times."
    }
  ];

  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : POLAROID_IMAGES.map((img, i) => ({
    title: `Memory #${i + 1}`,
    image: img,
    note: "A cherished moment forever in my heart."
  }));

  const letterTitle = data.letterTitle || "My Dearest,";
  const letterText = data.letterText || "My Dearest, I am writing this because words sometimes catch in my throat when I look at you, overwhelmed by how much you mean to me. Please keep this little note as a token of my heart—a small reminder of a love that belongs entirely to you, even when we are apart. Lately, the distance between us feels a little heavier, and I find myself yearning for you in the quietest moments of the day. I miss the simple warmth of your hand in mine, the soft sound of your laughter, and the way the world just makes sense whenever you are near. You are my peace, my constant joy, and the brightest part of my life. No matter where we are or how long the days feel before I can hold you again, please never forget how deeply, truly, and completely you are loved. You have my whole heart, today and for all the days to come. Forever and always yours, With all my love";

  const songsTitle = data.songsTitle || "Our Top Songs";
  const spotifyTracks = (data.spotifyTracks && data.spotifyTracks.length > 0) ? data.spotifyTracks : [
    "6Qyc6fS4DsZjB2mRW9DsQs",
    "7sapKrjDij2fpDVj0GxP66",
    "3vsNteZn6E5qBSSBO78W7b",
    "1EzrEOXmMH3G43AXT1y7pA",
    "1JSTJqkT5qHq8MDJnJbRE1"
  ];

  const endingQuote = data.endingQuote || "I love you, to the moon and back.";

  // Generate the 88-flower spiral swarm (11 cols x 8 rows + boundary offsets)
  const Pd = 11;
  const Fd = 8;
  const Id = 100 / Pd;
  const Ld = 100 / Fd;
  const Rd = 22; // 22vmax
  const Md = 4200; // spiral duration ms
  const Nd = 2600; // parting duration ms

  function buildFlowerList() {
    const list = [];
    for (let row = -1; row <= Fd; row++) {
      for (let col = -1; col <= Pd; col++) {
        const r = (row + 2) * 131 + (col + 2) * 17;
        const i = ((r * 9301 + 49297) % 233280) / 233280 - 0.5;
        const a = ((r * 4801 + 9973) % 233280) / 233280 - 0.5;
        const x = (col + 0.5) * Id + i * Id * 0.6;
        const y = (row + 0.5) * Ld + a * Ld * 0.6;
        const c = x - 50;
        const l = y - 50;
        const u = Math.max(0, 1 - Math.hypot(c, l) / 90) * (Md - 1100);
        list.push({
          x,
          y,
          img: FLOWER_IMAGES[Math.abs(r) % FLOWER_IMAGES.length],
          rot: (r * 37) % 360,
          spinMs: 5000 + (Math.abs(r) % 4000),
          spinDir: r % 2 === 0 ? 1 : -1,
          delay: Math.round(Md - 1100 - u),
          scale: 0.95 + (Math.abs(r) % 20) / 100
        });
      }
    }
    return list;
  }

  const flowerList = buildFlowerList();
  const leftFlowers = flowerList.filter(f => f.x < 50);
  const rightFlowers = flowerList.filter(f => f.x >= 50);

  // Play synthetic audio chime or error sound
  function playBloomTone(type = 'chime') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (type === 'tap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'unlock') {
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const start = ctx.currentTime + idx * 0.1;
          gain.gain.setValueAtTime(0.15, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
          osc.start(start);
          osc.stop(start + 0.6);
        });
      }
    } catch {
      // AudioContext unavailable
    }
  }

  // Pre-split letter words for scroll illumination
  const letterWords = letterText.trim().split(/\s+/);
  const isEditor = Boolean(window.isCelebrationEditorMode) || isMakerReview;

  // Render Template Root Structure
  container.innerHTML = `
    <div class="bloom-root" id="bloomRoot">
      <!-- Background Audio Player Slot -->
      <div id="bloomPlayerSlot" class="bloom-player-slot"></div>

      <!-- STAGE 1 & 2: PASSCODE GATE -->
      <section class="bloom-gate-wrap" id="bloomGateWrap" style="background-color: #fbf7f5; display: ${isEditor ? 'none' : 'flex'};">
        <div class="bloom-gate-container">
          <div class="bloom-gate-box" id="bloomGateBox">
            
            ${isEditor ? `
              <div class="bloom-creator-badge">
                <span>👁️ Creator Mode: Gate Preview</span>
                <button type="button" class="bloom-quick-unlock-btn" id="bloomQuickUnlockBtn">⚡ View Unlocked Content</button>
              </div>
            ` : ''}

            <div class="bloom-gate-header">
              <h1 class="bloom-gate-title">${gateGreeting}</h1>
              <p class="bloom-gate-sub">${gateSubtitle}</p>
            </div>

            <!-- 4-Dot Passcode Indicators -->
            <div class="bloom-pin-dots" id="bloomPinDots">
              <div class="bloom-pin-dot" data-index="0"></div>
              <div class="bloom-pin-dot" data-index="1"></div>
              <div class="bloom-pin-dot" data-index="2"></div>
              <div class="bloom-pin-dot" data-index="3"></div>
            </div>

            <!-- PIN Numpad -->
            <div class="bloom-numpad" id="bloomNumpad">
              ${['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => `
                <button type="button" class="bloom-num-btn" data-key="${num}">${num}</button>
              `).join('')}
              <button type="button" class="bloom-num-btn bloom-btn-action" data-key="backspace" aria-label="Delete">⌫</button>
              <button type="button" class="bloom-num-btn" data-key="0">0</button>
              <div class="bloom-num-btn-placeholder"></div>
            </div>

            <div class="bloom-gate-hint">
              <span>Default PIN: <strong>${targetPin}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <!-- FLOWER SWARM OVERLAY (Spiral & Parting Animations) -->
      <div class="bloom-flower-curtain" id="bloomFlowerCurtain" style="display: none;">
        <div class="bloom-curtain-half bloom-curtain-left" id="bloomCurtainLeft">
          ${leftFlowers.map((f, i) => {
            const dx = f.x - 50;
            const dy = f.y - 50;
            const dist = Math.hypot(dx, dy) || 1;
            const fromX = `${(dx / dist) * 70}vw`;
            const fromY = `${(dy / dist) * 70}vh`;
            return `
              <div class="bloom-flower-item" style="
                left: ${f.x}vw;
                top: ${f.y}vh;
                width: ${Rd}vmax;
                height: ${Rd}vmax;
                margin-left: -${Rd / 2}vmax;
                margin-top: -${Rd / 2}vmax;
                --fx-from-x: ${fromX};
                --fx-from-y: ${fromY};
                --fx-scale: ${f.scale};
                animation: flowerFlyIn 1100ms cubic-bezier(0.22, 0.61, 0.36, 1) ${f.delay}ms both;
              ">
                <div class="bloom-flower-spinner" style="
                  --fx-rot: ${f.rot}deg;
                  animation: ${f.spinDir === 1 ? 'spinCW' : 'spinCCW'} ${f.spinMs}ms linear infinite;
                ">
                  <img src="${f.img}" alt="" draggable="false" />
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="bloom-curtain-half bloom-curtain-right" id="bloomCurtainRight">
          ${rightFlowers.map((f, i) => {
            const dx = f.x - 50;
            const dy = f.y - 50;
            const dist = Math.hypot(dx, dy) || 1;
            const fromX = `${(dx / dist) * 70}vw`;
            const fromY = `${(dy / dist) * 70}vh`;
            return `
              <div class="bloom-flower-item" style="
                left: ${f.x}vw;
                top: ${f.y}vh;
                width: ${Rd}vmax;
                height: ${Rd}vmax;
                margin-left: -${Rd / 2}vmax;
                margin-top: -${Rd / 2}vmax;
                --fx-from-x: ${fromX};
                --fx-from-y: ${fromY};
                --fx-scale: ${f.scale};
                animation: flowerFlyIn 1100ms cubic-bezier(0.22, 0.61, 0.36, 1) ${f.delay}ms both;
              ">
                <div class="bloom-flower-spinner" style="
                  --fx-rot: ${f.rot}deg;
                  animation: ${f.spinDir === 1 ? 'spinCW' : 'spinCCW'} ${f.spinMs}ms linear infinite;
                ">
                  <img src="${f.img}" alt="" draggable="false" />
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- REVEALED CELEBRATION MASTERPIECE -->
      <main class="bloom-revealed-body" id="bloomRevealedBody" style="display: ${isEditor ? 'block' : 'none'};">
        ${isEditor ? `
          <div class="bloom-editor-floating-bar" style="position:sticky; top:12px; z-index:100; display:flex; justify-content:center; margin-bottom:12px;">
            <div style="background:rgba(54,15,90,0.92); backdrop-filter:blur(10px); color:#fff; padding:6px 14px; border-radius:9999px; box-shadow:0 8px 24px rgba(54,15,90,0.35); display:flex; align-items:center; gap:10px; font-size:12px; font-family:system-ui, sans-serif;">
              <span>🌸 <strong>Bloom Reveal:</strong> Live Preview</span>
              <button type="button" class="bloom-toggle-gate-btn" id="bloomToggleGateBtn" style="background:#ffcf6a; color:#360f5a; border:none; border-radius:9999px; padding:3px 10px; font-size:11px; font-weight:700; cursor:pointer;">🔒 Test PIN Gate</button>
            </div>
          </div>
        ` : ''}
        
        <!-- SECTION 1: 10 THINGS I LOVE ABOUT YOU -->
        <section class="bloom-section bloom-sec-reasons" id="bloomSecReasons" style="background-image: url('/bloom/hero-bg.jpeg');">
          <div class="bloom-section-inner">
            <h2 class="bloom-section-title">${reasonsTitle}</h2>
            <div class="bloom-reasons-grid">
              ${reasonsList.map((reason, idx) => `
                <div class="bloom-reason-card" data-idx="${idx}">
                  <button type="button" class="bloom-reason-btn" aria-expanded="false">
                    <span class="bloom-reason-heading">${idx + 1}. ${reason.title}</span>
                    <span class="bloom-reason-icon">+</span>
                  </button>
                  <div class="bloom-reason-body">
                    <p class="bloom-reason-text">${reason.body}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 2: CHERISHED MEMORIES (POLAROID PHOTO GALLERY) -->
        <section class="bloom-section bloom-sec-gallery" id="bloomSecGallery" style="background-color: #DDB8DD;">
          <div class="bloom-gallery-inner">
            <h2 class="bloom-section-title bloom-gallery-title">Memories With You 📷</h2>
            <div class="bloom-polaroids-grid">
              ${polaroids.map((p, idx) => {
                const tilt = POLAROID_TILTS[idx % POLAROID_TILTS.length];
                return `
                  <figure class="bloom-polaroid-card" style="--card-tilt: ${tilt}deg;" data-idx="${idx}">
                    <div class="bloom-polaroid-img-wrap">
                      <img src="${p.image}" alt="${p.title || 'Memory'}" loading="lazy" />
                    </div>
                    <figcaption class="bloom-polaroid-caption">
                      <span class="bloom-polaroid-title">${p.title || `Memory #${idx + 1}`}</span>
                      ${p.note ? `<span class="bloom-polaroid-note">${p.note}</span>` : ''}
                    </figcaption>
                  </figure>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 3: MY DEAREST (SCROLL-ILLUMINATED PARCHMENT LOVE LETTER) -->
        <section class="bloom-sec-letter" id="bloomSecLetter" style="background-image: url('/bloom/section3-bg.jpeg');">
          <div class="bloom-letter-sticky-frame">
            <div class="bloom-parchment-sheet">
              <h3 class="bloom-letter-salutation">${letterTitle}</h3>
              <div class="bloom-letter-words-flow" id="bloomLetterWordsFlow">
                ${letterWords.map((word, i) => `
                  <span class="bloom-letter-word" data-word-idx="${i}">${word}</span>
                `).join(' ')}
              </div>
              <div class="bloom-scroll-prompt-indicator">
                <span>↓ Scroll smoothly to illuminate words ↓</span>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: OUR TOP SONGS -->
        <section class="bloom-section bloom-sec-songs" id="bloomSecSongs" style="background: linear-gradient(180deg, #EDD9ED 0%, #d8bfe4 100%);">
          <div class="bloom-section-inner">
            <h2 class="bloom-section-title">${songsTitle}</h2>
            <div class="bloom-songs-grid">
              ${spotifyTracks.map(trackId => `
                <div class="bloom-song-card">
                  <iframe 
                    title="spotify-${trackId}"
                    src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                  </iframe>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 5: SWEET ENDING & TYPEWRITER DEVOTION -->
        <section class="bloom-section bloom-sec-ending" id="bloomSecEnding" style="background-image: url('/bloom/section5-bg.jpeg');">
          <div class="bloom-ending-inner">
            <div class="bloom-ending-quote-box">
              <h2 class="bloom-typewriter-text" id="bloomTypewriterText" data-full-text="${endingQuote}"></h2>
            </div>
          </div>
        </section>

        <!-- FLOATING RESTART ACTION BUTTON -->
        <button type="button" class="bloom-floating-restart-fab" id="bloomRestartFab" aria-label="Go to the start">
          <span>Go to the start 🌸</span>
        </button>

      </main>

      <!-- LIGHTBOX PHOTO MODAL -->
      <div class="bloom-lightbox-modal" id="bloomLightboxModal" style="display: none;">
        <div class="bloom-lightbox-backdrop" id="bloomLightboxBackdrop"></div>
        <div class="bloom-lightbox-content">
          <button type="button" class="bloom-lightbox-close" id="bloomLightboxClose">&times;</button>
          <img src="" id="bloomLightboxImg" alt="Enlarged Memory" />
          <p id="bloomLightboxCaption"></p>
        </div>
      </div>
    </div>
  `;

  // Initialize Elements
  const gateWrap = container.querySelector('#bloomGateWrap');
  const gateBox = container.querySelector('#bloomGateBox');
  const pinDots = container.querySelectorAll('.bloom-pin-dot');
  const numBtns = container.querySelectorAll('.bloom-num-btn');
  const curtain = container.querySelector('#bloomFlowerCurtain');
  const curtainLeft = container.querySelector('#bloomCurtainLeft');
  const curtainRight = container.querySelector('#bloomCurtainRight');
  const revealedBody = container.querySelector('#bloomRevealedBody');
  const restartFab = container.querySelector('#bloomRestartFab');
  const quickUnlockBtn = container.querySelector('#bloomQuickUnlockBtn');

  // Music Player Initialization
  try {
    const playerSlot = container.querySelector('#bloomPlayerSlot');
    if (playerSlot && data.audioSrc) {
      initMusicPlayer(playerSlot, data);
    }
  } catch (err) {
    console.warn('Bloom audio player init fallback:', err);
  }

  let enteredPin = '';
  let isLocked = true;
  let isBusyTransitioning = false;

  function updatePinDots() {
    pinDots.forEach((dot, idx) => {
      if (idx < enteredPin.length) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function handleKeyInput(digit) {
    if (isBusyTransitioning || !isLocked) return;
    if (enteredPin.length >= 4) return;

    playBloomTone('tap');
    enteredPin += digit;
    updatePinDots();

    if (enteredPin.length === 4) {
      if (enteredPin === targetPin) {
        // Correct PIN!
        playBloomTone('unlock');
        startBloomRevealSequence();
      } else {
        // Wrong PIN!
        playBloomTone('error');
        gateBox.classList.add('shake-error');
        setTimeout(() => {
          gateBox.classList.remove('shake-error');
          enteredPin = '';
          updatePinDots();
        }, 550);
      }
    }
  }

  function handleBackspace() {
    if (isBusyTransitioning || !isLocked) return;
    if (enteredPin.length > 0) {
      playBloomTone('tap');
      enteredPin = enteredPin.slice(0, -1);
      updatePinDots();
    }
  }

  numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-key');
      if (key === 'backspace') {
        handleBackspace();
      } else if (key) {
        handleKeyInput(key);
      }
    });
  });

  // Physical keyboard support
  function handleKeyDown(e) {
    if (!isLocked || isBusyTransitioning) return;
    if (/^[0-9]$/.test(e.key)) {
      handleKeyInput(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  // Quick Unlock (for Creator Mode)
  if (quickUnlockBtn) {
    quickUnlockBtn.addEventListener('click', () => {
      startBloomRevealSequence(true);
    });
  }

  const toggleGateBtn = container.querySelector('#bloomToggleGateBtn');
  if (toggleGateBtn) {
    toggleGateBtn.addEventListener('click', () => {
      revealedBody.style.display = 'none';
      gateWrap.style.display = 'flex';
      isLocked = true;
      enteredPin = '';
      updatePinDots();
    });
  }

  // If in editor mode, initialize revealed features immediately so preview chassis is active
  if (isEditor) {
    isLocked = false;
    initRevealedFeatures();
  }

  // REVEAL ANIMATION SEQUENCE
  function startBloomRevealSequence(isInstant = false) {
    if (isBusyTransitioning) return;
    isBusyTransitioning = true;
    isLocked = false;

    // Confetti celebration
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#360f5a', '#edd9ed', '#f43f5e', '#ffcf6a', '#a855f7']
      });
    } catch (e) {}

    if (isInstant) {
      gateWrap.style.display = 'none';
      revealedBody.style.display = 'block';
      isBusyTransitioning = false;
      initRevealedFeatures();
      return;
    }

    // Step 1: Show Flower Curtain Swarm (Spiral phase)
    curtain.style.display = 'block';

    setTimeout(() => {
      // Step 2: Parting Phase (Flowers separate left and right)
      curtainLeft.style.transition = `transform ${Nd}ms cubic-bezier(0.65, 0, 0.35, 1)`;
      curtainRight.style.transition = `transform ${Nd}ms cubic-bezier(0.65, 0, 0.35, 1)`;
      curtainLeft.style.transform = 'translate3d(-110%, 0, 0)';
      curtainRight.style.transform = 'translate3d(110%, 0, 0)';

      // Hide gate, show revealed website underneath
      gateWrap.style.display = 'none';
      revealedBody.style.display = 'block';

      setTimeout(() => {
        // Step 3: Complete Reveal
        curtain.style.display = 'none';
        isBusyTransitioning = false;
        initRevealedFeatures();
      }, Nd);

    }, Md);
  }

  // INITIALIZE INTERACTIVE FEATURES OF THE REVEALED EXPERIENCE
  function initRevealedFeatures() {
    // 1. Accordion Toggle
    const reasonCards = container.querySelectorAll('.bloom-reason-card');
    reasonCards.forEach(card => {
      const btn = card.querySelector('.bloom-reason-btn');
      btn.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');
        reasonCards.forEach(c => {
          c.classList.remove('is-open');
          c.querySelector('.bloom-reason-btn').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          card.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 2. Lightbox Modal for Polaroids
    const lightboxModal = container.querySelector('#bloomLightboxModal');
    const lightboxBackdrop = container.querySelector('#bloomLightboxBackdrop');
    const lightboxClose = container.querySelector('#bloomLightboxClose');
    const lightboxImg = container.querySelector('#bloomLightboxImg');
    const lightboxCaption = container.querySelector('#bloomLightboxCaption');

    container.querySelectorAll('.bloom-polaroid-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('.bloom-polaroid-title');
        const note = card.querySelector('.bloom-polaroid-note');
        if (img && lightboxModal) {
          lightboxImg.src = img.src;
          lightboxCaption.innerHTML = `<strong>${title ? title.textContent : ''}</strong>${note ? '<br>' + note.textContent : ''}`;
          lightboxModal.style.display = 'flex';
        }
      });
    });

    if (lightboxClose && lightboxModal) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
      });
      lightboxBackdrop.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
      });
    }

    // 3. Scroll-Illuminated Parchment Letter
    const secLetter = container.querySelector('#bloomSecLetter');
    const wordsFlow = container.querySelector('#bloomLetterWordsFlow');
    if (secLetter && wordsFlow) {
      const words = wordsFlow.querySelectorAll('.bloom-letter-word');
      const totalWords = words.length;

      function updateLetterScroll() {
        const rect = secLetter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Total scrollable range inside secLetter
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - windowHeight)));
        const activeCount = Math.round(progress * totalWords);

        words.forEach((span, i) => {
          if (i < activeCount) {
            span.classList.add('illuminated');
          } else {
            span.classList.remove('illuminated');
          }
        });
      }

      window.addEventListener('scroll', updateLetterScroll, { passive: true });
      updateLetterScroll();
    }

    // 4. Typewriter Ending Quote
    const typewriterEl = container.querySelector('#bloomTypewriterText');
    if (typewriterEl) {
      const fullText = typewriterEl.getAttribute('data-full-text') || endingQuote;
      let hasStartedTypewriter = false;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasStartedTypewriter) {
            hasStartedTypewriter = true;
            let currentLength = 0;
            typewriterEl.innerHTML = `<span class="bloom-typewriter-content"></span><span class="bloom-typewriter-cursor">|</span>`;
            const contentSpan = typewriterEl.querySelector('.bloom-typewriter-content');

            const timer = setInterval(() => {
              if (currentLength < fullText.length) {
                currentLength++;
                contentSpan.textContent = fullText.slice(0, currentLength);
              } else {
                clearInterval(timer);
              }
            }, 65);
          }
        });
      }, { threshold: 0.35 });

      observer.observe(typewriterEl);
    }

    // 5. Restart Button (Smooth scroll to top and reset)
    if (restartFab) {
      restartFab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          revealedBody.style.display = 'none';
          gateWrap.style.display = 'flex';
          curtain.style.display = 'none';
          curtainLeft.style.transform = 'translate3d(0, 0, 0)';
          curtainRight.style.transform = 'translate3d(0, 0, 0)';
          enteredPin = '';
          updatePinDots();
          isLocked = true;
          isBusyTransitioning = false;
        }, 600);
      });
    }
  }

  // Cleanup on destroy
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}
