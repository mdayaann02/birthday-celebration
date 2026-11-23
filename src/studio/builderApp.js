// src/studio/builderApp.js - Celebration Studio 3.0 (Pro Glassmorphism Edition)
// 100% Free, High-Conversion Modern UI with Dual-Viewport Live Preview

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

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '');
  const urlTid = searchParams.get('template') || (hash.startsWith('template=') ? hash.substring(9) : null) || (TEMPLATES[hash] ? hash : null);
  let activeTemplateId = (urlTid && TEMPLATES[urlTid]) ? urlTid : "long_romance";
  let activeData = getActiveCelebrationData(activeTemplateId);
  let currentMobileTab = "editor"; // "templates" | "editor" | "preview"
  let currentViewport = "mobile"; // "mobile" | "tablet" | "desktop"

  root.innerHTML = `
    <div class="studio-layout">
      <!-- Pure CSS Subtle Ambient Mesh Canvas Background -->
      <div class="studio-ambient-mesh" aria-hidden="true">
        <div class="mesh-orb mesh-orb-1"></div>
        <div class="mesh-orb mesh-orb-2"></div>
        <div class="mesh-orb mesh-orb-3"></div>
      </div>

      <!-- 1. FLOATING GLASS NAVBAR (Sticky) -->
      <header class="studio-navbar-glass" id="studioNavbar">
        <div class="navbar-glass-inner">
          <!-- Brand Mark -->
          <a href="/" class="studio-brand-link">
            <div class="studio-brand-gem">
              <i data-lucide="sparkles"></i>
            </div>
            <div class="studio-brand-meta">
              <div class="brand-title-row">
                <span class="brand-name">Celebration Studio</span>
                <span class="badge-free-pill">100% Free</span>
              </div>
              <span class="brand-subtext">Instant Interactive Wishing Websites</span>
            </div>
          </a>

          <!-- Quick Occasion Jump Links (Desktop) -->
          <nav class="navbar-nav-links" id="navbarOccasionLinks" aria-label="Occasion Categories">
            <button type="button" class="nav-occasion-link active" data-filter="all">All</button>
            <button type="button" class="nav-occasion-link" data-filter="romance">Romance</button>
            <button type="button" class="nav-occasion-link" data-filter="birthday">Birthday</button>
            <button type="button" class="nav-occasion-link" data-filter="family">Family</button>
            <button type="button" class="nav-occasion-link" data-filter="friends">Friends</button>
          </nav>

          <!-- Primary Actions -->
          <div class="navbar-actions-group">
            <button type="button" class="btn-nav-glass btn-nav-guide" id="btnHeaderGuide" title="Step-by-step creator guide">
              <i data-lucide="compass"></i>
              <span class="hide-mobile">Guide</span>
            </button>
            <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="btn-nav-glass btn-nav-recipient" title="Preview as recipient in new tab">
              <i data-lucide="eye"></i>
              <span class="hide-mobile">Recipient View</span>
            </a>
            <button type="button" class="btn-nav-glass btn-nav-save" id="btnHeaderSave" title="Save celebration website">
              <i data-lucide="save"></i>
              <span class="hide-mobile">Save</span>
            </button>
            <button type="button" class="btn-nav-primary" id="btnCreateWishNav" title="Create a celebration wish">
              <i data-lucide="wand-2"></i>
              <span class="hide-mobile">Create a Wish</span>
            </button>
            <button type="button" class="btn-nav-share" id="btnSharePublish" title="Get permanent shareable link">
              <i data-lucide="share-2"></i>
              <span class="hide-mobile">Share Link</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Segmented Navigation Tabs (Sticky Under Navbar on Mobile Viewports) -->
      <nav class="studio-mobile-tabs" id="studioMobileTabs" aria-label="Editor View Tabs">
        <button type="button" class="mobile-tab-btn" data-tab="templates" id="tabBtnTemplates">
          <span class="tab-btn-icon"><i data-lucide="palette"></i></span>
          <span class="tab-btn-text">Occasions</span>
        </button>
        <button type="button" class="mobile-tab-btn active" data-tab="editor" id="tabBtnEditor">
          <span class="tab-btn-icon"><i data-lucide="wand-2"></i></span>
          <span class="tab-btn-text">Customize</span>
        </button>
        <button type="button" class="mobile-tab-btn" data-tab="preview" id="tabBtnPreview">
          <span class="tab-btn-icon"><i data-lucide="eye"></i></span>
          <span class="tab-btn-text">Live Preview</span>
          <span class="tab-live-pulse"></span>
        </button>
      </nav>

      <!-- 2. FOCUSED HERO SECTION -->
      <section class="studio-hero-section" id="heroSection">
        <div class="hero-inner-container">
          <div class="hero-content-col">
            <div class="hero-badge-strip">
              <span class="hero-pill-badge">
                <i data-lucide="sparkles" style="width:12px; height:12px; color:#d4235c;"></i>
                <span>100% Free Forever • Zero Sign-Up • Instant WhatsApp Link</span>
              </span>
            </div>

            <h1 class="hero-headline">
              Craft Unforgettable Celebration Websites In Seconds
            </h1>

            <p class="hero-subheadline">
              Design interactive wishing experiences with 3D polaroids, real music, physics & personal messages — 100% free with no credit card or account needed.
            </p>

            <div class="hero-cta-cluster">
              <button type="button" class="btn-hero-primary" id="btnHeroCreate">
                <i data-lucide="wand-2"></i>
                <span>Start Creating — It's Free ✨</span>
              </button>
              <button type="button" class="btn-hero-secondary" id="btnHeroBrowse">
                <i data-lucide="palette"></i>
                <span>Explore 14 Templates ↓</span>
              </button>
            </div>
          </div>

          <!-- Hero Sample Preview Glass Showcase Card -->
          <div class="hero-showcase-col">
            <div class="hero-showcase-glass-card" id="heroSampleCard">
              <div class="showcase-card-header">
                <div class="showcase-header-left">
                  <span class="showcase-pulse-dot"></span>
                  <span class="showcase-live-tag">LIVE CELEBRATION PREVIEW</span>
                </div>
                <span class="showcase-free-pill">Free Template</span>
              </div>

              <div class="showcase-card-preview-body">
                <div class="showcase-icon-bubble" id="showcaseTmplIcon">🏹🌸</div>
                <h3 class="showcase-tmpl-title" id="showcaseTmplName">Long Romance Masterpiece</h3>
                <p class="showcase-tmpl-desc" id="showcaseTmplDesc">
                  Cupid's recurve bow, blooming canvas tree, 3D polaroid scrapbook, and twilight sky lanterns with full soundtrack.
                </p>
                <div class="showcase-tags-row">
                  <span class="showcase-tag">✨ 60FPS Physics</span>
                  <span class="showcase-tag">🎵 Real Music</span>
                  <span class="showcase-tag">📱 100% Responsive</span>
                </div>
              </div>

              <div class="showcase-card-footer">
                <button type="button" class="btn-showcase-customize" id="btnShowcaseCustomize">
                  <i data-lucide="wand-2"></i>
                  <span>Customize This Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. COMPACT 3-STEP STRIP -->
      <section class="studio-3step-strip" aria-label="How it works">
        <div class="step-strip-inner">
          <div class="step-strip-card">
            <div class="step-num-pill">01</div>
            <div class="step-info">
              <h4 class="step-title">Pick Occasion</h4>
              <p class="step-desc">Choose from 14 handcrafted themes for Romance, Birthdays, Family & Besties.</p>
            </div>
          </div>

          <div class="step-strip-divider" aria-hidden="true">
            <i data-lucide="arrow-right"></i>
          </div>

          <div class="step-strip-card">
            <div class="step-num-pill">02</div>
            <div class="step-info">
              <h4 class="step-title">Personalize Story</h4>
              <p class="step-desc">Add your polaroid photos, choose favorite songs & type heartfelt letters.</p>
            </div>
          </div>

          <div class="step-strip-divider" aria-hidden="true">
            <i data-lucide="arrow-right"></i>
          </div>

          <div class="step-strip-card">
            <div class="step-num-pill">03</div>
            <div class="step-info">
              <h4 class="step-title">Share in 1-Tap</h4>
              <p class="step-desc">Get an instant, permanent WhatsApp-ready link with zero sign-up required.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. OCCASION FILTER & BENTO TEMPLATE GALLERY SECTION -->
      <section class="studio-gallery-section" id="templatesSection">
        <div class="section-glass-container">
          <div class="section-header-row">
            <div>
              <div class="section-step-badge">
                <i data-lucide="palette"></i>
                <span>STEP 1: CHOOSE OCCASION</span>
              </div>
              <h2 class="section-title">Handcrafted Celebration Gallery</h2>
              <p class="section-subtitle">Select any template below to customize its special story, live physics & animations:</p>
            </div>
          </div>

          <!-- Template Selector Mount -->
          <div id="templateSelectorMount"></div>
        </div>
      </section>

      <!-- 5. INTERACTIVE CUSTOMIZER & DUAL-VIEWPORT WORKSPACE -->
      <section class="studio-customizer-section" id="customizerSection">
        <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
          <!-- Controls & Editor Sidebar -->
          <div class="studio-sidebar" id="studioSidebar">
            <!-- Step-by-Step Interactive Creator Journey Guide Mount -->
            <div id="creatorGuideMount"></div>

            <!-- Current Occasion Active Switcher Banner -->
            <div class="studio-occasion-banner" id="studioOccasionBanner"></div>

            <div class="customizer-subheading">
              <i data-lucide="sliders"></i>
              <span>STEP 2: PERSONALIZE EVERYTHING</span>
            </div>

            <!-- Visual Editor Mount (Collapsible Accordion Form Cards) -->
            <div id="visualEditorMount"></div>
          </div>

          <!-- Live Real-Time Interactive Preview Pane -->
          <div class="studio-preview-pane" id="studioPreviewPane">
            <div class="preview-device-header">
              <button type="button" class="btn-preview-back-mobile" id="btnMobileBackToEditor">
                <i data-lucide="wand-2"></i>
                <span>Back to Edit</span>
              </button>

              <!-- Viewport Switcher -->
              <div class="preview-viewport-switcher" id="viewportSwitcher" role="group" aria-label="Preview Device Viewports">
                <button type="button" class="btn-viewport-toggle active" data-viewport="mobile" title="Mobile Phone View (9:16 Aspect Ratio)">
                  <i data-lucide="smartphone"></i>
                  <span class="viewport-label">9:16 Mobile</span>
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
                <button type="button" class="btn-preview-share-mobile" id="btnMobilePreviewShare">
                  <i data-lucide="share-2"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div class="preview-frame-container preview-viewport-mobile" id="previewContainer"></div>
          </div>
        </div>
      </section>

      <!-- Floating Bottom Dock on Mobile -->
      <div class="studio-mobile-bottom-bar" id="studioMobileBottomBar">
        <button type="button" class="btn-dock-item btn-dock-save" id="btnDockSaveDefault">
          <span class="dock-btn-icon"><i data-lucide="save"></i></span>
          <span class="dock-btn-label">Save</span>
        </button>
        <button type="button" class="btn-dock-item btn-dock-preview" id="btnDockPreviewToggle">
          <span class="dock-btn-icon"><i data-lucide="eye"></i></span>
          <span class="dock-btn-label">Live Preview</span>
        </button>
        <button type="button" class="btn-dock-item btn-dock-primary" id="btnDockPublish">
          <span class="dock-btn-icon"><i data-lucide="share-2"></i></span>
          <span class="dock-btn-label">Share Link</span>
        </button>
      </div>

      <!-- 6. MINIMAL CLEAN FOOTER -->
      <footer class="studio-footer-glass">
        <div class="footer-glass-inner">
          <div class="footer-brand-col">
            <div class="footer-brand-title">
              <div class="footer-gem"><i data-lucide="sparkles"></i></div>
              <span>Celebration Studio</span>
              <span class="footer-free-badge">100% Free Open Platform</span>
            </div>
            <p class="footer-desc">
              Create, customize, and share interactive celebration websites for birthdays, romance, apologies, anniversaries, and family.
            </p>
          </div>

          <div class="footer-links-col">
            <span class="footer-col-heading">Quick Actions</span>
            <button type="button" class="footer-link-btn" id="btnFooterTemplates">Occasion Gallery</button>
            <button type="button" class="footer-link-btn" id="btnFooterCustomizer">Live Customizer</button>
            <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="footer-link-btn">Recipient View →</a>
          </div>

          <div class="footer-bottom-row">
            <span>© 2026 Celebration Studio • Built with Love • No payment or signup required.</span>
          </div>
        </div>
      </footer>

      <!-- Floating Saved Toast -->
      <div class="studio-floating-toast" id="studioFloatingToast" role="alert" aria-live="polite">
        <i data-lucide="check-circle-2" style="color:#22c55e;"></i>
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

  // Hero section buttons
  const btnHeroCreate = root.querySelector('#btnHeroCreate');
  const btnHeroBrowse = root.querySelector('#btnHeroBrowse');
  const btnCreateWishNav = root.querySelector('#btnCreateWishNav');
  const btnShowcaseCustomize = root.querySelector('#btnShowcaseCustomize');
  const btnFooterTemplates = root.querySelector('#btnFooterTemplates');
  const btnFooterCustomizer = root.querySelector('#btnFooterCustomizer');

  // Smooth scroll helpers
  function scrollToCustomizer() {
    switchMobileTab('editor');
    const el = document.getElementById('customizerSection');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollToTemplates() {
    switchMobileTab('templates');
    const el = document.getElementById('templatesSection');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  btnHeroCreate?.addEventListener('click', scrollToCustomizer);
  btnCreateWishNav?.addEventListener('click', scrollToCustomizer);
  btnShowcaseCustomize?.addEventListener('click', scrollToCustomizer);
  btnHeroBrowse?.addEventListener('click', scrollToTemplates);
  btnFooterTemplates?.addEventListener('click', scrollToTemplates);
  btnFooterCustomizer?.addEventListener('click', scrollToCustomizer);

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
      colors: ['#d4235c', '#fbbf24', '#f59e0b', '#ec4899']
    });

    setTimeout(() => {
      floatingToast.classList.remove('visible');
    }, 2800);
  }

  function updateHeroShowcaseCard() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.long_romance;
    const elIcon = root.querySelector('#showcaseTmplIcon');
    const elName = root.querySelector('#showcaseTmplName');
    const elDesc = root.querySelector('#showcaseTmplDesc');

    if (elIcon) elIcon.textContent = tmpl.icon || '🌸';
    if (elName) elName.textContent = tmpl.name;
    if (elDesc) elDesc.textContent = tmpl.description;
  }

  function renderOccasionBanner() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.long_romance;
    if (!occasionBannerMount) return;

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
      scrollToTemplates();
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

    const studioLayout = root.querySelector('.studio-layout');
    if (studioLayout) {
      studioLayout.classList.remove('mobile-active-tab-editor', 'mobile-active-tab-templates', 'mobile-active-tab-preview');
      studioLayout.classList.add(`mobile-active-tab-${tab}`);
    }

    const secTemplates = root.querySelector('#templatesSection');
    const secCustomizer = root.querySelector('#customizerSection');
    const sidebar = root.querySelector('#studioSidebar');
    const previewPane = root.querySelector('#studioPreviewPane');

    if (window.innerWidth <= 900) {
      if (tab === 'templates') {
        if (secTemplates) secTemplates.style.display = 'block';
        if (secCustomizer) secCustomizer.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (previewPane) previewPane.style.display = 'none';
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
          btnDockPreviewToggle.classList.remove('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (tab === 'editor') {
        if (secTemplates) secTemplates.style.display = 'none';
        if (secCustomizer) secCustomizer.style.display = 'block';
        if (sidebar) sidebar.style.display = 'block';
        if (previewPane) previewPane.style.display = 'none';
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
          btnDockPreviewToggle.classList.remove('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (tab === 'preview') {
        if (secTemplates) secTemplates.style.display = 'none';
        if (secCustomizer) secCustomizer.style.display = 'block';
        if (sidebar) sidebar.style.display = 'none';
        if (previewPane) previewPane.style.display = 'flex';
        if (needsPreviewUpdate) {
          updateLivePreview();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="wand-2"></i></span><span class="dock-btn-label">Back to Edit</span>`;
          btnDockPreviewToggle.classList.add('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
      }
    } else {
      if (secTemplates) secTemplates.style.display = 'block';
      if (secCustomizer) secCustomizer.style.display = 'block';
      if (sidebar) sidebar.style.display = 'block';
      if (previewPane) previewPane.style.display = 'flex';
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
    updateHeroShowcaseCard();
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
      mountTemplateSelector();
      mountEditor();
      schedulePreviewUpdate(true);

      if (action === 'preview') {
        switchMobileTab('preview');
        const prevEl = document.getElementById('studioPreviewPane');
        if (prevEl) prevEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        scrollToCustomizer();
      }
    });
  }

  // Navbar occasion filter link clicks
  root.querySelectorAll('.nav-occasion-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      root.querySelectorAll('.nav-occasion-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (selectorInstance && cat) {
        selectorInstance.setCategory(cat);
        scrollToTemplates();
      }
    });
  });

  // Initialize Creator Journey Guide
  const guideMount = root.querySelector('#creatorGuideMount');
  const btnHeaderGuide = root.querySelector('#btnHeaderGuide');
  const guideController = renderCreatorGuide(guideMount, {
    onSwitchTab: (tab) => switchMobileTab(tab),
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

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      switchMobileTab(currentMobileTab);
    } else {
      const secTemplates = root.querySelector('#templatesSection');
      const secCustomizer = root.querySelector('#customizerSection');
      const sidebar = root.querySelector('#studioSidebar');
      const previewPane = root.querySelector('#studioPreviewPane');
      if (secTemplates) secTemplates.style.display = 'block';
      if (secCustomizer) secCustomizer.style.display = 'block';
      if (sidebar) sidebar.style.display = 'block';
      if (previewPane) previewPane.style.display = 'flex';
    }
  });
}
