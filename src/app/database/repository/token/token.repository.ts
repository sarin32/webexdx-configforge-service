import { ObjectId } from '@i/common.interface';
import { tokenModal } from '../../modals';
import { TokenSchema } from '../../modals/token.modal.interface';
import {
  CreateTokenParams,
  TokenRepositoryInterface,
} from './token.repository.interface';

class TokenRepository implements TokenRepositoryInterface {
  private modal = tokenModal;

  async createToken({
    expiresOn,
    name,
    token,
    userId,
    environmentId,
  }: CreateTokenParams) {
    const insertObject: TokenSchema = {
      createdAt: new Date(),
      expiresOn: expiresOn,
      isActive: true,
      name,
      token,
      environmentId,
    };
    if (userId) {
      insertObject.userId = userId;
    }
    const response = await this.modal.insertOne(insertObject);

    if (!response.acknowledged) {
      throw new Error('Failed to insert token data');
    }

    return { projectId: response.insertedId };
  }

  async revokeToken(tokenId: ObjectId) {
    const response = await this.modal.updateOne(
      { _id: tokenId },
      { $set: { isActive: false } }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Could not update token details');
    }
  }

  async isValidToken(token: string) {
    const tokenData = await this.modal.findOne(
      {
        token,
        isActive: true,
        expiresOn: { $gt: new Date() },
      },
      { projection: { _id: 1 } }
    );

    return tokenData ? true : false;
  }

  async getToken(tokenId: ObjectId) {
    const token = await this.modal.findOne({ _id: tokenId });
    if (!token) {
      throw new Error('Token not found');
    }
    return token;
  }

  async getEnvironmentTokens(environmentId: ObjectId) {
    return await this.modal.find({ environmentId }).toArray();
  }

  async getUserTokens(userId: ObjectId) {
    return await this.modal.find({ userId }).toArray();
  }

  async updateToken(tokenId: ObjectId, update: Partial<TokenSchema>) {
    const response = await this.modal.updateOne(
      { _id: tokenId },
      { $set: update }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Could not update token details');
    }
  }

  async deleteToken(tokenId: ObjectId) {
    const response = await this.modal.deleteOne({ _id: tokenId });

    if (!response.acknowledged || response.deletedCount !== 1) {
      throw new Error('Could not delete token');
    }
  }

  async getActiveTokens(environmentId: ObjectId) {
    return await this.modal
      .find({
        environmentId,
        isActive: true,
        expiresOn: { $gt: new Date() },
      })
      .toArray();
  }
}

export const tokenRepository = new TokenRepository();
