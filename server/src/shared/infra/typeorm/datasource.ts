import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'myusername',
  password: 'mypassword',
  database: 'hublocal',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});
