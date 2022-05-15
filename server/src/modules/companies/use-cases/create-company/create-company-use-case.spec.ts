import { CompaniesRepositoryInMemory } from '../../repositories/implementations/companies-repository-in-memory';
import { CreateCompanyUseCase } from './create-company-use-case';

let createCompanyUseCase: CreateCompanyUseCase;
let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

describe('Create Company Use Case', () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory
    );
  });

  it('should be able to create a new company', async () => {
    const company = {
      CNPJ: 'my-cnpj',
      name: 'my-company-name',
      description: 'my-company-description',
    };

    const companyCreated = await createCompanyUseCase.execute(company);

    expect(companyCreated).toHaveProperty('id');
    expect(companyCreated.name).toEqual(company.name);
  });

  it('should not be able to create two companies with same CNPJ', () => {
    expect(async () => {
      const firstCompany = {
        CNPJ: 'same-cnpj',
        name: 'my-first-company-name',
        description: 'my-first-company-description',
      };

      const secondCompany = {
        CNPJ: 'same-cnpj',
        name: 'my-second-company-name',
        description: 'my-second-company-description',
      };

      await createCompanyUseCase.execute(firstCompany);

      await createCompanyUseCase.execute(secondCompany);
    }).rejects.toBeInstanceOf(Error);
  });
});
