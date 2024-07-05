import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req: Request = http.getRequest();

    if (!req.headers.authorization) {
      return false;
    }

    // decode jwt token
    const tokenResponse = this.jwtService.decodeToken(
      req.headers.authorization.replace('Bearer ', ''),
    );

    http.getRequest().user_id = tokenResponse.data.id;

    return true;
  }
}
