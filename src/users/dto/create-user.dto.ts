import { createZodDto } from 'nestjs-zod';
import { AddressModel, UserModel } from '../../../schemas';
import { z } from 'zod';

const CreateUserSchema = UserModel.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  tiktok_open_id: z.string(),
  address: AddressModel.omit({
    user_id: true,
    created_at: true,
    updated_at: true,
    address_id: true,
  }).optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
