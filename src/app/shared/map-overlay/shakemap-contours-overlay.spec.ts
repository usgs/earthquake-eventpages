import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';

describe('ShakemapContoursOverlay', () => {
  let overlay;

  const FEATURE = {
    geometry: {
      coordinates: [[[0, 0], [1, 1]]]
    },
    properties: {
      value: 1
    }
  };

  beforeEach(() => {
    overlay = new ShakemapContoursOverlay(null);
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  describe('style', () => {
    it('modifies weight', () => {});
  });

  describe('onEachFeature', () => {
    it('keeps count', () => {
      const count = overlay._count;
      const layer = new L.Layer();

      overlay.onEachFeature(FEATURE, layer);
      expect(overlay._count).toBeGreaterThan(count);
    });

    it('generates new layer for even contours', () => {
      const layer = new L.Layer();

      const layerCount = Object.keys(overlay._layers).length;
      overlay.onEachFeature(FEATURE, layer);

      expect(Object.keys(overlay._layers).length).toBeGreaterThan(layerCount);
    });

    it('doesn\'t generate new layers for odd contours', () => {
      const layer = new L.Layer();

      const layerCount = Object.keys(overlay._layers).length;
      overlay._count = 1;
      overlay.onEachFeature(FEATURE, layer);

      expect(Object.keys(overlay._layers).length).toEqual(layerCount);
    });

    it('ignores object without properties', () => {
      const feature = {};
      const layer = new L.Layer();

      const layerCount = overlay._layers.length;
      overlay.onEachFeature(feature, layer);
      expect(overlay._layers.length).toEqual(layerCount);
    });
  });

  describe('style', () => {
    it('uses weight property when available', () => {
      const shakemapV4Feature = {
        geometry: {
          coordinates: [[[0, 0], [1, 1]]]
        },
        properties: {
          color: '#aaa',
          value: 1,
          weight: 4
        }
      };

      const style = overlay.style(shakemapV4Feature);
      expect(style.weight).toBe(shakemapV4Feature.properties.weight);
    });

    it('uses color property when available', () => {
      const shakemapV4Feature = {
        geometry: {
          coordinates: [[[0, 0], [1, 1]]]
        },
        properties: {
          color: '#aaa',
          value: 1,
          weight: 4
        }
      };

      const style = overlay.style(shakemapV4Feature);
      expect(style.color).toBe(shakemapV4Feature.properties.color);
    });
  });

  describe('getAngle', () => {
    it('calculates the correct angle', () => {
      const angle = overlay.getAngle([0, 0], [1, 1]);
      expect(angle).toBe(45);
    });

    it('gives 0 for steep sections', () => {
      const angle = overlay.getAngle([0, 0], [0, 1]);
      expect(angle).toBe(0);
    });
  });
});
