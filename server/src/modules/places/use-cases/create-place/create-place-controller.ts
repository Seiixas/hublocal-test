import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePlaceUseCase } from './create-place-use-case';

class CreatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    } = request.body;

    const createPlaceUseCase = container.resolve(CreatePlaceUseCase);

    await createPlaceUseCase.execute({
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    });

    return response.status(201).send();
  }
}

export { CreatePlaceController };
