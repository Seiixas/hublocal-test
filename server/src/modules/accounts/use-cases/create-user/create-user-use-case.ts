import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ConflictException } from '../../../../shared/errors/ConflictException';
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

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException('This user already exists');
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
