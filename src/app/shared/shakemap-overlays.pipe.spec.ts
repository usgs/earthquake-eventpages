import { ShakemapOverlaysPipe } from './shakemap-overlays.pipe';

describe('ShakemapOverlaysPipe', () => {
  let pipe;

  const SHAKEMAP = {
    type: 'shakemap',
    properties: {
    },
    contents: {
        'download/cont_mi.json': {url: 'url'}
    }
  };

  beforeEach(() => {
    pipe = new ShakemapOverlaysPipe();
  });

  it('create an instance', () => {
  });

  it('handles null product', () => {
    const overlays = pipe.transform(null);
  });

  it('handles product', () => {
    const overlays = pipe.transform(SHAKEMAP);
  });

  it('only sets epicenter as enabled by default', () => {
    const overlays = pipe.transform(SHAKEMAP);
    overlays.forEach((overlay) => {
      if (overlay.id !== 'epicenter') {
        expect(overlay.enabled).toBe(false);
      } else {
        expect(overlay.enabled).toBe(true);
      }
    });
  });

  it('sets additional layer enabled using parameter', () => {
    const overlays = pipe.transform(SHAKEMAP, 'shakemap-intensity');
    overlays.forEach((overlay) => {
      if (overlay.id !== 'epicenter' &&
          overlay.id !== 'shakemap-intensity') {
        expect(overlay.enabled).toBe(false);
      } else {
        expect(overlay.enabled).toBe(true);
      }
    });
  });
});
