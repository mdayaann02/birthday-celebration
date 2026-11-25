// src/viewer/templates/museumAvatar.js - Ultra High-Fidelity 3D Stylized Avatar System
// Features: Anatomical facial sculpts (iris, pupil, glint, nose, lips, ears), realistic hair layers,
// bespoke Italian tuxedo / haute couture gown, articulated multi-joint limbs (shoulders, elbows, hands with fingers, knees, heels),
// 3D velvet ring box with spinning faceted diamond, dynamic bipedal walk physics, breathing idle, and multiplayer nametags.

import * as THREE from 'three';
import gsap from 'gsap';

function createNametagTexture(name, gender) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const isMale = gender === 'male' || gender === 'boy';
  const mainColor = isMale ? '#3b82f6' : '#ec4899';
  const badgeEmoji = isMale ? '👦' : '👧';

  // Pill background with rich glassmorphism
  ctx.fillStyle = 'rgba(12, 10, 16, 0.88)';
  roundRect(ctx, 16, 16, 512 - 32, 96, 48);
  ctx.fill();

  // Outer golden-tinted border
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 5;
  ctx.stroke();

  // Inner subtle glow border
  ctx.strokeStyle = isMale ? 'rgba(96, 165, 250, 0.5)' : 'rgba(244, 114, 182, 0.5)';
  ctx.lineWidth = 2;
  roundRect(ctx, 22, 22, 512 - 44, 84, 42);
  ctx.stroke();

  // Nametag text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Cinzel", "Segoe UI", sans-serif';
  const displayName = name ? (name.length > 14 ? name.substring(0, 13) + '…' : name) : 'Visitor';
  ctx.fillText(`${badgeEmoji} ${displayName}`, 256, 64);

  return new THREE.CanvasTexture(canvas);
}

function createSpeechBubbleTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 20, 20, 512 - 40, 120, 24);
  ctx.fill();

  // Pointer arrow
  ctx.beginPath();
  ctx.moveTo(236, 140);
  ctx.lineTo(256, 175);
  ctx.lineTo(276, 140);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 5;
  roundRect(ctx, 20, 20, 512 - 40, 120, 24);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 34px "Segoe UI", sans-serif';
  const clean = text.length > 22 ? text.substring(0, 21) + '…' : text;
  ctx.fillText(clean, 256, 80);

  return new THREE.CanvasTexture(canvas);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function createRadialShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.28)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

export function create3DAvatar(name, gender = 'male', isLocal = false) {
  const isMale = gender === 'male' || gender === 'boy';
  const avatarGroup = new THREE.Group();

  // ============================================================================
  // PBR REALISTIC MATERIALS
  // ============================================================================
  const skinColor = isMale ? 0xf5c39e : 0xfde3d2;
  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.52,
    metalness: 0.02
  });

  const blushMat = new THREE.MeshStandardMaterial({
    color: 0xfca5a5,
    roughness: 0.6,
    transparent: true,
    opacity: 0.6
  });

  const lipMat = new THREE.MeshStandardMaterial({
    color: isMale ? 0xc46868 : 0xdf4a76,
    roughness: 0.38
  });

  // Eyes
  const scleraMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const irisColor = isMale ? 0x3b2110 : 0x1b4332; // Deep hazel-brown or emerald
  const irisMat = new THREE.MeshStandardMaterial({ color: irisColor, roughness: 0.2, metalness: 0.1 });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const browMat = new THREE.MeshStandardMaterial({
    color: isMale ? 0x1a1512 : 0x24140e,
    roughness: 0.8
  });

  // Hair
  const hairColor = isMale ? 0x1c1714 : 0x2e1810;
  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.36,
    metalness: 0.12
  });
  const hairHighlightMat = new THREE.MeshStandardMaterial({
    color: isMale ? 0x2b221c : 0x4a2a1c,
    roughness: 0.32,
    metalness: 0.18
  });

  // Outfits
  const tuxedoColor = 0x172554; // Midnight Royal Blue
  const tuxedoMat = new THREE.MeshStandardMaterial({
    color: tuxedoColor,
    roughness: 0.55,
    metalness: 0.1
  });
  const satinLapelMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.22,
    metalness: 0.25
  });
  const shirtWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.75
  });
  const bowtieMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.35,
    metalness: 0.15
  });

  // Gown
  const gownMainColor = 0xec4899;
  const gownAccentColor = 0xf472b6;
  const gownMat = new THREE.MeshStandardMaterial({
    color: gownMainColor,
    roughness: 0.38,
    metalness: 0.14
  });
  const gownSilkMat = new THREE.MeshStandardMaterial({
    color: gownAccentColor,
    roughness: 0.3,
    metalness: 0.2
  });

  // Accessories & Shoes
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.18
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.22,
    metalness: 0.2
  });
  const heelSoleMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.25
  });

  // ============================================================================
  // 1. TORSO & UPPER BODY HIERARCHY
  // ============================================================================
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.95;
  avatarGroup.add(torsoGroup);

  if (isMale) {
    // ------------------------------------------------------------------------
    // MALE: Bespoke Italian Tuxedo
    // ------------------------------------------------------------------------
    // Chest & Upper Body (V-Taper)
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.34, 16), tuxedoMat);
    chest.position.set(0, 0.17, 0);
    chest.scale.set(1.15, 1, 0.78);
    torsoGroup.add(chest);

    // Abdomen / Waist
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.18, 0.26, 16), tuxedoMat);
    waist.position.set(0, -0.1, 0);
    waist.scale.set(1.1, 1, 0.75);
    torsoGroup.add(waist);

    // White Shirt Bib
    const shirtBib = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.32, 0.1), shirtWhiteMat);
    shirtBib.position.set(0, 0.14, 0.11);
    torsoGroup.add(shirtBib);

    // Wingtip Shirt Collar
    const collarL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), shirtWhiteMat);
    collarL.position.set(0.04, 0.31, 0.13);
    collarL.rotation.z = -0.3;
    torsoGroup.add(collarL);

    const collarR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), shirtWhiteMat);
    collarR.position.set(-0.04, 0.31, 0.13);
    collarR.rotation.z = 0.3;
    torsoGroup.add(collarR);

    // Satin Peaked Lapels
    const lapelL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.03), satinLapelMat);
    lapelL.position.set(0.1, 0.16, 0.14);
    lapelL.rotation.z = -0.22;
    torsoGroup.add(lapelL);

    const lapelR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.03), satinLapelMat);
    lapelR.position.set(-0.1, 0.16, 0.14);
    lapelR.rotation.z = 0.22;
    torsoGroup.add(lapelR);

    // Satin Bowtie
    const bowKnot = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.032, 0.03), bowtieMat);
    bowKnot.position.set(0, 0.28, 0.16);
    torsoGroup.add(bowKnot);

    const bowWingL = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 4), bowtieMat);
    bowWingL.rotation.z = -Math.PI / 2;
    bowWingL.position.set(0.05, 0.28, 0.16);
    torsoGroup.add(bowWingL);

    const bowWingR = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 4), bowtieMat);
    bowWingR.rotation.z = Math.PI / 2;
    bowWingR.position.set(-0.05, 0.28, 0.16);
    torsoGroup.add(bowWingR);

    // Breast Pocket with Folded Silk Handkerchief
    const pocketSquare = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.02), shirtWhiteMat);
    pocketSquare.position.set(0.12, 0.18, 0.15);
    pocketSquare.rotation.z = 0.15;
    torsoGroup.add(pocketSquare);

    // Polished Gold Buttons
    for (let i = 0; i < 2; i++) {
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 10), goldMat);
      btn.rotation.x = Math.PI / 2;
      btn.position.set(0, 0.02 - i * 0.09, 0.15);
      torsoGroup.add(btn);
    }
  } else {
    // ------------------------------------------------------------------------
    // FEMALE: Haute Couture Evening Gala Gown
    // ------------------------------------------------------------------------
    // Sweetheart Bodice
    const bodice = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.32, 16), gownMat);
    bodice.position.set(0, 0.12, 0);
    bodice.scale.set(1.05, 1, 0.78);
    torsoGroup.add(bodice);

    // Sweetheart Bust Cups
    const cupL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), gownMat);
    cupL.position.set(0.075, 0.19, 0.09);
    cupL.scale.set(1, 0.9, 0.8);
    torsoGroup.add(cupL);

    const cupR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), gownMat);
    cupR.position.set(-0.075, 0.19, 0.09);
    cupR.scale.set(1, 0.9, 0.8);
    torsoGroup.add(cupR);

    // Waist Sash
    const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.175, 0.08, 16), gownSilkMat);
    sash.position.set(0, -0.05, 0);
    sash.scale.set(1.05, 1, 0.8);
    torsoGroup.add(sash);

    // Flowing Chiffon/Silk Skirt
    const skirtGeo = new THREE.CylinderGeometry(0.18, 0.44, 0.88, 20);
    const skirt = new THREE.Mesh(skirtGeo, gownSilkMat);
    skirt.position.set(0, -0.48, 0);
    skirt.scale.set(1, 1, 0.88);
    torsoGroup.add(skirt);

    // Sparkling Crystal Pendant Necklace
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 8, 24, Math.PI), goldMat);
    chain.position.set(0, 0.24, 0.08);
    chain.rotation.x = Math.PI / 3.2;
    torsoGroup.add(chain);

    const pendant = new THREE.Mesh(new THREE.OctahedronGeometry(0.024, 0), goldMat);
    pendant.position.set(0, 0.17, 0.14);
    torsoGroup.add(pendant);
  }

  // ============================================================================
  // 2. HEAD & FACIAL ANATOMY HIERARCHY
  // ============================================================================
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.44, 0);
  torsoGroup.add(headGroup);

  // Sculpted Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 0.16, 16), skinMat);
  neck.position.set(0, -0.06, 0);
  headGroup.add(neck);

  // Cranium
  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.175, 20, 20), skinMat);
  cranium.position.set(0, 0.07, 0);
  cranium.scale.set(1, 1.1, 1.05);
  headGroup.add(cranium);

  // Sculpted Jaw and Chin
  const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.08, 0.12, 14), skinMat);
  jaw.position.set(0, 0.0, 0.04);
  jaw.scale.set(1, 1, 0.9);
  headGroup.add(jaw);

  const chin = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), skinMat);
  chin.position.set(0, -0.06, 0.1);
  headGroup.add(chin);

  // Rosy Cheeks
  const blushL = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), blushMat);
  blushL.position.set(0.11, 0.05, 0.13);
  blushL.scale.set(1, 0.6, 0.4);
  headGroup.add(blushL);

  const blushR = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), blushMat);
  blushR.position.set(-0.11, 0.05, 0.13);
  blushR.scale.set(1, 0.6, 0.4);
  headGroup.add(blushR);

  // --------------------------------------------------------------------------
  // Sculpted Eyes (Sclera + Iris + Pupil + Specular Reflection Glint)
  // --------------------------------------------------------------------------
  function createEyeMesh(isLeft) {
    const eyeAnchor = new THREE.Group();
    const sign = isLeft ? 1 : -1;
    eyeAnchor.position.set(sign * 0.068, 0.075, 0.155);

    // Sclera
    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.038, 14, 14), scleraMat);
    eyeAnchor.add(sclera);

    // Colored Iris
    const iris = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.005, 14), irisMat);
    iris.rotation.x = Math.PI / 2;
    iris.position.set(0, 0, 0.035);
    eyeAnchor.add(iris);

    // Pupil
    const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.006, 12), pupilMat);
    pupil.rotation.x = Math.PI / 2;
    pupil.position.set(0, 0, 0.036);
    eyeAnchor.add(pupil);

    // Sparkle Glint (Living Specular Highlight!)
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.0055, 8, 8), glintMat);
    glint.position.set(sign * 0.008, 0.008, 0.038);
    eyeAnchor.add(glint);

    // Upper Eyelid / Lash Line
    const eyelid = new THREE.Mesh(
      new THREE.BoxGeometry(0.054, isMale ? 0.008 : 0.014, 0.02),
      isMale ? browMat : pupilMat
    );
    eyelid.position.set(0, 0.026, 0.03);
    eyelid.rotation.z = sign * -0.08;
    eyeAnchor.add(eyelid);

    return eyeAnchor;
  }

  headGroup.add(createEyeMesh(true));
  headGroup.add(createEyeMesh(false));

  // 3D Eyebrows
  const browL = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.014, 0.018), browMat);
  browL.position.set(0.072, 0.12, 0.165);
  browL.rotation.z = -0.09;
  headGroup.add(browL);

  const browR = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.014, 0.018), browMat);
  browR.position.set(-0.072, 0.12, 0.165);
  browR.rotation.z = 0.09;
  headGroup.add(browR);

  // 3D Sculpted Nose
  const noseBridge = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.06, 8), skinMat);
  noseBridge.position.set(0, 0.05, 0.17);
  noseBridge.rotation.x = 0.22;
  headGroup.add(noseBridge);

  const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 10), skinMat);
  noseTip.position.set(0, 0.026, 0.185);
  headGroup.add(noseTip);

  // 3D Sculpted Lips
  const upperLip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.016), lipMat);
  upperLip.position.set(0, -0.016, 0.16);
  headGroup.add(upperLip);

  const lowerLip = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.046, 8), lipMat);
  lowerLip.rotation.z = Math.PI / 2;
  lowerLip.position.set(0, -0.03, 0.158);
  headGroup.add(lowerLip);

  // 3D Ears
  function createEarMesh(isLeft) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), skinMat);
    const sign = isLeft ? 1 : -1;
    ear.position.set(sign * 0.17, 0.06, -0.01);
    ear.scale.set(0.4, 1.2, 0.8);

    if (!isMale) {
      // Sparkling diamond earring
      const earring = new THREE.Mesh(new THREE.OctahedronGeometry(0.012, 0), goldMat);
      earring.position.set(0, -0.04, 0);
      ear.add(earring);
    }
    return ear;
  }
  headGroup.add(createEarMesh(true));
  headGroup.add(createEarMesh(false));

  // --------------------------------------------------------------------------
  // Sculpted 3D Layered Hair
  // --------------------------------------------------------------------------
  const hairGroup = new THREE.Group();
  headGroup.add(hairGroup);

  if (isMale) {
    // Male: High-Fashion Textured Quiff / Pompadour
    // Base hair volume
    const hairBase = new THREE.Mesh(
      new THREE.SphereGeometry(0.186, 18, 18, 0, Math.PI * 2, 0, Math.PI / 1.7),
      hairMat
    );
    hairBase.position.set(0, 0.08, -0.02);
    hairGroup.add(hairBase);

    // Volumetric Top Quiff
    const quiffMain = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), hairMat);
    quiffMain.position.set(0.02, 0.22, 0.07);
    quiffMain.scale.set(1.4, 0.7, 1.2);
    quiffMain.rotation.z = -0.15;
    hairGroup.add(quiffMain);

    // Front Sweep Strands
    const fringe = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 6), hairHighlightMat);
    fringe.position.set(0.06, 0.2, 0.13);
    fringe.rotation.set(-1.1, 0.4, -0.3);
    hairGroup.add(fringe);

    // Sideburns
    const sideburnL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.04), hairMat);
    sideburnL.position.set(0.165, 0.05, 0.04);
    hairGroup.add(sideburnL);

    const sideburnR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.04), hairMat);
    sideburnR.position.set(-0.165, 0.05, 0.04);
    hairGroup.add(sideburnR);
  } else {
    // Female: Flowing Voluminous Salon-Styled Waves
    // Top Crown Volume
    const hairCrown = new THREE.Mesh(
      new THREE.SphereGeometry(0.192, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.55),
      hairMat
    );
    hairCrown.position.set(0, 0.08, -0.02);
    hairGroup.add(hairCrown);

    // Left Front Bang / Cascade Strand
    const strandL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.36, 10), hairMat);
    strandL.position.set(0.14, -0.06, 0.08);
    strandL.rotation.set(0.15, 0, -0.2);
    hairGroup.add(strandL);

    // Right Front Bang / Cascade Strand
    const strandR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.36, 10), hairMat);
    strandR.position.set(-0.14, -0.06, 0.08);
    strandR.rotation.set(0.15, 0, 0.2);
    hairGroup.add(strandR);

    // Long Flowing Back Hair Layers
    const backHairUpper = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 0.14), hairMat);
    backHairUpper.position.set(0, -0.12, -0.12);
    hairGroup.add(backHairUpper);

    const backHairLower = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.48, 12), hairHighlightMat);
    backHairLower.position.set(0, -0.38, -0.12);
    backHairLower.scale.set(1.1, 1, 0.7);
    hairGroup.add(backHairLower);

    // Golden Hair Accessory
    const hairBarrette = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.015), goldMat);
    hairBarrette.position.set(0.13, 0.17, 0.09);
    hairBarrette.rotation.z = -0.35;
    hairGroup.add(hairBarrette);
  }

  // ============================================================================
  // 3. ARTICULATED MULTI-JOINT LIMBS (Shoulders, Elbows, Hands, Knees, Shoes)
  // ============================================================================
  // --------------------------------------------------------------------------
  // Left Arm (Shoulder + Forearm + Detailed Hand)
  // --------------------------------------------------------------------------
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(0.32, 0.22, 0);
  torsoGroup.add(leftArmGroup);

  // Left Upper Arm (Bicep)
  const leftUpperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.056, 0.048, 0.24, 12),
    isMale ? tuxedoMat : skinMat
  );
  leftUpperArm.position.y = -0.12;
  leftArmGroup.add(leftUpperArm);

  // Left Forearm Pivot at Elbow
  const leftForearmGroup = new THREE.Group();
  leftForearmGroup.position.set(0, -0.24, 0);
  leftArmGroup.add(leftForearmGroup);

  const leftForearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.042, 0.22, 12),
    isMale ? tuxedoMat : skinMat
  );
  leftForearm.position.y = -0.11;
  leftForearmGroup.add(leftForearm);

  if (isMale) {
    // White shirt cuff
    const cuffL = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.024, 12), shirtWhiteMat);
    cuffL.position.y = -0.21;
    leftForearmGroup.add(cuffL);

    // Luxury Gold Wristwatch
    const watch = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.008, 8, 16), goldMat);
    watch.position.y = -0.2;
    watch.rotation.x = Math.PI / 2;
    leftForearmGroup.add(watch);
  } else {
    // Golden Bangle
    const bangle = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.006, 8, 16), goldMat);
    bangle.position.y = -0.2;
    bangle.rotation.x = Math.PI / 2;
    leftForearmGroup.add(bangle);
  }

  // Left Hand (Palm + Thumb + Fingers)
  const leftHand = new THREE.Group();
  leftHand.position.set(0, -0.24, 0);
  leftForearmGroup.add(leftHand);

  const palmL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.065, 0.025), skinMat);
  palmL.position.y = -0.03;
  leftHand.add(palmL);

  const thumbL = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.008, 0.035, 8), skinMat);
  thumbL.position.set(-0.026, -0.02, 0.008);
  thumbL.rotation.z = 0.5;
  leftHand.add(thumbL);

  // --------------------------------------------------------------------------
  // Right Arm (Can wave & holds open velvet ring box on proposal)
  // --------------------------------------------------------------------------
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(-0.32, 0.22, 0);
  torsoGroup.add(rightArmGroup);

  // Right Upper Arm
  const rightUpperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.056, 0.048, 0.24, 12),
    isMale ? tuxedoMat : skinMat
  );
  rightUpperArm.position.y = -0.12;
  rightArmGroup.add(rightUpperArm);

  // Right Forearm Pivot at Elbow
  const rightForearmGroup = new THREE.Group();
  rightForearmGroup.position.set(0, -0.24, 0);
  rightArmGroup.add(rightForearmGroup);

  const rightForearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.042, 0.22, 12),
    isMale ? tuxedoMat : skinMat
  );
  rightForearm.position.y = -0.11;
  rightForearmGroup.add(rightForearm);

  if (isMale) {
    const cuffR = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.024, 12), shirtWhiteMat);
    cuffR.position.y = -0.21;
    rightForearmGroup.add(cuffR);
  }

  // Right Hand
  const rightHand = new THREE.Group();
  rightHand.position.set(0, -0.24, 0);
  rightForearmGroup.add(rightHand);

  const palmR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.065, 0.025), skinMat);
  palmR.position.y = -0.03;
  rightHand.add(palmR);

  const thumbR = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.008, 0.035, 8), skinMat);
  thumbR.position.set(0.026, -0.02, 0.008);
  thumbR.rotation.z = -0.5;
  rightHand.add(thumbR);

  // --------------------------------------------------------------------------
  // 3D Crimson Velvet Ring Box with Spinning Faceted Diamond
  // --------------------------------------------------------------------------
  const ringBoxGroup = new THREE.Group();
  ringBoxGroup.position.set(0, -0.03, 0.12);
  ringBoxGroup.visible = false;
  rightHand.add(ringBoxGroup);

  // Velvet Cushion Base
  const boxBaseMat = new THREE.MeshStandardMaterial({ color: 0x831843, roughness: 0.88 });
  const boxBase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.12), boxBaseMat);
  ringBoxGroup.add(boxBase);

  // Open Hinged Lid
  const boxLid = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.12), boxBaseMat);
  boxLid.position.set(0, 0.075, -0.05);
  boxLid.rotation.x = -Math.PI / 2.3;
  ringBoxGroup.add(boxLid);

  // Solid Gold Ring Band
  const ringBandMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
  const ringBand = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.006, 10, 20), ringBandMat);
  ringBand.position.set(0, 0.05, 0);
  ringBand.rotation.x = Math.PI / 2;
  ringBoxGroup.add(ringBand);

  // Sparkling Faceted Diamond
  const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.024, 0), diamondMat);
  diamond.position.set(0, 0.082, 0);
  ringBoxGroup.add(diamond);

  const ringLight = new THREE.PointLight(0xffeedd, 0, 3.0);
  ringLight.position.set(0, 0.15, 0);
  ringBoxGroup.add(ringLight);

  // --------------------------------------------------------------------------
  // Legs & Designer Footwear
  // --------------------------------------------------------------------------
  // Left Leg Pivot
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(0.13, 0.65, 0);
  avatarGroup.add(leftLegGroup);

  // Left Thigh
  const leftThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.058, 0.32, 14),
    isMale ? tuxedoMat : gownMat
  );
  leftThigh.position.y = -0.16;
  leftLegGroup.add(leftThigh);

  // Left Calf Pivot at Knee
  const leftCalfGroup = new THREE.Group();
  leftCalfGroup.position.set(0, -0.32, 0);
  leftLegGroup.add(leftCalfGroup);

  const leftCalf = new THREE.Mesh(
    new THREE.CylinderGeometry(0.058, 0.048, 0.32, 14),
    isMale ? tuxedoMat : (isMale ? tuxedoMat : skinMat)
  );
  leftCalf.position.y = -0.16;
  leftCalfGroup.add(leftCalf);

  // Left Shoe
  const leftShoe = new THREE.Group();
  leftShoe.position.set(0, -0.32, 0.03);
  leftCalfGroup.add(leftShoe);

  if (isMale) {
    // Italian Oxford Leather Dress Shoe
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.03, 0.25), shoeMat);
    sole.position.y = -0.015;
    leftShoe.add(sole);

    const heel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.08), shoeMat);
    heel.position.set(0, 0.015, -0.07);
    leftShoe.add(heel);

    const vamp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.16), shoeMat);
    vamp.position.set(0, 0.03, 0.04);
    leftShoe.add(vamp);
  } else {
    // Designer Stiletto High Heel
    const vamp = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 8), gownMat);
    vamp.rotation.x = -Math.PI / 2.2;
    vamp.position.set(0, 0.02, 0.04);
    leftShoe.add(vamp);

    const stiletto = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.005, 0.09, 8), heelSoleMat);
    stiletto.position.set(0, -0.02, -0.05);
    leftShoe.add(stiletto);
  }

  // Right Leg Pivot
  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(-0.13, 0.65, 0);
  avatarGroup.add(rightLegGroup);

  // Right Thigh
  const rightThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.058, 0.32, 14),
    isMale ? tuxedoMat : gownMat
  );
  rightThigh.position.y = -0.16;
  rightLegGroup.add(rightThigh);

  // Right Calf Pivot at Knee
  const rightCalfGroup = new THREE.Group();
  rightCalfGroup.position.set(0, -0.32, 0);
  rightLegGroup.add(rightCalfGroup);

  const rightCalf = new THREE.Mesh(
    new THREE.CylinderGeometry(0.058, 0.048, 0.32, 14),
    isMale ? tuxedoMat : skinMat
  );
  rightCalf.position.y = -0.16;
  rightCalfGroup.add(rightCalf);

  // Right Shoe
  const rightShoe = new THREE.Group();
  rightShoe.position.set(0, -0.32, 0.03);
  rightCalfGroup.add(rightShoe);

  if (isMale) {
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.03, 0.25), shoeMat);
    sole.position.y = -0.015;
    rightShoe.add(sole);

    const heel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.08), shoeMat);
    heel.position.set(0, 0.015, -0.07);
    rightShoe.add(heel);

    const vamp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.16), shoeMat);
    vamp.position.set(0, 0.03, 0.04);
    rightShoe.add(vamp);
  } else {
    const vamp = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 8), gownMat);
    vamp.rotation.x = -Math.PI / 2.2;
    vamp.position.set(0, 0.02, 0.04);
    rightShoe.add(vamp);

    const stiletto = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.005, 0.09, 8), heelSoleMat);
    stiletto.position.set(0, -0.02, -0.05);
    rightShoe.add(stiletto);
  }

  // ============================================================================
  // 4. FLOATING NAMETAG BILLBOARD & RADIAL FLOOR SHADOW
  // ============================================================================
  const nametagTex = createNametagTexture(name, gender);
  const nametagMat = new THREE.SpriteMaterial({ map: nametagTex, transparent: true });
  const nametagSprite = new THREE.Sprite(nametagMat);
  nametagSprite.position.set(0, 2.25, 0);
  nametagSprite.scale.set(1.6, 0.4, 1);
  avatarGroup.add(nametagSprite);

  // Soft Radial Floor Shadow
  const shadowTex = createRadialShadowTexture();
  const shadowGeo = new THREE.PlaneGeometry(1.3, 1.3);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.02;
  avatarGroup.add(shadowMesh);

  // Floating 3D Speech Bubble
  let speechSprite = null;
  let speechTimeout = null;

  function showChatBubble(text) {
    if (speechSprite) {
      avatarGroup.remove(speechSprite);
      speechSprite.material.dispose();
      speechSprite.geometry.dispose();
    }
    const bubbleTex = createSpeechBubbleTexture(text);
    const bubbleMat = new THREE.SpriteMaterial({ map: bubbleTex, transparent: true });
    speechSprite = new THREE.Sprite(bubbleMat);
    speechSprite.position.set(0, 2.75, 0);
    speechSprite.scale.set(1.9, 0.72, 1);
    avatarGroup.add(speechSprite);

    gsap.fromTo(speechSprite.scale,
      { x: 0.1, y: 0.1 },
      { x: 1.9, y: 0.72, duration: 0.35, ease: 'back.out(2)' }
    );

    clearTimeout(speechTimeout);
    speechTimeout = setTimeout(() => {
      if (speechSprite) {
        gsap.to(speechSprite.scale, {
          x: 0,
          y: 0,
          duration: 0.3,
          onComplete: () => {
            if (speechSprite) avatarGroup.remove(speechSprite);
            speechSprite = null;
          }
        });
      }
    }, 4500);
  }

  // ============================================================================
  // 5. ANIMATIONS & STATE MACHINE
  // ============================================================================
  let walkCycle = 0;
  let idleTimer = 0;
  let currentAction = null;
  let actionTimer = 0;
  let isSeated = false;
  let isKneeling = false;
  let isSurprised = false;

  function setSeated(sitting) {
    isSeated = sitting;
    if (sitting) {
      isKneeling = false;
      isSurprised = false;
      ringBoxGroup.visible = false;
      currentAction = null;
    } else {
      resetLimbTransforms();
    }
  }

  function setKneeling(kneeling) {
    isKneeling = kneeling;
    ringBoxGroup.visible = kneeling;
    if (kneeling) {
      isSeated = false;
      isSurprised = false;
      ringLight.intensity = 2.0;
      currentAction = null;
    } else {
      ringLight.intensity = 0;
      resetLimbTransforms();
    }
  }

  function setSurprise(surprise) {
    isSurprised = surprise;
    if (surprise) {
      isSeated = false;
      isKneeling = false;
      ringBoxGroup.visible = false;
    } else {
      resetLimbTransforms();
    }
  }

  function resetLimbTransforms() {
    leftLegGroup.position.set(0.13, 0.65, 0);
    leftLegGroup.rotation.set(0, 0, 0);
    leftCalfGroup.rotation.set(0, 0, 0);

    rightLegGroup.position.set(-0.13, 0.65, 0);
    rightLegGroup.rotation.set(0, 0, 0);
    rightCalfGroup.rotation.set(0, 0, 0);

    torsoGroup.position.set(0, 0.95, 0);
    torsoGroup.rotation.set(0, 0, 0);

    leftArmGroup.rotation.set(0, 0, 0);
    leftForearmGroup.rotation.set(0, 0, 0);

    rightArmGroup.rotation.set(0, 0, 0);
    rightForearmGroup.rotation.set(0, 0, 0);
  }

  function burstHearts(scene, targetPos = null) {
    const heartCanvas = document.createElement('canvas');
    heartCanvas.width = 128;
    heartCanvas.height = 128;
    const hctx = heartCanvas.getContext('2d');
    hctx.textAlign = 'center';
    hctx.textBaseline = 'middle';
    hctx.font = '72px serif';
    const emojis = ['💖', '💕', '❤️', '✨', '🥰', '💍'];
    const chosenEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    hctx.fillText(chosenEmoji, 64, 64);

    const heartTex = new THREE.CanvasTexture(heartCanvas);
    const count = 7;
    for (let i = 0; i < count; i++) {
      const hMat = new THREE.SpriteMaterial({ map: heartTex, transparent: true, opacity: 1 });
      const hSprite = new THREE.Sprite(hMat);
      const startX = avatarGroup.position.x + (Math.random() - 0.5) * 0.4;
      const startY = avatarGroup.position.y + 1.4 + Math.random() * 0.3;
      const startZ = avatarGroup.position.z + (Math.random() - 0.5) * 0.4;
      hSprite.position.set(startX, startY, startZ);
      const scale = 0.35 + Math.random() * 0.25;
      hSprite.scale.set(scale, scale, 1);
      (scene || avatarGroup.parent || avatarGroup).add(hSprite);

      const destX = targetPos ? (targetPos.x + (Math.random() - 0.5) * 0.6) : (startX + (Math.random() - 0.5) * 1.5);
      const destY = startY + 1.2 + Math.random() * 1.0;
      const destZ = targetPos ? (targetPos.z + (Math.random() - 0.5) * 0.6) : (startZ + (Math.random() - 0.5) * 1.5);
      const dur = 1.6 + Math.random() * 0.8;

      gsap.to(hSprite.position, {
        x: destX,
        y: destY,
        z: destZ,
        duration: dur,
        ease: 'power1.out',
        delay: i * 0.08
      });

      gsap.to(hMat, {
        opacity: 0,
        duration: 0.6,
        delay: dur - 0.5 + i * 0.08,
        onComplete: () => {
          (scene || avatarGroup.parent || avatarGroup).remove(hSprite);
          heartTex.dispose();
          hMat.dispose();
        }
      });
    }
  }

  function update(delta, isWalking, speed = 1) {
    if (isKneeling) {
      // ----------------------------------------------------------------------
      // 3D Romantic Real-Time One-Knee Proposal Pose
      // ----------------------------------------------------------------------
      // Right Thigh drops backward, Right Knee flexes 90° onto floor
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, -Math.PI / 2.3, 0.16);
      rightLegGroup.position.y = THREE.MathUtils.lerp(rightLegGroup.position.y, 0.28, 0.16);
      rightLegGroup.position.z = THREE.MathUtils.lerp(rightLegGroup.position.z, -0.16, 0.16);
      rightCalfGroup.rotation.x = THREE.MathUtils.lerp(rightCalfGroup.rotation.x, 1.45, 0.16);

      // Left Thigh lifts forward, Left Foot planted flat
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, 0.52, 0.16);
      leftLegGroup.position.y = THREE.MathUtils.lerp(leftLegGroup.position.y, 0.42, 0.16);
      leftLegGroup.position.z = THREE.MathUtils.lerp(leftLegGroup.position.z, 0.18, 0.16);
      leftCalfGroup.rotation.x = THREE.MathUtils.lerp(leftCalfGroup.rotation.x, -0.5, 0.16);

      // Torso lowers gracefully to kneeling height with proud upright posture
      torsoGroup.position.y = THREE.MathUtils.lerp(torsoGroup.position.y, 0.52, 0.16);
      torsoGroup.position.z = THREE.MathUtils.lerp(torsoGroup.position.z, -0.04, 0.16);
      torsoGroup.rotation.x = THREE.MathUtils.lerp(torsoGroup.rotation.x, 0.06, 0.16);

      // Right arm extends forward presenting the open velvet ring box
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -Math.PI / 2.2, 0.16);
      rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, 0.1, 0.16);
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.12, 0.16);
      rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.25, 0.16);

      // Left arm rests reverently over heart
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.7, 0.16);
      leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.55, 0.16);
      leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, -0.55, 0.16);

      // Diamond sparkles & spins
      diamond.rotation.y += delta * 3.5;
      return;
    }

    if (isSurprised) {
      // ----------------------------------------------------------------------
      // Recipient Hands to Cheeks in Romantic Surprise
      // ----------------------------------------------------------------------
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -1.65, 0.16);
      leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.42, 0.16);
      leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, -0.65, 0.16);

      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -1.65, 0.16);
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.42, 0.16);
      rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.65, 0.16);

      torsoGroup.position.y = 0.95 + Math.sin(idleTimer * 3.5) * 0.02;
      return;
    }

    if (isSeated) {
      // ----------------------------------------------------------------------
      // Sitting Pose on Gallery Leather Bench
      // ----------------------------------------------------------------------
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, -Math.PI / 2 + 0.1, 0.15);
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, -Math.PI / 2 + 0.1, 0.15);
      leftCalfGroup.rotation.x = THREE.MathUtils.lerp(leftCalfGroup.rotation.x, Math.PI / 2.2, 0.15);
      rightCalfGroup.rotation.x = THREE.MathUtils.lerp(rightCalfGroup.rotation.x, Math.PI / 2.2, 0.15);

      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.32, 0.15);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.32, 0.15);
      torsoGroup.position.y = THREE.MathUtils.lerp(torsoGroup.position.y, 0.58, 0.15);
      return;
    }

    if (isWalking) {
      walkCycle += delta * 9 * speed;

      // Natural Human Walk Cycle with Knee & Elbow Articulation
      const thighSwingL = Math.sin(walkCycle) * 0.58;
      const thighSwingR = -Math.sin(walkCycle) * 0.58;

      leftLegGroup.rotation.x = thighSwingL;
      rightLegGroup.rotation.x = thighSwingR;

      // Knees flex backwards on leg backswing
      leftCalfGroup.rotation.x = Math.max(0, -Math.sin(walkCycle) * 0.65);
      rightCalfGroup.rotation.x = Math.max(0, Math.sin(walkCycle) * 0.65);

      // Arms swing opposite legs with natural elbow bend
      leftArmGroup.rotation.x = -Math.sin(walkCycle) * 0.48;
      leftForearmGroup.rotation.x = Math.max(0, -Math.sin(walkCycle) * 0.25);

      if (currentAction !== 'wave') {
        rightArmGroup.rotation.x = Math.sin(walkCycle) * 0.48;
        rightForearmGroup.rotation.x = Math.max(0, Math.sin(walkCycle) * 0.25);
      }

      // Torso natural vertical step bounce & gentle human pelvic sway
      torsoGroup.position.y = 0.95 + Math.abs(Math.sin(walkCycle * 2)) * 0.038;
      torsoGroup.rotation.z = Math.sin(walkCycle) * 0.025;
    } else {
      // Natural Idle Breathing Stance
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, 0, 0.18);
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, 0, 0.18);
      leftCalfGroup.rotation.x = THREE.MathUtils.lerp(leftCalfGroup.rotation.x, 0, 0.18);
      rightCalfGroup.rotation.x = THREE.MathUtils.lerp(rightCalfGroup.rotation.x, 0, 0.18);

      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0, 0.18);
      leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, 0, 0.18);

      if (currentAction !== 'wave') {
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0, 0.18);
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0, 0.18);
        rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, 0, 0.18);
      }

      torsoGroup.rotation.z = THREE.MathUtils.lerp(torsoGroup.rotation.z, 0, 0.18);

      idleTimer += delta;
      // Gentle breathing motion
      torsoGroup.position.y = 0.95 + Math.sin(idleTimer * 2.2) * 0.015;
    }

    // Action handling (Wave)
    if (currentAction === 'wave') {
      actionTimer += delta;
      rightArmGroup.rotation.x = Math.PI - 0.25;
      rightArmGroup.rotation.z = Math.sin(actionTimer * 14) * 0.35 + 0.25;
      rightForearmGroup.rotation.x = 0.35;
      if (actionTimer > 3.0) {
        currentAction = null;
        rightArmGroup.rotation.x = 0;
        rightArmGroup.rotation.z = 0;
        rightForearmGroup.rotation.x = 0;
      }
    }
  }

  function playGesture(action) {
    currentAction = action;
    actionTimer = 0;
  }

  function dispose() {
    avatarGroup.traverse(child => {
      if (child.isMesh || child.isSprite) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      }
    });
  }

  return {
    group: avatarGroup,
    name,
    gender,
    isMale,
    update,
    playGesture,
    showChatBubble,
    burstHearts,
    setSeated,
    setKneeling,
    setSurprise,
    isKneeling: () => isKneeling,
    dispose
  };
}
