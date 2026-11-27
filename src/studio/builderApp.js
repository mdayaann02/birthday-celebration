// src/studio/builderApp.js - Celebration Studio (Neumorphic Professional Workstation)
// 100% Focused Dedicated Editor Studio with Dual-Viewport Live Preview

import confetti from 'canvas-confetti';
import Lenis from 'lenis';
import { TEMPLATES } from '../models/templateRegistry.js';
import { 
  saveActiveCelebration, 
  getActiveCelebrationData 
} from '../models/siteStorage.js';
import { renderTemplateSelector } from './templateSelector.js';
import { renderVisualEditor } from './visualEditor.js';
import { openShareModal } from './shareModal.js';
import { renderViewerApp } from '../viewer/viewerApp.js';
import { renderCreatorGuide } from './creatorGuide.js';
import { renderStudioIcons } from './icons.js';

export function renderStudioApp(root) {
  // Flag that editor mode is active so audio players never auto-play on click/touch in editor
  window.isCelebrationEditorMode = true;
  document.body.classList.add('is-editor-mode');

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '');
  const rawUrlTid = searchParams.get('template') || (hash.startsWith('template=') ? hash.substring(9) : null) || (TEMPLATES[hash] ? hash : null);
  const urlTid = (rawUrlTid === 'wedding' || rawUrlTid === 'shubh_weds') ? 'wedding_invite' : rawUrlTid;
  const isExplicitEdit = searchParams.get('edit') === 'true';
  const uniqueTemplates = Array.from(new Map(Object.values(TEMPLATES).map(t => [t.id, t])).values());
  const templateCount = uniqueTemplates.length;

  let activeTemplateId = (urlTid && TEMPLATES[urlTid]) ? urlTid : "wedding_invite";
  let activeData = getActiveCelebrationData(activeTemplateId);
  let currentMobileTab = "editor"; // "editor" | "preview"
  let currentViewport = "mobile"; // "mobile" | "tablet" | "desktop"
  let previewMuted = false;

  const savedTheme = localStorage.getItem('celebration_studio_editor_theme') || 'dark';
  let activeTheme = savedTheme;

  function renderFullScreenLandingPreview(tid) {
    window.isCelebrationEditorMode = false;
    document.body.classList.remove('is-editor-mode');
    const previewData = getActiveCelebrationData(tid);
    root.innerHTML = `<div id="landingPreviewMount" style="width:100%; min-height:100dvh;"></div>`;
    const mount = root.querySelector('#landingPreviewMount');
    renderViewerApp(mount, tid, previewData, false);

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'floating-creator-back-pill';
    backBtn.innerHTML = '<span>← All Themes</span>';
    backBtn.addEventListener('click', () => {
      backBtn.remove();
      custBtn.remove();
      if (mount._cleanup) { try { mount._cleanup(); } catch {} }
      renderLanding();
    });

    const custBtn = document.createElement('button');
    custBtn.type = 'button';
    custBtn.className = 'floating-creator-back-pill';
    custBtn.style.left = 'auto';
    custBtn.style.right = '16px';
    custBtn.style.background = '#d9385a';
    custBtn.style.borderColor = '#d9385a';
    custBtn.innerHTML = '<span>Customize This Theme →</span>';
    custBtn.addEventListener('click', () => {
      backBtn.remove();
      custBtn.remove();
      if (mount._cleanup) { try { mount._cleanup(); } catch {} }
      activeTemplateId = tid;
      activeData = getActiveCelebrationData(tid);
      renderEditorWorkspace();
    });

    document.body.appendChild(backBtn);
    document.body.appendChild(custBtn);
  }

  function renderLanding() {
    window.isCelebrationEditorMode = true;
    document.body.classList.add('is-editor-mode');
    root.innerHTML = `
      <div class="studio-landing studio-theme-${activeTheme}" id="studioLanding">
        <header class="landing-nav">
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="studio-brand-gem" style="width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:var(--accent-primary); color:#fff;">
              <i data-lucide="sparkles"></i>
            </div>
            <div>
              <div style="font-weight:800; font-size:15px; color:var(--text-primary);">Celebration Studio</div>
              <div style="font-size:11.5px; color:var(--text-secondary);">${templateCount} Interactive Themes · 100% Free</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button type="button" class="btn-nav-glass" id="btnLandingTheme" style="padding:8px 12px; border-radius:10px; background:var(--bg-subtle); border:1px solid var(--border-subtle); color:var(--text-primary); display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:12px; font-weight:600;">
              <i data-lucide="${activeTheme === 'dark' ? 'sun' : 'moon'}"></i>
              <span>${activeTheme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <button type="button" id="btnLandingStart" style="padding:8px 14px; border-radius:10px; background:var(--accent-primary); border:none; color:#fff; font-size:12.5px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <i data-lucide="wand-2"></i>
              <span>Open Studio</span>
            </button>
          </div>
        </header>

        <section class="landing-hero">
          <div class="landing-badge">
            <i data-lucide="sparkles" style="width:13px; height:13px;"></i>
            <span>100% Free · No Sign-up Required</span>
          </div>
          <h1 class="landing-title">Create a handcrafted celebration site in 60 seconds — 100% free</h1>
          <p class="landing-sub">
            Choose an interactive theme for weddings, birthdays, anniversaries, or heartfelt apologies. Personalize photos, music, and letters, then share a clean link on WhatsApp.
          </p>
        </section>

        <section class="landing-gallery-wrap">
          <div id="landingGalleryMount"></div>
        </section>

        <footer class="landing-footer">
          Celebration Studio · Handcrafted interactive wishes, invitations &amp; 3D keepsakes.
        </footer>
      </div>
    `;
    renderStudioIcons(root);

    const landingEl = root.querySelector('#studioLanding');
    root.querySelector('#btnLandingTheme')?.addEventListener('click', () => {
      activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('celebration_studio_editor_theme', activeTheme);
      if (landingEl) {
        landingEl.classList.remove('studio-theme-dark', 'studio-theme-light');
        landingEl.classList.add(`studio-theme-${activeTheme}`);
      }
      const btn = root.querySelector('#btnLandingTheme');
      if (btn) {
        btn.innerHTML = `<i data-lucide="${activeTheme === 'dark' ? 'sun' : 'moon'}"></i><span>${activeTheme === 'dark' ? 'Light' : 'Dark'}</span>`;
        renderStudioIcons(btn);
      }
    });

    root.querySelector('#btnLandingStart')?.addEventListener('click', () => {
      renderEditorWorkspace();
    });

    const galleryMount = root.querySelector('#landingGalleryMount');
    renderTemplateSelector(galleryMount, activeTemplateId, (tid, action) => {
      if (action === 'preview') {
        renderFullScreenLandingPreview(tid);
      } else {
        activeTemplateId = tid;
        activeData = getActiveCelebrationData(tid);
        renderEditorWorkspace();
      }
    });
  }

  if (!urlTid && !isExplicitEdit) {
    renderLanding();
    return;
  }

  renderEditorWorkspace();

  function renderEditorWorkspace() {
    window.isCelebrationEditorMode = true;
    document.body.classList.add('is-editor-mode');

  root.innerHTML = `
    <div class="studio-layout">
      <!-- Pure CSS Ambient Canvas Mesh -->
      <div class="studio-ambient-mesh" aria-hidden="true">
        <div class="mesh-orb mesh-orb-1"></div>
        <div class="mesh-orb mesh-orb-2"></div>
        <div class="mesh-orb mesh-orb-3"></div>
      </div>

      <!-- 1. TOP NAVBAR (Sticky) -->
      <header class="studio-navbar-glass neu-navbar" id="studioNavbar">
        <div class="navbar-glass-inner neu-raised-card">
          <!-- Left Group: Brand Mark + Active Occasion Switcher -->
          <div class="navbar-left-group">
            <a href="/" class="studio-brand-link" id="btnBrandHome" title="Back to all themes">
              <div class="studio-brand-gem neu-convex-gem">
                <i data-lucide="sparkles"></i>
              </div>
              <div class="studio-brand-meta">
                <div class="brand-title-row">
                  <span class="brand-name">Celebration Studio</span>
                  <span class="badge-free-pill neu-badge-pill">Step <span id="headerStepNum">2</span> of 4</span>
                </div>
                <span class="brand-subtext">Interactive Wishing Workstation</span>
              </div>
            </a>

            <!-- Active Occasion Quick Badge & Switcher Button (Desktop & Tablet) -->
            <button type="button" class="btn-nav-glass btn-nav-active-tmpl neu-btn" id="btnNavbarOccasions" title="Browse all ${templateCount} celebration occasions">
              <span class="nav-tmpl-icon" id="navTmplIcon">🌸</span>
              <span class="nav-tmpl-name" id="navTmplName">Long Romance</span>
              <i data-lucide="chevron-down" style="width:13px; height:13px; opacity:0.7;"></i>
            </button>
          </div>

          <!-- Primary Actions Group (Right Aligned) -->
          <div class="navbar-actions-group">
            <button type="button" class="btn-nav-glass btn-theme-toggle neu-btn" id="btnEditorThemeToggle" title="Toggle Light / Dark Mode">
              <i data-lucide="moon" id="themeToggleIcon"></i>
              <span class="hide-mobile" id="themeToggleLabel">Theme</span>
            </button>
            <button type="button" class="btn-nav-glass btn-nav-guide neu-btn" id="btnHeaderGuide" title="Step-by-step creator guide">
              <i data-lucide="compass"></i>
              <span class="hide-mobile">Guide</span>
            </button>
            <a href="/?template=${encodeURIComponent(activeTemplateId)}&mode=view&review=true" class="btn-nav-glass btn-nav-recipient neu-btn" id="btnRecipientViewLink" title="Open full-screen recipient preview">
              <i data-lucide="eye"></i>
              <span class="hide-mobile">Recipient View</span>
            </a>
            <button type="button" class="btn-nav-glass btn-nav-save neu-btn" id="btnHeaderSave" title="Save celebration website">
              <i data-lucide="save"></i>
              <span class="hide-mobile">Save</span>
            </button>
            <button type="button" class="btn-nav-share neu-btn-primary" id="btnSharePublish" title="Get permanent shareable link">
              <i data-lucide="share-2"></i>
              <span class="hide-mobile">Share Link</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Segmented Navigation Tabs (Sticky Under Navbar on Mobile) -->
      <nav class="studio-mobile-tabs neu-segmented-bar" id="studioMobileTabs" aria-label="Editor View Tabs">
        <button type="button" class="mobile-tab-btn active neu-tab-btn" data-tab="editor" id="tabBtnEditor">
          <span class="tab-btn-icon"><i data-lucide="wand-2"></i></span>
          <span class="tab-btn-text">Customize</span>
        </button>
        <button type="button" class="mobile-tab-btn neu-tab-btn" data-tab="preview" id="tabBtnPreview">
          <span class="tab-btn-icon"><i data-lucide="eye"></i></span>
          <span class="tab-btn-text">Live Preview</span>
          <span class="tab-live-pulse"></span>
        </button>
      </nav>

      <!-- 2. STUDIO EDITOR WORKSPACE (Front and Center - Just Editor Website) -->
      <main class="studio-customizer-section" id="customizerSection">
        <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
          <!-- Controls & Editor Sidebar -->
          <div class="studio-sidebar neu-raised-card" id="studioSidebar">

            <!-- Neumorphic Quick Occasion Switcher Strip -->
            <div class="occ-quick-strip-wrap neu-inset-well" id="occQuickStripWrap">
              <div class="occ-strip-header">
                <div class="occ-strip-active-meta">
                  <span class="occ-strip-label"><i data-lucide="palette"></i> <span>Theme:</span></span>
                  <span class="occ-active-badge neu-badge-pill" id="stripActiveBadge">
                    <span id="stripActiveIcon">🌸</span>
                    <strong id="stripActiveName">Long Romance</strong>
                  </span>
                </div>
                <button type="button" class="btn-browse-all-occasions neu-btn-pill" id="btnOpenOccasionModal">
                  <i data-lucide="grid"></i>
                  <span>All ${templateCount} Themes</span>
                </button>
              </div>
              <div class="occ-pills-scroller">
                <button type="button" class="occ-scroll-btn" id="btnOccScrollLeft" aria-label="Scroll themes left">
                  <i data-lucide="chevron-left"></i>
                </button>
                <div class="occ-quick-pills-row" id="occQuickPillsRow" role="tablist" aria-label="Celebration Themes">
                  <!-- Populated dynamically -->
                </div>
                <button type="button" class="occ-scroll-btn" id="btnOccScrollRight" aria-label="Scroll themes right">
                  <i data-lucide="chevron-right"></i>
                </button>
              </div>
            </div>

            <!-- Step-by-Step Interactive Creator Journey Guide Mount -->
            <div id="creatorGuideMount"></div>

            <div class="customizer-subheading">
              <i data-lucide="sliders"></i>
              <span>STEP 2: PERSONALIZE CELEBRATION</span>
            </div>

            <!-- Visual Editor Mount (Collapsible Accordion Form Cards) -->
            <div id="visualEditorMount"></div>
          </div>

          <!-- Live Real-Time Interactive Preview Pane -->
          <div class="studio-preview-pane neu-raised-card" id="studioPreviewPane">
            <div class="preview-device-header neu-inset-well">
              <button type="button" class="btn-preview-back-mobile neu-btn" id="btnMobileBackToEditor">
                <i data-lucide="wand-2"></i>
                <span>Back to Edit</span>
              </button>

              <!-- Viewport Switcher -->
              <div class="preview-viewport-switcher neu-inset-well" id="viewportSwitcher" role="group" aria-label="Preview Device Viewports">
                <button type="button" class="btn-viewport-toggle active neu-viewport-btn" data-viewport="mobile" title="Mobile Phone View (9:16 Aspect Ratio)">
                  <i data-lucide="smartphone"></i>
                  <span class="viewport-label">9:16 Mobile</span>
                </button>
                <button type="button" class="btn-viewport-toggle neu-viewport-btn" data-viewport="tablet" title="Tablet View (768px)">
                  <i data-lucide="tablet"></i>
                  <span class="viewport-label">Tablet</span>
                </button>
                <button type="button" class="btn-viewport-toggle neu-viewport-btn" data-viewport="desktop" title="Desktop Full-Width View">
                  <i data-lucide="monitor"></i>
                  <span class="viewport-label">Desktop</span>
                </button>
              </div>

              <div class="preview-device-actions">
                <button type="button" class="btn-preview-audio neu-btn-icon" id="btnPreviewMute" title="Mute or unmute preview audio" aria-label="Toggle preview audio">
                  <i data-lucide="volume-2"></i>
                </button>
                <button type="button" class="btn-preview-reload neu-btn-icon" id="btnPreviewReload" title="Reload celebration physics">
                  <i data-lucide="rotate-ccw"></i>
                </button>
                <button type="button" class="btn-preview-share-mobile neu-btn-primary" id="btnMobilePreviewShare">
                  <i data-lucide="share-2"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div class="preview-frame-container preview-viewport-mobile neu-phone-chassis" id="previewContainer"></div>
          </div>
        </div>
      </main>

      <!-- Occasion Browser Neumorphic Modal -->
      <div class="neu-modal-overlay" id="occasionModalOverlay" style="display:none;" aria-hidden="true">
        <div class="neu-modal-card neu-raised-card" id="occasionModalCard">
          <div class="neu-modal-header">
            <div class="neu-modal-title-group">
              <div class="neu-modal-gem neu-convex-gem"><i data-lucide="palette"></i></div>
              <div>
                <h3 class="neu-modal-title">Select Celebration Occasion</h3>
                <p class="neu-modal-subtitle">${templateCount} handcrafted themes for Romance, Birthdays, Family & Friends</p>
              </div>
            </div>
            <button type="button" class="btn-neu-icon btn-close-modal" id="btnCloseOccasionModal" aria-label="Close modal">
              <i data-lucide="x"></i>
            </button>
          </div>
          <div class="neu-modal-body">
            <div id="templateSelectorMount"></div>
          </div>
        </div>
      </div>

      <!-- Floating Bottom Dock on Mobile -->
      <div class="studio-mobile-bottom-bar neu-floating-dock" id="studioMobileBottomBar">
        <button type="button" class="btn-dock-item btn-dock-save neu-dock-btn" id="btnDockSaveDefault">
          <span class="dock-btn-icon"><i data-lucide="save"></i></span>
          <span class="dock-btn-label">Save</span>
        </button>
        <button type="button" class="btn-dock-item btn-dock-preview neu-dock-btn" id="btnDockPreviewToggle">
          <span class="dock-btn-icon"><i data-lucide="eye"></i></span>
          <span class="dock-btn-label">Live Preview</span>
        </button>
        <button type="button" class="btn-dock-item btn-dock-primary neu-dock-btn-primary" id="btnDockPublish">
          <span class="dock-btn-icon"><i data-lucide="share-2"></i></span>
          <span class="dock-btn-label">Share Link</span>
        </button>
      </div>

      <!-- Floating Saved Toast -->
      <div class="studio-floating-toast neu-toast-card" id="studioFloatingToast" role="alert" aria-live="polite">
        <i data-lucide="check-circle-2" style="color:#10b981;"></i>
        <div>
          <strong id="toastTitle">Website Saved!</strong><br />
          <span id="toastSubtitle">Your custom celebration is ready to share.</span>
        </div>
      </div>
    </div>
  `;

  renderStudioIcons(root);

  const selectorMount = root.querySelector('#templateSelectorMount');
  const editorMount = root.querySelector('#visualEditorMount');
  const previewContainer = root.querySelector('#previewContainer');
  const studioWorkspace = root.querySelector('#studioWorkspace');
  const floatingToast = root.querySelector('#studioFloatingToast');
  const sidebarEl = root.querySelector('#studioSidebar');

  const btnShare = root.querySelector('#btnSharePublish');
  const btnDockPublish = root.querySelector('#btnDockPublish');
  const btnHeaderSave = root.querySelector('#btnHeaderSave');
  const btnDockSaveDefault = root.querySelector('#btnDockSaveDefault');
  const btnMobileBackToEditor = root.querySelector('#btnMobileBackToEditor');
  const btnMobilePreviewShare = root.querySelector('#btnMobilePreviewShare');
  const btnDockPreviewToggle = root.querySelector('#btnDockPreviewToggle');
  const btnPreviewReload = root.querySelector('#btnPreviewReload');
  const btnEditorThemeToggle = root.querySelector('#btnEditorThemeToggle');

  // Occasion modal elements
  const occasionModalOverlay = root.querySelector('#occasionModalOverlay');
  const btnOpenOccasionModal = root.querySelector('#btnOpenOccasionModal');
  const btnNavbarOccasions = root.querySelector('#btnNavbarOccasions');
  const btnCloseOccasionModal = root.querySelector('#btnCloseOccasionModal');

  function openOccasionModal() {
    if (occasionModalOverlay) {
      occasionModalOverlay.style.display = 'flex';
      occasionModalOverlay.setAttribute('aria-hidden', 'false');
      renderStudioIcons(occasionModalOverlay);
    }
  }

  function closeOccasionModal() {
    if (occasionModalOverlay) {
      occasionModalOverlay.style.display = 'none';
      occasionModalOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  btnOpenOccasionModal?.addEventListener('click', openOccasionModal);
  btnNavbarOccasions?.addEventListener('click', openOccasionModal);
  btnCloseOccasionModal?.addEventListener('click', closeOccasionModal);
  occasionModalOverlay?.addEventListener('click', (e) => {
    if (e.target === occasionModalOverlay) closeOccasionModal();
  });

  // --- Dark / Light Mode Controller (Editor Mode Only) ---
  const studioLayoutEl = root.querySelector('.studio-layout');

  function applyEditorTheme(theme) {
    activeTheme = theme;
    localStorage.setItem('celebration_studio_editor_theme', theme);
    if (studioLayoutEl) {
      studioLayoutEl.classList.remove('studio-theme-dark', 'studio-theme-light');
      studioLayoutEl.classList.add(`studio-theme-${theme}`);
    }
    if (btnEditorThemeToggle) {
      const isDark = theme === 'dark';
      btnEditorThemeToggle.innerHTML = `
        <i data-lucide="${isDark ? 'sun' : 'moon'}" id="themeToggleIcon"></i>
        <span class="hide-mobile" id="themeToggleLabel">${isDark ? 'Light' : 'Dark'}</span>
      `;
      btnEditorThemeToggle.title = `Switch to ${isDark ? 'Soft UI Light' : 'Dark Tactile'} Mode`;
      renderStudioIcons(btnEditorThemeToggle);
    }
  }

  applyEditorTheme(activeTheme);

  btnEditorThemeToggle?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(10);
    applyEditorTheme(activeTheme === 'dark' ? 'light' : 'dark');
  });

  // Native smooth momentum scroll on sidebar (avoids Lenis clipping to firstElementChild)
  if (sidebarEl) {
    sidebarEl.style.scrollBehavior = 'smooth';
  }

  function showToast(title = "Website Saved!", subtitle = "Your custom celebration is saved.") {
    const tTitle = floatingToast.querySelector('#toastTitle');
    const tSub = floatingToast.querySelector('#toastSubtitle');
    if (tTitle) tTitle.textContent = title;
    if (tSub) tSub.textContent = subtitle;

    floatingToast.classList.add('visible');
    if (navigator.vibrate) navigator.vibrate([20, 30]);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#f43f5e', '#fbbf24', '#10b981', '#38bdf8']
    });

    setTimeout(() => {
      floatingToast.classList.remove('visible');
    }, 2800);
  }

  // Quick-switcher horizontal scroll controls & preview mute toggle
  const occScrollLeft = root.querySelector('#btnOccScrollLeft');
  const occScrollRight = root.querySelector('#btnOccScrollRight');
  const occPillsRow = root.querySelector('#occQuickPillsRow');
  occScrollLeft?.addEventListener('click', () => {
    occPillsRow?.scrollBy({ left: -200, behavior: 'smooth' });
  });
  occScrollRight?.addEventListener('click', () => {
    occPillsRow?.scrollBy({ left: 200, behavior: 'smooth' });
  });

  const btnPreviewMute = root.querySelector('#btnPreviewMute');
  btnPreviewMute?.addEventListener('click', () => {
    previewMuted = !previewMuted;
    if (previewContainer) {
      previewContainer.querySelectorAll('audio, video').forEach(m => {
        m.muted = previewMuted;
      });
    }
    btnPreviewMute.innerHTML = `<i data-lucide="${previewMuted ? 'volume-x' : 'volume-2'}"></i>`;
    renderStudioIcons(btnPreviewMute);
  });

  function resetStudioScrollPositions() {
    if (sidebarEl) sidebarEl.scrollTop = 0;
    if (previewContainer) previewContainer.scrollTop = 0;
    const recLink = root.querySelector('#btnRecipientViewLink');
    if (recLink) recLink.href = `/?template=${encodeURIComponent(activeTemplateId)}&mode=view&review=true`;
  }

  function updateNavbarOccasionBadge() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.long_romance;
    const elIcon = root.querySelector('#navTmplIcon');
    const elName = root.querySelector('#navTmplName');
    if (elIcon) elIcon.textContent = tmpl.icon || '🌸';
    if (elName) elName.textContent = tmpl.name;
  }

  function renderQuickOccasionStrip() {
    const stripRow = root.querySelector('#occQuickPillsRow');
    if (!stripRow) return;

    stripRow.innerHTML = uniqueTemplates.map(t => {
      const isSel = t.id === activeTemplateId;
      const cleanName = t.name
        .replace(/ Masterpiece| Celebration| Tribute| Sincere | & Tree| Surprise/g, '')
        .trim();
      return `
        <button type="button" class="occ-quick-pill ${isSel ? 'active' : ''}" data-tid="${t.id}" title="${t.name}">
          <span class="occ-pill-icon">${t.icon || '🌸'}</span>
          <span class="occ-pill-name">${cleanName}</span>
          ${isSel ? '<span class="occ-pill-dot"></span>' : ''}
        </button>
      `;
    }).join('');

    stripRow.querySelectorAll('.occ-quick-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(12);
        const tid = btn.getAttribute('data-tid');
        if (tid && tid !== activeTemplateId) {
          activeTemplateId = tid;
          activeData = getActiveCelebrationData(activeTemplateId);
          resetStudioScrollPositions();
          renderQuickOccasionStrip();
          updateNavbarOccasionBadge();
          mountTemplateSelector();
          mountEditor();
          schedulePreviewUpdate(true);
        }
      });
    });
  }

  function renderOccasionBanner() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.long_romance;
    const stripIcon = root.querySelector('#stripActiveIcon');
    const stripName = root.querySelector('#stripActiveName');
    if (stripIcon) stripIcon.textContent = tmpl.icon;
    if (stripName) stripName.textContent = tmpl.name;

    const navIcon = root.querySelector('#navTmplIcon');
    const navName = root.querySelector('#navTmplName');
    if (navIcon) navIcon.textContent = tmpl.icon;
    if (navName) navName.textContent = tmpl.name;
  }

  function switchMobileTab(tab) {
    currentMobileTab = tab;

    if (tab === 'editor') guideController?.setStep(2);
    else if (tab === 'preview') guideController?.setStep(3);

    root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    const studioLayout = root.querySelector('.studio-layout');
    if (studioLayout) {
      studioLayout.classList.remove('mobile-active-tab-editor', 'mobile-active-tab-preview');
      studioLayout.classList.add(`mobile-active-tab-${tab}`);
    }

    const sidebar = root.querySelector('#studioSidebar');
    const previewPane = root.querySelector('#studioPreviewPane');

    if (window.innerWidth <= 900) {
      if (tab === 'editor') {
        if (sidebar) sidebar.style.display = 'block';
        if (previewPane) previewPane.style.display = 'none';
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
          btnDockPreviewToggle.classList.remove('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
      } else if (tab === 'preview') {
        if (sidebar) sidebar.style.display = 'none';
        if (previewPane) previewPane.style.display = 'flex';
        if (needsPreviewUpdate) {
          updateLivePreview();
        }
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="wand-2"></i></span><span class="dock-btn-label">Back to Edit</span>`;
          btnDockPreviewToggle.classList.add('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
      }
    } else {
      if (sidebar) sidebar.style.display = '';
      if (previewPane) previewPane.style.display = '';
    }

    if (tab !== 'preview') {
      if (btnDockPreviewToggle) {
        btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
        btnDockPreviewToggle.classList.remove('dock-active-preview');
        renderStudioIcons(btnDockPreviewToggle);
      }
    }
  }

  // Viewport Switcher (Mobile / Tablet / Desktop)
  root.querySelectorAll('.btn-viewport-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const vp = btn.getAttribute('data-viewport');
      if (!vp) return;
      currentViewport = vp;

      root.querySelectorAll('.btn-viewport-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (previewContainer) {
        previewContainer.className = `preview-frame-container preview-viewport-${vp} neu-phone-chassis`;
      }
      if (navigator.vibrate) navigator.vibrate(10);
    });
  });

  // Reload Live Preview physics
  btnPreviewReload?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(15);
    updateLivePreview();
  });

  let previewDebounceTimer = null;
  let needsPreviewUpdate = true;

  function schedulePreviewUpdate(immediate = false) {
    needsPreviewUpdate = true;
    if (previewDebounceTimer) clearTimeout(previewDebounceTimer);

    const isMobile = window.innerWidth <= 900;
    if (isMobile && currentMobileTab !== 'preview') {
      // On mobile in editor mode, avoid redundant canvas overhead
      return;
    }

    if (immediate) {
      updateLivePreview();
    } else {
      previewDebounceTimer = setTimeout(() => {
        updateLivePreview();
      }, 300);
    }
  }

  function updateLivePreview() {
    try {
      if (previewContainer) {
        if (previewContainer._cleanup) {
          try { previewContainer._cleanup(); } catch {}
          previewContainer._cleanup = null;
        }
        if (previewContainer._museumCleanup) {
          try { previewContainer._museumCleanup(); } catch {}
          previewContainer._museumCleanup = null;
        }
        previewContainer.querySelectorAll('audio, video').forEach(a => {
          try { a.pause(); a.currentTime = 0; } catch {}
        });
        previewContainer.innerHTML = '';
      }
      renderViewerApp(previewContainer, activeTemplateId, activeData);
      if (previewContainer && previewMuted) {
        previewContainer.querySelectorAll('audio, video').forEach(m => {
          m.muted = true;
        });
      }
    } catch (err) {
      console.error('Error rendering live preview:', err);
    } finally {
      needsPreviewUpdate = false;
    }
  }

  function mountEditor() {
    renderOccasionBanner();
    renderQuickOccasionStrip();
    updateNavbarOccasionBadge();
    renderVisualEditor(editorMount, activeTemplateId, activeData, (updatedData) => {
      activeData = updatedData;
      saveActiveCelebration(activeTemplateId, activeData);
      schedulePreviewUpdate(false);
    });
  }

  let selectorInstance = null;
  function mountTemplateSelector() {
    selectorInstance = renderTemplateSelector(selectorMount, activeTemplateId, (newTid, action) => {
      activeTemplateId = newTid;
      activeData = getActiveCelebrationData(activeTemplateId);
      closeOccasionModal();
      resetStudioScrollPositions();
      mountTemplateSelector();
      mountEditor();
      schedulePreviewUpdate(true);

      if (action === 'preview') {
        switchMobileTab('preview');
        if (window.innerWidth > 900) {
          const prevEl = document.getElementById('studioPreviewPane');
          if (prevEl) prevEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        switchMobileTab('editor');
      }
    });
  }

  // Initialize Creator Journey Guide
  const guideMount = root.querySelector('#creatorGuideMount');
  const btnHeaderGuide = root.querySelector('#btnHeaderGuide');
  const guideController = renderCreatorGuide(guideMount, {
    onSwitchTab: (tab) => {
      if (tab === 'templates') openOccasionModal();
      else switchMobileTab(tab);
    },
    onOpenShare: () => triggerShare(),
    onFocusEditor: () => {
      const firstInput = root.querySelector('#visualEditorMount input[type="text"], #visualEditorMount textarea');
      if (firstInput) {
        firstInput.focus();
        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  btnHeaderGuide?.addEventListener('click', () => {
    guideController?.expand();
    guideController?.startTour();
  });

  // Mobile tab click listeners
  root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(15);
      const tab = btn.getAttribute('data-tab');
      switchMobileTab(tab);
    });
  });

  // Dock preview toggle listener
  btnDockPreviewToggle?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(15);
    if (currentMobileTab === 'preview') {
      switchMobileTab('editor');
    } else {
      switchMobileTab('preview');
    }
  });

  // Back to editor inside preview device header
  btnMobileBackToEditor?.addEventListener('click', () => {
    switchMobileTab('editor');
  });

  // Save Website handler
  function handleSaveWebsite() {
    saveActiveCelebration(activeTemplateId, activeData);
    showToast("Website Saved!", "All custom photos, music & messages are saved.");
  }

  btnHeaderSave?.addEventListener('click', handleSaveWebsite);
  btnDockSaveDefault?.addEventListener('click', handleSaveWebsite);

  // Share/Deploy triggers
  function triggerShare() {
    saveActiveCelebration(activeTemplateId, activeData);
    guideController?.setStep(4);
    openShareModal(activeTemplateId, activeData);
  }

  btnShare?.addEventListener('click', triggerShare);
  btnDockPublish?.addEventListener('click', triggerShare);
  btnMobilePreviewShare?.addEventListener('click', triggerShare);

  // Initial mounts and first preview render
  mountTemplateSelector();
  mountEditor();
  schedulePreviewUpdate(true);
  if (window.innerWidth <= 900) {
    switchMobileTab('editor');
  }

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const isMobileNow = window.innerWidth <= 900;
    const wasMobile = lastWidth <= 900;
    if (isMobileNow !== wasMobile) {
      lastWidth = window.innerWidth;
      if (isMobileNow) {
        switchMobileTab(currentMobileTab);
      } else {
        const sidebar = root.querySelector('#studioSidebar');
        const previewPane = root.querySelector('#studioPreviewPane');
        if (sidebar) sidebar.style.display = '';
        if (previewPane) previewPane.style.display = '';
      }
    }
  });
  }
}
