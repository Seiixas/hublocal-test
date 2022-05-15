import { ITicketsRepository } from '../../repositories/tickets-repository';

class RemoveTicketUseCase {
  constructor(private readonly ticketsRepository: ITicketsRepository) {}

  async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error('This ticket does not exists');
    }

    await this.ticketsRepository.remove(ticket);
  }
}

export { RemoveTicketUseCase };
