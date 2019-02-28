import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MapComponent } from './map.component';
import { FormatterService } from '@core/formatter.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent,

        MockComponent({
          inputs: [
            'bounds',
            'interactive',
            'overlays',
            'showAttributionControl'
          ],
          selector: 'shared-map'
        })
      ],
      providers: [FormatterService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getLatLng', () => {
    it('gets lat/lng from felt report', () => {
      let feltReport, result;
      feltReport = {
        location: {
          latitude: 1,
          longitude: 2
        }
      };
      result = component.getLatLng(feltReport);
      expect(result).toEqual([1, 2]);
    });
    it('gets lat/lng from the event', () => {
      let event, result;
      event = {
        geometry: {
          coordinates: [1, 2]
        }
      };
      result = component.getLatLng(null, event);
      expect(result).toEqual([2, 1]);
    });
    it('gets default lat/lng', () => {
      const result = component.getLatLng(null, null);
      expect(result).toEqual([0, 0]);
    });
  });

  describe('onEventChange', () => {
    it('calls updatePin', () => {
      const simpleChange = new SimpleChange(null, { curentValue: null }, true);
      spyOn(component, 'updatePin').and.returnValue([]);
      component.onEventChange(simpleChange);
      expect(component.updatePin).toHaveBeenCalled();
    });
  });

  describe('onFeltReportChange', () => {
    it('calls updatePin', () => {
      const simpleChange = new SimpleChange(null, { curentValue: null }, true);
      spyOn(component, 'updatePin').and.returnValue([]);
      component.onFeltReportChange(simpleChange);
      expect(component.updatePin).toHaveBeenCalled();
    });
  });

  describe('onMarkerChange', () => {
    it(
      'updates fleltReport latitude, longitude, and address when' +
        ' the marker is moved',
      () => {
        spyOn(component.pin, 'getLatLng').and.callFake(() => {
          return { lat: 38.508292305, lng: -77.90219192 };
        });

        component.onMarkerChange();
        expect(component.pin.getLatLng).toHaveBeenCalled();
        expect(component.feltReport.location.latitude).toEqual(39);
        expect(component.feltReport.location.longitude).toEqual(-78);
        expect(component.feltReport.location.address).toEqual('39°N 78°W');
      }
    );
  });

  describe('updateFeltReportLocation', () => {
    it('sets the user location', () => {
      spyOn(component, 'getLatLng').and.callFake(() => {
        return [1, 2];
      });
      component.updateFeltReportLocation();
      expect(component.getLatLng).toHaveBeenCalled();
      expect(component.feltReport.location.latitude).toEqual(1);
      expect(component.feltReport.location.longitude).toEqual(2);
    });
  });

  describe('updatePin', () => {
    it('sets the map pin and map bounds', () => {
      const latLng = [1, 1];

      spyOn(component, 'getLatLng').and.callFake(() => {
        return latLng;
      });
      spyOn(component.pin, 'setLatLng');

      component.updatePin();

      expect(component.getLatLng).toHaveBeenCalled();
      expect(component.pin.setLatLng).toHaveBeenCalled();
      expect(component.pin.setLatLng).toHaveBeenCalledWith(latLng);
      expect(component.mapBounds).toEqual([[2, 2], [0, 0]]);
    });
  });
});
