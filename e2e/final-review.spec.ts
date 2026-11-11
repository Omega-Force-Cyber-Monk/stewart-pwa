import { test, expect, type Page } from '@playwright/test';

const categories = ['STANDARD', 'WOMEN', 'FIFTY_PLUS', 'COUPLE', 'SPANISH'];
const phone = '+1 (239) 555-0147';
const name = 'Coastal Airport Transportation and Local Private Passenger Services';
const disclaimer = 'Your ride request has been sent. Your ride is not confirmed until the driver contacts you and confirms availability.';

async function fixtures(page: Page, category: string, onboarding = false) {
  const user = { id: 'qa-driver', email: 'qa@example.test', name: 'Ana', phone: '', role: 'rider', isVerified: true, driverProfile: { category } };
  const purchase = { baseVariant: true, addon: true };
  const business = { id: 'qa-business', businessName: name, name, phone, email: 'qa@example.test', businessInfo: 'Customer supplied description', slug: 'qa-coastal', status: onboarding ? 'IN_PROGRESS' : 'ACTIVE' };
  const setup = { success: true, data: { buyer: { fullName: 'Ana', email: 'qa@example.test', phone }, business, acuity: { connected: false }, serviceArea: { cityArea: 'Naples, FL', airports: ['RSW'] }, progress: { currentStep: 1, completedSteps: [], totalSteps: 4 }, assets: {}, launchReady: { ready: false } } };
  await page.addInitScript((u) => {
    if (sessionStorage.getItem('qa-fixture-initialized')) return;
    sessionStorage.setItem('qa-fixture-initialized', 'true');
    localStorage.setItem('accessToken', 'fixture-token');
    localStorage.setItem('refreshToken', 'fixture-refresh');
    localStorage.setItem('user', JSON.stringify(u));
  }, user);
  await page.route('**/api/v1/**', async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace('/api/v1', '');
    let response: unknown = { success: true, data: [] };
    if (path === '/auth/me') {
      if (route.request().method() === 'PATCH') Object.assign(user, route.request().postDataJSON());
      response = { success: true, user, purchase, business };
    }
    if (path === '/auth/login') response = { success: true, user, accessToken: 'fixture-token', refreshToken: 'fixture-refresh' };
    if (path === '/business/dashboard') response = { success: true, purchase, business, launchReady: !onboarding };
    if (path === '/business/setup' || path === '/business/setup/initialize') {
      if (route.request().method() === 'PATCH') {
        const body = route.request().postDataJSON();
        if (body.buyer) { Object.assign(setup.data.buyer, body.buyer); setup.data.progress.currentStep = 2; }
        if (body.business) { Object.assign(setup.data.business, body.business); setup.data.progress.currentStep = 3; }
        if (body.serviceArea) { Object.assign(setup.data.serviceArea, body.serviceArea); setup.data.progress.currentStep = 4; }
      }
      response = setup;
    }
    if (path === '/business/final-review') response = setup;
    if (path === '/business/launch-ready') response = { success: true, ready: false, missingRequirements: [] };
    if (path === '/business/referral-card') response = { success: true, data: { businessName: name, businessSlug: business.slug, websiteUrl: '/site/qa-coastal', serviceArea: setup.data.serviceArea, missingRequirements: [] } };
    if (path === '/public/business/qa-coastal') response = { success: true, data: { business: { ...business, category, themeKey: category }, serviceArea: setup.data.serviceArea, booking: {}, referralCard: {} } };
    if (path === '/public/business/qa-coastal/ride-requests') response = { success: true, disclaimer, correlationId: 'qa-request-1' };
    if (path === '/business/resources') response = { success: true, resources: url.searchParams.get('language') === 'es' ? [{ id: 'resource-es-local-partners', name: 'Kit de hoteles y negocios locales', description: 'Conecta con hoteles y negocios de tu zona.', type: 'pdf', hasFile: true }] : [{ id: 'english', name: 'English resource guide', description: 'Original English resource.', type: 'pdf', hasFile: true }] };
    if (path === '/payments/history') response = { success: true, payments: [{ id: 'f240-test', orderNumber: 'QTA-F240', status: 'paid', createdAt: '2026-11-06T08:00:00Z', paidAt: '2026-11-06T08:00:00Z', totalAmount: 39400, items: [{ type: 'base_variant', name: 'QuitTheApp System — $295' }] }] };
    if (path.includes('support') && path.endsWith('tickets')) response = { success: true, tickets: [] };
    await route.fulfill({ json: response });
  });
}

for (const category of categories) {
  test(`${category}: profile name and phone survive save, reload and a fresh login`, async ({ page }) => {
    await fixtures(page, category);
    await page.goto('/profile-settings');
    // Use English labels consistently while retaining the account's original audience.
    await page.locator('header').first().getByRole('button', { name: 'English', exact: true }).click();
    await page.getByRole('button', { name: 'Edit Information', exact: true }).click();
    await page.locator('#editName').fill('Updated Profile Name');
    await page.locator('#editPhone').fill('+1 (239) 555-0198');
    const saved = page.waitForResponse((response) => response.url().endsWith('/auth/me') && response.request().method() === 'PATCH');
    await page.getByRole('button', { name: 'Update Information', exact: true }).click();
    expect((await saved).ok()).toBeTruthy();
    await expect(page.locator('#editName')).toHaveCount(0);
    await expect(page.getByText('+1 (239) 555-0198', { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByText('+1 (239) 555-0198', { exact: true })).toBeVisible();
    // Clear persisted credentials to exercise the actual login form and profile fetch.
    await page.evaluate(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    });
    await page.goto('/login?redirect=/profile-settings');
    await page.locator('input[type="email"]').fill('qa@example.test');
    await page.locator('input[type="password"]').fill('Fixture-password-123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page).toHaveURL(/\/profile-settings/);
    await expect(page.getByText('+1 (239) 555-0198', { exact: true })).toBeVisible();
    await expect(page.getByText('Updated Profile Name', { exact: true }).last()).toBeVisible();
  });
}

for (const category of categories) {
  test(`${category}: public header fits and passenger form switches languages`, async ({ page }) => {
    await fixtures(page, category);
    await page.goto('/site/qa-coastal');
    const header = page.locator('header').first();
    const call = header.getByRole('link', { name: /Call Now|Llamar ahora/ });
    await expect(call).toBeVisible();
    const bounds = await call.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await header.getByRole('button', { name: 'Español', exact: true }).click();
    await expect(header.getByText('Llamar ahora', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /SOLICITA TU VIAJE AHORA/i }).click();
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Solicitar un viaje' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Nombre completo' })).toBeVisible();
    await expect(page.getByText(/El viaje no está confirmado/)).toBeVisible();
    await page.getByRole('button', { name: 'Cerrar formulario de solicitud' }).click();
    await header.getByRole('button', { name: 'English', exact: true }).click();
    await expect(header.getByText('Call Now', { exact: true })).toBeVisible();
    await page.reload();
    await expect(header.getByText('Call Now', { exact: true })).toBeVisible();
  });
}

test('Spanish driver can switch onboarding language without losing entered data', async ({ page }) => {
  await fixtures(page, 'SPANISH', true);
  await page.goto('/launch-dashboard');
  await expect(page.getByRole('heading', { name: 'Información del comprador' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('Nombre conservado');
  await page.locator('header').first().getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Buyer Information' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toHaveValue('Nombre conservado');
  await page.locator('header').first().getByRole('button', { name: 'Español', exact: true }).click();
  await page.getByRole('button', { name: 'Guardar y continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Información del negocio' })).toBeVisible();
  await page.getByRole('button', { name: 'Guardar y continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Área de servicio', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Guardar y continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Revisión final', exact: true })).toBeVisible();
  await expect(page.getByText('Materiales generados', { exact: true })).toBeVisible();
  const contrast = await page.getByText('Sitio del conductor', { exact: true }).evaluate((element) => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d')!;
    context.fillStyle = getComputedStyle(element).color; context.fillRect(0, 0, 1, 1);
    const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((v) => v / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 1.05 / (channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722 + 0.05);
  });
  expect(contrast).toBeGreaterThan(7);
});

test('Spanish resources, billing, support and settings share the dashboard language', async ({ page }) => {
  await fixtures(page, 'SPANISH');
  for (const [route, heading] of [['/resources-guide', 'Recursos y guías'], ['/payment-billing', 'Pagos y facturación'], ['/support', 'Conversaciones de soporte'], ['/profile-settings', 'Perfil y configuración']]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { name: heading, exact: true }).last()).toBeVisible();
    if (route === '/resources-guide') await expect(page.getByText('Kit de hoteles y negocios locales')).toBeVisible();
    if (route === '/payment-billing') await expect(page.getByText('QTA-F240', { exact: true })).toBeVisible();
  }
  await page.locator('header').first().getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Profile & Settings', exact: true }).last()).toBeVisible();
  await page.goto('/resources-guide');
  await expect(page.getByText('English resource guide')).toBeVisible();
});

test('Spanish selling page has an in-site language selector', async ({ page }) => {
  let checkout: Record<string, unknown> | undefined;
  await page.route('**/api/v1/**', (route) => {
    if (route.request().url().includes('/payments/checkout-session')) checkout = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, checkoutUrl: null, spanishPopupEnabled: false } });
  });
  await page.goto('/spanish');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/spanish?showPricing=true');
  await expect(page.getByRole('heading', { name: 'Choose Your Launch Package', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill('qa@example.test');
  await page.getByRole('button', { name: 'Get Started — $295', exact: true }).click();
  await expect.poll(() => checkout?.funnelCategory).toBe('SPANISH');
  expect(checkout?.locale).toBe('en');
});

test('passenger form keeps entered data when switching language and submits the chosen locale', async ({ page }) => {
  await fixtures(page, 'SPANISH');
  let submitted: Record<string, unknown> | undefined;
  await page.route('**/public/business/qa-coastal/ride-requests', async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({ json: { success: true, correlationId: 'qa-request', disclaimer } });
  });
  await page.goto('/site/qa-coastal');
  await page.getByRole('button', { name: /SOLICITA TU VIAJE AHORA/i }).click();
  const form = page.getByRole('dialog');
  await form.getByRole('textbox', { name: 'Nombre completo' }).fill('Ana QA');
  await form.getByRole('button', { name: 'English', exact: true }).click();
  await expect(form.getByRole('textbox', { name: 'Full name' })).toHaveValue('Ana QA');
  await form.getByRole('button', { name: 'Español', exact: true }).click();
  await form.getByRole('textbox', { name: 'Correo electrónico' }).fill('qa@example.test');
  await form.getByRole('textbox', { name: 'Teléfono' }).fill('2395550147');
  await form.getByLabel('Lugar de recogida').fill('Naples');
  await form.getByLabel('Destino').fill('RSW');
  await form.getByLabel(/^Fecha/).fill('2026-11-12');
  await form.getByLabel(/^Hora/).fill('10:30');
  await form.getByRole('button', { name: 'Enviar solicitud de viaje' }).click();
  await expect.poll(() => submitted?.language).toBe('es');
  await expect(form.getByText(/El viaje no está confirmado/)).toBeVisible();
});
