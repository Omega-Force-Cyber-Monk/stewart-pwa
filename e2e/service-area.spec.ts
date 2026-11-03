import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { findUsAirportSuggestions } = require('../../stewart-backend/dist/modules/business/us-airport-suggestions');
const { normalizeServiceArea } = require('../../stewart-backend/dist/modules/business/service-area');

// API responses are controlled fixtures; backend persistence is tested separately.
for (const category of ['STANDARD', 'WOMEN', 'COUPLE', 'FIFTY_PLUS', 'SPANISH']) {
  test(`${category}: city, individual airports, review, back, reload and editing`, async ({ page }) => {
    const spanish = category === 'SPANISH';
    const user = { id: 'test-user', email: 'test@example.test', role: 'rider', isVerified: true, driverProfile: { category } };
    let area = { cityArea: '', airports: [] as string[] };
    let step = 3;
    const purchase = { baseVariant: true, addon: true };
    const business = { businessName: 'Coastal Rides', name: 'Coastal Rides', email: 'test@example.test', phone: '+12345678900', businessInfo: 'Coastal transportation', slug: 'coastal-rides', status: 'IN_PROGRESS' };
    const setup = () => ({ success: true, data: { buyer: { fullName: 'Test Customer', email: 'test@example.test', phone: '+12345678900' }, business,
      acuity: { connected: false }, serviceArea: area, progress: { currentStep: step, completedSteps: [1,2], totalSteps: 4 },
      assets: {}, launchReady: { ready: false } } });
    await page.addInitScript((u) => {
      localStorage.setItem('accessToken', 'controlled-test-token');
      localStorage.setItem('user', JSON.stringify(u));
    }, user);
    await page.route('**/api/v1/**', async (route) => {
      const url = new URL(route.request().url());
      const path = url.pathname.replace('/api/v1', '');
      let response: unknown = { success: true, data: [] };
      if (path === '/auth/me') response = { success: true, user, purchase };
      if (path === '/business/dashboard') response = { success: true, purchase, business };
      if (path === '/business/setup') {
        if (route.request().method() === 'PATCH') {
          const body = route.request().postDataJSON();
          if (body.serviceArea) { area = normalizeServiceArea(body.serviceArea, area.airports); step = 4; }
          else step = 3;
        }
        response = setup();
      }
      if (path === '/business/referral-card') response = { success: true, data: { businessName: business.businessName, serviceArea: area, businessSlug: business.slug, websiteUrl: 'http://127.0.0.1:5183/site/coastal-rides', missingRequirements: [] } };
      if (path === '/public/business/coastal-rides') response = { success: true, data: { business: { ...business, category, themeKey: category }, serviceArea: area, booking: {}, referralCard: {} } };
      if (path === '/business/final-review') response = setup();
      if (path === '/business/launch-ready') response = { readyForFinalReview: true, missingRequirements: [] };
      if (path === '/business/service-area/airports') {
        // Deliberately return an older response late to exercise query cleanup.
        const query = url.searchParams.get('cityArea') || '';
        if (query === 'Miami') await new Promise((resolve) => setTimeout(resolve, 600));
        response = { suggestions: findUsAirportSuggestions(query, 5) };
      }
      await route.fulfill({ json: response });
    });
    await page.goto('/launch-dashboard');
    const city = page.getByRole('textbox', { name: spanish ? 'Ciudad o \u00e1rea metropolitana' : 'City or Metro Area' });
    const airport = page.getByPlaceholder(spanish ? 'Busca una ciudad o un c\u00f3digo de aeropuerto' : 'Search a city or airport code');
    const save = () => page.getByRole('button', { name: spanish ? 'Guardar y continuar' : 'Save & Continue' });
    for (const [cityName, codes] of [ ['Naples, FL', ['RSW']], ['Marco Island, FL', ['RSW']], ['Fort Myers, FL', ['RSW','PGD']], ['Unlisted Coastal Town', ['RSW']] ] as const) {
      await city.fill(cityName);
      await airport.fill('Naples');
      const rsw = page.getByRole('checkbox', { name: /RSW -/ });
      const pgd = page.getByRole('checkbox', { name: /PGD -/ });
      await rsw.check();
      if (codes.length === 2) await pgd.check(); else await pgd.uncheck();
      await expect(city).toHaveValue(cityName);
      await save().click();
      await expect(page.getByRole('heading', { name: 'Final Review', exact: true })).toBeVisible();
      expect(area).toEqual({ cityArea: cityName, airports: [...codes] });
      await expect(page.locator('dd').filter({ hasText: cityName })).toBeVisible();
      await page.getByRole('button', { name: 'Back', exact: true }).click();
      await expect(city).toHaveValue(cityName);
      await page.reload();
      await page.getByRole('button', { name: 'Back', exact: true }).click();
      await expect(city).toHaveValue(cityName);
    }
    // Going to the previous business step and back must preserve location edits.
    await city.fill('Marco Island, FL');
    await page.getByRole('button', { name: spanish ? 'Atr\u00e1s' : 'Back', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue', exact: true }).click();
    await expect(city).toHaveValue('Marco Island, FL');
    // A late airport search response cannot overwrite current results or city.
    await airport.fill('Miami');
    await page.waitForTimeout(300);
    await airport.fill('RSW');
    await expect(page.getByRole('checkbox', { name: /RSW -/ })).toBeVisible();
    await page.waitForTimeout(650);
    await expect(page.getByRole('checkbox', { name: /MIA -/ })).toHaveCount(0);
    await expect(city).toHaveValue('Marco Island, FL');
    // Deselecting an airport while its code is still in search must keep it removed.
    await page.getByRole('checkbox', { name: /RSW -/ }).uncheck();
    await save().click();
    await expect(page.getByText(spanish ? 'Ingresa tu ciudad y selecciona al menos un aeropuerto.' : 'City and at least one airport are required.', { exact: true })).toBeVisible();
    // Existing customers can use the explicit editor route.
    business.status = 'ACTIVE';
    await page.goto('/launch-dashboard?step=3');
    await expect(city).toBeVisible();
    await city.fill('Naples, FL');
    await airport.fill('Naples');
    await page.getByRole('checkbox', { name: /RSW -/ }).check();
    await page.getByRole('checkbox', { name: /PGD -/ }).uncheck();
    await save().click();
    await expect(page.getByRole('heading', { name: 'Final Review', exact: true })).toBeVisible();
    await page.goto('/dashboard');
    await expect(page.locator('dd').filter({ hasText: 'Naples, FL' })).toBeVisible();
    await expect(page.locator('dd').filter({ hasText: 'RSW' })).toBeVisible();
    await expect(page.getByText('PGD', { exact: true })).toHaveCount(0);
    await page.goto('/site/coastal-rides');
    await expect(page.getByText('Naples, FL', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('PGD', { exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'BOOK YOUR RIDE NOW' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(spanish ? '\u00c1rea de servicio: Naples, FL' : 'Service area: Naples, FL', { exact: true })).toBeVisible();
    await expect(page.locator('#served-airports option')).toHaveAttribute('value', 'RSW');
    await expect(page.locator('input[list="served-airports"]')).toHaveCount(2);
  });
}
