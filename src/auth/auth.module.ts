import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_ACCES_TOKEN_EXPIRES_IN } from 'src/constant';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: USER_ACCES_TOKEN_EXPIRES_IN },
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
