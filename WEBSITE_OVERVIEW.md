# HackIt 2026 — Website Overview

> **"Break the Code. Break the Multiverse."**
> A 48-hour hackathon website for Amity University Patna, themed around a Spider-Man Noir / comic-book detective aesthetic.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS + Vanilla CSS (custom properties & keyframes) | ^4 |
| **Animations** | Framer Motion | ^12.35.2 |
| **3D / WebGL** | Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing | ^0.183 |
| **Maps** | react-simple-maps + d3-geo | ^3.0.0 |
| **Icons** | Lucide React | ^0.577.0 |
| **Utilities** | clsx, tailwind-merge | — |
| **Fonts** | Google Fonts — Bangers (display), Special Elite (body), Courier Prime (labels) | — |

---

## Design System

### Color Palette
- **Background:** `#0a0a0a` (deep black)
- **Surface:** `#111111`
- **Text:** `#f0f0f0`
- **Accent:** `#E8003D` (crimson red)
- **Glitch Cyan:** `#00FFFF`
- **Glitch Magenta:** `#FF00FF`

### Typography
- **Display:** `Bangers` — headings, titles, badges
- **Body:** `Special Elite` — paragraph text, descriptions
- **Label:** `Courier Prime` — tags, metadata, small labels

### Visual Effects (CSS Keyframes)
- `glitch-in` / `glitch-loop` / `glitchFlicker` — chromatic aberration text effects
- `stutter-in` / `stutterIn` — stepped reveal animations
- `slide-in-left` / `slide-in-right` — directional entrances
- `radar-pulse` — expanding ring on map pins
- `grain` — moving film grain overlay
- `pulse-hint` — scroll indicator pulse
- `pageFlicker` — full-page glitch on load
- `speedLinesConverge` — manga-style radial lines
- `pulseGlow` — pulsing red box-shadow
- `inkSplat` — splash effect on hover
- `typewriter` / `blinkCursor` — typewriter text effect
- `wobble` — shake animation on hover
- `starburstSpin` — rotating starburst for prizes
- `plane-bob` — subtle bobbing for the plane sprite

### Overlays (global)
- **HalftoneOverlay** — dot-pattern overlay across the entire site
- **CursorTrail** — custom cursor with a trailing effect (hidden on mobile/touch)
- **Film Grain** — animated noise texture on timeline

---

## Pages & Routes

### `/` — Home (Landing Page)
The main single-page experience with vertical snap-scrolling sections:

| Order | Section | Component(s) | Description |
|---|---|---|---|
| 1 | **Navigation** | `Navigation` | Hamburger menu → full-screen slide-in overlay with links to all routes |
| 2 | **Hero** | `Hero`, `GlitchText`, `GlitchSubtext` | Animated hero with comic-style floating action words ("BUILD!", "HACK!", "SHIP!"), background image, glitch title, and CTA button |
| 3 | **The Origin Story** | `About`, `ComicPanel`, `GlitchText` | Two comic-panel cards — "About HackIt" and "Why Join Us?" — with staggered reveal animations |
| 4 | **Pick Your Case File** | `Tracks` | 4 hackathon tracks (AI/ML, Web Dev, Cybersecurity, Open Innovation) displayed as comic-book cover cards with 3D hover tilt; clicking navigates to `/problem-statement` |
| 5 | **Hackathon Timeline** | `NoirTimeline`, `WorldMap`, `FlightPath`, `CheckpointCard`, `DC3Plane`, `PlaneCanvas` | Interactive noir-themed world map timeline. A plane flies between checkpoint cities. Scroll-driven with progress bar, dossier cards, radar pings, and legend |
| 6 | **The Loot (Prizes)** | `Prizes` | 1st/2nd/3rd place prizes with animated starburst SVGs, Amitian/Non-Amitian toggle |
| 7 | **Transmissions (FAQ)** | `FAQ` | Expandable accordion with comic speech-bubble styling and wobble animations |
| 8 | **Join The HackIt (CTA)** | `RegisterCTA` | Registration CTA with stats row (48 hrs, 04 tracks, ₹20K prizes), social links, and a 3-column footer (Contact info • Location with embedded Google Maps) |
| 9 | **Footer** | `Footer` | Copyright bar with spider-web SVG decoration |

---

### `/about` — About Page
Dedicated about page with extended info about the hackathon, reuses `Navigation`, `RegisterCTA`, and `Footer`.

### `/team` — Team Page
Displays team members in portrait card grid layout with sections for:
- Mentors / Judges
- Organizers
- Developers
- Core Team

Uses `PortraitCard`, `SectionHeader`, `SectionDivider` sub-components with Framer Motion staggered animations.

### `/problem-statement` — Problem Statements
Displays all hackathon tracks with expandable problem statement details:
- Each track card opens to reveal problem statements with core functionalities listed
- Uses `AnimatePresence` for expand/collapse transitions
- Problem statements include ID, title, description, core functionalities, and notes

### `/refund-policy` — Refund Policy
Static policy page covering: no refunds after registration, event cancellation, registration confirmation, team changes, participation requirements, and technical issues. Styled with the same noir dossier aesthetic.

---

## Components

### Page-Level Sections
| Component | File | Purpose |
|---|---|---|
| `Hero` | `Hero.tsx` | Landing hero with glitch effects and floating comic words |
| `About` | `About.tsx` | Origin story section with comic panels |
| `Tracks` | `Tracks.tsx` | Track selection cards with 3D tilt |
| `NoirTimeline` | `NoirTimeline.tsx` | Core scroll-driven timeline orchestrator |
| `Prizes` | `Prizes.tsx` | Prize display with starburst animations |
| `FAQ` | `FAQ.tsx` | Expandable FAQ accordion |
| `RegisterCTA` | `RegisterCTA.tsx` | Registration CTA + footer with contact/location |
| `Schedule` | `Schedule.tsx` | Schedule section (currently commented out) |
| `Teams` | `Teams.tsx` | Team display component |

### Timeline Sub-Components
| Component | File | Purpose |
|---|---|---|
| `WorldMap` | `WorldMap.tsx` | SVG world map using react-simple-maps with d3-geo projections |
| `FlightPath` | `FlightPath.tsx` | SVG flight path line between checkpoint cities |
| `CheckpointCard` | `CheckpointCard.tsx` | Dossier-style info cards for each timeline checkpoint |
| `DC3Plane` | `DC3Plane.tsx` | Animated plane sprite that follows the flight path |
| `PlaneCanvas` | `PlaneCanvas.tsx` | Three.js canvas for optional 3D plane rendering |

### UI Utilities
| Component | File | Purpose |
|---|---|---|
| `GlitchText` | `GlitchText.tsx` | Chromatic aberration text effect (cyan + magenta ghosts) with hover jitter |
| `GlitchSubtext` | `GlitchSubtext.tsx` | Lighter glitch variant for subtitles |
| `GlitchImage` | `GlitchImage.tsx` | Glitch effect applied to images |
| `ComicPanel` | `ComicPanel.tsx` | Reusable comic-book panel container with border styling |
| `CursorTrail` | `CursorTrail.tsx` | Custom cursor with trailing dot animation |
| `HalftoneOverlay` | `HalftoneOverlay.tsx` | Global halftone dot-pattern overlay |
| `SpidermanNoirTicker` | `SpidermanNoirTicker.tsx` | Scrolling news ticker in noir style |

### Layout
| Component | File | Purpose |
|---|---|---|
| `Navigation` | `Navigation.tsx` | Hamburger → full-screen slide-in menu with route links |
| `Footer` | `Footer.tsx` | Copyright bar with spider-web SVG corner art |

---

## Key Functionalities

1. **Snap Scrolling** — Vertical snap-scroll on the homepage (`snap-container` / `snap-section`) for a slide-by-slide experience
2. **Page-Load Flicker** — CSS glitch animation on initial page load for dramatic entrance
3. **Glitch Typography** — Chromatic aberration text effects across all headings using `GlitchText`
4. **Interactive World Map Timeline** — Scroll-driven animated flight path across a world map with checkpoint dossier cards, radar pings, and a progress bar
5. **3D Card Tilt** — CSS perspective transforms on track cards for a 3D hover tilt effect
6. **Expandable FAQ** — Accordion-style FAQ with speech/thought bubble styling
7. **Prize Toggle** — Amitian / Non-Amitian prize amount switch
8. **Full-Screen Navigation** — Slide-in menu overlay with active route highlighting
9. **Custom Cursor** — Hidden native cursor replaced with a trailing dot effect (desktop only)
10. **Film Grain & Halftone Overlays** — Persistent visual noise for authentic noir atmosphere
11. **Embedded Google Maps** — Location section with sepia/noir-filtered Google Maps iframe, crosshair overlay, and "Open in Maps" CTA
12. **Responsive Design** — Mobile-first with breakpoints at `sm`, `md`, `lg`; touch-device cursor restoration, scaled dossier cards
13. **Comic-Book Aesthetic** — Speech bubbles, ink splats, wobble effects, starburst SVGs, speed lines — all reinforcing the noir comic theme
14. **SEO** — Meta title, description, and keywords configured in `layout.tsx`

---

## Project Structure

```
hackit/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata, global overlays)
│   │   ├── page.tsx            # Home page (snap-scroll sections)
│   │   ├── globals.css         # Design tokens, animations, component styles
│   │   ├── about/page.tsx      # About page
│   │   ├── team/page.tsx       # Team page
│   │   ├── problem-statement/page.tsx  # Problem statements
│   │   └── refund-policy/page.tsx      # Refund policy
│   ├── components/             # 23 React components
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets (images, fonts)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind / postcss configs
```
