/**
 * Takes a string of comma-separated values and formats into an array
 */

const formatArrayFromQueryParams = (str: string | string[] | undefined) => {
  if (str?.length) {
    if (typeof str === 'string') {
      return str.split(',');
    }
  }
  return undefined;
};

export default formatArrayFromQueryParams;
