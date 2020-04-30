import {User, USERS_REPOSITORY,} from "../../controllers/users/user.model";
export  class UserRepository {
  public async findUserByEmail(email: string): Promise<User> {
      const user = await USERS_REPOSITORY.findOne({ where: { email: email }}) as User;
      return user;
  }
}
