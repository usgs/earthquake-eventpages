import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

/**
 * Copyright (c) 2012, Smartrak, David Leaver
 * Leaflet.utfgrid is an open-source JavaScript library that provides utfgrid
 * interaction on leaflet powered maps.
 *
 * https://github.com/danzel/Leaflet.utfgrid
 */

// 04/11/13 -- EMM: This is an AMD'd (require.js) version of the original
//                  source.

// tslint:disable-next-line:variable-name
const UtfGrid = L.Layer.extend({
  http: HttpClient,
  includes: L.Mixin.Events,
  options: {
    maxZoom: 12,
    minZoom: 0,
    pointerCursor: true,
    resolution: 4,
    subdomains: 'abc',
    tileSize: 256,
    useJsonP: true
  },

  // The thing the mouse is currently on
  _mouseOn: null,

  initialize: function(url, options) {
    L.Util.setOptions(this, options);

    this._url = url;
    this._cache = {};

    // Find a unique id in window we can use for our callbacks
    // Required for jsonP
    let i = 0;
    while (window['lu' + i]) {
      i++;
    }
    this._windowKey = 'lu' + i;
    window[this._windowKey] = {};

    const subdomains = this.options.subdomains;
    if (typeof this.options.subdomains === 'string') {
      this.options.subdomains = subdomains.split('');
    }
  },

  onAdd: function(map) {
    this._map = map;
    this._container = this._map._container;

    this._update();

    const zoom = this._map.getZoom();

    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
      return;
    }

    map.on('click', this._click, this);
    map.on('mousemove', this._move, this);
    map.on('moveend', this._update, this);
  },

  onRemove: function() {
    const map = this._map;
    map.off('click', this._click, this);
    map.off('mousemove', this._move, this);
    map.off('moveend', this._update, this);
  },

  _click: function(e) {
    this.fire('click', this._objectForEvent(e));
  },

  _getData: function(url, cb) {
    this.http.get(url).subscribe(response => {
      cb(JSON.parse(response.responseText));
    });
  },
  _move: function(e) {
    const on = this._objectForEvent(e);

    if (on.data !== this._mouseOn) {
      if (this._mouseOn) {
        this.fire('mouseout', { latlng: e.latlng, data: this._mouseOn });
        if (this.options.pointerCursor) {
          this._container.style.cursor = '';
        }
      }
      if (on.data) {
        this.fire('mouseover', on);
        if (this.options.pointerCursor) {
          this._container.style.cursor = 'pointer';
        }
      }

      this._mouseOn = on.data;
    } else if (on.data) {
      this.fire('mousemove', on);
    }
  },

  _objectForEvent: function(e) {
    const map = this._map,
      point = map.project(e.latlng),
      tileSize = this.options.tileSize;

    let x = Math.floor(point.x / tileSize),
      y = Math.floor(point.y / tileSize);

    const resolution = this.options.resolution,
      gridX = Math.floor((point.x - x * tileSize) / resolution),
      gridY = Math.floor((point.y - y * tileSize) / resolution),
      max = map.options.crs.scale(map.getZoom()) / tileSize;

    x = (x + max) % max;
    y = (y + max) % max;

    const data = this._cache[map.getZoom() + '_' + x + '_' + y];
    if (!data) {
      return { latlng: e.latlng, data: null };
    }

    const idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX)),
      key = data.keys[idx];

    let result = data.data[key];

    if (!data.data.hasOwnProperty(key)) {
      result = null;
    }

    return { latlng: e.latlng, data: result };
  },

  // Load up all required json grid files
  // TODO: Load from center etc
  _update: function() {
    const bounds = this._map.getPixelBounds(),
      zoom = this._map.getZoom(),
      tileSize = this.options.tileSize;

    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
      return;
    }

    const nwTilePoint = new L.Point(
        Math.floor(bounds.min.x / tileSize),
        Math.floor(bounds.min.y / tileSize)
      ),
      seTilePoint = new L.Point(
        Math.floor(bounds.max.x / tileSize),
        Math.floor(bounds.max.y / tileSize)
      ),
      max = this._map.options.crs.scale(zoom) / tileSize;

    // Load all required ones
    for (let x = nwTilePoint.x; x <= seTilePoint.x; x++) {
      for (let y = nwTilePoint.y; y <= seTilePoint.y; y++) {
        const xw = (x + max) % max,
          yw = (y + max) % max;
        const key = zoom + '_' + xw + '_' + yw;

        if (!this._cache.hasOwnProperty(key)) {
          this._cache[key] = null;

          if (this.options.useJsonP) {
            this._loadTileP(zoom, xw, yw);
          } else {
            this._loadTile(zoom, xw, yw);
          }
        }
      }
    }
  },

  _loadTileP: function(zoom, x, y) {
    const head = document.getElementsByTagName('head')[0],
      key = zoom + '_' + x + '_' + y,
      functionName = 'lu_' + key,
      wk = this._windowKey,
      self = this;

    const url = L.Util.template(
      this._url,
      L.Util.extend(
        {
          cb: wk + '.' + functionName,
          s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
          x: x,
          y: y,
          z: zoom
        },
        this.options
      )
    );

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);

    window[wk][functionName] = function(data) {
      self._cache[key] = data;
      delete window[wk][functionName];
      head.removeChild(script);
    };

    head.appendChild(script);
  },

  _loadTile: function(zoom, x, y) {
    const url = L.Util.template(
      this._url,
      L.Util.extend(
        {
          s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
          x: x,
          y: y,
          z: zoom
        },
        this.options
      )
    );

    const key = zoom + '_' + x + '_' + y;
    const self = this;
    this._getData(url, function(data) {
      self._cache[key] = data;
    });
  },

  _utfDecode: function(c) {
    if (c >= 93) {
      c--;
    }
    if (c >= 35) {
      c--;
    }
    return c - 32;
  }
});

export { UtfGrid };
