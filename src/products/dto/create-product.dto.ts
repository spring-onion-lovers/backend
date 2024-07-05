import { createZodDto } from 'nestjs-zod';
import {
  ProductAvailabilityModel,
  ProductModel,
  ProductPriceModel,
  ShippingMethodModel,
} from '../../../schemas';
import { z } from 'zod';

const CreateProductSchema = ProductModel.omit({
  product_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  image_url: z.string(),

  price: ProductPriceModel.omit({
    product_id: true,
    price_id: true,
    created_at: true,
    updated_at: true,
  })
    .array()
    .min(1),

  shipping_methods: ShippingMethodModel.omit({
    product_id: true,
    created_at: true,
    updated_at: true,
    shipping_method_id: true,
  })
    .array()
    .min(1),

  product_availability: ProductAvailabilityModel.omit({
    availability_id: true,
    product_id: true,
    created_at: true,
    updated_at: true,
  })
    .array()
    .min(1),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
