# QuitTheApp Architecture

## Overall Architecture

QuitTheApp is a frontend-only React SPA packaged as a Progressive Web App. It has no backend, database, authentication, real checkout, or file storage. The application is organized around route-level pages, feature-owned static data, Redux state for user flow, and reusable UI/layout components.

## Folder Structure

- `src/app`: Redux store setup, typed hooks, and persistence.
- `src/components`: UI components grouped by surface area.
- `src/features`: typed feature data, slices, helpers, and localization dictionaries.
- `src/hooks`: browser/PWA hooks.
- `src/lib`: shared utilities such as class merging and storage helpers.
- `src/pages`: route-level page composition.
- `src/routes`: router definitions and route guards.

## Feature-Based Organization

The application keeps business concepts in `features` and presentation in `components`.

- `features/appFlow` owns flow state and reducers.
- `features/funnel` owns funnel definitions and route helpers.
- `features/localization` owns dictionaries and translation access.
- `features/dashboard` owns DIY modules, resource definitions, and DFY pipeline data.

## Redux State Flow

User actions dispatch Redux reducers:

- Funnel routes dispatch `setActiveFunnel`.
- Mock checkout dispatches `completePurchase`.
- Onboarding dispatches `submitOnboarding`.
- DIY module buttons dispatch `updateModuleStatus`.
- DFY stage selector dispatches `setDfyPipelineStep`.
- Reset Demo dispatches `resetDemo` and clears persisted storage.

Derived dashboard values are exposed through selectors in `appFlowSlice`.

## Route Guards

`RouteGuards.tsx` protects the two post-purchase routes:

- `RequirePurchase` allows onboarding only after purchase and redirects completed onboarding to dashboard.
- `RequireOnboarding` allows dashboard only after onboarding completion.

The root route redirects to `/standard`.

## Localization Architecture

Localization is Redux-driven. `locale` is stored in `appFlow`; `LanguageToggle` dispatches `toggleLocale`; `useTranslation()` returns the matching dictionary from `localizationData`.

Current dictionaries include English and Spanish. Copy that is still intentionally static, such as placeholder resource names and mock pipeline labels, is centralized in typed data files so it can be migrated into dictionaries when production copy is finalized.

## Dashboard Architecture

The dashboard switches experiences based on `hasDfyUpgrade`.

- DIY users see `LaunchProgress`, module cards, and the resource toolbox.
- DFY users see `DFYPipeline`, current project summary, timeline, stage simulator, success card, and deliverables.
- The resource toolbox is available inside the dashboard and uses static typed resource data.

## Reusable Layout Components

Layout primitives live in `components/layout`:

- `PageContainer`
- `Section`
- `ResponsiveGrid`
- `DashboardCard`
- `AppShell`

These centralize spacing, max widths, grid behavior, and card styling to reduce layout drift.

## PWA Architecture

`vite-plugin-pwa` generates the service worker. The app uses:

- `PWAUpdatePrompt` for offline-ready and update notices.
- `InstallPrompt` for browser install prompts.
- `OfflineBanner` for online/offline state.
- `useInstallPrompt` and `useOnlineStatus` for browser events.

No custom service worker is required for the current frontend-only scope.

## Future Backend Integration Strategy

Future production services should be introduced behind feature boundaries:

- Add authentication state outside `appFlow` or in a dedicated `auth` feature.
- Replace mock checkout with hosted Stripe Checkout or Payment Element integration.
- Replace local onboarding persistence with API-backed profile storage.
- Replace placeholder resources with signed asset URLs or CMS-managed files.
- Replace the DFY stage selector with an admin-controlled project status API.
- Add server-side validation for all submitted profile and payment data.

UI components should remain presentation-focused while network and domain logic live in feature services or API adapters.

