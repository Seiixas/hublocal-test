import { CompaniesRepositoryInMemory } from '../../repositories/implementations/companies-repository-in-memory';
import { RemoveCompanyUseCase } from './remove-company-use-case';

let companiesRepository: CompaniesRepositoryInMemory;
let removeCompanyUseCase: RemoveCompanyUseCase;

describe('Remove Company Use Case', () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    removeCompanyUseCase = new RemoveCompanyUseCase(companiesRepository);
  });

  it('should be able to remove a company', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-cnpj',
    });

    await removeCompanyUseCase.execute(company.id);

    const companies = await companiesRepository.listAll();

    expect(companies).toHaveLength(0);
  });

  it('should not be able to remove a company that does not exists', () => {
    expect(async () => {
      await removeCompanyUseCase.execute('fake-company-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
