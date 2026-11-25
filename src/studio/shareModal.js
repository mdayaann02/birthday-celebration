// src/studio/shareModal.js - Share & Export Modal (Clean Short-Links + Dedicated Occasion WhatsApp Messages)

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

// Dedicated WhatsApp Message Generator for Every Occasion and Persona
export function getOccasionWhatsAppMessage(templateId, data, safeUrl) {
  const recipientName = data?.recipientName || 'Someone Special';
  const senderName = data?.senderName || 'Yours Truly';
  const persona = (data?.recipientPersona || '').toLowerCase();
  const tid = (templateId || '').toLowerCase();

  // 1. Birthday Celebration (Dedicated by Persona)
  if (tid === 'birthday') {
    if (persona === 'brother') {
      return `Happy Birthday to the best brother in the universe, ${recipientName}! 🎂👑\n\nBro, I made a special celebration website just for you with our craziest memories, music & surprises. Open your surprise here:\n${safeUrl}\n\nParty hard today! 🥳🎉`;
    }
    if (persona === 'sister') {
      return `Happy Birthday to the sweetest sister ever, ${recipientName}! 🎂💖\n\nBehna, I built a custom celebration website just for you with your favorite songs, photos, and endless love! Tap to open:\n${safeUrl}\n\nHave the most magical birthday! 🌸✨`;
    }
    if (persona === 'bestfriend_female') {
      return `Happy Birthday to my absolute favourite human, ${recipientName}! 🎂✨\n\nBestie, you deserve the whole universe! I made you this exclusive VIP celebration website with our best moments & music. Check it out:\n${safeUrl}\n\nLove you loads! 🥳💖`;
    }
    if (persona === 'bestfriend') {
      return `Happy Birthday to the realest one, ${recipientName}! 🎂🔥\n\nBhai, I coded a special celebration website just for you loaded with our legendary memories and music. Tap the link:\n${safeUrl}\n\nTreat kab de raha hai? 🍕🍻`;
    }
    if (persona === 'mother') {
      return `Happy Birthday to the most wonderful mother, ${recipientName}! 🎂💐\n\nMom, words can never express how much you mean to us. I created a special celebration website filled with memories and love just for you:\n${safeUrl}\n\nMay God bless you with infinite health & happiness! 🌸❤️`;
    }
    if (persona === 'father') {
      return `Happy Birthday to our greatest superhero and guide, ${recipientName}! 🎂👑\n\nDad, thank you for being our pillar of strength. I made this special celebration website in your honour:\n${safeUrl}\n\nWishing you boundless health, peace, and joy! 🌟🙌`;
    }
    if (persona === 'teacher') {
      return `Happy Birthday to an inspiring teacher & mentor, ${recipientName}! 🎂🎓\n\nThank you for guiding us with wisdom and patience. I created this special celebration tribute in your honour:\n${safeUrl}\n\nWishing you joy, peace, and prosperity! 📚🌟`;
    }
    return `Happy Birthday, ${recipientName}! 🎂🎉✨\n\nI made something very special and unforgettable just for you! Open your personalized celebration website with music, memories & surprises:\n${safeUrl}\n\nHope this brings the biggest smile to your face today! 🥰🎁`;
  }

  // 2. Long Romance Masterpiece
  if (tid === 'long_romance') {
    return `To my one and only love, ${recipientName}... 🌸🏹❤️\n\nI built a continuous romantic story website of us — with Cupid's bow, our blooming memory tree, Polaroid scrapbook, and twilight sky lanterns with our song playing in the background.\n\nOpen our love story here:\n${safeUrl}\n\nI love you endlessly, today and forever! 🫶✨`;
  }

  // 3. Cupid & Blossom Tree / Blossom Romance
  if (tid === 'tree' || tid === 'blossom') {
    return `To the most special person in my heart, ${recipientName}... 🏹🌸💖\n\nI created an interactive cinematic love story for you. Shoot Cupid's bow, tap the blooming blossom tree for secret love notes, and open our memories with our special soundtrack.\n\nUnwrap your surprise here:\n${safeUrl}\n\nForever yours! 🥰✨`;
  }

  // 4. Valentine's Proposal / Love Story
  if (tid === 'valentine') {
    return `Happy Valentine's Day, ${recipientName}! 💘🌹✨\n\nYou make my heart flutter every single day. I created this romantic interactive Valentine surprise website just for you, filled with our sweetest moments and a question straight from my heart.\n\nOpen your Valentine surprise here:\n${safeUrl}\n\nWill you be my Valentine forever? 💖🥂`;
  }

  // 5. Anniversary Celebration
  if (tid === 'anniversary') {
    return `Happy Anniversary to my favorite person, ${recipientName}! 🥂💍✨\n\nEvery moment spent with you is a memory I treasure forever. I designed a special milestone celebration website to celebrate our beautiful journey and eternal love.\n\nRelive our love story here:\n${safeUrl}\n\nHere's to a lifetime of us! ❤️🥂`;
  }

  // 6. Sincere Apology & Reconciliation (Sorry)
  if (tid === 'sorry') {
    return `Dearest ${recipientName}, I am so truly sorry... 🥺💔\n\nMy universe feels heavy and incomplete without you. I made this sincere multi-stage apology website for you — you can vent your anger at me, assign me any punishments you want, and sign our official peace treaty.\n\nPlease hear my confession here:\n${safeUrl}\n\nI love you more than anything, please forgive me 🫶🥺`;
  }

  // 7. Mother's Tribute
  if (tid === 'mother') {
    return `To the world's most incredible Mom, ${recipientName}! 🌸👑❤️\n\nThank you for your unconditional love, sacrifices, and endless warmth. I created a dedicated celebration website to honour you with our cherished family memories, audio, and heartfelt wishes.\n\nOpen your special tribute here:\n${safeUrl}\n\nLove you beyond words, Ma! 💐✨`;
  }

  // 8. Father's Tribute
  if (tid === 'father') {
    return `To the best Dad and real superhero, ${recipientName}! 👑👔🌟\n\nThank you for always shielding us, guiding us, and inspiring us every single day. I made this custom website to celebrate you and everything you do for us.\n\nOpen your celebration website here:\n${safeUrl}\n\nWith all my respect and love, Dad! 🏆🙌`;
  }

  // 9. Sister's Celebration
  if (tid === 'sister') {
    return `To the world's sweetest (and most dramatic!) sister, ${recipientName}! 🌸🧸💖\n\nFrom silly fights to being my biggest supporter, you are irreplaceable. I made this playful and aesthetic celebration website just for you with our photos, coupons & sweet surprises!\n\nOpen your surprise here:\n${safeUrl}\n\nKeep shining always, Behna! 🥳✨`;
  }

  // 10. Brother's Celebration
  if (tid === 'brother') {
    return `To my partner-in-crime and the coolest brother, ${recipientName}! 🏍️🔥👑\n\nNo matter how much we argue, you're always my rock. I built this celebration website loaded with our legendary adventures, bike physics & memories.\n\nCheck out your website here:\n${safeUrl}\n\nParty on, Bhai! 👊🎉`;
  }

  // 10b. Bloom Reveal Surprise
  if (tid === 'bloom_reveal') {
    return `Hey ${recipientName}, I made a little surprise for you... 🌸💜\n\nEnter the secret password to unlock your flowers and memories:\n${safeUrl}\n\nMade with all my love! ✨`;
  }

  // 11. Bestie Girl
  if (tid === 'bestie_girl') {
    return `To my soul sister and ultimate bestie, ${recipientName}! 💖👯‍♀️✨\n\nLife is a hundred times more fun and chaotic with you! I made you an exclusive aesthetic celebration website packed with our craziest photos, bestie promises & soundtrack.\n\nOpen your surprise bestie website:\n${safeUrl}\n\nBest friends forever & ever! 🫶🎉`;
  }

  // 12. Bestie Boy
  if (tid === 'bestie_boy') {
    return `To my brother from another mother, ${recipientName}! 👊🔥🍕\n\nThrough thick and thin, you've always had my back. I coded this celebration website packed with our epic moments, games, and memories.\n\nOpen your website here:\n${safeUrl}\n\nBrothers for life! 🍻🚀`;
  }

  // 13. Friendship Celebration
  if (tid === 'friendship') {
    return `To an unforgettable friend, ${recipientName}! 🌟🤝✨\n\nTrue friendship is rare, and I'm so grateful to have you in my life. I created a celebration website to celebrate our bond, laughter, and memories.\n\nOpen your friendship website here:\n${safeUrl}\n\nHere's to many more adventures together! 🥂💫`;
  }

  // Default fallback
  return `I made something very special just for you, ${recipientName}! ❤️✨\n\nOpen your surprise celebration website here:\n${safeUrl}`;
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

  const vercelBase = (typeof window !== 'undefined' && window.location.origin.includes('vercel.app'))
    ? window.location.origin
    : 'https://celebration-studio-02.vercel.app';
  let activeRecipientUrl = vercelBase;
  let activeMakerUrl = `${vercelBase}?review=true`;
  let cloudDirectUrl = "";
  let vercelDirectUrl = "";
  let currentSlug = "";

  const overlay = document.createElement("div");
  overlay.id = "shareModalOverlay";
  overlay.className = "share-modal-overlay neu-modal-overlay";
  overlay.innerHTML = `
    <div class="share-modal-card neu-raised-card">
      <div class="share-modal-header">
        <h3 class="share-modal-title">
          <i data-lucide="sparkles" style="color:var(--primary-accent);"></i>
          <span>Your Celebration Website is Ready!</span>
        </h3>
        <button class="btn-close-modal btn-neu-icon" id="btnCloseShareModal" aria-label="Close">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="share-modal-body">
        <p class="share-info-text">
          Share this link with <strong>${recipientName}</strong>. 
          ${isLocked ? `It is locked with a romantic countdown until <strong>${dateStr}</strong>!` : 'It will open immediately with your music, photos & animations!'}
        </p>

        <!-- Link Type Selector / Tabs -->
        <div style="display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap;">
          <button type="button" class="btn-link-tab active neu-tab-btn" id="tabVercelLink">
            ⚡ Vercel HTTPS (Recommended)
          </button>
          <button type="button" class="btn-link-tab neu-tab-btn" id="tabCloudLink">
            🌐 Cloud Server (155.248.255.29)
          </button>
        </div>

        <!-- Clean Recipient Link -->
        <div class="share-link-group neu-inset-well" style="padding:14px 16px; border-radius:18px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label class="share-link-label" style="margin-bottom:0;">
              🎁 Recipient Celebration Link <span id="lblLinkType" style="color:#10b981;">(Creating short link...)</span>
            </label>
            <span style="font-size:10px; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#10b981; padding:2px 7px; border-radius:10px; font-weight:800;">
              WhatsApp Hyperlink Active ✓
            </span>
          </div>

          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpRecipientUrl" value="Generating short link..." />
            <button class="btn-copy-link neu-btn-primary" id="btnCopyRecipient">
              <i data-lucide="copy"></i>
              <span>Copy</span>
            </button>
          </div>

          <div class="share-sub-hint" id="shareSubHint" style="margin-top:8px; font-size:11.5px; color:#10b981; font-weight:600;">
            ✨ Guaranteed 100% clickable blue hyperlink in WhatsApp on all phones.
          </div>

          <div class="share-quick-actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <a href="#" target="_blank" rel="noopener noreferrer" class="btn-share-whatsapp" id="btnShareWhatsapp" style="background:#25D366; color:#fff; border:none; padding:12px 20px; border-radius:14px; font-size:13.5px; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow: 4px 4px 14px rgba(37, 211, 102, 0.4), -2px -2px 8px rgba(255, 255, 255, 0.15); flex:1; justify-content:center; min-height:46px; text-decoration:none;">
              <i data-lucide="share-2"></i>
              <span>Share on WhatsApp</span>
            </a>
            <a href="#" target="_blank" class="btn-open-preview" id="linkOpenPreview" style="display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:12px 18px; border-radius:14px; font-size:13px; font-weight:700; background:linear-gradient(145deg, #f43f5e, #e11d48); color:#fff; text-decoration:none; min-height:46px; box-shadow: 4px 4px 14px rgba(244, 63, 94, 0.35), -2px -2px 8px rgba(255, 255, 255, 0.15);">
              <i data-lucide="external-link"></i>
              <span>Test Website</span>
            </a>
          </div>
        </div>

        <!-- Creator Early Review -->
        <div class="share-link-group neu-inset-well" style="padding:14px 16px; border-radius:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label class="share-link-label" style="margin-bottom:0;">
              <i data-lucide="lock" style="width:12px; height:12px;"></i>
              <span>Creator Early Review (Bypasses Countdown)</span>
            </label>
            <a href="#" target="_blank" id="linkTestCreator" style="color:var(--primary-accent); font-size:11.5px; font-weight:700; text-decoration:none;">
              Open Creator View →
            </a>
          </div>
          <div class="share-input-row">
            <input type="text" class="share-url-input" readonly id="inpMakerUrl" value="Generating creator review link..." style="font-size:11.5px;" />
            <button class="btn-copy-link neu-btn-primary" id="btnCopyMaker" style="font-size:11px; padding:6px 14px;">
              <i data-lucide="copy"></i>
              <span>Copy</span>
            </button>
          </div>
          <div class="share-sub-hint" style="margin-top:6px; font-size:11px; color:var(--text-dim);">
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
    const shareMsg = getOccasionWhatsAppMessage(templateId, data, safeUrl);
    if (btnShareWhatsapp) {
      btnShareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
    }
  }

  // Handle WhatsApp button click - always ensure latest active URL is encoded
  btnShareWhatsapp?.addEventListener('click', function() {
    const safeUrl = toWhatsAppSafeUrl(activeRecipientUrl);
    const shareMsg = getOccasionWhatsAppMessage(templateId, data, safeUrl);
    this.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
  });

  // Automatically publish to backend server to generate permanent short link
  publishSiteToServer(templateId, data).then(res => {
    if (res && res.slug) {
      currentSlug = res.slug;
      
      // STRICT clean short links (NO ugly queries or base64!)
      cloudDirectUrl = `http://155.248.255.29/s/${currentSlug}`;
      vercelDirectUrl = `${vercelBase}/s/${currentSlug}`;

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
    tabVercel.classList.add('active');
    tabCloud.classList.remove('active');

    if (vercelDirectUrl) {
      updateActiveUrls(vercelDirectUrl, `${vercelDirectUrl}?review=true`);
    }
  });

  tabCloud?.addEventListener('click', () => {
    tabCloud.classList.add('active');
    tabVercel.classList.remove('active');

    if (cloudDirectUrl) {
      updateActiveUrls(cloudDirectUrl, `${cloudDirectUrl}?review=true`);
    }
  });

  // Event handlers with smooth dismiss animation
  function closeModal() {
    const card = overlay.querySelector('.share-modal-card');
    if (card) {
      card.style.transition = 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0';
      overlay.style.transition = 'opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 180);
    } else {
      overlay.remove();
    }
  }

  overlay.querySelector('#btnCloseShareModal')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
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
