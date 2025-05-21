
<div align="center">
  <img src="https://github.com/user-attachments/assets/9e793b2a-d94a-41cf-8a4c-0a6a806d685b" alt="Better Pay" width="500"/>
</div>



<h1 align="center">Better Pay</h1> 
<h3 align="center">The payment layer for modern applications.</h3>

<div align="center">
  <img src="https://github.com/user-attachments/assets/5b661921-28c9-46bc-bd67-cdee58154761" alt="Better Pay" />
</div>


## What is Better Pay?

Better Pay is a unified, developer-first payment integration layer that supports multiple payment providers. Designed for flexibility, and simplicity, it helps you manage payment flows without diving deep into each provider's APIs. Whether you're building SaaS, e-commerce, or custom apps — Better pay is streamlines the whole payment process for you.

## Integration Support 
- Stripe
- Square (Single step)
- Dodo Payments
- Razorpay (Single step)
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

2. Create Payment
   
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
  paymentIntentId: 'YOUR_PAYMENT_INTENT_ID',
  paymentMethodId: 'YOUR_PAYMENT_METHOD_ID',
  returnUrl: 'YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT'
})

```

## STRIPE PAYMENT LINK

1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "stripe",
  apiKey: "API_KEY_FOR_STRIPE" 
})

```

2. Create Payment Link
 ```
   const response = provider.createPaymentLink({
     name: ['NAME_OF_YOUR_PRODUCT'], // You can add more names seperated by comma.
     amount: [1000], // You can add more amount seperated by comma.
     currency: 'usd',
     quantity: [1] // optional. By default 1. You can add more quantity seperated by comma.
     metadata: {} // optional
   })
 ```



---


## SQUARE
 Get started with our sample demo app integrated with square. [Demo](https://github.com/Muhammad-Owais-Warsi/square_demo)

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
  sourceId: 'YOUR_PAYMENT_SOURCE_ID',
  amount: 100,
  currency: 'USD'
})

```


---


## DODO PAYMENTS
 Get started with our sample demo app integrated with Dodo Payments. [Demo](https://github.com/Muhammad-Owais-Warsi/dodopayments_demo)


1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "dodopayments",
  apiKey: "API_KEY_FOR_DODO_PAYMENTS",
  isLiveMode: false // by default false  
})

```

2. Create Payment

After initializing the provider:

 ```
const response = await provider.createPayment({
  amount: 100,
  currency: 'USD',
  discount: 0, // by default 0
  email: 'test@gmail.com',
  name: 'test',
  phoneNumber: 99999999 // optional
})

```

3. Confirm Payment

Get the `customerId` and `productId` from above:

```
const response = await provider.confirmPayment({
  customerId: 'YOUR_CUSTOMER_ID',
  productId: 'YOUR_PRODUCT_ID',
  quantity: 1 // optional. By default set to 1
  city: 'USER_CITY',
  countryIsoCode: 'USER_COUNTRY_ISO_CODE',
  state: 'USER_STATE',
  street: 'USER_STREET',
  zipCode: USER_ZIP_CODE,
  paymentLink: true, // One time payment link. By default false.
  returnUrl: 'YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT', // optional
  metadata: {} //optional
})

```

## DODO PAYMENTS PAYMENT LINK

1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "dodopayments",
  apiKey: "API_KEY_FOR_STRIPE",
  isLive: false // By default false. 
})

```

2. Create Payment Link
 ```
   const response = provider.createPaymentLink({
    amount: [100], // You can add more amount seperated by comma.
    currency: 'USD',
    discount: [0], // by default 0. You can add more discount seperated by comma.
    email: 'test@gmail.com',
    name: 'test',
    phoneNumber: 99999999 // optional
    city: 'USER_CITY',
    countryIsoCode: 'USER_COUNTRY_ISO_CODE',
    state: 'USER_STATE',
    street: 'USER_STREET',
    zipCode: USER_ZIP_CODE,
    paymentLink: true, // One time payment link. By default false.
    returnUrl: 'YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT', // optional
    metadata: {} //optional
   })
 ```



---

## RAZORPAY
 Get started with our sample demo app integrated with razorpay. [Demo](https://github.com/Muhammad-Owais-Warsi/razorpay_demo)

1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "razorpay",
  keyId: "KEY_ID_FOR_RAZORPAY",
  keySecret: "KEY_SECRET_FOR_RAZORPAY" 
})

```

2. Create Payment Link

Get the necessary details from the user.

```
const response = await provider.createPaymentLink({

  upiLink: false, // UPI Link. By default false.
  amount: 1000,
  currency: 'INR',
  name: '', // optional
  phoneNumber:  , // optional
  email: 'test@gamil.com',
  isSMS: false // Optional. By default false.
  isEmail: false // Optional. By default false.
  returnUrl: 'YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT',
  metadata: {} // optional

})

```

---

## POLAR 
 Get started with our sample demo app integrated with polar. [Demo](https://github.com/Muhammad-Owais-Warsi/stripe-demo)


1. Initialise the provider
```
import { BetterPay } from "better-pay";
   
const provider = new BetterPay({
  provider: "polar",
  accessToken: "ACCESS_TOKEN_FOR_POLAR" 
})

```

1. Create Payment
   
After initializing the provider:
 ```
const response = await provider.createPayment({
  name: 'NAME_OF_PRODUCT',
  amount: 10000,
  currency: 'usd',
  organizationId: 'YOUR_ORGANIZATION_ID', // optional
  metadata: {} // optional
})

```

2. Confirm Payment

Get the `product_id` from above:

```
const response = await provider.confirmPayment({
  productId: ['PRODUCT_ID'], // You can add more amount seperated by comma.
  returnUrl: 'YOUR_RETURN_URL_AFTER_SUCCESSFULL_PAYMENT'
})

```


## Community Support
![Better Pay-supporters-light](https://github.com/user-attachments/assets/d80b0ff3-2f17-4ccc-8610-2226ab15a825)





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
