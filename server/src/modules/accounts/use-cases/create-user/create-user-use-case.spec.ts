import { UsersRepositoryInMemory } from '../../repositories/implementations/users-repository-in-memory';
import { CreateUserUseCase } from './create-user-use-case';

let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Mateus',
      email: 'mateus@test.com',
      password: '123',
    });

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user.name).toEqual('Mateus');
    expect(user.email).toEqual('mateus@test.com');
  });

  it('should not be able to create a user with a email that are already in use', () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Mateus',
        email: 'same-email@test.com',
        password: '123',
      });

      await createUserUseCase.execute({
        name: 'Gustavo',
        email: 'same-email@test.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
