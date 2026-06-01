import { BetterPayResponse, SubscriptionStatus } from "./base";

export interface Subscription {
    customerId: string;
    productId: string;
    interval: "weekly" | "monthly" | "yearly";
    trialDays?: number;
    metadata?: Record<string, string>;
}

export interface SubscriptionResponse extends BetterPayResponse {
    id: string;
    customerId: string;
    productId: string;
    status: SubscriptionStatus;
    interval: "weekly" | "monthly" | "yearly";
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
}
