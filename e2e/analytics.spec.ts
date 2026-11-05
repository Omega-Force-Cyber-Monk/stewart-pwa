import { expect, test, type Page } from "@playwright/test";

const ecommerce = { currency: "USD", value: 250,
  items: [{ item_id: "base_variant", item_name: "Launch Kit", price: 250, quantity: 1 }] };
const purchase = { ...ecommerce, transaction_id: "cs_test_browser123" };
async function events(page: Page, name: string) {
  return page.evaluate((event) => (window.dataLayer || []).filter((entry) => entry.event === event), name);
}
test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com|clarity\.ms/, (route) => route.abort());
  await page.route("**/api/v1/payments/pricing", (route) => route.fulfill({ json: ecommerce }));
});

for (const path of ["/", "/women", "/couple", "/senior", "/spanish"]) {
  test(`product metadata and checkout on ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("**/api/v1/payments/checkout-session", (route) => route.fulfill({
      json: { success: true, sessionId: purchase.transaction_id, ecommerce,
        checkoutUrl: "https://checkout.stripe.com/c/pay/test_fixture" },
    }));
    await page.route("https://checkout.stripe.com/**", (route) => route.fulfill({ body: "Stripe fixture" }));
    await page.goto(`${path}?utm_source=qa_test&utm_medium=testing&utm_campaign=ga4_checkout_fix&utm_content=cta&utm_term=launch&showPricing=true`);
    await expect.poll(() => events(page, "view_item")).toHaveLength(1);
    expect((await events(page, "view_item"))[0].ecommerce).toEqual(ecommerce);
    const tagged = new URL(page.url());
    for (const [key, value] of Object.entries({ utm_source: "qa_test", utm_medium: "testing",
      utm_campaign: "ga4_checkout_fix", utm_content: "cta", utm_term: "launch" })) {
      expect(tagged.searchParams.get(key)).toBe(value);
    }
    await page.locator("#guest-checkout-email").fill("qa@example.com");
    // Opened by the actual selling page's existing showPricing flow.
    await page.getByRole("button", { name: /Get Started|Comenzar/ }).last().click();
    // The fallback redirect is bounded, leaving time to inspect the queue.
    await expect.poll(() => events(page, "begin_checkout"), { intervals: [10] }).toHaveLength(1);
    expect((await events(page, "begin_checkout"))[0].ecommerce).toEqual(ecommerce);
    await expect(page).toHaveURL(/checkout\.stripe\.com/);
    expect(errors).toEqual([]);
  });
}

test('verified guest purchase, StrictMode, refresh and revisit dispatch only once', async ({ page }) => {
  let claimed = false;
  let calls = 0;
  await page.route("**/api/v1/payments/checkout-session/analytics", (route) => {
    calls++;
    const payload = claimed ? null : purchase; claimed = true;
    return route.fulfill({ json: { confirmed: true, ecommerce: payload } });
  });
  await page.goto(`/payment/success?session_id=${purchase.transaction_id}&plan=bundle`);
  await expect.poll(() => events(page, "purchase")).toHaveLength(1);
  expect((await events(page, "purchase"))[0].ecommerce).toEqual(purchase);
  expect(calls).toBe(1);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Payment Successful!" })).toBeVisible();
  expect(await events(page, "purchase")).toHaveLength(0);
  await page.goto(`/payment/success?session_id=${purchase.transaction_id}`);
  await expect(page.getByRole("heading", { name: "Payment Successful!" })).toBeVisible();
  expect(await events(page, "purchase")).toHaveLength(0);
  await page.goto("/women");
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Payment Successful!" })).toBeVisible();
  expect(await events(page, "purchase")).toHaveLength(0);
  await page.goForward();
  await expect(page).toHaveURL(/women/);
});

test('failed session creation does not emit checkout or purchase', async ({ page }) => {
  await page.route("**/api/v1/payments/checkout-session", (route) =>
    route.fulfill({ status: 400, json: { message: "Checkout unavailable" } }));
  await page.goto("/?showPricing=true");
  await page.locator("#guest-checkout-email").fill("qa@example.com");
  await page.getByRole("button", { name: /Get Started/ }).last().click();
  await expect(page.getByText("Checkout unavailable")).toBeVisible();
  expect(await events(page, "begin_checkout")).toHaveLength(0);
  expect(await events(page, "purchase")).toHaveLength(0);
});

test('unpaid/forged success URL never emits purchase or redirects to signup', async ({ page }) => {
  await page.route("**/api/v1/payments/checkout-session/analytics", (route) =>
    route.fulfill({ json: { confirmed: false, ecommerce: null } }));
  await page.goto("/payment/success?session_id=cs_test_unpaid&plan=bundle");
  await expect(page.getByRole("heading", { name: "Checking your payment" })).toBeVisible();
  await page.waitForTimeout(1600);
  expect(await events(page, "purchase")).toHaveLength(0);
  await expect(page).toHaveURL(/payment\/success/);
});
