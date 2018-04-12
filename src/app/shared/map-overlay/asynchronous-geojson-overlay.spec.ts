import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


describe('AsynchronousGeoJSONOverlay', () => {

  let overlay;

  const FEATURE = {
    properties: {
      color: 'COLOR',
      value: 5
    }
  };

  const GEOJSON = {
    type: 'FeatureGroup',
    features: [FEATURE]
  };


  beforeEach(() => {
    overlay = new AsynchronousGeoJSONOverlay();
  });


  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('uses product when defined', () => {

    overlay.initializeLayer();

    expect(overlay.layer instanceof L.GeoJSON).toBeTruthy();
    expect(overlay.data).toBe(null);
  });

  describe('style', () => {
    it('runs without overwrite', () => {
      const style = overlay.style(FEATURE);

      expect(style).toEqual({});
    });

  });

  describe('onEachFeature', () => {
    it('runs without overwrite', () => {
      const layer = new L.Layer();

      overlay.onEachFeature(FEATURE, layer);

    });

  });

  describe('handleGeoJSON', () => {
    it('runs without overwrite', () => {
      const geoJSON = overlay.handleGeoJSON(GEOJSON);

      expect(geoJSON).toBe(GEOJSON);
    });

  });

  describe('_handleGeoJSON', () => {

    beforeEach(() => {
      overlay.initializeLayer();
    });

    it('runs geoJSON', () => {
      overlay._handleGeoJSON(GEOJSON);

      expect(overlay.data).toBe(GEOJSON);
    });

    it('handles geoJSON string', () => {
      overlay._handleGeoJSON(JSON.stringify(GEOJSON));

      expect(overlay.data).toEqual(GEOJSON);
    });

  });

  describe('onAdd', () => {

    beforeEach(() => {
      overlay.initializeLayer();
    });

    it('handles null url', () => {
      overlay.onAdd();

      expect(overlay.data).toBe(null);
    });

    it('handles null httpClient', () => {
      overlay.url = 'url';
      overlay.onAdd();

      expect(overlay.data).toBe(null);
    });

    it('handles success', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: (url) => of(GEOJSON)
      };

      overlay.onAdd();

      expect(overlay.data).toEqual(GEOJSON);
    });

    it('handles run after success', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: (url) => of(GEOJSON)
      };

      overlay.onAdd();
      overlay.onAdd();

      expect(overlay.data).toEqual(GEOJSON);
    });

    it('handles geoJSON parse failure', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: (url) => of(GEOJSON)
      };

      const spy = spyOn(overlay, '_handleGeoJSON').and.throwError('TESTING ERROR');

      overlay.onAdd();

      expect(overlay.data).toBe(null);
      expect(overlay.error).toBeTruthy();
    });

    it('handles url get failure', () => {
      overlay.url = 'url';
      overlay.httpClient = {
        get: (url) => _throw('TESTING ERROR')
      };

      overlay.onAdd();

      expect(overlay.data).toBe(null);
      expect(overlay.error).toBeTruthy();
    });

  });
});
