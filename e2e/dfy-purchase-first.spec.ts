import { expect, test } from "@playwright/test";
import {
  adminCredentials,
  apiBaseURL,
  closeModalIfVisible,
  completeOnboardingViaUi,
  customerPassword,
  loginViaUi,
  makeTestFiles,
  registerWithSessionViaUi,
  runFixture,
  setDeliverableStatus,
  signWebhookPayload,
  uploadFinishedAsset,
} from "./helpers";

test.describe.serial("DFY Purchase-First E2E Customer Journey", () => {
  test.setTimeout(240_000);
  const stamp = Date.now();
  let customerEmail = `dfy-e2e-women-${stamp}@example.test`;
  let businessName = `Stewart Women Transit ${stamp}`;
  let checkoutSessionId = "";
  let orderId = "";

  test("Phase 5 & 6: Public Women funnel purchase, Stripe session creation, and signed webhook", async ({ page, request }) => {
    // Start as a fresh, unauthenticated visitor
    await page.goto("/women");
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByText("On Your Schedule")).toBeVisible();

    // Click CTA to open Pricing Modal
    await page.getByRole("button", { name: /Start My Transportation Business/i }).first().click();
    await expect(page.getByText("Choose Your Launch Package")).toBeVisible();

    // Verify package options and pricing
    await expect(page.getByText("Do It Yourself")).toBeVisible();
    await expect(page.getByText("Done For You Upgrade")).toBeVisible();
    await expect(page.getByText("YES, DO IT FOR ME +$99")).toBeVisible();

    // Fill guest email
    await page.locator("#guest-checkout-email").fill(customerEmail);

    // Track the checkout session API request and response
    let checkoutResponse: { checkoutUrl?: string; sessionId?: string } | null = null;
    await page.route("**/payments/checkout-session", async (route) => {
      const response = await route.fetch();
      checkoutResponse = await response.json();
      await route.fulfill({ response, json: checkoutResponse });
    });

    // Click "YES, DO IT FOR ME +$99"
    await page.getByRole("button", { name: /YES, DO IT FOR ME/i }).click();

    // Verify Stripe checkout URL was generated and session created
    await expect.poll(() => checkoutResponse?.checkoutUrl, { timeout: 20_000 }).toContain("checkout.stripe.com");
    expect(checkoutResponse?.sessionId).toBeTruthy();
    checkoutSessionId = checkoutResponse!.sessionId!;

    // Authoritative signed Stripe webhook delivery
    const payload = {
      id: `evt_test_dfy_e2e_${Date.now()}`,
      object: "event",
      type: "checkout.session.completed",
      data: {
        object: {
          id: checkoutSessionId,
          object: "checkout.session",
          payment_status: "paid",
          payment_intent: `pi_test_dfy_e2e_${Date.now()}`,
          customer_email: customerEmail,
          customer_details: { email: customerEmail },
          metadata: {
            email: customerEmail,
            funnelCategory: "WOMEN",
            baseQuantity: "1",
            addonQuantity: "1",
          },
        },
      },
    };
    const signature = signWebhookPayload(payload);
    const webhookRes = await request.post(`${apiBaseURL}/payments/webhook`, {
      headers: {
        "stripe-signature": signature,
        "content-type": "application/json",
      },
      data: payload,
    });
    expect(webhookRes.ok()).toBeTruthy();

    // Verify duplicate webhook delivery does not fail or duplicate
    const dupRes = await request.post(`${apiBaseURL}/payments/webhook`, {
      headers: {
        "stripe-signature": signature,
        "content-type": "application/json",
      },
      data: payload,
    });
    expect(dupRes.ok()).toBeTruthy();
  });

  async function ensurePaidSession(req: import("@playwright/test").APIRequestContext, email: string) {
    const sessionRes = await req.post(`${apiBaseURL}/payments/checkout-session`, {
      data: {
        email,
        funnelCategory: "WOMEN",
        items: [
          { productId: "base_variant", quantity: 1 },
          { productId: "addon", quantity: 1 },
        ],
        successUrl: `http://127.0.0.1:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=bundle`,
        cancelUrl: `http://127.0.0.1:5173/women?checkout=cancelled`,
      },
    });
    expect(sessionRes.ok()).toBeTruthy();
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.sessionId;
    expect(sessionId).toBeTruthy();

    const payload = {
      id: `evt_test_dfy_${Date.now()}`,
      object: "event",
      type: "checkout.session.completed",
      data: {
        object: {
          id: sessionId,
          object: "checkout.session",
          payment_status: "paid",
          payment_intent: `pi_test_dfy_${Date.now()}`,
          customer_email: email,
          customer_details: { email },
          metadata: {
            email,
            funnelCategory: "WOMEN",
            baseQuantity: "1",
            addonQuantity: "1",
          },
        },
      },
    };
    const signature = signWebhookPayload(payload);
    const webhookRes = await req.post(`${apiBaseURL}/payments/webhook`, {
      headers: {
        "stripe-signature": signature,
        "content-type": "application/json",
      },
      data: payload,
    });
    expect(webhookRes.ok()).toBeTruthy();
    return sessionId;
  }

  test("Phase 7 & 8: Post-payment registration, account linking, and customer onboarding", async ({ page, request }) => {
    test.setTimeout(300_000);
    if (!checkoutSessionId) {
      checkoutSessionId = await ensurePaidSession(request, customerEmail);
    }
    expect(checkoutSessionId).toBeTruthy();

    // Simulate returning to the payment success redirect
    await page.goto(`/payment/success?session_id=${encodeURIComponent(checkoutSessionId)}&plan=bundle`);
    await expect(page.getByText("Payment Successful!")).toBeVisible();

    // The unauthenticated user is guided to signup to claim the purchase
    await registerWithSessionViaUi(page, customerEmail, checkoutSessionId);

    // After login, incomplete onboarding redirects the rider to launch dashboard
    await completeOnboardingViaUi(page, businessName, customerEmail);
  });

  test("Phase 9 & 10: DFY ownership, 7 deliverables, and Women specialty logo selection", async ({ page }) => {
    if (!orderId) {
      const fixture = runFixture<{ email: string; password: string; orderId: string; businessName: string }>("prepare-order");
      orderId = fixture.orderId;
      customerEmail = fixture.email;
      businessName = fixture.businessName;
    }

    // Log in as the purchasing customer who completed onboarding
    await loginViaUi(page, customerEmail, customerPassword);
    await expect(page).toHaveURL(/\/dashboard/);

    // Customer opens DFY marketing kit dashboard
    await page.goto("/done-for-you");
    await expect(page.getByRole("heading", { name: "Done For You Marketing Kit" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(businessName).first()).toBeVisible();

    // Verify the 4 shared Master Brand Kits and the Women Specialty Brand Kit are visible
    await expect(page.getByText("Master Brand Kit #1")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #2")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #3")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #4")).toBeVisible();
    await expect(page.getByText("Women Specialty Brand Kit").first()).toBeVisible();

    // Verify other audience specialty brand kits are NOT shown to Women riders
    await expect(page.getByText("Spanish Specialty Brand Kit")).toHaveCount(0);
    await expect(page.getByText("Couples Specialty Brand Kit")).toHaveCount(0);
    await expect(page.getByText("50 Plus Specialty Brand Kit")).toHaveCount(0);

    // Select the Women Specialty Brand Kit
    await page.getByText("Women Specialty Brand Kit").first().click();
    await expect(page.getByText("Logo style saved.")).toBeVisible({ timeout: 30_000 });

    // Reload page to verify selection persists
    await page.reload();
    await expect(page.getByRole("heading", { name: "Done For You Marketing Kit" })).toBeVisible({ timeout: 45_000 });
    await expect(page.getByText("Women Specialty Brand Kit").first()).toBeVisible({ timeout: 45_000 });
  });

  test("Phase 11 - 15: Admin fulfillment, master references, blockers, uploads, and publication", async ({ browser, request }) => {
    test.setTimeout(360_000);
    if (!orderId) {
      const fixture = runFixture<{ email: string; password: string; orderId: string; businessName: string }>("prepare-order");
      orderId = fixture.orderId;
      customerEmail = fixture.email;
      businessName = fixture.businessName;
    }
    const admin = adminCredentials();
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const files = makeTestFiles();

    // Admin logs in via UI
    await loginViaUi(adminPage, admin.email, admin.password);
    await expect(adminPage).toHaveURL(/\/admin/);

    // Open DFY admin fulfillment queue
    await adminPage.goto("/admin/done-for-you");
    await adminPage.getByPlaceholder("Search orders").fill(customerEmail);
    await expect(adminPage.getByText(customerEmail).first()).toBeVisible({ timeout: 20_000 });

    // Open customer order details
    await adminPage.getByRole("link", { name: /View/i }).first().click();
    await expect(adminPage).toHaveURL(/\/admin\/done-for-you\/.+/);
    const urlMatch = adminPage.url().match(/\/admin\/done-for-you\/([a-zA-Z0-9-]+)/);
    orderId = urlMatch ? urlMatch[1] : "";
    expect(orderId).toBeTruthy();

    // Verify customer, business, and production context
    await expect(adminPage.getByText(businessName).first()).toBeVisible({ timeout: 60_000 });
    await expect(adminPage.getByText("Austin, TX").first()).toBeVisible();
    await expect(adminPage.getByText("Women Specialty Brand Kit").first()).toBeVisible();
    await expect(adminPage.getByText("Women DFY Template Set").first()).toBeVisible();
    await expect(adminPage.getByText("Women Video 1").first()).toBeVisible();
    await expect(adminPage.getByText("Women Starter Post 1").first()).toBeVisible();
    await expect(adminPage.getByText("Women Local Client and Positioning Guide").first()).toBeVisible();

    // Verify Admin can fetch/open the Women positioning guide PDF
    const pdfResponse = await request.get(`${apiBaseURL}/admin/done-for-you/${orderId}`, {
      headers: { authorization: `Bearer ${await adminPage.evaluate(() => localStorage.getItem("accessToken"))}` },
    });
    expect(pdfResponse.ok()).toBeTruthy();
    const orderData = await pdfResponse.json();
    const pdfTemplate = orderData.order.templateSet?.templates?.find((t: { name: string }) => t.name.includes("Positioning Guide"));
    expect(pdfTemplate?.sourceUrl || pdfTemplate?.previewUrl).toBeTruthy();

    // Upload and approve final personalized customer logo
    await adminPage.locator('input[accept="image/png,image/jpeg,image/webp"]').setInputFiles(files.logo);
    await adminPage.getByRole("button", { name: "Upload final logo" }).click();
    await expect(adminPage.getByText("Logo uploaded")).toBeVisible({ timeout: 60_000 });
    await closeModalIfVisible(adminPage);
    await adminPage.getByRole("button", { name: /Approve/i }).first().click();
    await expect(adminPage.getByRole("button", { name: "Download logo" })).toBeVisible({ timeout: 30_000 });

    // Test publication blocker: Premature READY without completed deliverables
    const progressPromise = adminPage.waitForResponse(
      (res) => res.url().includes("/admin/done-for-you/") && res.request().method() === "PATCH" && res.status() === 200,
      { timeout: 30_000 },
    ).catch(() => null);
    await adminPage.getByLabel("Order status").selectOption("IN_PROGRESS");
    await progressPromise;

    const readyPromise = adminPage.waitForResponse(
      (res) => res.url().includes("/admin/done-for-you/") && res.request().method() === "PATCH",
      { timeout: 30_000 },
    ).catch(() => null);
    await adminPage.getByLabel("Order status").selectOption("READY");
    await readyPromise;
    await expect(adminPage.getByText("Status not changed").first()).toBeVisible();
    await expect(adminPage.getByText(/must be completed before the kit can be marked ready/i).first()).toBeVisible();
    await closeModalIfVisible(adminPage);

    // Complete non-media deliverables
    for (const title of [
      "Custom Brand Identity Kit",
      "Personalized Selling Page",
      "QR / Referral Assets",
      "Acuity-Related Fulfillment",
      "Text / Customer Response Templates",
    ]) {
      await setDeliverableStatus(adminPage, title, "IN_PROGRESS");
      await setDeliverableStatus(adminPage, title, "COMPLETED");
    }

    // Video Deliverable Blocker: 2 videos uploaded -> COMPLETED blocked; 3rd uploaded -> COMPLETED allowed
    await setDeliverableStatus(adminPage, "Three Personalized Launch Videos", "IN_PROGRESS");
    await uploadFinishedAsset(adminPage, "Three Personalized Launch Videos", "QTA DFY E2E Video 1", "VIDEO", files.video(1));
    await uploadFinishedAsset(adminPage, "Three Personalized Launch Videos", "QTA DFY E2E Video 2", "VIDEO", files.video(2));
    await setDeliverableStatus(adminPage, "Three Personalized Launch Videos", "COMPLETED");
    await expect(adminPage.getByText("Status not changed").first()).toBeVisible();
    await expect(adminPage.getByText(/requires 3 VIDEO asset/).first()).toBeVisible();
    await closeModalIfVisible(adminPage);
    await uploadFinishedAsset(adminPage, "Three Personalized Launch Videos", "QTA DFY E2E Video 3", "VIDEO", files.video(3));
    await setDeliverableStatus(adminPage, "Three Personalized Launch Videos", "COMPLETED");

    // Social Media Starter Blocker: 17 graphics uploaded -> COMPLETED blocked; 18th uploaded -> COMPLETED allowed
    await setDeliverableStatus(adminPage, "Social Media Starter Content", "IN_PROGRESS");
    for (let index = 1; index <= 17; index += 1) {
      await uploadFinishedAsset(adminPage, "Social Media Starter Content", `QTA DFY E2E Social ${index}`, "IMAGE", files.image(index));
    }
    await setDeliverableStatus(adminPage, "Social Media Starter Content", "COMPLETED");
    await expect(adminPage.getByText("Status not changed").first()).toBeVisible();
    await expect(adminPage.getByText(/requires 18 IMAGE asset/).first()).toBeVisible();
    await closeModalIfVisible(adminPage);
    await uploadFinishedAsset(adminPage, "Social Media Starter Content", "QTA DFY E2E Social 18", "IMAGE", files.image(18));
    await setDeliverableStatus(adminPage, "Social Media Starter Content", "COMPLETED");

    // Verify all deliverables ready banner appears
    await expect(adminPage.getByText("All required DFY deliverables are complete and ready to publish.")).toBeVisible({ timeout: 60_000 });

    // Mark READY and Publish
    const readyOrderPromise = adminPage.waitForResponse(
      (res) => res.url().includes("/admin/done-for-you/") && res.request().method() === "PATCH" && res.status() === 200,
      { timeout: 30_000 },
    ).catch(() => null);
    await adminPage.getByLabel("Order status").selectOption("READY");
    await readyOrderPromise;
    await adminPage.getByRole("button", { name: "Publish & Notify" }).first().click();
    const publishPromise = adminPage.waitForResponse(
      (res) => res.url().includes("/publish") && (res.status() === 200 || res.status() === 201),
      { timeout: 45_000 },
    ).catch(() => null);
    await adminPage.getByRole("button", { name: "Publish & Notify" }).last().click();
    await publishPromise;
    await expect(adminPage.getByText("The DFY kit was published.")).toBeVisible({ timeout: 30_000 });
    await closeModalIfVisible(adminPage);
    await expect(adminPage.locator("span").filter({ hasText: /^Published$/i }).first()).toBeVisible({ timeout: 15_000 });

    await adminContext.close();
  });

  test("Phase 16: Customer delivery and finished asset downloads", async ({ page, request }) => {
    if (!customerEmail) {
      const fixture = runFixture<{ email: string; password: string; orderId: string; businessName: string }>("prepare-order");
      orderId = fixture.orderId;
      customerEmail = fixture.email;
      businessName = fixture.businessName;
    }
    // Log in as original customer
    await page.goto("/login");
    await page.getByLabel("Email address").fill(customerEmail);
    await page.getByLabel("Password").fill(customerPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Open DFY kit
    await page.goto("/done-for-you");
    await expect(page.getByRole("heading", { name: "Done For You Marketing Kit" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/Ready|Published/i).first()).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Video 1").first()).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Video 2").first()).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Video 3").first()).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Social 18").first()).toBeVisible();

    // Verify master production references are NOT exposed as finished customer deliverables
    await expect(page.getByText("Women Starter Post 1")).toHaveCount(0);
    await expect(page.getByText("Women Video 1")).toHaveCount(0);

    // Verify customer download/open link works
    const openLink = page.getByRole("link", { name: /Open/i }).first();
    await expect(openLink).toBeVisible();
    const assetUrl = await openLink.getAttribute("href");
    expect(assetUrl).toBeTruthy();
    if (assetUrl && !assetUrl.startsWith("#")) {
      const assetHead = await request.get(assetUrl);
      expect([200, 301, 302, 304]).toContain(assetHead.status());
    }
  });

  test("Phase 17: Security and cross-customer isolation", async ({ page, request }) => {
    if (!orderId) {
      const fixture = runFixture<{ email: string; password: string; orderId: string; businessName: string }>("prepare-order");
      orderId = fixture.orderId;
    }
    // Unrelated customer cannot see original customer's DFY order or assets
    const otherEmail = `dfy-unrelated-${Date.now()}@example.test`;
    await page.goto("/signup");
    await page.getByLabel("Email address").fill(otherEmail);
    await page.getByLabel("Password", { exact: true }).fill(customerPassword);
    await page.getByLabel("Confirm Password").fill(customerPassword);
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText("Verify your email")).toBeVisible();
    const otpText = await page.getByText(/Development OTP:/).textContent({ timeout: 5000 }).catch(() => "");
    const otp = otpText?.match(/\d{6}/)?.[0] || runFixture<{ otp: string }>("latest-otp", otherEmail).otp;
    if (!otp) throw new Error("Development OTP was not found for secondary user registration.");
    await page.getByLabel("Verification Code").fill(otp);
    await page.getByRole("button", { name: "Confirm Verification" }).click();
    await expect(page.getByText("Your account has been verified successfully.")).toBeVisible({ timeout: 20_000 });

    await page.getByRole("button", { name: /Proceed to Login/i }).click();
    await page.getByLabel("Email address").fill(otherEmail);
    await page.getByLabel("Password").fill(customerPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });

    const token = await page.evaluate(() => localStorage.getItem("accessToken"));
    expect(token).toBeTruthy();

    // 1. Unrelated user cannot call admin endpoint for the first customer's order
    const adminRes = await request.get(`${apiBaseURL}/admin/done-for-you/${orderId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    expect([401, 403]).toContain(adminRes.status());

    // 2. Unrelated user calling admin publish endpoint is rejected
    const publishRes = await request.post(`${apiBaseURL}/admin/done-for-you/${orderId}/publish`, {
      headers: { authorization: `Bearer ${token}` },
    });
    expect([401, 403]).toContain(publishRes.status());

    // 3. Unrelated user calling customer DFY endpoint cannot access original customer's order
    const customerRes = await request.get(`${apiBaseURL}/business/done-for-you`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (customerRes.ok()) {
      const data = await customerRes.json();
      expect(data.order?.id).not.toBe(orderId);
    } else {
      expect([400, 401, 403, 404]).toContain(customerRes.status());
    }
  });
});
