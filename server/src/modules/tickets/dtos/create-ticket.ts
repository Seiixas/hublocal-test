interface ICreateTicket {
  id?: string;

  title: string;

  status?: 'PROGRESSO' | 'PENDENTE' | 'CONCLUÍDO';

  place_id: string;

  created_by: string;

  updated_by: string;

  data_updated: string;
}

export { ICreateTicket };
