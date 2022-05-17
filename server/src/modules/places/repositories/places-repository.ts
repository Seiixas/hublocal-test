import { ICreatePlace } from '../dtos/create-place';
import { Place } from '../infra/entities/place';

interface IPlacesRepository {
  listAll(): Promise<Place[]>;

  findByIds(ids: string[]): Promise<Place[]>;

  create(data: ICreatePlace): Promise<Place>;

  remove(place: Place): Promise<void>;

  findById(id: string): Promise<Place>;
}

export { IPlacesRepository };
