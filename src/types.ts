import { stripeConfig, stripeCreatePayment, stripeConfirmPayment, stripePaymentResult, stripePaymentError } from "./providers/stripe/src/config";

export type resultType = 'Success' | 'Error'
export type providerConfig = stripeConfig ;

export interface baseProviderConfig {
  provider: string;
}

export type createPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePayment :
  never;

export type confirmPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPayment :
  never;
  
export type paymentResult<T extends providerConfig> =
  T extends stripeConfig ? stripePaymentResult :
  never;

export type paymentError<T extends providerConfig> =
  T extends stripeConfig ? stripePaymentError :
  never;




