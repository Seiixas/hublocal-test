import { ICreateUser } from '../dtos/create-user';
import { User } from '../entities/user';

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;

  remove(user: User): Promise<void>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
