import { DyfiOverlaysPipe } from './dyfi-overlays.pipe';

describe('DyfiOverlaysPipe', () => {
  let pipe;

  const DYFI: any = {
    contents: {
      'dyfi_geo_10km.geojson': { url: 'url' },
      'dyfi_geo_1km.geojson': { url: 'url' }
    },
    properties: {},
    type: 'dyfi'
  };

  beforeEach(() => {
    pipe = new DyfiOverlaysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('handles product', () => {
    const result = pipe.transform(DYFI);
    expect(result.length).toEqual(2);
  });

  it('sets proper urls', () => {
    const result = pipe.transform(DYFI);
    expect(result[0].id).toEqual('dyfi-responses-1km');
    expect(result[1].id).toEqual('dyfi-responses-10km');
  });

  it('sets proper units', () => {
    const result = pipe.transform(DYFI);
    expect(result[0].unit).toEqual(1);
    expect(result[1].unit).toEqual(10);
  });
});
