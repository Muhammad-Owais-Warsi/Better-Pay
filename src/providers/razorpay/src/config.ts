import { baseProviderConfig, resultType } from "../../../types";


export interface razorpayConfig extends baseProviderConfig {
  provider: 'razorpay';
  keyId: string;
  keySecret: string;
}

export interface razorpayCreatePaymentLink {
  upiLink: boolean;
  amount: number;
  currency: string;
  name?: string;
  phoneNumber?: number;
  email: string;
  returnUrl: string;
  metadata?: any;
}

export interface razorpayCreatePaymentLinkResult {
  referenceId: string;
  paymentLink: string;
  status: string;
  type: resultType;
}

export interface razorpayCreatePaymentLinkError {
  message: string;
  type: resultType;
}