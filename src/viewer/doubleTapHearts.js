// src/viewer/doubleTapHearts.js - Double-Tap to Heart / Like on Photos & Cards
// Inspired by Instagram Reels / TikTok double-tap interaction.

import { soundFx } from './audioSynth.js';

export function initDoubleTapHearts(root = document) {
  if (window.isCelebrationEditorMode) return;

  let lastTapTime = 0;
  let lastTapTarget = null;

  function spawnBloomingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'blooming-doubletap-heart';
    heart.innerHTML = '💖';

    const rot = (Math.random() - 0.5) * 36;
    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 52px;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
      transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease-out;
      filter: drop-shadow(0 4px 18px rgba(244, 63, 94, 0.8));
      opacity: 1;
      user-select: none;
    `;

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(-50%, -120%) scale(1.35) rotate(${rot}deg)`;
      setTimeout(() => {
        heart.style.opacity = '0';
      }, 350);
    });

    setTimeout(() => {
      heart.remove();
    }, 700);

    soundFx.heartbeat();
    if (navigator.vibrate) navigator.vibrate([15, 25, 20]);
  }

  function handleInteraction(e) {
    const target = e.target.closest('.polaroid-item, .polaroid-card, .photo-ribbon-item, .bcard-thumb-wrap, .bday-page-card, .anni-page-card, .fam-photo-card');
    if (!target) return;

    const currentTime = Date.now();
    const tapLength = currentTime - lastTapTime;

    if (tapLength < 320 && tapLength > 0 && lastTapTarget === target) {
      // Double tap detected!
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      spawnBloomingHeart(clientX, clientY);
      lastTapTime = 0;
      lastTapTarget = null;
    } else {
      lastTapTime = currentTime;
      lastTapTarget = target;
    }
  }

  root.addEventListener('pointerup', handleInteraction, { passive: true });
}
