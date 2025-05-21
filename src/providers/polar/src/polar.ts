import { Polar } from "@polar-sh/sdk"
import { polarConfirmPayment, polarConfirmPaymentError, polarConfirmPaymentResult, polarCreatePayment, polarCreatePaymentError, polarCreatePaymentResult } from "./config";
 
export class PolarProvider {
  private polar: any;
  
  constructor(config: {accessToken: string}) {
    this.polar = new Polar({
      accessToken: config.accessToken
    })
  }
  
  async createPayment(params: polarCreatePayment): Promise<polarCreatePaymentResult | polarCreatePaymentError> {
    try {
      const response = await this.polar.products.create({
        name: params.name,
        recurringInterval: null,
        prices: [
          {
            amountType: "fixed",
            priceAmount: params.amount,
            priceCurrency: params.currency,
          },
         
        ],
        metadata: params.metadata
      });
      
      return {
        productId: response.id,
        type: 'Success'
      }
      
    } catch(error: any) {
      return {
        message: error.message,
        type: 'Error'
      }
    }
  }
  
  async confirmPayment(params: polarConfirmPayment): Promise<polarConfirmPaymentResult | polarConfirmPaymentError> {
    try {
      const products = params.productId.map((id) => {
        return id
      });
      
      const response = await this.polar.checkouts.create({
        products: products,
        successUrl: params.returnUrl
      })

      return {
        clientSecret: response.clientSecret,
        paymentLink: response.url,
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