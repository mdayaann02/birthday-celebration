// src/studio/shareModal.js - Share & Export Modal with Backend Short Link Support

import confetti from 'canvas-confetti';
import { encodeSiteToUrl, publishSiteToServer } from '../models/siteStorage.js';

export async function openShareModal(templateId, data) {
  let recipientUrl = encodeSiteToUrl(templateId, data);
  let makerReviewUrl = `${recipientUrl}&review=true`;

  // Try saving to backend for clean short URL if available
  const serverResult = await publishSiteToServer(templateId, data);
  if (serverResult && serverResult.fullUrl) {
    recipientUrl = serverResult.fullUrl;
    makerReviewUrl = `${recipientUrl}?review=true`;
  }

  const existing = document.getElementById("shareModalOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "shareModalOverlay";
  overlay.className = "share-modal-overlay";
  overlay.innerHTML = `
    <div class="share-modal-card">
      <div class="share-modal-header">
        <h3 class="share-modal-title">🎉 Your Website is Ready!</h3>
        <button class="btn-close-modal" id="btnCloseShareModal">&times;</button>
      </div>

      <div class="share-modal-body">
        <p class="share-info-text">
          Share this link with <strong>${data.recipientName || 'your special person'}</strong>. 
          ${data.enableCountdownLock ? `It is locked with a real-time countdown until <strong>${new Date(data.eventDate).toLocaleDateString()}</strong>!` : 'It will open immediately!'}
        </p>

        <!-- Recipient Link -->
        <div class="share-link-group">
          <label class="share-link-label">🎁 Recipient Link (Locked with Countdown)</label>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpRecipientUrl" value="${recipientUrl}" />
            <button class="btn-copy-link" id="btnCopyRecipient">Copy</button>
          </div>
        </div>

        <!-- Maker Review Link -->
        <div class="share-link-group">
          <label class="share-link-label">👁️ Maker Review Link (Bypasses Lock for Preview)</label>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="${makerReviewUrl}" />
            <button class="btn-copy-link" id="btnCopyMaker">Copy</button>
          </div>
          <div class="share-sub-hint">Use this link to verify your creation before sending it! (Passcode: ${data.passcode || '1234'})</div>
        </div>

        <div class="share-action-buttons">
          <a href="${makerReviewUrl}" target="_blank" class="btn-open-preview">
            🚀 Open & Test in New Tab
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.6 }
  });

  // Event handlers
  overlay.querySelector('#btnCloseShareModal')?.addEventListener('click', () => {
    overlay.remove();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  function copyText(inputElem, btnElem) {
    inputElem.select();
    navigator.clipboard.writeText(inputElem.value).then(() => {
      const orig = btnElem.textContent;
      btnElem.textContent = "Copied! ✓";
      setTimeout(() => { btnElem.textContent = orig; }, 2000);
    });
  }

  overlay.querySelector('#btnCopyRecipient')?.addEventListener('click', function() {
    copyText(overlay.querySelector('#inpRecipientUrl'), this);
  });
  overlay.querySelector('#btnCopyMaker')?.addEventListener('click', function() {
    copyText(overlay.querySelector('#inpMakerUrl'), this);
  });
}
