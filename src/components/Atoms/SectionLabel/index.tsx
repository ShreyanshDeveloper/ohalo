import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface SectionLabelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  label: string;
  color?: 'white' | 'primary' | 'black';
}
const SectionLabel = ({
  label,
  color,
  className,
  ...rest
}: SectionLabelProps) => {
  const cx = clsx([
    `mb-x-small block uppercase ${color ? 'text-' + color : ''}`,
    className,
  ]);
  return (
    <small className={cx} {...rest}>
      {label}
    </small>
  );
};

export default SectionLabel;
