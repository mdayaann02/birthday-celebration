// src/viewer/templates/paigaamTemplate.js - Authentic Birthday Paigaam Experience
// Exact faithful recreation of paigaam.cc/birthday-paigaam:
// 1. Passcode Cameo Unlock
// 2. Interactive Mascot Question ("Wanna see it?" with dodging NO button)
// 3. Wax-sealed 3D Unfolding Love Letter with Typewriter Reveal
// 4. Nostalgic Cassette Tape Voice Note with Live Waveform
// 5. Retro Turntable Vinyl Song Player (with built-in sweet music-box synth)
// 6. Vintage Spiral Scrapbook (Flipping Polaroids, Lightbox Zoom, Drag-rearrange, Love Notes, Reasons Checklist)
// 7. Grand Finale Birthday Cake with Blowable Candles, Helium Balloons, Confetti & Fireworks!

import './paigaam.css';
import { createPaigaamSound } from './paigaamSound.js';

export function renderPaigaamTemplate(container, data = {}, isMakerReview = false) {
  // Teardown previous instance if any
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }

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

  const letterTitle = data.letterTitle || `for ${recipientName}`;
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

  // Apply theme swatches if provided
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

  const SND = createPaigaamSound();
  const sfx = (name, arg) => {
    try { SND.sfx[name](arg); } catch (e) {}
  };

  // Render HTML stage
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
                          <circle cx="100" cy="100" r="74" fill="none" stroke="#C9A24A" stroke-width=".8" stroke-dasharray="2 5"/>
                          <path fill="none" stroke="#C9A24A" stroke-width="1.3" d="M12 21.2s-7.6-4.6-10-9.4C0.3 8.2 2.2 3.8 6.4 3.8c2.5 0 4.1 1.4 5.6 3.4 1.5-2 3.1-3.4 5.6-3.4 4.2 0 6.1 4.4 4.4 8-2.4 4.8-10 9.4-10 9.4z" transform="translate(88 52)"/>
                        </svg>
                        <span class="bp-frame__invite">your photo<br>here</span>
                      </span>
                    `}
                  </div>
                  <svg class="bp-cameo" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
                    <circle cx="160" cy="160" r="148" fill="none" stroke="#C9A24A" stroke-width="6"/>
                    <circle cx="160" cy="160" r="138" fill="none" stroke="#E9D08C" stroke-width="2" stroke-dasharray="3 4"/>
                  </svg>
                  <span class="bp-frame__glint" aria-hidden="true"></span>
                </div>
                <span class="bp-deco bp-deco--s1">✦</span>
                <span class="bp-deco bp-deco--s3">✦</span>
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
              <p class="bp-hint"><span>${passcodeHint}</span></p>
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
                      <ellipse cx="88" cy="40" rx="14" ry="38" fill="#FFFBF0" stroke="#5B2A3C" stroke-width="3" transform="rotate(-14 88 40)"/>
                      <ellipse cx="88" cy="42" rx="7" ry="24" fill="#F9C6D4" transform="rotate(-14 88 42)"/>
                      <ellipse cx="148" cy="40" rx="14" ry="38" fill="#FFFBF0" stroke="#5B2A3C" stroke-width="3" transform="rotate(14 148 40)"/>
                      <ellipse cx="148" cy="42" rx="7" ry="24" fill="#F9C6D4" transform="rotate(14 148 42)"/>
                    </g>
                    <ellipse cx="118" cy="100" rx="52" ry="44" fill="#FFFBF0" stroke="#5B2A3C" stroke-width="3.5"/>
                    <circle cx="98" cy="94" r="5" fill="#5B2A3C"/>
                    <circle cx="138" cy="94" r="5" fill="#5B2A3C"/>
                    <ellipse cx="118" cy="105" rx="5" ry="3.5" fill="#EE9DB4"/>
                    <ellipse cx="82" cy="104" rx="8" ry="4" fill="#F9C6D4" opacity=".8"/>
                    <ellipse cx="154" cy="104" rx="8" ry="4" fill="#F9C6D4" opacity=".8"/>
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
              <p class="bp-book__tip">tap a photo to flip it · hold & drag to rearrange · <span aria-hidden="true">🔍</span> to zoom & swipe</p>
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
                <ellipse class="f-cream s-ink" stroke-width="3" cx="150" cy="262" rx="136" ry="18"/>
                <rect class="f-blush s-ink" stroke-width="3" x="36" y="176" width="228" height="84" rx="18"/>
                <rect class="f-lav s-ink" stroke-width="3" x="78" y="108" width="144" height="72" rx="16"/>
                ${[0, 1, 2, 3, 4].map(idx => {
                  const candleX = [98, 124, 150, 176, 202][idx];
                  return `
                    <g class="bp-candle" data-candle="${idx}" role="button" tabindex="0" aria-label="Blow out candle ${idx + 1}">
                      <rect x="${candleX - 15}" y="20" width="30" height="92" fill="transparent"/>
                      <rect class="f-cream s-ink" stroke-width="2.2" x="${candleX - 5.5}" y="70" width="11" height="40" rx="3"/>
                      <path class="s-ink" stroke-width="2" stroke-linecap="round" d="M${candleX} 70 v-6"/>
                      <g class="bp-flame" style="transform-origin:${candleX}px 62px">
                        <circle cx="${candleX}" cy="50" r="17" fill="#FFE7A8"/>
                        <path fill="#FFC861" d="M${candleX} 34 C${candleX + 8} 44 ${candleX + 9} 52 ${candleX + 6} 58 C${candleX + 4} 63 ${candleX - 4} 63 ${candleX - 6} 58 C${candleX - 9} 52 ${candleX - 6} 44 ${candleX} 34Z"/>
                      </g>
                      <g class="bp-smoke" fill="#B9A9C9">
                        <circle cx="${candleX}" cy="56" r="4"/><circle cx="${candleX + 4}" cy="46" r="5"/><circle cx="${candleX - 2}" cy="34" r="6"/>
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

  // Selectors
  const root = container.querySelector('.bp-experience-wrap');
  const screens = {};
  root.querySelectorAll('.bp-screen').forEach(s => {
    screens[s.getAttribute('data-screen')] = s;
  });
  const ORDER = ['unlock', 'question', 'letter', 'voice', 'song', 'scrapbook', 'finale'];
  let current = 'unlock';
  const hooks = {};
  const tickHooks = [];
  let isDestroyed = false;

  // Background canvases
  const amb = root.querySelector('.bp-ambient');
  const fxc = root.querySelector('.bp-fx');
  const actx = amb ? amb.getContext('2d') : null;
  const fctx = fxc ? fxc.getContext('2d') : null;
  let W = window.innerWidth, H = window.innerHeight;

  function resizeCanvases() {
    W = window.innerWidth;
    H = window.innerHeight;
    if (amb) { amb.width = W; amb.height = H; }
    if (fxc) { fxc.width = W; fxc.height = H; }
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  // FX particles engine
  let particles = [];
  function burstHearts(x, y, count = 16, power = 1.2) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = (2 + Math.random() * 4) * power;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 14 + Math.random() * 8,
        color: [accent, blush, lavender, peach][i % 4],
        alpha: 1,
        life: 0.9 + Math.random() * 0.4
      });
    }
  }

  function confetti(x, y, count = 80) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 12 - 2,
        size: 6 + Math.random() * 6,
        color: [accent, '#FFC107', blush, lavender, '#4CAF50', '#2196F3'][i % 6],
        alpha: 1,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        life: 1.2 + Math.random() * 0.8
      });
    }
  }

  function firework(x, y) {
    sfx('firework');
    burstHearts(x, y, 22, 1.8);
    confetti(x, y, 40);
  }

  // Animation RAF loop
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
        p.vy += 9.8 * dt * 0.8; // gravity
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

    // Call tick hooks
    tickHooks.forEach(hook => {
      try { hook(dt, nowTime / 1000); } catch (e) {}
    });

    rafId = requestAnimationFrame(animLoop);
  }
  rafId = requestAnimationFrame(animLoop);

  // Wavy borders generator
  function wavePath(w, h, r) {
    const s = r * 2;
    let d = '';
    function edge(len, dx, dy) {
      const n = Math.max(2, Math.round(len / s)), step = len / n;
      let seg = '';
      for (let i = 0; i < n; i++) {
        seg += ` a${(step / 2).toFixed(2)} ${(step / 2).toFixed(2)} 0 0 1 ${(dx * step).toFixed(2)} ${(dy * step).toFixed(2)}`;
      }
      return seg;
    }
    d = `M${r} ${r}${edge(w - 2 * r, 1, 0)}${edge(h - 2 * r, 0, 1)}${edge(w - 2 * r, -1, 0)}${edge(h - 2 * r, 0, -1)}Z`;
    return d;
  }

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
      const w = card.offsetWidth, h = card.offsetHeight;
      if (!w || !h) return;
      const r = w < 340 ? 8 : 10;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      fill.setAttribute('d', wavePath(w, h, r));
    }
    draw();
    setTimeout(draw, 100);
    window.addEventListener('resize', draw);
  });

  // Screen Navigation & Progress
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
    const prev = screens[current];
    const next = screens[name];
    if (hooks[current]?.leave) hooks[current].leave();
    if (prev) prev.classList.remove('is-active');
    next.classList.add('is-active');
    current = name;
    document.body.setAttribute('data-screen', name);
    setProgress(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // 1. UNLOCK LOGIC
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
      busy = true;
      boxesWrap?.classList.add('is-right');
      if (msg) msg.textContent = 'Yay! Unlocked 💖';
      const r = boxesWrap.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height / 2, 26, 1.6);
      sfx('unlock');
      setTimeout(nextScreen, 1000);
    }

    function check() {
      if (busy) return;
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
        if (hint && tries >= 2) hint.style.opacity = '1';
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

    const bypassBtn = container.querySelector('#btnBypassUnlock');
    if (bypassBtn) {
      bypassBtn.addEventListener('click', unlockSuccess);
    }
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
      yes.style.transform = `scale(${Math.min(1 + noCount * 0.22, 2.2)})`;
      no.style.transform = `scale(${Math.max(0.65, 1 - noCount * 0.08)})`;
    }

    function sayYes() {
      if (done) return;
      done = true;
      SND.wake();
      sfx('yes');
      if (nudge) nudge.textContent = 'Yay! I knew it 💕';
      const r = yes.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 100);
      burstHearts(r.left + r.width / 2, r.top, 16, 1.4);
      setTimeout(nextScreen, 1500);
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
  })();

  // 3. LETTER TYPEWRITER & ENVELOPE
  (() => {
    const s = screens.letter;
    if (!s) return;
    const env = s.querySelector('.bp-env');
    const letter = s.querySelector('.bp-letter');
    const reread = s.querySelector('.bp-reread');
    let running = false;

    function openEnvelope() {
      if (running) return;
      running = true;
      SND.wake();
      env.classList.add('is-cracked');
      sfx('crack');
      const r = env.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height * 0.6, 14, 1.1);

      setTimeout(() => { env.classList.add('is-open'); sfx('paper'); }, 400);
      setTimeout(() => { env.classList.add('is-rising'); }, 1100);
      setTimeout(() => { env.classList.add('is-away'); }, 2000);
      setTimeout(() => { s.classList.add('is-reading'); sfx('paper'); }, 2500);
    }

    env?.addEventListener('click', openEnvelope);
    reread?.addEventListener('click', () => {
      running = false;
      env.classList.remove('is-cracked', 'is-open', 'is-rising', 'is-away');
      s.classList.remove('is-reading');
      setTimeout(openEnvelope, 300);
    });
  })();

  // 4. VOICE NOTE & 5. OUR SONG PLAYERS
  const voiceEl = root.querySelector('.bp-audio-voice');
  const songEl = root.querySelector('.bp-audio-song');

  function bindAudio(screenEl, audioEl, isSong = false) {
    if (!screenEl || !audioEl) return;
    const btn = screenEl.querySelector('.bp-play');
    const seek = screenEl.querySelector('.bp-seek');
    const fill = screenEl.querySelector('.bp-track__fill');
    const time = screenEl.querySelector('.bp-time');

    function fmt(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function update() {
      const dur = audioEl.duration || 0;
      const cur = audioEl.currentTime || 0;
      const p = dur ? cur / dur : 0;
      if (fill) fill.style.width = `${p * 100}%`;
      if (seek) seek.value = Math.round(p * 1000);
      if (time) time.textContent = fmt(dur > 0 && cur > 0 ? dur - cur : dur);
    }

    audioEl.addEventListener('timeupdate', update);
    audioEl.addEventListener('loadedmetadata', update);
    audioEl.addEventListener('play', () => screenEl.classList.add('is-playing'));
    audioEl.addEventListener('pause', () => screenEl.classList.remove('is-playing'));
    audioEl.addEventListener('ended', () => {
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
        // Fallback music box
        if (SND.musicBox.playing) {
          SND.musicBox.stop();
          screenEl.classList.remove('is-playing');
        } else {
          SND.musicBox.start();
          screenEl.classList.add('is-playing');
        }
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

  bindAudio(screens.voice, voiceEl, false);
  bindAudio(screens.song, songEl, true);

  // Cassette spools & waveform visualizer tick hook
  const waveBars = root.querySelectorAll('.bp-wave i');
  tickHooks.push((dt, t) => {
    if (current === 'voice' && voiceEl && !voiceEl.paused) {
      waveBars.forEach((bar, i) => {
        const h = 0.2 + 0.7 * Math.abs(Math.sin(t * 6 + i * 0.7) * Math.sin(t * 2.3 + i));
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
        pola.classList.toggle('is-flipped');
        sfx('paper');
      }
    });

    lb?.querySelector('.bp-lightbox__close')?.addEventListener('click', () => { lb.hidden = true; });
    lb?.querySelector('.bp-lightbox__prev')?.addEventListener('click', () => openLightbox(lbIndex - 1));
    lb?.querySelector('.bp-lightbox__next')?.addEventListener('click', () => openLightbox(lbIndex + 1));

    // Sticky love notes pop
    s.querySelectorAll('.bp-note__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx('pop');
        const r = btn.getBoundingClientRect();
        burstHearts(r.left + r.width / 2, r.top + r.height / 2, 6, 0.7);
      });
    });
  })();

  // 7. FINALE CAKE & CANDLE BLOWING
  (() => {
    const s = screens.finale;
    if (!s) return;
    const candles = s.querySelectorAll('.bp-candle');
    const doneText = s.querySelector('.bp-cake__done');
    let candlesOut = 0;

    function blowCandle(candle) {
      if (candle.classList.contains('is-out')) return;
      candle.classList.add('is-out');
      candlesOut++;
      sfx('puff');
      const r = candle.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + 10, 6, 0.8);

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
        }, 400);
      }
    }

    candles.forEach(candle => {
      candle.addEventListener('click', () => blowCandle(candle));
    });

    s.querySelector('.bp-replay')?.addEventListener('click', () => {
      sfx('soft');
      candlesOut = 0;
      candles.forEach(c => c.classList.remove('is-out'));
      if (doneText) doneText.textContent = '';
      go('unlock');
    });
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
  });

  // Start on initial screen
  go('unlock');

  // Teardown function
  container._cleanup = () => {
    isDestroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resizeCanvases);
    document.body.classList.remove('bp', 'bp--still');
    if (voiceEl) voiceEl.pause();
    if (songEl) songEl.pause();
    SND.destroy();
  };
}
