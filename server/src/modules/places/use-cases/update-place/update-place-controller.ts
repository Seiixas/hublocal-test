import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePlaceUseCase } from './update-place-use-case';

class UpdatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id
    } = request.body;

    const updatePlaceUseCase = container.resolve(UpdatePlaceUseCase);

    await updatePlaceUseCase.execute({
      id,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      company_id,
      number,
    });

    return response.status(204).send();
  }
}

export { UpdatePlaceController };
