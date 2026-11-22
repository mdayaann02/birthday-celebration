// src/studio/shareModal.js - Share & Export Modal (Clean Short-Links + 1-Tap Universal WhatsApp)

import confetti from 'canvas-confetti';
import { encodeSiteToUrl, publishSiteToServer } from '../models/siteStorage.js';
import { renderStudioIcons } from './icons.js';

// Helper to ensure WhatsApp parses the URL as a 100% clickable hyperlink
export function toWhatsAppSafeUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  let s = rawUrl.trim();
  // Strip any accidental sslip.io to avoid mobile DNS blocking
  s = s.replace(/155-248-255-29\.sslip\.io(:3000)?/g, '155.248.255.29');
  // Strip port 3000 when on Oracle VM IP because port 80 is forwarded to 3000 directly
  s = s.replace(/155\.248\.255\.29:3000/g, '155.248.255.29');
  if (!s.startsWith('http://') && !s.startsWith('https://')) {
    s = 'https://' + s;
  }
  return s;
}

export function openShareModal(templateId, data) {
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

  let activeRecipientUrl = "https://birthday-website-phi-one.vercel.app";
  let activeMakerUrl = "https://birthday-website-phi-one.vercel.app?review=true";
  let cloudDirectUrl = "";
  let vercelDirectUrl = "";
  let currentSlug = "";

  const overlay = document.createElement("div");
  overlay.id = "shareModalOverlay";
  overlay.className = "share-modal-overlay";
  overlay.innerHTML = `
    <div class="share-modal-card">
      <div class="share-modal-header">
        <h3 class="share-modal-title">
          <i data-lucide="sparkles"></i>
          <span>Your Celebration Website is Ready!</span>
        </h3>
        <button class="btn-close-modal" id="btnCloseShareModal" aria-label="Close">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="share-modal-body">
        <p class="share-info-text">
          Share this link with <strong>${recipientName}</strong>. 
          ${isLocked ? `It is locked with a romantic countdown until <strong>${dateStr}</strong>!` : 'It will open immediately with your music, photos & animations!'}
        </p>

        <!-- Link Type Selector / Tabs -->
        <div style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
          <button type="button" class="btn-link-tab active" id="tabVercelLink" style="padding:7px 14px; border-radius:10px; font-size:12px; font-weight:700; border:1px solid #d4235c; background:rgba(212,35,92,0.08); color:#d4235c; cursor:pointer; transition:all 0.2s ease;">
            ⚡ Vercel HTTPS (Recommended)
          </button>
          <button type="button" class="btn-link-tab" id="tabCloudLink" style="padding:7px 14px; border-radius:10px; font-size:12px; font-weight:700; border:1px solid rgba(212,175,55,0.28); background:#fffdfa; color:#6a5862; cursor:pointer; transition:all 0.2s ease;">
            🌐 Cloud Server (155.248.255.29)
          </button>
        </div>

        <!-- Clean Recipient Link -->
        <div class="share-link-group">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label class="share-link-label" style="margin-bottom:0; color:#1c1216;">
              🎁 Recipient Celebration Link <span id="lblLinkType" style="color:#059669;">(Creating short link...)</span>
            </label>
            <span style="font-size:10px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.35); color:#059669; padding:2px 6px; border-radius:10px; font-weight:700;">
              WhatsApp Hyperlink Active ✓
            </span>
          </div>

          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpRecipientUrl" value="Generating short link..." />
            <button class="btn-copy-link" id="btnCopyRecipient">
              <i data-lucide="copy"></i>
              <span>Copy</span>
            </button>
          </div>

          <div class="share-sub-hint" id="shareSubHint" style="margin-top:6px; font-size:11px; color:#059669;">
            ✨ Guaranteed 100% clickable blue hyperlink in WhatsApp on all phones.
          </div>

          <div class="share-quick-actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <a href="#" target="_blank" rel="noopener noreferrer" class="btn-share-whatsapp" id="btnShareWhatsapp" style="background:#25D366; color:#fff; border:none; padding:12px 20px; border-radius:12px; font-size:13.5px; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); flex:1; justify-content:center; min-height:46px; text-decoration:none;">
              <i data-lucide="share-2"></i>
              <span>Share on WhatsApp</span>
            </a>
            <a href="#" target="_blank" class="btn-open-preview" id="linkOpenPreview" style="display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:12px 18px; border-radius:12px; font-size:13px; font-weight:700; background:linear-gradient(135deg, #d4235c, #e11d48); color:#fff; text-decoration:none; min-height:46px; box-shadow: 0 4px 16px rgba(212, 35, 92, 0.35);">
              <i data-lucide="external-link"></i>
              <span>Test Website</span>
            </a>
          </div>
        </div>

        <!-- Creator Early Review -->
        <div class="share-link-group" style="margin-top:18px; border-top:1px dashed rgba(212,175,55,0.25); padding-top:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label class="share-link-label" style="color:#4a3840; margin-bottom:0;">
              <i data-lucide="lock" style="width:12px; height:12px;"></i>
              <span>Creator Early Review (Bypasses Countdown)</span>
            </label>
            <a href="#" target="_blank" id="linkTestCreator" style="color:#d4235c; font-size:11px; font-weight:700; text-decoration:underline;">
              Open Creator View →
            </a>
          </div>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="Generating creator review link..." style="font-size:11px;" />
            <button class="btn-copy-link" id="btnCopyMaker" style="font-size:11px;">
              <i data-lucide="copy"></i>
              <span>Copy</span>
            </button>
          </div>
          <div class="share-sub-hint" style="margin-top:4px; font-size:11px; color:#6a5862;">
            Use this to verify your surprise before the event countdown ends. (Maker Passcode: <strong>${data.passcode || '1234'}</strong>)
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  renderStudioIcons(overlay);

  confetti({
    particleCount: 75,
    spread: 65,
    origin: { y: 0.6 }
  });

  const inpRecipient = overlay.querySelector('#inpRecipientUrl');
  const inpMaker = overlay.querySelector('#inpMakerUrl');
  const lblType = overlay.querySelector('#lblLinkType');
  const linkPreview = overlay.querySelector('#linkOpenPreview');
  const linkTestCreator = overlay.querySelector('#linkTestCreator');
  const btnShareWhatsapp = overlay.querySelector('#btnShareWhatsapp');
  const tabCloud = overlay.querySelector('#tabCloudLink');
  const tabVercel = overlay.querySelector('#tabVercelLink');

  function updateActiveUrls(recipientUrl, makerUrl) {
    activeRecipientUrl = recipientUrl;
    activeMakerUrl = makerUrl;

    if (inpRecipient) inpRecipient.value = activeRecipientUrl;
    if (inpMaker) inpMaker.value = activeMakerUrl;
    if (linkPreview) linkPreview.href = activeRecipientUrl;
    if (linkTestCreator) linkTestCreator.href = activeMakerUrl;

    const safeUrl = toWhatsAppSafeUrl(activeRecipientUrl);
    const shareMsg = `I made something very special just for you, ${recipientName}! ❤️✨\n\nOpen your surprise website here:\n${safeUrl}`;
    if (btnShareWhatsapp) {
      btnShareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
    }
  }

  // Handle WhatsApp button click - always ensure latest active URL is encoded
  btnShareWhatsapp?.addEventListener('click', function() {
    const safeUrl = toWhatsAppSafeUrl(activeRecipientUrl);
    const shareMsg = `I made something very special just for you, ${recipientName}! ❤️✨\n\nOpen your surprise website here:\n${safeUrl}`;
    this.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
  });

  // Automatically publish to backend server to generate permanent short link
  publishSiteToServer(templateId, data).then(res => {
    if (res && res.slug) {
      currentSlug = res.slug;
      
      // STRICT clean short links (NO ugly queries or base64!)
      cloudDirectUrl = `http://155.248.255.29/s/${currentSlug}`;
      vercelDirectUrl = `https://birthday-website-phi-one.vercel.app/s/${currentSlug}`;

      // Default to Vercel HTTPS for 100% WhatsApp hyperlink reliability
      updateActiveUrls(vercelDirectUrl, `${vercelDirectUrl}?review=true`);
      if (lblType) lblType.innerHTML = `(Permanent Short-Link Active ✨)`;
    } else {
      // Fallback only if server was unreachable
      const fallbackUrl = encodeSiteToUrl(templateId, data, false);
      const fallbackMaker = encodeSiteToUrl(templateId, data, true);
      updateActiveUrls(fallbackUrl, fallbackMaker);
      if (lblType) lblType.innerHTML = `(Celebration Link Active ✓)`;
    }
  }).catch(() => {
    const fallbackUrl = encodeSiteToUrl(templateId, data, false);
    const fallbackMaker = encodeSiteToUrl(templateId, data, true);
    updateActiveUrls(fallbackUrl, fallbackMaker);
    if (lblType) lblType.innerHTML = `(Celebration Link Active ✓)`;
  });

  // Tab switching between Vercel HTTPS and Cloud IP
  tabVercel?.addEventListener('click', () => {
    tabVercel.style.borderColor = '#d4235c';
    tabVercel.style.background = 'rgba(212,35,92,0.08)';
    tabVercel.style.color = '#d4235c';
    tabCloud.style.borderColor = 'rgba(212,175,55,0.28)';
    tabCloud.style.background = '#fffdfa';
    tabCloud.style.color = '#6a5862';

    if (vercelDirectUrl) {
      updateActiveUrls(vercelDirectUrl, `${vercelDirectUrl}?review=true`);
    }
  });

  tabCloud?.addEventListener('click', () => {
    tabCloud.style.borderColor = '#d4235c';
    tabCloud.style.background = 'rgba(212,35,92,0.08)';
    tabCloud.style.color = '#d4235c';
    tabVercel.style.borderColor = 'rgba(212,175,55,0.28)';
    tabVercel.style.background = '#fffdfa';
    tabVercel.style.color = '#6a5862';

    if (cloudDirectUrl) {
      updateActiveUrls(cloudDirectUrl, `${cloudDirectUrl}?review=true`);
    }
  });

  // Event handlers
  overlay.querySelector('#btnCloseShareModal')?.addEventListener('click', () => {
    overlay.remove();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  function showSuccess(btnElem) {
    const origHtml = btnElem.innerHTML;
    btnElem.innerHTML = `<i data-lucide="check"></i> <span>Copied!</span>`;
    btnElem.style.background = "#22c55e";
    btnElem.style.color = "#fff";
    renderStudioIcons(btnElem);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      btnElem.innerHTML = origHtml;
      btnElem.style.background = "";
      btnElem.style.color = "";
      renderStudioIcons(btnElem);
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
}
