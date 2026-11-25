// src/viewer/templates/paigaamTemplate.js - Authentic Birthday Paigaam Experience
// Faithful multi-screen recreation of paigaam.cc/birthday-paigaam/demo enhanced with Three.js 3D & Lovable motion:
// 1. Passcode Cameo Unlock (Scalloped pearl cameo + 4-digit keypad + keyboard support)
// 2. Interactive Mascot Question ("Wanna see it?" with growing YES, shrinking NO & crying bunny/bear duo)
// 3. Wax-sealed 3D Unfolding Love Letter with Typewriter Reveal
// 4. Nostalgic Cassette Tape Voice Note with Live Waveform & Audio Ducking
// 5. Retro Turntable Vinyl Song Player (with built-in music-box synth + floating mini-player)
// 6. Vintage Spiral Scrapbook (Flipping Polaroids, Lightbox Zoom & Swipe, Sticky Love Notes, Reasons Checklist)
// 7. Grand Finale Birthday Cake with Blowable Candles, Three.js 3D Hearts/Confetti & Fireworks!

import './paigaam.css';
import { createPaigaamSound } from './paigaamSound.js';
import { createPaigaamThreeLayer } from './paigaamThreeBg.js';

function createTyper(els, opts = {}) {
  const items = Array.from(els).map(el => ({
    el,
    origHtml: el.getAttribute('data-orig') || el.innerHTML
  }));
  items.forEach(it => {
    it.el.setAttribute('data-orig', it.origHtml);
    const tmp = document.createElement('div');
    it.parts = it.origHtml.split(/<br\s*\/?>/i).map(p => {
      tmp.innerHTML = p;
      return tmp.textContent || '';
    });
  });

  const total = items.reduce((s, it) => s + it.parts.join('').length, 0) || 1;
  const cps = Math.max(opts.min || 28, Math.min(opts.max || 72, total / (opts.seconds || 8)));
  const caret = document.createElement('span');
  caret.className = 'bp-caret';
  caret.setAttribute('aria-hidden', 'true');

  let rafId = 0;
  let done = false;

  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(rafId);
    items.forEach(it => {
      it.el.innerHTML = it.origHtml;
      it.el.style.visibility = '';
    });
    caret.remove();
    if (opts.onDone) opts.onDone();
  }

  function render(n) {
    let left = n;
    items.forEach(it => {
      const len = it.parts.join('').length;
      if (left <= 0) {
        it.el.style.visibility = 'hidden';
        it.el.textContent = '\u00A0';
        return;
      }
      it.el.style.visibility = '';
      const take = Math.min(left, len);
      left -= len;
      it.el.textContent = '';
      let remaining = take;
      it.parts.forEach((part, pi) => {
        if (remaining <= 0) return;
        const chunk = part.slice(0, remaining);
        remaining -= part.length;
        it.el.appendChild(document.createTextNode(chunk));
        if (pi < it.parts.length - 1 && remaining > 0) {
          it.el.appendChild(document.createElement('br'));
        }
      });
      if (take < len) it.el.appendChild(caret);
    });
  }

  function start(instant = false) {
    done = false;
    cancelAnimationFrame(rafId);
    if (instant || document.body.classList.contains('bp--still')) {
      finish();
      return;
    }
    let t0 = 0;
    render(0);
    const step = (ts) => {
      if (done) return;
      if (!t0) t0 = ts;
      const typed = Math.floor(((ts - t0) / 1000) * cps);
      if (typed >= total) {
        finish();
        return;
      }
      render(typed);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  }

  function reset() {
    done = false;
    cancelAnimationFrame(rafId);
    caret.remove();
    items.forEach(it => {
      it.el.innerHTML = it.origHtml;
      it.el.style.visibility = '';
    });
  }

  return { start, finish, reset };
}

export function renderPaigaamTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }

  // Crucial: Enable .js class on <html> so paigaam.css hides inactive screens instead of stacking all on one page
  document.documentElement.classList.add('js');

  const recipientName = data.recipientName || 'Meher';
  const senderName = data.senderName || 'Rahul';
  const passcode = (data.passcode || '1234').trim();
  const passcodeHint = data.passcodeHint || `Psst… it’s ${passcode.split('').join(' ')}`;
  const cameoImage = data.cameoImage || data.recipientPhoto || '/paigaam/bp-share.jpg';
  const questionPrompt = data.questionPrompt || 'I have a little surprise for you. Wanna see it?';
  const noMessages = (data.noMessages && data.noMessages.length > 0) ? data.noMessages : [
    'How dare you click NO!',
    'Excuse me?? Try that again 😤',
    'Wrong button, birthday star 🙄',
    'I’m telling everyone you said no 😭',
    'My heart just did a tiny crack 💔',
    'The YES button is getting lonely…',
    'Okay now you’re just being silly 🙈',
    'Fine. NO is officially out of order.'
  ];

  const letterSalutation = data.letterSalutation || `Dear ${recipientName},`;
  const letterTextRaw = data.letterText || [
    'Happy birthday, my favourite human.',
    'I wanted to give you something you can open again and again — so I made you this little corner of the internet, full of us.',
    'Thank you for the laughs that make my stomach hurt, the late-night talks, and for being exactly, wonderfully you. I hope this year is soft on you, and full of everything you wish for.',
    'Now keep going — there’s more.'
  ].join('\n\n');
  const letterParagraphs = letterTextRaw.split('\n\n').filter(Boolean);
  const letterSignoff = data.letterSignoff || 'Forever yours,';

  const voiceTitle = data.voiceTitle || 'Press play, I have something to say';
  const voiceSubtitle = data.voiceSubtitle || 'a voice note, just for you';
  const voiceUrl = data.voiceUrl || '/paigaam/bp-voice-demo.mp3';
  const voiceLabel = data.voiceLabel || `for ${recipientName} ♡ side A`;

  const songTitle = data.songTitle || 'Happy Birthday';
  const songArtist = data.songArtist || 'a little music box';
  const songUrl = data.songUrl || '';

  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { image: '/paigaam/bp-memory-1.jpg', caption: 'sunset ice-creams 🍦', note: 'You stole a bite of mine and pretended you didn’t.' },
    { image: '/paigaam/bp-memory-2.jpg', caption: 'our cafe ☕', note: 'Same table, same order, every single time.' },
    { image: '/paigaam/bp-memory-3.jpg', caption: 'rain walk ☔', note: 'Best soggy shoes of my life.' },
    { image: '/paigaam/bp-memory-4.jpg', caption: 'the road trip!', note: 'Singing at the top of our lungs off-key.' },
    { image: '/paigaam/bp-memory-5.jpg', caption: 'picnic day 🌸', note: 'Sandwiches, sunshine, and your giggles.' },
    { image: '/paigaam/bp-memory-6.jpg', caption: 'movie night', note: 'You fell asleep 10 minutes in. A record.' }
  ];

  const loveNotes = (data.loveNotes && data.loveNotes.length > 0) ? data.loveNotes : [
    'Your laugh (especially the snort)',
    'How you remember the tiny things',
    'Your terrible-but-perfect dance moves',
    'The way you make everyone feel at home',
    'Your 2am thoughts',
    'How brave you are, even when you’re scared'
  ];

  const reasons = (data.reasonsList && data.reasonsList.length > 0) ? data.reasonsList : (data.reasons && data.reasons.length > 0 ? data.reasons : [
    'You make ordinary days feel like little adventures.',
    'You are kind even when nobody is watching.',
    'You turn my bad days around without even trying.',
    'You are the first person I want to tell everything.',
    'The world is softer with you in it.'
  ]);

  const finaleTitle = data.finaleTitle || `Happy Birthday, ${recipientName}!`;
  const finaleLine = data.finaleLine || 'Here’s to you — today, and every day after.';
  const cakeHint = data.cakeHint || 'Make a wish… then tap the candles to blow them out 🕯️';
  const thankYouText = data.thankYouText || `I just opened my birthday surprise 🥹💕 Thank you, ${senderName}!`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(thankYouText)}`;

  const blush = data.theme?.blush || '#F9C6D4';
  const cream = data.theme?.cream || '#FFF4D6';
  const peach = data.theme?.peach || '#FFD9B8';
  const lavender = data.theme?.lavender || '#D9C8F5';
  const accent = data.theme?.accent || '#C2185B';

  document.body.classList.add('bp');
  document.body.style.setProperty('--blush', blush);
  document.body.style.setProperty('--cream', cream);
  document.body.style.setProperty('--peach', peach);
  document.body.style.setProperty('--lavender', lavender);
  document.body.style.setProperty('--accent', accent);
  document.body.style.setProperty('--font-head', "'Fraunces', Georgia, serif");
  document.body.style.setProperty('--font-script', "'Great Vibes', cursive");
  document.body.style.setProperty('--font-hand', "'Caveat', 'Comic Sans MS', cursive");

  const SND = createPaigaamSound();
  const sfx = (name, arg) => {
    try { SND.sfx[name](arg); } catch (e) {}
  };

  container.innerHTML = `
    <div class="bp-experience-wrap">
      ${isMakerReview ? `
        <div class="maker-review-banner" id="makerReviewBanner" style="position:fixed; top:0; left:0; width:100%; z-index:999999;">
          <div class="maker-banner-content" style="display:flex; align-items:center; justify-content:space-between; padding:8px 16px; background:rgba(194,24,91,0.92); color:#fff; font-family:var(--font-ui, sans-serif); font-size:13px; font-weight:700;">
            <span>💌 <strong>Birthday Paigaam Review:</strong> PIN is <code>${passcode}</code></span>
            <div style="display:flex; gap:8px;">
              <button type="button" id="btnBypassUnlock" style="background:#fff; color:#C2185B; border:none; padding:4px 10px; border-radius:6px; font-weight:800; cursor:pointer;">Skip Lock ⚡</button>
              <a href="?edit=true" class="btn-banner-edit" style="color:#fff; text-decoration:underline; padding:4px;">✏️ Studio Editor</a>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="bp-bg" aria-hidden="true"><div class="bp-stripes"></div><div class="bp-wash"></div><div class="bp-grain"></div></div>
      <canvas class="bp-ambient" aria-hidden="true"></canvas>
      <div class="bp-floaters" aria-hidden="true"></div>

      <div class="bp-controls">
        <button type="button" class="bp-iconbtn bp-sound" aria-pressed="true" aria-label="Sound effects on">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path class="i-spk" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/>
            <path class="i-on" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>
            <path class="i-off" d="M16 9.5l5 5M21 9.5l-5 5"/>
          </svg>
        </button>
        <button type="button" class="bp-iconbtn bp-motion" aria-pressed="true" aria-label="Animations on">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" transform="translate(2 2) scale(.84)"/>
          </svg>
        </button>
      </div>

      <div class="bp-progress" aria-hidden="true">
        <i data-p="question"></i>
        <i data-p="letter"></i>
        <i data-p="voice"></i>
        <i data-p="song"></i>
        <i data-p="scrapbook"></i>
        <i data-p="finale"></i>
      </div>

      <main class="bp-stage">
        <!-- 1. UNLOCK SCREEN -->
        <section class="bp-screen is-active bp-unlock" data-screen="unlock" aria-labelledby="bpUnlockTitle">
          <div class="bp-unlock__grid">
            <div class="bp-unlock__hero">
              <h1 id="bpUnlockTitle" class="bp-title">
                <span class="bp-title__orn" aria-hidden="true"><i></i>✦<i></i></span>
                <span class="bp-title__main">unlock</span>
                <span class="bp-title__script">for surprise</span>
              </h1>
              <div class="bp-unlock__art">
                <div class="bp-frame">
                  <div class="bp-frame__hole">
                    ${cameoImage ? `
                      <img src="${cameoImage}" alt="${recipientName}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />
                    ` : `
                      <span class="bp-frame__empty">
                        <svg viewBox="0 0 200 200" aria-hidden="true">
                          <defs><linearGradient id="bpPhGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7E9B8"/><stop offset=".3" stop-color="#C9A24A"/><stop offset=".52" stop-color="#F4E2A6"/><stop offset=".78" stop-color="#A8802F"/><stop offset="1" stop-color="#E9D08C"/></linearGradient></defs>
                          <circle cx="100" cy="100" r="74" fill="none" stroke="url(#bpPhGold)" stroke-width=".8" stroke-dasharray="2 5" stroke-linecap="round"/>
                          <path fill="none" stroke="url(#bpPhGold)" stroke-width="1.3" stroke-linejoin="round" transform="translate(88 52) scale(1)" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/>
                          <path fill="none" stroke="url(#bpPhGold)" stroke-width=".9" stroke-linecap="round" d="M74 140 H92 M108 140 H126"/>
                          <circle cx="100" cy="140" r="1.8" fill="#C9A24A"/>
                        </svg>
                        <span class="bp-frame__invite">your photo<br>here</span>
                      </span>
                    `}
                  </div>
                  <svg class="bp-cameo" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
                    <defs>
                      <linearGradient id="bpCamGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#F7E9B8"/><stop offset=".3" stop-color="#C9A24A"/><stop offset=".52" stop-color="#F4E2A6"/><stop offset=".78" stop-color="#A8802F"/><stop offset="1" stop-color="#E9D08C"/>
                      </linearGradient>
                      <mask id="bpCamMask"><rect width="320" height="320" fill="#fff"/><circle cx="160" cy="160" r="109" fill="#000"/></mask>
                    </defs>
                    <g mask="url(#bpCamMask)">
                      <path class="f-lace" d="M160.00 14.00 A12.08 12.08 0 0 1 180.78 15.49 A12.08 12.08 0 0 1 201.13 19.91 A12.08 12.08 0 0 1 220.65 27.19 A12.08 12.08 0 0 1 238.93 37.18 A12.08 12.08 0 0 1 255.61 49.66 A12.08 12.08 0 0 1 270.34 64.39 A12.08 12.08 0 0 1 282.82 81.07 A12.08 12.08 0 0 1 292.81 99.35 A12.08 12.08 0 0 1 300.09 118.87 A12.08 12.08 0 0 1 304.51 139.22 A12.08 12.08 0 0 1 306.00 160.00 A12.08 12.08 0 0 1 304.51 180.78 A12.08 12.08 0 0 1 300.09 201.13 A12.08 12.08 0 0 1 292.81 220.65 A12.08 12.08 0 0 1 282.82 238.93 A12.08 12.08 0 0 1 270.34 255.61 A12.08 12.08 0 0 1 255.61 270.34 A12.08 12.08 0 0 1 238.93 282.82 A12.08 12.08 0 0 1 220.65 292.81 A12.08 12.08 0 0 1 201.13 300.09 A12.08 12.08 0 0 1 180.78 304.51 A12.08 12.08 0 0 1 160.00 306.00 A12.08 12.08 0 0 1 139.22 304.51 A12.08 12.08 0 0 1 118.87 300.09 A12.08 12.08 0 0 1 99.35 292.81 A12.08 12.08 0 0 1 81.07 282.82 A12.08 12.08 0 0 1 64.39 270.34 A12.08 12.08 0 0 1 49.66 255.61 A12.08 12.08 0 0 1 37.18 238.93 A12.08 12.08 0 0 1 27.19 220.65 A12.08 12.08 0 0 1 19.91 201.13 A12.08 12.08 0 0 1 15.49 180.78 A12.08 12.08 0 0 1 14.00 160.00 A12.08 12.08 0 0 1 15.49 139.22 A12.08 12.08 0 0 1 19.91 118.87 A12.08 12.08 0 0 1 27.19 99.35 A12.08 12.08 0 0 1 37.18 81.07 A12.08 12.08 0 0 1 49.66 64.39 A12.08 12.08 0 0 1 64.39 49.66 A12.08 12.08 0 0 1 81.07 37.18 A12.08 12.08 0 0 1 99.35 27.19 A12.08 12.08 0 0 1 118.87 19.91 A12.08 12.08 0 0 1 139.22 15.49 A12.08 12.08 0 0 1 160.00 14.00Z"/>
                      <path fill="none" stroke="url(#bpCamGold)" stroke-width="1.2" d="M160.00 14.00 A12.08 12.08 0 0 1 180.78 15.49 A12.08 12.08 0 0 1 201.13 19.91 A12.08 12.08 0 0 1 220.65 27.19 A12.08 12.08 0 0 1 238.93 37.18 A12.08 12.08 0 0 1 255.61 49.66 A12.08 12.08 0 0 1 270.34 64.39 A12.08 12.08 0 0 1 282.82 81.07 A12.08 12.08 0 0 1 292.81 99.35 A12.08 12.08 0 0 1 300.09 118.87 A12.08 12.08 0 0 1 304.51 139.22 A12.08 12.08 0 0 1 306.00 160.00 A12.08 12.08 0 0 1 304.51 180.78 A12.08 12.08 0 0 1 300.09 201.13 A12.08 12.08 0 0 1 292.81 220.65 A12.08 12.08 0 0 1 282.82 238.93 A12.08 12.08 0 0 1 270.34 255.61 A12.08 12.08 0 0 1 255.61 270.34 A12.08 12.08 0 0 1 238.93 282.82 A12.08 12.08 0 0 1 220.65 292.81 A12.08 12.08 0 0 1 201.13 300.09 A12.08 12.08 0 0 1 180.78 304.51 A12.08 12.08 0 0 1 160.00 306.00 A12.08 12.08 0 0 1 139.22 304.51 A12.08 12.08 0 0 1 118.87 300.09 A12.08 12.08 0 0 1 99.35 292.81 A12.08 12.08 0 0 1 81.07 282.82 A12.08 12.08 0 0 1 64.39 270.34 A12.08 12.08 0 0 1 49.66 255.61 A12.08 12.08 0 0 1 37.18 238.93 A12.08 12.08 0 0 1 27.19 220.65 A12.08 12.08 0 0 1 19.91 201.13 A12.08 12.08 0 0 1 15.49 180.78 A12.08 12.08 0 0 1 14.00 160.00 A12.08 12.08 0 0 1 15.49 139.22 A12.08 12.08 0 0 1 19.91 118.87 A12.08 12.08 0 0 1 27.19 99.35 A12.08 12.08 0 0 1 37.18 81.07 A12.08 12.08 0 0 1 49.66 64.39 A12.08 12.08 0 0 1 64.39 49.66 A12.08 12.08 0 0 1 81.07 37.18 A12.08 12.08 0 0 1 99.35 27.19 A12.08 12.08 0 0 1 118.87 19.91 A12.08 12.08 0 0 1 139.22 15.49 A12.08 12.08 0 0 1 160.00 14.00Z"/>
                      <circle cx="160" cy="160" r="131" fill="none" stroke="url(#bpCamGold)" stroke-width=".9" stroke-dasharray="1 4.2" stroke-linecap="round"/>
                      <circle cx="160" cy="160" r="125" class="f-paper"/>
                      <circle cx="160" cy="160" r="125" fill="none" stroke="url(#bpCamGold)" stroke-width="1.8"/>
                      <circle cx="160" cy="160" r="119.5" fill="none" stroke="url(#bpCamGold)" stroke-width=".7"/>
                      <circle cx="160" cy="160" r="109.5" fill="none" stroke="url(#bpCamGold)" stroke-width="1.4"/>
                    </g>
                    <g class="bp-cameo__bow" transform="translate(160 22)">
                      <path class="f-blush" stroke="url(#bpCamGold)" stroke-width=".9" d="M0 0 C-14 -16 -40 -16 -38 -2 C-36 10 -14 6 0 0Z"/>
                      <path class="f-blush" stroke="url(#bpCamGold)" stroke-width=".9" d="M0 0 C14 -16 40 -16 38 -2 C36 10 14 6 0 0Z"/>
                      <path class="f-blush" stroke="url(#bpCamGold)" stroke-width=".9" d="M-3 2 L-16 26 L-10 24 L-7 31 L2 4Z"/>
                      <path class="f-blush" stroke="url(#bpCamGold)" stroke-width=".9" d="M3 2 L16 26 L10 24 L7 31 L-2 4Z"/>
                      <ellipse cx="0" cy="0" rx="6" ry="5" class="f-blushdeep" stroke="url(#bpCamGold)" stroke-width=".9"/>
                    </g>
                    <g class="bp-cameo__sprig" transform="translate(160 296)">
                      <path fill="none" class="s-sage" stroke-width="1.3" stroke-linecap="round" d="M0 0 C-14 -2 -30 -8 -44 -18 M0 0 C14 -2 30 -8 44 -18"/>
                      <g class="f-sage" opacity=".9">
                        <path d="M-16 -4 C-20 -12 -14 -16 -10 -10 C-12 -7 -13 -5 -16 -4Z"/><path d="M-30 -10 C-36 -17 -30 -22 -25 -16 C-27 -13 -28 -11 -30 -10Z"/>
                        <path d="M16 -4 C20 -12 14 -16 10 -10 C12 -7 13 -5 16 -4Z"/><path d="M30 -10 C36 -17 30 -22 25 -16 C27 -13 28 -11 30 -10Z"/>
                      </g>
                      <g class="f-blush" stroke="url(#bpCamGold)" stroke-width=".6">
                        <circle cx="0" cy="-2" r="5.5"/><circle cx="-42" cy="-19" r="3.4"/><circle cx="42" cy="-19" r="3.4"/>
                      </g>
                      <circle cx="0" cy="-2" r="1.8" fill="#E9D08C"/>
                    </g>
                  </svg>
                  <span class="bp-frame__glint" aria-hidden="true"></span>
                </div>
                <span class="bp-deco bp-deco--s1"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="f-gold" d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span>
                <span class="bp-deco bp-deco--s3"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="f-gold" d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span>
              </div>
            </div>

            <div class="bp-card bp-wavy bp-keypad">
              <p class="bp-keypad__label">Enter passcode</p>
              <div class="bp-boxes" role="img" aria-label="Passcode, 0 of 4 digits entered">
                <span class="bp-box"></span><span class="bp-box"></span><span class="bp-box"></span><span class="bp-box"></span>
              </div>
              <p class="bp-keypad__msg" role="status" aria-live="polite"></p>
              <div class="bp-keys">
                <button type="button" class="bp-key" data-key="1">1</button>
                <button type="button" class="bp-key" data-key="2">2</button>
                <button type="button" class="bp-key" data-key="3">3</button>
                <button type="button" class="bp-key" data-key="4">4</button>
                <button type="button" class="bp-key" data-key="5">5</button>
                <button type="button" class="bp-key" data-key="6">6</button>
                <button type="button" class="bp-key" data-key="7">7</button>
                <button type="button" class="bp-key" data-key="8">8</button>
                <button type="button" class="bp-key" data-key="9">9</button>
                <button type="button" class="bp-key bp-key--soft" data-key="clear" aria-label="Clear">clear</button>
                <button type="button" class="bp-key" data-key="0">0</button>
                <button type="button" class="bp-key bp-key--soft" data-key="back" aria-label="Delete last digit">⌫</button>
              </div>
              <button type="button" class="bp-pill bp-enter">ENTER</button>
              <p class="bp-hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="f-acc" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/></svg> <span>${passcodeHint}</span></p>
            </div>
          </div>
        </section>

        <!-- 2. QUESTION SCREEN -->
        <section class="bp-screen bp-question" data-screen="question" aria-labelledby="bpQuestion">
          <div class="bp-q">
            <div class="bp-q__ask">
              <div class="bp-q__cardwrap">
                <div class="bp-q__bunny">
                  <svg class="bp-bunny" viewBox="0 0 240 150" aria-hidden="true">
                    <g class="bp-bunny__ears">
                      <g transform="rotate(-14 88 52)"><ellipse class="f-white s-ink" stroke-width="3" cx="88" cy="52" rx="18" ry="46"/><ellipse class="f-blush" cx="88" cy="56" rx="8" ry="32"/></g>
                      <g transform="rotate(14 152 52)"><ellipse class="f-white s-ink" stroke-width="3" cx="152" cy="52" rx="18" ry="46"/><ellipse class="f-blush" cx="152" cy="56" rx="8" ry="32"/></g>
                      <g transform="translate(158 20) rotate(18)"><path class="f-acc s-ink" stroke-width="2.4" stroke-linejoin="round" d="M0 0 L-16 -9 L-16 9 Z M0 0 L16 -9 L16 9 Z"/><circle class="f-acc s-ink" stroke-width="2.4" r="4.5"/></g>
                    </g>
                    <ellipse class="f-white s-ink" stroke-width="3" cx="120" cy="118" rx="72" ry="52"/>
                    <g class="bp-bunny__eyes">
                      <circle class="f-ink" cx="96" cy="112" r="6.5"/><circle class="f-white" cx="98.5" cy="109" r="2.2"/>
                      <circle class="f-ink" cx="144" cy="112" r="6.5"/><circle class="f-white" cx="146.5" cy="109" r="2.2"/>
                    </g>
                    <g class="bp-bunny__happy s-ink" fill="none" stroke-width="4" stroke-linecap="round">
                      <path d="M88 114 Q96 104 104 114"/><path d="M136 114 Q144 104 152 114"/>
                    </g>
                    <ellipse class="f-blush" cx="80" cy="128" rx="11" ry="6.5" opacity=".9"/>
                    <ellipse class="f-blush" cx="160" cy="128" rx="11" ry="6.5" opacity=".9"/>
                    <path class="f-acc" d="M114.5 121 Q120 117 125.5 121 Q120 127.5 114.5 121Z"/>
                    <path class="s-ink" fill="none" stroke-width="2.6" stroke-linecap="round" d="M112 130 Q116 135 120 130 Q124 135 128 130"/>
                    <g class="f-white s-ink" stroke-width="3">
                      <ellipse cx="82" cy="146" rx="20" ry="12"/><ellipse cx="158" cy="146" rx="20" ry="12"/>
                    </g>
                    <g class="s-ink" stroke-width="2" stroke-linecap="round" opacity=".55">
                      <path d="M76 142 v7"/><path d="M86 141 v8"/><path d="M152 141 v8"/><path d="M162 142 v7"/>
                    </g>
                  </svg>
                </div>
                <div class="bp-card bp-wavy bp-q__card">
                  <p id="bpQuestion" class="bp-q__text">${questionPrompt}</p>
                </div>
              </div>
              <p class="bp-q__nudge" aria-live="polite"></p>
              <div class="bp-q__buttons">
                <button type="button" class="bp-pill bp-yes">YES</button>
                <button type="button" class="bp-pill bp-pill--ghost bp-no">NO</button>
              </div>
            </div>
            <div class="bp-q__no" hidden>
              <h2 class="bp-q__nohead" aria-live="assertive">How dare you click NO!</h2>
              <button type="button" class="bp-pill bp-again">TRY AGAIN <span aria-hidden="true">↺</span></button>
              <div class="bp-q__duo">
                <svg class="bp-duo" viewBox="0 0 430 310" aria-hidden="true" focusable="false">
                  <ellipse cx="130" cy="296" rx="84" ry="10" class="f-ink" opacity=".08"/>
                  <ellipse cx="300" cy="296" rx="74" ry="10" class="f-ink" opacity=".08"/>
                  <g class="bp-duo__bear">
                    <circle class="f-peach s-ink" stroke-width="3" cx="76" cy="64" r="23"/><circle class="f-blush" cx="76" cy="64" r="12"/>
                    <circle class="f-peach s-ink" stroke-width="3" cx="184" cy="64" r="23"/><circle class="f-blush" cx="184" cy="64" r="12"/>
                    <ellipse class="f-peach s-ink" stroke-width="3" cx="130" cy="230" rx="74" ry="66"/>
                    <ellipse class="f-cream" cx="130" cy="242" rx="44" ry="40"/>
                    <ellipse class="f-peach s-ink" stroke-width="3" cx="130" cy="120" rx="70" ry="61"/>
                    <ellipse class="f-cream s-ink" stroke-width="2.5" cx="130" cy="142" rx="29" ry="20"/>
                    <ellipse class="f-ink" cx="130" cy="133" rx="8.5" ry="5.8"/>
                    <path class="s-ink" fill="none" stroke-width="3" stroke-linecap="round" d="M119 153 Q130 146 141 153"/>
                    <g class="s-ink" stroke-width="4.5" stroke-linecap="round"><path d="M86 98 L111 108"/><path d="M174 98 L149 108"/></g>
                    <circle class="f-ink" cx="100" cy="118" r="5.5"/><circle class="f-ink" cx="160" cy="118" r="5.5"/>
                    <ellipse class="f-blush" cx="86" cy="140" rx="12" ry="7.5" opacity=".95"/><ellipse class="f-blush" cx="174" cy="140" rx="12" ry="7.5" opacity=".95"/>
                    <path class="s-ink" fill="none" stroke-width="30" stroke-linecap="round" d="M74 214 Q122 240 176 206"/>
                    <path class="s-peach" fill="none" stroke-width="24" stroke-linecap="round" d="M74 214 Q122 240 176 206"/>
                    <path class="s-ink" fill="none" stroke-width="30" stroke-linecap="round" d="M186 214 Q138 240 86 206"/>
                    <path class="s-peach" fill="none" stroke-width="24" stroke-linecap="round" d="M186 214 Q138 240 86 206"/>
                    <g class="s-acc bp-duo__vein" fill="none" stroke-width="4.5" stroke-linecap="round">
                      <path d="M194 46 q8 7 16 0"/><path d="M194 70 q8 -7 16 0"/><path d="M190 50 q7 8 0 16"/><path d="M214 50 q-7 8 0 16"/>
                    </g>
                  </g>
                  <g class="bp-duo__bunny">
                    <g transform="rotate(-10 268 66)"><ellipse class="f-white s-ink" stroke-width="3" cx="268" cy="66" rx="17" ry="48"/><ellipse class="f-blush" cx="268" cy="70" rx="8" ry="33"/></g>
                    <g transform="rotate(12 330 66)"><ellipse class="f-white s-ink" stroke-width="3" cx="330" cy="66" rx="17" ry="48"/><ellipse class="f-blush" cx="330" cy="70" rx="8" ry="33"/></g>
                    <ellipse class="f-white s-ink" stroke-width="3" cx="300" cy="238" rx="64" ry="58"/>
                    <ellipse class="f-lavlight" cx="300" cy="248" rx="38" ry="34"/>
                    <ellipse class="f-white s-ink" stroke-width="3" cx="300" cy="142" rx="64" ry="55"/>
                    <circle class="f-ink" cx="277" cy="136" r="11"/><circle class="f-white" cx="281" cy="131" r="4.5"/><circle class="f-white" cx="273" cy="141" r="2"/>
                    <circle class="f-ink" cx="323" cy="136" r="11"/><circle class="f-white" cx="327" cy="131" r="4.5"/><circle class="f-white" cx="319" cy="141" r="2"/>
                    <g class="bp-duo__tears" fill="none" stroke="#9EC3FF" stroke-width="7" stroke-linecap="round" opacity=".9">
                      <path d="M270 150 Q266 178 272 206"/><path d="M330 150 Q334 178 328 206"/>
                    </g>
                    <ellipse class="f-blush" cx="264" cy="158" rx="11" ry="6.5"/><ellipse class="f-blush" cx="336" cy="158" rx="11" ry="6.5"/>
                    <path class="f-acc s-ink" stroke-width="2.6" stroke-linejoin="round" d="M288 166 Q300 154 312 166 Q300 182 288 166Z"/>
                    <circle class="f-white s-ink" stroke-width="3" cx="246" cy="168" r="14"/>
                    <circle class="f-white s-ink" stroke-width="3" cx="354" cy="168" r="14"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. LETTER SCREEN -->
        <section class="bp-screen bp-letterscreen" data-screen="letter" aria-label="Your letter">
          <div class="bp-scene">
            <div class="bp-env" role="button" tabindex="0" aria-label="Open the envelope">
              <div class="bp-env__back"></div>
              <div class="bp-env__paper"><i></i><i></i><i></i></div>
              <svg class="bp-env__front" viewBox="0 0 400 276" preserveAspectRatio="none" aria-hidden="true">
                <path class="f-envside" d="M0 0 L200 160 L0 276Z"/>
                <path class="f-envside" d="M400 0 L200 160 L400 276Z"/>
                <path class="f-envfront" d="M0 276 L200 134 L400 276Z"/>
                <rect x="6" y="6" width="388" height="264" rx="8" fill="none" stroke="#C9A24A" stroke-width=".8" stroke-dasharray="1 3.5" opacity=".7"/>
              </svg>
              <p class="bp-env__to"><span class="bp-env__tolabel">for</span> ${recipientName}</p>
              <div class="bp-env__stamp">
                <svg class="bp-stamp" viewBox="-6 -6 76 92" aria-hidden="true">
                  <rect width="64" height="80" class="f-paper"/>
                  <rect x="6" y="6" width="52" height="68" class="f-cream"/>
                  <rect x="6" y="6" width="52" height="68" fill="none" stroke="#C9A24A" stroke-width="1"/>
                  <g transform="translate(32 36)">
                    <path class="f-blush" stroke="#C9A24A" stroke-width=".7" d="M0 -12 C8 -14 13 -6 9 1 C14 6 8 14 0 10 C-8 14 -14 6 -9 1 C-13 -6 -8 -14 0 -12Z"/>
                  </g>
                </svg>
              </div>
              <div class="bp-env__flap">
                <div class="bp-flap__face bp-flap__face--out">
                  <svg class="bp-env__flapart" viewBox="0 0 400 190">
                    <path class="f-envflap" d="M0 0 L200 150 L400 0 Z"/>
                  </svg>
                </div>
                <div class="bp-flap__face bp-flap__face--in">
                  <svg class="bp-env__flapart" viewBox="0 0 400 190">
                    <path class="f-envin" d="M0 0 L200 150 L400 0 Z"/>
                  </svg>
                </div>
              </div>
              <div class="bp-seal"><svg viewBox="0 0 100 100" class="bp-seal__art"><circle cx="50" cy="50" r="32" fill="${accent}"/><text x="50" y="60" text-anchor="middle" class="bp-seal__initial" fill="#fff" font-family="var(--font-script)" font-size="28">${senderName.charAt(0) || '♡'}</text></svg></div>
            </div>
            <p class="bp-env__hint">tap to open <span aria-hidden="true">✉</span></p>

            <article class="bp-letter" aria-label="Letter from ${senderName}">
              <div class="bp-letter__folds" aria-hidden="true"><span class="bp-fold bp-fold--a"></span><span class="bp-fold bp-fold--b"></span><span class="bp-fold bp-fold--c"></span></div>
              <div class="bp-letter__body">
                <span class="bp-letter__tape" aria-hidden="true"></span>
                <span class="bp-letter__sticker" aria-hidden="true">
                  <svg class="bp-sticker" viewBox="-3 -3 30 30" aria-hidden="true">
                    <path d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z" class="f-acc s-ink" stroke-width=".9"/>
                  </svg>
                </span>
                <p class="bp-letter__greet" data-type>${letterSalutation}</p>
                <div class="bp-letter__text">
                  ${letterParagraphs.map(p => `<p data-type>${p}</p>`).join('')}
                </div>
                <p class="bp-letter__signoff" data-type>${letterSignoff}</p>
                <p class="bp-letter__sig"><span>${senderName}</span></p>
              </div>
            </article>
            <div class="bp-actions bp-letter__actions">
              <button type="button" class="bp-link bp-reread"><span aria-hidden="true">↺</span> read again</button>
              <button type="button" class="bp-pill" data-next>next <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </section>

        <!-- 4. VOICE NOTE SCREEN -->
        <section class="bp-screen bp-voicescreen" data-screen="voice" aria-labelledby="bpVoiceTitle">
          <div class="bp-card bp-wavy bp-voice">
            <p class="bp-eyebrow">${voiceSubtitle}</p>
            <h2 id="bpVoiceTitle" class="bp-h2">${voiceTitle}</h2>
            <div class="bp-cassette-wrap">
              <svg class="bp-cassette" viewBox="0 0 320 206" aria-hidden="true">
                <rect class="f-lav s-ink" stroke-width="3.5" x="6" y="6" width="308" height="194" rx="20"/>
                <rect class="f-cream s-ink" stroke-width="2.5" x="28" y="24" width="264" height="62" rx="10"/>
                <rect class="f-acc" x="28" y="24" width="264" height="10" rx="5" opacity=".85"/>
                <rect class="f-plum s-ink" stroke-width="3" x="82" y="98" width="156" height="60" rx="30"/>
                <g class="bp-reel bp-reel--l">
                  <circle class="f-cream s-ink" stroke-width="3" cx="128" cy="128" r="22"/>
                  <circle class="f-ink" cx="128" cy="128" r="7"/>
                </g>
                <g class="bp-reel bp-reel--r">
                  <circle class="f-cream s-ink" stroke-width="3" cx="192" cy="128" r="22"/>
                  <circle class="f-ink" cx="192" cy="128" r="7"/>
                </g>
              </svg>
              <span class="bp-cassette__label">${voiceLabel}</span>
            </div>
            <div class="bp-wave" aria-hidden="true">
              ${Array.from({ length: 28 }).map(() => '<i></i>').join('')}
            </div>
            <div class="bp-ctrl" data-player="voice">
              <button type="button" class="bp-play" aria-label="Play voice note">
                <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>
                <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.4"/><rect x="13.5" y="5" width="4" height="14" rx="1.4"/></svg>
              </button>
              <div class="bp-track"><input type="range" class="bp-seek" min="0" max="1000" value="0" step="1" aria-label="Seek"><span class="bp-track__fill"></span></div>
              <span class="bp-time">0:00</span>
            </div>
          </div>
          <div class="bp-actions"><button type="button" class="bp-pill" data-next>next <span aria-hidden="true">→</span></button></div>
        </section>

        <!-- 5. OUR SONG SCREEN -->
        <section class="bp-screen bp-songscreen" data-screen="song" aria-labelledby="bpSongTitle">
          <div class="bp-card bp-wavy bp-song">
            <p class="bp-eyebrow">our song</p>
            <div class="bp-player-wrap">
              <svg class="bp-player" viewBox="0 0 340 270" aria-hidden="true">
                <rect class="f-peach s-ink" stroke-width="3.5" x="6" y="10" width="328" height="250" rx="26"/>
                <rect class="f-cream" x="20" y="24" width="300" height="222" rx="18" opacity=".55"/>
                <circle class="f-plum s-ink" stroke-width="3" cx="150" cy="135" r="104"/>
                <g class="bp-record">
                  <circle cx="150" cy="135" r="98" fill="#2E2233"/>
                  <circle cx="150" cy="135" r="88" fill="none" stroke="#4A3956" stroke-width="1.6"/>
                  <circle cx="150" cy="135" r="68" fill="none" stroke="#4A3956" stroke-width="1.6"/>
                  <circle class="f-acc" cx="150" cy="135" r="32"/>
                  <circle class="f-cream" cx="150" cy="135" r="3.5"/>
                </g>
                <g class="bp-arm">
                  <path d="M286 52 L276 176 L246 206" fill="none" class="s-ink" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M286 52 L276 176 L246 206" fill="none" class="s-cream" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
              <div class="bp-notes-fly" aria-hidden="true"></div>
            </div>
            <h2 id="bpSongTitle" class="bp-song__title">${songTitle}</h2>
            <p class="bp-song__artist">${songArtist}</p>
            <div class="bp-ctrl" data-player="song">
              <button type="button" class="bp-play" aria-label="Play our song">
                <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>
                <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.4"/><rect x="13.5" y="5" width="4" height="14" rx="1.4"/></svg>
              </button>
              <div class="bp-track"><input type="range" class="bp-seek" min="0" max="1000" value="0" step="1" aria-label="Seek"><span class="bp-track__fill"></span></div>
              <span class="bp-time">0:00</span>
            </div>
            <p class="bp-song__tip">a little music box, just for today ♪</p>
          </div>
          <div class="bp-actions"><button type="button" class="bp-pill" data-next>next <span aria-hidden="true">→</span></button></div>
        </section>

        <!-- 6. SCRAPBOOK SCREEN -->
        <section class="bp-screen bp-screen--scroll bp-scrapbook" data-screen="scrapbook" aria-label="Scrapbook">
          <div class="bp-book">
            <span class="bp-book__rings" aria-hidden="true"></span>
            <section class="bp-book__part bp-memories" aria-labelledby="bpMemTitle">
              <header class="bp-book__head">
                <p class="bp-script">a little scrapbook of</p>
                <h2 id="bpMemTitle" class="bp-h1">Our memories</h2>
              </header>
              <div class="bp-board">
                ${polaroids.map((p, i) => {
                  const tilts = [-4, 3, -2, 4, -3, 2];
                  const tilt = tilts[i % tilts.length];
                  const tapes = ['blush', 'lav', 'peach', 'blush', 'cream', 'lav'];
                  const tape = tapes[i % tapes.length];
                  return `
                    <figure class="bp-pola" style="--tilt:${tilt}deg" data-i="${i}">
                      <span class="bp-tape bp-tape--${tape}" aria-hidden="true"></span>
                      <button type="button" class="bp-pola__flip" aria-label="Flip photo: ${p.caption}" aria-pressed="false">
                        <span class="bp-pola__inner">
                          <span class="bp-pola__front">
                            <span class="bp-pola__img"><img src="${p.image}" alt="${p.caption}" loading="lazy" decoding="async" draggable="false"></span>
                            <span class="bp-pola__cap">${p.caption}</span>
                          </span>
                          <span class="bp-pola__back">
                            <span class="bp-pola__secret">${p.note || ''}</span>
                            <span class="bp-pola__turn">tap to flip back ↺</span>
                          </span>
                        </span>
                      </button>
                      <button type="button" class="bp-pola__zoom" aria-label="Zoom in">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
                      </button>
                      ${i === 0 ? `
                        <span class="bp-pola__deco bp-pola__deco--fav">
                          <svg class="bp-doodle bp-doodle--arrow" viewBox="0 0 90 60" aria-hidden="true">
                            <path class="s-ink" fill="none" stroke-width="2.6" stroke-linecap="round" d="M6 50 C 18 14, 50 6, 80 22 M66 12 L82 23 L68 34"/>
                          </svg>
                          <span>my favourite!</span>
                        </span>
                      ` : ''}
                    </figure>
                  `;
                }).join('')}
              </div>
              <p class="bp-book__tip">tap a photo to flip it · <span aria-hidden="true">🔍</span> to zoom & swipe</p>
            </section>

            <div class="bp-book__pair">
              <section class="bp-book__part bp-lovenotes" aria-labelledby="bpLoveTitle">
                <h2 id="bpLoveTitle" class="bp-h2 bp-h2--hand">Things I love about you <span aria-hidden="true">♡</span></h2>
                <ul class="bp-sticky">
                  ${loveNotes.map((note, idx) => {
                    const colors = ['blush', 'cream', 'lav', 'peach'];
                    const col = colors[idx % colors.length];
                    const tilts = ['3deg', '-3.5deg', '1.5deg', '2.8deg', '-2deg', '-2.8deg'];
                    return `
                      <li class="bp-note bp-note--${col}" style="--tilt:${tilts[idx % tilts.length]}; --i:${idx}">
                        <button type="button" class="bp-note__btn"><span class="bp-note__pin" aria-hidden="true"></span>${note}</button>
                      </li>
                    `;
                  }).join('')}
                </ul>
              </section>

              <section class="bp-book__part bp-reasons" aria-labelledby="bpReasonsTitle">
                <div class="bp-lined">
                  <span class="bp-tape bp-tape--lav bp-lined__tape" aria-hidden="true"></span>
                  <h2 id="bpReasonsTitle" class="bp-h2">Reasons you’re special</h2>
                  <ol class="bp-reasons__list">
                    ${reasons.map((r, idx) => `
                      <li style="--i:${idx}">
                        <span class="bp-reasons__n" aria-hidden="true">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path class="f-acc" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/></svg>
                          <b>${idx + 1}</b>
                        </span>
                        <span>${typeof r === 'object' ? (r.title || r.body) : r}</span>
                      </li>
                    `).join('')}
                  </ol>
                </div>
              </section>
            </div>
            <div class="bp-actions"><button type="button" class="bp-pill" data-next>one last thing <span aria-hidden="true">→</span></button></div>
          </div>
        </section>

        <!-- 7. FINALE SCREEN -->
        <section class="bp-screen bp-finale" data-screen="finale" aria-labelledby="bpFinaleTitle">
          <div class="bp-finale__inner">
            <h2 id="bpFinaleTitle" class="bp-finale__title" data-type>${finaleTitle}</h2>
            <p class="bp-finale__line">${finaleLine}</p>

            <div class="bp-cakewrap">
              <p class="bp-cake__hint">${cakeHint}</p>
              <svg class="bp-cake" viewBox="0 0 300 286" aria-label="A birthday cake with 5 candles" focusable="false">
                <defs>
                  <radialGradient id="bpFlameGlow"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".95"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient>
                  <radialGradient id="bpFlame" cx="50%" cy="65%" r="60%"><stop offset="0" stop-color="#FFF8DA"/><stop offset=".5" stop-color="#FFC861"/><stop offset="1" stop-color="#F08A3C"/></radialGradient>
                </defs>
                <ellipse class="f-cream s-ink" stroke-width="3" cx="150" cy="262" rx="136" ry="18"/>
                <rect class="f-blush s-ink" stroke-width="3" x="36" y="176" width="228" height="84" rx="18"/>
                <path class="f-cream" d="M36 178 H264 V188 Q257.7 198 251.3 194 Q246.3 184 238.7 188 Q232.3 204 226.0 197.6 Q220.9 184 213.3 188 Q207.0 210 200.7 201.2 Q195.6 184 188.0 188 Q181.7 216 175.3 204.8 Q170.3 184 162.7 188 Q156.3 198 150.0 194 Q144.9 184 137.3 188 Q131.0 204 124.7 197.6 Q119.6 184 112.0 188 Q105.7 210 99.3 201.2 Q94.3 184 86.7 188 Q80.3 216 74.0 204.8 Q68.9 184 61.3 188 Q55.0 198 48.7 194 Q43.6 184 36.0 188Z"/>
                <rect class="f-lav s-ink" stroke-width="3" x="78" y="108" width="144" height="72" rx="16"/>
                <path class="f-cream" d="M78 110 H222 V120 Q216.0 136 210.0 129.6 Q205.2 116 198.0 120 Q192.0 142 186.0 133.2 Q181.2 116 174.0 120 Q168.0 148 162.0 136.8 Q157.2 116 150.0 120 Q144.0 130 138.0 126 Q133.2 116 126.0 120 Q120.0 136 114.0 129.6 Q109.2 116 102.0 120 Q96.0 142 90.0 133.2 Q85.2 116 78.0 120Z"/>
                <rect class="f-acc" x="70" y="214" width="10" height="3.6" rx="1.8" transform="rotate(20 75 215.8)"/><rect class="f-gold" x="96" y="236" width="10" height="3.6" rx="1.8" transform="rotate(-30 101 237.8)"/><rect class="f-lavdeep" x="128" y="220" width="10" height="3.6" rx="1.8" transform="rotate(50 133 221.8)"/><rect class="f-acc" x="180" y="232" width="10" height="3.6" rx="1.8" transform="rotate(-15 185 233.8)"/><rect class="f-gold" x="214" y="216" width="10" height="3.6" rx="1.8" transform="rotate(35 219 217.8)"/><rect class="f-lavdeep" x="236" y="238" width="10" height="3.6" rx="1.8" transform="rotate(-40 241 239.8)"/>
                <path transform="translate(51 226) scale(.75)" class="f-acc" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/>
                <path transform="translate(141 226) scale(.75)" class="f-acc" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/>
                <path transform="translate(231 226) scale(.75)" class="f-acc" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z"/>
                ${[0, 1, 2, 3, 4].map(idx => {
                  const cx = [98, 124, 150, 176, 202][idx];
                  return `
                    <g class="bp-candle" data-candle="${idx}" role="button" tabindex="0" aria-label="Blow out candle ${idx + 1}">
                      <rect x="${cx - 15}" y="20" width="30" height="92" fill="transparent"/>
                      <rect class="f-cream s-ink" stroke-width="2.2" x="${cx - 5.5}" y="70" width="11" height="40" rx="3"/>
                      <g class="s-acc" stroke-width="3" opacity=".85"><path d="M${cx - 5} 82 l10 -6"/><path d="M${cx - 5} 94 l10 -6"/><path d="M${cx - 5} 106 l10 -6"/></g>
                      <path class="s-ink" stroke-width="2" stroke-linecap="round" d="M${cx} 70 v-6"/>
                      <g class="bp-flame" style="transform-origin:${cx}px 62px">
                        <circle cx="${cx}" cy="50" r="17" fill="url(#bpFlameGlow)"/>
                        <path fill="url(#bpFlame)" d="M${cx} 34 C${cx + 8} 44 ${cx + 9} 52 ${cx + 6} 58 C${cx + 4} 63 ${cx - 4} 63 ${cx - 6} 58 C${cx - 9} 52 ${cx - 6} 44 ${cx} 34Z"/>
                      </g>
                      <g class="bp-smoke" fill="#B9A9C9">
                        <circle cx="${cx}" cy="56" r="4"/><circle cx="${cx + 4}" cy="46" r="5"/><circle cx="${cx - 2}" cy="34" r="6"/>
                      </g>
                    </g>
                  `;
                }).join('')}
              </svg>
              <p class="bp-cake__done" role="status" aria-live="polite"></p>
            </div>

            <div class="bp-actions bp-finale__actions">
              <button type="button" class="bp-pill bp-pill--ghost bp-replay"><span aria-hidden="true">↺</span> Replay surprise</button>
              <a class="bp-pill bp-pill--wa" href="${waUrl}" target="_blank" rel="noopener"><span aria-hidden="true">💌</span> Send a thank-you</a>
            </div>
            <footer class="bp-brand"><span>Made with love for <b>${recipientName}</b> ♡</span></footer>
          </div>
        </section>
      </main>

      <canvas class="bp-fx" aria-hidden="true"></canvas>
      <button type="button" class="bp-mini" hidden aria-label="Pause our song"><span class="bp-mini__disc" aria-hidden="true"></span></button>

      <div class="bp-lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
        <button type="button" class="bp-lightbox__close" aria-label="Close">✕</button>
        <button type="button" class="bp-lightbox__nav bp-lightbox__prev" aria-label="Previous photo">‹</button>
        <figure class="bp-lightbox__fig"><img alt=""><figcaption><span class="bp-lightbox__cap"></span><span class="bp-lightbox__back"></span></figcaption></figure>
        <button type="button" class="bp-lightbox__nav bp-lightbox__next" aria-label="Next photo">›</button>
        <p class="bp-lightbox__count"></p>
      </div>

      <audio class="bp-audio-voice" preload="metadata" src="${voiceUrl}"></audio>
      <audio class="bp-audio-song" preload="none" loop ${songUrl ? `src="${songUrl}"` : ''}></audio>
    </div>
  `;

  const root = container.querySelector('.bp-experience-wrap');
  const screens = {};
  root.querySelectorAll('.bp-screen').forEach(s => {
    screens[s.getAttribute('data-screen')] = s;
  });
  const ORDER = ['unlock', 'question', 'letter', 'voice', 'song', 'scrapbook', 'finale'];
  let current = null;
  const hooks = {};
  const tickHooks = [];
  let isDestroyed = false;

  // Three.js 3D Ambient Layer + 2D FX Overlay Canvas
  const amb = root.querySelector('.bp-ambient');
  const fxc = root.querySelector('.bp-fx');
  const fctx = fxc ? fxc.getContext('2d') : null;
  const threeLayer = createPaigaamThreeLayer(amb, { accent, blush, lavender, peach, cream });

  let W = window.innerWidth;
  let H = window.innerHeight;
  function resizeCanvases() {
    W = window.innerWidth;
    H = window.innerHeight;
    if (fxc) { fxc.width = W; fxc.height = H; }
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  // FX particles (2D crisp overlay + Three.js 3D bursts)
  let particles = [];
  function burstHearts(x, y, count = 16, power = 1.2) {
    threeLayer?.burst(x, y, Math.min(20, count), 'hearts');
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = (2 + Math.random() * 4) * power;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 12 + Math.random() * 8,
        color: [accent, blush, lavender, peach][i % 4],
        alpha: 1,
        life: 0.9 + Math.random() * 0.4
      });
    }
  }

  function confetti(x, y, count = 80) {
    threeLayer?.burst(x, y, Math.min(36, Math.round(count / 2)), 'confetti');
    for (let i = 0; i < count; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 12 - 2,
        size: 6 + Math.random() * 6,
        color: [accent, '#FFC107', blush, lavender, '#4CAF50', '#2196F3'][i % 6],
        alpha: 1,
        life: 1.2 + Math.random() * 0.8
      });
    }
  }

  function firework(x, y) {
    sfx('firework');
    threeLayer?.burst(x, y, 28, 'firework');
    burstHearts(x, y, 16, 1.8);
    confetti(x, y, 36);
  }

  let lastTime = performance.now();
  let rafId = null;
  function animLoop(nowTime) {
    if (isDestroyed) return;
    const dt = Math.min((nowTime - lastTime) / 1000, 0.1);
    lastTime = nowTime;

    if (fctx) {
      fctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 9.8 * dt * 0.8;
        p.alpha -= dt / p.life;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        fctx.save();
        fctx.globalAlpha = Math.max(0, p.alpha);
        fctx.fillStyle = p.color;
        fctx.beginPath();
        fctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        fctx.fill();
        fctx.restore();
      }
    }

    tickHooks.forEach(hook => {
      try { hook(dt, nowTime / 1000); } catch (e) {}
    });

    rafId = requestAnimationFrame(animLoop);
  }
  rafId = requestAnimationFrame(animLoop);

  // Wavy SVG scalloped borders
  function wavePath(w, h, r) {
    const s = r * 2;
    function edge(len, dx, dy) {
      const n = Math.max(2, Math.round(len / s));
      const step = len / n;
      let seg = '';
      for (let i = 0; i < n; i++) {
        seg += ` a${(step / 2).toFixed(2)} ${(step / 2).toFixed(2)} 0 0 1 ${(dx * step).toFixed(2)} ${(dy * step).toFixed(2)}`;
      }
      return seg;
    }
    return `M${r} ${r}${edge(w - 2 * r, 1, 0)}${edge(h - 2 * r, 0, 1)}${edge(w - 2 * r, -1, 0)}${edge(h - 2 * r, 0, -1)}Z`;
  }

  const waveDraws = [];
  root.querySelectorAll('.bp-wavy').forEach(card => {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'bp-wave-edge');
    svg.setAttribute('aria-hidden', 'true');
    const fill = document.createElementNS(NS, 'path');
    fill.setAttribute('class', 'fill');
    svg.appendChild(fill);
    card.insertBefore(svg, card.firstChild);

    function draw() {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      if (!w || !h) return;
      const r = w < 340 ? 8 : 10;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      fill.setAttribute('d', wavePath(w, h, r));
      card.classList.add('has-wave');
    }
    draw();
    waveDraws.push(draw);
    setTimeout(draw, 120);
  });
  const onResizeWaves = () => waveDraws.forEach(fn => fn());
  window.addEventListener('resize', onResizeWaves);

  // Screen Navigation & Lovable-style Transitions
  const progressDots = root.querySelectorAll('.bp-progress i');
  function setProgress(name) {
    const idx = ORDER.indexOf(name);
    progressDots.forEach(dot => {
      const i = ORDER.indexOf(dot.getAttribute('data-p'));
      dot.classList.toggle('is-done', i < idx);
      dot.classList.toggle('is-on', i === idx);
    });
  }

  function go(name) {
    if (!screens[name] || name === current) return;
    const prev = current ? screens[current] : null;
    const next = screens[name];
    if (current && hooks[current]?.leave) hooks[current].leave();

    if (prev) {
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 520);
    }
    next.classList.add('is-active');
    current = name;
    document.body.setAttribute('data-screen', name);
    setProgress(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(onResizeWaves, 60);
    if (hooks[name]?.enter) hooks[name].enter();
  }

  function nextScreen() {
    const idx = ORDER.indexOf(current);
    if (idx >= 0 && idx < ORDER.length - 1) {
      go(ORDER[idx + 1]);
    }
  }

  root.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', nextScreen);
  });

  // 1. UNLOCK LOGIC (Keypad + Keyboard)
  const onKeyDownUnlock = [];
  (() => {
    const s = screens.unlock;
    if (!s) return;
    const boxes = s.querySelectorAll('.bp-box');
    const boxesWrap = s.querySelector('.bp-boxes');
    const msg = s.querySelector('.bp-keypad__msg');
    const enter = s.querySelector('.bp-enter');
    const hint = s.querySelector('.bp-hint');
    let code = '';
    let tries = 0;
    let busy = false;

    function paint() {
      boxes.forEach((b, i) => b.classList.toggle('is-filled', i < code.length));
      boxesWrap?.setAttribute('aria-label', `Passcode, ${code.length} of 4 digits entered`);
      enter?.classList.toggle('is-ready', code.length === 4);
    }

    function press(k) {
      if (busy || current !== 'unlock') return;
      SND.wake();
      if (k === 'clear') {
        code = '';
        sfx('soft');
      } else if (k === 'back') {
        code = code.slice(0, -1);
        sfx('soft');
      } else if (/^\d$/.test(k) && code.length < 4) {
        code += k;
        sfx('key', Number(k));
      }
      if (msg) msg.textContent = '';
      boxesWrap?.classList.remove('is-wrong');
      paint();
    }

    function unlockSuccess() {
      if (busy) return;
      busy = true;
      boxesWrap?.classList.add('is-right');
      if (msg) msg.textContent = 'Yay! Unlocked 💖';
      const r = boxesWrap.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height / 2, 26, 1.6);
      sfx('unlock');
      setTimeout(nextScreen, 950);
    }

    function check() {
      if (busy || current !== 'unlock') return;
      if (code.length < 4) {
        if (msg) msg.textContent = 'Four numbers please ✨';
        sfx('soft');
        return;
      }
      if (code === passcode) {
        unlockSuccess();
      } else {
        tries++;
        sfx('wrong');
        boxesWrap?.classList.add('is-wrong');
        if (msg) msg.textContent = 'Nope! Try again silly 💕';
        if (hint && tries >= 2) hint.classList.add('is-shown');
        setTimeout(() => {
          code = '';
          paint();
        }, 500);
      }
    }

    s.querySelectorAll('.bp-key').forEach(btn => {
      btn.addEventListener('click', () => press(btn.getAttribute('data-key')));
    });
    enter?.addEventListener('click', check);

    const keyHandler = (e) => {
      if (current !== 'unlock') return;
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') press('back');
      else if (e.key === 'Escape') press('clear');
      else if (e.key === 'Enter') check();
    };
    window.addEventListener('keydown', keyHandler);
    onKeyDownUnlock.push(keyHandler);

    container.querySelector('#btnBypassUnlock')?.addEventListener('click', unlockSuccess);

    hooks.unlock = {
      enter: () => {
        busy = false;
        code = '';
        tries = 0;
        boxesWrap?.classList.remove('is-right', 'is-wrong');
        if (msg) msg.textContent = '';
        paint();
      }
    };
  })();

  // 2. QUESTION LOGIC
  (() => {
    const s = screens.question;
    if (!s) return;
    const ask = s.querySelector('.bp-q__ask');
    const noPanel = s.querySelector('.bp-q__no');
    const noHead = s.querySelector('.bp-q__nohead');
    const yes = s.querySelector('.bp-yes');
    const no = s.querySelector('.bp-no');
    const again = s.querySelector('.bp-again');
    const nudge = s.querySelector('.bp-q__nudge');
    let noCount = 0;
    let done = false;

    function updateSize() {
      if (yes) yes.style.transform = `scale(${Math.min(1 + noCount * 0.22, 2.2)})`;
      if (no) no.style.transform = `scale(${Math.max(0.62, 1 - noCount * 0.08)})`;
    }

    function sayYes() {
      if (done) return;
      done = true;
      SND.wake();
      sfx('yes');
      s.classList.add('is-happy');
      if (nudge) nudge.textContent = 'Yay! I knew it 💕';
      const r = yes.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 100);
      burstHearts(r.left + r.width / 2, r.top, 16, 1.4);
      setTimeout(nextScreen, 1450);
    }

    yes?.addEventListener('click', sayYes);
    no?.addEventListener('click', () => {
      if (done) return;
      noCount++;
      sfx('no');
      if (noHead) noHead.textContent = noMessages[(noCount - 1) % noMessages.length];
      if (ask) ask.hidden = true;
      if (noPanel) noPanel.hidden = false;
    });

    again?.addEventListener('click', () => {
      sfx('soft');
      if (noPanel) noPanel.hidden = true;
      if (ask) ask.hidden = false;
      updateSize();
    });

    hooks.question = {
      enter: () => {
        done = false;
        noCount = 0;
        s.classList.remove('is-happy');
        if (ask) ask.hidden = false;
        if (noPanel) noPanel.hidden = true;
        if (nudge) nudge.textContent = '';
        updateSize();
      }
    };
  })();

  // 3. LETTER TYPEWRITER & ENVELOPE
  (() => {
    const s = screens.letter;
    if (!s) return;
    const env = s.querySelector('.bp-env');
    const letter = s.querySelector('.bp-letter');
    const reread = s.querySelector('.bp-reread');
    const typer = createTyper(letter.querySelectorAll('[data-type]'), {
      seconds: 9,
      onDone: () => {
        s.classList.add('is-signed');
        setTimeout(() => s.classList.add('is-done'), 650);
      }
    });

    let timers = [];
    let running = false;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    function openEnvelope() {
      if (running) return;
      running = true;
      SND.wake();
      env.classList.add('is-cracked');
      sfx('crack');
      const r = env.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height * 0.6, 14, 1.1);

      timers.push(setTimeout(() => { env.classList.add('is-open'); sfx('paper'); }, 380));
      timers.push(setTimeout(() => { env.classList.add('is-rising'); }, 1050));
      timers.push(setTimeout(() => { env.classList.add('is-away'); }, 1900));
      timers.push(setTimeout(() => {
        s.classList.add('is-reading');
        sfx('paper');
        typer.start();
      }, 2400));
    }

    function resetEnvelope() {
      clearTimers();
      running = false;
      typer.reset();
      env.classList.remove('is-cracked', 'is-open', 'is-rising', 'is-away');
      s.classList.remove('is-reading', 'is-signed', 'is-done');
    }

    env?.addEventListener('click', openEnvelope);
    env?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });

    reread?.addEventListener('click', () => {
      resetEnvelope();
      setTimeout(openEnvelope, 260);
    });

    hooks.letter = {
      enter: resetEnvelope,
      leave: clearTimers
    };
  })();

  // 4. VOICE NOTE & 5. OUR SONG PLAYERS + MINI-PLAYER
  const voiceEl = root.querySelector('.bp-audio-voice');
  const songEl = root.querySelector('.bp-audio-song');
  const miniBtn = root.querySelector('.bp-mini');
  let isSongPlaying = false;

  function updateMiniPlayer() {
    if (!miniBtn) return;
    const showMini = isSongPlaying && (current === 'scrapbook' || current === 'finale');
    miniBtn.hidden = !showMini;
    miniBtn.classList.toggle('is-playing', isSongPlaying);
  }

  function bindAudio(screenEl, cardEl, audioEl, isSong = false) {
    if (!screenEl || !cardEl || !audioEl) return;
    const btn = screenEl.querySelector('.bp-play');
    const seek = screenEl.querySelector('.bp-seek');
    const fill = screenEl.querySelector('.bp-track__fill');
    const time = screenEl.querySelector('.bp-time');

    function fmt(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function update() {
      const dur = audioEl.duration || 0;
      const cur = audioEl.currentTime || 0;
      const p = dur ? cur / dur : 0;
      if (fill) fill.style.setProperty('--p', `${(p * 100).toFixed(2)}%`);
      if (seek) seek.value = String(Math.round(p * 1000));
      if (time) time.textContent = fmt(dur > 0 && cur > 0 ? dur - cur : dur);
    }

    audioEl.addEventListener('timeupdate', update);
    audioEl.addEventListener('loadedmetadata', update);
    audioEl.addEventListener('play', () => {
      cardEl.classList.add('is-playing');
      screenEl.classList.add('is-playing');
      if (isSong) { isSongPlaying = true; updateMiniPlayer(); }
    });
    audioEl.addEventListener('pause', () => {
      cardEl.classList.remove('is-playing');
      screenEl.classList.remove('is-playing');
      if (isSong) { isSongPlaying = false; updateMiniPlayer(); }
    });
    audioEl.addEventListener('ended', () => {
      cardEl.classList.remove('is-playing');
      screenEl.classList.remove('is-playing');
      audioEl.currentTime = 0;
      update();
    });

    seek?.addEventListener('input', () => {
      if (audioEl.duration) {
        audioEl.currentTime = (Number(seek.value) / 1000) * audioEl.duration;
        update();
      }
    });

    btn?.addEventListener('click', () => {
      SND.wake();
      if (isSong && !songUrl) {
        if (SND.musicBox.playing) {
          SND.musicBox.stop();
          cardEl.classList.remove('is-playing');
          screenEl.classList.remove('is-playing');
          isSongPlaying = false;
        } else {
          SND.musicBox.start();
          cardEl.classList.add('is-playing');
          screenEl.classList.add('is-playing');
          isSongPlaying = true;
        }
        updateMiniPlayer();
        return;
      }

      if (audioEl.paused) {
        if (!isSong) SND.duck(true);
        audioEl.play().catch(() => {});
      } else {
        audioEl.pause();
        if (!isSong) SND.duck(false);
      }
    });
  }

  bindAudio(screens.voice, root.querySelector('.bp-voice'), voiceEl, false);
  bindAudio(screens.song, root.querySelector('.bp-song'), songEl, true);

  miniBtn?.addEventListener('click', () => {
    SND.wake();
    if (!songUrl) {
      if (SND.musicBox.playing) {
        SND.musicBox.stop();
        isSongPlaying = false;
      } else {
        SND.musicBox.start();
        isSongPlaying = true;
      }
      updateMiniPlayer();
      return;
    }
    if (songEl.paused) songEl.play().catch(() => {});
    else songEl.pause();
  });

  hooks.voice = {
    leave: () => {
      if (voiceEl && !voiceEl.paused) voiceEl.pause();
    }
  };
  hooks.song = { enter: updateMiniPlayer, leave: updateMiniPlayer };
  hooks.scrapbook = { enter: updateMiniPlayer };

  // Voice waveform tick
  const waveBars = root.querySelectorAll('.bp-wave i');
  tickHooks.push((dt, t) => {
    if (current === 'voice' && voiceEl && !voiceEl.paused) {
      waveBars.forEach((bar, i) => {
        const h = 0.2 + 0.72 * Math.abs(Math.sin(t * 6 + i * 0.7) * Math.sin(t * 2.3 + i));
        bar.style.transform = `scaleY(${h.toFixed(2)})`;
      });
    }
  });

  // 6. SCRAPBOOK FLIP & LIGHTBOX
  (() => {
    const s = screens.scrapbook;
    if (!s) return;
    const board = s.querySelector('.bp-board');
    const lb = root.querySelector('.bp-lightbox');
    const lbImg = lb?.querySelector('img');
    const lbCap = lb?.querySelector('.bp-lightbox__cap');
    const lbBack = lb?.querySelector('.bp-lightbox__back');
    const lbCount = lb?.querySelector('.bp-lightbox__count');
    let lbIndex = 0;

    function openLightbox(idx) {
      if (!lb) return;
      lbIndex = (idx + polaroids.length) % polaroids.length;
      const p = polaroids[lbIndex];
      if (lbImg) { lbImg.src = p.image; lbImg.alt = p.caption; }
      if (lbCap) lbCap.textContent = p.caption;
      if (lbBack) lbBack.textContent = p.note || '';
      if (lbCount) lbCount.textContent = `${lbIndex + 1} / ${polaroids.length}`;
      lb.hidden = false;
      sfx('soft');
    }

    board?.addEventListener('click', (e) => {
      const zoomBtn = e.target.closest('.bp-pola__zoom');
      const flipBtn = e.target.closest('.bp-pola__flip');
      const pola = e.target.closest('.bp-pola');
      if (!pola) return;

      const idx = Number(pola.getAttribute('data-i')) || 0;
      if (zoomBtn) {
        openLightbox(idx);
      } else if (flipBtn) {
        const flipped = pola.classList.toggle('is-flipped');
        flipBtn.setAttribute('aria-pressed', String(flipped));
        sfx('paper');
      }
    });

    lb?.querySelector('.bp-lightbox__close')?.addEventListener('click', () => { lb.hidden = true; });
    lb?.querySelector('.bp-lightbox__prev')?.addEventListener('click', () => openLightbox(lbIndex - 1));
    lb?.querySelector('.bp-lightbox__next')?.addEventListener('click', () => openLightbox(lbIndex + 1));

    s.querySelectorAll('.bp-note__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx('pop');
        const r = btn.getBoundingClientRect();
        burstHearts(r.left + r.width / 2, r.top + r.height / 2, 8, 0.8);
      });
    });
  })();

  // 7. FINALE CAKE & CANDLE BLOWING + TYPEWRITER TITLE
  (() => {
    const s = screens.finale;
    if (!s) return;
    const candles = s.querySelectorAll('.bp-candle');
    const doneText = s.querySelector('.bp-cake__done');
    const titleEl = s.querySelector('#bpFinaleTitle');
    const titleTyper = titleEl ? createTyper([titleEl], { seconds: 1.8 }) : null;
    let candlesOut = 0;

    function blowCandle(candle) {
      if (candle.classList.contains('is-out')) return;
      candle.classList.add('is-out');
      candlesOut++;
      sfx('puff');
      const r = candle.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + 10, 8, 0.85);

      if (candlesOut >= candles.length) {
        setTimeout(() => {
          if (doneText) doneText.textContent = 'Yay! Your wish is on its way ✨';
          sfx('fanfare');
          const cake = s.querySelector('.bp-cake')?.getBoundingClientRect();
          if (cake) confetti(cake.left + cake.width / 2, cake.top + cake.height * 0.3, 140);
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              firework(W * (0.2 + Math.random() * 0.6), H * (0.15 + Math.random() * 0.3));
            }, 300 + i * 450);
          }
        }, 380);
      }
    }

    candles.forEach(candle => {
      candle.addEventListener('click', () => blowCandle(candle));
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          blowCandle(candle);
        }
      });
    });

    s.querySelector('.bp-replay')?.addEventListener('click', () => {
      sfx('soft');
      candlesOut = 0;
      candles.forEach(c => c.classList.remove('is-out'));
      if (doneText) doneText.textContent = '';
      go('unlock');
    });

    hooks.finale = {
      enter: () => {
        updateMiniPlayer();
        titleTyper?.start();
      }
    };
  })();

  // Sound and Motion Toggles
  const sndBtn = root.querySelector('.bp-sound');
  const motBtn = root.querySelector('.bp-motion');

  sndBtn?.addEventListener('click', () => {
    SND.wake();
    SND.setMuted(!SND.muted);
    sndBtn.setAttribute('aria-pressed', String(!SND.muted));
    if (!SND.muted) sfx('soft');
  });

  motBtn?.addEventListener('click', () => {
    document.body.classList.toggle('bp--still');
    const isStill = document.body.classList.contains('bp--still');
    motBtn.setAttribute('aria-pressed', String(!isStill));
    threeLayer?.setStill(isStill);
  });

  // Start on initial screen
  go('unlock');

  // Cleanup
  container._cleanup = () => {
    isDestroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resizeCanvases);
    window.removeEventListener('resize', onResizeWaves);
    onKeyDownUnlock.forEach(fn => window.removeEventListener('keydown', fn));
    threeLayer?.dispose();
    document.body.classList.remove('bp', 'bp--still');
    document.body.removeAttribute('data-screen');
    if (voiceEl) voiceEl.pause();
    if (songEl) songEl.pause();
    SND.destroy();
  };
}
