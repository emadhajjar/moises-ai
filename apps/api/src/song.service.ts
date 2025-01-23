import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { existsSync, mkdirSync, rmSync, writeFile } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { PrismaService } from './prisma/prisma.service';
import { CreateSongDto, SongDto, SongFiles, UpdateSongDto } from './song.dto';

const writeFilePromisified = promisify(writeFile);

@Injectable()
export class SongService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async createFile(id: number, prefix: string, file: File) {
    const path = join(import.meta.dirname, '..', 'uploads', `${id}`, prefix);

    this.deleteFile(id, prefix);

    mkdirSync(path, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFilePromisified(`${path}/${file.name}`, buffer, 'utf8');

    const apiUrl = this.configService.get('API_URL');

    return `${apiUrl}/${id}/${prefix}/${file.name}`;
  }

  async createSong(data: CreateSongDto) {
    const song = await this.prisma.song.create({
      data: this.prepareSong(data),
    });

    await this.uploadFiles(song.id, data);

    return '';
  }

  deleteFile(id: number, prefix: string) {
    const path = join(import.meta.dirname, '..', 'uploads', `${id}`, prefix);

    if (existsSync(path)) {
      rmSync(path, { force: true, recursive: true });
    }
  }

  async deleteSong(id: number) {
    const path = join(import.meta.dirname, '..', 'uploads', `${id}`);

    if (existsSync(path)) {
      rmSync(path, { force: true, recursive: true });
    }

    await this.prisma.song.delete({
      where: {
        id,
      },
    });

    return '';
  }

  async getSong(id: number) {
    const song = await this.prisma.song.findUnique({
      where: {
        id,
      },
    });

    return {
      ...song,
      id,
    };
  }

  async listSongs(positionId?: number) {
    const songs = await this.prisma.song.findMany({
      cursor:
        positionId == undefined ? undefined : (
          {
            id: positionId,
          }
        ),
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      skip: positionId == undefined ? 0 : 1,
      take: 40,
    });

    return songs.map(({ id, ...song }) => ({
      ...song,
      id: Number(id),
    }));
  }

  prepareSong(data: SongDto) {
    const audio = data.audio ?? '';
    const cover = data.cover ?? '';
    const poster = data.poster ?? '';

    return {
      albumTitle: data.albumTitle,
      albumYear: data.albumYear,
      artist: data.artist,
      audio,
      cover,
      poster,
      title: data.title,
    };
  }

  async updateSong(id: number, data: UpdateSongDto) {
    await this.prisma.song.update({
      data: this.prepareSong(data),
      where: {
        id,
      },
    });

    await this.uploadFiles(id, data);

    return '';
  }

  async uploadFiles(id: bigint | number, data: Partial<SongDto>) {
    const _id = Number(id);
    const files: SongFiles = {};

    if (data.audioFile === undefined) {
      this.deleteFile(_id, 'audio');
    } else {
      files.audio = await this.createFile(_id, 'audio', data.audioFile);
    }

    if (data.coverFile === undefined) {
      this.deleteFile(_id, 'cover');
    } else {
      files.cover = await this.createFile(_id, 'cover', data.coverFile);
    }

    if (data.posterFile === undefined) {
      this.deleteFile(_id, 'poster');
    } else {
      files.poster = await this.createFile(_id, 'poster', data.posterFile);
    }

    if (Object.keys(files).length > 0) {
      await this.prisma.song.update({
        data: files,
        where: {
          id,
        },
      });
    }
  }
}
