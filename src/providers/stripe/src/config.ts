import { baseProviderConfig, resultType } from "../../../types";

export interface stripeConfig extends baseProviderConfig {
  provider: 'stripe';
  apiKey: string;
}


export interface stripeCreatePayment {
  amount: number;
  currency: string;
  receiptEmail?: string;
  metadata?: any;
}

export interface stripeConfirmPayment {
  paymentIntentId: string;
  paymentMethodId: string;
  returnUrl: string;
}


export interface stripePaymentResult {
  paymentIntentId: string;
  paymentIntentClientSecret: string;
  status: string;
  type: resultType
}

export interface stripePaymentError {
  message: string;
  type: resultType
}
