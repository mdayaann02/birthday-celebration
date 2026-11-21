// src/studio/builderApp.js - The Studio Web App Interface

import { TEMPLATES } from '../models/templateRegistry.js';
import { saveLocalDraft, getLocalDraft } from '../models/siteStorage.js';
import { renderTemplateSelector } from './templateSelector.js';
import { renderVisualEditor } from './visualEditor.js';
import { openShareModal } from './shareModal.js';
import { renderViewerApp } from '../viewer/viewerApp.js';

export function renderStudioApp(root) {
  let activeTemplateId = "blossom";
  let activeData = getLocalDraft(activeTemplateId) || JSON.parse(JSON.stringify(TEMPLATES.blossom.defaultData));
  let isMobilePreview = false;

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
          <a href="?template=blossom" class="btn-studio-action" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:4px;">
            🌸 <span>Fullscreen Reel View</span>
          </a>
          <button class="btn-studio-action btn-preview-toggle" id="btnTogglePreview">
            📱 <span id="previewToggleLabel">Toggle Preview View</span>
          </button>
          <button class="btn-studio-primary" id="btnSharePublish">
            🚀 Get Share Link & Deploy
          </button>
        </div>
      </header>

      <!-- Main Studio Workspace (Split View) -->
      <div class="studio-workspace" id="studioWorkspace">
        <!-- Left: Controls & Editor -->
        <div class="studio-sidebar" id="studioSidebar">
          <div id="templateSelectorMount"></div>
          <div class="studio-subheading" style="margin-top:28px;">STEP 2: CUSTOMIZE EVERYTHING</div>
          <div id="visualEditorMount"></div>
        </div>

        <!-- Right: Live Real-Time Interactive Preview -->
        <div class="studio-preview-pane" id="studioPreviewPane">
          <div class="preview-device-header">
            <span class="device-dot dot-red"></span>
            <span class="device-dot dot-yellow"></span>
            <span class="device-dot dot-green"></span>
            <span class="preview-url-bar">https://celebration.live/#preview</span>
          </div>
          <div class="preview-frame-container" id="previewContainer"></div>
        </div>
      </div>
    </div>
  `;

  const selectorMount = root.querySelector('#templateSelectorMount');
  const editorMount = root.querySelector('#visualEditorMount');
  const previewContainer = root.querySelector('#previewContainer');
  const btnShare = root.querySelector('#btnSharePublish');
  const btnTogglePreview = root.querySelector('#btnTogglePreview');
  const studioWorkspace = root.querySelector('#studioWorkspace');

  function updateLivePreview() {
    renderViewerApp(previewContainer, activeTemplateId, activeData);
  }

  function mountEditor() {
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
    });
  }

  // Initial mounts
  mountTemplateSelector();
  mountEditor();
  updateLivePreview();

  // Share modal trigger
  btnShare.addEventListener('click', () => {
    openShareModal(activeTemplateId, activeData);
  });

  // Toggle responsive view on mobile
  btnTogglePreview.addEventListener('click', () => {
    isMobilePreview = !isMobilePreview;
    studioWorkspace.classList.toggle('mobile-preview-focus', isMobilePreview);
    root.querySelector('#previewToggleLabel').textContent = isMobilePreview ? "Back to Editor" : "View Live Preview";
  });
}
