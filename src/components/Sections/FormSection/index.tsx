import Form from '@components/Molecules/Form';
import TitleGroup from '@components/Molecules/TitleGroup';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { ContentBlocks_Form_BlockType } from '@typings/graphql';

const FormSection = (props: ContentBlocks_Form_BlockType) => {
  const { form, sectionTitles, sectionBackground } = props;
  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}
        {!!form[0]?.handle && <Form form={form} />}
      </SectionInner>
    </Section>
  );
};

export default FormSection;
