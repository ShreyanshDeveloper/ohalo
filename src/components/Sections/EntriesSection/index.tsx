import EntriesCard from '@components/Molecules/EntryCard';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import {
  Articles_Default_Entry,
  CaseStudies_Default_Entry,
} from '@typings/graphql';
import { HTMLAttributes } from 'react';

interface EntriesSectionsProps extends HTMLAttributes<HTMLElement> {
  entries?: Array<Articles_Default_Entry | CaseStudies_Default_Entry>;
}

const EntriesSections = ({ entries, id }: EntriesSectionsProps) => {
  return (
    <Section id={id} className='pt-medium sm:pt-large md:pt-xx-large'>
      <SectionInner>
        {!!entries?.length ? (
          <div className='grid gap-medium md:grid-cols-2 lg:grid-cols-3'>
            {entries?.map(
              (entry: Articles_Default_Entry | CaseStudies_Default_Entry) => {
                return (
                  <EntriesCard key={entry?.id} id={entry?.id} {...entry} />
                );
              }
            )}
          </div>
        ) : (
          <p>No articles for your selection.</p>
        )}
      </SectionInner>
    </Section>
  );
};

export default EntriesSections;
