import * as L from 'leaflet';

import { ShakeAlertOverlay } from './shake-alert-overlay';

describe('ShakeAlertOverlay', () => {
  let overlay;

  /* tslint:disable */
  const product = {
    type: 'FeatureCollection',
    id: 'initialAlertCollection',
    properties: {
      elapsed: 9.82,
      magnitude: 4.0157,
      num_stations: 5,
      location_azimuth_error: 17,
      location_distance_error: 5.6,
      caption:
        'Figure 1. Map showing initial alert area (polygon at MMI IV or highest lesser intensity) and approximate warning times (open circles).  Red circle is the location of shaking front at the time of first alert.  Blue balloon marks the ANSS network location.'
    },
    features: [
      {
        type: 'Feature',
        id: 'initialEpicenter',
        geometry: { type: 'Point', coordinates: [-122.3711, 38.4293] },
        properties: { name: 'Earthquake Epicenter', icon: 'epicenter' }
      },
      {
        type: 'Feature',
        id: 'initialPolygon',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-122.3711, 38.4712],
              [-122.3332, 38.4589],
              [-122.3176, 38.4293],
              [-122.3333, 38.3997],
              [-122.3711, 38.3874],
              [-122.4089, 38.3996],
              [-122.4246, 38.4293],
              [-122.409, 38.4589],
              [-122.3711, 38.4712]
            ]
          ]
        },
        properties: { stroke: 'blue', 'fill-opacity': 0 }
      },
      {
        type: 'Feature',
        id: 'acircle_0.0',
        geometry: {
          type: 'Point',
          coordinates: [-122.4018326, 38.3516655]
        },
        properties: {
          radius: 33865.85922429844,
          radiusunits: 'm',
          circletime: 0.0,
          tunits: 's',
          color: 'crimson',
          'fill-opacity': 0.0,
          name: '0.0 seconds'
        }
      }
    ]
  };
  /* tslint:enable */

  afterAll(() => {
    overlay = null;
  });

  beforeAll(() => {
    overlay = new ShakeAlertOverlay(product);
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  describe('addCircleTooltip', () => {
    it('adds circle tooltip', () => {
      const point = [-105, 35];
      const name = 'test-name';
      const marker = 'test-marker';
      const layer = {
        feature: {
          geometry: {
            coordinates: point
          },
          properties: {
            name: name
          }
        },
        getBounds: () => {
          return {
            _southWest: {
              lat: point[1]
            }
          };
        }
      };
      const createMarkerPlaceholderSpy = spyOn(
        overlay,
        'createMarkerPlaceholder'
      ).and.returnValue(marker);
      const bindLayerTooltipSpy = spyOn(overlay, 'bindLayerTooltip');

      overlay.addCircleTooltip(layer);
      expect(createMarkerPlaceholderSpy).toHaveBeenCalled();
      expect(createMarkerPlaceholderSpy.calls.argsFor(0)[0].lat).toEqual(
        point[1]
      );
      expect(createMarkerPlaceholderSpy.calls.argsFor(0)[0].lng).toEqual(
        point[0]
      );
      expect(bindLayerTooltipSpy).toHaveBeenCalled();
      expect(bindLayerTooltipSpy.calls.argsFor(0)[0]).toEqual(marker);
      expect(bindLayerTooltipSpy.calls.argsFor(0)[1]).toEqual(name);
    });
  });

  describe('addPolygonTooltip', () => {
    it('adds polygon tooltip', () => {
      const coordinates = [-105, 35];
      const name = 'test-name';
      const marker = 'test-marker';
      const layer = {
        feature: {
          geometry: {
            coordinates: [[coordinates]]
          },
          properties: {
            name: name
          }
        }
      };
      const createMarkerPlaceholderSpy = spyOn(
        overlay,
        'createMarkerPlaceholder'
      ).and.returnValue(marker);
      const bindLayerTooltipSpy = spyOn(overlay, 'bindLayerTooltip');

      overlay.addPolygonTooltip(layer);
      expect(createMarkerPlaceholderSpy).toHaveBeenCalled();
      expect(createMarkerPlaceholderSpy.calls.argsFor(0)[0].lat).toEqual(
        coordinates[1]
      );
      expect(createMarkerPlaceholderSpy.calls.argsFor(0)[0].lng).toEqual(
        coordinates[0]
      );
      expect(bindLayerTooltipSpy).toHaveBeenCalled();
      expect(bindLayerTooltipSpy.calls.argsFor(0)[0]).toEqual(marker);
      expect(bindLayerTooltipSpy.calls.argsFor(0)[1]).toEqual(name);
    });
  });

  describe('afterAdd', () => {
    let getBoundsSpy, fitBoundsSpy, latlng;

    beforeEach(() => {
      overlay.map = L.map(document.createElement('div'));
      latlng = [-105, 35];
      getBoundsSpy = spyOn(overlay, 'getBounds').and.returnValue(latlng);
      fitBoundsSpy = spyOn(overlay.map, 'fitBounds');
    });

    it('fits the bounds to the layers on the map', done => {
      overlay.afterAdd();
      setTimeout(() => {
        expect(getBoundsSpy).toHaveBeenCalled();
        expect(fitBoundsSpy).toHaveBeenCalled();
        done();
      });
    });

    it('adds padding to map, so that all tooltips can be seen', done => {
      overlay.afterAdd();
      setTimeout(() => {
        expect(fitBoundsSpy).toHaveBeenCalledWith(latlng, {
          padding: [30, 30]
        });
        done();
      });
    });

    it('calls addTooltip for each layer', done => {
      const addTooltipToLayerSpy = spyOn(overlay, 'addTooltipToLayer');
      const layer = L.marker(latlng).addTo(overlay.map);
      overlay.afterAdd();
      setTimeout(() => {
        expect(addTooltipToLayerSpy).toHaveBeenCalled();
        expect(addTooltipToLayerSpy).toHaveBeenCalledWith(layer);
        done();
      });
    });
  });

  describe('addTooltipToLayer', () => {
    let latlng, layer, name;

    beforeEach(() => {
      latlng = [-105, 35];
      name = 'test-name';
      layer = {
        feature: {
          geometry: {
            coordinates: [latlng],
            type: 'Point'
          },
          properties: {
            name: name
          }
        }
      };
      overlay.map = L.map(document.createElement('div'));
    });

    it('throws error if feature is missing certain properties', () => {
      delete layer.feature.geometry;
      expect(overlay.addTooltipToLayer).toThrowError(Error);
    });

    it('calls bindLayerTooltip for "Point" features', () => {
      const spy = spyOn(overlay, 'bindLayerTooltip');
      layer.feature.geometry.type = 'Point';
      overlay.addTooltipToLayer(layer);
      expect(spy).toHaveBeenCalled();
    });

    it('calls addCircleTooltip for "Circle" features', () => {
      const spy = spyOn(overlay, 'addCircleTooltip');
      layer.feature.geometry.type = 'Point';
      layer.feature.properties.radius = 123;
      overlay.addTooltipToLayer(layer);
      expect(spy).toHaveBeenCalled();
    });

    it('calls addPolygonTooltip for "Polygon" features', () => {
      const spy = spyOn(overlay, 'addPolygonTooltip');
      layer.feature.geometry.type = 'Polygon';
      overlay.addTooltipToLayer(layer);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('bindLayerTooltip', () => {
    it('adds the tooltip to the layer', () => {
      const layer = {
        bindTooltip: () => {
          return;
        }
      };
      const text = 'testing';
      const options = {
        className: 'class-test',
        direction: 'direction-test'
      };
      const spy = spyOn(layer, 'bindTooltip');
      overlay.bindLayerTooltip(layer, text, options);
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.argsFor(0)[0]).toEqual(text);
      expect(spy.calls.argsFor(0)[1].className).toEqual(options.className);
      expect(spy.calls.argsFor(0)[1].direction).toEqual(options.direction);
    });
  });

  describe('createMarkerPlaceholder', () => {
    it('returns a marker with latlng', () => {
      const latlng = [-105, 35];

      overlay.map = L.map(document.createElement('div'));
      const marker = overlay.createMarkerPlaceholder(latlng);
      expect(marker.getLatLng()).toEqual(L.latLng(latlng));
    });
  });

  describe('pointToLayer', () => {
    it('creates a epicenter marker', () => {
      const layer = overlay.pointToLayer(product.features[0], {
        lat: 0,
        lng: 0
      });

      expect(typeof layer.addTo).toEqual('function');
    });
    it('creates a polygon', () => {
      const layer = overlay.pointToLayer(product.features[1]);

      expect(typeof layer.addTo).toEqual('function');
    });
    it('creates a circle', () => {
      const layer = overlay.pointToLayer(product.features[2]);

      expect(typeof layer.addTo).toEqual('function');
    });
  });

  describe('translateGeojsonStyles', () => {
    it('handles null', () => {
      const result = overlay.translateGeojsonStyles(null);

      expect(result).toEqual({});
    });
    it('converts from geojson to leaflet styles', () => {
      const values = {
        bob: 'saget',
        stroke: 'red',
        'stroke-opacity': 1
      };
      const result = overlay.translateGeojsonStyles(values);

      expect(result.color).toEqual('red');
      expect(result.opacity).toEqual(1);
      expect(result.bob).toBeUndefined();
    });
  });

  describe('style', () => {
    it('calls translateGeojsonStyles', () => {
      spyOn(overlay, 'translateGeojsonStyles');
      overlay.style({ properties: {} });
      expect(overlay.translateGeojsonStyles).toHaveBeenCalled();
    });
  });
});
