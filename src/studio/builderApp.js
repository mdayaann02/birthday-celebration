// src/studio/builderApp.js - The Studio Web App Interface (100% Mobile & Desktop Friendly)

import { TEMPLATES } from '../models/templateRegistry.js';
import { saveLocalDraft, getLocalDraft } from '../models/siteStorage.js';
import { renderTemplateSelector } from './templateSelector.js';
import { renderVisualEditor } from './visualEditor.js';
import { openShareModal } from './shareModal.js';
import { renderViewerApp } from '../viewer/viewerApp.js';

export function renderStudioApp(root) {
  let activeTemplateId = "blossom";
  let activeData = getLocalDraft(activeTemplateId) || JSON.parse(JSON.stringify(TEMPLATES.blossom.defaultData));
  let currentMobileTab = "editor"; // "editor" | "templates" | "preview"

  root.innerHTML = `
    <div class="studio-layout">
      <!-- Studio Header -->
      <header class="studio-header">
        <div class="studio-brand">
          <span class="studio-logo-spark">✨</span>
          <div class="studio-title-wrap">
            <h1 class="studio-title">Celebration Studio</h1>
            <span class="studio-tagline">Create & Share Emotional Custom Websites</span>
          </div>
        </div>

        <div class="studio-header-actions">
          <a href="?template=blossom" class="btn-studio-action btn-header-fullscreen" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:4px;">
            🌸 <span>Fullscreen Reel</span>
          </a>
          <button class="btn-studio-action btn-preview-toggle" id="btnTogglePreview">
            👁️ <span id="previewToggleLabel">Live Preview</span>
          </button>
          <button class="btn-studio-primary" id="btnSharePublish">
            🚀 <span>Get Share Link</span>
          </button>
        </div>
      </header>

      <!-- Mobile Segmented Navigation Bar -->
      <nav class="studio-mobile-tabs" id="studioMobileTabs" aria-label="Editor View Tabs">
        <button class="mobile-tab-btn active" data-tab="editor" id="tabBtnEditor">
          <span class="tab-btn-icon">✏️</span>
          <span class="tab-btn-text">Customize</span>
        </button>
        <button class="mobile-tab-btn" data-tab="templates" id="tabBtnTemplates">
          <span class="tab-btn-icon">🎨</span>
          <span class="tab-btn-text">Occasions (${Object.keys(TEMPLATES).length})</span>
        </button>
        <button class="mobile-tab-btn" data-tab="preview" id="tabBtnPreview">
          <span class="tab-btn-icon">👁️</span>
          <span class="tab-btn-text">Live Preview</span>
        </button>
      </nav>

      <!-- Main Studio Workspace (Split View on Desktop, Tabbed on Mobile) -->
      <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
        <!-- Controls & Editor Sidebar -->
        <div class="studio-sidebar" id="studioSidebar">
          <!-- Section 1: Template Gallery (In "templates" tab on mobile, top on desktop) -->
          <div class="studio-tab-section studio-tab-templates" id="tabTemplatesSection">
            <div id="templateSelectorMount"></div>
          </div>

          <!-- Section 2: Visual Customization Form (In "editor" tab on mobile, bottom on desktop) -->
          <div class="studio-tab-section studio-tab-editor active" id="tabEditorSection">
            <!-- Mobile Current Occasion Switcher Banner -->
            <div class="studio-occasion-banner" id="studioOccasionBanner"></div>
            
            <div class="studio-subheading step2-heading" style="margin-top:16px;">STEP 2: CUSTOMIZE EVERYTHING</div>
            <div id="visualEditorMount"></div>
          </div>
        </div>

        <!-- Live Real-Time Interactive Preview -->
        <div class="studio-preview-pane" id="studioPreviewPane">
          <div class="preview-device-header">
            <span class="device-dot dot-red"></span>
            <span class="device-dot dot-yellow"></span>
            <span class="device-dot dot-green"></span>
            <span class="preview-url-bar" id="previewUrlBar">https://celebration.live/#preview</span>
            <button class="btn-preview-back-mobile" id="btnMobileBackToEditor">
              ✏️ Back to Edit
            </button>
          </div>
          <div class="preview-frame-container" id="previewContainer"></div>
        </div>
      </div>

      <!-- Sticky Bottom Dock on Mobile -->
      <div class="studio-mobile-bottom-bar" id="studioMobileBottomBar">
        <button class="btn-dock-item btn-dock-preview" id="btnDockPreviewToggle">
          👁️ Preview Site
        </button>
        <button class="btn-dock-item btn-dock-primary" id="btnDockPublish">
          🚀 Get Share Link & Deploy
        </button>
      </div>
    </div>
  `;

  const selectorMount = root.querySelector('#templateSelectorMount');
  const editorMount = root.querySelector('#visualEditorMount');
  const previewContainer = root.querySelector('#previewContainer');
  const occasionBannerMount = root.querySelector('#studioOccasionBanner');
  const studioWorkspace = root.querySelector('#studioWorkspace');

  const btnShare = root.querySelector('#btnSharePublish');
  const btnDockPublish = root.querySelector('#btnDockPublish');
  const btnTogglePreview = root.querySelector('#btnTogglePreview');
  const btnDockPreviewToggle = root.querySelector('#btnDockPreviewToggle');
  const btnMobileBackToEditor = root.querySelector('#btnMobileBackToEditor');

  function renderOccasionBanner() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.blossom;
    occasionBannerMount.innerHTML = `
      <div class="occ-banner-card">
        <div class="occ-banner-left">
          <span class="occ-banner-icon">${tmpl.icon}</span>
          <div class="occ-banner-info">
            <span class="occ-banner-badge">${tmpl.badge}</span>
            <span class="occ-banner-name">${tmpl.name}</span>
          </div>
        </div>
        <button type="button" class="btn-switch-occasion" id="btnBannerSwitchOccasion">
          Change Occasion ▾
        </button>
      </div>
    `;

    occasionBannerMount.querySelector('#btnBannerSwitchOccasion')?.addEventListener('click', () => {
      switchMobileTab('templates');
      // Scroll to top of templates
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function switchMobileTab(tab) {
    currentMobileTab = tab;

    // Update active tab buttons
    root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Update workspace classes
    studioWorkspace.classList.remove('mobile-view-editor', 'mobile-view-templates', 'mobile-view-preview');
    studioWorkspace.classList.add(`mobile-view-${tab}`);

    // Update tab sections inside sidebar
    const secTemplates = root.querySelector('#tabTemplatesSection');
    const secEditor = root.querySelector('#tabEditorSection');

    if (secTemplates) secTemplates.classList.toggle('active', tab === 'templates');
    if (secEditor) secEditor.classList.toggle('active', tab === 'editor');

    // Update desktop header button label
    const previewToggleLabel = root.querySelector('#previewToggleLabel');
    if (previewToggleLabel) {
      previewToggleLabel.textContent = (tab === 'preview') ? "Back to Editor" : "Live Preview";
    }

    // Update mobile dock button label
    if (btnDockPreviewToggle) {
      if (tab === 'preview') {
        btnDockPreviewToggle.innerHTML = "✏️ Back to Edit";
        btnDockPreviewToggle.classList.add('active-editor');
      } else {
        btnDockPreviewToggle.innerHTML = "👁️ Preview Site";
        btnDockPreviewToggle.classList.remove('active-editor');
      }
    }

    if (tab === 'preview') {
      updateLivePreview();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function updateLivePreview() {
    renderViewerApp(previewContainer, activeTemplateId, activeData);
  }

  function mountEditor() {
    renderOccasionBanner();
    renderVisualEditor(editorMount, activeTemplateId, activeData, (updatedData) => {
      activeData = updatedData;
      saveLocalDraft(activeTemplateId, activeData);
      updateLivePreview();
    });
  }

  function mountTemplateSelector() {
    renderTemplateSelector(selectorMount, activeTemplateId, (newTid) => {
      activeTemplateId = newTid;
      activeData = getLocalDraft(activeTemplateId) || JSON.parse(JSON.stringify(TEMPLATES[newTid].defaultData));
      mountTemplateSelector();
      mountEditor();
      updateLivePreview();
      // On mobile, immediately transition back to editor so the user can customize right away!
      switchMobileTab('editor');
    });
  }

  // Initial mounts
  mountTemplateSelector();
  mountEditor();
  updateLivePreview();
  renderOccasionBanner();

  // Mobile tab click listeners
  root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchMobileTab(tab);
    });
  });

  // Dock preview toggle
  btnDockPreviewToggle?.addEventListener('click', () => {
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

  // Header desktop toggle
  btnTogglePreview?.addEventListener('click', () => {
    if (currentMobileTab === 'preview') {
      switchMobileTab('editor');
    } else {
      switchMobileTab('preview');
    }
  });

  // Share/Deploy triggers
  function triggerShare() {
    openShareModal(activeTemplateId, activeData);
  }

  btnShare?.addEventListener('click', triggerShare);
  btnDockPublish?.addEventListener('click', triggerShare);
}
