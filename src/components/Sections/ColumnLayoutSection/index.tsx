import ButtonGroup from '@components/Molecules/ButtonGroup';
import TitleGroup from '@components/Molecules/TitleGroup';
import Columns from '@components/Utilities/Grids/Columns';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import {
  ColumnSectionLayouts_Default_Entry,
  ContentBlocks_ColumnLayout_BlockType,
} from '@typings/graphql';

const ColumnLayoutSection = (props: ContentBlocks_ColumnLayout_BlockType) => {
  const {
    sectionTitles,
    columnSectionLayout,
    sectionBackground,
    showDivider = true,
  } = props;

  const {
    columnBlocks,
    columnRatio,
    columnNumber,
    columnAlignment,
    buttonGroup: buttons,
  } = columnSectionLayout[0] as ColumnSectionLayouts_Default_Entry;

  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}

        {!!columnBlocks && (
          <Columns
            columns={columnBlocks}
            columnAlignment={columnAlignment}
            columnRatio={columnRatio}
            columnNumber={columnNumber}
          />
        )}

        {!!buttons?.length && (
          <ButtonGroup buttons={buttons} justifyEnd={showDivider} />
        )}

        {!!showDivider && (
          <hr
            className={`${!buttons?.length ? 'mt-large' : ''} ${
              sectionBackground === 'black' ? 'bg-white' : ''
            }`}
          />
        )}
      </SectionInner>
    </Section>
  );
};

export default ColumnLayoutSection;
