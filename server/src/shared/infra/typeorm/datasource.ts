import { DataSource } from 'typeorm';

import { Company } from '../../../modules/companies/infra/entities/company';
import { Place } from '../../../modules/places/infra/entities/place';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'hublocal',
  synchronize: true,
  entities: [Company, Place],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});
