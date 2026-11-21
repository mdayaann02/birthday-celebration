// src/studio/builderApp.js - The Studio Web App Interface (100% Mobile & Desktop Friendly)

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

export function renderStudioApp(root) {
  let activeTemplateId = "blossom";
  let activeData = getActiveCelebrationData(activeTemplateId);
  let currentMobileTab = "editor"; // "editor" | "templates" | "preview"

  root.innerHTML = `
    <div class="studio-layout">
      <!-- Studio Mode Alert Bar -->
      <div class="studio-top-mode-bar" style="background:#1e1b4b; color:#c7d2fe; padding:8px 16px; font-size:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #312e81;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span>✏️</span>
          <span><strong>Studio Editor Active:</strong> You are customizing your website. Recipients will see the clean celebration.</span>
        </div>
        <a href="/" style="color:#a5f3fc; text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:4px; padding:2px 8px; background:rgba(255,255,255,0.1); border-radius:4px;">
          👁️ Recipient View &rarr;
        </a>
      </div>

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
          <a href="/" class="btn-studio-action btn-header-recipient" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:4px;" title="Open website as recipient">
            👁️ <span>Recipient View</span>
          </a>
          <button class="btn-studio-action btn-save-primary" id="btnHeaderSave" style="background:#10b981; color:#fff; border:none; padding:8px 14px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px;">
            💾 <span>Save Website</span>
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
        <a href="/" class="btn-dock-item btn-dock-recipient" style="text-decoration:none; display:flex; align-items:center; justify-content:center; color:#fff; background:#334155; font-size:12px; font-weight:700;">
          👁️ Recipient View
        </a>
        <button class="btn-dock-item btn-dock-save" id="btnDockSaveDefault" style="background:#059669; color:#fff; font-size:12px; font-weight:700;">
          💾 Save Website
        </button>
        <button class="btn-dock-item btn-dock-primary" id="btnDockPublish" style="font-size:12px; font-weight:700;">
          🚀 Share Link
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
  const btnHeaderSave = root.querySelector('#btnHeaderSave');
  const btnDockSaveDefault = root.querySelector('#btnDockSaveDefault');
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function switchMobileTab(tab) {
    currentMobileTab = tab;

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
      // Automatically save to draft AND active celebration so edits never reset!
      saveActiveCelebration(activeTemplateId, activeData);
      updateLivePreview();
    });
  }

  function mountTemplateSelector() {
    renderTemplateSelector(selectorMount, activeTemplateId, (newTid) => {
      activeTemplateId = newTid;
      activeData = getActiveCelebrationData(activeTemplateId);
      mountTemplateSelector();
      mountEditor();
      updateLivePreview();
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

  // Back to editor inside preview device header
  btnMobileBackToEditor?.addEventListener('click', () => {
    switchMobileTab('editor');
  });

  // Save Website handler
  function handleSaveWebsite() {
    saveActiveCelebration(activeTemplateId, activeData);
    alert("🎉 Website Saved Successfully!\n\nAll your customized photos, music, and messages have been saved. When anyone opens your website, they will see this celebration directly!");
  }

  btnHeaderSave?.addEventListener('click', handleSaveWebsite);
  btnDockSaveDefault?.addEventListener('click', handleSaveWebsite);

  // Share/Deploy triggers
  function triggerShare() {
    saveActiveCelebration(activeTemplateId, activeData);
    openShareModal(activeTemplateId, activeData);
  }

  btnShare?.addEventListener('click', triggerShare);
  btnDockPublish?.addEventListener('click', triggerShare);
}
