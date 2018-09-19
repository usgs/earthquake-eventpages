import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { NearbyCitiesService } from './nearby-cities.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Place } from 'hazdev-ng-geoserve-output';
import { HttpErrorResponse } from '@angular/common/http';

describe('NearbyCitiesService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  afterEach(() => {
    httpClient.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NearbyCitiesService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject(
    [NearbyCitiesService],
    (service: NearbyCitiesService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('get', () => {
    let nearbyCitiesJsonUrl, product, productPlacesArray;

    beforeEach(() => {
      nearbyCitiesJsonUrl = 'nearby-cities.json';

      product = {
        contents: {
          'nearby-cities.json': {
            url: nearbyCitiesJsonUrl
          }
        }
      };

      productPlacesArray = [
        {
          direction: 'N',
          distance: 0,
          latitude: 2,
          longitude: 1,
          name: 'City, State',
          population: null
        }
      ];
    });

    it('ticks next with cities array when product given', inject(
      [NearbyCitiesService],
      (service: NearbyCitiesService) => {

        service.get(product);
        const request = httpClient.expectOne(nearbyCitiesJsonUrl);
        request.flush(productPlacesArray);

        service.cities$.subscribe(places => {
          expect(places.length).toBe(1);
          expect(places[0]).toEqual(<Place> {
            admin1_name: 'State',
            azimuth: 'N',
            country_name: null,
            distance: 0,
            name: 'City',
            population: null
          });
        });
      }
    ));

    it('ticks next with empty array when no product given', inject(
      [NearbyCitiesService],
      (service: NearbyCitiesService) => {
        service.get(null);

        service.cities$.subscribe(places => {
          expect(places.length).toBe(0);
        });
      }
    ));

    it('ticks next with empty if an http error occurrs', inject(
      [NearbyCitiesService],
      (service: NearbyCitiesService) => {
        const error = {
          status: 500,
          statusText: 'Expected Unit Test Error',
          url: nearbyCitiesJsonUrl
        };

        service.get(product);
        const request = httpClient.expectOne(nearbyCitiesJsonUrl);
        request.flush(new HttpErrorResponse(error), error);

        service.cities$.subscribe((places) => {
          expect(places.length).toBe(0);
        });
      }
    ));
  });
});
