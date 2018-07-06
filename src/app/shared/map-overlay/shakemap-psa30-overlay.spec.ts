import { ShakemapPSA30Overlay } from './shakemap-psa30-overlay';

import * as L from 'leaflet';


describe('ShakemapPSA30Overlay', () => {
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
    overlay = new ShakemapPSA30Overlay(null);
  });

  it('can be created', () => {
    expect(new ShakemapPSA30Overlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    overlay = new ShakemapPSA30Overlay({
      contents: {
        'download/cont_psa30.json': {url: 'URL'}
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
