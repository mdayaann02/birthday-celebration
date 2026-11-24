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

  // Only allow early review if authenticated in session storage
  if (sessionStorage.getItem("maker_review_unlocked") === "true") {
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

      <!-- Secure Creator Early Review Authentication Modal -->
      <div id="makerAuthModal" style="display:none; position:fixed; inset:0; background:rgba(2,6,23,0.85); backdrop-filter:blur(10px); z-index:999999; align-items:center; justify-content:center; padding:16px;">
        <div style="background:#0f172a; border:1.5px solid rgba(245,158,11,0.5); border-radius:20px; max-width:350px; width:100%; padding:24px 20px; box-shadow:0 16px 40px rgba(0,0,0,0.8); text-align:center; box-sizing:border-box;">
          <div style="font-size:32px; margin-bottom:8px;">🔐</div>
          <h3 style="margin:0 0 6px 0; color:#fbbf24; font-size:17px; font-weight:800;">Creator Passcode Required</h3>
          <p style="margin:0 0 16px 0; font-size:12px; color:#94a3b8; line-height:1.45;">
            Surprise is locked until event countdown ends. Enter the secret Editor Passcode to unlock early review.
          </p>
          <div style="margin-bottom:14px; text-align:left;">
            <label style="display:block; font-size:11px; font-weight:700; color:#cbd5e1; margin-bottom:6px;">Secret Editor Passcode</label>
            <input type="password" id="inpReviewPasscode" placeholder="••••" autocomplete="off" style="width:100%; box-sizing:border-box; padding:12px 14px; border-radius:12px; background:#1e293b; border:1.5px solid rgba(245,158,11,0.5); color:#fff; font-size:16px; letter-spacing:4px; text-align:center;" />
            <div id="reviewPassError" style="display:none; color:#f87171; font-size:11.5px; margin-top:8px; font-weight:700;">❌ Incorrect passcode! Access denied.</div>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" id="btnSubmitReviewPass" style="flex:1; background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; font-weight:800; font-size:13px; padding:11px 14px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 4px 14px rgba(245,158,11,0.3);">
              Unlock Review 🔓
            </button>
            <button type="button" id="btnCancelReviewPass" style="background:#334155; color:#94a3b8; font-weight:700; font-size:13px; padding:11px 16px; border-radius:12px; border:none; cursor:pointer;">
              Cancel
            </button>
          </div>
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

  // Theatrical 3D Velvet Curtains Opening Animation
  function playCurtainsReveal(onFinish) {
    clearInterval(timerInterval);

    // Multi-burst celebration confetti
    confetti({ particleCount: 130, spread: 85, origin: { y: 0.5 } });
    setTimeout(() => {
      confetti({ particleCount: 160, spread: 110, origin: { y: 0.6 } });
    }, 350);

    const overlay = document.createElement("div");
    overlay.className = "curtains-stage-overlay";
    overlay.id = "curtainsStageOverlay";
    overlay.innerHTML = `
      <div class="curtain-pelmet"></div>
      <div class="curtain-panel curtain-left">
        <div class="curtain-tassel"></div>
      </div>
      <div class="curtain-panel curtain-right">
        <div class="curtain-tassel"></div>
      </div>
      <div class="curtain-center-badge">
        <div class="badge-icon">🎉</div>
        <div class="badge-title">The Moment Has Arrived! ✨</div>
        <div class="badge-sub">Unfolding your romantic surprise celebration...</div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Unseal and mount website underneath so it is completely ready when curtains part
    if (onFinish) onFinish();

    // Trigger smooth theatrical drawing open after anticipation delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.classList.add("curtains-open");
      }, 450);
    });

    // Fade out and remove curtain stage
    setTimeout(() => {
      overlay.classList.add("fade-out");
      setTimeout(() => {
        overlay.remove();
      }, 850);
    }, 2700);
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
      playCurtainsReveal(() => {
        onUnlock(false);
      });
      return;
    }

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / 1000 / 60) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    const dEl = elDays || document.getElementById("cdDays");
    const hEl = elHours || document.getElementById("cdHours");
    const mEl = elMins || document.getElementById("cdMins");
    const sEl = elSecs || document.getElementById("cdSecs");

    if (dEl) dEl.textContent = d < 10 ? `0${d}` : d;
    if (hEl) hEl.textContent = h < 10 ? `0${h}` : h;
    if (mEl) mEl.textContent = m < 10 ? `0${m}` : m;
    if (sEl) sEl.textContent = s < 10 ? `0${s}` : s;
  }

  updateClock();
  const timerInterval = setInterval(updateClock, 1000);

  // Secure Maker Review Authentication Modal Handlers
  const authModal = document.getElementById("makerAuthModal");
  const inpPass = document.getElementById("inpReviewPasscode");
  const errPass = document.getElementById("reviewPassError");
  const btnSubmit = document.getElementById("btnSubmitReviewPass");
  const btnCancel = document.getElementById("btnCancelReviewPass");

  function openReviewAuthModal() {
    if (authModal) {
      authModal.style.display = "flex";
      if (errPass) errPass.style.display = "none";
      if (inpPass) {
        inpPass.value = "";
        inpPass.style.borderColor = "rgba(245,158,11,0.5)";
        setTimeout(() => inpPass.focus(), 120);
      }
    }
  }

  function handleVerifyPasscode() {
    const entered = (inpPass?.value || "").trim();
    const correctPass = String(data.passcode || "1234").trim();

    if (entered.length > 0 && entered === correctPass) {
      sessionStorage.setItem("maker_review_unlocked", "true");
      if (authModal) authModal.style.display = "none";
      clearInterval(timerInterval);
      playCurtainsReveal(() => {
        onUnlock(true);
      });
    } else {
      if (errPass) {
        errPass.style.display = "block";
        errPass.textContent = "❌ Incorrect passcode! Access denied.";
      }
      if (inpPass) {
        inpPass.style.borderColor = "#ef4444";
        inpPass.focus();
        inpPass.select();
      }
    }
  }

  btnSubmit?.addEventListener("click", handleVerifyPasscode);
  inpPass?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleVerifyPasscode();
  });
  btnCancel?.addEventListener("click", () => {
    if (authModal) authModal.style.display = "none";
  });
  document.getElementById("btnMakerReview")?.addEventListener("click", openReviewAuthModal);

  // If visitor navigated with ?review=true or #review=true, open authentication modal for creator
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash || "";
  if (urlParams.get("review") === "true" || hash.includes("review=true")) {
    openReviewAuthModal();
  }
}
