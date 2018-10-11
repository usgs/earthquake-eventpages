import { GetMapBoundsPipe } from './get-map-bounds.pipe';

describe('GetMapBoundsPipe', () => {
  it('create an instance', () => {
    const pipe = new GetMapBoundsPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null if no product', () => {
    const pipe = new GetMapBoundsPipe();
    expect(pipe.transform({})).toBeNull();
  });

  it('returns null if no bounds exist', () => {
    const pipe = new GetMapBoundsPipe();
    expect(pipe.transform({ properties: {} })).toBeNull();
  });

  it('returns bounds when they exist', () => {
    const bounds = [[1, 2], [3, 4]];
    const product = {
      properties: {
        'maximum-latitude': bounds[1][0],
        'maximum-longitude': bounds[1][1],
        'minimum-latitude': bounds[0][0],
        'minimum-longitude': bounds[0][1]
      }
    };
    const pipe = new GetMapBoundsPipe();
    expect(pipe.transform(product)).toEqual(bounds);
  });
});
