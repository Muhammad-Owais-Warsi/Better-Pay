import { squareConfig, squareConfirmPayment, squarePaymentError, squarePaymentResult } from "./providers/square/src";
import { stripeConfig, stripeCreatePayment, stripeConfirmPayment, stripePaymentResult, stripePaymentError } from "./providers/stripe/src/config";


export type resultType = 'Success' | 'Error'
export type providerConfig = stripeConfig | squareConfig;

export interface baseProviderConfig {
  provider: string;
}

export type createPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePayment :
  never;

export type confirmPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPayment :
  T extends squareConfig ? squareConfirmPayment :
  never;
  
export type paymentResult<T extends providerConfig> =
  T extends stripeConfig ? stripePaymentResult :
  T extends squareConfig ? squarePaymentResult :
  never;

export type paymentError<T extends providerConfig> =
  T extends stripeConfig ? stripePaymentError :
  T extends squareConfig ? squarePaymentError :
  never;
  




