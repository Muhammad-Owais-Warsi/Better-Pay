import { baseProviderConfig, resultType } from "../../../types";

export interface dodoPaymentsConfig extends baseProviderConfig {
  provider: 'dodopayments',
  apiKey: string;
  isLiveMode?: boolean;
};

export interface dodoPaymentsCreatePayment {
  amount: number[];
  discount?: number[];
  currency: string;
  email: string;
  name: string;
  phoneNumber?: number;
}

export interface dodoPaymentsConfirmPayment {
  customerId: string;
  productId: string[];
  quantity?: number[];
  city: string;
  countryIsoCode: string;
  state: string;
  street: string;
  zipCode: number;
  paymentLink?: boolean;
  returnUrl?: string;
  metadata?: any;
  
}

export interface dodoPaymentsCreatePaymentPaymentLink {
  amount: number[];
  discount?: number[];
  currency: string;
  email: string;
  name: string;
  phoneNumber?: number;
  quantity?: number[];
  city: string;
  countryIsoCode: string;
  state: string;
  street: string;
  zipCode: number;
  paymentLink?: boolean;
  returnUrl?: string;
  metadata?: any;
}

export interface dodoPaymentsCreatePaymentResult {
  productId: string[];
  customerId: string;
  businessId: string;
  type: resultType
}

export interface dodoPaymentsConfirmPaymentResult {
  paymentId: string;
  clientSecret: string;
  paymentLink?: string;
  type: resultType;
}

export interface dodoPaymentsCreatePaymentPaymentLinkResult {
  paymentId: string;
  clientSecret: string;
  paymentLink: string;
  productId: string[];
  customerId: string;
  businessId: string;
  type: resultType;
}

export interface dodoPaymentsCreatePaymentError {
  message: string;
  type: resultType;
  
}

export interface dodoPaymentsConfirmPaymentError {
  message: string;
  type: resultType
}

export interface dodoPaymentsCreatePaymentLinkError {
  message: string;
  type: resultType;
}