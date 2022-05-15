import { ICreateCompany } from '../../dtos/create-company';
import { Company } from '../../entities/company';
import { ICompaniesRepository } from '../companies-repository';

class CompaniesRepositoryInMemory implements ICompaniesRepository {
  private companies: Company[] = [];

  async listAll(): Promise<Company[]> {
    return this.companies;
  }

  async create({ CNPJ, description, name }: ICreateCompany): Promise<Company> {
    const company = new Company();

    Object.assign(company, { CNPJ, description, name });

    this.companies.push(company);

    return company;
  }

  async findByCNPJ(CNPJ: string): Promise<Company> {
    const company = this.companies.find((company) => company.CNPJ === CNPJ);

    return company;
  }

  async remove(company: Company): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (companyToFind) => companyToFind.id === company.id
    );

    this.companies.splice(companyIndex, 1);
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((company) => company.id === id);

    return company;
  }
}

export { CompaniesRepositoryInMemory };
