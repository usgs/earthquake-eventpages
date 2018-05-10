import { ShakemapPSA10Overlay } from './shakemap-psa10-overlay';

import * as L from 'leaflet';


describe('ShakemapPSA10Overlay', () => {
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
    overlay = new ShakemapPSA10Overlay(null);
  });

  it('can be created', () => {
    expect(new ShakemapPSA10Overlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    overlay = new ShakemapPSA10Overlay({
      contents: {
        'download/cont_psa10.json': {url: 'URL'}
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
