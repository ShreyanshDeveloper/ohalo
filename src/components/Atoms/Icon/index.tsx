import type { SVGIconName } from './SVGIcons';
import icons, { isIconName } from './SVGIcons';

export type IconProps = {
  name?: SVGIconName | Omit<string, SVGIconName>;
  small?: boolean;
  ariaHidden?: boolean;
  className?: string;
};

const Icon = ({
  name = 'placeholder',
  small = false,
  ariaHidden = false,
  className,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={small ? 15 : 24}
      height={small ? 15 : 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={ariaHidden}
    >
      {isIconName(name) ? icons[name] : icons['placeholder']}
    </svg>
  );
};

export default Icon;

// The challenge with this component is that the name property comes from the api as a type of string, however, the SVGIconName is a string union type made up of all the names of the SVG Icons. By allowing IconProps['name'] to be either a type of SVGIconName or string, we're enabling a string from the api query to be passed into the Icon on the name prop, by using the Omit method above, we're also retaining the autocomplete provided by the SVGIconName type for manual input of the name prop, and finally, by implementing the type guard isIconName(), we're ensuring that only a valid value is being passed into the icons object, otherwise a placeholder icon will be rendered.
