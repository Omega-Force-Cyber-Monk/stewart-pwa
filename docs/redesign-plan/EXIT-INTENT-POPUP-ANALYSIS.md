# Exit-Intent Popup — Analysis and Locked Implementation Contract

**Source specification:** `C:\Users\user\Documents\stewart-docs\QuitTheApp.com — (Pop-UP) Exit-Intent Popup Build Spec.docx`

**Codebases analyzed:**
- Frontend: `C:\Users\user\Documents\projects\stewart-pwa`
- Backend: `C:\Users\user\Documents\projects\stewart-backend`

## 1. What the document requires

The feature is a public marketing lead-capture system used by five landing-page doorways:

| Doorway | Route | Source/page ID | Locale | Lead magnet / framing |
|---|---|---|---|---|
| General / Main | `/` | `main` | English | Airport Permit & Licensing Checklist |
| Drivers 50+ | `/senior` | `senior` | English | Permit/licensing checklist, slower-paced trust framing |
| Women-focused | `/women` | `women` | English | Safety & Trust-Building Checklist for Solo Operators |
| Couples | `/couple` | `couple` | English | How to Split Roles as a Couple guide |
| Hispanic/Latino | `/spanish` | `spanish` | Spanish | Named-operator story guide; blocked until approved content exists |

The popup is a single shared component whose copy is selected by the current doorway. It is not an authenticated dashboard feature and does not replace the existing pricing or abandoned-checkout flows.

## 2. Current implementation findings

### Frontend

There is currently no public lead-capture implementation:

- No lead form or popup component exists.
- No lead RTK Query endpoint exists.
- No UTM/referrer persistence exists.
- No analytics integration exists.
- No desktop exit-intent listener exists.
- No mobile timer/hero-visibility implementation exists.
- No SMS consent persistence exists.

Current integration points:

- `src/App.tsx` is the global mount point.
- `src/routes/AppRouter.tsx` defines the five eligible marketing routes.
- `src/components/pwa/AbandonedCheckoutPrompt.tsx` is an existing marketing overlay at `z-[80]`.
- `src/components/PricingModal.tsx` is the existing checkout overlay at `z-[9999]`.
- `src/lib/storage.ts` provides safe localStorage helpers, but the new popup session ID must be stored in `sessionStorage`.
- The five landing pages have duplicated CTA implementations; the global popup should not require duplicating trigger logic in every page.

### Backend

There is no lead/marketing subsystem:

- No Lead, Consent, CRM, SMS, or marketing-submission Prisma model.
- No public lead submission endpoint.
- No admin lead list/detail/status/delete/export endpoint.
- No SMS provider or outbound SMS behavior.
- No CRM integration.
- Existing SMTP is only for OTP and support-reply email.
- Existing `AdminActivity` is an internal audit feed, not a lead store.

## 3. Locked product decisions

These decisions were clarified with the product owner and are binding.

### Trigger and eligibility

1. Eligible routes are exactly `/`, `/senior`, `/women`, `/couple`, `/spanish` on the main marketing host.
2. Tenant hosts, dashboard/admin/auth/payment routes are excluded.
3. The popup is shown to **all visitors**, including authenticated visitors, when they are on an eligible marketing route. Do not associate a lead with a Stewart `User`.
4. Desktop trigger: **top-edge `mouseleave`**. The browser cannot expose movement toward browser chrome directly; do not pretend it can.
5. Mobile classification: `matchMedia('(pointer: coarse)')`.
6. Mobile trigger: start a 30-second timer on eligible page entry. At 30 seconds, show only if the hero currently has **any visible pixels** according to `IntersectionObserver` (`intersectionRatio > 0`). If the hero is not visible at that moment, do not show during that page visit.
7. FAQ suppression: any FAQ accordion interaction suppresses the popup for the rest of the browser session across all five doorways.
8. One popup total per browser session across all doorways. Once shown, submitted, dismissed, or otherwise closed, never show another variant in that session.
9. Use an opaque random session ID generated in `sessionStorage` on first eligible visit. Key name: `quittheapp:marketingSessionId`.
10. Popup must not appear while PricingModal or AbandonedCheckoutPrompt is visible. Existing overlays must not be shown simultaneously with it.

### Attribution

Use **last-touch** attribution. On every eligible doorway entry, overwrite the current attribution snapshot with current values, including empty values when absent:

- `sourcePage`: one of `main`, `senior`, `women`, `couple`, `spanish`.
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmTerm`
- `utmContent`
- `referrer`

Persist the snapshot in session storage and submit the snapshot that exists at form submission time.

### Form and validation

Required form fields:

- Phone number.
- City.
- SMS consent checkbox.

The checkbox is **required to submit**, despite no asterisk in the screenshot.

Phone rules:

- Accept common US formats: digits, spaces, hyphens, parentheses, and dots.
- Strip formatting characters.
- Require exactly 10 US digits.
- Persist as `+1` followed by the ten digits (E.164-style, e.g. `+14155552671`).

City rules:

- Required trimmed text.
- Normalize whitespace.
- Store as normalized text; no city master table or geocoding.

Consent rules:

- Store affirmative consent only.
- Consent version is fixed string `sms-consent-v1`.
- English checkbox: `I agree to receive text messages related to my request.`
- Spanish checkbox: `Acepto recibir mensajes de texto relacionados con mi solicitud.`
- No SMS is sent in this implementation. Consent is recorded only.

No name field is collected. The Spanish nurture placeholder `[Nombre]` is future copy, not a current form field.

### Submission and response

Public API:

```http
POST /api/v1/public/leads
Content-Type: application/json
```

The backend stores submissions only in PostgreSQL. It does not send to a CRM, send SMS, or deliver files/guides.

Public success response must be safe:

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

For active-session deduplication, return HTTP 200 with the existing safe lead payload and `created: false`; do not create a second row.

Do not return phone, consent, IP, user-agent, or full attribution in the public response.

Deduplication key: `sessionId` + `sourcePage` for the active browser session. The frontend sends the opaque session ID. A unique database constraint should enforce this pair.

After success, the popup remains open and replaces the form with:

- `Thanks — your request was received.`
- `We’ll send the requested checklist or guide to the phone number provided.`

The implementation stores the request only; the second sentence is the approved generic success copy and no actual delivery is built in this phase.

### Popup 5 / Spanish

Popup 5 is disabled until the permissioned bilingual RideNaples operator story, photo, and approved Spanish content package are supplied.

Control mechanism:

- Backend environment variable: `ENABLE_SPANISH_EXIT_POPUP=false` by default.
- Public config endpoint exposes the flag safely:

```http
GET /api/v1/public/lead-config
```

Response:

```json
{ "success": true, "spanishPopupEnabled": false }
```

- Frontend reads this config before allowing the Spanish popup to render.
- Backend rejects Spanish submissions while the flag is false, even if a client bypasses the UI.
- No temporary/fabricated story or photo is permitted.

### Admin management

A new seventh admin sidebar item supersedes the previous six-item admin-nav decision:

1. Dashboard
2. **Lead Submissions** (`/admin/leads`)
3. Drivers Management
4. Resources Upload
5. Billings
6. Support
7. Settings

Because no lead-management screenshot exists, reuse existing admin `DataTable` and status-chip patterns. Required capabilities:

- Paginated list.
- Search by phone/city.
- Filter by source doorway, status, and date range.
- View details (phone, city, source, UTM data, referrer, consent audit, timestamps).
- Change status through `PATCH /api/v1/admin/leads/:id` with `{ "status": "CONTACTED" }`.
- Status values exactly: `NEW`, `CONTACTED`, `CONVERTED`, `SPAM`.
- Delete permanently after confirmation (`DELETE /api/v1/admin/leads/:id`).
- Export filtered results as CSV (`GET /api/v1/admin/leads/export.csv`).
- Current status only; no status-history table.

Admin list/detail responses may include all stored fields because these routes are admin-protected.

## 4. Proposed database record

The backend plan must implement a `Lead` model with at least:

```text
id                 UUID primary key
phone              String       // normalized +1XXXXXXXXXX
city               String       // normalized whitespace
sourcePage         enum         // MAIN, SENIOR, WOMEN, COUPLE, SPANISH
sessionId          String       // opaque browser session ID
utmSource          String?
utmMedium          String?
utmCampaign        String?
utmTerm            String?
utmContent         String?
referrer           String?
smsConsent         Boolean      // always true for accepted submissions
consentedAt        DateTime
consentTextVersion String       // sms-consent-v1
submittedAt        DateTime
updatedAt          DateTime
ipAddress          String?
userAgent          String?
status             enum         // NEW, CONTACTED, CONVERTED, SPAM
```

Add a unique constraint on `(sessionId, sourcePage)`. Do not add `userId`.

The exact Prisma field casing should follow the existing schema convention (camelCase fields, mapped snake_case table names where appropriate).

## 5. Explicit non-goals

- No CRM integration.
- No SMS provider or outbound message.
- No email delivery.
- No lead-magnet file delivery/download.
- No name collection.
- No phone verification OTP.
- No notification system.
- No analytics SDK requirement. Attribution storage is required; analytics events are not.
- No Booking Management feature.
- No tenant-host popup.
- No fabricated Popup 5 story/photo/content.
