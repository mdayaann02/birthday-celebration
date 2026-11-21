// src/main.js - Application Router & Main Entry

import './style.css';
import { TEMPLATES } from './models/templateRegistry.js';
import { decodeSiteFromUrl } from './models/siteStorage.js';
import { renderStudioApp } from './studio/builderApp.js';
import { renderViewerApp } from './viewer/viewerApp.js';

function initApp() {
  const root = document.getElementById('app');
  if (!root) return;

  // 1. FIRST PRIORITY: Check if URL has a shared site (#site=... or ?site=... or #data=...)
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    renderViewerApp(root, decodedSite.templateId, decodedSite.data, decodedSite.isMakerReview);
    return;
  }

  // 2. SECOND PRIORITY: Check direct template query parameter (e.g. ?template=blossom or #template=blossom)
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();
  const tmplQuery = searchParams.get('template') || 
                    (hash.startsWith('template=') ? hash.substring(9) : null) ||
                    (hash === 'blossom' ? 'blossom' : null);

  if (tmplQuery && TEMPLATES[tmplQuery]) {
    renderViewerApp(root, tmplQuery, TEMPLATES[tmplQuery].defaultData);
    return;
  }

  // 3. Otherwise render Celebration Studio Builder
  renderStudioApp(root);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
