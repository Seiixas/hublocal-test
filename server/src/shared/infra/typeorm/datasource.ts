import { DataSource } from 'typeorm';

import { Company } from '../../../modules/companies/infra/entities/company';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'hublocal',
  synchronize: true,
  entities: [Company],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});
