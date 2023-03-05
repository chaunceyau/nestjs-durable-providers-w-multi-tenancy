import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TenantContextIdStrategy } from './tenant';

async function bootstrap() {
  ContextIdFactory.apply(new TenantContextIdStrategy());
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
