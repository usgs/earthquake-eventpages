import * as L from 'leaflet';

/**
 * leaflet legend control
 */
// tslint:disable-next-line:variable-name
const LegendControl = L.Control.extend({
  _legends: [],
  _overlays: [],

  /**
   * Add an individual legend string or DOM element to the legend control.
   *
   */
  _addLegend: function(legend) {
    let legendItem;

    // No legend to display
    if (legend === null) {
      return;
    }

    this._removeMessage();

    legendItem = document.createElement('li');

    // Add a DOM Element or DOM String
    if (typeof legend === 'object') {
      legendItem.appendChild(legend);
    } else if (typeof legend === 'string') {
      legendItem.innerHTML = legend;
    }

    this._legendContainer.appendChild(legendItem);
  },

  /**
   * Add message stating that there are no legends to display
   *
   */
  _addMessage: function() {
    let message;

    if (this._legendContainer.querySelectorAll('li').length === 0) {
      message = document.createElement('li');
      message.className = 'no-legend';
      message.innerHTML = 'Please select a layer.';

      this._legendContainer.appendChild(message);
    }
  },

  /**
   * Show the Legend control
   */
  _close: function() {
    L.DomUtil.removeClass(this._container, 'leaflet-control-legend-visible');
  },

  /**
   * Add a layer to the legend
   *
   * @param layerEvent
   *     The event to add a layer to legend
   */
  _onLayerAdd: function(layerEvent) {
    this.displayLegends();
  },

  /**
   * Remove a layer from legend
   *
   * @param layerEvent
   *     The layer to remove
   */
  _onLayerRemove: function(layerEvent) {
    this.displayLegends();
  },

  /**
   * Hide the Legend control
   */
  _open: function() {
    L.DomUtil.addClass(this._container, 'leaflet-control-legend-visible');
  },

  /**
   * Removes duplicate legends from the legend control
   *
   * @param legends {Array}
   *        Complete list of legends to append to the legend control
   *
   * @return {Array}
   *        A sanitized list of legends with zero duplicates
   *
   */
  _removeDuplicatesFromLegendList: function(legends) {
    let i, legend, len, sanitizedList;

    sanitizedList = [];

    // loop through all legends and remove duplicates
    for (i = 0, len = legends.length; i < len; i++) {
      legend = legends[i];
      if (sanitizedList.indexOf(legend) === -1) {
        sanitizedList.push(legend);
      }
    }

    return sanitizedList;
  },

  /**
   * Remove message stating that there are no legends to display
   *
   */
  _removeMessage: function() {
    let message;

    message = this._legendContainer.querySelector('.no-legend');

    if (message) {
      this._legendContainer.removeChild(message);
    }
  },

  /**
   * Removes all children from the overall legend container
   */
  clearLegendContainer: function() {
    if (this._legendContainer) {
      while (this._legendContainer.firstChild) {
        this._legendContainer.removeChild(this._legendContainer.firstChild);
      }
    }
  },

  /**
   * Loops through each legend object in the legends array and displays
   * the legends
   *
   */
  displayLegends: function() {
    let i, len, legends;

    legends = [];
    legends = (this._legends || []).slice();

    // clear existing legends
    this.clearLegendContainer();

    // loop through layers on the map, check for legends
    this._map.eachLayer(function(layer) {
      if (layer.legends && layer.legends.length !== 0) {
        Array.prototype.push.apply(legends, layer.legends);
      }
    }, this);

    // display message if no legends exist
    if (legends.length === 0) {
      this._addMessage();
    }

    // legends = this._removeDuplicatesFromLegendList(legends);

    // loop through all legends and add to legend control
    for (i = 0, len = legends.length; i < len; i++) {
      const legend = legends[i];
      if (!this._legendControlContainsLegend(legend)) {
        this._addLegend(legend);
      }
    }
  },

  _legendControlContainsLegend: function(legend) {
    if (
      this._legendContainer.querySelector(
        'img[src="' + legend.getAttribute('src') + '"]'
      )
    ) {
      return true;
    }
    return false;
  },

  /**
   * Generates template for the legend container
   *
   * @param map
   *     The map overlay
   *
   * @return {any}
   */
  onAdd: function(map) {
    const className = 'leaflet-control-legend';

    this._map = map;

    if (!this._container) {
      this._container = L.DomUtil.create('div', className);
      this._container.innerHTML =
        '<a href="#" class="' +
        className +
        '-show material-icons"' +
        ' title="Legend">&#xE0DA;</a>' +
        '<button class="mat-button ' +
        className +
        '-hide">CLOSE</button>' +
        '<ul class="legend-container"></ul>';

      // Makes this work on IE10 Touch devices by stopping it from firing
      // a mouseout event when the touch is released
      this._container.setAttribute('aria-haspopup', true);
    }

    this._showButton = this._container.querySelector('.' + className + '-show');
    this._hideButton = this._container.querySelector('.' + className + '-hide');
    this._legendContainer = this._container.querySelector('.legend-container');

    if (L.Browser.touch) {
      L.DomEvent.disableClickPropagation(this._container);
    } else {
      L.DomEvent.disableClickPropagation(
        this._container
      ).disableScrollPropagation(this._container);
    }

    L.DomEvent.on(this._container, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.on(this._showButton, 'click', L.DomEvent.stop).on(
      this._showButton,
      'click',
      this._open,
      this
    );
    L.DomEvent.on(this._hideButton, 'click', this._close, this);

    this.displayLegends();

    map.on('layeradd', this._onLayerAdd, this);
    map.on('layerremove', this._onLayerRemove, this);

    return this._container;
  },

  /**
   * Stops event propagation
   *
   * @param map
   *     The map overlay
   */
  onRemove: function(map) {
    L.DomEvent.off(this._container, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.off(this._showButton, 'click', L.DomEvent.stop).off(
      this._showButton,
      'click',
      this._open,
      this
    );
    L.DomEvent.off(this._hideButton, 'click', this._close, this);

    map.off('layeradd', this._onLayerAdd, this);
    map.off('layerremove', this._onLayerRemove, this);
  }
});

export { LegendControl };
