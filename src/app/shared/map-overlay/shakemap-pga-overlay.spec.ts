import { ShakemapPGAOverlay } from './shakemap-pga-overlay';

import * as L from 'leaflet';


describe('ShakemapPGAOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapPGAOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapPGAOverlay({
      contents: {
        'download/cont_pga.json': {url: 'URL'}
      }
    });

    expect(overlay.url).toBe('URL');
    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('runs', () => {

      const overlay = new ShakemapPGAOverlay(null);
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

      const overlay = new ShakemapPGAOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();

    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapPGAOverlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();

    });

  });
});
