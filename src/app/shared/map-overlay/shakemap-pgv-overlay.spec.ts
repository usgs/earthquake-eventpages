import * as L from 'leaflet';

import { ShakemapPGVOverlay } from './shakemap-pgv-overlay';

describe('ShakemapPGVOverlay', () => {
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
    overlay = new ShakemapPGVOverlay(null);
  });

  it('can be created', () => {
    expect(new ShakemapPGVOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    overlay = new ShakemapPGVOverlay({
      contents: {
        'download/cont_pgv.json': { url: 'URL' }
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
