# Exit-Intent Popup — Implementation Report

**Repository:** `stewart-pwa`  
**Branch:** `redesign/dashboards-v2`  
**Feature commit:** `6d79a27 feat: add exit-intent lead capture popup`  
**Scope:** Frontend implementation only. The backend repository was not modified.

## 1. Executive summary

Implemented the approved exit-intent popup lead-capture feature for the five public marketing doorways:

- `/`
- `/senior`
- `/women`
- `/couple`
- `/spanish`

The implementation uses one global popup component, route-based typed copy configuration, deterministic desktop/mobile triggers, session-scoped attribution, typed Redux Toolkit Query endpoints, and a protected admin lead-management page.

No CRM, analytics SDK, SMS provider, email delivery, lead-magnet download, or fabricated Spanish story content was added. Those items are explicitly outside the approved frontend scope.

## 2. Source requirements used

The implementation followed these binding documents:

- `docs/redesign-plan/EXIT-INTENT-FRONTEND-AGENT-PROMPT.md`
- `docs/redesign-plan/EXIT-INTENT-POPUP-ANALYSIS.md`
- Original specification: `C:\Users\user\Documents\stewart-docs\QuitTheApp.com — (Pop-UP) Exit-Intent Popup Build Spec.docx`
- Five supplied popup screenshots:
  - `Standard-page-pop-up.png`
  - `50-plus-page-pop-up.png`
  - `women-page-pop-up.png`
  - `Couple-page-pop-up.png`
  - `Spanish-page-pop-up.png`

`Mail.pdf` was inspected as a binary five-page PDF, but it contained no extractable text and the available environment could not render it. No additional requirements from that PDF were assumed.

## 3. Main implementation decisions

### One global popup

The popup is mounted once from `src/App.tsx` through `MarketingExitIntent`. The five landing pages do not contain duplicated popup logic.

This was chosen because the contract explicitly required one shared component and because the existing pages previously duplicated pricing-modal orchestration.

### Typed route configuration

`src/components/marketing/exitIntentConfig.ts` defines the exact five route configurations and approved copy. It contains:

- source page ID;
- locale;
- headline;
- subhead;
- submit label;
- microcopy.

The component selects configuration from the current pathname instead of scattering copy across page conditionals.

### Main-host eligibility

`src/hooks/useExitIntentPopup.ts` checks both:

1. Current pathname is one of the five allowed routes.
2. `resolveBusinessHost()` reports the main host.

The popup therefore does not render on tenant hosts, dashboards, admin pages, auth pages, payment routes, or arbitrary paths.

### Desktop trigger

For non-coarse pointers, the hook listens for document `mouseleave` and triggers only when:

```text
event.clientY <= 0
```

The implementation does not claim to observe browser chrome, tab bars, or browser close/back controls because browsers do not expose that information directly.

### Mobile trigger

For coarse pointers, the hook:

- starts a 30-second timer on eligible doorway entry;
- observes `[data-exit-intent-hero]` with `IntersectionObserver`;
- triggers at the timer check only when the latest intersection ratio is greater than zero;
- does not trigger during that visit if the hero is not visible at the check.

Hero markers were added to the top-level hero containers in:

- `HomePage.tsx`
- `SeniorPage.tsx`
- `WomenPage.tsx`
- `CouplePage.tsx`
- `SpanishPage.tsx`

### Session state and attribution

`src/lib/storage.ts` now includes guarded `sessionStorage` helpers and stores:

```text
quittheapp:marketingSessionId
quittheapp:marketingAttribution
quittheapp:marketingConsumed
quittheapp:marketingSuppressed
```

The session ID is created once per browser session using `crypto.randomUUID()` or `crypto.getRandomValues()`. If secure randomness is unavailable, ID creation fails rather than falling back to `Math.random()`.

Last-touch attribution is overwritten on every eligible doorway entry, including empty values, for:

- `sourcePage`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmTerm`
- `utmContent`
- `referrer`

### One popup per session

The popup is consumed as soon as it opens. Closing, submitting, or navigating between doorways cannot show another popup in the same browser session.

### Overlay coordination

`src/lib/marketingOverlay.ts` provides shared in-memory visibility state for:

- `pricingModalVisible`
- `abandonedCheckoutVisible`

`PricingModal` marks itself visible while mounted. `AbandonedCheckoutPrompt` publishes its visibility and hides itself if pricing opens. The exit-intent hook will not open while either overlay is visible.

### FAQ decision

The five current marketing FAQ sections are static cards, not accordions. The product decision was to keep them static. No accordion conversion was added, and no artificial FAQ interaction event was invented.

As a result, the contract’s FAQ-accordion suppression rule has no event source on these pages. The suppression helper exists, but it is not triggered by the current static FAQ UI. This is intentional and should remain visible in review documentation.

## 4. Popup UI implementation

`src/components/marketing/ExitIntentPopup.tsx` renders:

- dark backdrop;
- centered white rounded modal;
- close X button;
- exact route-specific headline/subhead;
- phone field with phone icon;
- city field with building icon;
- required consent checkbox;
- full-width green CTA;
- route-specific microcopy;
- loading state;
- recoverable validation/API errors;
- exact approved success state.

The form contains exactly three fields:

1. Phone number
2. City
3. SMS consent checkbox

No name field was added.

### Validation and normalization

Phone input accepts digits, spaces, hyphens, parentheses, and dots. Formatting is stripped and exactly ten digits are required. The payload uses `+1XXXXXXXXXX`.

City input is trimmed and repeated whitespace is collapsed.

Consent must be checked and submits:

```text
smsConsent: true
consentTextVersion: "sms-consent-v1"
```

English and Spanish consent copy follow the binding contract exactly.

### Success behavior

For both new and duplicate-success responses, the modal remains open and replaces the form with:

```text
Thanks — your request was received.
We’ll send the requested checklist or guide to the phone number provided.
```

No redirect, download, email, SMS, or lead-magnet delivery occurs.

Escape-key close was added in addition to the screenshot close button and backdrop behavior.

## 5. API layer changes

### Public API

Added to the existing Business RTK Query slice:

```text
GET  /public/lead-config
POST /public/leads
```

The public submission request includes:

- normalized phone;
- normalized city;
- source page;
- session ID;
- all attribution fields;
- affirmative consent;
- fixed consent version.

The public response is typed to the safe response shape and does not expect phone, consent, IP, user-agent, or full attribution data.

### Admin API

Added to the existing Admin RTK Query slice:

```text
GET    /admin/leads
GET    /admin/leads/:id
PATCH  /admin/leads/:id
DELETE /admin/leads/:id
GET    /admin/leads/export.csv
```

Added tags:

```text
Leads
Lead
```

List queries provide collection/entity tags. Update and delete mutations invalidate both the collection and the affected lead entity.

CSV export is a lazy blob query and does not use direct `fetch` or axios.

## 6. Admin Lead Submissions page

### Route/navigation

Added `/admin/leads` to `AppRouter.tsx` behind `AdminRoute`.

Added `Lead Submissions` to `DashboardShell` immediately after Dashboard. Final admin order is:

1. Dashboard
2. Lead Submissions
3. Drivers Management
4. Resources Upload
5. Billings
6. Support
7. Settings

### Page capabilities

`src/pages/AdminLeadsPage.tsx` includes:

- paginated table;
- phone/city search;
- source doorway filter;
- status filter;
- from/to date filters;
- detail modal;
- UTM and referrer display;
- consent audit fields;
- timestamps;
- IP address and user-agent display for admins;
- status update;
- delete confirmation;
- CSV export;
- loading, error, retry, and empty states.

Statuses are displayed as:

- New
- Contacted
- Converted
- Spam

Existing `DataTable` and `AdminStatusChip` patterns were reused. Lead-specific status colors were added to `AdminStatusChip`:

- Contacted → blue;
- Converted → green;
- Spam → red;
- New → amber/default pending styling.

No separate lead detail route was added because the contract permits a modal/view and the existing admin UI uses modal/detail patterns.

## 7. Files changed

### New files

- `src/components/marketing/ExitIntentPopup.tsx`
- `src/components/marketing/MarketingExitIntent.tsx`
- `src/components/marketing/exitIntentConfig.ts`
- `src/components/marketing/exitIntentLogic.ts`
- `src/hooks/useExitIntentPopup.ts`
- `src/lib/marketingOverlay.ts`
- `src/pages/AdminLeadsPage.tsx`
- `tests/exitIntentLogic.test.ts`

### Updated files

- `package.json`
- `src/App.tsx`
- `src/components/PricingModal.tsx`
- `src/components/admin/DataTable.tsx`
- `src/components/layout/DashboardShell.tsx`
- `src/components/pwa/AbandonedCheckoutPrompt.tsx`
- `src/lib/storage.ts`
- `src/pages/HomePage.tsx`
- `src/pages/SeniorPage.tsx`
- `src/pages/WomenPage.tsx`
- `src/pages/CouplePage.tsx`
- `src/pages/SpanishPage.tsx`
- `src/routes/AppRouter.tsx`
- `src/store/api/baseApi.ts`
- `src/store/api/Business/business.api.ts`
- `src/store/api/Business/business.type.ts`
- `src/store/api/Admin/admin.api.ts`
- `src/store/api/Admin/admin.type.ts`

## 8. Testing and verification

Added the project script:

```text
npm test
```

It runs Node’s built-in test runner with native TypeScript stripping:

```text
node --experimental-strip-types --test tests/exitIntentLogic.test.ts
```

The test suite covers:

- exact eligible routes;
- approved route configuration/locales;
- phone normalization/validation;
- city normalization;
- consent validation;
- desktop top-edge predicate;
- mobile intersection predicate;
- session ID creation/reuse and exact key;
- last-touch overwrite including empty values;
- consumed/suppressed session state;
- overlay visibility state.

Final command results:

```text
npm test       PASS — 9 tests passed
npm run lint   PASS — 0 errors, 1 warning
npm run build  PASS — TypeScript and Vite production build
 git diff --check PASS
```

The one lint warning is an existing-style `react-hooks/exhaustive-deps` warning in `src/pages/AdminSettingsPage.tsx`; it is unrelated to the popup feature and does not fail the command.

## 9. Backend/runtime dependencies

The frontend expects the backend to implement and expose:

```text
GET    /api/v1/public/lead-config
POST   /api/v1/public/leads
GET    /api/v1/admin/leads
GET    /api/v1/admin/leads/:id
PATCH  /api/v1/admin/leads/:id
DELETE /api/v1/admin/leads/:id
GET    /api/v1/admin/leads/export.csv
```

The frontend does not implement backend storage, deduplication, Spanish enablement, validation enforcement, or admin authorization. Those remain backend responsibilities described by the binding contract.

## 10. Known limitations and handoff items

1. The current five FAQ sections remain static by explicit product decision. Therefore no FAQ accordion suppression event exists.
2. The Spanish popup is correctly hidden unless the backend returns `success: true` and `spanishPopupEnabled: true`.
3. No Spanish operator story, photo, or lead magnet content was fabricated.
4. The PDF `Mail.pdf` could not provide additional extractable requirements in this environment; its contents should be reviewed separately if it is authoritative beyond the DOCX and binding analysis.
5. Browser-level visual/interaction testing should still be run against the five screenshot variants on a deployed or locally running app with the lead backend available.
6. The current branch contains pre-existing untracked `.zcode/` and redesign-document files; they were not included in the feature commit.

## 11. Recommended supervisor verification order

1. Confirm backend endpoints and response shapes are deployed.
2. Open each doorway route and compare popup copy/layout with its screenshot.
3. Verify desktop top-edge trigger and non-top-edge non-trigger.
4. Verify mobile 30-second hero-visible and hero-hidden cases.
5. Verify one-popup-per-session across all five routes.
6. Verify PricingModal and AbandonedCheckoutPrompt never overlap.
7. Verify Spanish flag disabled/enabled behavior.
8. Submit a lead and inspect the exact normalized payload in the network request.
9. Test admin filters, detail modal, status update, delete, and CSV export.
10. Decide whether a future product revision should convert static FAQs to accordions to activate FAQ suppression.
