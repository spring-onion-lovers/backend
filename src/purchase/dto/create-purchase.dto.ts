import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreatePurchaseSchema = z.object({
  address_id: z.coerce.number(),
  cart_item_ids: z.array(z.number()).min(1),
})

export class CreatePurchaseDto extends createZodDto(CreatePurchaseSchema){}
