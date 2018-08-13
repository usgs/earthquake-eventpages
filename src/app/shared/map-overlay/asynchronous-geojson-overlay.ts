import * as L from 'leaflet';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * Class for asynchronous overlays used with the shared-map component.
 *
 * Notable methods subclasses may want to override:
 * - onEachFeature(feature: any, layer: L.Layer)
 *   called by leaflet's GeoJSON layer.
 *
 * - parse(json|string)
 *   parse returned data and return a GeoJSON Feature or FeatureCollection.
 *   default implementation converts strings to json
 *   if returned data is not already json
 *
 * - style(feature)
 *   called by leaflet's GeoJSON layer.
 */
const AsynchronousGeoJSONOverlay = L.GeoJSON.extend({
  id: 'async-geojson',
  enabled: true,
  title: 'Async GeoJSON',
  bounds: null,
  legend: null,
  // url to download geoJSON
  url: null,

  // retain layer data to detect whether it's already loaded
  data: null,

  // retain map for custom layer adjustments
  map: null,

  // retain url grab errors
  error: Error,

  // persistent styles (allows alternating styles in geoJSON features)
  styles: {},

  /**
   * Init function
   */
  initialize: function() {
    // for content downloads in async map layers; added to layer during
    // initialization, or manually
    this.httpClient = null;

    L.GeoJSON.prototype.initialize.call(this, [], {
      onEachFeature: (feature, layer) => this.onEachFeature(feature, layer),
      pointToLayer: (feature, layer) => this.pointToLayer(feature, layer),
      style: feature => this.style(feature)
    });
  },

  /**
   * Runs after the geoJSON data is successfully added
   */
  afterAdd: function() {
    // subclasses should override this method
  },

  /**
   * Handling all errors
   *
   * @param {Error}
   *
   * @return {Observable}
   *    For caught errors during http requests
   */
  handleError: function(error: any) {
    this.error = error;
    this.data = null;
    return of(null);
  },

  /**
   * Fetch data, and ensure it is parsed into geojson
   */
  loadData: function() {
    if (!this.url || !this.httpClient) {
      this.data = null;
      return;
    }

    if (this.data !== null) {
      return;
    }

    // flag that data is being loaded
    this.data = 'loading';
    this.httpClient
      .get(this.url)
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(data => {
        try {
          data = this.parse(data);
          // flag that data is loaded
          this.data = data;
          // add data to layer (and map if layer still visible)
          this.addData(data);
          this.afterAdd();
        } catch (error) {
          this.handleError(error);
        }
      });
  },

  /**
   * Get geoJSON data and add it to the existing layer
   */
  onAdd: function(map) {
    this.map = map;
    L.GeoJSON.prototype.onAdd.call(this, map);

    this.loadData();
  },

  onEachFeature: function(feature, layer) {
    // subclasses should override this method
  },

  pointToLayer: function(feature, latlng) {
    // subclasses should override this method

    const defaultOptions = {
      radius: 8,
      fillColor: '#ff7800',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, defaultOptions);
  },

  /**
   * Parse returned data into GeoJSON.
   *
   * Subclasses may override default parsing:
   * ```
   * data = super.parse(data);
   * // modify data
   * return data;
   * ```
   *
   * @param data {Any}
   *    data ready for parsing (possibly a string)
   * @return {Any}
   *    Parsed geoJSON
   */
  parse: function(data) {
    // parse if needed
    data = typeof data === 'string' ? JSON.parse(data) : data;
    return data;
  },

  style: function(feature) {
    // subclasses should override this method
    return {};
  }
});

export { AsynchronousGeoJSONOverlay };
