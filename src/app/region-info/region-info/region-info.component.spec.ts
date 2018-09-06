import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '@core/event.service';
import { PlacesService, RegionsService } from 'hazdev-ng-geoserve-output';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { RegionInfoComponent } from './region-info.component';

describe('RegionInfoComponent', () => {
  let component: RegionInfoComponent;
  let fixture: ComponentFixture<RegionInfoComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionInfoComponent,

        MockComponent({
          inputs: ['overlays', 'showScaleControl'],
          selector: 'shared-map'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        }),
        MockComponent({ selector: 'geoserve-admin-region' }),
        MockComponent({ selector: 'geoserve-nearby-places' }),
        MockComponent({ selector: 'geoserve-tectonic-summary-region' }),
        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: PlacesService, useValue: {} },
        { provide: RegionsService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'getPlaces');
    spyOn(component, 'getRegions');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateGeoserveCoordinateService', () => {
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
});
