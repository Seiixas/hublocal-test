import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { CreateResponsibleUseCase } from './create-responsible-use-case';

let createResponsibleUseCase: CreateResponsibleUseCase;
let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Create Responsible Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    createResponsibleUseCase = new CreateResponsibleUseCase(
      responsiblesRepository,
      companiesRepository
    );
  });

  it('should be able to create a new responsible', async () => {
    const company = await companiesRepository.create({
      name: 'my-name',
      description: 'my-description',
      CNPJ: 'my-cnpj',
    });

    const responsible = await createResponsibleUseCase.execute({
      name: 'my-responsible-name',
      phone_number: 'my-phone-number',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: company.id,
    });

    expect(responsible).toHaveProperty('id');
    expect(responsible.company).toEqual(company);
  });

  it('should not be able to create a responsible for a company that does not exists', () => {
    expect(async () => {
      await createResponsibleUseCase.execute({
        name: 'my-place',
        phone_number: '',
        public_place: 'my-public-place',
        complement: 'my-complement',
        district: 'my-district',
        city: 'my-city',
        state: 'my-state',
        cep: 'my-cep',
        number: 'my-number',
        company_id: 'fake-company-id',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
