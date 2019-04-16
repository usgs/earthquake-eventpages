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
    it('converts from geojson to leaflet styles', () => {
      const values = {
        bob: 'saget',
        stroke: 'red',
        'stroke-opacity': 1
      };
      const result = overlay.translateGeojsonStyles(values);

      expect(result.color).toEqual('red');
      expect(result.opacity).toEqual(1);
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
