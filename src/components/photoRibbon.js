// src/components/photoRibbon.js - 3D Looping Photo Rollercoaster Ribbon

export function initPhotoRibbon(container, config) {
  const photos = config.photoRibbon || [];

  container.innerHTML = `
    <section class="ribbon-section" id="ribbonSection">
      <div class="section-tag">A JOURNEY OF MEMORIES</div>
      <h2 class="section-heading">The Rollercoaster of Us</h2>
      
      <div class="rollercoaster-wrap">
        <canvas class="ribbon-loop-canvas" id="ribbonCanvas" width="1000" height="420"></canvas>
      </div>
      <div class="ribbon-hint">✨ Drag left or right to glide along the loop ✨</div>
    </section>
  `;

  const canvas = document.getElementById("ribbonCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Preload images
  const loadedImages = [];
  photos.forEach((item, idx) => {
    const img = new Image();
    img.src = item.url;
    loadedImages.push({ img, caption: item.caption || `Memory ${idx + 1}` });
  });

  // Ribbon state
  let angleOffset = 0;
  let targetAngleOffset = 0;
  let isDragging = false;
  let lastX = 0;
  let velocity = 0;

  // Responsive canvas size
  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
  }
  resize();
  window.addEventListener("resize", resize);

  // Drag interaction
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    velocity = 0;
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    targetAngleOffset += dx * 0.006;
    velocity = dx * 0.006;
  });
  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch support
  canvas.addEventListener("touchstart", (e) => {
    isDragging = true;
    lastX = e.touches[0].clientX;
    velocity = 0;
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - lastX;
    lastX = e.touches[0].clientX;
    targetAngleOffset += dx * 0.008;
    velocity = dx * 0.008;
  }, { passive: true });
  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  // 3D curve: Parametric loop (figure-8 / loop-the-loop ribbon)
  function getPointOnRibbon(t) {
    // t from 0 to 2*PI
    const w = canvas.width;
    const h = canvas.height;
    const centerX = w * 0.5;
    const centerY = h * 0.52;
    const rx = w * 0.38;
    const ry = h * 0.32;

    // Loop-the-loop curve (Lemniscate / Rollercoaster loop)
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    const x = centerX + rx * cosT;
    const y = centerY + ry * (sinT * Math.cos(t * 0.5));
    const z = rx * sinT; // depth

    return { x, y, z };
  }

  function render() {
    // Smooth dampening
    if (!isDragging) {
      targetAngleOffset += 0.003; // gentle auto drift
      targetAngleOffset += velocity;
      velocity *= 0.94;
    }
    angleOffset += (targetAngleOffset - angleOffset) * 0.1;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw glowing ribbon track
    ctx.beginPath();
    const steps = 140;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2 + angleOffset;
      const pt = getPointOnRibbon(t);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = "rgba(255, 77, 109, 0.25)";
    ctx.lineWidth = 14 * (window.devicePixelRatio || 1);
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
    ctx.stroke();

    // Prepare cards along the curve
    const totalCards = loadedImages.length || 8;
    const cardData = [];

    for (let i = 0; i < totalCards; i++) {
      const t = (i / totalCards) * Math.PI * 2 + angleOffset;
      const pt = getPointOnRibbon(t);
      cardData.push({
        idx: i,
        x: pt.x,
        y: pt.y,
        z: pt.z,
        angle: t,
        item: loadedImages[i % loadedImages.length]
      });
    }

    // Sort by depth (Z-buffer) so further cards draw first
    cardData.sort((a, b) => a.z - b.z);

    const cardBaseW = 68 * (window.devicePixelRatio || 1);
    const cardBaseH = 88 * (window.devicePixelRatio || 1);

    cardData.forEach(card => {
      // Perspective scale factor
      const scale = 0.75 + ((card.z + 300) / 600) * 0.45;
      const cw = cardBaseW * scale;
      const ch = cardBaseH * scale;

      ctx.save();
      ctx.translate(card.x, card.y);

      // Card shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 12 * scale;
      ctx.shadowOffsetY = 6 * scale;

      // Card background (Polaroid / Film frame style)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 4);
      ctx.fill();

      ctx.shadowColor = "transparent";

      // Draw photo
      if (card.item && card.item.img && card.item.img.complete && card.item.img.naturalWidth > 0) {
        const pad = 4 * scale;
        const photoH = ch * 0.72;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(-cw / 2 + pad, -ch / 2 + pad, cw - pad * 2, photoH, 2);
        ctx.clip();
        ctx.drawImage(card.item.img, -cw / 2 + pad, -ch / 2 + pad, cw - pad * 2, photoH);
        ctx.restore();
      } else {
        // Fallback placeholder pattern
        ctx.fillStyle = "#ff758f";
        ctx.fillRect(-cw / 2 + 4, -ch / 2 + 4, cw - 8, ch * 0.72);
      }

      // Small caption text
      ctx.fillStyle = "#333";
      ctx.font = `${Math.max(8, Math.round(9 * scale))}px 'Inter', sans-serif`;
      ctx.textAlign = "center";
      const caption = card.item ? card.item.caption : `Moment`;
      ctx.fillText(caption.substring(0, 14), 0, ch / 2 - 5 * scale);

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
