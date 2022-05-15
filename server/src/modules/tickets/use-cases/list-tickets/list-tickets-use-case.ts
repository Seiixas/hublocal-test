import { Ticket } from '../../entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

class ListTicketsUseCase {
  constructor(private readonly ticketsRepository: ITicketsRepository) {}

  async execute(): Promise<Ticket[]> {
    const tickets = await this.ticketsRepository.listAll();

    return tickets;
  }
}

export { ListTicketsUseCase };
