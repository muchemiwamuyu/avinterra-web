# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **AGENTS.md note**: This is Next.js 16 — APIs and conventions may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing new Next.js code. Heed deprecation notices.

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build (static export → out/)
npm run lint     # ESLint
npx tsc --noEmit # type-check without building
```

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4. Configured as a **fully static export** (`output: "export"` in `next.config.ts`) — no server-side features (SSR, API routes, middleware) are available. Build output is the `out/` directory, served by nginx in production.

### Routing

All routes are in `app/`. The home page assembles every section sequentially; standalone pages each focus on one section:

| Route | Notes |
|-------|-------|
| `/` | Full landing page — assembles all section components in order |
| `/about` | About page — `AboutPageContent` + mission statement + `CtaStrip` |
| `/destinations`, `/packages`, `/gallery`, `/why` | Standalone section pages |
| `/contact` | `Contact` info + `Booking` form side-by-side |
| `/terms`, `/privacy`, `/refund` | All use the shared `LegalPage` component |

### Standalone page template

All inner pages follow the same shell: `RevealObserver` + `Nav` + `PageShell(content + CtaStrip)` + `Footer` + `WhatsAppButton`. `PageShell` is a server wrapper that adds the `.page-shell` div (handles top-padding so content clears the fixed nav).

### Key files

| Path | Role |
|------|------|
| `app/layout.tsx` | Root layout — loads fonts, injects theme init script, sets OG metadata |
| `app/globals.css` | **Entire design system lives here** — Tailwind used only for layout utilities |
| `lib/data.ts` | All content: `PHOTOS`, `LOCAL`, `INTL`, `PACKAGES`, `WHY`, `TESTIMONIALS`, `GALLERY`, `BIG_FIVE`, plus exported contact constants (`WA_NUMBER`, `BOOKING_PHONE`) |
| `lib/useCounter.ts` | `useCounter` hook — counts up to a target when element scrolls into view, respects `prefers-reduced-motion` |

### Component map

| Component | Type | Notes |
|-----------|------|-------|
| `RevealObserver` | `'use client'` | Sets up `IntersectionObserver` for `.reveal` scroll animations; renders `null` |
| `Nav` | `'use client'` | Fixed nav — active-link tracking via `IntersectionObserver`; theme toggle via custom `av-theme-change` event + `useSyncExternalStore` |
| `Hero` | `'use client'` | 3D mouse-parallax on the card stack |
| `Destinations` | `'use client'` | Local/International tab toggle |
| `Packages` | `'use client'` | Scroll-tilt effect on package cards |
| `Booking` | `'use client'` | Controlled form — submits by opening `wa.me/${WA_NUMBER}` with a pre-filled WhatsApp message; no backend |
| `Gallery` | `'use client'` | Photo gallery with lightbox/modal |
| `LegalPage` | Server | Shared reading layout for Terms, Privacy, Refund pages |
| `PageShell` | Server | Thin wrapper (`div.page-shell`) for standalone inner pages |
| `AboutPageContent` | Server | About page content sections |
| `Contact` | Server | Contact info display — used alongside `Booking` on `/contact` |
| `CtaStrip` | Server | Full-width CTA banner — appears at the bottom of every standalone page |
| `Footer` | Server | Site footer — appears on all pages |
| `WhatsAppButton` | Server | Floating WhatsApp button — appears on all pages |
| `BackToTop` | Server | Back-to-top scroll button |
| `AnimalIcons` | Server | Shared inline-SVG wildlife silhouettes (`ElephantIcon`, `GiraffeIcon`, `LionIcon`, `BirdIcon`, `BirdFlock`) used by `Hero` and `WildlifeMarquee` |
| `WildlifeMarquee` | Server | Horizontally scrolling wildlife icon strip |
| `DestinationsGlobe` | Server | Decorative globe/map destinations display |
| `Marquee` | Server | Text/logo scrolling strip |
| `StatsInfographic` | Server | Animated statistics section — uses `useCounter` hook |
| `Testimonials` | Server | Customer reviews section |
| `Why` | Server | "Why Avinterra" value-prop section |
| `About` | Server | Company story section |

### Design system

All CSS is in `globals.css`. CSS custom properties in `:root`:
- **Palette**: `--bg` `--bg-1` `--bg-2` (near-black), `--ink` `--ink-2` `--ink-3` (warm white → dim)
- **Accents**: `--accent` (orange `#e85c2b`), `--accent-2` (amber `#f3a64a`), `--gold`, `--teal`
- **Fonts**: `--serif` (Fraunces), `--sans` (Geist), `--mono` (JetBrains Mono) — resolved from CSS variables set by `next/font/google`

**Theme**: a blocking inline script in `app/layout.tsx` reads `localStorage['av-theme']` and sets `data-theme` on `<html>` before first paint to avoid flash. Light/dark variants are CSS `[data-theme="light"]` overrides in `globals.css`. Theme changes are broadcast via a custom `av-theme-change` DOM event so `Nav` can react without prop drilling.

### Coding conventions

- **Styling**: Use CSS custom properties from `:root` (e.g. `var(--accent)`, `var(--bg)`) for color and typography. Use Tailwind only for spacing/layout utilities (`flex`, `grid`, `gap-4`, etc.).
- **Components**: Default to Server Components. Add `'use client'` only when hooks, event listeners, or browser APIs are needed.
- **Animations**: Apply the `.reveal` class to elements that should animate on scroll — `RevealObserver` handles the rest.

### Scroll reveal

Elements with `.reveal` class start hidden (`opacity: 0; transform: translateY(30px)`) and gain `.in` when they enter the viewport. `RevealObserver` sets this up globally on mount.

### Adding content

All destination, package, testimonial, and gallery data is in `lib/data.ts`. Images are served locally from `public/images/`. To swap an image, drop the new file into `public/images/` and update the `PHOTOS` mapping in `lib/data.ts`. Contact/phone constants (`WA_NUMBER`, `BOOKING_PHONE`, etc.) are also exported from `lib/data.ts` — edit them there, not at call sites.

### Deployment

Multi-stage Dockerfile: Node 20 builds the static export, then nginx:alpine serves `out/`. The nginx config (`nginx.conf`) aggressively caches `_next/static/` assets and falls back all paths to `index.html` for client-side routing.
