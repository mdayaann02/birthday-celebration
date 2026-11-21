// src/main.js - Application Router & Main Entry (Viewer Mode by Default)

import './style.css';
import { TEMPLATES } from './models/templateRegistry.js';
import { 
  decodeSiteFromUrl, 
  getActiveCelebrationData, 
  getPublishedTemplateId 
} from './models/siteStorage.js';
import { renderStudioApp } from './studio/builderApp.js';
import { renderViewerApp } from './viewer/viewerApp.js';

function initApp() {
  const root = document.getElementById('app');
  if (!root) return;

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '');

  // 1. STUDIO / EDITOR MODE: Only open if creator explicitly requested it
  // (e.g. ?edit=true, ?mode=studio, #studio, #editor, /studio, /edit)
  const isEditMode = searchParams.get('edit') === 'true' ||
                     searchParams.get('studio') === 'true' ||
                     searchParams.get('mode') === 'studio' ||
                     searchParams.get('mode') === 'editor' ||
                     hash === 'edit' ||
                     hash === 'editor' ||
                     hash === 'studio' ||
                     hash.startsWith('studio=') ||
                     window.location.pathname.endsWith('/studio') ||
                     window.location.pathname.endsWith('/edit');

  if (isEditMode) {
    renderStudioApp(root);
    return;
  }

  // 2. SHARED CELEBRATION LINK: Check if URL contains shared site token (#site=... or ?site=...)
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    renderViewerApp(root, decodedSite.templateId, decodedSite.data, decodedSite.isMakerReview);
    return;
  }

  // 3. SPECIFIC OCCASION VIEW: Check direct template param (e.g. ?template=blossom or #template=blossom)
  const tmplQuery = searchParams.get('template') || 
                    (hash.startsWith('template=') ? hash.substring(9) : null) ||
                    (hash === 'blossom' ? 'blossom' : null);

  const activeTemplateId = (tmplQuery && TEMPLATES[tmplQuery]) ? tmplQuery : getPublishedTemplateId();
  const celebrationData = getActiveCelebrationData(activeTemplateId);

  // Maker review bypass flag (?review=true)
  const isMakerReview = searchParams.get('review') === 'true' || hash.includes('review=true');

  // 4. DEFAULT: Always open the romantic celebration viewer for the recipient!
  renderViewerApp(root, activeTemplateId, celebrationData, isMakerReview);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
