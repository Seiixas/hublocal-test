import { UsersRepositoryInMemory } from '../../repositories/implementations/users-repository-in-memory';
import { ShowUserUseCase } from './show-user-use-case';

let usersRepository: UsersRepositoryInMemory;
let showUserUseCase: ShowUserUseCase;

describe('Show Responsible Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    showUserUseCase = new ShowUserUseCase(usersRepository);
  });

  it('should be able to show a user', async () => {
    const userCreated = await usersRepository.create({
      name: 'my-name',
      email: 'my-mail',
      password: 'my-password',
    });

    const user = await showUserUseCase.execute(userCreated.id);

    expect(user).toEqual({
      email: userCreated.email,
      name: userCreated.name,
    });
  });

  it('should not be able to show a responsible that does not exists', () => {
    expect(async () => {
      await showUserUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
