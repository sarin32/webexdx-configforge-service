import { ObjectId } from 'mongodb';
import { tokenRepository } from '../../database';
import { generateToken } from '../../utils/token';

class TokenService {
  private readonly repository = tokenRepository;

  async authenticateToken({ token }: { token: string }) {
    return await this.repository.isValidToken(token);
  }

  async revokeToken({ tokenId }: { tokenId: ObjectId }) {
    return await this.repository.revokeToken(tokenId);
  }


  async hasReadAccessToToken({
    tokenId,
    userId,
  }: {
    tokenId: ObjectId;
    userId: string;
  }) {
    // TODO: Implement token access control
    return true;
  }

  async hasUpdateAccessToToken({
    tokenId,
    userId,
  }: {
    tokenId: ObjectId;
    userId: string;
  }) {
    // TODO: Implement token access control
    return true;
  }

  async hasDeleteAccessToToken({
    tokenId,
    userId,
  }: {
    tokenId: ObjectId;
    userId: string;
  }) {
    // TODO: Implement token access control
    return true;
  }

  private maskToken(token: string): string {
    if (token.length <= 8) return '****';
    return `${token.substring(0, 4)}...${token.substring(token.length - 4)}`;
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

    await this.repository.createToken({
      name,
      token,
      environmentId,
      userId: new ObjectId(userId),
      expiresOn,
    });

    return { token }; // Return the full token only once
  }

  async getToken({ userId, tokenId }: { userId: string; tokenId: ObjectId }) {
    const tokenData = await this.repository.getToken(tokenId);
    if (tokenData) {
      tokenData.token = this.maskToken(tokenData.token);
    }
    return tokenData;
  }

  async getEnvironmentTokens({
    userId,
    environmentId,
  }: {
    userId: string;
    environmentId: ObjectId;
  }) {
    const tokens = await this.repository.getEnvironmentTokens(environmentId);
    return tokens.map(t => ({
      ...t,
      token: this.maskToken(t.token),
    }));
  }

  async getUserTokens({
    userId,
    targetUserId,
  }: {
    userId: string;
    targetUserId: ObjectId;
  }) {
    const tokens = await this.repository.getUserTokens(targetUserId);
    return tokens.map(t => ({
      ...t,
      token: this.maskToken(t.token),
    }));
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

  async deleteToken({
    userId,
    tokenId,
  }: {
    userId: string;
    tokenId: ObjectId;
  }) {
    await this.repository.deleteToken(tokenId);
  }

  async deactivateToken({
    userId,
    tokenId,
  }: {
    userId: string;
    tokenId: ObjectId;
  }) {
    return await this.repository.revokeToken(tokenId);
  }

  async getActiveTokens({
    userId,
    environmentId,
  }: {
    userId: string;
    environmentId: ObjectId;
  }) {
    const tokens = await this.repository.getActiveTokens(environmentId);
    return tokens.map(t => ({
      ...t,
      token: this.maskToken(t.token),
    }));
  }
}

export const tokenService = new TokenService();
