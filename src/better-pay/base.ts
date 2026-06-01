export type Providers =
    | "stripe"
    | "dodopayments"
    | "razorpay"
    | "polar"
    | "square";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "cancelled";

export type SubscriptionStatus =
    | "active"
    | "cancelled"
    | "past_due"
    | "trialing"
    | "paused";

export interface BetterPayResponse {
    provider: Providers;
    metadata?: Record<string, string>;
    raw?: unknown;
}
