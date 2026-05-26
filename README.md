# Avinterra Expeditions — Web

Marketing and booking website for **Avinterra Expeditions**, a Kenya-based travel company offering safaris, coastal escapes, and international getaways.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Deployed as a fully static export served by nginx.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 — App Router, static export (`output: "export"`) |
| UI | React 19, Tailwind CSS v4 (layout utilities only) |
| Styling | Custom design system in `app/globals.css` (CSS custom properties) |
| Fonts | Fraunces (serif), Geist (sans), JetBrains Mono — via `next/font/google` |
| Deployment | Docker (Node 20 build → nginx:alpine serve) |

No backend, no database. The booking form sends inquiries via a WhatsApp deep link.

---

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # production static export → out/
npm run lint       # ESLint
npx tsc --noEmit   # type-check
```

---

## Project structure

```
app/               # Routes (Next.js App Router)
  page.tsx         # Home — full landing page
  destinations/    # Standalone destinations page
  packages/        # Standalone packages page
  gallery/         # Standalone gallery page
  why/             # Standalone "Why Avinterra" page
  contact/         # Contact info + booking form
  terms|privacy|refund/  # Legal pages (shared LegalPage component)
  layout.tsx       # Root layout — fonts, theme init, OG metadata
  globals.css      # Entire design system (palette, typography, animations)
components/        # All UI components
lib/
  data.ts          # All content and image URLs (destinations, packages, gallery…)
  useCounter.ts    # Scroll-triggered count-up hook
public/            # Static assets (logo.svg, favicons)
nginx.conf         # nginx config for production container
Dockerfile         # Multi-stage build
```

---

## Content

All site content — destinations, packages, testimonials, gallery images — lives in `lib/data.ts`. Images are Unsplash URLs constructed with the `img(id, width)` helper; swap the Unsplash photo ID to change an image.

---

## Deployment

The Dockerfile does a two-stage build:
1. **Node 20** — runs `npm run build`, producing a static export in `out/`
2. **nginx:alpine** — serves `out/` with aggressive caching for `_next/static/` assets

```bash
docker compose up --build   # build and run locally on port 80
```
