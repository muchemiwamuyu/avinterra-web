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

All routes are in `app/`. Each is a thin page file that imports a component or `LegalPage`:

| Route | Notes |
|-------|-------|
| `/` | Assembles all section components in order |
| `/about`, `/destinations`, `/packages`, `/gallery`, `/why`, `/contact` | Standalone pages |
| `/terms`, `/privacy`, `/refund` | All use the shared `LegalPage` component |

### Key files

| Path | Role |
|------|------|
| `app/layout.tsx` | Root layout — loads fonts, injects theme init script, sets OG metadata |
| `app/globals.css` | **Entire design system lives here** — Tailwind used only for layout utilities |
| `lib/data.ts` | All content: `PHOTOS`, `LOCAL`, `INTL`, `PACKAGES`, `WHY`, `TESTIMONIALS`, `GALLERY`, `BIG_FIVE` |
| `lib/useCounter.ts` | `useCounter` hook — counts up to a target when element scrolls into view, respects `prefers-reduced-motion` |

### Component map

| Component | Type | Notes |
|-----------|------|-------|
| `RevealObserver` | `'use client'` | Sets up `IntersectionObserver` for `.reveal` scroll animations; renders `null` |
| `Nav` | `'use client'` | Active-link tracking via `IntersectionObserver` |
| `Hero` | `'use client'` | 3D mouse-parallax on the card stack |
| `Destinations` | `'use client'` | Local/International tab toggle |
| `Packages` | `'use client'` | Scroll-tilt effect on package cards |
| `Booking` | `'use client'` | Controlled form — client-side only, no backend yet |
| `LegalPage` | Server | Shared reading layout for Terms, Privacy, Refund pages |
| All others | Server | Static content, no interactivity |

### Design system

All CSS is in `globals.css`. CSS custom properties in `:root`:
- **Palette**: `--bg` `--bg-1` `--bg-2` (near-black), `--ink` `--ink-2` `--ink-3` (warm white → dim)
- **Accents**: `--accent` (orange), `--accent-2` (amber), `--gold`, `--teal`
- **Fonts**: `--serif` (Fraunces), `--sans` (Geist), `--mono` (JetBrains Mono) — resolved from CSS variables set by `next/font/google`

**Theme**: a blocking inline script in `app/layout.tsx` reads `localStorage['av-theme']` and sets `data-theme` on `<html>` before first paint to avoid flash. Light/dark variants are CSS `[data-theme="light"]` overrides in `globals.css`.

### Scroll reveal

Elements with `.reveal` class start hidden (`opacity: 0; transform: translateY(30px)`) and gain `.in` when they enter the viewport. `RevealObserver` sets this up globally on mount.

### Adding content

All destination, package, testimonial, and gallery data is in `lib/data.ts`. Images are Unsplash URLs built with the `img(id, width)` helper — replace the Unsplash photo ID to swap an image.

### Deployment

Multi-stage Dockerfile: Node 20 builds the static export, then nginx:alpine serves `out/`. The nginx config (`nginx.conf`) aggressively caches `_next/static/` assets and falls back all paths to `index.html` for client-side routing.
