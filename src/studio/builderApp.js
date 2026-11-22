// src/studio/builderApp.js - Celebration Studio 2.0 (Warm Luxury Palette Edition)
// 100% Mobile Compatible, Page-by-Page Interactive Celebration Creator

import confetti from 'canvas-confetti';
import Lenis from 'lenis';
import { TEMPLATES } from '../models/templateRegistry.js';
import { 
  saveLocalDraft, 
  getLocalDraft, 
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

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '');
  const urlTid = searchParams.get('template') || (hash.startsWith('template=') ? hash.substring(9) : null) || (TEMPLATES[hash] ? hash : null);
  let activeTemplateId = (urlTid && TEMPLATES[urlTid]) ? urlTid : "long_romance";
  let activeData = getActiveCelebrationData(activeTemplateId);
  let currentMobileTab = "editor"; // "templates" | "editor" | "preview"
  let currentViewport = "mobile"; // "mobile" | "tablet" | "desktop"

  root.innerHTML = `
    <div class="studio-layout">
      <!-- Dynamic Warm Ambient Aurora Glassmorphism Background -->
      <div class="studio-aurora-bg" aria-hidden="true">
        <div class="aurora-orb aurora-orb-1"></div>
        <div class="aurora-orb aurora-orb-2"></div>
        <div class="aurora-orb aurora-orb-3"></div>
        <div class="aurora-orb aurora-orb-4"></div>
      </div>

      <!-- Top Info Banner -->
      <div class="studio-top-mode-bar" id="studioModeBar">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="studio-mode-pill"><span class="pill-dot"></span> LIVE BUILDER PRO</span>
          <span class="studio-mode-hint" id="studioAutoSaveStatus">
            <i data-lucide="shield-check" style="width:13px; height:13px; color:#10b981;"></i>
            <span>All changes automatically saved to local storage & cloud</span>
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="btn-top-recipient-link">
            <i data-lucide="eye" style="width:12px; height:12px;"></i>
            <span>Recipient View</span>
            <i data-lucide="arrow-right" style="width:11px; height:11px;"></i>
          </a>
        </div>
      </div>

      <!-- Studio Header -->
      <header class="studio-header">
        <div class="studio-brand">
          <div class="studio-logo-gem">
            <i data-lucide="sparkles" style="color:#fff; width:20px; height:20px;"></i>
          </div>
          <div class="studio-title-wrap">
            <div style="display:flex; align-items:center; gap:8px;">
              <h1 class="studio-title">Celebration Studio</h1>
              <span class="studio-version-tag">2.0 PRO</span>
            </div>
            <span class="studio-tagline">Craft emotional luxury websites with live physics & music</span>
          </div>
        </div>

        <div class="studio-header-actions">
          <button class="btn-studio-action btn-header-guide" id="btnHeaderGuide" title="Step-by-step creator guide">
            <i data-lucide="compass"></i>
            <span>Guide</span>
          </button>
          <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="btn-studio-action btn-header-recipient" title="Open website as recipient">
            <i data-lucide="eye"></i>
            <span>Recipient View</span>
          </a>
          <button class="btn-studio-action btn-save-primary" id="btnHeaderSave" title="Save celebration website">
            <i data-lucide="save"></i>
            <span>Save Website</span>
          </button>
          <button class="btn-studio-primary" id="btnSharePublish" title="Generate shareable short-link">
            <i data-lucide="share-2"></i>
            <span>Get Share Link</span>
          </button>
        </div>
      </header>

      <!-- Mobile Segmented Navigation Controller -->
      <nav class="studio-mobile-tabs" id="studioMobileTabs" aria-label="Editor View Tabs">
        <button class="mobile-tab-btn" data-tab="templates" id="tabBtnTemplates">
          <span class="tab-btn-icon"><i data-lucide="palette"></i></span>
          <span class="tab-btn-text">Occasions</span>
        </button>
        <button class="mobile-tab-btn active" data-tab="editor" id="tabBtnEditor">
          <span class="tab-btn-icon"><i data-lucide="wand-2"></i></span>
          <span class="tab-btn-text">Customize</span>
        </button>
        <button class="mobile-tab-btn" data-tab="preview" id="tabBtnPreview">
          <span class="tab-btn-icon"><i data-lucide="eye"></i></span>
          <span class="tab-btn-text">Live Preview</span>
          <span class="tab-live-pulse"></span>
        </button>
      </nav>

      <!-- Main Studio Workspace -->
      <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
        <!-- Controls & Editor Sidebar -->
        <div class="studio-sidebar" id="studioSidebar">
          <!-- Step-by-Step Interactive Creator Journey Guide -->
          <div id="creatorGuideMount"></div>

          <!-- Section 1: Template Gallery (Tab "templates" on mobile) -->
          <div class="studio-tab-section studio-tab-templates" id="tabTemplatesSection">
            <div id="templateSelectorMount"></div>
          </div>

          <!-- Section 2: Visual Customization Form (Tab "editor" on mobile) -->
          <div class="studio-tab-section studio-tab-editor active" id="tabEditorSection">
            <!-- Current Occasion Switcher Banner -->
            <div class="studio-occasion-banner" id="studioOccasionBanner"></div>
            
            <div class="studio-subheading step2-heading" style="margin-top:16px;">
              <i data-lucide="sliders"></i>
              <span>STEP 2: CUSTOMIZE EVERYTHING</span>
            </div>
            <div id="visualEditorMount"></div>
          </div>
        </div>

        <!-- Live Real-Time Interactive Preview Pane -->
        <div class="studio-preview-pane" id="studioPreviewPane">
          <div class="preview-device-header">
            <button class="btn-preview-back-mobile" id="btnMobileBackToEditor">
              <i data-lucide="wand-2"></i>
              <span>Back to Edit</span>
            </button>

            <!-- Viewport Switcher -->
            <div class="preview-viewport-switcher" id="viewportSwitcher">
              <button type="button" class="btn-viewport-toggle active" data-viewport="mobile" title="Mobile Phone View (390px)">
                <i data-lucide="smartphone"></i>
                <span class="viewport-label">Mobile</span>
              </button>
              <button type="button" class="btn-viewport-toggle" data-viewport="tablet" title="Tablet View (768px)">
                <i data-lucide="tablet"></i>
                <span class="viewport-label">Tablet</span>
              </button>
              <button type="button" class="btn-viewport-toggle" data-viewport="desktop" title="Desktop Full-Width View">
                <i data-lucide="monitor"></i>
                <span class="viewport-label">Desktop</span>
              </button>
            </div>

            <span class="preview-url-bar" id="previewUrlBar">
              <i data-lucide="lock" style="width:11px; height:11px; color:#10b981;"></i>
              <span class="url-text">https://celebration.live/#preview</span>
            </span>

            <div class="preview-device-actions">
              <button type="button" class="btn-preview-reload" id="btnPreviewReload" title="Reload celebration physics">
                <i data-lucide="rotate-ccw"></i>
              </button>
              <button class="btn-preview-share-mobile" id="btnMobilePreviewShare">
                <i data-lucide="share-2"></i>
                <span>Share Link</span>
              </button>
            </div>
          </div>
          <div class="preview-frame-container preview-viewport-mobile" id="previewContainer"></div>
        </div>
      </div>

      <!-- Floating Bottom Dock on Mobile -->
      <div class="studio-mobile-bottom-bar" id="studioMobileBottomBar">
        <button class="btn-dock-item btn-dock-save" id="btnDockSaveDefault">
          <span class="dock-btn-icon"><i data-lucide="save"></i></span>
          <span class="dock-btn-label">Save Website</span>
        </button>
        <button class="btn-dock-item btn-dock-preview" id="btnDockPreviewToggle">
          <span class="dock-btn-icon"><i data-lucide="eye"></i></span>
          <span class="dock-btn-label">Live Preview</span>
        </button>
        <button class="btn-dock-item btn-dock-primary" id="btnDockPublish">
          <span class="dock-btn-icon"><i data-lucide="share-2"></i></span>
          <span class="dock-btn-label">Share Link</span>
        </button>
      </div>

      <!-- Floating Saved Toast -->
      <div class="studio-floating-toast" id="studioFloatingToast">
        <i data-lucide="check-circle-2" style="color:#22c55e;"></i>
        <strong>Website Saved!</strong><br />
        <span>Your custom celebration is ready to share.</span>
      </div>
    </div>
  `;

  renderStudioIcons(root);

  const selectorMount = root.querySelector('#templateSelectorMount');
  const editorMount = root.querySelector('#visualEditorMount');
  const previewContainer = root.querySelector('#previewContainer');
  const occasionBannerMount = root.querySelector('#studioOccasionBanner');
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

  // Initialize Lenis smooth scroll on desktop sidebar (native touch on mobile for zero lag)
  let lenisInstance = null;
  if (sidebarEl && window.innerWidth > 900) {
    try {
      lenisInstance = new Lenis({
        wrapper: sidebarEl,
        content: sidebarEl.firstElementChild,
        smoothWheel: true,
        syncTouch: false
      });
      function raf(time) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (_) {}
  }

  function showToast(title = "Website Saved!", subtitle = "Your custom celebration is saved.") {
    floatingToast.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <i data-lucide="check-circle-2" style="color:#22c55e; width:20px; height:20px;"></i>
        <div>
          <strong style="color:#fff; font-size:13px;">${title}</strong><br />
          <span style="color:#cbd5e1; font-size:11px;">${subtitle}</span>
        </div>
      </div>
    `;
    renderStudioIcons(floatingToast);
    floatingToast.classList.add('visible');
    if (navigator.vibrate) navigator.vibrate([20, 30]);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#d4235c', '#fbbf24', '#f59e0b', '#ec4899']
    });

    setTimeout(() => {
      floatingToast.classList.remove('visible');
    }, 2800);
  }

  function renderOccasionBanner() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.blossom;
    occasionBannerMount.innerHTML = `
      <div class="occ-banner-card">
        <div class="occ-banner-left">
          <div class="occ-banner-icon-wrap">
            <span class="occ-banner-icon">${tmpl.icon}</span>
          </div>
          <div class="occ-banner-info">
            <span class="occ-banner-badge">${tmpl.badge}</span>
            <span class="occ-banner-name">${tmpl.name}</span>
          </div>
        </div>
        <button type="button" class="btn-switch-occasion" id="btnBannerSwitchOccasion">
          <span>Change Occasion</span>
          <i data-lucide="chevron-down"></i>
        </button>
      </div>
    `;
    renderStudioIcons(occasionBannerMount);

    occasionBannerMount.querySelector('#btnBannerSwitchOccasion')?.addEventListener('click', () => {
      switchMobileTab('templates');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function switchMobileTab(tab) {
    currentMobileTab = tab;

    if (tab === 'templates') guideController?.setStep(1);
    else if (tab === 'editor') guideController?.setStep(2);
    else if (tab === 'preview') guideController?.setStep(3);

    root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    studioWorkspace.classList.remove('mobile-view-editor', 'mobile-view-templates', 'mobile-view-preview');
    studioWorkspace.classList.add(`mobile-view-${tab}`);

    const secTemplates = root.querySelector('#tabTemplatesSection');
    const secEditor = root.querySelector('#tabEditorSection');

    if (secTemplates) secTemplates.classList.toggle('active', tab === 'templates');
    if (secEditor) secEditor.classList.toggle('active', tab === 'editor');

    if (tab === 'preview') {
      if (needsPreviewUpdate) {
        updateLivePreview();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (btnDockPreviewToggle) {
        btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="wand-2"></i></span><span class="dock-btn-label">Back to Edit</span>`;
        btnDockPreviewToggle.classList.add('dock-active-preview');
        renderStudioIcons(btnDockPreviewToggle);
      }
    } else {
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
        previewContainer.className = `preview-frame-container preview-viewport-${vp}`;
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
      // On mobile in editor mode, do not waste CPU cycles rendering offscreen canvas
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
        previewContainer.querySelectorAll('audio').forEach(a => {
          try { a.pause(); a.currentTime = 0; } catch {}
        });
        previewContainer.innerHTML = '';
      }
      renderViewerApp(previewContainer, activeTemplateId, activeData);
    } catch (err) {
      console.error('Error rendering live preview:', err);
    } finally {
      needsPreviewUpdate = false;
    }
  }

  function mountEditor() {
    renderOccasionBanner();
    renderVisualEditor(editorMount, activeTemplateId, activeData, (updatedData) => {
      activeData = updatedData;
      saveActiveCelebration(activeTemplateId, activeData);
      schedulePreviewUpdate(false);
    });
  }

  function mountTemplateSelector() {
    renderTemplateSelector(selectorMount, activeTemplateId, (newTid) => {
      activeTemplateId = newTid;
      activeData = getActiveCelebrationData(activeTemplateId);
      mountTemplateSelector();
      mountEditor();
      schedulePreviewUpdate(true);
      switchMobileTab('editor');
    });
  }

  // Initialize Creator Journey Step-by-Step Guide
  const guideMount = root.querySelector('#creatorGuideMount');
  const btnHeaderGuide = root.querySelector('#btnHeaderGuide');
  const guideController = renderCreatorGuide(guideMount, {
    onSwitchTab: (tab) => switchMobileTab(tab),
    onOpenShare: () => triggerShare(),
    onFocusEditor: () => {
      const firstInput = root.querySelector('#tabEditorSection input[type="text"], #tabEditorSection textarea');
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
  renderOccasionBanner();
}
