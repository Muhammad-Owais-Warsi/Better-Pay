import { baseProviderConfig, resultType } from "../../../types";

export interface squareConfig extends baseProviderConfig {
  provider: 'square';
  apiToken: string;
}

export interface squareConfirmPayment {
  sourceId: string;
  amount: number;
  currency: string;
}


export interface squarePaymentResult {
  paymentId: string;
  orderId: string;
  status: string;
  type: resultType
}

export interface squarePaymentError {
  message: string;
  type: resultType
}
