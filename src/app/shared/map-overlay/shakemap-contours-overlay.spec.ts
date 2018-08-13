import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';

describe('ShakemapContoursOverlay', () => {
  let overlay;

  const FEATURE = {
    properties: {
      value: 1
    },
    geometry: {
      coordinates: [[[0, 0], [1, 1]]]
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

  describe('after add', () => {
    beforeEach(() => {
      overlay.map = {
        fitBounds: function(bounds) {}
      };
    });

    it('gets bounds', () => {
      const bounds = 'BOUNDS';
      spyOn(overlay, 'getBounds').and.returnValue(bounds);

      overlay.afterAdd();
      expect(overlay.bounds).toBe(bounds);
    });

    it('sets map bounds', () => {
      const bounds = 'BOUNDS';
      spyOn(overlay, 'getBounds').and.returnValue(bounds);

      const mapSpy = spyOn(overlay.map, 'fitBounds').and.callFake(
        bounds_in => {}
      );

      overlay.afterAdd();
      expect(mapSpy).toHaveBeenCalledWith(bounds);
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
