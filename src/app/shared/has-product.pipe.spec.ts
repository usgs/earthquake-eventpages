import { Event } from '../event';

import { HasProductPipe } from './has-product.pipe';

describe('sharedHasProductPipe', () => {
  it('create an instance', () => {
    const pipe = new HasProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('calls event hasProduct', () => {
    const pipe = new HasProductPipe();
    const event = new Event({});
    const type = 'test';

    spyOn(event, 'hasProducts').and.returnValue(type);

    expect(pipe.transform(event, 'test')).toBe(type);
    expect(event.hasProducts).toHaveBeenCalledWith('test');
  });
});
