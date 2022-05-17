import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { CreatePlaceUseCase } from './create-place-use-case';

let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let createPlaceUseCase: CreatePlaceUseCase;

describe('Create Place Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();

    createPlaceUseCase = new CreatePlaceUseCase(
      placesRepository,
      companiesRepository
    );
  });

  it('should be to create a new place', async () => {
    const company = {
      name: 'my-company',
      CNPJ: 'my-cnpj',
      description: 'my-description',
    };

    const companyCreated = await companiesRepository.create(company);

    const place = {
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: companyCreated.id,
    };

    const placeCreated = await createPlaceUseCase.execute(place);

    expect(placeCreated).toHaveProperty('id');
    expect(placeCreated.company).toEqual(companyCreated);
  });

  it('should not be able to create a place to a company that does not exists', () => {
    expect(async () => {
      await createPlaceUseCase.execute({
        name: 'my-place',
        public_place: 'my-public-place',
        complement: 'my-complement',
        district: 'my-district',
        city: 'my-city',
        state: 'my-state',
        cep: 'my-cep',
        number: 'my-number',
        company_id: 'company-fake-id',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
