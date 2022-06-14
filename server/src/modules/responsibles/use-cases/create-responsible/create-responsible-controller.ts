import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateResponsibleUseCase } from './create-responsible-use-case';

class CreateResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
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

    const createResponsibleUseCase = container.resolve(
      CreateResponsibleUseCase
    );

    const { id } = await createResponsibleUseCase.execute({
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

    return response.status(201).json(id);
  }
}

export { CreateResponsibleController };
