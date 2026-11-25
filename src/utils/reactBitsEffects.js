// src/utils/reactBitsEffects.js - React Bits Visual & Motion Effects Suite for Vanilla JS
// Incorporates BlurText, ClickSpark, ShinyText, StarBorder, and MagneticButton

import gsap from 'gsap';

/**
 * BlurText Effect (React Bits standard)
 * Words or characters emerge from a soft Gaussian blur with staggered spring easing.
 */
export function initBlurText(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const {
    delay = 0.1,
    stagger = 0.045,
    duration = 0.75,
    direction = 'bottom',
    splitBy = 'words' // 'words' or 'chars'
  } = options;

  const originalText = el.textContent.trim();
  if (!originalText) return;

  el.setAttribute('aria-label', originalText);
  el.innerHTML = '';

  const units = splitBy === 'chars' ? originalText.split('') : originalText.split(/\s+/);
  const spans = [];

  units.forEach((unit, idx) => {
    const span = document.createElement('span');
    span.className = 'rb-blur-unit';
    span.textContent = unit + (splitBy === 'words' && idx < units.length - 1 ? '\u00A0' : '');
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, filter, opacity';
    span.style.opacity = '0';
    span.style.filter = 'blur(14px)';
    const yOffset = direction === 'top' ? -16 : 16;
    span.style.transform = `translateY(${yOffset}px) scale(0.96)`;
    el.appendChild(span);
    spans.push(span);
  });

  gsap.to(spans, {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    scale: 1,
    duration,
    stagger,
    delay,
    ease: 'power3.out'
  });
}

/**
 * ClickSpark Effect (React Bits standard)
 * Radiating golden micro-sparks on click/tap for tactile feedback.
 */
export function initClickSpark(container, options = {}) {
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) return;

  const {
    sparkColor = '#fbbf24',
    sparkCount = 10,
    sparkSize = 14
  } = options;

  const canvas = document.createElement('canvas');
  canvas.className = 'rb-click-spark-canvas';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  root.style.position = root.style.position || 'relative';
  root.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let sparks = [];
  let animId = null;

  function resize() {
    canvas.width = root.clientWidth * (window.devicePixelRatio || 1);
    canvas.height = root.clientHeight * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }
  resize();

  function triggerSpark(x, y) {
    const rect = root.getBoundingClientRect();
    const localX = x - rect.left;
    const localY = y - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5) * 0.5;
      const speed = 2.5 + Math.random() * 3.5;
      sparks.push({
        x: localX,
        y: localY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: sparkSize * (0.6 + Math.random() * 0.5),
        life: 1.0,
        decay: 0.035 + Math.random() * 0.02,
        color: sparkColor
      });
    }

    if (!animId) {
      loop();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (sparks.length > 0) {
      animId = requestAnimationFrame(loop);
    } else {
      animId = null;
    }
  }

  root.addEventListener('pointerdown', (e) => {
    triggerSpark(e.clientX, e.clientY);
  });

  return {
    burst: (clientX, clientY) => triggerSpark(clientX, clientY),
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      canvas.remove();
    }
  };
}

/**
 * ShinyText Effect (React Bits standard)
 * Metallic flowing highlight gradient sweep across typography.
 */
export function initShinyText(target) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  elements.forEach(el => {
    if (el) el.classList.add('rb-shiny-text');
  });
}

/**
 * StarBorder Effect (React Bits standard)
 * Traveling ambient light border that traces the contour of cards.
 */
export function initStarBorder(target) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  elements.forEach(el => {
    if (el && !el.querySelector('.rb-star-border-beam')) {
      el.classList.add('rb-star-border-card');
      const beam = document.createElement('div');
      beam.className = 'rb-star-border-beam';
      el.appendChild(beam);
    }
  });
}

/**
 * Magnetic Button (React Bits standard)
 * Button subtly attracts toward the user cursor/finger.
 */
export function initMagneticButton(el, strength = 0.25) {
  if (!el) return;

  let bound = el.getBoundingClientRect();
  const onMove = (e) => {
    bound = el.getBoundingClientRect();
    const x = e.clientX - (bound.left + bound.width / 2);
    const y = e.clientY - (bound.top + bound.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const onLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1.1, 0.4)'
    });
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
}
