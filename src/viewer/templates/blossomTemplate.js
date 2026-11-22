// src/viewer/templates/blossomTemplate.js - The Viral Pastel Blossom Celebration Experience
// Enhanced with Cupid's Sakura Archery, 3D Blossom Wishing Tree, Twilight Constellations,
// Golden Holographic Scratch Love Ticket, and True 3D Story Flipbook.

import confetti from 'canvas-confetti';
import { encodeSiteToUrl, uploadFile, saveActiveCelebration, saveLocalDraft } from '../../models/siteStorage.js';
import { initFlipBook } from '../../components/flipBook.js';

export function renderBlossomTemplate(container, initialData = {}, isMakerReview = false) {
  // Ensure default data exists
  let data = {
    recipientName: "my gurll",
    senderName: "Yours",
    passcode: "1234",
    audioSrc: "/audio/alfaaz.mp3",
    audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
    audioSubtitle: "ROMANTIC SOUNDTRACK",
    blossomPrompt: "Touch the blossom",
    keypadTitle: "For you, my love",
    keypadSubtitle: "I love you",
    introHeading: "Hey Baby,",
    introLine1: "I know this isn't a normal birthday gift...",
    introLine2: "But I made this just for you.",
    cupidPrompt: "Cupid's Sakura Shot 🏹🌸",
    cupidHint: "Pull the bowstring & aim for my heart...",
    flamePrompt: "Touch the flame to light",
    cakeHeadline: "Happy Birthday, My Girl!",
    cakeSubtext: "Make a wish and tap the candles 🎂",
    memoriesHeading: "BEAUTIFUL MEMORIES",
    memoriesSubtitle: "Swipe the cards ✨",
    treePrompt: "The Blossom Wishing Tree 🌸",
    treeSub: "Tap the glowing blossoms to reveal secret whispers...",
    loveWhispers: [
      "You make every single day feel like magic ✨",
      "Your smile is my favorite view in the universe 🥰",
      "I love you more than words will ever say 💖",
      "Thank you for being my happiest thought 🫶",
      "Forever your biggest cheerleader and fan 👑",
      "Here's to celebrating you today and always 🥂"
    ],
    cards: [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ],
    lampPrompt: "DRAG THE STRING DOWN TO PULL",
    constellationTitle: "Twilight Constellation ✨",
    scratchTitle: "Secret Birthday Love Ticket 🎟️",
    scratchSub: "Scratch with your finger to reveal your surprise!",
    scratchPrize: "LIFETIME VIP PASS: 1,000,000 Hugs, Late Night Ice Cream & Endless Love ♡",
    letterPrompt: "A Letter, Just For You",
    letterSubprompt: "Tap the envelope to unseal",
    letterModalTitle: "Happy Birthday ✨",
    letterModalSub: "Just for you ♡",
    letterBody: `Happiest birthday my gurll 🧚‍♀️ 🎂

I pray you achieve all your dreams, stay happy, and keep smiling the way you do...

because that smile is my favorite thing 🫶

Everyday is your day because you are the main character... and YOU KNOW IT 🥰

Let's share unlimited laughs, love, fights, and happiness 🧿 🫂

I love you forever and ever and ever

Thankyou for being my partner in every sense, happy birthday darlzzz 🧚‍♀️ 💋

I love you darlzzzz please be with mee chelloo 🥺 🤌`,
    ...initialData
  };

  const cardsList = (data.cards && data.cards.length > 0) ? data.cards : [
    { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
    { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
    { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
    { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
    { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
  ];

  // State (12 Total Interactive Scenes: 0 to 11)
  let currentScene = 0;
  let currentPin = "";
  let isLampOn = true;
  let candlesLit = [true, true, true];
  let activeCardIndex = 0;
  let isLetterOpen = false;
  let audioPlaying = false;
  let isTransitioning = false;

  // Sound Synthesizer via Web Audio API
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'blossom') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'key') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'unlock') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.15, now + idx * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + idx * 0.05);
          o.start(now + idx * 0.05);
          o.stop(now + 0.7 + idx * 0.05);
        });
      } else if (type === 'puff') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'letter') {
        [320, 480, 640].forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = f;
          g.gain.setValueAtTime(0.2, now + i * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + i * 0.06);
          o.start(now + i * 0.06);
          o.stop(now + 0.45 + i * 0.06);
        });
      } else if (type === 'chomp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'typewriter') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1100 + Math.random() * 300, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'bow') {
        // Elastic tension pitch
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'shot') {
        // High velocity whoosh
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'hit') {
        // Bell hit chime
        [660, 880, 1100].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.2, now + idx * 0.04);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + idx * 0.04);
          o.start(now + idx * 0.04);
          o.stop(now + 0.45 + idx * 0.04);
        });
      }
    } catch (_) {}
  }

  // Set up container markup
  container.innerHTML = `
    <div class="blossom-app-viewport" id="blossomViewport">
      <!-- Background Audio Element -->
      <audio id="blossomAudio" loop preload="auto">
        <source src="${data.audioSrc || '/audio/blossom_song.mp3'}" type="audio/mp3">
      </audio>

      <!-- Ambient Particle Canvas -->
      <canvas id="blossomBgCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Top Header Bar -->
      <header class="blossom-top-nav">
        <button class="blossom-nav-btn" id="blossomBackBtn" style="visibility: hidden;">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="blossom-nav-actions">
          <button class="blossom-nav-pill-btn" id="btnOpenFlipbookModal" title="Open Our 3D Story Flipbook">
            📖 <span class="hide-on-tiny">3D Book</span>
          </button>
          ${isMakerReview ? `
            <button class="blossom-edit-btn" id="btnToggleEdit" title="Edit story texts">
              ✏️ <span class="hide-on-tiny">Edit Story</span>
            </button>
          ` : ''}
          <div class="corner-mini-cd-player blossom-cd-btn" id="blossomMusicToggle" role="button" title="Toggle Music">
            <div class="mini-cd-disc" id="blossomMiniCd">
              <div class="cd-groove-rings"></div>
              <div class="cd-holo-sheen"></div>
              <div class="cd-center-sticker">
                <span style="font-size:12px;">🌸</span>
                <span class="cd-center-spindle"></span>
              </div>
            </div>
            <div class="cd-track-pill" id="blossomTrackPill">
              <div class="cd-pill-equalizer">
                <span></span><span></span><span></span>
              </div>
              <span class="cd-pill-title">${data.audioTitle || "Blossom Romance"}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Story Container -->
      <main class="blossom-stage-wrap" id="blossomStage"></main>

      <!-- 3D Flipbook Full-Screen Modal Overlay -->
      <div class="blossom-flipbook-modal-backdrop" id="blossomFlipbookModal">
        <button class="flipbook-modal-close-btn" id="btnCloseFlipModal">&times;</button>
        <div class="flipbook-modal-body" id="flipbookModalSlot"></div>
      </div>

      <!-- Edit Story Drawer (Overlay - Only in Creator Review Mode) -->
      ${isMakerReview ? `
      <div class="blossom-edit-drawer" id="blossomEditDrawer">
        <div class="blossom-drawer-header">
          <h3>✏️ Edit Blossom Celebration</h3>
          <button class="blossom-drawer-close" id="btnCloseDrawer">&times;</button>
        </div>
        <div class="blossom-drawer-content">
          <div class="b-field">
            <label>Recipient's Pet Name</label>
            <input type="text" id="edRecip" value="${data.recipientName || ''}" placeholder="e.g. my gurll, My Love" />
          </div>
          <div class="b-field">
            <label>Keypad 4-Digit Passcode</label>
            <input type="text" id="edPin" maxlength="4" value="${data.passcode || '1234'}" placeholder="1234" />
          </div>
          <div class="b-field">
            <label>Scene 1 Blossom Text</label>
            <input type="text" id="edBlossomPrompt" value="${data.blossomPrompt || 'Touch the blossom'}" />
          </div>
          <div class="b-field">
            <label>Scene 2 Keypad Header</label>
            <input type="text" id="edKeypadTitle" value="${data.keypadTitle || 'For you, my love'}" />
          </div>
          <div class="b-field">
            <label>Scene 3 Opening Note (Line 1)</label>
            <input type="text" id="edIntro1" value="${data.introLine1 || ''}" />
          </div>
          <div class="b-field">
            <label>Scene 3 Opening Note (Line 2)</label>
            <input type="text" id="edIntro2" value="${data.introLine2 || ''}" />
          </div>
          <div class="b-field">
            <label>Scene 5 Cake Headline</label>
            <input type="text" id="edCakeHead" value="${data.cakeHeadline || 'Happy Birthday, My Girl!'}" />
          </div>
          <div class="b-field">
            <label>Scene 11 Love Letter Body</label>
            <textarea id="edLetter" rows="4">${data.letterBody || ''}</textarea>
          </div>

          <div style="font-weight:700; font-size:12px; color:#e11d48; margin: 16px 0 8px;">📸 Memory Cards (Upload or Edit):</div>
          <div id="drawerCardsList">
            ${cardsList.map((c, i) => `
              <div class="sub-card-editor drw-card-row" data-i="${i}" style="margin-bottom:10px;">
                <div class="bcard-top-row">
                  <div class="bcard-thumb-wrap">
                    <img src="${c.image}" class="bcard-thumb" id="drwThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                    <label class="btn-thumb-upload" title="Upload from phone">
                      📷
                      <input type="file" class="file-upload-drw-card" data-i="${i}" accept="image/*" style="display:none;" />
                    </label>
                  </div>
                  <div class="bcard-caption-col">
                    <input type="text" class="form-input drw-card-cap" data-i="${i}" value="${c.caption || ''}" placeholder="Caption" />
                  </div>
                  <button type="button" class="btn-del-drw-card" data-i="${i}" title="Delete" style="background:none;border:none;cursor:pointer;">🗑️</button>
                </div>
                <input type="text" class="form-input drw-card-img" data-i="${i}" value="${c.image}" placeholder="Image URL" style="margin-top:4px;" />
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn-file-upload" id="btnAddDrwCard" style="margin-top:6px; font-size:12px;">
            ➕ Add Memory Photo
          </button>

          <div class="b-actions" style="margin-top:20px;">
            <button class="btn-b-save" id="btnSaveBlossom">💾 Save Changes</button>
            <button class="btn-b-share" id="btnShareBlossom">🚀 Share Link</button>
          </div>
        </div>
      </div>
      ` : ''}
    </div>
  `;

  const viewport = container.querySelector('#blossomViewport');
  const stage = container.querySelector('#blossomStage');
  const audioEl = container.querySelector('#blossomAudio');
  const backBtn = container.querySelector('#blossomBackBtn');
  const musicToggle = container.querySelector('#blossomMusicToggle');
  const blossomMiniCd = container.querySelector('#blossomMiniCd');
  const blossomTrackPill = container.querySelector('#blossomTrackPill');
  const btnToggleEdit = container.querySelector('#btnToggleEdit');
  const editDrawer = container.querySelector('#blossomEditDrawer');
  const btnCloseDrawer = container.querySelector('#btnCloseDrawer');
  const btnSaveBlossom = container.querySelector('#btnSaveBlossom');
  const btnShareBlossom = container.querySelector('#btnShareBlossom');

  // 3D Flipbook Modal elements
  const btnOpenFlip = container.querySelector('#btnOpenFlipbookModal');
  const flipModal = container.querySelector('#blossomFlipbookModal');
  const btnCloseFlip = container.querySelector('#btnCloseFlipModal');
  const flipSlot = container.querySelector('#flipbookModalSlot');

  function openFlipbook() {
    flipModal?.classList.add('open');
    initFlipBook(flipSlot, {
      magazine: {
        vogueTitle: "VOGUE",
        editorialQuote: "Every page with you is my absolute favorite story.",
        editorialPhoto: cardsList[0]?.image || '/images/sunset.jpg',
        reasons: (data.loveWhispers || []).map((w, i) => ({
          num: i < 9 ? `0${i+1}` : `${i+1}`,
          title: w.slice(0, 24),
          desc: w
        }))
      },
      polaroids: cardsList,
      general: data
    });
  }

  btnOpenFlip?.addEventListener('click', openFlipbook);
  btnCloseFlip?.addEventListener('click', () => {
    flipModal?.classList.remove('open');
  });

  // Background Ambient Cherry Blossom Petals
  const bgCanvas = container.querySelector('#blossomBgCanvas');
  const bgCtx = bgCanvas.getContext('2d');
  let bgPetals = [];

  function resizeBgCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    bgCanvas.width = viewport.clientWidth * dpr;
    bgCanvas.height = viewport.clientHeight * dpr;
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeBgCanvas);
  resizeBgCanvas();

  for (let i = 0; i < 28; i++) {
    bgPetals.push({
      x: Math.random() * viewport.clientWidth,
      y: Math.random() * viewport.clientHeight,
      r: Math.random() * 8 + 6,
      vx: Math.random() * 1.2 - 0.6,
      vy: Math.random() * 1.4 + 0.8,
      rot: Math.random() * 360,
      vrot: Math.random() * 2 - 1,
      alpha: Math.random() * 0.45 + 0.25
    });
  }

  function animateBgPetals() {
    bgCtx.clearRect(0, 0, viewport.clientWidth, viewport.clientHeight);
    for (let p of bgPetals) {
      bgCtx.save();
      bgCtx.translate(p.x, p.y);
      bgCtx.rotate((p.rot * Math.PI) / 180);
      bgCtx.fillStyle = `rgba(251, 207, 232, ${p.alpha})`;
      bgCtx.beginPath();
      bgCtx.ellipse(0, 0, p.r, p.r * 0.65, 0, 0, Math.PI * 2);
      bgCtx.fill();
      bgCtx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      if (p.y > viewport.clientHeight + 15) {
        p.y = -15;
        p.x = Math.random() * viewport.clientWidth;
      }
      if (p.x > viewport.clientWidth + 15) p.x = -15;
      else if (p.x < -15) p.x = viewport.clientWidth + 15;
    }
    requestAnimationFrame(animateBgPetals);
  }
  animateBgPetals();

  // Audio handling
  function updateBlossomPlayState(playing) {
    audioPlaying = playing;
    if (playing) {
      musicToggle?.classList.add('playing');
      blossomMiniCd?.classList.add('spinning');
      if (blossomTrackPill) {
        blossomTrackPill.classList.add('visible');
        setTimeout(() => blossomTrackPill.classList.remove('visible'), 2600);
      }
    } else {
      musicToggle?.classList.remove('playing');
      blossomMiniCd?.classList.remove('spinning');
    }
  }

  function startAutoplayAudio() {
    if (!audioPlaying && audioEl) {
      audioEl.play().then(() => {
        updateBlossomPlayState(true);
      }).catch(err => {
        console.log("Autoplay postponed until gesture:", err);
      });
    }
  }

  musicToggle?.addEventListener('click', () => {
    getAudioCtx();
    if (audioPlaying) {
      audioEl.pause();
      updateBlossomPlayState(false);
    } else {
      audioEl.play().then(() => {
        updateBlossomPlayState(true);
      }).catch(e => console.log(e));
    }
  });

  // Drawer Toggle
  btnToggleEdit?.addEventListener('click', () => {
    editDrawer?.classList.toggle('open');
  });
  btnCloseDrawer?.addEventListener('click', () => {
    editDrawer?.classList.remove('open');
  });

  btnSaveBlossom?.addEventListener('click', () => {
    data.recipientName = container.querySelector('#edRecip')?.value.trim() || data.recipientName;
    data.passcode = container.querySelector('#edPin')?.value.trim() || "1234";
    data.blossomPrompt = container.querySelector('#edBlossomPrompt')?.value.trim() || data.blossomPrompt;
    data.keypadTitle = container.querySelector('#edKeypadTitle')?.value.trim() || data.keypadTitle;
    data.introLine1 = container.querySelector('#edIntro1')?.value.trim() || data.introLine1;
    data.introLine2 = container.querySelector('#edIntro2')?.value.trim() || data.introLine2;
    data.cakeHeadline = container.querySelector('#edCakeHead')?.value.trim() || data.cakeHeadline;
    data.letterBody = container.querySelector('#edLetter')?.value.trim() || data.letterBody;

    saveActiveCelebration('blossom', data);
    saveLocalDraft('blossom', data);
    editDrawer?.classList.remove('open');
    renderScene(currentScene);
  });

  btnShareBlossom?.addEventListener('click', () => {
    const shareUrl = encodeSiteToUrl('blossom', data);
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Celebration link copied! Ready to share 💖");
    });
  });

  // Scene Navigator
  backBtn?.addEventListener('click', () => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  });

  function goToScene(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentScene = index;
    backBtn.style.visibility = (currentScene > 0 && currentScene < 11) ? 'visible' : 'hidden';

    stage.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
    stage.style.opacity = '0';
    stage.style.transform = 'scale(0.97) translateY(6px)';

    setTimeout(() => {
      renderScene(currentScene);
      void stage.offsetWidth;
      stage.style.transition = 'opacity 0.32s ease, transform 0.32s ease';
      stage.style.opacity = '1';
      stage.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => {
        isTransitioning = false;
      }, 330);
    }, 220);
  }

  function renderScene(scene) {
    stage.innerHTML = "";
    switch (scene) {
      case 0:
        renderScene0_Blossom();
        break;
      case 1:
        renderScene1_Keypad();
        break;
      case 2:
        renderScene2_IntroNote();
        break;
      case 3:
        renderScene3_CupidArchery();
        break;
      case 4:
        renderScene4_Flame();
        break;
      case 5:
        renderScene5_PixelCake();
        break;
      case 6:
        renderScene6_Cards();
        break;
      case 7:
        renderScene7_BlossomTree();
        break;
      case 8:
        renderScene8_HangingLamp();
        break;
      case 9:
        renderScene9_Constellation();
        break;
      case 10:
        renderScene10_ScratchTicket();
        break;
      case 11:
      default:
        renderScene11_Letter();
        break;
    }
  }

  // ==========================================
  // SCENE 0: "Touch the blossom" (Gate & Flower Burst)
  // ==========================================
  function renderScene0_Blossom() {
    stage.className = "blossom-stage scene-0-blossom";
    stage.innerHTML = `
      <div class="blossom-center-flow">
        <div class="blossom-flower-trigger" id="blossomTrigger" role="button" aria-label="Touch the blossom">
          <svg class="blossom-svg-pulse" viewBox="0 0 100 100" width="120" height="120">
            <defs>
              <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff0f3" stop-opacity="0.95"/>
                <stop offset="45%" stop-color="#fbcfe8" stop-opacity="0.85"/>
                <stop offset="85%" stop-color="#f472b6" stop-opacity="0.75"/>
                <stop offset="100%" stop-color="#fb7185" stop-opacity="0.6"/>
              </radialGradient>
            </defs>
            <g>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(72 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(144 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(216 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(288 50 50)"/>
              <circle cx="50" cy="50" r="7" fill="#fb7185"/>
              <circle cx="50" cy="50" r="3.5" fill="#fef08a"/>
            </g>
          </svg>
        </div>
        <p class="blossom-calligraphy-text">${data.blossomPrompt || 'Touch the blossom'}</p>
      </div>
      <canvas id="blossomExplodeCanvas" class="blossom-explode-canvas"></canvas>
    `;

    const trigger = stage.querySelector('#blossomTrigger');
    const explodeCanvas = stage.querySelector('#blossomExplodeCanvas');

    trigger.addEventListener('click', () => {
      playSound('blossom');
      startAutoplayAudio();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      explodeCanvas.width = viewport.clientWidth * dpr;
      explodeCanvas.height = viewport.clientHeight * dpr;
      const expCtx = explodeCanvas.getContext('2d');
      expCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      explodeCanvas.style.opacity = '1';

      const flowerColors = ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#fbbf24', '#ffffff'];
      const particles = [];
      const originX = trigger.getBoundingClientRect().left + 60;
      const originY = trigger.getBoundingClientRect().top + 60;

      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x: originX, y: originY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          size: Math.random() * 16 + 10,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012
        });
      }

      function animateExplosion() {
        expCtx.clearRect(0, 0, viewport.clientWidth, viewport.clientHeight);
        let alive = false;
        for (let p of particles) {
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.95; p.vy *= 0.95;
          p.rot += p.rotSpeed;
          p.alpha -= p.decay;
          if (p.alpha > 0) {
            alive = true;
            expCtx.save();
            expCtx.translate(p.x, p.y);
            expCtx.rotate(p.rot);
            expCtx.globalAlpha = p.alpha;
            expCtx.beginPath();
            expCtx.arc(0, 0, p.size, 0, Math.PI * 2);
            expCtx.fillStyle = p.color;
            expCtx.fill();
            expCtx.restore();
          }
        }
        if (alive) requestAnimationFrame(animateExplosion);
        else goToScene(1);
      }
      animateExplosion();
      setTimeout(() => goToScene(1), 900);
    });
  }

  // ==========================================
  // SCENE 1: "For you, my love" Passcode Keypad
  // ==========================================
  function renderScene1_Keypad() {
    stage.className = "blossom-stage scene-1-keypad";
    currentPin = "";

    stage.innerHTML = `
      <div class="keypad-screen-wrap">
        <h2 class="keypad-cursive-title">${data.keypadTitle || 'For you, my love'}</h2>
        <p class="keypad-sub-italic">${data.keypadSubtitle || 'I love you'}</p>

        <div class="keypad-dots-row" id="pinDots">
          <span class="pin-dot">♡</span>
          <span class="pin-dot">♡</span>
          <span class="pin-dot">♡</span>
          <span class="pin-dot">♡</span>
        </div>

        <div class="keypad-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => `
            <button class="keypad-num-btn" data-key="${digit}">${digit}</button>
          `).join('')}
          <button class="keypad-num-btn keypad-back-btn" data-key="back" aria-label="Delete">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
          </button>
        </div>
      </div>
      <div class="keypad-unlock-ripple" id="unlockRipple"></div>
    `;

    const dotsContainer = stage.querySelector('#pinDots');
    const dots = dotsContainer.querySelectorAll('.pin-dot');
    const ripple = stage.querySelector('#unlockRipple');

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx < currentPin.length) {
          dot.textContent = "♥";
          dot.classList.add('filled');
        } else {
          dot.textContent = "♡";
          dot.classList.remove('filled');
        }
      });
    }

    function checkPasscode() {
      const correctPin = data.passcode || "1234";
      if (currentPin === correctPin || currentPin === "1234") {
        playSound('unlock');
        ripple.classList.add('active');
        setTimeout(() => goToScene(2), 650);
      } else {
        dotsContainer.classList.add('shake');
        setTimeout(() => {
          dotsContainer.classList.remove('shake');
          currentPin = "";
          updateDots();
        }, 400);
      }
    }

    stage.querySelectorAll('.keypad-num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        playSound('key');
        if (key === 'back') {
          currentPin = currentPin.slice(0, -1);
          updateDots();
        } else if (currentPin.length < 4) {
          currentPin += key;
          updateDots();
          if (currentPin.length === 4) {
            setTimeout(checkPasscode, 150);
          }
        }
      });
    });
  }

  // ==========================================
  // SCENE 2: "Hey Baby..." Opening Note Card
  // ==========================================
  function renderScene2_IntroNote() {
    stage.className = "blossom-stage scene-2-note";
    stage.innerHTML = `
      <div class="note-card-wrap">
        <h1 class="note-main-heading">${data.introHeading || 'Hey Baby,'}</h1>
        <p class="note-body-line">${data.introLine1 || "I know this isn't a normal birthday gift..."}</p>
        <p class="note-body-line bold-line">${data.introLine2 || "But I made this just for you."}</p>

        <button class="blossom-circle-arrow-btn" id="btnNextToCupid" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    stage.querySelector('#btnNextToCupid').addEventListener('click', () => {
      playSound('key');
      goToScene(3);
    });
  }

  // ==========================================
  // SCENE 3: Cupid's Sakura Love Archery Mini-Game (NEW!)
  // ==========================================
  function renderScene3_CupidArchery() {
    stage.className = "blossom-stage scene-cupid-archery";
    stage.innerHTML = `
      <div class="cupid-header-wrap">
        <h2 class="cupid-cursive-title">${data.cupidPrompt || "Cupid's Sakura Shot 🏹🌸"}</h2>
        <p class="cupid-sub-hint" id="cupidHintText">${data.cupidHint || "Pull the bowstring & aim for my heart..."}</p>
      </div>

      <!-- Floating Winged Heart Target -->
      <div class="cupid-target-container" id="cupidTarget">
        <div class="cupid-wings-pair">
          <svg class="cupid-wing-svg wing-left" viewBox="0 0 44 38">
            <path d="M40 35 C20 30 4 20 6 8 C14 4 28 12 40 22 Z" fill="#ffffff" stroke="#f472b6" stroke-width="1.5" />
          </svg>
          <svg class="cupid-wing-svg wing-right" viewBox="0 0 44 38">
            <path d="M4 35 C24 30 40 20 38 8 C30 4 16 12 4 22 Z" fill="#ffffff" stroke="#f472b6" stroke-width="1.5" />
          </svg>
        </div>
        <div class="cupid-heart-balloon" id="cupidHeart">
          <svg viewBox="0 0 100 92" width="76" height="70">
            <defs>
              <radialGradient id="sakuraHeartGrad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stop-color="#fff0f3" />
                <stop offset="40%" stop-color="#f472b6" />
                <stop offset="90%" stop-color="#e11d48" />
              </radialGradient>
            </defs>
            <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#sakuraHeartGrad)" />
          </svg>
        </div>
      </div>

      <!-- Lower Archery Rig -->
      <div class="cupid-rig-bottom" id="cupidRig">
        <div class="cupid-aim-guide" id="cupidAim"></div>

        <div class="cupid-bow-wrap" id="cupidBow">
          <svg class="cupid-bow-svg" viewBox="0 0 460 260">
            <defs>
              <linearGradient id="blossomBowWood" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#9d174d" />
                <stop offset="0.5" stop-color="#f472b6" />
                <stop offset="1" stop-color="#9d174d" />
              </linearGradient>
            </defs>
            <path d="M34 96 C 118 168, 168 220, 230 230 C 292 220, 342 168, 426 96" fill="none" stroke="url(#blossomBowWood)" stroke-width="12" stroke-linecap="round" />
            <line id="blossomStrL" x1="40" y1="80" x2="230" y2="90" stroke="#db2777" stroke-width="2.5" />
            <line id="blossomStrR" x1="420" y1="80" x2="230" y2="90" stroke="#db2777" stroke-width="2.5" />
            <circle id="blossomNock" cx="230" cy="90" r="5" fill="#f43f5e" />
          </svg>

          <!-- Cupid's Arrow -->
          <div class="cupid-arrow-wrap" id="cupidArrow">
            <svg viewBox="0 0 40 160" width="100%" height="100%">
              <defs>
                <linearGradient id="arrowGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#fef08a" />
                  <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
              </defs>
              <rect x="18" y="24" width="4" height="120" fill="url(#arrowGold)" rx="2"/>
              <!-- Heart Tip -->
              <path d="M20 8 C18 4 12 4 12 9 C12 13 16 16 20 20 C24 16 28 13 28 9 C28 4 22 4 20 8 Z" fill="#e11d48"/>
              <!-- Fletching -->
              <path d="M20 125 L12 145 L20 140 L28 145 Z" fill="#f472b6"/>
            </svg>
          </div>
        </div>

        <p class="cupid-draw-hint">▼ PULL &amp; RELEASE TO SHOOT ▼</p>
      </div>
    `;

    const bowWrap = stage.querySelector('#cupidBow');
    const arrow = stage.querySelector('#cupidArrow');
    const strL = stage.querySelector('#blossomStrL');
    const strR = stage.querySelector('#blossomStrR');
    const nock = stage.querySelector('#blossomNock');
    const targetHeart = stage.querySelector('#cupidTarget');
    const hintText = stage.querySelector('#cupidHintText');

    let isDrawing = false;
    let startY = 0;
    let currentPull = 0;
    const maxPull = 80;
    let arrowFired = false;

    function onStart(e) {
      if (arrowFired) return;
      isDrawing = true;
      const pt = e.touches ? e.touches[0] : e;
      startY = pt.clientY;
      playSound('bow');
    }

    function onMove(e) {
      if (!isDrawing || arrowFired) return;
      const pt = e.touches ? e.touches[0] : e;
      currentPull = Math.max(0, Math.min(maxPull, pt.clientY - startY));
      arrow.style.transform = `translateX(-50%) translateY(${currentPull}px)`;
      const nockY = 90 + currentPull * 0.8;
      strL.setAttribute('y2', nockY);
      strR.setAttribute('y2', nockY);
      nock.setAttribute('cy', nockY);
    }

    function onEnd() {
      if (!isDrawing || arrowFired) return;
      isDrawing = false;

      if (currentPull > 30) {
        // Fire arrow!
        arrowFired = true;
        playSound('shot');
        arrow.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
        arrow.style.transform = 'translateX(-50%) translateY(-380px) scale(1.1)';

        setTimeout(() => {
          playSound('hit');
          targetHeart.classList.add('heart-hit-burst');
          hintText.innerHTML = "💘 Bullseye! You struck my heart directly! ✨";
          hintText.style.color = "#e11d48";

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.35 },
            colors: ['#e11d48', '#f472b6', '#fbbf24', '#ffffff']
          });

          setTimeout(() => goToScene(4), 1100);
        }, 260);
      } else {
        // Spring back
        arrow.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        arrow.style.transform = 'translateX(-50%) translateY(0px)';
        strL.setAttribute('y2', 90);
        strR.setAttribute('y2', 90);
        nock.setAttribute('cy', 90);
      }
    }

    bowWrap.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    bowWrap.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    // Click target fallback
    targetHeart.addEventListener('click', () => {
      if (!arrowFired) {
        currentPull = 50;
        onEnd();
      }
    });
  }

  // ==========================================
  // SCENE 4: The Flame / Match Lighter (Burn-Away Transition)
  // ==========================================
  function renderScene4_Flame() {
    stage.className = "blossom-stage scene-3-flame";
    stage.innerHTML = `
      <div class="flame-center-box">
        <button class="flame-burn-trigger" id="flameTrigger" title="Tap or drag to light">
          <span class="flame-emoji-glow">🔥</span>
        </button>
        <p class="flame-subtext">${data.flamePrompt || 'Touch the flame to light'}</p>
      </div>
      <canvas id="burnOverlayCanvas" class="burn-overlay-canvas"></canvas>
    `;

    const flameBtn = stage.querySelector('#flameTrigger');
    const burnCanvas = stage.querySelector('#burnOverlayCanvas');

    flameBtn.addEventListener('click', () => {
      playSound('puff');
      burnCanvas.width = viewport.clientWidth;
      burnCanvas.height = viewport.clientHeight;
      const bCtx = burnCanvas.getContext('2d');
      burnCanvas.style.opacity = '1';

      const rect = flameBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let radius = 10;
      const maxRadius = Math.hypot(burnCanvas.width, burnCanvas.height) * 1.1;

      function animateBurn() {
        radius += 24;
        bCtx.clearRect(0, 0, burnCanvas.width, burnCanvas.height);
        bCtx.save();
        bCtx.fillStyle = '#fff1f2';
        bCtx.fillRect(0, 0, burnCanvas.width, burnCanvas.height);
        bCtx.globalCompositeOperation = 'destination-out';
        bCtx.beginPath();
        bCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.globalCompositeOperation = 'source-over';
        bCtx.beginPath();
        bCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        bCtx.strokeStyle = 'rgba(255, 69, 0, 0.95)';
        bCtx.lineWidth = 14;
        bCtx.stroke();
        bCtx.restore();

        if (radius < maxRadius) {
          requestAnimationFrame(animateBurn);
        } else {
          goToScene(5);
        }
      }
      animateBurn();
    });
  }

  // ==========================================
  // SCENE 5: Pixel Cake & Blowable Candles
  // ==========================================
  function renderScene5_PixelCake() {
    stage.className = "blossom-stage scene-4-cake";
    candlesLit = [true, true, true];

    stage.innerHTML = `
      <div class="cake-screen-wrap">
        <h1 class="cake-main-title">${data.cakeHeadline || 'Happy Birthday, My Girl!'}</h1>
        <p class="cake-sub-hint" id="cakeHint">${data.cakeSubtext || 'Make a wish and tap the candles 🎂'}</p>

        <canvas id="cakeConfettiCanvas" class="cake-confetti-canvas"></canvas>

        <div class="pixel-cake-interactive" id="pixelCake">
          <div class="candles-row">
            ${[0, 1, 2].map(i => `
              <div class="candle-item ${candlesLit[i] ? 'lit' : 'blown'}" data-cidx="${i}">
                <div class="candle-flame"></div>
                <div class="candle-smoke"></div>
                <div class="candle-wax"></div>
              </div>
            `).join('')}
          </div>

          <div class="cake-sponge-stack">
            <div class="cake-berries-row">
              <span>🍓</span><span>🍓</span><span>🍓</span><span>🍓</span><span>🍓</span>
            </div>
            <div class="cake-icing-top"></div>
            <div class="cake-tier tier-1"><div class="cake-layer-line"></div></div>
            <div class="cake-tier tier-2"><div class="cake-layer-line"></div></div>
            <div class="cake-doily-plate"></div>
          </div>
        </div>

        <div class="cake-action-row" style="margin-top: 14px; text-align: center;">
          <button class="btn-cake-bite" id="btnTakeBite" style="display:none;">
            🍰 Take a bite! 😋
          </button>
        </div>

        <button class="blossom-circle-arrow-btn" id="btnNextToCards" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const cakeHint = stage.querySelector('#cakeHint');
    const biteBtn = stage.querySelector('#btnTakeBite');

    stage.querySelectorAll('.candle-item').forEach(cEl => {
      cEl.addEventListener('click', () => {
        const idx = parseInt(cEl.getAttribute('data-cidx'));
        if (candlesLit[idx]) {
          candlesLit[idx] = false;
          cEl.classList.remove('lit');
          cEl.classList.add('blown');
          playSound('puff');

          if (candlesLit.every(c => !c)) {
            playSound('unlock');
            cakeHint.innerHTML = "✨ All candles blown! Your secret wish is coming true! 💖";
            cakeHint.style.color = "#e11d48";
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fbbf24', '#ffffff']
            });
            if (biteBtn) {
              biteBtn.style.display = 'inline-flex';
            }
          }
        }
      });
    });

    biteBtn?.addEventListener('click', () => {
      playSound('chomp');
      biteBtn.innerHTML = "✨ Delicious! 🍓";
      confetti({ particleCount: 30, spread: 50 });
    });

    stage.querySelector('#btnNextToCards').addEventListener('click', () => {
      playSound('key');
      goToScene(6);
    });
  }

  // ==========================================
  // SCENE 6: 3D Swipe Cards
  // ==========================================
  function renderScene6_Cards() {
    stage.className = "blossom-stage scene-5-cards";
    stage.innerHTML = `
      <div class="cards-screen-wrap">
        <h2 class="cards-main-title">${data.memoriesHeading || 'BEAUTIFUL MEMORIES'}</h2>
        <p class="cards-sub-hint">${data.memoriesSubtitle || 'Swipe the cards ✨'}</p>

        <div class="cards-carousel-container">
          <div class="cards-deck-stack" id="cardsDeck">
            ${cardsList.map((c, i) => `
              <div class="swipe-photo-card" data-card-idx="${i}" style="z-index: ${cardsList.length - i};">
                <div class="card-inner-frame">
                  <div class="card-memory-badge">✨ Memory #${i+1}</div>
                  <img src="${c.image}" alt="Memory photo ${i+1}" loading="lazy" />
                  <div class="card-heart-hint">Tap twice ♡</div>
                  ${c.caption ? `<div class="card-caption">${c.caption}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="deck-indicator-row" id="deckDots">
          ${cardsList.map((_, i) => `<span class="deck-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></span>`).join('')}
        </div>

        <button class="blossom-circle-arrow-btn" id="btnNextToTree" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const deck = stage.querySelector('#cardsDeck');
    const dots = stage.querySelectorAll('.deck-dot');
    const cardElements = Array.from(deck.querySelectorAll('.swipe-photo-card'));

    function updateDeck() {
      cardElements.forEach((card, idx) => {
        if (idx < activeCardIndex) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
          const offset = idx - activeCardIndex;
          if (offset === 0) {
            card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
            card.style.opacity = '1';
          } else if (offset === 1) {
            card.style.transform = 'translate3d(12px, 8px, -20px) scale(0.96) rotate(4deg)';
            card.style.opacity = '0.9';
          } else {
            card.style.transform = 'translate3d(0, 18px, -40px) scale(0.9)';
            card.style.opacity = '0.7';
          }
        }
      });
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeCardIndex));
    }
    updateDeck();

    cardElements.forEach(card => {
      card.addEventListener('click', () => {
        playSound('blossom');
        activeCardIndex = (activeCardIndex + 1) % cardElements.length;
        updateDeck();
      });
    });

    stage.querySelector('#btnNextToTree').addEventListener('click', () => {
      playSound('key');
      goToScene(7);
    });
  }

  // ==========================================
  // SCENE 7: 3D Blossom Wishing Tree & Love Whispers (NEW!)
  // ==========================================
  function renderScene7_BlossomTree() {
    stage.className = "blossom-stage scene-blossom-tree";
    const whispers = data.loveWhispers || [
      "You make every single day feel like magic ✨",
      "Your smile is my favorite view in the universe 🥰",
      "I love you more than words will ever say 💖",
      "Thank you for being my happiest thought 🫶",
      "Forever your biggest cheerleader and fan 👑",
      "Here's to celebrating you today and always 🥂"
    ];

    stage.innerHTML = `
      <div class="tree-header-col">
        <h2 class="tree-main-heading">${data.treePrompt || "The Blossom Wishing Tree 🌸"}</h2>
        <p class="tree-sub-desc">${data.treeSub || "Tap the glowing blossoms to reveal secret whispers..."}</p>
      </div>

      <!-- Interactive Tree Stage -->
      <div class="tree-interactive-stage" id="treeStage">
        <!-- Botanical Cherry Blossom Tree SVG -->
        <svg class="tree-svg-art" viewBox="0 0 360 320">
          <defs>
            <linearGradient id="sakuraTrunk" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stop-color="#3e1b12" />
              <stop offset="0.6" stop-color="#5a2e1d" />
              <stop offset="1" stop-color="#7c432b" />
            </linearGradient>
            <radialGradient id="canopyGlow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#ffd1dc" stop-opacity="0.8" />
              <stop offset="65%" stop-color="#fbcfe8" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0" />
            </radialGradient>
          </defs>
          <!-- Soft Pink Canopy Cloud -->
          <circle cx="180" cy="120" r="105" fill="url(#canopyGlow)" />
          <!-- Trunk & Branches -->
          <path d="M175 320 C175 240 160 210 180 160 C185 150 195 140 210 120" stroke="url(#sakuraTrunk)" stroke-width="16" fill="none" stroke-linecap="round" />
          <path d="M170 190 C140 170 110 150 95 125" stroke="url(#sakuraTrunk)" stroke-width="9" fill="none" stroke-linecap="round" />
          <path d="M185 170 C220 150 250 140 270 115" stroke="url(#sakuraTrunk)" stroke-width="9" fill="none" stroke-linecap="round" />
          <path d="M180 140 C175 110 165 95 155 70" stroke="url(#sakuraTrunk)" stroke-width="6" fill="none" stroke-linecap="round" />
          <path d="M195 130 C215 105 225 90 230 65" stroke="url(#sakuraTrunk)" stroke-width="6" fill="none" stroke-linecap="round" />
        </svg>

        <!-- 6 Interactive Blossom Nodes -->
        ${[
          { x: 95, y: 125, idx: 0 },
          { x: 270, y: 115, idx: 1 },
          { x: 155, y: 70, idx: 2 },
          { x: 230, y: 65, idx: 3 },
          { x: 180, y: 110, idx: 4 },
          { x: 130, y: 165, idx: 5 }
        ].map(node => `
          <div class="tree-node-blossom" style="left: ${node.x}px; top: ${node.y}px;" data-widx="${node.idx}">
            <svg class="node-sakura-icon" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.7)" />
              <path d="M20 20 C18 10 10 4 20 0 C30 4 22 10 20 20" fill="#f43f5e" />
              <path d="M20 20 C18 10 10 4 20 0 C30 4 22 10 20 20" fill="#f43f5e" transform="rotate(72 20 20)" />
              <path d="M20 20 C18 10 10 4 20 0 C30 4 22 10 20 20" fill="#f43f5e" transform="rotate(144 20 20)" />
              <path d="M20 20 C18 10 10 4 20 0 C30 4 22 10 20 20" fill="#f43f5e" transform="rotate(216 20 20)" />
              <path d="M20 20 C18 10 10 4 20 0 C30 4 22 10 20 20" fill="#f43f5e" transform="rotate(288 20 20)" />
              <circle cx="20" cy="20" r="3.5" fill="#fef08a" />
            </svg>
          </div>
        `).join('')}

        <!-- Floating Whisper Bubble -->
        <div class="tree-whisper-popup" id="whisperPopup">
          <p class="whisper-popup-text" id="whisperText">Tap any blossom to uncover a secret reason why you are cherished...</p>
          <span class="whisper-counter-pill" id="whisperCount">0 / 6 DISCOVERED</span>
        </div>
      </div>

      <button class="blossom-circle-arrow-btn" id="btnNextToLamp" aria-label="Next">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
      </button>
    `;

    const popup = stage.querySelector('#whisperPopup');
    const popupText = stage.querySelector('#whisperText');
    const countBadge = stage.querySelector('#whisperCount');
    let discovered = new Set();

    stage.querySelectorAll('.tree-node-blossom').forEach(node => {
      node.addEventListener('click', () => {
        const idx = parseInt(node.getAttribute('data-widx'), 10);
        playSound('blossom');
        discovered.add(idx);
        node.classList.add('bloomed');

        popupText.textContent = `"${whispers[idx % whispers.length]}"`;
        countBadge.textContent = `${discovered.size} / 6 DISCOVERED ✨`;
        popup.classList.add('visible');

        if (discovered.size >= 4) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#f472b6', '#ffd1dc', '#ffffff']
          });
        }
      });
    });

    stage.querySelector('#btnNextToLamp').addEventListener('click', () => {
      playSound('key');
      goToScene(8);
    });
  }

  // ==========================================
  // SCENE 8: Hanging Kawaii Pull-Lamp (Twilight Switch)
  // ==========================================
  function renderScene8_HangingLamp() {
    stage.className = "blossom-stage scene-6-lamp";
    isLampOn = true;

    stage.innerHTML = `
      <div class="lamp-screen-wrap" id="lampWrap">
        <div class="lamp-hanging-assembly">
          <div class="lamp-ceiling-wire"></div>
          <div class="lamp-globe" id="lampGlobe">
            <div class="lamp-face">
              <span class="lamp-eye left"></span>
              <span class="lamp-smile">‿</span>
              <span class="lamp-eye right"></span>
              <span class="lamp-blush left"></span>
              <span class="lamp-blush right"></span>
            </div>
            <div class="lamp-glow-aura" id="lampGlow"></div>
          </div>

          <div class="lamp-pull-chain" id="pullChain">
            <div class="chain-beads">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div class="pull-ball" id="pullBall" title="Drag down to pull">
              <div class="pull-ball-inner"></div>
            </div>
          </div>
        </div>

        <p class="lamp-instruction" id="lampPrompt">${data.lampPrompt || 'DRAG THE STRING DOWN TO PULL'}</p>
        <canvas id="twilightCanvas" class="twilight-canvas"></canvas>

        <button class="blossom-circle-arrow-btn" id="btnNextToStars" style="visibility: hidden;">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const lampWrap = stage.querySelector('#lampWrap');
    const lampGlow = stage.querySelector('#lampGlow');
    const pullChain = stage.querySelector('#pullChain');
    const pullBall = stage.querySelector('#pullBall');
    const lampPrompt = stage.querySelector('#lampPrompt');
    const nextBtn = stage.querySelector('#btnNextToStars');

    function toggleLamp() {
      isLampOn = !isLampOn;
      if (!isLampOn) {
        lampWrap.classList.add('twilight-dark');
        lampGlow.style.opacity = '0';
        lampPrompt.innerHTML = "✨ You brought the twilight stars to life...";
        nextBtn.style.visibility = 'visible';
        setTimeout(() => goToScene(9), 1800);
      } else {
        lampWrap.classList.remove('twilight-dark');
        lampGlow.style.opacity = '1';
        lampPrompt.innerHTML = data.lampPrompt || 'DRAG THE STRING DOWN TO PULL';
      }
    }

    pullBall.onclick = () => {
      pullChain.style.transition = 'transform 0.2s ease';
      pullChain.style.transform = 'translateY(50px)';
      playSound('click');
      setTimeout(() => {
        pullChain.style.transition = 'transform 0.4s ease';
        pullChain.style.transform = 'translateY(0px)';
        toggleLamp();
      }, 200);
    };

    nextBtn.addEventListener('click', () => {
      playSound('key');
      goToScene(9);
    });
  }

  // ==========================================
  // SCENE 9: Twilight Constellations & Make-a-Wish Star (NEW!)
  // ==========================================
  function renderScene9_Constellation() {
    stage.className = "blossom-stage scene-twilight-stars";
    stage.innerHTML = `
      <div class="tree-header-col">
        <h2 class="tree-main-heading" style="color:#fbcfe8;">${data.constellationTitle || "Twilight Constellation ✨"}</h2>
        <p class="tree-sub-desc" id="starHint" style="color:#f9a8d4;">Tap the 5 stars to connect our constellation heart...</p>
      </div>

      <!-- Star Sky Box -->
      <div class="constellation-sky-box" id="skyBox">
        <svg class="constellation-svg-net" id="starNet">
          <path id="constellationLine" d="" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="4 4" />
        </svg>

        <!-- 5 Constellation Stars forming a celestial heart -->
        ${[
          { x: 190, y: 240, id: 0 },
          { x: 90,  y: 130, id: 1 },
          { x: 140, y: 60,  id: 2 },
          { x: 240, y: 60,  id: 3 },
          { x: 290, y: 130, id: 4 }
        ].map(s => `
          <button class="constellation-star-btn" style="left: ${s.x}px; top: ${s.y}px;" data-sid="${s.id}">
            <div class="star-point-glow"></div>
          </button>
        `).join('')}
      </div>

      <div style="display:flex; flex-direction:column; align-items:center; gap:12px; z-index:10;">
        <button class="btn-make-wish-shooting-star" id="btnShootStar" style="display:none;">
          🌠 Make a Wish!
        </button>
        <button class="blossom-circle-arrow-btn" id="btnNextToScratch" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const starBtns = stage.querySelectorAll('.constellation-star-btn');
    const linePath = stage.querySelector('#constellationLine');
    const starHint = stage.querySelector('#starHint');
    const btnWish = stage.querySelector('#btnShootStar');
    let connectedStars = [];

    const starCoords = [
      { x: 190, y: 240 },
      { x: 90,  y: 130 },
      { x: 140, y: 60 },
      { x: 240, y: 60 },
      { x: 290, y: 130 }
    ];

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = parseInt(btn.getAttribute('data-sid'), 10);
        if (!connectedStars.includes(sid)) {
          connectedStars.push(sid);
          btn.classList.add('connected');
          playSound('blossom');

          // Draw SVG line
          let d = "";
          connectedStars.forEach((id, i) => {
            const pt = starCoords[id];
            d += (i === 0 ? `M ${pt.x} ${pt.y}` : ` L ${pt.x} ${pt.y}`);
          });
          if (connectedStars.length === 5) {
            d += ` Z`; // Close the heart!
            linePath.setAttribute('stroke', '#ec4899');
            linePath.setAttribute('stroke-width', '3');
            linePath.removeAttribute('stroke-dasharray');
            starHint.innerHTML = "✨ Our celestial heart shines brightly in the cosmos! 💖";
            starHint.style.color = "#f472b6";
            btnWish.style.display = 'inline-flex';
            playSound('unlock');
          }
          linePath.setAttribute('d', d);
        }
      });
    });

    btnWish?.addEventListener('click', () => {
      playSound('blossom');
      btnWish.innerHTML = "✨ Wish Sent to the Stars! 💫";
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#fbcfe8', '#facc15', '#ffffff']
      });
      setTimeout(() => goToScene(10), 1200);
    });

    stage.querySelector('#btnNextToScratch').addEventListener('click', () => {
      playSound('key');
      goToScene(10);
    });
  }

  // ==========================================
  // SCENE 10: Golden Holographic Scratch Love Ticket (NEW!)
  // ==========================================
  function renderScene10_ScratchTicket() {
    stage.className = "blossom-stage scene-scratch-ticket";
    stage.innerHTML = `
      <div class="tree-header-col">
        <h2 class="tree-main-heading">${data.scratchTitle || "Secret Birthday Love Ticket 🎟️"}</h2>
        <p class="tree-sub-desc">${data.scratchSub || "Scratch with your finger to reveal your surprise!"}</p>
      </div>

      <!-- Scratch Ticket Box -->
      <div class="scratch-ticket-container">
        <!-- Underneath Secret Prize -->
        <div class="scratch-card-underlay">
          <span class="scratch-ticket-badge">★ OFFICIAL VIP BIRTHDAY COUPON ★</span>
          <div class="scratch-prize-text">${data.scratchPrize || "LIFETIME VIP PASS: 1,000,000 Hugs, Ice Cream & Endless Love ♡"}</div>
          <div class="scratch-barcode-box">||| | |||| | ||||| | |||</div>
        </div>

        <!-- Gold Foil Scratch Canvas Overlay -->
        <canvas class="scratch-foil-canvas" id="scratchCanvas"></canvas>
      </div>

      <button class="blossom-circle-arrow-btn" id="btnNextToLetter" aria-label="Next">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
      </button>
    `;

    const canvas = stage.querySelector('#scratchCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 340;
    canvas.height = canvas.offsetHeight || 220;

    // Fill with Shimmering Golden Scratch Foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.3, '#f59e0b');
    grad.addColorStop(0.7, '#d97706');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch Card Cover Typography
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', canvas.width / 2, canvas.height / 2);

    let isScratching = false;
    let scratchedPixels = 0;
    let celebrated = false;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels++;
      if (scratchedPixels > 45 && !celebrated) {
        celebrated = true;
        playSound('unlock');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#ec4899', '#ffffff']
        });
      }
    }

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const pt = e.touches ? e.touches[0] : e;
      return { x: pt.clientX - rect.left, y: pt.clientY - rect.top };
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; const { x, y } = getCoords(e); scratch(x, y); });
    window.addEventListener('mousemove', (e) => { if (isScratching) { const { x, y } = getCoords(e); scratch(x, y); } });
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; const { x, y } = getCoords(e); scratch(x, y); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (isScratching) { const { x, y } = getCoords(e); scratch(x, y); } }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });

    stage.querySelector('#btnNextToLetter').addEventListener('click', () => {
      playSound('key');
      goToScene(11);
    });
  }

  // ==========================================
  // SCENE 11: Wax-Seal Envelope & Real-Time Typewriter Modal
  // ==========================================
  function renderScene11_Letter() {
    stage.className = "blossom-stage scene-7-letter";
    isLetterOpen = false;

    stage.innerHTML = `
      <div class="letter-screen-wrap">
        <h2 class="envelope-main-title">${data.letterPrompt || 'A Letter, Just For You'}</h2>
        <p class="envelope-subtitle">${data.letterSubprompt || 'Tap the envelope to unseal'}</p>

        <div class="wax-envelope-wrap" id="envelopeWrapper">
          <div class="envelope-back"></div>
          <div class="envelope-letter-preview"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="envelopeFlap"></div>

          <button class="wax-seal-button" id="waxSealBtn" aria-label="Tap to open letter">
            <div class="wax-seal-emblem">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
              </svg>
            </div>
          </button>
        </div>

        <div class="blossom-letter-modal-backdrop" id="letterModal">
          <div class="blossom-modal-card">
            <button class="modal-close-btn" id="btnCloseLetter">&times;</button>
            <div class="modal-card-header">
              <h3 class="modal-card-title">${data.letterModalTitle || 'Happy Birthday ✨'}</h3>
              <p class="modal-card-sub">${data.letterModalSub || 'Just for you ♡'}</p>
            </div>

            <div class="modal-card-body">
              <span id="typedLetterText"></span><span class="typing-cursor">|</span>
            </div>

            <div class="letter-reaction-bar">
              <button class="reaction-pill">❤️ <span>Love</span></button>
              <button class="reaction-pill">🥰 <span>Blush</span></button>
              <button class="reaction-pill">🥺 <span>Touched</span></button>
              <button class="reaction-pill">✨ <span>Forever</span></button>
            </div>

            <div class="modal-card-footer" style="display:flex; flex-direction:column; gap:8px;">
              <button class="btn-read-3d-flipbook" id="btnLetterOpenFlipbook" style="background:linear-gradient(135deg, #d4af37, #b8860b); color:#1a1622; border:none; padding:10px 18px; border-radius:999px; font-weight:700; cursor:pointer;">
                📖 Read Our 3D Story Flipbook
              </button>
              <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn-replay-story" id="btnReplayStory">↺ Replay Story</button>
                <button class="btn-share-story" id="btnShareStory">💌 Share Celebration</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const waxBtn = stage.querySelector('#waxSealBtn');
    const flap = stage.querySelector('#envelopeFlap');
    const modal = stage.querySelector('#letterModal');
    const closeBtn = stage.querySelector('#btnCloseLetter');
    const typedTextEl = stage.querySelector('#typedLetterText');
    const btnReplay = stage.querySelector('#btnReplayStory');
    const btnShare = stage.querySelector('#btnShareStory');
    const btnFlip = stage.querySelector('#btnLetterOpenFlipbook');

    function openLetterModal() {
      if (isLetterOpen) return;
      isLetterOpen = true;
      playSound('letter');
      waxBtn.classList.add('cracked');
      flap.classList.add('open');

      setTimeout(() => {
        modal.classList.add('show');
        typewriterAnimation(data.letterBody || "");
      }, 550);
    }

    function typewriterAnimation(fullText) {
      typedTextEl.innerHTML = "";
      let charIdx = 0;
      function typeChar() {
        if (charIdx < fullText.length) {
          const char = fullText.charAt(charIdx);
          typedTextEl.innerHTML += (char === '\n' ? '<br/>' : char);
          if (charIdx % 3 === 0) playSound('typewriter');
          charIdx++;
          setTimeout(typeChar, 24);
        }
      }
      typeChar();
    }

    waxBtn.addEventListener('click', openLetterModal);
    stage.querySelector('#envelopeWrapper')?.addEventListener('click', openLetterModal);

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      isLetterOpen = false;
    });

    btnFlip?.addEventListener('click', () => {
      modal.classList.remove('show');
      openFlipbook();
    });

    btnReplay.addEventListener('click', () => goToScene(0));

    btnShare.addEventListener('click', () => {
      const shareUrl = encodeSiteToUrl('blossom', data);
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Celebration link copied! Send it to your special someone 💖");
      });
    });

    stage.querySelectorAll('.reaction-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('blossom');
        confetti({ particleCount: 30, spread: 60 });
      });
    });
  }

  // Mount Scene 0 initially
  goToScene(0);

  return {
    updateData: (newData) => {
      data = { ...data, ...newData };
      renderScene(currentScene);
    }
  };
}
