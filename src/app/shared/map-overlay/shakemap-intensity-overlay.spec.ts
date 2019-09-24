import * as L from 'leaflet';

import { ShakemapIntensityOverlay } from './shakemap-intensity-overlay';

describe('ShakemapIntensityOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapIntensityOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapIntensityOverlay({
      contents: {
        'download/image_overlay.png': { url: '' }
      }
    });

    expect(overlay instanceof L.ImageOverlay).toBeTruthy();
  });
});
