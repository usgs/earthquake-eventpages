import * as L from 'leaflet';

import { ShakemapMmiCoverageOverlay } from './shakemap-mmi-coverage-overlay';

describe('ShakemapMmiCoverageOverlay', () => {
  const PRODUCT = {
    contents: {
      'download/coverage_mmi_high_res.covjson': { url: '' }
    }
  };

  let overlay;

  beforeEach(() => {
    overlay = new ShakemapMmiCoverageOverlay();
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('uses product when defined', () => {
    overlay = new ShakemapMmiCoverageOverlay(PRODUCT);
    expect(overlay.data).toBe(null);
  });
});
