import { stripeConfig, stripeCreatePayment, stripeConfirmPayment, stripeCreatePaymentResult, stripeConfirmPaymentResult, stripeCreatePaymentError, stripeConfirmPaymentError, stripeCreatePaymentPaymentLink, stripeCreatePaymentPaymentLinkResult, stripeCreatePaymentPaymentLinkError } from "./providers/stripe/src/config";
import { squareConfig, squareConfirmPayment, squareConfirmPaymentError, squareConfirmPaymentResult } from "./providers/square/src";
import { dodoPaymentsConfig, dodoPaymentsCreatePayment, dodoPaymentsConfirmPayment, dodoPaymentsCreatePaymentResult, dodoPaymentsCreatePaymentError, dodoPaymentsConfirmPaymentError, dodoPaymentsConfirmPaymentResult, dodoPaymentsCreatePaymentPaymentLink, dodoPaymentsCreatePaymentPaymentLinkResult, dodoPaymentsCreatePaymentLinkError } from "./providers/dodopayments/src";
import { razorpayConfig, razorpayCreatePaymentLink, razorpayCreatePaymentLinkError, razorpayCreatePaymentLinkResult } from "./providers/razorpay/src";
import { polarConfig, polarConfirmPaymentError, polarConfirmPaymentResult, polarCreatePayment, polarCreatePaymentError, polarCreatePaymentResult } from "./providers/polar/src";


export type resultType = 'Success' | 'Error'
export type providerConfig = stripeConfig | squareConfig | dodoPaymentsConfig | razorpayConfig | polarConfig;

export interface baseProviderConfig {
  provider: string;
}

export type createPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePayment :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePayment :
  T extends polarConfig ? polarCreatePayment :
  never;

export type confirmPayment<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPayment :
  T extends squareConfig ? squareConfirmPayment :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPayment :
  T extends polarConfig ? polarCreatePayment :
  never;
  
  
export type createPaymentLink<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePaymentPaymentLink :
  T extends razorpayConfig ? razorpayCreatePaymentLink :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentPaymentLink :
  never;
  
  
export type createPaymentResult<T extends providerConfig> = 
  T extends stripeConfig ? stripeCreatePaymentResult :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentResult : 
  T extends polarConfig ? polarCreatePaymentResult :
  never;
  
export type confirmPaymentResult<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPaymentResult :
  T extends squareConfig ? squareConfirmPaymentResult :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPaymentResult :
  T extends polarConfig ? polarConfirmPaymentResult :
  never;
  
export type createPaymentLinkResult<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePaymentPaymentLinkResult :
  T extends razorpayConfig ? razorpayCreatePaymentLinkResult :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentPaymentLinkResult :
  never;
  
export type createPaymentError<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePaymentError :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentError :
  T extends polarConfig ? polarCreatePaymentError :
  never;
  

export type confirmPaymentError<T extends providerConfig> =
  T extends stripeConfig ? stripeConfirmPaymentError :
  T extends squareConfig ? squareConfirmPaymentError :
  T extends dodoPaymentsConfig ? dodoPaymentsConfirmPaymentError :
  T extends polarConfig ? polarConfirmPaymentError :
  never;


export type createPaymentLinkError<T extends providerConfig> =
  T extends stripeConfig ? stripeCreatePaymentPaymentLinkError :
  T extends razorpayConfig ? razorpayCreatePaymentLinkError :
  T extends dodoPaymentsConfig ? dodoPaymentsCreatePaymentLinkError :
  never;



