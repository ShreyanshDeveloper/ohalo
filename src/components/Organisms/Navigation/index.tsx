import { useQuery } from '@apollo/client';
import Button from '@components/Atoms/Button';
import SectionInner from '@components/Utilities/SectionInner';
import {
  GetGlobalSetHeaderDocument,
  GetMainNavigationDocument,
  MainNavigation_Node,
} from '@typings/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavItem from './NavItem';

type NavigationProps = {};

const Navigation = ({}: NavigationProps) => {
  const router = useRouter();
  const [navShowing, setNavShowing] = useState(false);
  const [groupHover, setGroupHover] = useState(true); // this state is added to enable the automatic hiding of the nav panel upon link selection.
  const [activeNavPanel, setActiveNavPanel] = useState(null);
  const { loading, error, data } = useQuery(GetMainNavigationDocument);
  const { loading: headerLoading, data: headerData } = useQuery(
    GetGlobalSetHeaderDocument
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setNavShowing(false);
      setGroupHover(true);
      setActiveNavPanel(null);
    });
  }, [router]);

  if (error) return <p>Error when loading.</p>;

  const { logo } =
    headerData?.globalSet?.__typename === 'header_GlobalSet' &&
    headerData?.globalSet;

  return (
    <header className='fixed top-0 z-50 w-full bg-white'>
      <SectionInner className='flex justify-end gap-small'>
        <div className='hidden gap-x-small lg:flex'>
          <div className='flex items-center gap-x-small'>
            <Link href='/contact'>
              <a className='small'>Contact</a>
            </Link>
            <a
              href='https://apply.workable.com/ohalo/'
              target='_blank'
              rel='noopener noferrer noreferrer'
              className='small'
            >
              Careers
            </a>

            {/* TODO Search commented out for now, but will be added back later */}
            {/* <button
              type='button'
              className='no-defaults flex items-center p-x-small hover:bg-tints-light-blue'
            >
              <span className='sr-only'>Search</span>

              <svg
                width='20'
                height='20'
                viewBox='0 0 24 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.5 14.5H14.71L14.43 14.23C15.41 13.09 16 11.61 16 10C16 6.41 13.09 3.5 9.5 3.5C5.91 3.5 3 6.41 3 10C3 13.59 5.91 16.5 9.5 16.5C11.11 16.5 12.59 15.91 13.73 14.93L14 15.21V16L19 20.99L20.49 19.5L15.5 14.5ZM9.5 14.5C7.01 14.5 5 12.49 5 10C5 7.51 7.01 5.5 9.5 5.5C11.99 5.5 14 7.51 14 10C14 12.49 11.99 14.5 9.5 14.5Z'
                  fill='black'
                />
              </svg>
            </button> */}
          </div>
          <div className='flex h-full items-start gap-x-small'>
            <Link href='/demo'>
              <a className='button medium m-0 bg-black px-small py-x-small text-x-small text-white transition-colors duration-200 hover:bg-primary' style={{ fontSize: '0.824rem' }}>
                Book a Demo
              </a>
            </Link>
          </div>
        </div>
      </SectionInner>
      <div className='shadow-md'>
        <SectionInner className='flex items-end justify-between gap-medium'>
          <div className='flex w-full items-center justify-between lg:w-auto lg:items-end'>
            <Link href='/'>
              <a className='flex max-w-[140px] md:max-w-[170px]'>
                {!headerLoading && !!logo?.length ? (
                  <img alt='Ohalo Logo' {...logo[0]} priority />
                ) : (
                  <img
                    src='/logo.jpg'
                    width={170}
                    height={79}
                    alt='Ohalo Logo'
                    priority
                  />
                )}
              </a>
            </Link>

            <div className='flex lg:hidden'>
              {/* TODO Search commented out for now, but will be added back later */}
              {/* <button className='no-defaults transition-colors duration-200 hover:bg-tints-light-blue'>
                  <span className='sr-only'>Search</span>
                  <svg
                    width='50'
                    height='50'
                    viewBox='0 0 52 53'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M29.5 28.5H28.71L28.43 28.23C29.41 27.09 30 25.61 30 24C30 20.41 27.09 17.5 23.5 17.5C19.91 17.5 17 20.41 17 24C17 27.59 19.91 30.5 23.5 30.5C25.11 30.5 26.59 29.91 27.73 28.93L28 29.21V30L33 34.99L34.49 33.5L29.5 28.5ZM23.5 28.5C21.01 28.5 19 26.49 19 24C19 21.51 21.01 19.5 23.5 19.5C25.99 19.5 28 21.51 28 24C28 26.49 25.99 28.5 23.5 28.5Z'
                      fill='black'
                    />
                  </svg>
                </button> */}
              <button
                className='no-defaults transition-colors duration-200'
                onClick={() => {
                  setNavShowing(!navShowing);
                  setActiveNavPanel(null);
                }}
              >
                <span className='sr-only'>Menu</span>
                <span className='relative block h-[50px] w-[50px]'>
                  <span
                    className={`absolute left-[17px] top-[20px] block h-[2px] w-[18px] bg-black ${
                      navShowing ? 'translate-y-[5px] -rotate-45' : ''
                    } origin-center transition-transform duration-200`}
                  />
                  <span
                    className={`absolute left-[17px] top-[25px] block h-[2px] w-[18px] bg-black ${
                      navShowing ? 'opacity-0' : ''
                    } transition-opacity duration-200`}
                  />
                  <span
                    className={`absolute left-[17px] top-[30px] block h-[2px] w-[18px] bg-black ${
                      navShowing ? 'translate-y-[-5px] rotate-45' : ''
                    } origin-center transition-transform duration-200`}
                  />
                </span>
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <nav
              className={`absolute left-0 -z-10 w-screen translate-y-full overflow-y-scroll bg-white transition-transform duration-500 ease-in-out md:overflow-auto lg:static lg:z-auto lg:h-auto lg:w-full lg:transform-none ${
                navShowing ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <ul className='flex flex-col bg-white lg:flex-row lg:justify-end'>
                {data?.navigationNodes.map((navigationNode) => {
                  const { id, title, typeLabel, element, newWindow, children } =
                    navigationNode?.__typename === 'mainNavigation_Node' &&
                    navigationNode;
                  return (
                    <NavItem
                      key={id}
                      id={id}
                      label={title}
                      href={element?.uri || null}
                      newWindow={newWindow || false}
                      typeLabel={typeLabel}
                      itemChildren={children as MainNavigation_Node[]}
                      activeNavPanel={activeNavPanel === id}
                      setActiveNavPanel={setActiveNavPanel}
                      setGroupHover={setGroupHover}
                      groupHover={groupHover}
                    />
                  );
                })}
              </ul>
              <div className='gap-x-small divide-y px-medium pb-medium lg:hidden'>
                <Link href='/contact'>
                  <a className='block py-small'>Contact</a>
                </Link>
                <a
                  href='https://apply.workable.com/ohalo/'
                  target='_blank'
                  rel='noopener noferrer noreferrer'
                  className='block py-small'
                >
                  Careers
                </a>
                <div>
                  <Button href='/demo' label='Request a meeting' />
                </div>
              </div>
            </nav>
          )}
        </SectionInner>
      </div>
    </header>
  );
};

export default Navigation;
