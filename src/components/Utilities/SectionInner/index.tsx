import { SectionInnerProps } from '@typings/components';
import { PropsWithChildren } from 'react';

const SectionInner = ({
  showDivider = false,
  className = '',
  style,
  children,
}: PropsWithChildren<SectionInnerProps & { style?: any }>) => {
  return (
    <div className={`section-inner ${className}`} style={style}>
      {children}
      {!!showDivider && <hr className='mt-large' />}
    </div>
  );
};

export default SectionInner;
