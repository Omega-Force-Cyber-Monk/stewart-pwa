import { expect, test } from "@playwright/test";
import {
  adminCredentials,
  apiBaseURL,
  closeModalIfVisible,
  deliverableCard,
  loginByApi,
  loginViaUi,
  makeTestFiles,
  registerCustomerViaUi,
  runFixture,
  setDeliverableStatus,
  uploadFinishedAsset,
  type FixtureOrder,
} from "./helpers";

test.describe.serial("DFY browser customer/admin workflow", () => {
  test("customer registration and login works through the UI", async ({ page }) => {
    const user = await registerCustomerViaUi(page);
    runFixture("grant-base", user.email);
    await loginViaUi(page, user.email, user.password);
    await expect(page).toHaveURL(/\/dashboard|\/launch-dashboard/);
  });

  test("purchase boundary creates a real Stripe checkout URL for an eligible Women rider", async ({ page, request }) => {
    const user = runFixture<{ email: string; password: string }>("prepare-base-owner");
    await loginByApi(page, request, user.email, user.password);
    await page.goto("/done-for-you");
    await expect(page.getByRole("button", { name: /YES, DO IT FOR ME/ })).toBeVisible();
    let checkoutBody: { checkoutUrl?: string } | null = null;
    await page.route("**/payments/checkout-session", async (route) => {
      const response = await route.fetch();
      checkoutBody = await response.json();
      await route.fulfill({ response, json: checkoutBody });
    });
    await page.getByRole("button", { name: /YES, DO IT FOR ME/ }).click();
    await expect.poll(() => checkoutBody?.checkoutUrl, { timeout: 20_000 }).toContain("checkout.stripe.com");
  });

  test("customer logo selection, admin fulfillment, publication, and customer downloads", async ({ page, context, request }) => {
    const fixture = runFixture<FixtureOrder>("prepare-order");
    const files = makeTestFiles();

    await loginByApi(page, request, fixture.email, fixture.password);
    await page.goto("/done-for-you");
    await expect(page.getByText("Done For You Marketing Kit")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #1")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #2")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #3")).toBeVisible();
    await expect(page.getByText("Master Brand Kit #4")).toBeVisible();
    await expect(page.getByText("Women Specialty Brand Kit")).toBeVisible();
    await expect(page.getByText("Spanish Specialty Brand Kit")).toHaveCount(0);
    await page.getByText("Women Specialty Brand Kit").click();
    await expect(page.getByText("Logo style saved.")).toBeVisible();
    await page.reload();
    await expect(page.getByText("Women Specialty Brand Kit")).toBeVisible();

    const admin = adminCredentials();
    await loginByApi(page, request, admin.email, admin.password);
    await page.goto("/admin/done-for-you");
    await page.getByPlaceholder("Search orders").fill(fixture.email);
    await expect(page.getByText(fixture.email)).toBeVisible();
    await page.getByRole("link", { name: /View/ }).first().click();
    await expect(page).toHaveURL(new RegExp(`/admin/done-for-you/${fixture.orderId}`));
    await expect(page.getByText(fixture.businessName)).toBeVisible();
    await expect(page.getByText("E2E Testville")).toBeVisible();
    await expect(page.getByText("https://example.test/e2e-booking")).toBeVisible();
    await expect(page.getByText("Women DFY Template Set")).toBeVisible();
    await expect(page.getByText("Women Video 1")).toBeVisible();
    await expect(page.getByText("Women Starter Post 1")).toBeVisible();
    await expect(page.getByText("Women Local Client and Positioning Guide")).toBeVisible();

    const pdfLink = page.getByRole("link", { name: /Open reference/ }).filter({ has: page.getByText("") }).last();
    const pdfResponse = await request.get(`${apiBaseURL}/admin/done-for-you/${fixture.orderId}`, {
      headers: { authorization: `Bearer ${await page.evaluate(() => localStorage.getItem("accessToken"))}` },
    });
    expect(pdfResponse.ok()).toBeTruthy();

    await page.locator('input[accept="image/png,image/jpeg,image/webp"]').setInputFiles(files.logo);
    await page.getByRole("button", { name: "Upload final logo" }).click();
    await expect(page.getByText("Logo uploaded")).toBeVisible({ timeout: 60_000 });
    await closeModalIfVisible(page);
    await page.getByRole("button", { name: /Approve Final Master Logo/ }).click();

    await page.getByLabel("Order status").selectOption("IN_PROGRESS");
    await page.getByLabel("Order status").selectOption("READY");
    await expect(page.getByText("Status not changed")).toBeVisible();
    await expect(page.getByText(/must be completed before the kit can be marked ready/i)).toBeVisible();
    await closeModalIfVisible(page);

    for (const title of ["Custom Brand Identity Kit", "Personalized Selling Page", "QR / Referral Assets", "Acuity-Related Fulfillment", "Text / Customer Response Templates"]) {
      await setDeliverableStatus(page, title, "IN_PROGRESS");
      await setDeliverableStatus(page, title, "COMPLETED");
    }

    await setDeliverableStatus(page, "Three Personalized Launch Videos", "IN_PROGRESS");
    await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 1", "VIDEO", files.video(1));
    await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 2", "VIDEO", files.video(2));
    await setDeliverableStatus(page, "Three Personalized Launch Videos", "COMPLETED");
    await expect(page.getByText("Status not changed")).toBeVisible();
    await expect(page.getByText(/requires 3 VIDEO asset/)).toBeVisible();
    await closeModalIfVisible(page);
    await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 3", "VIDEO", files.video(3));
    await setDeliverableStatus(page, "Three Personalized Launch Videos", "COMPLETED");

    await setDeliverableStatus(page, "Social Media Starter Content", "IN_PROGRESS");
    for (let index = 1; index <= 17; index += 1) {
      await uploadFinishedAsset(page, "Social Media Starter Content", `QTA DFY E2E Social ${index}`, "IMAGE", files.image(index));
    }
    await setDeliverableStatus(page, "Social Media Starter Content", "COMPLETED");
    await expect(page.getByText("Status not changed")).toBeVisible();
    await expect(page.getByText(/requires 18 IMAGE asset/)).toBeVisible();
    await closeModalIfVisible(page);
    await uploadFinishedAsset(page, "Social Media Starter Content", "QTA DFY E2E Social 18", "IMAGE", files.image(18));
    await setDeliverableStatus(page, "Social Media Starter Content", "COMPLETED");

    await expect(page.getByText("All required DFY deliverables are complete and ready to publish.")).toBeVisible({ timeout: 60_000 });
    await page.getByLabel("Order status").selectOption("READY");
    await page.getByRole("button", { name: "Publish & Notify" }).click();
    await page.getByRole("button", { name: "Publish & Notify" }).last().click();
    await expect(page.getByText("Published")).toBeVisible({ timeout: 60_000 });
    await closeModalIfVisible(page);

    await loginByApi(page, request, fixture.email, fixture.password);
    await page.goto("/done-for-you");
    await expect(page.getByText("Ready")).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Video 1")).toBeVisible();
    await expect(page.getByText("QTA DFY E2E Social 18")).toBeVisible();
    await expect(page.getByText("Women Starter Post 1")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Open/ }).first()).toBeVisible();

    const other = runFixture<{ email: string; password: string }>("prepare-base-owner");
    await loginByApi(page, request, other.email, other.password);
    const protectedResponse = await request.get(`${apiBaseURL}/admin/done-for-you/${fixture.orderId}`, {
      headers: { authorization: `Bearer ${await page.evaluate(() => localStorage.getItem("accessToken"))}` },
    });
    expect([401, 403]).toContain(protectedResponse.status());
    await page.goto("/done-for-you");
    await expect(page.getByText("QTA DFY E2E Video 1")).toHaveCount(0);
  });
});
