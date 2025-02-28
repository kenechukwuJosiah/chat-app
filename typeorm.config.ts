import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getDbConnectionParams } from './src/constant';
import { Room } from './src/chat/entities/room.entity';
import { Message } from './src/chat/entities/message.entity';
import { User } from './src/user/entities';

const configService = new ConfigService();
const dbConnectionParams = getDbConnectionParams(configService);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConnectionParams.host,
  port: dbConnectionParams.port,
  username: dbConnectionParams.username,
  password: dbConnectionParams.password,
  database: dbConnectionParams.database,
  entities: [Room, Message, User],
  migrations: ['./libs/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
