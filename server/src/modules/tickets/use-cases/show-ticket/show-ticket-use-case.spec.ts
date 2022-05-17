import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../../places/repositories/implementations/places-repository-in-memory';
import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { ShowTicketUseCase } from './show-ticket-use-case';

let showTicketUseCase: ShowTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Show Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    showTicketUseCase = new ShowTicketUseCase(ticketsRepository);
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
  });

  it('should be able to show a ticket', async () => {
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

    const newTicket = await ticketsRepository.create({
      title: 'my-title',
      place,
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
