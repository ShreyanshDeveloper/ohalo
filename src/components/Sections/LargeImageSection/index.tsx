import { LargeImageSectionFragment } from '@typings/graphql';

const LargeImageSection = ({ image }: LargeImageSectionFragment) => {
  const { alt, src, ...restOfImage } =
    image && image?.[0]?.__typename === 'largeImages_Asset' && image?.[0];

  return (
    <div className='relative h-[500px] w-full'>
      {!!image?.length && (
        <img
          src={src || '/placeholder.jpg'}
          alt={alt || ''}
          {...restOfImage}
          layout='fill'
          objectFit='cover'
        />
      )}
    </div>
  );
};

export default LargeImageSection;
