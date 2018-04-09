import * as L from 'leaflet';


const LegendControl = L.Control.extend({

    onAdd: function(map) {
      const className = 'leaflet-control-legend';

      if (!this._container) {
        this._container = L.DomUtil.create('div', className);
        this._container.innerHTML =
            '<a href="#" class="' + className + '-show material-icons"' +
                ' title="Legend">&#xE0DA;</a>' +
            '<button class="' + className + '-hide">CLOSE</button>';

        // Makes this work on IE10 Touch devices by stopping it from firing
        // a mouseout event when the touch is released
        this._container.setAttribute('aria-haspopup', true);
      }

      this._showButton = this._container.querySelector('.' + className + '-show');
      this._hideButton = this._container.querySelector('.' + className + '-hide');

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

      // return this._container
      return this._container;
    },

    onRemove: function(map) {
      L.DomEvent.off(this._container, 'mousewheel', L.DomEvent.stopPropagation);
      L.DomEvent.off(this._showButton, 'click', L.DomEvent.stop)
          .off(this._showButton, 'click', this._open, this);
      L.DomEvent.off(this._hideButton, 'click', this._close, this);
    },

    /**
     * Collapse the Legend control
     *
     */
    _close: function () {
      this._container.className = this._container.className
          .replace(' leaflet-control-legend-visible', '');
    },

    /**
     * Expand the Legend control
     *
     */
    _open: function () {
      L.DomUtil.addClass(this._container, 'leaflet-control-legend-visible');
    },
});

export { LegendControl };
