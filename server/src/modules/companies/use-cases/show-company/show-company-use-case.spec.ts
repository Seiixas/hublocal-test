import { CompaniesRepositoryInMemory } from '../../repositories/implementations/companies-repository-in-memory';
import { ShowCompanyUseCase } from './show-company-use-case';

let showCompanyUseCase: ShowCompanyUseCase;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Show Company Use Case', () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    showCompanyUseCase = new ShowCompanyUseCase(companiesRepository);
  });

  it('should be able to show a company', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'cnpj',
    });

    const companyFind = await showCompanyUseCase.execute(company.id);

    expect(companyFind.name).toEqual('my-company');
    expect(companyFind.description).toEqual('my-description');
    expect(companyFind.CNPJ).toEqual('cnpj');
  });

  it('should not be able to show a company that does not exists', () => {
    expect(async () => {
      await showCompanyUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
