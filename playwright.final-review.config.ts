import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', testMatch: 'final-review.spec.ts', timeout: 45000,
  outputDir: './node_modules/.cache/qta-final-review-tests',
  expect: { timeout: 10000 }, workers: 2,
  use: { baseURL: 'http://127.0.0.1:5185', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5185',
    url: 'http://127.0.0.1:5185', reuseExistingServer: false,
    env: { VITE_API_BASE_URL: 'http://127.0.0.1:5185/api/v1' },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'android', use: { ...devices['Pixel 7'] } },
    { name: 'iphone', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
