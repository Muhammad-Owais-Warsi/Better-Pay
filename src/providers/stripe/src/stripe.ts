import { Stripe } from "stripe";
import { stripeConfirmPayment, stripeConfirmPaymentError, stripeConfirmPaymentResult, stripeCreatePayment, stripeCreatePaymentError, stripeCreatePaymentPaymentLink, stripeCreatePaymentPaymentLinkError, stripeCreatePaymentPaymentLinkResult, stripeCreatePaymentResult } from "./config";

export class StripeProvider {
  private stripe: Stripe;

  constructor(config: { apiKey: string }) {
    this.stripe = new Stripe(config.apiKey);
  }

  async createPayment(params: stripeCreatePayment): Promise<stripeCreatePaymentResult | stripeCreatePaymentError> {
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
  
  async confirmPayment(params: stripeConfirmPayment): Promise<stripeConfirmPaymentResult | stripeConfirmPaymentError> {
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
  
  async createPaymentLink(params: stripeCreatePaymentPaymentLink): Promise<stripeCreatePaymentPaymentLinkResult | stripeCreatePaymentPaymentLinkError> {
    try {
      const productResponse = await this.stripe.products.create({
        name: params.name
      });
      
      const priceResponse = await this.stripe.prices.create({
        unit_amount: params.amount,
        currency: params.currency,
        product: productResponse.id
      });
      
      const paymentLinkResponse = await this.stripe.paymentLinks.create({
        line_items: [
          {
            price: priceResponse.id,
            quantity: params.quantity || 1
          }
        ]
      });
      
      return {
        paymentLinkId: paymentLinkResponse.id,
        paymentLink: paymentLinkResponse.url,
        productId: productResponse.id,
        priceId: priceResponse.id,
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
