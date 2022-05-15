import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { ListResponsiblesUseCase } from './list-responsibles-use-case';

let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let listResponsibleUseCase: ListResponsiblesUseCase;

describe('List Responsibles Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    listResponsibleUseCase = new ListResponsiblesUseCase(
      responsiblesRepository
    );
  });

  it('should be able to list all responsibles', async () => {
    const company = await companiesRepository.create({
      name: 'my-name',
      description: 'my-description',
      CNPJ: 'my-cnpj',
    });

    const responsible = await responsiblesRepository.create({
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

    const responsibles = await listResponsibleUseCase.execute();

    expect(responsibles).toEqual([responsible]);
  });
});
