import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse from '../../utilities/OKResponse';
import { JwtGuard } from '../jwt/jwt.guard';
import { UserId } from '../user-id/user-id.decorator';

@UseGuards(JwtGuard)
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get('self')
  async findSelf(@UserId() userId: number) {
    const res = await this.usersService.findOne(userId);
    if (!res) {
      throw new NotFoundException('User not found');
    }

    return new OKResponse(res);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const res = await this.usersService.findOne(+id);
  //   if (!res) {
  //     throw new NotFoundException('User not found');
  //   }
  //
  //   return new OKResponse(res);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
