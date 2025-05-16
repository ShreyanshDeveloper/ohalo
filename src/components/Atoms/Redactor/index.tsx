import ButtonGroup from '@components/Molecules/ButtonGroup';
import TitleGroup from '@components/Molecules/TitleGroup';
import { SectionProps } from '@typings/components';
import { RedactorFragment } from '@typings/graphql';
import parse from 'html-react-parser';

const Redactor = ({
  sectionTitles,
  label,
  redactor,
  buttons,
}: Omit<Partial<RedactorFragment>, 'sectionBackground' | 'contentWidth'> & {
  contentWidth?: 'small' | 'medium' | 'large';
  sectionBackground?: SectionProps['sectionBackground'];
}) => {
  return (
    <div className='redactor'>
      {!!sectionTitles?.length && (
        <TitleGroup
          isColumnTitleGroup
          {...sectionTitles[0]}
          label={sectionTitles[0]?.label || label}
        />
      )}
      <div>{!!redactor && parse(redactor)}</div>
      {!!buttons && <ButtonGroup buttons={buttons} />}
    </div>
  );
};

export default Redactor;
