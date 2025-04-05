import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './app.module';
import { initializeApp } from "firebase-admin/app";
import { defineSecret } from 'firebase-functions/params';

export const jwtSecret = defineSecret('JWT_SECRET');
initializeApp();

const server = express();

const allowedOrigins = [
  'http://localhost:4200',        // Desarrollo local
  'https://atom-challenge-tasks.web.app',        // Producción real
];

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  await app.init();
};

bootstrap();

export const api = onRequest(
  { secrets: [jwtSecret] },
  server
);