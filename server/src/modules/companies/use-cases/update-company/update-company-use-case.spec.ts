import { CompaniesRepositoryInMemory } from '../../repositories/implementations/companies-repository-in-memory';
import { UpdateCompanyUseCase } from './update-company-use-case';

let companiesRepository: CompaniesRepositoryInMemory;
let updateCompanyUseCase: UpdateCompanyUseCase;

describe('Update Company Use Case', () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    updateCompanyUseCase = new UpdateCompanyUseCase(companiesRepository);
  });

  it('should be able to update a company', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-company-description',
      CNPJ: 'my-company-CNPJ',
    });

    await updateCompanyUseCase.execute({
      id: company.id,
      name: 'my-updated-name',
      description: 'my-updated-description',
      CNPJ: 'my-updated-CNPJ',
    });

    const companies = await companiesRepository.listAll();

    expect(companies[0].name).toEqual('my-updated-name');
    expect(companies[0].description).toEqual('my-updated-description');
    expect(companies[0].CNPJ).toEqual('my-updated-CNPJ');
  });

  it('should not be able to update a company that does not exists', () => {
    expect(async () => {
      await updateCompanyUseCase.execute({
        id: 'fake-id',
        name: 'new-name',
        description: 'new-description',
        CNPJ: 'new-cnpj',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a CNPJ that are already in use', () => {
    expect(async () => {
      const company = await companiesRepository.create({
        name: 'my-company',
        description: 'my-description',
        CNPJ: 'my-CNPJ',
      });

      await companiesRepository.create({
        name: 'other-company',
        description: 'other-description',
        CNPJ: 'my-other-CNPJ',
      });

      await updateCompanyUseCase.execute({
        id: company.id,
        CNPJ: 'my-other-CNPJ',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
