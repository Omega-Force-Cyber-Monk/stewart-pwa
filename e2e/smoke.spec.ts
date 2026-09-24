import { expect, test } from "@playwright/test";

test.describe("Browser Smoke Test", () => {
  test("starts Chromium, loads the application homepage, and verifies title and header", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/QuitTheApp/i);
    await expect(page.locator("body")).toBeVisible();
    // Verify standard brand element or hero is present
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("loads the public Women funnel page", async ({ page }) => {
    await page.goto("/women");
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Airport/i);
  });
});
