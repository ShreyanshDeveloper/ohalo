import Button from '@components/Atoms/Button';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { SectionProps } from '@typings/components';
import { useRouter } from 'next/router';

type NewsLetterSignupProps = {
  title?: string;
  sectionBackground?: SectionProps['sectionBackground'];
};

const NewsLetterSignup = ({
  title = 'Subscribe to our newsletter',
  sectionBackground,
}: NewsLetterSignupProps) => {
  const { asPath } = useRouter();
  const hiddenOn = [
    '/demo',
    '/thank-you-subscribe',
    '/thank-you',
    '/subscribe',
  ];
  return !hiddenOn.includes(asPath) ? (
    <Section
      className='py-medium md:py-large'
      sectionBackground={sectionBackground}
    >
      <SectionInner className='flex flex-col items-center justify-between md:flex-row'>
        <div className='flex flex-col gap-small md:flex-row'>
          <img
            src='/subscribe.svg'
            alt=''
            aria-hidden
            width={50}
            height={50}
          />
          <h3 className='mb-0'>{title}</h3>
        </div>
        <Button href='/subscribe' label='Subscribe now' />
      </SectionInner>
    </Section>
  ) : null;
};

export default NewsLetterSignup;
