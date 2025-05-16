import { chevron } from './chevronSVG';
import { close } from './closeSVG';
import { facebook } from './facebookSVG';
import { github } from './githubSVG';
import { linkedin } from './linkedinSVG';
import { placeholder } from './placeholderSVG';
import { search } from './searchSVG';
import { twitter } from './twitterSVG';
import { youtube } from './youtubeSVG';

const icons = {
  placeholder,
  chevron,
  search,
  close,
  facebook,
  twitter,
  linkedin,
  youtube,
  github,
} as const;

export type SVGIconName = keyof typeof icons;

export const isIconName = (
  name: SVGIconName | Omit<string, SVGIconName>
): name is SVGIconName => {
  return Object.keys(icons).includes(name as SVGIconName);
};

export default icons;
