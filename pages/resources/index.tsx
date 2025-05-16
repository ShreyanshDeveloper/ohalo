// pages/resources/index.tsx

import { useQuery } from '@apollo/client';
import TabFilters from '@components/Molecules/TabFilters';
import Hero from '@components/Organisms/Hero';
import SearchForm from '@components/Organisms/SearchForm';
import EntriesSections from '@components/Sections/EntriesSection';
import formatArrayFromQueryParams from '@helpers/formatArrayFromQueryParams';
import formatQueryParamsFromArray from '@helpers/formatQueryParamsFromArray';
import {
  Articles_Default_Entry,
  GetEntriesBySectionAndCategoriesAndSearchDocument,
  GetFooterNavigationDocument,
  GetFooterSubNavigationDocument,
  GetFormieDocument,
  GetFormieQuery,
  GetGlobalSetFooterDocument,
  GetGlobalSetHeaderDocument,
  GetMainNavigationDocument,
  GetResourcesContentDocument,
  GetResourcesContentQuery,
  GetSeomaticDocument,
} from '@typings/graphql';
import type { PreviewData } from '@typings/ohalo';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import { addApolloState, initializeApollo } from 'src/graphql/apolloClient';

type Slug = { slug: string[] }[];

const Articles: NextPage = ({
  entry,
  types,
  form: searchForm,
}: GetResourcesContentQuery & GetFormieQuery) => {
  const { query } = useRouter();

  const [visibleEntries, setVisibleEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState((query?.search as string) || undefined);
  const [relatedToCategories, setRelatedToCategories] = useState<Slug>(
    query?.categories
      ? [{ slug: formatArrayFromQueryParams(query.categories as string) }]
      : undefined
  );
  const [activeSearchTab, setActiveSearchTab] = useState((query?.type as string) || 'all');

  const { loading, error, data } = useQuery(GetEntriesBySectionAndCategoriesAndSearchDocument, {
    variables: getSearchQueryVariables({ search: searchQuery, activeType: activeSearchTab, relatedToCategories }),
  });
  
  console.log("resources data", data);
   console.log("resources error", error);
    console.log("resources loading", loading);

  useEffect(() => {
    if (!loading && !error) {
      setVisibleEntries(data.entries);
    }
  }, [loading, error, data]);

  useEffect(() => {
    interface IParams extends ParsedUrlQuery {
      type?: string;
      categories?: string;
      search?: string;
    }

    const queryObject: IParams = {};
    queryObject.type = activeSearchTab;
    if (relatedToCategories !== undefined) {
      queryObject.categories = formatQueryParamsFromArray(relatedToCategories);
    }
    if (searchQuery?.length) {
      queryObject.search = searchQuery;
    }

    Router.push({ query: queryObject }, undefined, { shallow: true });
  }, [relatedToCategories, activeSearchTab, searchQuery]);

  const handleSearchFormChange = (values: any) => {
    const categoryObjects = values?.category || null;

    if (categoryObjects === null) {
      setRelatedToCategories(undefined);
    } else {
      const categorySlugsArray = Object.values(categoryObjects).flatMap((obj) =>
        obj && Object.keys(obj).length ? Object.keys(obj) : []
      );

      const categorySlugs: Slug = categorySlugsArray?.length ? [{ slug: categorySlugsArray }] : [];
      if (categorySlugs?.length) setRelatedToCategories(categorySlugs);
    }

    setSearchQuery(values?.search || undefined);
  };

  const handleChangeType = (slug: string) => {
    if (slug !== activeSearchTab || slug !== query?.type) {
      setActiveSearchTab(slug);
    }
  };

  const typesArray = [
    { id: 'all', slug: 'all', title: 'All' },
    { id: 'caseStudies', slug: 'caseStudies', title: 'Case Studies' },
    ...types,
  ];

  return (
    <main>
      {!!(entry as Articles_Default_Entry)?.articleHero?.length && (
        <Hero {...(entry as Articles_Default_Entry).articleHero?.[0]} />
      )}

      <TabFilters tabs={typesArray} handleClick={handleChangeType} currentTab={activeSearchTab} />

      {!!searchForm && (
        <SearchForm
          searchQuery={searchQuery}
          relatedToCategories={relatedToCategories}
          setRelatedToCategories={setRelatedToCategories}
          onChange={handleSearchFormChange}
          onClear={handleSearchFormChange}
          form={searchForm}
          showClearButton={relatedToCategories !== undefined}
        />
      )}

      {!!loading && (
        <div className='fixed left-1/2 bottom-0 z-10 mb-medium flex -translate-x-1/2 gap-xx-small bg-tints-light-blue p-small text-primary shadow-md'>
          <p>Loading</p>
          <svg className='-ml-1 mr-3 h-5 w-5 animate-spin' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
          </svg>
        </div>
      )}

      {visibleEntries && <EntriesSections id='articles-section' entries={visibleEntries} />}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GetGlobalSetFooterDocument });
  await apolloClient.query({ query: GetGlobalSetHeaderDocument });
  await apolloClient.query({ query: GetSeomaticDocument, variables: { uri: '/resources' } });
  await apolloClient.query({ query: GetMainNavigationDocument });
  await apolloClient.query({ query: GetFooterNavigationDocument });
  await apolloClient.query({ query: GetFooterSubNavigationDocument });

  const pageResponse = await apolloClient.query({
    query: GetResourcesContentDocument,
  });

  const searchForm = await apolloClient.query({
    query: GetFormieDocument,
    variables: { handle: 'resourcesSearchForm' },
  });

  return addApolloState(apolloClient, {
    props: {
      entry: pageResponse?.data?.entry || [],
      types: pageResponse?.data?.types || [],
      form: searchForm?.data?.form || null,
    },
    revalidate: 60, // Optional: ISR revalidate every 60 seconds
  });
};

const getSearchQueryVariables = ({
  search,
  activeType,
  relatedToCategories,
}: {
  search?: string;
  activeType?: string;
  relatedToCategories?: { slug: string[] }[];
}) => {
  const section = activeType === 'caseStudies' ? ['caseStudies'] : ['caseStudies', 'articles'];

  return {
    section,
    search,
    categories:
      relatedToCategories === undefined &&
      ['all', 'caseStudies'].includes(activeType)
        ? undefined
        : [
            !['all', 'caseStudies'].includes(activeType) ? { slug: [activeType] } : null,
            relatedToCategories?.[0],
          ].filter(Boolean),
  };
};

export default Articles;
