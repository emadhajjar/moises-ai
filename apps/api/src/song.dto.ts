export type CreateSongDto = SongDto;

export interface GetSongDto {
  positionId?: number;
}

export interface SongDto {
  albumTitle: string;
  albumYear: number;
  artist: string;
  audio?: string;
  audioFile?: File;
  cover?: string;
  coverFile?: File;
  poster?: string;
  posterFile?: File;
  title: string;
}

export type SongFiles = Partial<Record<'audio' | 'cover' | 'poster', string>>;

export type UpdateSongDto = SongDto;
