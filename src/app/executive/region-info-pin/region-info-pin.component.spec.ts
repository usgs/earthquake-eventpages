import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import * as L from 'leaflet';

import { EventService } from '../../core/event.service';
import { MockComponent } from 'ng2-mock-component';
import { RegionInfoPinComponent } from './region-info-pin.component';
import { Event } from '../../event';

describe('RegionInfoPinComponent', () => {
  let component: RegionInfoPinComponent;
  let fixture: ComponentFixture<RegionInfoPinComponent>;

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
        RegionInfoPinComponent,

        MockComponent({selector: 'basic-pin', inputs: ['link', 'product', 'title']})
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
    fixture = TestBed.createComponent(RegionInfoPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

      // setup spies
      mapSpy = spyOn(component.map, 'fitBounds');

      // call moveMap
      component.fitMapBounds(latitude, longitude);

      // check results
      expect(mapSpy).toHaveBeenCalled();
      expect(mapSpy).toHaveBeenCalledWith( [[ 33, -107 ], [ 37, -103 ]]);
    });
  });

  describe('set event', () => {
    it('calls updateLocation', () => {
      const event = new Event({id: 'test event'});
      spyOn(component, 'updateLocation');
      component.event = event;
      expect(component.event).toBe(event);
      expect(component.updateLocation).toHaveBeenCalled();
    });
  });

  describe('setMarkerLocation', () => {
    it('should move the marker on the map', () => {
      let latLng,
          latitude,
          longitude,
          markerSpy;

      // set latitude/ longitude
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
      latLng = L.latLng(latitude, longitude);

      // setup spies
      markerSpy = spyOn(component.marker, 'setLatLng');

      // call moveMarker
      component.setMarkerLocation(latitude, longitude);

      // check results
      expect(markerSpy).toHaveBeenCalled();
      expect(markerSpy).toHaveBeenCalledWith(latLng);
    });
  });

  describe('updateLocation', () => {
    it('returns if map is undefined', () => {
      const spy = spyOnProperty(component, 'event', 'get');
      component.map = null;
      component.updateLocation();
      expect(spy).not.toHaveBeenCalled();
    });

    it('uses event info', () => {
      const event = new Event(null);
      const latitude = 34.0;
      const longitude = -118.0;
      event.geometry = {
        coordinates: [longitude, latitude]
      };

      spyOn(component, 'setMarkerLocation');
      spyOn(component, 'fitMapBounds');
      spyOn(component.map, 'invalidateSize');

      component.event = event;
      expect(component.setMarkerLocation).toHaveBeenCalledWith(latitude, longitude);
      expect(component.fitMapBounds).toHaveBeenCalledWith(latitude, longitude);
      expect(component.map.invalidateSize).toHaveBeenCalled();
    });

    it('uses defaults when event geometry is undefined', () => {
      const event = new Event(null);
      const latitude = 0;
      const longitude = 0;

      spyOn(component, 'setMarkerLocation');
      spyOn(component, 'fitMapBounds');
      spyOn(component.map, 'invalidateSize');

      component.event = event;
      expect(component.setMarkerLocation).toHaveBeenCalledWith(latitude, longitude);
      expect(component.fitMapBounds).toHaveBeenCalledWith(latitude, longitude);
    });
  });
});
