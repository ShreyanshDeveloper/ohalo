import { useQuery } from '@apollo/client';
import { GetFooterNavigationDocument } from '@typings/graphql';
import Link from 'next/link';

const FooterNavigation = () => {
  const { loading, error, data } = useQuery(GetFooterNavigationDocument);

  if (error) return <p>Error when loading.</p>;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {data.navigationNodes.map(({ id, title, children }) => (
        <div key={id}>
          <p className='mb-small'>{title}</p>
          <ul className='small'>
            {children.map(({ id, href, title, newWindow }) => {
              // Replace "dogshare.host4india.in/ohalo/web" with "24livehosts.com:3000"
              const updatedHref = href.replace(
                'https://cms.ohalo.co/web/',
                process.env.NEXT_PUBLIC_FRONT_BASE_URL || ''
              );

              return (
                <li key={id} className='mb-xx-small'>
                  <Link href={updatedHref} target={newWindow === '1' ? '_blank' : '_self'}>
                    <a className='text-small'>{title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterNavigation;
