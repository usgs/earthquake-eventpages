import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoordinatesService } from 'earthquake-geoserve-ui';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { RegionInfoComponent } from './region-info.component';


describe('RegionInfoComponent', () => {
  let component: RegionInfoComponent;
  let fixture: ComponentFixture<RegionInfoComponent>;

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      setCoordinates: jasmine.createSpy('coordinatesService::setCoordinates')
    };

    const eventServiceStub = {
      event$: of(new Event({}))
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RegionInfoComponent,

        MockComponent({selector: 'shared-map', inputs: ['overlays', 'showScaleControl']}),
        MockComponent({selector: 'shared-summary-link', inputs: ['productType', 'event']}),
        MockComponent({selector: 'app-admin-region'}),
        MockComponent({selector: 'app-nearby-places'}),
        MockComponent({selector: 'app-tectonic-summary-region'}),
        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      providers: [
        {provide: CoordinatesService, useValue: coordinatesServiceStub},
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateGeoserveCoordinateService', () => {
    it('returns when no event is passed', () => {
      component.updateGeoserveCoordinateService(null);
      expect(component.coordinatesService.setCoordinates).not.toHaveBeenCalled();
    });
    it('sets coordinates', () => {
      const latitude = 35;
      const longitude = -105;

      const event = {
        geometry: {
          coordinates: [
            longitude,
            latitude,
            0
          ]
        }
      };

      component.updateGeoserveCoordinateService(event);
      expect(component.coordinatesService.setCoordinates).toHaveBeenCalledWith({
        latitude: latitude,
        longitude: longitude
      });
    });
  });

});
