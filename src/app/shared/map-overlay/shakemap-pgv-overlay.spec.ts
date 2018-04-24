import { ShakemapPGVOverlay } from './shakemap-pgv-overlay';

import * as L from 'leaflet';


describe('ShakemapPGVOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapPGVOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapPGVOverlay({
      contents: {
        'download/cont_pgv.json': {url: ''}
      }
    });

    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('runs', () => {

      const overlay = new ShakemapPGVOverlay(null);
      const style = overlay.style({});
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

      const overlay = new ShakemapPGVOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();

    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapPGVOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();

    });

  });
});
