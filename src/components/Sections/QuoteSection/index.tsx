import SectionInner from '@components/Utilities/SectionInner';
import { SectionProps } from '@typings/components';
import { QuoteSectionFragment } from '@typings/graphql';
import Quote, { QuoteProps } from '../../Molecules/Quote';
import Section from '../../Utilities/Section';

type QuoteSectionProps = QuoteSectionFragment &
  QuoteProps & {
    showDivider?: boolean;
    sectionBackground?: SectionProps['sectionBackground'];
  };

const QuoteSection = ({
  size = 'large',
  showDivider = true,
  sectionBackground,
  reference,
  quote,
}: QuoteSectionProps) => {
  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner showDivider={showDivider}>
        <Quote size={size} reference={reference} quote={quote} />
      </SectionInner>
    </Section>
  );
};

export default QuoteSection;
