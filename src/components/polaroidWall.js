// src/components/polaroidWall.js - Interactive Polaroid Memory Wall with Realism & Butterflies
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';

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
            <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 6px auto 2px auto; background:rgba(0,0,0,0.7); color:#fff; border:1px solid rgba(255,255,255,0.3); padding:4px 12px; border-radius:14px; font-size:10px; font-weight:700; cursor:pointer;">
              📸 Save Keepsake
            </button>
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

  // Medium Zoom
  try {
    mediumZoom(container.querySelectorAll(".polaroid-photo img"), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  // Keepsake download
  container.querySelectorAll(".btn-download-polaroid").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".polaroid-item");
      if (!card) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Rendering...';
      btn.style.opacity = '0.7';

      html2canvas(card, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `polaroid-memory-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved!';
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 }
        });
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.opacity = '1';
        }, 2200);
      }).catch(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
      });
    });
  });
}
