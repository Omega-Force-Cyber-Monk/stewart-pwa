# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dfy-browser.spec.ts >> DFY browser customer/admin workflow >> purchase boundary creates a real Stripe checkout URL for an eligible Women rider
- Location: e2e/dfy-browser.spec.ts:25:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /YES, DO IT FOR ME/ })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: /YES, DO IT FOR ME/ }) with timeout 15000ms
  - waiting for getByRole('button', { name: /YES, DO IT FOR ME/ })

```

```yaml
- main:
  - heading "Loading your workspace" [level=1]
  - paragraph: Checking your account, payment, and launch access.
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import {
  3   |   adminCredentials,
  4   |   apiBaseURL,
  5   |   closeModalIfVisible,
  6   |   deliverableCard,
  7   |   loginByApi,
  8   |   loginViaUi,
  9   |   makeTestFiles,
  10  |   registerCustomerViaUi,
  11  |   runFixture,
  12  |   setDeliverableStatus,
  13  |   uploadFinishedAsset,
  14  |   type FixtureOrder,
  15  | } from "./helpers";
  16  | 
  17  | test.describe.serial("DFY browser customer/admin workflow", () => {
  18  |   test("customer registration and login works through the UI", async ({ page }) => {
  19  |     const user = await registerCustomerViaUi(page);
  20  |     runFixture("grant-base", user.email);
  21  |     await loginViaUi(page, user.email, user.password);
  22  |     await expect(page).toHaveURL(/\/dashboard|\/launch-dashboard/);
  23  |   });
  24  | 
  25  |   test("purchase boundary creates a real Stripe checkout URL for an eligible Women rider", async ({ page, request }) => {
  26  |     const user = runFixture<{ email: string; password: string }>("prepare-base-owner");
  27  |     await loginByApi(page, request, user.email, user.password);
  28  |     await page.goto("/done-for-you");
> 29  |     await expect(page.getByRole("button", { name: /YES, DO IT FOR ME/ })).toBeVisible();
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
  30  |     let checkoutBody: { checkoutUrl?: string } | null = null;
  31  |     await page.route("**/payments/checkout-session", async (route) => {
  32  |       const response = await route.fetch();
  33  |       checkoutBody = await response.json();
  34  |       await route.fulfill({ response, json: checkoutBody });
  35  |     });
  36  |     await page.getByRole("button", { name: /YES, DO IT FOR ME/ }).click();
  37  |     await expect.poll(() => checkoutBody?.checkoutUrl, { timeout: 20_000 }).toContain("checkout.stripe.com");
  38  |   });
  39  | 
  40  |   test("customer logo selection, admin fulfillment, publication, and customer downloads", async ({ page, context, request }) => {
  41  |     const fixture = runFixture<FixtureOrder>("prepare-order");
  42  |     const files = makeTestFiles();
  43  | 
  44  |     await loginByApi(page, request, fixture.email, fixture.password);
  45  |     await page.goto("/done-for-you");
  46  |     await expect(page.getByText("Done For You Marketing Kit")).toBeVisible();
  47  |     await expect(page.getByText("Master Brand Kit #1")).toBeVisible();
  48  |     await expect(page.getByText("Master Brand Kit #2")).toBeVisible();
  49  |     await expect(page.getByText("Master Brand Kit #3")).toBeVisible();
  50  |     await expect(page.getByText("Master Brand Kit #4")).toBeVisible();
  51  |     await expect(page.getByText("Women Specialty Brand Kit")).toBeVisible();
  52  |     await expect(page.getByText("Spanish Specialty Brand Kit")).toHaveCount(0);
  53  |     await page.getByText("Women Specialty Brand Kit").click();
  54  |     await expect(page.getByText("Logo style saved.")).toBeVisible();
  55  |     await page.reload();
  56  |     await expect(page.getByText("Women Specialty Brand Kit")).toBeVisible();
  57  | 
  58  |     const admin = adminCredentials();
  59  |     await loginByApi(page, request, admin.email, admin.password);
  60  |     await page.goto("/admin/done-for-you");
  61  |     await page.getByPlaceholder("Search orders").fill(fixture.email);
  62  |     await expect(page.getByText(fixture.email)).toBeVisible();
  63  |     await page.getByRole("link", { name: /View/ }).first().click();
  64  |     await expect(page).toHaveURL(new RegExp(`/admin/done-for-you/${fixture.orderId}`));
  65  |     await expect(page.getByText(fixture.businessName)).toBeVisible();
  66  |     await expect(page.getByText("E2E Testville")).toBeVisible();
  67  |     await expect(page.getByText("https://example.test/e2e-booking")).toBeVisible();
  68  |     await expect(page.getByText("Women DFY Template Set")).toBeVisible();
  69  |     await expect(page.getByText("Women Video 1")).toBeVisible();
  70  |     await expect(page.getByText("Women Starter Post 1")).toBeVisible();
  71  |     await expect(page.getByText("Women Local Client and Positioning Guide")).toBeVisible();
  72  | 
  73  |     const pdfLink = page.getByRole("link", { name: /Open reference/ }).filter({ has: page.getByText("") }).last();
  74  |     const pdfResponse = await request.get(`${apiBaseURL}/admin/done-for-you/${fixture.orderId}`, {
  75  |       headers: { authorization: `Bearer ${await page.evaluate(() => localStorage.getItem("accessToken"))}` },
  76  |     });
  77  |     expect(pdfResponse.ok()).toBeTruthy();
  78  | 
  79  |     await page.locator('input[accept="image/png,image/jpeg,image/webp"]').setInputFiles(files.logo);
  80  |     await page.getByRole("button", { name: "Upload final logo" }).click();
  81  |     await expect(page.getByText("Logo uploaded")).toBeVisible({ timeout: 60_000 });
  82  |     await closeModalIfVisible(page);
  83  |     await page.getByRole("button", { name: /Approve Final Master Logo/ }).click();
  84  | 
  85  |     await page.getByLabel("Order status").selectOption("IN_PROGRESS");
  86  |     await page.getByLabel("Order status").selectOption("READY");
  87  |     await expect(page.getByText("Status not changed")).toBeVisible();
  88  |     await expect(page.getByText(/must be completed before the kit can be marked ready/i)).toBeVisible();
  89  |     await closeModalIfVisible(page);
  90  | 
  91  |     for (const title of ["Custom Brand Identity Kit", "Personalized Selling Page", "QR / Referral Assets", "Acuity-Related Fulfillment", "Text / Customer Response Templates"]) {
  92  |       await setDeliverableStatus(page, title, "IN_PROGRESS");
  93  |       await setDeliverableStatus(page, title, "COMPLETED");
  94  |     }
  95  | 
  96  |     await setDeliverableStatus(page, "Three Personalized Launch Videos", "IN_PROGRESS");
  97  |     await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 1", "VIDEO", files.video(1));
  98  |     await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 2", "VIDEO", files.video(2));
  99  |     await setDeliverableStatus(page, "Three Personalized Launch Videos", "COMPLETED");
  100 |     await expect(page.getByText("Status not changed")).toBeVisible();
  101 |     await expect(page.getByText(/requires 3 VIDEO asset/)).toBeVisible();
  102 |     await closeModalIfVisible(page);
  103 |     await uploadFinishedAsset(page, "Three Personalized Launch Videos", "QTA DFY E2E Video 3", "VIDEO", files.video(3));
  104 |     await setDeliverableStatus(page, "Three Personalized Launch Videos", "COMPLETED");
  105 | 
  106 |     await setDeliverableStatus(page, "Social Media Starter Content", "IN_PROGRESS");
  107 |     for (let index = 1; index <= 17; index += 1) {
  108 |       await uploadFinishedAsset(page, "Social Media Starter Content", `QTA DFY E2E Social ${index}`, "IMAGE", files.image(index));
  109 |     }
  110 |     await setDeliverableStatus(page, "Social Media Starter Content", "COMPLETED");
  111 |     await expect(page.getByText("Status not changed")).toBeVisible();
  112 |     await expect(page.getByText(/requires 18 IMAGE asset/)).toBeVisible();
  113 |     await closeModalIfVisible(page);
  114 |     await uploadFinishedAsset(page, "Social Media Starter Content", "QTA DFY E2E Social 18", "IMAGE", files.image(18));
  115 |     await setDeliverableStatus(page, "Social Media Starter Content", "COMPLETED");
  116 | 
  117 |     await expect(page.getByText("All required DFY deliverables are complete and ready to publish.")).toBeVisible({ timeout: 60_000 });
  118 |     await page.getByLabel("Order status").selectOption("READY");
  119 |     await page.getByRole("button", { name: "Publish & Notify" }).click();
  120 |     await page.getByRole("button", { name: "Publish & Notify" }).last().click();
  121 |     await expect(page.getByText("Published")).toBeVisible({ timeout: 60_000 });
  122 |     await closeModalIfVisible(page);
  123 | 
  124 |     await loginByApi(page, request, fixture.email, fixture.password);
  125 |     await page.goto("/done-for-you");
  126 |     await expect(page.getByText("Ready")).toBeVisible();
  127 |     await expect(page.getByText("QTA DFY E2E Video 1")).toBeVisible();
  128 |     await expect(page.getByText("QTA DFY E2E Social 18")).toBeVisible();
  129 |     await expect(page.getByText("Women Starter Post 1")).toHaveCount(0);
```