import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/users-repository';

interface IResponse {
  name: string;
  email: string;
}

@injectable()
class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('This user does not exists');
    }

    return {
      name: user.name,
      email: user.email,
    };
  }
}

export { ShowUserUseCase };
