import { Event } from '../event';
import { GetProductPipe } from './get-product.pipe';


describe('GetProductPipe', () => {
  it('create an instance', () => {
    const pipe = new GetProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null if event is falsy', () => {
    const pipe = new GetProductPipe();
    expect(pipe.transform(null, 'test type')).toBeNull();
  });

  it('calls event getProduct', () => {
    const pipe = new GetProductPipe();
    const event = new Event({});
    const product = { 'id': 'test' };

    spyOn(event, 'getProduct').and.returnValue(product);

    expect(pipe.transform(event, 'test type')).toBe(product);
    expect(event.getProduct)
      .toHaveBeenCalledWith('test type', undefined, undefined, undefined);
  });

  it('calls event getProduct with correct arguments', () => {
    const pipe = new GetProductPipe();
    const event = new Event({});
    const product = { 'id': 'test2' };

    spyOn(event, 'getProduct').and.returnValue(product);

    expect(pipe.transform(event, 'test type', 'test source', 'test code', 1234))
      .toBe(product);
    expect(event.getProduct)
      .toHaveBeenCalledWith('test type', 'test source', 'test code', 1234);
  });
});
