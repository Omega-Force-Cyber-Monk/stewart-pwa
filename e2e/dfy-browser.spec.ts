import { expect, test } from "@playwright/test";
import {
  adminCredentials,
  apiBaseURL,
  closeModalIfVisible,
  loginByApi,
  loginViaUi,
  makeTestFiles,
  registerCustomerViaUi,
  runFixture,
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

  test("customer logo selection and admin logo approval surface (automation replaces manual uploads)", async ({
    page,
    request,
  }) => {
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
    await expect(page.getByText("Customer information")).toBeVisible();
    await expect(page.getByText("Final personalized logo")).toBeVisible();
    await expect(page.getByText("DFY automation")).toBeVisible();
    await expect(page.getByRole("button", { name: "Publish & Notify" })).toHaveCount(0);
    await expect(page.getByLabel("Order status")).toHaveCount(0);

    await page.locator('input[accept="image/png,image/jpeg,image/webp"]').setInputFiles(files.logo);
    await page.getByRole("button", { name: /Upload final logo/i }).click();
    await expect(page.getByText(/Logo uploaded|uploaded/i)).toBeVisible({ timeout: 60_000 });
    await closeModalIfVisible(page);
    await page.getByRole("button", { name: /Approve/i }).first().click();
    await page.getByRole("button", { name: /Approve & start automation/i }).click();
    await expect(page.getByText(/Automation has been triggered|Approved/i)).toBeVisible({
      timeout: 60_000,
    });

    const other = runFixture<{ email: string; password: string }>("prepare-base-owner");
    await loginByApi(page, request, other.email, other.password);
    const protectedResponse = await request.get(
      `${apiBaseURL}/admin/done-for-you/${fixture.orderId}`,
      {
        headers: {
          authorization: `Bearer ${await page.evaluate(() => localStorage.getItem("accessToken"))}`,
        },
      },
    );
    expect([401, 403]).toContain(protectedResponse.status());
  });
});
