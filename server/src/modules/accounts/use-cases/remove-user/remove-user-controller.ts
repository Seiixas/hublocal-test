import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveUserUseCase } from './remove-user-use-case';

class RemoveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeUserUseCase = container.resolve(RemoveUserUseCase);

    await removeUserUseCase.execute(id);

    return response.status(204).send();
  }
}

export { RemoveUserController };
