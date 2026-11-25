// src/viewer/templates/bloomRevealTemplate.js - 100% Faithful Recreation of bloom-reveal-surprise.lovable.app
// Features exact layout, timings, 88-flower spiral swarm, parting curtain,
// 10 reasons accordion, 10 tilted polaroids on #DDB8DD, 260vh sticky scroll-illuminated love letter,
// Spotify embeds, and typewriter finale with "Go to the start" return FAB.

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
  const reasons = (data.reasonsList && data.reasonsList.length > 0) ? data.reasonsList : [
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

  const polaroids = (data.polaroids && data.polaroids.length > 0)
    ? data.polaroids.map((p, idx) => typeof p === 'string' ? p : (p.image || POLAROID_IMAGES[idx % POLAROID_IMAGES.length]))
    : POLAROID_IMAGES;

  const letterText = data.letterText || "My Dearest, I am writing this because words sometimes catch in my throat when I look at you, overwhelmed by how much you mean to me. Please keep this little note as a token of my heart—a small reminder of a love that belongs entirely to you, even when we are apart. Lately, the distance between us feels a little heavier, and I find myself yearning for you in the quietest moments of the day. I miss the simple warmth of your hand in mine, the soft sound of your laughter, and the way the world just makes sense whenever you are near. You are my peace, my constant joy, and the brightest part of my life. No matter where we are or how long the days feel before I can hold you again, please never forget how deeply, truly, and completely you are loved. You have my whole heart, today and for all the days to come. Forever and always yours, With all my love";

  const spotifyTracks = (data.spotifyTracks && data.spotifyTracks.length > 0) ? data.spotifyTracks : [
    "6Qyc6fS4DsZjB2mRW9DsQs",
    "7sapKrjDij2fpDVj0GxP66",
    "3vsNteZn6E5qBSSBO78W7b",
    "1EzrEOXmMH3G43AXT1y7pA",
    "1JSTJqkT5qHq8MDJnJbRE1"
  ];

  const endingQuote = data.endingQuote || "I love you, to the moon and back.";

  // Mathematical Swarm Generator (Pd = 11 cols, Fd = 8 rows, Md = 4200ms, Nd = 2600ms)
  const Pd = 11, Fd = 8, Id = 100 / Pd, Ld = 100 / Fd, Rd = 22;
  const Md = 4200, Nd = 2600;

  function buildSwarm() {
    const list = [];
    for (let t = -1; t <= Fd; t++) {
      for (let n = -1; n <= Pd; n++) {
        const r = (t + 2) * 131 + (n + 2) * 17;
        const i = ((r * 9301 + 49297) % 233280) / 233280 - 0.5;
        const a = ((r * 4801 + 9973) % 233280) / 233280 - 0.5;
        const o = (n + 0.5) * Id + i * Id * 0.6;
        const s = (t + 0.5) * Ld + a * Ld * 0.6;
        const c = o - 50;
        const l = s - 50;
        const u = Math.max(0, 1 - Math.hypot(c, l) / 90) * (Md - 1100);
        list.push({
          x: o,
          y: s,
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

  const swarm = buildSwarm();
  const leftFlowers = swarm.filter(f => f.x < 50);
  const rightFlowers = swarm.filter(f => f.x >= 50);

  const words = letterText.trim().split(/\s+/);

  // In editor mode inside the studio chassis, creators can click a discreet test button
  const isEditorMode = Boolean(window.isCelebrationEditorMode);

  container.innerHTML = `
    <div id="bloomContainer" class="relative min-h-screen w-full overflow-hidden" style="background-color: #EDD9ED; font-family: 'Dancing Script', cursive; overflow-x: clip;">
      
      <!-- Editor Mode Subtle Action Pill (Only in Studio Workspace) -->
      ${isEditorMode ? `
        <div style="position: fixed; top: 14px; right: 14px; z-index: 1000; display: flex; gap: 8px;">
          <button type="button" id="bloomEditorBypassBtn" style="background: rgba(54, 15, 90, 0.85); color: #fff; border: 1px solid rgba(255,255,255,0.4); border-radius: 9999px; padding: 4px 12px; font-size: 11px; font-family: system-ui, sans-serif; cursor: pointer; backdrop-filter: blur(8px);">
            👁️ Toggle Gate / Unlocked
          </button>
        </div>
      ` : ''}

      <!-- GATE & PASSCODE SECTION -->
      <div id="bloomGateLayer" class="relative z-10" style="background-color: #fbf7f5; display: block;">
        <section class="flex min-h-screen w-full items-center justify-center px-6" style="background-color: #fbf7f5;">
          <div id="bloomGateShakeBox" class="flex flex-col items-center gap-8" style="color: #360f5a;">
            
            <div class="text-center">
              <h1 class="text-5xl md:text-6xl" style="font-family: 'Dancing Script', cursive; font-weight: 700;">Hi, beautiful</h1>
              <p class="mt-3 text-xl md:text-2xl" style="font-family: 'Dancing Script', cursive; font-weight: 500;">Enter the correct password to see your surprise :)</p>
            </div>

            <!-- 4 DOTS -->
            <div class="flex gap-4" id="bloomPinDots">
              <div class="h-3.5 w-3.5 rounded-full border-2 transition-all bloom-dot" data-idx="0" style="border-color: #360f5a; background-color: transparent;"></div>
              <div class="h-3.5 w-3.5 rounded-full border-2 transition-all bloom-dot" data-idx="1" style="border-color: #360f5a; background-color: transparent;"></div>
              <div class="h-3.5 w-3.5 rounded-full border-2 transition-all bloom-dot" data-idx="2" style="border-color: #360f5a; background-color: transparent;"></div>
              <div class="h-3.5 w-3.5 rounded-full border-2 transition-all bloom-dot" data-idx="3" style="border-color: #360f5a; background-color: transparent;"></div>
            </div>

            <!-- NUMPAD -->
            <div class="grid grid-cols-3 gap-4">
              ${['1','2','3','4','5','6','7','8','9'].map(d => `
                <button type="button" class="bloom-numpad-btn flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-medium transition-all hover:scale-105 active:scale-95 md:h-16 md:w-16 md:text-2xl"
                  data-val="${d}" style="border-color: #360f5a; color: #360f5a; background-color: rgba(54,15,90,0.04); cursor: pointer; outline: none;">
                  ${d}
                </button>
              `).join('')}
              <button type="button" class="bloom-numpad-btn flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-medium transition-all hover:scale-105 active:scale-95 md:h-16 md:w-16 md:text-2xl"
                data-val="backspace" aria-label="delete" style="border-color: #360f5a; color: #360f5a; background-color: rgba(54,15,90,0.04); cursor: pointer; outline: none;">
                ⌫
              </button>
              <button type="button" class="bloom-numpad-btn flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-medium transition-all hover:scale-105 active:scale-95 md:h-16 md:w-16 md:text-2xl"
                data-val="0" style="border-color: #360f5a; color: #360f5a; background-color: rgba(54,15,90,0.04); cursor: pointer; outline: none;">
                0
              </button>
              <div></div>
            </div>

          </div>
        </section>
      </div>

      <!-- FLOWER SWARM CURTAIN (SPIRAL & PARTING) -->
      <div id="bloomCurtainLayer" class="pointer-events-none absolute inset-0 z-20" style="display: none; overflow: hidden;">
        <div id="bloomCurtainLeft" class="absolute inset-0" style="will-change: transform;">
          ${leftFlowers.map(f => {
            const dx = f.x - 50;
            const dy = f.y - 50;
            const dist = Math.hypot(dx, dy) || 1;
            const fromX = `${(dx / dist) * 70}vw`;
            const fromY = `${(dy / dist) * 70}vh`;
            return `
              <div style="position: absolute; left: ${f.x}vw; top: ${f.y}vh; width: ${Rd}vmax; height: ${Rd}vmax; margin-left: -${Rd / 2}vmax; margin-top: -${Rd / 2}vmax; --fx-from-x: ${fromX}; --fx-from-y: ${fromY}; --fx-scale: ${f.scale}; animation: flowerFlyIn 1100ms cubic-bezier(0.22,0.61,0.36,1) ${f.delay}ms both; will-change: transform, opacity;">
                <div style="width: 100%; height: 100%; --fx-rot: ${f.rot}deg; animation: ${f.spinDir === 1 ? 'spinCW' : 'spinCCW'} ${f.spinMs}ms linear infinite; will-change: transform;">
                  <img src="${f.img}" alt="" draggable="false" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(54,15,90,0.15)); transform: translateZ(0);" />
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div id="bloomCurtainRight" class="absolute inset-0" style="will-change: transform;">
          ${rightFlowers.map(f => {
            const dx = f.x - 50;
            const dy = f.y - 50;
            const dist = Math.hypot(dx, dy) || 1;
            const fromX = `${(dx / dist) * 70}vw`;
            const fromY = `${(dy / dist) * 70}vh`;
            return `
              <div style="position: absolute; left: ${f.x}vw; top: ${f.y}vh; width: ${Rd}vmax; height: ${Rd}vmax; margin-left: -${Rd / 2}vmax; margin-top: -${Rd / 2}vmax; --fx-from-x: ${fromX}; --fx-from-y: ${fromY}; --fx-scale: ${f.scale}; animation: flowerFlyIn 1100ms cubic-bezier(0.22,0.61,0.36,1) ${f.delay}ms both; will-change: transform, opacity;">
                <div style="width: 100%; height: 100%; --fx-rot: ${f.rot}deg; animation: ${f.spinDir === 1 ? 'spinCW' : 'spinCCW'} ${f.spinMs}ms linear infinite; will-change: transform;">
                  <img src="${f.img}" alt="" draggable="false" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(54,15,90,0.15)); transform: translateZ(0);" />
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- REVEALED EXPERIENCE (kd) -->
      <div id="bloomRevealedLayer" class="relative z-0 w-full" style="display: none; background-color: #EDD9ED;">
        
        <!-- SECTION 1: 10 THINGS I LOVE ABOUT YOU (bd) -->
        <section class="bloom-anim-sec relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24"
          style="color: #360f5a; background-image: url('/bloom/hero-bg.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
          <h2 class="text-center text-5xl md:text-7xl" style="font-family: 'Dancing Script', cursive; font-weight: 700;">
            10 things I love about you
          </h2>
          <div class="mt-12 grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
            ${reasons.map((item, idx) => `
              <div class="bloom-accordion-card overflow-hidden rounded-2xl border-2 backdrop-blur-sm"
                style="border-color: #360f5a; background-color: rgba(255,255,255,0.35);" data-idx="${idx}">
                <button type="button" class="bloom-accordion-toggle flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/40"
                  style="color: #360f5a; background: transparent; border: none; cursor: pointer; outline: none;">
                  <span class="text-lg md:text-xl" style="font-family: 'Dancing Script', cursive; font-weight: 600;">
                    ${idx + 1}. ${item.title}
                  </span>
                  <span class="bloom-plus-icon text-2xl leading-none" style="display: inline-block; transition: transform 0.3s ease;">+</span>
                </button>
                <div class="bloom-accordion-panel" style="max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.22,0.61,0.36,1), opacity 0.4s ease;">
                  <p class="px-5 pb-5 pt-1 text-base md:text-lg" style="font-family: 'Caveat', cursive; color: #360f5a; line-height: 1.5; margin: 0;">
                    ${item.body}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 2: POLAROIDS GALLERY (Cd) -->
        <section class="bloom-anim-sec relative flex min-h-screen w-full items-center justify-center px-6 py-24"
          style="background-color: #DDB8DD; color: #360f5a;">
          <div class="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 md:gap-10 lg:grid-cols-5">
            ${polaroids.map((imgSrc, idx) => `
              <figure class="mx-auto" style="padding: 12px 12px 42px 12px; background: #fff; box-shadow: 0 14px 32px -10px rgba(54,15,90,0.4), 0 6px 12px rgba(0,0,0,0.18); border-radius: 3px; transform: rotate(${POLAROID_TILTS[idx % POLAROID_TILTS.length]}deg); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <img src="${imgSrc}" alt="" draggable="false" class="block h-40 w-40 object-cover sm:h-44 sm:w-44 md:h-48 md:w-48" loading="lazy" />
              </figure>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 3: THE LOVE LETTER (Td - 260vh Sticky Scroll Reveal) -->
        <section id="bloomSecLetter" class="bloom-sec-letter relative w-full" style="height: 260vh; background-image: url('/bloom/section3-bg.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
          <div id="bloomLetterStickyFrame" class="bloom-letter-sticky-frame sticky top-0 z-10 flex h-screen w-full items-center justify-center px-6" style="height: 100vh; height: 100dvh;">
            <div class="w-full max-w-3xl">
              <div class="bloom-letter-card relative mx-auto w-full rounded-sm"
                style="background: linear-gradient(180deg, #fdfaf3 0%, #f8f1e4 100%); padding: clamp(1.25rem, 4vw, 3.5rem) clamp(1rem, 4vw, 3rem); box-shadow: 0 30px 60px -20px rgba(54,15,90,0.35), 0 12px 24px -12px rgba(54,15,90,0.25), inset 0 0 40px rgba(180,150,90,0.08); border: 1px solid rgba(180,150,90,0.18);">
                <p class="text-center" style="font-family: 'Caveat', cursive; color: #360f5a; font-size: clamp(1.05rem, 2.3vw, 1.85rem); line-height: 1.6; letter-spacing: 0.01em;">
                  ${words.map((word, i) => `
                    <span class="bloom-letter-word" data-w="${i}" style="opacity: 0.08; display: inline-block; margin-right: 0.3em; transition: opacity 0.25s ease;">${word}</span>
                  `).join('')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: OUR TOP SONGS (Dd) -->
        <section class="bloom-anim-sec relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24"
          style="background: linear-gradient(180deg, #EDD9ED 0%, #d8bfe4 100%); color: #360f5a;">
          <div class="w-full">
            <h2 class="text-center text-5xl md:text-7xl" style="font-family: 'Dancing Script', cursive; font-weight: 700; color: #360f5a;">
              Our Top Songs
            </h2>
            <div class="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              ${spotifyTracks.map(id => `
                <div class="overflow-hidden rounded-3xl" style="background: rgba(255,255,255,0.25); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 10px 30px -12px rgba(54,15,90,0.35), inset 0 1px 0 rgba(255,255,255,0.6);">
                  <iframe title="spotify-${id}" src="https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border: 0; display: block; border-radius: 24px; width: 100%;"></iframe>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 5: DEVOTION TYPEWRITER & RESTART FAB (Od) -->
        <section id="bloomSecEnding" class="bloom-anim-sec relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
          style="background-image: url('/bloom/section5-bg.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
          <h2 class="relative z-10 px-6 text-center text-4xl md:text-7xl"
            style="font-family: 'Dancing Script', cursive; font-weight: 700; color: #360f5a; text-shadow: 0 2px 8px rgba(255,255,255,0.9);">
            <span id="bloomTypewriterContent"></span><span style="animation: cursorBlink 0.9s infinite; display: inline-block;">|</span>
          </h2>

          <button type="button" id="bloomRestartBtn" class="fixed bottom-6 right-6 z-50 rounded-full px-5 py-3 text-base md:text-lg"
            style="font-family: 'Dancing Script', cursive; font-weight: 700; color: #fbf7f5; background-color: #360f5a; box-shadow: 0 10px 30px -8px rgba(54,15,90,0.6); animation: fabFloat 3s ease-in-out infinite; border: none; cursor: pointer;">
            Go to the start
          </button>
        </section>

      </div>

      <style>
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
        @keyframes flowerFlyIn {
          0% {
            transform: translate3d(var(--fx-from-x), var(--fx-from-y), 0) scale(0.4);
            opacity: 0;
          }
          25% { opacity: 1; }
          100% {
            transform: translate3d(0, 0, 0) scale(var(--fx-scale));
            opacity: 1;
          }
        }
        @keyframes spinCW {
          from { transform: rotate(var(--fx-rot)); }
          to   { transform: rotate(calc(var(--fx-rot) + 360deg)); }
        }
        @keyframes spinCCW {
          from { transform: rotate(var(--fx-rot)); }
          to   { transform: rotate(calc(var(--fx-rot) - 360deg)); }
        }
        @keyframes fabFloat {
          0%, 100% { transform: translateY(0); box-shadow: 0 10px 30px -8px rgba(54,15,90,0.55); }
          50% { transform: translateY(-8px); box-shadow: 0 18px 36px -10px rgba(54,15,90,0.7); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .bloom-anim-sec {
          transition: opacity 1.1s cubic-bezier(0.22,0.61,0.36,1), transform 1.1s cubic-bezier(0.22,0.61,0.36,1);
        }
      </style>
    </div>
  `;

  // Dynamic Logic & Event Handling
  const rootWrap = container.querySelector('#bloomContainer');
  const gateLayer = container.querySelector('#bloomGateLayer');
  const gateShakeBox = container.querySelector('#bloomGateShakeBox');
  const curtainLayer = container.querySelector('#bloomCurtainLayer');
  const curtainLeft = container.querySelector('#bloomCurtainLeft');
  const curtainRight = container.querySelector('#bloomCurtainRight');
  const revealedLayer = container.querySelector('#bloomRevealedLayer');
  const pinDots = container.querySelectorAll('.bloom-dot');
  const restartBtn = container.querySelector('#bloomRestartBtn');
  const bypassBtn = container.querySelector('#bloomEditorBypassBtn');

  let enteredPin = '';
  let stage = 'gate'; // 'gate' | 'spiral' | 'parting' | 'revealed'

  function updateDots() {
    pinDots.forEach((dot, idx) => {
      dot.style.backgroundColor = idx < enteredPin.length ? '#360f5a' : 'transparent';
    });
  }

  function handleKeyInput(val) {
    if (stage !== 'gate') return;
    if (enteredPin.length >= 4) return;

    enteredPin += val;
    updateDots();

    if (enteredPin.length === 4) {
      if (enteredPin === targetPin) {
        // Correct password -> trigger spiral transition after 180ms
        setTimeout(() => {
          transitionToSpiral();
        }, 180);
      } else {
        // Wrong password -> shake and clear after 500ms
        gateShakeBox.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          gateShakeBox.style.animation = '';
          enteredPin = '';
          updateDots();
        }, 500);
      }
    }
  }

  function handleBackspace() {
    if (stage !== 'gate') return;
    if (enteredPin.length > 0) {
      enteredPin = enteredPin.slice(0, -1);
      updateDots();
    }
  }

  container.querySelectorAll('.bloom-numpad-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-val');
      if (val === 'backspace') {
        handleBackspace();
      } else if (val) {
        handleKeyInput(val);
      }
    });
  });

  function handleKeyDown(e) {
    if (stage !== 'gate') return;
    if (/^[0-9]$/.test(e.key)) {
      handleKeyInput(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  // TRANSITION: Gate -> Spiral -> Parting -> Revealed
  function transitionToSpiral() {
    stage = 'spiral';
    curtainLayer.style.display = 'block';

    // After Md = 4200ms, transition to parting
    setTimeout(() => {
      transitionToParting();
    }, Md);
  }

  function transitionToParting() {
    stage = 'parting';
    // Part curtain left and right
    curtainLeft.style.transition = `transform ${Nd}ms cubic-bezier(0.65, 0, 0.35, 1)`;
    curtainRight.style.transition = `transform ${Nd}ms cubic-bezier(0.65, 0, 0.35, 1)`;
    curtainLeft.style.transform = 'translate3d(-110%, 0, 0)';
    curtainRight.style.transform = 'translate3d(110%, 0, 0)';

    gateLayer.style.display = 'none';
    revealedLayer.style.display = 'block';
    rootWrap.classList.remove('overflow-hidden');
    rootWrap.style.overflow = 'visible';
    rootWrap.style.overflowX = 'clip';

    // After Nd = 2600ms, reveal is complete
    setTimeout(() => {
      stage = 'revealed';
      curtainLayer.style.display = 'none';
      initRevealedEffects();
    }, Nd);
  }

  // RESTART: Smooth scroll to top and reset to gate
  function resetToGate() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      enteredPin = '';
      updateDots();
      stage = 'gate';
      revealedLayer.style.display = 'none';
      curtainLayer.style.display = 'none';
      curtainLeft.style.transform = 'translate3d(0, 0, 0)';
      curtainRight.style.transform = 'translate3d(0, 0, 0)';
      gateLayer.style.display = 'block';
      rootWrap.classList.add('overflow-hidden');
      rootWrap.style.overflow = 'hidden';
    }, 500);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', resetToGate);
  }

  // Bypass toggle for studio editor preview
  if (bypassBtn) {
    bypassBtn.addEventListener('click', () => {
      if (stage === 'gate') {
        gateLayer.style.display = 'none';
        revealedLayer.style.display = 'block';
        rootWrap.classList.remove('overflow-hidden');
        rootWrap.style.overflow = 'visible';
        rootWrap.style.overflowX = 'clip';
        stage = 'revealed';
        initRevealedEffects();
      } else {
        resetToGate();
      }
    });
  }

  let cleanupRevealed = null;

  // INITIALIZE INTERACTIVE REVEALED FEATURES
  function initRevealedEffects() {
    // Ensure overflow is visible on rootWrap so sticky works seamlessly
    if (rootWrap) {
      rootWrap.classList.remove('overflow-hidden');
      rootWrap.style.overflow = 'visible';
      rootWrap.style.overflowX = 'clip';
    }

    // 1. Accordion Toggle
    let openCardIdx = null;
    const cards = container.querySelectorAll('.bloom-accordion-card');
    cards.forEach((card, idx) => {
      const toggle = card.querySelector('.bloom-accordion-toggle');
      const panel = card.querySelector('.bloom-accordion-panel');
      const icon = card.querySelector('.bloom-plus-icon');

      toggle.addEventListener('click', () => {
        const isCurrentOpen = openCardIdx === idx;
        // Close all
        cards.forEach(c => {
          c.querySelector('.bloom-accordion-panel').style.maxHeight = '0';
          c.querySelector('.bloom-accordion-panel').style.opacity = '0';
          c.querySelector('.bloom-plus-icon').style.transform = 'none';
        });

        if (!isCurrentOpen) {
          openCardIdx = idx;
          panel.style.maxHeight = '300px';
          panel.style.opacity = '1';
          icon.style.transform = 'rotate(45deg)';
        } else {
          openCardIdx = null;
        }
      });
    });

    // 2. Scroll-Illuminated Letter (Td - Stationary Pinned Card with Word-by-Word Reveal)
    const secLetter = container.querySelector('#bloomSecLetter');
    const stickyFrame = container.querySelector('#bloomLetterStickyFrame');
    const wordSpans = container.querySelectorAll('.bloom-letter-word');
    const totalWords = wordSpans.length;

    // Detect scroll parent (window in viewer, or .preview-frame-container in studio editor)
    function findScrollParent(el) {
      let cur = el ? el.parentElement : null;
      while (cur && cur !== document.body && cur !== document.documentElement) {
        const ovY = window.getComputedStyle(cur).overflowY;
        if (ovY === 'auto' || ovY === 'scroll') {
          return cur;
        }
        cur = cur.parentElement;
      }
      return window;
    }

    const scrollParent = findScrollParent(container);
    const isWindowScroll = scrollParent === window;

    // Inside phone chassis or custom container, match sticky frame height to the chassis viewport
    if (!isWindowScroll && stickyFrame) {
      stickyFrame.style.height = `${scrollParent.clientHeight}px`;
    }

    function handleLetterScroll() {
      if (!secLetter || !stickyFrame) return;

      const secRect = secLetter.getBoundingClientRect();
      const viewportH = isWindowScroll ? window.innerHeight : scrollParent.clientHeight;
      const viewportTop = isWindowScroll ? 0 : scrollParent.getBoundingClientRect().top;

      const relativeTop = secRect.top - viewportTop;
      const maxScroll = secRect.height - viewportH;

      if (maxScroll <= 0) return;

      // Calculate scroll progress through Section 3: 0.0 (entry) to 1.0 (exit)
      const scrollProgress = -relativeTop / maxScroll;
      const normalized = Math.min(1, Math.max(0, (scrollProgress - 0.05) / 0.9));
      const illuminatedCount = Math.round(normalized * totalWords);

      wordSpans.forEach((span, i) => {
        span.style.opacity = i < illuminatedCount ? '1' : '0.08';
      });

      // Rock-solid stationary pinning guarantee:
      // In all standard browsers, CSS position:sticky keeps the frame pinned at top: 0.
      // If any ancestor container (e.g. editor phone chassis) interferes with sticky,
      // fallback translation ensures the letter card stays completely stationary in viewport.
      const frameRect = stickyFrame.getBoundingClientRect();
      const frameRelTop = frameRect.top - viewportTop;

      if (relativeTop <= 0 && relativeTop >= -maxScroll) {
        // Section 3 is actively scrolling in the viewport
        if (Math.abs(frameRelTop) > 4) {
          // Sticky not holding natively -> apply JS compensation so letter card does NOT move
          stickyFrame.style.transform = `translate3d(0, ${-relativeTop}px, 0)`;
        } else {
          stickyFrame.style.transform = '';
        }
      } else if (relativeTop < -maxScroll) {
        // Passed section end -> scroll off with section
        if (stickyFrame.style.transform) {
          stickyFrame.style.transform = `translate3d(0, ${maxScroll}px, 0)`;
        }
      } else {
        // Before section start
        if (stickyFrame.style.transform) {
          stickyFrame.style.transform = '';
        }
      }
    }

    const scrollTarget = isWindowScroll ? window : scrollParent;
    scrollTarget.addEventListener('scroll', handleLetterScroll, { passive: true });
    if (!isWindowScroll) {
      window.addEventListener('scroll', handleLetterScroll, { passive: true });
    }

    // Call once immediately to set initial state
    handleLetterScroll();

    // 3. Typewriter Effect (Od)
    const typewriterContent = container.querySelector('#bloomTypewriterContent');
    const secEnding = container.querySelector('#bloomSecEnding');
    if (typewriterContent && secEnding) {
      let currentLen = 0;
      let hasStarted = false;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasStarted) {
            hasStarted = true;
            const timer = setInterval(() => {
              if (currentLen < endingQuote.length) {
                currentLen++;
                typewriterContent.textContent = endingQuote.slice(0, currentLen);
              } else {
                clearInterval(timer);
              }
            }, 60);
          }
        });
      }, { threshold: 0.35 });

      observer.observe(secEnding);
    }

    cleanupRevealed = () => {
      scrollTarget.removeEventListener('scroll', handleLetterScroll);
      if (!isWindowScroll) {
        window.removeEventListener('scroll', handleLetterScroll);
      }
    };
  }

  // Cleanup
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    if (cleanupRevealed) cleanupRevealed();
  };
}
