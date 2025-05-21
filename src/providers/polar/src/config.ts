import { baseProviderConfig } from "better-pay";

export interface polarConfig extends baseProviderConfig {
  provider: 'polar',
  accessToken: string;
}

export interface polarCreatePayment {
  name: string;
  amount: number;
  currency: string;
  organizationId?: string;
  metadata?: any;
}

export interface polarConfirmPayment {
  productId: string[];
  returnUrl: string;
}

export interface polarCreatePaymentResult {
  productId: string;
  type: string;
}

export interface polarConfirmPaymentResult {
  clientSecret: string;
  paymentLink: string;
  type: string;
}

export interface polarCreatePaymentError {
  message: string;
  type: string;
}

export interface polarConfirmPaymentError {
  message: string;
  type: string;
}