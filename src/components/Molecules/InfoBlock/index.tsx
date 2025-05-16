import SectionLabel from '@components/Atoms/SectionLabel';
import { InformationGridBlocks_Block_BlockType } from '@typings/graphql';
import Link from 'next/link';

const InfoBlock = (
  props: Partial<InformationGridBlocks_Block_BlockType> & {
    itemNumber?: number;
    asCards?: boolean;
    asSlider?: boolean;
  }
) => {
  const {
    icon,
    blockTitle,
    blockSubtitle,
    blockContent,
    itemNumber,
    asCards,
    blockLink,
  } = props;
  return (
    <div
      className={`${
        asCards ? 'h-full bg-white p-medium text-center shadow-lg customChallenges' : ''
      }`}
    >
      {!!icon?.[0] ? (
        <img
          src={icon[0]?.url}
          alt={icon[0]?.alt ? icon[0]?.alt : ''}
          {...icon[0]}
        />
      ) : (
        !asCards && (
          <SectionLabel
            label={`\u2013 ${itemNumber < 10 ? '0' + itemNumber : itemNumber}`}
            color='primary'
          />
        )
      )}
      <h3 className='h5'>{blockTitle}</h3>
      {!!blockSubtitle && <p className='medium'>{blockSubtitle}</p>}
      {!!blockContent && <p>{blockContent}</p>}
      {!!blockLink && blockLink?.url !== null ? (
		  <Link
			href={blockLink.url.replace(
			  'https://cms.ohalo.co/web/',
			  process.env.NEXT_PUBLIC_FRONT_BASE_URL || ''
			)}
			{...blockLink}
		  >
			<a className="text-link small mt-medium md:mt-large">
			  {blockLink.text}
			</a>
		  </Link>
		) : null}
    </div>
  );
};

export default InfoBlock;
