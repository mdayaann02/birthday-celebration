// src/components/flipBook.js - Landscape Editorial & Vogue Flipbook

import confetti from 'canvas-confetti';

export function initFlipBook(container, config) {
  const { magazine } = config;
  const reasons = magazine.reasons || [];

  // Break reasons into pages (e.g., 6 reasons per page)
  const page1Reasons = reasons.slice(0, 6);
  const page2Reasons = reasons.slice(6, 12);

  container.innerHTML = `
    <section class="magazine-section" id="magazineSection">
      <div class="section-tag">EDITORIAL ISSUE</div>
      <h2 class="section-heading">The Birthday Edition</h2>

      <div class="magazine-container">
        <div class="magazine-toolbar">
          <button class="tool-btn" id="btnAutoFlip">▶ AUTO FLIP</button>
          <button class="tool-btn" id="btnRotateView">ROTATE (16:9)</button>
          <button class="tool-btn" id="btnFilmShare">FILM & SHARE ✨</button>
        </div>

        <div class="book-wrap" id="bookWrap">
          <div class="book-spread" id="bookSpread">
            <!-- Left Editorial Page -->
            <div class="book-page-left">
              <div class="editorial-header">${magazine.coverTag || "LANDSCAPE EDITORIAL"}</div>
              <div class="editorial-chapter">${magazine.chapterTitle || "CHAPTER 01"}</div>
              <h3 class="editorial-title">${magazine.chapterHeading || "THINGS ABOUT SWEETY"}</h3>
              <div class="editorial-subtitle">${magazine.chapterSubheading || "GET TO KNOW MY SWEETEST GIRL & THE LOVE OF MY LIFE"}</div>
              
              <div class="editorial-img-box">
                <img id="editorialImg" src="${magazine.editorialPhoto || '/images/sunset.jpg'}" alt="Editorial" />
              </div>
              
              <p class="editorial-quote" id="editorialQuote">
                "${magazine.editorialQuote || 'Being with you makes every ordinary day feel like the sweetest dream come true.'}"
              </p>
            </div>

            <!-- Right Reasons Page -->
            <div class="book-page-right" id="reasonsPageContent">
              <div class="editorial-header">12 REASONS TO ADORE YOU</div>
              <div class="traits-list" id="traitsList">
                ${page1Reasons.map(r => `
                  <div class="trait-item">
                    <span class="trait-num">${r.num}.</span>
                    <span class="trait-name">${r.title}</span>
                    <div class="trait-desc">${r.desc}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Page turn navigation bar -->
        <div class="book-nav-bar">
          <button class="btn-book-nav" id="btnPrevPage">‹ PREV</button>
          <span class="page-counter" id="pageCounter">PAGE 1 / 2</span>
          <button class="btn-book-nav" id="btnNextPage">NEXT ›</button>
        </div>
      </div>
    </section>
  `;

  let currentPage = 1;
  let autoFlipTimer = null;
  let isRotated = false;

  const spread = document.getElementById("bookSpread");
  const traitsContainer = document.getElementById("traitsList");
  const counter = document.getElementById("pageCounter");
  const btnPrev = document.getElementById("btnPrevPage");
  const btnNext = document.getElementById("btnNextPage");
  const btnAuto = document.getElementById("btnAutoFlip");
  const btnRotate = document.getElementById("btnRotateView");
  const btnShare = document.getElementById("btnFilmShare");

  function renderPage(pageNum) {
    currentPage = pageNum;
    counter.textContent = `PAGE ${currentPage} / 2`;

    // 3D curl flip animation
    spread.style.transform = "scale(0.97) rotateY(4deg)";
    setTimeout(() => {
      spread.style.transform = "scale(1) rotateY(0deg)";
    }, 200);

    const activeList = currentPage === 1 ? page1Reasons : page2Reasons;
    traitsContainer.innerHTML = activeList.map(r => `
      <div class="trait-item">
        <span class="trait-num">${r.num}.</span>
        <span class="trait-name">${r.title}</span>
        <div class="trait-desc">${r.desc}</div>
      </div>
    `).join('');
  }

  btnPrev.addEventListener("click", () => {
    if (currentPage > 1) renderPage(1);
  });

  btnNext.addEventListener("click", () => {
    if (currentPage < 2) renderPage(2);
  });

  btnAuto.addEventListener("click", () => {
    if (autoFlipTimer) {
      clearInterval(autoFlipTimer);
      autoFlipTimer = null;
      btnAuto.classList.remove("active");
      btnAuto.textContent = "▶ AUTO FLIP";
    } else {
      btnAuto.classList.add("active");
      btnAuto.textContent = "⏸ STOP FLIP";
      autoFlipTimer = setInterval(() => {
        renderPage(currentPage === 1 ? 2 : 1);
      }, 3500);
    }
  });

  btnRotate.addEventListener("click", () => {
    isRotated = !isRotated;
    spread.style.transform = isRotated ? "perspective(1200px) rotateX(8deg)" : "none";
    btnRotate.classList.toggle("active", isRotated);
  });

  btnShare.addEventListener("click", () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  });
}
