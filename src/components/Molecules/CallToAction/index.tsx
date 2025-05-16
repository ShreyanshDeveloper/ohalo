import { ContentImages_Asset } from '@typings/graphql';
import Link from 'next/link';

type Icon = {
  cards?: boolean;
  icon?: ContentImages_Asset[] &
    {
      src?: string | null;
      alt?: string | null;
    }[];
};

interface CallToActionProps extends Icon {
  title?: string;
  subHeading?: string;
  description?: string;
  link?: any;
}

const CallToAction = ({
  title,
  subHeading,
  description,
  icon,
  link,
  cards,
}: CallToActionProps) => {
  return (
    <div
      className={`${
        cards
          ? 'bg-white p-small text-center shadow-md transition-all duration-200 hover:-translate-y-xx-small hover:shadow-lg'
          : ''
      }`}
    >
      {!!icon?.[0] && (
        <img
          src={icon[0]?.url}
          alt={icon[0]?.alt ? icon[0]?.alt : ''}
          {...icon[0]}
        />
      )}
      {!!title && <h5>{title}</h5>}
      {!!subHeading && <p className='medium'>{subHeading}</p>}
      {!!description && <p>{description}</p>}
      {!!link &&
        (link?.href !== null ? (
          <Link {...link}>
            <a className='text-link small mt-large'>{link.text}</a>
          </Link>
        ) : null)}
    </div>
  );
};

export default CallToAction;

//! Not sure if we need this anymore.
