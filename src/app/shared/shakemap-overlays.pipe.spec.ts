import { ShakemapOverlaysPipe } from './shakemap-overlays.pipe';

describe('ShakemapOverlaysPipe', () => {
  let pipe;

  const SHAKEMAP: any = {
    contents: {
      'download/cont_mi.json': { url: 'url' },
      'download/cont_pga.json': { url: 'url' }
    },
    properties: {},
    type: 'shakemap'
  };

  beforeEach(() => {
    pipe = new ShakemapOverlaysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('handles null product', () => {
    const result = pipe.transform(null);
    expect(result).toEqual([]);
  });

  it('handles product', () => {
    const result = pipe.transform(SHAKEMAP);
    expect(result.length).toBeGreaterThan(0);
  });

  it('only sets epicenter as enabled by default', () => {
    const overlays = pipe.transform(SHAKEMAP);
    overlays.forEach(overlay => {
      if (overlay.id !== 'epicenter') {
        expect(overlay.enabled).toBe(false);
      } else {
        expect(overlay.enabled).toBe(true);
      }
    });
  });

  it('sets additional layer enabled using parameter', () => {
    const overlays = pipe.transform(SHAKEMAP, 'shakemap-intensity');
    overlays.forEach(overlay => {
      if (overlay.id !== 'epicenter' && overlay.id !== 'shakemap-intensity') {
        expect(overlay.enabled).toBe(false);
      } else {
        expect(overlay.enabled).toBe(true);
      }
    });
  });

  it('excludes layers with missing geoJSON', () => {
    const shakemap = SHAKEMAP;
    shakemap.contents = {};

    const overlays = pipe.transform(SHAKEMAP, 'shakemap-intensity');

    // only the epicenter should make it through
    expect(overlays.length).toBe(2);
  });
});
