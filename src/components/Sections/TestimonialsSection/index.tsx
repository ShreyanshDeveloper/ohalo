import Carousel from '@components/Utilities/Carousel';
import Columns from '@components/Utilities/Grids/Columns';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { Logos_Asset, TestimonialsCarouselFragment } from '@typings/graphql';

const Testimonials = ({ testimonials }: TestimonialsCarouselFragment) => {
  return (
    <Section className='text-white' sectionBackground='black'>
      <SectionInner>
        <Carousel
          options={{ slidesToScroll: 1, active: testimonials.length > 1 }}
        >
          {testimonials.map((testimonialItem) => {
            const { testimonial } =
              testimonialItem?.__typename === 'testimonials_default_Entry' &&
              testimonialItem;
            const { id, logo, quote, reference, button } = testimonial[0];

            return (
              <div
                key={`testimonial-${id}`}
                className='embla__slide w-full shrink-0 grow-0 pl-medium'
              >
                <Columns
                  columnRatio='1:2'
                  columnNumber='2'
                  columnAlignment='center'
                  columns={[
                    {
                      __typename: 'columnBlocks_asset_BlockType',
                      id: `column-1-${id}`,
                      image: logo as Logos_Asset[],
                    },
                    {
                      __typename: 'columnBlocks_quote_BlockType',
                      id: `column-2-${id}`,
                      textColor: 'white',
                      label: 'Testimonial',
                      quote,
                      reference,
                      button,
                    },
                  ]}
                />
              </div>
            );
          })}
        </Carousel>
      </SectionInner>
    </Section>
  );
};

export default Testimonials;
