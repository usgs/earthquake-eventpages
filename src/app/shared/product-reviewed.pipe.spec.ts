import { ProductReviewedPipe } from './product-reviewed.pipe';

describe('ProductReviewedPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductReviewedPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true with proper reviewd object property', () => {
    const pipe = new ProductReviewedPipe();
    const result = pipe.transform('reviewed');
    expect(result).toBeTruthy();
  });

  it('returns true with proper reviewed object property in uppercase', () => {
    const pipe = new ProductReviewedPipe();
    const result = pipe.transform('REVIEWED');
    expect(result).toBeTruthy();
  });

  it('returns false with improper value', () => {
    const pipe = new ProductReviewedPipe();
    const result = pipe.transform('archived');
    expect(result).toBeFalsy();
  });

  it('returns false with no value', () => {
    const pipe = new ProductReviewedPipe();
    const result = pipe.transform(null);
    expect(result).toBeFalsy();
  });
});
