import * as L from 'leaflet';


const LegendControl = L.Control.extend({

    onAdd: function(map) {
      let className,
          closeButton,
          container,
          legends,
          link;

      className = 'leaflet-control-legend';

      closeButton = this._closeButton =
          L.DomUtil.create('button', className + '-close');
      closeButton.innerHTML = 'CLOSE';
      container = this._container =
          L.DomUtil.create('div', className);
      legends = this._legends =
          L.DomUtil.create('ul', className + '-list no-style vertical-scrolling');
      link = this._link =
          L.DomUtil.create('a', className + '-toggle material-icons');
      link.href = '#';
      link.title = 'Legend';
      link.innerHTML = '&#xE0DA;';


      // add elements to control
      container.appendChild(link);
      container.appendChild(closeButton);

      // Makes this work on IE10 Touch devices by stopping it from firing
      // a mouseout event when the touch is released
      container.setAttribute('aria-haspopup', true);

      if (L.Browser.touch) {
        L.DomEvent.disableClickPropagation(container);

      } else {
        L.DomEvent
          .disableClickPropagation(container)
          .disableScrollPropagation(container);
      }

      L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
      L.DomEvent.on(link, 'click', L.DomEvent.stop)
          .on(link, 'click', this._expand, this);
      L.DomEvent.on(closeButton, 'click', this._collapse, this);

      // return container
      return container;
    },

    onRemove: function(map) {
        // Nothing to do here
    },

    /**
     * Collapse the expanded Legend control
     *
     */
    _collapse: function () {
      this._container.className = this._container.className
          .replace(' leaflet-control-legend-expanded', '');
    },

    /**
     * Expand the collapsed Legend control
     *
     */
    _expand: function () {
      L.DomUtil.addClass(this._container, 'leaflet-control-legend-expanded');
    },
});

export { LegendControl };
