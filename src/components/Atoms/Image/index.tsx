import NextImage, { ImageProps as NextImageProps } from 'next/image';

import type {
  ContentImages_Asset,
  FeatureImages_Asset,
  LargeImages_Asset,
  Logos_Asset,
  SvgIcons_Asset,
  Videos_Asset,
} from '@typings/graphql';

export type ImageProps = (
  | Partial<Logos_Asset>
  | Partial<ContentImages_Asset>
  | Partial<FeatureImages_Asset>
  | Partial<LargeImages_Asset>
  | Partial<Videos_Asset>
  | Partial<SvgIcons_Asset>
) &
  Partial<NextImageProps> & { ariaHidden?: boolean; __typename?: string };

const Image = ({
  src,
  alt,
  width,
  height,
  layout,
  __typename,
  focalPoint: _focalPoint,
  ...img
}: ImageProps) => {
  const { ariaHidden, ...rest } = img;

  if (!src) {
    return null;
  }

  return !(src as string).includes('.mp4') ? (
    <img
      src={src}
      alt={alt}
      layout={layout}
      width={layout !== 'fill' && width}
      height={layout !== 'fill' && height}
      aria-hidden={ariaHidden || false}
      {...rest}
    />
  ) : (
    <video src={src as string} loop controls={false} autoPlay playsInline muted>
      <source src={src as string} type='video/mp4' />
    </video>
  );
};

export default Image;

// focalPoint is being pulled out of the spread as it was causing illegal DOM attribute warnings.
