// src/viewer/templates/museumAvatar.js - 3D Stylized Avatar System
// Features: Blue Suit for Male, Pink Dress for Female, Floating Nametag, Limb Walk Physics, Wave/Heart Gestures, Speech Bubbles

import * as THREE from 'three';
import gsap from 'gsap';

function createNametagTexture(name, gender) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const isMale = gender === 'male' || gender === 'boy';
  const mainColor = isMale ? '#2563eb' : '#ec4899';
  const badgeEmoji = isMale ? '👦' : '👧';

  // Pill background
  ctx.fillStyle = 'rgba(15, 12, 10, 0.85)';
  roundRect(ctx, 16, 16, 512 - 32, 96, 48);
  ctx.fill();

  // Border
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 6;
  ctx.stroke();

  // Glow line inside
  ctx.strokeStyle = isMale ? '#60a5fa' : '#f472b6';
  ctx.lineWidth = 2;
  roundRect(ctx, 22, 22, 512 - 44, 84, 42);
  ctx.stroke();

  // Nametag text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Cinzel", "Segoe UI", sans-serif';
  const displayName = name ? (name.length > 14 ? name.substring(0, 13) + '…' : name) : 'Visitor';
  ctx.fillText(`${badgeEmoji} ${displayName}`, 256, 64);

  return new THREE.CanvasTexture(canvas);
}

function createSpeechBubbleTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');

  // White bubble with dark shadow
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 20, 20, 512 - 40, 120, 24);
  ctx.fill();

  // Bubble pointer arrow
  ctx.beginPath();
  ctx.moveTo(236, 140);
  ctx.lineTo(256, 175);
  ctx.lineTo(276, 140);
  ctx.closePath();
  ctx.fill();

  // Gold border
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 5;
  roundRect(ctx, 20, 20, 512 - 40, 120, 24);
  ctx.stroke();

  // Speech text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
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
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
  grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

export function create3DAvatar(name, gender = 'male', isLocal = false) {
  const isMale = gender === 'male' || gender === 'boy';
  const avatarGroup = new THREE.Group();

  // Materials
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbd0b0, roughness: 0.65 });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const hairColor = isMale ? 0x1e1b18 : 0x2b1d16;
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.8 });

  // Male: Blue Jacket | Female: Pink Gown
  const suitColor = isMale ? 0x2563eb : 0xec4899;
  const suitAccentColor = isMale ? 0x1d4ed8 : 0xdb2777;
  const suitMat = new THREE.MeshStandardMaterial({ color: suitColor, roughness: 0.5, metalness: 0.1 });
  const accentMat = new THREE.MeshStandardMaterial({ color: suitAccentColor, roughness: 0.45 });
  const trouserMat = new THREE.MeshStandardMaterial({ color: isMale ? 0x1e293b : 0xf472b6, roughness: 0.6 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.25 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });

  // 1. Torso & Upper Body Group
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.95;
  avatarGroup.add(torsoGroup);

  if (isMale) {
    // Male: Tailored Suit Jacket
    const jacket = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.58, 0.3), suitMat);
    torsoGroup.add(jacket);

    // White Shirt V-neck insert
    const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.31), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }));
    shirt.position.set(0, 0.16, 0.01);
    torsoGroup.add(shirt);

    // Black bowtie
    const bowtie = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.04), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    bowtie.position.set(0, 0.22, 0.17);
    torsoGroup.add(bowtie);
  } else {
    // Female: Rose Pink Designer Dress
    const bodice = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.42, 0.28), suitMat);
    torsoGroup.add(bodice);

    // Flared gown skirt
    const skirtGeo = new THREE.CylinderGeometry(0.24, 0.46, 0.48, 16);
    const skirt = new THREE.Mesh(skirtGeo, accentMat);
    skirt.position.y = -0.38;
    torsoGroup.add(skirt);

    // Gold necklace
    const necklace = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI), goldMat);
    necklace.position.set(0, 0.18, 0.12);
    necklace.rotation.x = Math.PI / 4;
    torsoGroup.add(necklace);
  }

  // 2. Head Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.46, 0);
  torsoGroup.add(headGroup);

  // Head sphere
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), skinMat);
  headGroup.add(head);

  // Eyes (front is along +Z in local coordinates)
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyeMat);
  eyeL.position.set(0.07, 0.02, 0.18);
  headGroup.add(eyeL);

  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyeMat);
  eyeR.position.set(-0.07, 0.02, 0.18);
  headGroup.add(eyeR);

  // Hair
  if (isMale) {
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.215, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.7), hairMat);
    hair.position.set(0, 0.04, -0.02);
    headGroup.add(hair);
  } else {
    // Female long hair
    const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.215, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.6), hairMat);
    hairTop.position.set(0, 0.04, -0.02);
    headGroup.add(hairTop);

    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.48, 0.14), hairMat);
    hairBack.position.set(0, -0.16, -0.14);
    headGroup.add(hairBack);
  }

  // 3. Floating 3D Nametag Billboard
  const nametagTex = createNametagTexture(name, gender);
  const nametagMat = new THREE.SpriteMaterial({ map: nametagTex, transparent: true });
  const nametagSprite = new THREE.Sprite(nametagMat);
  nametagSprite.position.set(0, 2.15, 0);
  nametagSprite.scale.set(1.6, 0.4, 1);
  avatarGroup.add(nametagSprite);

  // 4. Floating 3D Speech Bubble (Initially hidden)
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
    speechSprite.position.set(0, 2.65, 0);
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

  // 5. Limbs (Arms & Legs)
  // Left Arm
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(0.32, 0.2, 0);
  torsoGroup.add(leftArmGroup);
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.46, 10), suitMat);
  leftArm.position.y = -0.23;
  leftArmGroup.add(leftArm);
  const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), skinMat);
  leftHand.position.y = -0.48;
  leftArmGroup.add(leftHand);

  // Right Arm (Can wave!)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(-0.32, 0.2, 0);
  torsoGroup.add(rightArmGroup);
  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.46, 10), suitMat);
  rightArm.position.y = -0.23;
  rightArmGroup.add(rightArm);
  const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), skinMat);
  rightHand.position.y = -0.48;
  rightArmGroup.add(rightHand);

  // Left Leg
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(0.14, 0.65, 0);
  avatarGroup.add(leftLegGroup);
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.62, 10), trouserMat);
  leftLeg.position.y = -0.31;
  leftLegGroup.add(leftLeg);
  const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.08, 0.22), shoeMat);
  leftShoe.position.set(0, -0.62, 0.04);
  leftLegGroup.add(leftShoe);

  // Right Leg
  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(-0.14, 0.65, 0);
  avatarGroup.add(rightLegGroup);
  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.62, 10), trouserMat);
  rightLeg.position.y = -0.31;
  rightLegGroup.add(rightLeg);
  const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.08, 0.22), shoeMat);
  rightShoe.position.set(0, -0.62, 0.04);
  rightLegGroup.add(rightShoe);

  // 6. Soft Radial Floor Shadow
  const shadowTex = createRadialShadowTexture();
  const shadowGeo = new THREE.PlaneGeometry(1.2, 1.2);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.02;
  avatarGroup.add(shadowMesh);

  // Animation State
  let walkCycle = 0;
  let idleTimer = 0;
  let currentAction = null;
  let actionTimer = 0;
  let isSeated = false;

  function setSeated(sitting) {
    isSeated = sitting;
    if (sitting) {
      currentAction = null;
    }
  }

  function burstHearts(scene, targetPos = null) {
    const heartCanvas = document.createElement('canvas');
    heartCanvas.width = 128;
    heartCanvas.height = 128;
    const hctx = heartCanvas.getContext('2d');
    hctx.textAlign = 'center';
    hctx.textBaseline = 'middle';
    hctx.font = '72px serif';
    const emojis = ['💖', '💕', '❤️', '✨', '🥰'];
    const chosenEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    hctx.fillText(chosenEmoji, 64, 64);

    const heartTex = new THREE.CanvasTexture(heartCanvas);
    const count = 6;
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
    if (isSeated) {
      // Sitting pose on gallery bench
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, -Math.PI / 2 + 0.1, 0.15);
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, -Math.PI / 2 + 0.1, 0.15);
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.35, 0.15);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.35, 0.15);
      torsoGroup.position.y = THREE.MathUtils.lerp(torsoGroup.position.y, 0.58, 0.15);
      return;
    }

    if (isWalking) {
      walkCycle += delta * 10 * speed;
      // Natural humanoid opposite arm-leg swing
      leftLegGroup.rotation.x = Math.sin(walkCycle) * 0.62;
      rightLegGroup.rotation.x = -Math.sin(walkCycle) * 0.62;

      leftArmGroup.rotation.x = -Math.sin(walkCycle) * 0.52;
      if (currentAction !== 'wave') {
        rightArmGroup.rotation.x = Math.sin(walkCycle) * 0.52;
      }

      // Torso vertical bounce when steps touch floor
      torsoGroup.position.y = 0.95 + Math.abs(Math.sin(walkCycle * 2)) * 0.045;
    } else {
      // Return smoothly to idle stance
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, 0, 0.18);
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, 0, 0.18);
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0, 0.18);
      if (currentAction !== 'wave') {
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0, 0.18);
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0, 0.18);
      }

      idleTimer += delta;
      torsoGroup.position.y = 0.95 + Math.sin(idleTimer * 2.2) * 0.015;
    }

    // Action handling (Wave)
    if (currentAction === 'wave') {
      actionTimer += delta;
      rightArmGroup.rotation.x = Math.PI - 0.25;
      rightArmGroup.rotation.z = Math.sin(actionTimer * 14) * 0.35 + 0.25;
      if (actionTimer > 3.0) {
        currentAction = null;
        rightArmGroup.rotation.x = 0;
        rightArmGroup.rotation.z = 0;
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
    dispose
  };
}
