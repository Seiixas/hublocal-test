import { ICreateUser } from '../../dtos/create-user';
import { User } from '../../infra/entities/user';
import { IUsersRepository } from '../users-repository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUser): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async remove(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (userToRemove) => userToRemove.id === user.id
    );

    this.users.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

export { UsersRepositoryInMemory };
