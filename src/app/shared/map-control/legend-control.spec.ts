import { LegendControl } from './legend-control';

import * as L from 'leaflet';


describe('LegendControl', () => {
  let container;
  let legend;
  let legendControl;
  let mapStub;


  afterEach(() => {
    container = null;
    legend = null;
    legendControl = null;

    mapStub = null;
  });

  beforeEach(() => {
    container = document.createElement('div');
    legend = document.createElement('div');
    legendControl = new LegendControl();

    mapStub = {
      on: jasmine.createSpy(),
      off: jasmine.createSpy(),
      hasLayer: (layer) => {
        return layer.mapHasLayer || false;
      }
    };

    spyOn(mapStub, 'hasLayer').and.callThrough();
  });


  describe('addLegend', () => {
    it('skips if no container/legend', () => {
      spyOn(container, 'appendChild');

      legendControl.addLegend({});

      legendControl._legendContainer = container;
      legendControl.addLegend({});

      expect(container.appendChild).not.toHaveBeenCalled();
    });

    it('appends child appropriately', () => {
      legendControl._legendContainer = container;
      legendControl.addLegend({'legend': legend});

      expect(legendControl._legendContainer.contains(legend)).toBeTruthy();
    });
  });

  describe('clearLegendContainer', () => {
    it('does nothing without a container', () => {
      expect(
        () => { legendControl.clearLegendContainer(); }
      ).not.toThrow(Error);
    });

    it('empties the container', () => {
      container.appendChild(document.createElement('div'));
      container.appendChild(document.createElement('div'));
      legendControl._legendContainer = container;
      legendControl.clearLegendContainer();
      expect(container.childNodes.length).toBe(0);
    });
  });

  describe('removeLegend', () => {
    it('short circuits appropriately', () => {
      spyOn(container, 'contains');

      legendControl.removeLegend({});
      legendControl._legendContainer = container;
      legendControl.removeLegend({});

      expect(container.contains).not.toHaveBeenCalled();
    });

    it('removes requested, but leaves others', () => {
      const a = container.appendChild(document.createElement('div'));
      const b = container.appendChild(document.createElement('div'));
      const c = document.createElement('div'); // Not added
      container.appendChild(legend);

      legendControl._legendContainer = container;

      expect(container.contains(legend)).toBeTruthy();
      legendControl.removeLegend({'legend': legend});
      legendControl.removeLegend({'legend': c});

      expect(container.contains(a)).toBeTruthy();
      expect(container.contains(b)).toBeTruthy();
      expect(container.contains(c)).toBeFalsy();
      expect(container.contains(legend)).toBeFalsy();
    });
  });

  describe('onAdd', () => {
    it('Creates or recycles the control elements', () => {
      spyOn(L.DomEvent, 'disableScrollPropagation');
      legendControl.onAdd(mapStub);

      expect(legendControl._container).toBeTruthy();
      expect(legendControl._showButton).toBeTruthy();
      expect(legendControl._hideButton).toBeTruthy();
      expect(legendControl._legendContainer).toBeTruthy();

      const originalContainer = legendControl._container;
      const originalShowButton = legendControl._showButton;
      const originalHideButton = legendControl._hideButton;
      const originalLegendContainer = legendControl._legendContainer;

      legendControl.onAdd(mapStub);

      expect(legendControl._container).toBe(originalContainer);
      expect(legendControl._showButton).toBe(originalShowButton);
      expect(legendControl._hideButton).toBe(originalHideButton);
      expect(legendControl._legendContainer).toBe(originalLegendContainer);

      // Force a different branch
      if (!L.Browser.touch) {
        expect(L.DomEvent.disableScrollPropagation)
            .toHaveBeenCalledWith(legendControl._container);
      }

      L.Browser.touch = !L.Browser.touch;
      legendControl.onAdd(mapStub);

      if (!L.Browser.touch) {
        expect(L.DomEvent.disableScrollPropagation)
            .toHaveBeenCalledWith(legendControl._container);
      }
      L.Browser.touch = !L.Browser.touch;
    });
  });

  describe('onRemove', () => {
    it('unbinds listeners', () => {
      spyOn(L.DomEvent, 'off').and.returnValue(L.DomEvent);

      legendControl.onRemove(mapStub);

      expect(L.DomEvent.off).toHaveBeenCalledWith(legendControl._container,
          'mousewheel', L.DomEvent.stopPropagation);

      expect(L.DomEvent.off).toHaveBeenCalledWith(legendControl._showButton,
          'click', L.DomEvent.stop);
      expect(L.DomEvent.off).toHaveBeenCalledWith(legendControl._showButton,
          'click', legendControl._open, legendControl);

      expect(L.DomEvent.off).toHaveBeenCalledWith(legendControl._hideButton,
          'click', legendControl._close, legendControl);

      expect(mapStub.off).toHaveBeenCalledWith('layeradd',
          legendControl._onLayerAdd, legendControl);
      expect(mapStub.off).toHaveBeenCalledWith('layerremove',
          legendControl._onLayerRemove, legendControl);
    });
  });

  describe('setOverlays', () => {
    it('sets the overlays', () => {
      const overlays = [];
      spyOn(legendControl, '_update');

      legendControl.setOverlays(overlays);
      expect(legendControl._overlays).toBe(overlays);
      expect(legendControl._update).toHaveBeenCalled();
    });
  });

  describe('_open/_close', () => {
    it('adds/removes the visible class from the container', () => {
      const className = 'leaflet-control-legend-visible';
      legendControl._container = container;

      legendControl._open();
      expect(container.classList.contains(className)).toBeTruthy();

      legendControl._close();
      expect(container.classList.contains(className)).toBeFalsy();
    });
  });

  describe('_onLayerAdd', () => {
    it('adds the event layer legend', () => {
      const layer = {};
      const evt = {'layer': layer};

      spyOn(legendControl, 'addLegend');

      legendControl._onLayerAdd(evt);
      expect(legendControl.addLegend).toHaveBeenCalledWith(layer);
    });
  });

  describe('_onLayerRemove', () => {
    it('removes the event layer legend', () => {
      const layer = {};
      const evt = {'layer': layer};

      spyOn(legendControl, 'removeLegend');

      legendControl._onLayerRemove(evt);
      expect(legendControl.removeLegend).toHaveBeenCalledWith(layer);
    });
  });

  describe('_update', () => {
    it('clears and adds each layer', () => {
      const overlays = [
        {mapHasLayer: true},
        {mapHasLayer: false},
        {mapHasLayer: true}
      ];

      spyOn(legendControl, 'clearLegendContainer');
      spyOn(legendControl, 'addLegend');

      // No map, short circuit
      legendControl._update();
      expect(legendControl.clearLegendContainer).not.toHaveBeenCalled();

      legendControl._map = mapStub;

      // No overlays, nothing really done
      legendControl._overlays = null;
      legendControl._update();
      expect(legendControl.clearLegendContainer).toHaveBeenCalled();

      legendControl._overlays = overlays;
      legendControl._update();

      expect(mapStub.hasLayer).toHaveBeenCalled();

      expect(legendControl.addLegend).toHaveBeenCalledWith(overlays[0]);
      expect(legendControl.addLegend).not.toHaveBeenCalledWith(overlays[1]);
      expect(legendControl.addLegend).toHaveBeenCalledWith(overlays[2]);
    });
  });
});
