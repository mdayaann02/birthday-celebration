// src/components/customizerModal.js - Live Visual Template Customizer Modal & Drawer

import { saveConfig, resetConfig, generateShareableUrl } from '../config.js';

export function initCustomizerModal(container, currentConfig, onConfigUpdate) {
  let workingConfig = JSON.parse(JSON.stringify(currentConfig));

  container.innerHTML = `
    <!-- Floating Trigger Button -->
    <button class="btn-floating-customize" id="btnOpenCustomizer" aria-label="Customize Template">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
      <span>✨ Customize Template</span>
    </button>

    <!-- Slide-over Drawer -->
    <div class="customizer-drawer" id="customizerDrawer">
      <div class="drawer-header">
        <div class="drawer-title">
          <span>✨ Customize Template</span>
        </div>
        <button class="btn-close-drawer" id="btnCloseDrawer">&times;</button>
      </div>

      <!-- Category Tabs -->
      <div class="drawer-tabs">
        <button class="drawer-tab active" data-tab="general">🌟 General</button>
        <button class="drawer-tab" data-tab="polaroids">📸 Polaroids</button>
        <button class="drawer-tab" data-tab="magazine">📖 Editorial</button>
        <button class="drawer-tab" data-tab="scratch">💌 Scratch Card</button>
        <button class="drawer-tab" data-tab="vip">🎫 VIP Pass</button>
        <button class="drawer-tab" data-tab="chat">📱 Chat</button>
      </div>

      <!-- Tab Content Body -->
      <div class="drawer-body" id="drawerBody"></div>

      <!-- Footer Actions -->
      <div class="drawer-footer">
        <button class="btn-primary-action" id="btnSaveApply">
          💾 Save & Apply Changes
        </button>
        <div class="drawer-secondary-actions">
          <button class="btn-sec-action" id="btnCopyShareLink">🔗 Copy Share Link</button>
          <button class="btn-sec-action" id="btnResetDefaults">🔄 Reset</button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div class="toast-notice" id="toastNotice"></div>
  `;

  const drawer = document.getElementById("customizerDrawer");
  const btnOpen = document.getElementById("btnOpenCustomizer");
  const btnClose = document.getElementById("btnCloseDrawer");
  const tabs = container.querySelectorAll(".drawer-tab");
  const drawerBody = document.getElementById("drawerBody");
  const btnSave = document.getElementById("btnSaveApply");
  const btnShare = document.getElementById("btnCopyShareLink");
  const btnReset = document.getElementById("btnResetDefaults");
  const toast = document.getElementById("toastNotice");

  let activeTab = "general";

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  function renderTabContent() {
    if (activeTab === "general") {
      drawerBody.innerHTML = `
        <div class="form-group">
          <label class="form-label">Recipient's Name</label>
          <input type="text" class="form-input" id="cfgRecipient" value="${workingConfig.general.recipientName || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Age / Milestone Number</label>
          <input type="text" class="form-input" id="cfgAge" value="${workingConfig.general.age || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Hero Title</label>
          <input type="text" class="form-input" id="cfgHeroTitle" value="${workingConfig.general.heroTitle || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Hero Subtitle</label>
          <input type="text" class="form-input" id="cfgHeroSubtitle" value="${workingConfig.general.heroSubtitle || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Background Audio Title</label>
          <input type="text" class="form-input" id="cfgAudioTitle" value="${workingConfig.general.audioTitle || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Audio File URL / Path</label>
          <input type="text" class="form-input" id="cfgAudioSrc" value="${workingConfig.general.audioSrc || ''}" placeholder="/audio/song.mp3 or https://..." />
        </div>
      `;
    } else if (activeTab === "polaroids") {
      drawerBody.innerHTML = (workingConfig.polaroids || []).map((p, i) => `
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.08);">
          <div style="font-weight: 700; font-size: 13px; color: var(--primary); margin-bottom: 8px;">Polaroid #${i+1} (${p.noteBadge || ''})</div>
          <div class="form-group">
            <label class="form-label">Title / Caption</label>
            <input type="text" class="form-input pol-title" data-idx="${i}" value="${p.title || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Image URL / Path</label>
            <input type="text" class="form-input pol-img" data-idx="${i}" value="${p.image || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Secret Note (On Click)</label>
            <textarea rows="2" class="form-textarea pol-note" data-idx="${i}">${p.note || ''}</textarea>
          </div>
        </div>
      `).join('');
    } else if (activeTab === "magazine") {
      drawerBody.innerHTML = `
        <div class="form-group">
          <label class="form-label">Magazine Masthead</label>
          <input type="text" class="form-input" id="cfgVogueTitle" value="${workingConfig.magazine.vogueTitle || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Chapter Heading</label>
          <input type="text" class="form-input" id="cfgChapterHeading" value="${workingConfig.magazine.chapterHeading || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Editorial Quote</label>
          <textarea rows="2" class="form-textarea" id="cfgEditorialQuote">${workingConfig.magazine.editorialQuote || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Editorial Image URL</label>
          <input type="text" class="form-input" id="cfgEditorialPhoto" value="${workingConfig.magazine.editorialPhoto || ''}" />
        </div>
        <div style="font-weight: 700; font-size: 13px; color: var(--gold-light); margin: 18px 0 8px;">12 Reasons to Adore (Edit First 4 as Sample):</div>
        ${(workingConfig.magazine.reasons || []).slice(0, 4).map((r, i) => `
          <div style="display:flex; gap:8px; margin-bottom:8px;">
            <input type="text" style="width:40px; text-align:center;" class="form-input" readonly value="${r.num}" />
            <input type="text" class="form-input r-title" data-idx="${i}" value="${r.title}" />
          </div>
        `).join('')}
      `;
    } else if (activeTab === "scratch") {
      drawerBody.innerHTML = `
        <div class="form-group">
          <label class="form-label">Card Header</label>
          <input type="text" class="form-input" id="cfgScratchBadge" value="${workingConfig.scratchCard.badge || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Main Greeting Title</label>
          <input type="text" class="form-input" id="cfgScratchTitle" value="${workingConfig.scratchCard.title || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Subtitle Wish</label>
          <textarea rows="2" class="form-textarea" id="cfgScratchSub">${workingConfig.scratchCard.subtitle || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Hidden Secret Message</label>
          <textarea rows="2" class="form-textarea" id="cfgScratchSecret">${workingConfig.scratchCard.hiddenSecret || ''}</textarea>
        </div>
      `;
    } else if (activeTab === "vip") {
      drawerBody.innerHTML = `
        <div class="form-group">
          <label class="form-label">Pass Badge Title</label>
          <input type="text" class="form-input" id="cfgVipBadgeType" value="${workingConfig.vipLanyard.badgeType || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">VIP Name</label>
          <input type="text" class="form-input" id="cfgVipRecipient" value="${workingConfig.vipLanyard.recipient || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Access Level Text</label>
          <input type="text" class="form-input" id="cfgVipAccess" value="${workingConfig.vipLanyard.accessLevel || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">VIP Badge Photo URL</label>
          <input type="text" class="form-input" id="cfgVipPhoto" value="${workingConfig.vipLanyard.photo || ''}" />
        </div>
      `;
    } else if (activeTab === "chat") {
      drawerBody.innerHTML = `
        <div class="form-group">
          <label class="form-label">Contact Name in Header</label>
          <input type="text" class="form-input" id="cfgChatContact" value="${workingConfig.phoneChat.contactName || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Contact Status</label>
          <input type="text" class="form-input" id="cfgChatStatus" value="${workingConfig.phoneChat.contactStatus || ''}" />
        </div>
        <div style="font-weight: 700; font-size: 13px; color: var(--primary); margin: 16px 0 8px;">Pre-loaded Messages:</div>
        ${(workingConfig.phoneChat.messages || []).map((m, i) => `
          <div class="form-group">
            <label class="form-label">Message #${i+1}</label>
            <input type="text" class="form-input chat-msg-text" data-idx="${i}" value="${m.text}" />
          </div>
        `).join('')}
      `;
    }
  }

  function readCurrentInputs() {
    if (activeTab === "general") {
      const elRec = document.getElementById("cfgRecipient");
      const elAge = document.getElementById("cfgAge");
      const elTitle = document.getElementById("cfgHeroTitle");
      const elSub = document.getElementById("cfgHeroSubtitle");
      const elATitle = document.getElementById("cfgAudioTitle");
      const elASrc = document.getElementById("cfgAudioSrc");
      if (elRec) workingConfig.general.recipientName = elRec.value;
      if (elAge) workingConfig.general.age = elAge.value;
      if (elTitle) workingConfig.general.heroTitle = elTitle.value;
      if (elSub) workingConfig.general.heroSubtitle = elSub.value;
      if (elATitle) workingConfig.general.audioTitle = elATitle.value;
      if (elASrc) workingConfig.general.audioSrc = elASrc.value;
    } else if (activeTab === "polaroids") {
      drawerBody.querySelectorAll(".pol-title").forEach(input => {
        const i = parseInt(input.getAttribute("data-idx"), 10);
        if (workingConfig.polaroids[i]) workingConfig.polaroids[i].title = input.value;
      });
      drawerBody.querySelectorAll(".pol-img").forEach(input => {
        const i = parseInt(input.getAttribute("data-idx"), 10);
        if (workingConfig.polaroids[i]) workingConfig.polaroids[i].image = input.value;
      });
      drawerBody.querySelectorAll(".pol-note").forEach(input => {
        const i = parseInt(input.getAttribute("data-idx"), 10);
        if (workingConfig.polaroids[i]) workingConfig.polaroids[i].note = input.value;
      });
    } else if (activeTab === "magazine") {
      const elV = document.getElementById("cfgVogueTitle");
      const elH = document.getElementById("cfgChapterHeading");
      const elQ = document.getElementById("cfgEditorialQuote");
      const elP = document.getElementById("cfgEditorialPhoto");
      if (elV) workingConfig.magazine.vogueTitle = elV.value;
      if (elH) workingConfig.magazine.chapterHeading = elH.value;
      if (elQ) workingConfig.magazine.editorialQuote = elQ.value;
      if (elP) workingConfig.magazine.editorialPhoto = elP.value;
      drawerBody.querySelectorAll(".r-title").forEach(input => {
        const i = parseInt(input.getAttribute("data-idx"), 10);
        if (workingConfig.magazine.reasons[i]) workingConfig.magazine.reasons[i].title = input.value;
      });
    } else if (activeTab === "scratch") {
      const elB = document.getElementById("cfgScratchBadge");
      const elT = document.getElementById("cfgScratchTitle");
      const elS = document.getElementById("cfgScratchSub");
      const elSec = document.getElementById("cfgScratchSecret");
      if (elB) workingConfig.scratchCard.badge = elB.value;
      if (elT) workingConfig.scratchCard.title = elT.value;
      if (elS) workingConfig.scratchCard.subtitle = elS.value;
      if (elSec) workingConfig.scratchCard.hiddenSecret = elSec.value;
    } else if (activeTab === "vip") {
      const elB = document.getElementById("cfgVipBadgeType");
      const elR = document.getElementById("cfgVipRecipient");
      const elA = document.getElementById("cfgVipAccess");
      const elP = document.getElementById("cfgVipPhoto");
      if (elB) workingConfig.vipLanyard.badgeType = elB.value;
      if (elR) workingConfig.vipLanyard.recipient = elR.value;
      if (elA) workingConfig.vipLanyard.accessLevel = elA.value;
      if (elP) workingConfig.vipLanyard.photo = elP.value;
    } else if (activeTab === "chat") {
      const elC = document.getElementById("cfgChatContact");
      const elS = document.getElementById("cfgChatStatus");
      if (elC) workingConfig.phoneChat.contactName = elC.value;
      if (elS) workingConfig.phoneChat.contactStatus = elS.value;
      drawerBody.querySelectorAll(".chat-msg-text").forEach(input => {
        const i = parseInt(input.getAttribute("data-idx"), 10);
        if (workingConfig.phoneChat.messages[i]) workingConfig.phoneChat.messages[i].text = input.value;
      });
    }
  }

  // Open / Close Drawer
  btnOpen.addEventListener("click", () => {
    workingConfig = JSON.parse(JSON.stringify(currentConfig));
    renderTabContent();
    drawer.classList.add("open");
  });

  btnClose.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      readCurrentInputs();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeTab = tab.getAttribute("data-tab");
      renderTabContent();
    });
  });

  // Save & Apply
  btnSave.addEventListener("click", () => {
    readCurrentInputs();
    saveConfig(workingConfig);
    onConfigUpdate(workingConfig);
    showToast("🎉 Changes saved & applied successfully!");
    drawer.classList.remove("open");
  });

  // Copy shareable URL
  btnShare.addEventListener("click", () => {
    readCurrentInputs();
    const url = generateShareableUrl(workingConfig);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("📋 Share link copied to clipboard!");
      }).catch(() => {
        prompt("Copy this customized link:", url);
      });
    } else {
      prompt("Copy this customized link:", url);
    }
  });

  // Reset to defaults
  btnReset.addEventListener("click", () => {
    if (confirm("Reset all settings to original defaults?")) {
      const def = resetConfig();
      workingConfig = JSON.parse(JSON.stringify(def));
      onConfigUpdate(def);
      renderTabContent();
      showToast("🔄 Restored original defaults!");
    }
  });

  // Initial render of first tab
  renderTabContent();
}
