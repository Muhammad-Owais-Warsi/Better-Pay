import { SquareClient } from "square";
import { squareConfirmPayment, squarePaymentError, squarePaymentResult } from "./config";
import { createIdempotentKey } from "./key";

export class SquareProvider {
  private Square: any;
  
  constructor(config: { apiToken: string }) {
    this.Square = new SquareClient({
      token: config.apiToken
    });
  }
  
  async confirmPayment(params: squareConfirmPayment): Promise<squarePaymentResult | squarePaymentError> {
    try {
      const idempotentKey = createIdempotentKey();
      const response = await this.Square.payments.create({
        idempotencyKey: idempotentKey,
        sourceId: params.sourceId,
        amountMoney: {
          amount: BigInt(params.amount),
          currency: params.currency,
        },
        autocomplete: true,
      });
      
      return  {
        paymentId: response.id,
        orderId: response.order_id,
        status: response.status,
        type: 'Success'
      }
    } catch(error: any) {
      return {
        message: error.message || error.errors.detail,
        type: 'Error'
      }
    }
  }
}