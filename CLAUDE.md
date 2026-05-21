# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check without building
```

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.

### Key files

| Path | Role |
|------|------|
| `app/layout.tsx` | Root layout — loads Fraunces, Geist, JetBrains Mono via `next/font/google` |
| `app/page.tsx` | Assembles all section components in order |
| `app/globals.css` | Entire design system — all CSS lives here, Tailwind used only for layout utilities |
| `lib/data.ts` | All content: `PHOTOS`, `LOCAL`, `INTL`, `PACKAGES`, `WHY`, `TESTIMONIALS`, `GALLERY` |

### Component map

| Component | Type | Notes |
|-----------|------|-------|
| `RevealObserver` | `'use client'` | Sets up `IntersectionObserver` for `.reveal` scroll animations; renders `null` |
| `Nav` | `'use client'` | Active-link tracking via `IntersectionObserver` |
| `Hero` | `'use client'` | 3D mouse-parallax on the card stack via `useRef`/`useEffect` |
| `Destinations` | `'use client'` | Local/International tab toggle |
| `Packages` | `'use client'` | Scroll-tilt effect on package cards |
| `Booking` | `'use client'` | Controlled form — client-side only, no backend yet |
| All others | Server components | Static content, no interactivity |

### Design system

CSS custom properties in `:root` inside `globals.css`:
- **Palette**: `--bg` `--bg-1` `--bg-2` (near-black), `--ink` `--ink-2` `--ink-3` (warm white → dim)
- **Accents**: `--accent` (orange), `--accent-2` (amber), `--gold`, `--teal`
- **Fonts**: `--serif` (Fraunces), `--sans` (Geist), `--mono` (JetBrains Mono) — resolved from CSS variables set by `next/font/google`

### Adding content

All destination, package, testimonial, and gallery data is in `lib/data.ts`. Images are Unsplash URLs built with the `img(id, width)` helper — replace the photo ID to swap an image.

### Scroll reveal

Elements with `.reveal` class start hidden (`opacity: 0; transform: translateY(30px)`) and gain `.in` when they enter the viewport. `RevealObserver` sets up this observer globally when the page mounts.
