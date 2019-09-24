import { GetMapBoundsPipe } from './get-map-bounds.pipe';

describe('GetMapBoundsPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new GetMapBoundsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null if no product', () => {
    expect(pipe.transform({})).toBeNull();
  });

  it('returns null if no bounds exist', () => {
    expect(pipe.transform({ properties: {} })).toBeNull();
  });

  it('returns bounds when they exist', () => {
    const bounds = [[1, 2], [3, 4]];
    const product = {
      properties: {
        latitude: 2,
        longitude: 3,
        'maximum-latitude': bounds[1][0],
        'maximum-longitude': bounds[1][1],
        'minimum-latitude': bounds[0][0],
        'minimum-longitude': bounds[0][1]
      }
    };
    expect(pipe.transform(product)).toEqual(bounds);
  });

  it('Wraps 180 lon', () => {
    const bounds = [[1, 178], [3, -178]];
    const product = {
      properties: {
        latitude: 2,
        longitude: -179,
        'maximum-latitude': bounds[1][0],
        'maximum-longitude': bounds[1][1],
        'minimum-latitude': bounds[0][0],
        'minimum-longitude': bounds[0][1]
      }
    };

    const transBounds = pipe.transform(product);
    expect(transBounds[0][1]).toBeLessThan(transBounds[1][1]);
    expect(transBounds[1][1] - transBounds[0][1]).toBe(4);
  });

  it('Wraps 90 lat', () => {
    const bounds = [[88, 1], [-88, 3]];
    const product = {
      properties: {
        latitude: -89,
        longitude: 2,
        'maximum-latitude': bounds[1][0],
        'maximum-longitude': bounds[1][1],
        'minimum-latitude': bounds[0][0],
        'minimum-longitude': bounds[0][1]
      }
    };

    const transBounds = pipe.transform(product);
    expect(transBounds[0][0]).toBeLessThan(transBounds[1][0]);
    expect(transBounds[1][0] - transBounds[0][0]).toBe(4);
  });
});
