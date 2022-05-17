import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { ShowPlaceUseCase } from './show-place-use-case';

let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let showPlaceUseCase: ShowPlaceUseCase;

describe('Show Place Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    showPlaceUseCase = new ShowPlaceUseCase(placesRepository);
  });

  it('should be able to show a place', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      CNPJ: 'my-cnpj',
      description: 'my-description',
    });

    const newPlace = await placesRepository.create({
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company,
    });

    const place = await showPlaceUseCase.execute(newPlace.id);

    expect(place).toEqual(newPlace);
  });

  it('should not be able to show a place that does not exists', () => {
    expect(async () => {
      await showPlaceUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
