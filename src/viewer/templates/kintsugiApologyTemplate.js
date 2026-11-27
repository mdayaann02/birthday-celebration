// src/viewer/templates/kintsugiApologyTemplate.js
// Flagship "After the Rain / Kintsugi" 5-Act Apology Experience

import gsap from 'gsap';
import { createIcons, Volume2, VolumeX, ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide';
import './kintsugi.css';
import { createKintsugiThreeScene } from './kintsugiThreeScene.js';
import { createKintsugiAudio } from './kintsugiAudio.js';

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildReplyHref(data) {
  const rawLink = (data.replyLink || '').trim();
  if (rawLink) return rawLink;
  const wa = (data.whatsappNumber || '').replace(/[^\d]/g, '');
  if (wa) {
    const msg = encodeURIComponent(`Hey ${data.senderName || ''}, I read your note. I'm ready to talk.`);
    return `https://wa.me/${wa}?text=${msg}`;
  }
  return '';
}

export function renderKintsugiApologyTemplate(root, rawData = {}, isMakerReview = false) {
  const data = {
    recipientName: rawData.recipientName || 'Someone Special',
    senderName: rawData.senderName || 'Me',
    openingHook:
      rawData.openingHook ||
      'I messed up, and you deserve more than a quick text.',
    acknowledgmentLines:
      Array.isArray(rawData.acknowledgmentLines) && rawData.acknowledgmentLines.length > 0
        ? rawData.acknowledgmentLines
        : [
            'I let my pride speak louder than my care for you, and that was unfair.',
            'You deserved patience, honesty, and to feel genuinely heard.',
            'I am not here to make excuses — only to own the hurt I caused.',
          ],
    letterBody:
      rawData.letterBody ||
      "I've been sitting with the quiet since we last spoke, replaying how I handled things and wishing I had paused before speaking.\n\nYou mean far too much to me to leave things heavy between us. Even when I fall short, my care for you has never wavered.\n\nI don't expect an instant fix. I just wanted to put my heart somewhere calm, with no pressure and no noise — only the truth of how sorry I am.",
    promises:
      Array.isArray(rawData.promises) && rawData.promises.length > 0
        ? rawData.promises
        : [
            {
              title: 'Listen Before Reacting',
              detail: 'When things feel tense, I will pause, breathe, and truly hear your side first.',
            },
            {
              title: 'Own My Mistakes Early',
              detail: 'No defensiveness or silence — I will take responsibility the moment I slip up.',
            },
            {
              title: 'Protect Your Peace',
              detail: 'Your feelings matter more than winning an argument. I will guard our calm.',
            },
            {
              title: 'Show Up Consistently',
              detail: 'Not just in grand apologies, but in the small, everyday ways you deserve.',
            },
          ],
    optionalPhotos: Array.isArray(rawData.optionalPhotos)
      ? rawData.optionalPhotos.filter((p) => p && p.image)
      : [],
    replyLink: rawData.replyLink || '',
    whatsappNumber: rawData.whatsappNumber || '',
    accentMood: rawData.accentMood || 'Midnight Rain',
  };

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const paragraphs = String(data.letterBody)
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const actNames = ['Silence', 'Kintsugi', 'Letter', 'Promises', 'Dawn'];
  const replyHref = buildReplyHref(data);

  root.innerHTML = `
    <div class="ka-stage ${isMakerReview ? 'ka-has-maker-banner' : ''}" id="kaStage" data-act="0">
      <canvas class="ka-canvas" id="kaCanvas" aria-hidden="true"></canvas>
      <div class="ka-fallback-shimmer" aria-hidden="true"></div>
      <div class="ka-vignette" aria-hidden="true"></div>

      <header class="ka-topbar">
        <div class="ka-act-pill" aria-label="Story progress">
          <span id="kaActLabel">Act 1 · ${actNames[0]}</span>
          <div class="ka-dots" role="tablist" aria-label="Chapters">
            ${actNames
              .map(
                (name, i) => `
              <button
                type="button"
                class="ka-dot ${i === 0 ? 'active' : ''}"
                data-goto="${i}"
                role="tab"
                aria-selected="${i === 0 ? 'true' : 'false'}"
                aria-label="Act ${i + 1}: ${name}"
              ></button>
            `
              )
              .join('')}
          </div>
        </div>

        <button type="button" class="ka-audio-btn" id="kaAudioToggle" aria-pressed="false" aria-label="Toggle ambient sound">
          <i data-lucide="volume-x"></i>
          <span>Sound Off</span>
        </button>
      </header>

      <main class="ka-acts-container" id="kaActsContainer">
        <!-- ACT 1: THE SEALED PAUSE -->
        <section class="ka-act active" data-act-panel="0" aria-label="Act 1: The Sealed Pause">
          <div class="ka-act-inner">
            <div class="ka-glass" style="text-align:center;">
              <div class="ka-eyebrow">For ${esc(data.recipientName)}</div>
              <h1 class="ka-serif-title">${esc(data.openingHook)}</h1>
              <p class="ka-body-copy">Take a quiet breath before stepping inside.</p>

              <div class="ka-hold-wrap">
                <button
                  type="button"
                  class="ka-hold-btn"
                  id="kaHoldBtn"
                  aria-label="Hold for 1.2 seconds to open"
                >
                  <svg class="ka-hold-ring" viewBox="0 0 100 100" aria-hidden="true">
                    <circle class="ka-ring-bg" cx="50" cy="50" r="47" />
                    <circle class="ka-ring-fg" id="kaHoldCircle" cx="50" cy="50" r="47" />
                  </svg>
                  <span class="ka-hold-label">Hold</span>
                  <span style="font-size:10px; opacity:0.68;">to open</span>
                </button>
                <button type="button" class="ka-tap-fallback" id="kaTapOpenBtn">
                  or tap to enter
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ACT 2: NO EXCUSES (ACKNOWLEDGMENT) -->
        <section class="ka-act" data-act-panel="1" aria-label="Act 2: Owning the Mistake">
          <div class="ka-act-inner">
            <div class="ka-glass">
              <div class="ka-eyebrow">No Excuses</div>
              <h2 class="ka-serif-title">What I need to own</h2>
              <p class="ka-body-copy">Tap each line to trace the gold seam of repair.</p>

              <div class="ka-ack-list" id="kaAckList">
                ${data.acknowledgmentLines
                  .map(
                    (line, idx) => `
                  <button type="button" class="ka-ack-item" data-ack-idx="${idx}">
                    <span class="ka-ack-seam" aria-hidden="true"></span>
                    <span>${esc(line)}</span>
                  </button>
                `
                  )
                  .join('')}
              </div>
              <div class="ka-ack-hint" id="kaAckHint">0 of ${data.acknowledgmentLines.length} acknowledged</div>
            </div>
          </div>
        </section>

        <!-- ACT 3: THE UNFILTERED LETTER -->
        <section class="ka-act" data-act-panel="2" aria-label="Act 3: The Unfiltered Letter">
          <div class="ka-act-inner">
            <div class="ka-glass ka-letter-card" id="kaLetterCard">
              <div class="ka-letter-progress-track" aria-hidden="true">
                <div class="ka-letter-progress-bar" id="kaLetterBar"></div>
              </div>
              <div class="ka-letter-scroll" id="kaLetterScroll" tabindex="0" aria-label="Heartfelt letter">
                <div class="ka-eyebrow">From the Heart</div>
                <h2 class="ka-serif-title" style="margin-bottom:18px;">Dear ${esc(data.recipientName)},</h2>
                <div class="ka-letter-body">
                  ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ACT 4: CONCRETE PROMISES / MEMORIES -->
        <section class="ka-act" data-act-panel="3" aria-label="Act 4: Promises and What You Mean to Me">
          <div class="ka-act-inner">
            <div style="width:100%; text-align:center; margin-bottom:6px;">
              <div class="ka-eyebrow">Moving Forward</div>
              <h2 class="ka-serif-title" style="margin-bottom:4px;">My Promises to You</h2>
            </div>

            <div class="ka-promise-stage">
              <div class="ka-promise-card" id="kaPromiseCard" role="button" tabindex="0" aria-label="Next promise">
                <div class="ka-promise-top">
                  <span class="ka-promise-index" id="kaPromiseIdx">01 / 0${data.promises.length}</span>
                  <span class="ka-promise-pill">Tap to advance</span>
                </div>
                <div>
                  <h3 class="ka-promise-title" id="kaPromiseTitle">${esc(data.promises[0]?.title || '')}</h3>
                  <p class="ka-promise-detail" id="kaPromiseDetail" style="margin-top:10px;">${esc(data.promises[0]?.detail || '')}</p>
                </div>
              </div>

              <div class="ka-promise-controls">
                <button type="button" class="ka-promise-btn" id="kaPromisePrev">
                  <i data-lucide="chevron-left"></i> Previous
                </button>
                <span style="font-size:12px; color:rgba(244,241,238,0.65);" id="kaPromiseCounter">1 of ${data.promises.length}</span>
                <button type="button" class="ka-promise-btn" id="kaPromiseNext">
                  Next <i data-lucide="chevron-right"></i>
                </button>
              </div>
            </div>

            ${
              data.optionalPhotos.length > 0
                ? `
              <div class="ka-photos-strip" aria-label="Shared memories">
                ${data.optionalPhotos
                  .map(
                    (ph) => `
                  <div class="ka-photo-thumb">
                    <img src="${esc(ph.image)}" alt="${esc(ph.caption || 'Memory')}" loading="lazy" />
                    ${ph.caption ? `<div class="ka-photo-cap">${esc(ph.caption)}</div>` : ''}
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
                : ''
            }
          </div>
        </section>

        <!-- ACT 5: THE OLIVE BRANCH (NO PRESSURE) -->
        <section class="ka-act" data-act-panel="4" aria-label="Act 5: Respectful Closing">
          <div class="ka-act-inner">
            <div class="ka-glass" style="text-align:center;">
              <div class="ka-eyebrow">No Pressure</div>
              <h2 class="ka-serif-title">Whenever you're ready</h2>
              <p class="ka-body-copy">
                You never owe me an immediate answer. Your peace comes first.
              </p>
              <div class="ka-signature">Always, ${esc(data.senderName)}</div>

              <div class="ka-choice-group" id="kaChoiceGroup">
                <button type="button" class="ka-choice-primary" id="kaChoiceTalk">
                  I'm ready to talk
                </button>
                <button type="button" class="ka-choice-secondary" id="kaChoiceTime">
                  I need a little more time
                </button>
              </div>

              <div class="ka-outcome-box" id="kaOutcomeBox" hidden></div>
            </div>
          </div>
        </section>
      </main>

      <nav class="ka-bottom-nav" id="kaBottomNav" aria-label="Act navigation">
        <button type="button" class="ka-nav-btn" id="kaPrevBtn" disabled>
          <i data-lucide="chevron-left"></i>
          <span>Back</span>
        </button>
        <button type="button" class="ka-nav-btn primary" id="kaNextBtn">
          <span>Next</span>
          <i data-lucide="chevron-right"></i>
        </button>
      </nav>
    </div>
  `;

  createIcons({
    icons: { Volume2, VolumeX, ChevronLeft, ChevronRight, MessageCircle, Sparkles },
    nameAttr: 'data-lucide',
    attrs: { 'stroke-width': 1.8 },
  });

  const stage = root.querySelector('#kaStage');
  const canvas = root.querySelector('#kaCanvas');
  const actLabel = root.querySelector('#kaActLabel');
  const dots = Array.from(root.querySelectorAll('.ka-dot'));
  const panels = Array.from(root.querySelectorAll('.ka-act'));
  const prevBtn = root.querySelector('#kaPrevBtn');
  const nextBtn = root.querySelector('#kaNextBtn');
  const audioBtn = root.querySelector('#kaAudioToggle');

  const threeScene = createKintsugiThreeScene(canvas, data.accentMood);
  if (threeScene.isFallback) {
    stage.classList.add('ka-webgl-fallback');
  }
  const audio = createKintsugiAudio();

  let currentAct = 0;
  let isTransitioning = false;
  let hasStartedAudio = false;

  function updateAudioUi() {
    const playing = audio.isPlaying();
    audioBtn.classList.toggle('playing', playing);
    audioBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    audioBtn.innerHTML = playing
      ? '<i data-lucide="volume-2"></i><span>Sound On</span>'
      : '<i data-lucide="volume-x"></i><span>Sound Off</span>';
    createIcons({
      icons: { Volume2, VolumeX },
      nameAttr: 'data-lucide',
      attrs: { 'stroke-width': 1.8 },
    });
  }

  function startAudioOnFirstGesture() {
    if (hasStartedAudio) return;
    hasStartedAudio = true;
    audio.start();
    updateAudioUi();
  }

  audioBtn.addEventListener('click', () => {
    hasStartedAudio = true;
    audio.toggle();
    updateAudioUi();
  });

  function goToAct(targetIdx) {
    const nextIdx = Math.max(0, Math.min(4, targetIdx));
    if (nextIdx === currentAct || isTransitioning) return;
    isTransitioning = true;

    const prevPanel = panels[currentAct];
    const nextPanel = panels[nextIdx];
    const direction = nextIdx > currentAct ? 1 : -1;

    currentAct = nextIdx;
    stage.setAttribute('data-act', String(currentAct));
    actLabel.textContent = `Act ${currentAct + 1} · ${actNames[currentAct]}`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentAct);
      d.setAttribute('aria-selected', i === currentAct ? 'true' : 'false');
    });

    prevBtn.disabled = currentAct === 0;
    nextBtn.disabled = currentAct === 4;
    nextBtn.style.display = currentAct === 4 ? 'none' : 'inline-flex';

    threeScene.setAct(currentAct);
    audio.setAct(currentAct);

    if (reducedMotion) {
      prevPanel.classList.remove('active');
      nextPanel.classList.add('active');
      isTransitioning = false;
      return;
    }

    gsap.to(prevPanel, {
      opacity: 0,
      y: -14 * direction,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        prevPanel.classList.remove('active');
        prevPanel.style.opacity = '';
        prevPanel.style.transform = '';

        nextPanel.classList.add('active');
        gsap.fromTo(
          nextPanel,
          { opacity: 0, y: 18 * direction },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            onComplete: () => {
              isTransitioning = false;
              if (currentAct === 1) animateAckItems();
            },
          }
        );
      },
    });
  }

  // Pointer parallax for Three.js + Letter Card
  const letterCard = root.querySelector('#kaLetterCard');
  function handlePointerMove(e) {
    const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
    threeScene.setPointer(nx, ny);
    if (!reducedMotion && currentAct === 2 && letterCard) {
      letterCard.style.transform = `perspective(900px) rotateY(${nx * 2.2}deg) rotateX(${ny * 2.2}deg)`;
    }
  }
  stage.addEventListener('pointermove', handlePointerMove, { passive: true });

  // Act 1: 1.2s Press-and-Hold + accessible tap fallback
  const holdBtn = root.querySelector('#kaHoldBtn');
  const holdCircle = root.querySelector('#kaHoldCircle');
  const tapOpenBtn = root.querySelector('#kaTapOpenBtn');
  const CIRCUMFERENCE = 295.3;
  let holdStart = 0;
  let holdRaf = 0;
  let isHolding = false;

  function resetHold() {
    isHolding = false;
    cancelAnimationFrame(holdRaf);
    holdBtn.classList.remove('holding');
    holdCircle.style.strokeDashoffset = String(CIRCUMFERENCE);
  }

  function completeHold() {
    resetHold();
    startAudioOnFirstGesture();
    threeScene.triggerRipple(0.9);
    goToAct(1);
  }

  function tickHold(now) {
    if (!isHolding) return;
    const elapsed = now - holdStart;
    const progress = Math.min(1, elapsed / 1200);
    holdCircle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
    if (progress >= 1) {
      completeHold();
      return;
    }
    holdRaf = requestAnimationFrame(tickHold);
  }

  holdBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    isHolding = true;
    holdStart = performance.now();
    holdBtn.classList.add('holding');
    holdRaf = requestAnimationFrame(tickHold);
  });
  holdBtn.addEventListener('pointerup', resetHold);
  holdBtn.addEventListener('pointerleave', resetHold);
  holdBtn.addEventListener('pointercancel', resetHold);
  holdBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      completeHold();
    }
  });
  tapOpenBtn.addEventListener('click', completeHold);

  // Act 2: Staggered Acknowledgment Lines + Kintsugi Gold Ripple
  const ackItems = Array.from(root.querySelectorAll('.ka-ack-item'));
  const ackHint = root.querySelector('#kaAckHint');
  const litSet = new Set();

  function animateAckItems() {
    if (reducedMotion) return;
    gsap.fromTo(
      ackItems,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.14, ease: 'power2.out' }
    );
  }

  ackItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-ack-idx');
      btn.classList.add('lit');
      litSet.add(idx);
      ackHint.textContent = `${litSet.size} of ${ackItems.length} acknowledged`;
      threeScene.triggerRipple(1.0);
    });
  });

  // Act 3: Letter Scroll Reading Progress Glow
  const letterScroll = root.querySelector('#kaLetterScroll');
  const letterBar = root.querySelector('#kaLetterBar');
  letterScroll.addEventListener('scroll', () => {
    const maxScroll = letterScroll.scrollHeight - letterScroll.clientHeight;
    const pct = maxScroll > 0 ? Math.min(100, (letterScroll.scrollTop / maxScroll) * 100) : 100;
    letterBar.style.width = `${pct}%`;
  });

  // Act 4: Promises Interactive Stack/Carousel + 3D Tilt + WebGL Burst
  const promiseCard = root.querySelector('#kaPromiseCard');
  const promiseIdxEl = root.querySelector('#kaPromiseIdx');
  const promiseTitleEl = root.querySelector('#kaPromiseTitle');
  const promiseDetailEl = root.querySelector('#kaPromiseDetail');
  const promiseCounterEl = root.querySelector('#kaPromiseCounter');
  const promisePrevBtn = root.querySelector('#kaPromisePrev');
  const promiseNextBtn = root.querySelector('#kaPromiseNext');
  let promiseIdx = 0;

  function showPromise(newIdx) {
    const total = data.promises.length;
    promiseIdx = ((newIdx % total) + total) % total;
    const item = data.promises[promiseIdx];
    threeScene.triggerBurst(0.95);

    const applyText = () => {
      promiseIdxEl.textContent = `${String(promiseIdx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      promiseTitleEl.textContent = item.title || '';
      promiseDetailEl.textContent = item.detail || '';
      promiseCounterEl.textContent = `${promiseIdx + 1} of ${total}`;
    };

    if (reducedMotion) {
      applyText();
      return;
    }

    gsap.to(promiseCard, {
      opacity: 0.25,
      scale: 0.96,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => {
        applyText();
        gsap.to(promiseCard, {
          opacity: 1,
          scale: 1,
          duration: 0.38,
          ease: 'back.out(1.4)',
        });
      },
    });
  }

  promiseCard.addEventListener('click', () => showPromise(promiseIdx + 1));
  promiseCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPromise(promiseIdx + 1);
    }
  });
  promisePrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPromise(promiseIdx - 1);
  });
  promiseNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPromise(promiseIdx + 1);
  });

  promiseCard.addEventListener('pointermove', (e) => {
    if (reducedMotion) return;
    const rect = promiseCard.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const ry = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    promiseCard.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
  });
  promiseCard.addEventListener('pointerleave', () => {
    promiseCard.style.transform = '';
  });

  // Act 5: Respectful Choices
  const choiceTalkBtn = root.querySelector('#kaChoiceTalk');
  const choiceTimeBtn = root.querySelector('#kaChoiceTime');
  const choiceGroup = root.querySelector('#kaChoiceGroup');
  const outcomeBox = root.querySelector('#kaOutcomeBox');

  choiceTalkBtn.addEventListener('click', () => {
    stage.classList.remove('ka-dawn-time');
    stage.classList.add('ka-dawn-talk');
    threeScene.setDawnState('talk');
    threeScene.triggerBurst(1.0);
    choiceGroup.style.display = 'none';
    outcomeBox.hidden = false;
    outcomeBox.innerHTML = `
      <div class="ka-eyebrow" style="margin-bottom:6px;">Thank You</div>
      <p class="ka-body-copy">Thank you for giving us space to talk. I'm listening whenever you want to begin.</p>
      ${
        replyHref
          ? `<a href="${esc(replyHref)}" target="_blank" rel="noopener noreferrer" class="ka-reply-link">
              <i data-lucide="message-circle" style="width:15px;height:15px;"></i>
              <span>Send a Message</span>
            </a>`
          : ''
      }
    `;
    createIcons({ icons: { MessageCircle }, nameAttr: 'data-lucide', attrs: { 'stroke-width': 2 } });
  });

  choiceTimeBtn.addEventListener('click', () => {
    stage.classList.remove('ka-dawn-talk');
    stage.classList.add('ka-dawn-time');
    threeScene.setDawnState('time');
    choiceGroup.style.display = 'none';
    outcomeBox.hidden = false;
    outcomeBox.innerHTML = `
      <div class="ka-eyebrow" style="margin-bottom:6px;">With Respect</div>
      <p class="ka-body-copy">Take all the time you need. I'll be here when you're ready.</p>
    `;
  });

  // Navigation buttons & dot tabs
  prevBtn.addEventListener('click', () => goToAct(currentAct - 1));
  nextBtn.addEventListener('click', () => {
    startAudioOnFirstGesture();
    goToAct(currentAct + 1);
  });
  dots.forEach((d) => {
    d.addEventListener('click', () => {
      const idx = Number(d.getAttribute('data-goto'));
      if (idx > 0) startAudioOnFirstGesture();
      goToAct(idx);
    });
  });

  // Optional swipe & wheel progression (without interfering with letter scroll)
  let touchStartX = 0;
  let touchStartY = 0;
  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0 && currentAct < 4) {
        startAudioOnFirstGesture();
        goToAct(currentAct + 1);
      } else if (dx > 0 && currentAct > 0) {
        goToAct(currentAct - 1);
      }
    }
  }
  stage.addEventListener('touchstart', onTouchStart, { passive: true });
  stage.addEventListener('touchend', onTouchEnd, { passive: true });

  let wheelLock = false;
  function onWheel(e) {
    if (wheelLock || isTransitioning) return;
    if (currentAct === 2 && letterScroll.contains(e.target)) {
      const atTop = letterScroll.scrollTop <= 0;
      const atBottom = letterScroll.scrollTop + letterScroll.clientHeight >= letterScroll.scrollHeight - 2;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
    }
    if (Math.abs(e.deltaY) > 42) {
      wheelLock = true;
      setTimeout(() => { wheelLock = false; }, 700);
      if (e.deltaY > 0 && currentAct < 4) {
        startAudioOnFirstGesture();
        goToAct(currentAct + 1);
      } else if (e.deltaY < 0 && currentAct > 0) {
        goToAct(currentAct - 1);
      }
    }
  }
  stage.addEventListener('wheel', onWheel, { passive: true });

  // Cleanup hook for Celebration Studio template switching
  root._cleanup = () => {
    cancelAnimationFrame(holdRaf);
    stage.removeEventListener('pointermove', handlePointerMove);
    stage.removeEventListener('touchstart', onTouchStart);
    stage.removeEventListener('touchend', onTouchEnd);
    stage.removeEventListener('wheel', onWheel);
    threeScene.dispose();
    audio.dispose();
  };
}
