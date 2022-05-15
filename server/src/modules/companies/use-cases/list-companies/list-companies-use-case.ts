import { Company } from '../../entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

class ListCompaniesUseCase {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.listAll();

    return companies;
  }
}

export { ListCompaniesUseCase };
