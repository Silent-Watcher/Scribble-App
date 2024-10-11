import { hashPassword, verifyPassword } from '$app/common/utils/password.util';
import { Controller } from '$interfaces/Controller';
import { userModel } from '$modules/user/user.model';

// import { hashPassword, verifyPassword } from '$utils/password.util';
import { authMessages } from './auth.messages';

import type { LoginDto, RegisterDto } from '$validation/schema/auth.schema';
import type { User } from '$validation/schema/user.schema';
class AuthService extends Controller {
  constructor() {
    super();
  }

  async register(dto: RegisterDto): Promise<User> {
    dto.password = await hashPassword(dto.password);

    // send email verification code !

    const newUser = await userModel.create(
      {
        email: dto.email,
        password: dto.password,
      },
      { fields: ['email', 'password'] },
    );

    return newUser.toJSON() as User;
  }

  async login(dto: LoginDto) {
    const foundedUser = await this.isEmailAlreadyExists(dto.email);
    if (!foundedUser) {
      throw {
        status: 400,
        code: 'BAD REQUEST',
        message: authMessages.invalidCredentials,
      };
    }

    const isPasswordValid = await this.checkIfThePasswordIsCorrect(
      dto.password,
      (foundedUser as unknown as User).password,
    );
    if (!isPasswordValid) {
      throw {
        status: 400,
        message: authMessages.invalidCredentials,
      };
    }
  }

  async isEmailAlreadyExists(email: string) {
    const foundedUser = await userModel.findOne({ where: { email } });
    return foundedUser === null ? false : foundedUser;
  }

  async checkIfThePasswordIsCorrect(password: string, hash: string) {
    return await verifyPassword(hash, password);
  }
}

export default new AuthService();
