import { expect, type APIRequestContext, type Locator, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
export const backendRoot = path.resolve(currentDir, "../../stewart-backend");
export const apiBaseURL = process.env.E2E_API_BASE_URL || "http://127.0.0.1:3000/api/v1";
export const customerPassword = process.env.DFY_E2E_PASSWORD || "DfyE2E!Pass12345";

export type FixtureOrder = {
  email: string;
  password: string;
  orderId: string;
  businessName: string;
};

export type FixtureUser = {
  email: string;
  password: string;
  userId?: string;
};

export function backendEnv() {
  const envPath = path.join(backendRoot, ".env");
  const env: Record<string, string> = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) env[match[1]] = match[2];
  }
  return env;
}

export function runFixture<T>(command: string, ...args: string[]): T {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const output = execFileSync("node", ["scripts/dfy-e2e-fixture.js", command, ...args], {
        cwd: backendRoot,
        encoding: "utf8",
        env: { ...process.env, DFY_E2E_PASSWORD: customerPassword },
      });
      return JSON.parse(output.trim().split(/\r?\n/).at(-1) || "{}") as T;
    } catch (error) {
      lastError = error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, attempt * 1500);
    }
  }
  throw lastError;
}

export async function loginViaUi(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

export async function loginByApi(page: Page, request: APIRequestContext, email: string, password: string) {
  const response = await request.post(`${apiBaseURL}/auth/login`, { data: { email, password } });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  await page.addInitScript((auth) => {
    localStorage.setItem("accessToken", auth.accessToken);
    localStorage.setItem("refreshToken", auth.refreshToken);
    localStorage.setItem("user", JSON.stringify(auth.user));
  }, data);
  return data;
}

export async function registerCustomerViaUi(page: Page) {
  const email = `dfy-e2e-ui-${Date.now()}@example.test`;
  await page.goto("/signup");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(customerPassword);
  await page.getByLabel("Confirm Password").fill(customerPassword);
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByText("Verify your email")).toBeVisible();
  const otpText = await page.getByText(/Development OTP:/).textContent({ timeout: 3000 }).catch(() => "");
  const otp = otpText?.match(/\d{6}/)?.[0] || runFixture<{ otp: string }>("latest-otp", email).otp;
  if (!otp) throw new Error("Development OTP was not visible in the signup UI.");
  await page.getByLabel("Verification Code").fill(otp);
  await page.getByRole("button", { name: "Confirm Verification" }).click();
  await expect(page.getByText("Your account has been verified successfully.")).toBeVisible({ timeout: 20_000 });
  return { email, password: customerPassword };
}

export async function registerWithSessionViaUi(page: Page, email: string, sessionId: string) {
  // Post-payment redirect lands on /signup?session_id=...
  await expect(page).toHaveURL(new RegExp(`/signup.*session_id=${sessionId}`));
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(customerPassword);
  await page.getByLabel("Confirm Password").fill(customerPassword);
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByText("Verify your email")).toBeVisible({ timeout: 30_000 });
  const otpText = await page.getByText(/Development OTP:/).textContent({ timeout: 5000 }).catch(() => "");
  const otp = otpText?.match(/\d{6}/)?.[0] || runFixture<{ otp: string }>("latest-otp", email).otp;
  if (!otp) throw new Error("Development OTP was not found for post-payment registration.");
  await page.getByLabel("Verification Code").fill(otp);
  await page.getByRole("button", { name: "Confirm Verification" }).click();
  await expect(page.getByText("Your account has been verified successfully.")).toBeVisible({ timeout: 20_000 });
  await page.getByRole("button", { name: /Proceed to Login/i }).click();
  await expect(page).toHaveURL(/\/login/);
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").fill(customerPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
}

export async function completeOnboardingViaUi(page: Page, businessName: string, email: string) {
  await expect(page).toHaveURL(/\/launch-dashboard/, { timeout: 30_000 });
  // Step 1: Buyer Information
  await page.getByLabel("Full Name", { exact: false }).fill("Jane Stewart");
  await page.getByLabel("Email Address", { exact: false }).fill(email);
  await page.getByLabel("Phone Number", { exact: false }).fill("+1 555-019-2831");
  await page.getByRole("button", { name: /Save & Continue/i }).click();

  // Step 2: Business Information
  await expect(page.getByRole("heading", { name: "Business Information" })).toBeVisible({ timeout: 30_000 });
  await page.getByLabel("Business Name", { exact: false }).fill(businessName);
  await page.getByLabel("Phone Number", { exact: false }).fill("+1 555-019-2831");
  await page.getByLabel("Email Address", { exact: false }).fill(email);
  await page.locator("textarea").fill("Executive airport transportation service for professional women.");
  await page.getByRole("button", { name: /Save & Continue/i }).click();

  // Step 3: Service Area
  await expect(page.getByRole("heading", { name: "Service Area" })).toBeVisible({ timeout: 30_000 });
  await page.getByPlaceholder("Enter the city or metro area you serve").fill("Austin, TX");
  const airportInput = page.getByPlaceholder("Type airport code and press Enter");
  await airportInput.fill("AUS");
  await airportInput.press("Enter");
  await expect(page.getByText("AUS")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /Save & Continue/i }).click();

  // Step 4: Final Review & Launch
  await expect(page.getByRole("heading", { name: "Final Review" })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(businessName)).toBeVisible();
  const launchBtn = page.getByRole("button", { name: /Confirm & Launch/i });
  await expect(launchBtn).toBeEnabled({ timeout: 30_000 });
  await launchBtn.click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 60_000 });
}

export function adminCredentials() {
  const env = backendEnv();
  return {
    email: env.SEED_ADMIN_EMAIL || "admin@stewart.local",
    password: env.SEED_ADMIN_PASSWORD || "Admin@12345",
  };
}

export function makeTestFiles() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "qta-dfy-e2e-"));
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXElEQVR4nO3ZQQ6CQBBF0bX//7h7AtEJbBqN5tq0sC9GoMGi6gKo6n7cOJ/P8/7+AGC+AeABgAcAHgB4AOABgAcAHgB4AOABgAcA7sHq9XqM47iRZQAAoJtLkiQAAAAAANx1XVdVVbWzEADA+ziO4ziO4zhOkiQAAOC9NE0TAAAAAADgvu/7vu97kiQBAAC8kqZpAgAAAAAA3HWdZVlWVZUkCQAA4K40TRMAAAAAAOCu67quq6oqSRIAAPBamiYJAAAAAABw13Vd13XdkiQJAADgrjRNEwAAAAAA4K7ruq7ruiVJAgAAuCtN0wQAAAAAALjruq7ruq5JkgQAAHBXmqYJAAAAAABw13Vd13VLkiQAAIC70jRNAAAAAACAu67ruq5bkiQJAADgrjRNEwAAAAAA4K7ruq7rliRJAACAu9I0TQAAAAAAgLuuy7KsqipJEgAAwF1pmiaw3W4nSQIAALirLEuSBAAAAAAAuOu6ruu6ZUkSAADAXWmaJrDdbidJAgAAuKssS5IEAAAAAAC467qu67plSRIAAMBdaZomAAAAAADAXdf1H8K3h4AfCfEDwAMA2U0AAAAASUVORK5CYII=",
    "base64",
  );
  const videoPath = path.join(dir, "qta-dfy-e2e-video.mp4");
  execFileSync("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "color=c=black:s=320x180:d=1",
    "-pix_fmt",
    "yuv420p",
    videoPath,
  ], { stdio: "ignore" });
  return {
    logo: { name: "QTA-DFY-E2E-final-logo.png", mimeType: "image/png", buffer: png },
    image: (index: number) => ({ name: `QTA-DFY-E2E-social-${index}.png`, mimeType: "image/png", buffer: png }),
    video: (index: number) => ({ name: `QTA-DFY-E2E-video-${index}.mp4`, mimeType: "video/mp4", buffer: fs.readFileSync(videoPath) }),
  };
}

export async function closeModalIfVisible(page: Page) {
  const okay = page.getByRole("button", { name: "Okay" });
  if (await okay.isVisible().catch(() => false)) {
    await okay.click();
    await page.locator(".fixed.inset-0.z-50").waitFor({ state: "hidden", timeout: 10_000 }).catch(() => null);
  }
}

export function deliverableCard(page: Page, title: string): Locator {
  return page.getByRole("heading", { level: 4, name: title, exact: true }).locator("xpath=ancestor::div[contains(@class, 'rounded-') and contains(@class, 'border')][1]");
}

export async function setDeliverableStatus(page: Page, title: string, status: string) {
  const card = deliverableCard(page, title);
  const select = card.locator("select").first();
  await expect(select).toBeEnabled({ timeout: 45_000 });
  const currentValue = await select.inputValue();
  if (currentValue === status) return;
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes("/deliverables/") && (res.status() === 200 || res.status() === 400 || res.status() === 409),
    { timeout: 45_000 }
  ).catch(() => null);
  await select.selectOption(status);
  await responsePromise;
  await expect(select).toBeEnabled({ timeout: 45_000 });
  await page.waitForTimeout(300);
}

export async function uploadFinishedAsset(page: Page, title: string, assetTitle: string, assetType: string, file: { name: string; mimeType: string; buffer: Buffer }) {
  const card = deliverableCard(page, title);
  await card.getByPlaceholder("Asset title").fill(assetTitle);
  await card.locator("select").nth(1).selectOption(assetType);
  await card.locator('input[type="file"]').setInputFiles(file);
  const saveBtn = card.getByRole("button", { name: "Save asset" });
  await expect(saveBtn).toBeEnabled({ timeout: 20_000 });
  await saveBtn.click();
  await expect(page.getByText("Asset uploaded")).toBeVisible({ timeout: 60_000 });
  await closeModalIfVisible(page);
  await page.waitForTimeout(300);
}

export function signWebhookPayload(payload: unknown) {
  const env = backendEnv();
  const secret = env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  const timestamp = Math.floor(Date.now() / 1000);
  const body = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return `t=${timestamp},v1=${signature}`;
}
