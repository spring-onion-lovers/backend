import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { JwtService } from './jwt/jwt.service'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

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
    ]),
    ConfigModule.forRoot(),
    CategoryModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
