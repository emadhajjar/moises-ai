interface Properties {
  onClick?: () => void;
  playing?: boolean;
}

export const PlayPauseIcon = ({ onClick, playing }: Properties) => {
  return (
    <svg
      className='hover:cursor-pointer'
      fill='none'
      height='64'
      onClick={onClick}
      viewBox='0 0 64 64'
      width='64'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect fill='white' height='64' rx='32' width='64' />
      {playing ?
        <g transform='translate(20,20)'>
          <path d='M5 2.5h4s1 0 1 1v17s0 1 -1 1H5s-1 0 -1 -1v-17s0 -1 1 -1' fill='black' />
          <path d='M15 2.5h4s1 0 1 1v17s0 1 -1 1h-4s-1 0 -1 -1v-17s0 -1 1 -1' fill='black' />
        </g>
      : <path
          d='M42 30.8453C42.8889 31.3585 42.8889 32.6415 42 33.1547L26 42.3923C25.1111 42.9055 24 42.264 24 41.2376L24 22.7624C24 21.736 25.1111 21.0945 26 21.6077L42 30.8453Z'
          fill='black'
        />
      }
    </svg>
  );
};
