import { UsersRepositoryInMemory } from '../../repositories/implementations/users-repository-in-memory';
import { RemoveUserUseCase } from './remove-user-use-case';

let usersRepository: UsersRepositoryInMemory;
let removeUserUseCase: RemoveUserUseCase;

describe('Remove User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    removeUserUseCase = new RemoveUserUseCase(usersRepository);
  });

  it('should be able to remove a user', () => {
    expect(async () => {
      const user = await usersRepository.create({
        name: 'user',
        email: 'user@mail.com',
        password: 'user123',
      });

      await removeUserUseCase.execute(user.id);

      await usersRepository.findById(user.id);
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to remove a user that does not exists', () => {
    expect(async () => {
      await removeUserUseCase.execute('fake-user-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
