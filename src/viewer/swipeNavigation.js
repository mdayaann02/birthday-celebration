// src/viewer/swipeNavigation.js - Touch Swipe & Gesture Storybook Navigation
// Enables natural mobile swiping (like Instagram/TikTok) across multi-page storybook templates
// (Birthday, Anniversary, Valentine, Friendship, Apology, Family), while rigorously guarding
// interactive scenes, 3D reels, canvases, book flip gestures, and Long Romance from accidental page flips.

import { soundFx } from './audioSynth.js';

export function initSwipeNavigation(container = document) {
  if (window.isCelebrationEditorMode) return;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwiping = false;

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
    'reasons-deck'
  ];

  function shouldIgnore(target) {
    if (!target) return false;

    // Check for explicit prevent swipe attribute
    if (target.closest && target.closest('[data-prevent-swipe]')) return true;

    // Guard all interactive controls, inputs, canvases, buttons, media
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

    // Must be predominantly horizontal gesture (at least 45px, duration < 600ms, X:Y ratio > 1.5)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && duration < 600) {
      // Query only page-card based storybooks (excluding full-screen interactive scenes like Long Romance)
      const activeCard = container.querySelector(
        '.bday-page-card.active, .anni-page-card.active, .val-page-card.active, .bff-page-card.active, .sorry-page-card.active, .fam-page-card.active, .romance-page-card.active'
      );
      if (!activeCard) return;

      if (deltaX < 0) {
        // Swiped Left -> Go Next Page
        const nextBtn = activeCard.querySelector(
          '.btn-bday-next, .btn-anni-next, .btn-val-next, .btn-bff-next, .btn-sorry-next, .btn-fam-next, .btn-romance-page-next, [data-next]'
        );
        if (nextBtn) {
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
          if (navigator.vibrate) navigator.vibrate(10);
          soundFx.whoosh();
          prevBtn.click();
        }
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
  window.addEventListener('keydown', handleKeyDown);
}
