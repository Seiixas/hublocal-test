import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ICompaniesRepository } from '../../repositories/companies-repository';

@injectable()
class RemoveCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new NotFoundException('This company does not exists');
    }

    await this.companiesRepository.remove(company);
  }
}

export { RemoveCompanyUseCase };
