import { ObjectId } from '@i/common.interface';
import { tokenRepository } from '../../database';

class TokenService {
  private readonly repository = tokenRepository;

  async authenticateToken({ token }: { token: string }) {
    return await this.repository.isValidToken(token);
  }

  async revokeToken({ tokenId }: { tokenId: ObjectId }) {
    return await this.repository.revokeToken(tokenId);
  }
}

export const variableService = new TokenService();
