import { Router } from 'express';

import { CreateCompanyController } from '../../../../modules/companies/use-cases/create-company/create-company-controller';
import { ListCompaniesController } from '../../../../modules/companies/use-cases/list-companies/list-companies-controller';
import { RemoveCompanyController } from '../../../../modules/companies/use-cases/remove-company/remove-company-controller';
import { ShowCompanyController } from '../../../../modules/companies/use-cases/show-company/show-company-controller';
import { UpdateCompanyController } from '../../../../modules/companies/use-cases/update-company/update-company-controller';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();
const showCompanyController = new ShowCompanyController();
const removeCompanyController = new RemoveCompanyController();
const updateCompanyController = new UpdateCompanyController();

companiesRoutes.post('/', createCompanyController.handle);
companiesRoutes.get('/:id', showCompanyController.handle);
companiesRoutes.get('/', listCompaniesController.handle);
companiesRoutes.put('/:id', updateCompanyController.handle);
companiesRoutes.delete('/:id', removeCompanyController.handle);

export { companiesRoutes };
