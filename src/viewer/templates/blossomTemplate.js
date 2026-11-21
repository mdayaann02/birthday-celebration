// src/viewer/templates/blossomTemplate.js - The Viral Pastel Blossom Celebration Experience

import { encodeSiteToUrl, uploadFile } from '../../models/siteStorage.js';

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
    flamePrompt: "Touch the flame to light",
    cakeHeadline: "Happy Birthday, My Girl!",
    cakeSubtext: "Make a wish and tap the candles 🎂",
    memoriesHeading: "BEAUTIFUL MEMORIES",
    memoriesSubtitle: "Swipe the cards ✨",
    cards: [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ],
    lampPrompt: "DRAG THE STRING DOWN TO PULL",
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

Thankyou for being my partner in every sense, happy 19th darlzzz 🧚‍♀️ 💋

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

  // State
  let currentScene = 0; // 0: Blossom, 1: Keypad, 2: Note, 3: Flame, 4: Cake, 5: Cards, 6: Lamp, 7: Letter
  let currentPin = "";
  let isLampOn = true;
  let candlesLit = [true, true, true];
  let activeCardIndex = 0;
  let isLetterOpen = false;
  let isEditing = false;
  let audioPlaying = false;
  let isTransitioning = false;

  // Sound Synthesizer via Web Audio API (instant, zero external dependencies)
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
        // Sparkling harp chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35); // C6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'key') {
        // Soft bubble tap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'unlock') {
        // Harmonious chord
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
        // Candle blow-out whoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        // Lamp switch click
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'letter') {
        // Wax break rustle
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
      }
    } catch (e) {
      console.warn("Audio playback not yet enabled:", e);
    }
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
          ${isMakerReview ? `
            <button class="blossom-edit-btn" id="btnToggleEdit" title="Edit story texts">
              ✏️ <span class="hide-on-tiny">Edit Story</span>
            </button>
          ` : ''}
          <button class="blossom-music-pill" id="blossomMusicToggle" title="Toggle Music">
            <span class="blossom-music-icon">🎵</span>
            <div class="blossom-soundbars">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </header>

      <!-- Main Story Container -->
      <main class="blossom-stage-wrap" id="blossomStage"></main>

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
            <input type="text" id="edKeypadSubtitle" value="${data.keypadSubtitle || 'I love you'}" />
          </div>
          <div class="b-field">
            <label>Scene 3 Opening Note</label>
            <input type="text" id="edIntroHead" value="${data.introHeading || 'Hey Baby,'}" />
            <input type="text" id="edIntro1" value="${data.introLine1 || ''}" />
            <input type="text" id="edIntro2" value="${data.introLine2 || ''}" />
          </div>
          <div class="b-field">
            <label>Scene 5 Cake Headline</label>
            <input type="text" id="edCakeHead" value="${data.cakeHeadline || 'Happy Birthday, My Girl!'}" />
          </div>

          <!-- Scene 6 Memory Photo Cards in Drawer -->
          <div class="b-field">
            <label style="font-weight:700; color:#be185d;">📸 Scene 6 Memory Cards (Photos & Captions)</label>
            <div id="drwCardsList" style="display:flex; flex-direction:column; gap:8px;">
              ${cardsList.map((c, i) => `
                <div class="drw-card-row" data-i="${i}" style="display:flex; flex-direction:column; gap:6px; background:#fff; padding:8px; border-radius:8px; border:1px solid #fbcfe8;">
                  <div style="display:flex; gap:8px; align-items:center;">
                    <img src="${c.image}" id="drwThumb_${i}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; border:1px solid #f472b6; flex-shrink:0;" onerror="this.src='/images/sunset.jpg'" />
                    <input type="text" class="drw-card-img" data-i="${i}" value="${c.image}" placeholder="Image URL" style="flex:1; font-size:11px;" />
                    <label class="btn-file-upload-sm" title="Upload Photo" style="padding:4px 6px;">
                      📷
                      <input type="file" class="file-upload-drw-card" data-i="${i}" accept="image/*" style="display:none;" />
                    </label>
                    <button type="button" class="btn-del-drw-card" data-i="${i}" style="background:#fee2e2; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; color:#dc2626;" title="Delete">🗑️</button>
                  </div>
                  <input type="text" class="drw-card-cap" data-i="${i}" value="${c.caption || ''}" placeholder="Caption (e.g. Sweet moments with you)" style="font-size:11px;" />
                </div>
              `).join('')}
            </div>
            <button type="button" id="btnAddDrwCard" style="margin-top:6px; background:#fdf2f8; border:1px dashed #f472b6; border-radius:6px; padding:6px; font-size:12px; color:#db2777; cursor:pointer; width:100%;">➕ Add Memory Photo Card</button>
          </div>

          <div class="b-field">
            <label>Scene 8 Love Letter Content</label>
            <textarea id="edLetter" rows="7">${data.letterBody || ''}</textarea>
          </div>
          <div class="b-drawer-actions">
            <button class="b-btn-primary" id="btnSaveBlossom">💾 Save & Update View</button>
            <button class="b-btn-share" id="btnShareBlossom">🔗 Copy Shareable Link</button>
          </div>
          <div id="blossomShareToast" class="blossom-toast">Link copied to clipboard! 📋</div>
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
  const btnToggleEdit = container.querySelector('#btnToggleEdit');
  const editDrawer = container.querySelector('#blossomEditDrawer');
  const btnCloseDrawer = container.querySelector('#btnCloseDrawer');
  const btnSaveBlossom = container.querySelector('#btnSaveBlossom');
  const btnShareBlossom = container.querySelector('#btnShareBlossom');
  const shareToast = container.querySelector('#blossomShareToast');
  const bgCanvas = container.querySelector('#blossomBgCanvas');

  // Ambient Sakura Petals Floating Canvas (High-DPI 3D Fluttering)
  let animFrameId = null;
  const ctx = bgCanvas.getContext('2d');
  let petals = [];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    bgCanvas.width = viewport.clientWidth * dpr;
    bgCanvas.height = viewport.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function initPetals() {
    petals = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * viewport.clientWidth,
        y: Math.random() * viewport.clientHeight,
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 0.7,
        dy: Math.random() * 1.1 + 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.015,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: Math.random() * 0.03 + 0.015,
        alpha: Math.random() * 0.45 + 0.35,
        color: Math.random() > 0.4 ? 'rgba(251, 113, 133, ' : 'rgba(244, 114, 182, '
      });
    }
  }
  initPetals();

  function renderPetals() {
    ctx.clearRect(0, 0, viewport.clientWidth, viewport.clientHeight);
    for (let p of petals) {
      p.sway += p.swaySpeed;
      p.tilt += p.tiltSpeed;
      p.x += p.dx + Math.sin(p.sway) * 0.75;
      p.y += p.dy;
      p.rot += p.rotSpeed;

      const scaleY = Math.cos(p.tilt);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.abs(scaleY) * 0.8 + 0.2);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 1.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowColor = 'rgba(244, 114, 182, 0.35)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();

      if (p.y > viewport.clientHeight + 25) {
        p.y = -25;
        p.x = Math.random() * viewport.clientWidth;
      }
      if (p.x < -25) p.x = viewport.clientWidth + 25;
      if (p.x > viewport.clientWidth + 25) p.x = -25;
    }
    animFrameId = requestAnimationFrame(renderPetals);
  }
  renderPetals();

  // Audio Play / Toggle with Mobile Autoplay Safe Gesture
  function startAutoplayAudio() {
    getAudioCtx();
    if (!audioPlaying) {
      audioEl.play().then(() => {
        audioPlaying = true;
        musicToggle.classList.add('playing');
      }).catch(err => {
        console.log("Audio play postponed until tap gesture:", err);
      });
    }
  }

  musicToggle.addEventListener('click', () => {
    getAudioCtx();
    if (audioPlaying) {
      audioEl.pause();
      audioPlaying = false;
      musicToggle.classList.remove('playing');
    } else {
      audioEl.play().then(() => {
        audioPlaying = true;
        musicToggle.classList.add('playing');
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

  // Drawer Card Photo Uploads & Actions
  container.querySelectorAll('.file-upload-drw-card').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.drw-card-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#drwThumb_${idx}`);
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
      }
    });
  });

  const btnAddDrw = container.querySelector('#btnAddDrwCard');
  btnAddDrw?.addEventListener('click', () => {
    data.cards = (data.cards && data.cards.length > 0) ? [...data.cards] : [...cardsList];
    data.cards.push({ image: "/images/sunset.jpg", caption: "Our sweetest memory" });
    renderBlossomTemplate(container, data, isMakerReview);
  });

  container.querySelectorAll('.btn-del-drw-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-i'), 10);
      data.cards = (data.cards && data.cards.length > 0) ? [...data.cards] : [...cardsList];
      data.cards.splice(idx, 1);
      renderBlossomTemplate(container, data, isMakerReview);
    });
  });

  btnSaveBlossom?.addEventListener('click', () => {
    data.recipientName = container.querySelector('#edRecip').value.trim() || data.recipientName;
    data.passcode = container.querySelector('#edPin').value.trim() || "1234";
    data.blossomPrompt = container.querySelector('#edBlossomPrompt').value.trim() || data.blossomPrompt;
    data.keypadTitle = container.querySelector('#edKeypadTitle').value.trim() || data.keypadTitle;
    data.keypadSubtitle = container.querySelector('#edKeypadSubtitle').value.trim() || data.keypadSubtitle;
    data.introHeading = container.querySelector('#edIntroHead').value.trim() || data.introHeading;
    data.introLine1 = container.querySelector('#edIntro1').value.trim() || data.introLine1;
    data.introLine2 = container.querySelector('#edIntro2').value.trim() || data.introLine2;
    data.cakeHeadline = container.querySelector('#edCakeHead').value.trim() || data.cakeHeadline;
    data.letterBody = container.querySelector('#edLetter').value.trim() || data.letterBody;

    const drwRows = container.querySelectorAll('.drw-card-row');
    if (drwRows.length > 0) {
      const updatedCards = [];
      drwRows.forEach(row => {
        const idx = row.getAttribute('data-i');
        const imgVal = row.querySelector(`.drw-card-img[data-i="${idx}"]`)?.value.trim();
        const capVal = row.querySelector(`.drw-card-cap[data-i="${idx}"]`)?.value.trim() || "";
        if (imgVal) {
          updatedCards.push({ image: imgVal, caption: capVal });
        }
      });
      data.cards = updatedCards;
    }

    editDrawer.classList.remove('open');
    renderScene(currentScene);
  });

  btnShareBlossom?.addEventListener('click', () => {
    const shareUrl = encodeSiteToUrl('blossom', data);
    navigator.clipboard.writeText(shareUrl).then(() => {
      shareToast.classList.add('visible');
      setTimeout(() => shareToast.classList.remove('visible'), 3000);
    });
  });

  // Back Button Navigation
  backBtn.addEventListener('click', () => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  });

  function goToScene(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentScene = index;
    backBtn.style.visibility = (currentScene > 0 && currentScene < 7) ? 'visible' : 'hidden';

    // Cinematic smooth cross-dissolve with cubic-bezier
    stage.style.transition = 'opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)';
    stage.style.opacity = '0';
    stage.style.transform = 'scale(0.97) translateY(6px)';

    setTimeout(() => {
      renderScene(currentScene);
      void stage.offsetWidth;
      stage.style.transition = 'opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)';
      stage.style.opacity = '1';
      stage.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => {
        isTransitioning = false;
      }, 330);
    }, 220);
  }

  // Render Scene Controller
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
        renderScene3_Flame();
        break;
      case 4:
        renderScene4_PixelCake();
        break;
      case 5:
        renderScene5_Cards();
        break;
      case 6:
        renderScene6_HangingLamp();
        break;
      case 7:
        renderScene7_Letter();
        break;
      default:
        renderScene0_Blossom();
    }
  }

  // ==========================================
  // SCENE 0: "Touch the blossom" (Intro Gate & Autoplay Unlock)
  // ==========================================
  function renderScene0_Blossom() {
    stage.className = "blossom-stage scene-0-blossom";
    stage.innerHTML = `
      <div class="blossom-center-flow">
        <div class="blossom-flower-trigger" id="blossomTrigger" role="button" aria-label="Touch the blossom">
          <!-- Translucent 5-petal Sakura SVG with glowing center -->
          <svg class="blossom-svg-pulse" viewBox="0 0 100 100" width="120" height="120">
            <defs>
              <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff0f3" stop-opacity="0.95"/>
                <stop offset="45%" stop-color="#fbcfe8" stop-opacity="0.85"/>
                <stop offset="85%" stop-color="#f472b6" stop-opacity="0.75"/>
                <stop offset="100%" stop-color="#fb7185" stop-opacity="0.6"/>
              </radialGradient>
              <filter id="sakuraGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
            </defs>
            <!-- 5 Petals -->
            <g filter="url(#sakuraGlow)">
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(72 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(144 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(216 50 50)"/>
              <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#sakuraGrad)" transform="rotate(288 50 50)"/>
              <!-- Stamen Pistil Center -->
              <circle cx="50" cy="50" r="7" fill="#fb7185"/>
              <circle cx="50" cy="50" r="3.5" fill="#fef08a"/>
            </g>
          </svg>
        </div>
        <p class="blossom-calligraphy-text">${data.blossomPrompt || 'Touch the blossom'}</p>
      </div>

      <!-- Blossom Full-Screen Explosion Canvas -->
      <canvas id="blossomExplodeCanvas" class="blossom-explode-canvas"></canvas>
    `;

    const trigger = stage.querySelector('#blossomTrigger');
    const explodeCanvas = stage.querySelector('#blossomExplodeCanvas');

    trigger.addEventListener('click', (e) => {
      // 1. Play chime sound
      playSound('blossom');

      // 2. Autoplay Music on this direct mobile interaction
      startAutoplayAudio();

      // 3. Trigger Full-screen watercolor floral explosion
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      explodeCanvas.width = viewport.clientWidth * dpr;
      explodeCanvas.height = viewport.clientHeight * dpr;
      const expCtx = explodeCanvas.getContext('2d');
      expCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      explodeCanvas.style.opacity = '1';

      let sceneSwitched = false;
      function nextScene() {
        if (sceneSwitched) return;
        sceneSwitched = true;
        goToScene(1);
      }

      // 90 Colorful floral explosion petals with high-DPI physics
      const flowerColors = [
        '#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', 
        '#8b5cf6', '#e11d48', '#fbbf24', '#ffffff', '#a855f7'
      ];
      const particles = [];
      const originX = trigger.getBoundingClientRect().left + 60;
      const originY = trigger.getBoundingClientRect().top + 60;

      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
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
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
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

        if (alive) {
          requestAnimationFrame(animateExplosion);
        } else {
          nextScene();
        }
      }
      animateExplosion();

      // Fallback transition in 900ms
      setTimeout(nextScene, 920);
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
        <div class="keypad-top-blossom">
          <svg viewBox="0 0 100 100" width="46" height="46">
            <defs>
              <radialGradient id="miniSakura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff" />
                <stop offset="60%" stop-color="#fbcfe8" />
                <stop offset="100%" stop-color="#fb7185" />
              </radialGradient>
            </defs>
            <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#miniSakura)"/>
            <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#miniSakura)" transform="rotate(72 50 50)"/>
            <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#miniSakura)" transform="rotate(144 50 50)"/>
            <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#miniSakura)" transform="rotate(216 50 50)"/>
            <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#miniSakura)" transform="rotate(288 50 50)"/>
            <circle cx="50" cy="50" r="5" fill="#f43f5e"/>
          </svg>
        </div>

        <h2 class="keypad-cursive-title">${data.keypadTitle || 'For you, my love'}</h2>
        <p class="keypad-sub-italic">${data.keypadSubtitle || 'I love you'}</p>

        <!-- 4 Passcode Dots -->
        <div class="keypad-dots-row" id="pinDots">
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
        </div>

        <!-- 3x4 Frosted Keypad Grid -->
        <div class="keypad-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => `
            <button class="keypad-num-btn" data-key="${digit}">${digit}</button>
          `).join('')}
          <button class="keypad-num-btn keypad-back-btn" data-key="back" aria-label="Delete">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
          </button>
        </div>

        <!-- Hint -->
        <p class="keypad-hint-text">Passcode: <strong>${data.passcode || '1234'}</strong> (or tap any 4 digits)</p>
      </div>

      <!-- Unlock Pink Ripple Wave -->
      <div class="unlock-ripple-wave" id="unlockRipple"></div>
    `;

    const dotsContainer = stage.querySelector('#pinDots');
    const dots = dotsContainer.querySelectorAll('.pin-dot');
    const ripple = stage.querySelector('#unlockRipple');

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx < currentPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    function checkPasscode() {
      // Correct passcode or match
      const targetPin = (data.passcode || "1234").trim();
      const isMatch = currentPin === targetPin || currentPin.length === 4;

      if (isMatch) {
        playSound('unlock');
        ripple.classList.add('active');
        setTimeout(() => {
          goToScene(2);
        }, 650);
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
        if (navigator.vibrate) navigator.vibrate(15);

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
        <div class="note-cake-icon">
          <!-- Pixel Art / Sweet Cake Icon with floating hearts -->
          <svg viewBox="0 0 64 64" width="70" height="70">
            <path d="M32 10 C34 7 38 7 40 10 C42 13 32 20 32 20 C32 20 22 13 24 10 C26 7 30 7 32 10" fill="#f43f5e"/>
            <rect x="29" y="18" width="6" height="12" fill="#fed7aa" rx="2"/>
            <path d="M32 12 Q34 14 32 18 Q30 14 32 12" fill="#facc15"/>
            <!-- Cake Base -->
            <rect x="12" y="30" width="40" height="22" rx="4" fill="#fbcfe8"/>
            <path d="M12 36 Q22 42 32 36 Q42 42 52 36 L52 30 L12 30 Z" fill="#f472b6"/>
            <!-- Cake Plate -->
            <ellipse cx="32" cy="54" rx="26" ry="5" fill="#fce7f3" stroke="#f472b6" stroke-width="1.5"/>
          </svg>
        </div>

        <h1 class="note-main-heading">${data.introHeading || 'Hey Baby,'}</h1>
        <p class="note-body-line">${data.introLine1 || "I know this isn't a normal birthday gift..."}</p>
        <p class="note-body-line bold-line">${data.introLine2 || "But I made this just for you."}</p>

        <!-- Circular Next Button -->
        <button class="blossom-circle-arrow-btn" id="btnNextToFlame" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    stage.querySelector('#btnNextToFlame').addEventListener('click', () => {
      playSound('key');
      goToScene(3);
    });
  }

  // ==========================================
  // SCENE 3: The Flame / Match Lighter (Burn-Away Transition)
  // ==========================================
  function renderScene3_Flame() {
    stage.className = "blossom-stage scene-3-flame";
    stage.innerHTML = `
      <div class="flame-center-box">
        <button class="flame-burn-trigger" id="flameTrigger" title="Tap or drag to light">
          <span class="flame-emoji-glow">🔥</span>
        </button>
        <p class="flame-subtext">${data.flamePrompt || 'Touch the flame to light'}</p>
      </div>

      <!-- Burn-Away Canvas Overlay -->
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

      // Realistic Flash-paper Burning Wave
      function animateBurn() {
        radius += 24;

        bCtx.clearRect(0, 0, burnCanvas.width, burnCanvas.height);
        bCtx.save();

        // 1. Fill current screen color
        bCtx.fillStyle = '#fff1f2';
        bCtx.fillRect(0, 0, burnCanvas.width, burnCanvas.height);

        // 2. Cut burned out center hole
        bCtx.globalCompositeOperation = 'destination-out';
        bCtx.beginPath();
        bCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        bCtx.fill();

        // 3. Draw fiery glowing charred jagged edges
        bCtx.globalCompositeOperation = 'source-over';
        bCtx.beginPath();
        bCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        bCtx.strokeStyle = 'rgba(255, 69, 0, 0.95)';
        bCtx.lineWidth = 14;
        bCtx.stroke();

        bCtx.beginPath();
        bCtx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
        bCtx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
        bCtx.lineWidth = 6;
        bCtx.stroke();

        bCtx.restore();

        if (radius < maxRadius) {
          requestAnimationFrame(animateBurn);
        } else {
          goToScene(4);
        }
      }
      animateBurn();
    });
  }

  // ==========================================
  // SCENE 4: "Happy Birthday, My Girl!" Pixel Cake & Blowable Candles
  // ==========================================
  function renderScene4_PixelCake() {
    stage.className = "blossom-stage scene-4-cake";
    candlesLit = [true, true, true];

    stage.innerHTML = `
      <div class="cake-screen-wrap">
        <h1 class="cake-main-title">${data.cakeHeadline || 'Happy Birthday, My Girl!'}</h1>
        <p class="cake-sub-hint" id="cakeHint">${data.cakeSubtext || 'Make a wish and tap the candles 🎂'}</p>

        <!-- Confetti Canvas -->
        <canvas id="cakeConfettiCanvas" class="cake-confetti-canvas"></canvas>

        <!-- Pixel Art Cake Container -->
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

          <!-- Pixel Strawberry Layer Cake Graphic -->
          <div class="cake-sponge-stack">
            <!-- Strawberries -->
            <div class="cake-berries-row">
              <span>🍓</span><span>🍓</span><span>🍓</span><span>🍓</span><span>🍓</span>
            </div>
            <div class="cake-icing-top"></div>
            <div class="cake-tier tier-1">
              <div class="cake-layer-line"></div>
            </div>
            <div class="cake-tier tier-2">
              <div class="cake-layer-line"></div>
            </div>
            <!-- Lace Doily Base -->
            <div class="cake-doily-plate"></div>
          </div>
        </div>

        <!-- Next Arrow Button -->
        <button class="blossom-circle-arrow-btn" id="btnNextToCards" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const cakeHint = stage.querySelector('#cakeHint');
    const confettiCanvas = stage.querySelector('#cakeConfettiCanvas');
    confettiCanvas.width = viewport.clientWidth;
    confettiCanvas.height = viewport.clientHeight;
    const cCtx = confettiCanvas.getContext('2d');

    // Light gentle fluttering confetti
    let confetti = [];
    for (let i = 0; i < 40; i++) {
      confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: ['#f472b6', '#fbbf24', '#f87171', '#c084fc', '#38bdf8'][Math.floor(Math.random() * 5)],
        rot: Math.random() * 360,
        vy: Math.random() * 1.5 + 1
      });
    }

    function drawConfetti() {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      for (let c of confetti) {
        cCtx.save();
        cCtx.translate(c.x, c.y);
        cCtx.rotate((c.rot * Math.PI) / 180);
        cCtx.fillStyle = c.color;
        cCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        cCtx.restore();

        c.y += c.vy;
        c.rot += 2;
        if (c.y > confettiCanvas.height) {
          c.y = -10;
          c.x = Math.random() * confettiCanvas.width;
        }
      }
      if (currentScene === 4) requestAnimationFrame(drawConfetti);
    }
    drawConfetti();

    // Tap Candle to Blow it out
    stage.querySelectorAll('.candle-item').forEach(cEl => {
      cEl.addEventListener('click', () => {
        const idx = parseInt(cEl.getAttribute('data-cidx'));
        if (candlesLit[idx]) {
          candlesLit[idx] = false;
          cEl.classList.remove('lit');
          cEl.classList.add('blown');
          playSound('puff');

          // Check if all are blown out
          if (candlesLit.every(c => !c)) {
            playSound('unlock');
            cakeHint.innerHTML = "✨ All candles blown! Your secret wish is granted! 💖";
            cakeHint.style.color = "#e11d48";
            cakeHint.style.fontWeight = "700";
          }
        }
      });
    });

    stage.querySelector('#btnNextToCards').addEventListener('click', () => {
      playSound('key');
      goToScene(5);
    });
  }

  // ==========================================
  // SCENE 5: "BEAUTIFUL MEMORIES" 3D Swipe Deck
  // ==========================================
  function renderScene5_Cards() {
    stage.className = "blossom-stage scene-5-cards";
    activeCardIndex = 0;
    const cardsList = (data.cards && data.cards.length > 0) ? data.cards : [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ];

    stage.innerHTML = `
      <div class="cards-screen-wrap">
        <h2 class="cards-screen-title">${data.memoriesHeading || 'BEAUTIFUL MEMORIES'}</h2>
        <p class="cards-screen-subtitle">${data.memoriesSubtitle || 'Swipe the cards ✨'}</p>

        <!-- 3D Card Stack Container with Fluid Navigation -->
        <div class="cards-deck-container">
          <button class="deck-nav-arrow deck-nav-prev" id="btnPrevCard" title="Previous photo" aria-label="Previous photo">
            ‹
          </button>

          <div class="cards-deck-stack" id="cardsDeck">
            ${cardsList.map((c, i) => `
              <div class="swipe-photo-card" data-card-idx="${i}" style="z-index: ${cardsList.length - i};">
                <div class="card-inner-frame">
                  <img src="${c.image}" alt="Memory photo ${i+1}" loading="lazy" />
                  ${c.caption ? `<div class="card-caption">${c.caption}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <button class="deck-nav-arrow deck-nav-next" id="btnNextCard" title="Next photo" aria-label="Next photo">
            ›
          </button>
        </div>

        <!-- Indicators -->
        <div class="deck-indicator-row" id="deckDots">
          ${cardsList.map((_, i) => `<span class="deck-dot ${i === 0 ? 'active' : ''}" data-i="${i}" style="cursor:pointer;"></span>`).join('')}
        </div>

        <button class="blossom-circle-arrow-btn" id="btnNextToLamp" aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const deck = stage.querySelector('#cardsDeck');
    const dots = stage.querySelectorAll('.deck-dot');
    const cardElements = Array.from(deck.querySelectorAll('.swipe-photo-card'));
    const btnPrev = stage.querySelector('#btnPrevCard');
    const btnNext = stage.querySelector('#btnNextCard');

    function updateDeckTransforms(interactiveProgress = 0) {
      cardElements.forEach((card, idx) => {
        if (idx < activeCardIndex) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
          const offset = idx - activeCardIndex;
          if (offset === 0) {
            if (interactiveProgress === 0) {
              card.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
              card.style.transform = `translate3d(0, 0, 0) scale(1) rotate(0deg)`;
              card.style.opacity = '1';
            }
          } else if (offset === 1) {
            card.style.transition = interactiveProgress !== 0 ? 'none' : 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
            const scale = 0.96 + interactiveProgress * 0.04;
            const tx = 12 - interactiveProgress * 12;
            const ty = 8 - interactiveProgress * 8;
            const rot = 4 - interactiveProgress * 4;
            const op = 0.9 + interactiveProgress * 0.1;
            card.style.transform = `translate3d(${tx}px, ${ty}px, -20px) scale(${scale}) rotate(${rot}deg)`;
            card.style.opacity = `${op}`;
          } else if (offset === 2) {
            card.style.transition = interactiveProgress !== 0 ? 'none' : 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
            const scale = 0.92 + interactiveProgress * 0.04;
            const tx = -10 + interactiveProgress * 22;
            const ty = 16 - interactiveProgress * 8;
            const rot = -3 + interactiveProgress * 7;
            const op = 0.75 + interactiveProgress * 0.15;
            card.style.transform = `translate3d(${tx}px, ${ty}px, -40px) scale(${scale}) rotate(${rot}deg)`;
            card.style.opacity = `${op}`;
          } else {
            card.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
            card.style.transform = `translate3d(0, 22px, -60px) scale(0.88)`;
            card.style.opacity = '0.5';
          }
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeCardIndex);
      });
    }
    updateDeckTransforms(0);

    // Swipe card off smoothly
    function swipeOffCurrent(direction = 1) {
      const topCard = cardElements[activeCardIndex];
      if (!topCard) return;

      const flyX = direction > 0 ? 520 : -520;
      topCard.style.transition = 'transform 0.44s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease';
      topCard.style.transform = `translate3d(${flyX}px, 20px, 0) rotate(${flyX * 0.08}deg)`;
      topCard.style.opacity = '0';
      playSound('blossom');

      setTimeout(() => {
        activeCardIndex++;
        if (activeCardIndex >= cardsList.length) {
          activeCardIndex = 0;
        }
        updateDeckTransforms(0);
        attachSwipeHandler(cardElements[activeCardIndex]);
      }, 340);
    }

    // Bring back previous card
    function showPreviousCard() {
      if (activeCardIndex <= 0) {
        activeCardIndex = cardsList.length - 1;
      } else {
        activeCardIndex--;
      }

      const prevCard = cardElements[activeCardIndex];
      if (prevCard) {
        prevCard.style.display = 'block';
        prevCard.style.transition = 'none';
        prevCard.style.transform = 'translate3d(-380px, -20px, 0) rotate(-16deg)';
        prevCard.style.opacity = '0';

        requestAnimationFrame(() => {
          updateDeckTransforms(0);
          prevCard.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
          prevCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
          prevCard.style.opacity = '1';
          playSound('click');
        });
        attachSwipeHandler(prevCard);
      }
    }

    btnNext?.addEventListener('click', () => swipeOffCurrent(1));
    btnPrev?.addEventListener('click', showPreviousCard);

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-i'), 10);
        if (targetIdx !== activeCardIndex) {
          activeCardIndex = targetIdx;
          updateDeckTransforms(0);
          attachSwipeHandler(cardElements[activeCardIndex]);
          playSound('click');
        }
      });
    });

    // Attach Touch and Mouse Drag to top card
    function attachSwipeHandler(topCard) {
      if (!topCard) return;

      let startX = 0, startY = 0, currentX = 0, currentY = 0;
      let isDragging = false;
      let animId = null;

      function onStart(e) {
        isDragging = true;
        const pt = e.touches ? e.touches[0] : e;
        startX = pt.clientX;
        startY = pt.clientY;
        topCard.style.transition = 'none';
      }

      function onMove(e) {
        if (!isDragging) return;
        const pt = e.touches ? e.touches[0] : e;
        currentX = pt.clientX - startX;
        currentY = pt.clientY - startY;

        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => {
          const rot = currentX * 0.08;
          topCard.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rot}deg)`;
          const progress = Math.min(1, Math.abs(currentX) / 130);
          updateDeckTransforms(progress);
        });
      }

      function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animId);

        if (Math.abs(currentX) > 75) {
          swipeOffCurrent(currentX > 0 ? 1 : -1);
        } else {
          // Snap back with spring recoil
          topCard.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)';
          topCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
          updateDeckTransforms(0);
        }
      }

      topCard.onmousedown = onStart;
      window.onmousemove = onMove;
      window.onmouseup = onEnd;

      topCard.ontouchstart = onStart;
      topCard.ontouchmove = onMove;
      topCard.ontouchend = onEnd;
    }

    attachSwipeHandler(cardElements[0]);

    stage.querySelector('#btnNextToLamp').addEventListener('click', () => {
      playSound('key');
      goToScene(6);
    });
  }

  // ==========================================
  // SCENE 6: Hanging Kawaii Pull-Lamp (Twilight Switch)
  // ==========================================
  function renderScene6_HangingLamp() {
    stage.className = "blossom-stage scene-6-lamp";
    isLampOn = true;

    stage.innerHTML = `
      <div class="lamp-screen-wrap" id="lampWrap">
        <!-- Ceiling Fixture & Cord -->
        <div class="lamp-hanging-assembly">
          <div class="lamp-ceiling-wire"></div>
          
          <!-- Cute Blushing 3D Sphere Lamp -->
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

          <!-- Dangling Beaded Pull Chain -->
          <div class="lamp-pull-chain" id="pullChain">
            <div class="chain-beads" id="chainBeads">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <!-- Pull Ball Trigger -->
            <div class="pull-ball" id="pullBall" title="Drag down to pull">
              <div class="pull-ball-inner"></div>
            </div>
          </div>
        </div>

        <p class="lamp-instruction" id="lampPrompt">${data.lampPrompt || 'DRAG THE STRING DOWN TO PULL'}</p>

        <!-- Twilight Stars Canvas -->
        <canvas id="twilightCanvas" class="twilight-canvas"></canvas>

        <button class="blossom-circle-arrow-btn" id="btnNextToLetter" style="visibility: hidden;">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    const lampWrap = stage.querySelector('#lampWrap');
    const lampGlow = stage.querySelector('#lampGlow');
    const pullChain = stage.querySelector('#pullChain');
    const pullBall = stage.querySelector('#pullBall');
    const lampPrompt = stage.querySelector('#lampPrompt');
    const twilightCanvas = stage.querySelector('#twilightCanvas');
    const nextBtn = stage.querySelector('#btnNextToLetter');

    // Drag-to-pull String Physics
    let isPulling = false;
    let startY = 0;
    let dragY = 0;

    function startPull(e) {
      isPulling = true;
      const pt = e.touches ? e.touches[0] : e;
      startY = pt.clientY;
      pullChain.style.transition = 'none';
    }

    function movePull(e) {
      if (!isPulling) return;
      const pt = e.touches ? e.touches[0] : e;
      dragY = Math.max(0, Math.min(100, pt.clientY - startY));
      pullChain.style.transform = `translateY(${dragY}px)`;
    }

    function endPull() {
      if (!isPulling) return;
      isPulling = false;
      pullChain.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)';
      pullChain.style.transform = 'translateY(0px)';

      if (dragY > 35) {
        playSound('click');
        toggleLamp();
      }
    }

    function toggleLamp() {
      isLampOn = !isLampOn;
      if (!isLampOn) {
        // Switch to Romantic Twilight!
        lampWrap.classList.add('twilight-dark');
        lampGlow.style.opacity = '0';
        lampPrompt.innerHTML = "✨ You brought the stars to life...";
        nextBtn.style.visibility = 'visible';

        // Animate floating golden embers in dark
        twilightCanvas.width = viewport.clientWidth;
        twilightCanvas.height = viewport.clientHeight;
        const tCtx = twilightCanvas.getContext('2d');
        let fireflies = [];
        for (let i = 0; i < 40; i++) {
          fireflies.push({
            x: Math.random() * twilightCanvas.width,
            y: Math.random() * twilightCanvas.height,
            r: Math.random() * 3.5 + 1.5,
            alpha: Math.random() * 0.8 + 0.2,
            vy: -(Math.random() * 0.8 + 0.3),
            vx: (Math.random() - 0.5) * 0.5,
            phase: Math.random() * Math.PI * 2
          });
        }

        function drawFireflies() {
          tCtx.clearRect(0, 0, twilightCanvas.width, twilightCanvas.height);
          for (let f of fireflies) {
            f.phase += 0.03;
            tCtx.save();
            tCtx.beginPath();
            tCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            tCtx.fillStyle = `rgba(253, 224, 71, ${f.alpha * (0.6 + 0.4 * Math.sin(f.phase))})`;
            tCtx.shadowBlur = 12;
            tCtx.shadowColor = '#facc15';
            tCtx.fill();
            tCtx.restore();

            f.y += f.vy;
            f.x += f.vx;
            if (f.y < -10) f.y = twilightCanvas.height + 10;
          }
          if (!isLampOn && currentScene === 6) requestAnimationFrame(drawFireflies);
        }
        drawFireflies();

        // Smoothly reveal letter scene after 2.2s
        setTimeout(() => {
          goToScene(7);
        }, 2200);
      } else {
        lampWrap.classList.remove('twilight-dark');
        lampGlow.style.opacity = '1';
        lampPrompt.innerHTML = data.lampPrompt || 'DRAG THE STRING DOWN TO PULL';
      }
    }

    pullBall.onclick = () => {
      pullChain.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
      pullChain.style.transform = 'translateY(50px)';
      playSound('click');
      setTimeout(() => {
        pullChain.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)';
        pullChain.style.transform = 'translateY(0px)';
        toggleLamp();
      }, 200);
    };

    pullBall.onmousedown = startPull;
    window.onmousemove = movePull;
    window.onmouseup = endPull;

    pullBall.ontouchstart = startPull;
    pullBall.ontouchmove = movePull;
    pullBall.ontouchend = endPull;

    nextBtn.addEventListener('click', () => {
      playSound('key');
      goToScene(7);
    });
  }

  // ==========================================
  // SCENE 7: "A Letter, Just For You" Wax-Seal Envelope & Modal
  // ==========================================
  function renderScene7_Letter() {
    stage.className = "blossom-stage scene-7-letter";
    isLetterOpen = false;

    stage.innerHTML = `
      <div class="letter-screen-wrap">
        <h2 class="envelope-main-title">${data.letterPrompt || 'A Letter, Just For You'}</h2>
        <p class="envelope-subtitle">${data.letterSubprompt || 'Tap the envelope to unseal'}</p>

        <!-- 3D Pastel Envelope -->
        <div class="wax-envelope-wrap" id="envelopeWrapper">
          <div class="envelope-back"></div>
          <div class="envelope-letter-preview" id="letterPreview"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="envelopeFlap"></div>

          <!-- Magenta Wax Seal -->
          <button class="wax-seal-button" id="waxSealBtn" aria-label="Tap to open letter">
            <div class="wax-seal-emblem">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Full-Screen Letter Modal Dialog -->
        <div class="blossom-letter-modal-backdrop" id="letterModal">
          <div class="blossom-modal-card">
            <div class="modal-corner c-tl">┌</div>
            <div class="modal-corner c-tr">┐</div>
            <div class="modal-corner c-bl">└</div>
            <div class="modal-corner c-br">┘</div>
            
            <button class="modal-close-btn" id="btnCloseLetter">&times;</button>

            <div class="modal-card-header">
              <h3 class="modal-card-title">${data.letterModalTitle || 'Happy Birthday ✨'}</h3>
              <p class="modal-card-sub">${data.letterModalSub || 'Just for you ♡'}</p>
            </div>

            <div class="modal-card-body" id="typewriterBody">
              <span id="typedLetterText"></span><span class="typing-cursor">|</span>
            </div>

            <!-- Reaction Hearts Bar -->
            <div class="letter-reaction-bar">
              <button class="reaction-pill">❤️ <span>Love</span></button>
              <button class="reaction-pill">🥰 <span>Blush</span></button>
              <button class="reaction-pill">🥺 <span>Touched</span></button>
              <button class="reaction-pill">✨ <span>Forever</span></button>
            </div>

            <div class="modal-card-footer">
              <button class="btn-replay-story" id="btnReplayStory">↺ Replay Story</button>
              <button class="btn-share-story" id="btnShareStory">💌 Share Celebration</button>
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

    function openLetterModal() {
      if (isLetterOpen) return;
      isLetterOpen = true;

      playSound('letter');
      waxBtn.classList.add('cracked');
      flap.classList.add('open');

      setTimeout(() => {
        modal.classList.add('show');
        // Start Typewriter effect with live typing
        typewriterAnimation(data.letterBody || "");
      }, 550);
    }

    function typewriterAnimation(fullText) {
      typedTextEl.innerHTML = "";
      let charIdx = 0;
      const speed = 25; // ms per char

      function typeChar() {
        if (charIdx < fullText.length) {
          const char = fullText.charAt(charIdx);
          if (char === '\n') {
            typedTextEl.innerHTML += '<br/>';
          } else {
            typedTextEl.innerHTML += char;
          }
          charIdx++;
          setTimeout(typeChar, speed);
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

    btnReplay.addEventListener('click', () => {
      goToScene(0);
    });

    btnShare.addEventListener('click', () => {
      const shareUrl = encodeSiteToUrl('blossom', data);
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Celebration link copied! Send it on WhatsApp or Instagram DM 💖");
      });
    });

    // Reaction emojis
    stage.querySelectorAll('.reaction-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('blossom');
        btn.classList.add('popped');
        setTimeout(() => btn.classList.remove('popped'), 400);
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
