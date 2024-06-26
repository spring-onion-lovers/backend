import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeUserComplete() {
  return {
    user_id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
    country_id: faker.number.int(),
  };
}
export function fakeAddress() {
  return {
    address_line1: faker.lorem.words(5),
    address_line2: faker.lorem.words(5),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    postal_code: faker.lorem.words(5),
    building_name: undefined,
    building_no: undefined,
    remarks: undefined,
    updated_at: faker.date.anytime(),
  };
}
export function fakeAddressComplete() {
  return {
    address_id: faker.number.int(),
    user_id: undefined,
    address_line1: faker.lorem.words(5),
    address_line2: faker.lorem.words(5),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    postal_code: faker.lorem.words(5),
    country_id: faker.number.int(),
    building_name: undefined,
    building_no: undefined,
    remarks: undefined,
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeCountry() {
  return {
    country_code: faker.lorem.words(5),
    country_name: faker.lorem.words(5),
    updated_at: faker.date.anytime(),
  };
}
export function fakeCountryComplete() {
  return {
    country_id: faker.number.int(),
    country_code: faker.lorem.words(5),
    country_name: faker.lorem.words(5),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProduct() {
  return {
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductComplete() {
  return {
    product_id: faker.number.int(),
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
    category_id: faker.number.int(),
    brand_id: undefined,
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductCategory() {
  return {
    name: faker.person.fullName(),
    parent_category_id: undefined,
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductCategoryComplete() {
  return {
    category_id: faker.number.int(),
    name: faker.person.fullName(),
    parent_category_id: undefined,
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductBrand() {
  return {
    name: faker.person.fullName(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductBrandComplete() {
  return {
    brand_id: faker.number.int(),
    name: faker.person.fullName(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductPrice() {
  return {
    currency: faker.lorem.words(5),
    price: faker.number.float(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductPriceComplete() {
  return {
    price_id: faker.number.int(),
    product_id: faker.number.int(),
    country_id: faker.number.int(),
    currency: faker.lorem.words(5),
    price: faker.number.float(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductAvailability() {
  return {
    stock: faker.number.int(),
    is_available: faker.datatype.boolean(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeProductAvailabilityComplete() {
  return {
    availability_id: faker.number.int(),
    product_id: faker.number.int(),
    country_id: faker.number.int(),
    stock: faker.number.int(),
    is_available: faker.datatype.boolean(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeShippingMethod() {
  return {
    shipping_method: faker.lorem.words(5),
    estimated_days: faker.number.int(),
    currency: faker.lorem.words(5),
    price: faker.number.float(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeShippingMethodComplete() {
  return {
    shipping_method_id: faker.number.int(),
    product_id: faker.number.int(),
    country_id: faker.number.int(),
    shipping_method: faker.lorem.words(5),
    estimated_days: faker.number.int(),
    currency: faker.lorem.words(5),
    price: faker.number.float(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeCartItem() {
  return {
    quantity: faker.number.int(),
    updated_at: faker.date.anytime(),
  };
}
export function fakeCartItemComplete() {
  return {
    cart_item_id: faker.number.int(),
    user_id: faker.number.int(),
    product_id: faker.number.int(),
    quantity: faker.number.int(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
export function fakePurchase() {
  return {
    tax_amount: faker.number.float(),
    total_price: faker.number.float(),
    final_price: faker.number.float(),
    updated_at: faker.date.anytime(),
  };
}
export function fakePurchaseComplete() {
  return {
    purchase_id: faker.number.int(),
    user_id: faker.number.int(),
    address_id: faker.number.int(),
    shipping_method_id: faker.number.int(),
    tax_amount: faker.number.float(),
    total_price: faker.number.float(),
    final_price: faker.number.float(),
    created_at: new Date(),
    updated_at: faker.date.anytime(),
    productProduct_id: undefined,
  };
}
export function fakePurchaseItem() {
  return {
    quantity: faker.number.int(),
    price: faker.number.float(),
    stripe_payment_id: undefined,
    updated_at: faker.date.anytime(),
  };
}
export function fakePurchaseItemComplete() {
  return {
    purchase_item_id: faker.number.int(),
    purchase_id: faker.number.int(),
    product_id: faker.number.int(),
    country_id: faker.number.int(),
    quantity: faker.number.int(),
    price: faker.number.float(),
    stripe_payment_id: undefined,
    created_at: new Date(),
    updated_at: faker.date.anytime(),
  };
}
