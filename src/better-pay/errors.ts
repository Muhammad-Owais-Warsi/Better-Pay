export type BetterPayErrorCode =
    | "not_supported"
    | "invalid_config"
    | "provider_error"
    | "invalid_request"
    | "unknown";

export class BetterPayError extends Error {
    constructor(
        public code: BetterPayErrorCode,
        public provider: string,
        message: string,
        public raw?: unknown,
    ) {
        super(message);
        this.name = "BetterPayError";
    }
}
