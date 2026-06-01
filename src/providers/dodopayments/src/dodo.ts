import DodoPayments from "dodopayments";
import type {
    DodoConfig,
    DodoPaymentsCreatePayment,
    DodoPaymentsCreatePaymentResponse,
} from "./types";
import { BetterPayError } from "../../../better-pay/errors";

export class DodoPaymentsProvider {
    private client: DodoPayments;
    private config: DodoConfig;

    constructor(config: DodoConfig) {
        this.config = config;
        this.client = new DodoPayments({
            bearerToken: config.apiKey,
            environment: config.isLiveMode ? "live_mode" : "test_mode",
        });
    }

    async createPayment(
        params: DodoPaymentsCreatePayment,
    ): Promise<DodoPaymentsCreatePaymentResponse> {
        try {
            const session = await this.client.checkoutSessions.create({
                product_cart: params.product_cart,
                customer: params.customer,
                billing_address: params.billing_address,
                return_url: params.returnUrl,
                metadata: params.metadata,
            });

            return {
                id: session.session_id,
                provider: "dodopayments",
                status: "pending",
                amount: params.amount,
                currency: params.currency,
                checkoutUrl: session.checkout_url,
                metadata: params.metadata,
                createdAt: new Date(),
                raw: this.config.raw ? session : undefined,
            };
        } catch (error: any) {
            throw new BetterPayError(
                "provider_error",
                "dodopayments",
                error.message,
                this.config.raw ? error : undefined,
            );
        }
    }
}
