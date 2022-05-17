import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveTicketUseCase } from './remove-ticket-use-case';

class RemoveTicketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const removeTicketUseCase = container.resolve(RemoveTicketUseCase);

    await removeTicketUseCase.execute(id);

    return response.status(204).send();
  }
}

export { RemoveTicketController };
