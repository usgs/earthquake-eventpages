import { ContributorListPipe } from './contributor-list.pipe';
import { Event } from '../event';

describe('ContributorListPipe', () => {
  let details,
      event,
      pipe,
      productA,
      productBB,
      productC,
      productProperties;

  beforeEach(() => {
    pipe = new ContributorListPipe();
    event = new Event({
      properties: {
        sources: ',bb,a,'
      }
    });
    details = [
      {
        id: 'a',
        title: 'A Title',
        url: 'a-url',
        aliases: null
      },
      {
        id: 'b',
        title: 'B Title',
        url: 'b-url',
        aliases: ['bb']
      }
    ];
    productA = {
      source: 'a'
    };
    productBB = {
      source: 'bb'
    };
    productC = {
      source: 'c'
    };
    productProperties = {
      properties: {
        'origin-source': 'a',
        'magnitude-source': 'b',
        'beachball-source': 'c'
      }
    };
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms with no detailsMap', () => {
    const resultA = pipe.transform(productA, event);
    const resultBB = pipe.transform(productBB, event);
    const resultC = pipe.transform(productC, event);

    expect(resultA).toEqual('<span>A<sup>1</sup></span>');
    expect(resultBB).toEqual('<span>BB<sup>2</sup></span>');
    expect(resultC).toEqual('<span>C<sup>0</sup></span>');
  });

  it('transforms with a detailsMap', () => {
    let result = pipe.transform(productA, event, details);
    expect(result).toEqual('<span><abbr title="A Title">A</abbr><sup>1</sup></span>');

    result = pipe.transform(productBB, event, details);
    expect(result).toEqual('<span><abbr title="B Title">BB</abbr><sup>2</sup></span>');
  });

  it('transforms no sources', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('checks product properties', () => {
    const result = pipe.getSources(productProperties);
    expect(result[0]).toBe('a');
    expect(result[1]).toBe('b');
    expect(result[2]).toBe('c');
  });

  it('is okay if product properties do not include alternate sources', () => {
    const result = pipe.getSources({properties: {}});
    expect(result).toEqual([]);
  });
});
