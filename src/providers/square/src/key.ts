import { randomUUID } from 'crypto';

export function createIdempotentKey() {
  const idempotentKey = randomUUID();
  
  return idempotentKey;
}