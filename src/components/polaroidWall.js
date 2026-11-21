// src/components/polaroidWall.js - Interactive Polaroid Memory Wall with Realism & Butterflies

export function initPolaroidWall(container, config) {
  const polaroids = config.polaroids || [];

  container.innerHTML = `
    <section class="polaroid-section" id="polaroidSection">
      <!-- 3D Fluttering Butterflies -->
      <div class="butterfly-3d" style="top: 12%; left: 6%;">
        <div class="wing wing-left">🦋</div>
        <div class="wing wing-right">🦋</div>
      </div>
      <div class="butterfly-3d" style="top: 22%; right: 10%; animation-delay: -3.5s;">
        <div class="wing wing-left">🦋</div>
        <div class="wing wing-right">🦋</div>
      </div>
      <div class="butterfly-3d" style="bottom: 18%; left: 16%; animation-delay: -7s;">
        <div class="wing wing-left">🦋</div>
        <div class="wing wing-right">🦋</div>
      </div>
      <div class="butterfly-3d" style="bottom: 14%; right: 20%; animation-delay: -5s;">
        <div class="wing wing-left">🦋</div>
        <div class="wing wing-right">🦋</div>
      </div>

      <div class="section-tag">POLAROID MEMORY VAULT</div>
      <h2 class="section-heading">Pinned With All My Heart</h2>
      
      <div class="polaroid-grid" id="polaroidGrid">
        ${polaroids.map((item, idx) => `
          <div class="polaroid-item" data-index="${idx}" style="--rotate-deg: ${item.angle || (idx % 2 === 0 ? -3.5 : 3.5)}deg;">
            <!-- Realistic 3D Heart Pin -->
            <div class="heart-pin-3d"></div>
            
            <!-- Diagonal Washi Tape -->
            <div class="washi-tape ${idx % 2 === 0 ? 'washi-left' : 'washi-right'}"></div>

            <div class="polaroid-photo">
              <img src="${item.image || '/images/beautiful.jpg'}" alt="${item.title}" loading="lazy" />
              <div class="photo-sheen"></div>
            </div>
            <div class="polaroid-caption">${item.title || 'Special Memory'}</div>
            <div class="polaroid-tap-hint">tap to read note 💌</div>
          </div>
        `).join('')}
      </div>

      <!-- Luxury Frosted Note Modal Dialog -->
      <div class="modal-overlay" id="polaroidModal">
        <div class="polaroid-note-card">
          <div class="note-header">
            <span class="note-badge" id="modalBadge">N° 01</span>
            <button class="btn-close-note" id="btnCloseModal">✕ CLOSE</button>
          </div>
          <p class="note-content" id="modalText"></p>
          <div class="note-footer">
            <span class="note-seal">FOREVER YOURS ❤️</span>
          </div>
        </div>
      </div>
    </section>
  `;

  const modal = document.getElementById("polaroidModal");
  const modalBadge = document.getElementById("modalBadge");
  const modalText = document.getElementById("modalText");
  const btnClose = document.getElementById("btnCloseModal");

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

  btnClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}
