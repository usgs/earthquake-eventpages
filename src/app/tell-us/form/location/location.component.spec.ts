import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { MockComponent } from 'ng2-mock-component';

import { LocationComponent } from './location.component';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { FormatterService } from '@core/formatter.service';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let httpClient: HttpTestingController;
  let injector: TestBed;

  afterEach(() => {
    httpClient.verify();
  });

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      computeFromGeocode: (geocodeLocation: any) => {},
      roundLocation: (value: number, confidence: number) => {}
    };

    const formatterServiceStub = {
      location: jasmine.createSpy('formatter::location')
    };

    const snackBarStub = {
      open: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [
        LocationComponent,

        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        }),

        MockComponent({
          inputs: ['event', 'labels', 'feltReport', 'location'],
          selector: 'tell-us-form-location-map'
        }),
        MockComponent({
          inputs: ['diameter'],
          selector: 'mat-spinner'
        }),
        MockComponent({
          selector: 'mat-icon'
        }),
        MockComponent({
          inputs: ['ngModel'],
          selector: 'input'
        }),
        MockComponent({
          selector: 'mat-form-field'
        }),
        MockComponent({
          selector: 'mat-expansion-panel-header'
        }),
        MockComponent({
          selector: 'mat-expansion-panel'
        })
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: FormatterService, useValue: formatterServiceStub },
        { provide: MatSnackBar, useValue: snackBarStub }
      ]
    }).compileComponents();

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buildUrl', () => {
    it('returns correct url', () => {
      let address, url;

      address = 'golden colorado';
      url =
        'https://geocode.arcgis.com/arcgis/rest/services/' +
        'World/GeocodeServer/find?f=json&text=' +
        address;

      expect(component.buildUrl(address)).toEqual(url);
    });
  });

  describe('geocode', () => {
    it('calls http get', () => {
      let location, request;

      location = 'Golden, Colorado';

      component.geocode('Golden, Colorado');
      request = httpClient.expectOne(
        component.GEOCODE_URL + '?f=json&text=Golden, Colorado'
      );

      expect(request.request.method).toBe('GET');
    });
  });

  describe('onGeocodeSuccess', () => {
    it('sets the user location', () => {
      const response = {
        feature: {
          geometry: {
            x: 2,
            y: 1
          }
        },
        name: 'test'
      };
      component.onGeocodeSuccess(response);
      expect(component.feltReport.location).toEqual({
        address: 'test',
        latitude: 1,
        longitude: 2
      });
    });
  });

  describe('onGeolocateError', () => {
    it('sets geolocation to false', () => {
      component.onGeolocateError(null);
      expect(component.geolocating).toBeFalsy();
    });
  });

  describe('onGeolocateResult', () => {
    it('calls coordinate service computeFromGeolocate', () => {
      component.onGeolocateResult(null);
      expect(component.feltReport.location).not.toBeNull();
    });
  });

  describe('onGeocodeError', () => {
    it('calls openSnackbar', () => {
      spyOn(component, 'openSnackBar');
      component.onGeocodeError();
      expect(component.openSnackBar).toHaveBeenCalled();
    });
  });

  describe('openSnackBar', () => {
    it('generates a snackbar message', () => {
      const message = 'message';
      const action = 'action';
      const length = 1000;

      spyOn(component.snackBar, 'open');
      component.openSnackBar(message, action, length);
      expect(component.snackBar.open).toHaveBeenCalled();
      expect(component.snackBar.open).toHaveBeenCalledWith(message, action, {
        duration: length
      });
    });
  });
});
