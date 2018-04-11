import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { HistoricSeismicityOverlay } from '../map-overlay/historic-seismicity-overlay';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('map', () => {
    it('calls onOverlayEvent for overlayadd/overlayremove', () => {
      const spy = spyOn(component, 'onOverlayEvent');
      const testAdd = { 'testdata': 'test add' };
      const testRemove = { 'testdata': 'test remove' };
      component.map.fire('overlayadd', testAdd);
      expect(spy.calls.argsFor(0)[0].type).toEqual('overlayadd');
      component.map.fire('overlayremove', testRemove);
      expect(spy.calls.argsFor(1)[0].type).toEqual('overlayremove');
    });
  });

  describe('overlays', () => {
    it('set calls updateOverlays', () => {
      spyOn(component, 'updateOverlays');
      component.overlays = [];
      expect(component.updateOverlays).toHaveBeenCalled();
    });
  });

  describe('getOverlayBounds', () => {

    it('uses overlay bounds', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      const overlay2 = new HistoricSeismicityOverlay();

      overlay1.bounds = [[1, 2], [2, 3]];
      overlay2.bounds = [[1, 1], [2, 2]];
      component.overlays = [overlay1, overlay2];

      const bounds = component.getOverlayBounds();
      expect(bounds.equals([[1, 1], [2, 3]])).toBeTruthy();
    });

    it('returns null if no overlay bounds', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      const overlay2 = new HistoricSeismicityOverlay();

      component.overlays = [overlay1, overlay2];
      expect(component.getOverlayBounds()).toBeNull();
    });
  });

  describe('onOverlayEvent', () => {
    it('finds matching overlay, and sets enabled', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      const overlay2 = new HistoricSeismicityOverlay();
      component.overlays = [overlay1, overlay2];

      overlay1.enabled = true;
      overlay2.enabled = false;

      component.onOverlayEvent({
        type: 'overlayremove',
        layer: overlay1.layer
      });
      component.onOverlayEvent({
        type: 'overlayadd',
        layer: overlay2.layer
      });

      expect(overlay1.enabled).toBe(false);
      expect(overlay2.enabled).toBe(true);
    });

    it('works if overlay not found', () => {
      const event = {
        'type': 'test type'
      };
      spyOn(component.overlays, 'find').and.returnValue(null);

      expect(() => {
        component.onOverlayEvent(event);
      }).not.toThrowError();
    });

    it('returns if event is falsy', () => {
      spyOn(component.overlays, 'find');
      component.onOverlayEvent(null);
      expect(component.overlays.find).not.toHaveBeenCalled();
    });
  });

  describe('setBounds', () => {
    it('waits for map to be defined', () => {
      component.map = null;
      spyOn(component, 'getOverlayBounds');
      component.setBounds();

      expect(component.getOverlayBounds).not.toHaveBeenCalled();
    });

    it('uses overlay bounds', () => {
      const bounds = [1, 2, 3];
      spyOn(component, 'getOverlayBounds').and.returnValue(bounds);
      spyOn(component.map, 'fitBounds').and.returnValue(null);

      component.setBounds();
      expect(component.getOverlayBounds).toHaveBeenCalled();
      expect(component.map.fitBounds).toHaveBeenCalledWith(bounds);
    });

    it('defaults to world', () => {
      spyOn(component, 'getOverlayBounds').and.returnValue(null);
      spyOn(component.map, 'fitBounds').and.returnValue(null);

      component.setBounds();
      expect(component.getOverlayBounds).toHaveBeenCalled();
      expect(component.map.fitBounds.calls.first().args[0]).toEqual(
          [[85, 180], [-85, 180]]);
    });
  });

  describe('showLayersControl', () => {
    it('adds layers control to map when true', () => {
      component.showLayersControl = true;
      component.interactive = true;
      component.updateControls();
      expect(component.layersControl._map).toBeTruthy();
    });

    it('does not add layers control to map when false', () => {
      component.showLayersControl = false;
      component.updateControls();
      expect(component.layersControl._map).toBeFalsy();
    });
  });

  describe('showLegendControl', () => {
    it('adds legend control to map when true', () => {
      component.showLegendControl = true;
      component.interactive = true;
      component.updateControls();
      expect(component.legendControl._map).toBeTruthy();
    });

    it('does not add legend control to map when false', () => {
      component.showLegendControl = false;
      component.updateControls();
      expect(component.legendControl._map).toBeFalsy();
    });
  });

  describe('showScaleControl', () => {
    it('adds scale control to map when true', () => {
      component.showScaleControl = true;
      component.updateControls();
      expect(component.scaleControl._map).toBeTruthy();
    });

    it('does not add scale control to map when false', () => {
      component.showScaleControl = false;
      component.updateControls();
      expect(component.scaleControl._map).toBeFalsy();
    });
  });

  describe('updateControls', () => {
    it('returns if map not defined yet', () => {
      component.map = null;
      expect(() => {
        component.updateControls();
      }).not.toThrowError();
    });
  });

  describe('updateInteractive', () => {
    it('enables handlers', () => {
      const spy = spyOnProperty(component, 'interactive', 'get').and.returnValue(true);
      spyOn(component.map.boxZoom, 'enable');

      component.updateInteractive();
      expect(spy).toHaveBeenCalled();
      expect(component.map.boxZoom.enable).toHaveBeenCalled();
    });

    it('returns if map is not set', () => {
      const spy = spyOnProperty(component, 'interactive', 'get').and.returnValue(true);
      component.map = null;

      component.updateInteractive();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('updateOverlays', () => {
    it('waits for layersControl to be defined', () => {
      component.layersControl = null;
      const overlays = [new HistoricSeismicityOverlay()];
      spyOn(overlays, 'forEach');
      component._overlays = overlays;
      component.updateOverlays();

      expect(overlays.forEach).not.toHaveBeenCalled();
    });

    it('updated overlays', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      const overlay2 = new HistoricSeismicityOverlay();

      // adds to tracking array, adds to map
      component.overlays = [overlay1];
      expect(component._overlaysAdded.indexOf(overlay1)).toBeGreaterThanOrEqual(0);
      expect(component.map.hasLayer(overlay1.layer)).toBeTruthy();

      // now set enabled to false, update overlays property
      overlay1.enabled = false;
      component.overlays = [overlay1];
      // overlay still there
      expect(component._overlaysAdded.indexOf(overlay1)).toBeGreaterThanOrEqual(0);
      // but no longer on map
      expect(component.map.hasLayer(overlay1.layer)).toBeFalsy();

      component.overlays = [overlay2];
      // old overlay removed
      expect(component._overlaysAdded.indexOf(overlay1)).toBe(-1);
      // new overlay added
      expect(component._overlaysAdded.indexOf(overlay2)).toBeGreaterThanOrEqual(0);
      expect(component.map.hasLayer(overlay2.layer)).toBeTruthy();
    });
  });

});
