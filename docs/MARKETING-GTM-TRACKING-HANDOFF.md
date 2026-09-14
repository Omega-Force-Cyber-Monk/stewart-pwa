# Marketing GTM Tracking Handoff

This app is a React single-page app, so purchase and onboarding tracking should use Google Tag Manager custom events from `window.dataLayer`, not URL-only tracking.

GTM is already installed on the frontend container:

```txt
GTM-PHZG8CDZ
```

The frontend now pushes two custom events:

```txt
purchase
onboarding_completed
```

## 1. Purchase Tracking

The frontend pushes a `purchase` event when the user returns from Stripe checkout to the payment success page.

GTM trigger type:

```txt
Custom Event
```

GTM event name:

```txt
purchase
```

Example payload for the base package:

```js
{
  event: 'purchase',
  transaction_id: '<stripe checkout session id>',
  value: 295,
  currency: 'USD',
  items: [
    {
      item_name: 'QuitTheApp',
      price: 295,
      quantity: 1
    }
  ]
}
```

Example payload for the premium/bundle package:

```js
{
  event: 'purchase',
  transaction_id: '<stripe checkout session id>',
  value: 394,
  currency: 'USD',
  items: [
    {
      item_name: 'QuitTheApp',
      price: 295,
      quantity: 1
    },
    {
      item_name: 'Done For You',
      price: 99,
      quantity: 1
    }
  ]
}
```

Available fields:

```txt
transaction_id
value
currency
items
```

Recommended GA4 event:

```txt
purchase
```

Recommended GA4 parameters:

```txt
transaction_id = transaction_id
value = value
currency = currency
items = items
```

## 2. Onboarding Completion Tracking

The frontend pushes an `onboarding_completed` event after the user successfully completes the launch/onboarding flow.

This happens after the app receives a successful response from:

```txt
POST /business/complete-launch
```

GTM trigger type:

```txt
Custom Event
```

GTM event name:

```txt
onboarding_completed
```

Example payload:

```js
{
  event: 'onboarding_completed',
  user_id: '<app user id when available>'
}
```

Available fields:

```txt
user_id
```

Recommended GA4 event name:

```txt
onboarding_completed
```

Mark this GA4 event as a conversion/key event if onboarding completion is a conversion goal.

## 3. GTM Setup Steps

Create a purchase trigger:

```txt
Trigger type: Custom Event
Event name: purchase
```

Create an onboarding trigger:

```txt
Trigger type: Custom Event
Event name: onboarding_completed
```

Then attach those triggers to the relevant GA4 tags.

Do not depend on these URLs for conversion tracking:

```txt
/payment/success
/dashboard?onboarding=completed
```

Those URLs can still be useful for debugging, but the reliable tracking method is the custom `dataLayer` events above.

## 4. How To Test

In GTM Preview / Tag Assistant:

1. Start a checkout.
2. Complete Stripe payment.
3. Return to the app.
4. Confirm that a `purchase` event appears in the dataLayer timeline.
5. Complete onboarding/launch.
6. Confirm that an `onboarding_completed` event appears in the dataLayer timeline.

In browser DevTools, this can also be checked with:

```js
window.dataLayer
```

Look for objects where:

```js
event === 'purchase'
```

or:

```js
event === 'onboarding_completed'
```

