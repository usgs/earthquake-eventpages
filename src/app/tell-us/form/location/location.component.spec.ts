import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '@core/formatter.service';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { LocationComponent } from './location.component';
import { MockComponent } from 'ng2-mock-component';
import { FormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { of } from 'rxjs/observable/of';
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
      computeFromGeocode: (geocodeLocation: any) => {
        console.log('stubbified!');
      },
      roundLocation: (value: number, confidence: number) => {
        console.log('stubbified!');
      }
    };

    const formatterServiceStub = {
      location: jasmine.createSpy('formatter::location')
    };

    TestBed.configureTestingModule({
      declarations: [
        LocationComponent,

        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        }),

        MockComponent({
          inputs: ['event', 'labels', 'feltReport', 'location', 'mapShown'],
          selector: 'tell-us-form-location-map'
        })
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: FormatterService, useValue: formatterServiceStub }
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

  describe('showMap', () => {
    it('should set map shown to true', () => {
      component.showMap();
      expect(component.mapShown).toBe(true);
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
