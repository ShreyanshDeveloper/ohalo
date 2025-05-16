import {
  Articles_Default_Entry,
  CaseStudies_Default_Entry,
} from '@typings/graphql';
import Link from 'next/link';

type EntriesCardProps = (Articles_Default_Entry | CaseStudies_Default_Entry) & {
  className?: string;
};

const EntriesCard = (props: EntriesCardProps) => {
  const {
    id,
    uri,
    title,
    sectionHandle,
    topics,
    featureImage,
    className,
    __typename,
  } = props;
  return (
    <div
      key={id}
      className={`w-full max-w-[350px] shrink-0 grow-0 sm:basis-1/2 md:basis-1/3 ${className}`}
    >
      <div className='relative h-full border bg-white'>
        <Link href={uri}>
          <a>
            {__typename === 'articles_default_Entry' && (
              <img
                alt={featureImage?.[0]?.alt ? featureImage[0].alt : ''}
                src={
                  featureImage?.[0]?.url ||
                  `/default-${props?.types?.[0]?.title?.toLowerCase()}.png`
                }
                width={featureImage?.[0]?.width ? featureImage[0].width : 350}
                height={
                  featureImage?.[0]?.height ? featureImage[0].height : 250
                }
                {...featureImage?.[0]}
              />
            )}
            {__typename === 'caseStudies_default_Entry' && (
              <img
                alt={featureImage?.[0]?.alt || ''}
                src={featureImage?.[0]?.url || '/default-caseStudies.png'}
                width={featureImage?.[0]?.width || 350}
                height={featureImage?.[0]?.height || 250}
                {...featureImage?.[0]}
              />
            )}
          </a>
        </Link>
        <div className='p-small'>
          <ul className='small mb-x-small flex divide-x'>
            <li className='px-xx-small leading-[1] first-of-type:pl-0'>
              <Link
                href={
                  sectionHandle === 'caseStudies'
                    ? '/resources?type=caseStudies'
                    : (props as Articles_Default_Entry)?.types?.[0]?.slug
                    ? `/resources?type=${
                        (props as Articles_Default_Entry)?.types[0].slug
                      }`
                    : ''
                }
              >
                <a className='hover:underline focus:underline'>
                  {sectionHandle === 'caseStudies'
                    ? 'Case Study'
                    : (props as Articles_Default_Entry)?.types?.[0]?.title
                    ? (props as Articles_Default_Entry)?.types[0].title
                    : ''}
                </a>
              </Link>
            </li>
            {!!topics &&
              topics.map(({ id, title }) => (
                <li
                  key={id}
                  className='px-xx-small leading-[1] first-of-type:pl-0'
                >
                  {title}
                </li>
              ))}
          </ul>
          <Link href={uri}>
            <a>
              <h3 className='h5'>{title}</h3>
            </a>
          </Link>
          {/* {!!shortDescription && <p>{shortDescription}</p>} */}
          <Link href={uri}>
            <a className='small text-link mt-medium'>Learn more</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntriesCard;
