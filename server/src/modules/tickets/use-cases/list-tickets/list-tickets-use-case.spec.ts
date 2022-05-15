import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { ListTicketsUseCase } from './list-tickets-use-case';

let ticketsRepository: TicketsRepositoryInMemory;
let listTicketsUseCase: ListTicketsUseCase;

describe('List Tickets Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    listTicketsUseCase = new ListTicketsUseCase(ticketsRepository);
  });

  it('should be able to list all tickets', async () => {
    const ticket = await ticketsRepository.create({
      title: 'ticket-title',
      place_id: 'place-id',
      created_by: 'user-uuid',
      updated_by: 'user-uuid',
      data_updated: 'Place changed',
    });

    const tickets = await listTicketsUseCase.execute();

    expect(tickets).toEqual([ticket]);
  });
});
