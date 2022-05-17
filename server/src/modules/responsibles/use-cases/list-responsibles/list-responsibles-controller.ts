import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListResponsiblesUseCase } from './list-responsibles-use-case';

class ListResponsiblesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listResponsibleUseCase = container.resolve(ListResponsiblesUseCase);

    const responsibles = await listResponsibleUseCase.execute();

    return response.json(responsibles);
  }
}

export { ListResponsiblesController };
