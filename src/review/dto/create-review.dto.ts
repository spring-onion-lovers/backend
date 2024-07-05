import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateReviewSchema = z.object({
  product_id: z.coerce.number(),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(1).max(500),
})

export class CreateReviewDto extends createZodDto(CreateReviewSchema){}
