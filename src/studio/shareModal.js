// src/studio/shareModal.js - Share & Export Modal (Backend Short-Links + WhatsApp 1-Tap)

import confetti from 'canvas-confetti';
import { encodeSiteToUrl, publishSiteToServer } from '../models/siteStorage.js';

// Helper to ensure WhatsApp parses the URL as a 100% clickable hyperlink
export function toWhatsAppSafeUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  let s = rawUrl.trim();
  // WhatsApp's parser is buggy with raw IP:port (drops .29 from 155.248.255.29:3000)
  // Converting to standard domain 155-248-255-29.sslip.io (on standard port 80) guarantees a clickable hyperlink!
  if (s.includes('155.248.255.29:3000') || s.includes('155.248.255.29')) {
    s = s.replace(/https?:\/\/155\.248\.255\.29(:3000)?/, 'http://155-248-255-29.sslip.io');
    s = s.replace(/155\.248\.255\.29(:3000)?/, '155-248-255-29.sslip.io');
    if (!s.startsWith('http://') && !s.startsWith('https://')) {
      s = 'http://' + s;
    }
  }
  return s;
}

export function openShareModal(templateId, data) {
  let fallbackRecipientUrl = encodeSiteToUrl(templateId, data, false);
  let makerReviewUrl = encodeSiteToUrl(templateId, data, true);

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

  let activeRecipientUrl = toWhatsAppSafeUrl(fallbackRecipientUrl);
  let serverDirectUrl = "";
  let serverVercelUrl = "";

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

        <!-- Clean Recipient Link -->
        <div class="share-link-group">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label class="share-link-label" style="margin-bottom:0;">
              🎁 Recipient Celebration Link <span id="lblLinkType" style="color:#22c55e;">(Publishing to server...)</span>
            </label>
            <span style="font-size:10px; background:rgba(34,197,94,0.18); border:1px solid rgba(34,197,94,0.4); color:#4ade80; padding:2px 6px; border-radius:10px; font-weight:700;">
              WhatsApp Hyperlink Active ✓
            </span>
          </div>

          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpRecipientUrl" value="${activeRecipientUrl}" />
            <button class="btn-copy-link" id="btnCopyRecipient">Copy</button>
          </div>

          <div class="share-sub-hint" id="shareSubHint" style="margin-top:6px; font-size:11px; color:#10b981;">
            ✨ Guaranteed clickable blue hyperlink in WhatsApp (no raw IP bugs or dropped digits).
          </div>

          <div class="share-quick-actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <button type="button" class="btn-share-whatsapp" id="btnShareWhatsapp" style="background:#25D366; color:#fff; border:none; padding:12px 20px; border-radius:12px; font-size:13.5px; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); flex:1; justify-content:center; min-height:46px;">
              💬 Share on WhatsApp
            </button>
            <a href="${activeRecipientUrl}" target="_blank" class="btn-open-preview" id="linkOpenPreview" style="display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:12px 18px; border-radius:12px; font-size:13px; font-weight:700; background:linear-gradient(135deg, #3b82f6, #6366f1); color:#fff; text-decoration:none; min-height:46px;">
              👁️ Test Website
            </a>
          </div>
        </div>

        <!-- Creator Early Review -->
        <div class="share-link-group" style="margin-top:18px; border-top:1px dashed rgba(255,255,255,0.12); padding-top:14px;">
          <label class="share-link-label" style="color:#cbd5e1;">👁️ Creator Early Review Link (Bypasses Countdown)</label>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="${toWhatsAppSafeUrl(makerReviewUrl)}" style="font-size:11px;" />
            <button class="btn-copy-link" id="btnCopyMaker" style="font-size:11px;">Copy</button>
          </div>
          <div class="share-sub-hint" style="margin-top:4px; font-size:11px; color:#94a3b8;">
            Use this to verify your celebration before the event countdown ends. (Maker Passcode: <strong>${data.passcode || '1234'}</strong>)
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  confetti({
    particleCount: 75,
    spread: 65,
    origin: { y: 0.6 }
  });

  // Automatically publish to backend server to generate permanent short link
  const inpRecipient = overlay.querySelector('#inpRecipientUrl');
  const lblType = overlay.querySelector('#lblLinkType');
  const linkPreview = overlay.querySelector('#linkOpenPreview');

  publishSiteToServer(templateId, data).then(res => {
    if (res && (res.fullUrl || res.path)) {
      const fullUrl = toWhatsAppSafeUrl(res.fullUrl || `${window.location.origin}${res.path}`);
      activeRecipientUrl = fullUrl;
      serverDirectUrl = res.directIpUrl || "";
      serverVercelUrl = res.vercelUrl || "";
      if (inpRecipient) inpRecipient.value = fullUrl;
      if (lblType) lblType.innerHTML = `(Permanent Short-Link Active ✨)`;
      if (linkPreview) linkPreview.href = fullUrl;
    } else {
      if (lblType) lblType.innerHTML = `(Direct Celebration Link)`;
    }
  }).catch(() => {
    if (lblType) lblType.innerHTML = `(Direct Celebration Link)`;
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
    const shareUrl = toWhatsAppSafeUrl(activeRecipientUrl);
    // Placing the URL on its own line after double newlines guarantees WhatsApp parses it as a clickable blue hyperlink
    const shareMsg = `I made something very special just for you, ${recipientName}! ❤️✨\n\nOpen your surprise website here:\n${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`, '_blank');
  });
}
