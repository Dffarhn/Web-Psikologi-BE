import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/response/error.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://greatly-free-oriole.ngrok-free.app','https://husky-coherent-legally.ngrok-free.app'], // Specific domain (or '*' for all)
    credentials: true,
    methods: '*', // Allow all methods
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI, // Use /v1/ in the URI
  });

  await app.listen(3000);
}
bootstrap();
