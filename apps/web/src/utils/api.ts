import { http } from './http';
import { ApiListSongs, ApiSong } from './interface';

export const getSong = async (id: string) => {
  const { data } = await http.get<ApiSong>(`v1/song/${id}`);

  return data;
};

export const getList = async () => {
  const { data } = await http.get<ApiListSongs>('v1/song');

  return data;
};
