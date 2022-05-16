import { hash } from 'bcrypt';

import { UsersRepositoryInMemory } from '../../repositories/implementations/users-repository-in-memory';
import { UpdateUserUseCase } from './update-user-use-case';

let updateUserUseCase: UpdateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update a user', async () => {
    const user = await usersRepository.create({
      name: 'Mateus',
      email: 'myemail@mail.com',
      password: await hash('test', 10),
    });

    const updatedUser = await updateUserUseCase.execute({
      id: user.id,
      name: 'Gustavo',
    });

    expect(updatedUser.name).toEqual('Gustavo');
    expect(updatedUser.email).toEqual(user.email);
  });

  it('should not be able to update a user that does not exists', () => {
    expect(async () => {
      await updateUserUseCase.execute({
        id: 'fake-user-id',
        name: 'Gustavo',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a user email to one that already are in use', async () => {
    expect(async () => {
      const firstUser = await usersRepository.create({
        name: 'Mateus',
        email: 'frist@mail.com',
        password: await hash('test', 10),
      });

      const secondUser = await usersRepository.create({
        name: 'Gustavo',
        email: 'second@mail.com',
        password: await hash('other', 10),
      });

      await updateUserUseCase.execute({
        id: secondUser.id,
        email: firstUser.email,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
