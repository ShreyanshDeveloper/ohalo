// =================
// Atoms
// =================

import { LinkProps } from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type Links = LinkProps & {
  label?: string;
  text: string;
  url?: string;
  ariaLabel?: string;
  target?: '_blank' | '_self' | Omit<string, '_blank' | '_self'>;
};

// =================
// Utilities
// =================

export interface SectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  sectionBackground?: string | SectionBackground | null;
}

export type SectionInnerProps = {
  className?: string;
  showDivider?: boolean | null;
};

export type ProseWrapperProps = {
  proseClasses?: string;
};

export type ColumnRatios = '1:2' | '1:1' | '2:1';
export type SectionBackground = 'default' | 'tint' | 'black';
