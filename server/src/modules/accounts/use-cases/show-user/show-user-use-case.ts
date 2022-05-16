import { IUsersRepository } from '../../repositories/users-repository';

interface IResponse {
  name: string;
  email: string;
}

class ShowUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

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
