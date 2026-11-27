// src/viewer/templates/sorryThreeScene.js
// Dedicated Three.js Moonlit Sanctuary Engine for the Heartfelt Apology ('sorry') Template
// Features: Full moon + volumetric halo, reflective moonlit water plane, glowing lantern arch,
// 3D beating/mending rose-gold heart centerpiece, drifting rose petals, chapter camera choreography,
// vent-impact bursts, and rising sky lanterns on forgiveness.

import * as THREE from 'three';
import {
  detectDeviceTier,
  getOptimalPixelRatio,
  createAdaptiveFpsScaler,
  disposeThreeScene,
} from './threePerf.js';

export function createSorryThreeScene(hostEl) {
  const tier = detectDeviceTier();
  const lowDetail = tier === 'low';

  const width = hostEl.clientWidth || window.innerWidth;
  const height = hostEl.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x090c1e, 0.022);

  const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 160);
  camera.position.set(0, 1.6, 17);

  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !lowDetail,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimalPixelRatio(tier));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    hostEl.appendChild(renderer.domElement);
  } catch (err) {
    return {
      setChapter: () => {},
      triggerBurst: () => {},
      spawnLantern: () => {},
      setHealed: () => {},
      setWarmth: () => {},
      destroy: () => {},
    };
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x6b7db3, 0.75);
  scene.add(ambientLight);

  const moonLight = new THREE.DirectionalLight(0xfde6e9, 1.25);
  moonLight.position.set(0, 11, -18);
  scene.add(moonLight);

  const warmGlowLight = new THREE.PointLight(0xfb7185, 2.4, 28);
  warmGlowLight.position.set(0, 2.2, 4);
  scene.add(warmGlowLight);

  const goldAccentLight = new THREE.PointLight(0xf5d08a, 1.6, 24);
  goldAccentLight.position.set(-4, 4, 2);
  scene.add(goldAccentLight);

  // 1. Full Moon + Soft Corona Halo
  const moonGroup = new THREE.Group();
  moonGroup.position.set(0, 6.8, -26);
  const moonGeo = new THREE.SphereGeometry(3.1, lowDetail ? 20 : 32, lowDetail ? 20 : 32);
  const moonMat = new THREE.MeshBasicMaterial({ color: 0xfff5ec });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonGroup.add(moonMesh);

  const haloGeo = new THREE.RingGeometry(3.2, 6.4, 36);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xfda4af,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  moonGroup.add(haloMesh);
  scene.add(moonGroup);

  // 2. Reflective Moonlit Water Plane
  const waterGeo = new THREE.PlaneGeometry(90, 60, lowDetail ? 16 : 32, lowDetail ? 16 : 32);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0b1026,
    metalness: 0.82,
    roughness: 0.22,
    emissive: 0x10142e,
    emissiveIntensity: 0.45,
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(0, -3.2, -8);
  scene.add(waterMesh);
  const waterBaseY = new Float32Array(waterGeo.attributes.position.count);
  for (let i = 0; i < waterBaseY.length; i++) {
    waterBaseY[i] = waterGeo.attributes.position.getY(i);
  }

  // 3. Moonlit Sanctuary Archway + Glowing Pillars
  const archGroup = new THREE.Group();
  archGroup.position.set(0, -3.2, -5.5);
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x1e2444,
    metalness: 0.35,
    roughness: 0.5,
  });
  const pillarGeo = new THREE.CylinderGeometry(0.18, 0.24, 6.2, 12);
  [-3.8, 3.8].forEach((px) => {
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(px, 3.1, 0);
    archGroup.add(pillar);

    // Pillar lantern orb
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xf5d08a })
    );
    orb.position.set(px, 6.3, 0);
    archGroup.add(orb);
  });
  const archRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.8, 0.14, 10, 36, Math.PI),
    pillarMat
  );
  archRing.position.set(0, 6.2, 0);
  archGroup.add(archRing);
  scene.add(archGroup);

  // 4. 3D Kintsugi Rose-Gold Heart Centerpiece
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.35);
  heartShape.bezierCurveTo(0, 0.35, -0.1, 0, -0.5, 0);
  heartShape.bezierCurveTo(-1.1, 0, -1.1, 0.7, -1.1, 0.7);
  heartShape.bezierCurveTo(-1.1, 1.1, -0.7, 1.54, 0, 1.9);
  heartShape.bezierCurveTo(0.7, 1.54, 1.1, 1.1, 1.1, 0.7);
  heartShape.bezierCurveTo(1.1, 0.7, 1.1, 0, 0.5, 0);
  heartShape.bezierCurveTo(0.2, 0, 0, 0.35, 0, 0.35);

  const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  });
  heartGeo.center();
  heartGeo.rotateZ(Math.PI);

  const heartMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    emissive: 0x4c0519,
    emissiveIntensity: 0.6,
    metalness: 0.45,
    roughness: 0.25,
  });
  const heartMesh = new THREE.Mesh(heartGeo, heartMat);
  heartMesh.scale.setScalar(1.05);

  const kintsugiWireGeo = new THREE.EdgesGeometry(heartGeo, 24);
  const kintsugiWireMat = new THREE.LineBasicMaterial({
    color: 0xf5d08a,
    transparent: true,
    opacity: 0.45,
  });
  const kintsugiWire = new THREE.LineSegments(kintsugiWireGeo, kintsugiWireMat);
  heartMesh.add(kintsugiWire);

  const heartPivot = new THREE.Group();
  heartPivot.position.set(0, 1.8, -4.5);
  heartPivot.add(heartMesh);
  scene.add(heartPivot);

  // 5. Starfield & Drifting Rose Petals
  const starCount = lowDetail ? 140 : 320;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 65;
    starPos[i * 3 + 1] = Math.random() * 26 - 1;
    starPos[i * 3 + 2] = -10 - Math.random() * 35;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xfff1f2,
    size: lowDetail ? 0.22 : 0.18,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  const petalCount = lowDetail ? 45 : 95;
  const petalPos = new Float32Array(petalCount * 3);
  const petalVel = new Float32Array(petalCount);
  for (let i = 0; i < petalCount; i++) {
    petalPos[i * 3] = (Math.random() - 0.5) * 28;
    petalPos[i * 3 + 1] = Math.random() * 18 - 3;
    petalPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    petalVel[i] = 0.35 + Math.random() * 0.7;
  }
  const petalGeo = new THREE.BufferGeometry();
  petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
  const petalMat = new THREE.PointsMaterial({
    color: 0xfda4af,
    size: lowDetail ? 0.26 : 0.22,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const petals = new THREE.Points(petalGeo, petalMat);
  scene.add(petals);

  // 6. 3D Sky Lantern Pool
  const lanterns = [];
  const lanternBodyGeo = new THREE.CylinderGeometry(0.26, 0.17, 0.52, 8, 1, false);
  const lanternBodyMat = new THREE.MeshBasicMaterial({
    color: 0xf5d08a,
    transparent: true,
    opacity: 0.92,
  });

  function spawnLantern(count = 1, burstCenter = false) {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(lanternBodyGeo, lanternBodyMat);
      m.position.set(
        burstCenter ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 22,
        burstCenter ? -2.8 - Math.random() * 2 : -4 - Math.random() * 4,
        -2 - Math.random() * 14
      );
      m.userData = {
        vy: 1.1 + Math.random() * 1.15,
        phase: Math.random() * Math.PI * 2,
        sharedAsset: true,
      };
      scene.add(m);
      lanterns.push(m);
    }
  }
  // Seed a few gentle ambient lanterns
  spawnLantern(lowDetail ? 4 : 7, false);

  // 7. Interactive Impact Spark Bursts (for Vent Room & Seals)
  const burstParticles = [];
  const burstGeo = new THREE.SphereGeometry(0.09, 6, 6);
  const burstMat = new THREE.MeshBasicMaterial({
    color: 0xfda4af,
    transparent: true,
    opacity: 0.95,
  });

  function triggerBurst(colorHex = 0xfda4af, shake = false) {
    burstMat.color.setHex(colorHex);
    const n = lowDetail ? 10 : 18;
    for (let i = 0; i < n; i++) {
      const p = new THREE.Mesh(burstGeo, burstMat);
      p.position.set(0, 1.5, 4);
      const angle = Math.random() * Math.PI * 2;
      const spd = 2.5 + Math.random() * 4.5;
      p.userData = {
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd + 1.5,
        vz: (Math.random() - 0.5) * 3,
        life: 1.0,
        sharedAsset: true,
      };
      scene.add(p);
      burstParticles.push(p);
    }
    if (shake) shakeAmp = 0.36;
  }

  // Camera Choreography Targets per Chapter (1..7)
  const chapterTargets = {
    1: { x: 0, y: 1.6, z: 17, lookY: 1.8 },
    2: { x: 0, y: 1.5, z: 13.5, lookY: 1.9 },
    3: { x: 0.4, y: 1.3, z: 12.2, lookY: 1.6 },
    4: { x: -0.5, y: 2.3, z: 14.5, lookY: 3.1 },
    5: { x: 0.5, y: 1.7, z: 13.8, lookY: 1.8 },
    6: { x: 0, y: 1.4, z: 11.8, lookY: 1.7 },
    7: { x: 0, y: 2.6, z: 15.8, lookY: 3.4 },
  };

  let targetCam = chapterTargets[1];
  let pointerX = 0;
  let pointerY = 0;
  let shakeAmp = 0;
  let healedMode = false;
  let warmthLevel = 0;

  const onPointerMove = (e) => {
    const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    pointerX = nx * 0.85;
    pointerY = -ny * 0.45;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const onResize = () => {
    const nw = hostEl.clientWidth || window.innerWidth;
    const nh = hostEl.clientHeight || window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  const fpsScaler = createAdaptiveFpsScaler(renderer, tier);
  let rafId = null;

  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    fpsScaler.tick(dt);

    // Camera smooth glide + pointer parallax + impact shake
    const sx = shakeAmp > 0.01 ? (Math.random() - 0.5) * shakeAmp : 0;
    const sy = shakeAmp > 0.01 ? (Math.random() - 0.5) * shakeAmp : 0;
    shakeAmp *= Math.exp(-9 * dt);

    const lerpRate = 1 - Math.exp(-3.4 * dt);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCam.x + pointerX + sx, lerpRate);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCam.y + pointerY + sy, lerpRate);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCam.z, lerpRate);
    camera.lookAt(0, targetCam.lookY, -4);

    // Heartbeat & Kintsugi gold glow
    const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 2.5)), 6) * 0.09;
    heartPivot.scale.setScalar(beat);
    heartPivot.rotation.y = Math.sin(t * 0.6) * 0.32;
    heartPivot.position.y = 1.8 + Math.sin(t * 1.4) * 0.14;
    kintsugiWireMat.opacity = healedMode ? 0.98 : 0.42 + warmthLevel * 0.45;

    // Moon halo shimmer
    haloMesh.scale.setScalar(1 + Math.sin(t * 1.3) * 0.05);

    // Rippling water surface
    if (!lowDetail) {
      const wPos = waterGeo.attributes.position;
      for (let i = 0; i < wPos.count; i++) {
        const vx = wPos.getX(i);
        const vz = wPos.getZ(i);
        wPos.setY(i, waterBaseY[i] + Math.sin(vx * 0.4 + t * 1.8) * 0.06 + Math.cos(vz * 0.35 + t * 1.3) * 0.05);
      }
      wPos.needsUpdate = true;
    }

    // Petals drift
    const pArr = petalGeo.attributes.position.array;
    const speedMult = healedMode ? 1.55 : 0.85;
    for (let i = 0; i < petalCount; i++) {
      pArr[i * 3 + 1] += dt * petalVel[i] * speedMult * 0.6;
      pArr[i * 3] += Math.sin(t * 0.8 + i) * dt * 0.35;
      if (pArr[i * 3 + 1] > 14) pArr[i * 3 + 1] = -3.2;
    }
    petalGeo.attributes.position.needsUpdate = true;
    petalMat.color.setHex(healedMode ? 0xf5d08a : 0xfda4af);

    // Rising lanterns
    for (let i = 0; i < lanterns.length; i++) {
      const l = lanterns[i];
      l.position.y += l.userData.vy * dt;
      l.position.x += Math.sin(t * 1.1 + l.userData.phase) * dt * 0.32;
      if (l.position.y > 16) l.position.y = -4.5;
    }

    // Burst sparks
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const bp = burstParticles[i];
      bp.position.x += bp.userData.vx * dt;
      bp.position.y += bp.userData.vy * dt;
      bp.position.z += bp.userData.vz * dt;
      bp.userData.vy -= 6.5 * dt;
      bp.userData.life -= dt * 1.6;
      bp.scale.setScalar(Math.max(0.01, bp.userData.life));
      if (bp.userData.life <= 0) {
        scene.remove(bp);
        burstParticles.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
  };
  animate();

  return {
    setChapter(num) {
      targetCam = chapterTargets[num] || chapterTargets[1];
    },
    setWarmth(norm01) {
      warmthLevel = Math.max(0, Math.min(1, norm01));
      warmGlowLight.intensity = 2.2 + warmthLevel * 1.8;
      heartMat.emissive.setHex(warmthLevel > 0.6 ? 0x9f1239 : 0x4c0519);
    },
    spawnLantern,
    triggerBurst,
    setHealed() {
      if (healedMode) return;
      healedMode = true;
      warmthLevel = 1;
      heartMat.color.setHex(0xf43f5e);
      heartMat.emissive.setHex(0xbe123c);
      warmGlowLight.color.setHex(0xf5d08a);
      warmGlowLight.intensity = 3.6;
      spawnLantern(lowDetail ? 10 : 18, true);
      triggerBurst(0xf5d08a, false);
    },
    destroy() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      disposeThreeScene(scene, renderer);
      if (renderer.domElement.parentNode === hostEl) {
        hostEl.removeChild(renderer.domElement);
      }
    },
  };
}
