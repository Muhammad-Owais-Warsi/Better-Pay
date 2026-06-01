import { BetterPayResponse } from "./base";

export interface Customer {
    name?: string;
    email: string;
    phone?: string;
    metadata?: Record<string, string>;
}

export interface CustomerResponse extends BetterPayResponse {
    id: string;
    name?: string;
    email: string;
    phone?: string;
}
