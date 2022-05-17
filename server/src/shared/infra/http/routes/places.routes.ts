import { Router } from 'express';

import { CreatePlaceController } from '../../../../modules/places/use-cases/create-place/create-place-controller';
import { ListPlacesController } from '../../../../modules/places/use-cases/list-places/list-places-controller';
import { RemovePlaceController } from '../../../../modules/places/use-cases/remove-place/remove-place-controller';
import { ShowPlaceController } from '../../../../modules/places/use-cases/show-place/show-place-controller';
import { UpdatePlaceController } from '../../../../modules/places/use-cases/update-place/update-place-controller';

const placesRoutes = Router();

const createPlaceController = new CreatePlaceController();
const removePlaceController = new RemovePlaceController();
const listPlacesController = new ListPlacesController();
const showPlaceController = new ShowPlaceController();
const updatePlaceController = new UpdatePlaceController();

placesRoutes.get('/', listPlacesController.handle);
placesRoutes.get('/:id', showPlaceController.handle);
placesRoutes.post('/', createPlaceController.handle);
placesRoutes.put('/:id', updatePlaceController.handle);
placesRoutes.delete('/:id', removePlaceController.handle);

export { placesRoutes };
