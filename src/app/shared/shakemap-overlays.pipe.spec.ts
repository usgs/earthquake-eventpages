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
});
