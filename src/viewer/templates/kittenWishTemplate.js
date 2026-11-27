// src/viewer/templates/kittenWishTemplate.js
// 3D Plush Kitten Letter, Proposal & Comedy Sorry Template
import * as THREE from 'three';
import confetti from 'canvas-confetti';

const STYLE_ID = 'kitten-wish-scoped-styles';

const BG_THEMES = {
  peach: {
    bg: 'radial-gradient(circle at 50% 38%, #fff7f0 0%, #ffe6d4 54%, #ffd0b5 100%)',
    shadowColor: 0xe6b89c,
    hemiGround: 0xffeadb,
    fillColor: 0xffd7ba,
    accentHeart: '#fb7185'
  },
  lavender: {
    bg: 'radial-gradient(circle at 50% 42%, #ffffff 0%, #fdf8ff 58%, #f3e8ff 100%)',
    shadowColor: 0xd8c8e8,
    hemiGround: 0xf3e8ff,
    fillColor: 0xfce7f3,
    accentHeart: '#a78bfa'
  },
  blush: {
    bg: 'radial-gradient(circle at 50% 40%, #fff9fb 0%, #ffe4ec 56%, #fecdd3 100%)',
    shadowColor: 0xe8bfd0,
    hemiGround: 0xffe4ec,
    fillColor: 0xfbcfe8,
    accentHeart: '#f43f5e'
  },
  mint: {
    bg: 'radial-gradient(circle at 50% 40%, #f7fffb 0%, #dcfce7 56%, #bbf7d0 100%)',
    shadowColor: 0xb7dec8,
    hemiGround: 0xdcfce7,
    fillColor: 0xd1fae5,
    accentHeart: '#10b981'
  }
};

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=Nunito:wght@600;700;800&family=Patrick+Hand&display=swap');

    .kw-root {
      position: relative;
      min-height: 100dvh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 16px 32px;
      box-sizing: border-box;
      font-family: 'Nunito', system-ui, sans-serif;
      color: #2d2638;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .kw-ambient-hearts {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }

    .kw-ambient-float {
      position: absolute;
      opacity: 0.45;
      animation: kwFloatSlow 5.5s ease-in-out infinite;
    }

    .kw-stage {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 580px;
      height: clamp(320px, 48vh, 420px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kw-canvas-mount {
      width: 100%;
      height: 100%;
      user-select: none;
    }

    .kw-canvas-mount.is-offering {
      cursor: pointer;
    }

    .kw-airmail-border {
      position: relative;
      padding: 5px;
      border-radius: 22px;
      background: repeating-linear-gradient(
        -45deg,
        #f26b8a 0px,
        #f26b8a 10px,
        #fffdf9 10px,
        #fffdf9 18px,
        #fb923c 18px,
        #fb923c 28px,
        #fffdf9 28px,
        #fffdf9 36px
      );
      box-shadow: 0 22px 50px -12px rgba(74, 55, 98, 0.2), 0 8px 20px -6px rgba(242, 107, 138, 0.14);
    }

    .kw-airmail-inner {
      background: #fffcf7;
      border-radius: 17px;
      padding: 26px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .kw-badge-purple {
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      margin-bottom: 12px;
      background: radial-gradient(circle at 32% 28%, #fda4af 0%, #f43f5e 60%, #e11d48 100%);
      box-shadow: 0 8px 18px rgba(244, 63, 94, 0.32), inset 0 2px 4px rgba(255, 255, 255, 0.55);
    }

    .kw-badge-pink {
      width: 48px;
      height: 48px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      margin-bottom: 16px;
      background: radial-gradient(circle at 32% 28%, #ff9ec0 0%, #f45b8c 58%, #de3d73 100%);
      box-shadow: 0 8px 18px rgba(244, 91, 140, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.55);
    }

    .kw-btn-purple {
      border: none;
      border-radius: 9999px;
      padding: 11px 26px;
      min-height: 44px;
      color: #fff;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      background: linear-gradient(180deg, #fb7185 0%, #e11d48 68%, #be123c 100%);
      box-shadow: 0 8px 18px rgba(225, 29, 72, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.45);
      transition: transform 0.16s ease, filter 0.16s ease;
    }
    .kw-btn-purple:hover { filter: brightness(1.06); transform: translateY(-1px); }

    .kw-btn-pink {
      border: none;
      border-radius: 9999px;
      padding: 10px 26px;
      min-height: 44px;
      color: #fff;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      background: linear-gradient(180deg, #ff7ea8 0%, #f44d82 60%, #e0376d 100%);
      box-shadow: 0 8px 18px rgba(244, 77, 130, 0.34), inset 0 2px 3px rgba(255, 255, 255, 0.5);
      transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.16s ease;
    }
    .kw-btn-pink:hover { filter: brightness(1.05); }

    .kw-btn-blue {
      border: none;
      border-radius: 9999px;
      padding: 10px 24px;
      min-height: 44px;
      color: #fff;
      font-weight: 700;
      font-size: 13.5px;
      cursor: pointer;
      background: linear-gradient(180deg, #94a3b8 0%, #64748b 65%, #475569 100%);
      box-shadow: 0 6px 14px rgba(71, 85, 105, 0.25), inset 0 2px 3px rgba(255, 255, 255, 0.4);
      transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.16s ease;
    }
    .kw-btn-blue:hover { filter: brightness(1.05); }

    .kw-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      max-width: 190px;
      margin: 14px 0 18px;
    }
    .kw-divider-line {
      height: 1px;
      flex: 1;
      background: rgba(203, 213, 225, 0.7);
    }

    .kw-card-wrap {
      position: relative;
      z-index: 20;
      width: 100%;
      max-width: 410px;
      animation: kwPopIn 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-question-below {
      position: relative;
      z-index: 20;
      width: 100%;
      max-width: 390px;
      margin-top: -10px;
      animation: kwPopIn 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-final-card {
      position: relative;
      z-index: 20;
      width: 100%;
      max-width: 360px;
      background: rgba(255, 255, 255, 0.96);
      border-radius: 24px;
      padding: 34px 26px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 24px 60px -15px rgba(244, 91, 140, 0.25);
      border: 1px solid #ffe4e6;
      animation: kwPopIn 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-coupon-pill {
      margin-top: 14px;
      padding: 8px 14px;
      border-radius: 12px;
      background: #fff7ed;
      border: 1.5px dashed #fb923c;
      color: #c2410c;
      font-size: 12px;
      font-weight: 800;
    }

    .kw-replay-btn {
      position: fixed;
      top: 14px;
      right: 14px;
      z-index: 30;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(251, 113, 133, 0.3);
      border-radius: 9999px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .kw-replay-btn:hover { color: #e11d48; }

    @keyframes kwPopIn {
      from { opacity: 0; transform: scale(0.92) translateY(14px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes kwFloatSlow {
      0%, 100% { transform: translateY(0px) rotate(-4deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }
  `;
  document.head.appendChild(style);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderKittenWishTemplate(container, data = {}, isMakerReview = false) {
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }
  ensureStyles();

  const isSorryMode = data.mode === 'sorry' || data.templateId === 'kitten_sorry';
  const bgKey = data.bgTheme || (isSorryMode ? 'peach' : 'peach');
  const bgTheme = BG_THEMES[bgKey] || BG_THEMES.peach;

  const recipient = data.recipientName || (isSorryMode ? 'Cutie' : 'Lily');
  const sender = data.senderName || (isSorryMode ? 'Your Certified Idiot' : 'Ethan');
  const letterTitle = data.letterTitle || (isSorryMode
    ? 'Official Petition to Stop Being Mad at Me'
    : 'A little note before I ask you something');
  const letterText = data.letterText || (isSorryMode
    ? `${recipient}, I sent this very small, very dramatic kitten because I messed up and my brain clearly went on vacation without telling me.\n\nExhibit A: I am 100% an idiot. Exhibit B: Nobody else will share their fries with you AND still look at you like you're literal magic.\n\nSo please accept this tiny kitten, my formal apology, and let me make you fall for me all over again.`
    : `${recipient}, I have been trying to find the right moment for weeks, so I asked a very small, very serious kitten to help me.\n\nYou make ordinary days feel like a good song on repeat. I laugh more since I met you, and I catch myself smiling at my phone like an idiot.\n\nSo here is the thing I have been too nervous to say out loud.`);
  const signOff = data.signOff || (isSorryMode ? 'Forever sorry (and yours)' : 'With love');
  const question = data.question || (isSorryMode
    ? 'Do you forgive me & let me make you fall for me again?'
    : 'Will you go on a date with me?');
  const yesBtnLabel = data.yesBtnLabel || (isSorryMode ? 'Fine, forgiven 💖' : 'Yes ♥');
  const noBtnLabel = data.noBtnLabel || (isSorryMode ? 'Still mad 😤' : 'No');
  const yesSubtitle = data.yesSubtitle || (isSorryMode
    ? 'Case closed! Preparing unlimited hugs, snacks, and making you fall for me all over again.'
    : 'Saturday at seven. I am already smiling.');
  const couponText = data.couponText || (isSorryMode ? '🎟️ REDEEM: 1 Free Hug + Your Favorite Treat (No Expiry)' : '');

  const paragraphs = letterText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sadLines = isSorryMode
    ? [
        'The kitten is literally on its knees. Look at those 4K HD tears...',
        'Okay wow, cold-hearted. The kitten is leaving you all my hoodies in its will...',
        'I already ordered your favorite food as emotional bribery. Please? 🍟',
        'The kitten refuses to move until you smile. Even the star clip is crying...'
      ]
    : [
        'The little kitten looks heartbroken...',
        'Please? Look at those tiny tears...',
        'The kitten dropped the letter just for you...',
        'Are you really sure? Even the star clip is drooping...'
      ];

  let stage = 'walking'; // walking | offering | letter | question | sad | celebrate | final
  let noCount = 0;

  container.innerHTML = `
    <div class="kw-root" style="background: ${bgTheme.bg};">
      <div class="kw-ambient-hearts" aria-hidden="true">
        <span class="kw-ambient-float" style="top:12%;left:10%;font-size:18px;color:${bgTheme.accentHeart};">♥</span>
        <span class="kw-ambient-float" style="top:20%;right:14%;font-size:14px;color:#fb923c;animation-delay:1s;">✦</span>
        <span class="kw-ambient-float" style="bottom:18%;left:15%;font-size:16px;color:${bgTheme.accentHeart};animation-delay:2s;">♥</span>
        <span class="kw-ambient-float" style="bottom:14%;right:12%;font-size:18px;color:#f59e0b;animation-delay:1.5s;">✨</span>
      </div>

      ${
        isMakerReview
          ? `<div style="position:fixed;top:12px;left:12px;z-index:40;background:rgba(255,255,255,0.92);border:1px solid #fed7aa;border-radius:999px;padding:5px 12px;font-size:11px;font-weight:700;color:#e11d48;">
               🐱 Previewing ${isSorryMode ? 'Comedy Sorry Kitten' : 'Kitten Wish'}
             </div>`
          : ''
      }
      <button type="button" class="kw-replay-btn" id="kwReplayBtn">↺ Replay</button>

      <div class="kw-stage" id="kwStage">
        <div class="kw-canvas-mount" id="kwCanvasMount"></div>
      </div>

      <div id="kwCardSlot" style="width:100%;display:flex;justify-content:center;"></div>
    </div>
  `;

  const stageEl = container.querySelector('#kwStage');
  const canvasMount = container.querySelector('#kwCanvasMount');
  const cardSlot = container.querySelector('#kwCardSlot');
  const replayBtn = container.querySelector('#kwReplayBtn');

  // --- Three.js Scene Setup (following threejs-fundamentals) ---
  const width = canvasMount.clientWidth || 540;
  const height = canvasMount.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
  camera.position.set(0, 1.15, 6.1);
  camera.lookAt(0, 0.68, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvasMount.appendChild(renderer.domElement);

  // Studio 4-point lighting (Hemisphere + Key + Warm Fill + Rim)
  const hemiLight = new THREE.HemisphereLight(0xffffff, bgTheme.hemiGround, 1.35);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xfffaf5, 1.2);
  keyLight.position.set(3.5, 5.5, 4.5);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(bgTheme.fillColor, 0.72);
  fillLight.position.set(-4, 2.5, 3);
  scene.add(fillLight);
  const rimLight = new THREE.DirectionalLight(0xe0e7ff, 0.55);
  rimLight.position.set(0, 3, -4);
  scene.add(rimLight);

  const shadowMat = new THREE.MeshBasicMaterial({ color: bgTheme.shadowColor, transparent: true, opacity: 0.36 });
  const groundShadow = new THREE.Mesh(new THREE.CircleGeometry(1.15, 36), shadowMat);
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.scale.set(1.1, 0.45, 1);
  groundShadow.position.set(0, -0.58, 0);
  scene.add(groundShadow);

  const furMat = new THREE.MeshStandardMaterial({ color: 0xfcfafb, roughness: 0.86, metalness: 0.02 });
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xf9b8d0, roughness: 0.8 });
  const pawPinkMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.82 });
  const starClipMat = new THREE.MeshStandardMaterial({ color: isSorryMode ? 0xfbbf24 : 0xc29ef8, roughness: 0.45 });
  const bowMat = new THREE.MeshStandardMaterial({ color: isSorryMode ? 0xfb7185 : 0x99dec5, roughness: 0.68 });
  const bellMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.28, metalness: 0.55 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x18151d, roughness: 0.08, metalness: 0.15 });
  const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xfda4af, transparent: true, opacity: 0.72 });
  const tearMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.1, transparent: true, opacity: 0.9 });
  const darkLineMat = new THREE.MeshStandardMaterial({ color: 0x3b2f3d, roughness: 0.5 });

  const kitty = new THREE.Group();
  scene.add(kitty);

  // Plush Torso
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 24), furMat);
  body.scale.set(1.0, 1.05, 0.92);
  body.position.set(0, 0.22, 0);
  kitty.add(body);

  const makeLeg = (xPos) => {
    const g = new THREE.Group();
    g.position.set(xPos, -0.26, 0.05);
    const u = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.22, 10, 14), furMat);
    u.position.y = -0.05;
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 14), pawPinkMat);
    f.scale.set(1.05, 0.72, 1.25);
    f.position.set(0, -0.22, 0.06);
    g.add(u, f);
    return g;
  };
  const leftLeg = makeLeg(-0.27);
  const rightLeg = makeLeg(0.27);
  kitty.add(leftLeg, rightLeg);

  const makeArm = (xPos) => {
    const g = new THREE.Group();
    g.position.set(xPos, 0.44, 0.12);
    const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.28, 10, 14), furMat);
    a.position.y = -0.14;
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 14), pawPinkMat);
    p.position.y = -0.3;
    g.add(a, p);
    return g;
  };
  const leftArm = makeArm(-0.56);
  const rightArm = makeArm(0.56);
  kitty.add(leftArm, rightArm);

  // Curved Tail
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.02, -0.45),
    new THREE.Vector3(-0.32, 0.08, -0.68),
    new THREE.Vector3(-0.55, 0.28, -0.62),
    new THREE.Vector3(-0.62, 0.48, -0.48),
  ]);
  const tailGroup = new THREE.Group();
  tailGroup.add(new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 18, 0.1, 12, false), furMat));
  const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.105, 14, 12), furMat);
  tailTip.position.set(-0.62, 0.48, -0.48);
  tailGroup.add(tailTip);
  kitty.add(tailGroup);

  // Collar + Bow + Golden Bell
  const bowGroup = new THREE.Group();
  bowGroup.position.set(0, 0.62, 0.42);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.072, 10, 28), bowMat);
  collar.rotation.x = Math.PI / 2 + 0.12;
  collar.position.set(0, 0.08, -0.38);
  const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), bowMat);
  bowKnot.scale.set(1.1, 0.9, 0.8);
  const bowLeft = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), bowMat);
  bowLeft.scale.set(1.25, 0.85, 0.55);
  bowLeft.position.set(-0.19, 0.02, 0.02);
  bowLeft.rotation.z = 0.25;
  const bowRight = bowLeft.clone();
  bowRight.position.set(0.19, 0.02, 0.02);
  bowRight.rotation.z = -0.25;
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 12), bellMat);
  bell.position.set(0, -0.1, 0.06);
  bowGroup.add(collar, bowKnot, bowLeft, bowRight, bell);
  kitty.add(bowGroup);

  // Head + Cheeks + Ears + Whiskers
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.24, 0.06);
  kitty.add(headGroup);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 24), furMat);
  head.scale.set(1.18, 0.96, 1.02);
  headGroup.add(head);

  const makeEar = (side) => {
    const g = new THREE.Group();
    g.position.set(side * 0.55, 0.58, -0.02);
    g.rotation.z = -side * 0.24;
    const outer = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.52, 22), furMat);
    outer.scale.set(1.0, 1.0, 0.68);
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.34, 18), innerEarMat);
    inner.scale.set(1.0, 1.0, 0.45);
    inner.position.set(0, -0.03, 0.08);
    g.add(outer, inner);
    return g;
  };
  const leftEar = makeEar(-1);
  const rightEar = makeEar(1);
  headGroup.add(leftEar, rightEar);

  // Whiskers (3 per side for authentic kitten silhouette)
  const makeWhisker = (side, yOff, rotZ) => {
    const w = new THREE.Mesh(new THREE.CapsuleGeometry(0.011, 0.26, 4, 8), darkLineMat);
    w.position.set(side * 0.72, yOff, 0.52);
    w.rotation.z = Math.PI / 2 + rotZ;
    w.rotation.y = side * 0.25;
    return w;
  };
  [-0.08, -0.15, -0.22].forEach((yOff, i) => {
    headGroup.add(makeWhisker(-1, yOff, (i - 1) * 0.14));
    headGroup.add(makeWhisker(1, yOff, -(i - 1) * 0.14));
  });

  // Star Hair Clip
  const starShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 0.16 : 0.075;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();
  const starClip = new THREE.Mesh(
    new THREE.ExtrudeGeometry(starShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }),
    starClipMat
  );
  starClip.position.set(0.76, 0.44, 0.22);
  starClip.rotation.z = -0.3;
  headGroup.add(starClip);

  // Expressive Eyes with Blink + Sad Eyelid + Tears
  const makeEye = (xPos) => {
    const g = new THREE.Group();
    g.position.set(xPos, -0.02, 0.73);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.125, 20, 16), eyeMat);
    ball.scale.set(0.95, 1.12, 0.55);
    const sp1 = new THREE.Mesh(new THREE.SphereGeometry(0.036, 10, 8), sparkleMat);
    sp1.position.set(-0.035, 0.045, 0.065);
    const sp2 = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), sparkleMat);
    sp2.position.set(0.035, -0.03, 0.065);
    const spHappy = new THREE.Mesh(new THREE.OctahedronGeometry(0.03, 0), sparkleMat);
    spHappy.position.set(0.03, 0.05, 0.068);
    spHappy.visible = false;
    const eyelid = new THREE.Mesh(new THREE.SphereGeometry(0.135, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), furMat);
    eyelid.scale.set(1.02, 1.0, 0.65);
    eyelid.rotation.z = xPos < 0 ? 0.26 : -0.26;
    eyelid.visible = false;
    const tear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 10), tearMat);
    tear.scale.set(1.3, 0.75, 0.6);
    tear.position.set(xPos < 0 ? -0.04 : 0.04, -0.11, 0.05);
    tear.visible = false;
    g.add(ball, sp1, sp2, spHappy, eyelid, tear);
    return { g, spHappy, eyelid, tear };
  };
  const leftEye = makeEye(-0.34);
  const rightEye = makeEye(0.34);
  headGroup.add(leftEye.g, rightEye.g);

  const leftBrow = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.14, 6, 10), darkLineMat);
  leftBrow.position.set(-0.34, 0.18, 0.75);
  leftBrow.rotation.z = 1.18;
  leftBrow.visible = false;
  const rightBrow = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.14, 6, 10), darkLineMat);
  rightBrow.position.set(0.34, 0.18, 0.75);
  rightBrow.rotation.z = -1.18;
  rightBrow.visible = false;
  headGroup.add(leftBrow, rightBrow);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 12), noseMat);
  nose.scale.set(1.25, 0.85, 0.7);
  nose.position.set(0, -0.11, 0.79);
  headGroup.add(nose);

  const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.11, 18), blushMat);
  blushL.scale.set(1.35, 0.8, 1);
  blushL.position.set(-0.5, -0.16, 0.67);
  blushL.rotation.y = -0.45;
  const blushR = blushL.clone();
  blushR.position.set(0.5, -0.16, 0.67);
  blushR.rotation.y = 0.45;
  headGroup.add(blushL, blushR);

  const happyMouth = new THREE.Group();
  happyMouth.position.set(0, -0.24, 0.76);
  const mouthInner = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 12, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({ color: 0x6b213a, roughness: 0.6 })
  );
  mouthInner.scale.set(1.1, 1.0, 0.5);
  const tongue = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 })
  );
  tongue.scale.set(1.0, 0.6, 0.6);
  tongue.position.set(0, -0.04, 0.025);
  happyMouth.add(mouthInner, tongue);
  happyMouth.visible = false;
  headGroup.add(happyMouth);

  const sadMouth = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 10, 18, Math.PI), darkLineMat);
  sadMouth.position.set(0, -0.27, 0.77);
  sadMouth.visible = false;
  headGroup.add(sadMouth);

  // Envelope
  const envelopeGroup = new THREE.Group();
  const envBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.5, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xfff8e8, roughness: 0.65 })
  );
  const flapMat = new THREE.MeshStandardMaterial({ color: 0xeedfc4, roughness: 0.7 });
  const flapL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.09), flapMat);
  flapL.position.set(-0.17, 0.08, 0.005);
  flapL.rotation.z = -0.52;
  const flapR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.09), flapMat);
  flapR.position.set(0.17, 0.08, 0.005);
  flapR.rotation.z = 0.52;

  const hShape = new THREE.Shape();
  hShape.moveTo(0, -0.08);
  hShape.bezierCurveTo(0.09, -0.02, 0.11, 0.08, 0.05, 0.1);
  hShape.bezierCurveTo(0.015, 0.11, 0, 0.07, 0, 0.05);
  hShape.bezierCurveTo(0, 0.07, -0.015, 0.11, -0.05, 0.1);
  hShape.bezierCurveTo(-0.11, 0.08, -0.09, -0.02, 0, -0.08);
  const heartSeal = new THREE.Mesh(
    new THREE.ExtrudeGeometry(hShape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 2 }),
    new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 })
  );
  heartSeal.position.set(0, -0.02, 0.045);
  const envRibbon = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16), starClipMat);
  envRibbon.position.set(0.11, -0.01, 0.055);
  envelopeGroup.add(envBody, flapL, flapR, heartSeal, envRibbon);
  envelopeGroup.position.set(0, 0.25, 0.62);
  kitty.add(envelopeGroup);

  function renderUI() {
    const showStage = ['walking', 'offering', 'question', 'sad', 'celebrate'].includes(stage);
    stageEl.style.display = showStage ? 'flex' : 'none';
    canvasMount.classList.toggle('is-offering', stage === 'offering');
    cardSlot.innerHTML = '';

    if (stage === 'offering') {
      cardSlot.innerHTML = `
        <button type="button" id="kwOpenLetterBtn" class="kw-btn-purple" style="margin-top:4px;">
          ${isSorryMode ? 'Open Emergency Apology 💌' : 'Tap to open your letter ♥'}
        </button>
      `;
      cardSlot.querySelector('#kwOpenLetterBtn')?.addEventListener('click', () => {
        stage = 'letter';
        renderUI();
      });
    } else if (stage === 'letter') {
      cardSlot.innerHTML = `
        <div class="kw-card-wrap">
          <div class="kw-airmail-border">
            <div class="kw-airmail-inner">
              <div class="kw-badge-purple">${isSorryMode ? '🥺' : '♥'}</div>
              <p style="font-family:'Caveat',cursive;font-size:22px;color:#e11d48;margin:0 0 2px;">for ${esc(recipient)},</p>
              <h2 style="font-size:21px;font-weight:800;color:#1e293b;margin:0 0 16px;line-height:1.25;">${esc(letterTitle)}</h2>
              <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;line-height:1.62;color:#334155;">
                ${paragraphs.map((p) => `<p style="margin:0 0 12px;">${esc(p)}</p>`).join('')}
              </div>
              <p style="font-family:'Caveat',cursive;font-size:22px;color:#fb7185;margin:4px 0 0;">${esc(signOff)}, ${esc(sender)}</p>
              <div class="kw-divider"><span class="kw-divider-line"></span><span style="color:#f43f5e;font-size:10px;">♥</span><span class="kw-divider-line"></span></div>
              <button type="button" id="kwNextBtn" class="kw-btn-purple">Next ♡</button>
            </div>
          </div>
        </div>
      `;
      cardSlot.querySelector('#kwNextBtn')?.addEventListener('click', () => {
        stage = 'question';
        renderUI();
      });
    } else if (stage === 'question') {
      const yesScale = Math.min(1.28, 1 + noCount * 0.08);
      const noScale = Math.max(0.75, 1 - noCount * 0.07);
      cardSlot.innerHTML = `
        <div class="kw-question-below">
          <div class="kw-airmail-border">
            <div class="kw-airmail-inner" style="padding:20px 18px;">
              <div class="kw-badge-purple" style="width:36px;height:36px;font-size:14px;">${isSorryMode ? '🙏' : '♥'}</div>
              <h2 style="font-family:'Patrick Hand','Nunito',sans-serif;font-size:21px;font-weight:700;color:#1e293b;margin:0 0 6px;line-height:1.25;">${esc(question)}</h2>
              <div class="kw-divider" style="margin:10px 0 14px;"><span class="kw-divider-line"></span><span style="color:#f43f5e;font-size:10px;">♥</span><span class="kw-divider-line"></span></div>
              <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button type="button" id="kwYesBtn" class="kw-btn-pink" style="transform:scale(${yesScale});">${esc(yesBtnLabel)}</button>
                <button type="button" id="kwNoBtn" class="kw-btn-blue" style="transform:scale(${noScale});">${esc(noBtnLabel)}</button>
              </div>
            </div>
          </div>
        </div>
      `;
      cardSlot.querySelector('#kwYesBtn')?.addEventListener('click', () => {
        stage = 'celebrate';
        renderUI();
        try {
          confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 }, colors: ['#f43f5e', '#fb923c', '#fbbf24', '#ffd6e7', '#fda4af'] });
        } catch (e) {}
        setTimeout(() => {
          if (stage === 'celebrate') {
            stage = 'final';
            renderUI();
          }
        }, 2300);
      });
      cardSlot.querySelector('#kwNoBtn')?.addEventListener('click', () => {
        noCount += 1;
        stage = 'sad';
        renderUI();
      });
    } else if (stage === 'sad') {
      const msg = sadLines[Math.min(noCount - 1, sadLines.length - 1)];
      cardSlot.innerHTML = `
        <div style="text-align:center;max-width:340px;z-index:20;">
          <p style="font-size:14px;font-weight:700;font-style:italic;color:#9f1239;margin:0 0 12px;">${esc(msg)}</p>
          <button type="button" id="kwAskAgainBtn" class="kw-btn-purple">${isSorryMode ? 'Okay, ask me again 🥺' : 'Ask me again ♡'}</button>
        </div>
      `;
      cardSlot.querySelector('#kwAskAgainBtn')?.addEventListener('click', () => {
        stage = 'question';
        renderUI();
      });
    } else if (stage === 'celebrate') {
      cardSlot.innerHTML = `
        <div style="z-index:20;">
          <span style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:999px;background:#fff1f2;border:1px solid #fecdd3;color:#e11d48;font-size:13.5px;font-weight:800;">
            ${isSorryMode ? 'Yay!! Forgiven & doing happy backflips ♥' : 'Yay!! Happy kitten noises ♥'}
          </span>
        </div>
      `;
    } else if (stage === 'final') {
      cardSlot.innerHTML = `
        <div class="kw-final-card">
          <div class="kw-badge-pink">${isSorryMode ? '💕' : '♥'}</div>
          <h2 style="font-size:23px;font-weight:800;color:#1e293b;margin:0 0 8px;">
            ${isSorryMode ? `Case Closed: ${esc(recipient)} forgave you!` : `${esc(recipient)} said yes.`}
          </h2>
          <p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;line-height:1.52;color:#475569;margin:0 0 14px;max-width:270px;">${esc(yesSubtitle)}</p>
          ${couponText ? `<div class="kw-coupon-pill">${esc(couponText)}</div>` : ''}
          <p style="font-family:'Caveat',cursive;font-size:22px;color:#e11d48;margin:14px 0 0;">See you soon, ${esc(recipient)} ♡</p>
        </div>
      `;
    }
  }

  let walkX = -2.6;
  let walkDone = false;
  const clock = new THREE.Clock();
  let frameId;

  const onCanvasPointerDown = () => {
    if (stage === 'offering') {
      stage = 'letter';
      renderUI();
    }
  };
  renderer.domElement.addEventListener('pointerdown', onCanvasPointerDown);

  replayBtn.addEventListener('click', () => {
    noCount = 0;
    walkX = -2.6;
    walkDone = false;
    stage = 'walking';
    renderUI();
  });

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();

    const isSad = stage === 'sad';
    const isHappy = stage === 'celebrate';
    // Natural blink every ~3.6 seconds when not sad
    const isBlinking = !isSad && (t % 3.6) > 3.46;

    leftBrow.visible = isSad;
    rightBrow.visible = isSad;
    leftEye.eyelid.visible = isSad || isBlinking;
    rightEye.eyelid.visible = isSad || isBlinking;
    leftEye.tear.visible = isSad;
    rightEye.tear.visible = isSad;
    sadMouth.visible = isSad;

    leftEye.spHappy.visible = isHappy;
    rightEye.spHappy.visible = isHappy;
    happyMouth.visible = isHappy;

    if (stage === 'walking') {
      walkX = Math.min(0, walkX + dt * 1.5);
      kitty.position.x = walkX;
      kitty.rotation.y = walkX < -0.05 ? 0.32 : THREE.MathUtils.lerp(kitty.rotation.y, 0, 0.12);
      const stride = walkX < -0.02 ? Math.sin(t * 10) : 0;
      leftLeg.rotation.x = stride * 0.45;
      rightLeg.rotation.x = -stride * 0.45;
      leftArm.rotation.x = -0.35;
      rightArm.rotation.x = -0.35;
      kitty.position.y = Math.abs(stride) * 0.08;
      headGroup.rotation.z = Math.sin(t * 5) * 0.03;
      leftEar.rotation.z = 0.24;
      rightEar.rotation.z = -0.24;
      tailGroup.rotation.y = Math.sin(t * 6) * 0.25;
      envelopeGroup.position.set(0, 0.26 + Math.sin(t * 4) * 0.02, 0.64);
      envelopeGroup.rotation.set(0, 0, 0);
      envelopeGroup.scale.setScalar(1);

      if (walkX >= -0.01 && !walkDone) {
        walkDone = true;
        stage = 'offering';
        renderUI();
      }
    } else if (stage === 'offering') {
      kitty.position.x = THREE.MathUtils.lerp(kitty.position.x, 0, 0.1);
      kitty.rotation.y = THREE.MathUtils.lerp(kitty.rotation.y, 0, 0.1);
      kitty.position.y = Math.sin(t * 2.5) * 0.03;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      leftArm.rotation.x = -0.55;
      rightArm.rotation.x = -0.55;
      headGroup.rotation.x = Math.sin(t * 2) * 0.03;
      headGroup.rotation.z = Math.sin(t * 1.5) * 0.04;
      leftEar.rotation.z = 0.24;
      rightEar.rotation.z = -0.24;
      tailGroup.rotation.y = Math.sin(t * 4.5) * 0.25;
      envelopeGroup.position.set(0, 0.28 + Math.sin(t * 3.5) * 0.035, 0.72);
      envelopeGroup.rotation.x = -0.15;
      envelopeGroup.scale.setScalar(1.06 + Math.sin(t * 3.5) * 0.03);
    } else if (stage === 'question') {
      kitty.position.x = 0;
      kitty.position.y = 0.02 + Math.sin(t * 2.2) * 0.025;
      kitty.rotation.y = Math.sin(t * 1.1) * 0.05;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      leftArm.rotation.x = -0.2;
      rightArm.rotation.x = -0.2;
      headGroup.rotation.x = 0;
      headGroup.rotation.z = Math.sin(t * 1.5) * 0.03;
      leftEar.rotation.z = 0.24;
      rightEar.rotation.z = -0.24;
      envelopeGroup.scale.setScalar(0.001);
    } else if (stage === 'sad') {
      const droop = Math.min(0.28, 0.12 + noCount * 0.04);
      kitty.position.x = 0;
      kitty.position.y = -0.04 + Math.sin(t * 5) * 0.008;
      kitty.rotation.y = 0;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      leftArm.rotation.x = 0.08;
      rightArm.rotation.x = 0.08;
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, droop, 0.1);
      headGroup.rotation.z = Math.sin(t * 2.4) * 0.04;
      // Droop ears outward when sad
      leftEar.rotation.z = 0.48;
      rightEar.rotation.z = -0.48;
      tailGroup.rotation.y = 0;
      envelopeGroup.scale.setScalar(0.95);
      envelopeGroup.position.set(0, -0.49, 0.56);
      envelopeGroup.rotation.set(-Math.PI / 2 + 0.12, 0, 0.08);
    } else if (stage === 'celebrate') {
      kitty.position.x = 0;
      kitty.position.y = Math.abs(Math.sin(t * 6.5)) * 0.22;
      kitty.rotation.y = Math.sin(t * 3) * 0.12;
      leftArm.rotation.x = -0.65 + Math.sin(t * 8) * 0.15;
      rightArm.rotation.x = -0.65 - Math.sin(t * 8) * 0.15;
      leftLeg.rotation.x = Math.sin(t * 6.5) * 0.18;
      rightLeg.rotation.x = -Math.sin(t * 6.5) * 0.18;
      headGroup.rotation.x = -0.05;
      headGroup.rotation.z = Math.sin(t * 4) * 0.06;
      leftEar.rotation.z = 0.24;
      rightEar.rotation.z = -0.24;
      tailGroup.rotation.y = Math.sin(t * 10) * 0.4;
      envelopeGroup.scale.setScalar(1);
      envelopeGroup.position.set(0, 0.28, 0.68);
      envelopeGroup.rotation.set(-0.08, 0, Math.sin(t * 6) * 0.05);
    }

    groundShadow.position.x = kitty.position.x;
    const sc = 1 - kitty.position.y * 0.35;
    groundShadow.scale.set(1.1 * sc, 0.45 * sc, 1);

    renderer.render(scene, camera);
  };
  animate();
  renderUI();

  const onResize = () => {
    const w = canvasMount.clientWidth || 540;
    const h = canvasMount.clientHeight || 380;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  container._cleanup = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', onResize);
    renderer.domElement.removeEventListener('pointerdown', onCanvasPointerDown);
    renderer.dispose();
    if (renderer.domElement.parentNode === canvasMount) {
      canvasMount.removeChild(renderer.domElement);
    }
  };
}
