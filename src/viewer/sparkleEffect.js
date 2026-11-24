// src/viewer/sparkleEffect.js - 60fps Interactive Touch & Click Sparkle / Heart Particle System

export function initInteractiveSparkles(container = document.body) {
  if (window.isCelebrationEditorMode) return;
  if (window.__sparklesInitialized) return;
  window.__sparklesInitialized = true;

  const hearts = ['💖', '✨', '🌸', '💕', '⭐', '🤍', '🍰', '💐'];

  function spawnSparkle(x, y) {
    if (!x || !y) return;
    const el = document.createElement('div');
    el.className = 'interactive-sparkle-particle';
    const char = hearts[Math.floor(Math.random() * hearts.length)];
    el.textContent = char;

    const size = Math.random() * 12 + 16;
    const destX = (Math.random() - 0.5) * 88;
    const destY = -Math.random() * 80 - 35;
    const rot = (Math.random() - 0.5) * 60;

    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 99999;
      user-select: none;
      -webkit-user-select: none;
      transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg) scale(0.85);
      opacity: 0;
      transition: transform 0.75s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1);
      filter: drop-shadow(0 2px 6px rgba(244, 114, 182, 0.6));
    `;

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = `translate(-50%, -50%) translate3d(${destX}px, ${destY}px, 0) rotate(${rot}deg) scale(1.25)`;
      setTimeout(() => {
        el.style.opacity = '0';
      }, 400);
    });

    setTimeout(() => {
      el.remove();
    }, 900);
  }

  let lastSpawn = 0;
  function handlePointer(e) {
    const now = Date.now();
    if (now - lastSpawn < 35) return; // limit rate for silky 60fps
    lastSpawn = now;

    if (e.touches && e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        spawnSparkle(e.touches[i].clientX, e.touches[i].clientY);
      }
    } else if (e.clientX !== undefined) {
      spawnSparkle(e.clientX, e.clientY);
    }
  }

  window.addEventListener('pointerdown', handlePointer, { passive: true });
  window.addEventListener('pointermove', (e) => {
    // Only spawn particles during touch or mouse drag
    if (e.buttons > 0 || e.pointerType === 'touch') {
      handlePointer(e);
    }
  }, { passive: true });
}
