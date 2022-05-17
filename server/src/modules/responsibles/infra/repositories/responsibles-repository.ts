import { Repository } from 'typeorm';

import { dataSource } from '../../../../shared/infra/typeorm/datasource';
import { ICreateResponsible } from '../../dtos/create-responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';
import { Responsible } from '../entities/responsible';

class ResponsiblesRepository implements IResponsiblesRepository {
  private repository: Repository<Responsible>;

  constructor() {
    this.repository = dataSource.getRepository(Responsible);
  }

  async create({
    id,
    name,
    phone_number,
    public_place,
    complement,
    district,
    city,
    state,
    is_main,
    cep,
    number,
    company,
  }: ICreateResponsible): Promise<Responsible> {
    const responsible = this.repository.create({
      id,
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      is_main,
      state,
      cep,
      number,
      company,
    });

    await this.repository.save(responsible);

    return responsible;
  }

  async listAll(): Promise<Responsible[]> {
    const responsibles = await this.repository.find();

    return responsibles;
  }

  async remove(responsible: Responsible): Promise<void> {
    await this.repository.remove(responsible);
  }

  async findByCompanyId(company_id: string): Promise<Responsible[]> {
    const responsibles = await this.repository.query(
      `SELECT * FROM responsibles INNER JOIN companies ON companies.id ILIKE '${company_id}'`
    );

    return responsibles;
  }

  async findById(id: string): Promise<Responsible> {
    const responsible = await this.repository.findOneBy({ id });

    return responsible;
  }
}

export { ResponsiblesRepository };
