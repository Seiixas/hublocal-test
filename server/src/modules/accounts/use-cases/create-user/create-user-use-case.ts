import { hash } from 'bcrypt';

import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('This user already exists');
    }

    const hashedPassword = await hash(password, 10);

    await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    const response: IResponse = {
      name,
      email,
    };

    return response;
  }
}

export { CreateUserUseCase };
