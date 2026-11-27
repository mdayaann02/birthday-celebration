// src/viewer/templates/kintsugiThreeScene.js
// Persistent Three.js WebGL background for the "After the Rain / Kintsugi" 5-Act Apology template.
// Unified reactive sceneState: actIndex (0..4), transitionProgress (0..1), pointer ({x, y}),
// rippleIntensity, burstIntensity, dawnState, mood.

import * as THREE from 'three';

const MOOD_PRESETS = {
  'Midnight Rain': {
    act0Bg: 0x0a0f1a,
    act1Bg: 0x111827,
    act2Bg: 0x161926,
    act3Bg: 0x1c1829,
    act4Bg: 0x261c24,
    gold: 0xe5b87a,
    rose: 0xd99b9b,
    rain: 0x94a3b8,
  },
  'Warm Kintsugi': {
    act0Bg: 0x0d111d,
    act1Bg: 0x171824,
    act2Bg: 0x1f1a24,
    act3Bg: 0x261d26,
    act4Bg: 0x362426,
    gold: 0xf0c684,
    rose: 0xe0a49f,
    rain: 0xa5b4cc,
  },
  'Soft Rose Dusk': {
    act0Bg: 0x10101e,
    act1Bg: 0x181628,
    act2Bg: 0x21192c,
    act3Bg: 0x2a1d32,
    act4Bg: 0x3a262c,
    gold: 0xe8bd88,
    rose: 0xe59fb0,
    rain: 0xb0b8d1,
  },
};

function createSoftGlowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.28, 'rgba(255, 244, 224, 0.72)');
  grad.addColorStop(0.62, 'rgba(229, 184, 122, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createHeartShardGeometry() {
  const shape = new THREE.Shape();
  // Clean symmetrical heart silhouette centered around (0, 0)
  shape.moveTo(0, -0.95);
  shape.bezierCurveTo(0.18, -0.78, 1.05, -0.22, 1.05, 0.42);
  shape.bezierCurveTo(1.05, 0.86, 0.62, 1.08, 0.24, 0.92);
  shape.bezierCurveTo(0.1, 0.86, 0.03, 0.74, 0, 0.65);
  shape.bezierCurveTo(-0.03, 0.74, -0.1, 0.86, -0.24, 0.92);
  shape.bezierCurveTo(-0.62, 1.08, -1.05, 0.86, -1.05, 0.42);
  shape.bezierCurveTo(-1.05, -0.22, -0.18, -0.78, 0, -0.95);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.14,
    bevelSize: 0.12,
    bevelSegments: 3,
    curveSegments: 16,
  });
  geom.center();
  return geom;
}

function createKintsugiVeinsGeometry() {
  // Organic gold seam lines tracing across the front and back of the heart centerpiece
  const pts = [
    // Main diagonal fracture
    [-0.68, 0.56, 0.24], [-0.24, 0.22, 0.28],
    [-0.24, 0.22, 0.28], [0.06, -0.06, 0.29],
    [0.06, -0.06, 0.29], [0.54, -0.34, 0.24],
    // Upper branch
    [-0.24, 0.22, 0.28], [-0.04, 0.58, 0.26],
    [-0.04, 0.58, 0.26], [0.34, 0.72, 0.22],
    // Lower branch
    [0.06, -0.06, 0.29], [-0.18, -0.48, 0.25],
    [-0.18, -0.48, 0.25], [0.0, -0.82, 0.2],
    // Right-side hairline vein
    [0.24, 0.28, 0.27], [0.68, 0.46, 0.23],
    [0.24, 0.28, 0.27], [0.06, -0.06, 0.29],
    // Backside subtle seam
    [0.52, 0.44, -0.24], [0.08, 0.08, -0.28],
    [0.08, 0.08, -0.28], [-0.42, -0.38, -0.24],
  ];

  const positions = new Float32Array(pts.length * 3);
  for (let i = 0; i < pts.length; i++) {
    positions[i * 3] = pts[i][0];
    positions[i * 3 + 1] = pts[i][1];
    positions[i * 3 + 2] = pts[i][2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

export function createKintsugiThreeScene(canvas, initialMood = 'Midnight Rain') {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const moodPreset = MOOD_PRESETS[initialMood] || MOOD_PRESETS['Midnight Rain'];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (err) {
    return {
      isFallback: true,
      setAct() {},
      setTransitionProgress() {},
      setPointer() {},
      triggerRipple() {},
      triggerBurst() {},
      setDawnState() {},
      setMood() {},
      dispose() {},
    };
  }

  const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(getPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const bgColor = new THREE.Color(moodPreset.act0Bg);
  scene.background = bgColor;
  scene.fog = new THREE.FogExp2(moodPreset.act0Bg, 0.085);

  const camera = new THREE.PerspectiveCamera(
    46,
    window.innerWidth / Math.max(1, window.innerHeight),
    0.1,
    60
  );
  camera.position.set(0, 0.15, 7.6);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x8fa2c4, 0.65);
  scene.add(ambientLight);

  const goldPointLight = new THREE.PointLight(moodPreset.gold, 0.4, 14, 1.6);
  goldPointLight.position.set(1.8, 1.4, 3.2);
  scene.add(goldPointLight);

  const roseRimLight = new THREE.PointLight(moodPreset.rose, 0.35, 14, 1.6);
  roseRimLight.position.set(-2.4, -1.1, 2.2);
  scene.add(roseRimLight);

  const keyDirLight = new THREE.DirectionalLight(0xfff1dc, 0.55);
  keyDirLight.position.set(2, 4, 4);
  scene.add(keyDirLight);

  // Centerpiece Group: Translucent Geometric Heart Shard + Kintsugi Gold Veins
  const centerpieceGroup = new THREE.Group();
  centerpieceGroup.position.set(0, 0.15, 0);
  scene.add(centerpieceGroup);

  const heartGeo = createHeartShardGeometry();
  const heartMat = new THREE.MeshPhysicalMaterial({
    color: 0x26324d,
    emissive: 0x16121f,
    emissiveIntensity: 0.35,
    roughness: 0.28,
    metalness: 0.12,
    transmission: 0.25,
    transparent: true,
    opacity: 0.52,
    flatShading: true,
  });
  const heartMesh = new THREE.Mesh(heartGeo, heartMat);
  centerpieceGroup.add(heartMesh);

  const veinsGeo = createKintsugiVeinsGeometry();
  const veinsMat = new THREE.LineBasicMaterial({
    color: moodPreset.gold,
    transparent: true,
    opacity: 0.16,
  });
  const veinsLines = new THREE.LineSegments(veinsGeo, veinsMat);
  centerpieceGroup.add(veinsLines);

  // Subtle inner gold core glow
  const coreGeo = new THREE.OctahedronGeometry(0.42, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: moodPreset.gold,
    transparent: true,
    opacity: 0.08,
    wireframe: true,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  centerpieceGroup.add(coreMesh);

  // Particle Budget: max 1000 desktop, max 350 mobile
  const maxTotalParticles = isMobile ? 350 : 1000;
  const rainCount = Math.floor(maxTotalParticles * 0.42); // ~147 mobile, 420 desktop
  const moteCount = maxTotalParticles - rainCount;        // ~203 mobile, 580 desktop

  // 1. Rain Streaks (LineSegments)
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSpeeds = new Float32Array(rainCount);
  for (let i = 0; i < rainCount; i++) {
    const x = (Math.random() - 0.5) * 14;
    const y = (Math.random() - 0.5) * 11;
    const z = (Math.random() - 0.5) * 8 - 1.5;
    const len = 0.22 + Math.random() * 0.28;
    rainPositions[i * 6] = x;
    rainPositions[i * 6 + 1] = y;
    rainPositions[i * 6 + 2] = z;
    rainPositions[i * 6 + 3] = x - 0.02;
    rainPositions[i * 6 + 4] = y - len;
    rainPositions[i * 6 + 5] = z;
    rainSpeeds[i] = 4.2 + Math.random() * 3.4;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMat = new THREE.LineBasicMaterial({
    color: moodPreset.rain,
    transparent: true,
    opacity: 0.34,
  });
  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  scene.add(rainLines);

  // 2. Bokeh / Dust Motes / Rising Dawn Golden Particles
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    motePositions[i * 3] = (Math.random() - 0.5) * 13;
    motePositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    motePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    moteSeeds[i * 3] = Math.random() * Math.PI * 2;     // phase
    moteSeeds[i * 3 + 1] = 0.3 + Math.random() * 0.8;  // speed
    moteSeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.4; // drift
  }
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  const glowTex = createSoftGlowTexture();
  const moteMat = new THREE.PointsMaterial({
    color: moodPreset.gold,
    size: isMobile ? 0.16 : 0.14,
    map: glowTex,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const motePoints = new THREE.Points(moteGeo, moteMat);
  scene.add(motePoints);

  // Reactive sceneState
  const sceneState = {
    actIndex: 0,
    targetAct: 0,
    transitionProgress: 1,
    pointer: { x: 0, y: 0 },
    smoothPointer: { x: 0, y: 0 },
    rippleIntensity: 0,
    burstIntensity: 0,
    dawnState: 'neutral', // 'neutral' | 'talk' | 'time'
    mood: initialMood,
  };

  // Act target definitions
  const ACT_TARGETS = [
    // Act 0: Heavy Silence
    {
      camZ: 7.6,
      camY: 0.15,
      fogDensity: 0.088,
      rainOpacity: 0.34,
      rainSpeedMul: 1.0,
      veinsOpacity: 0.14,
      heartOpacity: 0.45,
      goldIntensity: 0.35,
      roseIntensity: 0.25,
      moteOpacity: 0.22,
      moteRise: 0.04,
      centerScale: 0.9,
      centerY: 0.15,
    },
    // Act 1: Owning the Mistake (Kintsugi)
    {
      camZ: 5.5,
      camY: 0.1,
      fogDensity: 0.062,
      rainOpacity: 0.15,
      rainSpeedMul: 0.42,
      veinsOpacity: 0.85,
      heartOpacity: 0.68,
      goldIntensity: 1.45,
      roseIntensity: 0.75,
      moteOpacity: 0.42,
      moteRise: 0.12,
      centerScale: 1.08,
      centerY: 0.1,
    },
    // Act 2: Heartfelt Letter (Storm clears, warm bokeh)
    {
      camZ: 4.4,
      camY: 0.05,
      fogDensity: 0.042,
      rainOpacity: 0.0,
      rainSpeedMul: 0.1,
      veinsOpacity: 0.62,
      heartOpacity: 0.36,
      goldIntensity: 1.25,
      roseIntensity: 0.65,
      moteOpacity: 0.56,
      moteRise: 0.16,
      centerScale: 0.82,
      centerY: 0.25,
    },
    // Act 3: Promises (Twilight violet-amber)
    {
      camZ: 5.4,
      camY: 0.12,
      fogDensity: 0.046,
      rainOpacity: 0.0,
      rainSpeedMul: 0.0,
      veinsOpacity: 0.78,
      heartOpacity: 0.52,
      goldIntensity: 1.5,
      roseIntensity: 0.9,
      moteOpacity: 0.65,
      moteRise: 0.24,
      centerScale: 0.95,
      centerY: 0.18,
    },
    // Act 4: The Olive Branch (Warm Dawn)
    {
      camZ: 6.2,
      camY: 0.2,
      fogDensity: 0.036,
      rainOpacity: 0.0,
      rainSpeedMul: 0.0,
      veinsOpacity: 0.95,
      heartOpacity: 0.62,
      goldIntensity: 1.9,
      roseIntensity: 0.85,
      moteOpacity: 0.78,
      moteRise: 0.48,
      centerScale: 1.0,
      centerY: 0.25,
    },
  ];

  // Current interpolated values
  const cur = { ...ACT_TARGETS[0] };
  const targetBgColor = new THREE.Color(moodPreset.act0Bg);
  const tmpColor = new THREE.Color();

  let rafId = 0;
  let lastTime = performance.now();
  let disposed = false;
  let isPaused = document.hidden;

  function getActBgHex(idx, preset) {
    if (idx === 0) return preset.act0Bg;
    if (idx === 1) return preset.act1Bg;
    if (idx === 2) return preset.act2Bg;
    if (idx === 3) return preset.act3Bg;
    return preset.act4Bg;
  }

  function animate(now) {
    if (disposed || isPaused) return;
    rafId = requestAnimationFrame(animate);

    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    const elapsed = now * 0.001;

    const preset = MOOD_PRESETS[sceneState.mood] || MOOD_PRESETS['Midnight Rain'];
    const tgt = ACT_TARGETS[sceneState.actIndex] || ACT_TARGETS[0];

    // Smoothly interpolate parameters
    const lerpRate = reducedMotion ? 1.0 : Math.min(1, dt * 3.2);
    for (const key of Object.keys(cur)) {
      cur[key] += (tgt[key] - cur[key]) * lerpRate;
    }

    // Dawn state overrides in Act 4 (index 4)
    let extraRise = 0;
    let extraGold = 0;
    if (sceneState.actIndex === 4) {
      if (sceneState.dawnState === 'talk') {
        extraRise = 0.55;
        extraGold = 0.8;
      } else if (sceneState.dawnState === 'time') {
        extraRise = -0.35;
        extraGold = -0.5;
      }
    }

    // Decay ripple & burst
    sceneState.rippleIntensity = Math.max(0, sceneState.rippleIntensity - dt * 1.15);
    sceneState.burstIntensity = Math.max(0, sceneState.burstIntensity - dt * 1.4);

    // Smooth pointer parallax
    sceneState.smoothPointer.x += (sceneState.pointer.x - sceneState.smoothPointer.x) * Math.min(1, dt * 5);
    sceneState.smoothPointer.y += (sceneState.pointer.y - sceneState.smoothPointer.y) * Math.min(1, dt * 5);

    const px = reducedMotion ? 0 : sceneState.smoothPointer.x;
    const py = reducedMotion ? 0 : sceneState.smoothPointer.y;

    // Background & fog interpolation
    tmpColor.setHex(getActBgHex(sceneState.actIndex, preset));
    targetBgColor.lerp(tmpColor, lerpRate);
    bgColor.copy(targetBgColor);
    scene.fog.color.copy(bgColor);
    scene.fog.density = cur.fogDensity;

    // Camera choreography
    camera.position.z = cur.camZ;
    camera.position.x = px * 0.42;
    camera.position.y = cur.camY + py * 0.28;
    camera.lookAt(0, cur.centerY * 0.6, 0);

    // Centerpiece rotation & Kintsugi ripple pulse
    centerpieceGroup.position.y = cur.centerY + (reducedMotion ? 0 : Math.sin(elapsed * 0.9) * 0.08);
    const scalePulse = cur.centerScale + sceneState.rippleIntensity * 0.08;
    centerpieceGroup.scale.setScalar(scalePulse);
    if (!reducedMotion) {
      centerpieceGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.28 + px * 0.35;
      centerpieceGroup.rotation.x = Math.cos(elapsed * 0.28) * 0.08 - py * 0.2;
      coreMesh.rotation.y -= dt * 0.4;
      coreMesh.rotation.x += dt * 0.25;
    }

    heartMat.opacity = cur.heartOpacity;
    veinsMat.opacity = Math.min(1, cur.veinsOpacity + sceneState.rippleIntensity * 0.45);
    veinsMat.color.setHex(preset.gold);
    coreMat.opacity = 0.06 + sceneState.rippleIntensity * 0.28;

    goldPointLight.color.setHex(preset.gold);
    goldPointLight.intensity = cur.goldIntensity + extraGold + sceneState.rippleIntensity * 1.6 + sceneState.burstIntensity * 1.4;
    roseRimLight.color.setHex(preset.rose);
    roseRimLight.intensity = cur.roseIntensity;

    // Update Rain Streaks
    rainMat.opacity = cur.rainOpacity;
    rainMat.color.setHex(preset.rain);
    rainLines.visible = cur.rainOpacity > 0.015;
    if (rainLines.visible && !reducedMotion) {
      const rPos = rainGeo.attributes.position.array;
      const speedMul = cur.rainSpeedMul;
      for (let i = 0; i < rainCount; i++) {
        const drop = rainSpeeds[i] * speedMul * dt;
        rPos[i * 6 + 1] -= drop;
        rPos[i * 6 + 4] -= drop;
        rPos[i * 6] -= drop * 0.06;
        rPos[i * 6 + 3] -= drop * 0.06;
        if (rPos[i * 6 + 1] < -5.5) {
          const nx = (Math.random() - 0.5) * 14;
          const ny = 5.5 + Math.random() * 1.5;
          const len = 0.22 + Math.random() * 0.28;
          rPos[i * 6] = nx;
          rPos[i * 6 + 1] = ny;
          rPos[i * 6 + 3] = nx - 0.02;
          rPos[i * 6 + 4] = ny - len;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;
    }

    // Update Bokeh / Dawn Motes
    moteMat.opacity = Math.min(0.95, cur.moteOpacity + sceneState.burstIntensity * 0.35);
    moteMat.color.setHex(preset.gold);
    moteMat.size = (isMobile ? 0.16 : 0.14) + sceneState.burstIntensity * 0.08;
    if (!reducedMotion) {
      const mPos = moteGeo.attributes.position.array;
      const riseSpeed = Math.max(0.02, cur.moteRise + extraRise + sceneState.burstIntensity * 1.2);
      for (let i = 0; i < moteCount; i++) {
        const phase = moteSeeds[i * 3];
        const spd = moteSeeds[i * 3 + 1];
        const drift = moteSeeds[i * 3 + 2];
        mPos[i * 3 + 1] += riseSpeed * spd * dt;
        mPos[i * 3] += Math.sin(elapsed * 0.6 + phase) * drift * dt;
        if (mPos[i * 3 + 1] > 5.0) {
          mPos[i * 3 + 1] = -5.0;
          mPos[i * 3] = (Math.random() - 0.5) * 13;
        }
      }
      moteGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  function handleResize() {
    if (disposed) return;
    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(w, h, false);
  }

  function handleVisibilityChange() {
    isPaused = document.hidden;
    if (!isPaused && !disposed) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(animate);
    }
  }

  function handleDeviceOrientation(e) {
    if (e.gamma == null || e.beta == null) return;
    const nx = Math.max(-1, Math.min(1, e.gamma / 30));
    const ny = Math.max(-1, Math.min(1, (e.beta - 35) / 30));
    sceneState.pointer.x = nx * 0.7;
    sceneState.pointer.y = -ny * 0.7;
  }

  window.addEventListener('resize', handleResize);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
  }

  if (!isPaused) {
    rafId = requestAnimationFrame(animate);
  }

  return {
    isFallback: false,
    sceneState,
    setAct(idx) {
      sceneState.actIndex = Math.max(0, Math.min(4, idx));
    },
    setTransitionProgress(p) {
      sceneState.transitionProgress = Math.max(0, Math.min(1, p));
    },
    setPointer(nx, ny) {
      sceneState.pointer.x = Math.max(-1, Math.min(1, nx));
      sceneState.pointer.y = Math.max(-1, Math.min(1, ny));
    },
    triggerRipple(strength = 1) {
      sceneState.rippleIntensity = Math.min(1.2, Math.max(sceneState.rippleIntensity, strength));
    },
    triggerBurst(strength = 1) {
      sceneState.burstIntensity = Math.min(1.2, Math.max(sceneState.burstIntensity, strength));
    },
    setDawnState(state) {
      sceneState.dawnState = state;
    },
    setMood(moodName) {
      if (MOOD_PRESETS[moodName]) {
        sceneState.mood = moodName;
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      if (glowTex) glowTex.dispose();
      renderer.dispose();
    },
  };
}
