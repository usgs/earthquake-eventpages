import { Event } from '../event';

import { GetProductsPipe } from './get-products.pipe';

fdescribe('sharedGetProductsPipe', () => {
  it('create an instance', () => {
    const pipe = new GetProductsPipe();
    expect(pipe).toBeTruthy();
  });

  it('calls event getProducts', () => {
    const pipe = new GetProductsPipe();
    const event = new Event({});
    const type = 'test';

    spyOn(event, 'getProducts').and.returnValue(type);

    expect(pipe.transform(event, 'test')).toBe(type);
    expect(event.getProducts).toHaveBeenCalledWith('test');
  });
});
