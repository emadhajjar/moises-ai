import { clsx } from 'clsx';
import { MouseEvent, useCallback } from 'react';

import { useLocalStorage } from '../utils/hooks';
import { HeartIcon } from './HeartIcon';

interface Properties {
  name: number | string;
}
export const Favorite = ({ name }: Properties) => {
  const [active, setActive] = useLocalStorage(`favorite-${name}`, false);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setActive(!active);
    },
    [active, setActive],
  );

  return (
    <div
      className={clsx('hover:cursor-pointer', { 'text-[#F8594E]': active })}
      onClick={handleClick}
    >
      <HeartIcon fill={active} />
    </div>
  );
};
