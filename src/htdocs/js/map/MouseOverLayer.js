'use strict';

var L = require('leaflet'),
    UtfGrid = require('./UtfGrid'),
    Util = require('Util');



var CLASSES = 'leaflet-mouseover-tooltip';

L.MouseOverLayer = L.LayerGroup.extend({

  _initialized: false, // Flag to tell if constructor has finished

  /**
   * @param options {Object}
   *      tileUrl: URL to image tiles
   *      dataUrl: URL to UtfGrid tiles (requires callback={cb})
   *      tileOpts: Options to be used on L.TileLayer for image tiles
   *      dataOpts: Options to be used on L.UtfGrid for grid tiles
   *      tiptext: Template string to be used for auto-tooltipping on hover
   */
  initialize: function (options) {

    // Create the two layers
    this._tileLayer = new L.TileLayer(options.tileUrl, options.tileOpts);
    this._dataLayer = new UtfGrid(options.dataUrl, options.dataOpts);

    if (typeof options.tiptext === 'string') {
      this._tiptext = options.tiptext;
      this._tooltip = L.DomUtil.create('span', CLASSES);
      this.on('mouseover', this._onMouseOver, this);
      this.on('mouseout', this._onMouseOut, this);
    }

    // Call parent constructor
    L.LayerGroup.prototype.initialize.call(this, []);
    this.addLayer(this._tileLayer);
    if (!Util.isMobile()) {
  this.addLayer(this._dataLayer);
    }

    this._initialized = true;
  },

  // --------------------------------------------------
  // Delegate event handling to the data layer
  // --------------------------------------------------

  on: function () {
    UtfGrid.prototype.on.apply(this._dataLayer, arguments);
  },

  off: function () {
    UtfGrid.prototype.off.apply(this._dataLayer, arguments);
  },

  // --------------------------------------------------
  // Override these methods inherited from LayerGroup
  // --------------------------------------------------

  onAdd: function (map) {
    L.LayerGroup.prototype.onAdd.apply(this, arguments);

    if (this._tooltip) {
      map.getPanes().popupPane.appendChild(this._tooltip);
    }
  },

  onRemove: function () {
    L.LayerGroup.prototype.onRemove.apply(this, arguments);

    if (this._tooltip && this._tooltip.parentNode) {
      this._tooltip.parentNode.removeChild(this._tooltip);
    }
  },

  // --------------------------------------------------
  // Suppress these methods inherited from LayerGroup
  // --------------------------------------------------

  addLayer: function () {
    if (!this._initialized) {
      L.LayerGroup.prototype.addLayer.apply(this, arguments);
    } else {
      try {console.log('MouseOverLayer::addLayer - Immutable object');}
      catch (e) { /* Ignore */ }
    }
  },
  removeLayer: function () {
    if (!this._initialized) {
      L.LayerGroup.prototype.removeLayer.apply(this, arguments);
    } else {
      try {console.log('MouseOverLayer::removeLayer - Immutable object');}
      catch (e) { /* Ignore */ }
    }
  },
  clearLayers: function () {
    if (!this._initialized) {
      L.LayerGroup.prototype.clearLayers.apply(this, arguments);
    } else {
      try {console.log('MouseOverLayer::clearLayers - Immutable object');}
      catch (e) { /* Ignore */ }
    }
  },

  // --------------------------------------------------
  // Auto hover tooltip helper methods
  // --------------------------------------------------

  _onMouseOver: function (evt) {
    // Update text
    this._tooltip.innerHTML = L.Util.template(this._tiptext, evt.data);

    // Update position
    L.DomUtil.setPosition(this._tooltip, this._map.latLngToLayerPoint(
        evt.latlng));

    // Show the tooltip
    this._tooltip.style.display = 'block';
  },

  _onMouseOut: function () {
    // Hide the tooltip
    this._tooltip.style.display = '';
  }
});

L.mouseOverLayer = function (options) {
  return new L.MouseOverLayer(options);
};


module.exports = L.MouseOverLayer;
