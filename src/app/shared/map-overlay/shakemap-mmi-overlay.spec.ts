import * as L from 'leaflet';

import { ShakemapMmiOverlay } from './shakemap-mmi-overlay';

describe('ShakemapMmiOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapMmiOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapMmiOverlay({
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

      const overlay = new ShakemapMmiOverlay(null);
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

      const overlay = new ShakemapMmiOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();
    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapMmiOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();
    });
  });
});
