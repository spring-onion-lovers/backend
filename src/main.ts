import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaFilter } from './prisma/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalFilters(new PrismaFilter());
  await app.listen(process.env.PORT!);
}

bootstrap();
