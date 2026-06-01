import type { Payment, PaymentResponse } from "../../../better-pay/payment";
import type { BetterPayError } from "../../../better-pay/errors";
import type {
    CheckoutSessionCreateParams,
    CheckoutSessionResponse,
} from "dodopayments/resources/checkout-sessions.mjs";

export interface DodoConfig {
    provider: "dodopayments";
    apiKey: string;
    webhookId?: string;
    isLiveMode?: boolean;
    raw?: boolean;
}

export type DodoPaymentsCreatePayment = Payment &
    Partial<CheckoutSessionCreateParams>;

export interface DodoPaymentsCreatePaymentResponse extends PaymentResponse {
    raw?: CheckoutSessionResponse;
}

export type DodoPaymentsError = BetterPayError & {
    raw?: unknown;
};
