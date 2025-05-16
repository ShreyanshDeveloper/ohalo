import { DataFragment } from '@typings/graphql';

const Data = ({ dataValue, indicatorWidth, statistic }: DataFragment) => {
  return (
    <div>
      <h3 className='mb-0 text-h1 md:text-h2 lg:text-h1'>{dataValue}</h3>
      {!!indicatorWidth && (
        <span
          className='relative my-normal block h-[1px] bg-primary after:absolute after:right-0 after:top-0 after:block after:h-[21px] after:w-[21px] after:origin-top-right after:rotate-45 after:border after:border-t-primary after:border-r-primary after:border-l-transparent after:border-b-transparent'
          style={{ width: indicatorWidth + '%' }}
        />
      )}
      <p>{statistic}</p>
    </div>
  );
};

export default Data;
