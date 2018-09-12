import * as L from 'leaflet';
import { UtfGrid } from './utf-grid';

const CLASSES = 'leaflet-mouseover-tooltip';

/**
 * Mouse overlay layer group for leaflet map
 */
// tslint:disable-next-line:variable-name
const MouseOverLayer = L.LayerGroup.extend({
  _initialized: false, // Flag to tell if constructor has finished

  dataUrl: null, // overlay data layer
  tileUrl: null, // tile images for overlay

  /**
   * @param options {Object}
   *      tileUrl: URL to image tiles
   *      dataUrl: URL to UtfGrid tiles (requires callback={cb})
   *      tileOpts: Options to be used on L.TileLayer for image tiles
   *      dataOpts: Options to be used on L.UtfGrid for grid tiles
   *      tiptext: Template string to be used for auto-tooltipping on hover
   */
  initialize: function(options) {
    // Create the two layers
    this._tileLayer = new L.TileLayer(options.tileUrl, options.tileOpts);
    this._dataLayer = new UtfGrid(options.dataUrl, options.dataOpts);
    this._legend = options.legend || null;

    if (typeof options.tiptext === 'string') {
      this._tiptext = options.tiptext;
      this._tooltip = L.DomUtil.create('span', CLASSES);
    }

    // Call parent constructor
    L.LayerGroup.prototype.initialize.call(this, []);
    this.addLayer(this._tileLayer);
    if (!this.isMobile()) {
      this.addLayer(this._dataLayer);
    }

    this._initialized = true;
  },

  getLegends: function() {
    return this._legend;
  },

  isMobile: function(): boolean {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  },

  // --------------------------------------------------
  // Override these methods inherited from LayerGroup
  // --------------------------------------------------

  onAdd: function(map) {
    L.LayerGroup.prototype.onAdd.apply(this, arguments);

    if (this._tooltip) {
      map.getPanes().popupPane.appendChild(this._tooltip);
      this._dataLayer.on('mouseover', this._onMouseOver, this);
      this._dataLayer.on('mouseout', this._onMouseOut, this);
    }
  },

  onRemove: function() {
    L.LayerGroup.prototype.onRemove.apply(this, arguments);

    if (this._tooltip && this._tooltip.parentNode) {
      this._tooltip.parentNode.removeChild(this._tooltip);
      this._dataLayer.off('mouseover', this._onMouseOver, this);
      this._dataLayer.off('mouseout', this._onMouseOut, this);
    }
  },

  // --------------------------------------------------
  // Auto hover tooltip helper methods
  // --------------------------------------------------

  _onMouseOver: function(evt) {
    // Update text
    this._tooltip.innerHTML = L.Util.template(this._tiptext, evt.data);

    // Update position
    L.DomUtil.setPosition(
      this._tooltip,
      this._map.latLngToLayerPoint(evt.latlng)
    );

    // Show the tooltip
    this._tooltip.style.display = 'block';
  },

  _onMouseOut: function() {
    // Hide the tooltip
    this._tooltip.style.display = '';
  }
});

export { MouseOverLayer };
