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
          testtype: products
        }
      }
    });

    expect(event.getProducts(null)).toEqual([]);
    expect(event.getProducts('othertype')).toEqual([]);
    expect(event.getProducts('testtype')).toEqual(products);

    expect(event.getProduct('testtype')).toEqual(products[0]);
    expect(event.getProduct('testtype', 'source2')).toEqual(products[1]);
    expect(event.getProduct('testtype', 'source1', 'code2')).toEqual(
      products[2]
    );
  });

  it('adds "phasedata" product to origin', () => {
    const products: any = {
      origin: [
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

    /* tslint:disable:no-unused-variable */
    // Note: `new Event(...)` must be called because that is what attaches the
    //       phasedata property to the corresponding origin. Maybe refactor
    //       as Event.create(...) to do the same, or some other refactor...?
    //       Simply not assigning the result will generate a different error.
    const event = new Event({
      properties: {
        products: products
      }
    });
    /* tslint:enable:no-unused-variable */

    expect(products.origin[0].phasedata).toEqual(products['phase-data'][0]);
  });

  it('checks whether products exist', () => {
    const products: any = {
      origin: [
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

    expect(event.hasProducts('origin')).toBeTruthy();
    expect(event.hasProducts('phase-data')).toBeTruthy();
    expect(event.hasProducts('anothertype')).not.toBeTruthy();
  });
});
