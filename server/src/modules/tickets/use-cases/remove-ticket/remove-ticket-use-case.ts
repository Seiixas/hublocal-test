import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ITicketsRepository } from '../../repositories/tickets-repository';

@injectable()
class RemoveTicketUseCase {
  constructor(
    @inject('TicketsRepository')
    private readonly ticketsRepository: ITicketsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new NotFoundException('This ticket does not exists');
    }

    await this.ticketsRepository.remove(ticket);
  }
}

export { RemoveTicketUseCase };
