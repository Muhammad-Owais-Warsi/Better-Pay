import DodoPayments from "dodopayments";
import { dodoPaymentsConfirmPayment, dodoPaymentsConfirmPaymentError, dodoPaymentsConfirmPaymentResult, dodoPaymentsCreatePayment, dodoPaymentsCreatePaymentError, dodoPaymentsCreatePaymentLinkError, dodoPaymentsCreatePaymentPaymentLink, dodoPaymentsCreatePaymentPaymentLinkResult, dodoPaymentsCreatePaymentResult } from "./config";


export class DodoPaymentsProvider {
  
  private dodoPayments: any
  
  constructor(config: {apiKey: string, isLiveMode?: boolean}) {
    this.dodoPayments = new DodoPayments({
      bearerToken: config.apiKey,
      baseURL: config.isLiveMode ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com'
    });
  }
  
  async createPayment(params: dodoPaymentsCreatePayment): Promise<dodoPaymentsCreatePaymentResult | dodoPaymentsCreatePaymentError> {
    try { 

      const productResponse = params.amount.map((amount, i) => {
        return this.dodoPayments.products.create({
          price: {
            currency: params.currency,
            discount: params.discount?.[i] || 0,
            price: amount,
            purchasing_power_parity: true,
            type: 'one_time_price'
          },
          tax_category: 'digital_products'
        });
      });
      
      const productResponses = await Promise.all(productResponse);

      
      const customerResponse = await this.dodoPayments.customers.create({
        email: params.email,
        name: params.name,
        phone_number: params.phoneNumber
      });
      
      return {
        productId: productResponses.map(product => product.product_id),
        customerId: customerResponse.customer_id,
        businessId: productResponses[0].business_id,
        type: 'Success'
      }
    
    } catch(error: any) {
      return {
        message: error.message,
        type: 'Error'
      }
    }
  }
  
  async confirmPayment(params: dodoPaymentsConfirmPayment): Promise<dodoPaymentsConfirmPaymentResult | dodoPaymentsConfirmPaymentError> {
    try {
      
      const productCart = params.productId.map((productId, i) => ({
        product_id: productId,
        quantity: params.quantity?.[i] || 1
      }))
      
      const response = await this.dodoPayments.payments.create({
        billing: {
          city: params.city,
          country: params.countryIsoCode,
          state: params.state,
          street: params.street,
          zipcode: params.zipCode
        },
        customer: {
          customer_id: params.customerId
        },
        product_cart: productCart,
        payment_link: params.paymentLink,
        return_url: params.returnUrl
      })
      
      
      return {
        paymentId: response.payment_id,
        clientSecret: response.client_secret,
        paymentLink: response.payment_link,
        type: 'Success'
      }
    } catch(error: any) {
      return {
        message: error.message,
        type: 'Error'
      }
    }
  }
  
  async createPaymentLink(params: dodoPaymentsCreatePaymentPaymentLink): Promise<dodoPaymentsCreatePaymentPaymentLinkResult | dodoPaymentsCreatePaymentLinkError> {
    try {
      const productResponse = params.amount.map((amount, i) => {
        return this.dodoPayments.products.create({
          price: {
            currency: params.currency,
            discount: params.discount?.[i] || 0,
            price: amount,
            purchasing_power_parity: true,
            type: 'one_time_price'
          },
          tax_category: 'digital_products'
        });
      });
      
      const productResponses = await Promise.all(productResponse);

      
      const customerResponse = await this.dodoPayments.customers.create({
        email: params.email,
        name: params.name,
        phone_number: params.phoneNumber
      });
      
      const productCart = productResponses.map((product, i) => ({
        product_id: product.product_id,
        quantity: params.quantity?.[i] || 1
      }))
      
      const response = await this.dodoPayments.payments.create({
        billing: {
          city: params.city,
          country: params.countryIsoCode,
          state: params.state,
          street: params.street,
          zipcode: params.zipCode
        },
        customer: {
          customer_id: customerResponse.customer_id
        },
        product_cart: productCart,
        payment_link: params.paymentLink,
        return_url: params.returnUrl
      })
      
      return {
        paymentId: response.payment_id,
        clientSecret: response.client_secret,
        paymentLink: response.payment_link,
        productId: productCart.map(product => product.product_id),
        customerId: customerResponse.customer_id,
        businessId: productResponses[0].business_id,
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
