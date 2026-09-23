import { expect, test } from "@playwright/test";
import { apiBaseURL, loginByApi, runFixture, signWebhookPayload } from "./helpers";

test("signed Stripe checkout webhook creates exactly one DFY order", async ({ page, request }) => {
  const user = runFixture<{ email: string; password: string }>("prepare-base-owner");
  const auth = await loginByApi(page, request, user.email, user.password);

  const checkout = await request.post(`${apiBaseURL}/payments/checkout-session`, {
    headers: { authorization: `Bearer ${auth.accessToken}` },
    data: {
      items: [{ productId: "addon", quantity: 1 }],
      successUrl: "http://127.0.0.1:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=addon",
      cancelUrl: "http://127.0.0.1:5173/done-for-you",
      funnelCategory: "WOMEN",
      sourcePage: "WOMEN",
    },
  });
  expect(checkout.ok()).toBeTruthy();
  const checkoutBody = await checkout.json();
  expect(checkoutBody.checkoutUrl).toContain("checkout.stripe.com");

  const payload = {
    id: `evt_test_dfy_e2e_${Date.now()}`,
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: checkoutBody.sessionId,
        object: "checkout.session",
        payment_status: "paid",
        payment_intent: `pi_test_dfy_e2e_${Date.now()}`,
        customer_email: user.email,
        customer_details: { email: user.email },
        metadata: {
          userId: auth.user.id,
          email: user.email,
          funnelCategory: "WOMEN",
        },
      },
    },
  };
  const signature = await signWebhookPayload(payload);
  const webhook = await request.post(`${apiBaseURL}/payments/webhook`, {
    headers: {
      "stripe-signature": signature,
      "content-type": "application/json",
    },
    data: payload,
  });
  expect(webhook.ok()).toBeTruthy();

  const customer = await request.get(`${apiBaseURL}/business/done-for-you`, {
    headers: { authorization: `Bearer ${auth.accessToken}` },
  });
  expect(customer.ok()).toBeTruthy();
  const body = await customer.json();
  expect(body.order.audience).toBe("WOMEN");
  expect(body.order.deliverables).toHaveLength(7);

  const duplicate = await request.post(`${apiBaseURL}/payments/webhook`, {
    headers: {
      "stripe-signature": signature,
      "content-type": "application/json",
    },
    data: payload,
  });
  expect(duplicate.ok()).toBeTruthy();
  const afterDuplicate = await request.get(`${apiBaseURL}/business/done-for-you`, {
    headers: { authorization: `Bearer ${auth.accessToken}` },
  });
  const duplicateBody = await afterDuplicate.json();
  expect(duplicateBody.order.id).toBe(body.order.id);
});
