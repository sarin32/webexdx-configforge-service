import { ObjectId } from 'mongodb';

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
}
