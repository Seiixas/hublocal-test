import { Company } from '../../entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

class ShowCompanyUseCase {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async execute(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new Error('This company does not exists');
    }

    return company;
  }
}

export { ShowCompanyUseCase };
