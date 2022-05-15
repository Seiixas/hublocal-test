import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { UpdateTicketUseCase } from './update-ticket-use-case';

let updateTicketUseCase: UpdateTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;

describe('Update Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    updateTicketUseCase = new UpdateTicketUseCase(ticketsRepository);
  });

  it('should be able to update a ticket', async () => {
    const newTicket = await ticketsRepository.create({
      title: 'my-title',
      place_id: 'my-place',
      data_updated: 'data-updated',
      updated_by: 'user-uuid',
      created_by: 'user-uuid',
    });

    const ticket = await updateTicketUseCase.execute({
      id: newTicket.id,
      status: 'PENDENTE',
    });

    expect(ticket.status).toEqual('PENDENTE');
  });

  it('should not be able to update a ticket that does not exists', () => {
    expect(async () => {
      await updateTicketUseCase.execute({
        id: 'fake-ticket-id',
        status: 'PENDENTE',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
