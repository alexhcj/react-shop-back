import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useStaticAssets(join(__dirname, '..', 'assets'), {
    prefix: '/assets',
  });

  await app.listen(process.env.PORT || 3000, () =>
    console.log(`Server port: ${process.env.PORT}`),
  );
}
bootstrap();
