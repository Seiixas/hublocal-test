import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { ShowTicketUseCase } from './show-ticket-use-case';

let showTicketUseCase: ShowTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;

describe('Show Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    showTicketUseCase = new ShowTicketUseCase(ticketsRepository);
  });

  it('should be able to show a ticket', async () => {
    const newTicket = await ticketsRepository.create({
      title: 'my-title',
      place_id: 'my-place-id',
      created_by: 'created-by',
      updated_by: 'updated-by',
      data_updated: 'date-updated',
    });

    const ticket = await showTicketUseCase.execute(newTicket.id);

    expect(ticket).toEqual(newTicket);
  });

  it('should not be able to show a ticket that does not exists', () => {
    expect(async () => {
      await showTicketUseCase.execute('fake-ticket-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
