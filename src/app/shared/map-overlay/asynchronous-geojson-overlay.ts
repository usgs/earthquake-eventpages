import { Overlay } from './overlay';

import * as L from 'leaflet';

/**
 * Extension of L.GeoJSON that allows GeoJSON to be dynamically added to a layer
 */
const AsynchronousGeoJSON = L.GeoJSON.extend({
  initialize: function (options) {
    this._url = options.url;
    this.httpClient = options.httpClient;
    this._data = null;

    L.GeoJSON.prototype.initialize.call(this, [], options);
  },

  onAdd: function (map) {

    if (!this._url || !this.httpClient) {
      this._data = null;
      return;
    }

    if (this._data === null) {
      // flag that data is being loaded
      this._data = 'loading';
      this.httpClient.get(this._url).subscribe((data) => {
          this._handleGeoJson(data);
        },
        (error) => {
          // failed to load, clear loading in case re-added
          this._data = null;
        }
      );
    }

    // always add layer, data added asynchronously
    L.GeoJSON.prototype.onAdd.call(this, map);
  },

  _handleGeoJson: function (data) {
    // parse if needed
    data = (typeof data === 'string' ? JSON.parse(data) : data);
    // flag that data is loaded
    this._data = data;
    // add data to layer (and map if layer still visible)
    this.addData(data);
  }
});



/**
 * Add function generation of AsynchronousGeoJson to mirror Leaflet's
 * class initialization behavior
 */
const asynchronousGeoJSON = function (options) {
  return new AsynchronousGeoJSON(options);
};



/**
 * Class for asynchronous overlays used with the shared-map component
 */
class AsynchronousGeoJSONOverlay implements Overlay {

  // reference to overlay
  id: string;

  // optional, bounds of data being displayed in layer (omit for worldwide view)
  bounds: Array<any>;

  // whether layer should be shown
  enabled: boolean;

  // GeoJSON object object
  layer: L.GeoJSON;

  // legend content for layer object
  legend: string;

  // title of layer, for layer control
  title: string;

  // for content downloads in async map layers; added to layer during
  // initialization, or manually
  httpClient: any;

  // url to download geoJSON
  url: string;

  // additional options to pass into layer
  options: any;

  constructor() {}

  /**
   * Call to initialize the GeoJSON layer
   *
   * @param url {String}
   *    Url to access GeoJSON data
   *
   * @param options {Object}: Optional, default none
   *    Additional options for Leaflet.GeoJSON (style, onEachFeature, ...)
   */
  initializeLayer() {

    const options = {
      httpClient: this.httpClient,
      url: this.url,
      style: this.style,
      onEachFeature: this.onEachFeature
    };

    this.layer = asynchronousGeoJSON(options);
  }

  /**
   * OVERWRITE IN EXTENDING CLASS
   *
   * Sets style for geoJSON; must follow Leaflet's guidelines
   *
   * @param feature {Any}
   *    GeoJSON feature
   *
   * @return {Any}
   *    Object containing desired styles
   */
  style(feature): any {
    return null;
  }

  /**
   * OVERWRITE IN EXTENDING CLASS
   *
   * Make alterations to feature representations (ex. adding a popup)
   *
   * @param feature {Any}
   *    GeoJSON feature
   *
   * @param layer {L.Layer}
   *    Leaflet layer
   *
   */
  onEachFeature(feature, layer) {
  }
}

export { AsynchronousGeoJSONOverlay, asynchronousGeoJSON, AsynchronousGeoJSON };
