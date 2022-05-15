import { Ticket } from '../../entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

class ShowTicketUseCase {
  constructor(private readonly ticketsRepository: ITicketsRepository) {}

  async execute(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error('This ticket does not exists');
    }

    return ticket;
  }
}

export { ShowTicketUseCase };
