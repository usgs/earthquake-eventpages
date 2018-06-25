import { ProductContentPipe } from './product-content.pipe';

describe('ProductContentPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductContentPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null when no product is found', () => {
    const pipe = new ProductContentPipe();
    expect(pipe.transform(null)).toBeNull();
  });

  it('returns null when no contents is found', () => {
    const pipe = new ProductContentPipe();
    expect(pipe.transform({})).toBeNull();
  });

  describe('transform', () => {
    let content1,
        content2,
        content3,
        product;

    beforeEach(() => {
      content1 = {};
      content2 = {};
      content3 = {};
      product = {
        'contents': {
          'path1': content1,
          'path2': content2,
          'path3': content3
        }
      };
    });

    it('returns first match', () => {
      const pipe = new ProductContentPipe();
      expect(pipe.transform(product, 'path1', 'path2', 'path3')).toBe(content1);
      expect(pipe.transform(product, 'path2', 'path1', 'path3')).toBe(content2);
      expect(pipe.transform(product, 'path3', 'path2', 'path1')).toBe(content3);
    });

    it('skips content that does not exist', () => {
      const pipe = new ProductContentPipe();
      expect(pipe.transform(product, 'pathX', 'path2')).toBe(content2);
      expect(pipe.transform(product, 'pathX')).toBeNull();
    });
  });
});
