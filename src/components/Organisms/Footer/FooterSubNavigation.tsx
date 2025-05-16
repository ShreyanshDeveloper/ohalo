import { useQuery } from '@apollo/client';
import { GetFooterSubNavigationDocument } from '@typings/graphql';
import Link from 'next/link';

const FooterSubNavigation = () => {
  const { loading, error, data } = useQuery(GetFooterSubNavigationDocument);

  if (error) return <p>Error when loading.</p>;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ul className="flex flex-wrap justify-center gap-medium lg:gap-x-large">
	  {data.navigationNodes.map(({ id, title, href, newWindow }) => {
		const updatedHref = href.replace(
		  'https://cms.ohalo.co/web/',
		  process.env.NEXT_PUBLIC_FRONT_BASE_URL || ''
		);

		return (
		  <li key={id} className="small">
			<Link href={updatedHref} target={newWindow === '1' ? '_blank' : '_self'}>
			  <a>{title}</a>
			</Link>
		  </li>
		);
	  })}
	</ul>
  );
};

export default FooterSubNavigation;
