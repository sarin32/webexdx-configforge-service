import * as crypto from 'crypto';

export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
