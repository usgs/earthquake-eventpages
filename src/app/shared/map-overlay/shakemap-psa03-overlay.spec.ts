import { ShakemapPSA03Overlay } from './shakemap-psa03-overlay';

import * as L from 'leaflet';


describe('ShakemapPSA03Overlay', () => {
  it('can be created', () => {
    expect(new ShakemapPSA03Overlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapPSA03Overlay({
      contents: {
        'download/cont_psa03.json': {url: ''}
      }
    });

    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('runs', () => {

      const overlay = new ShakemapPSA03Overlay(null);
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

      const overlay = new ShakemapPSA03Overlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();

    });

    it('ignores object without properties', () => {
      const feature = {};

      const overlay = new ShakemapPSA03Overlay(null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeUndefined();

    });

  });
});
