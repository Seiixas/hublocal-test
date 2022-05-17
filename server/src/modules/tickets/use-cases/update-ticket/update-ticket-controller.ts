import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateTicketUseCase } from './update-ticket-use-case';

class UpdateTicketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { status } = request.body;

    const updateTicketUseCase = container.resolve(UpdateTicketUseCase);

    await updateTicketUseCase.execute({
      id,
      status,
    });

    return response.status(204).send();
  }
}

export { UpdateTicketController };
