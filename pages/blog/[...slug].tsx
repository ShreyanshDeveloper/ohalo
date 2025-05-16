import { useQuery } from '@apollo/client';
import Hero from '@components/Organisms/Hero';
import ContentBlocks from '@components/Utilities/ContentBlocks';
import SectionInner from '@components/Utilities/SectionInner';
import {
  GetArticleContentDocument,
  GetFooterNavigationDocument,
  GetFooterSubNavigationDocument,
  GetMainNavigationDocument,
  GetPageRoutesDocument,
  GetSeomaticDocument,
  GetEntriesBySectionAndCategoriesAndSearchDocument,
} from '@typings/graphql';
import type { PreviewData } from '@typings/ohalo';
import type { GetStaticPropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { addApolloState, initializeApollo } from 'src/graphql/apolloClient';

const Article: NextPage = ({
  contentBlocks,
  articleHero,
  postDate,
  articleAuthor,
  types,
  articleTags,
}: any) => {
  return (
    <main>
      {!!articleHero?.length && <Hero {...articleHero[0]} sectionBackground='tint' />}
      <div className='small bg-tints-light-gray'>
        <SectionInner>
          <div className='border-b'>
            <ul className='divide-y md:flex md:flex-wrap md:gap-large md:divide-y-0'>
              {!!types?.[0]?.title && (
                <li className='py-small'>
                  <strong className='pr-xx-small'>Type:</strong> {types[0].title}
                </li>
              )}
              <li className='py-small'>
                <strong className='pr-xx-small'>Date:</strong>{' '}
                {new Date(postDate).toLocaleDateString('en-GB')}
              </li>
              {!!articleAuthor && (
                <li className='py-small'>
                  <strong className='pr-xx-small'>Author:</strong> {articleAuthor}
                </li>
              )}
              {!!articleTags?.length && (
                <li className='py-small'>
                  <strong className='pr-xx-small'>Tags:</strong>{' '}
                  {articleTags.map((tag) => tag.title).join(', ')}
                </li>
              )}
            </ul>
          </div>
        </SectionInner>
      </div>
      {contentBlocks ? <ContentBlocks data={contentBlocks} /> : null}
    </main>
  );
};

// Extend ParsedUrlQuery for proper TypeScript support
interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
   {/*
    const response = await apolloClient.query({
      query: GetPageRoutesDocument,
    });

    const paths = response.data.entries.map(({ uri }: { uri: string }) => ({
      params: { slug: uri.split('/') },
    }));
	*/}
	
	
	const response = await apolloClient.query({
	  query: GetEntriesBySectionAndCategoriesAndSearchDocument,
	  variables: {
		section: ["caseStudies", "articles"],
	  },
	});
	
	{/*
	 const paths = response.data.entries.map(({ uri }: { uri: string }) => ({
      params: { slug: uri.split('/') },
     }));
	 */}

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching page routes:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps = async ({ params, previewData, preview }: GetStaticPropsContext) => {
  const { slug = [] } = params as IParams;
  const token = (previewData as PreviewData)?.token || null;
  const apolloClient = initializeApollo(token);
  const uri = `${slug.join('/')}`;
  
  console.log("uri",uri);

  try {
    const [seomatic, response] = await Promise.all([
      apolloClient.query({ query: GetSeomaticDocument, variables: { uri } }),
      apolloClient.query({ query: GetArticleContentDocument, variables: { uri } }),
    ]);

    if (!response?.data?.entry) {
      return { notFound: true };
    }

    // Fetch Navigation Data in Parallel
    await Promise.all([
      apolloClient.query({ query: GetMainNavigationDocument }),
      apolloClient.query({ query: GetFooterNavigationDocument }),
      apolloClient.query({ query: GetFooterSubNavigationDocument }),
    ]);

    return addApolloState(apolloClient, {
      props: {
        ...response.data.entry,
        seomatic: seomatic.data.seomatic,
        preview: preview || null,
      },
      revalidate: 60,
    });
  } catch (error) {
    console.error('Error fetching article data:', error);
    return { notFound: true };
  }
};

export default Article;
