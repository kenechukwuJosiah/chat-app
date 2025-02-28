import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConnectionParams } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './rooms/room.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatModule,
    RoomModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConnectionParams = getDbConnectionParams(configService);
        return {
          type: dbConnectionParams.type,
          host: dbConnectionParams.host,
          port: dbConnectionParams.port,
          username: dbConnectionParams.username,
          password: dbConnectionParams.password,
          database: dbConnectionParams.database,
          entities: [User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
