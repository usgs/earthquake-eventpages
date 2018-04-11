import { HttpClient } from '@angular/common/http';

import { Overlay } from './overlay'

import * as L from 'leaflet';

/**
 * Class for asynchronous overlays used with the shared-map component
 */
class AsyncGeoJsonOverlay implements Overlay {

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


  constructor(private httpClient: HttpClient) {}

  /**
   * Call to initialize the GeoJSON layer
   */
  initializeLayer(options) {
    options['httpClient'] = this.httpClient;

    this.layer = asynchronousGeoJson(options);
  }
}



/**
 * Extension of L.GeoJSON that allows GeoJSON to be dynamically added to a layer
 */
const AsynchronousGeoJson = L.GeoJSON.extend({
  initialize: function (options) {
    this._url = options.url;
    this._http = options.httpClient;
    this._data = null;

    L.GeoJSON.prototype.initialize.call(this, [], options);
  },

  onAdd: function (map) {

    if (this._url == null) {
      this._data = null;
      return;
    }

    if (this._data === null) {
      // flag that data is being loaded
      this._data = 'loading';
      this._http.get(this._url).subscribe((data) => {
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
const asynchronousGeoJson = function (options) {
  return new AsynchronousGeoJson(options);
};


export { AsyncGeoJsonOverlay, asynchronousGeoJson, AsynchronousGeoJson };
