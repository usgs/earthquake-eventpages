import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '@core/formatter.service';
import { MapComponent } from './map.component';

fdescribe('MapComponent', () => {
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
      imports: [],
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
      const latLng = [2, 2];

      spyOn(component, 'getLatLng').and.callFake(() => {
        return latLng;
      });
      spyOn(component.pin, 'setLatLng');

      component.updatePin();

      expect(component.getLatLng).toHaveBeenCalled();
      expect(component.pin.setLatLng).toHaveBeenCalled();
      expect(component.pin.setLatLng).toHaveBeenCalledWith(latLng);
      expect(component.mapBounds).toEqual([[4, 4], [0, 0]]);
    });
  });
});
