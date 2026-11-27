// src/viewer/templates/blossomReelTemplate.js
// Dedicated 8-Stage Viral Reel "Blossom Romance" Interactive Experience
// Honors all Blossom editor fields: blossomPrompt, keypadTitle, passcode, introHeading/Lines,
// flamePrompt, cakeHeadline/Subtext, memoriesHeading/cards, lampPrompt, letterModal/Body.

import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { soundFx } from '../audioSynth.js';

const STYLE_ID = 'blossom-reel-scoped-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .br-stage {
      position: relative;
      width: 100%;
      min-height: 100dvh;
      overflow: hidden;
      background: radial-gradient(circle at 50% 25%, #fff1f5 0%, #fce7f3 52%, #ffe4e6 100%);
      color: #4a1530;
      font-family: 'Nunito', 'Inter', system-ui, sans-serif;
      transition: background 0.9s ease, color 0.9s ease;
    }
    .br-stage.is-twilight {
      background: radial-gradient(circle at 50% 22%, #241135 0%, #160a24 58%, #090412 100%);
      color: #fff1f7;
    }
    .br-petals {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .br-topbar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .br-topbar > * { pointer-events: auto; }
    .br-dots {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(244, 114, 182, 0.3);
      box-shadow: 0 6px 18px rgba(190, 24, 93, 0.12);
    }
    .br-stage.is-twilight .br-dots {
      background: rgba(24, 12, 38, 0.78);
      border-color: rgba(244, 114, 182, 0.35);
    }
    .br-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      border: none;
      padding: 0;
      background: rgba(219, 39, 119, 0.25);
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .br-dot.active {
      width: 22px;
      background: linear-gradient(90deg, #f472b6, #e11d48);
    }
    .br-scenes {
      position: relative;
      z-index: 10;
      width: 100%;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 68px 16px 28px;
      box-sizing: border-box;
    }
    .br-scene {
      display: none;
      width: 100%;
      max-width: 560px;
      text-align: center;
      margin: auto;
    }
    .br-scene.active { display: block; }
    .br-card {
      background: rgba(255, 255, 255, 0.84);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(244, 114, 182, 0.28);
      border-radius: 26px;
      padding: clamp(22px, 4vw, 32px);
      box-shadow: 0 18px 46px rgba(190, 24, 93, 0.14);
      position: relative;
      overflow: hidden;
    }
    .br-stage.is-twilight .br-card {
      background: rgba(28, 14, 44, 0.82);
      border-color: rgba(244, 114, 182, 0.32);
      color: #fff1f7;
    }
    .br-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 800;
      margin: 0 0 10px;
      line-height: 1.15;
    }
    .br-sub {
      font-size: 14.5px;
      opacity: 0.84;
      line-height: 1.6;
      margin: 0 0 18px;
    }
    .br-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 999px;
      border: none;
      background: linear-gradient(135deg, #f472b6, #e11d48);
      color: #fff;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(225, 29, 72, 0.28);
      transition: transform 0.16s ease;
    }
    .br-btn:hover { transform: translateY(-2px); }
    .br-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 999px;
      border: 1px solid rgba(219, 39, 119, 0.25);
      background: rgba(255, 255, 255, 0.55);
      color: inherit;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    .br-stage.is-twilight .br-btn-ghost {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.22);
    }
    .br-blossom-btn {
      width: 136px;
      height: 136px;
      margin: 8px auto 18px;
      border-radius: 50%;
      border: 3px solid rgba(244, 114, 182, 0.55);
      background: radial-gradient(circle at 35% 30%, #ffffff 0%, #fbcfe8 55%, #f472b6 100%);
      font-size: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 0 38px rgba(244, 114, 182, 0.5);
      animation: brPulse 2.4s ease-in-out infinite;
    }
    @keyframes brPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.07); }
    }
    .br-pin-dots {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 14px 0 18px;
    }
    .br-pin-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #e11d48;
      background: transparent;
      transition: background 0.15s ease, transform 0.15s ease;
    }
    .br-pin-dot.filled {
      background: #e11d48;
      transform: scale(1.15);
    }
    .br-keypad {
      display: grid;
      grid-template-columns: repeat(3, 66px);
      gap: 10px;
      justify-content: center;
      margin: 0 auto;
    }
    .br-key {
      height: 54px;
      border-radius: 16px;
      border: 1px solid rgba(225, 29, 72, 0.22);
      background: rgba(255, 241, 245, 0.9);
      color: #831843;
      font-size: 19px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.1s ease, background 0.15s ease;
    }
    .br-key:active { transform: scale(0.94); background: #fbcfe8; }
    .br-cake {
      position: relative;
      width: 190px;
      margin: 22px auto 16px;
      cursor: pointer;
    }
    .br-candles {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: -4px;
      position: relative;
      z-index: 2;
    }
    .br-candle {
      width: 10px;
      height: 34px;
      border-radius: 4px;
      background: repeating-linear-gradient(45deg, #fff, #fff 4px, #f472b6 4px, #f472b6 8px);
      position: relative;
    }
    .br-flame {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 16px;
      border-radius: 50% 50% 50% 50% / 65% 65% 35% 35%;
      background: radial-gradient(circle at 50% 70%, #fffbeb 0%, #fbbf24 55%, #f97316 100%);
      box-shadow: 0 0 12px #fbbf24;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .br-flame.out { opacity: 0; transform: translateX(-50%) scale(0); }
    .br-cake-top {
      height: 44px;
      width: 140px;
      margin: 0 auto;
      border-radius: 16px 16px 6px 6px;
      background: linear-gradient(180deg, #fff1f5 0%, #fbcfe8 100%);
      border-bottom: 5px solid #f472b6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .br-cake-base {
      height: 54px;
      width: 184px;
      margin: 0 auto;
      border-radius: 12px 12px 18px 18px;
      background: linear-gradient(180deg, #f9a8d4 0%, #ec4899 100%);
      box-shadow: 0 10px 24px rgba(190, 24, 93, 0.25);
    }
    .br-deck {
      position: relative;
      height: 290px;
      width: min(260px, 100%);
      margin: 12px auto 16px;
      cursor: pointer;
    }
    .br-swipe-card {
      position: absolute;
      inset: 0;
      border-radius: 18px;
      background: #fff;
      padding: 10px 10px 14px;
      box-shadow: 0 14px 30px rgba(80, 20, 50, 0.2);
      display: flex;
      flex-direction: column;
      transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.35s ease;
      color: #4a1530;
    }
    .br-swipe-card img {
      width: 100%;
      height: 210px;
      object-fit: cover;
      border-radius: 12px;
    }
    .br-lamp-cord {
      width: 4px;
      height: 92px;
      margin: 0 auto;
      background: linear-gradient(180deg, #d97706, #fbbf24);
      border-radius: 4px;
      cursor: grab;
      position: relative;
      transition: height 0.2s ease;
    }
    .br-lamp-knob {
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fbbf24;
      box-shadow: 0 0 16px rgba(251, 191, 36, 0.75);
    }
    .br-letter-paper {
      text-align: left;
      background: #fffaf0;
      color: #3f1d2b;
      border-radius: 16px;
      padding: 18px;
      border: 1px solid #f3d6c6;
      max-height: 260px;
      overflow-y: auto;
      line-height: 1.7;
      font-size: 14px;
      white-space: pre-wrap;
    }
    .br-nav-row {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
  `;
  document.head.appendChild(style);
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderBlossomReelTemplate(container, data = {}, isMakerReview = false) {
  ensureStyles();

  const recipient = data.recipientName || 'my gurll';
  const sender = data.senderName || 'Yours';
  const passcode = String(data.passcode || '1234').slice(0, 4).padEnd(4, '0');
  const blossomPrompt = data.blossomPrompt || 'Touch the blossom';
  const keypadTitle = data.keypadTitle || 'For you, my love';
  const keypadSubtitle = data.keypadSubtitle || 'Enter your 4-digit secret code';
  const introHeading = data.introHeading || `Hey ${recipient},`;
  const introLine1 = data.introLine1 || "I know this isn't a normal birthday gift...";
  const introLine2 = data.introLine2 || 'But I made this just for you.';
  const flamePrompt = data.flamePrompt || 'Touch the flame to light';
  const cakeHeadline = data.cakeHeadline || `Happy Birthday, ${recipient}!`;
  const cakeSubtext = data.cakeSubtext || 'Make a wish and tap the candles 🎂';
  const memoriesHeading = data.memoriesHeading || 'BEAUTIFUL MEMORIES';
  const memoriesSubtitle = data.memoriesSubtitle || 'Tap or swipe through the cards ✨';
  const lampPrompt = data.lampPrompt || 'PULL THE CORD TO SWITCH TO TWILIGHT';
  const letterPrompt = data.letterPrompt || 'A Letter, Just For You';
  const letterModalTitle = data.letterModalTitle || 'Happy Birthday ✨';
  const letterBody = data.letterBody || `Happiest birthday ${recipient}!\n\nThank you for bringing endless warmth, laughter, and magic into my world.\n\nAlways yours,\n${sender}`;

  const cards = (Array.isArray(data.cards) && data.cards.length > 0)
    ? data.cards
    : [
        { image: '/images/blossom/memory_1.jpg', caption: 'Sweet moments with you' },
        { image: '/images/blossom/memory_2.jpg', caption: 'Adventures together' },
        { image: '/images/blossom/memory_3.jpg', caption: 'Warmth & laughter' },
      ];

  const isBypassPin = Boolean(isMakerReview || window.isCelebrationEditorMode || container.closest('#previewContainer'));

  container.innerHTML = `
    <div class="br-stage" id="brStage" data-prevent-swipe="true">
      <canvas class="br-petals" id="brPetals"></canvas>

      <header class="br-topbar">
        <div class="br-dots" id="brDots">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<button type="button" class="br-dot ${n === 1 ? 'active' : ''}" data-go="${n}" aria-label="Scene ${n}"></button>`).join('')}
        </div>
        <div id="brMusicMount"></div>
      </header>

      <div class="br-scenes">
        <!-- Scene 1: Blossom Opener -->
        <section class="br-scene active" data-scene="1">
          <div class="br-card">
            <button type="button" class="br-blossom-btn" id="brBlossomBtn" aria-label="Touch the blossom">🌸</button>
            <h1 class="br-title">${esc(blossomPrompt)}</h1>
            <p class="br-sub">Made specially for <strong>${esc(recipient)}</strong></p>
            <button type="button" class="br-btn" data-go="2">Unfold Surprise ✨</button>
          </div>
        </section>

        <!-- Scene 2: Passcode Keypad -->
        <section class="br-scene" data-scene="2">
          <div class="br-card">
            <h2 class="br-title">${esc(keypadTitle)}</h2>
            <p class="br-sub" id="brPinStatus">${esc(keypadSubtitle)}${isBypassPin ? ` (Code: ${esc(passcode)})` : ''}</p>
            <div class="br-pin-dots" id="brPinDots">
              <span class="br-pin-dot"></span><span class="br-pin-dot"></span><span class="br-pin-dot"></span><span class="br-pin-dot"></span>
            </div>
            <div class="br-keypad" id="brKeypad">
              ${['1','2','3','4','5','6','7','8','9','⌫','0','✓'].map((k) => `<button type="button" class="br-key" data-key="${k}">${k}</button>`).join('')}
            </div>
            ${isBypassPin ? `<div class="br-nav-row"><button type="button" class="br-btn-ghost" data-go="3">Skip PIN (Preview) →</button></div>` : ''}
          </div>
        </section>

        <!-- Scene 3: Opening Note -->
        <section class="br-scene" data-scene="3">
          <div class="br-card">
            <div style="font-size:40px;margin-bottom:8px;">💌</div>
            <h2 class="br-title">${esc(introHeading)}</h2>
            <p class="br-sub" style="font-size:16px;font-weight:700;margin-bottom:6px;">${esc(introLine1)}</p>
            <p class="br-sub">${esc(introLine2)}</p>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="2">← Back</button>
              <button type="button" class="br-btn" data-go="4">Continue 🌸</button>
            </div>
          </div>
        </section>

        <!-- Scene 4: Touch Flame -->
        <section class="br-scene" data-scene="4">
          <div class="br-card">
            <button type="button" class="br-blossom-btn" id="brFlameBtn" style="background:radial-gradient(circle at 40% 35%,#fef3c7,#fb923c,#e11d48);">🔥</button>
            <h2 class="br-title">${esc(flamePrompt)}</h2>
            <p class="br-sub">Tap the spark to ignite the birthday candles</p>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="3">← Back</button>
            </div>
          </div>
        </section>

        <!-- Scene 5: Strawberry Cake -->
        <section class="br-scene" data-scene="5">
          <div class="br-card">
            <h2 class="br-title">${esc(cakeHeadline)}</h2>
            <p class="br-sub" id="brCakeHint">${esc(cakeSubtext)}</p>
            <div class="br-cake" id="brCake">
              <div class="br-candles">
                <div class="br-candle"><span class="br-flame"></span></div>
                <div class="br-candle"><span class="br-flame"></span></div>
                <div class="br-candle"><span class="br-flame"></span></div>
              </div>
              <div class="br-cake-top">🍓 ✨ 🍓</div>
              <div class="br-cake-base"></div>
            </div>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="4">← Back</button>
              <button type="button" class="br-btn" data-go="6">See Memories 📸</button>
            </div>
          </div>
        </section>

        <!-- Scene 6: 3D Swipe Memory Cards -->
        <section class="br-scene" data-scene="6">
          <div class="br-card">
            <div style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:#e11d48;margin-bottom:4px;">${esc(memoriesHeading)}</div>
            <p class="br-sub" style="margin-bottom:8px;">${esc(memoriesSubtitle)}</p>
            <div class="br-deck" id="brDeck">
              ${cards.map((c, idx) => `
                <div class="br-swipe-card" data-idx="${idx}" style="z-index:${cards.length - idx};transform:rotate(${(idx % 2 === 0 ? -1 : 1) * (idx * 2)}deg) translateY(${idx * 4}px);">
                  <img src="${esc(c.image || '/images/sunset.jpg')}" alt="${esc(c.caption || '')}" onerror="this.src='/images/sunset.jpg'" />
                  <div style="margin-top:10px;font-weight:800;font-size:14px;">${esc(c.caption || '')}</div>
                </div>
              `).join('')}
            </div>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="5">← Back</button>
              <button type="button" class="br-btn" id="brNextCardBtn">Next Card ↻</button>
              <button type="button" class="br-btn" data-go="7">Twilight Lamp 💡</button>
            </div>
          </div>
        </section>

        <!-- Scene 7: Hanging Pull Lamp -->
        <section class="br-scene" data-scene="7">
          <div class="br-card">
            <div style="font-size:42px;">🏮</div>
            <div class="br-lamp-cord" id="brLampCord" role="button" tabindex="0" title="Pull cord">
              <span class="br-lamp-knob"></span>
            </div>
            <h2 class="br-title" style="margin-top:26px;">${esc(lampPrompt)}</h2>
            <p class="br-sub">Tap or pull the golden cord to shift into twilight mood</p>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="6">← Back</button>
              <button type="button" class="br-btn" data-go="8">Unseal Final Letter 💌</button>
            </div>
          </div>
        </section>

        <!-- Scene 8: Wax-Sealed Letter -->
        <section class="br-scene" data-scene="8">
          <div class="br-card">
            <div style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:#f472b6;margin-bottom:4px;">${esc(letterPrompt)}</div>
            <h2 class="br-title">${esc(letterModalTitle)}</h2>
            <div class="br-letter-paper" id="brLetterPaper"></div>
            <div style="margin-top:12px;font-size:13px;font-weight:800;">With all my love, ${esc(sender)} ♡</div>
            <div class="br-nav-row">
              <button type="button" class="br-btn-ghost" data-go="7">← Back</button>
              <button type="button" class="br-btn" data-go="1">Replay Story ↺</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  const stage = container.querySelector('#brStage');
  const scenes = Array.from(container.querySelectorAll('.br-scene'));
  const dots = Array.from(container.querySelectorAll('.br-dot'));
  let current = 1;
  let typeTimer = null;

  initMusicPlayer(container.querySelector('#brMusicMount'), {
    src: data.audioSrc || '/audio/alfaaz.mp3',
    title: data.audioTitle || 'Alfaaz - Hamza Malik & Zain Zohaib',
    subtitle: data.audioSubtitle || 'BLOSSOM LOVE',
  });

  function startLetterTypewriter() {
    clearInterval(typeTimer);
    const box = container.querySelector('#brLetterPaper');
    if (!box) return;
    box.textContent = '';
    let i = 0;
    typeTimer = setInterval(() => {
      i += 2;
      box.textContent = letterBody.slice(0, i);
      if (i >= letterBody.length) clearInterval(typeTimer);
    }, 24);
  }

  function goToScene(num) {
    const next = Math.max(1, Math.min(8, Number(num)));
    if (next === current) return;
    const prevEl = scenes[current - 1];
    const nextEl = scenes[next - 1];
    current = next;
    dots.forEach((d, idx) => d.classList.toggle('active', idx + 1 === next));

    gsap.to(prevEl, {
      opacity: 0,
      y: -12,
      duration: 0.22,
      onComplete: () => {
        prevEl.classList.remove('active');
        prevEl.style.display = 'none';
        nextEl.style.display = 'block';
        nextEl.classList.add('active');
        gsap.fromTo(nextEl, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      },
    });

    if (next === 8) startLetterTypewriter();
  }

  container.querySelectorAll('[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => {
      soundFx.pop(660);
      goToScene(btn.getAttribute('data-go'));
    });
  });

  container.querySelector('#brBlossomBtn')?.addEventListener('click', () => {
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.5 }, colors: ['#f472b6', '#fbcfe8', '#fbbf24'] });
    goToScene(2);
  });

  // Passcode keypad
  let entered = '';
  const pinDots = Array.from(container.querySelectorAll('.br-pin-dot'));
  const pinStatus = container.querySelector('#brPinStatus');
  function refreshPinDots() {
    pinDots.forEach((d, idx) => d.classList.toggle('filled', idx < entered.length));
  }
  container.querySelectorAll('.br-key').forEach((kBtn) => {
    kBtn.addEventListener('click', () => {
      const val = kBtn.getAttribute('data-key');
      soundFx.pop(740);
      if (val === '⌫') {
        entered = entered.slice(0, -1);
      } else if (val === '✓') {
        if (entered === passcode) {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
          goToScene(3);
        } else {
          if (pinStatus) pinStatus.textContent = 'Wrong code — try again!';
          entered = '';
        }
      } else if (entered.length < 4) {
        entered += val;
        if (entered.length === 4) {
          if (entered === passcode) {
            setTimeout(() => goToScene(3), 180);
          } else {
            if (pinStatus) pinStatus.textContent = 'Wrong code — try again!';
            setTimeout(() => { entered = ''; refreshPinDots(); }, 300);
          }
        }
      }
      refreshPinDots();
    });
  });

  // Flame ignite
  container.querySelector('#brFlameBtn')?.addEventListener('click', () => {
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.55 }, colors: ['#fb923c', '#fbbf24', '#f43f5e'] });
    goToScene(5);
  });

  // Cake candles
  let cakeBlown = false;
  container.querySelector('#brCake')?.addEventListener('click', () => {
    if (cakeBlown) return;
    cakeBlown = true;
    container.querySelectorAll('.br-flame').forEach((f) => f.classList.add('out'));
    const hint = container.querySelector('#brCakeHint');
    if (hint) hint.textContent = '🎉 Wish made! May every dream bloom!';
    confetti({ particleCount: 90, spread: 85, origin: { y: 0.55 } });
  });

  // Swipe cards cycle
  let deckIndex = 0;
  const deckCards = Array.from(container.querySelectorAll('.br-swipe-card'));
  function cycleDeck() {
    if (deckCards.length <= 1) return;
    const top = deckCards[deckIndex % deckCards.length];
    top.style.transform = 'translateX(115%) rotate(14deg)';
    top.style.opacity = '0';
    setTimeout(() => {
      deckIndex++;
      deckCards.forEach((c, idx) => {
        const order = (idx - (deckIndex % deckCards.length) + deckCards.length) % deckCards.length;
        c.style.zIndex = String(deckCards.length - order);
        c.style.opacity = '1';
        c.style.transform = `rotate(${(order % 2 === 0 ? -1 : 1) * (order * 2)}deg) translateY(${order * 4}px)`;
      });
    }, 320);
  }
  container.querySelector('#brDeck')?.addEventListener('click', cycleDeck);
  container.querySelector('#brNextCardBtn')?.addEventListener('click', cycleDeck);

  // Pull lamp toggle
  const cord = container.querySelector('#brLampCord');
  cord?.addEventListener('click', () => {
    cord.style.height = '122px';
    setTimeout(() => { cord.style.height = '92px'; }, 220);
    stage.classList.toggle('is-twilight');
    soundFx.pop(520);
  });

  // Floating petal canvas
  const canvas = container.querySelector('#brPetals');
  let rafId = null;
  let onResize = null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = stage.clientWidth || window.innerWidth);
    let h = (canvas.height = stage.clientHeight || window.innerHeight);
    onResize = () => {
      w = canvas.width = stage.clientWidth || window.innerWidth;
      h = canvas.height = stage.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const petals = Array.from({ length: 24 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 4 + Math.random() * 6,
      vy: 0.45 + Math.random() * 0.85,
      vx: -0.3 + Math.random() * 0.6,
      rot: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.015) * 0.35;
        p.rot += 0.015;
        if (p.y > h + 15) { p.y = -15; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = stage.classList.contains('is-twilight') ? 'rgba(244,114,182,0.55)' : 'rgba(244,114,182,0.42)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.58, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };
    tick();
  }

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(typeTimer);
    if (onResize) window.removeEventListener('resize', onResize);
  };
}
