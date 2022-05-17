import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowTicketUseCase } from './show-ticket-use-case';

class ShowTicketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTicketUseCase = container.resolve(ShowTicketUseCase);

    const ticket = await showTicketUseCase.execute(id);

    return response.json(ticket);
  }
}

export { ShowTicketController };
