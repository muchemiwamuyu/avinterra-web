# GEMINI.md — Avinterra Expeditions

This document provides architectural guidance and development conventions for the Avinterra Expeditions web project.

## Project Overview

Avinterra Expeditions is a marketing and booking website for a Kenya-based travel company. It is built as a **fully static Next.js application** (no backend, no database).

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS v4 (used for layout utilities) + Custom Design System in `app/globals.css`
- **Deployment**: Static export (`output: "export"`) served via nginx in a Docker container.

## Architecture & Data Flow

- **Static Content**: All site content (destinations, packages, testimonials, gallery) is centralized in `lib/data.ts`.
- **Booking**: The booking form (`components/Booking.tsx`) is client-side only. It generates a WhatsApp deep link with a pre-filled message and opens it in a new tab.
- **Images**: Served locally from `public/images/`. Managed via the `PHOTOS` object in `lib/data.ts`.
- **Animations**: Scroll-reveal animations are handled by `components/RevealObserver.tsx`, which adds the `.in` class to elements with the `.reveal` class when they enter the viewport.

## Key Files & Directories

| Path | Purpose |
| :--- | :--- |
| `app/layout.tsx` | Root layout: loads fonts, injects theme script, manages SEO metadata. |
| `app/globals.css` | **Core Design System**: Defines CSS custom properties (tokens), base styles, and all component-specific CSS. |
| `lib/data.ts` | **Single Source of Truth** for all text content, prices, and image mappings. |
| `components/` | Atomic and section-level UI components. |
| `app/` | Next.js App Router directory defining the site's pages and structure. |

## Development Workflows

### Commands

```bash
npm run dev        # Start development server at http://localhost:3000
npm run build      # Generate static export in out/
npm run lint       # Run ESLint
npx tsc --noEmit   # Run TypeScript type-checking
```

### Adding New Content

To update destinations, packages, or other site content:
1.  Add new images to `public/images/`.
2.  Update the `PHOTOS` mapping in `lib/data.ts`.
3.  Add/Modify entries in the `LOCAL`, `INTL`, `PACKAGES`, or `GALLERY` arrays in `lib/data.ts`.

### Creating New Pages

All standalone inner pages should follow this structure:
1.  Wrap content in `PageShell` to ensure proper padding and layout.
2.  Include `RevealObserver`, `Nav`, `Footer`, and `WhatsAppButton`.
3.  Utilize `CtaStrip` at the bottom of the content area.

## Coding Conventions

- **Styling**: Prefer using CSS custom properties defined in `:root` (e.g., `var(--accent)`, `var(--bg)`). Use Tailwind for spacing and layout utilities (`flex`, `grid`, `gap-4`, etc.).
- **Components**: 
    - Use `'use client'` only when necessary (e.g., hooks, event listeners, Framer Motion).
    - Favor Server Components for static sections.
- **Responsiveness**: Use the custom breakpoints and responsive utility classes defined in `globals.css`.
- **Animations**: Apply the `.reveal` class to elements that should animate into view on scroll.

## Environment Constraints

- **No Server Side**: Since this is a static export, `getServerSideProps`, `headers()` in `next.config.ts` (at runtime), and Middleware are **not** available.
- **Image Optimization**: `next/image` is used but constrained by the static export requirements.
