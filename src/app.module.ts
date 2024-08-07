import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { JwtService } from './jwt/jwt.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'category',
        module: CategoryModule,
      },
      {
        path: 'product',
        module: ProductsModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'cart',
        module: CartModule,
      },
      {
        path: 'purchase',
        module: PurchaseModule,
      },
      {
        path: 'recommendation',
        module: RecommendationModule,
      },
    ]),
    ConfigModule.forRoot(),
    CategoryModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    CartModule,
    PurchaseModule,
    RecommendationModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
