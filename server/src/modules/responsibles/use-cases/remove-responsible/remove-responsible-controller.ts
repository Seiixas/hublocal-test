import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveResponsibleUseCase } from './remove-responsible-use-case';

class RemoveResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeResponsibleUseCase = container.resolve(
      RemoveResponsibleUseCase
    );

    await removeResponsibleUseCase.execute(id);

    return response.status(204).send();
  }
}

export { RemoveResponsibleController };
