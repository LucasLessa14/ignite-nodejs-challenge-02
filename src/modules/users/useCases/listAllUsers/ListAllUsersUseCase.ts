import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAuth = this.usersRepository.findById(user_id);

    if (!userAuth) throw new Error("User not found");

    if (userAuth.admin === false) throw new Error("User not admin");

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
