import {
  MainNavigation_Node,
  NavigationBlocks_Default_Entry,
} from '@typings/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import NavPanel, { NavPanelProps } from './NavPanel';

type NavItemProps = Partial<NavPanelProps> & {
  label: string;
  setGroupHover: Dispatch<SetStateAction<boolean>>;
  groupHover: boolean;
  id?: string;
  href?: string;
  newWindow?: MainNavigation_Node['newWindow'] | boolean;
  typeLabel?: MainNavigation_Node['typeLabel'];
  itemChildren?: MainNavigation_Node[];
  activeNavPanel?: boolean;
  setActiveNavPanel?: Dispatch<SetStateAction<any>>;
};

const NavItem = ({
  id,
  label,
  itemChildren,
  activeNavPanel,
  setActiveNavPanel,
  typeLabel,
  href,
  newWindow,
  groupHover,
  setGroupHover,
}: NavItemProps) => {
  const router = useRouter();

  // First item has element which is navigationBlocks entry
  const beforeContent =
    (itemChildren?.[0]?.element as NavigationBlocks_Default_Entry)
      ?.__typename === 'navigationBlocks_default_Entry'
      ? itemChildren[0]
      : null;

  // Not only item AND last item has element which is navigationBlocks entry
  const afterContent =
    itemChildren?.length !== 1 &&
    (
      itemChildren?.[itemChildren.length - 1]
        ?.element as NavigationBlocks_Default_Entry
    )?.__typename === 'navigationBlocks_default_Entry'
      ? itemChildren[itemChildren.length - 1]
      : null;

  const navItems = itemChildren.filter(
    ({ element }) =>
      (element as NavigationBlocks_Default_Entry)?.__typename !==
      'navigationBlocks_default_Entry'
  );

  return (
    <li className={`${groupHover ? 'group block' : 'block'}`}>
      {typeLabel === 'Passive' ? (
        <button
          type='button'
          className='transition-color no-defaults relative mt-0 mb-xx-small flex w-full items-center justify-between gap-xx-small bg-tints-light-blue p-medium font-medium duration-200 hover:bg-tints-blue lg:mb-0 lg:bg-white lg:p-small lg:font-light lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-0 lg:after:w-full lg:after:bg-black lg:after:transition-all lg:after:duration-100 lg:hover:bg-white lg:group-focus-within:after:h-[4px] lg:group-hover:after:h-[4px]'
          onClick={() => setActiveNavPanel(id)}
        >
          {label}

          {/* Chevron */}
          <svg
            className='hidden lg:block'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M18 9L11.5 15L5 9' stroke='black' strokeWidth='2' />
          </svg>

          {/* Arrow */}
          <svg
            className='transition-transform duration-200 group-hover:-translate-x-x-small lg:hidden'
            width='23'
            height='14'
            viewBox='0 0 23 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.3235 1.17578L21.5 7.35225L15.3235 13.5287'
              stroke='black'
            />
            <path d='M21.1912 7.35205L0.5 7.35205' stroke='black' />
          </svg>
        </button>
      ) : (
        <Link href={'/' + href}>
          <a
            className={`transition-color no-defaults relative mt-0 mb-xx-small flex w-full items-center justify-between gap-xx-small bg-tints-light-blue p-medium font-medium duration-200 hover:bg-tints-blue lg:mb-0 lg:bg-white lg:p-small lg:font-light lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-0 lg:after:w-full lg:after:transition-all lg:after:duration-100 lg:hover:bg-white lg:group-focus-within:after:h-[4px] lg:group-hover:after:h-[4px] ${
              router.asPath === '/' + href
                ? 'lg:after:h-[4px] lg:after:bg-primary'
                : 'lg:after:bg-black'
            }`}
            target={newWindow === '1' ? '_blank' : '_self'}
          >
            {label}
          </a>
        </Link>
      )}

      {!!navItems?.length && (
        <NavPanel
          isActiveNavPanel={activeNavPanel}
          setActiveNavPanel={setActiveNavPanel}
          items={navItems}
          hasChildren={!!itemChildren?.find(({ children }) => children.length)}
          beforeContent={beforeContent}
          afterContent={afterContent}
          setGroupHover={setGroupHover}
        />
      )}
    </li>
  );
};

export default NavItem;
