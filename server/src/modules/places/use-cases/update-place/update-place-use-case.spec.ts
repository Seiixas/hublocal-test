import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { UpdatePlaceUseCase } from './update-place-use-case';

let updatePlaceUseCase: UpdatePlaceUseCase;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Update Place Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    updatePlaceUseCase = new UpdatePlaceUseCase(placesRepository);
  });

  it('should be able to update a place', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      CNPJ: 'my-cnpj',
      description: 'my-description',
    });

    const place = await placesRepository.create({
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

    const placeUpdated = await updatePlaceUseCase.execute({
      id: place.id,
      name: 'my-new-name',
      state: 'my-new-state',
    });

    expect(placeUpdated.name).toEqual('my-new-name');
    expect(placeUpdated.state).toEqual('my-new-state');
  });

  it('should not be able to update a place that does not exists', () => {
    expect(async () => {
      await updatePlaceUseCase.execute({
        id: 'fake-id',
        name: 'my-new-name',
        state: 'my-new-state',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
