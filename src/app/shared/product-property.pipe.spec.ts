import { ProductPropertyPipe } from './product-property.pipe';

describe('ProductPropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductPropertyPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null when no product is found', () => {
    const pipe = new ProductPropertyPipe();
    expect(pipe.transform(null)).toBeNull();
  });

  it('returns null when no properties is found', () => {
    const pipe = new ProductPropertyPipe();
    expect(pipe.transform({})).toBeNull();
  });

  describe('transform', () => {
    let product;

    beforeEach(() => {
      product = {
        properties: {
          name1: 'content1',
          name2: 'content2',
          name3: 'content3'
        }
      };
    });

    it('returns first match', () => {
      const pipe = new ProductPropertyPipe();
      expect(pipe.transform(product, 'name1', 'name2', 'name3')).
          toBe('content1');
      expect(pipe.transform(product, 'name2', 'name1', 'name3')).
          toBe('content2');
      expect(pipe.transform(product, 'name3', 'name2', 'name1')).
          toBe('content3');
    });

    it('skips content that does not exist', () => {
      const pipe = new ProductPropertyPipe();
      expect(pipe.transform(product, 'nameX', 'name2')).toBe('content2');
      expect(pipe.transform(product, 'nameX')).toBeNull();
    });
  });
});
