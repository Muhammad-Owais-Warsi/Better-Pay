import { baseProviderConfig, resultType } from "../../../types";


export interface razorpayConfig extends baseProviderConfig {
  provider: 'razorpay';
  keyId: string;
  keySecret: string;
}

export interface razorpayConfirmPayment {
  upiLink: boolean;
  amount: number;
  currency: string;
  name?: string;
  phoneNumber?: number;
  email: string;
  returnUrl: string;
  metadata?: any;
}

export interface razorpayConfirmPaymentResult {
  referenceId: string;
  paymentLink: string;
  status: string;
  type: resultType;
}

export interface razorpayConfirmPaymentError {
  message: string;
  type: resultType;
}