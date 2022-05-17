import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserUseCase } from './show-user-use-case';

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserUseCase = container.resolve(ShowUserUseCase);

    const user = await showUserUseCase.execute(id);

    return response.send(user);
  }
}

export { ShowUserController };
