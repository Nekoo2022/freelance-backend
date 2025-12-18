import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS для работы с фронтендом
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.APPLICATION_PORT ?? 4001);
}

bootstrap();
