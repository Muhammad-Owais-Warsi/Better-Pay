<h1 align="center">Better Pay</h1>
<h3 align="center">The payment layer for modern applications.</h3>


## What is Better Pay?

Better Pay is a unified, developer-first payment integration layer that supports multiple payment providers. Designed for flexibility, and simplicity, it helps you manage payment flows without diving deep into each provider's APIs. Whether you're building SaaS, e-commerce, or custom apps — Better pay is streamlines the whole payment process for you.

## Integration Support 
- Stripe
- Square (Single step)
- Coming Soon...

## Get Started

1. Installation
  ``` 
  npm i better-pay
  ```

2. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: " ", // or any provider
  key: " "      // keys or tokens for provider integration
})
```
---


## STRIPE
 Get started with our sample demo app integrated with stripe. [Demo](https://github.com/Muhammad-Owais-Warsi/stripe-demo)


1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "stripe",
  apiKey: "API_KEY_FOR_STRIPE" 
})

```

2. **Create Payment**
   
After initializing the provider:
 ```
const response = await provider.createPayment({
  amount: 10000,
  currency: 'usd',
  receiptEmail: 'test@gmail.com', // optional
  metadata: {} // optional
})

```
This returns a `client_secret`. Send it to your frontend where the customer will enter their card details using Stripe Elements.

---

**NOTE**  

Supports card elements only.

---

3. Confirm Payment

Once you have the `payment_method_id` from the frontend:

```
const response = await provider.confirmPayment({
  paymentIntentId: YOUR_PAYMENT_INTENT_ID,
  paymentMethodId: YOUR_PAYMENT_METHOD_ID,
  returnUrl: YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT
})

```

---


## SQUARE
 Get started with our sample demo app integrated with square. [Demo](https://github.com/Muhammad-Owais-Warsi/stripe-demo)

**NOTE**  

Supports card elements only.

---

1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "square",
  apiToken: "API_TOKEN_FOR_SQUARE" 
})

```

2. Confirm Payment

  Get the `sourceId` from the client uisng the card element provided by Square.

```
const response = await provider.confirmPayment({
  sourceId: YOUR_PAYMENT_SOURCE_ID,
  amount: 100,
  currency: 'USD'
})

```


---




## Contribution

We welcome contributions from the community!

If you'd like to improve Better Pay, add support for a new provider, fix a bug or even a suggestion is much appreciated.

- Please open an issue first to discuss what you’d like to contribute.

-  Fork this repository.

- Create a branch with a meaningful name.

- Make your changes and ensure everything works.

- Open a pull request with a clear description of what you’ve done.

**Before submitting:**

- Follow the existing code style.

- Add comments or documentation where necessary.


Let's build the future of payments together 💳
