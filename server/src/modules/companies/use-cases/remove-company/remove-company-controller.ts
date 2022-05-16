import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveCompanyUseCase } from './remove-company-use-case';

class RemoveCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeCompanyUseCase = container.resolve(RemoveCompanyUseCase);

    await removeCompanyUseCase.execute(id);

    return response.status(204).send();
  }
}

export { RemoveCompanyController };
