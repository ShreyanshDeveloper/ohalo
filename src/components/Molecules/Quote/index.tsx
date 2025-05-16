import Button from '@components/Atoms/Button';
import SectionLabel from '@components/Atoms/SectionLabel';
import { Links } from '@typings/components';
import { ReactElement } from 'react';

export type QuoteProps = {
  quote: string;
  label?: string;
  reference?: string;
  button?: Links;
  size?: 'large' | 'medium' | 'small';
  textColor?: 'white' | 'black' | 'primary';
};

const Quote = ({
  label,
  quote,
  reference,
  button,
  size = 'small',
  textColor = 'primary',
}: QuoteProps): ReactElement => {
  return (
    <div
      className={`flex flex-col items-start justify-start text-${textColor}`}
    >
      {!!label && <SectionLabel label={label} color={textColor} />}
      <p
        className={`${
          size === 'small' ? 'h5' : size === 'medium' ? 'h3' : 'h1'
        } mb-0`}
      >
        {quote}
      </p>
      {!!reference && (
        <p className='mt-normal mb-small'>&ndash; {`${reference}`}</p>
      )}
      {!!button?.href && <Button {...button} label={button.label} />}
    </div>
  );
};

export default Quote;
