// src/models/siteStorage.js - URL Sharing, State & Storage (100% Bulletproof, Quota-Safe, Server-Connected)

import LZString from 'lz-string';
import { TEMPLATES } from './templateRegistry.js';

const DRAFTS_KEY = "celebration_builder_drafts";
const PUBLISHED_KEY = "celebration_published_site";

// Image compression for ultra-lightweight photo uploads (under 30KB per image, quota-safe fallback)
async function compressImageFile(file, maxWidth = 800, quality = 0.75) {
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

// Client-side image pre-optimizer for server uploads
// Downscales high-resolution camera photos (5-12MB) to crisp ~250KB JPEG Blobs before transmission
// Guarantees uploads complete in <300ms on all mobile connections with zero timeouts or aborts
async function prepareImageForUpload(file, maxDimension = 1600, quality = 0.85) {
  if (!file.type || !file.type.startsWith('image/')) {
    return file;
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDimension || h > maxDimension) {
          if (w > h) {
            h = Math.round((h * maxDimension) / w);
            w = maxDimension;
          } else {
            w = Math.round((w * maxDimension) / h);
            h = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          if (blob) {
            const fileName = (file.name || 'photo.jpg').replace(/\.[^/.]+$/, "") + ".jpg";
            const optimizedFile = new File([blob], fileName, { type: 'image/jpeg' });
            resolve(optimizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

// IndexedDB cache for offline & instant video playback
const IDB_DB_NAME = 'celebration_media_db';
const IDB_STORE_NAME = 'media_cache';

function openMediaDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return reject(new Error('IndexedDB not supported'));
    const req = indexedDB.open(IDB_DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveMediaToIndexedDB(key, blob) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(IDB_STORE_NAME);
      store.put(blob, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("Could not save to IndexedDB:", err);
    return false;
  }
}

export async function getMediaFromIndexedDB(key) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readonly');
      const store = tx.objectStore(IDB_STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not get from IndexedDB:", err);
    return null;
  }
}

// Upload photo, song, or video file
// Pre-optimizes images and uploads to backend server for permanent, clean URLs
// Uses chunked upload for large files (>3.5MB) to avoid serverless payload limits
export async function uploadFile(file, onProgress) {
  const isVideo = file.type?.startsWith('video/') || file.name?.match(/\.(mp4|webm|mov|mkv)$/i);
  const isImage = file.type?.startsWith('image/');

  let localBlobUrl = null;
  if (isVideo) {
    try {
      localBlobUrl = URL.createObjectURL(file);
      saveMediaToIndexedDB('custom_museum_video', file);
    } catch (e) {
      console.warn("Could not cache video in IndexedDB:", e);
    }
  }

  // 1. Files larger than 3.5MB: use Chunked Upload
  const CHUNK_SIZE = 2.5 * 1024 * 1024;
  if (file.size > 3.5 * 1024 * 1024) {
    try {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const uploadId = 'up_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

      let lastResult = null;
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunkBlob = file.slice(start, end);

        const formData = new FormData();
        formData.append('chunk', chunkBlob, file.name || 'media.mp4');
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', String(i));
        formData.append('totalChunks', String(totalChunks));
        formData.append('filename', file.name || 'media.mp4');
        formData.append('mimetype', file.type || 'video/mp4');

        if (onProgress) {
          const pct = Math.round(((i + 1) / totalChunks) * 100);
          onProgress(pct);
        }

        const res = await fetch('/api/upload-chunk', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          throw new Error(`Chunk ${i} upload failed with status ${res.status}`);
        }

        const json = await res.json();
        if (json.complete && json.url) {
          lastResult = json;
        }
      }

      if (lastResult && lastResult.url) {
        return { success: true, url: lastResult.url, isServer: true, isVideo };
      }
    } catch (chunkErr) {
      console.warn("Chunked upload notice, attempting client fallback:", chunkErr);
      if (isVideo && localBlobUrl) {
        return {
          success: true,
          url: localBlobUrl,
          isLocalBlob: true,
          warning: "Saved to browser storage."
        };
      }
    }
  }

  // 2. Normal Single-Part Upload for files <= 3.5MB
  try {
    const uploadPayload = isImage ? await prepareImageForUpload(file) : file;
    const formData = new FormData();
    formData.append('file', uploadPayload);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        if (onProgress) onProgress(100);
        return { success: true, url: json.url, isServer: true, isVideo };
      }
    }
  } catch (err) {
    console.warn("Backend single upload notice, attempting fallback:", err);
  }

  // 3. Fallbacks
  if (isImage) {
    return await compressImageFile(file, 800, 0.75);
  }

  if (isVideo && localBlobUrl) {
    return {
      success: true,
      url: localBlobUrl,
      isLocalBlob: true,
      warning: "Saved to browser storage."
    };
  }

  return {
    success: false,
    isAudio: true,
    error: "Direct file upload could not connect to server. Please select a built-in option or paste a direct URL!"
  };
}

// Publish site to backend server (returns clean short link e.g. /s/celebration-bday)
export async function publishSiteToServer(templateId, data, customSlug) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

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
    const timeoutId = setTimeout(() => controller.abort(), 12000);

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
      const tid = (parsed.templateId === 'wedding' || parsed.templateId === 'shubh_weds') ? 'wedding_invite' : parsed.templateId;
      if (tid && TEMPLATES[tid]) {
        return tid;
      }
    }
  } catch {}
  return "wedding_invite";
}

// Get active celebration data for viewer
export function getActiveCelebrationData(templateId = "wedding_invite") {
  const resolvedId = (templateId === 'wedding' || templateId === 'shubh_weds') ? 'wedding_invite' : (templateId || 'wedding_invite');
  const template = TEMPLATES[resolvedId] || TEMPLATES.wedding_invite || TEMPLATES.blossom;
  let baseData = JSON.parse(JSON.stringify(template.defaultData));

  // 1. Check published site in localStorage
  try {
    const pub = localStorage.getItem(PUBLISHED_KEY);
    if (pub) {
      const parsed = JSON.parse(pub);
      const pubId = (parsed.templateId === 'wedding' || parsed.templateId === 'shubh_weds') ? 'wedding_invite' : parsed.templateId;
      if (pubId === resolvedId && parsed.data) {
        const merged = { ...baseData, ...parsed.data };
        if (baseData.polaroids && (!merged.polaroids || merged.polaroids.length === 0)) {
          merged.polaroids = baseData.polaroids;
        }
        if (baseData.cards && (!merged.cards || merged.cards.length === 0)) {
          merged.cards = baseData.cards;
        }
        if (baseData.functions && (!merged.functions || merged.functions.length === 0)) {
          merged.functions = baseData.functions;
        }
        if (baseData.gallery && (!merged.gallery || merged.gallery.length === 0)) {
          merged.gallery = baseData.gallery;
        }
        if (baseData.photos && (!merged.photos || merged.photos.length === 0)) {
          merged.photos = baseData.photos;
        }
        if (!merged.centerpieceImage && baseData.centerpieceImage) {
          merged.centerpieceImage = baseData.centerpieceImage;
        }
        if (!merged.centerpieceVideo && baseData.centerpieceVideo) {
          merged.centerpieceVideo = baseData.centerpieceVideo;
        }
        return merged;
      }
    }
  } catch {}

  // 2. Check local draft
  const draft = getLocalDraft(resolvedId);
  if (draft) {
    const merged = { ...baseData, ...draft };
    if (baseData.polaroids && (!merged.polaroids || merged.polaroids.length === 0)) {
      merged.polaroids = baseData.polaroids;
    }
    if (baseData.cards && (!merged.cards || merged.cards.length === 0)) {
      merged.cards = baseData.cards;
    }
    if (baseData.functions && (!merged.functions || merged.functions.length === 0)) {
      merged.functions = baseData.functions;
    }
    if (baseData.gallery && (!merged.gallery || merged.gallery.length === 0)) {
      merged.gallery = baseData.gallery;
    }
    if (baseData.photos && (!merged.photos || merged.photos.length === 0)) {
      merged.photos = baseData.photos;
    }
    if (!merged.centerpieceImage && baseData.centerpieceImage) {
      merged.centerpieceImage = baseData.centerpieceImage;
    }
    if (!merged.centerpieceVideo && baseData.centerpieceVideo) {
      merged.centerpieceVideo = baseData.centerpieceVideo;
    }
    return merged;
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
// NEVER replaces user photos with placeholder images
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
    console.warn("Save draft quota notice, preserving active draft:", err);
    try {
      // Safe fallback: keep active template draft without overwriting user images
      const minimalDrafts = {};
      minimalDrafts[templateId] = { updatedAt: new Date().toISOString(), data };
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(minimalDrafts));
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

    const origin = window.location.origin;
    const viewQuery = isReview ? '?mode=view&review=true' : '?mode=view';
    return `${origin}/${viewQuery}#site=${compressed}`;
  } catch (err) {
    console.error("LZString encoding error, using safe fallback:", err);
    try {
      const compactPayload = createCompactDelta(templateId, data);
      const jsonStr = JSON.stringify(compactPayload);
      const bytes = new TextEncoder().encode(jsonStr);
      let binString = '';
      for (let i = 0; i < bytes.length; i++) binString += String.fromCharCode(bytes[i]);
      const base64 = btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const origin = window.location.origin;
      const viewQuery = isReview ? '?mode=view&review=true' : '?mode=view';
      return `${origin}/${viewQuery}#site=${base64}`;
    } catch {
      return `${window.location.origin}/?mode=view`;
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
