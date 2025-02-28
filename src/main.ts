import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@app/interceptors/filters/http-exception.filter';
import { ErrorInterceptor, ResponseInterceptor } from '@app/interceptors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const logger = new Logger();

  app.setGlobalPrefix('v1/chat-app');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ErrorInterceptor(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  const PORT = configService.get('APP_PORT');

  await app.listen(PORT);

  logger.log(`APP IS LISTENING ON ${PORT}`);
}
bootstrap();
