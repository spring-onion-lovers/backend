import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async getUserByTiktokUserId(tiktokUserId: string) {
    const res = await this.userService.findByTiktokUserId(tiktokUserId);
    if (!res) {
      throw new BadRequestException('User not found');
    }

    return res;
  }
}
