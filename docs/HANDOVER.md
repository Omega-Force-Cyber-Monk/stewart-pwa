# Developer Handover Guide — QuitTheApp Frontend (`stewart-pwa`)

Welcome to the **QuitTheApp (`stewart-pwa`)** codebase! This comprehensive guide provides everything you need to understand the business domain, architecture, routing, state management, API integration, local development, and deployment pipelines.

---

## 1. Project Overview & Business Domain

### 1.1 What is QuitTheApp?
QuitTheApp is a web-based platform and Progressive Web App (PWA) designed to empower rideshare drivers (Uber, Lyft, etc.) to transition into independent, private transportation business owners. 

The application serves three distinct user journeys:
1. **Prospective Drivers (Marketing & Acquisition):** A collection of high-converting, tailored landing funnels designed for specific demographic segments (General, Women, Seniors, Driving Couples, and Spanish-speaking drivers), equipped with intelligent exit-intent lead capture modals and integrated Stripe checkout.
2. **Onboarded Drivers (Client Portal & Business Launchpad):** A multi-step setup wizard that configures their private transportation business (business name, service areas, airport coverage, branding), generates downloadable digital business cards with QR codes (`html-to-image`), hosts training resources, and powers their own public website.
3. **Public Passengers / Riders (Tenant Websites):** Each driver gets a dedicated, personalized public booking website served dynamically via multi-tenant subdomains (e.g., `https://johns-rides.quittheapp.com/`).
4. **Platform Administrators (Backoffice Control Panel):** Comprehensive oversight over driver applications, review/approvals, inbound marketing leads, Stripe billing transactions, resource asset uploads, and support ticketing.

### 1.2 Tech Stack Summary
| Layer | Technologies |
|---|---|
| **Core Framework** | React 19 (`react` ^19.2.7, `react-dom` ^19.2.7) |
| **Language & Tooling** | TypeScript (~6.0), Vite 6 (`vite` ^6.4.3) |
| **Styling & Theme** | Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/typography`) with CSS theme variables |
| **State & API** | Redux Toolkit (`@reduxjs/toolkit` ^2.12.0) + RTK Query (`baseApi`) |
| **Routing** | React Router DOM v7 (`react-router-dom` ^7.18.1) |
| **PWA & Offline** | `vite-plugin-pwa` (Workbox) with custom install & update prompts |
| **Icons & Animation** | `lucide-react`, `react-icons`, `motion` (Framer Motion) |
| **Data Viz & Graphics** | `recharts` (admin analytics), `html-to-image` (business card export) |
| **Testing** | Node.js native test runner (`node --experimental-strip-types --test`) |
| **Production Server / Container** | Docker (Alpine Node 20 builder) + Caddy 2 reverse proxy / AWS S3 + CloudFront |

---

## 2. System Architecture & Dual-Mode Hosting

The application is a **single React Single Page Application (SPA)** that handles two fundamentally different modes based on the browser's hostname at runtime:

```
                                    Browser Request
                                           │
                           ┌───────────────┴───────────────┐
                           ▼                               ▼
                 Main Application Host           Tenant Subdomain Host
            (quittheapp.com / app.* / localhost)   (<slug>.quittheapp.com)
                           │                               │
             ┌─────────────┴─────────────┐                 │
             ▼                           ▼                 ▼
     Marketing Funnels            Authenticated        Tenant Public Page
   (/, /women, /senior,       Driver / Admin Portal    (RiderWebsitePage)
    /couple, /spanish)       (/dashboard, /admin, ...)     │
             │                           │                 ▼
             └─────────────┬─────────────┘      Fetches GET /public/business/:slug
                           ▼
                  RTK Query / Redux Store
                           │
                           ▼
                Backend REST API (/api/v1)
```

### 2.1 Domain Resolution (`src/lib/businessHost.ts`)
When the app boots, `src/routes/AppRouter.tsx` calls `resolveBusinessHost(window.location.hostname, publicBusinessDomain)`:
- **Main App Mode (`kind: "main"`):**
  - Hostnames matching `localhost`, `127.0.0.1`, `[::1]`, `*.localhost`, the primary domain (`quittheapp.com`), or reserved system subdomains (`www`, `api`, `admin`, `app`, `dashboard`).
  - Renders marketing pages, authentication, driver dashboard, and admin backoffice.
- **Tenant Mode (`kind: "tenant", slug: string`):**
  - Any valid single-label subdomain (e.g. `express-limo.quittheapp.com`).
  - Short-circuits regular routing and exclusively renders `<RiderWebsitePage slug={slug} />`.
  - Automatically queries `GET /public/business/<slug>`. If the business is inactive or doesn't exist, it displays a friendly "Website not found" state.

### 2.2 PWA & Service Worker Caching (`vite.config.ts`)
- **Plugin:** `vite-plugin-pwa` configured with `registerType: "prompt"`.
- **Pre-cached Assets:** App shell, JavaScript chunks, CSS stylesheets, SVGs, and brand icons.
- **Runtime Caching Rules:**
  - `CacheFirst` for static image assets (up to 100 entries, 30 days expiration).
  - `StaleWhileRevalidate` for same-origin app navigation assets.
  - **Explicit Denylist:** `/api/*` requests are strictly excluded from service worker caching so mutations and queries are always live.
- **PWA UI Components (`src/components/pwa/`):**
  - `InstallPrompt.tsx`: Intercepts `beforeinstallprompt` and offers an in-app installation banner.
  - `PWAUpdatePrompt.tsx`: Notifies users when a new deployment is available and offers a 1-click reload.
  - `OfflineBanner.tsx`: Monitored via `useOnlineStatus` hook to notify users if connection drops.
  - `AbandonedCheckoutPrompt.tsx`: Reminds returning users who abandoned checkout.

---

## 3. Directory Structure & Codebase Map

```text
stewart-pwa/
├── .env.example                     # Environment template
├── Dockerfile                       # Multi-stage production build (Node 20 -> Caddy 2)
├── docker-compose.yml               # Local container orchestrator
├── package.json                     # Dependencies, scripts, engines
├── tsconfig.json                    # Base TS config
├── tsconfig.app.json                # React/Vite TypeScript rules
├── vite.config.ts                   # Vite, Tailwind v4, & PWA configuration
├── tests/
│   └── exitIntentLogic.test.ts      # Unit tests for exit-intent & phone validation
├── public/                          # Static icons, manifest, favicon, brand assets
├── src/
│   ├── App.tsx                      # Root App component, layout shells, PWA alerts
│   ├── main.tsx                     # React DOM entry point, Redux Provider, Router
│   ├── index.css                    # Tailwind CSS v4 setup & theme variables
│   │
│   ├── assets/                      # Bundled raster/vector artwork, hero images, upsell kits
│   │
│   ├── routes/
│   │   └── AppRouter.tsx            # Main router, route guards, tenant isolation
│   │
│   ├── store/                       # Redux Toolkit & RTK Query
│   │   ├── store.ts                 # Store configuration & middleware registration
│   │   ├── features/auth/
│   │   │   └── authSlice.ts         # User session, JWT tokens, localStorage sync
│   │   └── api/                     # RTK Query API slice definitions
│   │       ├── baseApi.ts           # Base query, JWT re-auth interceptor, cache tags
│   │       ├── Admin/               # Admin endpoints (drivers, metrics, leads, billings)
│   │       ├── Auth/                # Authentication endpoints (login, register, me, refresh)
│   │       ├── Business/            # Driver onboarding, setup state, launch, referral cards
│   │       ├── Payment/             # Stripe checkout session creation
│   │       ├── Support/             # Support tickets creation & replies
│   │       └── Health/              # Server health monitoring
│   │
│   ├── pages/                       # Page-level components
│   │   ├── HomePage.tsx             # Standard marketing funnel
│   │   ├── WomenPage.tsx            # Female driver marketing funnel
│   │   ├── CouplePage.tsx           # Driving couples marketing funnel
│   │   ├── SeniorPage.tsx           # Senior / retiree marketing funnel
│   │   ├── SpanishPage.tsx          # Spanish-language marketing funnel
│   │   │
│   │   ├── DashboardPage.tsx        # Driver overview & quick metrics
│   │   ├── LaunchDashboardPage.tsx  # 4-step driver launch onboarding wizard
│   │   ├── BookingReferralCardPage.tsx # Digital QR card generator & download tool
│   │   ├── SellingPage.tsx          # Marketing playbook & pitch deck
│   │   ├── ResourcesAndGuidesPage.tsx # Downloadable resources and operational guides
│   │   ├── PaymentBillingPage.tsx   # Subscription management & invoice history
│   │   ├── PaymentSuccessPage.tsx   # Post-Stripe redirect polling page
│   │   ├── ProfileSettingsPage.tsx  # Account information & password reset
│   │   │
│   │   ├── PersonalizeWebsite/      # Tenant rider public website & subcomponents
│   │   │   ├── RiderWebsitePage.tsx # Main tenant page wrapper
│   │   │   ├── HeroSection.tsx      # Driver hero banner & booking CTA
│   │   │   ├── OurServices.tsx      # Services list (airport transfers, private rides)
│   │   │   ├── AirportsServed.tsx   # Airport coverage listing
│   │   │   ├── ServiceAreaSection.tsx # City & regional boundaries
│   │   │   ├── TrustBadges.tsx      # Safety, licensing, & background check badges
│   │   │   └── WebsiteFooter.tsx    # Driver contact details & booking disclaimer
│   │   │
│   │   ├── Auth/                    # Authentication views
│   │   │   ├── LoginPage.tsx        # Sign-in page (diverts admin vs driver)
│   │   │   ├── SignupPage.tsx       # Driver account registration
│   │   │   ├── ForgotPasswordPage.tsx # Password recovery request
│   │   │   └── ResetPasswordPage.tsx  # Password reset confirmation
│   │   │
│   │   └── Admin... (8 pages)       # Admin backoffice suite:
│   │       ├── AdminDashboardPage.tsx    # KPI overview & driver status charts
│   │       ├── AdminDriversPage.tsx      # Full driver listing & status management
│   │       ├── AdminDriverDetailsPage.tsx# Deep-dive driver inspector
│   │       ├── AdminLeadsPage.tsx        # Inbound marketing leads table
│   │       ├── AdminBillingsPage.tsx     # Stripe payment ledger
│   │       ├── AdminResourcesUploadPage.tsx # File upload for driver guides
│   │       ├── AdminSupportPage.tsx      # Support ticket resolution inbox
│   │       └── AdminSettingsPage.tsx     # Platform settings
│   │
│   ├── components/                  # Reusable UI widgets
│   │   ├── layout/                  # Shells: DashboardShell, AppShell, AuthLayout
│   │   ├── marketing/               # ExitIntentPopup, PricingModal, ExperienceSection
│   │   │   └── exit-intent/         # Trigger algorithms, storage keys, modal dialogs
│   │   ├── dashboard/               # LaunchProgressStepper, ContactSupportModal
│   │   ├── admin/                   # DataTable, LogoutModal
│   │   ├── resources/               # ResourceCard, GuideModal
│   │   └── pwa/                     # InstallPrompt, OfflineBanner, PWAUpdatePrompt
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── storeHooks.ts            # Typed useDispatch & useSelector
│   │   ├── useRequireAdmin.ts       # Route guard hook for admin sections
│   │   ├── useExitIntentPopup.ts    # Mouse leave & scroll intersection watcher
│   │   ├── useInstallPrompt.ts      # Native PWA install prompt handler
│   │   ├── useOnlineStatus.ts       # Network online/offline listener
│   │   └── useConfirmDialog.tsx     # Reusable confirmation modal helper
│   │
│   ├── lib/                         # Pure utility libraries
│   │   ├── businessHost.ts          # Subdomain parsing & tenant resolution
│   │   ├── cn.ts                    # Classname merge helper (`clsx` + `tailwind-merge`)
│   │   ├── storage.ts               # Local/session storage key manager
│   │   ├── marketingOverlay.ts      # State coordinator preventing modal overlap
│   │   └── formatCategory.ts        # Category label formatter
│   │
│   └── utils/
│       └── clipboard.ts             # Safe fallback clipboard copy utility
```

---

## 4. Key User Journeys & Technical Flow

### 4.1 Marketing Funnels, Exit Intent, & Checkout
1. **Entry:** Prospects enter via `/`, `/women`, `/couple`, `/senior`, or `/spanish`.
2. **Attribution & Session:** A unique session ID is recorded in session storage. Last-touch UTM and doorway parameters are tracked.
3. **Exit-Intent Detection (`src/components/marketing/exit-intent/`):**
   - **Desktop:** Triggers when the cursor moves above the browser viewport (`clientY <= 0`).
   - **Mobile:** Triggers via IntersectionObserver as the user reaches the trigger marker.
   - **Suppression:** Suppressed if already shown, if the user consented, or if the `PricingModal` is currently visible (coordinated via `src/lib/marketingOverlay.ts`).
   - **Form Capture:** Validates US phone numbers (normalized strictly to 10 digits via `normalizeUsPhone`) and records SMS consent version (`sms-consent-v1`) before calling `useSubmitLeadMutation`.
4. **Checkout (`PricingModal.tsx`):**
   - User chooses between the **Base Launch Kit** (`productId: "base_variant"`) or the **Bundle** (Base + `productId: "addon"`).
   - If not signed in, collects guest email and sends request to `useCreateRiderCheckoutSessionMutation`.
   - Backend returns a Stripe Hosted Checkout URL (`checkoutUrl`); frontend redirects the browser.

### 4.2 Post-Payment Confirmation & Onboarding Wizard
1. **Stripe Redirect:** Upon payment completion, Stripe redirects the driver to `/payment/success`.
2. **Polling Loop:** `PaymentSuccessPage.tsx` polls `GET /auth/me` until the backend Stripe webhook sets `purchase.status === "paid"`.
3. **Launch Setup Form (`LaunchDashboardPage.tsx`):**
   - Step 1: **Buyer Information** (Full Name, Contact Email, Phone).
   - Step 2: **Business Information** (Business Name, Public Email, Phone, Description, Logo Upload, Acuity Booking Link).
   - Step 3: **Service Area** (Primary City/Metro Area, Airport auto-suggest search via `useLazyGetAirportSuggestionsQuery`).
   - Step 4: **Final Review & Launch**: Inspects completeness via `useGetLaunchReadinessQuery`. Once verified, driver clicks **Complete Launch** (`useCompleteLaunchMutation`), marking the business as `ACTIVE` and publishing their subdomain!

### 4.3 Active Driver Portal
- **Dashboard (`/dashboard`):** Real-time business status badge (`ACTIVE` vs `PENDING`), quick access to business card, shareable link, and featured guides.
- **Booking & Referral Card (`/booking-referral-card`):**
  - Renders a printable digital business card with the driver's QR code and custom slug URL.
  - Generates downloadable PNGs on the fly using `html-to-image` (`toPng(cardRef.current)`).
- **Resources & Guides (`/resources-guide`):** Searchable library of operational guides (licensing, insurance, marketing tactics) with integrated PDF/in-app reader modal.

### 4.4 Tenant Rider Website (`RiderWebsitePage.tsx`)
- Accessed when visiting `https://<slug>.quittheapp.com/`.
- Fetches data via `GET /public/business/:slug`.
- Displays driver's custom logo, name, direct phone call action, direct SMS action, Acuity scheduling link (if configured), airport transfer badges, and localized service radius.

### 4.5 Admin Backoffice (`/admin`)
- Accessible only to users with `role: "admin"` (guarded on client by `useRequireAdmin.ts` and on server by JWT payload verification).
- **Dashboard:** Platform metrics (Active Drivers, Pending Reviews, Total Revenue, Conversion Rate) with time-series charts via Recharts.
- **Driver Management:** View, search, inspect (`/admin/drivers/:id`), approve, or suspend driver accounts.
- **Leads:** View and export leads captured across all landing page funnels and exit-intent popups.
- **Resources Upload:** Upload PDFs and guides for driver distribution.
- **Support Inbox:** Respond to driver inquiries and update ticket statuses.

---

## 5. State Management & API Integration

### 5.1 Redux Store & Authentication Slice (`src/store/`)
- Store configuration: `src/store/store.ts`.
- Auth slice (`src/store/features/auth/authSlice.ts`):
  - Tracks `accessToken`, `refreshToken`, and `user` object.
  - Automatically loads and synchronizes credentials to `localStorage` (`accessToken`, `refreshToken`, `user`).
  - Actions: `setCredentials`, `updateUser`, `logOut`.

### 5.2 RTK Query Base API & Re-Auth Interceptor (`src/store/api/baseApi.ts`)
- **Base URL:** Driven by `VITE_API_BASE_URL` (defaults to `http://localhost:3000/api/v1` in local dev).
- **Header Injection:** Intercepts every outgoing request and attaches `Authorization: Bearer <accessToken>`.
- **Automated Token Refresh:**
  - If any API endpoint returns `401 Unauthorized`, `baseQueryWithReauth` intercepts the failure.
  - Issues a `POST /auth/refresh` request with `refreshToken`.
  - On success, dispatches `setCredentials` with the new tokens and retries the original request seamlessly.
  - On failure, dispatches `logOut()` and redirects to login.
- **Cache Tags:**
  Provides declarative invalidation across:
  `Dashboard`, `Drivers`, `Driver`, `Businesses`, `Business`, `Payments`, `Payment`, `Resources`, `Resource`, `Tickets`, `Ticket`, `Settings`, `Setting`, `Users`, `User`, `Setup`, `LaunchReady`, `ReferralCard`, `Leads`, `Lead`.

---

## 6. Environment Variables

Create `.env` for development and `.env.production` for production deployments:

```env
# URL where the stewart-backend REST API is reachable
VITE_API_BASE_URL=https://api.quittheapp.com/api/v1

# The root domain used to resolve tenant subdomains (must match backend PUBLIC_BUSINESS_DOMAIN)
VITE_PUBLIC_BUSINESS_DOMAIN=quittheapp.com
```

> ⚠️ **Important Vite Notice:** Variables prefixed with `VITE_*` are compiled **statically** into the JavaScript bundle at build time. If you update `.env`, you must restart the dev server or re-run `npm run build`.

---

## 7. Local Development & Setup

### 7.1 Prerequisites
- **Node.js:** 20.x or later (Node 22 / 24 also fully supported).
- **npm:** 10.x or later.

### 7.2 Installation & Startup
```bash
# 1. Clone repository & enter directory
cd stewart-pwa

# 2. Install dependencies cleanly
npm ci

# 3. Create your local environment file
cp .env.example .env

# 4. Start the local Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 7.3 Testing Tenant Subdomains Locally
Because `localhost` is treated as a main host by default, test tenant routing locally by:
1. **Option A (Subdomain on localhost):** In modern Chrome/Firefox/Safari, `*.localhost` automatically maps to `127.0.0.1`.
   - Update `.env`: `VITE_PUBLIC_BUSINESS_DOMAIN=localhost:5173`
   - Visit: `http://johns-rides.localhost:5173/`
2. **Option B (`/etc/hosts`):** Add a local testing domain:
   ```bash
   sudo nano /etc/hosts
   # Add:
   127.0.0.1 dev.quittheapp.test
   127.0.0.1 mydriver.dev.quittheapp.test
   ```
   Set `VITE_PUBLIC_BUSINESS_DOMAIN=dev.quittheapp.test:5173` and browse to `http://mydriver.dev.quittheapp.test:5173`.

### 7.4 Running Tests & Linting
```bash
# Run unit tests (Node native test runner with TS support)
npm test

# Run ESLint validation
npm run lint

# Build production bundle and check TypeScript types
npm run build

# Preview production build locally
npm run preview
```

---

## 8. Deployment & DevOps Guide

### 8.1 Production Architecture (AWS S3 + CloudFront)
The recommended production hosting setup is a static S3 bucket fronted by AWS CloudFront:
1. **S3 Bucket:** `stewart-pwa-prod` (All public access blocked, Origin Access Control enabled).
2. **CloudFront Distribution:**
   - **Origins:** S3 bucket via OAC.
   - **Alternate Domain Names (CNAMEs):** `app.quittheapp.com` **AND** `*.quittheapp.com`.
   - **SSL Certificate:** AWS Certificate Manager (ACM) wildcard certificate in `us-east-1` covering `quittheapp.com` and `*.quittheapp.com`.
   - **Default Root Object:** `index.html`.
   - **Custom Error Responses (Critical for SPA Routing):**
     - Error `403` -> Response Page `/index.html` with Status `200`.
     - Error `404` -> Response Page `/index.html` with Status `200`.
3. **DNS Records (GoDaddy / Route 53):**
   - CNAME `app` -> `<distribution-id>.cloudfront.net`
   - CNAME `*` -> `<distribution-id>.cloudfront.net` (Routes all driver subdomains to CloudFront)
4. **Deploy Command:**
   ```bash
   npm ci
   npm run build
   aws s3 sync dist/ s3://stewart-pwa-prod --delete
   aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
   ```

### 8.2 Containerized Deployment (Docker + Caddy)
If deploying to Docker / VPS / Kubernetes:
- The project includes a multi-stage `Dockerfile`:
  - **Stage 1 (Build):** Uses `node:20-alpine`, runs `npm ci` and `npm run build`.
  - **Stage 2 (Runtime):** Uses `caddy:2-alpine`, serves static files from `/usr/share/caddy` with gzip compression, security headers (`X-Frame-Options DENY`, `nosniff`), and `try_files {path} /index.html`.
- Run locally or on server via Docker Compose:
  ```bash
  docker compose up -d --build
  ```

---

## 9. Key Gotchas, Quirks, & Pro-Tips

1. **Tailwind CSS v4 Engine:**
   - This project uses **Tailwind v4** with `@tailwindcss/vite`.
   - There is **no `tailwind.config.js`**. Theme configuration and custom colors (e.g. `--color-brand-page`, `--color-dashboard-rider`, `--color-dashboard-sidebar`) are defined directly in `src/index.css` inside the `@theme` directive.
2. **Exit Intent Popup Coordination (`marketingOverlay.ts`):**
   - To prevent overlapping modal clashes, `PricingModal` and `ExitIntentPopup` synchronize via `src/lib/marketingOverlay.ts`. If `pricingModalVisible` is true, exit-intent popups are immediately suppressed.
3. **Strict Phone Number Validation:**
   - Backend requires a clean 10-digit US phone number. All forms should use `normalizeUsPhone()` from `src/components/marketing/exit-intent/exitIntentLogic.ts` which strips non-digits and removes a leading US country code (`1`).
4. **Referral Card Generation (`html-to-image`):**
   - When generating referral cards with `toPng(cardRef.current)`, ensure all images in the card are served with appropriate CORS headers or bundled locally in `src/assets/`. If external images are added, pass `cacheBust: true` and `skipFonts: true`.
5. **Payment Success Webhook Delay:**
   - If a test user pays on Stripe and sits on `/payment/success`, the page polls `/auth/me`. If it gets stuck, verify the Stripe CLI or backend webhook listener (`stripe listen --forward-to localhost:3000/api/v1/payment/webhook`) is active and delivering events.
6. **Code Chunk Optimization Warning:**
   - The production build currently outputs chunks exceeding 500 kB (primarily marketing pages with embedded assets and icon libraries). When adding new features, consider leveraging `React.lazy()` and `Suspense` inside `AppRouter.tsx` to code-split routes.

---

## 10. Useful Contacts & Related Repositories

- **Backend Repository:** `stewart-backend` (Node.js/Express, PostgreSQL, Prisma/TypeORM, Stripe SDK, AWS S3 file storage). Refer to `stewart-backend/DEPLOYMENT.md` for API contract documentation and webhook setup.
- **Production URL:** `https://quittheapp.com`
- **Main App URL:** `https://app.quittheapp.com`
- **API Production Endpoint:** `https://api.quittheapp.com/api/v1`

---
*Document prepared for developer handover. For any questions regarding recent redesign implementations, see additional deep dives in `docs/redesign-plan/`.*
