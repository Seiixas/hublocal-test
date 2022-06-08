import { Place } from '../../places/infra/entities/place';

interface ICreateTicket {
  id?: string;

  title: string;

  status?: string;

  place: Place;

  created_by: string;

  updated_by: string;

  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
}

export { ICreateTicket };
