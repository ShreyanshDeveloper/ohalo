import { describe, expect, it } from 'vitest';
import formatQueryParamsFromArray from '.';

describe('formatQueryParamsFromArray', () => {
  it('returns undefined when passed undefined', () => {
    expect(formatQueryParamsFromArray(undefined)).toBe(undefined);
  });
  it('returns undefined when passed null', () => {
    expect(formatQueryParamsFromArray(null)).toBe(undefined);
  });
  it('returns undefined when passed an empty array', () => {
    expect(formatQueryParamsFromArray([])).toBe(undefined);
  });
  it('returns undefined when passed an array with empty slug array', () => {
    expect(formatQueryParamsFromArray([{ slug: [] }])).toBe(undefined);
  });
  it('when passed an array of a single item, returns the corresponding string without any formatting', () => {
    // array of one item
    const input = [{ slug: ['data-classification'] }];
    expect(formatQueryParamsFromArray(input)).toEqual('data-classification');
  });
  it('when passed an array of a multiple items, returns the correctly formatted string', () => {
    // array of two items
    const input1 = [{ slug: ['data-classification', 'data-discovery'] }];
    // array of two items

    const input2 = [
      { slug: ['data-classification', 'data-discovery', 'data-governance'] },
    ];

    // array of three items
    const input3 = [
      {
        slug: [
          'data-classification',
          'data-discovery',
          'data-governance',
          'data-mapping',
        ],
      },
    ];
    expect(formatQueryParamsFromArray(input1)).toEqual(
      'data-classification,data-discovery'
    );
    expect(formatQueryParamsFromArray(input2)).toEqual(
      'data-classification,data-discovery,data-governance'
    );
    expect(formatQueryParamsFromArray(input3)).toEqual(
      'data-classification,data-discovery,data-governance,data-mapping'
    );
  });
});
