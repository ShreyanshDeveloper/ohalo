import { describe, expect, it } from 'vitest';
import formatArrayFromQueryParams from '.';

describe('formatArrayFromQueryParams', () => {
  it('returns undefined when passed undefined', () => {
    expect(formatArrayFromQueryParams(undefined)).toBe(undefined);
  });
  it('returns undefined if passed null', () => {
    expect(formatArrayFromQueryParams(null)).toBe(undefined);
  });
  it('returns an array of strings of correct length when passed a string of comma-separated values', () => {
    // string of one item
    const input = 'data-discovery';
    expect(formatArrayFromQueryParams(input)).toEqual(['data-discovery']);

    // string with two items
    const input2 = 'data-discovery,data-governance';
    expect(formatArrayFromQueryParams(input2)).toEqual([
      'data-discovery',
      'data-governance',
    ]);

    // string with three items
    const input3 = 'data-discovery,data-governance,data-mapping';
    expect(formatArrayFromQueryParams(input3)).toEqual([
      'data-discovery',
      'data-governance',
      'data-mapping',
    ]);
  });
});
