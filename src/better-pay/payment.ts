import { BetterPayResponse, PaymentStatus } from "./base";
import { Customer } from "./customer";
import { Product } from "./product";

export interface Payment {
    amount: number;
    currency: string;
    customer?: Customer;
    products?: Product[];
    returnUrl: string;
    metadata?: Record<string, string>;
}

export interface PaymentResponse extends BetterPayResponse {
    id: string;
    status: PaymentStatus;
    amount: number;
    currency: string;
    checkoutUrl: string;
}
