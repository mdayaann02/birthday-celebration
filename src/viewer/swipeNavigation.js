// src/viewer/swipeNavigation.js - Touch Swipe & Gesture Storybook Navigation
// Enables natural mobile swiping & continuous scroll flow across multi-page storybook templates
// (Birthday, Anniversary, Valentine, Friendship, Apology, Family), while rigorously guarding
// interactive scenes, 3D reels, canvases, book flip gestures, and Long Romance from accidental page flips.

import { soundFx } from './audioSynth.js';

export function initSwipeNavigation(container = document) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwiping = false;
  let lastNavTime = 0;

  const ignoreClasses = [
    'photo-ribbon',
    'scratch-canvas',
    'bcard-presets-chips',
    'template-filter-chips',
    'form-input',
    'form-textarea',
    'btn-surge-hold',
    'tree-film-stage',
    'romance-fullscreen-scene',
    'scene-inner-wrap',
    'avi-3d-stage',
    'avi-reel-container',
    'realistic-memory-book-container',
    'book-spread-surface',
    'match-interactive-stage',
    'match-striker-box',
    'match-stick',
    'canvas-signature-wrap',
    'sig-canvas',
    'constellation-timeline-track',
    'star-chips-scroller',
    'mixtape-cassette-deck',
    'reasons-deck',
    'bro-bike-arena',
    'btn-bike-throttle',
    'btn-bike-nitro'
  ];

  function shouldIgnore(target) {
    if (!target) return false;

    // Check for explicit prevent swipe attribute
    if (target.closest && target.closest('[data-prevent-swipe]')) return true;

    // Guard interactive inputs, textareas, canvases, buttons
    if (target.closest && (
      target.closest('.tree-film-stage') ||
      target.closest('.romance-fullscreen-scene') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('canvas') ||
      target.closest('button') ||
      target.closest('select') ||
      target.closest('audio') ||
      target.closest('video')
    )) {
      return true;
    }

    for (const cls of ignoreClasses) {
      if (target.closest && target.closest(`.${cls}`)) return true;
    }
    return false;
  }

  function getScrollMetrics(activeCard) {
    const chassis = activeCard?.closest ? (activeCard.closest('.preview-frame-container') || activeCard.closest('#previewContainer')) : null;
    if (chassis) {
      const isAtBottom = (chassis.scrollTop + chassis.clientHeight) >= (chassis.scrollHeight - 30);
      const isAtTop = chassis.scrollTop <= 15;
      return { isAtBottom, isAtTop };
    }
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const clientHeight = window.innerHeight;
    const isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 40);
    const isAtTop = scrollTop <= 20;
    return { isAtBottom, isAtTop };
  }

  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    if (shouldIgnore(e.target)) return;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isSwiping = true;
  }

  function handleTouchEnd(e) {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;

    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    const duration = Date.now() - touchStartTime;
    const now = Date.now();
    if (now - lastNavTime < 600) return;

    const activeCard = container.querySelector(
      '.bday-page-card.active, .anni-page-card.active, .val-page-card.active, .bff-page-card.active, .sorry-page-card.active, .fam-page-card.active, .romance-page-card.active'
    );
    if (!activeCard) return;

    // 1. Horizontal swipe gesture (at least 45px, duration < 600ms, X:Y ratio > 1.5)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && duration < 600) {
      if (deltaX < 0) {
        // Swiped Left -> Go Next Page
        const nextBtn = activeCard.querySelector(
          '.btn-bday-next, .btn-anni-next, .btn-val-next, .btn-bff-next, .btn-sorry-next, .btn-fam-next, .btn-romance-page-next, [data-next]'
        );
        if (nextBtn) {
          lastNavTime = now;
          if (navigator.vibrate) navigator.vibrate(12);
          soundFx.whoosh();
          nextBtn.click();
        }
      } else {
        // Swiped Right -> Go Back Page
        const prevBtn = activeCard.querySelector(
          '.btn-bday-prev, .btn-anni-prev, .btn-val-prev, .btn-bff-prev, .btn-sorry-prev, .btn-fam-prev, .btn-romance-page-prev, [data-prev]'
        );
        if (prevBtn) {
          lastNavTime = now;
          if (navigator.vibrate) navigator.vibrate(10);
          soundFx.whoosh();
          prevBtn.click();
        }
      }
      return;
    }

    // 2. Vertical swipe past edge (Swiping up when already at bottom -> next chapter)
    if (Math.abs(deltaY) > 55 && Math.abs(deltaY) > Math.abs(deltaX) * 1.4 && duration < 550) {
      const { isAtBottom, isAtTop } = getScrollMetrics(activeCard);

      if (deltaY < 0 && isAtBottom) {
        // Swiped Up at bottom -> Advance to next chapter
        const nextBtn = activeCard.querySelector(
          '.btn-bday-next, .btn-anni-next, .btn-val-next, .btn-bff-next, .btn-sorry-next, .btn-fam-next, .btn-romance-page-next, [data-next]'
        );
        if (nextBtn) {
          lastNavTime = now;
          if (navigator.vibrate) navigator.vibrate(12);
          soundFx.whoosh();
          nextBtn.click();
        }
      } else if (deltaY > 0 && isAtTop) {
        // Swiped Down at top -> Return to prev chapter
        const prevBtn = activeCard.querySelector(
          '.btn-bday-prev, .btn-anni-prev, .btn-val-prev, .btn-bff-prev, .btn-sorry-prev, .btn-fam-prev, .btn-romance-page-prev, [data-prev]'
        );
        if (prevBtn) {
          lastNavTime = now;
          if (navigator.vibrate) navigator.vibrate(10);
          soundFx.whoosh();
          prevBtn.click();
        }
      }
    }
  }

  // Wheel boundary scroll: smoothly transitions to next chapter when scrolling past bottom
  function handleWheel(e) {
    if (shouldIgnore(e.target)) return;
    const now = Date.now();
    if (now - lastNavTime < 750) return;

    const activeCard = container.querySelector(
      '.bday-page-card.active, .fam-page-card.active, .anni-page-card.active, .val-page-card.active, .bff-page-card.active, .sorry-page-card.active, .romance-page-card.active'
    );
    if (!activeCard) return;

    const { isAtBottom, isAtTop } = getScrollMetrics(activeCard);

    if (e.deltaY > 55 && isAtBottom) {
      const nextBtn = activeCard.querySelector(
        '.btn-bday-next, .btn-anni-next, .btn-val-next, .btn-bff-next, .btn-sorry-next, .btn-fam-next, .btn-romance-page-next, [data-next]'
      );
      if (nextBtn) {
        lastNavTime = now;
        soundFx.whoosh();
        nextBtn.click();
      }
    } else if (e.deltaY < -55 && isAtTop) {
      const prevBtn = activeCard.querySelector(
        '.btn-bday-prev, .btn-anni-prev, .btn-val-prev, .btn-bff-prev, .btn-sorry-prev, .btn-fam-prev, .btn-romance-page-prev, [data-prev]'
      );
      if (prevBtn) {
        lastNavTime = now;
        soundFx.whoosh();
        prevBtn.click();
      }
    }
  }

  // Keyboard navigation on desktop
  function handleKeyDown(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const activeCard = container.querySelector(
      '.bday-page-card.active, .anni-page-card.active, .val-page-card.active, .bff-page-card.active, .sorry-page-card.active, .fam-page-card.active, .romance-page-card.active'
    );
    if (!activeCard) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      const nextBtn = activeCard.querySelector(
        '.btn-bday-next, .btn-anni-next, .btn-val-next, .btn-bff-next, .btn-sorry-next, .btn-fam-next, .btn-romance-page-next, [data-next]'
      );
      if (nextBtn) {
        soundFx.whoosh();
        nextBtn.click();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      const prevBtn = activeCard.querySelector(
        '.btn-bday-prev, .btn-anni-prev, .btn-val-prev, .btn-bff-prev, .btn-sorry-prev, .btn-fam-prev, .btn-romance-page-prev, [data-prev]'
      );
      if (prevBtn) {
        soundFx.whoosh();
        prevBtn.click();
      }
    }
  }

  container.addEventListener('touchstart', handleTouchStart, { passive: true });
  container.addEventListener('touchend', handleTouchEnd, { passive: true });
  container.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('keydown', handleKeyDown);
}
