import { ButtonProps } from '@components/Atoms/Button';
import ButtonGroup from '@components/Molecules/ButtonGroup';
import TitleGroup from '@components/Molecules/TitleGroup';
import ColumnBlock from '@components/Utilities/ColumnBlock';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import {
  ContentBlocks_FullWidthSection_BlockType,
  LinkList_Default_Entry,
} from '@typings/graphql';

const FullWidthSection = ({
  content,
  sectionTitles,
  showDivider,
  sectionBackground,
  buttons,
}: ContentBlocks_FullWidthSection_BlockType & {
  buttons?: { button?: ButtonProps }[];
  content?: LinkList_Default_Entry[];
}) => {
  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner showDivider={!buttons && showDivider}>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}
        <ColumnBlock data={content} sectionName='fullWidthSection' />
        {buttons && (
          <>
            <ButtonGroup buttons={buttons} justifyEnd={showDivider} />
            {!!showDivider && <hr />}
          </>
        )}
      </SectionInner>
    </Section>
  );
};

export default FullWidthSection;
