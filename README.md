# QuitTheApp Frontend PWA

QuitTheApp is a frontend-only React single-page PWA for a transportation business launch system. It includes four marketing funnels, a mock checkout, onboarding intake, DIY dashboard modules, a Done-For-You delivery pipeline, a resource toolbox, client-side persistence, and installable/offline PWA behavior.

## Features

- Four localized funnel routes: standard, women, seniors, and couples.
- Mock checkout with optional Done-For-You upgrade selection.
- Protected onboarding intake with local headshot preview.
- DIY dashboard with module progress tracking.
- DFY dashboard with a mock delivery timeline, stage selector, and deliverables.
- Resource toolbox with search, filters, featured assets, and placeholder open modal.
- English and Spanish localization.
- PWA manifest, generated service worker, install prompt, update prompt, and offline banner.
- Redux state persistence with Reset Demo cleanup.
- Responsive layout primitives and accessible reusable components.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS v4 with `@tailwindcss/vite`
- Redux Toolkit
- React Redux
- React Router DOM
- vite-plugin-pwa
- clsx
- tailwind-merge
- lucide-react
- motion

## Folder Structure

```text
src/
  app/                  Redux store, hooks, persistence wiring
  components/
    checkout/           Mock checkout UI
    common/             Reusable Button, Badge, Modal, ProgressBar, language toggle
    dashboard/          DIY, DFY, resources, cards, timeline, modals
    funnel/             Marketing funnel sections
    layout/             App shell and reusable layout primitives
    onboarding/         Business setup form and fields
    pwa/                Install, update, and offline UI
  features/
    appFlow/            App flow Redux slice and types
    dashboard/          Static dashboard, resource, and DFY data/types
    funnel/             Funnel data/types/helpers
    localization/       English/Spanish dictionaries and translation hook
  hooks/                PWA and browser state hooks
  lib/                  Shared utilities
  pages/                Route-level page components
  routes/               Router and route guards
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Preview

```bash
npm run preview
```

## PWA Installation

The app uses `vite-plugin-pwa` with `registerType: "prompt"`. In supported browsers, the install prompt appears when the browser emits `beforeinstallprompt`. After installation, the app launches in standalone display mode with cached shell assets.

For production validation, serve the built app over HTTPS and verify:

- Manifest loads successfully.
- Icons resolve from `public/`.
- Service worker is registered once.
- Offline refresh serves the cached app shell.
- Update prompt appears after a new deployment.

## Architecture Overview

The app is a client-only SPA. Business flow state lives in Redux under `appFlow`, static product/resource data lives under `features`, and UI is split into reusable components plus route-level pages. The router enforces purchase and onboarding access rules before rendering protected pages.

## Redux State Overview

`appFlow` stores:

- `locale`
- `activeFunnel`
- `hasPurchased`
- `hasDfyUpgrade`
- `onboardingCompleted`
- `driverProfile`
- `moduleStatuses`
- `dfyPipelineStep`

State is persisted to `localStorage` through `app/persistStore.ts`. Reset Demo dispatches `resetDemo`, clears persisted state, and returns to `/standard`.

## Routing Overview

- `/` redirects to `/standard`
- `/standard`
- `/women`
- `/seniors`
- `/couples`
- `/onboarding` requires purchase and redirects completed users to `/dashboard`
- `/dashboard` requires onboarding completion
- `*` renders the 404 page

## Localization Overview

Localized copy is defined in `features/localization/localizationData.ts`. `useTranslation()` reads the active locale from Redux and returns the current dictionary. Funnel, checkout, onboarding, dashboard status, and core shared labels are localized.

## Deployment Notes

- Deploy `dist/` to a static host.
- Use HTTPS so service workers and install prompts work.
- Configure fallback routing to `index.html` for SPA routes.
- Replace placeholder SVG icons before brand launch if final assets are available.
- Keep cache invalidation tied to deployments so update prompts behave predictably.

