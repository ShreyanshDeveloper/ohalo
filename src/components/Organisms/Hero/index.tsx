import SectionLabel from '@components/Atoms/SectionLabel';
import ButtonGroup from '@components/Molecules/ButtonGroup';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { ArticleHeroFragment, HeroFragment } from '@typings/graphql';
import parse from 'html-react-parser';

type HeroProps =
  | Partial<HeroFragment>
  | (Partial<ArticleHeroFragment> & { sectionBackground?: string });

const Hero = (props: HeroProps) => {
  const hasAssetRight = props?.contentImage?.length;

  // destructure contentImage keys to inherit typesafety
  const contentImage = props?.contentImage?.[0];

  const {
    alt: content_image_alt,
    src: content_image_src,
    ...restOfContentImage
  } = contentImage?.__typename === 'contentImages_Asset' && contentImage;

  // destructructure logoImage Keys to inherit typesafety
  const {
    alt: logoAlt,
    src: logoSrc,
    ...restOfLogo
  } = props?.__typename === 'hero_hero_BlockType' &&
  props?.logo?.[0]?.__typename === 'logos_Asset' &&
  props.logo?.[0];

  // destructure image properties which can either belong to a type of videos_Asset or largeImages_Asset to inherit typesafety
  const heroImage = (props as HeroFragment)?.image?.[0];

  const { src: heroImageSrc, ...restOfHeroImage } =
    props?.__typename === 'hero_hero_BlockType' &&
    props?.image?.length &&
    (heroImage?.__typename === 'largeImages_Asset' ||
      heroImage?.__typename === 'videos_Asset') &&
    heroImage;

  // destructure mobileImage properties to inherit typesafety
  const mobileImage = (props as HeroFragment)?.mobileImage?.[0];

  const {
    alt: mobileImageAlt,
    src: mobileImageSrc,
    ...restOfMobileImage
  } = props?.__typename === 'hero_hero_BlockType' &&
  props?.mobileImage?.length &&
  mobileImage?.__typename === 'largeImages_Asset' &&
  mobileImage;
  return (
    <Section
      className={`py-mobile-large sm:py-large ${
        !!(props as HeroFragment)?.image && 'pb-0'
      }`}
      sectionBackground={(props as HeroFragment)?.sectionBackground}
    >
      <SectionInner
        className={
          (props as HeroFragment)?.image ? 'pb-mobile-large sm:pb-large' : ''
        }
      >
        <div
          className={`gap-mobile-large md:grid md:grid-cols-12 md:items-center md:gap-normal ${
            hasAssetRight ? 'flex flex-col-reverse md:grid' : 'grid'
          }`}
        >
          <div
            className={`${
              !!props?.contentImage?.length ? 'md:col-span-7' : 'md:col-span-9'
            }`}
          >
            {!!props?.label && <SectionLabel label={props?.label} />}
            {!!(props as HeroFragment)?.logo?.length && (
              <img alt={logoAlt} src={logoSrc} {...restOfLogo} priority />
            )}
            {!!props?.title && <h1>{props?.title}</h1>}
            {!!props?.redactor && (
              <div className='large prose mt-medium mb-0 leading-normal text-black'>
                {parse(props?.redactor)}
              </div>
            )}
            {!!(props as HeroFragment)?.buttons?.length && (
              <ButtonGroup buttons={(props as HeroFragment)?.buttons} />
            )}
          </div>
          {!!hasAssetRight && (
            <div className='md:col-span-4 md:col-start-9'>
              {contentImage?.__typename === 'contentImages_Asset' && (
                <img
                  alt={content_image_alt}
                  src={content_image_src}
                  {...restOfContentImage}
                  priority
                />
              )}
            </div>
          )}
        </div>
      </SectionInner>

      {/* Display image/video and overlay image, if image/video is added */}
      {!!(props as HeroFragment)?.image?.length ? (
        <div className='relative'>
          {/* Display video or image */}
          {heroImageSrc.includes('.mp4') ? (
            <video
              src={heroImageSrc}
              loop
              controls={false}
              autoPlay
              playsInline
              muted
              width='100%'
              className='aspect-hero-video max-h-[400px] object-cover md:aspect-auto md:max-h-full'
            >
              <source src={heroImageSrc} type='video/mp4' />
            </video>
          ) : (
            <div>
              {/* Desktop image - hide at mobile if mobile image exists */}
              <span
                className={`${
                  (props as HeroFragment)?.mobileImage?.length
                    ? 'hidden md:block'
                    : ''
                }`}
              >
                <img
                  {...restOfHeroImage}
                  src={heroImageSrc}
                  alt={
                    (heroImage?.__typename === 'largeImages_Asset' &&
                      heroImage?.alt) ||
                    ''
                  }
                  layout='responsive'
                  priority
                />
              </span>

              {!!(props as HeroFragment)?.mobileImage?.length && (
                <span className='block md:hidden'>
                  <img
                    alt={mobileImageAlt || ''}
                    src={mobileImageSrc}
                    {...restOfMobileImage}
                    layout='responsive'
                    priority
                  />
                </span>
              )}
            </div>
          )}
        </div>
      ) : null}
    </Section>
  );
};

export default Hero;

//! This component was originally designed to take articleHero_hero_BlockType as well as hero_hero_BlockType objects as props. As such the component doesn't know what type of props object is being rendered into it. I've implemented a quick fix which is to tell the component that it's able to accept either type as props with all type properties forced to optional. This allows an articleHero object or hero object to be spread into the props of this component without error. The next step is to tell the component which type of object it's looking at when accessing properties. This is the less-than-ideal bit as you can see below, we have to cast the props type dependent upon what property we're accessing. If we're accessing something that only exists on the HeroFragment, we have to case the props object to that type.

//! In addition to this, both types also have properties for various images, whose types, in turn are union types. This is the way the Craft GQL API works and is less than ideal for these properties we have to determine which of the types within the union, the property relates to and then destructure the values based upon that. I think the better way to handle this is to create individual components for ContentImage,  LargeImage, MobileImage, Videos_Asset.
