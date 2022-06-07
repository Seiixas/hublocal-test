import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './create-company-use-case';

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, CNPJ } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const { id } = await createCompanyUseCase.execute({ name, description, CNPJ });

    return response.status(201).json({id});
  }
}

export { CreateCompanyController };
