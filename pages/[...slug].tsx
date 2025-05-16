import Hero from '@components/Organisms/Hero';
import ContentBlocks from '@components/Utilities/ContentBlocks';
import {
  CaseStudies_Default_Entry,
  GetFooterNavigationDocument,
  GetFooterSubNavigationDocument,
  GetMainNavigationDocument,
  GetPageContentByUriDocument,
  GetPageRoutesDocument,
  GetCaseStudiesContentDocument, // ✅ you imported it now
  GetSeomaticDocument,
  HeroFragment,
  MatrixBlocksFragment,
  GetEntriesBySectionAndCategoriesAndSearchDocument,
  Pages_Default_Entry,
} from '@typings/graphql';
import type { PreviewData } from '@typings/ohalo';
import type { GetStaticPropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { addApolloState, initializeApollo } from 'src/graphql/apolloClient';

const CatchAll: NextPage = ({
  contentBlocks,
  hero,
}: {
  contentBlocks?: MatrixBlocksFragment;
  hero?: HeroFragment;
}) => {
  return (
    <main>
      {!!hero && <Hero {...hero} />}
      {contentBlocks ? <ContentBlocks data={contentBlocks} /> : null}
    </main>
  );
};

// Extend ParsedUrlQuery to add a definition for the slug
interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
    // Fetch both Page Routes and Case Studies
	const pageRoutesResponse = await apolloClient.query({
      query: GetPageRoutesDocument,
    });
	const caseStudiesResponse = await apolloClient.query({
      query: GetEntriesBySectionAndCategoriesAndSearchDocument,
	  variables: {
		section: ["caseStudies"],
	  },
    });
	const blogResponse = await apolloClient.query({
      query: GetEntriesBySectionAndCategoriesAndSearchDocument,
	  variables: {
		section: ["articles"],
	  },
    });
    //const pageRoutes = response.data.entries.map(({ uri }: { uri: string }) => uri.split('/'));
	

    const pageEntries = pageRoutesResponse?.data?.entries || [];
    const caseStudyEntries = caseStudiesResponse?.data?.entries || [];
	const blogEntries = blogResponse?.data?.entries || [];
	  
	 const pagePaths = pageEntries
      .filter(({ uri }: { uri: string }) => !!uri && uri !== 'case-studies') // 👈 Exclude /case-studies
      .map(({ uri }: { uri: string }) => {
        const cleanUri = uri.replace(/^\/|\/$/g, ''); // remove starting/ending slashes
        const slugArray = cleanUri.split('/');
        return { params: { slug: slugArray } };
      });

    const caseStudyPaths = caseStudyEntries
      .filter(({ uri }: { uri: string }) => !!uri)
      .map(({ uri }: { uri: string }) => {
        const cleanUri = uri.replace(/^\/|\/$/g, '');
        const slugArray = cleanUri.split('/');
        return { params: { slug: slugArray } };
      });
	  
	  
	  const blogPaths = blogEntries
      .filter(({ uri }: { uri: string }) => !!uri)
      .map(({ uri }: { uri: string }) => {
        const cleanUri = uri.replace(/^\/|\/$/g, '');
        const slugArray = cleanUri.split('/');
        return { params: { slug: slugArray } };
      });

    const paths = [...pagePaths, ...caseStudyPaths, ...blogPaths]; 
	  

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching page routes:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params, previewData, preview }: GetStaticPropsContext) => {
  const { slug = [] } = params as IParams;
  const token = (previewData as PreviewData)?.token || null;
  const apolloClient = initializeApollo(token);
  const uri = Array.isArray(slug) ? slug.join('/') : slug;

  try {
    // Fetch SEO metadata
    const seomatic = await apolloClient.query({
      query: GetSeomaticDocument,
      variables: { uri },
    });

    // Fetch Navigation Data
    await Promise.all([
      apolloClient.query({ query: GetMainNavigationDocument }),
      apolloClient.query({ query: GetFooterNavigationDocument }),
      apolloClient.query({ query: GetFooterSubNavigationDocument }),
    ]);

    // Fetch Page Content
    const response = await apolloClient.query({
      query: GetPageContentByUriDocument,
      variables: { uri },
    });

    if (!response?.data?.entry) {
      return { notFound: true };
    }
	
	console.log("Type",response.data.entry.__typename);

    const entry =
      response.data.entry.__typename === 'caseStudies_default_Entry'
        ? (response.data.entry as CaseStudies_Default_Entry)
        : (response.data.entry as Pages_Default_Entry);

    return addApolloState(apolloClient, {
      props: {
        contentBlocks: entry.contentBlocks || null,
        hero: entry.hero?.[0] || null,
        seomatic: seomatic.data.seomatic,
        preview: preview || null,
      },
      revalidate: 60,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true };
  }
};

export default CatchAll;
