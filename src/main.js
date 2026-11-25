// src/main.js - Application Router & Main Entry (Editor Website by Default, Viewer on Share Links or Explicit View)

import './style.css';
import './utils/gsapPlugins.js';
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
      window.isCelebrationEditorMode = false;

      // Show immediate romantic loader while fetching celebration
      root.innerHTML = `
        <div class="site-loading-screen" style="display:flex; flex-direction:column; height:100vh; align-items:center; justify-content:center; color:#fff; background:radial-gradient(circle at 50% 50%, #1c1028 0%, #0c0814 100%); font-family:system-ui, -apple-system, sans-serif; text-align:center; padding:20px;">
          <div style="font-size:46px; margin-bottom:14px; animation: pulse 1.5s infinite;">🌸</div>
          <div style="font-size:20px; font-weight:700; margin-bottom:6px; letter-spacing:0.5px; background:linear-gradient(135deg, #ff4d6d, #fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Opening Celebration...</div>
          <div style="font-size:13px; color:#fda4af;">Preparing your romantic surprise ✨</div>
        </div>
      `;

      // Priority A: Fetch from backend server API (has full uncompressed state + high-res photos)
      const site = await fetchSiteBySlug(slug);
      if (site && site.data) {
        renderViewerApp(root, site.templateId || 'blossom', site.data, isMakerReview);
        return;
      }

      // Priority B: Fallback to embedded query/hash token if offline or legacy link
      const embeddedToken = searchParams.get('site') || searchParams.get('data');
      if (embeddedToken || window.location.hash.includes('site=')) {
        const decodedSite = decodeSiteFromUrl();
        if (decodedSite && decodedSite.data) {
          renderViewerApp(root, decodedSite.templateId, decodedSite.data, isMakerReview);
          return;
        }
      }

      // Priority C: Site not found or server offline
      root.innerHTML = `
        <div class="site-loading-screen" style="display:flex; flex-direction:column; height:100vh; align-items:center; justify-content:center; color:#fff; background:radial-gradient(circle at 50% 50%, #1c1028 0%, #0c0814 100%); font-family:system-ui, -apple-system, sans-serif; text-align:center; padding:24px;">
          <div style="font-size:52px; margin-bottom:16px;">💌</div>
          <h2 style="font-size:24px; font-weight:800; margin-bottom:8px; color:#fff;">Celebration Not Found</h2>
          <p style="font-size:14px; color:#fda4af; max-width:340px; line-height:1.6; margin-bottom:24px;">
            We couldn't load this celebration link. It may have expired or the link may be incomplete.
          </p>
          <a href="/" style="display:inline-block; padding:12px 24px; border-radius:12px; background:linear-gradient(135deg, #ff4d6d, #fbbf24); color:#fff; font-weight:700; text-decoration:none;">
            Open Celebration Studio ✨
          </a>
        </div>
      `;
      return;
    }
  }

  // 2. SHARED CELEBRATION LINK: Check if URL contains shared site token (#site=... or ?site=...)
  const decodedSite = decodeSiteFromUrl();
  if (decodedSite && decodedSite.isShared) {
    window.isCelebrationEditorMode = false;
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
    window.isCelebrationEditorMode = false;
    const rawTmpl = searchParams.get('template') || 
                      (hash.startsWith('template=') ? hash.substring(9) : null);
    const tmplQuery = (rawTmpl === 'wedding' || rawTmpl === 'shubh_weds') ? 'wedding_invite' : rawTmpl;
    const activeTemplateId = (tmplQuery && TEMPLATES[tmplQuery]) ? tmplQuery : getPublishedTemplateId();
    const celebrationData = getActiveCelebrationData(activeTemplateId);
    renderViewerApp(root, activeTemplateId, celebrationData, isMakerReview);
    return;
  }

  // 4. DEFAULT ROUTE: Always open the Glassmorphic Celebration Studio Editor!
  // Creators land directly on the editor website to customize everything seamlessly.
  window.isCelebrationEditorMode = true;
  renderStudioApp(root);
}

// React to URL hash changes
window.addEventListener('hashchange', initApp);

// Automatic full screen trigger on user interaction (ONLY in viewer mode, NEVER in studio editor)
export function requestAutoFullscreen() {
  if (typeof document === 'undefined') return;
  // If in editor mode or active element is an input/textarea, do NOT enter fullscreen to prevent lag & interruption
  if (window.isCelebrationEditorMode || 
      document.querySelector('.studio-layout') || 
      document.querySelector('.studio-container')) {
    return;
  }
  const activeEl = document.activeElement;
  if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(activeEl.tagName)) {
    return;
  }

  const docEl = document.documentElement;
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const fn = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
    if (fn) {
      fn.call(docEl).catch(() => {});
    }
  }
}

// Only trigger auto-fullscreen on clean user click/tap when inside viewer mode
window.addEventListener('click', (e) => {
  if (window.isCelebrationEditorMode) return;
  if (e.target && e.target.closest && e.target.closest('.studio-layout')) return;
  requestAutoFullscreen();
}, { passive: true });

// Mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });
} else {
  initApp();
}
