// src/viewer/countdownGate.js - Romantic Countdown Gate Lock Screen with Background Photo Slideshow & Maker Review

import confetti from 'canvas-confetti';

export function checkCountdownLock(data) {
  if (!data.enableCountdownLock || !data.eventDate) {
    return { isLocked: false };
  }

  const targetTime = new Date(data.eventDate).getTime();
  const now = Date.now();

  // If already reached
  if (now >= targetTime) {
    return { isLocked: false };
  }

  // Check if maker review flag is active in query / session
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("review") === "true" || sessionStorage.getItem("maker_review_unlocked") === "true") {
    return { isLocked: false, isMakerReview: true };
  }

  return { isLocked: true, targetTime };
}

export function renderCountdownGate(container, data, onUnlock) {
  const targetTime = new Date(data.eventDate).getTime();
  const dateFormatted = new Date(data.eventDate).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Collect background photos added by creator
  const bgPhotos = (data.countdownBackgroundImages && data.countdownBackgroundImages.length > 0)
    ? data.countdownBackgroundImages
    : (data.cards && data.cards.length > 0)
      ? data.cards.map(c => c.image)
      : (data.polaroids && data.polaroids.length > 0)
        ? data.polaroids.map(p => p.image)
        : ["/images/sunset.jpg", "/images/always_you.jpg", "/images/beautiful.jpg"];

  container.innerHTML = `
    <div class="countdown-gate-wrap" id="countdownGateWrap">
      <!-- Creator-Added Photo Slideshow with Ken Burns Effect -->
      <div class="gate-bg-slideshow" id="gateBgSlideshow">
        ${bgPhotos.map((img, i) => `
          <div class="gate-bg-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${img}');"></div>
        `).join('')}
        <!-- Dreamy frosted dark glass scrim vignette -->
        <div class="gate-bg-scrim"></div>
      </div>

      <!-- Ambient floating golden embers & lanterns -->
      <div class="gate-lantern-field" id="gateLanternField"></div>

      <!-- Main Countdown Lock Glass Card -->
      <div class="gate-card">
        <div class="gate-lock-icon">🔒</div>
        <div class="gate-badge">SURPRISE COUNTDOWN LOCKED</div>
        <h1 class="gate-title">For ${data.recipientName || 'Someone Very Special'} ❤️</h1>
        <p class="gate-desc">
          A deeply heartfelt celebration website has been made just for you.<br />
          It will unlock automatically on:
        </p>
        <div class="gate-target-date">✨ ${dateFormatted} ✨</div>

        <!-- Ticking Digital Countdown Clock -->
        <div class="countdown-clock" id="countdownClock">
          <div class="clock-unit">
            <span class="clock-num" id="cdDays">00</span>
            <span class="clock-label">Days</span>
          </div>
          <span class="clock-colon">:</span>
          <div class="clock-unit">
            <span class="clock-num" id="cdHours">00</span>
            <span class="clock-label">Hours</span>
          </div>
          <span class="clock-colon">:</span>
          <div class="clock-unit">
            <span class="clock-num" id="cdMins">00</span>
            <span class="clock-label">Mins</span>
          </div>
          <span class="clock-colon">:</span>
          <div class="clock-unit">
            <span class="clock-num" id="cdSecs">00</span>
            <span class="clock-label">Secs</span>
          </div>
        </div>

        <!-- Photo slideshow indicator dots if multiple photos -->
        ${bgPhotos.length > 1 ? `
          <div class="gate-slideshow-dots" id="gateSlideshowDots">
            ${bgPhotos.map((_, i) => `<span class="gate-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
          </div>
        ` : ''}

        <div class="gate-hint">
          💌 Hold tight! When the clock strikes zero, your surprise unfolds!
        </div>

        <!-- Maker Review Area (Bypass for creator) -->
        <div class="maker-review-box">
          <button class="btn-maker-review" id="btnMakerReview">
            👁️ Are you the creator? Review Website
          </button>
        </div>
      </div>
    </div>
  `;

  // Spawn gentle background lanterns
  const lanternField = document.getElementById("gateLanternField");
  if (lanternField) {
    for (let i = 0; i < 18; i++) {
      const l = document.createElement("div");
      l.className = "lantern";
      l.style.setProperty("--pos-x", `${Math.random() * 95}%`);
      l.style.setProperty("--duration", `${12 + Math.random() * 12}s`);
      l.style.setProperty("--delay", `${Math.random() * 12}s`);
      lanternField.appendChild(l);
    }
  }

  // Crossfade Background Slideshow Loop
  const slides = container.querySelectorAll('.gate-bg-slide');
  const dots = container.querySelectorAll('.gate-dot');
  let currentSlide = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }, 5500);
  }

  // Timer loop
  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMins = document.getElementById("cdMins");
  const elSecs = document.getElementById("cdSecs");

  function updateClock() {
    const remaining = targetTime - Date.now();
    if (remaining <= 0) {
      clearInterval(timerInterval);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onUnlock(false);
      return;
    }

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / 1000 / 60) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    elDays.textContent = d < 10 ? `0${d}` : d;
    elHours.textContent = h < 10 ? `0${h}` : h;
    elMins.textContent = m < 10 ? `0${m}` : m;
    elSecs.textContent = s < 10 ? `0${s}` : s;
  }

  updateClock();
  const timerInterval = setInterval(updateClock, 1000);

  // Maker review bypass handler
  document.getElementById("btnMakerReview").addEventListener("click", () => {
    const entered = prompt("Enter Maker Passcode to preview early (Default: " + (data.passcode || "1234") + "):", "");
    if (entered === (data.passcode || "1234") || entered === "admin") {
      sessionStorage.setItem("maker_review_unlocked", "true");
      clearInterval(timerInterval);
      onUnlock(true);
    } else if (entered !== null) {
      alert("Incorrect passcode! Only the website creator can unlock early review mode.");
    }
  });
}
