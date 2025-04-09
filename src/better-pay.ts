import { StripeProvider } from "./providers/stripe/src/stripe"
import { providerConfig, paymentResult, paymentError, createPayment, confirmPayment } from "./types";

export class BetterPay<T extends providerConfig> {
    
  private provider: T['provider'];
  private providerInstance: any;
  
  constructor(config: T) {
    this.provider = config.provider;
    
    switch(config.provider) {
      case 'stripe':
        this.providerInstance = new StripeProvider(config)
        break;
      default:
        console.error(`Unsupported provider: ${config.provider}`);
        process.exit(1)
    }
  }
  
  async createPayment(params: createPayment<T>): Promise<paymentResult<T> | paymentError<T>> {
    try{
      const result = this.providerInstance.createPayment(params);
      return result;
    } catch(error) {
      return error as paymentError<T>;
    }
  }
  
  async confirmPayment(params: confirmPayment<T>): Promise<paymentResult<T> | paymentError<T>> {
    try {
      const result = this.providerInstance.confirmPayment(params);
      return result;
    } catch(error) {
      return error as paymentError<T>;
    }
  }

}