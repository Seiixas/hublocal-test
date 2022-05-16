import { v4 as uuidv4 } from 'uuid';

class Ticket {
  id?: string;

  title: string;

  status: 'PENDENTE' | 'PROGRESSO' | 'CONCLUÍDO';

  place_id: string;

  created_at: Date;

  updated_at: Date;

  created_by: string;

  updated_by: string;

  data_updated: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
    this.title = this.id + this.title;
    this.status = 'PENDENTE';
  }
}

export { Ticket };
