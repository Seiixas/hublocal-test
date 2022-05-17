import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ id, name, email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('This user does not exists');
    }

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new Error('This email is already in use');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password) {
      user.password = await hash(password, 10);
    }

    await this.usersRepository.create(user);

    const response: IResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response;
  }
}

export { UpdateUserUseCase };
