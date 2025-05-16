import { ReactElement } from 'react';

const ArrowIcon = ({
  className = '',
}: {
  className?: string;
}): ReactElement => {
  return (
    <svg
      className={className}
      width='22'
      height='24'
      viewBox='0 0 22 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        d='M14.8242 1.49023L21.0007 7.6667L14.8242 13.8432'
        stroke='currentColor'
      />
      <path d='M20.6912 7.66602H0' stroke='currentColor' />
    </svg>
  );
};

export default ArrowIcon;
