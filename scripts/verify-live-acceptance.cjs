// Read-only public-page smoke check. Does not submit leads, rides or payments.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { checkedAt: new Date().toISOString(), pages: [], analyticsAccountVerification: 'skipped_at_user_request' };
  try {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport });
      for (const route of ['/', '/women', '/couple', '/senior', '/spanish']) {
        const page = await context.newPage();
        const errors = [];
        const apiErrors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('response', (response) => {
          if (response.url().startsWith('https://api.quittheapp.com/') && response.status() >= 400) {
            apiErrors.push({ path: new URL(response.url()).pathname, status: response.status() });
          }
        });
        try {
          const response = await page.goto(`https://quittheapp.com${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });
          const measurement = await page.evaluate(() => ({
            title: document.title,
            contentLength: document.body.innerText.length,
            width: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            applicationScripts: [...document.scripts].map((script) => script.src).filter((src) => src.startsWith(location.origin + '/assets/')),
          }));
          const row = { route, viewport: viewport.width, status: response.status(), ...measurement, errors, apiErrors };
          row.passed = row.status === 200 && row.contentLength > 500 && row.documentWidth <= row.width + 1 && errors.length === 0 && apiErrors.length === 0;
          report.pages.push(row);
        } catch (error) {
          report.pages.push({ route, viewport: viewport.width, passed: false, error: error.message.slice(0, 180) });
        }
        await page.close();
      }
      await context.close();
    }
    report.passed = report.pages.every((row) => row.passed);
    if (!report.passed) process.exitCode = 1;
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(__dirname, '../docs/live-acceptance-2026-11-11.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  }
}

main().catch(() => { console.error('Live page verification could not complete.'); process.exitCode = 1; });
