import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { UserId } from '../user-id/user-id.decorator';
import { JwtGuard } from '../jwt/jwt.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse from '../../utilities/OKResponse';

@UseGuards(JwtGuard)
@UsePipes(ZodValidationPipe)
@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@UserId() userId: number, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.initiatePurchase(userId, createPurchaseDto);
  }

  @Get()
  async findAll(@UserId() userId: number) {
    const data = await  this.purchaseService.findAllPurchases(userId);
    return new OKResponse(data, 'Purchases retrieved successfully');
  }

  @Get(':id')
  async findOne(@UserId() userId: number, @Param('id') id: string) {
    const data = await this.purchaseService.findOne(userId, +id);

    // If no data is found, throw a NotFoundException
    if(!data){
      throw new NotFoundException('Purchase not found');
    }

    return new OKResponse(data, 'Purchase retrieved successfully');
  }
}
