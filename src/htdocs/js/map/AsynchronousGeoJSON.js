'use strict';

var L = require('leaflet'),
    Xhr = require('util/Xhr');


/**
 * A Leaflet GeoJSON layer that loads its data asynchronously after the layer
 * is added to the map (in onAdd).
 *
 * @param options {Object}
 *        all options are passed to L.GeoJSON.
 * @param options.url {String}
 *        url containing data to load.
 */
var AsynchronousGeoJSON = L.GeoJSON.extend({

  initialize: function (options) {
    this._url = options.url;
    this._data = null;

    L.GeoJSON.prototype.initialize.call(this, [], options);
  },

  onAdd: function (map) {
    var _this;

    if (this._data === null) {
      // flag that data is being loaded
      this._data = 'loading';
      // scope for Xhr callbacks
      _this = this;
      Xhr.ajax({
        url: this._url,
        success: function (data) {
          // parse if needed
          data = (typeof data === 'string' ? JSON.parse(data) : data);
          // flag that data is loaded
          _this._data = data;
          // add data to layer (and map if layer still visible)
          _this.addData(data);
        },
        error: function () {
          // failed to load, clear loading in case re-added
          _this._data = null;
        }
      });
    }

    // always add layer, data added asynchronously
    L.GeoJSON.prototype.onAdd.call(this, map);
  }

});


module.exports = AsynchronousGeoJSON;
