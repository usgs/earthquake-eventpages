import * as L from 'leaflet';


const LegendControl = L.Control.extend({
  _overlays: [],

  addLegend: function (overlay) {
    if (!this._legendContainer || !overlay.legend) {
      return this;
    }

    // TODO :: Deal w/ ordering as needed
    this._legendContainer.appendChild(overlay.legend);

    return this;
  },

  clearLegendContainer: function () {
    if (this._legendContainer) {
      while (this._legendContainer.firstChild) {
        this._legendContainer.removeChild(this._legendContainer.firstChild);
      }
    }
  },

  removeLegend: function (overlay) {
    if (!this._legendContainer || !overlay.legend) {
      return this;
    }

    if (this._legendContainer.contains(overlay.legend)) {
      this._legendContainer.removeChild(overlay.legend);
    }

    return this;
  },

  onAdd: function (map) {
    const className = 'leaflet-control-legend';

    this._map = map;

    if (!this._container) {
      this._container = L.DomUtil.create('div', className);
      this._container.innerHTML =
          '<a href="#" class="' + className + '-show material-icons"' +
              ' title="Legend">&#xE0DA;</a>' +
          '<button class="mat-button ' + className + '-hide">CLOSE</button>' +
          '<div class="legend-container"></div>';

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
      L.DomEvent
        .disableClickPropagation(this._container)
        .disableScrollPropagation(this._container);
    }

    L.DomEvent.on(this._container, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.on(this._showButton, 'click', L.DomEvent.stop)
        .on(this._showButton, 'click', this._open, this);
    L.DomEvent.on(this._hideButton, 'click', this._close, this);

    map.on('layeradd', this._onLayerAdd, this);
    map.on('layerremove', this._onLayerRemove, this);

    return this._container;
  },

  onRemove: function (map) {
    L.DomEvent.off(this._container, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.off(this._showButton, 'click', L.DomEvent.stop)
        .off(this._showButton, 'click', this._open, this);
    L.DomEvent.off(this._hideButton, 'click', this._close, this);

    map.off('layeradd', this._onLayerAdd, this);
    map.off('layerremove', this._onLayerRemove, this);
  },

  setOverlays: function (overlays) {
    this._overlays = overlays;
    this._update();
  },

  /**
   * Show the Legend control
   *
   */
  _close: function () {
    L.DomUtil.removeClass(this._container, 'leaflet-control-legend-visible');
  },

  _onLayerAdd: function (layerEvent) {
    this.addLegend(layerEvent.layer);
  },

  _onLayerRemove: function (layerEvent) {
    this.removeLegend(layerEvent.layer);
  },

  /**
   * Hide the Legend control
   *
   */
  _open: function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-legend-visible');
  },

  _update: function () {
    if (!this._map) {
      return this;
    }

    this.clearLegendContainer();

    (this._overlays || []).forEach((overlay) => {
      if (this._map.hasLayer(overlay)) {
        this.addLegend(overlay);
      }
    });

    return this;
  }
});

export { LegendControl };
