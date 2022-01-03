import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailIsUsed = this.usersRepository.findByEmail(email);

    if (emailIsUsed) throw new Error("Email is already used");

    const user = this.usersRepository.create({ email, name });

    if (!user) throw new Error("User not found");

    return user;
  }
}

export { CreateUserUseCase };
