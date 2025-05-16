import { ImageProps } from '@components/Atoms/Image';
import SectionLabel from '@components/Atoms/SectionLabel';

export type TitleGroupProps = {
  isColumnTitleGroup?: boolean;
  label?: string | null;
  title?: string | null;
  subtitle?: string | null;
  logo?: ImageProps[];
};

const TitleGroup = ({
  isColumnTitleGroup,
  label,
  title,
  subtitle,
  logo,
}: TitleGroupProps) => {
  const hasContent = !!(label || title || subtitle);
  const hasTitles = !!(title || subtitle);
  const bottomSpacingClass =
    isColumnTitleGroup && hasTitles ? 'mb-medium' : hasTitles ? 'mb-large' : '';

  const { src, alt, ...restOfLogo } = logo?.length && logo?.[0];

  return hasContent ? (
    <div className={`max-w-prose ${bottomSpacingClass}`}>
      {!!label && <SectionLabel label={label} />}

      {!!logo?.length && <img src={src} alt={alt} {...restOfLogo} />}

      {!!title && (isColumnTitleGroup ? <h3>{title}</h3> : <h2>{title}</h2>)}

      {!!subtitle && (
        <p className={`${isColumnTitleGroup ? '' : 'large'}`}>{subtitle}</p>
      )}
    </div>
  ) : null;
};

export default TitleGroup;
