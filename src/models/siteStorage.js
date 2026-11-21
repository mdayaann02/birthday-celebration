// src/models/siteStorage.js - URL Sharing, State & Storage (100% Bulletproof & Portable)

import LZString from 'lz-string';
import { TEMPLATES } from './templateRegistry.js';

const STORAGE_KEY = "celebration_builder_drafts";

// Client-side image compressor for crisp, ultra-lightweight photo uploads
async function compressImageFile(file, maxWidth = 1000, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
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

// Upload photo or song file (handles client-side compression & fallback)
export async function uploadFile(file) {
  // If image, compress to lightweight format so URL never breaks
  if (file.type && file.type.startsWith('image/')) {
    return await compressImageFile(file, 960, 0.72);
  }

  // If audio, read as Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ success: true, url: e.target.result });
    reader.onerror = () => resolve({ success: false, error: "Failed to read file" });
    reader.readAsDataURL(file);
  });
}

// Encode site to bulletproof URL
export function encodeSiteToUrl(templateId, data, isReview = false) {
  try {
    const payload = {
      t: templateId,
      d: data,
      v: 2
    };
    const jsonStr = JSON.stringify(payload);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);

    const basePath = `${window.location.origin}${window.location.pathname}`;
    const reviewQuery = isReview ? '?review=true' : '';
    return `${basePath}${reviewQuery}#site=${compressed}`;
  } catch (err) {
    console.error("LZString encoding error:", err);
    // Safe Base64 fallback
    try {
      const payload = { t: templateId, d: data, v: 1 };
      const jsonStr = JSON.stringify(payload);
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
    
    // Check if maker review flag is active in query, hash, or sessionStorage
    let isMakerReview = searchParams.get('review') === 'true' || 
                        sessionStorage.getItem('maker_review_unlocked') === 'true';

    let rawToken = searchParams.get('site') || searchParams.get('data');

    if (!rawToken && window.location.hash) {
      let hash = window.location.hash.replace(/^#/, '');

      if (hash.includes('review=true')) {
        isMakerReview = true;
      }

      // Try URLSearchParams on hash string
      const hashParams = new URLSearchParams(hash);
      rawToken = hashParams.get('site') || hashParams.get('data');

      // Manual extraction if URLSearchParams didn't catch (e.g. #site=TOKEN)
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

    // 2. If not LZ, try safe Base64 decode
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

    let templateId = parsed.t || parsed.templateId;
    let siteData = parsed.d || parsed.data || parsed;

    if (!templateId) {
      templateId = parsed.general ? 'birthday' : 'blossom';
    }

    const template = TEMPLATES[templateId] || TEMPLATES.blossom;
    const mergedData = { ...template.defaultData, ...siteData };

    return {
      isShared: true,
      isMakerReview,
      templateId,
      template,
      data: mergedData
    };
  } catch (err) {
    console.error("decodeSiteFromUrl critical error:", err);
    return null;
  }
}

export function saveLocalDraft(templateId, data) {
  try {
    const drafts = getLocalDrafts();
    drafts[templateId] = {
      updatedAt: new Date().toISOString(),
      data
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return true;
  } catch (err) {
    console.error("Save draft error:", err);
    return false;
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
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
