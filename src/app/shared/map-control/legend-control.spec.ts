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
    container = document.createElement('ul');
    legend = document.createElement('div');
    legendControl = new LegendControl();

    mapStub = {
      eachLayer: layer => {
        return layer;
      },
      hasLayer: layer => {
        return layer.mapHasLayer || false;
      },
      off: jasmine.createSpy(),
      on: jasmine.createSpy()
    };

    spyOn(mapStub, 'hasLayer').and.callThrough();
  });

  describe('_onLayerAdd', () => {
    it('adds the event layer legend', () => {
      spyOn(legendControl, 'displayLegends');
      legendControl._onLayerAdd();
      expect(legendControl.displayLegends).toHaveBeenCalled();
    });
  });

  describe('_onLayerRemove', () => {
    it('removes the event layer legend', () => {
      spyOn(legendControl, 'displayLegends');
      legendControl._onLayerRemove();
      expect(legendControl.displayLegends).toHaveBeenCalled();
    });
  });

  describe('addLegend', () => {
    it('skips if no container/legend', () => {
      const legendEl = document.createElement('img');

      spyOn(container, 'appendChild');
      spyOn(legendControl, 'removeMessage').and.callFake(() => {});

      legendControl._legendContainer = container;
      legendControl.addLegend(null);

      expect(container.appendChild).not.toHaveBeenCalled();
    });

    it('appends child appropriately', () => {
      const legendEl = document.createElement('img');

      spyOn(container, 'appendChild');
      spyOn(legendControl, 'removeMessage').and.callFake(() => {});

      legendControl._legendContainer = container;
      legendControl.addLegend(legendEl);

      expect(container.appendChild).toHaveBeenCalled();
    });
  });

  describe('addMessage', () => {
    it('skips if no legends exist in container', () => {
      container.appendChild(document.createElement('li'));

      spyOn(container, 'appendChild');

      legendControl._legendContainer = container;
      legendControl.addMessage(null);

      expect(container.appendChild).not.toHaveBeenCalled();
    });

    it('appends message when no legends exist', () => {
      spyOn(container, 'appendChild');

      legendControl._legendContainer = container;
      legendControl.addMessage(null);

      expect(container.appendChild).toHaveBeenCalled();
    });
  });

  describe('clearLegendContainer', () => {
    it('does nothing without a container', () => {
      expect(() => {
        legendControl.clearLegendContainer();
      }).not.toThrow(Error);
    });

    it('empties the container', () => {
      container.appendChild(document.createElement('div'));
      container.appendChild(document.createElement('div'));
      legendControl._legendContainer = container;
      legendControl.clearLegendContainer();
      expect(container.childNodes.length).toBe(0);
    });
  });

  describe('close', () => {
    it('removes the visible class from the container', () => {
      const className = 'leaflet-control-legend-visible';
      legendControl._container = container;

      legendControl.close();
      expect(container.classList.contains(className)).toBeFalsy();
    });
  });

  describe('displayLegends', () => {
    it('clears and adds each layer', () => {
      const layer = {
        legends: [{}]
      };
      legendControl._legends = [layer, layer, layer];
      legendControl._map = mapStub;

      console.log(legendControl._legends);

      spyOn(legendControl, 'addLegend').and.callFake(() => {
        return;
      });
      spyOn(legendControl, 'addMessage').and.callFake(() => {
        return;
      });
      spyOn(legendControl, 'clearLegendContainer').and.callFake(() => {
        return;
      });
      spyOn(legendControl, 'legendControlContainsLegend').and.callFake(
        () => false
      );

      legendControl.displayLegends();

      expect(legendControl.clearLegendContainer).toHaveBeenCalled();
      expect(legendControl.addMessage).not.toHaveBeenCalled();
      expect(legendControl.legendControlContainsLegend).toHaveBeenCalledTimes(
        3
      );
      expect(legendControl.addLegend).toHaveBeenCalledTimes(3);
    });
  });

  describe('legendControlContainsLegend', () => {
    it('clears and adds each layer', () => {
      const el = document.createElement('ul');
      let legendEl;

      el.innerHTML = '<li><img src="testing" /></li>';
      legendEl = el.querySelector('img');
      legendControl._legendContainer = el;

      let result = legendControl.legendControlContainsLegend(legendEl);

      expect(result).toBeTruthy();

      result = legendControl.legendControlContainsLegend(
        document.createElement('img')
      );

      expect(result).toBeFalsy();
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
        expect(L.DomEvent.disableScrollPropagation).toHaveBeenCalledWith(
          legendControl._container
        );
      }

      L.Browser.touch = !L.Browser.touch;
      legendControl.onAdd(mapStub);

      if (!L.Browser.touch) {
        expect(L.DomEvent.disableScrollPropagation).toHaveBeenCalledWith(
          legendControl._container
        );
      }
      L.Browser.touch = !L.Browser.touch;
    });
  });

  describe('onRemove', () => {
    it('unbinds listeners', () => {
      spyOn(L.DomEvent, 'off').and.returnValue(L.DomEvent);

      legendControl.onRemove(mapStub);

      expect(L.DomEvent.off).toHaveBeenCalledWith(
        legendControl._container,
        'mousewheel',
        L.DomEvent.stopPropagation
      );

      expect(L.DomEvent.off).toHaveBeenCalledWith(
        legendControl._showButton,
        'click',
        L.DomEvent.stop
      );
      expect(L.DomEvent.off).toHaveBeenCalledWith(
        legendControl._showButton,
        'click',
        legendControl.open,
        legendControl
      );

      expect(L.DomEvent.off).toHaveBeenCalledWith(
        legendControl._hideButton,
        'click',
        legendControl.close,
        legendControl
      );

      expect(mapStub.off).toHaveBeenCalledWith(
        'layeradd',
        legendControl._onLayerAdd,
        legendControl
      );
      expect(mapStub.off).toHaveBeenCalledWith(
        'layerremove',
        legendControl._onLayerRemove,
        legendControl
      );
    });
  });

  describe('open', () => {
    it('adds the visible class from the container', () => {
      const className = 'leaflet-control-legend-visible';
      legendControl._container = container;

      legendControl.open();
      expect(container.classList.contains(className)).toBeTruthy();
    });
  });

  describe('removeMessage', () => {
    it('removes the no legend message', () => {
      const el = document.createElement('ul');
      let messageEl;

      el.innerHTML = '<li class="no-legend"></li>';
      messageEl = el.querySelector('.no-legend');
      legendControl._legendContainer = el;

      const result = legendControl.removeMessage();
      messageEl = el.querySelector('.no-legend');

      expect(messageEl).toBeNull();
    });
  });
});
