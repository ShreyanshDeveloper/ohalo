import { SectionProps } from '@typings/components';

const Section = ({
  className = '',
  children,
  sectionBackground,
  id,
}: SectionProps) => {
  const tintClass =
    sectionBackground === 'tint'
      ? ' bg-tints-light-gray'
      : sectionBackground === 'black'
      ? ' bg-black text-white'
      : '';

  return (
    <section id={id} className={className + tintClass}>
      {children}
    </section>
  );
};

export default Section;
