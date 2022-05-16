import { ICreateUser } from '../../dtos/create-user';
import { UsersRepositoryInMemory } from '../../repositories/implementations/users-repository-in-memory';
import { CreateUserUseCase } from '../create-user/create-user-use-case';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUser = {
      email: 'user@test',
      password: '1234',
      name: 'User test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('auth');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fake@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('Should not be able to authenticate user with wrong password', async () => {
    expect(async () => {
      const user: ICreateUser = {
        email: 'user@test',
        password: '1234',
        name: 'User test',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '54321',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
