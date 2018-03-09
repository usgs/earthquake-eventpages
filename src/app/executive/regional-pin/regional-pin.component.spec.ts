import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import * as L from 'leaflet';

import { EventService } from '../../event.service';
import { MockComponent } from 'ng2-mock-component';
import { RegionalPinComponent } from './regional-pin.component';

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

        MockComponent({selector: 'shared-product-attribution', inputs: ['product']})
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
      component.createMap();
      // check map
      expect(component.map).not.toBeNull();
    });
  });

  describe('createMarker', () => {
    it('should create a marker', () => {
      component.createMarker();
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
