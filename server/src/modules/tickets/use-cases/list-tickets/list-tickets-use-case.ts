import { inject, injectable } from 'tsyringe';

import { Ticket } from '../../infra/entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

@injectable()
class ListTicketsUseCase {
  constructor(
    @inject('TicketsRepository')
    private readonly ticketsRepository: ITicketsRepository
  ) {}

  async execute(): Promise<Ticket[]> {
    const tickets = await this.ticketsRepository.listAll();

    return tickets;
  }
}

export { ListTicketsUseCase };
