import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCompanyUseCase } from './update-company-use-case';

class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, CNPJ } = request.body;

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

    await updateCompanyUseCase.execute({ id, name, description, CNPJ });

    return response.status(204).send();
  }
}

export { UpdateCompanyController };
