// src/components/scratchCard.js - Luxury Golden Interactive Scratch Card

import confetti from 'canvas-confetti';

export function initScratchCard(container, config) {
  const { scratchCard, general } = config;

  container.innerHTML = `
    <section class="scratch-section" id="scratchSection">
      <div class="section-tag">A SECRET SURPRISE</div>
      <h2 class="section-heading">Scratch With Love</h2>

      <div class="scratch-card-wrapper" id="scratchCardWrapper">
        <!-- Content revealed beneath -->
        <div class="scratch-content-underneath">
          <div class="scratch-badge">${scratchCard.badge || "WISHING YOU THE BEST DAY 💛"}</div>
          <h3 class="scratch-title">${scratchCard.title || "Happy Birthday"} ${general.recipientName || ""}</h3>
          <p class="scratch-subtitle">${scratchCard.subtitle || "To the most beautiful soul, may your year ahead shine as brightly as your smile."}</p>
          <div class="scratch-secret">${scratchCard.hiddenSecret || "You make this world so much brighter! ✨"}</div>
        </div>

        <!-- Scratchable metallic gold foil canvas overlay -->
        <canvas class="scratch-canvas" id="scratchCanvas"></canvas>
      </div>

      <div class="scratch-hint">✨ Rub or scratch with your finger to peel the golden foil! ✨</div>
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
    const w = rect.width > 0 ? rect.width : (wrapper.parentElement?.clientWidth ? Math.min(wrapper.parentElement.clientWidth - 20, 440) : 340);
    const h = rect.height > 0 ? rect.height : 320;
    canvas.width = w;
    canvas.height = h;

    // Draw luxury metallic brushed gold
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#c59b27");
    grad.addColorStop(0.25, "#f9e79f");
    grad.addColorStop(0.5, "#d4af37");
    grad.addColorStop(0.75, "#fff2b2");
    grad.addColorStop(1, "#996515");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative foil pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 20, canvas.height);
      ctx.stroke();
    }

    // Golden embossed emblem
    ctx.fillStyle = "rgba(40, 28, 5, 0.85)";
    ctx.font = "bold 15px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("A special wish awaits you", canvas.width / 2, canvas.height / 2 + 16);
  }

  initCanvas();
  window.addEventListener("resize", () => {
    if (!scratchedCleaned) initCanvas();
  });

  if (typeof IntersectionObserver !== "undefined") {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !scratchedCleaned && canvas.width < 100) {
          initCanvas();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(wrapper);
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
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

      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) transparentCount++;
      }

      const sampleTotal = totalPixels / 16;
      const percent = (transparentCount / sampleTotal) * 100;

      if (percent > 38 && !scratchedCleaned) {
        scratchedCleaned = true;
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 500);

        // Confetti celebration
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#ff4d6d', '#ff758f', '#ffffff']
        });
      }
    } catch {
      // safe fallback
    }
  }

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
