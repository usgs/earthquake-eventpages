import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material';

import { LocationComponent } from './location.component';
import {
  Coordinates,
  CoordinatesService,
  LocationDialogComponent
} from 'hazdev-ng-location-view';


describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      coordinates$: of({})
    };
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        LocationComponent
      ],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: MatDialog, useValue: {close: () => {}, open: () => {}} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openLocationInput', () => {
    it('opens the location dialog component', () => {
      spyOn(component.dialog, 'open');
      component.openLocationInput();
      expect(component.dialog.open).toHaveBeenCalled();
    });
  });

  describe('setLocation', () => {
    it('requires a value to set', () => {
      component.setLocation(null);
      expect(component.value.ciim_mapAddress).not.toBeNull();
      expect(component.value.ciim_mapConfidence).not.toBeNull();
      expect(component.value.ciim_mapLat).not.toBeNull();
      expect(component.value.ciim_mapLon).not.toBeNull();
    });
    it('sets a value', () => {
      const coordinates: Coordinates = {
        'name': 'my spot',
        'confidence': 1,
        'latitude': 0,
        'longitude': 0,
        'method': null,
        'zoom': 12
      };

      component.setLocation(coordinates);
      expect(component.value.ciim_mapAddress).toEqual(coordinates.name);
      expect(component.value.ciim_mapConfidence).toEqual(coordinates.confidence);
      expect(component.value.ciim_mapLat).toEqual(coordinates.latitude);
      expect(component.value.ciim_mapLon).toEqual(coordinates.longitude);
    });
  });

});
