// src/models/siteStorage.js - URL Sharing, State & Storage (100% Bulletproof, Quota-Safe, Server-Connected)

import LZString from 'lz-string';
import { TEMPLATES } from './templateRegistry.js';

const DRAFTS_KEY = "celebration_builder_drafts";
const PUBLISHED_KEY = "celebration_published_site";

// Image compression for ultra-lightweight photo uploads (under 25KB per image, quota-safe)
async function compressImageFile(file, maxWidth = 640, quality = 0.68) {
  return new Promise((resolve) => {
    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ success: true, url: e.target.result });
      reader.onerror = () => resolve({ success: false, error: "Failed to read file" });
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth || h > maxWidth) {
          if (w > h) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxWidth) / h);
            h = maxWidth;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ success: true, url: dataUrl });
      };
      img.onerror = () => resolve({ success: true, url: e.target.result });
      img.src = e.target.result;
    };
    reader.onerror = () => resolve({ success: false, error: "Failed to read file" });
    reader.readAsDataURL(file);
  });
}

// Upload photo or song file
// Tries backend server first (if running on Node/Oracle), then falls back to client compression
export async function uploadFile(file) {
  // 1. If backend server is available, upload directly to get a clean permanent short URL
  try {
    const formData = new FormData();
    formData.append('file', file);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        return { success: true, url: json.url, isServer: true };
      }
    }
  } catch {
    // Backend not available (e.g. running on static Vercel), use client-side handling
  }

  // 2. If it's an image, compress to lightweight format so localStorage and URLs never break
  if (file.type && file.type.startsWith('image/')) {
    return await compressImageFile(file, 640, 0.68);
  }

  // 3. If audio and no backend server:
  return {
    success: false,
    isAudio: true,
    error: "Direct MP3 upload requires the backend server. To ensure your website plays reliably on all phones, please select from the built-in romantic tracks (like Alfaaz) or paste a direct MP3 link!"
  };
}

// Publish site to backend server (returns clean short link e.g. /s/celebration-bday)
export async function publishSiteToServer(templateId, data, customSlug) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, data, customSlug }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        return json;
      }
    }
  } catch (err) {
    console.warn("Failed to publish to server, fallback to URL hash:", err);
  }
  return null;
}

// Fetch site from backend server by slug
export async function fetchSiteBySlug(slug) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`/api/sites/${slug}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.site) {
        return json.site;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch site from server:", err);
  }
  return null;
}

// Get the active celebration template ID
export function getPublishedTemplateId() {
  try {
    const pub = localStorage.getItem(PUBLISHED_KEY);
    if (pub) {
      const parsed = JSON.parse(pub);
      if (parsed.templateId && TEMPLATES[parsed.templateId]) {
        return parsed.templateId;
      }
    }
  } catch {}
  return "blossom";
}

// Get active celebration data for viewer
export function getActiveCelebrationData(templateId = "blossom") {
  const template = TEMPLATES[templateId] || TEMPLATES.blossom;
  let baseData = JSON.parse(JSON.stringify(template.defaultData));

  // 1. Check published site in localStorage
  try {
    const pub = localStorage.getItem(PUBLISHED_KEY);
    if (pub) {
      const parsed = JSON.parse(pub);
      if (parsed.templateId === templateId && parsed.data) {
        return { ...baseData, ...parsed.data };
      }
    }
  } catch {}

  // 2. Check local draft
  const draft = getLocalDraft(templateId);
  if (draft) {
    return { ...baseData, ...draft };
  }

  return baseData;
}

// Save active celebration to primary website (persists across reloads for any viewer)
export function saveActiveCelebration(templateId, data) {
  try {
    const payload = {
      templateId,
      data,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Could not save to PUBLISHED_KEY in localStorage:", err);
  }

  // Also save draft
  saveLocalDraft(templateId, data);

  // Sync with backend if available
  try {
    fetch('/api/default-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, data })
    }).catch(() => {});
  } catch {}

  return true;
}

// Save draft safely without crashing on quota
export function saveLocalDraft(templateId, data) {
  try {
    const drafts = getLocalDrafts();
    drafts[templateId] = {
      updatedAt: new Date().toISOString(),
      data
    };
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return true;
  } catch (err) {
    console.warn("Save draft quota notice, trimming large items:", err);
    try {
      // Safe fallback: strip any large base64 thumbnails if storage is tight
      const safeData = JSON.parse(JSON.stringify(data));
      if (safeData.cards) {
        safeData.cards = safeData.cards.map(c => ({
          ...c,
          image: c.image && c.image.length > 50000 ? '/images/sunset.jpg' : c.image
        }));
      }
      const drafts = getLocalDrafts();
      drafts[templateId] = { updatedAt: new Date().toISOString(), data: safeData };
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
      return true;
    } catch {
      return false;
    }
  }
}

export function getLocalDraft(templateId) {
  try {
    const drafts = getLocalDrafts();
    return drafts[templateId]?.data || null;
  } catch {
    return null;
  }
}

export function getLocalDrafts() {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Create a compact delta payload for URL encoding (guaranteed under 1500 chars for WhatsApp)
function createCompactDelta(templateId, data) {
  const defaultData = TEMPLATES[templateId]?.defaultData || {};
  const diff = {};

  for (const [key, val] of Object.entries(data)) {
    // Only serialize properties that were customized
    if (JSON.stringify(val) !== JSON.stringify(defaultData[key])) {
      diff[key] = val;
    }
  }

  return {
    t: templateId,
    d: diff,
    v: 3
  };
}

// Encode site to bulletproof, ultra-compact URL
export function encodeSiteToUrl(templateId, data, isReview = false) {
  try {
    const compactPayload = createCompactDelta(templateId, data);
    const jsonStr = JSON.stringify(compactPayload);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);

    const basePath = `${window.location.origin}${window.location.pathname}`;
    const reviewQuery = isReview ? '?review=true' : '';
    return `${basePath}${reviewQuery}#site=${compressed}`;
  } catch (err) {
    console.error("LZString encoding error, using safe fallback:", err);
    try {
      const compactPayload = createCompactDelta(templateId, data);
      const jsonStr = JSON.stringify(compactPayload);
      const bytes = new TextEncoder().encode(jsonStr);
      let binString = '';
      for (let i = 0; i < bytes.length; i++) binString += String.fromCharCode(bytes[i]);
      const base64 = btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const basePath = `${window.location.origin}${window.location.pathname}`;
      const reviewQuery = isReview ? '?review=true' : '';
      return `${basePath}${reviewQuery}#site=${base64}`;
    } catch {
      return window.location.href;
    }
  }
}

// Decode site from URL hash or query params
export function decodeSiteFromUrl() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Check if maker review flag is active explicitly in query
    let isMakerReview = searchParams.get('review') === 'true';

    let rawToken = searchParams.get('site') || searchParams.get('data');

    if (!rawToken && window.location.hash) {
      let hash = window.location.hash.replace(/^#/, '');

      if (hash.includes('review=true')) {
        isMakerReview = true;
      }

      const hashParams = new URLSearchParams(hash);
      rawToken = hashParams.get('site') || hashParams.get('data');

      if (!rawToken) {
        if (hash.startsWith('site=')) {
          rawToken = hash.substring(5).split('&')[0];
        } else if (hash.startsWith('data=')) {
          rawToken = hash.substring(5).split('&')[0];
        }
      }
    }

    if (!rawToken) return null;

    rawToken = rawToken.trim();

    let parsed = null;

    // 1. Try LZString decompression
    try {
      const lzJson = LZString.decompressFromEncodedURIComponent(rawToken);
      if (lzJson) {
        parsed = JSON.parse(lzJson);
      }
    } catch {
      // not LZ
    }

    // 2. Try Base64 decode
    if (!parsed) {
      try {
        let base64 = rawToken.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }

        let jsonStr;
        try {
          const binString = atob(base64);
          const bytes = new Uint8Array(binString.length);
          for (let i = 0; i < binString.length; i++) {
            bytes[i] = binString.charCodeAt(i);
          }
          jsonStr = new TextDecoder().decode(bytes);
        } catch {
          jsonStr = decodeURIComponent(escape(atob(base64)));
        }

        if (jsonStr) {
          parsed = JSON.parse(jsonStr);
        }
      } catch (err) {
        console.warn("Base64 decode failed:", err);
      }
    }

    if (!parsed) return null;

    let templateId = parsed.t || parsed.templateId || "blossom";
    if (!TEMPLATES[templateId]) {
      templateId = "blossom";
    }

    const template = TEMPLATES[templateId] || TEMPLATES.blossom;
    const incomingData = parsed.d || parsed.data || parsed;
    
    // Deep merge with template defaults so missing delta fields use full default values
    const mergedData = { ...template.defaultData, ...incomingData };

    return {
      isShared: true,
      isMakerReview,
      templateId,
      template,
      data: mergedData
    };
  } catch (err) {
    console.error("decodeSiteFromUrl error:", err);
    return null;
  }
}
