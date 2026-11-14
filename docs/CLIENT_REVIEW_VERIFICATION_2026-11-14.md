# Client Review Verification

Date: 2026-11-14

## Findings and resolutions

| Client item | Finding | Resolution / explanation |
|---|---|---|
| 1. Language switches | Actual UI gap on Women, Couples, and Seniors. Spanish already had the control. | Added a fixed, high-contrast English/Español switch to all three English audience pages. Español opens the existing Spanish funnel so the application does not present untranslated English copy as Spanish. The Spanish page keeps its working in-page switch. |
| 2. Administrator status | Existing behavior; payment and administrator verification were being conflated. | `Paid` is the payment record. `Pending` is the separate driver-verification state and remains until an administrator changes it to Under Review, Approved, or Rejected. Approval activates the driver account. `Launch Ready` is also separate: it becomes true only after all four setup steps satisfy the launch requirements and final launch is confirmed. Stripe test/live mode does not approve a driver or complete onboarding. |
| 3. Billing/dashboard totals | Actual reconciliation defect. | Billing listed all payment records, while the dashboard total excluded paid records without a linked user. The dashboard total, chart, and paid-transaction count now all use every persisted `paid` payment. Pending, failed, and expired rows are excluded from revenue. Test-mode is not a separate database status, so a persisted paid test transaction is counted exactly like another paid record. |
| 4. Airport dropdown | Actual contrast defect. | MIA/Miami suggestions now use an explicit white background, slate text, a darker airport code, and visible hover/focus states. Automated contrast is at least 7:1 on desktop and mobile. |
| 5. Remaining customer-flow tests | Verification request, not one single defect. | Women, Couples, Seniors, and Spanish were each tested through audience-aware checkout payload, signup/OTP, four onboarding steps, dashboard, generated website, ride-request form, correct guide/language, logout, and returning login. No real charge was created. |
| 6. Final launch checks | Mixed. Most functionality already existed; the administrator dashboard link was defective. | Photo persistence, name/phone persistence, public mobile phone display, sender/Reply-To configuration, GA4, and Clarity were confirmed. The administrator `View Driver Dashboard` route previously redirected back to details; it now opens a real read-only driver dashboard. Live inbox receipt/reply confirmation still requires a connected authorized mailbox. |

## Customer-flow results (local, mocked API)

| Audience | Checkout/signup | Steps 1–4 | Dashboard + returning login | Website/form | Guide/language |
|---|---:|---:|---:|---:|---:|
| Women | PASS | PASS | PASS | PASS | PASS |
| Couples | PASS | PASS | PASS | PASS | PASS |
| Seniors / 50+ | PASS | PASS | PASS | PASS | PASS |
| Spanish | PASS | PASS | PASS | PASS | PASS |

**What these results are:** Playwright browser tests run against a local dev build (`127.0.0.1:5185`) with every `/api/v1/**` call intercepted and answered by fixtures. They verify the frontend's payloads (audience + Stripe session + locale), navigation, persistence and UI per audience. They do **not** exercise the live backend, Stripe, OTP email delivery or the production database.

**What they are not:** the end-to-end live test the client asked for in item 5 (real test account per audience on `quittheapp.com`, Stripe test card, real OTP). That still has to be run by a person with test inboxes and is tracked under *Remaining checks* below.

## Evidence

### Local customer-flow screenshots (mocked API)

Each audience uses its own fixture identity (owner, business name, phone, email, city, airports) so screenshots are distinct and audience-correct (e.g. Women shows the pink theme). The PWA install banner is suppressed in evidence runs. All 16 files are byte-unique.

| Audience | Desktop | iPhone |
|---|---|---|
| Women | [Dashboard](customer-flow-evidence/women-desktop-dashboard.png) · [Website](customer-flow-evidence/women-desktop-website.png) | [Dashboard](customer-flow-evidence/women-iphone-dashboard.png) · [Website](customer-flow-evidence/women-iphone-website.png) |
| Couples | [Dashboard](customer-flow-evidence/couple-desktop-dashboard.png) · [Website](customer-flow-evidence/couple-desktop-website.png) | [Dashboard](customer-flow-evidence/couple-iphone-dashboard.png) · [Website](customer-flow-evidence/couple-iphone-website.png) |
| Seniors / 50+ | [Dashboard](customer-flow-evidence/fifty_plus-desktop-dashboard.png) · [Website](customer-flow-evidence/fifty_plus-desktop-website.png) | [Dashboard](customer-flow-evidence/fifty_plus-iphone-dashboard.png) · [Website](customer-flow-evidence/fifty_plus-iphone-website.png) |
| Spanish | [Dashboard](customer-flow-evidence/spanish-desktop-dashboard.png) · [Website](customer-flow-evidence/spanish-desktop-website.png) | [Dashboard](customer-flow-evidence/spanish-iphone-dashboard.png) · [Website](customer-flow-evidence/spanish-iphone-website.png) |

### Live site checks (quittheapp.com, 2026-11-14, no login required)

Run with a headless Chromium on Desktop Chrome and iPhone 13 profiles against the production site.

| Page | Switch visible (desktop / iPhone) | Español → `/spanish` | GA4 `G-Q248DS5W0T` requests | Clarity requests | Screenshots |
|---|---|---|---|---|---|
| /women | yes / yes | yes | 4 / 4 | 9 / 9 | [desktop](customer-flow-evidence/live/women-desktop-switch.png) · [iPhone](customer-flow-evidence/live/women-iphone-switch.png) |
| /couple | yes / yes | yes | 4 / 4 | 9 / 9 | [desktop](customer-flow-evidence/live/couple-desktop-switch.png) · [iPhone](customer-flow-evidence/live/couple-iphone-switch.png) |
| /senior | yes / yes | yes | 4 / 4 | 9 / 9 | [desktop](customer-flow-evidence/live/senior-desktop-switch.png) · [iPhone](customer-flow-evidence/live/senior-iphone-switch.png) |
| /spanish | yes / yes | n/a (in-page switch) | 3 / 3 | 7 / 7 | [desktop](customer-flow-evidence/live/spanish-desktop-switch.png) · [iPhone](customer-flow-evidence/live/spanish-iphone-switch.png) |

Note for the client: on the three English audience pages, "Español" navigates to the Spanish funnel; it does not translate the English page in place.

## Executed checks

- Frontend production build: PASS
- Frontend ESLint: PASS
- Frontend unit tests: 9/9 PASS on Node 22
- Final-review Playwright suite (desktop + iPhone): 56/56 PASS after fixture and mobile-logout fixes
- Service-area and airport contrast suite: 10/10 PASS (all five audiences on desktop and mobile)
- Backend production build: PASS
- Backend full suite: 128/128 PASS
- Email sender/Reply-To assertions: PASS within the backend suite
- GA4 and Microsoft Clarity: confirmed already loading on the live site through Google Tag Manager before this release

## Deployment status

Deployed and verified on 2026-11-14.

- Frontend deployed head: `90f94df`; feature commit: `ce60958`
- Frontend GitHub Actions: run `43554551678` — test, image build/push, and server deployment all passed
- Backend deployed head: `a54c958`; reconciliation commit: `985b481`
- Backend GitHub Actions: run `43554537482` — security/malware scan, compile, image build/push, SSH deployment, health check, and rollback-only production acceptance all passed
- Live health: `https://quittheapp.com`, `https://app.quittheapp.com`, and `https://api.quittheapp.com/health` returned HTTP 200
- Live language controls: Women, Couples, Seniors, and Spanish all exposed the switch; the three English audience pages navigated to `/spanish` when Español was selected
- Live analytics: GA4 `G-Q248DS5W0T` sent `page_view` and scroll collection requests; Microsoft Clarity `yg1kfsihk2` loaded and sent collection requests
- Protected admin dashboard endpoint returned HTTP 401 without a token, confirming that the deployed route exists and remains authentication-protected

## Remaining checks (need live credentials / inboxes)

These are **not done** and should not be reported to the client as complete:

1. **Item 5 – live per-audience flow.** Four real test accounts (Women, Couples, Seniors, Spanish) on `quittheapp.com` with Stripe test card and real OTP: checkout → signup → onboarding 1–4 → dashboard → generated website → ride form → guides → logout/login. Screenshots or a short recording per audience.
2. **Item 3 – live admin totals.** Log in to the live admin and confirm Billing row count and Dashboard revenue/paid count now match (backend `985b481` is deployed). Note any pending/failed rows, which are intentionally excluded from revenue.
3. **Item 4 – manual MIA/Miami dropdown check** on a real phone and desktop (automated contrast passes; a human look is still worth attaching).
4. **Item 6 – profile photo after refresh, name/phone population, mobile phone display** verified on the live account, not only in mocked tests.
5. **Item 6 – email sender / Reply-To.** Headers are correct in code and tests; actual inbox receipt and Reply routing need an authorized QuitTheApp mailbox.
