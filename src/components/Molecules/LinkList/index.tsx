import { Links } from '@typings/components';
import { LinkField_Link } from '@typings/graphql';
import ArrowIcon from '../../Atoms/Icon/ArrowIcon';

type LinkListProps = {
  linkList: {
    link: Links;
  }[];
  small?: boolean;
  iconLeft?: boolean;
};

const LinkList = ({
  linkList,
  small = false,
  iconLeft = false,
}: LinkListProps) => {
  return (
    <ul className='divide-y divide-solid border-b border-solid'>
      {linkList.map(({ link }, i) => {
        const { url, text, ariaLabel, target } = link as LinkField_Link;
        return (
          <li key={i}>
            <a
              href={url}
              className={`${
                small ? '' : 'h3'
              } mb-0 flex items-center justify-between gap-small py-small transition-colors duration-100 ease-in-out hover:text-primary`}
              target={target}
              aria-label={ariaLabel}
            >
              {!!iconLeft && <LinkIcon />}
              <span className='grow'>{text}</span>
              {!iconLeft && <LinkIcon />}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const LinkIcon = () => <ArrowIcon className='shrink-0' />;

export default LinkList;
