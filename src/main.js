// src/main.js - Application Router & Main Entry (Editor Website by Default, Viewer on Share Links or Explicit View)

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

  // Maker review bypass flag (?review=true)
  const isMakerReview = searchParams.get('review') === 'true' || hash.includes('review=true');

  // 1. SERVER SHORT LINK ROUTE: Check if URL path is /s/:slug (Recipient Celebration)
  const pathname = window.location.pathname;
  if (pathname.startsWith('/s/')) {
    const slug = pathname.split('/s/')[1]?.replace(/\/$/, '').toLowerCase();
    if (slug) {
      root.innerHTML = `
        <div class="site-loading-screen" style="display:flex; flex-direction:column; height:100vh; align-items:center; justify-content:center; color:#fff; background:radial-gradient(circle at 50% 50%, #1c1028 0%, #0c0814 100%); font-family:system-ui, -apple-system, sans-serif; text-align:center; padding:20px;">
          <div style="font-size:46px; margin-bottom:14px; animation: pulse 1.5s infinite;">🌸</div>
          <div style="font-size:20px; font-weight:700; margin-bottom:6px; letter-spacing:0.5px; background:linear-gradient(135deg, #ff4d6d, #fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Opening Celebration...</div>
          <div style="font-size:13px; color:#fda4af;">Preparing your romantic surprise ✨</div>
        </div>
      `;
      const site = await fetchSiteBySlug(slug);
      if (site && site.data) {
        renderViewerApp(root, site.templateId || 'blossom', site.data, isMakerReview);
        return;
      }
    }
  }

  // 2. SHARED CELEBRATION LINK: Check if URL contains shared site token (#site=... or ?site=...)
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    renderViewerApp(root, decodedSite.templateId, decodedSite.data, decodedSite.isMakerReview);
    return;
  }

  // 3. EXPLICIT RECIPIENT VIEWER MODE:
  // Only open the clean viewer website if requested explicitly (e.g. ?mode=view, ?view=true, #view, #recipient)
  const isExplicitViewer = searchParams.get('mode') === 'view' ||
                           searchParams.get('mode') === 'recipient' ||
                           searchParams.get('view') === 'true' ||
                           searchParams.get('recipient') === 'true' ||
                           hash === 'view' ||
                           hash === 'recipient' ||
                           hash.startsWith('view=') ||
                           hash.startsWith('recipient=');

  if (isExplicitViewer) {
    const tmplQuery = searchParams.get('template') || 
                      (hash.startsWith('template=') ? hash.substring(9) : null);
    const activeTemplateId = (tmplQuery && TEMPLATES[tmplQuery]) ? tmplQuery : getPublishedTemplateId();
    const celebrationData = getActiveCelebrationData(activeTemplateId);
    renderViewerApp(root, activeTemplateId, celebrationData, isMakerReview);
    return;
  }

  // 4. DEFAULT ROUTE: Always open the Glassmorphic Celebration Studio Editor!
  // Creators land directly on the editor website to customize everything seamlessly.
  renderStudioApp(root);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
