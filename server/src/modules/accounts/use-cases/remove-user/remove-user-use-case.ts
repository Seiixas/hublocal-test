import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { IUsersRepository } from '../../repositories/users-repository';

@injectable()
class RemoveUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('This user does not exists');
    }

    await this.usersRepository.remove(user);
  }
}

export { RemoveUserUseCase };
