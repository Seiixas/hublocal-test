import { CompaniesRepositoryInMemory } from '../../repositories/implementations/companies-repository-in-memory';
import { ListCompaniesUseCase } from './list-companies-use-case';

let companiesRepository: CompaniesRepositoryInMemory;
let listCompaniesUseCase: ListCompaniesUseCase;

describe('List Companies Use Case', () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    listCompaniesUseCase = new ListCompaniesUseCase(companiesRepository);
  });

  it('should be able to list all companies', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-CNPJ',
    });

    const companies = await listCompaniesUseCase.execute();

    expect(companies).toEqual([company]);
  });
});
