import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch(PrismaClientValidationError)
export class PrismaFilter<T extends PrismaClientValidationError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 500;

    response.status(status).json({
      statusCode: status,
      error: true,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
