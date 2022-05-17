import { Repository } from 'typeorm';

import { dataSource } from '../../../../shared/infra/typeorm/datasource';
import { ICreateUser } from '../../dtos/create-user';
import { IUsersRepository } from '../../repositories/users-repository';
import { User } from '../entities/user';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({ id, name, email, password }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async remove(user: User): Promise<void> {
    await this.repository.remove(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }
}

export { UsersRepository };
