import { Stripe } from "stripe";
import { stripeConfirmPayment, stripeCreatePayment, stripePaymentError, stripePaymentResult } from "./config";

export class StripeProvider {
  private stripe: Stripe;

  constructor(config: { apiKey: string }) {
    this.stripe = new Stripe(config.apiKey);
  }

  async createPayment(params: stripeCreatePayment): Promise<stripePaymentResult | stripePaymentError> {
    try {
      const response = await this.stripe.paymentIntents.create({
        amount: params.amount,
        currency: params.currency,
        receipt_email: params.receiptEmail,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: params.metadata,
      });
      
      return  {
        paymentIntentId: response.id,
        paymentIntentClientSecret: response.client_secret!,
        status: response.status,
        type: 'Success'
      }
      
    } catch (error: any) {
      return {
        message: error.message,
        type: 'Error'
      };
    }
  }
  
  async confirmPayment(params: stripeConfirmPayment): Promise<stripePaymentResult | stripePaymentError> {
    try{
      const response = await this.stripe.paymentIntents.confirm(
        params.paymentIntentId,
        {
          payment_method: params.paymentMethodId,
          return_url: params.returnUrl
        }
      );
      
      return {
        paymentIntentId: response.id,
        paymentIntentClientSecret: response.client_secret!,
        status: response.status,
        type: 'Success'
      }
    } catch(error: any) {
      return {
        message: error.message,
        type: 'Error'
      }
    }
  }
}
