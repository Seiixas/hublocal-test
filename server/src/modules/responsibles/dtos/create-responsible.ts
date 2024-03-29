import { Company } from '../../companies/infra/entities/company';

interface ICreateResponsible {
  id?: string;
  name: string;
  phone_number: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company: Company;
  is_main?: boolean;
}

export { ICreateResponsible };
