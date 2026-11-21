// src/main.js - Application Router & Main Entry (Viewer Mode by Default, Short-Links Supported)

import './style.css';
import { TEMPLATES } from './models/templateRegistry.js';
import { 
  decodeSiteFromUrl, 
  getActiveCelebrationData, 
  getPublishedTemplateId,
  fetchSiteBySlug
} from './models/siteStorage.js';
import { renderStudioApp } from './studio/builderApp.js';
import { renderViewerApp } from './viewer/viewerApp.js';

async function initApp() {
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

  // Maker review bypass flag (?review=true)
  const isMakerReview = searchParams.get('review') === 'true' || hash.includes('review=true');

  // 2. SERVER SHORT LINK ROUTE: Check if URL path is /s/:slug
  const pathname = window.location.pathname;
  if (pathname.startsWith('/s/')) {
    const slug = pathname.split('/s/')[1]?.replace(/\/$/, '').toLowerCase();
    if (slug) {
      root.innerHTML = `
        <div class="site-loading-screen" style="display:flex; flex-direction:column; height:100vh; align-items:center; justify-content:center; color:#fff; background:#0c0d14; font-family:system-ui, -apple-system, sans-serif; text-align:center; padding:20px;">
          <div style="font-size:42px; margin-bottom:14px; animation: pulse 1.5s infinite;">🌸</div>
          <div style="font-size:18px; font-weight:700; margin-bottom:6px; letter-spacing:0.5px;">Opening Celebration...</div>
          <div style="font-size:13px; color:#f472b6;">Preparing your romantic surprise ✨</div>
        </div>
      `;
      const site = await fetchSiteBySlug(slug);
      if (site && site.data) {
        renderViewerApp(root, site.templateId || 'blossom', site.data, isMakerReview);
        return;
      }
    }
  }

  // 3. SHARED CELEBRATION LINK: Check if URL contains shared site token (#site=... or ?site=...)
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    renderViewerApp(root, decodedSite.templateId, decodedSite.data, decodedSite.isMakerReview);
    return;
  }

  // 4. SPECIFIC OCCASION VIEW: Check direct template param (e.g. ?template=blossom or #template=blossom)
  const tmplQuery = searchParams.get('template') || 
                    (hash.startsWith('template=') ? hash.substring(9) : null) ||
                    (hash === 'blossom' ? 'blossom' : null);

  const activeTemplateId = (tmplQuery && TEMPLATES[tmplQuery]) ? tmplQuery : getPublishedTemplateId();
  const celebrationData = getActiveCelebrationData(activeTemplateId);

  // 5. DEFAULT: Always open the romantic celebration viewer for the recipient!
  renderViewerApp(root, activeTemplateId, celebrationData, isMakerReview);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
