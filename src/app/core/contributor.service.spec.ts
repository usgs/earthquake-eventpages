import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { ContributorService } from './contributor.service';


describe('ContributorService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContributorService
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([ContributorService],
      (service: ContributorService) => {
    expect(service).toBeTruthy();
  }));

  describe('getContributors', () => {
    it('invokes correct url', inject([ContributorService],
        (service: ContributorService) => {
      service.getContributors();
      const req = httpClient.expectOne(environment.CONTRIBUTOR_SERVICE);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    }));

    it('notifies subscribers with response', inject([ContributorService],
        (service: ContributorService) => {
      service.getContributors();

      const responseBody = [];
      const req = httpClient.expectOne(environment.CONTRIBUTOR_SERVICE);

      req.flush(responseBody);

      service.contributors$.subscribe((contributors: any) => {
        expect(contributors).toEqual(responseBody);
      });
    }));

    it('handles errors', inject([ContributorService],
        (service: ContributorService) => {
      service.getContributors();

      const req = httpClient.expectOne(environment.CONTRIBUTOR_SERVICE);
      req.error(null);

      service.contributors$.subscribe((contributors) => {
        expect(contributors.length).toBe(0);
      });

    }));
  });
});
