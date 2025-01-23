import { NestiaSwaggerComposer } from '@nestia/sdk';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { URL } from 'node:url';

import { SongModule } from './song.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SongModule, { cors: true });
  const configService = app.get(ConfigService);

  const apiUrl = configService.get('API_URL');
  const url = new URL(apiUrl);

  const swaggerEnabled = configService.get('SWAGGER_ENABLED') === 'true';

  if (swaggerEnabled) {
    const document = await NestiaSwaggerComposer.document(app, {
      openapi: '3.1',
      servers: [
        {
          url: apiUrl,
        },
      ],
    });

    SwaggerModule.setup('api', app, document as any);
  }

  await app.listen(url.port);

  console.log(`Service is running on: ${await app.getUrl()}`);
}

await bootstrap();
