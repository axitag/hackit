# 🎨 Design System Rules — Hackathon Site

## Vibe & Aesthetic
This project uses a **dark comic-book / Spider-Verse** aesthetic. Think:
- Gritty, high-contrast ink-on-paper energy
- Chromatic aberration glitch effects
- 12fps stutter animations (not smooth/fluid)
- Halftone dot textures
- Speed lines and ink splat interactions
- Typewriter and flicker effects for reveals

**Never** use: glassmorphism, purple gradients, rounded soft UI, pastel colors, Inter/Roboto fonts, smooth easing on animations. This should feel like a printed comic panel that's been corrupted by electricity.

---

## Color Palette
Always use these CSS variables. Never hardcode raw hex values in components.

```css
--bg: #0a0a0a           /* Page background — near-black */
--surface: #111111      /* Card/panel backgrounds */
--text: #f0f0f0         /* Primary text */
--accent: #E8003D       /* Primary accent — vivid red */
--glitch-cyan: #00FFFF  /* Glitch shadow offset — cyan */
--glitch-magenta: #FF00FF /* Glitch shadow offset — magenta */
--ink-dark: #1a1a1a     /* Dark ink for shadows/offsets */
--ink-light: #ffffff    /* Light ink for borders */
```

### Accent Usage
- CTAs, highlights, active states → `var(--accent)` (#E8003D)
- Glitch effects → always paired cyan + magenta offsets
- Borders on cards → `var(--ink-light)` with 3.5px solid
- Glow effects → `rgba(232, 0, 61, 0.4)` shadows

---

## Typography

### Font Stack
```css
--font-display: 'Bangers', cursive       /* Headlines, hero text, section titles */
--font-body: 'Special Elite', cursive    /* Body copy, descriptions, paragraphs */
--font-label: 'Courier Prime', monospace /* Labels, tags, code, captions, UI metadata */
```
Always import from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bangers&family=Special+Elite&family=Courier+Prime:wght@400;700&display=swap
```

### Typography Rules
- **H1 / Hero titles** → `font-display` (Bangers), large tracking, uppercase feel
- **H2 / Section titles** → `font-display` (Bangers)
- **Body text** → `font-body` (Special Elite)
- **Badges, labels, timestamps, metadata** → `font-label` (Courier Prime)
- Apply `.glitch-text` to major headings for chromatic aberration effect

---

## Borders & Surfaces

### Standard Comic Border
```css
border: 3.5px solid var(--ink-light);
box-shadow: 4px 4px 0 var(--ink-dark), inset 0 0 0 1px rgba(255,255,255,0.05);
```
Use class: `comic-border`

### Accent (Red) Border
```css
border: 3.5px solid var(--accent);
box-shadow: 4px 4px 0 rgba(232,0,61,0.3), 0 0 20px rgba(232,0,61,0.15);
```
Use class: `comic-border-red`

### Border Radius
- Cards/panels → `0` or max `4px` (sharp, not rounded)
- Speech bubbles → `12px` (exception — comic balloon shape)
- Scrollbar thumb → `4px`

---

## Animation Vocabulary
All animations use **stepped timing** (`steps(n)`) to simulate 12fps comic book motion. Never use `ease`, `ease-in-out`, or `cubic-bezier` for primary animations.

| Animation | Class | Usage |
|---|---|---|
| Entry reveal | `.stutter-in` | Page load element entrances |
| Page load | `.page-flicker` | Full section/page transitions |
| Glitch loop | `.glitch-text-animated` | Hero headings |
| Glitch on hover | `.glitch-hover` | Interactive text elements |
| Subtle glitch | `.glitch-text-subtle` | Secondary headings |
| Pulse glow | `.pulse-glow` | CTA buttons, featured cards |
| Ink splat | `.ink-splat` | Hover state for clickable elements |
| Wobble | `.wobble-hover` | Icons, small decorative elements |
| Typewriter | `.typewriter` | Taglines, code-style text reveals |
| Starburst spin | `.starburst-spin` | Decorative badge/star shapes |
| Speed lines | `.speed-lines` | Background accent on hero sections |

### Animation Timing Conventions
- Entry animations: `steps(5)` or `steps(8)` — never smooth
- Glitch loops: trigger at 70-80% of keyframe to feel rare/surprising
- Hover effects: short (0.4–0.6s), stepped

---

## Layout & Spacing

### Scroll System
- Use `snap-container` on the main scroll wrapper
- Each page section is a `snap-section` (full viewport height)
- Auto-height sections use `snap-section-auto`
- Footer uses `snap-footer`

### Mobile Behavior
- Below 768px: switch to `scroll-snap-type: y proximity`
- Sections become `height: auto` with `min-height: 100dvh`
- Add `padding-top: 3rem; padding-bottom: 3rem` on mobile sections

### Spacing Philosophy
- Generous padding inside panels (1.25–2rem)
- Tight, intentional gaps between elements
- Asymmetric layouts preferred over centered symmetry
- Let elements overlap or break grid slightly for comic energy

---

## UI Patterns

### Buttons
- Sharp corners (no border-radius or max 2px)
- `comic-border` or `comic-border-red` on primary CTAs
- Hover: `ink-splat` effect + `glitch-hover` on label
- Active/focus: `pulse-glow` on featured CTA

### Cards / Panels
- Background: `var(--surface)` (#111111)
- Border: `comic-border`
- Shadow offset: 4px 4px bottom-right (ink drop feel)
- No blur, no transparency, no glassmorphism

### Badges / Tags
- Font: `font-label` (Courier Prime)
- Uppercase, small size
- Border: 2px solid accent or ink-light
- Sharp corners

### Speech Bubbles
```html
<div class="speech-bubble">...</div>   <!-- with tail pointing down-left -->
<div class="thought-bubble">...</div>  <!-- soft rounded, no tail -->
```

---

## Background & Texture

### Halftone Overlay
Always include globally on the page:
```html
<div class="halftone-overlay"></div>
```
Fixed position, `pointer-events: none`, `z-index: 9998`, 4% opacity dot grid.

### Speed Lines (Hero sections)
```html
<div class="speed-lines"></div>  <!-- position: absolute, inset: 0 -->
```

### Scrollbar
- Track: `var(--bg)` 
- Thumb: `var(--accent)` with `border-radius: 4px`
- Hover: `#ff1a50`

### Text Selection
- Background: `var(--accent)`, color: `var(--text)`

---

## Custom Cursor
- Desktop: `cursor: none` on `body` (custom cursor implemented via JS)
- Mobile / touch: restore `cursor: auto`
- Always check `@media (pointer: coarse)` and `@media (max-width: 768px)`

---

## What to Avoid
- ❌ Smooth animations (`ease`, `ease-in-out`)
- ❌ Glassmorphism (`backdrop-filter: blur`)
- ❌ Rounded cards (border-radius > 4px on panels)
- ❌ Pastel or muted colors
- ❌ White backgrounds
- ❌ Inter, Roboto, Arial, or system fonts
- ❌ Purple/blue gradient color schemes
- ❌ Centered symmetric layouts as default
- ❌ Subtle, barely-there hover effects
- ❌ Hardcoded hex values (use CSS variables)