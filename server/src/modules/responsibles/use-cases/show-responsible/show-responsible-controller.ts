import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowResponsibleUseCase } from './show-responsible-use-case';

class ShowResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showResponsibleUseCase = container.resolve(ShowResponsibleUseCase);

    const responsible = await showResponsibleUseCase.execute(id);

    return response.json(responsible);
  }
}

export { ShowResponsibleController };
