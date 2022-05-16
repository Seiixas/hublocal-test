import { inject, injectable } from 'tsyringe';

import { Company } from '../../infra/entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

@injectable()
class ShowCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new Error('This company does not exists');
    }

    return company;
  }
}

export { ShowCompanyUseCase };
