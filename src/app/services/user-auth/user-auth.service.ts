import {
  GenerateLoginTokenParams,
  SignInParams,
  SignupParams,
  SignupResult,
  UserAuthServiceInterface,
} from './user-auth.service.interface';
import { NON_VERIFIED_USER_ROLE_ID } from '../../config';
import { LOGIN_TOKEN_LIFETIME } from '../../config/config';
import { userRepository } from '../../database';
import { AuthorizationError, ConflictError } from '../../errors';
import { objectId } from '../../utils/data-type-util';
import {
  generatePassword,
  generateSalt,
  validatePassword,
} from '../../utils/password-util';
import { generateSignature } from '../../utils/token-util';

class UserAuthService implements UserAuthServiceInterface {
  private readonly repository = userRepository;

  async signup({ email, name, password }: SignupParams): Promise<SignupResult> {
    const salt = await generateSalt();
    password = await generatePassword(password, salt);

    const isUserExists = await this.repository.isUserExistsWithEmail({ email });
    if (isUserExists)
      throw new ConflictError('An account with this email id already exists');

    const roleId = objectId(NON_VERIFIED_USER_ROLE_ID);

    const { id } = await this.repository.createUser({
      email,
      name,
      password,
      salt,
      roleId: roleId,
    });

    return {
      userId: id,
      token: await this.generateLoginToken({
        roleId,
        userId: id,
      }),
    };
  }

  async signIn({ email, password }: SignInParams) {
    const user = await this.repository.findUserByEmail({ email });
    if (!user) throw new AuthorizationError('Invalid Credenials');

    const isValidPassword = await validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isValidPassword) throw new AuthorizationError('Invalid Credenials');

    return {
      userId: user._id,
      token: await this.generateLoginToken({
        roleId: user.roleId,
        userId: user._id,
      }),
    };
  }

  async generateLoginToken({
    roleId,
    userId,
  }: GenerateLoginTokenParams): Promise<string> {
    const payload = {
      userId,
      roleId,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);
    return `Bearer ${token}`;
  }
}

export const userAuthService = new UserAuthService();
