import { inject, injectable } from 'tsyringe';

import { Company } from '../../infra/entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

@injectable()
class ListCompaniesUseCase {
  constructor(
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.listAll();

    return companies;
  }
}

export { ListCompaniesUseCase };
