import { getContentBlocks } from '@helpers/craft';
import dynamic from 'next/dynamic';
import { createElement } from 'react';

const components = {
  FullWidthSection: dynamic(
    () => import('@components/Sections/FullWidthSection')
  ),
  ColumnLayout: dynamic(
    () => import('@components/Sections/ColumnLayoutSection')
  ),
  InformationGridLayout: dynamic(
    () => import('@components/Sections/InfoSection')
  ),
  TabbedContent: dynamic(() => import('@components/Sections/TabbedSection')),
  Form: dynamic(() => import('@components/Sections/FormSection')),
  TestimonialsCarousel: dynamic(
    () => import('@components/Sections/TestimonialsSection')
  ),
  Faqs: dynamic(() => import('@components/Sections/FAQs')),
  EntriesCarousel: dynamic(
    () => import('@components/Sections/EntriesCarouselSection')
  ),
  LogoCarousel: dynamic(() => import('@components/Sections/ImageSection')),
  Redactor: dynamic(() => import('@components/Sections/RedactorSection')),
  Quote: dynamic(() => import('@components/Sections/QuoteSection')),
  LargeImage: dynamic(() => import('@components/Sections/LargeImageSection')),
  Calculator: dynamic(() => import('@components/Sections/Calculator')),
};

const ContentBlocks = ({ data }: { data: any }) => {
  // const { loading, error, data } = useQuery(getGlobalBlocksQuery(queryArgs), {
  //   variables: queryArgs,
  // });

  // if (loading) return <p>Loading...</p>;

  const contentBlocks = data ? getContentBlocks(data) : [];

  return contentBlocks.map(({ name, component, ...rest }) => {
    if (typeof components[name] !== 'undefined') {
      return createElement(components[name], {
        key: name + component.id,
        ...component,
        ...rest,
      });
    }

    // The component doesn't exist in the codebase yet
    return createElement(
      () => <div>The component {name} has not been created yet.</div>,
      { key: name }
    );
  });
};

export default ContentBlocks;
