import { ProseWrapperProps } from '@typings/components';
import { PropsWithChildren } from 'react';

const ProseWrapper = ({
  proseClasses = '',
  children,
}: PropsWithChildren<ProseWrapperProps>) => {
  // const classes =
  //   'prose prose-h1:text-h1 prose-h2:text-mobile-h2 sm:prose-h2:text-h2 prose-h3:text-h3 prose-h4:text-h4 prose-h5:text-h5 prose-h6:text-h6';

  return <div className={`max-w-[64ch] ${proseClasses}`}>{children}</div>;
};

export default ProseWrapper;
