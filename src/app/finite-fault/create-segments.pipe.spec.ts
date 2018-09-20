import { CreateSegmentsPipe } from './create-segments.pipe';

describe('CreateSegmentsPipe', () => {
  let pipe;

  const PRODUCT: any = {
    properties: {
      'segment-1-dip': '22.0000',
      'segment-1-strike': '6.0000',
      'segment-2-dip': '18.0000',
      'segment-2-strike': '6.0000',
      segments: '2'
    }
  };

  const PRODUCT2: any = {
    properties: {
      'segment-1-dip': '22.0000',
      'segment-1-strike': '6.0000',
      segments: '1'
    }
  };

  const PRODUCT3: any = {
    properties: {
      stuff: '1',
      stuff2: '2',
      stuff3: '3'
    }
  };

  const PRODUCT4: any = {
    things: {
      stuff: '1',
      stuff2: '2',
      stuff3: '3'
    }
  };

  const RESULT: any = [
    { dip: '22.0000', id: 1, strike: '6.0000' },
    { dip: '18.0000', id: 2, strike: '6.0000' }
  ];

  beforeEach(() => {
    pipe = new CreateSegmentsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('handles null product', () => {
    pipe.transform(null);
  });

  it('handles a product', () => {
    pipe.transform(PRODUCT);
  });

  it('returns null when no product is found', () => {
    expect(pipe.transform(null)).toEqual(null);
  });

  it('returns null when no properties are found', () => {
    expect(pipe.transform(PRODUCT4)).toEqual(null);
  });

  it('returns null when no segments are found', () => {
    expect(pipe.transform(PRODUCT3)).toEqual(null);
  });

  it('if segments length is less than 2 return null', () => {
    expect(pipe.transform(PRODUCT2)).toEqual(null);
  });

  it('returns result in correct format', () => {
    expect(pipe.transform(PRODUCT)).toEqual(RESULT);
  });
});
