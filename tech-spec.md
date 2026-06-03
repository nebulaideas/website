# Nebula Ideas — Tech Spec

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | DOM renderer |
| `vite` | ^6.0 | Build tool |
| `@vitejs/plugin-react` | ^4.4 | Vite React integration |
| `typescript` | ^5.7 | Type checking |
| `@types/react` | ^19.0 | React type definitions |
| `@types/react-dom` | ^19.0 | ReactDOM type definitions |
| `tailwindcss` | ^4.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0 | Tailwind Vite plugin |
| `three` | ^0.172 | Hero constellation animation |
| `@types/three` | ^0.172 | Three.js type definitions |
| `lenis` | ^1.2 | Smooth scroll with inertia |

No shadcn/ui — the project has fully custom components with a unique design system; no standard UI primitives (dialogs, forms, tables) are needed.

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| `Navigation` | Custom | Once — sticky bar, frosted glass on scroll, mobile hamburger overlay |
| `Footer` | Custom | Once |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Three.js canvas background, text entrance sequence |
| `SocialProofSection` | Custom | 4-stat grid |
| `ServicesSection` | Custom | 3 service cards |
| `ProcessSection` | Custom | Vertical timeline with 4 steps, animated connector line |
| `AboutSection` | Custom | 2 founder cards + partnership banner |
| `PhilosophySection` | Custom | Centered statement layout |
| `TechnologySection` | Custom | 3 horizontal tech cards |
| `BlogSection` | Custom | 3 blog post cards |
| `ContactSection` | Custom | Centered CTA layout |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| `ServiceCard` | Custom | ServicesSection (x3) |
| `ProcessStep` | Custom | ProcessSection (x4) |
| `FounderCard` | Custom | AboutSection (x2) |
| `TechCard` | Custom | TechnologySection (x3) |
| `BlogCard` | Custom | BlogSection (x3) |
| `CTAButton` | Custom | HeroSection, ContactSection, BlogSection — supports primary, secondary, ghost variants |
| `ScrollReveal` | Custom | Wrapper used by all content sections — handles IntersectionObserver-based entrance |
| `SectionLabel` | Custom | Services, Process, About, Technology, Blog sections — uppercase amber caption |

### Hooks

| Hook | Purpose |
|------|---------|
| `useLanguage` | Bilingual state (EN/ES), localStorage persistence, document.lang sync |
| `useLenis` | Initialize Lenis for smooth scroll with nav offset |
| `useScrollPosition` | Track scroll Y for nav frosted-glass transition and scroll indicator fade |
| `useActiveSection` | IntersectionObserver-based active section detection for nav highlighting |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Constellation particles (hero bg) | Three.js (vanilla) | Hand-written rAF loop: SphereGeometry particles with Brownian motion, per-frame distance-based BufferGeometry lines, point light, mouse parallax camera lerp. Pool line geometry; cap at ~200 connections. Static frame on reduced-motion. | **High** 🔒 |
| Hero text entrance | CSS transitions | Sequential class toggles via React state (opacity + translateY, staggered delays 0.2s). Triggers after 400ms mount delay. | Low |
| Scroll reveal (global) | CSS transitions + IntersectionObserver | ScrollReveal wrapper component. Single observer per instance. Children stagger with CSS `transition-delay`. Trigger once. Disabled on `prefers-reduced-motion`. | Medium |
| Process timeline grow | CSS transition + IntersectionObserver | Animate connector line `height: 0 → 100%` on section enter, 1.2s ease-out. Steps stagger via ScrollReveal. | Medium |
| Scroll indicator bounce | CSS animation | Infinite `@keyframes` translateY oscillation, 2s ease-in-out. Fades out via opacity transition when `scrollY > 100`. | Low |
| Nav frosted glass | CSS transition | Toggle class based on `scrollY > 80`. `backdrop-filter` + background-color transition, 0.4s. | Low |
| Philosophy divider grow | CSS transition | Animate `width: 0 → 60px` on scroll reveal trigger. | Low |
| Contact CTA scale-in | CSS transition | `scale(0.95) → scale(1)` + opacity on scroll reveal. | Low |
| Card/service hover effects | CSS transitions | `translateY` + shadow transitions, 0.3s. Pure CSS, no JS. | Low |

---

## State & Logic Plan

### Bilingual System (useLanguage)

Single source of truth: a flat translation object keyed by language code (`en`, `es`). All text content in the app is looked up via a `t(key)` function — no hardcoded strings in components. Components receive translated strings as props or call `t()` from the hook.

Language toggle updates: (1) `currentLanguage` state, (2) `document.documentElement.lang`, (3) Calendly CTA URLs swap, (4) persisted to `localStorage`. No animation on swap — instant text replacement.

### Three.js Lifecycle (HeroSection)

The Three.js constellation is fully imperative and lives outside React's render cycle. On mount: create scene, camera, renderer, particles, and line geometry; append canvas to a container ref; start rAF loop. On unmount: dispose all geometries, materials, renderer; cancel rAF. Mouse position stored in a ref (not state) to avoid re-renders; camera rotation interpolated in the animation loop.

Resize handled via a `ResizeObserver` on the container, not window resize — keeps the canvas resolution matched to its actual DOM size.

### Lenis + ScrollReveal Coordination

Lenis hijacks native scroll for smooth inertia. ScrollReveal's IntersectionObserver instances must observe the actual scroll position. Lenis provides a `scroll` event — ScrollReveal calculations should use Lenis's reported scroll position, not native `scrollY`. Alternatively, since IntersectionObserver is native and unaffected by Lenis's virtual scroll, the standard approach works without extra wiring. Verify during implementation.

---

## Other Key Decisions

**Raw Three.js over React Three Fiber**: This is a single decorative canvas with a custom animation loop. R3F adds bundle size and abstraction overhead for no benefit. A single `useEffect` with imperative Three.js code is simpler and more direct.

**No routing**: Single-page site with anchor-based navigation. No router needed.

**Blog posts as static placeholders**: The blog section references placeholder articles (no real content, no individual pages). Cards are non-interactive or link to `#`.

**Privacy Policy link**: Links to `#privacy` placeholder — no separate page.
