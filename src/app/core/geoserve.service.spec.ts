import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeoserveService } from './geoserve.service';

import { environment } from '../../environments/environment';


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

  describe('fe', () => {
    it('defers to regions method', inject([GeoserveService], (service: GeoserveService) => {
      const spy = spyOn(service, 'regions').and.returnValue('regions');
      const result = service.fe(0, 1);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(0, 1, 'fe');
    }));
  });

  describe('regions', () => {
    let stub;

    beforeEach(() => {
      stub = `${environment.GEOSERVE_SERVICE}/regions.json`;
    });

    it('injects type of present', inject([GeoserveService], (service: GeoserveService) => {
      service.regions(0, 1, 'foo').subscribe(() => {});
      httpClient.expectOne(`${stub}?latitude=0&longitude=1&type=foo`);
    }));

    it('skips type if not present', inject([GeoserveService], (service: GeoserveService) => {
      service.regions(0, 1).subscribe();
      httpClient.expectOne(`${stub}?latitude=0&longitude=1`);
    }));
  });
});
