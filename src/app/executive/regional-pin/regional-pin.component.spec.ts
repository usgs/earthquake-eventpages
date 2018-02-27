import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatListModule
} from '@angular/material';
import { MockPipe } from '../../mock-pipe';

import { RegionalPinComponent } from './regional-pin.component';

import { EventService } from '../../event.service';

describe('RegionalPinComponent', () => {
  let component: RegionalPinComponent;
  let fixture: ComponentFixture<RegionalPinComponent>;

  const coordinates = {
    latitude: 35,
    longitude: -105,
    zoom: 16
  };

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionalPinComponent,

        MockPipe('contributorList')
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatCardModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });







  describe('createMap', () => {
    it('should create a map', () => {
      // check map
      expect(component.map).not.toBeNull();
    });
  });

  describe('createMarker', () => {
    it('should create a marker', () => {
      // check marker
      expect(component.marker).not.toBeNull();
    });
  });

  describe('fitMapBounds', () => {
    it('should center/zoom the map', () => {
      let latLng,
          latitude,
          longitude,
          mapSpy;

      // set latitude/ longitude
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
      latLng = L.latLng(latitude, longitude);

      // create map
      component.createMap();

      // setup spies
      mapSpy = spyOn(component.map, 'fitBounds');

      // call moveMap
      component.fitMapBounds(latitude, longitude);


      // check results
      expect(mapSpy).toHaveBeenCalled();
      expect(mapSpy).toHaveBeenCalledWith( [[ 33, -107 ], [ 37, -103 ]]);
    });
  });

  describe('updateMarkerLocation', () => {
    it('should move the marker on the map', () => {
      let latLng,
          latitude,
          longitude,
          markerSpy;

      // create marker
      component.createMarker();

      // set latitude/ longitude
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
      latLng = L.latLng(latitude, longitude);

      // setup spies
      markerSpy = spyOn(component.marker, 'setLatLng');

      // call moveMarker
      component.updateMarkerLocation(latitude, longitude);

      // check results
      expect(markerSpy).toHaveBeenCalled();
      expect(markerSpy).toHaveBeenCalledWith(latLng);
    });
  });
});
