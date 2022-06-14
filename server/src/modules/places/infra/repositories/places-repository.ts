import { Repository, In } from 'typeorm';

import { dataSource } from '../../../../shared/infra/typeorm/datasource';
import { ICreatePlace } from '../../dtos/create-place';
import { IPlacesRepository } from '../../repositories/places-repository';
import { Place } from '../entities/place';

class PlacesRepository implements IPlacesRepository {
  private repository: Repository<Place>;

  constructor() {
    this.repository = dataSource.getRepository(Place);
  }

  async findByIds(ids: string[]): Promise<Place[]> {
    const places = await this.repository.findBy({
      id: In(ids),
    });

    return places;
  }

  async listAll(): Promise<Place[]> {
    const places = await this.repository.find();

    return places;
  }

  async create({
    id,
    name,
    public_place,
    complement,
    district,
    city,
    state,
    cep,
    number,
    company,
  }: ICreatePlace): Promise<Place> {
    const place = this.repository.create({
      id,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company,
    });

    await this.repository.save(place);

    return place;
  }

  async remove(place: Place): Promise<void> {
    await this.repository.remove(place);
  }

  async findById(id: string): Promise<Place> {
    const place = await this.repository.findOneBy({
      id,
    });

    return place;
  }
}

export { PlacesRepository };
