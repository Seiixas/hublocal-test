import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { AuthenticateUserController } from '../../../../modules/accounts/use-cases/authenticate-user/authenticate-user-controller';
import { CreateUserController } from '../../../../modules/accounts/use-cases/create-user/create-user-controller';
import { RemoveUserController } from '../../../../modules/accounts/use-cases/remove-user/remove-user-controller';
import { ShowUserController } from '../../../../modules/accounts/use-cases/show-user/show-user-controller';
import { UpdateUserController } from '../../../../modules/accounts/use-cases/update-user/update-user-controller';

const usersRoutes = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const removeUserController = new RemoveUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post('/auth', authenticateController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.delete('/:id', ensureAuthenticated, removeUserController.handle);
usersRoutes.get('/:id', ensureAuthenticated, showUserController.handle);
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
