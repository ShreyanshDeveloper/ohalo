import Button from '@components/Atoms/Button';
import SectionLabel from '@components/Atoms/SectionLabel';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { addApolloState, initializeApollo } from '@graphql/apolloClient';
import {
  GetFooterNavigationDocument,
  GetFooterSubNavigationDocument,
  GetMainNavigationDocument,
} from '@typings/graphql';

export default function FourOhFour() {
  return (
    <main>
      <Section sectionBackground='tint'>
        <SectionInner>
          <SectionLabel label='404 error' />
          <h1>Page Not Found</h1>
          <Button href='/' label='Go back home' />
        </SectionInner>
      </Section>
    </main>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  // Navigation Queries
  await apolloClient.query({
    query: GetMainNavigationDocument,
  });
  await apolloClient.query({
    query: GetFooterNavigationDocument,
  });
  await apolloClient.query({
    query: GetFooterSubNavigationDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  });
};
