import { Controller } from '$interfaces/Controller';
import { userModel } from '$modules/user/user.model';
import { hashPassword } from '$utils/password.util';

import type { RegisterDto } from '$validation/schema/auth.schema';
import type { User } from '$validation/schema/user.schema';

class AuthService extends Controller {
  constructor() {
    super();
  }

  async register(dto: RegisterDto): Promise<User> {
    dto.password = await hashPassword(dto.password);
    const newUser = await userModel.create(dto);
    return newUser.toJSON() as User;
  }


  async isEmailAlreadyExists(email :string){
	const foundedUser = await userModel.findOne({where:{email}})
	return foundedUser === null ? false : true;
  }
}

export default new AuthService();
