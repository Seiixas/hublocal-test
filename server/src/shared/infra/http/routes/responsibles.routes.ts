import { Router } from 'express';

import { CreateResponsibleController } from '../../../../modules/responsibles/use-cases/create-responsible/create-responsible-controller';
import { ListResponsiblesController } from '../../../../modules/responsibles/use-cases/list-responsibles/list-responsibles-controller';
import { RemoveResponsibleController } from '../../../../modules/responsibles/use-cases/remove-responsible/remove-responsible-controller';
import { SetResponsibleMainController } from '../../../../modules/responsibles/use-cases/set-responsible-main/set-responsible-main-controller';
import { ShowResponsibleController } from '../../../../modules/responsibles/use-cases/show-responsible/show-responsible-controller';
import { UpdateResponsibleController } from '../../../../modules/responsibles/use-cases/update-responsible/update-responsible-controller';

const responsiblesRoutes = Router();

const createResponsibleController = new CreateResponsibleController();
const listResponsiblesController = new ListResponsiblesController();
const removeResponsibleController = new RemoveResponsibleController();
const setResponsibleMainController = new SetResponsibleMainController();
const showResponsibleController = new ShowResponsibleController();
const updateResponsibleController = new UpdateResponsibleController();

responsiblesRoutes.post('/', createResponsibleController.handle);
responsiblesRoutes.get('/', listResponsiblesController.handle);
responsiblesRoutes.get('/:id', showResponsibleController.handle);
responsiblesRoutes.delete('/:id', removeResponsibleController.handle);
responsiblesRoutes.patch('/:id', setResponsibleMainController.handle);
responsiblesRoutes.put('/:id', updateResponsibleController.handle);

export { responsiblesRoutes };
