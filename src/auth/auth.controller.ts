import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse from '../../utilities/OKResponse';
import { JwtService } from '../jwt/jwt.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/auth.dto';

@UsePipes(ZodValidationPipe)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async loginUser(@Body() body: LoginAuthDto) {
    const user = await this.authService.getUser(body);

    // Generate token
    const token = this.jwtService.generateToken({
      id: user.user_id,
    });
    return new OKResponse(token, 'User logged in');
  }

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
