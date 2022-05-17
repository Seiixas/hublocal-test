import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { expiresIn, secret } from '../../../../config/auth';
import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  auth: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const emailMatches = await this.usersRepository.findByEmail(email);

    if (!emailMatches) {
      throw new Error('Email or password incorrect');
    }

    const user = emailMatches;

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Email or password incorrect');
    }

    const auth = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const response: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      auth,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
