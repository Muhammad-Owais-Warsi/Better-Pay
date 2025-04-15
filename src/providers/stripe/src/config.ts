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


export interface stripeCreatePaymentResult {
  paymentIntentId: string;
  paymentIntentClientSecret: string;
  status: string;
  type: resultType
}

export interface stripeConfirmPaymentResult {
  paymentIntentId: string;
  paymentIntentClientSecret: string;
  status: string;
  type: resultType
}


export interface stripeCreatePaymentError {
  message: string;
  type: resultType
}

export interface stripeConfirmPaymentError {
  message: string;
  type: resultType
}
