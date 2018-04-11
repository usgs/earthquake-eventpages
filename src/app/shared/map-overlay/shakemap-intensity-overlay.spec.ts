import { ShakemapIntensityOverlay } from './shakemap-intensity-overlay';

import * as L from 'leaflet';


describe('ShakemapIntensityOverlay', () => {
  it('can be created', () => {
    expect(new ShakemapIntensityOverlay(null, null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new ShakemapIntensityOverlay({
      contents: {
        'download/cont_mi.json': {url: ''}
      }
    }, null);

    overlay.initializeLayer('');

    expect(overlay.layer instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.layer._data).toBe(null);
  });

  describe('style', () => {
    it('sets color from cont_mi.json', () => {
      const feature = {
        properties: {
          color: 'COLOR'
        }
      };

      const overlay = new ShakemapIntensityOverlay(null, null);
      const style = overlay.style(feature, null);

      expect(style.color).toBe('COLOR');
    });

/*
    it('oscillates line weight', () => {
      const feature = {
        properties: {
          color: 'COLOR'
        }
      };

      const overlay = new ShakemapIntensityOverlay(null, null);
      let style = overlay.style(feature, null);

      expect(style.weight).toBe(4);

      style = overlay.style(feature, null);
      expect(style.weight).toBe(2);

    })
    */

  });

  describe('onEachFeature', () => {
    it('generates popup', () => {
      const feature = {
        properties: {
          color: 'COLOR',
          value: 5
        }
      };

      const overlay = new ShakemapIntensityOverlay(null, null);
      const layer = new L.Layer();

      overlay.onEachFeature(feature, layer);

      expect(layer._popup).toBeDefined();

    });

  });
});
