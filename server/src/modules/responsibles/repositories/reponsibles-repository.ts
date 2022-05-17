import { ICreateResponsible } from '../dtos/create-responsible';
import { Responsible } from '../infra/entities/responsible';

interface IResponsiblesRepository {
  create(data: ICreateResponsible): Promise<Responsible>;

  listAll(): Promise<Responsible[]>;

  remove(responsible: Responsible): Promise<void>;

  findByCompanyId(company_id: string): Promise<Responsible[]>;

  findById(id: string): Promise<Responsible>;
}

export { IResponsiblesRepository };
