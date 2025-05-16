import { useQuery } from '@apollo/client';
import ArrowIcon from '@components/Atoms/Icon/ArrowIcon';
import SectionInner from '@components/Utilities/SectionInner';
import {
  GetGlobalSetHeaderDocument,
  MainNavigation_Node,
  NavigationBlocks_Default_Entry,
} from '@typings/graphql';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

interface Link extends LinkProps {
  linkLabel?: string;
  text?: string;
}

interface ParentLink extends MainNavigation_Node {
  linkLabel?: string;
  links?: Link[];
}

interface ColumnContent {
  title: string;
  text: string;
  link?: Omit<Link, 'text'>;
}

export type NavPanelProps = {
  items: ParentLink[] | Link[];
  hasChildren?: boolean;
  leftContent?: ColumnContent;
  rightContent?: ColumnContent;
  setGroupHover: Dispatch<SetStateAction<boolean>>;
  beforeContent?: MainNavigation_Node;
  afterContent?: MainNavigation_Node;
  isActiveNavPanel?: boolean;
  setActiveNavPanel?: Dispatch<SetStateAction<any>>;
};

const NavPanel = ({
  items,
  hasChildren = false,
  beforeContent,
  afterContent,
  isActiveNavPanel,
  setActiveNavPanel,
  setGroupHover,
}: NavPanelProps) => {
  const [activeSubNav, setActiveSubNav] = useState(
    (items?.[0] as MainNavigation_Node)?.id || null
  );

  const handleParentButtonOnFocus = (subNavIndex: number) => {
    setActiveSubNav(subNavIndex.toString());
  };

  const hasBeforeContent = beforeContent !== null;
  const hasAfterContent = afterContent !== null;

  return (
    <div
      className={`lg:group-focus-within:left-0-- lg:group-focus-within:opacity-100-- absolute top-0 z-10 h-full w-full bg-white transition-opacity duration-300 lg:top-full lg:-z-10 lg:group-hover:left-0 lg:group-hover:opacity-100 ${
        isActiveNavPanel
          ? 'left-0 opacity-100 lg:-left-[999999px] lg:opacity-0'
          : '-left-[999999px] opacity-0'
      }`}
    >
      <SectionInner className='mx-auto bg-white px-0 lg:grid lg:grid-cols-4 lg:shadow-md'>
        <button
          type='button'
          onClick={() => setActiveNavPanel(null)}
          className='medium !mt-0 flex w-full items-center gap-small bg-black py-small px-normal text-left text-white lg:hidden'
        >
          <svg
            className='rotate-180 lg:hidden'
            width='23'
            height='14'
            viewBox='0 0 23 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.3235 1.17578L21.5 7.35225L15.3235 13.5287'
              stroke='white'
            />
            <path d='M21.1912 7.35205L0.5 7.35205' stroke='white' />
          </svg>
          Back
        </button>

        {hasBeforeContent || hasChildren ? (
          <div className='flex flex-col-reverse bg-tints-light-blue lg:flex-col lg:divide-y-8 lg:divide-white'>
            {hasChildren && (
              <div>
                {items.map((item) => {
                  const { id, children, title } = item as MainNavigation_Node;
                  if (children.length) {
                    return title ? (
                      <ParentButton
                        key={id}
                        index={Number(id)}
                        label={title}
                        active={activeSubNav === id}
                        onFocus={handleParentButtonOnFocus}
                      />
                    ) : null;
                  }
                })}
              </div>
            )}

            {!!hasBeforeContent && (
              <div className='py-normal px-normal md:py-large'>
                <p className='h5'>{beforeContent.title}</p>
                <small>
                  {
                    (beforeContent.element as NavigationBlocks_Default_Entry)
                      .plainText
                  }
                </small>
                {(beforeContent.element as NavigationBlocks_Default_Entry).linkType?.url ? (
				  <p className="pt-small">
					<Link
					  href={
						(
						  beforeContent.element as NavigationBlocks_Default_Entry
						).linkType.url.replace('https://cms.ohalo.co/web/', process.env.NEXT_PUBLIC_FRONT_BASE_URL || '')
					  }
					>
					  <a className="text-link">
						{(
						  beforeContent.element as NavigationBlocks_Default_Entry
						).linkType.text
						  ? (
							  beforeContent.element as NavigationBlocks_Default_Entry
							).linkType.text
						  : 'Learn more'}
					  </a>
					</Link>
				  </p>
				) : null}
              </div>
            )}
          </div>
        ) : null}

        {items ? (
          hasChildren ? (
            items.map((item) => {
              const { id, children } = item as MainNavigation_Node;
              if (children.length) {
                return (
                  <NavLinkList
                    key={id}
                    links={children}
                    hasAfterContent={hasAfterContent}
                    active={activeSubNav === id}
                    setGroupHover={setGroupHover}
                  />
                );
              }
            })
          ) : (
            <NavLinkList
              links={items}
              hasAfterContent={hasAfterContent}
              active
              setGroupHover={setGroupHover}
            />
          )
        ) : null}

        {!!hasAfterContent && (
          <div className='bg-tints-light-blue px-normal py-normal lg:py-large'>
            <p className='h5'>{afterContent.title}</p>
            <small>
              {
                (afterContent?.element as NavigationBlocks_Default_Entry)
                  ?.plainText
              }
            </small>
            {(afterContent?.element as NavigationBlocks_Default_Entry)?.linkType
              ?.url ? (
              <Link
                href={
                  (afterContent?.element as NavigationBlocks_Default_Entry)
                    .linkType.url
                }
              >
                <a className='mt-small block underline underline-offset-4'>
                  {(afterContent?.element as NavigationBlocks_Default_Entry)
                    .linkType.text
                    ? (afterContent?.element as NavigationBlocks_Default_Entry)
                        .linkType.text
                    : 'Learn more'}
                </a>
              </Link>
            ) : null}
          </div>
        )}
      </SectionInner>
    </div>
  );
};

const NavLinkList = ({
  links,
  hasBeforeContent,
  hasAfterContent,
  active,
  setGroupHover,
}: {
  links?: ParentLink[] | Link[];
  hasBeforeContent?: boolean;
  hasAfterContent?: boolean;
  active?: boolean;
  setGroupHover?: Dispatch<SetStateAction<boolean>>;
}) => {
  // Instead of prop drilling, usequery here to get data needed
  const { data: headerData } = useQuery(GetGlobalSetHeaderDocument);

  const { navigationType } =
    headerData?.globalSet?.__typename === 'header_GlobalSet' &&
    headerData?.globalSet;

  let classList = '';

  // Default is RowsWithDescription setting
  switch (navigationType) {
    case 'columnsWithoutDescription':
      classList = clsx(
        'divide-y px-normal lg:gap-x-normal lg:gap-y-[24px] lg:divide-none lg:py-large',
        hasBeforeContent && 'col-start-2',
        hasAfterContent
          ? 'col-span-2 grid-flow-col grid-rows-7'
          : 'col-span-3 grid-flow-col grid-rows-7',
        active ? 'grid' : 'hidden'
      );
      break;
    default:
      classList = clsx(
        'divide-y px-normal lg:gap-x-normal lg:gap-y-[24px] lg:divide-none lg:py-large',
        hasBeforeContent && 'col-start-2',
        hasAfterContent
          ? 'col-span-2 lg:grid-cols-2'
          : 'col-span-3 lg:grid-cols-3',
        active ? 'grid' : 'hidden'
      );
  }

  return (
    <ul className={classList}>
      {links.map((link) => {
        return (
          <NavLink
            key={link.id}
            navigationType={navigationType}
            {...link}
            setGroupHover={setGroupHover}
          />
        );
      })}
    </ul>
  );
};

const NavLink = ({
  title,
  url,
  element,
  newWindow,
  plainText,
  setGroupHover,
  navigationType,
}) => {
  return element?.uri || url ? (
    <li>
      <Link href={element?.uri ? '/' + element.uri : url}>
        <a
          target={newWindow === '1' ? '_blank' : '_self'}
          onClick={() => setGroupHover(false)}
          className='block py-small text-black transition-colors duration-200 hover:text-primary focus:text-primary lg:py-0'
        >
          <p className='medium text-normal'>{title}</p>
          {/* If has text and nav type isn't set to columns */}
          {!!plainText && navigationType !== 'columnsWithoutDescription' && (
            <small className='mt-x-small hidden text-black lg:block'>
              {plainText}
            </small>
          )}
        </a>
      </Link>
    </li>
  ) : null;
};

type ParentButtonProps = {
  active: boolean;
  index: number;
  label: string;
  onFocus: (_index: number) => void;
};

const ParentButton = ({ active, label, index, onFocus }: ParentButtonProps) => {
  return (
    <button
      className={`medium !mt-0 flex w-full justify-between p-normal text-left hover:bg-black hover:text-white ${
        active ? 'bg-black text-white' : 'bg-tints-blue'
      }`}
      aria-controls={`subNav-${index}`}
      // onFocus={() => onFocus(index)}
      onMouseOver={() => onFocus(index)}
      onClick={() => onFocus(index)}
    >
      {label}
      <ArrowIcon />
    </button>
  );
};

export default NavPanel;
