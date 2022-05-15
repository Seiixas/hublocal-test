import { ICompaniesRepository } from '../../repositories/companies-repository';

class RemoveCompanyUseCase {
  constructor(private companiesRepository: ICompaniesRepository) {}

  async execute(id: string): Promise<void> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new Error('This company does not exists');
    }

    await this.companiesRepository.remove(company);
  }
}

export { RemoveCompanyUseCase };
