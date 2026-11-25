// src/viewer/templates/everTideTemplate.js — Ever Tide "Super Real" Sunset Island
// Realistic Three.js water shader, PBR sand, volumetric sky, detailed props
// Uses existing museumAvatar.js & museumMultiplayer.js for zero-lag multiplayer

import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { create3DAvatar } from './museumAvatar.js';
import { MuseumMultiplayer } from './museumMultiplayer.js';
import { initMusicPlayer } from '../../components/musicPlayer.js';

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
    }
    .et-canvas-wrap {
      width: 100%;
      height: 100%;
    }
    .et-hud-top {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .et-hud-top > * {
      pointer-events: auto;
    }
    .et-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(20, 14, 30, 0.58);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .et-hud-bottom {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
      max-width: 94%;
      padding: 8px 12px;
      border-radius: 20px;
      background: rgba(20, 14, 30, 0.62);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.16);
    }
    .et-act-btn {
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .et-act-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-1px); }
    .et-act-btn.active { background: #f43f5e; border-color: #fda4af; }
    .et-joystick {
      position: absolute;
      bottom: 78px;
      left: 16px;
      z-index: 20;
      width: 88px;
      height: 88px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.12);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(6px);
      touch-action: none;
    }
    .et-joystick-knob {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }
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
    }
    .et-join-card {
      width: 100%;
      max-width: 360px;
      background: rgba(24, 18, 36, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 22px;
      padding: 24px 20px;
      color: #fff;
      text-align: center;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }
    .et-chat-bar {
      position: absolute;
      bottom: 74px;
      right: 14px;
      z-index: 20;
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .et-chat-input {
      width: 140px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(20, 14, 30, 0.65);
      color: #fff;
      font-size: 12px;
      outline: none;
    }
    .et-chat-input::placeholder { color: rgba(255, 255, 255, 0.55); }
  `;
  document.head.appendChild(style);
}

/* ─────────── Water Shader ─────────── */
const waterVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  // Simple noise for wave displacement
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Multi-octave wave displacement
    float wave = 0.0;
    wave += sin(pos.x * 0.3 + uTime * 0.8) * 0.18;
    wave += sin(pos.y * 0.5 - uTime * 0.6) * 0.12;
    wave += sin((pos.x + pos.y) * 0.2 + uTime * 1.1) * 0.08;
    wave += noise2D(pos.xy * 0.15 + uTime * 0.3) * 0.14;
    wave += noise2D(pos.xy * 0.4 - uTime * 0.2) * 0.06;
    pos.z += wave;

    // Compute displaced normal for lighting
    float eps = 0.5;
    float wR = sin((pos.x + eps) * 0.3 + uTime * 0.8) * 0.18 + sin(pos.y * 0.5 - uTime * 0.6) * 0.12;
    float wL = sin((pos.x - eps) * 0.3 + uTime * 0.8) * 0.18 + sin(pos.y * 0.5 - uTime * 0.6) * 0.12;
    float wU = sin(pos.x * 0.3 + uTime * 0.8) * 0.18 + sin((pos.y + eps) * 0.5 - uTime * 0.6) * 0.12;
    float wD = sin(pos.x * 0.3 + uTime * 0.8) * 0.18 + sin((pos.y - eps) * 0.5 - uTime * 0.6) * 0.12;
    vec3 dpdx = vec3(2.0 * eps, 0.0, wR - wL);
    vec3 dpdy = vec3(0.0, 2.0 * eps, wU - wD);
    vNormal = normalize(cross(dpdx, dpdy));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const waterFragmentShader = `
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uCameraPos;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCameraPos - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Fresnel — more reflection at grazing angles
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.5);
    fresnel = clamp(fresnel, 0.08, 0.95);

    // Water color gradient based on depth approximation (distance from camera)
    float depthFactor = smoothstep(10.0, 120.0, length(vWorldPos.xz - uCameraPos.xz));
    vec3 waterColor = mix(uShallowColor, uDeepColor, depthFactor);

    // Specular sun reflection (sun path on water)
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 256.0);
    float specWide = pow(max(dot(N, H), 0.0), 32.0) * 0.3;

    // Sky reflection color (sunset gradient)
    vec3 skyReflect = mix(vec3(0.95, 0.5, 0.35), vec3(0.35, 0.18, 0.5), max(N.y, 0.0));

    // Combine
    vec3 color = mix(waterColor, skyReflect, fresnel);
    color += uSunColor * spec * 2.5;
    color += uSunColor * specWide;

    // Slight foam at wave peaks
    float foam = smoothstep(0.12, 0.22, vWorldPos.y + 0.35) * 0.15;
    color = mix(color, vec3(1.0), foam);

    // Distance fog blend
    float fogFactor = 1.0 - exp(-length(vWorldPos - uCameraPos) * 0.008);
    vec3 fogColor = vec3(0.96, 0.62, 0.42);
    color = mix(color, fogColor, fogFactor * 0.6);

    gl_FragColor = vec4(color, 0.92 - fresnel * 0.15);
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

  // Simple hash for star noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float height = dir.y;

    // Multi-layer sunset gradient
    vec3 zenith = vec3(0.12, 0.06, 0.22);        // deep purple
    vec3 midHigh = vec3(0.35, 0.12, 0.38);       // plum
    vec3 midSky = vec3(0.72, 0.28, 0.42);        // rose
    vec3 horizon = vec3(0.96, 0.52, 0.32);        // warm orange
    vec3 sunBand = vec3(1.0, 0.78, 0.42);         // golden
    vec3 belowHorizon = vec3(0.08, 0.04, 0.12);   // dark water reflection

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

    // Sun glow
    vec3 sunDir = normalize(uSunPosition);
    float sunAngle = max(dot(dir, sunDir), 0.0);
    float sunDisc = smoothstep(0.998, 0.9999, sunAngle);
    float sunGlow = pow(sunAngle, 8.0) * 0.6;
    float sunHalo = pow(sunAngle, 2.5) * 0.25;

    skyColor += vec3(1.0, 0.92, 0.7) * sunDisc * 3.0;
    skyColor += vec3(1.0, 0.65, 0.3) * sunGlow;
    skyColor += vec3(0.95, 0.4, 0.25) * sunHalo;

    // Subtle stars in upper sky
    if (height > 0.5) {
      vec2 starUv = dir.xz / (dir.y + 0.001) * 50.0;
      float star = step(0.998, hash(floor(starUv)));
      float twinkle = 0.5 + 0.5 * sin(uTime * 2.0 + hash(floor(starUv)) * 20.0);
      skyColor += vec3(star * twinkle * 0.4 * smoothstep(0.5, 0.9, height));
    }

    gl_FragColor = vec4(skyColor, 1.0);
  }
`;

/* ─────────── Procedural PBR Sand Texture ─────────── */
function createSandTexture(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  // Base warm sand color
  ctx.fillStyle = '#e8d4b0';
  ctx.fillRect(0, 0, size, size);

  // Noise grains
  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 32;
    d[i] = Math.min(255, Math.max(0, d[i] + noise));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise * 0.9));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise * 0.7));
  }
  ctx.putImageData(imgData, 0, 0);

  // Wet sand darkening near edges
  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size * 0.5);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(60, 40, 20, 0.25)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
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
    const noise = (Math.random() - 0.5) * 60 + 128;
    d[i] = d[i + 1] = d[i + 2] = Math.min(255, Math.max(0, noise));
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

/* ─────────── Sand Names (carved look) ─────────── */
function createSandNamesTexture(sender, recipient) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 256);

  // Shadow layer (carved depth illusion)
  ctx.font = 'italic 700 46px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dark shadow (bottom of carving)
  ctx.fillStyle = 'rgba(90, 65, 40, 0.5)';
  ctx.fillText(sender, 258, 74);
  ctx.fillText(recipient, 258, 186);

  // Light highlight (top of carving)
  ctx.fillStyle = 'rgba(255, 240, 210, 0.3)';
  ctx.fillText(sender, 254, 70);
  ctx.fillText(recipient, 254, 182);

  // Main text
  ctx.fillStyle = 'rgba(120, 85, 50, 0.65)';
  ctx.fillText(sender, 256, 72);

  ctx.font = 'italic 500 42px Georgia, serif';
  ctx.fillStyle = 'rgba(180, 80, 80, 0.7)';
  ctx.fillText('♡', 256, 128);

  ctx.font = 'italic 700 46px Georgia, serif';
  ctx.fillStyle = 'rgba(120, 85, 50, 0.65)';
  ctx.fillText(recipient, 256, 184);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ─────────── Banner Texture ─────────── */
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

/* ─────────── Procedural Cloud Texture ─────────── */
function createCloudTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 220, 200, 0.85)');
  gradient.addColorStop(0.4, 'rgba(255, 200, 185, 0.6)');
  gradient.addColorStop(0.7, 'rgba(240, 170, 160, 0.25)');
  gradient.addColorStop(1, 'rgba(220, 140, 140, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* ─────────── Build Realistic Palm Tree ─────────── */
function createRealisticPalm(scene, x, z, rotY, trunkMat, leafMat) {
  const palm = new THREE.Group();
  palm.position.set(x, 0, z);
  palm.rotation.y = rotY;

  // Curved trunk with ring segments
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.15, 1.5, 0.08),
    new THREE.Vector3(0.35, 3.0, -0.05),
    new THREE.Vector3(0.2, 4.2, 0.1),
    new THREE.Vector3(-0.05, 5.0, 0.0),
  ]);
  const trunkGeo = new THREE.TubeGeometry(trunkCurve, 16, 0.18, 8, false);
  palm.add(new THREE.Mesh(trunkGeo, trunkMat));

  // Trunk ring details
  const ringGeo = new THREE.TorusGeometry(0.2, 0.025, 6, 12);
  for (let i = 1; i <= 8; i++) {
    const t = i / 10;
    const pt = trunkCurve.getPoint(t);
    const ring = new THREE.Mesh(ringGeo, trunkMat);
    ring.position.copy(pt);
    ring.rotation.x = Math.PI / 2;
    palm.add(ring);
  }

  // Palm fronds (wide leaf planes with droop)
  const frondCount = 7;
  const topPt = trunkCurve.getPoint(1.0);
  const frondShape = new THREE.Shape();
  frondShape.moveTo(0, 0);
  frondShape.quadraticCurveTo(0.15, 0.6, 0.08, 1.8);
  frondShape.lineTo(-0.08, 1.8);
  frondShape.quadraticCurveTo(-0.15, 0.6, 0, 0);

  const frondGeo = new THREE.ShapeGeometry(frondShape, 6);

  for (let i = 0; i < frondCount; i++) {
    const angle = (i / frondCount) * Math.PI * 2;
    const frond = new THREE.Mesh(frondGeo, leafMat);
    frond.position.copy(topPt);
    frond.rotation.y = angle;
    frond.rotation.x = -0.3 - Math.random() * 0.4; // droop
    frond.rotation.z = (Math.random() - 0.5) * 0.3;
    frond.scale.set(1.6, 1.4 + Math.random() * 0.4, 1);
    palm.add(frond);
  }

  // Coconut clusters
  const coconutGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const coconutMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
  for (let i = 0; i < 3; i++) {
    const nut = new THREE.Mesh(coconutGeo, coconutMat);
    nut.position.copy(topPt);
    nut.position.x += (Math.random() - 0.5) * 0.2;
    nut.position.z += (Math.random() - 0.5) * 0.2;
    nut.position.y -= 0.1;
    palm.add(nut);
  }

  scene.add(palm);
  return palm;
}

/* ─────────── Build Floral Arch ─────────── */
function createFloralArch(scene) {
  const archGroup = new THREE.Group();
  archGroup.position.set(0, 0, -2.5);

  const archWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc19a6b,
    roughness: 0.82,
    metalness: 0.02,
  });

  const archCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.0, 0, 0),
    new THREE.Vector3(-1.7, 2.6, 0),
    new THREE.Vector3(-0.8, 3.5, 0),
    new THREE.Vector3(0, 3.8, 0),
    new THREE.Vector3(0.8, 3.5, 0),
    new THREE.Vector3(1.7, 2.6, 0),
    new THREE.Vector3(2.0, 0, 0),
  ]);
  archGroup.add(new THREE.Mesh(new THREE.TubeGeometry(archCurve, 32, 0.09, 8, false), archWoodMat));

  // Green vine wrapping around arch
  const vineMat = new THREE.MeshStandardMaterial({
    color: 0x3a7d44,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });
  const vineCurve = new THREE.CatmullRomCurve3(
    Array.from({ length: 30 }, (_, i) => {
      const t = i / 29;
      const pt = archCurve.getPoint(t);
      const offset = Math.sin(t * Math.PI * 8) * 0.14;
      const offset2 = Math.cos(t * Math.PI * 8) * 0.14;
      return new THREE.Vector3(pt.x + offset, pt.y + offset2, pt.z + offset);
    })
  );
  archGroup.add(new THREE.Mesh(new THREE.TubeGeometry(vineCurve, 48, 0.025, 6, false), vineMat));

  // Small leaves along vine
  const leafGeo = new THREE.SphereGeometry(0.06, 4, 4);
  leafGeo.scale(1, 0.4, 1.5);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4a8c3f, roughness: 0.7 });
  for (let i = 0; i < 40; i++) {
    const t = i / 39;
    const pt = archCurve.getPoint(t);
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(
      pt.x + (Math.random() - 0.5) * 0.25,
      pt.y + (Math.random() - 0.5) * 0.2,
      pt.z + (Math.random() - 0.5) * 0.2 + 0.08
    );
    leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    archGroup.add(leaf);
  }

  // Flower clusters — white roses and blush pink
  const flowerGeo = new THREE.SphereGeometry(0.1, 8, 8);
  const flowerColors = [0xffffff, 0xffd4e0, 0xfff0f5, 0xffe4e8, 0xffffff];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const pt = archCurve.getPoint(t);
    if (Math.random() > 0.4) {
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const fMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.0 });
      const flower = new THREE.Mesh(flowerGeo, fMat);
      flower.position.set(
        pt.x + (Math.random() - 0.5) * 0.18,
        pt.y + (Math.random() - 0.5) * 0.15,
        pt.z + 0.1 + Math.random() * 0.08
      );
      flower.scale.setScalar(0.6 + Math.random() * 0.5);
      archGroup.add(flower);

      // Petal rings around larger flowers
      if (Math.random() > 0.5) {
        for (let p = 0; p < 5; p++) {
          const petal = new THREE.Mesh(flowerGeo, fMat);
          const angle = (p / 5) * Math.PI * 2;
          petal.position.copy(flower.position);
          petal.position.x += Math.cos(angle) * 0.08;
          petal.position.y += Math.sin(angle) * 0.06;
          petal.scale.setScalar(0.35);
          archGroup.add(petal);
        }
      }
    }
  }

  scene.add(archGroup);
  return archGroup;
}

/* ─────────── Build Rowboat (lathe hull) ─────────── */
function createRowboat(scene) {
  // Hull profile via lathe
  const hullProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.5, 0.05),
    new THREE.Vector2(0.65, 0.2),
    new THREE.Vector2(0.6, 0.45),
    new THREE.Vector2(0.45, 0.55),
    new THREE.Vector2(0.0, 0.6),
  ];
  const hullGeo = new THREE.LatheGeometry(hullProfile, 12, 0, Math.PI);
  const boatMat = new THREE.MeshStandardMaterial({
    color: 0xa87040,
    roughness: 0.82,
    metalness: 0.02,
  });
  const hull = new THREE.Mesh(hullGeo, boatMat);
  hull.scale.set(1.2, 1.0, 2.8);
  hull.position.set(-8.0, 0.1, -7.5);
  hull.rotation.y = 0.45;
  hull.rotation.z = 0.05;

  // Bench seat inside boat
  const seatMat = new THREE.MeshStandardMaterial({ color: 0xc49a6c, roughness: 0.85 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.25), seatMat);
  seat.position.set(-8.0, 0.35, -7.5);
  seat.rotation.y = 0.45;

  // Oar
  const oarMat = new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.8 });
  const oarHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 6), oarMat);
  oarHandle.position.set(-7.5, 0.4, -7.1);
  oarHandle.rotation.z = 0.5;
  oarHandle.rotation.y = 0.45;

  const boatGroup = new THREE.Group();
  boatGroup.add(hull, seat, oarHandle);
  scene.add(boatGroup);
  return boatGroup;
}

/* ─────────── Build Beach Umbrella + Bench ─────────── */
function createBeachSetup(scene) {
  const benchPos = new THREE.Vector3(6.5, 0, -3.5);
  const benchGroup = new THREE.Group();
  benchGroup.position.copy(benchPos);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb8875a,
    roughness: 0.85,
    metalness: 0.02,
  });

  // Bench with back rest
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.7), woodMat);
  benchSeat.position.y = 0.48;
  const legGeo = new THREE.BoxGeometry(0.08, 0.48, 0.6);
  const bLegL = new THREE.Mesh(legGeo, woodMat);
  bLegL.position.set(-1.0, 0.24, 0);
  const bLegR = new THREE.Mesh(legGeo, woodMat);
  bLegR.position.set(1.0, 0.24, 0);
  // Back rest
  const backRest = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.06), woodMat);
  backRest.position.set(0, 0.78, -0.3);

  // Striped Beach Umbrella
  const umbPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), woodMat);
  umbPole.position.set(0, 1.6, -0.5);

  // Umbrella canopy — segmented cone with alternating stripes via canvas texture
  const umbCanvas = document.createElement('canvas');
  umbCanvas.width = 256;
  umbCanvas.height = 64;
  const umbCtx = umbCanvas.getContext('2d');
  const stripeColors = ['#e74c3c', '#ffffff'];
  const stripeWidth = 256 / 8;
  for (let i = 0; i < 8; i++) {
    umbCtx.fillStyle = stripeColors[i % 2];
    umbCtx.fillRect(i * stripeWidth, 0, stripeWidth, 64);
  }
  const umbTex = new THREE.CanvasTexture(umbCanvas);
  umbTex.colorSpace = THREE.SRGBColorSpace;
  const umbTop = new THREE.Mesh(
    new THREE.ConeGeometry(2.0, 0.65, 16),
    new THREE.MeshStandardMaterial({ map: umbTex, roughness: 0.6, side: THREE.DoubleSide })
  );
  umbTop.position.set(0, 3.2, -0.5);

  benchGroup.add(benchSeat, bLegL, bLegR, backRest, umbPole, umbTop);
  scene.add(benchGroup);
  return { benchGroup, benchPos, umbTex };
}

/* ─────────── Scatter Beach Details ─────────── */
function scatterBeachDetails(scene) {
  const detailGroup = new THREE.Group();

  // Seashells
  const shellGeo = new THREE.SphereGeometry(0.06, 6, 4);
  shellGeo.scale(1.0, 0.3, 1.2);
  const shellColors = [0xfff5e6, 0xf0d9b5, 0xe8c99b, 0xd4a373];
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 16;
    const color = shellColors[Math.floor(Math.random() * shellColors.length)];
    const shell = new THREE.Mesh(
      shellGeo,
      new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 })
    );
    shell.position.set(
      Math.cos(angle) * radius,
      0.02,
      2 + Math.sin(angle) * radius
    );
    shell.rotation.y = Math.random() * Math.PI * 2;
    detailGroup.add(shell);
  }

  // Small rocks
  const rockGeo = new THREE.DodecahedronGeometry(0.12, 0);
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x8a8278, roughness: 0.9 });
  for (let i = 0; i < 12; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 14;
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(
      Math.cos(angle) * radius,
      0.04,
      2 + Math.sin(angle) * radius
    );
    rock.scale.set(
      0.5 + Math.random() * 0.8,
      0.4 + Math.random() * 0.5,
      0.5 + Math.random() * 0.8
    );
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    detailGroup.add(rock);
  }

  // Beach grass tufts
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x7a9e54,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const grassBlade = new THREE.PlaneGeometry(0.08, 0.5);
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 12 + Math.random() * 8;
    const tuft = new THREE.Group();
    tuft.position.set(
      Math.cos(angle) * radius,
      0,
      2 + Math.sin(angle) * radius
    );
    for (let b = 0; b < 5; b++) {
      const blade = new THREE.Mesh(grassBlade, grassMat);
      blade.position.set((Math.random() - 0.5) * 0.2, 0.25, (Math.random() - 0.5) * 0.2);
      blade.rotation.y = Math.random() * Math.PI;
      blade.rotation.x = -0.1 - Math.random() * 0.3;
      tuft.add(blade);
    }
    detailGroup.add(tuft);
  }

  scene.add(detailGroup);
  return detailGroup;
}

/* ═════════════════════════════════════════════════════════════════════
   MAIN RENDER FUNCTION
   ═════════════════════════════════════════════════════════════════════ */
export function renderEverTideTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }
  ensureStyles();

  const sender = data.senderName || 'Daniel';
  const recipient = data.recipientName || 'Sophie';
  const planeMessage = data.planeMessage || `${recipient}, will you marry me? ~ ${sender}`;
  const sandTextLeft = data.sandSender || sender;
  const sandTextRight = data.sandRecipient || recipient;
  const couplePhoto = data.couplePhoto || data.centerpieceImage || '/images/sunset.jpg';

  const slug = new URLSearchParams(window.location.search).get('s') || 'demo';
  const roomName = `evertide_${slug}`;

  container.innerHTML = `
    <div class="et-root">
      <div class="et-canvas-wrap" id="etCanvasWrap"></div>

      <!-- Top HUD -->
      <div class="et-hud-top">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="et-pill" id="etPeerBadge">🌅 Ever Tide • <span id="etPeerCount">1</span> online</span>
        </div>
        <div id="etMusicMount"></div>
      </div>

      <!-- Touch Joystick -->
      <div class="et-joystick" id="etJoystick">
        <div class="et-joystick-knob" id="etJoystickKnob"></div>
      </div>

      <!-- Quick Chat -->
      <div class="et-chat-bar">
        <input type="text" class="et-chat-input" id="etChatInput" placeholder="Say something..." maxlength="60" />
        <button type="button" class="et-act-btn" id="etChatSend">Send</button>
      </div>

      <!-- Bottom Actions Dock -->
      <div class="et-hud-bottom">
        <button type="button" class="et-act-btn" id="etBtnWave">👋 Wave</button>
        <button type="button" class="et-act-btn" id="etBtnHearts">💖 Hearts</button>
        <button type="button" class="et-act-btn" id="etBtnPropose">💍 Propose</button>
        <button type="button" class="et-act-btn" id="etBtnSit">🪑 Sit</button>
        <button type="button" class="et-act-btn" id="etBtnHoldHands">🤝 Hold Hands</button>
        <button type="button" class="et-act-btn" id="etBtnPlane">✈️ Fly Banner</button>
      </div>

      <!-- Join / Avatar Picker Modal -->
      <div class="et-join-modal" id="etJoinModal">
        <div class="et-join-card">
          <div style="font-size:32px;margin-bottom:6px;">🌅✈️</div>
          <h2 style="font-size:22px;font-weight:800;margin:0 0 6px;">Ever Tide Island</h2>
          <p style="font-size:13px;color:rgba(255,255,255,0.72);margin:0 0 16px;">
            Walk the sunset beach together, fly a sky banner, &amp; celebrate live.
          </p>
          <input
            type="text"
            id="etNameInput"
            value="${recipient}"
            placeholder="Your name"
            style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#fff;font-size:14px;margin-bottom:12px;outline:none;box-sizing:border-box;"
          />
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <button type="button" class="et-act-btn active" id="etGenderFemale" style="flex:1;padding:8px;">👩 Female Avatar</button>
            <button type="button" class="et-act-btn" id="etGenderMale" style="flex:1;padding:8px;">👨 Male Avatar</button>
          </div>
          <button
            type="button"
            id="etEnterBtn"
            style="width:100%;padding:11px;border-radius:999px;border:none;background:linear-gradient(135deg,#f43f5e,#fb923c);color:#fff;font-weight:800;font-size:14px;cursor:pointer;"
          >
            Enter Sunset Island ✨
          </button>
        </div>
      </div>
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
     THREE.JS SCENE — SUPER REAL SUNSET ISLAND
     ═══════════════════════════════════════════ */
  const w = canvasWrap.clientWidth || window.innerWidth;
  const h = canvasWrap.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xe8956a, 0.006);

  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 400);
  camera.position.set(0, 3.2, 11);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    alpha: false,
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  canvasWrap.appendChild(renderer.domElement);

  // ───── SUN POSITION ─────
  const sunPosition = new THREE.Vector3(-40, 20, -120);
  const sunDir = sunPosition.clone().normalize();

  // ───── SHADER SKY DOME ─────
  const skyUniforms = {
    uSunPosition: { value: sunPosition },
    uTime: { value: 0.0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(200, 32, 24), skyMat);
  scene.add(skyDome);

  // ───── SUN GLOW SPRITE ─────
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = glowCanvas.height = 256;
  const glowCtx = glowCanvas.getContext('2d');
  const glowGrad = glowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
  glowGrad.addColorStop(0, 'rgba(255, 240, 200, 1.0)');
  glowGrad.addColorStop(0.15, 'rgba(255, 210, 140, 0.8)');
  glowGrad.addColorStop(0.4, 'rgba(255, 160, 80, 0.3)');
  glowGrad.addColorStop(0.7, 'rgba(255, 100, 50, 0.08)');
  glowGrad.addColorStop(1, 'rgba(255, 80, 40, 0)');
  glowCtx.fillStyle = glowGrad;
  glowCtx.fillRect(0, 0, 256, 256);
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
  sunGlow.position.copy(sunPosition).normalize().multiplyScalar(180);
  sunGlow.scale.set(60, 60, 1);
  scene.add(sunGlow);

  // ───── LIGHTING ─────
  const hemiLight = new THREE.HemisphereLight(0xffcfa6, 0x5c3875, 1.1);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffb070, 1.4);
  dirLight.position.copy(sunDir).multiplyScalar(30);
  scene.add(dirLight);

  // Warm ambient fill
  const ambLight = new THREE.AmbientLight(0x4a2848, 0.25);
  scene.add(ambLight);

  // ───── SHADER WATER / OCEAN ─────
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
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const oceanGeo = new THREE.PlaneGeometry(300, 180, 80, 40);
  const ocean = new THREE.Mesh(oceanGeo, waterMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -0.3, -50);
  scene.add(ocean);

  // ───── SANDY ISLAND (organic terrain) ─────
  const sandTex = createSandTexture(512);
  const sandBump = createSandBumpMap(256);
  const islandGeo = new THREE.CylinderGeometry(22, 26, 1.6, 48, 4);
  // Displace top vertices for organic coastline
  const islandPos = islandGeo.attributes.position;
  for (let i = 0; i < islandPos.count; i++) {
    const x = islandPos.getX(i);
    const y = islandPos.getY(i);
    const z = islandPos.getZ(i);
    if (y > 0.4) {
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);
      const noiseVal = Math.sin(angle * 5.0) * 0.8 + Math.sin(angle * 13.0) * 0.3 + Math.cos(angle * 7.0) * 0.5;
      const newRadius = radius + noiseVal;
      islandPos.setX(i, Math.cos(angle) * newRadius);
      islandPos.setZ(i, Math.sin(angle) * newRadius);
      // Slight height variation
      islandPos.setY(i, y + Math.sin(angle * 3.0) * 0.08);
    }
  }
  islandGeo.computeVertexNormals();

  const sandMat = new THREE.MeshStandardMaterial({
    map: sandTex,
    bumpMap: sandBump,
    bumpScale: 0.15,
    roughness: 0.92,
    metalness: 0.0,
    color: 0xf0d8b0,
  });
  const island = new THREE.Mesh(islandGeo, sandMat);
  island.position.set(0, -0.75, 2);
  scene.add(island);

  // Wet sand ring around shoreline
  const wetSandGeo = new THREE.RingGeometry(21, 25, 48);
  const wetSandMat = new THREE.MeshStandardMaterial({
    color: 0xc4a882,
    roughness: 0.4,
    metalness: 0.15,
    transparent: true,
    opacity: 0.6,
  });
  const wetSand = new THREE.Mesh(wetSandGeo, wetSandMat);
  wetSand.rotation.x = -Math.PI / 2;
  wetSand.position.set(0, -0.08, 2);
  scene.add(wetSand);

  // ───── SAND NAMES ─────
  const sandNamesTex = createSandNamesTexture(sandTextLeft, sandTextRight);
  const sandNamesMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 2.75),
    new THREE.MeshBasicMaterial({ map: sandNamesTex, transparent: true, depthWrite: false })
  );
  sandNamesMesh.rotation.x = -Math.PI / 2;
  sandNamesMesh.rotation.z = -0.15;
  sandNamesMesh.position.set(2.4, 0.03, 2.8);
  scene.add(sandNamesMesh);

  // ───── FLORAL ARCH ─────
  createFloralArch(scene);

  // ───── BEACH SETUP (bench + umbrella) ─────
  const { benchPos, umbTex } = createBeachSetup(scene);

  // ───── PALM TREES ─────
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x7a5230,
    roughness: 0.88,
    metalness: 0.02,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x3d7a2a,
    roughness: 0.65,
    side: THREE.DoubleSide,
    metalness: 0.0,
  });
  createRealisticPalm(scene, -10, 1.5, 0.3, trunkMat, leafMat);
  createRealisticPalm(scene, 11, 3.5, -0.8, trunkMat, leafMat);
  createRealisticPalm(scene, -6, 7, 1.2, trunkMat, leafMat);
  createRealisticPalm(scene, 14, -1, -0.3, trunkMat, leafMat);

  // ───── ROWBOAT ─────
  createRowboat(scene);

  // ───── BEACH DETAILS (shells, rocks, grass) ─────
  scatterBeachDetails(scene);

  // ───── VOLUMETRIC CLOUDS ─────
  const cloudTex = createCloudTexture();
  const cloudMat = new THREE.SpriteMaterial({
    map: cloudTex,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    fog: true,
  });
  const clouds = [];
  for (let i = 0; i < 8; i++) {
    const cloudGroup = new THREE.Group();
    const puffCount = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < puffCount; j++) {
      const puff = new THREE.Sprite(cloudMat.clone());
      puff.material.opacity = 0.4 + Math.random() * 0.3;
      puff.position.set(
        (j - puffCount / 2) * (2.5 + Math.random()),
        Math.random() * 1.5,
        Math.random() * 2
      );
      puff.scale.set(
        5 + Math.random() * 4,
        2.5 + Math.random() * 2,
        1
      );
      cloudGroup.add(puff);
    }
    cloudGroup.position.set(
      -60 + i * 18 + Math.random() * 10,
      14 + (i % 3) * 4 + Math.random() * 3,
      -50 - Math.random() * 30
    );
    scene.add(cloudGroup);
    clouds.push(cloudGroup);
  }

  // ───── SKY AIRPLANE + BANNER ─────
  const planeGroup = new THREE.Group();
  // Airplane body
  const planeBodyGeo = new THREE.CapsuleGeometry(0.22, 0.9, 6, 10);
  const planeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1 });
  const planeBody = new THREE.Mesh(planeBodyGeo, planeMat);
  planeBody.rotation.z = Math.PI / 2;
  // Wings
  const planeWing = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.04, 2.0),
    new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4, metalness: 0.05 })
  );
  // Tail
  const planeTail = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.5, 0.04),
    new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4, metalness: 0.05 })
  );
  planeTail.position.set(-0.5, 0.15, 0);
  // Propeller
  const propGeo = new THREE.BoxGeometry(0.04, 0.6, 0.06);
  const propMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const propeller = new THREE.Mesh(propGeo, propMat);
  propeller.position.set(0.65, 0, 0);

  planeGroup.add(planeBody, planeWing, planeTail, propeller);

  let bannerTex = createBannerTexture(planeMessage, null);
  const bannerMat = new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide });
  const bannerMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 1.4), bannerMat);
  bannerMesh.position.set(-4.2, 0, 0);
  planeGroup.add(bannerMesh);

  // Load optional couple photo onto banner
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
  planeGroup.position.set(planeX, 7.5, -18);
  scene.add(planeGroup);

  /* ═══════════════════════════════════════════
     AVATARS & MULTIPLAYER (unchanged logic)
     ═══════════════════════════════════════════ */
  let localAvatar = null;
  let multiplayer = null;
  const peerAvatars = new Map();
  const localPos = new THREE.Vector3(0, 0, 4.5);
  let localRotY = Math.PI;
  let isSeated = false;
  let holdingHandsWith = null;

  const keys = {};
  let joyVec = { x: 0, y: 0 };

  function spawnLocalAndConnect(userName, gender) {
    localAvatar = create3DAvatar(userName, gender, true);
    localAvatar.group.position.copy(localPos);
    localAvatar.group.rotation.y = localRotY;
    scene.add(localAvatar.group);

    multiplayer = new MuseumMultiplayer(
      roomName,
      { name: userName, gender },
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
          if (!entry) {
            const av = create3DAvatar(p.name || 'Partner', p.gender || 'female', false);
            av.group.position.set(p.x || 0, p.y || 0, p.z || 4.5);
            scene.add(av.group);
            entry = {
              avatar: av,
              targetPos: new THREE.Vector3(p.x || 0, p.y || 0, p.z || 4.5),
              targetRotY: p.rotY || 0,
              isWalking: Boolean(p.isWalking),
            };
            peerAvatars.set(uid, entry);
          } else {
            entry.targetPos.set(p.x || 0, p.y || 0, p.z || 4.5);
            entry.targetRotY = p.rotY || 0;
            entry.isWalking = Boolean(p.isWalking);
            if (entry.avatar.setSeated) entry.avatar.setSeated(Boolean(p.isSeated));
          }
        }
      },
      (actionData) => {
        const entry = peerAvatars.get(actionData.userId);
        if (actionData.action === 'wave' && entry) entry.avatar.playGesture('wave');
        if (actionData.action === 'hearts' && entry) entry.avatar.burstHearts();
        if (actionData.action === 'propose' && entry) {
          entry.avatar.setKneeling(Boolean(actionData.payload?.kneeling));
        }
        if (actionData.action === 'plane') {
          planeX = -26;
          planeActive = true;
        }
      },
      (chatData) => {
        const entry = peerAvatars.get(chatData.userId);
        if (entry && chatData.text) entry.avatar.showChatBubble(chatData.text);
      }
    );
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

  // ───── Controls: Keyboard + Touch Joystick ─────
  const onKeyDown = (e) => { keys[e.key.toLowerCase()] = true; };
  const onKeyUp = (e) => { keys[e.key.toLowerCase()] = false; };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  const joyEl = container.querySelector('#etJoystick');
  const joyKnob = container.querySelector('#etJoystickKnob');
  let joyActive = false;

  const updateJoy = (clientX, clientY) => {
    const r = joyEl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const maxR = r.width * 0.36;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxR) {
      dx = (dx / dist) * maxR;
      dy = (dy / dist) * maxR;
    }
    joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
    joyVec.x = dx / maxR;
    joyVec.y = dy / maxR;
  };

  joyEl.addEventListener('pointerdown', (e) => {
    joyActive = true;
    joyEl.setPointerCapture(e.pointerId);
    updateJoy(e.clientX, e.clientY);
  });
  joyEl.addEventListener('pointermove', (e) => {
    if (joyActive) updateJoy(e.clientX, e.clientY);
  });
  const resetJoy = () => {
    joyActive = false;
    joyVec = { x: 0, y: 0 };
    joyKnob.style.transform = 'translate(0px, 0px)';
  };
  joyEl.addEventListener('pointerup', resetJoy);
  joyEl.addEventListener('pointercancel', resetJoy);

  // ───── Action Buttons ─────
  container.querySelector('#etBtnWave').addEventListener('click', () => {
    if (!localAvatar) return;
    localAvatar.playGesture('wave');
    multiplayer?.sendAction('wave');
  });
  container.querySelector('#etBtnHearts').addEventListener('click', () => {
    if (!localAvatar) return;
    localAvatar.burstHearts();
    confetti({ particleCount: 28, spread: 60, origin: { y: 0.65 } });
    multiplayer?.sendAction('hearts');
  });
  container.querySelector('#etBtnPropose').addEventListener('click', (e) => {
    if (!localAvatar) return;
    const next = !localAvatar.isKneeling();
    localAvatar.setKneeling(next);
    e.currentTarget.classList.toggle('active', next);
    multiplayer?.sendAction('propose', { kneeling: next });
  });
  container.querySelector('#etBtnSit').addEventListener('click', (e) => {
    if (!localAvatar) return;
    isSeated = !isSeated;
    e.currentTarget.classList.toggle('active', isSeated);
    if (isSeated) {
      localPos.set(benchPos.x, 0.25, benchPos.z + 0.1);
      localRotY = 0;
    } else {
      localPos.y = 0;
    }
    localAvatar.setSeated(isSeated);
  });
  container.querySelector('#etBtnHoldHands').addEventListener('click', (e) => {
    if (holdingHandsWith) {
      holdingHandsWith = null;
      e.currentTarget.classList.remove('active');
    } else {
      const firstPeer = peerAvatars.keys().next().value;
      if (firstPeer) {
        holdingHandsWith = firstPeer;
        e.currentTarget.classList.add('active');
      }
    }
  });
  container.querySelector('#etBtnPlane').addEventListener('click', () => {
    planeX = -26;
    planeActive = true;
    multiplayer?.sendAction('plane');
  });

  const chatInput = container.querySelector('#etChatInput');
  const sendChat = () => {
    const txt = chatInput.value.trim();
    if (!txt || !localAvatar) return;
    localAvatar.showChatBubble(txt);
    multiplayer?.sendChat(txt);
    chatInput.value = '';
  };
  container.querySelector('#etChatSend').addEventListener('click', sendChat);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  /* ═══════════════════════════════════════════
     ANIMATION LOOP — 60fps + Throttled Network
     ═══════════════════════════════════════════ */
  const clock = new THREE.Clock();
  let frameId;
  let lastNetSync = 0;
  let lastSentX = 0;
  let lastSentZ = 0;
  let lastSentWalk = false;

  // Reusable vectors to avoid per-frame allocations
  const _camTarget = new THREE.Vector3();

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.getElapsedTime();

    // Update shader uniforms
    waterUniforms.uTime.value = elapsed;
    waterUniforms.uCameraPos.value.copy(camera.position);
    skyUniforms.uTime.value = elapsed;

    // Cloud drift
    for (let i = 0; i < clouds.length; i++) {
      clouds[i].position.x += dt * (0.3 + (i % 3) * 0.1);
      if (clouds[i].position.x > 70) clouds[i].position.x = -70;
    }

    // Propeller spin
    propeller.rotation.x += dt * 25;

    // Airplane banner flyby
    if (planeActive) {
      planeX += dt * 3.2;
      planeGroup.position.x = planeX;
      planeGroup.position.y = 7.5 + Math.sin(elapsed * 1.8) * 0.3;
      // Gentle banking
      planeGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.04;
      if (planeX > 32) planeX = -30;
    }

    // Sun glow gentle pulse
    const glowScale = 58 + Math.sin(elapsed * 0.5) * 3;
    sunGlow.scale.set(glowScale, glowScale, 1);

    // Local avatar movement
    let isWalking = false;
    if (localAvatar) {
      let mx = joyVec.x;
      let mz = joyVec.y;
      if (keys['w'] || keys['arrowup']) mz -= 1;
      if (keys['s'] || keys['arrowdown']) mz += 1;
      if (keys['a'] || keys['arrowleft']) mx -= 1;
      if (keys['d'] || keys['arrowright']) mx += 1;

      if (holdingHandsWith && peerAvatars.has(holdingHandsWith)) {
        const partner = peerAvatars.get(holdingHandsWith).avatar.group.position;
        const desiredX = partner.x + 0.72;
        const desiredZ = partner.z;
        const dist = Math.hypot(desiredX - localPos.x, desiredZ - localPos.z);
        if (dist > 0.12) {
          localPos.x = THREE.MathUtils.lerp(localPos.x, desiredX, 0.08);
          localPos.z = THREE.MathUtils.lerp(localPos.z, desiredZ, 0.08);
          isWalking = true;
        }
      } else if (Math.abs(mx) > 0.08 || Math.abs(mz) > 0.08) {
        if (isSeated) {
          isSeated = false;
          localAvatar.setSeated(false);
          localPos.y = 0;
        }
        const len = Math.hypot(mx, mz);
        const speed = 4.2 * dt;
        localPos.x += (mx / len) * speed;
        localPos.z += (mz / len) * speed;

        // Clamp to island radius
        const rad = Math.hypot(localPos.x, localPos.z - 2);
        if (rad > 19) {
          localPos.x *= 19 / rad;
          localPos.z = 2 + (localPos.z - 2) * (19 / rad);
        }
        localRotY = Math.atan2(mx, mz);
        isWalking = true;
      }

      localAvatar.update(dt, isWalking, localPos, localRotY);

      // Smooth third-person camera follow
      _camTarget.set(localPos.x * 0.7, 2.75, localPos.z + 6.5);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, _camTarget.x, 0.08);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, _camTarget.z, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, _camTarget.y, 0.08);
      camera.lookAt(localPos.x, 1.35, localPos.z - 2.0);

      // Throttled multiplayer sync (~12Hz, only on change)
      const now = performance.now();
      if (
        multiplayer &&
        now - lastNetSync > 80 &&
        (Math.abs(localPos.x - lastSentX) > 0.03 ||
          Math.abs(localPos.z - lastSentZ) > 0.03 ||
          isWalking !== lastSentWalk)
      ) {
        lastNetSync = now;
        lastSentX = localPos.x;
        lastSentZ = localPos.z;
        lastSentWalk = isWalking;
        multiplayer.sendPosition(localPos.x, localPos.y, localPos.z, localRotY, isWalking, isSeated);
      }
    }

    // Update remote peer avatars smoothly
    for (const entry of peerAvatars.values()) {
      entry.avatar.update(dt, entry.isWalking, entry.targetPos, entry.targetRotY);
    }

    renderer.render(scene, camera);
  };
  animate();

  // ───── Resize Handler ─────
  const onResize = () => {
    const nw = canvasWrap.clientWidth || window.innerWidth;
    const nh = canvasWrap.clientHeight || window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize);

  // ───── Cleanup ─────
  container._cleanup = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    multiplayer?.destroy();
    localAvatar?.dispose();
    for (const entry of peerAvatars.values()) entry.avatar.dispose();
    peerAvatars.clear();
    sandNamesTex.dispose();
    bannerTex.dispose();
    sandTex.dispose();
    sandBump.dispose();
    glowTex.dispose();
    cloudTex.dispose();
    umbTex.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === canvasWrap) {
      canvasWrap.removeChild(renderer.domElement);
    }
  };
}
