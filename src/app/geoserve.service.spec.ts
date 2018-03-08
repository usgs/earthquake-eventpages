import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeoserveService } from './geoserve.service';


describe('GeoserveService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GeoserveService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });


  it('should be created', inject([GeoserveService], (service: GeoserveService) => {
    expect(service).toBeTruthy();
  }));
});
