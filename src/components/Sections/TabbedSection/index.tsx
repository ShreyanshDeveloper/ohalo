import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import TabbedContent, {
  TabbedContentProps,
} from '@components/Utilities/TabbedContent';

type TabbedSectionProps = TabbedContentProps;

const TabbedSection = ({ tabs }: TabbedSectionProps) => {
  return (
    <Section sectionBackground='black'>
      <SectionInner>
        <TabbedContent tabs={tabs} />
      </SectionInner>
    </Section>
  );
};

export default TabbedSection;
