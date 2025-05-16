import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes } from 'react';
import Icon from '../Icon';
import ArrowIcon from '../Icon/ArrowIcon';

export type ButtonProps = Partial<LinkProps> & {
  label?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | string;
  icon?: 'before' | 'after';
  disabled?: boolean;
  iconOnly?: boolean;
  small?: boolean;
  noMargin?: boolean;
  priority?: 'primary' | 'secondary' | 'tertiary';
};

const Button = ({
  label,
  icon = undefined,
  type = 'button',
  priority = 'primary',
  disabled = false,
  iconOnly = false,
  small = false,
  noMargin = false,
  href,
}: ButtonProps) => {

  const updatedHref = href?.replace('https://cms.ohalo.co/web/', process.env.NEXT_PUBLIC_FRONT_BASE_URL || '');

  // Define priority classes
  let priorityClasses = '';
  if (priority === 'primary') {
    priorityClasses = 'text-white bg-black disabled:bg-gray-5';
  } else if (priority === 'secondary') {
    priorityClasses =
      'border border-solid border-black bg-transparent text-black disabled:border-gray-2 hover:enabled:text-white active:enabled:text-white';
  } else if (priority === 'tertiary') {
    priorityClasses = 'text-white bg-white';
  }

  const iconOnlyClasses = iconOnly
    ? 'rounded-full hover:enabled:border-primary active:enabled:border-black'
    : '';

  const noMarginClasses = noMargin ? 'm-0' : '';

  return !href ? (
    <button
      type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
      disabled={disabled}
      title={label}
      className={`${noMarginClasses} ${priorityClasses} ${iconOnlyClasses} group flex items-center gap-xx-small font-medium leading-[1rem] transition-all duration-200 ease-in-out hover:enabled:bg-primary active:enabled:bg-black disabled:text-gray-2 ${
        small
          ? `py-x-small text-x-small ${iconOnly ? 'px-x-small' : 'px-small'}`
          : `py-small ${iconOnly ? 'px-small' : 'px-medium'}`
      }`}
    >
      {/* Place icon before label - displays if onlyIcon button */}
      {(iconOnly || icon === 'before') && <Icon small={small} ariaHidden />}

      {/* Label */}
      <span className={`${iconOnly ? 'sr-only' : ''}`}>{label}</span>

      {/* Place icon after label */}
      {icon === 'after' && <Icon small={small} ariaHidden />}

      {/* Arrow icon - remove if iconOnly button */}
      {!iconOnly && (
        <ArrowIcon
          className={
            !disabled
              ? `${
                  priority === 'secondary' &&
                  'text-primary group-hover:text-white group-active:text-white'
                } 'transition-transform shrink-0 duration-100 ease-in-out group-hover:translate-x-xx-small`
              : ''
          }
        />
      )}
    </button>
  ) : (
    <Link href={updatedHref}>
      <a
        title={label}
        className={`${noMarginClasses} ${priorityClasses} ${iconOnlyClasses} button group inline-flex items-center gap-xx-small font-medium leading-[1rem] transition-all duration-200 ease-in-out hover:bg-primary ${
          small
            ? `py-x-small text-x-small ${iconOnly ? 'px-x-small' : 'px-small'}`
            : `py-small ${iconOnly ? 'px-small' : 'px-medium'}`
        }`}
      >
        {/* Place icon before label - displays if onlyIcon button */}
        {(iconOnly || icon === 'before') && <Icon small={small} ariaHidden />}

        {/* Label */}
        <span className={`${iconOnly ? 'sr-only' : ''}`}>{label}</span>

        {/* Place icon after label */}
        {icon === 'after' && <Icon small={small} ariaHidden />}

        {/* Arrow icon - remove if iconOnly button */}
        {!iconOnly && (
          <ArrowIcon
            className={
              !disabled
                ? `${
                    priority === 'secondary' &&
                    'text-primary group-hover:text-white group-active:text-white'
                  } 'transition-transform shrink-0 duration-100 ease-in-out group-hover:translate-x-xx-small`
                : ''
            }
          />
        )}
      </a>
    </Link>
  );
};

export default Button;
