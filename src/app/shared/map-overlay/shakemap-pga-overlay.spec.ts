import * as L from 'leaflet';

import { ShakemapPGAOverlay } from './shakemap-pga-overlay';


describe('ShakemapPGAOverlay', () => {
  let overlay;
  const FEATURE = {
    properties: {
      value: 1
    },
    geometry: {
      coordinates: [[[0, 0], [1, 1]]]
    }
  };

  beforeEach(() => {
    overlay = new ShakemapPGAOverlay(null);
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('uses product when defined', () => {
    overlay = new ShakemapPGAOverlay({
      contents: {
        'download/cont_pga.json': {url: 'URL'}
      }
    });

    expect(overlay.url).toBe('URL');
    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  it('creates a label', () => {
    const label = overlay.createLabel(FEATURE);

    expect(label).toBeTruthy();
  });

});
