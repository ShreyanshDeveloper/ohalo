import { useQuery } from '@apollo/client';
import Button from '@components/Atoms/Button';
import EntriesCard from '@components/Molecules/EntryCard';
import TitleGroup from '@components/Molecules/TitleGroup';
import Carousel from '@components/Utilities/Carousel';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import {
  Articles_Default_Entry,
  ContentBlocks_EntriesCarousel_BlockType,
  GetEntriesBySectionAndCategoriesDocument,
  GetEntriesBySectionAndCategoriesQueryVariables,
  GetEntriesBySectionDocument,
  GetEntriesBySectionQueryVariables,
} from '@typings/graphql';
import tailwind from 'tailwindcss/defaultTheme';

// Screen sizes
const sm = `(min-width: ${tailwind.screens.sm})`;
const md = `(min-width: ${tailwind.screens.md})`;

const EntriesCarouselSection = (
  props: ContentBlocks_EntriesCarousel_BlockType
) => {
  const { sectionTitles, sectionType, categories, sectionBackground } = props;

  const { loading, error, data } = useQuery(
    categories.length
      ? GetEntriesBySectionAndCategoriesDocument
      : GetEntriesBySectionDocument,
    {
      variables: categories?.length
        ? ({
            section: sectionType,
            categories: categories.map(({ id }) => ({
              id: id,
            })),
            limit: 6,
          } as GetEntriesBySectionAndCategoriesQueryVariables)
        : ({
            section: sectionType,
            limit: 6,
          } as GetEntriesBySectionQueryVariables),
    }
  );

  return (
    <Section sectionBackground={sectionBackground}>
      <SectionInner>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}

        {loading ? (
          <p>Loading resources...</p>
        ) : (
          !error && (
            <Carousel
              options={{
                align: 'start',
                slidesToScroll: 1,
                active: data.entries.length > 1,
                breakpoints: {
                  [`${sm}`]: {
                    slidesToScroll: 2,
                    active: data.entries.length > 2,
                  },
                  [`${md}`]: {
                    slidesToScroll: 3,
                    active: data.entries.length > 3,
                  },
                },
              }}
              showOverflow
            >
              {(data.entries as Array<Articles_Default_Entry>)?.map((entry) => {
                return (
                  <EntriesCard
                    key={entry?.id}
                    id={entry?.id}
                    {...entry}
                    className='pl-medium'
                  />
                );
              })}
            </Carousel>
          )
        )}
        <Button href='/resources' label='View all resources' />
      </SectionInner>
    </Section>
  );
};

export default EntriesCarouselSection;

//! Line 75 is a cheat really. There's two queries conditionally occuring in this component which is weird. As a result the typing of the entry being accessed in the map is potentially one of many different types (much more beyond the articles_default and CaseStudies Default which the EntriesCard component is designed to handle.) I think the best thing to do here is to rewrite the query and resulting components so the flow of data is easier to handle.
