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

  it('should create', () => {
    expect(component).toBeTruthy();
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
      component.updateControls();
      expect(component.layersControl._map).toBeTruthy();
    });

    it('does not add layers control to map when false', () => {
      component.showLayersControl = false;
      component.updateControls();
      expect(component.layersControl._map).toBeFalsy();
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
