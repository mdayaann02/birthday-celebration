// src/components/polaroidWall.js - Interactive Polaroid Memory Wall with Note Modal

export function initPolaroidWall(container, config) {
  const polaroids = config.polaroids || [];

  container.innerHTML = `
    <section class="polaroid-section" id="polaroidSection">
      <!-- Animated Butterflies -->
      <div class="butterfly" style="top: 15%; left: 8%;">🦋</div>
      <div class="butterfly" style="top: 25%; right: 12%; animation-delay: -3s;">🦋</div>
      <div class="butterfly" style="bottom: 20%; left: 22%; animation-delay: -6s;">🦋</div>
      <div class="butterfly" style="bottom: 15%; right: 28%; animation-delay: -4.5s;">🦋</div>

      <div class="section-tag">POLAROID SNAPS</div>
      <h2 class="section-heading">Pinned With All My Love</h2>
      
      <div class="polaroid-grid" id="polaroidGrid">
        ${polaroids.map((item, idx) => `
          <div class="polaroid-item" data-index="${idx}" style="--rotate-deg: ${item.angle || (idx % 2 === 0 ? -3 : 3)}deg;">
            <div class="heart-pin"></div>
            <div class="polaroid-photo">
              <img src="${item.image || '/images/beautiful.jpg'}" alt="${item.title}" loading="lazy" />
            </div>
            <div class="polaroid-caption">${item.title || 'Special Memory'}</div>
          </div>
        `).join('')}
      </div>

      <!-- Note Modal Dialog -->
      <div class="modal-overlay" id="polaroidModal">
        <div class="polaroid-note-card">
          <div class="note-header">
            <span class="note-badge" id="modalBadge">N° 01</span>
            <button class="btn-close-note" id="btnCloseModal">CLOSE ✕</button>
          </div>
          <p class="note-content" id="modalText"></p>
        </div>
      </div>
    </section>
  `;

  const modal = document.getElementById("polaroidModal");
  const modalBadge = document.getElementById("modalBadge");
  const modalText = document.getElementById("modalText");
  const btnClose = document.getElementById("btnCloseModal");

  // Open note card on click
  container.querySelectorAll(".polaroid-item").forEach((elem) => {
    elem.addEventListener("click", () => {
      const idx = parseInt(elem.getAttribute("data-index"), 10);
      const data = polaroids[idx];
      if (!data) return;

      modalBadge.textContent = data.noteBadge || `N° 0${idx + 1}`;
      modalText.textContent = data.note || "You bring endless joy and warmth into my life.";
      modal.classList.add("active");
    });
  });

  // Close modal
  btnClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}
