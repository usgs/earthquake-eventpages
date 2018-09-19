import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionInfoDisplayComponent } from './region-info-display.component';
import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';
import { NearbyCitiesService } from '../nearby-cities.service';
import { PlacesService, RegionsService } from 'hazdev-ng-geoserve-output';
import { Event } from '../../event';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegionInfoDisplayComponent', () => {
  let component: RegionInfoDisplayComponent;
  let fixture: ComponentFixture<RegionInfoDisplayComponent>;

  beforeEach(async(() => {
    const nearbyCitiesServiceStub = {
      get: jasmine.createSpy('get')
    };

    const placesServiceStub = {
      getPlaces: jasmine.createSpy('getPlaces')
    };

    const regionsServiceStub = {
      getRegions: jasmine.createSpy('getRegions')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionInfoDisplayComponent,

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

        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: NearbyCitiesService, useValue: nearbyCitiesServiceStub },
        { provide: PlacesService, useValue: placesServiceStub },
        { provide: RegionsService, useValue: regionsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set event', () => {
    beforeEach(() => {
      spyOn(component, 'getPlaces');
      spyOn(component, 'getRegions');
    });

    it('returns when no event is passed', () => {
      component.event = null;
      expect(component.getPlaces).not.toHaveBeenCalled();
      expect(component.getRegions).not.toHaveBeenCalled();
    });

    it('sets coordinates', () => {
      const latitude = 35;
      const longitude = -105;

      const event = new Event({
        geometry: {
          coordinates: [longitude, latitude, 0]
        }
      });

      component.event = event;
      expect(component.getPlaces).toHaveBeenCalledWith({
        latitude: latitude,
        longitude: longitude
      });
      expect(component.getRegions).toHaveBeenCalledWith({
        latitude: latitude,
        longitude: longitude
      });
    });

    it('uses product if available', () => {
      spyOn(component, 'getNearbyCities');
      const product = {};
      const event = new Event({
        properties: {
          products: {
            'nearby-cities': [product]
          }
        }
      });

      component.event = event;
      expect(component.getNearbyCities).toHaveBeenCalledWith(product);
    });
  });

  describe('getNearbyCities', () => {
    it('calls service method', () => {
      component.getNearbyCities(null);
      expect(component.citiesService.get).toHaveBeenCalledWith(null);

      const product = {};
      component.getNearbyCities(product);
      expect(component.citiesService.get).toHaveBeenCalledWith(product);
    });
  });

  describe('getPlaces', () => {
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
