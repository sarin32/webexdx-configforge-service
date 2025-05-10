import { ObjectId } from 'mongodb';
import { tokenRepository } from '../../database';
import { BadRequestError } from '../../errors';
import { generateToken } from '../../utils/token';

class TokenService {
  private readonly repository = tokenRepository;

  async authenticateToken({ token }: { token: string }) {
    return await this.repository.isValidToken(token);
  }

  async revokeToken({ tokenId }: { tokenId: ObjectId }) {
    return await this.repository.revokeToken(tokenId);
  }

  async hasAccessToCreateToken({ roleId }: { roleId: string }) {
    // TODO: Implement role-based access control
    return true;
  }

  async hasAccessToReadToken({ roleId }: { roleId: string }) {
    // TODO: Implement role-based access control
    return true;
  }

  async hasAccessToUpdateToken({ roleId }: { roleId: string }) {
    // TODO: Implement role-based access control
    return true;
  }

  async hasAccessToDeleteToken({ roleId }: { roleId: string }) {
    // TODO: Implement role-based access control
    return true;
  }

  async hasReadAccessToToken({ tokenId, userId }: { tokenId: ObjectId; userId: string }) {
    // TODO: Implement token access control
    return true;
  }

  async hasUpdateAccessToToken({ tokenId, userId }: { tokenId: ObjectId; userId: string }) {
    // TODO: Implement token access control
    return true;
  }

  async hasDeleteAccessToToken({ tokenId, userId }: { tokenId: ObjectId; userId: string }) {
    // TODO: Implement token access control
    return true;
  }

  async createToken({
    userId,
    name,
    environmentId,
    expiresInDays,
  }: {
    userId: string;
    name: string;
    environmentId: ObjectId;
    expiresInDays?: number;
  }) {
    const token = generateToken();
    const expiresOn = new Date();
    expiresOn.setDate(expiresOn.getDate() + (expiresInDays || 30));

    return await this.repository.createToken({
      name,
      token,
      environmentId,
      userId: new ObjectId(userId),
      expiresOn,
    });
  }

  async getToken({ userId, tokenId }: { userId: string; tokenId: ObjectId }) {
    return await this.repository.getToken(tokenId);
  }

  async getEnvironmentTokens({ userId, environmentId }: { userId: string; environmentId: ObjectId }) {
    return await this.repository.getEnvironmentTokens(environmentId);
  }

  async getUserTokens({ userId, targetUserId }: { userId: string; targetUserId: ObjectId }) {
    return await this.repository.getUserTokens(targetUserId);
  }

  async updateToken({
    userId,
    tokenId,
    name,
    isActive,
    expiresInDays,
  }: {
    userId: string;
    tokenId: ObjectId;
    name?: string;
    isActive?: boolean;
    expiresInDays?: number;
  }) {
    const update: any = {};
    if (name) update.name = name;
    if (typeof isActive === 'boolean') update.isActive = isActive;
    if (expiresInDays) {
      const expiresOn = new Date();
      expiresOn.setDate(expiresOn.getDate() + expiresInDays);
      update.expiresOn = expiresOn;
    }

    await this.repository.updateToken(tokenId, update);
  }

  async deleteToken({ userId, tokenId }: { userId: string; tokenId: ObjectId }) {
    await this.repository.deleteToken(tokenId);
  }

  async deactivateToken({ userId, tokenId }: { userId: string; tokenId: ObjectId }) {
    return await this.repository.revokeToken(tokenId);
  }

  async getActiveTokens({ userId, environmentId }: { userId: string; environmentId: ObjectId }) {
    return await this.repository.getActiveTokens(environmentId);
  }
}

export const tokenService = new TokenService();
