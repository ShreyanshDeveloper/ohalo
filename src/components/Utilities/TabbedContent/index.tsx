import Button from '@components/Atoms/Button';
import { TabbedContentFragment } from '@typings/graphql';
import React, { useCallback, useRef, useState } from 'react';

// interface tab {
//   label: string;
//   content: React.ReactNode;
// }

export type TabbedContentProps = {
  tabs: TabbedContentFragment['tabs'];
};

const TabbedContent = ({ tabs }: TabbedContentProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const buttonKey = e.key;

    if (buttonKey === 'ArrowLeft' && activeTab > 0) {
      setActiveTab(activeTab - 1);
    } else if (buttonKey === 'ArrowRight' && activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <div>
      <div
        role='tablist'
        aria-label='Sample Tabs'
        className='mb-medium gap-xx-small sm:mb-x-large md:flex'
      >
        {tabs.map(({ tabLabel }, index) => (
          <Tab
            key={`tab-${tabLabel}`}
            label={tabLabel}
            active={activeTab === index || (index === 0 && activeTab === -1)}
            index={index}
            setActiveTab={setActiveTab}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </div>

      {tabs.map(({ id, logo, content, title, button, image }, index) => {
        // destructure logos_Asset properties
        const {
          alt: logoAlt,
          src: logoSrc,
          ...restOfLogo
        } = logo?.length && logo?.[0]?.__typename === 'logos_Asset' && logo[0];

        // destructure videos_Asset or contentImages_Asset properties
        const { src: imageSrc, ...restOfImage } =
          image?.length &&
          (image?.[0]?.__typename === 'videos_Asset' ||
            image?.[0]?.__typename === 'contentImages_Asset') &&
          image[0];

        return (
          <div
            key={id}
            id={`tabpanel-${index}`}
            role='tabpanel'
            tabIndex={0}
            className={`items-center gap-medium md:grid-cols-2 ${
              activeTab === index ? 'grid' : 'hidden'
            }`}
          >
            <div className='flex flex-col items-start justify-start'>
              {logo?.length && (
                <img alt={logoAlt} src={logoSrc} {...restOfLogo} />
              )}
              <h3 className={`h4 ${logo?.length ? 'mt-medium' : ''}`}>
                {title}
              </h3>
              <p className='large'>{content}</p>
              {!!button?.href && <Button label={button.text} {...button} />}
            </div>
            <div>
              <img alt='' src={imageSrc} {...restOfImage} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

type TabProps = {
  label: string;
  active: boolean;
  index: number;
  handleKeyDown: (_e: React.KeyboardEvent<HTMLButtonElement>) => void;
  setActiveTab: (_index: number) => void;
};

const Tab = ({
  label,
  active,
  index,
  handleKeyDown,
  setActiveTab,
}: TabProps) => {
  const tabRef = useRef(null);

  // useEffect(() => {
  //   if (active && tabRef.current) {
  //     tabRef.current.focus();
  //   }
  // }, [active]);

  const handleClick = useCallback(() => {
    setActiveTab(index);
  }, [index, setActiveTab]);

  return (
    <button
      type='button'
      ref={tabRef}
      role='tab'
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      aria-controls={`tabpanel-${index}`}
      className={`no-defaults relative w-full grow px-large py-small text-center text-white duration-100 after:absolute after:bottom-0 after:left-0 after:w-full after:transition-all ${
        active
          ? 'font-medium after:h-[5px] after:bg-secondary-primary'
          : 'after:h-[1px] after:bg-white'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  );
};

export default TabbedContent;
