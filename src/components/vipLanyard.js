// src/components/vipLanyard.js - Interactive 3D Swinging VIP Pass Lanyard

export function initVipLanyard(container, config) {
  const { vipLanyard } = config;

  container.innerHTML = `
    <section class="lanyard-section" id="lanyardSection">
      <div class="section-tag">SPECIAL VIP ACCESS</div>
      <h2 class="section-heading">Your All-Access Pass</h2>

      <div class="lanyard-container" id="lanyardContainer">
        <!-- Hanging strap -->
        <div class="lanyard-strap" id="lanyardStrap">
          <div class="lanyard-clasp"></div>
        </div>

        <!-- 3D Badge Card -->
        <div class="vip-badge-card" id="vipBadgeCard">
          <div class="vip-badge-header">${vipLanyard.badgeType || "ALL-ACCESS VIP PASS"}</div>
          
          <div class="vip-badge-img">
            <img src="${vipLanyard.photo || '/images/always_you.jpg'}" alt="VIP Photo" />
          </div>

          <div class="vip-recipient-name">${vipLanyard.recipient || "SPECIAL VIP"}</div>
          <div class="vip-access-level">${vipLanyard.accessLevel || "LEVEL: UNLIMITED LOVE & HAPPINESS"}</div>

          <div class="vip-barcode">
            <div class="barcode-lines"></div>
            <div class="barcode-text">${vipLanyard.barcodeNum || "SW-BDAY-2026-9999"}</div>
          </div>
        </div>
      </div>
    </section>
  `;

  const badge = document.getElementById("vipBadgeCard");
  const strap = document.getElementById("lanyardStrap");
  const containerElem = document.getElementById("lanyardContainer");
  if (!badge || !strap || !containerElem) return;

  let currentRotX = 0;
  let currentRotY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let isInteracting = false;

  function updateTransform() {
    currentRotX += (targetRotX - currentRotX) * 0.1;
    currentRotY += (targetRotY - currentRotY) * 0.1;

    badge.style.transform = `perspective(1000px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${currentRotY * 0.3}deg)`;
    strap.style.transform = `perspective(1000px) rotateZ(${currentRotY * 0.4}deg)`;

    // Natural swing decay
    if (!isInteracting) {
      targetRotX *= 0.95;
      targetRotY *= 0.95;
    }

    requestAnimationFrame(updateTransform);
  }

  requestAnimationFrame(updateTransform);

  function handlePointerMove(clientX, clientY) {
    const rect = badge.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const diffX = clientX - centerX;
    const diffY = clientY - centerY;

    targetRotY = Math.max(-28, Math.min(28, (diffX / 10)));
    targetRotX = Math.max(-25, Math.min(25, (-diffY / 10)));
  }

  containerElem.addEventListener("mousemove", (e) => {
    isInteracting = true;
    handlePointerMove(e.clientX, e.clientY);
  });

  containerElem.addEventListener("mouseleave", () => {
    isInteracting = false;
  });

  containerElem.addEventListener("touchmove", (e) => {
    isInteracting = true;
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  containerElem.addEventListener("touchend", () => {
    isInteracting = false;
  });
}
