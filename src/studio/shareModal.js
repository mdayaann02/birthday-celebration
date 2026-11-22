// src/studio/shareModal.js - Share & Export Modal (Backend Short-Links + WhatsApp 1-Tap)

import confetti from 'canvas-confetti';
import { encodeSiteToUrl, publishSiteToServer } from '../models/siteStorage.js';

// Helper to ensure WhatsApp parses the URL as a 100% clickable hyperlink
export function toWhatsAppSafeUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  let s = rawUrl.trim();
  // Strip any accidental sslip.io to avoid mobile DNS blocking by carriers (Jio, Airtel, Vi)
  s = s.replace(/155-248-255-29\.sslip\.io(:3000)?/g, '155.248.255.29');
  // Strip port 3000 when on Oracle VM IP because port 80 is forwarded to 3000 directly
  // This guarantees WhatsApp parses 155.248.255.29 as a complete clickable hyperlink!
  s = s.replace(/155\.248\.255\.29:3000/g, '155.248.255.29');
  if (!s.startsWith('http://') && !s.startsWith('https://')) {
    s = 'http://' + s;
  }
  return s;
}

export function openShareModal(templateId, data) {
  const fallbackRecipientUrl = encodeSiteToUrl(templateId, data, false);
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

  let activeRecipientUrl = toWhatsAppSafeUrl(fallbackRecipientUrl);
  let activeMakerUrl = toWhatsAppSafeUrl(makerReviewUrl);
  let cloudDirectUrl = "";
  let vercelDirectUrl = "";

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

        <!-- Link Type Selector / Chips -->
        <div style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
          <button type="button" class="btn-link-tab active" id="tabCloudLink" style="padding:6px 14px; border-radius:8px; font-size:12px; font-weight:700; border:1px solid #38bdf8; background:rgba(56,189,248,0.2); color:#38bdf8; cursor:pointer;">
            🌐 Cloud Server (155.248.255.29)
          </button>
          <button type="button" class="btn-link-tab" id="tabVercelLink" style="padding:6px 14px; border-radius:8px; font-size:12px; font-weight:700; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.06); color:#cbd5e1; cursor:pointer;">
            ⚡ Vercel HTTPS
          </button>
        </div>

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
            ✨ Guaranteed clickable blue hyperlink in WhatsApp on all phones & networks.
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
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label class="share-link-label" style="color:#cbd5e1; margin-bottom:0;">👁️ Creator Early Review (Bypasses Countdown)</label>
            <a href="${activeMakerUrl}" target="_blank" id="linkTestCreator" style="color:#38bdf8; font-size:11px; font-weight:700; text-decoration:underline;">
              Open Creator View →
            </a>
          </div>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="${activeMakerUrl}" style="font-size:11px;" />
            <button class="btn-copy-link" id="btnCopyMaker" style="font-size:11px;">Copy</button>
          </div>
          <div class="share-sub-hint" style="margin-top:4px; font-size:11px; color:#94a3b8;">
            Use this to verify your surprise before the event countdown ends. (Maker Passcode: <strong>${data.passcode || '1234'}</strong>)
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
  const inpMaker = overlay.querySelector('#inpMakerUrl');
  const lblType = overlay.querySelector('#lblLinkType');
  const linkPreview = overlay.querySelector('#linkOpenPreview');
  const linkTestCreator = overlay.querySelector('#linkTestCreator');
  const tabCloud = overlay.querySelector('#tabCloudLink');
  const tabVercel = overlay.querySelector('#tabVercelLink');

  // Extract hash token from fallback URL if present
  let hashToken = "";
  if (fallbackRecipientUrl.includes('#site=')) {
    hashToken = fallbackRecipientUrl.split('#site=')[1] || "";
  }

  publishSiteToServer(templateId, data).then(res => {
    if (res && res.slug) {
      const slug = res.slug;
      
      // Direct Cloud IP URL on port 80 (with fallback site token in query for 100% reliability)
      cloudDirectUrl = hashToken 
        ? `http://155.248.255.29/s/${slug}?site=${hashToken}`
        : `http://155.248.255.29/s/${slug}`;

      // Vercel HTTPS URL (with fallback site token in query for 100% reliability)
      vercelDirectUrl = hashToken 
        ? `https://birthday-website-phi-one.vercel.app/s/${slug}?site=${hashToken}`
        : `https://birthday-website-phi-one.vercel.app/s/${slug}`;

      // Default active link: If current host is vercel, use vercel; otherwise use cloud IP
      const isVercelHost = window.location.hostname.includes('vercel.app');
      activeRecipientUrl = isVercelHost ? vercelDirectUrl : cloudDirectUrl;

      activeMakerUrl = activeRecipientUrl.includes('?') 
        ? `${activeRecipientUrl}&review=true` 
        : `${activeRecipientUrl}?review=true`;

      if (inpRecipient) inpRecipient.value = activeRecipientUrl;
      if (inpMaker) inpMaker.value = activeMakerUrl;
      if (linkPreview) linkPreview.href = activeRecipientUrl;
      if (linkTestCreator) linkTestCreator.href = activeMakerUrl;
      if (lblType) lblType.innerHTML = `(Permanent Short-Link Active ✨)`;

      // Set active tab styling
      if (isVercelHost) {
        tabVercel?.classList.add('active');
        tabCloud?.classList.remove('active');
        tabVercel.style.borderColor = '#38bdf8';
        tabVercel.style.background = 'rgba(56,189,248,0.2)';
        tabVercel.style.color = '#38bdf8';
        tabCloud.style.borderColor = 'rgba(255,255,255,0.2)';
        tabCloud.style.background = 'rgba(255,255,255,0.06)';
        tabCloud.style.color = '#cbd5e1';
      }
    } else {
      if (lblType) lblType.innerHTML = `(Celebration Link Active ✓)`;
    }
  }).catch(() => {
    if (lblType) lblType.innerHTML = `(Celebration Link Active ✓)`;
  });

  // Tab switching between Cloud IP and Vercel HTTPS
  tabCloud?.addEventListener('click', () => {
    tabCloud.style.borderColor = '#38bdf8';
    tabCloud.style.background = 'rgba(56,189,248,0.2)';
    tabCloud.style.color = '#38bdf8';
    tabVercel.style.borderColor = 'rgba(255,255,255,0.2)';
    tabVercel.style.background = 'rgba(255,255,255,0.06)';
    tabVercel.style.color = '#cbd5e1';

    if (cloudDirectUrl) {
      activeRecipientUrl = cloudDirectUrl;
      activeMakerUrl = cloudDirectUrl.includes('?') ? `${cloudDirectUrl}&review=true` : `${cloudDirectUrl}?review=true`;
      if (inpRecipient) inpRecipient.value = activeRecipientUrl;
      if (inpMaker) inpMaker.value = activeMakerUrl;
      if (linkPreview) linkPreview.href = activeRecipientUrl;
      if (linkTestCreator) linkTestCreator.href = activeMakerUrl;
    }
  });

  tabVercel?.addEventListener('click', () => {
    tabVercel.style.borderColor = '#38bdf8';
    tabVercel.style.background = 'rgba(56,189,248,0.2)';
    tabVercel.style.color = '#38bdf8';
    tabCloud.style.borderColor = 'rgba(255,255,255,0.2)';
    tabCloud.style.background = 'rgba(255,255,255,0.06)';
    tabCloud.style.color = '#cbd5e1';

    if (vercelDirectUrl) {
      activeRecipientUrl = vercelDirectUrl;
      activeMakerUrl = vercelDirectUrl.includes('?') ? `${vercelDirectUrl}&review=true` : `${vercelDirectUrl}?review=true`;
      if (inpRecipient) inpRecipient.value = activeRecipientUrl;
      if (inpMaker) inpMaker.value = activeMakerUrl;
      if (linkPreview) linkPreview.href = activeRecipientUrl;
      if (linkTestCreator) linkTestCreator.href = activeMakerUrl;
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
    const whatsappWebUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`;
    const whatsappDeepLink = `whatsapp://send?text=${encodeURIComponent(shareMsg)}`;

    try {
      // Attempt mobile deep-link first, fallback to browser
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = whatsappDeepLink;
        setTimeout(() => {
          window.open(whatsappWebUrl, '_blank');
        }, 800);
      } else {
        window.open(whatsappWebUrl, '_blank');
      }
    } catch {
      window.open(whatsappWebUrl, '_blank');
    }
  });
}
