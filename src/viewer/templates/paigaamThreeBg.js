// src/viewer/templates/paigaamThreeBg.js
// Three.js 3D Ambient Hearts, Sparkle Stars & Celebratory Burst Engine for Birthday Paigaam

import * as THREE from 'three';

/**
 * Create a 3D extruded heart BufferGeometry.
 */
function createHeartGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.25);
  shape.bezierCurveTo(0, 0.25, -0.05, 0, -0.25, 0);
  shape.bezierCurveTo(-0.55, 0, -0.55, 0.35, -0.55, 0.35);
  shape.bezierCurveTo(-0.55, 0.55, -0.35, 0.77, 0, 0.95);
  shape.bezierCurveTo(0.35, 0.77, 0.55, 0.55, 0.55, 0.35);
  shape.bezierCurveTo(0.55, 0.35, 0.55, 0, 0.25, 0);
  shape.bezierCurveTo(0.1, 0, 0, 0.25, 0, 0.25);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04
  });
  geo.center();
  geo.rotateZ(Math.PI); // Flip upright
  return geo;
}

/**
 * Create a 4-pointed 3D star sparkle BufferGeometry.
 */
function createStarGeometry() {
  const shape = new THREE.Shape();
  const outer = 0.34;
  const inner = 0.09;
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (i * Math.PI) / 4;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  });
  geo.center();
  return geo;
}

/**
 * Mounts an interactive Three.js 3D ambient + celebration particle layer onto a canvas.
 */
export function createPaigaamThreeLayer(canvas, palette = {}) {
  if (!canvas) return null;

  const accentHex = palette.accent || '#C2185B';
  const blushHex = palette.blush || '#F9C6D4';
  const lavenderHex = palette.lavender || '#D9C8F5';
  const peachHex = palette.peach || '#FFD9B8';
  const goldHex = '#F2C14E';

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL unavailable for Paigaam 3D layer, falling back to 2D:', e);
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / Math.max(1, window.innerHeight), 0.1, 100);
  camera.position.set(0, 0, 14);

  // Soft warm romantic lighting
  const ambient = new THREE.AmbientLight(0xfff5f8, 1.35);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff0e6, 1.6);
  keyLight.position.set(5, 8, 10);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xf9c6d4, 0.9);
  rimLight.position.set(-6, -4, 6);
  scene.add(rimLight);

  // Shared geometries & pastel glossy materials
  const heartGeo = createHeartGeometry();
  const starGeo = createStarGeometry();
  const ribbonGeo = new THREE.PlaneGeometry(0.18, 0.34);

  const colorPalette = [accentHex, blushHex, lavenderHex, peachHex, goldHex];
  const heartMats = colorPalette.map(hex => new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex),
    roughness: 0.28,
    metalness: 0.14,
    transparent: true,
    opacity: 0.72
  }));

  const starMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(goldHex),
    emissive: new THREE.Color('#f7dfa0'),
    emissiveIntensity: 0.35,
    roughness: 0.2,
    metalness: 0.65,
    transparent: true,
    opacity: 0.78
  });

  const confettiMats = [accentHex, goldHex, blushHex, lavenderHex, '#4CAF50', '#38BDF8'].map(hex =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(hex),
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    })
  );

  // 1. Ambient Floating 3D Hearts & Stars
  const ambientItems = [];
  const small = Math.min(window.innerWidth, window.innerHeight) < 600;
  const heartCount = small ? 10 : 16;
  const starCount = small ? 8 : 13;

  function resetAmbientPos(item, initial = false) {
    item.mesh.position.x = (Math.random() - 0.5) * 16;
    item.mesh.position.y = initial ? (Math.random() - 0.5) * 12 : -7.2 - Math.random() * 2;
    item.mesh.position.z = -4 + Math.random() * 6;
    item.vy = 0.32 + Math.random() * 0.45;
    item.swayAmp = 0.2 + Math.random() * 0.35;
    item.swayFreq = 0.5 + Math.random() * 0.7;
    item.phase = Math.random() * Math.PI * 2;
    item.rx = (Math.random() - 0.5) * 0.6;
    item.ry = (Math.random() - 0.5) * 0.9;
  }

  for (let i = 0; i < heartCount; i++) {
    const mesh = new THREE.Mesh(heartGeo, heartMats[i % heartMats.length]);
    const s = 0.28 + Math.random() * 0.34;
    mesh.scale.setScalar(s);
    const item = { mesh, baseScale: s, isStar: false };
    resetAmbientPos(item, true);
    scene.add(mesh);
    ambientItems.push(item);
  }

  for (let i = 0; i < starCount; i++) {
    const mesh = new THREE.Mesh(starGeo, starMat);
    const s = 0.22 + Math.random() * 0.26;
    mesh.scale.setScalar(s);
    const item = { mesh, baseScale: s, isStar: true };
    resetAmbientPos(item, true);
    scene.add(mesh);
    ambientItems.push(item);
  }

  // 2. Dynamic 3D Burst Particles (hearts & confetti)
  const bursts = [];

  function screenToWorld(clientX, clientY) {
    const nx = (clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = -(clientY / Math.max(1, window.innerHeight)) * 2 + 1;
    const vec = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(dist));
  }

  function spawn3DBurst(clientX, clientY, count = 24, mode = 'hearts') {
    const origin = screenToWorld(clientX, clientY);
    for (let i = 0; i < count; i++) {
      const isHeart = mode === 'hearts' || (mode === 'firework' && i % 3 === 0);
      const geo = isHeart ? heartGeo : ribbonGeo;
      const mat = isHeart
        ? heartMats[i % heartMats.length].clone()
        : confettiMats[i % confettiMats.length].clone();
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(origin);
      mesh.position.z += (Math.random() - 0.5) * 2;
      const scale = isHeart ? (0.24 + Math.random() * 0.22) : (0.65 + Math.random() * 0.55);
      mesh.scale.setScalar(scale);

      const angle = Math.random() * Math.PI * 2;
      const speed = mode === 'firework' ? (3.5 + Math.random() * 6.5) : (2.2 + Math.random() * 4.5);
      scene.add(mesh);

      bursts.push({
        mesh,
        mat,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (mode === 'confetti' ? 3.5 : 1.5),
        vz: (Math.random() - 0.5) * 4.5,
        vrx: (Math.random() - 0.5) * 8,
        vry: (Math.random() - 0.5) * 8,
        vrz: (Math.random() - 0.5) * 8,
        life: 0,
        maxLife: 1.4 + Math.random() * 1.1
      });
    }
  }

  // Pointer parallax
  let targetCamX = 0;
  let targetCamY = 0;
  function onPointerMove(e) {
    const nx = (e.clientX / Math.max(1, window.innerWidth)) - 0.5;
    const ny = (e.clientY / Math.max(1, window.innerHeight)) - 0.5;
    targetCamX = nx * 1.2;
    targetCamY = -ny * 0.8;
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  function handleResize() {
    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  let isStill = false;
  let disposed = false;
  let rafId = null;
  let prevTime = performance.now();

  function tick(now) {
    if (disposed) return;
    const dt = Math.min((now - prevTime) / 1000, 0.08);
    prevTime = now;
    const t = now / 1000;

    // Smooth camera parallax
    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    if (!isStill) {
      for (let i = 0; i < ambientItems.length; i++) {
        const it = ambientItems[i];
        it.mesh.position.y += it.vy * dt;
        it.mesh.position.x += Math.sin(t * it.swayFreq + it.phase) * it.swayAmp * dt;
        it.mesh.rotation.x += it.rx * dt;
        it.mesh.rotation.y += it.ry * dt;
        if (it.isStar) {
          const pulse = 1 + Math.sin(t * 2.5 + it.phase) * 0.18;
          it.mesh.scale.setScalar(it.baseScale * pulse);
        }
        if (it.mesh.position.y > 7.4) {
          resetAmbientPos(it, false);
        }
      }
    }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.life += dt;
      if (b.life >= b.maxLife) {
        scene.remove(b.mesh);
        b.mat.dispose();
        bursts.splice(i, 1);
        continue;
      }
      b.vy -= 5.8 * dt;
      b.vx *= 0.985;
      b.vz *= 0.985;
      b.mesh.position.x += b.vx * dt;
      b.mesh.position.y += b.vy * dt;
      b.mesh.position.z += b.vz * dt;
      b.mesh.rotation.x += b.vrx * dt;
      b.mesh.rotation.y += b.vry * dt;
      b.mesh.rotation.z += b.vrz * dt;
      b.mat.opacity = Math.max(0, 1 - b.life / b.maxLife);
    }

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  return {
    burst: spawn3DBurst,
    setStill(stillVal) {
      isStill = Boolean(stillVal);
    },
    dispose() {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      bursts.forEach(b => {
        scene.remove(b.mesh);
        b.mat.dispose();
      });
      bursts.length = 0;
      heartGeo.dispose();
      starGeo.dispose();
      ribbonGeo.dispose();
      heartMats.forEach(m => m.dispose());
      starMat.dispose();
      confettiMats.forEach(m => m.dispose());
      renderer.dispose();
    }
  };
}
