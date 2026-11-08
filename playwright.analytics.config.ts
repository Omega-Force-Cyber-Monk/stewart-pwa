import { defineConfig, devices } from "@playwright/test";

// Isolated API fixtures; never creates Stripe payments or writes to GA4.
export default defineConfig({
  testDir: "./e2e", testMatch: "analytics.spec.ts", workers: 1, timeout: 30000,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:5184", trace: "retain-on-failure" },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5184",
    url: "http://127.0.0.1:5184", reuseExistingServer: false, timeout: 60000,
    env: { VITE_API_BASE_URL: "http://127.0.0.1:5184/api/v1" },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
