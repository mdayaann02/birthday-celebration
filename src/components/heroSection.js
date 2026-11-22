// src/components/heroSection.js - Ultra-Luxury Hero with Atmospheric Canvas Particles & 3D Number

export function initHeroSection(container, config) {
  const { recipientName, age, heroTitle, heroSubtitle, heroBadge } = config.general;

  container.innerHTML = `
    <section class="hero-section" id="heroSection">
      <!-- Atmospheric Dynamic Particle & Ember Canvas -->
      <canvas class="hero-particle-canvas" id="heroParticleCanvas"></canvas>

      <!-- Floating Sky Lanterns -->
      <div class="lantern-container" id="lanternContainer"></div>
      
      <div class="hero-content">
        <div class="hero-royal-badge">
          <span class="badge-sparkle">✨</span>
          <span>${heroBadge || "CELEBRATING A QUEEN"}</span>
          <span class="badge-sparkle">✨</span>
        </div>

        <div class="hero-number-wrap">
          <div class="hero-crown-icon">👑</div>
          <div class="hero-number-3d" id="heroAge">${age || "15"}</div>
        </div>

        <h1 class="hero-title">${heroTitle || "Happy Birthday"} <span class="glow-name">${recipientName || "My Love"}</span></h1>
        <p class="hero-subtitle">${heroSubtitle || "To the most special girl in my universe ✨"}</p>
        
        <div class="scroll-indicator" id="scrollIndicator">
          <span>Explore The Journey</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>
    </section>
  `;

  // 1. Spawn Multi-Layer Realistic Floating Lanterns
  const lanternBox = document.getElementById("lanternContainer");
  const lanternCount = 24;

  for (let i = 0; i < lanternCount; i++) {
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    const posX = Math.random() * 96;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * 18;
    const scale = 0.45 + Math.random() * 0.75;
    const blur = Math.random() > 0.6 ? 1.5 : 0;

    lantern.style.setProperty("--pos-x", `${posX}%`);
    lantern.style.setProperty("--duration", `${duration}s`);
    lantern.style.setProperty("--delay", `${delay}s`);
    lantern.style.transform = `scale(${scale})`;
    if (blur > 0) lantern.style.filter = `blur(${blur}px)`;
    lanternBox.appendChild(lantern);
  }

  // 2. Interactive Golden Embers Canvas
  const canvas = document.getElementById("heroParticleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.5,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        pulsing: Math.random() * 0.02 + 0.01
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulsing) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${Math.max(0.1, Math.min(0.9, p.alpha))})`;
        ctx.shadowColor = "#ff758f";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // Scroll button
  document.getElementById("scrollIndicator").addEventListener("click", () => {
    const nextSec = document.getElementById("ribbonSection");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}
