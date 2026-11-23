// src/viewer/cardTilt.js - 60fps Physics-Based 3D Perspective Tilt & Dynamic Specular Sheen
// Inspired by Thanor.ai's physical tactile card aesthetics.

export function initCardTilt(root = document) {
  if (window.isCelebrationEditorMode) return;

  const SELECTORS = [
    '.polaroid-card',
    '.polaroid-item',
    '.bcard-thumb-wrap',
    '.scratch-card-wrapper',
    '.vip-lanyard-card',
    '.anni-counter-glass',
    '.certificate-card',
    '.fam-photo-card',
    '.bday-page-card',
    '.gate-card',
    '.tree-card',
    '.blossom-card'
  ];

  const selectorStr = SELECTORS.join(', ');
  let activeCard = null;
  let bounds = null;
  let rafId = null;

  function resetCard(card) {
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '';
  }

  // Pointermove with delegation: silky 60fps on desktop pointer/mouse
  root.addEventListener('pointermove', (e) => {
    // Only apply dynamic 3D tilt on mouse/trackpad, not finger touch (to keep mobile 60fps scroll frictionless)
    if (e.pointerType === 'touch') return;

    const targetCard = e.target.closest(selectorStr);
    if (!targetCard) {
      if (activeCard) {
        resetCard(activeCard);
        activeCard = null;
        bounds = null;
      }
      return;
    }

    if (activeCard !== targetCard) {
      if (activeCard) resetCard(activeCard);
      activeCard = targetCard;
      bounds = activeCard.getBoundingClientRect();
      activeCard.style.transformStyle = 'preserve-3d';
      activeCard.style.transition = 'transform 0.12s ease-out, box-shadow 0.12s ease-out';
    }

    if (!bounds) bounds = activeCard.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
      resetCard(activeCard);
      activeCard = null;
      bounds = null;
      return;
    }

    const px = (x / bounds.width - 0.5) * 2; // -1 to 1
    const py = (y / bounds.height - 0.5) * 2; // -1 to 1

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (!activeCard) return;
      const rotX = py * -11;
      const rotY = px * 11;
      activeCard.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      activeCard.style.boxShadow = `${-rotY * 1.5}px ${rotX * 1.5 + 16}px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
    });
  }, { passive: true });

  root.addEventListener('pointerleave', () => {
    if (activeCard) {
      resetCard(activeCard);
      activeCard = null;
      bounds = null;
    }
  }, { passive: true });
}
