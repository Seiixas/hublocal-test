import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { ShowResponsibleUseCase } from './show-responsible-use-case';

let showResponsibleUseCase: ShowResponsibleUseCase;
let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Show Responsible Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    showResponsibleUseCase = new ShowResponsibleUseCase(responsiblesRepository);
  });

  it('should be able to show a responsible', async () => {
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

    const responsibles = await showResponsibleUseCase.execute(responsible.id);

    expect(responsibles).toEqual(responsible);
  });

  it('should not be able to show a responsible that does not exists', () => {
    expect(async () => {
      await showResponsibleUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
