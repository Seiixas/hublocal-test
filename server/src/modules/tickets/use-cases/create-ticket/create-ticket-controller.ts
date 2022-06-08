import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTicketUseCase } from './create-ticket-use-case';

class CreateTicketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      place_id,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      created_by,
      updated_by,
      data_updated
    } = request.body;

    const createTicketUseCase = container.resolve(CreateTicketUseCase);

    await createTicketUseCase.execute({
      place_id,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      created_by,
      updated_by,
      data_updated
    });

    return response.status(201).send();
  }
}

export { CreateTicketController };
