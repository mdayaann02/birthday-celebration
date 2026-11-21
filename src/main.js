// src/main.js - Application Router & Main Entry

import './style.css';
import { TEMPLATES } from './models/templateRegistry.js';
import { decodeSiteFromUrl, fetchSiteBySlug } from './models/siteStorage.js';
import { renderStudioApp } from './studio/builderApp.js';
import { renderViewerApp } from './viewer/viewerApp.js';

async function initApp() {
  const root = document.getElementById('app');
  if (!root) return;

  // 0. Check direct template query parameter (e.g. ?template=blossom or #blossom)
  const searchParams = new URLSearchParams(window.location.search);
  const tmplQuery = searchParams.get('template') || (window.location.hash.toLowerCase().includes('blossom') ? 'blossom' : null);
  if (tmplQuery && TEMPLATES[tmplQuery]) {
    renderViewerApp(root, tmplQuery, TEMPLATES[tmplQuery].defaultData);
    return;
  }

  // 1. Check if URL is short path: /s/:slug
  const path = window.location.pathname;
  if (path.startsWith('/s/')) {
    const slug = path.split('/s/')[1].replace(/\/$/, '');
    if (slug) {
      root.innerHTML = `<div style="display:flex;height:100vh;align-items:center;justify-content:center;color:#fff;">Loading your celebration... ✨</div>`;
      const site = await fetchSiteBySlug(slug);
      if (site) {
        renderViewerApp(root, site.templateId, site.data);
        return;
      }
    }
  }

  // 2. Check if URL hash has #site=...
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    renderViewerApp(root, decodedSite.templateId, decodedSite.data);
    return;
  }

  // 3. Otherwise render Celebration Studio Builder
  renderStudioApp(root);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
