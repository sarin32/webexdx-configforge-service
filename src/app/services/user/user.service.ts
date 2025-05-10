import { userRepository } from '../../database';
import { VERIFIED_USER_ROLE_ID } from '../../config';
import { ObjectId } from '@i/common.interface';
import { objectId } from '../../utils/data-type-util';

type getUserInfoParams = {
  userId: ObjectId;
};

class UserService {
  private readonly repository = userRepository;

  async getUserInfo({ userId }: getUserInfoParams) {
    const user = await this.repository.findUserById({ id: userId });

    if (!user) throw new Error('Invalid user id');

    return user;
  }

  async markUserAsVerified({ userId }: { userId: ObjectId }) {
    await this.repository.markUserAsVerified({
      userId,
      roleId: objectId(VERIFIED_USER_ROLE_ID),
    });
  }
}

export const userService = new UserService();
