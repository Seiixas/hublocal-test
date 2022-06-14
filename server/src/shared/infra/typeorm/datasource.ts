import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '../../../modules/accounts/infra/entities/user';
import { Company } from '../../../modules/companies/infra/entities/company';
import { Place } from '../../../modules/places/infra/entities/place';
import { Responsible } from '../../../modules/responsibles/infra/entities/responsible';
import { Ticket } from '../../../modules/tickets/infra/entities/ticket';

export const dataSource = new DataSource({
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  synchronize: true,
  entities: [Company, Place, Responsible, Ticket, User],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});
