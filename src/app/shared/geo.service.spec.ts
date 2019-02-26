import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { GeoService } from './geo.service';
import { FormatterService } from '@core/formatter.service';
import { Subscription } from 'rxjs';

describe('GeoService', () => {
  let httpClient: HttpTestingController;
  let injector: TestBed;
  let service: GeoService;
  let subscription: Subscription;

  afterEach(() => {
    httpClient.verify();
    subscription.unsubscribe();
  });

  beforeEach(() => {
    const formatterServiceStub = {
      location: jasmine
        .createSpy('formatter:location')
        .and.returnValue('location'),
      number: jasmine.createSpy('formatter::number').and.returnValue('0.000')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeoService,
        { provide: FormatterService, useValue: formatterServiceStub }
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
    service = TestBed.get(GeoService);
    subscription = new Subscription();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('geocode', () => {
    it('does nothing if no input provided', done => {
      service.geocode('');
      service.geocode(null);
      service.geocode(undefined);

      subscription.add(
        service.geocoding$.subscribe(value => {
          expect(value).toBe(false);
          done();
        })
      );
    });

    it('calls http get', () => {
      const location = 'Golden, Colorado';

      service.geocode(location);
      const request = httpClient.expectOne(
        `${service.geocodeUrl}?f=json&text=${location}`
      );

      expect(request.request.method).toBe('GET');
    });

    it('flags service as actively geocoding', done => {
      service.geocode('test');
      httpClient.match(`${service.geocodeUrl}?f=json&text=test`);

      subscription.add(
        service.geocoding$.subscribe(value => {
          expect(value).toBe(true);
          done();
        })
      );
    });
  });

  describe('geolocate', () => {
    let fakeGetCurrentPosition: jasmine.Spy;

    beforeEach(() => {
      fakeGetCurrentPosition = spyOn(
        navigator.geolocation,
        'getCurrentPosition'
      );
    });

    it('flags service as actively geolocating', done => {
      service.geolocate();
      subscription.add(
        service.geolocating$.subscribe(value => {
          expect(value).toBe(true);
          done();
        })
      );
    });

    it('uses built-in geolocation', () => {
      service.geolocate();
      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it('ticks an error if one occurs', done => {
      // Spied version of `navigator.geolocation.getCurrentPosition`
      fakeGetCurrentPosition.and.callFake(() => {
        throw new Error('Test Error');
      });

      service.geolocate();

      subscription.add(
        service.error$.subscribe(error => {
          expect(error.code).toBe(-1);
          expect(error.message).toBe('Geolocation not supported');
          done();
        })
      );
    });
  });
});
