import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { LoginAuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async getUser(body: LoginAuthDto) {
    const res = await this.userService.findByEmail(body.email)
    if (!res) {
      throw new BadRequestException('Email/Password is incorrect')
    }

    return res
  }
}
