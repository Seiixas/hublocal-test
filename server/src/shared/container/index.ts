import { container } from 'tsyringe';

import { CompaniesRepository } from '../../modules/companies/infra/repositories/companies-repository';
import { ICompaniesRepository } from '../../modules/companies/repositories/companies-repository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
);
