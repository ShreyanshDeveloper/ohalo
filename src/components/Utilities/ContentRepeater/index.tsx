import Carousel from '@components/Utilities/Carousel';
import ColumnBlock from '@components/Utilities/ColumnBlock';
import tailwind from 'tailwindcss/defaultTheme';

export type InfoGridProps = {
  items: any;
  asSlider?: boolean;
  asCards?: boolean;
};

// Screen sizes
const sm = `(min-width: ${tailwind.screens.sm})`;
const md = `(min-width: ${tailwind.screens.md})`;

const ContentRepeater = ({ items, asSlider, asCards }: InfoGridProps) => {
  return (
    <>
      {asSlider ? (
        <Carousel
          showOverflow={asCards}
          options={{
            align: 'start',
            slidesToScroll: 1,
            active: items.length > 1,
            breakpoints: {
              [`${sm}`]: {
                slidesToScroll: 2,
                active: items.length > 2,
              },
              [`${md}`]: {
                slidesToScroll: 3,
                active: items.length > 3,
              },
            },
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className='embla__slide w-full shrink-0 grow-0 pl-medium sm:basis-1/2 md:basis-1/3'
            >
              <ColumnBlock
                data={[
                  {
                    ...item,
                    itemNumber: index + 1,
                    asCards,
                  },
                ]}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-x-medium md:grid-cols-3 ${
            asCards ? 'gap-y-medium' : 'gap-y-large'
          }`}
        >
          {items.map((item, index) => {
            return (
              <ColumnBlock
                key={`${item.title}-${index}`}
                data={[
                  {
                    ...item,
                    itemNumber: index + 1,
                    asCards,
                  },
                ]}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ContentRepeater;
