import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './update-user-use-case';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, password, name } = request.body;

    const createUserUseCase = container.resolve(UpdateUserUseCase);

    await createUserUseCase.execute({ id, email, password, name });

    return response.status(204).send();
  }
}

export { UpdateUserController };
