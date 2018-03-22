import { TensorPipe } from './tensor.pipe';
import { Tensor } from './beachball/tensor';

describe('TensorPipe', () => {
  let pipe,
      spy,
      tensor;

  beforeEach(() => {
    pipe = new TensorPipe();
    tensor = {};
    spy = spyOn(Tensor, 'fromProduct').and.returnValue(tensor);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform', () => {
    const product = {};
    const result = pipe.transform(product);

    expect(result).toBe(tensor);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(product);
  });
});
