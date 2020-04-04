import * as L from 'leaflet';

import { ShakemapIntensityOverlay, COVERAGEURL, IMAGEURLS } from './shakemap-intensity-overlay';


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

    expect(overlay instanceof L.LayerGroup).toBeTruthy();
  });

  describe('getUrl', () => {
    it('Sets the url for ii_overlay', () => {
      const PRODUCT = {
        contents: {
          'download/ii_overlay.png': {
            url: 'intensityUrl'
          }
        }
      };

      const overlay = new ShakemapIntensityOverlay(PRODUCT);
      expect(overlay.url).toBe('intensityUrl');
    });

    it('Sets the url for intensity_overlay', () => {
      const PRODUCT = {
        contents: {
          'download/ii_overlay.png': {
            url: 'badUrl'
          },
          'download/intensity_overlay.png': {
            url: 'intensityUrl'
          }
        }
      };

      const overlay = new ShakemapIntensityOverlay(PRODUCT);
      expect(overlay.url).toBe('intensityUrl');
    });

    it('Sets the url for coverage overlay', () => {
      const PRODUCT = {
        contents: {
          'download/coverage_mmi_high_res.covjson': {
            url: 'coverageUrl'
          },
          'download/ii_overlay.png': {
            url: 'badUrl'
          },
          'download/intensity_overlay.png': {
            url: 'badUrl'
          }
        }
      };

      const overlay = new ShakemapIntensityOverlay(PRODUCT);
      expect(overlay.url).toBe('coverageUrl');
    });
  });

  describe('getCoverageLayer', () => {
    it('handles null url', () => {
      const overlay = new ShakemapIntensityOverlay();
      const layer = overlay.getCoverageLayer();

      expect(layer).toBeNull();
    });

    it('handles url', () => {
      const overlay = new ShakemapIntensityOverlay();
      overlay.url = COVERAGEURL;
      const layer = overlay.getCoverageLayer();

      expect(layer).toBeTruthy();
    });
  });

  describe('getImageLayer', () => {
    it('handles null url', () => {
      const overlay = new ShakemapIntensityOverlay();
      const layer = overlay.getImageLayer();

      expect(layer).toBeNull();
    });

    it('handles url', () => {
      const overlay = new ShakemapIntensityOverlay();
      overlay.url = IMAGEURLS[0];
      const layer = overlay.getImageLayer();

      expect(layer).toBeTruthy();
    });
  });
});
