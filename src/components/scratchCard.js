// src/components/scratchCard.js - Interactive Scratch-off Birthday Card

import confetti from 'canvas-confetti';

export function initScratchCard(container, config) {
  const { scratchCard, general } = config;

  container.innerHTML = `
    <section class="scratch-section" id="scratchSection">
      <div class="section-tag">A HIDDEN SURPRISE</div>
      <h2 class="section-heading">Scratch For Your Birthday Wish</h2>

      <div class="scratch-card-wrapper" id="scratchCardWrapper">
        <!-- Content revealed beneath -->
        <div class="scratch-content-underneath">
          <div class="scratch-badge">${scratchCard.badge || "WISHING YOU THE BEST DAY 💛"}</div>
          <h3 class="scratch-title">${scratchCard.title || "Happy Birthday"} ${general.recipientName || "Sweety"}</h3>
          <p class="scratch-subtitle">${scratchCard.subtitle || "To the most beautiful soul, may your year ahead shine as brightly as your smile."}</p>
          <div class="scratch-secret">${scratchCard.hiddenSecret || "You make this world so much brighter! ✨"}</div>
        </div>

        <!-- Scratchable foil canvas overlay -->
        <canvas class="scratch-canvas" id="scratchCanvas"></canvas>
      </div>

      <div class="scratch-hint">👆 Rub or scratch the card with your finger/cursor to reveal!</div>
    </section>
  `;

  const canvas = document.getElementById("scratchCanvas");
  const wrapper = document.getElementById("scratchCardWrapper");
  if (!canvas || !wrapper) return;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  let isScratching = false;
  let scratchedCleaned = false;

  function initCanvas() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw shimmering golden foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.3, "#f9e79f");
    grad.addColorStop(0.5, "#d4af37");
    grad.addColorStop(0.8, "#fcf3cf");
    grad.addColorStop(1, "#b7950b");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle golden sparkle text on the foil
    ctx.fillStyle = "rgba(60, 45, 10, 0.75)";
    ctx.font = "bold 16px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH HERE WITH LOVE ✨", canvas.width / 2, canvas.height / 2);
  }

  initCanvas();
  window.addEventListener("resize", () => {
    if (!scratchedCleaned) initCanvas();
  });

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkPercentScratched();
  }

  let lastCheck = 0;
  function checkPercentScratched() {
    const now = Date.now();
    if (now - lastCheck < 250 || scratchedCleaned) return;
    lastCheck = now;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      // Sample every 16th pixel for speed
      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) transparentCount++;
      }

      const sampleTotal = totalPixels / 16;
      const percent = (transparentCount / sampleTotal) * 100;

      if (percent > 40 && !scratchedCleaned) {
        scratchedCleaned = true;
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 500);

        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch {
      // In case of cross-origin or canvas security issue
    }
  }

  // Pointer events
  function handleMove(e) {
    if (!isScratching || scratchedCleaned) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    scratch(x, y);
  }

  canvas.addEventListener("mousedown", (e) => {
    isScratching = true;
    handleMove(e);
  });
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", () => { isScratching = false; });

  canvas.addEventListener("touchstart", (e) => {
    isScratching = true;
    handleMove(e);
  }, { passive: true });
  window.addEventListener("touchmove", handleMove, { passive: true });
  window.addEventListener("touchend", () => { isScratching = false; });
}
