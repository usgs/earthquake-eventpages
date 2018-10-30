import { PendingPipe } from './pending.pipe';

describe('PendingPipe', () => {
  it('create an instance', () => {
    const pipe = new PendingPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null when no product or product.properties is found', () => {
    const pipe = new PendingPipe();
    const product = {};
    expect(pipe.transform(product)).toEqual(null);
  });

  it('returns true when alerts are both not pending', () => {
    const pipe = new PendingPipe();
    const product = {
      properties: {
        'landslide-alert': 'red',
        'liquefaction-alert': 'green'
      }
    };
    expect(pipe.transform(product)).toEqual(true);
  });

  it('returns false if either or both alerts are pending', () => {
    const pipe = new PendingPipe();
    let product = {
      properties: {
        'landslide-alert': 'pending',
        'liquefaction-alert': 'green'
      }
    };

    expect(pipe.transform(product)).toEqual(false);

    product = {
      properties: {
        'landslide-alert': 'red',
        'liquefaction-alert': 'pending'
      }
    };

    expect(pipe.transform(product)).toEqual(false);

    product = {
      properties: {
        'landslide-alert': 'pending',
        'liquefaction-alert': 'pending'
      }
    };

    expect(pipe.transform(product)).toEqual(false);
  });
});
