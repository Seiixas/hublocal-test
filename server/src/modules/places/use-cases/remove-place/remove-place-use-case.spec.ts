import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { RemovePlaceUseCase } from './remove-place-use-case';

let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let removePlaceUseCase: RemovePlaceUseCase;

describe('Remove Place Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    removePlaceUseCase = new RemovePlaceUseCase(placesRepository);
  });

  it('should be able to remove a place', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      CNPJ: 'my-cnpj',
      description: 'my-description',
    });

    const place = {
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: company.id,
      company,
    };

    const placeCreated = await placesRepository.create(place);

    await removePlaceUseCase.execute(placeCreated.id);

    const places = await placesRepository.listAll();

    expect(places).toHaveLength(0);
  });

  it('should not be able to remove a place that does not exists', () => {
    expect(async () => {
      await removePlaceUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
