// src/components/heroSection.js - Hero Section with Floating Lanterns & 3D Number

export function initHeroSection(container, config) {
  const { recipientName, age, heroTitle, heroSubtitle } = config.general;

  container.innerHTML = `
    <section class="hero-section" id="heroSection">
      <div class="lantern-container" id="lanternContainer"></div>
      
      <div class="hero-content">
        <div class="hero-pretitle">CELEBRATING SOMEONE SPECIAL</div>
        <div class="hero-number-3d" id="heroAge">${age || "15"}</div>
        <h1 class="hero-title">${heroTitle || "Happy Birthday"} ${recipientName || "Sweety"}</h1>
        <p class="hero-subtitle">${heroSubtitle || "To the most special girl in my universe ✨"}</p>
        
        <div class="scroll-indicator" id="scrollIndicator">
          <span>Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>
    </section>
  `;

  // Spawn lanterns
  const lanternBox = document.getElementById("lanternContainer");
  const lanternCount = 20;

  for (let i = 0; i < lanternCount; i++) {
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    const posX = Math.random() * 95;
    const duration = 12 + Math.random() * 14;
    const delay = Math.random() * 16;
    const scale = 0.5 + Math.random() * 0.7;

    lantern.style.setProperty("--pos-x", `${posX}%`);
    lantern.style.setProperty("--duration", `${duration}s`);
    lantern.style.setProperty("--delay", `${delay}s`);
    lantern.style.transform = `scale(${scale})`;
    lanternBox.appendChild(lantern);
  }

  // Scroll button
  document.getElementById("scrollIndicator").addEventListener("click", () => {
    const nextSec = document.getElementById("ribbonSection");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}
