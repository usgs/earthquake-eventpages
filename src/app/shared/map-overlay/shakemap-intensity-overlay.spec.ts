import * as L from 'leaflet';

import { ShakemapIntensityOverlay } from './shakemap-intensity-overlay';

describe('ShakemapIntensityOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapIntensityOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapIntensityOverlay({
      contents: {
        'download/cont_mi.json': { url: '' }
      }
    });

    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('sets color from cont_mi.json', () => {
      const feature = {
        properties: {
          color: 'COLOR'
        }
      };

      const overlay = new ShakemapIntensityOverlay(null);
      const style = overlay.style(feature);

      expect(style.color).toBe('COLOR');
    });
  });

  describe('onEachFeature', () => {
    it('generates popup', () => {
      const feature = {
        properties: {
          color: 'COLOR',
          value: 5
        }
      };

      const overlay = new ShakemapIntensityOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();
    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapIntensityOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();
    });
  });
});
