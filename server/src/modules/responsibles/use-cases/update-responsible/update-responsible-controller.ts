import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateResponsibleUseCase } from './update-responsible-use-case';

class UpdateResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    } = request.body;

    const updateResponsibleUseCase = container.resolve(
      UpdateResponsibleUseCase
    );

    await updateResponsibleUseCase.execute({
      id,
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    });

    return response.status(204).send();
  }
}

export { UpdateResponsibleController };
