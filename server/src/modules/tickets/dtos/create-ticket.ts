import { Place } from '../../places/infra/entities/place';

interface ICreateTicket {
  id?: string;

  title: string;

  status?: string;

  place: Place;

  created_by: string;

  updated_by: string;

  data_updated: string;
}

export { ICreateTicket };
