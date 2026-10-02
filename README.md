# 3D Coverflow Carousel Component

A smooth, physics-feeling **3D coverflow carousel** built with React, Next.js, Tailwind CSS, and Framer Motion. A single interactive demo page: images sweep left/right with 3D perspective tilt, depth scaling, and animated transitions — pure client-side, no backend needed.

## Features

- **3D coverflow effect** — side cards tilt in 3D perspective (`rotateY`), shrink with distance, and layer by z-index
- **Animated transitions** via Framer Motion (`AnimatePresence`)
- **Keyboard + button navigation** — previous/next chevrons, full keyboard support
- **Responsive card layout** — fixed 320×420 cards with depth-aware spacing
- **Remote images** — demo imagery from Unsplash (no local assets required)
- **Client-only rendering** — zero API routes, zero server state; statically exportable

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion (carousel animation)
- lucide-react (icons)

## Quick Start

```bash
git clone https://github.com/girishlade111/3d-coverflow-carousel-component.git
cd 3d-coverflow-carousel-component
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
```

## Project Structure

```
3d-coverflow-carousel-component/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Demo page — renders the carousel
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── CoverflowCarousel.tsx  # The carousel component
│   │   └── ui/             # Reusable UI primitives
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utilities
├── public/                 # Static assets
├── next.config.ts          # Static export (output: "export")
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Deploy Notes

The app is fully static: `next.config.ts` sets `output: "export"`, so `npm run build` produces a deployable `out/` directory. The placeholder `/api` route was removed because server routes are incompatible with static export. Host anywhere static sites run — GitHub Pages, Cloudflare Pages, Netlify, or any file server.

## Live Demo

https://girishlade111.github.io/3d-coverflow-carousel-component/

---

**Built by Girish Lade** · [ladestack.in](https://ladestack.in)
