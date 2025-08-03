import { StripeProvider } from "./providers/stripe/index.js";
import { SquareProvider } from "./providers/square/index.js";
import { DodoPaymentsProvider } from "./providers/dodopayments/index.js";
import { RazorpayProvider } from "./providers/razorpay/index.js";
import { providerConfig, createPaymentResult, createPaymentError, confirmPaymentResult, confirmPaymentError, createPayment, confirmPayment, baseProviderConfig, createPaymentLink, createPaymentLinkResult, createPaymentLinkError } from "./types.js";
import { PolarProvider } from "./providers/polar/index.js";

export class BetterPay<T extends providerConfig> {

  private provider: T['provider'];
  private providerInstance: any;

  constructor(config: T) {
    this.provider = config.provider;

    switch (config.provider) {
      case 'stripe':
        this.providerInstance = new StripeProvider(config)
        break;
      case 'square':
        this.providerInstance = new SquareProvider(config)
        break;
      case 'dodopayments':
        this.providerInstance = new DodoPaymentsProvider(config)
        break;
      case 'razorpay':
        this.providerInstance = new RazorpayProvider(config)
        break;
      case 'polar':
        this.providerInstance = new PolarProvider(config)
        break;
      default:
        console.error(`Unsupported provider: ${this.provider}`)
        process.exit(1)
    }
  }

  async createPayment(params: createPayment<T>): Promise<createPaymentResult<T> | createPaymentError<T>> {
    try {
      const result = this.providerInstance.createPayment(params);
      return result;
    } catch (error) {
      return error as createPaymentError<T>;
    }
  }

  async confirmPayment(params: confirmPayment<T>): Promise<confirmPaymentResult<T> | confirmPaymentError<T>> {
    try {
      const result = this.providerInstance.confirmPayment(params);
      return result;
    } catch (error) {
      return error as confirmPaymentError<T>;
    }
  }

  async createPaymentLink(params: createPaymentLink<T>): Promise<createPaymentLinkResult<T> | createPaymentLinkError<T>> {
    try {
      const result = this.providerInstance.createPaymentLink(params);
      return result;
    } catch (error) {
      return error as createPaymentLinkError<T>
    }
  }


}