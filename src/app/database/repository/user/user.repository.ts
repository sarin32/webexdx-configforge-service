import { userModal } from '../../modals';
import {
  CreateUserParams,
  FindUserByEmailParams,
  FindUserByIdParams,
  MarkUserAsVerifiedParams,
  UserRepositoryInterface,
} from './user.repository.interface';

class UserRepository implements UserRepositoryInterface {
  private readonly modal = userModal;

  async createUser({ email, name, password, salt, roleId }: CreateUserParams) {
    const result = await this.modal.insertOne({
      email,
      name,
      password,
      salt,
      createdAt: new Date(),
      isVerified: false,
      roleId,
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }

    return {
      id: result.insertedId,
    };
  }

  async findUserByEmail({ email }: FindUserByEmailParams) {
    const result = await this.modal.findOne({
      email,
    });

    return result;
  }

  async isUserExistsWithEmail({ email }: FindUserByEmailParams) {
    const result = await this.modal.findOne(
      {
        email,
        isVerified: true,
      },
      { projection: { _id: 1 } }
    );

    return Boolean(result);
  }

  async findUserById({ id }: FindUserByIdParams) {
    const result = await this.modal.findOne(
      {
        _id: id,
      },
      { projection: { password: 0, salt: 0 } }
    );

    return result;
  }

  async markUserAsVerified({ userId, roleId }: MarkUserAsVerifiedParams) {
    const response = await this.modal.updateOne(
      { _id: userId },
      { $set: { roleId, isVerified: true } }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update user data');
    }
  }
}

export const userRepository = new UserRepository();
