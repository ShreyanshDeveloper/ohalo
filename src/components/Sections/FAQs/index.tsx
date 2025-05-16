import Accordion from '@components/Molecules/Accordion';
import TitleGroup from '@components/Molecules/TitleGroup';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { SectionInnerProps, SectionProps } from '@typings/components';
import { FaqsSectionFragment } from '@typings/graphql';

interface FAQsProps extends Partial<FaqsSectionFragment> {
  showDivider?: SectionInnerProps['showDivider'];
  sectionBackground?: SectionProps['sectionBackground'];
}

const FAQs = (props: FAQsProps) => {
  const { items, sectionTitles, showDivider, sectionBackground } = props;

  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner showDivider={showDivider}>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}
        {items?.[0]?.__typename === 'faqs_default_Entry' && (
          <Accordion items={items} />
        )}
      </SectionInner>
    </Section>
  );
};

export default FAQs;
