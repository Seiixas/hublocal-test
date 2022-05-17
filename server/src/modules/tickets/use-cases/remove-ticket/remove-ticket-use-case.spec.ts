import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../../places/repositories/implementations/places-repository-in-memory';
import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { RemoveTicketUseCase } from './remove-ticket-use-case';

let removeTicketUseCase: RemoveTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Remove Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    removeTicketUseCase = new RemoveTicketUseCase(ticketsRepository);
  });

  it('should be able to remove a ticket', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-CNPJ',
    });

    const place = await placesRepository.create({
      name: 'my-place',
      public_place: 'public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: '1',
      company,
    });

    const ticket = await ticketsRepository.create({
      title: 'my-ticket',
      place,
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
