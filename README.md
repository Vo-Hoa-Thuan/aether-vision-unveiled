# AETHER Vision

> **See the world, reimagined.** — A premium AI Smart Glasses product landing page built for a Frontend Developer Internship technical assessment.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PageSpeed Mobile](https://img.shields.io/badge/PageSpeed_Mobile-95%2F100-brightgreen?style=flat-square)](https://pagespeed.web.dev)
[![PageSpeed Desktop](https://img.shields.io/badge/PageSpeed_Desktop-85%2B%2F100-green?style=flat-square)](https://pagespeed.web.dev)

---

## Overview

**AETHER Vision** is a product landing page for a fictional next-generation AI Smart Glasses brand. The project was built as a **technical assessment for a Frontend Web Developer Internship** at HELICORP, with the objective of demonstrating production-ready frontend engineering across design, performance, accessibility, and interactivity.

The glasses concept itself features real-time AI translation, AR overlays, and an HD camera packed into a 38-gram titanium frame. The landing page reflects the product's premium positioning through a polished design system, smooth animations, and thoughtful UX details.

This is not a boilerplate. Every component was crafted with attention to visual quality, code maintainability, and real-world performance constraints.

---

## Live Demo

🌐 **[https://aether-vision-app.vercel.app](https://aether-vision-app.vercel.app)**

---

## Screenshots

| Section | Preview |
|:---|:---|
| Hero (Dark) | *(dark mode hero with aurora gradient and floating product image)* |
| Features Grid | *(6-card responsive feature grid with hover glow effects)* |
| Product Configurator | *(interactive color picker — Black, Silver, Blue)* |
| Gallery | *(editorial masonry lifestyle grid)* |
| Light Mode | *(Apple-inspired white paper card design system)* |
| Mobile View | *(fully responsive at 375px, score 95 on PageSpeed)* |

---

## Features

| Feature | Details |
|:---|:---|
| ✅ **Premium Landing Page** | Multi-section layout: Hero, Features, Product Showcase, Specs, Gallery, Testimonials, FAQ, Newsletter, Footer |
| ✅ **Responsive Design** | Tested across mobile (375px), tablet (768px), and desktop (1440px) |
| ✅ **Light / Dark Theme** | Fully independent design systems — not a simple color inversion. Persisted via `localStorage`, respects system preference |
| ✅ **Internationalization** | English & Vietnamese with a custom `useTranslation` hook and JSON locale files, no external i18n library |
| ✅ **AI Chatbot** | Live Gemini `gemini-flash-latest` integration. Knowledge-bounded to AETHER product context. Graceful fallback when API is unavailable |
| ✅ **Product Configurator** | Real-time color switching (Obsidian Black, Titanium Silver, Cobalt Blue) using CSS `filter` transformations and Framer Motion |
| ✅ **Newsletter Integration** | Supabase backend with duplicate email detection. Webhook fallback if Supabase is not configured |
| ✅ **User Behavior Tracking** | Custom `useTracking` hook: scroll depth, CTA clicks, and form submissions |
| ✅ **Smooth Animations** | Framer Motion for entrance animations, `whileInView`, and layout transitions |
| ✅ **CSS-first Animations** | Expensive JS animations converted to GPU-compositor CSS keyframes (`float`, `marquee`, `nudge`, `scrollDot`) |
| ✅ **Accessibility (WCAG AA)** | Full `aria-label`, `role`, and keyboard navigation on all interactive elements |
| ✅ **SEO Optimized** | Meta tags, Open Graph, Twitter Card, canonical URLs, semantic HTML structure |
| ✅ **Performance Optimized** | PageSpeed 95 (Mobile) / 85+ (Desktop). Non-blocking fonts, WebP images, lazy loaded sections, code splitting |
| ✅ **Cart System** | Global cart state via Zustand-like context, animated cart drawer |

---

## Tech Stack

| Category | Technology |
|:---|:---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19 + SSR) |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4, custom CSS design tokens (CSS variables) |
| **Animation** | Framer Motion 12 + CSS keyframes |
| **Routing** | TanStack Router (file-based) |
| **AI** | Google Generative AI SDK (`gemini-flash-latest`) |
| **Backend / Database** | Supabase (newsletter collection) |
| **Build Tool** | Vite 8 + Rolldown |
| **Deployment** | Vercel |
| **Icons** | Lucide React |
| **Notifications** | Sonner |

---

## Folder Structure

```
aether-vision-unveiled/
├── src/
│   ├── assets/                  # Optimized images (WebP + PNG/JPG originals)
│   │   ├── glasses-hero.webp    # LCP hero image — priority loaded
│   │   ├── glasses-detail.jpg   # Product detail section
│   │   └── lifestyle-*.jpg      # Gallery section images
│   │
│   ├── components/              # Feature components
│   │   ├── Hero.tsx             # Hero section — CSS-only animations, LCP optimized
│   │   ├── Navbar.tsx           # Fixed glass navbar with scroll detection
│   │   ├── Features.tsx         # 6-card feature grid
│   │   ├── ProductShowcase.tsx  # 3D product card + color configurator
│   │   ├── Specifications.tsx   # Spec cards grid
│   │   ├── Gallery.tsx          # Masonry lifestyle gallery
│   │   ├── Testimonials.tsx     # Review cards
│   │   ├── FAQ.tsx              # Animated accordion
│   │   ├── Newsletter.tsx       # Email capture with Supabase
│   │   ├── ChatWidget.tsx       # Gemini AI chatbot (lazy loaded)
│   │   ├── CartDrawer.tsx       # Shopping cart overlay
│   │   ├── Footer.tsx           # Site footer
│   │   ├── SEO.tsx              # Dynamic meta/OG tag injection
│   │   └── ScrollProgress.tsx   # Top scroll progress bar
│   │
│   ├── hooks/
│   │   ├── useTheme.ts          # Theme toggle with localStorage persistence
│   │   └── useTracking.ts       # Scroll + click event tracker
│   │
│   ├── lib/
│   │   ├── i18n.tsx             # Custom internationalization context
│   │   ├── store.tsx            # Global cart state (React Context)
│   │   ├── supabase.ts          # Supabase client (graceful null if unconfigured)
│   │   ├── webhook.ts           # Fallback webhook for newsletter
│   │   └── theme-script.ts      # Inline script to prevent theme flash (FOUC)
│   │
│   ├── locales/
│   │   ├── en.json              # English translations
│   │   └── vi.json              # Vietnamese translations
│   │
│   ├── routes/
│   │   ├── __root.tsx           # HTML shell, meta tags, font loading strategy
│   │   └── index.tsx            # Main page route with lazy-loaded sections
│   │
│   └── styles.css               # Global design tokens + component styles
│
├── .env                         # Local environment variables (not committed)
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/Vo-Hoa-Thuan/aether-vision-unveiled.git
cd aether-vision-unveiled

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at `http://localhost:8080`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file at the project root. The application degrades gracefully if any variable is missing.

```env
# Google Gemini AI — required for live chatbot
VITE_GEMINI_API_KEY=

# Supabase — required for newsletter persistence
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

> **Security note:** Never commit `.env` to version control. The `.gitignore` in this project excludes it. All `VITE_` prefixed variables are bundled into the client — use a backend proxy in production for sensitive API keys.

---

## Performance

This project was systematically optimized to reach **95/100 on Google PageSpeed Insights (Mobile)**.

| Optimization | Implementation |
|:---|:---|
| **Hero Image** | Converted to WebP (1.5 MB PNG → 55 KB WebP). `fetchPriority="high"`, `loading="eager"`, `decoding="sync"` |
| **Gallery Images** | All JPG assets converted to WebP. `loading="lazy"` on all below-fold images |
| **Non-blocking Fonts** | Google Fonts loaded via `media="print"` + `onload` swap. Removes 750ms render-blocking penalty |
| **CSS-only Animations** | Expensive JS-driven animations (blur, float, scroll dot) replaced with GPU-compositor CSS `@keyframes` |
| **Removed Global Transition** | The wildcard `*, ::before, ::after { transition }` was removed — it caused catastrophic INP on mobile by delaying all tap events by 400ms |
| **Removed Scroll Parallax** | `useScroll` + `useTransform` on the Hero section was creating a per-frame JS → Layout → Composite pipeline |
| **Dynamic Imports** | `ChatWidget` and lower-page sections lazy loaded via `React.lazy()` + `Suspense` |
| **Reduced Font Payload** | Trimmed Google Fonts request from 7 weights to 3 (`wght@400;500;600`) |

---

## Responsive Design

| Breakpoint | Behavior |
|:---|:---|
| **Mobile** (375px+) | Single column layout. Hamburger menu. Touch-optimized tap targets |
| **Tablet** (768px+) | 2-column grids for Features and Specifications |
| **Desktop** (1024px+) | Full multi-column layout. Floating stat pills visible on Hero |
| **Wide** (1440px+) | Max-width container with generous negative space |

---

## Accessibility

This project targets **WCAG 2.1 Level AA** compliance.

- All interactive elements have descriptive `aria-label` attributes
- Keyboard navigation fully functional (Tab, Enter, Escape)
- Focus indicators visible on all focusable elements (`:focus-visible`)
- Color contrast ratios meet AA requirements in both Light and Dark themes
- `role` attributes applied to landmark regions
- Images carry meaningful `alt` text; decorative images use `aria-hidden`
- Toasts and modals managed with appropriate ARIA live regions

---

## SEO

| Feature | Implementation |
|:---|:---|
| **Title Tags** | Unique, descriptive `<title>` per route |
| **Meta Description** | Compelling summary under 160 characters |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:type` |
| **Twitter Card** | `summary_large_image` format |
| **Canonical URL** | `<link rel="canonical">` on every page |
| **Semantic HTML** | Single `<h1>` per page, proper heading hierarchy, landmark elements |
| **Performance** | Core Web Vitals optimized (LCP, CLS, INP) — all measured via PageSpeed Insights |

---

## Future Improvements

Given more time or a production context, the following features would be high priority:

- **AR Preview** — WebXR-based try-on experience directly in the browser
- **Voice Assistant** — Speech-to-text integration for the AI chatbot
- **Product Comparison** — Side-by-side specification table across models
- **Authentication** — User accounts with Supabase Auth for order history
- **Shopping Cart** — Stripe payment integration for end-to-end checkout
- **Order Tracking** — Real-time order status with push notifications
- **JSON-LD Structured Data** — Product schema markup for Google Shopping eligibility
- **A/B Testing** — Variant testing on CTA copy and hero layout

---

## Author

**Võ Hòa Thuận**
Frontend Developer Intern Candidate

- GitHub: [@Vo-Hoa-Thuan](https://github.com/Vo-Hoa-Thuan)
- LinkedIn: *(add your profile URL here)*

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with precision for HELICORP Frontend Internship Assessment · 2026</sub>
</div>
