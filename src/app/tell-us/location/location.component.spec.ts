import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { CoordinatesService } from 'hazdev-ng-location-view';
import * as L from 'leaflet';

import { LocationComponent } from './location.component';

export interface Coordinates {
  confidence: number;
  latitude: number;
  longitude: number;
  method: string; // geocode, geolocate, pin, lat/lng
  name: string; // geolocate
  zoom: number; // based on confidence
}

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  const point = 35;
  const coordinates: Coordinates = {
    confidence: 1,
    latitude: point,
    longitude: point,
    method: 'point',
    name: '',
    zoom: 16
  };

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      computeFromPoint: (geocodeLocation: any) => {
        console.log('stubbified!');
      },
      coordinates$: {
        subscribe: () => {
          console.log('stubbified!');
        }
      },
      roundLocation: (value: number, confidence: number) => {
        console.log('stubbified!');
      },
      setCoordinates: (location: any) => {
        console.log('stubbified!');
      }
    };
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: MatDialog, useValue: { close: () => {}, open: () => {} } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('opens the location dialog component', () => {
      spyOn(component.dialog, 'open');
      component.openDialog();
      expect(component.dialog.open).toHaveBeenCalled();
    });
  });

  describe('addBaselayers', () => {
    it('should add baselayers to the map', () => {
      let mapSpy;

      mapSpy = spyOn(component.map, 'addLayer');

      // call addBaselayers
      component.addBaselayers();

      // check results
      expect(mapSpy).toHaveBeenCalled();
    });
  });

  describe('addLocationControl', () => {
    it('should add the location control to the map', () => {
      let mapSpy;

      mapSpy = spyOn(component.map, 'addControl');

      // call addLocationControl
      component.addLocationControl();

      // check results
      expect(mapSpy).toHaveBeenCalled();
    });
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

  describe('moveMap', () => {
    it('should center/zoom the map', () => {
      let latLng, mapSpy, zoom;

      // set lat/lng object and zoom level
      latLng = L.latLng(coordinates.latitude, coordinates.longitude);
      zoom = coordinates.zoom;

      // setup spies
      mapSpy = spyOn(component.map, 'setView');

      // call moveMap
      component.moveMap(coordinates);

      // check results
      expect(mapSpy).toHaveBeenCalled();
      expect(mapSpy).toHaveBeenCalledWith(latLng, zoom);
    });
  });

  describe('moveMarker', () => {
    it('should move the marker on the map', () => {
      let latLng, marker, mapSpy, map2Spy, markerSpy;

      // set lat/lng object and marker
      latLng = L.latLng(coordinates.latitude, coordinates.longitude);
      marker = L.marker(latLng);
      component.marker = marker;

      // setup spies
      mapSpy = spyOn(component.map, 'hasLayer');
      map2Spy = spyOn(component.map, 'addLayer');
      markerSpy = spyOn(component.marker, 'setLatLng').and.returnValue(marker);

      // call moveMarker
      component.moveMarker(coordinates);

      // check results
      expect(markerSpy).toHaveBeenCalled();
      expect(markerSpy).toHaveBeenCalledWith(latLng);
      expect(mapSpy).toHaveBeenCalled();
      expect(mapSpy).toHaveBeenCalledWith(marker);
      expect(map2Spy).toHaveBeenCalled();
      expect(map2Spy).toHaveBeenCalledWith(marker);
    });
  });

  describe('onDragEnd', () => {
    it('should update the saved coordinates', () => {
      let confidenceSpy,
        latLng,
        marker,
        mapSpy,
        markerSpy,
        roundLocationSpy,
        setCoordinatesSpy;

      // set lat/lng object and marker
      latLng = L.latLng(coordinates.latitude, coordinates.longitude);
      marker = L.marker(latLng);
      component.marker = marker;

      // setup spies
      confidenceSpy = spyOn(
        component.coordinatesService,
        'computeFromPoint'
      ).and.returnValue(coordinates.confidence);
      markerSpy = spyOn(component.marker, 'getLatLng').and.returnValue(latLng);
      mapSpy = spyOn(component.map, 'getZoom').and.returnValue(
        coordinates.zoom
      );
      setCoordinatesSpy = spyOn(component.coordinatesService, 'setCoordinates');
      roundLocationSpy = spyOn(
        component.coordinatesService,
        'roundLocation'
      ).and.returnValue(point);

      // call onDragEnd
      component.onDragEnd();

      // check results
      expect(markerSpy).toHaveBeenCalled();
      expect(mapSpy).toHaveBeenCalled();
      expect(confidenceSpy).toHaveBeenCalled();
      expect(confidenceSpy).toHaveBeenCalledWith(coordinates.zoom);
      expect(roundLocationSpy).toHaveBeenCalledTimes(2);
      expect(setCoordinatesSpy).toHaveBeenCalled();
      expect(setCoordinatesSpy).toHaveBeenCalledWith({
        confidence: coordinates.confidence,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        method: coordinates.method,
        zoom: coordinates.zoom
      });
    });
  });

  describe('setLocation', () => {
    it('requires a value to set', () => {
      component.value = {};
      component.setLocation(null);
      expect(component.value.ciim_mapAddress).toBeUndefined();
      expect(component.value.ciim_mapConfidence).toBeUndefined();
      expect(component.value.ciim_mapLat).toBeUndefined();
      expect(component.value.ciim_mapLon).toBeUndefined();
    });
    it('sets a value', () => {
      component.value = {};
      component.setLocation(coordinates);
      expect(component.value.ciim_mapAddress).toEqual(coordinates.name);
      expect(component.value.ciim_mapConfidence).toEqual(
        coordinates.confidence
      );
      expect(component.value.ciim_mapLat).toEqual(coordinates.latitude);
      expect(component.value.ciim_mapLon).toEqual(coordinates.longitude);
    });
  });

  describe('subscribeToServices', () => {
    it('should subscribe to the coordinates service', () => {
      let coordinatesServiceSpy;

      coordinatesServiceSpy = spyOn(
        component.coordinatesService.coordinates$,
        'subscribe'
      );
      component.subscribeToServices();

      expect(coordinatesServiceSpy).toHaveBeenCalled();
    });
  });
});
