import { secondsToHms } from '@moises-ai/utils/src';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

import { ApiSong } from '../utils/interface';
import { Container } from './Container';
import { Favorite } from './Favorite';
import { PageTitle } from './PageTitle';
import { PlayPauseIcon } from './PlayPauseIcon';

interface Properties {
  song: ApiSong;
}

export const Song = ({ song }: Properties) => {
  const subtitle = useMemo(() => `${song.artist} | ${song.albumTitle} | ${song.albumYear}`, [song]);

  const playerReference = useRef<null | ReactPlayer>(null);

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const handlePlayPause = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    setPlayed(newValue);
    playerReference.current?.seekTo(newValue);
  }, []);

  const handleProgress = useCallback((progress: OnProgressProps) => {
    setPlayed(progress.played);

    if (playerReference.current != undefined) {
      const _currentTime = playerReference.current?.getCurrentTime();
      const _duration = playerReference.current?.getDuration();

      setCurrentTime(secondsToHms(_currentTime));
      setDuration(secondsToHms(_duration - _currentTime));
    }
  }, []);

  return (
    <div
      className='grow bg-[image:var(--image-url)] bg-right-top bg-no-repeat'
      style={{ '--image-url': `url(${song.poster})` }}
    >
      <Container className='my-14'>
        <div className='flex items-center gap-8'>
          <img alt={song.title} className='size-[204] object-cover' src={song.cover} />
          <div className='flex flex-col gap-9'>
            <div className='flex items-center gap-9'>
              <PlayPauseIcon onClick={handlePlayPause} playing={playing} />
              <PageTitle
                action={<Favorite name={song.id} />}
                subtitle={subtitle}
                title={song.title}
              />
            </div>
            <div className='w-[350]'>
              <ReactPlayer
                controls={false}
                height={0}
                onProgress={handleProgress}
                playing={playing}
                ref={playerReference}
                url={song.audio}
                width={0}
              />
              <input
                className='h-0.5 w-full cursor-pointer appearance-none rounded-lg bg-white accent-white'
                id='progress'
                max='1'
                min='0'
                onChange={handleSeek}
                step='0.01'
                type='range'
                value={played}
              />
              <div className='flex items-center justify-between text-sm font-medium text-[#A8A8A8]'>
                <div>{currentTime}</div>
                <div>-{duration}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
