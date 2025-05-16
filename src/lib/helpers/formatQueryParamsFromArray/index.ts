/**
 * This function needs to take the value property from a multi-field select and format a string which can be added into a url path as query.
 * The string returned by the function needs to stick to the format item%2c+item%2c+item so that it matches standard web formatting e.g:
 * data-classification%2C+data-discovery%2C+data-governance%2C+data-mapping
 */

interface CategorySlugs {
  slug?: string[];
}

const formatQueryParamsFromArray = (items: CategorySlugs[] | undefined) => {
  if (items?.length && items?.[0]?.slug.length) {
    const arrayOfItems = items?.[0]?.slug;
    return arrayOfItems?.join(',');
  }
};

export default formatQueryParamsFromArray;
