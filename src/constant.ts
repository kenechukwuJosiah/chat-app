import { ConfigService } from '@nestjs/config';

export const USER_ACCES_TOKEN_EXPIRES_IN = '40m';

export function getDbConnectionParams(configService: ConfigService) {
  return {
    type: configService.get<string>('DB_TYPE') as 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
  };
}
