import { container } from 'tsyringe';

import { CompaniesRepository } from '../../modules/companies/infra/repositories/companies-repository';
import { ICompaniesRepository } from '../../modules/companies/repositories/companies-repository';
import { PlacesRepository } from '../../modules/places/infra/repositories/places-repository';
import { IPlacesRepository } from '../../modules/places/repositories/places-repository';
import { ResponsiblesRepository } from '../../modules/responsibles/infra/repositories/responsibles-repository';
import { IResponsiblesRepository } from '../../modules/responsibles/repositories/reponsibles-repository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
);

container.registerSingleton<IPlacesRepository>(
  'PlacesRepository',
  PlacesRepository
);

container.registerSingleton<IResponsiblesRepository>(
  'ResponsiblesRepository',
  ResponsiblesRepository
);
