import { createZodDto } from 'nestjs-zod';
import { AddressModel, UserModel } from '../../../schemas';
import { CreateProductDto } from '../../products/dto/create-product.dto';

const CreateUserSchema = UserModel.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  address: AddressModel.omit({
    user_id: true,
    created_at: true,
    updated_at: true,
    address_id: true,
  }).optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
