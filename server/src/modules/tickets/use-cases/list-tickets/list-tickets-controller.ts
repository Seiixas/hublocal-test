import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTicketsUseCase } from './list-tickets-use-case';

class ListTicketsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTicketsUseCase = container.resolve(ListTicketsUseCase);

    const tickets = await listTicketsUseCase.execute();

    return response.json(tickets);
  }
}

export { ListTicketsController };
