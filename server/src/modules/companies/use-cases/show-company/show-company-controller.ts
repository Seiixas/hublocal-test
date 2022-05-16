import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowCompanyUseCase } from './show-company-use-case';

class ShowCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCompanyUseCase = container.resolve(ShowCompanyUseCase);

    const company = await showCompanyUseCase.execute(id);

    return response.json(company);
  }
}

export { ShowCompanyController };
