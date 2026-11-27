# Celebration Studio — Design System (MASTER)

> Generated via `ui-ux-pro-max` design intelligence and tailored for Celebration Studio's Vanilla JS + Vite + Lucide CSS architecture.

## 1. Aesthetic Direction
- **Style:** Refined Editorial Studio + High-Craft Subtle Glassmorphism (inspired by Apple Invites, Linear, and Framer).
- **Avoid:** Muddy dark inset neumorphism in Light Mode, slow `transition-all` on theme containers, mixed emoji/SVG UI chrome, and hardcoded hex colors in components.
- **Motion:** Restrained, purposeful micro-interactions (`150ms–250ms cubic-bezier(0.22, 1, 0.36, 1)`), instant theme switching (`0ms` color-flash), and `@media (prefers-reduced-motion: reduce)` respected globally.

## 2. Semantic Theme Tokens (WCAG AA >= 4.5:1 in Both Modes)

### Light Mode (`studio-theme-light`)
- `--bg-canvas`: `#F7F6F3`
- `--bg-surface`: `#FFFFFF`
- `--bg-elevated`: `#FBFBFB`
- `--bg-subtle`: `#EFECE6`
- `--text-primary`: `#141417`
- `--text-secondary`: `#4E515C`
- `--text-muted`: `#6B6F7B`
- `--border-subtle`: `rgba(20, 20, 23, 0.10)`
- `--border-strong`: `rgba(20, 20, 23, 0.18)`
- `--accent-primary`: `#D9385A`
- `--accent-primary-hover`: `#BE2B4A`
- `--accent-on-primary`: `#FFFFFF`
- `--focus-ring`: `0 0 0 3px rgba(217, 56, 90, 0.25)`

### Dark Mode (`studio-theme-dark`)
- `--bg-canvas`: `#0B0C10`
- `--bg-surface`: `#13151C`
- `--bg-elevated`: `#1A1D26`
- `--bg-subtle`: `#212530`
- `--text-primary`: `#F5F6FA`
- `--text-secondary`: `#B4B9C7`
- `--text-muted`: `#8B91A3`
- `--border-subtle`: `rgba(255, 255, 255, 0.10)`
- `--border-strong`: `rgba(255, 255, 255, 0.18)`
- `--accent-primary`: `#F43F5E`
- `--accent-primary-hover`: `#E11D48`
- `--accent-on-primary`: `#FFFFFF`
- `--focus-ring`: `0 0 0 3px rgba(244, 63, 94, 0.35)`

## 3. Typography & Script Support
- **Display / Editorial:** `'Cormorant Garamond', 'Playfair Display', 'Noto Serif Devanagari', Georgia, serif`
- **UI / Body:** `'Montserrat', 'Inter', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif`
- **Devanagari Fallback:** `Noto Sans Devanagari` and `Noto Serif Devanagari` loaded in `index.html` and applied to all `input`, `textarea`, `select`, and preview templates so Sanskrit/Hindi shlokas (`॥ श्री गणेशाय नमः ॥`) render crisply without tofu boxes.
- **Mobile Input Sizing:** `font-size: 16px` minimum on `<input>`, `<textarea>`, `<select>` below `900px` to prevent iOS Safari auto-zoom.

## 4. Iconography & Touch Targets
- **100% Lucide SVG icons** (`src/studio/icons.js`) for all studio chrome, category filter pills, and controls.
- **Minimum Touch Target:** `44px × 44px` on all interactive buttons, pills, tabs, and close triggers on mobile.
- **Dynamic Viewport:** `100dvh` / `min-height: 100dvh` with `overflow-x: hidden` and `env(safe-area-inset-bottom)` padding.
