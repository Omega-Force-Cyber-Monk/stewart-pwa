import { defineConfig, devices } from "@playwright/test";
// Controlled frontend tests: no database, payment, SMTP, or production API access.
export default defineConfig({
  testDir: './e2e', testMatch: 'service-area.spec.ts', workers: 1, timeout: 30000,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:5183', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5183',
    url: 'http://127.0.0.1:5183', reuseExistingServer: false, timeout: 60000,
    env: { VITE_API_BASE_URL: 'http://127.0.0.1:5183/api/v1' },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
