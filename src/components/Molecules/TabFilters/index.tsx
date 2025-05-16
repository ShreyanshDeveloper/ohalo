import Icon from '@components/Atoms/Icon';
import SectionInner from '@components/Utilities/SectionInner';
import { useState } from 'react';

type TabFiltersProps = {
  // tabs?: {
  //   __typename?: 'types_Category';
  //   id?: string;
  //   slug?: string;
  //   title?: string;
  // }[];
  tabs?: Array<
    | {
        __typename?: 'topics_Category';
        id?: string | null;
        slug?: string | null;
        title?: string | null;
      }
    | {
        __typename?: 'types_Category';
        id?: string | null;
        slug?: string | null;
        title?: string | null;
      }
    | null
  > | null;
  currentTab: string;
  handleClick: (_slug: string) => void;
};

const TabFilters = ({ tabs, currentTab, handleClick }: TabFiltersProps) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    !!tabs?.length && (
      <div>
        <SectionInner>
          <div className='relative mb-medium flex flex-col md:mb-0 md:flex-row md:gap-medium'>
            <button
              className='no-defaults mb-[2px] flex justify-between border-b-4 border-primary py-small text-left md:hidden'
              onClick={() => {
                setFilterOpen(!filterOpen);
              }}
            >
              {tabs.find((type) => type.slug === currentTab)?.title}
              <Icon name='chevron' />
            </button>

            <div
              className={`absolute top-full z-10 flex w-full flex-col divide-gray-6 bg-white shadow-md md:relative md:flex-row md:gap-medium md:divide-y-0 md:overflow-x-auto md:bg-white md:shadow-none ${
                filterOpen ? 'flex' : 'hidden md:flex'
              }`}
            >
              {tabs.map(({ id, title, slug }) => (
                <button
                  key={id}
                  className={`transition-color no-defaults relative mt-0 grow-0 whitespace-nowrap p-small text-left duration-200 md:p-medium md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-0 md:after:w-full md:after:transition-all md:after:duration-100 md:hover:after:h-[4px] md:hover:after:bg-black md:focus:after:h-[4px] ${
                    currentTab === slug
                      ? 'bg-tints-light-blue md:bg-white md:after:h-[4px] md:after:bg-primary md:hover:after:bg-primary'
                      : ''
                  }`}
                  onClick={() => {
                    handleClick(slug);
                    setFilterOpen(false);
                  }}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </SectionInner>
      </div>
    )
  );
};

export default TabFilters;
