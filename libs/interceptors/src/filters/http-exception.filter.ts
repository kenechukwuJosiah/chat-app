import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let statusCode: string | undefined;
    let message: string;
    let verifyAttempt: number | undefined;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      statusCode = (exceptionResponse as any).statusCode;
      verifyAttempt = (exceptionResponse as any).verifyAttempt;
      message = (exceptionResponse as any).message || exception.message;
    } else {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      statusCode,
      verifyAttempt,
      message,
    });
  }
}
