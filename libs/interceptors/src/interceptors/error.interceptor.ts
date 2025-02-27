import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const ctx = context.getClass().name;
        const request = context.switchToHttp().getRequest();
        const ipAddress =
          request.ip ||
          request.headers['x-forwarded-for'] ||
          request.connection.remoteAddress;

        const metadata = {
          path: request.url,
          timestamp: new Date().toISOString(),
        };

        if (error instanceof HttpException) {
          this.loggerService.error(
            error,
            ctx,
            {
              ...metadata,
              statusCode: error.getStatus(),
              response: error.getResponse(),
            },
            ipAddress,
          );
        } else {
          this.loggerService.error(error, ctx, metadata, ipAddress);
        }

        return throwError(() => error);
      }),
    );
  }
}
