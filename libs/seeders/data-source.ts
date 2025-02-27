import 'reflect-metadata';
import 'dotenv/config';
import { getDbConnectionParams } from '../../src/constant';
import { User } from '../../src/user/entities';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const dbConnectionParams = getDbConnectionParams(configService);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConnectionParams.host,
  port: dbConnectionParams.port,
  username: dbConnectionParams.username,
  password: dbConnectionParams.password,
  database: dbConnectionParams.database,
  entities: [User],
  synchronize: true,
  migrations: [],
});
