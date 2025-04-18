import { stripeConfig, stripeCreatePayment, stripeConfirmPayment, stripeCreatePaymentResult, stripeConfirmPaymentResult, stripeCreatePaymentError, stripeConfirmPaymentError } from "./providers/stripe/src/config";
import { squareConfig, squareConfirmPayment, squareConfirmPaymentError, squareConfirmPaymentResult } from "./providers/square/src";
import { dodoPaymentsConfig, dodoPaymentsCreatePayment, dodoPaymentsConfirmPayment, dodoPaymentsCreatePaymentResult, dodoPaymentsCreatePaymentError, dodoPaymentsConfirmPaymentError, dodoPaymentsConfirmPaymentResult } from "./providers/dodopayments/src";
import { razorpayConfig, razorpayConfirmPayment, razorpayConfirmPaymentError, razorpayConfirmPaymentResult } from "./providers/razorpay/src";


export type resultType = 'Success' | 'Error'
export type providerConfig = stripeConfig | squareConfig | dodoPaymentsConfig | razorpayConfig;

export interface baseProviderConfig {
  provider: string;
}

export type createPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePayment :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePayment :
  never;

export type confirmPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPayment :
  T extends squareConfig ? squareConfirmPayment :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPayment :
  T extends razorpayConfig ? razorpayConfirmPayment :
  never;
  
export type createPaymentResult<T extends providerConfig> = 
  T extends stripeConfig ? stripeCreatePaymentResult :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentResult : 
  never;
  
export type confirmPaymentResult<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPaymentResult :
  T extends squareConfig ? squareConfirmPaymentResult :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPaymentResult :
  T extends razorpayConfig ? razorpayConfirmPaymentResult :
  never;
  

export type createPaymentError<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePaymentError :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentError :
  never;
  

export type confirmPaymentError<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPaymentError :
  T extends squareConfig ? squareConfirmPaymentError :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPaymentError :
  T extends razorpayConfig ? razorpayConfirmPaymentError :
  never;






