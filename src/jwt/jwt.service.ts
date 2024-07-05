import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private secret: string;

  constructor() {
    this.secret = 'secret';
  }

  generateToken(data: any, expiresIn: number = 1_800_000) {
    //   Generate a JWT token
    return sign({ data }, this.secret, {
      expiresIn,
    });
  }

  decodeToken(token: string): JwtPayload {
    // Decode a JWT token
    return verify(token, this.secret) as JwtPayload;
  }
}
