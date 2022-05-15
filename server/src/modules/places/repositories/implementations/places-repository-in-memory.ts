import { ICreatePlace } from '../../dtos/create-place';
import { Place } from '../../entities/place';
import { IPlacesRepository } from '../places-repository';

class PlacesRepositoryInMemory implements IPlacesRepository {
  private places: Place[] = [];

  async create(data: ICreatePlace): Promise<Place> {
    const place = new Place();

    Object.assign(place, data);

    this.places.push(place);

    return place;
  }

  async listAll(): Promise<Place[]> {
    return this.places;
  }

  async findById(id: string): Promise<Place> {
    const place = this.places.find((place) => place.id === id);

    return place;
  }

  async remove(place: Place): Promise<void> {
    const placeIndex = this.places.findIndex(
      (placeToRemove) => placeToRemove.id === place.id
    );

    this.places.splice(placeIndex, 1);
  }
}

export { PlacesRepositoryInMemory };
