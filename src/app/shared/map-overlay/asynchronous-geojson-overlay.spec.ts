import * as L from 'leaflet';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

describe('AsynchronousGeoJSONOverlay', () => {
  let overlay;

  const FEATURE = {
    geometry: {
      coordinates: [-118, 34],
      type: 'Point'
    },
    properties: {
      color: 'COLOR',
      value: 5
    },
    type: 'Feature'
  };

  const GEOJSON = {
    features: [FEATURE],
    type: 'FeatureCollection'
  };

  beforeEach(() => {
    overlay = new AsynchronousGeoJSONOverlay();
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('is a geojson layer', () => {
    expect(overlay instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('loadData', () => {
    it('handles null url', () => {
      overlay.loadData();

      expect(overlay.data).toBe(null);
    });

    it('handles null httpClient', () => {
      overlay.url = 'url';
      overlay.loadData();

      expect(overlay.data).toBe(null);
    });

    it('handles success', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: url => of(GEOJSON)
      };

      overlay.loadData();

      expect(overlay.data).toEqual(GEOJSON);
    });

    it('handles run after success', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: url => of(GEOJSON)
      };

      overlay.loadData();
      overlay.loadData();

      expect(overlay.data).toEqual(GEOJSON);
    });

    it('handles geoJSON parse failure', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: url => of(GEOJSON)
      };

      spyOn(overlay, 'parse').and.throwError('TESTING ERROR');

      overlay.loadData();

      expect(overlay.data).toBe(null);
      expect(overlay.error).toBeTruthy();
    });

    it('handles url get failure', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: url => _throw('TESTING ERROR')
      };

      overlay.loadData();

      expect(overlay.data).toBe(null);
      expect(overlay.error).toBeTruthy();
    });
  });

  describe('onAdd', () => {
    it('calls loadData', () => {
      spyOn(overlay, 'loadData');
      overlay.onAdd({ addLayer: () => {} });
      expect(overlay.loadData).toHaveBeenCalled();
    });
  });

  describe('style', () => {
    it('runs without overwrite', () => {
      const style = overlay.style(FEATURE);

      expect(style).toEqual({});
    });

    it('is called by layer', () => {
      spyOn(overlay, 'style');
      overlay.addData(FEATURE);
      expect(overlay.style).toHaveBeenCalledWith(FEATURE);
    });
  });

  describe('onEachFeature', () => {
    it('runs without overwrite', () => {
      const layer = new L.Layer();

      overlay.onEachFeature(FEATURE, layer);
    });

    it('is called by layer', () => {
      spyOn(overlay, 'onEachFeature');
      overlay.addData(FEATURE);
      expect(overlay.onEachFeature).toHaveBeenCalledWith(
        FEATURE,
        jasmine.any(Object)
      );
    });
  });

  describe('parse', () => {
    it('runs without overwrite', () => {
      const geoJSON = overlay.parse(GEOJSON);

      expect(geoJSON).toBe(GEOJSON);
    });

    it('handles geoJSON string', () => {
      const data = overlay.parse(JSON.stringify(GEOJSON));

      expect(data).toEqual(GEOJSON);
    });
  });
});
