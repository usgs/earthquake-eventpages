import { ShakemapPSA03Overlay } from './shakemap-psa03-overlay';

import * as L from 'leaflet';


describe('ShakemapPSA03Overlay', () => {
  let overlay;
  const FEATURE = {
    properties: {
      value: 1
    },
    geometry: {
      coordinates: [[[0, 0], [1, 1]]]
    }
  }

  beforeEach(() => {
    overlay = new ShakemapPSA03Overlay(null);
  });

  it('can be created', () => {
    expect(new ShakemapPSA03Overlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapPSA03Overlay({
      contents: {
        'download/cont_psa03.json': {url: 'URL'}
      }
    });

    expect(overlay.url).toBe('URL');
    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  it('creates a label', () => {
    const label = overlay.createLabel(FEATURE);

    expect(label).toBeTruthy();
  })
});
