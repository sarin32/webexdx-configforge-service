import type { ObjectId } from 'mongodb';
import type { TokenSchema } from '../../modals/token.modal.interface';

export interface CreateTokenParams {
  expiresOn: Date;
  name: string;
  token: string;
  userId?: ObjectId;
  environmentId: ObjectId;
}

export interface TokenRepositoryInterface {
  createToken(params: CreateTokenParams): Promise<{ projectId: ObjectId }>;

  revokeToken(tokenId: ObjectId): Promise<void>;

  isValidToken(token: string): Promise<boolean>;

  getToken(tokenId: ObjectId): Promise<TokenSchema>;

  getEnvironmentTokens(environmentId: ObjectId): Promise<TokenSchema[]>;

  getUserTokens(userId: ObjectId): Promise<TokenSchema[]>;

  updateToken(tokenId: ObjectId, update: Partial<TokenSchema>): Promise<void>;

  deleteToken(tokenId: ObjectId): Promise<void>;

  getActiveTokens(environmentId: ObjectId): Promise<TokenSchema[]>;
}
