// src/viewer/templates/treeTemplate.js - Cinematic Cupid & Blossom Tree Template
// Inspired by sam03127/birthday- with 4-act GSAP film, procedural canvas tree,
// tap-to-read love notes, polaroid memories scrapbook, and mini spinning CD player.

import gsap from 'gsap';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

// Register GSAP pen-stroke plugin for the hand-drawn underline
try {
  gsap.registerPlugin({
    name: 'drawn',
    init(target, value) {
      const len = target.getTotalLength();
      target.style.strokeDasharray = len;
      this.target = target;
      this.len = len;
      this.value = value;
    },
    render(ratio, data) {
      data.target.style.strokeDashoffset = data.len * (1 - data.value * ratio);
    },
  });
} catch (e) {
  // Ignore re-registration errors
}

export function renderTreeTemplate(container, data, isMakerReview = false) {
  // Normalize data with fallbacks
  const recipient = data.recipientName || 'My Love';
  const polaroids = data.polaroids && data.polaroids.length > 0 ? data.polaroids : [
    { image: '/images/sunset.jpg', caption: 'Our favourite sunset walk 🌅' },
    { image: '/images/always_you.jpg', caption: 'Always laughing with you 🫶' },
    { image: '/images/pretty.jpg', caption: 'Your breathtaking smile ✨' },
    { image: '/images/dream_girl.jpg', caption: 'Adventures of a lifetime 💫' },
    { image: '/images/queen.jpg', caption: 'Forever my queen 👑' }
  ];

  const loveNotesList = data.loveNotes && data.loveNotes.length > 0 ? data.loveNotes : [
    "You are the prettiest sight in my entire world 🌸",
    "Every moment with you feels like pure magic ✨",
    "Your smile is my absolute favourite thing in life 🥰",
    "I love you more than words can ever describe 💖",
    "Thank you for being my constant happy place 🫶",
    "Here's to a lifetime of love and unforgettable memories 🥂"
  ];

  const complimentsList = data.shuffleCompliments && data.shuffleCompliments.length > 0 ? data.shuffleCompliments : [
    "You make my entire universe brighter just by existing 🌟",
    "You are the definition of breathtaking beauty inside and out 💖",
    "I fall in love with you all over again every single day 🌸",
    "Your gentle touch calms any storm in my life 🕊️",
    "Nobody in the world could ever replace you 👑",
    "Your happiness is my highest priority forever and always ✨"
  ];

  const reasonsList = data.reasons && data.reasons.length > 0 ? data.reasons : [
    "The way your eyes light up whenever you laugh",
    "How you make every single day feel like home",
    "Your endless kindness and the purest heart",
    "How we can talk for hours about absolutely everything"
  ];

  const letterBody = data.letterText || `Dear ${recipient},

Happy birthday! From the moment you walked into my life, you brought colors, laughter, and a warmth I never knew existed. Watching you grow, smile, and achieve your dreams is my greatest joy.

Thank you for being my partner, my best friend, and my whole heart. Here is to celebrating you today and always.

I love you endlessly. ♡`;

  container.innerHTML = `
    <div class="tree-film-stage scene" id="treeFilmStage">
      <!-- ACT 0: GATE -->
      <div class="gate" id="treeGate" role="button" tabindex="0" aria-label="Tap to unwrap your gift">
        <div class="gate__sparkles" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="gate__box">
          <span class="gate__paper" aria-hidden="true"></span>
          <span class="gate__ribbonV"></span>
          <span class="gate__ribbonH"></span>
          <span class="gate__shine" aria-hidden="true"></span>
          <span class="gate__bow">
            <svg viewBox="0 0 64 40" aria-hidden="true">
              <path d="M32 20 C 20 2, 2 4, 6 18 C 10 28, 24 24, 32 20 C 40 24, 54 28, 58 18 C 62 4, 44 2, 32 20 Z" fill="#d4235c" stroke="#a80f43" stroke-width="1.4"/>
              <circle cx="32" cy="20" r="5.5" fill="#ffcf6a"/>
            </svg>
          </span>
        </div>
        <p class="gate__label">${data.gateLabel || 'tap to unwrap'}<span class="gate__dots"><span>.</span><span>.</span><span>.</span></span></p>
      </div>

      <!-- ACT 4: PROCEDURAL CANVAS TREE -->
      <canvas id="treeCanvas" class="tree" aria-label="A blossom tree grows and blooms into a heart made of petals" role="img"></canvas>

      <!-- ACT 1: HERO ARCHERY & BEATING HEART TARGET -->
      <section class="hero" id="treeHero" aria-label="Draw the bow to open your card">
        <div class="hero__bg" aria-hidden="true"></div>
        <div class="hero__motes" id="treeMotes" aria-hidden="true"></div>

        <p class="hero__eyebrow" id="treeEyebrow">${data.eyebrow || 'a little something, for you'}</p>

        <!-- TARGET HEART -->
        <div class="targetWrap" aria-hidden="true">
          <div class="target" id="treeTarget">
            <span class="heart__glow" aria-hidden="true"></span>
            <span class="target__heart" id="treeTargetHeart">
              <svg class="heart__svg" viewBox="0 0 100 92" aria-hidden="true">
                <defs>
                  <radialGradient id="tree_hg" cx="38%" cy="30%" r="80%">
                    <stop offset="0%" stop-color="#ffd9e4" />
                    <stop offset="42%" stop-color="#ff6f97" />
                    <stop offset="82%" stop-color="#d81e57" />
                    <stop offset="100%" stop-color="#9d0f3e" />
                  </radialGradient>
                  <linearGradient id="tree_hsheen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(255,255,255,.85)" />
                    <stop offset="34%" stop-color="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#tree_hg)" />
                <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#tree_hsheen)" opacity=".7" />
                <ellipse cx="34" cy="30" rx="8.5" ry="5.4" fill="#fff" opacity=".72" style="mix-blend-mode:screen" />
              </svg>
            </span>
          </div>
        </div>

        <!-- RECURVE BOW + CUPID'S ARROW -->
        <div class="archery" id="treeArchery" role="button" tabindex="0" aria-label="Draw the bow and release to send the arrow to the heart">
          <div class="aim" id="treeAim" aria-hidden="true"></div>
          <svg class="bow" id="treeBow" viewBox="0 0 460 300" aria-hidden="true">
            <defs>
              <linearGradient id="tree_limb" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#4a2a1a" />
                <stop offset=".18" stop-color="#6b3f24" />
                <stop offset=".5" stop-color="#8a5127" />
                <stop offset=".82" stop-color="#6b3f24" />
                <stop offset="1" stop-color="#4a2a1a" />
              </linearGradient>
              <linearGradient id="tree_limbHi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="rgba(255,214,160,.8)" />
                <stop offset="1" stop-color="rgba(255,214,160,0)" />
              </linearGradient>
              <linearGradient id="tree_grip" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#2a1a10" />
                <stop offset=".5" stop-color="#5a3822" />
                <stop offset="1" stop-color="#2a1a10" />
              </linearGradient>
            </defs>
            <path class="bow__limb" d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96" fill="none" stroke="url(#tree_limb)" stroke-width="13" stroke-linecap="round" />
            <path class="bow__limbHi" d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96" fill="none" stroke="url(#tree_limbHi)" stroke-width="3" stroke-linecap="round" opacity=".7" />
            <path d="M34 96 C 22 82, 26 70, 40 66" fill="none" stroke="url(#tree_limb)" stroke-width="8" stroke-linecap="round" />
            <path d="M426 96 C 438 82, 434 70, 420 66" fill="none" stroke="url(#tree_limb)" stroke-width="8" stroke-linecap="round" />
            <rect x="216" y="206" width="28" height="70" rx="9" fill="url(#tree_grip)" />
            <path d="M219 220h22 M219 236h22 M219 252h22" stroke="rgba(0,0,0,.35)" stroke-width="2" />
            <line class="bow__str" id="treeStrL" x1="40" y1="70" x2="230" y2="96" stroke="#9a8068" stroke-width="2.2" stroke-linecap="round" />
            <line class="bow__str" id="treeStrR" x1="420" y1="70" x2="230" y2="96" stroke="#9a8068" stroke-width="2.2" stroke-linecap="round" />
            <circle class="bow__serving" id="treeServing" cx="230" cy="96" r="4.5" fill="#6f5137" />
          </svg>

          <svg class="arrow" id="treeArrow" viewBox="0 0 64 220" aria-hidden="true">
            <defs>
              <linearGradient id="tree_shaft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#4a2c14" />
                <stop offset=".5" stop-color="#8a5a2c" />
                <stop offset="1" stop-color="#3e2410" />
              </linearGradient>
              <linearGradient id="tree_gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#ffe38c" />
                <stop offset=".45" stop-color="#f4a626" />
                <stop offset="1" stop-color="#a85f0e" />
              </linearGradient>
              <linearGradient id="tree_feath" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#ff7f9c" />
                <stop offset=".5" stop-color="#e6396a" />
                <stop offset="1" stop-color="#a8154a" />
              </linearGradient>
              <linearGradient id="tree_wing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="1" stop-color="#ffe0c4" />
              </linearGradient>
            </defs>
            <rect x="29.4" y="30" width="5.2" height="168" rx="2.6" fill="url(#tree_shaft)" />
            <g class="arrow__wings">
              <path class="wingL" d="M31 30 C 10 16, 2 20, 4 34 C 12 30, 20 32, 31 40 Z" fill="url(#tree_wing)" stroke="rgba(196,132,58,.72)" stroke-width="1.2"/>
              <path class="wingR" d="M33 30 C 54 16, 62 20, 60 34 C 52 30, 44 32, 33 40 Z" fill="url(#tree_wing)" stroke="rgba(196,132,58,.72)" stroke-width="1.2"/>
            </g>
            <path class="arrow__head" d="M32 12 C 30 7, 22 6.5, 21.5 13 C 21 18, 27 22, 32 27 C 37 22, 43 18, 42.5 13 C 42 6.5, 34 7, 32 12 Z" fill="url(#tree_gold)" stroke="#a5701a" stroke-width=".8" />
            <ellipse cx="27" cy="13" rx="2.6" ry="1.7" fill="#fff" opacity=".8" style="mix-blend-mode:screen" />
            <g class="arrow__fletch">
              <path d="M32 150 C 16 156, 10 178, 15 200 C 24 194, 30 184, 32 176 Z" fill="url(#tree_feath)" />
              <path d="M32 150 C 48 156, 54 178, 49 200 C 40 194, 34 184, 32 176 Z" fill="url(#tree_feath)" opacity=".92" />
              <path d="M28 160l4 3 M26 170l6 3 M25 180l7 3" stroke="rgba(130,12,48,.45)" stroke-width="1" />
              <path d="M36 160l-4 3 M38 170l-6 3 M39 180l-7 3" stroke="rgba(130,12,48,.45)" stroke-width="1" />
            </g>
            <path d="M29 200 L32 205 L35 200" fill="none" stroke="#c9a25a" stroke-width="2" stroke-linecap="round"/>
            <circle id="treeTip" cx="32" cy="9" r="0.6" fill="none" />
          </svg>
        </div>

        <p class="hero__hint" id="treeHint">${data.hint || 'pull &amp; release'}</p>
      </section>

      <!-- ACT 2: ROSE FLOOD -->
      <div class="flood" id="treeFlood" aria-hidden="true"></div>

      <!-- ACT 3: KINETIC TYPOGRAPHY WISH -->
      <div class="field" id="treeField" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
        <div class="blob blob--3"></div>
        <div class="fgrid" id="treeFgrid"></div>
        <div class="fvignette"></div>

        <div class="camera" id="treeCamera">
          <p class="kEyebrow" id="treeKEyebrow">${data.kEyebrow || 'make a wish…'}</p>
          <h2 class="headline" id="treeHeadline">
            <span class="hl__line"><span class="mask"><span class="hl__word" id="treeWLine1">${data.wLine1 || 'Happy'}</span></span></span>
            <span class="hl__line"><span class="mask"><span class="hl__word" id="treeWLine2">${data.wLine2 || 'Birthday'}</span></span></span>
          </h2>
          <svg class="uline" id="treeUline" viewBox="0 0 300 26" fill="none" aria-hidden="true">
            <path class="uline__path" d="M8 16C56 7 132 4 178 6c30 1 78 5 114 12-40 3-108 4-176 3" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="kSub" id="treeKSub">${data.kSub || 'to someone worth celebrating'}</p>
        </div>

        <div class="bar bar--top" id="treeBarTop"></div>
        <div class="bar bar--bot" id="treeBarBot"></div>
      </div>

      <!-- HANDOFF BLOOM -->
      <div class="bloom" id="treeBloom" aria-hidden="true"></div>

      <!-- ACT 4: CALLIGRAPHY WISH OVER TREE -->
      <div class="wish" id="treeWish" aria-hidden="true">
        <p class="wish__eyebrow" id="treeWEyebrow">${data.wEyebrow || 'and… make it count'}</p>
        <div class="wish__heroWrap"><h1 class="wish__hero" id="treeWHero">${data.wHero || `Happy Birthday, ${recipient}`}</h1></div>
        <span class="wish__rule" id="treeWRule"></span>
        <p class="wish__sub" id="treeWSub">${data.wSub || 'here’s to a year that blooms'}</p>
        <p class="loveHint" id="treeLoveHint">${data.loveHint || '✦ tap the blossoms ✦'}</p>
      </div>

      <!-- FLOATING LOVE NOTE BUBBLE -->
      <div class="loveNote" id="treeLoveNote" aria-hidden="true"><p id="treeLoveNoteText"></p></div>

      <!-- SHOOTING STAR -->
      <div class="star" id="treeStar" aria-hidden="true"></div>

      <!-- REPLAY & MEMORIES BUTTONS -->
      <button class="replay" id="treeReplay" type="button" hidden>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
          <path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor" />
        </svg>
        Again
      </button>

      <button class="memoriesBtn" id="treeMemoriesBtn" type="button" hidden>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="14" height="14">
          <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.7.6 4.9 2.2C11.7 4.6 13.4 3.7 15.4 4 19 4.5 20.6 8 20 11.7 17.5 16.4 12 21 12 21z" fill="currentColor"/>
        </svg>
        Our Memories
      </button>

      <!-- UPPER-RIGHT SPINNING MINI VINYL CD PLAYER -->
      <div class="corner-mini-cd-player" id="treeMusicToggle" role="button" aria-label="Toggle Music Player" title="Tap to Play / Pause Music">
        <div class="mini-cd-disc" id="treeMiniCd">
          <div class="cd-groove-rings"></div>
          <div class="cd-holo-sheen"></div>
          <div class="cd-center-sticker">
            <img src="${polaroids[0]?.image || '/images/sunset.jpg'}" class="cd-cover-art" alt="Cover" />
            <span class="cd-center-spindle"></span>
          </div>
        </div>
        <div class="cd-track-pill" id="treeTrackPill">
          <div class="cd-pill-equalizer"><span></span><span></span><span></span></div>
          <span class="cd-pill-title">${data.audioTitle || "Romantic Theme"}</span>
        </div>
        <audio id="treeAudio" loop preload="auto">
          <source src="${data.audioSrc || '/audio/alfaaz.mp3'}" type="audio/mpeg" />
        </audio>
      </div>

      <!-- ACT 5: MEMORIES SCRAPBOOK OVERLAY -->
      <div class="memories" id="treeMemories" aria-hidden="true">
        <div class="memories__inner">
          <button class="memories__close" id="treeMemoriesClose" type="button" aria-label="Close">✕</button>

          <p class="memories__eyebrow">${data.scrapbookEyebrow || 'a little scrapbook'}</p>
          <h3 class="memories__title">${data.scrapbookTitle || 'Memory Lane'}</h3>

          <!-- POLAROID GALLERY -->
          <div class="polaroids">
            ${polaroids.map((p, i) => `
              <figure class="polaroid polaroid--${(i % 5) + 1}">
                <div class="polaroid__img" style="background-image:url('${p.image || '/images/sunset.jpg'}');"></div>
                <figcaption>${p.caption || p.title || 'Our Sweet Memory ✎'}</figcaption>
                <button type="button" class="btn-download-polaroid" title="Save high-res keepsake to photos" style="margin: 8px auto 4px auto;">
                  📸 Save Keepsake
                </button>
              </figure>
            `).join('')}
          </div>

          <!-- REASONS WALL -->
          <p class="memories__eyebrow memories__eyebrow--2">a few reasons, out of many</p>
          <div class="notes">
            ${reasonsList.map((reason, i) => `
              <div class="note note--${(i % 4) + 1}"><p>${reason}</p></div>
            `).join('')}
          </div>

          <!-- SHUFFLE COMPLIMENT CARD -->
          <div class="shuffleCard" id="treeShuffleCard">
            <p id="treeShuffleText">${complimentsList[0] || 'tap for one more reason ✎'}</p>
            <button type="button" id="treeShuffleBtn">🔀 another one</button>
          </div>

          <!-- SEALED ENVELOPE WITH TYPEWRITER LETTER -->
          <p class="memories__eyebrow memories__eyebrow--2">one more thing</p>
          <div class="envelope" id="treeEnvelope">
            <div class="envelope__flap"></div>
            <div class="envelope__body">
              <span class="envelope__seal">♡</span>
              <span class="envelope__label">open me</span>
            </div>
          </div>
          <div class="letter" id="treeLetter" hidden>
            <p id="treeLetterText"></p>
          </div>

          <!-- MAKE A WISH BUTTON -->
          <button class="wishBtn" id="treeWishBtn" type="button">🌠 make a wish</button>
        </div>
      </div>

      <!-- VIGNETTE & FINE GRAIN LENS -->
      <div class="grade" aria-hidden="true">
        <div class="grade__vignette"></div>
        <div class="grade__grain"></div>
      </div>
    </div>
  `;

  // Get DOM elements scoped to container
  const stage = container.querySelector('#treeFilmStage');
  const gate = container.querySelector('#treeGate');
  const canvas = container.querySelector('#treeCanvas');
  const ctx = canvas.getContext('2d');

  const hero = container.querySelector('#treeHero');
  const eyebrow = container.querySelector('#treeEyebrow');
  const hint = container.querySelector('#treeHint');
  const motes = container.querySelector('#treeMotes');
  const target = container.querySelector('#treeTarget');
  const targetHeart = container.querySelector('#treeTargetHeart');
  const heartGlow = target.querySelector('.heart__glow');
  const aim = container.querySelector('#treeAim');

  const archery = container.querySelector('#treeArchery');
  const bow = container.querySelector('#treeBow');
  const arrow = container.querySelector('#treeArrow');
  const tip = container.querySelector('#treeTip');
  const strL = container.querySelector('#treeStrL');
  const strR = container.querySelector('#treeStrR');
  const serving = container.querySelector('#treeServing');

  const flood = container.querySelector('#treeFlood');
  const field = container.querySelector('#treeField');
  const camera = container.querySelector('#treeCamera');
  const fgrid = container.querySelector('#treeFgrid');
  const kEyebrow = container.querySelector('#treeKEyebrow');
  const kSub = container.querySelector('#treeKSub');
  const barTop = container.querySelector('#treeBarTop');
  const barBot = container.querySelector('#treeBarBot');
  const uline = container.querySelector('#treeUline')?.querySelector('.uline__path');
  const bloom = container.querySelector('#treeBloom');

  const wishEl = container.querySelector('#treeWish');
  const replay = container.querySelector('#treeReplay');
  const memoriesBtn = container.querySelector('#treeMemoriesBtn');
  const memories = container.querySelector('#treeMemories');
  const memoriesClose = container.querySelector('#treeMemoriesClose');

  const loveNote = container.querySelector('#treeLoveNote');
  const loveNoteText = container.querySelector('#treeLoveNoteText');
  const starEl = container.querySelector('#treeStar');
  const wishBtn = container.querySelector('#treeWishBtn');
  const shuffleBtn = container.querySelector('#treeShuffleBtn');
  const shuffleText = container.querySelector('#treeShuffleText');
  const envelope = container.querySelector('#treeEnvelope');
  const letterEl = container.querySelector('#treeLetter');
  const letterText = container.querySelector('#treeLetterText');

  // Mini CD Music controls
  const musicToggle = container.querySelector('#treeMusicToggle');
  const miniCd = container.querySelector('#treeMiniCd');
  const trackPill = container.querySelector('#treeTrackPill');
  const audioEl = container.querySelector('#treeAudio');

  // Math helpers
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutBack = (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r = clamp((n >> 16) + amt, 0, 255),
      g = clamp(((n >> 8) & 255) + amt, 0, 255),
      b = clamp((n & 255) + amt, 0, 255);
    return `rgb(${r | 0},${g | 0},${b | 0})`;
  }

  // Soft tone generator for interactive feedback
  let audioCtx = null;
  function chime(f1 = 720, f2 = 900) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t0 = audioCtx.currentTime;
      [[f1, t0], [f2, t0 + 0.08]].forEach(([f, t]) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(t);
        o.stop(t + 0.24);
      });
    } catch (_) {}
  }

  // --- TREE ENGINE (Act 4) ---
  const BLOSSOM_PALETTES = [
    { c0: '#ffe1ec', c1: '#ff80aa' },
    { c0: '#ffd0e0', c1: '#f4577f' },
    { c0: '#ffc4d2', c1: '#e23b67' },
    { c0: '#ffd9c4', c1: '#ff8a5b' },
    { c0: '#ffeec2', c1: '#f6b13e' },
    { c0: '#ffd2e6', c1: '#e84d9a' },
  ];

  const TIMINGS = {
    trunkStart: 0.10,
    branchSpan: 1.80,
    bloomT0: 1.25,
    bloomSpan: 2.00,
    petalT0: 2.45,
    noteStart: 0.45,
    done: 4.60,
  };

  const SPRITE_SIZE = 168;

  function heartShape(c, x, top, w, h) {
    c.beginPath();
    c.moveTo(x, top + h * 0.28);
    c.bezierCurveTo(x, top, x - w * 0.5, top, x - w * 0.5, top + h * 0.28);
    c.bezierCurveTo(x - w * 0.5, top + h * 0.60, x - w * 0.16, top + h * 0.80, x, top + h);
    c.bezierCurveTo(x + w * 0.16, top + h * 0.80, x + w * 0.5, top + h * 0.60, x + w * 0.5, top + h * 0.28);
    c.bezierCurveTo(x + w * 0.5, top, x, top, x, top + h * 0.28);
    c.closePath();
  }

  function makeBlossom({ c0, c1 }, soft) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = SPRITE_SIZE;
    const c = cv.getContext('2d');
    const w = SPRITE_SIZE * 0.62, h = SPRITE_SIZE * 0.58, x = SPRITE_SIZE / 2, top = SPRITE_SIZE * 0.17;

    c.save();
    c.shadowColor = 'rgba(150,38,72,0.32)';
    c.shadowBlur = SPRITE_SIZE * 0.085;
    c.shadowOffsetY = SPRITE_SIZE * 0.05;
    c.fillStyle = c1;
    heartShape(c, x, top, w, h);
    c.fill();
    c.restore();

    const g = c.createRadialGradient(x - w * 0.20, top + h * 0.20, h * 0.04, x, top + h * 0.42, h * 0.92);
    g.addColorStop(0, c0);
    g.addColorStop(0.55, c1);
    g.addColorStop(1, shade(c1, -26));
    heartShape(c, x, top, w, h);
    c.fillStyle = g;
    c.fill();

    c.save();
    heartShape(c, x, top, w, h);
    c.clip();
    const g2 = c.createLinearGradient(0, top, 0, top + h);
    g2.addColorStop(0, 'rgba(255,255,255,0)');
    g2.addColorStop(0.65, 'rgba(110,16,46,0)');
    g2.addColorStop(1, 'rgba(110,16,46,0.26)');
    c.fillStyle = g2;
    c.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    c.globalAlpha = 0.55;
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.ellipse(x - w * 0.15, top + h * 0.24, w * 0.17, h * 0.11, -0.5, 0, Math.PI * 2);
    c.fill();
    c.restore();

    if (!soft) return cv;

    const cv2 = document.createElement('canvas');
    cv2.width = cv2.height = SPRITE_SIZE;
    const c2 = cv2.getContext('2d');
    c2.filter = 'blur(2.6px)';
    c2.drawImage(cv, 0, 0);
    c2.filter = 'none';
    c2.globalCompositeOperation = 'source-atop';
    c2.globalAlpha = 0.42;
    c2.fillStyle = '#fff3ea';
    c2.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    return cv2;
  }

  function makeBokeh(rgb) {
    const S = 128, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, `rgba(${rgb},0.9)`);
    g.addColorStop(0.45, `rgba(${rgb},0.22)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, S, S);
    return cv;
  }

  function makeSparkle() {
    const S = 64, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    const m = S / 2;
    const g = c.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.25, 'rgba(255,236,200,0.5)');
    g.addColorStop(1, 'rgba(255,236,200,0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(m, m, m, 0, 6.2832);
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.95)';
    c.translate(m, m);
    for (let k = 0; k < 2; k++) {
      c.beginPath();
      c.moveTo(0, -m);
      c.quadraticCurveTo(0, 0, m, 0);
      c.quadraticCurveTo(0, 0, 0, m);
      c.quadraticCurveTo(0, 0, -m, 0);
      c.quadraticCurveTo(0, 0, 0, -m);
      c.fill();
      c.rotate(Math.PI / 4);
      c.scale(0.5, 0.5);
    }
    return cv;
  }

  let SPR = { crisp: [], soft: [] }, BOKEH = [], SPARKLE = null;
  function buildSprites() {
    SPR = {
      crisp: BLOSSOM_PALETTES.map((b) => makeBlossom(b, false)),
      soft: BLOSSOM_PALETTES.map((b) => makeBlossom(b, true)),
    };
    BOKEH = [makeBokeh('255,224,188'), makeBokeh('255,196,214'), makeBokeh('255,238,210')];
    SPARKLE = makeSparkle();
  }

  function drawSprite(sprite, x, y, size, rot, alpha) {
    ctx.save();
    ctx.translate(x, y);
    if (rot) ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, -size * 0.5, -size * 0.47, size, size);
    ctx.restore();
  }

  let heartPoly = null;
  function buildHeartPoly() {
    const raw = [];
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (let i = 0; i <= 160; i++) {
      const t = (i / 160) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      raw.push([x, y]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2, hw = (maxX - minX) / 2, hh = (maxY - minY) / 2;
    heartPoly = raw.map(([x, y]) => [(x - midX) / hw, (y - midY) / hh]);
  }

  function pointInPoly(x, y) {
    let inside = false;
    const p = heartPoly;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const xi = p[i][0], yi = p[i][1], xj = p[j][0], yj = p[j][1];
      if ((yi > y !== yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  let W = 0, H = 0, dpr = 1;
  let cx = 0, cy = 0, rx = 0, ry = 0, groundY = 0;
  let branches = [], hearts = [], petals = [], rested = [], orbs = [], floaters = [], twinkles = [];
  let bgGrad = null, glowGrad = null, groundGrad = null;

  const quad = (b, t) => {
    const m = 1 - t, a = m * m, k = 2 * m * t, d = t * t;
    return { x: a * b.x1 + k * b.cx + d * b.x2, y: a * b.y1 + k * b.cy + d * b.y2 };
  };

  function barkGrad(x1, y1, x2, y2, depth) {
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, `hsl(348 26% ${26 + depth * 3}%)`);
    g.addColorStop(1, `hsl(346 24% ${40 + depth * 5}%)`);
    return g;
  }

  function buildScene() {
    branches = []; hearts = []; petals = []; rested = []; twinkles = []; orbs = []; floaters = [];
    buildHeartPoly();

    const wide = W / H > 1.2;
    cx = W * (wide ? 0.57 : 0.5);
    cy = H * (wide ? 0.37 : 0.38);
    ry = Math.min(H * (wide ? 0.33 : 0.33), W * 0.34);
    rx = ry * 1.16;
    groundY = H * 0.93;

    bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#fff3e9');
    bgGrad.addColorStop(0.46, '#ffe7d6');
    bgGrad.addColorStop(0.78, '#fcd9c4');
    bgGrad.addColorStop(1, '#f3c4b5');

    glowGrad = ctx.createRadialGradient(cx, cy, ry * 0.1, cx, cy, ry * 1.55);
    glowGrad.addColorStop(0, 'rgba(255,219,170,0.6)');
    glowGrad.addColorStop(0.5, 'rgba(255,170,150,0.2)');
    glowGrad.addColorStop(1, 'rgba(255,170,150,0)');

    groundGrad = ctx.createRadialGradient(cx, H * 1.02, ry * 0.2, cx, H * 1.02, ry * 1.6);
    groundGrad.addColorStop(0, 'rgba(255,205,165,0.5)');
    groundGrad.addColorStop(1, 'rgba(255,205,165,0)');

    for (let i = 0; i < 11; i++) {
      orbs.push({
        x: rand(0, W), y: rand(0, H), r: rand(W * 0.05, W * 0.17),
        vy: rand(-6, -16), drift: rand(-0.3, 0.3), phase: rand(0, 6.28),
        alpha: rand(0.05, 0.13), sprite: pick(BOKEH)
      });
    }

    const FN = wide ? 18 : 15;
    for (let i = 0; i < FN; i++) {
      const depth = Math.random();
      floaters.push({
        x: rand(0, W), y: rand(-H * 0.1, H * 1.1), depth,
        idx: (Math.random() * BLOSSOM_PALETTES.length) | 0,
        box: lerp(Math.min(W, H) * 0.025, Math.min(W, H) * 0.075, depth),
        vy: lerp(7, 20, depth), sway: rand(8, 22), phase: rand(0, 6.28),
        rot: rand(-0.4, 0.4), vrot: rand(-0.5, 0.5),
        baseA: lerp(0.16, 0.5, depth), soft: depth < 0.45,
      });
    }

    const baseX = cx, baseY = H * 1.0;
    const trunkTopY = cy + ry * 0.62;
    const trunkW = Math.max(9, W * 0.024);
    const limbLen = ry * 0.6;
    const insidePx = (x, y, m = 0.9) => pointInPoly((x - cx) / (rx * m), (cy - y) / (ry * m));

    function addBranch(x, y, ang, len, w0, depth, t0) {
      let ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len, clipped = false;
      if (!insidePx(ex, ey)) {
        let lo = 0, hi = 1;
        for (let k = 0; k < 12; k++) {
          const mid = (lo + hi) / 2;
          insidePx(x + Math.cos(ang) * len * mid, y + Math.sin(ang) * len * mid) ? (lo = mid) : (hi = mid);
        }
        ex = x + Math.cos(ang) * len * lo;
        ey = y + Math.sin(ang) * len * lo;
        clipped = true;
      }
      const mx = (x + ex) / 2, my = (y + ey) / 2,
        perp = ang + Math.PI / 2,
        bend = rand(-1, 1) * len * 0.12,
        w1 = w0 * 0.66;
      branches.push({
        x1: x, y1: y, cx: mx + Math.cos(perp) * bend, cy: my + Math.sin(perp) * bend,
        x2: ex, y2: ey, w0, w1, t0, dur: Math.max(0.14, 0.32 - depth * 0.03), depth,
        grad: barkGrad(x, y, ex, ey, depth)
      });
      return { ex, ey, w1, clipped };
    }

    function grow(x, y, ang, len, w, depth, t0) {
      const r = addBranch(x, y, ang, len, w, depth, t0);
      if (r.clipped || depth >= 6 || len < ry * 0.06) return;
      const childT0 = t0 + (0.32 - depth * 0.03) * 0.6;
      const n = Math.random() < 0.55 ? 2 : 3;
      for (let i = 0; i < n; i++) {
        const spread = 0.6 * (i - (n - 1) / 2) + rand(-0.22, 0.22), lift = -0.06 + rand(-0.05, 0.05);
        grow(r.ex, r.ey, ang + spread + lift, len * rand(0.74, 0.84), r.w1, depth + 1, childT0 + i * 0.03);
      }
    }

    addBranch(baseX, baseY, -Math.PI / 2, baseY - trunkTopY, trunkW, 0, TIMINGS.trunkStart);
    branches[0].dur = 0.55;
    const limbT0 = TIMINGS.trunkStart + 0.36, L = 3;
    for (let i = 0; i < L; i++) {
      const ang = -Math.PI / 2 + 0.62 * (i - (L - 1) / 2) + rand(-0.12, 0.12);
      grow(baseX, trunkTopY, ang, limbLen, trunkW * 0.7, 1, limbT0 + i * 0.05);
    }

    const maxT0 = branches.reduce((m, b) => Math.max(m, b.t0 + b.dur), 0);
    const sc = (TIMINGS.branchSpan - TIMINGS.trunkStart) / (maxT0 - TIMINGS.trunkStart);
    for (const b of branches) b.t0 = TIMINGS.trunkStart + (b.t0 - TIMINGS.trunkStart) * sc;

    const COUNT = Math.round(clamp((rx * ry) / 56, 250, 440));
    const baseBox = clamp(Math.min(W, H) * 0.115, 30, 74);
    let guard = 0;
    while (hearts.length < COUNT && guard < COUNT * 50) {
      guard++;
      const u = rand(-1.06, 1.06), v = rand(-1.06, 1.06);
      if (!pointInPoly(u, v)) continue;
      const x = cx + u * rx, y = cy - v * ry;
      const d = clamp01(Math.hypot(u, v + 1) / 2.4);
      const t0 = TIMINGS.bloomT0 + d * (TIMINGS.bloomSpan * 0.82) + rand(0, TIMINGS.bloomSpan * 0.18);
      const soft = Math.random() < 0.42;
      hearts.push({
        x, y, idx: (Math.random() * BLOSSOM_PALETTES.length) | 0,
        soft, box: baseBox * (soft ? rand(0.6, 0.85) : rand(0.78, 1.12)),
        rot: rand(-0.55, 0.55), sway: rand(0, 6.28), t0
      });
    }
    hearts.sort((a, b) => (a.soft === b.soft ? a.y - b.y : a.soft ? -1 : 1));
  }

  function drawBackground() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1;
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawGodRays(t, intensity) {
    if (intensity <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const ox = cx, oy = cy - ry * 0.35, R = Math.hypot(W, H) * 1.1;
    const rays = 9, sweep = Math.sin(t * 0.07) * 0.18;
    for (let i = 0; i < rays; i++) {
      const a = -Math.PI / 2 + sweep + (i - (rays - 1) / 2) * 0.2;
      const hw = 0.035 + 0.02 * (0.5 + 0.5 * Math.sin(t * 0.5 + i * 1.7));
      const a1 = a - hw, a2 = a + hw;
      const g = ctx.createLinearGradient(ox, oy, ox + Math.cos(a) * R, oy + Math.sin(a) * R);
      g.addColorStop(0, `rgba(255,232,190,${0.10 * intensity})`);
      g.addColorStop(0.5, `rgba(255,214,170,${0.05 * intensity})`);
      g.addColorStop(1, 'rgba(255,214,170,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(a1) * R, oy + Math.sin(a1) * R);
      ctx.lineTo(ox + Math.cos(a2) * R, oy + Math.sin(a2) * R);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawGlow(t) {
    const gi = clamp01((t - TIMINGS.bloomT0) / (TIMINGS.bloomSpan * 0.9));
    if (gi <= 0) return;
    ctx.save();
    ctx.globalAlpha = gi;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawBokeh(t, dt) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const o of orbs) {
      o.y += o.vy * dt;
      o.x += Math.sin(t * 0.3 + o.phase) * o.drift;
      if (o.y < -o.r) { o.y = H + o.r; o.x = rand(0, W); }
      ctx.globalAlpha = o.alpha;
      ctx.drawImage(o.sprite, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
    }
    ctx.restore();
  }

  function drawFloaters(t, dt, front) {
    const appear = clamp01((t - 0.2) / 1.4);
    if (appear <= 0) return;
    for (const f of floaters) {
      if ((f.depth >= 0.6) !== front) continue;
      f.y -= f.vy * dt;
      f.x += Math.sin(t * 0.5 + f.phase) * f.sway * dt;
      f.rot += f.vrot * dt;
      if (f.y < -f.box) { f.y = H + f.box; f.x = rand(0, W); }
      drawSprite((f.soft ? SPR.soft : SPR.crisp)[f.idx], f.x, f.y, f.box, f.rot, f.baseA * appear);
    }
  }

  function drawBranches(t) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const b of branches) {
      const f = clamp01((t - b.t0) / b.dur);
      if (f <= 0) continue;
      const e = easeOutCubic(f);
      ctx.strokeStyle = b.grad;
      const steps = 12, last = Math.max(1, Math.ceil(steps * e));
      let prev = quad(b, 0);
      for (let i = 1; i <= last; i++) {
        const tt = Math.min(e, i / steps), p = quad(b, tt);
        ctx.lineWidth = lerp(b.w0, b.w1, tt);
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        prev = p;
      }
    }
  }

  function drawHearts(t) {
    const breathe = 1 + Math.sin(t * 0.8) * 0.012;
    for (const h of hearts) {
      const p = clamp01((t - h.t0) / 0.6);
      if (p <= 0) continue;
      const scale = Math.max(0, easeOutBack(p));
      let alpha = clamp01(p * 1.7);
      if (h.soft) alpha *= 0.8;
      const settled = clamp01((t - h.t0 - 0.6) / 0.7);
      const sway = settled * Math.sin(t * 1.5 + h.sway) * (h.box * 0.05);
      const rise = (1 - easeOutCubic(p)) * h.box * 0.45;
      const hx = cx + (h.x - cx) * breathe + sway;
      const hy = cy + (h.y - cy) * breathe - rise;
      drawSprite((h.soft ? SPR.soft : SPR.crisp)[h.idx], hx, hy, h.box * scale, h.rot + sway * 0.012, alpha);
    }
  }

  function updateTwinkles(t, dt) {
    const active = t > TIMINGS.bloomT0 + TIMINGS.bloomSpan * 0.45;
    if (active && twinkles.length < 9 && Math.random() < 0.5) {
      const h = hearts[(Math.random() * hearts.length) | 0];
      if (h) twinkles.push({ x: h.x, y: h.y, size: rand(0.6, 1.3) * (Math.min(W, H) * 0.05), age: 0, life: rand(0.7, 1.2), rot: rand(0, 6.28) });
    }
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = twinkles.length - 1; i >= 0; i--) {
      const s = twinkles[i];
      s.age += dt;
      const k = s.age / s.life;
      if (k >= 1) { twinkles.splice(i, 1); continue; }
      const a = Math.sin(k * Math.PI);
      drawSprite(SPARKLE, s.x, s.y, s.size * (0.6 + 0.4 * a), s.rot + k * 1.2, a);
    }
    ctx.restore();
  }

  let mouseX = -9999, mouseY = -9999, mouseActive = false;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
    mouseActive = true;
  });
  canvas.addEventListener('pointerleave', () => { mouseActive = false; });

  function spawnPetal() {
    const h = hearts[(Math.random() * hearts.length) | 0];
    if (!h) return;
    petals.push({
      x: h.x + rand(-8, 8), y: h.y + rand(-8, 8), vy: rand(14, 30), vx: rand(-8, 8),
      sway: rand(0.6, 1.4), phase: rand(0, 6.28), box: h.box * rand(0.34, 0.6),
      idx: h.idx, rot: rand(0, 6.28), vrot: rand(-1.4, 1.4), age: 0,
      land: groundY + rand(-6, H * 0.05)
    });
  }

  function drawPetals(t, dt) {
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.age += dt;
      p.vy += 8 * dt;
      if (mouseActive) {
        const dx = p.x - mouseX, dy = p.y - mouseY, d2 = dx * dx + dy * dy, R = 90;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2), push = (1 - d / R) * 70;
          p.x += (dx / d) * push * dt;
          p.y += (dy / d) * push * dt;
          p.vrot += (dx / d) * dt * 2;
        }
      }
      p.x += (p.vx + Math.sin(t * p.sway + p.phase) * 16) * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      if (p.y >= p.land) {
        rested.push({ x: clamp(p.x, 6, W - 6), y: p.land, box: p.box, idx: p.idx, rot: p.rot, a: rand(0.7, 0.95) });
        if (rested.length > 90) rested.shift();
        petals.splice(i, 1);
        continue;
      }
      const a = p.age < 0.3 ? p.age / 0.3 : 1;
      drawSprite(SPR.crisp[p.idx], p.x, p.y, p.box, p.rot, a);
    }
  }

  function drawRested() {
    for (const r of rested) drawSprite(SPR.crisp[r.idx], r.x, r.y, r.box, r.rot, r.a);
  }

  function showWish(on) {
    if (wishEl) wishEl.classList.toggle('is-in', on);
  }

  function burstConfetti() {
    const colors = ['#ffcf6a', '#ff6f97', '#d4235c', '#ffe38c', '#fff3ea'];
    const bCx = W / 2, bCy = H * 0.38;
    for (let i = 0; i < 34; i++) {
      const el = document.createElement('span');
      const size = rand(5, 10);
      el.style.cssText = `position:absolute;left:${bCx}px;top:${bCy}px;width:${size}px;height:${size}px;
        border-radius:${Math.random() < 0.5 ? '50%' : '2px'};background:${pick(colors)};
        pointer-events:none;z-index:8;opacity:0.95;will-change:transform,opacity;`;
      stage.appendChild(el);
      const ang = rand(0, Math.PI * 2), dist = rand(80, 260);
      gsap.to(el, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist * 0.7 + rand(60, 140),
        rotation: rand(-260, 260),
        opacity: 0,
        duration: rand(1.1, 1.9),
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    }
  }

  let treeStartT = 0, treeLastT = 0, treeRAF = 0, lastPetal = 0, replayArmed = false, treeCompleted = false;

  function treeFrame(now) {
    if (!treeStartT) { treeStartT = now; treeLastT = now; }
    const t = (now - treeStartT) / 1000;
    const dt = Math.min(0.05, (now - treeLastT) / 1000);
    treeLastT = now;

    const rays = clamp01((t - TIMINGS.bloomT0) / TIMINGS.bloomSpan);

    drawBackground();
    drawGodRays(t, rays);
    drawGlow(t);
    drawBokeh(t, dt);
    drawFloaters(t, dt, false);
    drawBranches(t);
    drawHearts(t);
    updateTwinkles(t, dt);
    if (t > TIMINGS.petalT0 && now - lastPetal > 150) {
      spawnPetal();
      spawnPetal();
      lastPetal = now;
    }
    drawPetals(t, dt);
    drawRested();
    drawFloaters(t, dt, true);

    showWish(t >= TIMINGS.noteStart);

    if (!treeCompleted && t >= TIMINGS.done) {
      treeCompleted = true;
      burstConfetti();
    }
    if (!replayArmed && t >= TIMINGS.done + 1.0) {
      replayArmed = true;
      armReplay();
    }

    treeRAF = requestAnimationFrame(treeFrame);
  }

  function treeStart() {
    treeStartT = 0;
    treeLastT = 0;
    lastPetal = 0;
    replayArmed = false;
    treeCompleted = false;
    buildScene();
    if (!treeRAF) treeRAF = requestAnimationFrame(treeFrame);
  }

  function treeStop() {
    if (treeRAF) {
      cancelAnimationFrame(treeRAF);
      treeRAF = 0;
    }
    ctx.clearRect(0, 0, W, H);
  }

  // Split words for kinetic typography
  function splitWord(el) {
    if (!el || !el.textContent) return [];
    const chars = [...(el.textContent || '')];
    el.textContent = '';
    return chars.map((c) => {
      const s = document.createElement('span');
      s.className = 'hl__ch';
      s.textContent = c === ' ' ? '\u00A0' : c;
      el.appendChild(s);
      return s;
    });
  }

  const line1Chars = splitWord(container.querySelector('#treeWLine1'));
  const line2Chars = splitWord(container.querySelector('#treeWLine2'));
  const kChars = [...line1Chars, ...line2Chars];

  // Drifting motes
  function buildMotes() {
    if (!motes) return;
    motes.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const m = document.createElement('span');
      m.className = 'mote';
      const s = rand(4, 12);
      m.style.width = m.style.height = `${s}px`;
      m.style.left = `${rand(4, 96)}%`;
      m.style.top = `${rand(10, 96)}%`;
      motes.appendChild(m);
      gsap.set(m, { opacity: rand(0.25, 0.7) });
      gsap.to(m, {
        y: -rand(40, 140), x: rand(-30, 30),
        duration: rand(7, 14), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: -rand(0, 8),
      });
      gsap.to(m, { opacity: rand(0.1, 0.5), duration: rand(2.5, 5), repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }

  // Bow & Arrow geometry
  let svgScale = 1, arrowBaseX = 0, arrowBaseY = 0, maxDraw = 120, curDraw = 0;
  let pullUX = 0, pullUY = 1;
  const REST_NOCK = 96;
  const nockProxy = { val: REST_NOCK };

  function applyNock() {
    const y = nockProxy.val;
    if (strL) strL.setAttribute('y2', y);
    if (strR) strR.setAttribute('y2', y);
    if (serving) serving.setAttribute('cy', y);
  }

  function refreshRig() {
    if (!archery || !bow || !arrow || !serving) return;
    const gripX = W * 0.24, gripY = H * 0.76;
    const heartX = W * 0.5, heartY = H * 0.33;
    const aimRad = Math.atan2(heartX - gripX, gripY - heartY);
    pullUX = -Math.sin(aimRad);
    pullUY = Math.cos(aimRad);

    nockProxy.val = REST_NOCK;
    applyNock();
    gsap.set(archery, { rotation: 0, scale: 1, x: 0, y: 0 });
    archery.style.left = '0px';
    archery.style.top = '0px';
    gsap.set(arrow, { x: 0, y: 0 });

    const aR = archery.getBoundingClientRect();
    const bR = bow.getBoundingClientRect();
    const sR = serving.getBoundingClientRect();
    const rR = arrow.getBoundingClientRect();
    svgScale = (bR.width || 120) / 460;
    const gripLX = bR.left - aR.left + 0.5 * bR.width;
    const gripLY = bR.top - aR.top + (240 / 300) * bR.height;
    const nockLX = sR.left - aR.left + 0.5 * sR.width;
    const nockLY = sR.top - aR.top + 0.5 * sR.height;
    arrowBaseX = nockLX - (rR.left - aR.left + 0.5 * rR.width);
    arrowBaseY = nockLY - (rR.top - aR.top + (205 / 220) * rR.height);

    archery.style.left = gripX - gripLX + 'px';
    archery.style.top = gripY - gripLY + 'px';
    gsap.set(archery, { transformOrigin: `${gripLX}px ${gripLY}px`, rotation: (aimRad * 180) / Math.PI });
    gsap.set(arrow, { x: arrowBaseX, y: arrowBaseY });
    maxDraw = Math.min(bR.height * 0.72, H * 0.16, 132);
    curDraw = 0;
  }

  function setDraw(d) {
    curDraw = clamp(d, 0, maxDraw);
    gsap.set(arrow, { x: arrowBaseX, y: arrowBaseY + curDraw });
    nockProxy.val = REST_NOCK + curDraw / svgScale;
    applyNock();
    gsap.set(aim, { opacity: 0.55 * (curDraw / maxDraw) });
  }

  let beatTL = null;
  function startBeat() {
    gsap.set(targetHeart, { scale: 1 });
    gsap.set(heartGlow, { scale: 1, opacity: 0.7 });
    if (beatTL) beatTL.kill();
    beatTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    beatTL
      .to(targetHeart, { scale: 1.07, duration: 0.13, ease: 'power2.out' }, 0)
      .to(heartGlow, { scale: 1.15, opacity: 0.9, duration: 0.13, ease: 'power2.out' }, 0)
      .to(targetHeart, { scale: 1.0, duration: 0.2, ease: 'power2.in' }, 0.13)
      .to(targetHeart, { scale: 1.05, duration: 0.12, ease: 'power2.out' }, 0.3)
      .to(targetHeart, { scale: 1.0, duration: 0.5, ease: 'power2.inOut' }, 0.42)
      .to(heartGlow, { scale: 1.0, opacity: 0.7, duration: 0.7, ease: 'power2.inOut' }, 0.3);
  }

  function stopBeat() {
    if (beatTL) {
      beatTL.kill();
      beatTL = null;
    }
    gsap.set(targetHeart, { scale: 1 });
  }

  function miniHeartSVG(fill) {
    return `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 20C5.5 15 1.5 11.4 1.5 6.9 1.5 3.6 4 1.5 7 1.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.5 2.1 5.5 5.4C23.5 11.4 19.5 15 12 20Z" fill="${fill}"/></svg>`;
  }

  function burstHearts() {
    const r = target.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    const ox = r.left - hr.left + r.width / 2;
    const oy = r.top - hr.top + r.height * 0.42;
    const cols = ['#ff6f97', '#ffb14e', '#ff8fae', '#ffd36a', '#e23b67'];
    const frag = document.createDocumentFragment();
    const nodes = [];
    for (let i = 0; i < 12; i++) {
      const heart = i < 8;
      const el = document.createElement('span');
      el.className = 'burst';
      const s = heart ? rand(12, 22) : rand(4, 8);
      el.style.cssText = `position:absolute;left:${ox}px;top:${oy}px;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;pointer-events:none;z-index:4;`;
      if (heart) el.innerHTML = miniHeartSVG(pick(cols));
      else {
        el.style.borderRadius = '50%';
        el.style.background = 'radial-gradient(circle,#fff,rgba(255,210,150,0) 70%)';
      }
      frag.appendChild(el);
      nodes.push({ el, heart });
    }
    hero.appendChild(frag);
    nodes.forEach(({ el, heart }) => {
      const ang = rand(-Math.PI, 0);
      const dist = rand(heart ? 70 : 40, heart ? 190 : 120);
      gsap.to(el, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist - rand(10, 50),
        rotation: rand(-120, 120),
        scale: heart ? rand(0.7, 1.2) : rand(0.4, 1),
        duration: rand(0.7, 1.15),
        ease: 'power2.out',
      });
      gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        delay: rand(0.35, 0.6),
        ease: 'power1.in',
        onComplete: () => el.remove(),
      });
    });
  }

  function shotGeom() {
    const tipR = tip.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const tipX = tipR.left + tipR.width / 2, tipY = tipR.top + tipR.height / 2;
    const tcx = tRect.left + tRect.width / 2, tcy = tRect.top + tRect.height / 2;
    const flightDist = Math.hypot(tcx - tipX, tcy - tipY);
    const fallPx = Math.min(H * 0.26, H - tcy - tRect.height * 0.4);
    const impactX = tcx, impactY = tcy + fallPx;
    const distC = Math.hypot(Math.max(impactX, W - impactX), Math.max(impactY, H - impactY));
    const reach = Math.hypot(W / 2, H / 2);

    return {
      arrowStartY: arrowBaseY + curDraw,
      arrowFlyY: arrowBaseY + curDraw - flightDist,
      drawnNock: REST_NOCK + curDraw / svgScale,
      fallPx,
      fx: impactX - W / 2,
      fy: impactY - H / 2,
      floodScale: (distC * 1.12) / 70,
      bloomScale: (reach * 1.2) / 30,
    };
  }

  let filmTL = null;
  function buildFilm(m) {
    const t = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(field, { autoAlpha: 0 });
        treeStart();
        gsap.to(bloom, { autoAlpha: 0, duration: 1.15, ease: 'power2.out' });
      },
    });

    // Reset (t=0)
    t.set(target, { y: 0, scaleX: 1, scaleY: 1, opacity: 1 })
      .set(arrow, { opacity: 1, x: arrowBaseX, y: m.arrowStartY, scaleY: 1 })
      .set([flood, bloom], { autoAlpha: 0, scale: 0.001, x: 0, y: 0 })
      .set(flood, { x: m.fx, y: m.fy })
      .set(field, { autoAlpha: 0 })
      .set(container.querySelectorAll('.blob'), { opacity: 0 })
      .set(camera, { scale: 1, yPercent: 0 })
      .set(fgrid, { xPercent: 0, yPercent: 0 })
      .set(barTop, { yPercent: -100 })
      .set(barBot, { yPercent: 100 })
      .set(kEyebrow, { opacity: 0, y: 12 })
      .set(kSub, { opacity: 0, y: 12 })
      .set(kChars, { transformPerspective: 620, transformOrigin: '50% 100%', yPercent: 135, rotationX: -82 })
      .set(uline, { drawn: 0 });

    // The shot
    t.fromTo(nockProxy, { val: m.drawnNock }, { val: REST_NOCK, duration: 0.5, ease: 'elastic.out(1,0.34)', onUpdate: applyNock }, 0)
      .to(arrow, { y: m.arrowFlyY, duration: 0.26, ease: 'power2.in' }, 0)
      .to(arrow, { scaleY: 1.16, duration: 0.14, ease: 'power2.in' }, 0)
      .to(arrow, { scaleY: 1.0, duration: 0.1, ease: 'power1.out' }, 0.16)
      .to(aim, { opacity: 0, duration: 0.18 }, 0)
      .to([eyebrow, hint], { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0);

    // The strike
    t.add(burstHearts, 0.26)
      .to(target, { x: 7, y: -9, duration: 0.06, ease: 'power2.out' }, 0.26)
      .to(target, { x: 0, y: 0, duration: 0.32, ease: 'power2.out' }, 0.32)
      .to(target, { scale: 1.14, duration: 0.06, ease: 'power2.out' }, 0.26)
      .to(target, { scale: 1.0, duration: 0.26, ease: 'power2.inOut' }, 0.32)
      .to(arrow, { rotation: '+=4', duration: 0.05, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0.27)
      .set(arrow, { rotation: 0 }, 0.52)
      .to(arrow, { opacity: 0, duration: 0.16, ease: 'power1.out' }, 0.56);

    // The fall + flood
    t.to(target, { y: m.fallPx, scaleX: 0.84, scaleY: 1.3, duration: 0.34, ease: 'power1.in' }, 0.64)
      .to(target, { scaleX: 1.4, scaleY: 0.6, duration: 0.07, ease: 'power2.out' }, 0.98)
      .set(flood, { autoAlpha: 1 }, 1.00)
      .fromTo(flood, { scale: 0.02 }, { scale: m.floodScale, duration: 0.34, ease: 'power2.in' }, 1.00)
      .to(target, { opacity: 0, duration: 0.12, ease: 'power1.out' }, 1.06);

    // Rose field
    t.set(field, { autoAlpha: 1 }, 1.32)
      .set(hero, { autoAlpha: 0 }, 1.33)
      .to(container.querySelectorAll('.blob'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.34)
      .set(flood, { autoAlpha: 0 }, 1.36);

    // Camera push
    t.fromTo(camera, { scale: 1.0, yPercent: 0 }, { scale: 1.07, yPercent: -1.3, duration: 2.6, ease: 'none' }, 1.38)
      .fromTo(fgrid, { xPercent: 0, yPercent: 0 }, { xPercent: -1.5, yPercent: -1.0, duration: 2.6, ease: 'none' }, 1.38);

    // Cinema bars
    t.to(barTop, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, 1.5)
      .to(barBot, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, 1.5);

    // Kinetic wish
    t.to(kEyebrow, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 1.54)
      .to(line1Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: 'power3.out', stagger: 0.033 }, 1.68)
      .to(line2Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: 'power3.out', stagger: 0.033 }, 2.06)
      .to(uline, { drawn: 1, duration: 0.45, ease: 'power2.inOut' }, 2.54)
      .to(kSub, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 2.74);

    // Bloom into tree
    t.to(barTop, { yPercent: -100, duration: 0.5, ease: 'power2.in' }, 3.32)
      .to(barBot, { yPercent: 100, duration: 0.5, ease: 'power2.in' }, 3.32)
      .set(bloom, { autoAlpha: 1 }, 3.42)
      .fromTo(bloom, { scale: 0.02 }, { scale: m.bloomScale, duration: 0.58, ease: 'power2.in' }, 3.42);

    return t;
  }

  let played = false, drawing = false, startPX = 0, startPY = 0, startDraw = 0;

  function fire() {
    if (played) return;
    played = true;
    drawing = false;
    stopBeat();
    chime(540, 780);
    filmTL = buildFilm(shotGeom());
    filmTL.play(0);
  }

  function springBack() {
    const from = curDraw;
    gsap.to({ d: from }, {
      d: 0, duration: 0.55, ease: 'elastic.out(1,0.4)',
      onUpdate() { setDraw(this.targets()[0].d); },
    });
  }

  function autoFire() {
    if (played) return;
    gsap.to({ d: curDraw }, {
      d: maxDraw * 0.94, duration: 0.62, ease: 'power2.inOut',
      onUpdate() { setDraw(this.targets()[0].d); },
      onComplete: () => gsap.delayedCall(0.16, fire),
    });
  }

  archery.addEventListener('pointerdown', (e) => {
    if (played) return;
    drawing = true;
    try { archery.setPointerCapture(e.pointerId); } catch (_) {}
    startPX = e.clientX;
    startPY = e.clientY;
    startDraw = curDraw;
    e.preventDefault();
  });

  archery.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const proj = (e.clientX - startPX) * pullUX + (e.clientY - startPY) * pullUY;
    setDraw(startDraw + proj);
  });

  function endDraw() {
    if (!drawing) return;
    drawing = false;
    if (curDraw > maxDraw * 0.26) fire();
    else springBack();
  }

  archery.addEventListener('pointerup', endDraw);
  archery.addEventListener('pointercancel', endDraw);
  archery.addEventListener('keydown', (e) => {
    if (played) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      autoFire();
    }
  });

  function enter() {
    gsap.set(hero, { autoAlpha: 1 });
    refreshRig();
    setDraw(0);
    gsap.set([eyebrow, hint], { opacity: 0, y: 14 });
    gsap.set(target, { opacity: 0, y: 10, scaleX: 0.9, scaleY: 0.9 });
    gsap.set(archery, { opacity: 0, scale: 0.85 });
    gsap.set(heartGlow, { opacity: 0, scale: 1 });
    gsap.set(arrow, { opacity: 1 });

    const tl = gsap.timeline({ onComplete: startBeat });
    tl.to(target, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: 'power3.out' }, 0.1)
      .to(heartGlow, { opacity: 0.7, duration: 0.8, ease: 'power2.out' }, 0.2)
      .to(archery, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.28)
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.4)
      .to(hint, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.7);
  }

  function armReplay() {
    if (replay) {
      replay.hidden = false;
      requestAnimationFrame(() => replay.classList.add('is-shown'));
    }
    if (memoriesBtn) {
      memoriesBtn.hidden = false;
      requestAnimationFrame(() => memoriesBtn.classList.add('is-shown'));
    }
  }

  function resetAll() {
    treeStop();
    showWish(false);
    replayArmed = false;
    treeCompleted = false;
    if (replay) {
      replay.classList.remove('is-shown');
      replay.hidden = true;
    }
    if (memoriesBtn) {
      memoriesBtn.classList.remove('is-shown');
      memoriesBtn.hidden = true;
    }
    if (filmTL) filmTL.pause(0);
    gsap.set([flood, bloom], { autoAlpha: 0 });
    gsap.set(field, { autoAlpha: 0 });
    gsap.set(arrow, { opacity: 1, scaleY: 1 });
    played = false;
    enter();
  }

  // Sizing & Canvas Init
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildSprites();
    buildScene();
    if (played && filmTL) {
      const at = filmTL.time();
      const active = filmTL.isActive();
      filmTL = buildFilm(shotGeom());
      filmTL.pause(at);
      if (active) filmTL.play(at);
    } else {
      refreshRig();
      setDraw(0);
    }
  }

  let resizeRAF = 0;
  const onResize = () => {
    if (resizeRAF) return;
    resizeRAF = requestAnimationFrame(() => {
      resizeRAF = 0;
      resize();
    });
  };
  window.addEventListener('resize', onResize);

  // Initial sizing & motes
  resize();
  buildMotes();

  // Act 0 Gate
  function openGate() {
    chime(660, 880);
    startMusicAutoplay();
    gate.classList.add('is-open');
    gate.removeEventListener('click', openGate);
    setTimeout(enter, 480);
  }

  gate.addEventListener('click', openGate);
  gate.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGate();
    }
  });

  if (isMakerReview) {
    // In Maker Review, auto-reveal after short beat
    setTimeout(openGate, 600);
  }

  // Replay click
  replay.addEventListener('click', resetAll);

  // Love note click on tree canvas
  let loveNoteTimer = 0;
  canvas.addEventListener('click', (e) => {
    if (!hearts.length || treeStartT === 0) return;
    const now = performance.now();
    const t = (now - treeStartT) / 1000;
    if (t < TIMINGS.bloomT0) return;
    const r = canvas.getBoundingClientRect();
    const clickX = e.clientX - r.left, clickY = e.clientY - r.top;
    let best = null, bestD = 28 * 28;
    for (const h of hearts) {
      const d2 = (h.x - clickX) * (h.x - clickX) + (h.y - clickY) * (h.y - clickY);
      const rad = Math.max(16, h.box * 0.5);
      if (d2 < rad * rad && d2 < bestD) {
        best = h;
        bestD = d2;
      }
    }
    if (!best) return;
    chime(660, 820);
    const idx = hearts.indexOf(best) % loveNotesList.length;
    loveNoteText.textContent = loveNotesList[idx];
    loveNote.style.left = best.x + 'px';
    loveNote.style.top = best.y + 'px';
    loveNote.classList.add('is-shown');
    clearTimeout(loveNoteTimer);
    loveNoteTimer = setTimeout(() => loveNote.classList.remove('is-shown'), 2600);
  });

  // Act 5 Memories Modal
  memoriesBtn.addEventListener('click', () => {
    chime(600, 750);
    memories.classList.add('is-open');
    memories.setAttribute('aria-hidden', 'false');
  });

  memoriesClose.addEventListener('click', () => {
    memories.classList.remove('is-open');
    memories.setAttribute('aria-hidden', 'true');
  });

  // Make a wish star
  wishBtn.addEventListener('click', () => {
    if (wishBtn.classList.contains('is-sent')) return;
    chime(880, 1180);
    starEl.style.left = '92%';
    starEl.style.top = '18%';
    starEl.classList.remove('is-flying');
    requestAnimationFrame(() => starEl.classList.add('is-flying'));
    wishBtn.textContent = '✨ wish sent';
    wishBtn.classList.add('is-sent');
    setTimeout(() => {
      wishBtn.textContent = '🌠 make a wish';
      wishBtn.classList.remove('is-sent');
    }, 2200);
  });

  // Shuffle card
  let lastCompliment = -1;
  shuffleBtn.addEventListener('click', () => {
    chime(700, 940);
    let i;
    do {
      i = (Math.random() * complimentsList.length) | 0;
    } while (i === lastCompliment && complimentsList.length > 1);
    lastCompliment = i;
    gsap.fromTo(shuffleText, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 });
    shuffleText.textContent = complimentsList[i];
  });

  // Envelope and typewriter letter
  let envelopeOpened = false;
  envelope.addEventListener('click', () => {
    if (envelopeOpened) return;
    envelopeOpened = true;
    chime(520, 700);
    envelope.classList.add('is-open');
    setTimeout(() => {
      letterEl.hidden = false;
      letterEl.classList.remove('is-done');
      letterText.textContent = '';
      let i = 0;
      const typer = setInterval(() => {
        letterText.textContent = letterBody.slice(0, i + 1);
        i++;
        if (i >= letterBody.length) {
          clearInterval(typer);
          letterEl.classList.add('is-done');
        }
      }, 24);
    }, 420);
  });

  // HTML2Canvas Keepsake Polaroid download
  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const figure = btn.closest('.polaroid');
      if (!figure) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Rendering...';
      btn.disabled = true;
      html2canvas(figure, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(cvs => {
        const a = document.createElement('a');
        a.download = `polaroid-memory-${Date.now()}.png`;
        a.href = cvs.toDataURL('image/png');
        a.click();
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        btn.innerHTML = '✓ Saved to Photos!';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2200);
      }).catch(err => {
        console.error('Download error:', err);
        btn.innerHTML = 'Download Failed';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      });
    });
  });

  // Corner Mini Spinning CD Music Player
  let isPlaying = false;
  let pillTimer = null;

  function showPill() {
    if (!trackPill) return;
    trackPill.classList.add('visible');
    clearTimeout(pillTimer);
    pillTimer = setTimeout(() => trackPill.classList.remove('visible'), 2600);
  }

  function setPlaying(playing) {
    isPlaying = playing;
    if (playing) {
      musicToggle?.classList.add('playing');
      miniCd?.classList.add('spinning');
      showPill();
    } else {
      musicToggle?.classList.remove('playing');
      miniCd?.classList.remove('spinning');
    }
  }

  function startMusicAutoplay() {
    const isEditorMode = Boolean(window.isCelebrationEditorMode) ||
                         Boolean(document.querySelector('.studio-layout')) ||
                         Boolean(container.closest('.studio-layout')) ||
                         Boolean(container.closest('#previewContainer'));
    if (isEditorMode) return; // Stop autoplay during editor mode

    if (!audioEl || isPlaying) return;
    audioEl.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // Browser blocked autoplay until further gesture
    });
  }

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setPlaying(false);
    } else {
      audioEl.play().then(() => {
        setPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback prevented:", err);
      });
    }
  });

  // Cleanup on destroy / re-render
  return function cleanup() {
    window.removeEventListener('resize', onResize);
    treeStop();
    stopBeat();
    if (filmTL) filmTL.kill();
    if (audioEl) audioEl.pause();
  };
}
