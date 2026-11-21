// src/studio/shareModal.js - Share & Export Modal (100% Error-Free & WhatsApp Ready)

import confetti from 'canvas-confetti';
import { encodeSiteToUrl } from '../models/siteStorage.js';

export function openShareModal(templateId, data) {
  const recipientUrl = encodeSiteToUrl(templateId, data, false);
  const makerReviewUrl = encodeSiteToUrl(templateId, data, true);

  const existing = document.getElementById("shareModalOverlay");
  if (existing) existing.remove();

  const recipientName = data.recipientName || 'Someone Special';
  const isLocked = Boolean(data.enableCountdownLock && data.eventDate);
  const dateStr = isLocked ? new Date(data.eventDate).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  const overlay = document.createElement("div");
  overlay.id = "shareModalOverlay";
  overlay.className = "share-modal-overlay";
  overlay.innerHTML = `
    <div class="share-modal-card">
      <div class="share-modal-header">
        <h3 class="share-modal-title">🎉 Your Website is Ready!</h3>
        <button class="btn-close-modal" id="btnCloseShareModal" aria-label="Close">&times;</button>
      </div>

      <div class="share-modal-body">
        <p class="share-info-text">
          Share this link with <strong>${recipientName}</strong>. 
          ${isLocked ? `It is locked with a romantic countdown until <strong>${dateStr}</strong>!` : 'It will open immediately with your music & animations!'}
        </p>

        <!-- Recipient Link -->
        <div class="share-link-group">
          <label class="share-link-label">🎁 Recipient Link ${isLocked ? '(Locked with Countdown)' : '(Direct Celebration)'}</label>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpRecipientUrl" value="${recipientUrl}" />
            <button class="btn-copy-link" id="btnCopyRecipient">Copy</button>
          </div>
          <div class="share-quick-actions" style="margin-top:10px; display:flex; gap:8px;">
            <button type="button" class="btn-share-whatsapp" id="btnShareWhatsapp" style="background:#25D366; color:#fff; border:none; padding:9px 16px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);">
              💬 Share on WhatsApp
            </button>
          </div>
        </div>

        <!-- Maker Review Link -->
        <div class="share-link-group" style="margin-top:18px;">
          <label class="share-link-label">👁️ Maker Review Link (Bypasses Lock for Testing)</label>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="${makerReviewUrl}" />
            <button class="btn-copy-link" id="btnCopyMaker">Copy</button>
          </div>
          <div class="share-sub-hint" style="margin-top:4px; font-size:11px; color:#888;">
            Use this link to verify your website before sending it! (Maker Passcode: <strong>${data.passcode || '1234'}</strong>)
          </div>
        </div>

        <div class="share-action-buttons" style="margin-top:20px; display:flex; gap:10px; justify-content:flex-end;">
          <a href="${makerReviewUrl}" target="_blank" class="btn-open-preview" style="display:inline-flex; align-items:center; gap:6px;">
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

  function showSuccess(btnElem) {
    const orig = btnElem.textContent;
    btnElem.textContent = "Copied! ✓";
    btnElem.style.background = "#22c55e";
    btnElem.style.color = "#fff";
    setTimeout(() => {
      btnElem.textContent = orig;
      btnElem.style.background = "";
      btnElem.style.color = "";
    }, 2000);
  }

  function fallbackCopy(text, btnElem) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showSuccess(btnElem);
    } catch {
      alert("Please copy the link directly from the input box.");
    }
    document.body.removeChild(ta);
  }

  function copyText(inputElem, btnElem) {
    const text = inputElem.value;
    inputElem.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showSuccess(btnElem);
      }).catch(() => fallbackCopy(text, btnElem));
    } else {
      fallbackCopy(text, btnElem);
    }
  }

  overlay.querySelector('#btnCopyRecipient')?.addEventListener('click', function() {
    copyText(overlay.querySelector('#inpRecipientUrl'), this);
  });
  overlay.querySelector('#btnCopyMaker')?.addEventListener('click', function() {
    copyText(overlay.querySelector('#inpMakerUrl'), this);
  });

  overlay.querySelector('#btnShareWhatsapp')?.addEventListener('click', () => {
    const shareMsg = `I created a special celebration website just for you, ${recipientName}! ❤️✨ Open it here: ${recipientUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`, '_blank');
  });
}
