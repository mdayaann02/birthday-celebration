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
      <!-- 1. CLEAN FUNCTIONAL NAVBAR -->
      <header class="studio-navbar" id="studioNavbar">
        <div class="navbar-inner">
          <!-- Brand Mark -->
          <a href="/" class="studio-brand-link">
            <span class="brand-name">Celebration Studio</span>
            <span class="brand-tagline">Private Web Platform</span>
          </a>

          <!-- Simple Navigation Links -->
          <nav class="navbar-nav-links" id="navbarOccasionLinks" aria-label="Main Navigation">
            <a href="#templatesSection" class="nav-text-link">Templates</a>
            <a href="#customizerSection" class="nav-text-link">Customizer</a>
            <button type="button" class="nav-text-link" id="navPreviewLink">Live Preview</button>
            <a href="#proofSection" class="nav-text-link">Standards</a>
            <a href="#contactSection" class="nav-text-link">Contact</a>
          </nav>

          <!-- Primary Actions (1 Consistent Button Style) -->
          <div class="navbar-actions-group">
            <button type="button" class="btn-studio-secondary" id="btnEditorThemeToggle" title="Toggle Theme">
              <span id="themeToggleLabel">Light Mode</span>
            </button>
            <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="btn-studio-secondary" title="Preview sample celebration">
              Recipient View
            </a>
            <button type="button" class="btn-studio-secondary" id="btnHeaderSave" title="Save celebration website">
              Save Website
            </button>
            <button type="button" class="btn-studio-primary" id="btnSharePublish" title="Generate shareable link">
              Share Link
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Segmented Navigation Tabs -->
      <nav class="studio-mobile-tabs" id="studioMobileTabs" aria-label="Editor View Tabs">
        <button type="button" class="mobile-tab-btn" data-tab="templates" id="tabBtnTemplates">
          <span class="tab-btn-text">Templates</span>
        </button>
        <button type="button" class="mobile-tab-btn active" data-tab="editor" id="tabBtnEditor">
          <span class="tab-btn-text">Customize</span>
        </button>
        <button type="button" class="mobile-tab-btn" data-tab="preview" id="tabBtnPreview">
          <span class="tab-btn-text">Live Preview</span>
        </button>
      </nav>

      <!-- 2. HOME PAGE HERO: CLEAR DESCRIPTIVE HEADLINE & SHORT LEFT-ALIGNED COPY -->
      <section class="studio-hero-section" id="heroSection">
        <div class="hero-inner-container">
          <div class="hero-content-col">
            <div class="hero-category-label">CELEBRATION WEBSITE PLATFORM</div>

            <h1 class="editor-page-heading">
              Interactive Celebration Websites for Private Milestones
            </h1>

            <p class="editor-hero-copy">
              Design and share private celebration websites for birthdays, romantic anniversaries, and personal milestones. Customize templates with music, interactive photo scrapbooks, and personal letters, delivered through a single private link.
            </p>

            <div class="editor-cta-group">
              <button type="button" class="btn-studio-primary" id="btnHeroCreate">
                Open Customizer
              </button>
              <button type="button" class="btn-studio-secondary" id="btnHeroBrowse">
                Browse 14 Templates
              </button>
            </div>

            <!-- Specific Service Specifications -->
            <div class="editor-service-specs">
              <div class="service-spec-item">
                <span class="spec-label">14 Themes</span>
                <span class="spec-desc">Romance, Birthdays, Family & Friends</span>
              </div>
              <div class="service-spec-item">
                <span class="spec-label">60 FPS Canvas</span>
                <span class="spec-desc">Procedural blooming tree & star engine</span>
              </div>
              <div class="service-spec-item">
                <span class="spec-label">Soundtracks</span>
                <span class="spec-desc">Audio files, Spotify & YouTube</span>
              </div>
              <div class="service-spec-item">
                <span class="spec-label">Private Links</span>
                <span class="spec-desc">WhatsApp & SMS ready with no login</span>
              </div>
            </div>
          </div>

          <!-- Real Business Product Showcase -->
          <div class="hero-showcase-col">
            <div class="hero-showcase-card" id="heroSampleCard">
              <div class="showcase-card-top">
                <span class="showcase-status-badge">ACTIVE TEMPLATE</span>
                <span class="showcase-meta-spec">60 FPS ENGINE</span>
              </div>

              <div class="showcase-card-preview-body">
                <div class="showcase-img-wrap">
                  <img src="/images/sunset.jpg" class="showcase-real-photo" alt="Celebration Website Demo" />
                </div>
                <h3 class="showcase-tmpl-title" id="showcaseTmplName">Long Romance Masterpiece</h3>
                <p class="showcase-tmpl-desc" id="showcaseTmplDesc">
                  Cupid archery, blooming canvas tree, 3D polaroid scrapbook, and twilight sky lanterns with full soundtrack.
                </p>
                <div class="showcase-specs-list">
                  <span class="showcase-spec-bullet">• 9 Full-Screen Continuous Acts</span>
                  <span class="showcase-spec-bullet">• Real Signature Pad & Wax Seal</span>
                  <span class="showcase-spec-bullet">• Full Mobile Safari & Chrome Support</span>
                </div>
              </div>

              <div class="showcase-card-footer">
                <button type="button" class="btn-studio-primary btn-full-width" id="btnShowcaseCustomize">
                  Select &amp; Customize Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. TEMPLATES GALLERY (SPECIFIC SERVICE DESCRIPTIONS) -->
      <section class="studio-gallery-section" id="templatesSection">
        <div class="section-container">
          <div class="section-header-left">
            <h2 class="section-title">Celebration Templates</h2>
            <p class="section-subtitle">
              Select an occasion theme to begin customizing. Each template provides tailored layouts, procedural canvas animations, and dedicated story components.
            </p>
          </div>

          <!-- Template Selector Mount -->
          <div id="templateSelectorMount"></div>
        </div>
      </section>

      <!-- 4. INTERACTIVE CUSTOMIZER & DUAL-VIEWPORT WORKSPACE -->
      <section class="studio-customizer-section" id="customizerSection">
        <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
          <!-- Controls & Editor Sidebar -->
          <div class="studio-sidebar" id="studioSidebar">
            <!-- Creator Guide Mount -->
            <div id="creatorGuideMount"></div>

            <!-- Current Occasion Active Switcher Banner -->
            <div class="studio-occasion-banner" id="studioOccasionBanner"></div>

            <div class="customizer-subheading">
              <span>Personalize Content &amp; Media</span>
            </div>

            <!-- Visual Editor Mount -->
            <div id="visualEditorMount"></div>
          </div>

          <!-- Live Real-Time Interactive Preview Pane -->
          <div class="studio-preview-pane" id="studioPreviewPane">
            <div class="preview-device-header">
              <button type="button" class="btn-studio-secondary btn-mobile-only" id="btnMobileBackToEditor">
                Back to Edit
              </button>

              <!-- Viewport Switcher (1 Consistent Button Style) -->
              <div class="preview-viewport-switcher" id="viewportSwitcher" role="group" aria-label="Preview Device Viewports">
                <button type="button" class="btn-viewport-toggle active" data-viewport="mobile" title="Mobile Phone View">
                  Mobile (9:16)
                </button>
                <button type="button" class="btn-viewport-toggle" data-viewport="tablet" title="Tablet View">
                  Tablet
                </button>
                <button type="button" class="btn-viewport-toggle" data-viewport="desktop" title="Desktop Full-Width View">
                  Desktop
                </button>
              </div>

              <span class="preview-url-bar" id="previewUrlBar">
                <span class="url-text">https://celebrationstudio.live/s/sample</span>
              </span>

              <div class="preview-device-actions">
                <button type="button" class="btn-studio-secondary btn-icon-only" id="btnPreviewReload" title="Reload celebration physics">
                  ↻
                </button>
                <button type="button" class="btn-studio-primary btn-mobile-only" id="btnMobilePreviewShare">
                  Share
                </button>
              </div>
            </div>

            <div class="preview-frame-container preview-viewport-mobile" id="previewContainer"></div>
          </div>
        </div>
      </section>

      <!-- 5. VERIFIED PLATFORM STANDARDS & CUSTOMER PROOF -->
      <section class="studio-proof-section" id="proofSection">
        <div class="section-container">
          <div class="section-header-left">
            <h2 class="section-title">Verified Platform Standards</h2>
            <p class="section-subtitle">
              Every celebration website is engineered for reliable playback, privacy, and zero software installation.
            </p>
          </div>

          <div class="proof-grid">
            <div class="proof-card">
              <h4 class="proof-card-title">Performance Verified</h4>
              <p class="proof-card-desc">
                Procedural canvas engines run at 60 FPS on both mobile Safari (iOS 15+) and Google Chrome (Android & Desktop) with lightweight bundle delivery under 450 KB.
              </p>
              <div class="proof-link-wrap">
                <a href="/?mode=view&template=long_romance" target="_blank" rel="noopener noreferrer" class="proof-text-link">Inspect Romance Masterpiece →</a>
              </div>
            </div>

            <div class="proof-card">
              <h4 class="proof-card-title">Privacy &amp; Security</h4>
              <p class="proof-card-desc">
                Surprise links are private and unlisted. No recipient account, login, or tracking cookies are required to experience the celebration.
              </p>
              <div class="proof-link-wrap">
                <a href="/?mode=view&template=birthday" target="_blank" rel="noopener noreferrer" class="proof-text-link">Inspect Birthday Demo →</a>
              </div>
            </div>

            <div class="proof-card">
              <h4 class="proof-card-title">Direct Messaging Delivery</h4>
              <p class="proof-card-desc">
                Generates pre-formatted WhatsApp and SMS greeting texts with direct clickable URLs tailored to the recipient's relation and celebration occasion.
              </p>
              <div class="proof-link-wrap">
                <a href="/?mode=view&template=blossom" target="_blank" rel="noopener noreferrer" class="proof-text-link">Inspect Cupid Blossom Demo →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Floating Bottom Dock on Mobile -->
      <div class="studio-mobile-bottom-bar" id="studioMobileBottomBar">
        <button type="button" class="btn-studio-secondary" id="btnDockSaveDefault">
          Save
        </button>
        <button type="button" class="btn-studio-secondary" id="btnDockPreviewToggle">
          Live Preview
        </button>
        <button type="button" class="btn-studio-primary" id="btnDockPublish">
          Share Link
        </button>
      </div>

      <!-- 6. VISIBLE CONTACT DETAILS & FUNCTIONAL BUSINESS FOOTER -->
      <footer class="studio-footer" id="contactSection">
        <div class="footer-container">
          <div class="footer-grid">
            <div class="footer-info-col">
              <div class="footer-brand-title">Celebration Studio</div>
              <p class="footer-desc">
                Web platform for creating and sharing private celebration experiences for birthdays, romance, and life milestones.
              </p>
              <div class="footer-contact-details">
                <div class="contact-row">
                  <span class="contact-label">Support Email:</span>
                  <a href="mailto:support@celebrationstudio.live" class="contact-value">support@celebrationstudio.live</a>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Turnaround:</span>
                  <span class="contact-value">Inquiries answered within 24 hours on business days</span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Business Hours:</span>
                  <span class="contact-value">Monday – Friday, 9:00 AM – 6:00 PM EST</span>
                </div>
              </div>
            </div>

            <div class="footer-links-col">
              <span class="footer-col-heading">Navigation</span>
              <a href="#templatesSection" class="footer-link">Templates Gallery</a>
              <a href="#customizerSection" class="footer-link">Customizer Workspace</a>
              <a href="#proofSection" class="footer-link">Platform Standards</a>
              <a href="/?mode=view" target="_blank" rel="noopener noreferrer" class="footer-link">Live Sample View</a>
            </div>

            <div class="footer-links-col">
              <span class="footer-col-heading">Templates</span>
              <a href="/?template=long_romance" class="footer-link">Romance Masterpiece</a>
              <a href="/?template=birthday" class="footer-link">Birthday Celebration</a>
              <a href="/?template=blossom" class="footer-link">Cupid &amp; Blossom</a>
              <a href="/?template=friendship" class="footer-link">Best Friends Tribute</a>
            </div>
          </div>

          <div class="footer-bottom-row">
            <span>&copy; 2026 Celebration Studio. All rights reserved. Clean web delivery with zero third-party tracking.</span>
          </div>
        </div>
      </footer>

      <!-- Floating Saved Toast -->
      <div class="studio-floating-toast" id="studioFloatingToast" role="alert" aria-live="polite">
        <div>
          <strong id="toastTitle">Website Saved</strong><br />
          <span id="toastSubtitle">Your custom celebration is ready to share.</span>
        </div>
      </div>
    </div>`;

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
  const btnEditorThemeToggle = root.querySelector('#btnEditorThemeToggle');

  // --- Dark / Light Mode Controller (Editor Mode Only) ---
  const savedTheme = localStorage.getItem('celebration_studio_editor_theme') || 'dark';
  let activeTheme = savedTheme;
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
      btnEditorThemeToggle.title = `Switch to ${isDark ? 'Light' : 'Dark'} Mode`;
      renderStudioIcons(btnEditorThemeToggle);
    }
  }

  applyEditorTheme(activeTheme);

  btnEditorThemeToggle?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(10);
    applyEditorTheme(activeTheme === 'dark' ? 'light' : 'dark');
  });

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
    if (window.innerWidth > 900) {
      const el = document.getElementById('customizerSection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollToTemplates() {
    switchMobileTab('templates');
    if (window.innerWidth > 900) {
      const el = document.getElementById('templatesSection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

    const secHero = root.querySelector('#heroSection');
    const sec3Step = root.querySelector('.studio-3step-strip');
    const secTemplates = root.querySelector('#templatesSection');
    const secCustomizer = root.querySelector('#customizerSection');
    const sidebar = root.querySelector('#studioSidebar');
    const previewPane = root.querySelector('#studioPreviewPane');
    const footer = root.querySelector('.studio-footer-glass');

    if (window.innerWidth <= 900) {
      if (tab === 'templates') {
        if (secHero) secHero.style.display = 'block';
        if (sec3Step) sec3Step.style.display = 'block';
        if (secTemplates) secTemplates.style.display = 'block';
        if (secCustomizer) secCustomizer.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (previewPane) previewPane.style.display = 'none';
        if (footer) footer.style.display = 'block';
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
          btnDockPreviewToggle.classList.remove('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
      } else if (tab === 'editor') {
        if (secHero) secHero.style.display = 'none';
        if (sec3Step) sec3Step.style.display = 'none';
        if (secTemplates) secTemplates.style.display = 'none';
        if (secCustomizer) secCustomizer.style.display = 'block';
        if (sidebar) sidebar.style.display = 'block';
        if (previewPane) previewPane.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (btnDockPreviewToggle) {
          btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon"><i data-lucide="eye"></i></span><span class="dock-btn-label">Live Preview</span>`;
          btnDockPreviewToggle.classList.remove('dock-active-preview');
          renderStudioIcons(btnDockPreviewToggle);
        }
      } else if (tab === 'preview') {
        if (secHero) secHero.style.display = 'none';
        if (sec3Step) sec3Step.style.display = 'none';
        if (secTemplates) secTemplates.style.display = 'none';
        if (secCustomizer) secCustomizer.style.display = 'block';
        if (sidebar) sidebar.style.display = 'none';
        if (previewPane) previewPane.style.display = 'flex';
        if (footer) footer.style.display = 'none';
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
      if (secHero) secHero.style.display = '';
      if (sec3Step) sec3Step.style.display = '';
      if (secTemplates) secTemplates.style.display = '';
      if (secCustomizer) secCustomizer.style.display = '';
      if (sidebar) sidebar.style.display = '';
      if (previewPane) previewPane.style.display = '';
      if (footer) footer.style.display = '';
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
        if (window.innerWidth > 900) {
          const prevEl = document.getElementById('studioPreviewPane');
          if (prevEl) prevEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const isMobileNow = window.innerWidth <= 900;
    const wasMobile = lastWidth <= 900;
    if (isMobileNow !== wasMobile) {
      lastWidth = window.innerWidth;
      if (isMobileNow) {
        switchMobileTab(currentMobileTab);
      } else {
        const secHero = root.querySelector('#heroSection');
        const sec3Step = root.querySelector('.studio-3step-strip');
        const secTemplates = root.querySelector('#templatesSection');
        const secCustomizer = root.querySelector('#customizerSection');
        const sidebar = root.querySelector('#studioSidebar');
        const previewPane = root.querySelector('#studioPreviewPane');
        const footer = root.querySelector('.studio-footer-glass');
        if (secHero) secHero.style.display = '';
        if (sec3Step) sec3Step.style.display = '';
        if (secTemplates) secTemplates.style.display = '';
        if (secCustomizer) secCustomizer.style.display = '';
        if (sidebar) sidebar.style.display = '';
        if (previewPane) previewPane.style.display = '';
        if (footer) footer.style.display = '';
      }
    }
  });
}
