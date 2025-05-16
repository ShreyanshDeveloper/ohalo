import { useQuery } from '@apollo/client';
import Icon from '@components/Atoms/Icon';
import FooterNavigation from '@components/Organisms/Footer/FooterNavigation';
import FooterSubNavigation from '@components/Organisms/Footer/FooterSubNavigation';
import SectionInner from '@components/Utilities/SectionInner';
import {
  GetGlobalSetFooterDocument,
  GetGlobalSetFooterQuery,
} from '@typings/graphql';

const Footer = () => {
  const { loading, error, data } = useQuery<
    GetGlobalSetFooterQuery & { globalSet?: { __typename: 'footer_GlobalSet' } }
  >(GetGlobalSetFooterDocument);

  if (error) return <p>Error when loading</p>;

  const { alt, src, ...restOfLogo } =
    data?.globalSet?.logo[0]?.__typename === 'logos_Asset' &&
    data?.globalSet?.logo[0];

  return (
    <footer className='md:section bg-black py-medium text-white'>
      <SectionInner>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='grid items-start gap-medium border-b border-solid border-white pb-large lg:grid-cols-6'>
              {!!data?.globalSet?.logo?.length && (
                <div className='max-w-[140px] pr-medium md:max-w-[170px]'>
                  <img alt={alt} src={src} {...restOfLogo} />
                </div>
              )}
              <div className='col-span-5 grid grid-cols-2 gap-medium md:grid-cols-5'>
                <FooterNavigation />
              </div>
            </div>
            <div className='grid items-center justify-center gap-medium pt-medium text-center md:justify-start lg:grid-cols-6 lg:text-left'>
              <p className='small leading-normal'>
                &copy; Ohalo {new Date().getFullYear()}
              </p>
              <div className='flex flex-wrap items-center justify-center gap-x-large gap-y-medium md:col-span-5 md:justify-between lg:gap-x-xx-large'>
                <FooterSubNavigation />

                {!!data?.globalSet?.socialLinks && (
                  <div className='flex flex-wrap justify-center gap-small'>
                    {Object.keys(data.globalSet.socialLinks[0]).map((key) => {
                      if (key === '__typename') return null;

                      const href = data.globalSet.socialLinks[0][key];
                      return (
                        !!href && (
                          <a
                            key={key}
                            className='transition-color flex h-[40px] w-[40px] items-center justify-center rounded-full border border-solid border-white duration-200 hover:bg-white hover:text-primary'
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <span className='sr-only'>{`${key} account`}</span>
                            <Icon name={key} small />
                          </a>
                        )
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </SectionInner>
    </footer>
  );
};

export default Footer;
