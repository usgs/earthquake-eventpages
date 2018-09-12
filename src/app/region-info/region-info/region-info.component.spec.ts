import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '@core/event.service';
import { PlacesService, RegionsService } from 'hazdev-ng-geoserve-output';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { RegionInfoComponent } from './region-info.component';
import { NearbyCitiesService } from '../nearby-cities.service';

describe('RegionInfoComponent', () => {
  let component: RegionInfoComponent;
  let fixture: ComponentFixture<RegionInfoComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };

    const regionsServiceStub = {
      getRegions: jasmine.createSpy('getRegions')
    };

    const placesServiceStub = {
      getPlaces: jasmine.createSpy('getPlaces')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionInfoComponent,

        MockComponent({ selector: 'geoserve-admin-region' }),
        MockComponent({
          inputs: ['places'],
          selector: 'geoserve-nearby-place-list'
        }),
        MockComponent({ selector: 'geoserve-nearby-places' }),
        MockComponent({ selector: 'geoserve-tectonic-summary-region' }),
        MockComponent({
          inputs: ['overlays', 'showScaleControl'],
          selector: 'shared-map'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        }),

        MockPipe('fetchNearbyCities'),
        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: NearbyCitiesService, useValue: {} },
        { provide: PlacesService, useValue: placesServiceStub },
        { provide: RegionsService, useValue: regionsServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getGeoserveData', () => {
    beforeEach(() => {
      spyOn(component, 'getPlaces');
      spyOn(component, 'getRegions');
    });

    it('returns when no event is passed', () => {
      component.getGeoserveData(null);
      expect(component.getPlaces).not.toHaveBeenCalled();
      expect(component.getRegions).not.toHaveBeenCalled();
    });

    it('sets coordinates', () => {
      const latitude = 35;
      const longitude = -105;

      const event = {
        geometry: {
          coordinates: [longitude, latitude, 0]
        }
      };

      component.getGeoserveData(event);
      expect(component.getPlaces).toHaveBeenCalledWith({
        latitude: latitude,
        longitude: longitude
      });
      expect(component.getRegions).toHaveBeenCalledWith({
        latitude: latitude,
        longitude: longitude
      });
    });
  });

  describe('getPegions', () => {
    it('only delegates if coordinates given', () => {
      component.getPlaces(null);
      component.getPlaces({});
      component.getPlaces({latitude: 1});
      component.getPlaces({longitude: 1});
      component.getPlaces({latitude: null});
      component.getPlaces({longitude: null});
      component.getPlaces({latitude: null, longitude: null});
      expect(component.placesService.getPlaces).not.toHaveBeenCalled();

      // Called if 0 provided for both
      component.getPlaces({latitude: 0, longitude: 0});
      expect(component.placesService.getPlaces).toHaveBeenCalledWith(0, 0);

      // Called if non-zero provided for both. Correct argument order.
      component.getPlaces({latitude: 1, longitude: 2});
      expect(component.placesService.getPlaces).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('getRegions', () => {
    it('only delegates if coordinates given', () => {
      component.getRegions(null);
      component.getRegions({});
      component.getRegions({latitude: 1});
      component.getRegions({longitude: 1});
      component.getRegions({latitude: null});
      component.getRegions({longitude: null});
      component.getRegions({latitude: null, longitude: null});
      expect(component.regionsService.getRegions).not.toHaveBeenCalled();

      // Called if 0 provided for both
      component.getRegions({latitude: 0, longitude: 0});
      expect(component.regionsService.getRegions).toHaveBeenCalledWith(0, 0);

      // Called if non-zero provided for both. Correct argument order.
      component.getRegions({latitude: 1, longitude: 2});
      expect(component.regionsService.getRegions).toHaveBeenCalledWith(1, 2);
    });
  });
});
