import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import { PrismaModule } from './prisma/prisma.module';
import { SongController } from './song.controller';
import { SongService } from './song.service';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const environmentFilePath = `../../conf/${process.env.NODE_ENV ?? 'dev'}.env`;

@Module({
  controllers: [SongController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: environmentFilePath,
      isGlobal: true,
    }),
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(import.meta.dirname, '..', 'uploads'),
      serveStaticOptions: {
        fallthrough: false,
        index: false,
      },
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [SongService],
})
export class SongModule {}

// /home/nabd/moises-ai/apps/api/dist/uploads/uploads/5/audio
// /home/nabd/moises-ai/apps/api/dist/uploads/5/audio
