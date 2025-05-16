import { FaqsSectionFragment } from '@typings/graphql';
import parse from 'html-react-parser';
import { useState } from 'react';

const Accordion = ({ items }: Pick<FaqsSectionFragment, 'items'>) => {
  const [visibleAccordion, setVisibleAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (index === visibleAccordion) {
      setVisibleAccordion(null);
    } else {
      setVisibleAccordion(index);
    }
  };

  return (
    <div>
      {items.map((item, index) => {
        const { content, title } =
          item?.__typename === 'faqs_default_Entry' && item;
        const active = visibleAccordion === index;
        return (
          <div key={title} className='border-b'>
            <button
              className='no-defaults mt-xx-small flex w-full items-center justify-between pt-small pb-x-small'
              onClick={() => handleAccordionClick(index)}
            >
              <p className='h6 my-0'>{title}</p>
              <span className='relative p-x-small'>
                <span
                  className={`absolute top-[50%] left-[50%] block h-[10px] w-[2px] translate-y-[-50%] translate-x-[-50%] bg-primary transition-all duration-500 ${
                    active ? 'rotate-90' : ''
                  }`}
                ></span>
                <span
                  className={`translate-colors absolute top-[50%] left-[50%] block h-[2px] w-[10px] translate-y-[-50%] translate-x-[-50%] bg-primary duration-500`}
                ></span>
              </span>
            </button>
            <div className={`py-small ${active ? 'block' : 'hidden'}`}>
              {!!content && parse(content)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
