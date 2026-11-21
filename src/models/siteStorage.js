// src/models/siteStorage.js - URL Sharing, State, Server API & Storage

import { TEMPLATES } from './templateRegistry.js';

const STORAGE_KEY = "celebration_builder_drafts";

// Upload photo or song file (handles both Server Backend and Client Base64 fallback)
export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        return { success: true, url: json.url };
      }
    }
  } catch (err) {
    console.warn("Backend upload failed, using local DataURL fallback:", err);
  }

  // Fallback: Read as Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ success: true, url: e.target.result, isBase64: true });
    reader.onerror = () => resolve({ success: false, error: "Failed to read file" });
    reader.readAsDataURL(file);
  });
}

// Publish site to backend (returns clean short link e.g. /s/sweety-bday)
export async function publishSiteToServer(templateId, data, customSlug) {
  try {
    const res = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, data, customSlug })
    });

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

// Fetch site from backend by slug
export async function fetchSiteBySlug(slug) {
  try {
    const res = await fetch(`/api/sites/${slug}`);
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

// Encode site as portable URL hash
export function encodeSiteToUrl(templateId, data) {
  try {
    const payload = {
      t: templateId,
      d: data,
      v: 1
    };
    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    return `${window.location.origin}${window.location.pathname}#site=${encoded}`;
  } catch (err) {
    console.error("Encoding error:", err);
    return window.location.href;
  }
}

// Decode site from URL hash
export function decodeSiteFromUrl() {
  try {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#site=")) {
      const base64 = hash.substring(6);
      const jsonStr = decodeURIComponent(escape(atob(base64)));
      const parsed = JSON.parse(jsonStr);
      const template = TEMPLATES[parsed.t] || TEMPLATES.birthday;
      const mergedData = { ...template.defaultData, ...parsed.d };
      return {
        isShared: true,
        templateId: parsed.t,
        template,
        data: mergedData
      };
    }
  } catch (err) {
    console.warn("Failed to decode URL hash:", err);
  }
  return null;
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
