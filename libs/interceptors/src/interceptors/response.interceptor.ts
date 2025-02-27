import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import {
  CUSTOM_RESPONSE,
  CustomResponseOptions,
} from '../decorators/custom-response.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  // response intercept
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // const response = context.switchToHttp().getResponse();
        // const status = response.statusCode;

        const customResponse = this.reflector.get<CustomResponseOptions>(
          CUSTOM_RESPONSE,
          context.getHandler(),
        );

        return {
          // statusCode: status,
          // success: true,
          message: customResponse?.message || 'Request successful',
          statusCode: customResponse?.statusCode || 'S200',
          ...data,
        };
      }),
    );
  }
}
