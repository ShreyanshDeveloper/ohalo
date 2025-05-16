import ButtonGroup from '@components/Molecules/ButtonGroup';
import TitleGroup from '@components/Molecules/TitleGroup';
import ContentRepeater from '@components/Utilities/ContentRepeater';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import {
  ContentBlocks_InformationGridLayout_BlockType,
  InformationGridLayouts_Default_Entry,
} from '@typings/graphql';

const InfoSection = (props: ContentBlocks_InformationGridLayout_BlockType) => {
  const {
    sectionTitles,
    informationGridLayout,
    asSlider,
    asCards,
    sectionBackground,
  } = props;

  const { informationGridBlocks, buttonGroup: buttons } =
    informationGridLayout[0] as InformationGridLayouts_Default_Entry;

  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}

        <ContentRepeater
          asCards={asCards}
          asSlider={asSlider}
          items={informationGridBlocks}
        />

        {!!buttons?.length && <ButtonGroup buttons={buttons} />}
      </SectionInner>
    </Section>
  );
};

export default InfoSection;
