import { Ticket } from '../../entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

interface IRequest {
  id: string;
  title?: string;
  status?: 'PROGRESSO' | 'PENDENTE' | 'CONCLUÍDO';
  data_updated?: string;
}

class UpdateTicketUseCase {
  constructor(private readonly ticketsRepository: ITicketsRepository) {}

  async execute(data: IRequest): Promise<Ticket> {
    const { id, title, status, data_updated } = data;

    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error('This ticket does not exists');
    }

    ticket.title = title ?? ticket.title;
    ticket.status = status ?? ticket.status;
    ticket.data_updated = data_updated ?? ticket.data_updated;

    await this.ticketsRepository.create(ticket);

    return ticket;
  }
}

export { UpdateTicketUseCase };
