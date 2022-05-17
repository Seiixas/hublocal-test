import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SetResponsibleMainUseCase } from './set-responsible-main-use-case';

class SetResponsibleMainController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company_id } = request.body;

    const setResponsibleMainUseCase = container.resolve(
      SetResponsibleMainUseCase
    );

    await setResponsibleMainUseCase.execute({
      responsible_id: id,
      company_id,
    });

    return response.status(204).send();
  }
}

export { SetResponsibleMainController };
