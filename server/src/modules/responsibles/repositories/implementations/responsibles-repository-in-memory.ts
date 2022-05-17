import { ICreateResponsible } from '../../dtos/create-responsible';
import { Responsible } from '../../infra/entities/responsible';
import { IResponsiblesRepository } from '../reponsibles-repository';

class ResponsiblesRepositoryInMemory implements IResponsiblesRepository {
  private responsibles: Responsible[] = [];

  async create(data: ICreateResponsible): Promise<Responsible> {
    const {
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    } = data;

    const responsible = new Responsible();

    Object.assign(responsible, {
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    });

    this.responsibles.push(responsible);

    return responsible;
  }

  async listAll(): Promise<Responsible[]> {
    return this.responsibles;
  }

  async remove(responsible: Responsible): Promise<void> {
    const responsibleIndex = this.responsibles.findIndex(
      (responsibleToRemove) => responsibleToRemove.id === responsible.id
    );

    this.responsibles.splice(responsibleIndex, 1);
  }

  async findById(id: string): Promise<Responsible> {
    const responsible = this.responsibles.find(
      (responsible) => responsible.id === id
    );

    return responsible;
  }

  async findByCompanyId(company_id: string): Promise<Responsible[]> {
    const responsibles = this.responsibles.filter(
      (responsible) => responsible.company_id === company_id
    );

    return responsibles;
  }
}

export { ResponsiblesRepositoryInMemory };
