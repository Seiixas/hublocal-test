import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { RemoveTicketUseCase } from './remove-ticket-use-case';

let removeTicketUseCase: RemoveTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;

describe('Remove Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    removeTicketUseCase = new RemoveTicketUseCase(ticketsRepository);
  });

  it('should be able to remove a ticket', async () => {
    const ticket = await ticketsRepository.create({
      title: 'my-ticket',
      place_id: 'my-place-id',
      data_updated: 'data-updated',
      created_by: 'user-uuid',
      updated_by: 'user-uuid',
    });

    await removeTicketUseCase.execute(ticket.id);

    const tickets = await ticketsRepository.listAll();

    expect(tickets).toHaveLength(0);
  });

  it('should not be able to remove a ticket that does not exists', () => {
    expect(async () => {
      await removeTicketUseCase.execute('fake-ticket-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
