import Redactor from '@components/Atoms/Redactor';
import SectionInner from '@components/Utilities/SectionInner';
import { SectionProps } from '@typings/components';
import { RedactorSectionFragment } from '@typings/graphql';
import SectionLabel from '../../Atoms/SectionLabel';
import Section from '../../Utilities/Section';

// type ContentSectionProps = SectionProps &
//   ProseWrapperProps & {
//     label?: string;
//     showDivider?: boolean;
//     buttons?: ButtonProps[];
//   };

type RedactorSectionProps = Omit<
  RedactorSectionFragment,
  'sectionBackground' | 'contentWidth'
> & {
  contentWidth?: 'small' | 'medium' | 'large';
  sectionBackground?: SectionProps['sectionBackground'];
};

const RedactorSection = ({
  label,
  logo,
  contentWidth,
  showDivider = false,
  // buttons,
  sectionBackground,
  redactor,
}: RedactorSectionProps) => {
  const widthClass =
    contentWidth === 'small'
      ? 'max-w-[540px]'
      : contentWidth === 'medium'
      ? 'max-w-[730px]'
      : 'max-w-[830px]';

  const { alt, src, ...restOfLogo } =
    logo?.length && logo?.[0]?.__typename === 'logos_Asset' && logo?.[0];

  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner showDivider={showDivider}>
        {!!label && <SectionLabel label={label} />}
        {!!logo?.length && <img alt={alt} src={src} {...restOfLogo} />}
        <div className={`${widthClass}${showDivider ? ' mb-large' : ''}`}>
          <Redactor redactor={redactor} />
        </div>
      </SectionInner>
    </Section>
  );
};

export default RedactorSection;
