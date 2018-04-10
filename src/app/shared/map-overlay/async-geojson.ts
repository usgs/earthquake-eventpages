import * as L from 'leaflet';

const AsynchronousGeoJson = L.GeoJSON.extend({
  initialize: function (options) {
    this._url = options.url;
    this._http = options.httpClient;
    this._data = null;

    L.GeoJSON.prototype.initialize.call(this, [], options);
  },

  onAdd: function (map) {

    if (this._data === null) {
      // flag that data is being loaded
      this._data = 'loading';
      this._http.get(this._url).subscribe((data) => {
          // parse if needed
          data = (typeof data === 'string' ? JSON.parse(data) : data);
          // flag that data is loaded
          this._data = data;
          // add data to layer (and map if layer still visible)
          this.addData(data);
        },
        (error) => {
          // failed to load, clear loading in case re-added
          this._data = null;
        }
      );
    }

    // always add layer, data added asynchronously
    L.GeoJSON.prototype.onAdd.call(this, map);
  }
});

const asynchronousGeoJson = function (options) {
  return new AsynchronousGeoJson(options);
};

export { asynchronousGeoJson, AsynchronousGeoJson };

