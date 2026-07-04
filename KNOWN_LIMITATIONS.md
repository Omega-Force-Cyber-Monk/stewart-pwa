# Known Limitations

This project is intentionally frontend-only. The following items are mocked or local-only by design.

## Mock Checkout

The checkout modal simulates purchase completion and does not process payments.

Production recommendation: integrate Stripe Checkout or Payment Element, validate payment status server-side, and unlock access based on verified webhook events.

## No Authentication

There are no user accounts, sessions, roles, or protected server resources.

Production recommendation: add an authentication provider or custom auth service with secure session handling and route-level authorization.

## No Backend API

All data is static or stored in Redux/localStorage.

Production recommendation: introduce typed API adapters for profiles, orders, resources, project status, and settings.

## No Database

The app does not persist data outside the browser.

Production recommendation: store users, purchases, onboarding profiles, module progress, and DFY project state in a database.

## Client-Side Persistence Only

Redux state is saved to `localStorage`; clearing browser storage removes the demo state.

Production recommendation: sync durable user state to a backend and treat localStorage only as a cache.

## No Real File Uploads

The onboarding headshot uses `URL.createObjectURL()` for local preview only.

Production recommendation: upload files to controlled storage, validate type and size server-side, scan as needed, and store durable URLs.

## Placeholder Resource Downloads

Resource cards and deliverables open placeholder modals. No files are downloaded.

Production recommendation: serve resources from a CMS, asset bucket, or authenticated download endpoint.

## Mock DFY Pipeline

The DFY pipeline stage selector is a frontend testing control.

Production recommendation: replace it with admin-controlled project status updates backed by an API and audit trail.

## No Email Notifications

The app does not send purchase confirmations, onboarding reminders, or project updates.

Production recommendation: connect transactional email through a server-side notification service.

## No Admin Portal

There is no operational dashboard for staff to manage DFY projects or resources.

Production recommendation: build an authenticated admin area with role-based access, project management, and content management.

## Placeholder PWA Icons

The PWA uses placeholder SVG icons.

Production recommendation: replace them with final brand assets in PNG/SVG formats that meet platform maskable icon guidance.

## No Analytics

The app does not track conversion funnels, install events, or dashboard engagement.

Production recommendation: add privacy-aware analytics and event tracking after legal/privacy review.

## No Server-Side Validation

All form validation is browser-only.

Production recommendation: duplicate critical validation server-side before storing or acting on submitted data.

