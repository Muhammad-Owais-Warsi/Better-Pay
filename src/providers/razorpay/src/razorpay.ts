import Razorpay from "razorpay";
import { razorpayConfirmPayment, razorpayConfirmPaymentError, razorpayConfirmPaymentResult } from "./config";

export class RazorpayProvider {
  private razorpay: any;
  
  constructor(config: {keyId: string, keySecret: string}) {
    this.razorpay = new Razorpay({
      key_id: config.keyId,
      key_secret: config.keySecret
    });
  }
  
  async confirmPayment(params: razorpayConfirmPayment): Promise<razorpayConfirmPaymentResult | razorpayConfirmPaymentError> {
    try {
      const response = await this.razorpay.paymentLink.create({
        upi_link: params.upiLink,
        amount: params.amount,
        currency: params.currency,
        customer: {
          name: params.name,
          email: params.email,
          contact: params.phoneNumber
        },
        callback_url: params.returnUrl,
        notes: params.metadata
      });

      return {
        referenceId: response.reference_id,
        paymentLink: response.short_url,
        status: response.status,
        type: 'Success'
      }
    } catch (error: any) {
      return {
        message: error.error.description || error.message,
        type: 'Error'
      }
    }
  }
}