// src/viewer/templates/kittenWishTemplate.js - 3D Plush Kitten Letter & Proposal Template
import * as THREE from 'three';
import confetti from 'canvas-confetti';

const STYLE_ID = 'kitten-wish-scoped-styles';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=Nunito:wght@600;700;800&family=Patrick+Hand&display=swap');

    .kw-root {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      box-sizing: border-box;
      background: radial-gradient(circle at 50% 42%, #ffffff 0%, #fdf8ff 58%, #f8f0fc 100%);
      font-family: 'Nunito', system-ui, sans-serif;
      color: #2d2638;
      overflow: hidden;
    }

    .kw-stage {
      position: relative;
      width: 100%;
      max-width: 620px;
      height: 410px;
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
      border-radius: 20px;
      background: repeating-linear-gradient(
        -45deg,
        #f26b8a 0px,
        #f26b8a 10px,
        #fffdf9 10px,
        #fffdf9 18px,
        #6eb5ff 18px,
        #6eb5ff 28px,
        #fffdf9 28px,
        #fffdf9 36px
      );
      box-shadow: 0 22px 50px -12px rgba(74, 55, 98, 0.16), 0 8px 20px -6px rgba(242, 107, 138, 0.1);
    }

    .kw-airmail-inner {
      background: #fffcf7;
      border-radius: 16px;
      padding: 28px 26px;
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
      background: radial-gradient(circle at 32% 28%, #b3a4ff 0%, #8675f4 58%, #6d5ce6 100%);
      box-shadow: 0 8px 18px rgba(118, 99, 238, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.55);
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
      padding: 10px 28px;
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      background: linear-gradient(180deg, #a799ff 0%, #8270f3 60%, #6d5be6 100%);
      box-shadow: 0 8px 18px rgba(118, 99, 238, 0.32), inset 0 2px 3px rgba(255, 255, 255, 0.5);
      transition: transform 0.16s ease, filter 0.16s ease;
    }
    .kw-btn-purple:hover { filter: brightness(1.05); transform: translateY(-1px); }

    .kw-btn-pink {
      border: none;
      border-radius: 9999px;
      padding: 9px 28px;
      color: #fff;
      font-weight: 700;
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
      padding: 9px 28px;
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      background: linear-gradient(180deg, #8cc7ff 0%, #5ca6f7 60%, #448ee6 100%);
      box-shadow: 0 8px 18px rgba(92, 166, 247, 0.32), inset 0 2px 3px rgba(255, 255, 255, 0.55);
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
      width: 100%;
      max-width: 385px;
      z-index: 20;
      animation: kwPopIn 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-question-overlay {
      position: absolute;
      z-index: 20;
      width: 90%;
      max-width: 350px;
      margin-top: 38px;
      animation: kwPopIn 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-final-card {
      width: 100%;
      max-width: 325px;
      background: rgba(255, 255, 255, 0.96);
      border-radius: 24px;
      padding: 36px 26px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 24px 60px -15px rgba(244, 91, 140, 0.22);
      border: 1px solid #fdf2f8;
      animation: kwPopIn 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .kw-replay-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 30;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid #ede9fe;
      border-radius: 9999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .kw-replay-btn:hover { color: #6d5be6; }

    @keyframes kwPopIn {
      from { opacity: 0; transform: scale(0.9) translateY(14px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
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

  const recipient = data.recipientName || 'Lily';
  const sender = data.senderName || 'Ethan';
  const letterTitle = data.letterTitle || 'A little note before I ask you something';
  const letterText =
    data.letterText ||
    `${recipient}, I have been trying to find the right moment for weeks, so I asked a very small, very serious kitten to help me.\n\nYou make ordinary days feel like a good song on repeat. I laugh more since I met you, I notice the sky more, and I catch myself smiling at my phone like an idiot.\n\nSo here is the thing I have been too nervous to say out loud.`;
  const signOff = data.signOff || 'With love';
  const question = data.question || 'Will you go on a date with me?';
  const yesSubtitle = data.yesSubtitle || 'Saturday at seven. I am already smiling.';

  const paragraphs = letterText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sadLines = [
    'The little kitten looks heartbroken...',
    'Please? Look at those tiny tears...',
    'The kitten dropped the letter just for you...',
    'Are you really sure? Even the star clip is drooping...',
  ];

  let stage = 'walking'; // walking | offering | letter | question | sad | celebrate | final
  let noCount = 0;

  container.innerHTML = `
    <div class="kw-root">
      ${
        isMakerReview
          ? `<div style="position:fixed;top:12px;left:12px;z-index:40;background:rgba(255,255,255,0.92);border:1px solid #ede9fe;border-radius:999px;padding:5px 12px;font-size:11px;font-weight:700;color:#6d5be6;">
               🐱 Previewing Kitten Wish
             </div>`
          : ''
      }
      <button type="button" class="kw-replay-btn" id="kwReplayBtn">↺ Replay</button>

      <div class="kw-stage" id="kwStage">
        <div class="kw-canvas-mount" id="kwCanvasMount"></div>
        <div id="kwStageOverlay"></div>
      </div>

      <div id="kwCardSlot"></div>
    </div>
  `;

  const stageEl = container.querySelector('#kwStage');
  const canvasMount = container.querySelector('#kwCanvasMount');
  const overlaySlot = container.querySelector('#kwStageOverlay');
  const cardSlot = container.querySelector('#kwCardSlot');
  const replayBtn = container.querySelector('#kwReplayBtn');

  // --- Three.js Scene Setup ---
  const width = canvasMount.clientWidth || 540;
  const height = canvasMount.clientHeight || 410;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(0, 1.15, 6.2);
  camera.lookAt(0, 0.72, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvasMount.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf3e8ff, 1.35);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xfffaf5, 1.15);
  keyLight.position.set(3.5, 5.5, 4.5);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xfce7f3, 0.65);
  fillLight.position.set(-4, 2.5, 3);
  scene.add(fillLight);

  const shadowMat = new THREE.MeshBasicMaterial({ color: 0xd8c8e8, transparent: true, opacity: 0.34 });
  const groundShadow = new THREE.Mesh(new THREE.CircleGeometry(1.15, 36), shadowMat);
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.scale.set(1.1, 0.45, 1);
  groundShadow.position.set(0, -0.58, 0);
  scene.add(groundShadow);

  const furMat = new THREE.MeshStandardMaterial({ color: 0xfcfafb, roughness: 0.88, metalness: 0.02 });
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xf4c7e4, roughness: 0.82 });
  const pawPinkMat = new THREE.MeshStandardMaterial({ color: 0xe6c1ea, roughness: 0.84 });
  const starClipMat = new THREE.MeshStandardMaterial({ color: 0xc29ef8, roughness: 0.55 });
  const mintBowMat = new THREE.MeshStandardMaterial({ color: 0x99dec5, roughness: 0.72 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x18151d, roughness: 0.08, metalness: 0.15 });
  const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xf9a4c6, roughness: 0.55 });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xf9b8d0, transparent: true, opacity: 0.65 });
  const tearMat = new THREE.MeshStandardMaterial({ color: 0xbbe6ff, roughness: 0.1, transparent: true, opacity: 0.88 });
  const darkLineMat = new THREE.MeshStandardMaterial({ color: 0x2c2433, roughness: 0.5 });

  const kitty = new THREE.Group();
  scene.add(kitty);

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.62, 30, 22), furMat);
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

  const bowGroup = new THREE.Group();
  bowGroup.position.set(0, 0.62, 0.42);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.075, 10, 28), mintBowMat);
  collar.rotation.x = Math.PI / 2 + 0.12;
  collar.position.set(0, 0.08, -0.38);
  const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), mintBowMat);
  bowKnot.scale.set(1.1, 0.9, 0.8);
  const bowLeft = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), mintBowMat);
  bowLeft.scale.set(1.25, 0.85, 0.55);
  bowLeft.position.set(-0.19, 0.02, 0.02);
  bowLeft.rotation.z = 0.25;
  const bowRight = bowLeft.clone();
  bowRight.position.set(0.19, 0.02, 0.02);
  bowRight.rotation.z = -0.25;
  const ribL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.04), mintBowMat);
  ribL.position.set(-0.08, -0.18, 0.01);
  ribL.rotation.z = -0.22;
  const ribR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.04), mintBowMat);
  ribR.position.set(0.08, -0.18, 0.01);
  ribR.rotation.z = 0.22;
  bowGroup.add(collar, bowKnot, bowLeft, bowRight, ribL, ribR);
  kitty.add(bowGroup);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.24, 0.06);
  kitty.add(headGroup);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 24), furMat);
  head.scale.set(1.16, 0.96, 1.02);
  headGroup.add(head);

  const makeEar = (side) => {
    const g = new THREE.Group();
    g.position.set(side * 0.54, 0.6, -0.02);
    g.rotation.z = -side * 0.24;
    const outer = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.52, 20), furMat);
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

  const makeEye = (xPos) => {
    const g = new THREE.Group();
    g.position.set(xPos, -0.02, 0.72);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.125, 20, 16), eyeMat);
    ball.scale.set(0.95, 1.12, 0.55);
    const sp1 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), sparkleMat);
    sp1.position.set(-0.035, 0.045, 0.065);
    const sp2 = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), sparkleMat);
    sp2.position.set(0.035, -0.03, 0.065);
    const spHappy = new THREE.Mesh(new THREE.OctahedronGeometry(0.028, 0), sparkleMat);
    spHappy.position.set(0.03, 0.05, 0.068);
    spHappy.visible = false;
    const eyelid = new THREE.Mesh(new THREE.SphereGeometry(0.135, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), furMat);
    eyelid.scale.set(1.02, 1.0, 0.65);
    eyelid.rotation.z = xPos < 0 ? 0.26 : -0.26;
    eyelid.visible = false;
    const tear = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 10), tearMat);
    tear.scale.set(1.3, 0.7, 0.6);
    tear.position.set(xPos < 0 ? -0.04 : 0.04, -0.11, 0.05);
    tear.visible = false;
    g.add(ball, sp1, sp2, spHappy, eyelid, tear);
    return { g, spHappy, eyelid, tear };
  };
  const leftEye = makeEye(-0.34);
  const rightEye = makeEye(0.34);
  headGroup.add(leftEye.g, rightEye.g);

  const leftBrow = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.14, 6, 10), darkLineMat);
  leftBrow.position.set(-0.34, 0.18, 0.74);
  leftBrow.rotation.z = 1.18;
  leftBrow.visible = false;
  const rightBrow = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.14, 6, 10), darkLineMat);
  rightBrow.position.set(0.34, 0.18, 0.74);
  rightBrow.rotation.z = -1.18;
  rightBrow.visible = false;
  headGroup.add(leftBrow, rightBrow);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 12), noseMat);
  nose.scale.set(1.25, 0.85, 0.7);
  nose.position.set(0, -0.11, 0.78);
  headGroup.add(nose);

  const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.11, 18), blushMat);
  blushL.scale.set(1.35, 0.8, 1);
  blushL.position.set(-0.5, -0.16, 0.66);
  blushL.rotation.y = -0.45;
  const blushR = blushL.clone();
  blushR.position.set(0.5, -0.16, 0.66);
  blushR.rotation.y = 0.45;
  headGroup.add(blushL, blushR);

  const happyMouth = new THREE.Group();
  happyMouth.position.set(0, -0.24, 0.75);
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
  sadMouth.position.set(0, -0.27, 0.76);
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
    new THREE.MeshStandardMaterial({ color: 0xf68fb2, roughness: 0.4 })
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

    overlaySlot.innerHTML = '';
    cardSlot.innerHTML = '';

    if (stage === 'offering') {
      overlaySlot.innerHTML = `
        <button type="button" id="kwOpenLetterBtn" class="kw-btn-purple" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);white-space:nowrap;">
          Tap to open your letter ♥
        </button>
      `;
      overlaySlot.querySelector('#kwOpenLetterBtn')?.addEventListener('click', () => {
        stage = 'letter';
        renderUI();
      });
    } else if (stage === 'letter') {
      cardSlot.innerHTML = `
        <div class="kw-card-wrap">
          <div class="kw-airmail-border">
            <div class="kw-airmail-inner">
              <div class="kw-badge-purple">♥</div>
              <p style="font-family:'Caveat',cursive;font-size:22px;color:#f43f5e;margin:0 0 2px;">for ${esc(recipient)},</p>
              <h2 style="font-size:21px;font-weight:800;color:#1e293b;margin:0 0 16px;line-height:1.25;">${esc(letterTitle)}</h2>
              <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.6;color:#475569;">
                ${paragraphs.map((p) => `<p style="margin:0 0 12px;">${esc(p)}</p>`).join('')}
              </div>
              <p style="font-family:'Caveat',cursive;font-size:22px;color:#818cf8;margin:4px 0 0;">${esc(signOff)}, ${esc(sender)}</p>
              <div class="kw-divider"><span class="kw-divider-line"></span><span style="color:#f472b6;font-size:10px;">♥</span><span class="kw-divider-line"></span></div>
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
      const noScale = Math.max(0.76, 1 - noCount * 0.06);
      overlaySlot.innerHTML = `
        <div class="kw-question-overlay" style="left:50%;transform:translateX(-50%);">
          <div class="kw-airmail-border">
            <div class="kw-airmail-inner" style="padding:22px 20px;">
              <div class="kw-badge-purple" style="width:36px;height:36px;font-size:14px;">♥</div>
              <h2 style="font-family:'Patrick Hand','Nunito',sans-serif;font-size:22px;font-weight:700;color:#1e293b;margin:0 0 6px;line-height:1.25;">${esc(question)}</h2>
              <div class="kw-divider" style="margin:10px 0 14px;"><span class="kw-divider-line"></span><span style="color:#f472b6;font-size:10px;">♥</span><span class="kw-divider-line"></span></div>
              <div style="display:flex;align-items:center;justify-content:center;gap:14px;">
                <button type="button" id="kwYesBtn" class="kw-btn-pink" style="transform:scale(${yesScale});">yes</button>
                <button type="button" id="kwNoBtn" class="kw-btn-blue" style="transform:scale(${noScale});">no</button>
              </div>
            </div>
          </div>
        </div>
      `;
      overlaySlot.querySelector('#kwYesBtn')?.addEventListener('click', () => {
        stage = 'celebrate';
        renderUI();
        try {
          confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 }, colors: ['#f45b8c', '#a799ff', '#99dec5', '#ffd6e7', '#bae6fd'] });
        } catch (e) {}
        setTimeout(() => {
          if (stage === 'celebrate') {
            stage = 'final';
            renderUI();
          }
        }, 2300);
      });
      overlaySlot.querySelector('#kwNoBtn')?.addEventListener('click', () => {
        noCount += 1;
        stage = 'sad';
        renderUI();
      });
    } else if (stage === 'sad') {
      const msg = sadLines[Math.min(noCount - 1, sadLines.length - 1)];
      overlaySlot.innerHTML = `
        <div style="position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);text-align:center;width:100%;">
          <p style="font-size:13px;font-weight:600;font-style:italic;color:#64748b;margin:0 0 10px;">${esc(msg)}</p>
          <button type="button" id="kwAskAgainBtn" class="kw-btn-purple" style="padding:8px 22px;font-size:13px;">Ask me again ♡</button>
        </div>
      `;
      overlaySlot.querySelector('#kwAskAgainBtn')?.addEventListener('click', () => {
        stage = 'question';
        renderUI();
      });
    } else if (stage === 'celebrate') {
      overlaySlot.innerHTML = `
        <div style="position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);white-space:nowrap;">
          <span style="display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:999px;background:#fdf2f8;border:1px solid #fbcfe8;color:#db2777;font-size:13px;font-weight:700;">
            Yay!! Happy kitten noises ♥
          </span>
        </div>
      `;
    } else if (stage === 'final') {
      cardSlot.innerHTML = `
        <div class="kw-final-card">
          <div class="kw-badge-pink">♥</div>
          <h2 style="font-size:24px;font-weight:800;color:#1e293b;margin:0 0 8px;">${esc(recipient)} said yes.</h2>
          <p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.5;color:#64748b;margin:0 0 18px;max-width:230px;">${esc(yesSubtitle)}</p>
          <p style="font-family:'Caveat',cursive;font-size:22px;color:#818cf8;margin:0;">See you soon, ${esc(recipient)} ♡</p>
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

    leftBrow.visible = isSad;
    rightBrow.visible = isSad;
    leftEye.eyelid.visible = isSad;
    rightEye.eyelid.visible = isSad;
    leftEye.tear.visible = isSad;
    rightEye.tear.visible = isSad;
    sadMouth.visible = isSad;

    leftEye.spHappy.visible = isHappy;
    rightEye.spHappy.visible = isHappy;
    happyMouth.visible = isHappy;

    if (stage === 'walking') {
      walkX = Math.min(0, walkX + dt * 1.45);
      kitty.position.x = walkX;
      kitty.rotation.y = walkX < -0.05 ? 0.32 : THREE.MathUtils.lerp(kitty.rotation.y, 0, 0.12);
      const stride = walkX < -0.02 ? Math.sin(t * 10) : 0;
      leftLeg.rotation.x = stride * 0.45;
      rightLeg.rotation.x = -stride * 0.45;
      leftArm.rotation.x = -0.35;
      rightArm.rotation.x = -0.35;
      kitty.position.y = Math.abs(stride) * 0.08;
      headGroup.rotation.z = Math.sin(t * 5) * 0.03;
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
      leftEar.rotation.z = 0.34;
      rightEar.rotation.z = -0.34;
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
    const h = canvasMount.clientHeight || 410;
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
