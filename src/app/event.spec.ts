import { Event } from './event';

describe('Event', () => {

  it('is defined', () => {
    expect(Event).toBeTruthy();
  });

  it('has defaults', () => {
    const event = new Event(null);
    expect(event.data).toBeNull();
    expect(event.geometry).toBeNull();
    expect(event.id).toBeNull();
    expect(event.properties).toEqual({});
    expect(event.sources).toEqual([]);
    expect(event.getProducts('any')).toEqual([]);
  });

  it('gets products', () => {
    const products = [
      {
        source: 'source1',
        code: 'code1'
      },
      {
        source: 'source2',
        code: 'code2'
      },
      {
        source: 'source1',
        code: 'code2'
      }
    ];
    const event = new Event({
      properties: {
        products: {
          'testtype': products
        }
      }
    });

    expect(event.getProducts(null)).toEqual([]);
    expect(event.getProducts('othertype')).toEqual([]);
    expect(event.getProducts('testtype')).toEqual(products);

    expect(event.getProduct('testtype')).toEqual(products[0]);
    expect(event.getProduct('testtype', 'source2')).toEqual(products[1]);
    expect(event.getProduct('testtype', 'source1', 'code2')).toEqual(products[2]);
  });

  it('adds "phasedata" product to origin', () => {
    const products: any = {
      'origin': [
        {
          source: 'originsource',
          type: 'origin',
          code: 'origincode',
          updateTime: 1234
        }
      ],
      'phase-data': [
        {
          source: 'originsource',
          type: 'phase-data',
          code: 'origincode',
          updateTime: 1234
        }
      ]
    };

    const event = new Event({
      properties: {
        products: products
      }
    });

    expect(products.origin[0].phasedata).toEqual(products['phase-data'][0])
  });

});
