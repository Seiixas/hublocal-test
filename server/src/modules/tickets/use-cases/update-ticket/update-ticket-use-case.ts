import { inject, injectable } from 'tsyringe';

import { Ticket } from '../../infra/entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

interface IRequest {
  id: string;
  status?: string;
}

@injectable()
class UpdateTicketUseCase {
  constructor(
    @inject('TicketsRepository')
    private readonly ticketsRepository: ITicketsRepository
  ) {}

  async execute({ id, status }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error('This ticket does not exists');
    }

    ticket.status = status ?? ticket.status;

    await this.ticketsRepository.create(ticket);

    return ticket;
  }
}

export { UpdateTicketUseCase };
