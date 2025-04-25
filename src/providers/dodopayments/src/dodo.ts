import DodoPayments from "dodopayments";
import { dodoPaymentsConfirmPayment, dodoPaymentsConfirmPaymentError, dodoPaymentsConfirmPaymentResult, dodoPaymentsCreatePayment, dodoPaymentsCreatePaymentError, dodoPaymentsCreatePaymentResult } from "./config";


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

      const productResponse = await this.dodoPayments.products.create({
        price: {
          currency: params.currency,
          discount: params.discount || 0,
          price: params.amount,
          purchasing_power_parity: true,
          type: 'one_time_price'
        },
        tax_category: 'digital_products'
      });

      
      const customerResponse = await this.dodoPayments.customers.create({
        email: params.email,
        name: params.name,
        phone_number: params.phoneNumber
      });
      
      return {
        productId: productResponse.product_id,
        customerId: customerResponse.customer_id,
        businessId: productResponse.business_id,
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
        product_cart: [{
          product_id: params.productId,
          quantity: params.quantity || 1
        }],
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
  
}
