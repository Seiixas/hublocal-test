import { ICreatePlace } from '../dtos/create-place';
import { Place } from '../entities/place';

interface IPlacesRepository {
  listAll(): Promise<Place[]>;

  create(data: ICreatePlace): Promise<Place>;

  remove(place: Place): Promise<void>;

  findById(id: string): Promise<Place>;
}

export { IPlacesRepository };
