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
}

export const tokenRepository = new TokenRepository();
