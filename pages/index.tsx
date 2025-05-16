import Hero from '@components/Organisms/Hero';
import ContentBlocks from '@components/Utilities/ContentBlocks';
import {
  GetFooterNavigationDocument,
  GetFooterSubNavigationDocument,
  GetGlobalSetFooterDocument,
  GetGlobalSetHeaderDocument,
  GetHomepageContentDocument,
  GetMainNavigationDocument,
  GetSeomaticDocument,
  HeroFragment,
  Homepage_Homepage_Entry,
  MatrixBlocksFragment,
} from '@typings/graphql';
import type { PreviewData } from '@typings/ohalo';
import type { GetStaticPropsContext, NextPage } from 'next';
import { addApolloState, initializeApollo } from 'src/graphql/apolloClient';

const Home: NextPage = ({
  contentBlocks,
  hero,
}: {
  contentBlocks?: MatrixBlocksFragment;
  hero?: HeroFragment;
}) => {
  return (
    <main>
      {!!hero && <Hero {...hero} />}
      {!!contentBlocks && <ContentBlocks data={contentBlocks} />}
    </main>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const token = (context?.previewData as PreviewData)?.token || null;
  const apolloClient = initializeApollo(token);

  // Global Sets Query
  await apolloClient.query({
    query: GetGlobalSetFooterDocument,
  });
  await apolloClient.query({
    query: GetGlobalSetHeaderDocument,
  });

  // Seomatic Query
  const seomatic = await apolloClient.query({
    query: GetSeomaticDocument,
    variables: {
      uri: '/',
    },
  });

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

  // Page Content Query
  const response = await apolloClient.query({
    query: GetHomepageContentDocument,
  });

  if (!response) {
    return {
      props: {},
    };
  }

  const entry = response?.data?.entry as unknown as Homepage_Homepage_Entry;

  const contentBlocks = entry?.contentBlocks || null;
  const hero = entry?.hero?.[0] || null;

  return addApolloState(apolloClient, {
    props: {
      contentBlocks: contentBlocks,
      hero: hero,
      seomatic: seomatic.data.seomatic,
      preview: context?.preview || null,
    },
    revalidate: 60,
  });
};

export default Home;
