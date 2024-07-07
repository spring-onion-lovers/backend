import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaFilter<T extends PrismaClientKnownRequestError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 500;

    // Unique constraint violation
    if (exception.code === 'P2002') {
      return response.status(409).json({
        statusCode: 409,
        error: 'Conflict',
        message: exception.meta,
        timestamp: new Date().toISOString(),
      });
    }

    response.status(status).json({
      statusCode: status,
      error: true,
      message: exception.meta,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
