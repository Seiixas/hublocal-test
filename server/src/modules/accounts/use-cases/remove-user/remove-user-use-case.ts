import { IUsersRepository } from '../../repositories/users-repository';

class RemoveUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('This user does not exists');
    }

    await this.usersRepository.remove(user);
  }
}

export { RemoveUserUseCase };
