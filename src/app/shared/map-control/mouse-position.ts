import * as L from 'leaflet';

/**
 * leaflet mouse position control showing lat/long of mouse pointer
 */
// tslint:disable-next-line:variable-name
const MousePosition = L.Control.extend({
  options: {
    emptyString: 'Unavailable',
    latFormatter: function(n) {
      return [Math.abs(n).toFixed(3), '&deg;', n < 0 ? 'S' : 'N'].join('');
    },
    lngFirst: false,
    lngFormatter: function(n) {
      return [Math.abs(n).toFixed(3), '&deg;', n < 0 ? 'W' : 'E'].join('');
    },
    numDigits: 3,
    position: 'bottomright',
    separator: ' : '
  },

  onAdd: function(map) {
    this._container = L.DomUtil.create(
      'div',
      'leaflet-control-background leaflet-control-mouseposition'
    );
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
  },

  onRemove: function(map) {
    map.off('mousemove', this._onMouseMove);
  },

  _onMouseMove: function(e) {
    let lng = L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    // need to correct for rollover of map if user scrolls
    if (lng >= 0) {
      lng = ((lng + 180) % 360) - 180;
    } else {
      lng =
        ((lng + 180 + Math.ceil(Math.abs(lng + 180) / 360) * 360) % 360) - 180;
    }
    let lat = L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    if (this.options.lngFormatter) {
      lng = this.options.lngFormatter(lng);
    }
    if (this.options.latFormatter) {
      lat = this.options.latFormatter(lat);
    }
    const value = this.options.lngFirst
      ? lng + this.options.separator + lat
      : lat + this.options.separator + lng;
    this._container.innerHTML = value;
  }
});

export { MousePosition };
