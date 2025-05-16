import Carousel from '@components/Utilities/Carousel';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { LogoCarouselSectionFragment } from '@typings/graphql';
import tailwind from 'tailwindcss/defaultTheme';

const sm = `(min-width: ${tailwind.screens.sm})`;
const md = `(min-width: ${tailwind.screens.md})`;

const ImageSection = (props: LogoCarouselSectionFragment) => {
  const { title, images } = props;
  return (
    <Section>
      <SectionInner showDivider>
        {!!title && <h2 className='h4 text-center'>{title}</h2>}
        {!!images && (
          <Carousel
            centerDots
            options={{
              align: 'start',
              active: images.length > 2,
              slidesToScroll: 2,
              breakpoints: {
                [`${sm}`]: {
                  slidesToScroll: 3,
                  active: images.length > 3,
                },
                [`${md}`]: {
                  slidesToScroll: 6,
                  active: images.length > 6,
                },
              },
            }}
          >
            {images.map((image) => {
              const { id, src, alt, ...img } =
                image?.__typename === 'logos_Asset' && image;
              return (
                <div
                  key={id}
                  className='embla__slide flex shrink-0 grow-0 basis-1/2 justify-center pl-medium sm:basis-1/3 md:basis-1/6'
                >
                  <img
                    src={src}
                    alt={alt}
                    objectFit={'contain'}
                    {...img}
                    width={150}
                    height={150}
                  />
                </div>
              );
            })}
          </Carousel>
        )}
      </SectionInner>
    </Section>
  );
};

export default ImageSection;
