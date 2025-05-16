import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

type TCarouselProps = {
  showOverflow?: boolean;
  centerDots?: boolean;
  options?: EmblaOptionsType;
};

const emblaOptionDefaults: EmblaOptionsType = {
  align: 'start',
};

const Carousel = ({
  children,
  showOverflow = false,
  centerDots = false,
  options = emblaOptionDefaults,
}: PropsWithChildren<TCarouselProps>) => {
  // Hooks
  const [viewportRef, embla] = useEmblaCarousel(options);

  // State
  const [emblaIsActive] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Callbacks
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  const onResize = useCallback(() => {
    if (!embla) return;
    if (selectedIndex > embla.scrollSnapList().length) {
      setSelectedIndex(0);
      embla.scrollTo(0);
    }
    setScrollSnaps(embla.scrollSnapList());
  }, [embla, selectedIndex, setSelectedIndex, setScrollSnaps]);

  // Effects
  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    embla.on('resize', onResize);
  }, [embla, setScrollSnaps, onSelect, onResize]);

  return (
    <div className='embla'>
      <div
        className={`embla__viewport h-full w-full partners-slider ${
          !showOverflow ? 'overflow-hidden' : ''
        }`}
        ref={viewportRef}
      >
        <div
          className={`embla__container -ml-medium flex ${
            !emblaIsActive ? 'justify-center' : ''
          }`}
        >
          {children}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div
          className={`embla__dots -ml-xx-small ${
            centerDots ? 'text-center' : ''
          }`}
        >
          {scrollSnaps?.map((_, index) => (
            <button
              key={index}
              type='button'
              onClick={() => scrollTo(index)}
              className={`no-defaults mt-medium inline-block px-xx-small py-small before:block before:h-[6px] before:w-[6px] before:rounded-full before:border before:transition-all before:duration-500 before:ease-in-out ${
                index === selectedIndex
                  ? 'before:scale-[1.70] before:bg-current'
                  : 'before:bg-transparent'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
