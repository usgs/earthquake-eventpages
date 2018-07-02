import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MapComponent } from './map.component';
import { HistoricSeismicityOverlay } from '../map-overlay/historic-seismicity-overlay';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('bounds', () => {
    it('set calls setBounds', () => {
      spyOn(component, 'setBounds');
      component.bounds = null;
      expect(component.setBounds).toHaveBeenCalled();
    });

    it('uses overlay bounds when not set', (done) => {
      spyOn(component, 'getOverlayBounds').and.returnValue('test');
      spyOn(component.map, 'fitBounds');

      component.bounds = null;
      expect(component.getOverlayBounds).toHaveBeenCalled();
      setTimeout(() => {
        expect(component.map.fitBounds).toHaveBeenCalledWith('test');
        done();
      }, 1);
    });

    it('uses bounds when set', (done) => {
      spyOn(component.map, 'fitBounds');
      const myBounds = [[12, 34], [56, 78]];

      component.bounds = myBounds;

      setTimeout(() => {
        expect(component.map.fitBounds).toHaveBeenCalledWith(myBounds);
        done();
      }, 1);
    });
  });

  describe('overlays', () => {
    it('set calls updateOverlays', () => {
      spyOn(component, 'updateOverlays');
      component.overlays = [];
      expect(component.updateOverlays).toHaveBeenCalled();
    });

    it('set calls updateLegend', () => {
      spyOn(component, 'updateLegend');
      component.overlays = [];
      expect(component.updateLegend).toHaveBeenCalled();
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

  describe('setBounds', () => {

    beforeEach(() => {
      // Without the additional uninstall, an error is thrown
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

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

      jasmine.clock().tick(1);

      expect(component.getOverlayBounds).toHaveBeenCalled();
      expect(component.map.fitBounds).toHaveBeenCalledWith(bounds);
    });

    it('defaults to world', () => {
      spyOn(component, 'getOverlayBounds').and.returnValue(null);
      spyOn(component.map, 'fitBounds').and.returnValue(null);

      component.setBounds();

      jasmine.clock().tick(1);

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

  describe('updateLegend', () => {
    it('does nothing if no legendControl', () => {
      component.legendControl = null;
      component.updateLegend();
      expect(component.updateLegend()).toEqual(undefined);
    });
  });

  describe('updateOverlays', () => {
    it('waits for layersControl to be defined', () => {
      component.layersControl = null;
      const overlays = [new HistoricSeismicityOverlay()];
      spyOn(overlays, 'forEach');
      component.overlays = overlays;
      component.updateOverlays();

      expect(overlays.forEach).not.toHaveBeenCalled();
    });

    it('updated overlays', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      const overlay2 = new HistoricSeismicityOverlay();

      // adds to tracking array, adds to map
      component.overlays = [overlay1];
      expect(component.overlaysAdded.indexOf(overlay1)).toBeGreaterThanOrEqual(0);
      expect(component.map.hasLayer(overlay1)).toBeTruthy();

      // now set enabled to false, update overlays property
      overlay1.enabled = false;
      component.overlays = [overlay1];
      // overlay still there
      expect(component.overlaysAdded.indexOf(overlay1)).toBeGreaterThanOrEqual(0);
      // but no longer on map
      expect(component.map.hasLayer(overlay1)).toBeFalsy();

      component.overlays = [overlay2];
      // old overlay removed
      expect(component.overlaysAdded.indexOf(overlay1)).toBe(-1);
      // new overlay added
      expect(component.overlaysAdded.indexOf(overlay2)).toBeGreaterThanOrEqual(0);
      expect(component.map.hasLayer(overlay2)).toBeTruthy();
    });

    it('sets overlay httpClient', () => {
      const overlay1 = new HistoricSeismicityOverlay();
      overlay1['httpClient'] = null;

      // sets httpClient
      component.overlays = [overlay1];
      expect(overlay1['httpClient']).not.toBeNull();
    });

  });

});
