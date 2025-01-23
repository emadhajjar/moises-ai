export type ApiListSongs = ApiSong[];

export interface ApiSong {
  albumTitle: string;
  albumYear: number;
  artist: string;
  audio: string;
  cover: string;
  createdAt: Date;
  id: number;
  poster: string;
  title: string;
  updatedAt: Date;
}
