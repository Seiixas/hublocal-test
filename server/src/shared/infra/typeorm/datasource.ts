import { DataSource } from 'typeorm';

import { User } from '../../../modules/accounts/infra/entities/user';
import { Company } from '../../../modules/companies/infra/entities/company';
import { Place } from '../../../modules/places/infra/entities/place';
import { Responsible } from '../../../modules/responsibles/infra/entities/responsible';
import { Ticket } from '../../../modules/tickets/infra/entities/ticket';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'hublocal',
  synchronize: true,
  entities: [Company, Place, Responsible, Ticket, User],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});
