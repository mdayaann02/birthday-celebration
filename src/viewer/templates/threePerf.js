// src/viewer/templates/threePerf.js — Shared Device Tier & Adaptive Performance Utilities for 3D Templates

export function detectDeviceTier() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'medium';
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 500;

  if (mem <= 2 || cores <= 2 || (isTouch && (mem <= 3 || cores <= 4))) {
    return 'low';
  }
  if (isTouch || smallScreen || cores <= 4 || mem <= 4) {
    return 'medium';
  }
  return 'high';
}

export function getOptimalPixelRatio(tier) {
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  if (tier === 'low') return 1.0;
  if (tier === 'medium') return Math.min(dpr, 1.35);
  return Math.min(dpr, 1.75);
}

export function createAdaptiveFpsScaler(renderer, tier, onDowngrade) {
  let samples = 0;
  let accumDt = 0;
  let slowWindows = 0;
  let downgraded = tier === 'low';
  let currentPR = getOptimalPixelRatio(tier);

  return {
    tick(dt) {
      samples += 1;
      accumDt += dt;
      if (samples >= 45) {
        const avgMs = (accumDt / samples) * 1000;
        samples = 0;
        accumDt = 0;

        if (avgMs > 36) {
          slowWindows += 1;
          if (slowWindows >= 2) {
            if (currentPR > 1.0) {
              currentPR = 1.0;
              renderer.setPixelRatio(currentPR);
            } else if (!downgraded && currentPR > 0.85) {
              currentPR = 0.85;
              renderer.setPixelRatio(currentPR);
            }
            if (!downgraded) {
              downgraded = true;
              if (onDowngrade) onDowngrade();
            }
            slowWindows = 0;
          }
        } else {
          slowWindows = 0;
        }
      }
    }
  };
}

export function disposeThreeScene(scene, renderer) {
  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) {
        obj.geometry.dispose();
      }
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (let i = 0; i < mats.length; i++) {
          const m = mats[i];
          if (!m) continue;
          if (m.map && !m.map._isSharedAsset) m.map.dispose();
          if (m.bumpMap && !m.bumpMap._isSharedAsset) m.bumpMap.dispose();
          if (m.roughnessMap && !m.roughnessMap._isSharedAsset) m.roughnessMap.dispose();
          m.dispose();
        }
      }
    });
  }
  if (renderer) {
    renderer.dispose();
  }
}
