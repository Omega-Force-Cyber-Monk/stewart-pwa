# Frontend Implementation Plan (step by step)

Repo: `stewart-pwa`. Prefix `F#`. Reference screenshots live in
`../Figma-screenshots/` — every phase cites its frames. Stack unchanged
(React 19, RTK Query, Tailwind v4, react-router v7, lucide/react-icons).

Design tokens observed in figma (map to Tailwind config):
- Sidebar/topbar: dark navy (`#0B1120`-ish), active item = green pill
  (`#22C55E` family) with white text; rider sidebar groups: "Launch Tools",
  "Account"; red "Log Out" row at bottom.
- Rider pages: light gray canvas, white rounded cards, green primary buttons,
  type badges (Pdf=red-ish, Guide=orange, Link=teal, Video=thumbnail).
- Admin pages: same shell but blue accent (`#2563EB` family) for active nav &
  primary buttons; status chips (Pending=amber, Approved=green, Under
  Review=blue, Completed=green).
- Top bar: page title left; bell + avatar + name + role right (rider:
  "Women Driver" style role label = driver category; admin: "Stewart / Admin").

---

## F0 — Baseline

- Branch `redesign/dashboards-v2`.
- Confirm `npm run dev` + build green.
- Add shared design tokens (colors/radii) to `tailwind` theme / `index.css`
  variables per above palette.

## F1 — App shells & navigation

**Frames:** all screenshots (sidebar identical across rider/admin).

Rider sidebar (`DashboardLayout.tsx`, `AppRouter.tsx`):
1. Replace nav items with exactly, in order:
   - Launch Tools group: `Dashboard` → `/dashboard`,
     `Booking & Referral Card` → `/booking-referral-card`,
     `Selling Page` → `/selling-page`,
     `Resources & Guide` → `/resources-guide`.
   - Account group: `Payment & Billing` → `/payment-billing`,
     `Profile & Settings` → `/profile-settings`.
2. Red "Log Out" button at sidebar bottom → opens logout confirm modal
   (`User-profile-settings-page-logout-modal.png`: "Are You Sure You Want to
   Log Out?" No=red / Yes=green). Wire Yes → `POST /auth/logout` + clear store.
3. Remove routes/pages for: `/launch-dashboard` (replaced by new setup entry —
   see F3), `/repeat-rider`, `/acquisition`, `/trust`, `/essentials`, old
   `/booking-system`, old `/referral-card`, old `/selling-page`, old
   `/resources`, old `/billing`, old `/profile`. Delete their page components
   and any orphaned API hooks after migration.
4. Top bar: title prop per page; bell omitted entirely (owner decision);
   avatar + name + driver category chip (from `/auth/me` +
   `driverProfile.category`). Avatar click → Update Profile Image modal
   (F6) is optional here; keep click → profile page.

Admin sidebar (`AdminDashboardLayout.tsx`): items exactly:
`Dashboard` `/admin`, `Drivers Management` `/admin/drivers`,
`Resources Upload` `/admin/resources-upload`, `Billings` `/admin/billings`,
`Support` `/admin/support`, `Settings` `/admin/settings`.
Remove: Users, Checklist Items, Driver Dashboard view route (fold into details
page if needed), Bookings Management (mistake — never built).

Shared shell component for both (single `DashboardShell` with variant prop)
to kill the current duplication.

**Acceptance:** only the 6+6 routes render; deep links to removed routes
redirect to `/dashboard`.

## F2 — Resources & Guide (rider)

**Frames:** `User-resources-page.png`, `User-resources-open-video-page.png`,
`User-resources-guide-modal.png`, plus dashboard resource cards.

RTK Query (`store/api/Business/business.api.ts` or new `resources.api.ts`):
- `getResources({type?, search?, page?, limit?})` → list.
- `getResourceFileUrl(id)` (pdf/video) — keep existing file fetch pattern.
- `getGuide(id)` → `{ name, description, body }`.

Page `/resources-guide`:
1. Header: title + subtitle ("Access step-by-step guides, scripts, templates…").
2. Search input ("Search all lessons") — client-debounced query param.
3. Count line "Showing N resources" + `All resources ▾` filter dropdown
   (options: All / Video / PDF / Link / Guide).
4. Card grid (4 cols desktop): 
   - video card: thumbnail w/ play overlay + duration chip, title,
     description → **Open** green button (routes to player view/modal),
   - pdf card: doc icon + `Pdf` badge, description → **Download** button
     (stream inline via existing file endpoint),
   - guide card: book icon + `Guide` badge, description → **View Guide**
     button opening modal,
   - link card: link icon + `Link` badge, description → **Open** (external,
     new tab).
5. Video player view (`User-resources-open-video-page.png`): breadcrumb
   `Resources & Guide > Video`, large HTML5 `<video controls>` using the
   range-streaming endpoint, then title + rich description paragraphs below.
6. Guide modal: white modal, icon + name header, `Guide` badge, close X;
   body renders sanitized HTML from `GET /business/resources/:id/guide`
   (`Over View` + bullet sections in figma are just body content).
7. Empty state when no resources match search/filter.

**Depends on:** B2 endpoints.

## F3 — Launch setup wizard (4 steps) + Dashboard banner

**Frames:** `Business-setup-buyer-info.png`,
`User-business-setup-business-info.png`, `User-business-setup-service-info.png`,
`User-business-setup-final-confirm.png`, banner in `User-Dashboard-page.png`.

Route: reuse `/launch-dashboard` path renamed internally as Launch Setup Form
(top-bar title switches between "Launch Dashboard Setup Form™" step views per
figma titles: "Launch Dashboard™", "Launch Setup Form").

Stepper component: 4 dots with dashed connectors; completed = green check
circle, current = numbered gray circle, labels Buyer info / Business info /
Service Area / Final confirm. Progress from `GET /business/setup`
(`totalSteps` now 4).

- **Step 1 Buyer Info:** Full Name*, Email Address*, Phone Number* prefilled
  from buyer fields; Save & Continue → `POST/PATCH /business/setup {buyer}`.
  Edit pencil icon top-right re-enables fields.
- **Step 2 Business Info:** two-column form: Business Name*, Phone Number*,
  Email Address*, Business Information* textarea, Upload Business Logo
  (optional; drag-drop PNG/JPG/SVG, existing `/business/logo` endpoint), Back
  button. **Acuity sub-form (existing UI carried over, not in figma):**
  rendered only when `purchase.addon === false` (from `/auth/me` or added
  setup payload); hidden for add-on buyers ("We Do It For You"). Include it in
  the same Save & Continue call (`{business, acuity}` sections).
- **Step 3 Service Area:** City or Metro Area* text (with airport suggestion
  autocomplete wired to `/business/service-area/airports`) + Airports Served*
  multi-select chips with X remove (figma shows "Serving Miami", "FL" chips);
  Back / Save & Continue.
- **Step 4 Final Confirm:** two panels:
  - *Information Overview*: Personal Information (name/phone/email), Business
    Information (+ Business Logo thumb right-aligned), Service Area
    Information rows; edit pencil jumps back to relevant step.
  - *Generated Assets*: Driver Website / Referral Card / QR Code / Selling
    Page / Resources & Guides rows with descriptions (static explanatory
    content; statuses from referral-card + business data).
  - **➕ "Confirm & Launch" primary button** (approved addition; figma omits
    any CTA): disabled until `launchReady.ready`; calls
    `POST /business/complete-launch`; on 409 shows `missingRequirements`
    list; on success → success state + redirect to Dashboard.
- Delete old steps 5–8 UI remnants (checklists, launch-ready checklist gate
  UI, referral generation step UI).

Dashboard integration (`User-Dashboard-page.png` banner): if setup incomplete,
show "Please set up your launch profile" card with "Continue Launch Setup →"
button linking to the wizard; right side checklist-style list "Follow just
four step: Your Info, Business Info, Service area, Confirm" (static list).

**Depends on:** B3.

## F4 — Dashboard (rider home)

**Frame:** `User-Dashboard-page.png` (minus activity feed per owner decision).

Layout under "Welcome back, {firstName}!":
1. Launch-profile banner (F3) when applicable; when launched show a
   "Your website is live" variant linking to Selling Page (design has no such
   frame — keep minimal: reuse banner container with green confirmation text;
   flag to owner in review).
2. **Resources & Guide section**: heading + "View all ›" link to
   `/resources-guide`; three preview cards reusing F2 card component
   (pdf Download / video Open / guide View Guide).
3. **Quick Actions** (right rail, 4 rows): Browse your selling page →
   `/selling-page`; Read latest resources & guide → `/resources-guide`;
   Download your referral card → triggers referral download (print view F5);
   Share your landing page → copy link popover.
4. **Quick Actions lower grid** (4 cards): View Your Selling Page, Download
   Referral Card, Share Your Page, View QR Code — wire to existing data
   (websiteUrl, qrCodeUrl from `/business/referral-card`); QR Code opens a
   small modal previewing/downloading the QR image.
5. ~~Recent activity~~ omitted (owner decision).

Data sources: `/auth/me` (welcome name, purchase/business),
`/business/resources?type=&limit=3`, `/business/referral-card`,
`/business/dashboard`.

## F5 — Booking & Referral Card + Selling Page

### `/booking-referral-card` (`User-booking-referral-card-page.png`)
Top row (3 cards):
1. **QR Code**: QR image (existing `qrCodeUrl`) + "Download QR Code"
   (download data-URL as png).
2. **Booking Link**: readonly input w/ booking URL (Acuity bookingUrl or
   website URL fallback), "Open Page" (new tab) + "Copy link".
3. **Booking Setup**: static two-column checklist of feature bullets exactly
   as figma (Booking page created, Contact form active, Notifications enabled,
   Print ready card / Works direction, Personal website, Resource & guide
   share, Booking notifications enabled) — presentational, driven by
   acuityConnection status where meaningful (e.g., first item checked when
   CONNECTED).
Lower band: print-style referral card preview (left, "Book Direct Next Time"
art with QR overlay — compose from existing assets/qr) + **How it Works**
panel (Hand Out / Scan the QR Code / Book Direct / Grow Your Business) +
buttons **Download Print-Ready Card** (opens print stylesheet view →
browser print-to-PDF; owner approved client-side approach) and
**Share you card** (navigator.share/clipboard). Footnote line included.

### `/selling-page` (`User-Selling-page.png`)
1. Hero preview: large rounded banner using existing selling-page hero art;
   overlay headline "Reliable Airport Transportation You Can Trust" + Book
   Now / Call Now buttons (Book Now → booking URL; Call Now → tel: business
   phone).
2. "Landing page:" row + "Preview Landing page ↗" button → open
   `https://<slug>.quittheapp.com`.
3. Share strip: Facebook/LinkedIn/Email share intents (URL-encoded links) +
   "View QR Code" modal + "Download QR Code" + readonly URL input
   (`https://<slug>.quittheapp.com` — subdomain architecture kept per owner
   decision; figma path-style text ignored) + "copy link" button.
4. "How Customers Book" 4-step strip (Visit Your Page → Review Service →
   Click Book Now → Booking Confirm) with arrows — static.
5. Right rail: "Need Help?" card → Contact Support button (reuse existing
   support modal/page wiring).
Replaces both old BookingSystemPage & ReferralCardPage & SellingPage.

## F6 — Payment & Billing + Profile & Settings

### `/payment-billing` (`User-payment-billings-page.png`)
Reuse previous BillingPage structure restyled: order cards list — each paid
payment: green category label (Launch Package | Add-Ons), product title
(base = "{Category}-Focused Private Airport Business™" — derive label from
driver category; add-on = "Booking Setup Add-on"), Paid chip, meta row
(Order ID `#QTA-1001`, Purchase Date, Amount, Payment Method
"{Brand} •••• {last4}") + **Download Invoice** →
`GET /payments/history/:id/invoice` PDF. Pending/expired payments: render
muted card without invoice action (or hide non-paid — decide: show paid only,
matching figma; pending ones remain visible in checkout flows only).

### `/profile-settings` (`User-profile-settings-page.png` + modals)
Two-column top:
- **Personal Information** card: avatar with edit badge (→ Update Profile
  Image modal: circular dropzone "Upload PNG, SVG format img" +
  `POST /auth/me/avatar`), Full name, Email, Phone, "Member since";
  **Edit Information** button → Edit Personal information modal (Name, Email
  Address, Phone Number, Business name, Business area (City), Business area
  (Airport)) → saves via `PATCH /auth/me` + `PATCH /business/setup`
  (buyer/business sections); **if email changed** → switch modal body to OTP
  verify state using `/auth/me/change-email` + `/auth/me/confirm-email-change`
  (approved behavior). **Edit Password** → modal (Old/New/Confirm with eye
  toggles) → `PATCH /auth/me/password`.
- **Business Information** card: business logo/avatar, Business name, Email,
  Phone, Driver ID (#DR code), Business area city + airports, Business
  details text; Edit Information (same modal, scrolled/focused to business
  block).
Bottom full-width: **Referral Information** card — Your referral code
(driverCode), Referral link (website URL), Copy link / Share link /
Download QR Code buttons + big QR image right side (all from
referral-card/driver profile data).
~~Security System~~ merged as password row inside Personal card per figma
("Security System" panel exists in frame — implement as its own sub-card with
masked password + Edit Password button, exactly as drawn).

## F7 — Admin screens

All admin pages adopt the blue-accent shell; tables share one styled
`DataTable` (blue-tinted header row, zebra hover, pagination footer "Showing
X of Y", Filter button, ellipsis row actions).

1. **Dashboard** (`Admin-dashboard-page.png`): stat cards Total Drivers +
   Total Revenue (pink/purple gradient cards), Monthly Revenue line chart
   (recharts, existing monthlyRevenue buckets; keep daily/monthly toggle out
   unless trivially available — figma shows simple chart + "$18,450" figure =
   current-month total), Recent Driver Registrations table (Driver ID, Name+
   avatar, Email, Service Area, Registration Date, Status chip, view/delete
   actions) + View All → drivers page. ~~Platform Activity~~ omitted.
2. **Drivers Management** (`Admin-drivers-management-page.png`,
   `Admin-Driver-details-page.png`): list table (Driver ID #DR…, Driver Name
   avatar, Email, Service Area, Registration Date, Action: eye → detail,
   trash → delete w/ confirm, ⋮ menu → suspend/activate). Detail page: back
   arrow + name + #DR0001 + verification chip; two cards — Driver Information
   (avatar, full name, driver id, email, phone, category, joined date) and
   Business Information (logo, business name, business area, email, phone,
   details); footer actions **Reject** (reason modal → verification PATCH)
   and **Approve Driver**. Replaces old Drivers/Users/Checklist pages.
3. **Billings** (`Admin-billings-page.png` + details modal): total revenue
   figure top-right; category tab pills (Women/Couple/50+ Old/Standard/
   Spanish → `driverProfile.category` filter param); transactions table
   (Transaction ID = orderNumber, Driver Name, Driver Category, Purchased
   Type Setup Payment|Add-ons, Amount, Payment Method Stripe, Date, Status
   chip, eye action); eye opens **Billings Details** modal (driver, business,
   transaction fields, Status chip, **Download Receipt** → admin receipt PDF).
   Filter button → status/date popover (wire to existing query params).
4. **Support** (`Admin-Support-page.png`, `Admin-support-page-details.png`):
   tickets table (Support ID, Driver Name, Driver Category, Subject, Date,
   Status chip Under Review/Pending/Completed, actions eye/trash/⋮) +
   category tabs + Filter; eye opens **Support Messages** modal: message
   thread (avatar + last message), reply textarea, Cancel / **Send Reply**
   (reply endpoint; auto status flip handled by backend). Map current status
   enum PENDING→"Pending", UNDER_REVIEW→"Under Review", COMPLETED→"Completed".
5. **Resources Upload** (`Admin-resources-upload-page.png` + 3 form variants):
   - "Add New Resources" header band.
   - **Upload Resources** form card: Resources Name* input; Description
     textarea; Resource Type select (PDF Documents / Video / Link / Guide) —
     dynamic remainder per type:
     - pdf/video: **Upload File** dropzone ("Click to upload or drag and
       drop", size hints 100MB video / smaller pdf) — multipart POST,
     - link: **URL Submit** free-text URL input (approved correction),
     - guide: second Description block = rich-text editor toolbar
       H1/H2/H3/B/I/U/ordered+unordered list (use a light lib e.g.
       `react-quill` or headless Tiptap — pick smallest; sanitize output
       matches backend allowlist) bound to `body`.
   - Two buttons bottom: outline "Save changes" (=Save & add another → reset
     form) and filled "Save changes" (=save + navigate to list).
   - **➕ Existing Resources management list** (approved beyond figma):
     table Name / Type chip / Created / actions edit (loads form incl. body
     via `GET /admin/resources/:id[/body]`) / delete confirm; type filter
     tabs matching rider filters.
6. **Settings** (`Admin-Settings-page.png`): tabs Account Settings /
   Platform Settings / Notifications / Legal & Compliance (last three map to
   existing PlatformSetting keys platform/notifications/legalCompliance —
   render their JSON as editable forms grouped by key, generic key-value
   editor acceptable for non-account tabs). Account Settings tab: Profile
   picture circle w/ camera badge (admin avatar upload), Full Name, Email
   Address inputs + Edit Profile (PATCH /auth/me); Security card Current/
   New/Confirm password + Edit Password modal (PATCH /auth/me/password).
   Remove old AdminUsersPage/AdminChecklistItemsPage/AdminResourcesPage/
   AdminEditResource/AddResource (merged into new upload page).

## F8 — API layer cleanup + polish pass

- Update/delete RTK Query slices: remove admin users/checklist/category
  hooks; add guide/invoice/receipt/resource-body hooks; retag caches.
- Type updates for new response shapes (`*.type.ts` files): 4-step progress,
  resource types union, payment orderNumber/paymentBrand/paymentLast4.
- Remove dead assets no longer referenced by deleted pages.
- Route-level code splitting sanity check; run lint/build; manual regression
  of every nav path against figma frames.
- Delete stale docs: `KNOWN_LIMITATIONS.md` (outdated), `.freebuff/*.db`
  artifacts (repo hygiene finding), update README dashboard section.

---

## Suggested merge order

F1 (shell/nav) → F7.2+F7.3 (admin tables) can proceed in parallel with
F2–F6 once B2/B3 land; F8 last. Each phase ends with a screenshot comparison
against its cited frames.

## Out of scope

Tenant website, marketing pages (/women /couple /senior /spanish), auth
screens, checkout/pricing modals, notification bell/activity feeds (omitted),
Bookings Management (removed by owner), real-time anything.
