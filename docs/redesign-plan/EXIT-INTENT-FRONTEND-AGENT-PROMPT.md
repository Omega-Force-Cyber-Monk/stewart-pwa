# Frontend Agent Prompt — Exit-Intent Popup

## Mission

Implement the approved Exit-Intent Popup lead-capture feature in:

`C:\Users\user\Documents\projects\stewart-pwa`

This is a deterministic implementation task. Do not invent copy, fields,
routes, providers, delivery behavior, trigger behavior, or API shapes. Read
`EXIT-INTENT-POPUP-ANALYSIS.md` in this same directory before editing; it is the
binding contract.

The original source specification is:

`C:\Users\user\Documents\stewart-docs\QuitTheApp.com — (Pop-UP) Exit-Intent Popup Build Spec.docx`

## Locked behavior

1. Render only on the main host and only on `/`, `/senior`, `/women`,
   `/couple`, and `/spanish`.
2. Render for both anonymous and authenticated visitors.
3. Never render on tenant hosts, dashboard/admin/auth/payment routes, or any
   non-listed route.
4. Use one global popup component mounted from `src/App.tsx`; do not copy popup
   logic into each landing page.
5. Desktop classification/trigger: if
   `window.matchMedia('(pointer: coarse)').matches` is false, listen for
   top-edge `mouseleave` (`clientY <= 0`). Do not claim to observe browser
   chrome or tab-bar movement.
6. Mobile classification/trigger: if coarse pointer is true, start a 30-second
   timer on eligible doorway entry. At exactly the timer check, use an
   `IntersectionObserver` attached to the landing page hero. Show only when
   `intersectionRatio > 0` (any visible pixels). If the hero is not visible at
   that check, do not show during that page visit.
7. FAQ suppression: detect any FAQ accordion interaction on an eligible
   landing page and store session suppression. Suppression applies across all
   five doorway routes until the browser session ends.
8. One popup total per browser session across all five doorways. Once shown,
   submitted, dismissed, or closed, do not show another variant.
9. Create an opaque random session ID once in `sessionStorage` under exactly
   `quittheapp:marketingSessionId`. Do not use localStorage for this ID.
10. Persist last-touch attribution in sessionStorage. On each eligible doorway
    entry overwrite all values with the current values, including empty values:
    `sourcePage`, `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`,
    `utmContent`, `referrer`.
11. Do not show this popup while `PricingModal` or
    `AbandonedCheckoutPrompt` is visible. Coordinate through explicit shared
    state/events or reliable DOM/application state; do not allow simultaneous
    overlays.
12. Do not add analytics SDKs or external services.

## Exact doorway configuration

Use a typed map, not scattered conditional strings:

```ts
{
  "/": {
    sourcePage: "main",
    locale: "en",
    headline: "Not Ready to Commit Yet?",
    subhead: "Get the free Airport Permit & Licensing Checklist for your city — know exactly what it takes before you spend a dollar.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone."
  },
  "/senior": {
    sourcePage: "senior",
    locale: "en",
    headline: "Before You Decide — Know What It Really Takes",
    subhead: "Get the free checklist on airport permits, insurance, and what a real transition timeline looks like — built for drivers who want to do this right, not rush it.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone."
  },
  "/women": {
    sourcePage: "women",
    locale: "en",
    headline: "Before You Start — Get the Safety & Trust Checklist",
    subhead: "Free guide: how to vet routes, screen ride requests, and build a professional, safe operation from day one.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone."
  },
  "/couple": {
    sourcePage: "couple",
    locale: "en",
    headline: "Building This Together? Start Here First.",
    subhead: "Free guide: How to split roles, set a shared schedule, and avoid the most common mistakes couples make launching together.",
    submitLabel: "Send Me The Guide",
    microcopy: "No spam. Just the real requirements, straight to your phone."
  },
  "/spanish": {
    sourcePage: "spanish",
    locale: "es",
    headline: "Antes de Invertir — Mira Cómo Otros Construyeron Esto",
    subhead: "Guía gratis: cómo operadores reales construyeron un negocio de transporte al aeropuerto que su familia puede heredar — sin apps, sin comisiones.",
    submitLabel: "Enviarme la Guía",
    microcopy: "Sin spam. Soporte real en español, cuando lo necesites.",
    // render only after GET /public/lead-config says enabled
  }
}
```

Do not add a name field. The form has exactly:

- Phone number (required).
- City (required).
- SMS consent checkbox (required).

Phone input:

- Show a US-style placeholder such as `(415) 555-0134`.
- Accept digits, spaces, hyphens, parentheses, and dots.
- Client-normalize by stripping formatting; require exactly 10 digits.
- Send normalized `+1` + 10 digits to backend.

City input:

- Trim and collapse whitespace.
- Require non-empty.
- Send normalized text.

Consent copy:

- English variants: `I agree to receive text messages related to my request.`
- Spanish variant: `Acepto recibir mensajes de texto relacionados con mi solicitud.`
- Checkbox must be checked before submit.
- Consent version sent exactly as `sms-consent-v1`.

Popup 5 content/flag:

- Before rendering `/spanish`, call `GET /api/v1/public/lead-config`.
- Render Spanish popup only when response is `{ success: true, spanishPopupEnabled: true }`.
- If false, do not render it and do not fabricate story/photo/content.
- Backend also enforces the flag; never bypass it client-side.

## API contract

Add a typed RTK Query mutation to a new or suitable public API slice:

```http
POST /api/v1/public/leads
Content-Type: application/json
```

Request:

```ts
{
  phone: string;                 // +1XXXXXXXXXX
  city: string;
  sourcePage: "main" | "senior" | "women" | "couple" | "spanish";
  sessionId: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  smsConsent: true;
  consentTextVersion: "sms-consent-v1";
}
```

Success when a new record is created:

```json
{
  "success": true,
  "created": true,
  "lead": {
    "id": "uuid",
    "status": "NEW",
    "sourcePage": "women",
    "submittedAt": "2026-08-23T12:00:00.000Z"
  }
}
```

Success when the active-session/source duplicate is found:

```json
{
  "success": true,
  "created": false,
  "lead": {
    "id": "uuid",
    "status": "NEW",
    "sourcePage": "women",
    "submittedAt": "2026-08-23T12:00:00.000Z"
  }
}
```

Never display or expect phone, consent, IP, user-agent, or full attribution
from this public response.

Config request:

```http
GET /api/v1/public/lead-config
```

```json
{ "success": true, "spanishPopupEnabled": false }
```

Admin API types/routes needed for the new page:

- `GET /api/v1/admin/leads?page=&limit=&search=&sourcePage=&status=&from=&to=`
- `GET /api/v1/admin/leads/:id`
- `PATCH /api/v1/admin/leads/:id` with `{ status: "NEW" | "CONTACTED" | "CONVERTED" | "SPAM" }`
- `DELETE /api/v1/admin/leads/:id`
- `GET /api/v1/admin/leads/export.csv` with the same filters

All admin calls use existing RTK Query bearer handling and tag invalidation.

## Popup visual implementation

Use the supplied popup screenshots as visual ground truth:

- `50-plus-page-pop-up.png`
- `Couple-page-pop-up.png`
- `Spanish-page-pop-up.png`
- `Standard-page-pop-up.png`
- `women-page-pop-up.png`

Match:

- Darkened backdrop.
- Large centered white rounded modal.
- Close X in top-right.
- Bold headline.
- Gray subhead.
- Labeled fields with required asterisks.
- Phone icon and city/building icon may use existing icon library.
- Checkbox row.
- Full-width green submit button.
- Bottom microcopy.
- Responsive mobile layout matching the screenshots.

After successful submission, keep the modal open and replace the form with:

```text
Thanks — your request was received.
We’ll send the requested checklist or guide to the phone number provided.
```

Allow the visitor to close the success state. Do not download, email, SMS, or
redirect to a lead magnet.

## Admin Lead Submissions page

Add a seventh admin sidebar item **after Dashboard**:

1. Dashboard
2. Lead Submissions (`/admin/leads`)
3. Drivers Management
4. Resources Upload
5. Billings
6. Support
7. Settings

No Figma screenshot exists for this page. Reuse the existing
`DataTable`/status-chip/admin-shell patterns; do not invent a separate visual
system.

Required page behavior:

- Paginated table.
- Search phone/city.
- Source doorway filter.
- Status filter.
- Date-range filter.
- Detail modal/view with phone, city, source, all UTM fields, referrer,
  consent version/time, submitted/updated timestamps, IP, and user-agent.
- Status select/update using `PATCH /admin/leads/:id`.
- Delete button with confirmation using `DELETE /admin/leads/:id`.
- CSV export button using `GET /admin/leads/export.csv` and current filters.
- Status labels exactly New, Contacted, Converted, Spam.

## File/workflow requirements

1. Inspect existing `App.tsx`, `AppRouter.tsx`, landing pages, storage helper,
   RTK Query API structure, `DataTable`, `AdminStatusChip`,
   `AbandonedCheckoutPrompt`, and `PricingModal` before editing.
2. Use existing project primitives and conventions. Do not add an analytics,
   CRM, SMS, or rich UI dependency.
3. Keep all server state in RTK Query; no direct fetch/axios.
4. Keep public tenant routing and authenticated dashboard behavior unchanged.
5. Add tests for:
   - route eligibility;
   - one-popup-per-session;
   - FAQ suppression;
   - desktop top-edge trigger;
   - mobile coarse-pointer timer + `intersectionRatio > 0`;
   - last-touch overwrite including empty attribution values;
   - phone/city/consent validation;
   - Spanish flag disabled/enabled;
   - success and duplicate-success states;
   - overlay suppression.
6. Run `npm run lint`, `npm run build`, and relevant tests.
7. Do not modify the backend repository.
8. Do not implement lead-magnet delivery, SMS sending, CRM sync, analytics,
   tenant popups, or Popup 5 fabricated content.
