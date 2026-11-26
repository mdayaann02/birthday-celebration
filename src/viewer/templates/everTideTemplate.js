// src/viewer/templates/everTideTemplate.js — Ever Tide Photoreal 3D Sunset Island
// Adaptive GPU quality (low/medium/high), Museum-grade Tour + Free Walk controls,
// accurate terrain/pier physics & obstacle collisions, and full real-time multiplayer.

import * as THREE from 'three';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { create3DAvatar } from './museumAvatar.js';
import { MuseumMultiplayer } from './museumMultiplayer.js';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import {
  detectDeviceTier,
  getOptimalPixelRatio,
  createAdaptiveFpsScaler,
  disposeThreeScene,
} from './threePerf.js';

const STYLE_ID = 'ever-tide-scoped-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .et-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #0d0618;
      font-family: 'Nunito', system-ui, sans-serif;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }
    .et-canvas-wrap {
      width: 100%;
      height: 100%;
      touch-action: none;
    }
    .et-hud-top {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      z-index: 25;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .et-hud-top > * {
      pointer-events: auto;
    }
    .et-top-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .et-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 13px;
      border-radius: 999px;
      background: rgba(18, 12, 28, 0.72);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .et-pill:hover {
      background: rgba(34, 22, 52, 0.88);
    }
    .et-pill.accent {
      background: linear-gradient(135deg, rgba(244, 63, 94, 0.85), rgba(251, 146, 60, 0.85));
      border-color: rgba(255, 210, 170, 0.45);
    }
    .et-live-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
      flex-shrink: 0;
    }
    .et-tour-dock {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 25;
      width: min(640px, 94%);
      background: rgba(18, 12, 28, 0.78);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 215, 160, 0.28);
      border-radius: 20px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);
    }
    .et-tour-caption {
      flex: 1;
      min-width: 0;
    }
    .et-tour-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.9px;
      color: #fdba74;
      text-transform: uppercase;
    }
    .et-tour-title {
      font-size: 14px;
      font-weight: 800;
      margin: 1px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .et-tour-sub {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.74);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .et-hud-bottom {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 25;
      display: none;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
      max-width: 94%;
      padding: 8px 12px;
      border-radius: 20px;
      background: rgba(18, 12, 28, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.16);
    }
    .et-act-btn {
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.11);
      color: #fff;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .et-act-btn:hover { background: rgba(255, 255, 255, 0.22); transform: translateY(-1px); }
    .et-act-btn.active { background: #f43f5e; border-color: #fda4af; }
    .et-prompts {
      position: absolute;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 24;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      pointer-events: none;
      max-width: 90%;
    }
    .et-prompts > * {
      pointer-events: auto;
    }
    .et-desktop-hint {
      position: absolute;
      top: 56px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(18, 12, 28, 0.58);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: rgba(255, 255, 255, 0.85);
      font-size: 11px;
      pointer-events: none;
      white-space: nowrap;
      display: none;
    }
    .et-joystick {
      position: absolute;
      bottom: 86px;
      left: 16px;
      z-index: 25;
      width: 96px;
      height: 96px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      border: 1.5px solid rgba(255, 255, 255, 0.28);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      touch-action: none;
      display: none;
    }
    .et-joystick-knob {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 38px;
      height: 38px;
      margin: -19px 0 0 -19px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }
    .et-chat-tray {
      position: absolute;
      bottom: 82px;
      right: 14px;
      z-index: 30;
      width: min(300px, 86vw);
      background: rgba(20, 14, 32, 0.94);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 18px;
      padding: 12px;
      color: #fff;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
      display: none;
    }
    .et-chat-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 8px 0 10px;
    }
    .et-chat-chip {
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 11px;
      cursor: pointer;
    }
    .et-chat-chip:hover { background: rgba(244, 63, 94, 0.35); }
    .et-chat-input-row {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .et-chat-input {
      flex: 1;
      min-width: 0;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      font-size: 12px;
      outline: none;
    }
    .et-chat-input::placeholder { color: rgba(255, 255, 255, 0.55); }
    .et-join-modal {
      position: absolute;
      inset: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: radial-gradient(circle at 50% 35%, rgba(251, 146, 60, 0.28), rgba(15, 10, 25, 0.86));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .et-join-card {
      width: 100%;
      max-width: 370px;
      background: rgba(24, 18, 36, 0.94);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 22px;
      padding: 24px 20px;
      color: #fff;
      text-align: center;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.48);
    }
    .et-proposal-bullet {
      position: absolute;
      top: 66px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 45;
      display: none;
      align-items: center;
      gap: 10px;
      padding: 9px 16px;
      border-radius: 999px;
      background: linear-gradient(135deg, #f43f5e, #fb923c);
      border: 1.5px solid rgba(255, 235, 180, 0.7);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      box-shadow: 0 12px 32px rgba(244, 63, 94, 0.45);
      cursor: pointer;
    }
    .et-modal-overlay {
      position: absolute;
      inset: 0;
      z-index: 60;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: rgba(12, 8, 22, 0.78);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .et-modal-overlay.open {
      display: flex;
    }
    .et-modal-card {
      position: relative;
      width: 100%;
      max-width: 420px;
      background: rgba(24, 18, 36, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 22px;
      padding: 22px 20px;
      color: #fff;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
    }
    .et-modal-close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}

/* ─────────── Deterministic Island Terrain & Shoreline Geometry ─────────── */
const ISLAND_CENTER_Z = 2.0;
const PIER_X = -8.0;
const PIER_Z_START = -8.5;
const PIER_Z_END = -20.5;
const PIER_HALF_W = 1.65;
const PIER_DECK_Y = 0.27;

function getCoastRadius(angle) {
  return 21.2 + Math.sin(angle * 5.0) * 0.75 + Math.sin(angle * 13.0) * 0.28 + Math.cos(angle * 7.0) * 0.48;
}

function getSandY(x, z) {
  const dz = z - ISLAND_CENTER_Z;
  const angle = Math.atan2(dz, x);
  const r = Math.hypot(x, dz);
  const maxR = getCoastRadius(angle);
  const rNorm = Math.min(1.0, r / maxR);
  const dome = 0.18 * (1.0 - rNorm * rNorm);
  const ripple = Math.sin(angle * 3.0) * 0.045 * Math.min(1.0, r / 8.0);
  return 0.04 + dome + ripple;
}

function isOnPierDeck(x, z) {
  return Math.abs(x - PIER_X) <= PIER_HALF_W - 0.15 && z <= PIER_Z_START && z >= PIER_Z_END;
}

function getSurfaceHeight(x, z) {
  if (isOnPierDeck(x, z)) return PIER_DECK_Y;
  return getSandY(x, z);
}

/* ─────────── Water Shader (Opaque, GPU-Friendly, Fresnel + Sun Path) ─────────── */
const waterVertexShader = `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  float waveHeight(vec2 p, float t) {
    return sin(p.x * 0.28 + t * 0.9) * 0.16
         + sin(p.y * 0.42 - t * 0.7) * 0.11
         + sin((p.x + p.y) * 0.22 + t * 1.15) * 0.07;
  }

  void main() {
    vec3 pos = position;
    pos.z += waveHeight(pos.xy, uTime);

    float eps = 0.45;
    float hR = waveHeight(pos.xy + vec2(eps, 0.0), uTime);
    float hL = waveHeight(pos.xy - vec2(eps, 0.0), uTime);
    float hU = waveHeight(pos.xy + vec2(0.0, eps), uTime);
    float hD = waveHeight(pos.xy - vec2(0.0, eps), uTime);
    vNormal = normalize(cross(vec3(2.0 * eps, 0.0, hR - hL), vec3(0.0, 2.0 * eps, hU - hD)));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const waterFragmentShader = `
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uCameraPos;

  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCameraPos - vWorldPos);
    vec3 L = normalize(uSunDir);

    float fresnel = clamp(pow(1.0 - max(dot(N, V), 0.0), 3.4), 0.08, 0.95);
    float dist = length(vWorldPos.xz - uCameraPos.xz);
    float depthFactor = smoothstep(8.0, 110.0, dist);
    vec3 waterColor = mix(uShallowColor, uDeepColor, depthFactor);

    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 220.0);
    float specWide = pow(max(dot(N, H), 0.0), 28.0) * 0.28;

    vec3 skyReflect = mix(vec3(0.95, 0.5, 0.35), vec3(0.32, 0.16, 0.48), max(N.y, 0.0));
    vec3 color = mix(waterColor, skyReflect, fresnel);
    color += uSunColor * (spec * 2.4 + specWide);

    float foam = smoothstep(0.11, 0.21, vWorldPos.y + 0.35) * 0.14;
    color = mix(color, vec3(1.0, 0.96, 0.92), foam);

    float fogFactor = 1.0 - exp(-dist * 0.0075);
    vec3 fogColor = vec3(0.95, 0.60, 0.42);
    color = mix(color, fogColor, fogFactor * 0.72);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* ─────────── Sky Shader ─────────── */
const skyVertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const skyFragmentShader = `
  uniform vec3 uSunPosition;
  uniform float uTime;
  varying vec3 vWorldPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float height = dir.y;

    vec3 zenith = vec3(0.12, 0.06, 0.22);
    vec3 midHigh = vec3(0.35, 0.12, 0.38);
    vec3 midSky = vec3(0.72, 0.28, 0.42);
    vec3 horizon = vec3(0.96, 0.52, 0.32);
    vec3 sunBand = vec3(1.0, 0.78, 0.42);
    vec3 belowHorizon = vec3(0.08, 0.04, 0.12);

    vec3 skyColor;
    if (height < -0.02) {
      skyColor = mix(belowHorizon, horizon, smoothstep(-0.15, -0.02, height));
    } else if (height < 0.08) {
      skyColor = mix(horizon, sunBand, smoothstep(-0.02, 0.08, height));
    } else if (height < 0.2) {
      skyColor = mix(sunBand, horizon, smoothstep(0.08, 0.2, height));
    } else if (height < 0.4) {
      skyColor = mix(horizon, midSky, smoothstep(0.2, 0.4, height));
    } else if (height < 0.65) {
      skyColor = mix(midSky, midHigh, smoothstep(0.4, 0.65, height));
    } else {
      skyColor = mix(midHigh, zenith, smoothstep(0.65, 1.0, height));
    }

    vec3 sunDir = normalize(uSunPosition);
    float sunAngle = max(dot(dir, sunDir), 0.0);
    float sunDisc = smoothstep(0.998, 0.9999, sunAngle);
    float sunGlow = pow(sunAngle, 8.0) * 0.58;
    float sunHalo = pow(sunAngle, 2.5) * 0.24;

    skyColor += vec3(1.0, 0.92, 0.7) * sunDisc * 3.0;
    skyColor += vec3(1.0, 0.65, 0.3) * sunGlow;
    skyColor += vec3(0.95, 0.4, 0.25) * sunHalo;

    if (height > 0.5) {
      vec2 starUv = dir.xz / (dir.y + 0.001) * 50.0;
      float star = step(0.998, hash(floor(starUv)));
      float twinkle = 0.5 + 0.5 * sin(uTime * 2.0 + hash(floor(starUv)) * 20.0);
      skyColor += vec3(star * twinkle * 0.4 * smoothstep(0.5, 0.9, height));
    }

    gl_FragColor = vec4(skyColor, 1.0);
  }
`;

/* ─────────── Procedural Textures ─────────── */
function createSandTexture(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#e8d4b0';
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 28;
    d[i] = Math.min(255, Math.max(0, d[i] + noise));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise * 0.9));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise * 0.7));
  }
  ctx.putImageData(imgData, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSandBumpMap(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 52 + 128;
    d[i] = d[i + 1] = d[i + 2] = Math.min(255, Math.max(0, noise));
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return tex;
}

function createSandNamesTexture(sender, recipient) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 256);

  ctx.font = 'italic 700 44px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = 'rgba(90, 65, 40, 0.5)';
  ctx.fillText(sender, 258, 74);
  ctx.fillText(recipient, 258, 186);

  ctx.fillStyle = 'rgba(255, 240, 210, 0.32)';
  ctx.fillText(sender, 254, 70);
  ctx.fillText(recipient, 254, 182);

  ctx.fillStyle = 'rgba(120, 85, 50, 0.72)';
  ctx.fillText(sender, 256, 72);

  ctx.font = 'italic 500 42px Georgia, serif';
  ctx.fillStyle = 'rgba(180, 75, 85, 0.78)';
  ctx.fillText('♡', 256, 128);

  ctx.font = 'italic 700 44px Georgia, serif';
  ctx.fillStyle = 'rgba(120, 85, 50, 0.72)';
  ctx.fillText(recipient, 256, 184);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBannerTexture(text, photoImg) {
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = photoImg ? 320 : 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fffaf2';
  ctx.fillRect(0, 0, c.width, 96);
  ctx.strokeStyle = '#f4a261';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, c.width - 8, 88);
  ctx.fillStyle = '#3b2438';
  ctx.font = 'italic 600 30px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, c.width / 2, 48, c.width - 36);

  if (photoImg) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(180, 104, 280, 208);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(180, 104, 280, 208);
    ctx.drawImage(photoImg, 192, 114, 256, 188);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCloudTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 220, 200, 0.85)');
  gradient.addColorStop(0.4, 'rgba(255, 200, 185, 0.55)');
  gradient.addColorStop(0.7, 'rgba(240, 170, 160, 0.22)');
  gradient.addColorStop(1, 'rgba(220, 140, 140, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/* ─────────── Batched / Lightweight Scene Props ─────────── */
function createRealisticPalm(scene, x, z, rotY, trunkMat, leafMat, coconutMat, obstacles) {
  const palm = new THREE.Group();
  const baseY = getSandY(x, z) - 0.04;
  palm.position.set(x, baseY, z);
  palm.rotation.y = rotY;
  obstacles.push({ x, z, r: 0.65 });

  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.15, 1.5, 0.08),
    new THREE.Vector3(0.35, 3.0, -0.05),
    new THREE.Vector3(0.2, 4.2, 0.1),
    new THREE.Vector3(-0.05, 5.0, 0.0),
  ]);
  palm.add(new THREE.Mesh(new THREE.TubeGeometry(trunkCurve, 12, 0.18, 7, false), trunkMat));

  const frondCount = 7;
  const topPt = trunkCurve.getPoint(1.0);
  const frondShape = new THREE.Shape();
  frondShape.moveTo(0, 0);
  frondShape.quadraticCurveTo(0.15, 0.6, 0.08, 1.8);
  frondShape.lineTo(-0.08, 1.8);
  frondShape.quadraticCurveTo(-0.15, 0.6, 0, 0);
  const frondGeo = new THREE.ShapeGeometry(frondShape, 5);

  for (let i = 0; i < frondCount; i++) {
    const angle = (i / frondCount) * Math.PI * 2;
    const frond = new THREE.Mesh(frondGeo, leafMat);
    frond.position.copy(topPt);
    frond.rotation.y = angle;
    frond.rotation.x = -0.35 - (i % 3) * 0.12;
    frond.scale.set(1.6, 1.45, 1);
    palm.add(frond);
  }

  const coconutGeo = new THREE.SphereGeometry(0.08, 7, 7);
  for (let i = 0; i < 3; i++) {
    const nut = new THREE.Mesh(coconutGeo, coconutMat);
    nut.position.copy(topPt);
    nut.position.x += Math.cos(i * 2.1) * 0.12;
    nut.position.z += Math.sin(i * 2.1) * 0.12;
    nut.position.y -= 0.1;
    palm.add(nut);
  }

  scene.add(palm);
  return palm;
}

function createFloralArch(scene, obstacles) {
  const archGroup = new THREE.Group();
  const baseY = getSandY(0, -2.5) - 0.05;
  archGroup.position.set(0, baseY, -2.5);
  obstacles.push({ x: -2.0, z: -2.5, r: 0.55 });
  obstacles.push({ x: 2.0, z: -2.5, r: 0.55 });

  const archWoodMat = new THREE.MeshStandardMaterial({ color: 0xc19a6b, roughness: 0.82 });
  const archCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.0, 0, 0),
    new THREE.Vector3(-1.7, 2.6, 0),
    new THREE.Vector3(-0.8, 3.5, 0),
    new THREE.Vector3(0, 3.8, 0),
    new THREE.Vector3(0.8, 3.5, 0),
    new THREE.Vector3(1.7, 2.6, 0),
    new THREE.Vector3(2.0, 0, 0),
  ]);
  archGroup.add(new THREE.Mesh(new THREE.TubeGeometry(archCurve, 26, 0.09, 7, false), archWoodMat));

  const vineMat = new THREE.MeshStandardMaterial({ color: 0x3a7d44, roughness: 0.75 });
  const vineCurve = new THREE.CatmullRomCurve3(
    Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      const pt = archCurve.getPoint(t);
      const offset = Math.sin(t * Math.PI * 8) * 0.14;
      const offset2 = Math.cos(t * Math.PI * 8) * 0.14;
      return new THREE.Vector3(pt.x + offset, pt.y + offset2, pt.z + offset);
    })
  );
  archGroup.add(new THREE.Mesh(new THREE.TubeGeometry(vineCurve, 32, 0.025, 5, false), vineMat));

  // Instanced leaves for minimal draw calls
  const leafGeo = new THREE.SphereGeometry(0.06, 5, 4);
  leafGeo.scale(1, 0.4, 1.5);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4a8c3f, roughness: 0.7 });
  const leafCount = 34;
  const leafInst = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < leafCount; i++) {
    const pt = archCurve.getPoint(i / (leafCount - 1));
    dummy.position.set(
      pt.x + (Math.random() - 0.5) * 0.25,
      pt.y + (Math.random() - 0.5) * 0.2,
      pt.z + 0.08 + (Math.random() - 0.5) * 0.16
    );
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    dummy.updateMatrix();
    leafInst.setMatrixAt(i, dummy.matrix);
  }
  leafInst.instanceMatrix.needsUpdate = true;
  archGroup.add(leafInst);

  // Shared flower palette materials
  const flowerGeo = new THREE.SphereGeometry(0.11, 7, 7);
  const flowerMats = [0xffffff, 0xffd4e0, 0xffe4e8].map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 })
  );
  for (let i = 0; i <= 20; i++) {
    const pt = archCurve.getPoint(i / 20);
    if (i % 2 === 0 || i > 6 && i < 14) {
      const fMat = flowerMats[i % flowerMats.length];
      const flower = new THREE.Mesh(flowerGeo, fMat);
      flower.position.set(pt.x + (Math.random() - 0.5) * 0.15, pt.y + (Math.random() - 0.5) * 0.12, pt.z + 0.11);
      flower.scale.setScalar(0.65 + (i % 3) * 0.18);
      archGroup.add(flower);
    }
  }

  scene.add(archGroup);
  return archGroup;
}

function createRowboat(scene, obstacles) {
  const rx = -12.2;
  const rz = -7.8;
  obstacles.push({ x: rx, z: rz, r: 1.55 });
  const hullProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.5, 0.05),
    new THREE.Vector2(0.65, 0.2),
    new THREE.Vector2(0.6, 0.45),
    new THREE.Vector2(0.45, 0.55),
    new THREE.Vector2(0.0, 0.6),
  ];
  const hullGeo = new THREE.LatheGeometry(hullProfile, 10, 0, Math.PI);
  const boatMat = new THREE.MeshStandardMaterial({ color: 0xa87040, roughness: 0.82 });
  const hull = new THREE.Mesh(hullGeo, boatMat);
  hull.scale.set(1.2, 1.0, 2.6);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.25), new THREE.MeshStandardMaterial({ color: 0xc49a6c, roughness: 0.85 }));
  seat.position.set(0, 0.28, 0);

  const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 6), new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.8 }));
  oar.position.set(0.45, 0.35, 0.25);
  oar.rotation.z = 0.5;

  const boatGroup = new THREE.Group();
  boatGroup.position.set(rx, getSandY(rx, rz) - 0.04, rz);
  boatGroup.rotation.y = 0.5;
  boatGroup.rotation.z = 0.04;
  boatGroup.add(hull, seat, oar);
  scene.add(boatGroup);
  return boatGroup;
}

function createBeachSetup(scene, obstacles) {
  const bx = 6.8;
  const bz = -2.8;
  const by = getSandY(bx, bz);
  const benchPos = new THREE.Vector3(bx, by, bz);
  const benchYaw = -0.35 + Math.PI; // Faces sunset horizon & ocean!
  obstacles.push({ x: bx, z: bz, r: 1.35 });

  const benchGroup = new THREE.Group();
  benchGroup.position.copy(benchPos);
  benchGroup.rotation.y = benchYaw;

  const woodMat = new THREE.MeshStandardMaterial({ color: 0xb8875a, roughness: 0.85 });
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.09, 0.72), woodMat);
  benchSeat.position.y = 0.48;
  const legGeo = new THREE.BoxGeometry(0.08, 0.48, 0.6);
  const bLegL = new THREE.Mesh(legGeo, woodMat);
  bLegL.position.set(-1.05, 0.24, 0);
  const bLegR = new THREE.Mesh(legGeo, woodMat);
  bLegR.position.set(1.05, 0.24, 0);
  const backRest = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.6, 0.06), woodMat);
  backRest.position.set(0, 0.78, -0.32);

  const umbPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), woodMat);
  umbPole.position.set(0, 1.6, -0.55);

  const umbCanvas = document.createElement('canvas');
  umbCanvas.width = 256;
  umbCanvas.height = 64;
  const umbCtx = umbCanvas.getContext('2d');
  const stripeWidth = 256 / 8;
  for (let i = 0; i < 8; i++) {
    umbCtx.fillStyle = i % 2 === 0 ? '#f43f5e' : '#ffffff';
    umbCtx.fillRect(i * stripeWidth, 0, stripeWidth, 64);
  }
  const umbTex = new THREE.CanvasTexture(umbCanvas);
  umbTex.colorSpace = THREE.SRGBColorSpace;
  const umbTop = new THREE.Mesh(
    new THREE.ConeGeometry(2.0, 0.65, 14),
    new THREE.MeshStandardMaterial({ map: umbTex, roughness: 0.6, side: THREE.DoubleSide })
  );
  umbTop.position.set(0, 3.2, -0.55);

  benchGroup.add(benchSeat, bLegL, bLegR, backRest, umbPole, umbTop);
  scene.add(benchGroup);
  return { benchGroup, benchPos, benchYaw, umbTex };
}

function scatterBeachDetails(scene, lowDetail) {
  const detailGroup = new THREE.Group();
  const shellCount = lowDetail ? 12 : 20;
  const rockCount = lowDetail ? 8 : 12;

  const shellGeo = new THREE.SphereGeometry(0.06, 6, 4);
  shellGeo.scale(1.0, 0.3, 1.2);
  const shellMat = new THREE.MeshStandardMaterial({ color: 0xf5e6cf, roughness: 0.45 });
  const shellInst = new THREE.InstancedMesh(shellGeo, shellMat, shellCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < shellCount; i++) {
    const angle = (i / shellCount) * Math.PI * 2 + Math.random() * 0.4;
    const radius = 3.5 + Math.random() * 14.5;
    const sx = Math.cos(angle) * radius;
    const sz = ISLAND_CENTER_Z + Math.sin(angle) * radius;
    dummy.position.set(sx, getSandY(sx, sz) + 0.015, sz);
    dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
    dummy.scale.setScalar(0.8 + Math.random() * 0.5);
    dummy.updateMatrix();
    shellInst.setMatrixAt(i, dummy.matrix);
  }
  shellInst.instanceMatrix.needsUpdate = true;
  detailGroup.add(shellInst);

  const rockGeo = new THREE.DodecahedronGeometry(0.14, 0);
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x8a8278, roughness: 0.9 });
  const rockInst = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
  for (let i = 0; i < rockCount; i++) {
    const angle = (i / rockCount) * Math.PI * 2 + 0.25;
    const radius = 8 + Math.random() * 10;
    const rx = Math.cos(angle) * radius;
    const rz = ISLAND_CENTER_Z + Math.sin(angle) * radius;
    dummy.position.set(rx, getSandY(rx, rz) + 0.04, rz);
    dummy.rotation.set(Math.random(), Math.random(), Math.random());
    dummy.scale.set(0.6 + Math.random() * 0.7, 0.45 + Math.random() * 0.4, 0.6 + Math.random() * 0.7);
    dummy.updateMatrix();
    rockInst.setMatrixAt(i, dummy.matrix);
  }
  rockInst.instanceMatrix.needsUpdate = true;
  detailGroup.add(rockInst);

  scene.add(detailGroup);
  return detailGroup;
}

function createPierAndCinema(scene, videoUrl, title, fallbackImage, obstacles) {
  const pierGroup = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x6b472b, roughness: 0.88 });
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x4b311d, roughness: 0.9 });
  const lanternGlowMat = new THREE.MeshBasicMaterial({ color: 0xffd28a });

  // Planks from shoreline (z = -8.5) out over water (z = -21.5)
  for (let z = -8.5; z >= -21.5; z -= 0.46) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.09, 0.37), woodMat);
    plank.position.set(PIER_X, PIER_DECK_Y - 0.045, z);
    pierGroup.add(plank);
  }

  for (const side of [-1.48, 1.48]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 13.4), darkWoodMat);
    beam.position.set(PIER_X + side, PIER_DECK_Y - 0.14, -15.0);
    pierGroup.add(beam);
    for (let z = -9.2; z >= -21.0; z -= 2.8) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.9, 7), darkWoodMat);
      post.position.set(PIER_X + side, -0.3, z);
      pierGroup.add(post);
      if (Math.abs(z) > 10.5) {
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), lanternGlowMat);
        cap.position.set(PIER_X + side, 0.72, z);
        pierGroup.add(cap);
      }
    }
  }

  // Cozy Pier Sunset Bench facing Cinema Screen
  const pierBenchZ = -17.6;
  const pierBenchPos = new THREE.Vector3(PIER_X, PIER_DECK_Y, pierBenchZ);
  obstacles.push({ x: PIER_X, z: pierBenchZ, r: 1.05 });

  const pierBench = new THREE.Group();
  pierBench.position.copy(pierBenchPos);
  const pSeat = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.62), woodMat);
  pSeat.position.y = 0.48;
  const pLegGeo = new THREE.BoxGeometry(0.08, 0.48, 0.52);
  const pLegL = new THREE.Mesh(pLegGeo, darkWoodMat);
  pLegL.position.set(-0.88, 0.24, 0);
  const pLegR = new THREE.Mesh(pLegGeo, darkWoodMat);
  pLegR.position.set(0.88, 0.24, 0);
  const pBack = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.52, 0.06), woodMat);
  pBack.position.set(0, 0.74, 0.28); // Backrest at +Z so sitters face -Z cinema & sunset
  pierBench.add(pSeat, pLegL, pLegR, pBack);
  pierGroup.add(pierBench);

  // Sunset Pier Cinema frame at end of pier
  const frameGroup = new THREE.Group();
  frameGroup.position.set(PIER_X, 1.98, -21.3);
  obstacles.push({ x: PIER_X - 2.35, z: -21.3, r: 0.45 });
  obstacles.push({ x: PIER_X + 2.35, z: -21.3, r: 0.45 });

  const framePostL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 3.3, 8), darkWoodMat);
  framePostL.position.set(-2.35, -0.2, 0);
  const framePostR = framePostL.clone();
  framePostR.position.set(2.35, -0.2, 0);
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.18, 0.18), darkWoodMat);
  topBar.position.set(0, 1.45, 0);
  const botBar = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.16, 0.18), darkWoodMat);
  botBar.position.set(0, -1.25, 0);
  frameGroup.add(framePostL, framePostR, topBar, botBar);

  const videoEl = document.createElement('video');
  videoEl.src = videoUrl || '/video/couple_memories.mp4';
  videoEl.crossOrigin = 'anonymous';
  videoEl.loop = true;
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.preload = 'metadata';

  const videoTex = new THREE.VideoTexture(videoEl);
  videoTex.colorSpace = THREE.SRGBColorSpace;
  const screenMat = new THREE.MeshBasicMaterial({ map: videoTex, side: THREE.DoubleSide });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.45), screenMat);
  screenMesh.position.set(0, 0.1, 0.02);
  screenMesh.userData = { type: 'cinema' };
  frameGroup.add(screenMesh);

  let fallbackTex = null;
  if (fallbackImage) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    videoEl.addEventListener('error', () => {
      loader.load(fallbackImage, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        fallbackTex = tex;
        screenMat.map = tex;
        screenMat.needsUpdate = true;
      });
    }, { once: true });
  }

  const plaqueCanvas = document.createElement('canvas');
  plaqueCanvas.width = 512;
  plaqueCanvas.height = 96;
  const pCtx = plaqueCanvas.getContext('2d');
  pCtx.fillStyle = 'rgba(24,14,32,0.88)';
  pCtx.fillRect(0, 0, 512, 96);
  pCtx.strokeStyle = '#fbbf24';
  pCtx.lineWidth = 4;
  pCtx.strokeRect(4, 4, 504, 88);
  pCtx.fillStyle = '#fff5e6';
  pCtx.font = 'bold 28px Georgia, serif';
  pCtx.textAlign = 'center';
  pCtx.textBaseline = 'middle';
  pCtx.fillText(`🎬 ${title || 'Our Sunset Horizon'}`, 256, 48, 480);
  const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
  const plaqueMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 0.64),
    new THREE.MeshBasicMaterial({ map: plaqueTex, transparent: true })
  );
  plaqueMesh.position.set(0, 1.9, 0.05);
  frameGroup.add(plaqueMesh);

  pierGroup.add(frameGroup);
  scene.add(pierGroup);

  return {
    pierGroup,
    pierBenchPos,
    pierBenchYaw: Math.PI,
    screenMesh,
    videoEl,
    dispose: () => {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
      videoTex.dispose();
      plaqueTex.dispose();
      if (fallbackTex) fallbackTex.dispose();
    },
  };
}

function createMemoryEasels(scene, photos, obstacles) {
  const easelMeshes = [];
  const easelData = [];
  const textures = [];
  const list = Array.isArray(photos) && photos.length > 0 ? photos.slice(0, 6) : [];
  const spots = [
    { x: -11.5, z: 3.5, ry: 0.9 },
    { x: -7.5, z: 7.8, ry: 0.45 },
    { x: -1.8, z: 9.6, ry: 0.05 },
    { x: 4.5, z: 9.2, ry: -0.35 },
    { x: 9.8, z: 5.5, ry: -0.8 },
    { x: 11.8, z: 0.2, ry: -1.3 },
  ];
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x7c5432, roughness: 0.88 });
  const frameBackMat = new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.55 });
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');

  list.forEach((item, idx) => {
    const spot = spots[idx % spots.length];
    const groundY = getSandY(spot.x, spot.z) - 0.03;
    obstacles.push({ x: spot.x, z: spot.z, r: 0.72 });

    const g = new THREE.Group();
    g.position.set(spot.x, groundY, spot.z);
    g.rotation.y = spot.ry;

    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.85, 6), woodMat);
    legL.position.set(-0.42, 0.9, 0);
    legL.rotation.set(-0.14, 0, -0.1);
    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.85, 6), woodMat);
    legR.position.set(0.42, 0.9, 0);
    legR.rotation.set(-0.14, 0, 0.1);
    const legBack = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.75, 6), woodMat);
    legBack.position.set(0, 0.82, -0.36);
    legBack.rotation.x = 0.34;
    g.add(legL, legR, legBack);

    const frameBack = new THREE.Mesh(new THREE.BoxGeometry(1.36, 1.56, 0.06), frameBackMat);
    frameBack.position.set(0, 1.32, 0.02);
    frameBack.rotation.x = -0.14;
    g.add(frameBack);

    const photoMat = new THREE.MeshBasicMaterial({ color: 0xfde68a });
    const photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 1.12), photoMat);
    photoMesh.position.set(0, 1.4, 0.06);
    photoMesh.rotation.x = -0.14;
    photoMesh.userData = { type: 'easel', index: idx, photo: item };
    g.add(photoMesh);
    easelMeshes.push(photoMesh);

    const forwardDir = new THREE.Vector3(Math.sin(spot.ry), 0, Math.cos(spot.ry));
    easelData.push({
      index: idx,
      photo: item,
      pos: new THREE.Vector3(spot.x, groundY + 1.35, spot.z),
      camPos: new THREE.Vector3(spot.x + forwardDir.x * 3.1, groundY + 1.8, spot.z + forwardDir.z * 3.1),
    });

    const imgUrl = item.image || '/images/sunset.jpg';
    loader.load(
      imgUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        photoMat.color.setHex(0xffffff);
        photoMat.map = tex;
        photoMat.needsUpdate = true;
        textures.push(tex);
      },
      undefined,
      () => {
        loader.load('/images/sunset.jpg', (fbTex) => {
          fbTex.colorSpace = THREE.SRGBColorSpace;
          photoMat.color.setHex(0xffffff);
          photoMat.map = fbTex;
          photoMat.needsUpdate = true;
          textures.push(fbTex);
        });
      }
    );

    scene.add(g);
  });

  return {
    easelMeshes,
    easelData,
    dispose: () => textures.forEach((t) => t.dispose()),
  };
}

const _sharedLanternBodyGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.48, 8, 1, true);
const _sharedLanternCoreGeo = new THREE.SphereGeometry(0.11, 6, 6);
const _sharedLanternBodyMat = new THREE.MeshBasicMaterial({
  color: 0xffb347,
  transparent: true,
  opacity: 0.9,
  side: THREE.DoubleSide,
});
const _sharedLanternCoreMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });

function spawnSkyLantern(scene, lanterns, x, y, z) {
  if (lanterns.length > 26) {
    const oldest = lanterns.shift();
    scene.remove(oldest);
  }
  const g = new THREE.Group();
  const body = new THREE.Mesh(_sharedLanternBodyGeo, _sharedLanternBodyMat);
  const core = new THREE.Mesh(_sharedLanternCoreGeo, _sharedLanternCoreMat);
  core.position.y = -0.12;
  g.add(body, core);
  g.position.set(x, y, z);
  g.userData = {
    speedY: 0.55 + Math.random() * 0.45,
    driftX: (Math.random() - 0.5) * 0.35,
    phase: Math.random() * Math.PI * 2,
    sharedAsset: true,
  };
  scene.add(g);
  lanterns.push(g);
}

/* ═════════════════════════════════════════════════════════════════════
   MAIN RENDER FUNCTION
   ═════════════════════════════════════════════════════════════════════ */
export function renderEverTideTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }
  ensureStyles();

  const tier = detectDeviceTier();
  const lowDetail = tier === 'low';
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  const sender = data.senderName || 'Daniel';
  const recipient = data.recipientName || 'Sophie';
  const islandTitle = data.islandTitle || 'Ever Tide Island';
  const islandSubtitle = data.islandSubtitle || 'A Private Sunset Cove Built For Us';
  const planeMessage = data.planeMessage || `${recipient}, will you marry me? ~ ${sender}`;
  const sandTextLeft = data.sandSender || sender;
  const sandTextRight = data.sandRecipient || recipient;
  const couplePhoto = data.couplePhoto || data.centerpieceImage || '/images/sunset.jpg';
  const centerpieceTitle = data.centerpieceTitle || 'Our Sunset Horizon';
  const centerpieceVideo = data.centerpieceVideo || '/video/couple_memories.mp4';
  const proposalQuestion = data.proposalQuestion || 'Will you walk every shoreline of life with me?';
  const proposalSubtitle = data.proposalSubtitle || 'From golden sunsets to starlit tides, every wave brings me closer to you.';
  const proposalYesBtn = data.proposalYesBtn || 'Yes, Forever & Always! 💍💖';
  const proposalCelebrateTitle = data.proposalCelebrateTitle || 'She Said YES! 💍🌅';
  const proposalCelebrateMsg = data.proposalCelebrateMsg || 'Under the golden horizon and drifting lanterns, our forever begins.';
  const photos = (Array.isArray(data.photos) && data.photos.length > 0)
    ? data.photos
    : (Array.isArray(data.polaroids) && data.polaroids.length > 0
        ? data.polaroids.map((p, i) => ({
            id: i + 1,
            image: p.image,
            title: p.title || p.caption || `Memory #${i + 1}`,
            date: p.date || 'Coastal Chapter',
            desc: p.note || '',
          }))
        : [
            { id: 1, image: '/images/sunset.jpg', title: 'Golden Horizon', date: 'First Sunset', desc: 'Standing by the tide watching the sky catch fire while talking for hours.' },
            { id: 2, image: '/images/always_you.jpg', title: 'Salt Air & Laughter', date: 'Coastal Drive', desc: 'Windows rolled down, ocean breeze in your hair, and laughter that never fades.' },
            { id: 3, image: '/images/pretty.jpg', title: 'Lantern Twilight', date: 'Midnight Cove', desc: 'Quiet whispers beside the shoreline bonfire under the emerging stars.' },
            { id: 4, image: '/images/dream_girl.jpg', title: 'Breathtaking Grace', date: 'Golden Hour', desc: 'Even the brightest sunset fades beside the warmth of your smile.' },
            { id: 5, image: '/images/vogue_cover.jpg', title: 'Island Footprints', date: 'Our Escape', desc: 'Two sets of footprints side by side along the wet shore.' },
            { id: 6, image: '/images/queen.jpg', title: 'My Forever Tide', date: 'Always & Forever', desc: 'Like the ocean and the shore, my heart always returns to you.' },
          ]);

  // Deterministic room ID across /s/:slug, ?s=slug, and data.passcode/slug/id
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const pathSlug = pathParts[0] === 's' && pathParts[1] ? pathParts[1] : '';
  const querySlug = new URLSearchParams(window.location.search).get('s') || '';
  const rawRoom = (data.passcode || data.slug || data.id || pathSlug || querySlug || 'cove')
    .toString().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  const roomName = `evertide_${rawRoom}`;

  container.innerHTML = `
    <div class="et-root">
      <div class="et-canvas-wrap" id="etCanvasWrap"></div>

      <!-- Top HUD -->
      <div class="et-hud-top">
        <span class="et-pill" id="etPeerBadge">
          <span class="et-live-dot"></span>
          <span>🌅 ${islandTitle} • <span id="etPeerCount">1</span> online</span>
        </span>
        <div class="et-top-right">
          <button type="button" class="et-pill accent" id="etBtnModeToggle" title="Switch Tour / Free Walk">
            <span id="etModeIcon">🧭</span>
            <span id="etModeLabel">Guided Tour</span>
            <span>⇄</span>
          </button>
          <button type="button" class="et-pill" id="etBtnFullscreen" title="Toggle Fullscreen">
            <span id="etFsIcon">⛶</span>
          </button>
          <button type="button" class="et-pill" id="etBtnAudio" title="Toggle Music">
            <span id="etAudioIcon">🎵</span>
          </button>
        </div>
      </div>

      <!-- Desktop Walk Hint -->
      <div class="et-desktop-hint" id="etDesktopHint">
        ⌨️ <strong>WASD / Arrows</strong> Walk • 🖱️ <strong>Drag</strong> Look • 🛞 <strong>Scroll</strong> Zoom • 🔍 <strong>Click Frames / Cinema</strong>
      </div>

      <!-- Guided Tour Dock -->
      <div class="et-tour-dock" id="etTourDock">
        <button type="button" class="et-act-btn" id="etTourPrev">❮</button>
        <button type="button" class="et-act-btn active" id="etTourPlay">⏸</button>
        <button type="button" class="et-act-btn" id="etTourNext">❯</button>
        <div class="et-tour-caption">
          <span class="et-tour-badge" id="etTourBadge">ISLAND ARRIVAL</span>
          <div class="et-tour-title" id="etTourTitle">${islandTitle}</div>
          <p class="et-tour-sub" id="etTourSub">${islandSubtitle}</p>
        </div>
        <button type="button" class="et-act-btn" id="etTourCinema">🎬 Pier Cinema</button>
      </div>

      <!-- Contextual Proximity Prompts -->
      <div class="et-prompts" id="etPrompts">
        <button type="button" class="et-pill accent" id="etPromptSit" style="display:none;">🛋️ Sit Together on Bench</button>
        <button type="button" class="et-pill" id="etPromptEasel" style="display:none;">🔍 Inspect Memory Frame</button>
        <button type="button" class="et-pill" id="etPromptCinema" style="display:none;">🎬 Toggle Cinema Audio</button>
      </div>

      <!-- Multi-touch Virtual Joystick -->
      <div class="et-joystick" id="etJoystick">
        <div class="et-joystick-knob" id="etJoystickKnob"></div>
      </div>

      <!-- Quick Chat Tray -->
      <div class="et-chat-tray" id="etChatTray">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:800;">
          <span>💬 Quick Reaction &amp; Chat</span>
          <button type="button" id="etChatClose" style="background:none;border:none;color:#fff;cursor:pointer;font-size:14px;">✕</button>
        </div>
        <div class="et-chat-chips">
          <button type="button" class="et-chat-chip" data-msg="❤️ I love you!">❤️ I love you!</button>
          <button type="button" class="et-chat-chip" data-msg="🌅 Look at the sunset!">🌅 Sunset!</button>
          <button type="button" class="et-chat-chip" data-msg="🚶 Walk with me!">🚶 Walk with me!</button>
          <button type="button" class="et-chat-chip" data-msg="🛋️ Sit on the pier!">🛋️ Pier bench!</button>
          <button type="button" class="et-chat-chip" data-msg="💍 Forever & always!">💍 Forever!</button>
        </div>
        <div class="et-chat-input-row">
          <input type="text" class="et-chat-input" id="etChatInput" placeholder="Say something..." maxlength="48" />
          <button type="button" class="et-act-btn active" id="etChatSend">Send</button>
        </div>
      </div>

      <!-- Bottom Actions Dock (Free Walk Mode) -->
      <div class="et-hud-bottom" id="etHudBottom">
        <button type="button" class="et-act-btn" id="etBtnWave">👋 Wave</button>
        <button type="button" class="et-act-btn" id="etBtnHearts">💖 Hearts</button>
        <button type="button" class="et-act-btn" id="etBtnLanterns">🏮 Lanterns</button>
        <button type="button" class="et-act-btn" id="etBtnChat">💬 Chat</button>
        <button type="button" class="et-act-btn" id="etBtnSit">🛋️ Sit</button>
        <button type="button" class="et-act-btn" id="etBtnHoldHands">🤝 Hold Hands</button>
        <button type="button" class="et-act-btn" id="etBtnPlane">✈️ Banner</button>
        <button type="button" class="et-act-btn" id="etBtnPropose">💍 Propose</button>
      </div>

      <!-- Real-Time Incoming Proposal Bullet -->
      <div class="et-proposal-bullet" id="etProposalBullet" role="button" tabindex="0">
        <span>💍✨</span>
        <span id="etProposalBulletText">Special Proposal For You • Tap to Open</span>
      </div>

      <!-- Memory Lightbox Modal -->
      <div class="et-modal-overlay" id="etMemoryModal">
        <div class="et-modal-card">
          <button type="button" class="et-modal-close" id="etMemoryClose">✕</button>
          <img id="etMemoryImg" src="" alt="" style="width:100%;max-height:240px;object-fit:cover;border-radius:14px;margin-bottom:12px;" />
          <div id="etMemoryDate" style="font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:#fda4af;margin-bottom:4px;"></div>
          <h3 id="etMemoryTitle" style="font-size:19px;font-weight:800;margin:0 0 8px;"></h3>
          <p id="etMemoryDesc" style="font-size:13px;color:rgba(255,255,255,0.78);line-height:1.5;margin:0 0 14px;"></p>
          <div style="display:flex;justify-content:center;gap:10px;">
            <button type="button" class="et-act-btn" id="etMemoryPrev">← Prev</button>
            <button type="button" class="et-act-btn" id="etMemoryNext">Next →</button>
          </div>
        </div>
      </div>

      <!-- Interactive Real-Time Proposal Modal -->
      <div class="et-modal-overlay" id="etProposalModal">
        <div class="et-modal-card">
          <button type="button" class="et-modal-close" id="etProposalClose">✕</button>
          <div id="etProposalAskView">
            <div style="font-size:38px;margin-bottom:8px;">💍🌅</div>
            <div id="etProposalEyebrow" style="font-size:11px;letter-spacing:1.2px;font-weight:800;color:#fda4af;text-transform:uppercase;margin-bottom:6px;">SUNSET COVE PROPOSAL</div>
            <h2 style="font-size:21px;font-weight:800;margin:0 0 8px;">${proposalQuestion}</h2>
            <p style="font-size:13px;color:rgba(255,255,255,0.76);line-height:1.5;margin:0 0 18px;">${proposalSubtitle}</p>
            <div id="etProposalBtnRow" style="display:flex;flex-direction:column;gap:10px;">
              <button type="button" id="etProposalYesBtn" style="width:100%;padding:12px 16px;border-radius:999px;border:none;background:linear-gradient(135deg,#f43f5e,#fb923c);color:#fff;font-weight:800;font-size:14px;cursor:pointer;">${proposalYesBtn}</button>
              <button type="button" class="et-act-btn" id="etProposalNoBtn" style="padding:9px 14px;">Let me think... 🤔</button>
              <button type="button" class="et-act-btn" id="etProposalStandBtn" style="display:none;padding:9px 14px;">Stand Up</button>
            </div>
          </div>
          <div id="etProposalCelebrateView" style="display:none;">
            <div style="font-size:42px;margin-bottom:8px;">🥂💖🎆</div>
            <h2 id="etCelebrateTitle" style="font-size:22px;font-weight:800;margin:0 0 8px;color:#fde68a;">${proposalCelebrateTitle}</h2>
            <p id="etCelebrateMsg" style="font-size:13px;color:rgba(255,255,255,0.82);line-height:1.5;margin:0 0 16px;">${proposalCelebrateMsg}</p>
            <button type="button" class="et-act-btn active" id="etProposalDoneBtn">Back to Our Island 🌅</button>
          </div>
        </div>
      </div>

      <!-- Join / Avatar Picker Modal -->
      <div class="et-join-modal" id="etJoinModal">
        <div class="et-join-card">
          <div style="font-size:32px;margin-bottom:6px;">🌅✈️</div>
          <h2 style="font-size:22px;font-weight:800;margin:0 0 6px;">${islandTitle}</h2>
          <p style="font-size:13px;color:rgba(255,255,255,0.72);margin:0 0 16px;">${islandSubtitle}</p>
          <input
            type="text"
            id="etNameInput"
            value="${recipient}"
            placeholder="Your name"
            maxlength="20"
            style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#fff;font-size:14px;margin-bottom:12px;outline:none;box-sizing:border-box;"
          />
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <button type="button" class="et-act-btn active" id="etGenderFemale" style="flex:1;padding:9px;">👩 Coastal Gown</button>
            <button type="button" class="et-act-btn" id="etGenderMale" style="flex:1;padding:9px;">👨 Sunset Linen</button>
          </div>
          <button
            type="button"
            id="etEnterBtn"
            style="width:100%;padding:12px;border-radius:999px;border:none;background:linear-gradient(135deg,#f43f5e,#fb923c);color:#fff;font-weight:800;font-size:14px;cursor:pointer;"
          >
            Enter Sunset Island ✨
          </button>
        </div>
      </div>

      <div id="etMusicMount" style="display:none;"></div>
    </div>
  `;

  // Music Player
  const musicMount = container.querySelector('#etMusicMount');
  if (data.audioSrc) {
    initMusicPlayer(musicMount, {
      src: data.audioSrc,
      title: data.audioTitle || 'Ever Tide Sunset',
      subtitle: data.audioSubtitle || 'ISLAND SERENADE',
    });
  }
  let isMuted = false;
  const btnAudio = container.querySelector('#etBtnAudio');
  const audioIcon = container.querySelector('#etAudioIcon');
  btnAudio.addEventListener('click', () => {
    isMuted = !isMuted;
    audioIcon.textContent = isMuted ? '🔇' : '🎵';
    const audioEl = musicMount.querySelector('audio');
    if (audioEl) {
      audioEl.muted = isMuted;
      if (!isMuted && audioEl.paused) audioEl.play().catch(() => {});
    }
  });

  // Fullscreen toggle
  const fsIcon = container.querySelector('#etFsIcon');
  const btnFullscreen = container.querySelector('#etBtnFullscreen');
  const updateFsIcon = () => {
    fsIcon.textContent = (document.fullscreenElement || document.webkitFullscreenElement) ? '✕' : '⛶';
  };
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el).catch(() => {});
    } else {
      const ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) ex.call(document).catch(() => {});
    }
  });
  document.addEventListener('fullscreenchange', updateFsIcon);
  document.addEventListener('webkitfullscreenchange', updateFsIcon);

  const canvasWrap = container.querySelector('#etCanvasWrap');
  const peerCountEl = container.querySelector('#etPeerCount');
  const joinModal = container.querySelector('#etJoinModal');
  const nameInput = container.querySelector('#etNameInput');
  const btnFemale = container.querySelector('#etGenderFemale');
  const btnMale = container.querySelector('#etGenderMale');
  const enterBtn = container.querySelector('#etEnterBtn');

  let selectedGender = 'female';
  btnFemale.addEventListener('click', () => {
    selectedGender = 'female';
    btnFemale.classList.add('active');
    btnMale.classList.remove('active');
  });
  btnMale.addEventListener('click', () => {
    selectedGender = 'male';
    btnMale.classList.add('active');
    btnFemale.classList.remove('active');
  });

  /* ═══════════════════════════════════════════
     THREE.JS SCENE — ADAPTIVE SUNSET ISLAND
     ═══════════════════════════════════════════ */
  const w = canvasWrap.clientWidth || window.innerWidth;
  const h = canvasWrap.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xe8956a, 0.0055);

  const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 360);
  const renderer = new THREE.WebGLRenderer({
    antialias: !lowDetail,
    powerPreference: 'high-performance',
    alpha: false,
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(getOptimalPixelRatio(tier));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;
  canvasWrap.appendChild(renderer.domElement);

  const sunPosition = new THREE.Vector3(-40, 20, -120);
  const sunDir = sunPosition.clone().normalize();

  // Sky Dome
  const skyUniforms = { uSunPosition: { value: sunPosition }, uTime: { value: 0.0 } };
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(200, lowDetail ? 20 : 28, lowDetail ? 14 : 20), skyMat));

  // Sun Glow Sprite
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = glowCanvas.height = 128;
  const glowCtx = glowCanvas.getContext('2d');
  const glowGrad = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
  glowGrad.addColorStop(0, 'rgba(255, 240, 200, 1.0)');
  glowGrad.addColorStop(0.2, 'rgba(255, 205, 130, 0.72)');
  glowGrad.addColorStop(0.55, 'rgba(255, 135, 65, 0.2)');
  glowGrad.addColorStop(1, 'rgba(255, 80, 40, 0)');
  glowCtx.fillStyle = glowGrad;
  glowCtx.fillRect(0, 0, 128, 128);
  const glowTex = new THREE.CanvasTexture(glowCanvas);
  const sunGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
    })
  );
  sunGlow.position.copy(sunPosition).normalize().multiplyScalar(175);
  sunGlow.scale.set(58, 58, 1);
  scene.add(sunGlow);

  // Lighting (minimal dynamic light count for crisp 60fps on mobile)
  scene.add(new THREE.HemisphereLight(0xffcfa6, 0x5c3875, 1.15));
  const dirLight = new THREE.DirectionalLight(0xffb070, 1.35);
  dirLight.position.copy(sunDir).multiplyScalar(30);
  scene.add(dirLight);

  // Shader Water (Opaque -> 0 overdraw on mobile)
  const waterUniforms = {
    uTime: { value: 0 },
    uSunDir: { value: sunDir },
    uSunColor: { value: new THREE.Color(1.0, 0.82, 0.5) },
    uDeepColor: { value: new THREE.Color(0.04, 0.22, 0.38) },
    uShallowColor: { value: new THREE.Color(0.1, 0.52, 0.56) },
    uCameraPos: { value: camera.position },
  };
  const waterMat = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: waterUniforms,
    transparent: false,
  });
  const oceanSegX = lowDetail ? 34 : tier === 'medium' ? 50 : 64;
  const oceanSegY = lowDetail ? 18 : tier === 'medium' ? 28 : 34;
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(300, 180, oceanSegX, oceanSegY), waterMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -0.32, -50);
  scene.add(ocean);

  // Organic Sculpted Island Terrain matching getSandY()
  const sandTex = createSandTexture(lowDetail ? 256 : 512);
  const sandBump = createSandBumpMap(lowDetail ? 128 : 256);
  const islandGeo = new THREE.CylinderGeometry(22.2, 26.5, 1.6, lowDetail ? 36 : 48, 3);
  const islandPos = islandGeo.attributes.position;
  for (let i = 0; i < islandPos.count; i++) {
    const x = islandPos.getX(i);
    const y = islandPos.getY(i);
    const z = islandPos.getZ(i);
    if (y > 0.35) {
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);
      const scale = radius / 22.2;
      const targetR = getCoastRadius(angle) * scale;
      const nx = Math.cos(angle) * targetR;
      const nz = Math.sin(angle) * targetR;
      islandPos.setX(i, nx);
      islandPos.setZ(i, nz);
      // Set world-space height matching getSandY(nx, nz + ISLAND_CENTER_Z)
      const worldSandY = getSandY(nx, nz + ISLAND_CENTER_Z);
      islandPos.setY(i, worldSandY + 0.75);
    }
  }
  islandGeo.computeVertexNormals();

  const sandMat = new THREE.MeshStandardMaterial({
    map: sandTex,
    bumpMap: lowDetail ? null : sandBump,
    bumpScale: 0.14,
    roughness: 0.92,
    color: 0xf0d8b0,
  });
  const island = new THREE.Mesh(islandGeo, sandMat);
  island.position.set(0, -0.75, ISLAND_CENTER_Z);
  scene.add(island);

  // Wet Shoreline Ring
  const wetSand = new THREE.Mesh(
    new THREE.RingGeometry(20.6, 24.8, lowDetail ? 32 : 48),
    new THREE.MeshStandardMaterial({ color: 0xc4a882, roughness: 0.4, metalness: 0.15, transparent: true, opacity: 0.58 })
  );
  wetSand.rotation.x = -Math.PI / 2;
  wetSand.position.set(0, -0.08, ISLAND_CENTER_Z);
  scene.add(wetSand);

  // Carved Sand Names
  const sandNamesTex = createSandNamesTexture(sandTextLeft, sandTextRight);
  const sandNamesMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.6),
    new THREE.MeshBasicMaterial({ map: sandNamesTex, transparent: true, depthWrite: false })
  );
  sandNamesMesh.rotation.x = -Math.PI / 2;
  sandNamesMesh.rotation.z = -0.15;
  sandNamesMesh.position.set(2.4, getSandY(2.4, 2.8) + 0.02, 2.8);
  scene.add(sandNamesMesh);

  // Colliders & Props
  const obstacles = [];
  createFloralArch(scene, obstacles);
  const { benchPos, benchYaw, umbTex } = createBeachSetup(scene, obstacles);

  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7a5230, roughness: 0.88 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3d7a2a, roughness: 0.65, side: THREE.DoubleSide });
  const coconutMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
  createRealisticPalm(scene, -10, 1.5, 0.3, trunkMat, leafMat, coconutMat, obstacles);
  createRealisticPalm(scene, 11, 3.5, -0.8, trunkMat, leafMat, coconutMat, obstacles);
  createRealisticPalm(scene, -6, 7, 1.2, trunkMat, leafMat, coconutMat, obstacles);
  createRealisticPalm(scene, 14, -1, -0.3, trunkMat, leafMat, coconutMat, obstacles);

  createRowboat(scene, obstacles);
  scatterBeachDetails(scene, lowDetail);
  const pierCinema = createPierAndCinema(scene, centerpieceVideo, centerpieceTitle, couplePhoto, obstacles);
  const memoryEasels = createMemoryEasels(scene, photos, obstacles);

  // Shared-material Clouds (3 SpriteMaterials max instead of 32 clones)
  const cloudTex = createCloudTexture();
  const cloudMats = [0.42, 0.56, 0.68].map(
    (op) => new THREE.SpriteMaterial({ map: cloudTex, transparent: true, opacity: op, depthWrite: false, fog: true })
  );
  const clouds = [];
  const cloudCount = lowDetail ? 5 : 8;
  for (let i = 0; i < cloudCount; i++) {
    const cloudGroup = new THREE.Group();
    const puffCount = lowDetail ? 2 : 3;
    for (let j = 0; j < puffCount; j++) {
      const puff = new THREE.Sprite(cloudMats[(i + j) % cloudMats.length]);
      puff.position.set((j - puffCount / 2) * 2.8, Math.random() * 1.2, Math.random() * 1.8);
      puff.scale.set(5.5 + Math.random() * 3.5, 2.5 + Math.random() * 1.8, 1);
      cloudGroup.add(puff);
    }
    cloudGroup.position.set(-60 + i * 18, 14 + (i % 3) * 4, -50 - Math.random() * 28);
    scene.add(cloudGroup);
    clouds.push(cloudGroup);
  }

  // Sky Airplane + Banner
  const planeGroup = new THREE.Group();
  const planeBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.9, 5, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1 })
  );
  planeBody.rotation.z = Math.PI / 2;
  const planeAccentMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 });
  const planeWing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 2.0), planeAccentMat);
  const planeTail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.04), planeAccentMat);
  planeTail.position.set(-0.5, 0.15, 0);
  const propeller = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.06), new THREE.MeshStandardMaterial({ color: 0x333333 }));
  propeller.position.set(0.65, 0, 0);
  planeGroup.add(planeBody, planeWing, planeTail, propeller);

  let bannerTex = createBannerTexture(planeMessage, null);
  const bannerMat = new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide });
  const bannerMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 1.4), bannerMat);
  bannerMesh.position.set(-4.2, 0, 0);
  planeGroup.add(bannerMesh);

  if (couplePhoto) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const nextTex = createBannerTexture(planeMessage, img);
      bannerMat.map = nextTex;
      bannerMat.needsUpdate = true;
      bannerTex.dispose();
      bannerTex = nextTex;
      bannerMesh.scale.set(1, 1.65, 1);
    };
    img.src = couplePhoto;
  }

  let planeActive = true;
  let planeX = -26;
  planeGroup.position.set(planeX, 7.6, -18);
  scene.add(planeGroup);

  // Floating Sky Lanterns
  const lanterns = [];
  for (let i = 0; i < (lowDetail ? 2 : 4); i++) {
    spawnSkyLantern(scene, lanterns, (Math.random() - 0.5) * 16, 2.5 + Math.random() * 4, -6 - Math.random() * 10);
  }

  /* ═══════════════════════════════════════════
     GUIDED TOUR + FREE WALK CAMERA ENGINE
     ═══════════════════════════════════════════ */
  const waypoints = [
    {
      title: islandTitle,
      subtitle: islandSubtitle,
      badge: 'ISLAND ARRIVAL',
      camPos: new THREE.Vector3(0, 4.4, 15.5),
      lookAt: new THREE.Vector3(0, 1.8, -4.0),
    },
    {
      title: `${sandTextLeft} ♡ ${sandTextRight}`,
      subtitle: 'Carved beside the floral sunset arch',
      badge: 'FLORAL GAZEBO',
      camPos: new THREE.Vector3(3.4, 2.6, 4.4),
      lookAt: new THREE.Vector3(0.4, 1.2, -2.5),
    },
    ...memoryEasels.easelData.map((ed, idx) => ({
      title: ed.photo.title || `Memory #${idx + 1}`,
      subtitle: ed.photo.desc || ed.photo.date || 'Boardwalk Memory Frame',
      badge: `MEMORY ${String(idx + 1).padStart(2, '0')} OF ${String(memoryEasels.easelData.length).padStart(2, '0')}`,
      camPos: ed.camPos,
      lookAt: ed.pos,
    })),
    {
      title: centerpieceTitle,
      subtitle: 'Walk the wooden pier to our private sunset cinema',
      badge: 'PIER SUNSET CINEMA',
      camPos: new THREE.Vector3(PIER_X, 2.6, -14.2),
      lookAt: new THREE.Vector3(PIER_X, 1.9, -21.3),
    },
  ];

  let currentMode = 'tour'; // 'tour' | 'walk'
  let tourIndex = 0;
  let isTourPlaying = true;
  let tourTimer = null;
  const currentLookAt = new THREE.Vector3().copy(waypoints[0].lookAt);
  camera.position.copy(waypoints[0].camPos);
  camera.lookAt(currentLookAt);

  const tourDock = container.querySelector('#etTourDock');
  const hudBottom = container.querySelector('#etHudBottom');
  const desktopHint = container.querySelector('#etDesktopHint');
  const joyEl = container.querySelector('#etJoystick');
  const joyKnob = container.querySelector('#etJoystickKnob');
  const btnModeToggle = container.querySelector('#etBtnModeToggle');
  const modeIcon = container.querySelector('#etModeIcon');
  const modeLabel = container.querySelector('#etModeLabel');
  const tourBadge = container.querySelector('#etTourBadge');
  const tourTitle = container.querySelector('#etTourTitle');
  const tourSub = container.querySelector('#etTourSub');
  const tourPlayBtn = container.querySelector('#etTourPlay');

  function goToWaypoint(idx, dur = 2.0) {
    tourIndex = (idx + waypoints.length) % waypoints.length;
    const wp = waypoints[tourIndex];
    tourBadge.textContent = wp.badge;
    tourTitle.textContent = wp.title;
    tourSub.textContent = wp.subtitle;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(currentLookAt);
    gsap.to(camera.position, { x: wp.camPos.x, y: wp.camPos.y, z: wp.camPos.z, duration: dur, ease: 'power2.inOut' });
    gsap.to(currentLookAt, {
      x: wp.lookAt.x,
      y: wp.lookAt.y,
      z: wp.lookAt.z,
      duration: dur,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(currentLookAt),
      onComplete: () => {
        if (isTourPlaying && currentMode === 'tour') {
          clearTimeout(tourTimer);
          tourTimer = setTimeout(() => {
            if (isTourPlaying && currentMode === 'tour') goToWaypoint(tourIndex + 1);
          }, 4800);
        }
      },
    });
  }

  function setMode(mode) {
    currentMode = mode;
    clearTimeout(tourTimer);
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(currentLookAt);
    if (mode === 'tour') {
      modeIcon.textContent = '🧭';
      modeLabel.textContent = 'Guided Tour';
      tourDock.style.display = 'flex';
      hudBottom.style.display = 'none';
      desktopHint.style.display = 'none';
      joyEl.style.display = 'none';
      goToWaypoint(tourIndex, 1.5);
    } else {
      modeIcon.textContent = '🚶';
      modeLabel.textContent = 'Free Walk';
      tourDock.style.display = 'none';
      hudBottom.style.display = 'flex';
      if (isTouchDevice) {
        joyEl.style.display = 'block';
        desktopHint.style.display = 'none';
      } else {
        joyEl.style.display = 'none';
        desktopHint.style.display = 'block';
      }
    }
  }

  btnModeToggle.addEventListener('click', () => setMode(currentMode === 'tour' ? 'walk' : 'tour'));
  container.querySelector('#etTourPrev').addEventListener('click', () => { clearTimeout(tourTimer); goToWaypoint(tourIndex - 1); });
  container.querySelector('#etTourNext').addEventListener('click', () => { clearTimeout(tourTimer); goToWaypoint(tourIndex + 1); });
  container.querySelector('#etTourCinema').addEventListener('click', () => { clearTimeout(tourTimer); goToWaypoint(waypoints.length - 1); });
  tourPlayBtn.addEventListener('click', () => {
    isTourPlaying = !isTourPlaying;
    tourPlayBtn.textContent = isTourPlaying ? '⏸' : '▶';
    if (isTourPlaying) goToWaypoint(tourIndex);
    else clearTimeout(tourTimer);
  });

  /* ═══════════════════════════════════════════
     AVATARS & FULL REAL-TIME MULTIPLAYER
     ═══════════════════════════════════════════ */
  let localAvatar = null;
  let multiplayer = null;
  let hasEntered = false;
  let userProfile = { name: recipient, gender: 'female' };
  const peerAvatars = new Map();
  const localPos = new THREE.Vector3(0, getSurfaceHeight(0, 4.5), 4.5);
  let localRotY = Math.PI;
  let activeBench = null; // null | 'beach' | 'pier'
  let holdingHandsWith = null;
  let activeProposalData = null;

  // Camera orbit parameters (Museum-style TPP)
  let walkYaw = 0; // 0 looks toward -Z (sunset & floral arch)
  let walkPitch = 0.12;
  let camZoomDist = 4.6;

  function getBenchSeatCoords(benchType, gender, isPeer = false) {
    const seatOffset = gender === 'male' ? -0.58 : 0.58;
    const finalOffset = isPeer ? -seatOffset : seatOffset;
    if (benchType === 'pier') {
      return {
        x: pierCinema.pierBenchPos.x + finalOffset,
        y: pierCinema.pierBenchPos.y,
        z: pierCinema.pierBenchPos.z,
        rotY: pierCinema.pierBenchYaw,
      };
    }
    const cosY = Math.cos(benchYaw);
    const sinY = Math.sin(benchYaw);
    return {
      x: benchPos.x + cosY * finalOffset,
      y: benchPos.y,
      z: benchPos.z - sinY * finalOffset,
      rotY: benchYaw,
    };
  }

  function spawnLocalAndConnect(userName, gender) {
    if (hasEntered) return;
    hasEntered = true;
    userProfile = { name: userName, gender };

    localAvatar = create3DAvatar(userName, gender, true, { theme: 'coastal', lowDetail });
    localAvatar.group.position.copy(localPos);
    localAvatar.group.rotation.y = localRotY;
    scene.add(localAvatar.group);

    setMode('walk');
    walkYaw = 0;
    walkPitch = 0.12;
    camera.position.set(localPos.x, localPos.y + 2.1, localPos.z + camZoomDist);
    currentLookAt.set(localPos.x, localPos.y + 1.4, localPos.z);
    camera.lookAt(currentLookAt);

    multiplayer = new MuseumMultiplayer(
      roomName,
      userProfile,
      (peersMap) => {
        peerCountEl.textContent = String(peersMap.size + 1);
        for (const [uid, entry] of peerAvatars.entries()) {
          if (!peersMap.has(uid)) {
            scene.remove(entry.avatar.group);
            entry.avatar.dispose();
            peerAvatars.delete(uid);
            if (holdingHandsWith === uid) holdingHandsWith = null;
          }
        }
        for (const [uid, p] of peersMap.entries()) {
          let entry = peerAvatars.get(uid);
          const px = typeof p.x === 'number' ? p.x : 0;
          const pz = typeof p.z === 'number' ? p.z : 4.5;
          const py = typeof p.y === 'number' ? p.y : getSurfaceHeight(px, pz);
          if (!entry) {
            const av = create3DAvatar(p.name || 'Partner', p.gender || 'female', false, { theme: 'coastal', lowDetail });
            av.group.position.set(px, py, pz);
            av.group.rotation.y = p.rotY || Math.PI;
            scene.add(av.group);
            entry = {
              avatar: av,
              targetPos: new THREE.Vector3(px, py, pz),
              predPos: new THREE.Vector3(px, py, pz),
              targetRotY: p.rotY || Math.PI,
              vx: typeof p.vx === 'number' ? p.vx : 0,
              vz: typeof p.vz === 'number' ? p.vz : 0,
              lastNetAt: performance.now(),
              isWalking: Boolean(p.isWalking),
              gender: p.gender || 'female',
            };
            peerAvatars.set(uid, entry);
          } else {
            const nowMs = performance.now();
            const dtNet = Math.max(0.05, (nowMs - (entry.lastNetAt || nowMs)) / 1000);
            const fallbackVx = (px - entry.targetPos.x) / dtNet;
            const fallbackVz = (pz - entry.targetPos.z) / dtNet;
            entry.vx = typeof p.vx === 'number' ? p.vx : (p.isWalking ? THREE.MathUtils.clamp(fallbackVx, -6, 6) : 0);
            entry.vz = typeof p.vz === 'number' ? p.vz : (p.isWalking ? THREE.MathUtils.clamp(fallbackVz, -6, 6) : 0);
            entry.targetPos.set(px, py, pz);
            entry.targetRotY = typeof p.rotY === 'number' ? p.rotY : entry.targetRotY;
            entry.lastNetAt = nowMs;
            entry.isWalking = Boolean(p.isWalking);
          }
          if (Boolean(p.isSeated) !== entry.avatar.isSeated()) {
            entry.avatar.setSeated(Boolean(p.isSeated));
          }
          if (Boolean(p.isKneeling) !== entry.avatar.isKneeling()) {
            entry.avatar.setKneeling(Boolean(p.isKneeling));
          }
        }
      },
      (actionData) => {
        const entry = peerAvatars.get(actionData.userId);
        if (actionData.action === 'wave' && entry) {
          entry.avatar.playGesture('wave');
        } else if ((actionData.action === 'hearts' || actionData.action === 'heart') && entry) {
          entry.avatar.burstHearts(scene, localAvatar ? localAvatar.group.position : null);
        } else if (actionData.action === 'sit' && entry) {
          const seat = getBenchSeatCoords(actionData.bench || 'beach', entry.gender, false);
          entry.targetPos.set(seat.x, seat.y, seat.z);
          entry.targetRotY = seat.rotY;
          entry.avatar.setSeated(true);
        } else if (actionData.action === 'stand' && entry) {
          entry.avatar.setSeated(false);
        } else if (actionData.action === 'lantern') {
          for (let i = 0; i < 5; i++) {
            spawnSkyLantern(scene, lanterns, (Math.random() - 0.5) * 10, 1.4 + Math.random(), 1 - Math.random() * 6);
          }
        } else if (actionData.action === 'plane') {
          planeX = -26;
          planeActive = true;
        } else if ((actionData.action === 'propose_kneel' || (actionData.action === 'propose' && actionData.payload?.kneeling)) && entry) {
          entry.avatar.setKneeling(true);
          if (localAvatar) {
            const dx = localAvatar.group.position.x - entry.avatar.group.position.x;
            const dz = localAvatar.group.position.z - entry.avatar.group.position.z;
            entry.targetRotY = Math.atan2(dx, dz);
            localRotY = Math.atan2(-dx, -dz);
            localAvatar.group.rotation.y = localRotY;
            localAvatar.setSurprise(true);
          }
          activeProposalData = actionData;
          proposalBulletText.textContent = `💍 ${actionData.proposerName || actionData.name || 'Your Love'} is proposing • Tap to open`;
          proposalBullet.style.display = 'flex';
        } else if (actionData.action === 'propose_accept' || actionData.action === 'propose_yes') {
          triggerProposalCelebration(actionData.acceptorName || actionData.name);
        } else if (actionData.action === 'propose_stand' || (actionData.action === 'propose' && actionData.payload?.kneeling === false)) {
          if (entry) entry.avatar.setKneeling(false);
          localAvatar?.setSurprise(false);
          proposalBullet.style.display = 'none';
          proposalModal.classList.remove('open');
        }
      },
      (chatData) => {
        const entry = peerAvatars.get(chatData.userId);
        if (entry && chatData.text) entry.avatar.showChatBubble(chatData.text);
      }
    );

    const audioEl = musicMount.querySelector('audio');
    if (audioEl && !isMuted) audioEl.play().catch(() => {});
    pierCinema.videoEl.play().catch(() => {});
  }

  enterBtn.addEventListener('click', () => {
    const nm = (nameInput.value || recipient).trim();
    joinModal.style.display = 'none';
    spawnLocalAndConnect(nm, selectedGender);
  });

  if (isMakerReview) {
    joinModal.style.display = 'none';
    spawnLocalAndConnect(recipient, 'female');
  }

  /* ═══════════════════════════════════════════
     ACCURATE CONTROLS: KEYBOARD, MOUSE LOOK,
     SCROLL ZOOM, MULTI-TOUCH JOYSTICK & LOOK
     ═══════════════════════════════════════════ */
  const keys = {};
  const joyVec = { x: 0, y: 0 };

  const onKeyDown = (e) => {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    keys[e.key.toLowerCase()] = true;
  };
  const onKeyUp = (e) => { keys[e.key.toLowerCase()] = false; };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // Mouse Drag to Look & Scroll to Zoom
  let isMouseLooking = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let pointerDownPos = { x: 0, y: 0 };

  const onMouseDown = (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
    if (currentMode !== 'walk') return;
    isMouseLooking = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  };
  const onMouseMove = (e) => {
    if (!isMouseLooking || currentMode !== 'walk') return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    walkYaw -= dx * 0.0042;
    walkPitch = THREE.MathUtils.clamp(walkPitch + dy * 0.0032, -0.18, 0.72);
  };
  const onMouseUp = () => { isMouseLooking = false; };
  const onWheel = (e) => {
    if (currentMode !== 'walk') return;
    camZoomDist = THREE.MathUtils.clamp(camZoomDist + e.deltaY * 0.003, 2.8, 7.6);
  };

  renderer.domElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: true });

  // Multi-touch: Left Joystick + Right Screen Look
  let joystickTouchId = null;
  let lookTouchId = null;
  let prevTouchX = 0;
  let prevTouchY = 0;

  function updateJoystickTouch(touch) {
    const r = joyEl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const maxR = r.width * 0.42;
    let dx = touch.clientX - cx;
    let dy = touch.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxR) {
      dx = (dx / dist) * maxR;
      dy = (dy / dist) * maxR;
    }
    joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
    joyVec.x = dx / maxR;
    joyVec.y = dy / maxR;
  }

  const onJoyTouchStart = (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    joystickTouchId = touch.identifier;
    updateJoystickTouch(touch);
  };
  const onCanvasTouchStart = (e) => {
    if (currentMode !== 'walk') return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (i === 0) pointerDownPos = { x: t.clientX, y: t.clientY };
      if (t.clientX > window.innerWidth * 0.3 && lookTouchId === null && t.identifier !== joystickTouchId) {
        lookTouchId = t.identifier;
        prevTouchX = t.clientX;
        prevTouchY = t.clientY;
      }
    }
  };
  const onWindowTouchMove = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (t.identifier === joystickTouchId) {
        e.preventDefault();
        updateJoystickTouch(t);
      } else if (t.identifier === lookTouchId && currentMode === 'walk') {
        const dx = t.clientX - prevTouchX;
        const dy = t.clientY - prevTouchY;
        prevTouchX = t.clientX;
        prevTouchY = t.clientY;
        walkYaw -= dx * 0.005;
        walkPitch = THREE.MathUtils.clamp(walkPitch + dy * 0.0038, -0.18, 0.72);
      }
    }
  };
  const onWindowTouchEnd = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (t.identifier === joystickTouchId) {
        joystickTouchId = null;
        joyVec.x = 0;
        joyVec.y = 0;
        joyKnob.style.transform = 'translate(0px, 0px)';
      } else if (t.identifier === lookTouchId) {
        lookTouchId = null;
      }
    }
  };

  joyEl.addEventListener('touchstart', onJoyTouchStart, { passive: false });
  renderer.domElement.addEventListener('touchstart', onCanvasTouchStart, { passive: true });
  window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
  window.addEventListener('touchend', onWindowTouchEnd);
  window.addEventListener('touchcancel', onWindowTouchEnd);

  /* ═══════════════════════════════════════════
     MODALS, RAYCASTING & MULTIPLAYER ACTIONS
     ═══════════════════════════════════════════ */
  const memoryModal = container.querySelector('#etMemoryModal');
  const memoryImg = container.querySelector('#etMemoryImg');
  const memoryDate = container.querySelector('#etMemoryDate');
  const memoryTitle = container.querySelector('#etMemoryTitle');
  const memoryDesc = container.querySelector('#etMemoryDesc');
  let activeMemoryIdx = 0;

  function openMemoryModal(idx) {
    if (!photos.length) return;
    activeMemoryIdx = (idx + photos.length) % photos.length;
    const item = photos[activeMemoryIdx];
    memoryImg.src = item.image || '/images/sunset.jpg';
    memoryDate.textContent = item.date || 'Coastal Chapter';
    memoryTitle.textContent = item.title || `Memory #${activeMemoryIdx + 1}`;
    memoryDesc.textContent = item.desc || '';
    memoryModal.classList.add('open');
  }

  container.querySelector('#etMemoryClose').addEventListener('click', () => memoryModal.classList.remove('open'));
  container.querySelector('#etMemoryPrev').addEventListener('click', () => openMemoryModal(activeMemoryIdx - 1));
  container.querySelector('#etMemoryNext').addEventListener('click', () => openMemoryModal(activeMemoryIdx + 1));

  // Proposal System (Proposer Kneels + Receiver Bullet + Runaway No + Real-time Celebrate)
  const proposalBullet = container.querySelector('#etProposalBullet');
  const proposalBulletText = container.querySelector('#etProposalBulletText');
  const proposalModal = container.querySelector('#etProposalModal');
  const proposalAskView = container.querySelector('#etProposalAskView');
  const proposalCelebrateView = container.querySelector('#etProposalCelebrateView');
  const proposalEyebrow = container.querySelector('#etProposalEyebrow');
  const proposalYesBtnEl = container.querySelector('#etProposalYesBtn');
  const proposalNoBtnEl = container.querySelector('#etProposalNoBtn');
  const proposalStandBtnEl = container.querySelector('#etProposalStandBtn');
  const celebrateTitleEl = container.querySelector('#etCelebrateTitle');
  const celebrateMsgEl = container.querySelector('#etCelebrateMsg');
  const btnPropose = container.querySelector('#etBtnPropose');
  const btnSit = container.querySelector('#etBtnSit');
  const btnHoldHands = container.querySelector('#etBtnHoldHands');

  let runawayCount = 0;
  const runawayPhrases = ['Are you sure? 😜', "Can't click me! 🥰", 'Only YES allowed! 💍', 'Nice try! 😘'];

  function dodgeNoButton(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    runawayCount++;
    proposalNoBtnEl.textContent = runawayPhrases[(runawayCount - 1) % runawayPhrases.length];
    gsap.to(proposalNoBtnEl, {
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 60,
      duration: 0.2,
      ease: 'power2.out',
    });
  }
  proposalNoBtnEl.addEventListener('mouseenter', dodgeNoButton);
  proposalNoBtnEl.addEventListener('touchstart', dodgeNoButton, { passive: false });
  proposalNoBtnEl.addEventListener('click', dodgeNoButton);

  function triggerProposalCelebration(acceptorName) {
    proposalBullet.style.display = 'none';
    proposalAskView.style.display = 'none';
    proposalCelebrateView.style.display = 'block';
    celebrateTitleEl.textContent = proposalCelebrateTitle;
    celebrateMsgEl.textContent = acceptorName
      ? `${acceptorName} said YES! ${proposalCelebrateMsg}`
      : proposalCelebrateMsg;
    proposalModal.classList.add('open');

    confetti({ particleCount: 75, angle: 60, spread: 70, origin: { x: 0, y: 0.85 } });
    confetti({ particleCount: 75, angle: 120, spread: 70, origin: { x: 1, y: 0.85 } });
    localAvatar?.setSurprise(false);
    localAvatar?.burstHearts(scene, null);
    for (const entry of peerAvatars.values()) {
      entry.avatar.burstHearts(scene, localPos);
    }
    for (let i = 0; i < 6; i++) {
      spawnSkyLantern(scene, lanterns, (Math.random() - 0.5) * 10, 1.5 + Math.random(), -2 - Math.random() * 6);
    }
    planeX = -26;
    planeActive = true;
  }

  function standFromProposal() {
    if (localAvatar?.isKneeling()) localAvatar.setKneeling(false);
    localAvatar?.setSurprise(false);
    btnPropose.classList.remove('active');
    proposalBullet.style.display = 'none';
    proposalModal.classList.remove('open');
    multiplayer?.sendAction('propose_stand');
  }

  proposalBullet.addEventListener('click', () => {
    proposalBullet.style.display = 'none';
    proposalEyebrow.textContent = `💍 ${(activeProposalData?.proposerName || sender).toUpperCase()} ASKS FOR YOUR HAND`;
    proposalAskView.style.display = 'block';
    proposalCelebrateView.style.display = 'none';
    proposalYesBtnEl.style.display = 'block';
    proposalNoBtnEl.style.display = 'block';
    proposalStandBtnEl.style.display = 'none';
    gsap.set(proposalNoBtnEl, { x: 0, y: 0 });
    proposalModal.classList.add('open');
  });

  container.querySelector('#etProposalClose').addEventListener('click', () => proposalModal.classList.remove('open'));
  container.querySelector('#etProposalDoneBtn').addEventListener('click', standFromProposal);
  proposalStandBtnEl.addEventListener('click', standFromProposal);
  proposalYesBtnEl.addEventListener('click', () => {
    triggerProposalCelebration(userProfile.name);
    multiplayer?.sendAction('propose_accept', { acceptorName: userProfile.name });
  });

  // Sitting Helper (automatically picks nearest bench: pier vs beach)
  function sitOnNearestBench() {
    if (!localAvatar) return;
    if (activeBench) {
      activeBench = null;
      localAvatar.setSeated(false);
      localPos.z += 1.1;
      localPos.y = getSurfaceHeight(localPos.x, localPos.z);
      btnSit.classList.remove('active');
      btnSit.textContent = '🛋️ Sit';
      multiplayer?.sendAction('stand');
      multiplayer?.sendMove(localPos.x, localPos.y, localPos.z, localRotY, false, false, false);
      return;
    }

    const distBeach = Math.hypot(localPos.x - benchPos.x, localPos.z - benchPos.z);
    const distPier = Math.hypot(localPos.x - pierCinema.pierBenchPos.x, localPos.z - pierCinema.pierBenchPos.z);
    const targetBench = distPier < distBeach ? 'pier' : 'beach';
    activeBench = targetBench;
    if (holdingHandsWith) {
      holdingHandsWith = null;
      localAvatar.setHoldingHands(false);
      btnHoldHands.classList.remove('active');
    }
    const seat = getBenchSeatCoords(targetBench, userProfile.gender, false);
    localPos.set(seat.x, seat.y, seat.z);
    localRotY = seat.rotY;
    localAvatar.group.position.copy(localPos);
    localAvatar.group.rotation.y = localRotY;
    localAvatar.setSeated(true);
    btnSit.classList.add('active');
    btnSit.textContent = '🚶 Stand';
    multiplayer?.sendAction('sit', { bench: targetBench });
    multiplayer?.sendMove(localPos.x, localPos.y, localPos.z, localRotY, false, true, false);
  }

  // Raycast click handler for Easels & Pier Cinema
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const onCanvasClick = (e) => {
    if (Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 9) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects([...memoryEasels.easelMeshes, pierCinema.screenMesh], false);
    if (hits.length > 0) {
      const obj = hits[0].object;
      if (obj.userData?.type === 'easel') {
        openMemoryModal(obj.userData.index);
      } else if (obj.userData?.type === 'cinema') {
        if (pierCinema.videoEl.paused) {
          pierCinema.videoEl.muted = false;
          pierCinema.videoEl.play().catch(() => {});
        } else {
          pierCinema.videoEl.muted = !pierCinema.videoEl.muted;
        }
      }
    }
  };
  renderer.domElement.addEventListener('click', onCanvasClick);

  // Action Dock Buttons
  container.querySelector('#etBtnWave').addEventListener('click', () => {
    if (!localAvatar) return;
    localAvatar.playGesture('wave');
    multiplayer?.sendAction('wave');
  });
  container.querySelector('#etBtnHearts').addEventListener('click', () => {
    if (!localAvatar) return;
    let targetPos = null;
    if (peerAvatars.size > 0) targetPos = peerAvatars.values().next().value.avatar.group.position;
    localAvatar.burstHearts(scene, targetPos);
    confetti({ particleCount: 24, spread: 55, origin: { y: 0.65 } });
    multiplayer?.sendAction('hearts');
  });
  container.querySelector('#etBtnLanterns').addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
      spawnSkyLantern(scene, lanterns, localPos.x + (Math.random() - 0.5) * 4, 1.4 + Math.random(), localPos.z - 2 - Math.random() * 3);
    }
    multiplayer?.sendAction('lantern');
  });
  btnSit.addEventListener('click', sitOnNearestBench);
  btnHoldHands.addEventListener('click', () => {
    if (!localAvatar) return;
    if (holdingHandsWith) {
      holdingHandsWith = null;
      localAvatar.setHoldingHands(false);
      btnHoldHands.classList.remove('active');
    } else {
      const firstPeer = peerAvatars.keys().next().value;
      if (firstPeer) {
        if (activeBench) sitOnNearestBench();
        holdingHandsWith = firstPeer;
        localAvatar.setHoldingHands(true, 'right');
        btnHoldHands.classList.add('active');
      } else {
        localAvatar.showChatBubble('Invite your partner to hold hands 💕');
      }
    }
  });
  container.querySelector('#etBtnPlane').addEventListener('click', () => {
    planeX = -26;
    planeActive = true;
    multiplayer?.sendAction('plane');
  });
  btnPropose.addEventListener('click', () => {
    if (!localAvatar) return;
    if (localAvatar.isKneeling()) {
      standFromProposal();
      return;
    }
    if (activeBench) sitOnNearestBench();
    if (peerAvatars.size > 0) {
      const firstPeerPos = peerAvatars.values().next().value.avatar.group.position;
      localRotY = Math.atan2(firstPeerPos.x - localPos.x, firstPeerPos.z - localPos.z);
      localAvatar.group.rotation.y = localRotY;
    }
    localAvatar.setKneeling(true);
    btnPropose.classList.add('active');
    multiplayer?.sendAction('propose_kneel', {
      question: proposalQuestion,
      proposerName: userProfile.name,
    });
    multiplayer?.sendMove(localPos.x, localPos.y, localPos.z, localRotY, false, false, true);

    proposalEyebrow.textContent = '💍 YOU ARE PROPOSING';
    proposalAskView.style.display = 'block';
    proposalCelebrateView.style.display = 'none';
    proposalYesBtnEl.style.display = peerAvatars.size === 0 ? 'block' : 'none';
    proposalNoBtnEl.style.display = 'none';
    proposalStandBtnEl.style.display = 'block';
    proposalModal.classList.add('open');
  });

  // Proximity Prompt Actions
  const promptSit = container.querySelector('#etPromptSit');
  const promptEasel = container.querySelector('#etPromptEasel');
  const promptCinema = container.querySelector('#etPromptCinema');
  let nearestEaselIndex = -1;

  promptSit.addEventListener('click', sitOnNearestBench);
  promptEasel.addEventListener('click', () => {
    if (nearestEaselIndex >= 0) openMemoryModal(nearestEaselIndex);
  });
  promptCinema.addEventListener('click', () => {
    if (pierCinema.videoEl.paused) {
      pierCinema.videoEl.muted = false;
      pierCinema.videoEl.play().catch(() => {});
    } else {
      pierCinema.videoEl.muted = !pierCinema.videoEl.muted;
    }
    promptCinema.textContent = pierCinema.videoEl.muted ? '🔇 Cinema Muted • Tap to Unmute' : '🔊 Cinema Audio On • Tap to Mute';
  });

  // Chat Tray
  const chatTray = container.querySelector('#etChatTray');
  const chatInput = container.querySelector('#etChatInput');
  container.querySelector('#etBtnChat').addEventListener('click', () => {
    const open = chatTray.style.display === 'block';
    chatTray.style.display = open ? 'none' : 'block';
    if (!open) setTimeout(() => chatInput.focus(), 60);
  });
  container.querySelector('#etChatClose').addEventListener('click', () => { chatTray.style.display = 'none'; });

  const sendChat = (txtArg) => {
    const txt = (typeof txtArg === 'string' ? txtArg : chatInput.value).trim();
    if (!txt || !localAvatar) return;
    localAvatar.showChatBubble(txt);
    multiplayer?.sendChat(txt);
    chatInput.value = '';
    chatTray.style.display = 'none';
  };
  container.querySelectorAll('.et-chat-chip').forEach((chip) => {
    chip.addEventListener('click', () => sendChat(chip.getAttribute('data-msg')));
  });
  container.querySelector('#etChatSend').addEventListener('click', () => sendChat());
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  /* ═══════════════════════════════════════════
     BOUNDARY & OBSTACLE COLLISION SOLVER
     ═══════════════════════════════════════════ */
  function resolveMovementAndBounds(pos) {
    // 1. Circle obstacle push-out (unless seated on bench)
    if (!activeBench) {
      for (let i = 0; i < obstacles.length; i++) {
        const ob = obstacles[i];
        const dx = pos.x - ob.x;
        const dz = pos.z - ob.z;
        const dist = Math.hypot(dx, dz);
        const minDist = ob.r + 0.35;
        if (dist < minDist) {
          if (dist > 0.001) {
            pos.x = ob.x + (dx / dist) * minDist;
            pos.z = ob.z + (dz / dist) * minDist;
          } else {
            pos.z = ob.z + minDist;
          }
        }
      }
    }

    // 2. Pier deck vs island shoreline boundary
    const inPierLane = Math.abs(pos.x - PIER_X) <= PIER_HALF_W && pos.z <= PIER_Z_START;
    if (inPierLane) {
      pos.x = THREE.MathUtils.clamp(pos.x, PIER_X - (PIER_HALF_W - 0.35), PIER_X + (PIER_HALF_W - 0.35));
      pos.z = Math.max(PIER_Z_END + 0.4, pos.z);
    } else {
      const dz = pos.z - ISLAND_CENTER_Z;
      const angle = Math.atan2(dz, pos.x);
      const maxR = getCoastRadius(angle) - 1.5;
      const r = Math.hypot(pos.x, dz);
      if (r > maxR) {
        pos.x = (pos.x / r) * maxR;
        pos.z = ISLAND_CENTER_Z + (dz / r) * maxR;
      }
    }

    if (!activeBench) {
      pos.y = getSurfaceHeight(pos.x, pos.z);
    }
  }

  /* ═══════════════════════════════════════════
     ANIMATION LOOP (Zero-Allocation + Adaptive FPS)
     ═══════════════════════════════════════════ */
  const fpsScaler = createAdaptiveFpsScaler(renderer, tier);
  const clock = new THREE.Clock();
  let frameId;
  let lastNetSync = 0;
  let lastSentX = 0;
  let lastSentZ = 0;
  let lastSentWalk = false;

  const _camTarget = new THREE.Vector3();
  const _camFwd = new THREE.Vector3();
  const _camRight = new THREE.Vector3();
  const _moveVec = new THREE.Vector3();
  const _upAxis = new THREE.Vector3(0, 1, 0);

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    fpsScaler.tick(dt);

    waterUniforms.uTime.value = elapsed;
    waterUniforms.uCameraPos.value.copy(camera.position);
    skyUniforms.uTime.value = elapsed;

    for (let i = 0; i < clouds.length; i++) {
      clouds[i].position.x += dt * (0.3 + (i % 3) * 0.1);
      if (clouds[i].position.x > 70) clouds[i].position.x = -70;
    }

    propeller.rotation.x += dt * 25;
    if (planeActive) {
      planeX += dt * 3.2;
      planeGroup.position.x = planeX;
      planeGroup.position.y = 7.6 + Math.sin(elapsed * 1.8) * 0.3;
      planeGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.04;
      if (planeX > 32) planeX = -30;
    }

    const glowScale = 58 + Math.sin(elapsed * 0.5) * 3;
    sunGlow.scale.set(glowScale, glowScale, 1);

    for (let i = lanterns.length - 1; i >= 0; i--) {
      const l = lanterns[i];
      l.position.y += l.userData.speedY * dt;
      l.position.x += (l.userData.driftX + Math.sin(elapsed + l.userData.phase) * 0.15) * dt;
      if (l.position.y > 38) {
        scene.remove(l);
        lanterns.splice(i, 1);
      }
    }

    // Local Avatar Movement & Camera-Relative Physics (Walk Mode)
    let isWalking = false;
    let curVx = 0;
    let curVz = 0;
    if (localAvatar && currentMode === 'walk') {
      let fwd = 0;
      let strafe = 0;
      if (keys['w'] || keys['arrowup']) fwd += 1;
      if (keys['s'] || keys['arrowdown']) fwd -= 1;
      if (keys['a'] || keys['arrowleft']) strafe -= 1;
      if (keys['d'] || keys['arrowright']) strafe += 1;

      fwd -= joyVec.y;
      strafe += joyVec.x;

      const mag = Math.hypot(fwd, strafe);
      const wantsMove = mag > 0.09;

      if (wantsMove && localAvatar.isKneeling()) {
        standFromProposal();
      }
      if (wantsMove && activeBench) {
        sitOnNearestBench();
      }

      if (holdingHandsWith && peerAvatars.has(holdingHandsWith)) {
        const partner = peerAvatars.get(holdingHandsWith).avatar.group;
        const pRot = partner.rotation.y;
        const desiredX = partner.position.x - Math.cos(pRot) * 0.68;
        const desiredZ = partner.position.z + Math.sin(pRot) * 0.68;
        const dist = Math.hypot(desiredX - localPos.x, desiredZ - localPos.z);
        if (dist > 0.14) {
          const followAlpha = 1 - Math.exp(-8 * dt);
          const prevX = localPos.x;
          const prevZ = localPos.z;
          localPos.x = THREE.MathUtils.lerp(localPos.x, desiredX, followAlpha);
          localPos.z = THREE.MathUtils.lerp(localPos.z, desiredZ, followAlpha);
          resolveMovementAndBounds(localPos);
          curVx = (localPos.x - prevX) / Math.max(dt, 0.001);
          curVz = (localPos.z - prevZ) / Math.max(dt, 0.001);
          isWalking = true;
        }
        let dRot = pRot - localRotY;
        while (dRot < -Math.PI) dRot += Math.PI * 2;
        while (dRot > Math.PI) dRot -= Math.PI * 2;
        localRotY += dRot * (1 - Math.exp(-10 * dt));
      } else if (wantsMove && !activeBench) {
        const speed = 4.6 * dt;
        const normFwd = (fwd / Math.max(1, mag)) * speed;
        const normStrafe = (strafe / Math.max(1, mag)) * speed;

        _camFwd.set(-Math.sin(walkYaw), 0, -Math.cos(walkYaw)).normalize();
        _camRight.crossVectors(_camFwd, _upAxis).normalize();
        _moveVec.set(0, 0, 0).addScaledVector(_camFwd, normFwd).addScaledVector(_camRight, normStrafe);

        const prevX = localPos.x;
        const prevZ = localPos.z;
        localPos.x += _moveVec.x;
        localPos.z += _moveVec.z;
        resolveMovementAndBounds(localPos);
        curVx = (localPos.x - prevX) / Math.max(dt, 0.001);
        curVz = (localPos.z - prevZ) / Math.max(dt, 0.001);

        const targetRot = Math.atan2(_moveVec.x, _moveVec.z);
        let dRot = targetRot - localRotY;
        while (dRot < -Math.PI) dRot += Math.PI * 2;
        while (dRot > Math.PI) dRot -= Math.PI * 2;
        localRotY += dRot * (1 - Math.exp(-14 * dt));
        isWalking = true;
      }

      // Apply exact position & rotation to local 3D avatar and animate limbs
      localAvatar.group.position.copy(localPos);
      localAvatar.group.rotation.y = localRotY;
      localAvatar.update(dt, isWalking, 1.0);

      // Frame-rate-independent Museum-style TPP Chase Camera
      const isKneel = localAvatar.isKneeling();
      const dist = isKneel ? 3.2 : camZoomDist;
      const height = isKneel ? 1.5 : 2.15;
      const focusY = isKneel ? 1.05 : 1.45;
      const cosP = Math.cos(walkPitch);

      _camTarget.set(
        localPos.x + Math.sin(walkYaw) * cosP * dist,
        localPos.y + height + Math.sin(walkPitch) * dist,
        localPos.z + Math.cos(walkYaw) * cosP * dist
      );
      const camAlpha = 1 - Math.exp(-10 * dt);
      camera.position.lerp(_camTarget, camAlpha);
      currentLookAt.set(localPos.x, localPos.y + focusY - Math.sin(walkPitch) * 0.75, localPos.z);
      camera.lookAt(currentLookAt);

      // Proximity prompts
      const dBeach = Math.hypot(localPos.x - benchPos.x, localPos.z - benchPos.z);
      const dPierBench = Math.hypot(localPos.x - pierCinema.pierBenchPos.x, localPos.z - pierCinema.pierBenchPos.z);
      if ((dBeach < 4.0 || dPierBench < 3.6) && !activeBench) {
        promptSit.style.display = 'inline-flex';
        promptSit.textContent = dPierBench < dBeach ? '🛋️ Sit on Pier Cinema Bench' : '🛋️ Sit Under Beach Umbrella';
      } else {
        promptSit.style.display = 'none';
      }

      let nearIdx = -1;
      let bestDist = 3.6;
      for (let i = 0; i < memoryEasels.easelData.length; i++) {
        const ed = memoryEasels.easelData[i];
        const d = Math.hypot(localPos.x - ed.pos.x, localPos.z - ed.pos.z);
        if (d < bestDist) { bestDist = d; nearIdx = ed.index; }
      }
      nearestEaselIndex = nearIdx;
      if (nearIdx >= 0 && !activeBench) {
        promptEasel.style.display = 'inline-flex';
        promptEasel.textContent = `🔍 Tap Frame: ${memoryEasels.easelData[nearIdx].photo.title || 'Memory'}`;
      } else {
        promptEasel.style.display = 'none';
      }

      const nearCinema = Math.hypot(localPos.x - PIER_X, localPos.z + 18.5) < 5.0;
      promptCinema.style.display = nearCinema ? 'inline-flex' : 'none';

      // Throttled Multiplayer Sync (~15Hz when moving, immediate on walk start/stop, 1.0s heartbeat)
      const now = performance.now();
      if (
        multiplayer &&
        (isWalking !== lastSentWalk ||
          now - lastNetSync > 1000 ||
          (now - lastNetSync > 65 &&
            (Math.abs(localPos.x - lastSentX) > 0.02 ||
              Math.abs(localPos.z - lastSentZ) > 0.02)))
      ) {
        lastNetSync = now;
        lastSentX = localPos.x;
        lastSentZ = localPos.z;
        lastSentWalk = isWalking;
        multiplayer.sendMove(
          localPos.x,
          localPos.y,
          localPos.z,
          localRotY,
          isWalking,
          Boolean(activeBench),
          localAvatar.isKneeling(),
          curVx,
          curVz
        );
      }
    } else if (localAvatar) {
      localAvatar.update(dt, false, 1.0);
    }

    // Smooth Velocity-Assisted Remote Peer Interpolation (Dead Reckoning)
    const peerAlpha = 1 - Math.exp(-9 * dt);
    const rotAlpha = 1 - Math.exp(-12 * dt);
    const nowMs = performance.now();
    for (const entry of peerAvatars.values()) {
      const sincePacket = Math.min(0.28, Math.max(0, (nowMs - (entry.lastNetAt || nowMs)) / 1000));
      if (entry.isWalking) {
        const px = entry.targetPos.x + entry.vx * sincePacket;
        const pz = entry.targetPos.z + entry.vz * sincePacket;
        entry.predPos.set(px, getSurfaceHeight(px, pz), pz);
      } else {
        entry.predPos.copy(entry.targetPos);
      }
      entry.avatar.group.position.lerp(entry.predPos, peerAlpha);
      let dRot = entry.targetRotY - entry.avatar.group.rotation.y;
      while (dRot < -Math.PI) dRot += Math.PI * 2;
      while (dRot > Math.PI) dRot -= Math.PI * 2;
      entry.avatar.group.rotation.y += dRot * rotAlpha;
      entry.avatar.update(dt, entry.isWalking, 1.0);
    }

    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    const nw = canvasWrap.clientWidth || window.innerWidth;
    const nh = canvasWrap.clientHeight || window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize);

  container._cleanup = () => {
    cancelAnimationFrame(frameId);
    clearTimeout(tourTimer);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onWindowTouchMove);
    window.removeEventListener('touchend', onWindowTouchEnd);
    window.removeEventListener('touchcancel', onWindowTouchEnd);
    document.removeEventListener('fullscreenchange', updateFsIcon);
    document.removeEventListener('webkitfullscreenchange', updateFsIcon);
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('wheel', onWheel);
    renderer.domElement.removeEventListener('click', onCanvasClick);
    renderer.domElement.removeEventListener('touchstart', onCanvasTouchStart);
    joyEl.removeEventListener('touchstart', onJoyTouchStart);

    multiplayer?.destroy();
    if (localAvatar) {
      scene.remove(localAvatar.group);
      localAvatar.dispose();
    }
    for (const entry of peerAvatars.values()) {
      scene.remove(entry.avatar.group);
      entry.avatar.dispose();
    }
    peerAvatars.clear();

    pierCinema.dispose();
    memoryEasels.dispose();
    sandNamesTex.dispose();
    bannerTex.dispose();
    sandTex.dispose();
    sandBump.dispose();
    glowTex.dispose();
    cloudTex.dispose();
    umbTex.dispose();

    disposeThreeScene(scene, renderer);
    if (renderer.domElement.parentNode === canvasWrap) {
      canvasWrap.removeChild(renderer.domElement);
    }
  };
}
