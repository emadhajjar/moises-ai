import { Link } from '@tanstack/react-router';

import { Routes } from '../constants/routes';
import { ApiSong } from '../utils/interface';
import { Favorite } from './Favorite';

interface Properties {
  song: ApiSong;
}
export const SongItem = ({ song }: Properties) => {
  return (
    <Link
      className='overflow-hidden rounded bg-neutral-800'
      params={{ id: song.id }}
      to={Routes.SONG}
    >
      <img alt={song.title} className='w-full object-cover' src={song.cover} />
      <div className='p-4'>
        <div className='mb-3 truncate text-lg font-semibold'>{song.title}</div>
        <div className='flex items-center justify-between'>
          <div className='truncate pr-2 text-xs font-semibold text-[#666666]'>
            {song.albumTitle}
          </div>
          <Favorite name={song.id} />
        </div>
      </div>
    </Link>
  );
};
