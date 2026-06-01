import { BetterPayResponse } from "./base";

export interface Product {
    name: string;
    amount: number;
    currency: string;
    description?: string;
    metadata?: Record<string, string>;
}

export interface ProductResponse extends BetterPayResponse {
    id: string;
    name: string;
    amount: number;
    currency: string;
}
