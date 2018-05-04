import { ShakemapPSA30Overlay } from './shakemap-psa30-overlay';

import * as L from 'leaflet';


describe('ShakemapPSA30Overlay', () => {
  it('can be created', () => {
    expect(new ShakemapPSA30Overlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapPSA30Overlay({
      contents: {
        'download/cont_psa30.json': {url: 'URL'}
      }
    });

    expect(overlay.url).toBe('URL');
    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('runs', () => {

      const overlay = new ShakemapPSA30Overlay(null);
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

      const overlay = new ShakemapPSA30Overlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();

    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapPSA30Overlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();

    });

  });
});
