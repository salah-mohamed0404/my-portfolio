# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev` (runs at localhost:4321)
- **Build**: `pnpm build` (outputs to `./dist/`)
- **Preview**: `pnpm preview`
- **Add shadcn component**: `pnpm dlx shadcn@latest add <component>`

No lint or test commands are configured.

## Architecture

Astro 5 portfolio site using islands architecture with React 19 for interactive components. Tailwind CSS v4 via Vite plugin (not PostCSS). shadcn/ui (New York style) for base UI components.

### Key directories

- `src/pages/` — Astro page routes (single-page portfolio at `index.astro`)
- `src/layouts/` — `Layout.astro` (root HTML shell), `SectionWrapper.astro` (content section scoping)
- `src/components/home/` — Page sections (`HeroSection.astro`, `HeroBackground.tsx`)
- `src/components/common/` — Shared components (`NavBar/`, `Footer/`)
- `src/components/ui/` — shadcn components
- `src/constants/` — Typed constants (`nav-links.ts`, `contact-info.ts`, `social-media.ts`)
- `src/lib/` — Utilities (`shadcnUtils.ts` for `cn()`, `theme.ts` for theme management)
- `src/styles/global.css` — Tailwind imports, CSS custom properties, custom utilities (`.glass`, `.text-gradient`, `.glow`)

### Component pattern

Astro components (`.astro`) handle server-rendered markup. React components (`.tsx`) are hydrated as islands via client directives:

- `client:load` — Critical interactive components (nav, theme toggle)
- `client:idle` — Non-critical animations (HeroBackground)
- `client:visible` — Below-fold components (Footer)
- `client:media="(max-width: 767px)"` — Viewport-conditional (MobileNav)

### Theme system

Dark mode uses `.dark` class on `<html>`. An inline script in `Layout.astro` reads `localStorage("theme")` before paint to prevent FOUC. Theme utilities live in `src/lib/theme.ts`. CSS variables use OKLCH color space, except `.glass`/`.glow` utilities which use HSL.

### Animation stack

- **motion** (Framer Motion) — React component animations (`motion/react` import path)
- **AOS** — Scroll-triggered animations via `data-aos` attributes
- **tw-animate-css** — Tailwind animation utilities
- **@tanstack/pacer** — Scroll handler throttling

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`). Always use `@/` for imports.

### Naming conventions

- Components: PascalCase (`DesktopNav.tsx`, `HeroSection.astro`)
- Constants files: kebab-case (`nav-links.ts`)
- Exported constants: UPPER_SNAKE_CASE (`NAV_LINKS`, `CONTACT_INFO`)
