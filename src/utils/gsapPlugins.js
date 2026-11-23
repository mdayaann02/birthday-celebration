// src/utils/gsapPlugins.js - Centralized GSAP 3 Suite with Complete Plugin Ecosystem
// Registers all 25 requested GSAP plugins & eases for advanced animations, 3D physics, SVG & text effects.

import {
  gsap,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
} from 'gsap/all.js';

// Register all plugins and eases safely
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(
      Draggable,
      DrawSVGPlugin,
      EaselPlugin,
      Flip,
      GSDevTools,
      InertiaPlugin,
      MotionPathHelper,
      MotionPathPlugin,
      MorphSVGPlugin,
      Observer,
      Physics2DPlugin,
      PhysicsPropsPlugin,
      PixiPlugin,
      ScrambleTextPlugin,
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      SplitText,
      TextPlugin,
      RoughEase,
      ExpoScaleEase,
      SlowMo,
      CustomEase,
      CustomBounce,
      CustomWiggle
    );

    // Expose on window for easy access in developer console, live studio scripts, or inspection
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.Draggable = Draggable;
    window.InertiaPlugin = InertiaPlugin;
    window.Flip = Flip;
    window.SplitText = SplitText;
    window.MorphSVGPlugin = MorphSVGPlugin;
    window.CustomEase = CustomEase;
  } catch (err) {
    console.warn('GSAP Plugin ecosystem registration notice:', err);
  }
}

export {
  gsap,
  gsap as default,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
};
