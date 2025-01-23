import { ApiListSongs } from '../utils/interface';
import { SongItem } from './SongItem';

interface Properties {
  songs: ApiListSongs;
}

export const ListSongs = ({ songs }: Properties) => {
  return (
    <div className='grid grid-cols-5 gap-8'>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
};
