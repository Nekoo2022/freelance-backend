import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module.js';

// #region agent log
const LOG_ENDPOINT =
  'http://127.0.0.1:7242/ingest/8830cc10-2fed-46cd-91a3-962344d1a9b8';
const log = (
  location: string,
  message: string,
  data: any,
  hypothesisId: string,
) => {
  fetch(LOG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location,
      message,
      data,
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'initial',
      hypothesisId,
    }),
  }).catch(() => {});
};
// #endregion

async function bootstrap() {
  // #region agent log
  log('main.ts:6', 'Bootstrap started', { reflectMetadataImported: true }, 'C');
  // #endregion
  try {
    // #region agent log
    log('main.ts:10', 'Creating NestFactory', {}, 'D');
    // #endregion
    const app = await NestFactory.create(AppModule);
    // #region agent log
    log('main.ts:12', 'AppModule created successfully', {}, 'D');
    // #endregion
    await app.listen(process.env.APPLICATION_PORT ?? 4001);
    // #region agent log
    log(
      'main.ts:14',
      'Server listening',
      { port: process.env.APPLICATION_PORT ?? 4001 },
      'D',
    );
    // #endregion
  } catch (error) {
    // #region agent log
    log(
      'main.ts:16',
      'Bootstrap error',
      {
        errorMessage: error?.message,
        errorStack: error?.stack,
        errorName: error?.name,
      },
      'ALL',
    );
    // #endregion
    throw error;
  }
}
bootstrap();
