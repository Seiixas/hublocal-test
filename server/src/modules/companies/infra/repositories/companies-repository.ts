import { Repository } from 'typeorm';

import { dataSource } from '../../../../shared/infra/typeorm/datasource';
import { ICreateCompany } from '../../dtos/create-company';
import { ICompaniesRepository } from '../../repositories/companies-repository';
import { Company } from '../entities/company';

class CompaniesRepository implements ICompaniesRepository {
  private repository: Repository<Company>;

  constructor() {
    this.repository = dataSource.getRepository(Company);
  }

  async listAll(): Promise<Company[]> {
    const companies = await this.repository.find();

    return companies;
  }

  async create({
    id,
    name,
    description,
    CNPJ,
  }: ICreateCompany): Promise<Company> {
    const company = this.repository.create({ id, name, description, CNPJ });

    await this.repository.save(company);

    return company;
  }

  async remove(company: Company): Promise<void> {
    await this.repository.remove(company);
  }

  async findByCNPJ(CNPJ: string): Promise<Company> {
    const company = await this.repository.findOneBy({ CNPJ });

    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = await this.repository.findOneBy({ id });

    return company;
  }
}

export { CompaniesRepository };
