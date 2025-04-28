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

      const productPromises = params.name.map((name, i) => {
        return this.stripe.products.create({
          name: name,
        });
      });
      
      const products = await Promise.all(productPromises);
      
      const pricePromises = products.map((product, i) => {
        return this.stripe.prices.create({
          unit_amount: params.amount[i],
          currency: params.currency,
          product: product.id,
        });
      });
      
      const prices = await Promise.all(pricePromises);
      
      const productResponses = products.map(product => product.id);
      const priceResponses = prices.map(price => price.id);

      const lineItems = priceResponses.map((price, i) =>({
        price: price,
        quantity: params.quantity?.[i] || 1
      }))
      
      const paymentLinkResponse = await this.stripe.paymentLinks.create({
        line_items: lineItems,
        metadata: params.metadata
      });
      
      return {
        paymentLinkId: paymentLinkResponse.id,
        paymentLink: paymentLinkResponse.url,
        productId: productResponses,
        priceId: priceResponses,
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
