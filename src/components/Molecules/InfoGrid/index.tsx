import Carousel from '@components/Utilities/Carousel';
import InfoBlock from '../InfoBlock';

interface InfoBlock {
  title: string;
  description: string;
}

type InfoBlocks = {
  infoBlocks: InfoBlock[];
};

export type InfoGridProps = InfoBlocks & {
  slider?: boolean;
  cards?: boolean;
  showOverflow?: boolean;
};

const InfoGrid = ({
  infoBlocks,
  slider,
  cards: _cards,
  showOverflow,
}: InfoGridProps) => {
  return (
    <>
      {slider ? (
        <Carousel
          showOverflow={showOverflow}
          // slidesToShow={3} // Where is this value from
          options={{ slidesToScroll: 3 }}
          // cellSpacing={30} // Where is this value from?
        >
          {infoBlocks.map((infoBlock, index) => (
            <InfoBlock
              key={infoBlock.title}
              {...infoBlock}
              itemNumber={index + 1}
              // cards={cards}
            />
          ))}
        </Carousel>
      ) : (
        <div className='grid gap-x-medium gap-y-large md:grid-cols-3'>
          {infoBlocks.map((infoBlock, index) => (
            <InfoBlock
              key={infoBlock.title}
              {...infoBlock}
              itemNumber={index + 1}
              // cards={cards}
            />
          ))}
        </div>
      )}
    </>
  );
};

// const Blocks = ({
//   title,
//   description,
//   itemNumber,
//   cards,
// }: InfoBlock & { itemNumber: number; cards?: boolean }) => {
//   return (
//     <div className={`${cards ? 'h-full bg-white p-medium shadow-lg' : ''}`}>
//       <SectionLabel
//         label={`\u2013 ${itemNumber < 10 ? '0' + itemNumber : itemNumber}`}
//         color='primary'
//       />
//       <h3 className='h5'>{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// };

export default InfoGrid;

//! Need to ask Matt where this component is rendered as I can't find it anywhere
