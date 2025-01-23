import { TypedFormData, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, HttpCode } from '@nestjs/common';
import multer from 'multer';

import type { CreateSongDto, GetSongDto, UpdateSongDto } from './song.dto';

import { SongService } from './song.service';

const _multer = multer({
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

@Controller('v1/song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @TypedRoute.Post()
  @HttpCode(204)
  create(@TypedFormData.Body(() => _multer) body: CreateSongDto) {
    return this.songService.createSong(body);
  }

  @TypedRoute.Delete(':id')
  @HttpCode(204)
  delete(@TypedParam('id') id: number) {
    return this.songService.deleteSong(id);
  }

  @TypedRoute.Get(':id')
  get(@TypedParam('id') id: number): any {
    return this.songService.getSong(id);
  }

  @TypedRoute.Get()
  list(@TypedQuery() query: GetSongDto): any {
    return this.songService.listSongs(query.positionId);
  }

  @TypedRoute.Put(':id')
  @HttpCode(204)
  update(@TypedParam('id') id: number, @TypedFormData.Body(() => _multer) body: UpdateSongDto) {
    return this.songService.updateSong(id, body);
  }
}
